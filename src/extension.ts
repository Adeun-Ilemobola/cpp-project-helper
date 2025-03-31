import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: vscode.ExtensionContext) {
    // Command 1: Initialize the C++ project
    const initializeProject = vscode.commands.registerCommand('cppProjectHelper.initializeProject', async (uri: vscode.Uri) => {
        // Implementation coming in next step
        await initializeCppProject();
    });

    // Command 2: Compile & Run the C++ project
    const compileAndRunProject = vscode.commands.registerCommand('cppProjectHelper.compileAndRun', async (uri: vscode.Uri) => {
        // Implementation coming in next step
        await compileAndRunCppProject();
    });

    // Command 3: Create a class
    const createClass = vscode.commands.registerCommand('cppProjectHelper.createClass', async (uri: vscode.Uri) => {
        // Implementation coming in next step
        await createCppClass(uri);
    });

    context.subscriptions.push(initializeProject, compileAndRunProject, createClass);
}

async function compileAndRunCppProject() {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder is open.");
        return;
    }
    const rootPath = workspaceFolders[0].uri.fsPath;
    const buildPath = path.join(rootPath, 'build');

    // Create build folder if not exists
    if (!fs.existsSync(buildPath)) {
        fs.mkdirSync(buildPath);
    }

    // We'll run commands in a VS Code terminal
    const terminal = vscode.window.createTerminal("C++ Build & Run");

    // 1. Navigate to build folder
    terminal.sendText(`cd "${buildPath}"`);

    // 2. Run CMake
    terminal.sendText(`cmake ..`);

    // 3. Build (assuming makefiles on Linux/macOS; if on Windows with Visual Studio, your user might need to adapt)
    terminal.sendText(`cmake --build .`);

    // 4. Run the executable (assuming the target is named MyCppProject)
    //    The actual executable name depends on your CMakeLists. 
    //    On Windows it may be MyCppProject.exe, on Linux/macOS it’s just MyCppProject.
    //    We’ll assume MyCppProject on Linux/macOS for simplicity.
    //    Using an if-else or checks for OS is typical in real usage.
    terminal.sendText(`./MyCppProject`);

    // Show the terminal
    terminal.show();
}
async function initializeCppProject() {
    // 1. Get workspace folder
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder is open.");
        return;
    }
    const rootPath = workspaceFolders[0].uri.fsPath;

    // 2. Check for main.cpp, if not exist, create it
    const mainCppPath = path.join(rootPath, 'main.cpp');
    if (!fs.existsSync(mainCppPath)) {
        const defaultMainContent = `#include <iostream>

int main() {
    std::cout << "Hello from main.cpp!" << std::endl;
    return 0;
}
`;
        fs.writeFileSync(mainCppPath, defaultMainContent);
        vscode.window.showInformationMessage("Created main.cpp with boilerplate.");
    } else {
        vscode.window.showInformationMessage("main.cpp already exists.");
    }

    // 3. Create src/ and include/ folders
    const srcPath = path.join(rootPath, 'src');
    const includePath = path.join(rootPath, 'include');

    if (!fs.existsSync(srcPath)) {
        fs.mkdirSync(srcPath);
        vscode.window.showInformationMessage("Created src folder.");
    }
    if (!fs.existsSync(includePath)) {
        fs.mkdirSync(includePath);
        vscode.window.showInformationMessage("Created include folder.");
    }

    // 4. Create a basic CMakeLists.txt if not present
    const cmakeFilePath = path.join(rootPath, 'CMakeLists.txt');
    if (!fs.existsSync(cmakeFilePath)) {
        const cmakeContent = `cmake_minimum_required(VERSION 3.0)
project(MyCppProject)

# Set C++ standard
set(CMAKE_CXX_STANDARD 17)

# Include directories
include_directories(\${CMAKE_CURRENT_SOURCE_DIR}/include)

# Gather all .cpp files under src
file(GLOB_RECURSE SOURCES "\${CMAKE_CURRENT_SOURCE_DIR}/src/*.cpp")

# If main.cpp is in root, you can also add it:
set(SOURCES \${SOURCES} "\${CMAKE_CURRENT_SOURCE_DIR}/main.cpp")

add_executable(\${PROJECT_NAME} \${SOURCES})
`;
        fs.writeFileSync(cmakeFilePath, cmakeContent);
        vscode.window.showInformationMessage("Created CMakeLists.txt.");
    } else {
        vscode.window.showInformationMessage("CMakeLists.txt already exists.");
    }

    vscode.window.showInformationMessage("C++ project initialized!");
}


async function createCppClass(uri: vscode.Uri) {
    // 1. Get the root workspace folder
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage("No workspace folder is open.");
        return;
    }
    const rootPath = workspaceFolders[0].uri.fsPath;

    // 2. Prepare paths for 'src' and 'include'
    const srcPath = path.join(rootPath, "src");
    const includePath = path.join(rootPath, "include");

    // Make sure those folders exist (just in case):
    if (!fs.existsSync(srcPath)) {
        fs.mkdirSync(srcPath);
    }
    if (!fs.existsSync(includePath)) {
        fs.mkdirSync(includePath);
    }

    // 3. Prompt user for the class name
    const className = await vscode.window.showInputBox({
        prompt: "Enter the Class Name (e.g. MyClass)",
        placeHolder: "MyClass"
    });

    if (!className) {
        vscode.window.showErrorMessage("Class creation cancelled (no class name provided).");
        return;
    }

    // 4. Build the file names and paths
    const headerFileName = `${className}.hpp`;
    const sourceFileName = `${className}.cpp`;

    const headerFilePath = path.join(includePath, headerFileName);
    const sourceFilePath = path.join(srcPath, sourceFileName);

    // 5. Prepare boilerplate content
    const headerContent = `#ifndef ${className.toUpperCase()}_HPP
#define ${className.toUpperCase()}_HPP

class ${className} {
public:
    ${className}();
    ~${className}();
};

#endif // ${className.toUpperCase()}_HPP
`;

    // Assuming your CMake setup includes “include/” in the include paths,
    // you can just do #include "${className}.hpp". 
    // If you need a relative path, you'd do "../include/...".
    const sourceContent = `#include "${className}.hpp"

${className}::${className}() {
    // Constructor
}

${className}::~${className}() {
    // Destructor
}
`;

    // 6. Write files if they don’t exist already
    if (!fs.existsSync(headerFilePath)) {
        fs.writeFileSync(headerFilePath, headerContent);
    } else {
        vscode.window.showWarningMessage(`${headerFileName} already exists (not overwritten).`);
    }

    if (!fs.existsSync(sourceFilePath)) {
        fs.writeFileSync(sourceFilePath, sourceContent);
    } else {
        vscode.window.showWarningMessage(`${sourceFileName} already exists (not overwritten).`);
    }

    vscode.window.showInformationMessage(
        `Class ${className} created:\n  - ${path.relative(rootPath, headerFilePath)}\n  - ${path.relative(rootPath, sourceFilePath)}`
    );
}



export function deactivate() {}
