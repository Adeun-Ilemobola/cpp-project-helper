
# C++ Project Helper

**C++ Project Helper** is a VS Code extension that streamlines the setup, compilation, and class creation workflow for small-to-medium C++ projects using CMake. With a few clicks, you can initialize a new C++ project structure (complete with `main.cpp`, `src/`, `include/`, and a `CMakeLists.txt`), compile and run it, and even generate new classes automatically.

## Features

1. **Initialize C++ Project**  
   - Creates a `main.cpp` with basic “Hello World” boilerplate (if not present).  
   - Ensures the existence of `src` and `include` folders.  
   - Creates a minimal `CMakeLists.txt` for out-of-the-box builds.

2. **Compile & Run C++ Project**  
   - Automatically generates a `build/` folder.  
   - Invokes `cmake ..` and then the build target (e.g. `MyCppProject`).  
   - Executes the compiled binary right in the integrated terminal.

3. **Create C++ Class**  
   - Prompts for a class name (e.g., `MyClass`).  
   - Generates `MyClass.hpp` in the `include` folder and `MyClass.cpp` in the `src` folder with basic constructor/destructor stubs.  

## Installation

1. **From VSIX (Local Installation)**  
   - Download the `.vsix` file (packaged extension).  
   - In VS Code, press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS), then select `Extensions: Install from VSIX...` and choose the `.vsix` file.

2. **From Source**  
   - Clone or download this repo into a local folder.  
   - Open the folder in VS Code.  
   - Run `npm install` and then `npm run compile` in a terminal.  
   - Press `F5` to launch an **Extension Development Host** window to test.  

## Usage

**1. Initialize C++ Project**  
- **Command Name**: `cppProjectHelper.initializeProject`  
- **How to Invoke**:
  - Command Palette: Press `Ctrl+Shift+P` / `Cmd+Shift+P` → type `Initialize C++ Project`.  
  - Explorer Context Menu: Right-click in an open folder → `Initialize C++ Project`.
- **What It Does**:
  - If `main.cpp` does not exist in the workspace root, creates it with a simple “Hello World” program.  
  - Creates `src` and `include` folders if they don’t exist.  
  - Creates a basic `CMakeLists.txt` if one isn’t found.

**2. Compile & Run C++ Project**  
- **Command Name**: `cppProjectHelper.compileAndRun`  
- **How to Invoke**:  
  - Command Palette: Press `Ctrl+Shift+P` / `Cmd+Shift+P` → type `Compile & Run C++ Project`.  
  - (Optional) You can place it in Explorer Context Menu as well.
- **What It Does**:
  - Makes a `build/` folder if missing.  
  - Runs `cmake ..` and `cmake --build .` in the `build/` directory.  
  - Executes the resulting binary (e.g. `./MyCppProject`) in the integrated terminal.

**3. Create C++ Class**  
- **Command Name**: `cppProjectHelper.createClass`  
- **How to Invoke**:  
  - Command Palette: Press `Ctrl+Shift+P` / `Cmd+Shift+P` → type `Create C++ Class`.  
  - Explorer Context Menu: Right-click → `Create C++ Class`.
- **What It Does**:
  - Prompts for a class name (e.g. `MyClass`).  
  - Creates a `<className>.hpp` header in `include/`.  
  - Creates a `<className>.cpp` source file in `src/`.  
  - Inserts basic constructor/destructor definitions.

## Project Structure (After Initialization)

You’ll typically have a layout like:

```
my-cpp-project/
├─ main.cpp
├─ src/
│  └─ (Your .cpp files here)
├─ include/
│  └─ (Your .hpp files here)
├─ CMakeLists.txt
└─ build/
   └─ (Generated after compiling)
```

## Requirements & Assumptions

- **CMake** is installed and available on your system `PATH`.  
- **Compiler Toolchain**: On Linux/Mac, `gcc/g++` or Clang are assumed. On Windows, either `MinGW` or Visual Studio Build Tools.  
- **VS Code** with Node.js installed to run the extension locally.

## Contributing

1. Fork or clone this repo.  
2. Make changes in a feature branch.  
3. Submit a pull request describing your improvements.

## License

None