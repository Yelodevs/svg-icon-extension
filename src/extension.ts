// import * as vscode from 'vscode';
// import * as path from 'path';
// import * as fs from 'fs';

// // Enum for different icon types
// enum IconType {
//     Outline = 'outline',
//     Duotone = 'duotone',
//     Colored = 'colored',
//     Solid = 'solid'
// }

// // Main function to activate the extension
// export function activate(context: vscode.ExtensionContext) {
//     console.log('SVG Icon Extension activated.');

//     let disposable = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {
//         console.log('Search Icons command executed.');

//         // Ensure icon directories are created
//         const iconBasePath = ensureIconDirectories(context.extensionPath);

//         // Prompt the user for icon type
//         const iconType = await vscode.window.showQuickPick(
//             Object.keys(IconType),
//             { placeHolder: 'Choose an icon type (outline, duotone, colored, solid)' }
//         );

//         if (!iconType) {
//             return; // User cancelled the operation
//         }

//         // Prompt the user for icon name
//         const iconName = await vscode.window.showInputBox({
//             placeHolder: 'Enter the icon name (e.g., user, home, camera)',
//         });

//         if (!iconName) {
//             return; // User cancelled the operation
//         }

//         // Construct the icon path based on the type and name
//         const iconPath = path.join('assets', 'icons', iconType.toLowerCase(), `${iconName}.svg`);
//         const fullIconPath = path.join(iconBasePath, iconType.toLowerCase(), `${iconName}.svg`);

//         // Check if the icon exists; if not, copy it from the bundled icons
//         if (!fs.existsSync(fullIconPath)) {
//             copyIconFromBundle(iconType.toLowerCase(), iconName, fullIconPath, context.extensionPath);
//         }

//         // Insert the relative icon path into the active editor
//         const editor = vscode.window.activeTextEditor;
//         if (editor) {
//             editor.edit(editBuilder => {
//                 editor.selections.forEach(selection => {
//                     editBuilder.replace(selection, iconPath); // Insert the relative path
//                 });
//             });
//             vscode.window.showInformationMessage(`Icon path '${iconPath}' inserted successfully!`);
//         }
//     });

//     context.subscriptions.push(disposable);
// }

// // Ensure the required icon directories exist, create them if necessary
// function ensureIconDirectories(basePath: string): string {
//     const iconDirPath = path.join(basePath, 'assets', 'icons');

//     // Create directories for each icon type if they don't exist
//     Object.values(IconType).forEach(type => {
//         const dirPath = path.join(iconDirPath, type);
//         if (!fs.existsSync(dirPath)) {
//             fs.mkdirSync(dirPath, { recursive: true });
//         }
//     });

//     // Flutter-specific directories
//     const flutterAssetsPath = path.join(basePath, 'assets', 'icons');
//     if (!fs.existsSync(flutterAssetsPath)) {
//         fs.mkdirSync(flutterAssetsPath, { recursive: true });
//     }
//     return iconDirPath;
// }

// // Copy an icon from the bundled assets to the required directory
// function copyIconFromBundle(iconType: string, iconName: string, targetPath: string, basePath: string) {
//     const sourcePath = path.join(basePath, 'assets', 'bundle', iconType, `${iconName}.svg`);

//     if (fs.existsSync(sourcePath)) {
//         fs.copyFileSync(sourcePath, targetPath);
//         console.log(`Icon '${iconName}.svg' copied from bundle to ${targetPath}`);
//     } else {
//         console.warn(`Icon '${iconName}.svg' not found in the bundle.`);
//         vscode.window.showWarningMessage(`Icon '${iconName}.svg' not found in the bundle.`);
//     }
// }

// // Deactivate function
// export function deactivate() {
//     console.log('SVG Icon Extension deactivated.');
// }


//? Added autocomp

// import * as vscode from 'vscode';
// import * as path from 'path';
// import * as fs from 'fs';
// import * as fse from 'fs-extra';

// // Enum for different icon types
// enum IconType {
//     Outline = 'outline',
//     Duotone = 'duotone',
//     Colored = 'colored',
//     Solid = 'solid'
// }

// // Main function to activate the extension
// export function activate(context: vscode.ExtensionContext) {
//     console.log('SVG Icon Extension activated.');

//     // Register the search icon command
//     let searchCommand = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {
//         console.log('Search Icons command executed.');

//         // Ensure icon directories are created
//         const iconBasePath = ensureIconDirectories(context.extensionPath);

//         // Prompt the user for icon type
//         const iconType = await vscode.window.showQuickPick(
//             Object.keys(IconType),
//             { placeHolder: 'Choose an icon type (outline, duotone, colored, solid)' }
//         );

//         if (!iconType) {
//             return; // User cancelled the operation
//         }

//         const editor = vscode.window.activeTextEditor;
//         if (editor) {
//             const completionItems = await getIconCompletionItems(iconType.toLowerCase(), context.extensionPath);

//             const iconName = await vscode.window.showQuickPick(
//                 completionItems.map(item => ({
//                     label: item.label.toString(),
//                     description: `Preview: ![${item.label}](${item.documentation})`
//                 })),
//                 { placeHolder: 'Start typing the icon name...' }
//             );

//             if (!iconName) {
//                 return; // User cancelled the operation
//             }

//             const iconPath = path.join('assets', 'icons', iconType.toLowerCase(), `${iconName.label}.svg`);
//             const fullIconPath = path.join(iconBasePath, iconType.toLowerCase(), `${iconName.label}.svg`);

//             // Check if the icon exists; if not, copy it from the bundled icons
//             if (!fs.existsSync(fullIconPath)) {
//                 copyIconFromBundle(iconType.toLowerCase(), iconName.label, fullIconPath, context.extensionPath);
//             }

//             editor.edit(editBuilder => {
//                 editor.selections.forEach(selection => {
//                     editBuilder.replace(selection, iconPath); // Insert the relative path
//                 });
//             });
//             vscode.window.showInformationMessage(`Icon path '${iconPath}' inserted successfully!`);
//         }
//     });

//     context.subscriptions.push(searchCommand);

//     // Register icon completion provider for supported languages
//     const iconCompletionProvider = vscode.languages.registerCompletionItemProvider(
//         ['html', 'dart', 'typescript', 'javascript'],
//         {
//             provideCompletionItems: async (document: vscode.TextDocument, position: vscode.Position) => {
//                 const lineText = document.lineAt(position).text;
//                 const iconTypeMatch = Object.keys(IconType).find(type => lineText.includes(type));

//                 if (!iconTypeMatch) {
//                     return [];
//                 }

//                 const iconType = iconTypeMatch.toLowerCase();
//                 const completionItems = await getIconCompletionItems(iconType, context.extensionPath);

//                 return completionItems;
//             }
//         },
//         ':' // Trigger autocomplete when the user types `:` after typing the icon type
//     );

//     context.subscriptions.push(iconCompletionProvider);
// }

// // Get the icon completion items with preview
// async function getIconCompletionItems(iconType: string, extensionPath: string): Promise<vscode.CompletionItem[]> {
//     const iconDir = path.join(extensionPath, 'assets', 'icons', iconType);
//     const iconFiles = fs.readdirSync(iconDir);

//     const completionItems: vscode.CompletionItem[] = iconFiles.map(iconFile => {
//         const iconName = path.basename(iconFile, '.svg');
//         const iconPath = vscode.Uri.file(path.join(iconDir, iconFile));
//         const completionItem = new vscode.CompletionItem(iconName, vscode.CompletionItemKind.File);

//         // Add icon preview in detail
//         completionItem.detail = iconName;
//         completionItem.documentation = new vscode.MarkdownString(`![${iconName}](${iconPath.toString()})`);

//         return completionItem;
//     });

//     return completionItems;
// }

// // Ensure the required icon directories exist, create them if necessary, and copy bundled icons
// function ensureIconDirectories(extensionPath: string): string {
//     // Get the root path of the current Flutter project
//     const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
//     if (!workspaceFolder) {
//         vscode.window.showErrorMessage('No workspace folder found!');
//         return '';
//     }

//     const iconDirPath = path.join(workspaceFolder, 'assets', 'icons');

//     // Create directories for each icon type if they don't exist
//     Object.values(IconType).forEach(type => {
//         const dirPath = path.join(iconDirPath, type.toLowerCase());
//         if (!fs.existsSync(dirPath)) {
//             fs.mkdirSync(dirPath, { recursive: true });

//             // Copy the bundled icons from the extension to the Flutter project
//             const bundledIconPath = path.join(extensionPath, 'assets', 'icons', type.toLowerCase());
//             if (fs.existsSync(bundledIconPath)) {
//                 fse.copySync(bundledIconPath, dirPath); // Copy icons recursively
//             }
//         }
//     });

//     return iconDirPath;
// }

// // Format the icon path based on the language of the current file
// function formatIconPathForLanguage(language: string, iconPath: string): string {
//     switch (language) {
//         case 'html':
//             return `<img src="${iconPath}" alt="icon">`;
//         case 'dart': // For Flutter
//             return `SvgPicture.asset('${iconPath}');`;
//         case 'javascript':
//         case 'typescript':
//             return `import Icon from '${iconPath}';`;
//         default:
//             return iconPath;
//     }
// }

// // Copy an icon from the bundled assets to the required directory
// function copyIconFromBundle(iconType: string, iconName: string, targetPath: string, basePath: string) {
//     const sourcePath = path.join(basePath, 'assets', 'bundle', iconType, `${iconName}.svg`);

//     if (fs.existsSync(sourcePath)) {
//         fs.copyFileSync(sourcePath, targetPath);
//         console.log(`Icon '${iconName}.svg' copied from bundle to ${targetPath}`);
//     } else {
//         console.warn(`Icon '${iconName}.svg' not found in the bundle.`);
//         vscode.window.showWarningMessage(`Icon '${iconName}.svg' not found in the bundle.`);
//     }
// }

// // Deactivate function
// export function deactivate() {
//     console.log('SVG Icon Extension deactivated.');
// }

//? Added Pubspec v1

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';
import * as fse from 'fs-extra';
import * as yaml from 'js-yaml';

// Enum for different icon types
enum IconType {
    Outline = 'outline',
    Duotone = 'duotone',
    Colored = 'colored',
    Solid = 'solid'
}

// Main function to activate the extension
export function activate(context: vscode.ExtensionContext) {
    console.log('SVG Icon Extension activated.');

    // Register the search icon command
    let searchCommand = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {
        console.log('Search Icons command executed.');

        // Ensure icon directories are created
        const iconBasePath = ensureIconDirectories(context.extensionPath);

        // Prompt the user for icon type
        const iconType = await vscode.window.showQuickPick(
            Object.keys(IconType),
            { placeHolder: 'Choose an icon type (outline, duotone, colored, solid)' }
        );

        if (!iconType) {
            return; // User cancelled the operation
        }

        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const completionItems = await getIconCompletionItems(iconType.toLowerCase(), context.extensionPath);

            const iconName = await vscode.window.showQuickPick(
                completionItems.map(item => ({
                    label: item.label.toString(),
                    description: `Preview: ![${item.label}](${item.documentation})`
                })),
                { placeHolder: 'Start typing the icon name...' }
            );

            if (!iconName) {
                return; // User cancelled the operation
            }

            const iconPath = path.join('assets', 'icons', iconType.toLowerCase(), `${iconName.label}.svg`);
            const fullIconPath = path.join(iconBasePath, iconType.toLowerCase(), `${iconName.label}.svg`);

            // Check if the icon exists; if not, copy it from the bundled icons
            if (!fs.existsSync(fullIconPath)) {
                copyIconFromBundle(iconType.toLowerCase(), iconName.label, fullIconPath, context.extensionPath);
            }

            editor.edit(editBuilder => {
                editor.selections.forEach(selection => {
                    editBuilder.replace(selection, iconPath); // Insert the relative path
                });
            });
            vscode.window.showInformationMessage(`Icon path '${iconPath}' inserted successfully!`);

            // Update pubspec.yaml with new icon directories
        updatePubspecWithIconDirectories();

        }
    });

    context.subscriptions.push(searchCommand);

    // Register icon completion provider for supported languages
    const iconCompletionProvider = vscode.languages.registerCompletionItemProvider(
        ['html', 'dart', 'typescript', 'javascript'],
        {
            provideCompletionItems: async (document: vscode.TextDocument, position: vscode.Position) => {
                const lineText = document.lineAt(position).text;
                const iconTypeMatch = Object.keys(IconType).find(type => lineText.includes(type));

                if (!iconTypeMatch) {
                    return [];
                }

                const iconType = iconTypeMatch.toLowerCase();
                const completionItems = await getIconCompletionItems(iconType, context.extensionPath);

                return completionItems;
            }
        },
        ':' // Trigger autocomplete when the user types `:` after typing the icon type
    );

    context.subscriptions.push(iconCompletionProvider);
}

// Get the icon completion items with preview
async function getIconCompletionItems(iconType: string, extensionPath: string): Promise<vscode.CompletionItem[]> {
    const iconDir = path.join(extensionPath, 'assets', 'icons', iconType);
    const iconFiles = fs.readdirSync(iconDir);

    const completionItems: vscode.CompletionItem[] = iconFiles.map(iconFile => {
        const iconName = path.basename(iconFile, '.svg');
        const iconPath = vscode.Uri.file(path.join(iconDir, iconFile));
        const completionItem = new vscode.CompletionItem(iconName, vscode.CompletionItemKind.File);

        // Add icon preview in detail
        completionItem.detail = iconName;
        completionItem.documentation = new vscode.MarkdownString(`![${iconName}](${iconPath.toString()})`);

        return completionItem;
    });

    return completionItems;
}

// Ensure the required icon directories exist, create them if necessary, and copy bundled icons
function ensureIconDirectories(extensionPath: string): string {
    // Get the root path of the current Flutter project
    const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found!');
        return '';
    }

    const iconDirPath = path.join(workspaceFolder, 'assets', 'icons');

    // Create directories for each icon type if they don't exist
    Object.values(IconType).forEach(type => {
        const dirPath = path.join(iconDirPath, type.toLowerCase());
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });

            // Copy the bundled icons from the extension to the Flutter project
            const bundledIconPath = path.join(extensionPath, 'assets', 'icons', type.toLowerCase());
            if (fs.existsSync(bundledIconPath)) {
                fse.copySync(bundledIconPath, dirPath); // Copy icons recursively
            }
        }
    });

    return iconDirPath;
}

// Update pubspec.yaml with new icon directories
function updatePubspecWithIconDirectories() {
    // Get the root path of the current Flutter project
    const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
    if (!workspaceFolder) {
        vscode.window.showErrorMessage('No workspace folder found!');
        return;
    }

    const pubspecPath = path.join(workspaceFolder, 'pubspec.yaml'); // Directly point to the root

    console.log(`Looking for pubspec.yaml at: ${pubspecPath}`);

    if (fs.existsSync(pubspecPath)) {
        const fileContent = fs.readFileSync(pubspecPath, 'utf8');
        const data = yaml.load(fileContent) as any;

        if (!data.assets) {
            data.assets = [];
        }

        // Define icon directories to add
        const iconDirectories = Object.values(IconType).map(type => `assets/icons/${type.toLowerCase()}/`);

        // Add icon directories if they don't already exist
        iconDirectories.forEach(dir => {
            if (!data.assets.includes(dir)) {
                data.assets.push(dir);
            }
        });

        // Write back to pubspec.yaml
        const yamlStr = yaml.dump(data);
        fs.writeFileSync(pubspecPath, yamlStr, 'utf8');
        vscode.window.showInformationMessage('pubspec.yaml updated with new icon directories!');
    } else {
        vscode.window.showErrorMessage('pubspec.yaml not found!');
    }
}


// Copy an icon from the bundled assets to the required directory
function copyIconFromBundle(iconType: string, iconName: string, targetPath: string, basePath: string) {
    const sourcePath = path.join(basePath, 'assets', 'bundle', iconType, `${iconName}.svg`);

    if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Icon '${iconName}.svg' copied from bundle to ${targetPath}`);
    } else {
        console.warn(`Icon '${iconName}.svg' not found in the bundle.`);
        vscode.window.showWarningMessage(`Icon '${iconName}.svg' not found in the bundle.`);
    }
}

// Deactivate function
export function deactivate() {
    console.log('SVG Icon Extension deactivated.');
}


//? v2

// import * as vscode from 'vscode';
// import * as path from 'path';
// import * as fs from 'fs';
// import * as fse from 'fs-extra';
// import * as yaml from 'js-yaml';

// // Enum for different icon types
// enum IconType {
//     Outline = 'outline',
//     Duotone = 'duotone',
//     Colored = 'colored',
//     Solid = 'solid'
// }

// // Main function to activate the extension
// export function activate(context: vscode.ExtensionContext) {
//     console.log('SVG Icon Extension activated.');

//     // Register the search icon command
//     let searchCommand = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {
//         console.log('Search Icons command executed.');

//         // Ensure icon directories are created
//         const iconBasePath = ensureIconDirectories(context.extensionPath);

//         // Update pubspec.yaml with new icon directories
//         updatePubspecWithIconDirectories(iconBasePath);

//         // Prompt the user for icon type
//         const iconType = await vscode.window.showQuickPick(
//             Object.keys(IconType),
//             { placeHolder: 'Choose an icon type (outline, duotone, colored, solid)' }
//         );

//         if (!iconType) {
//             return; // User cancelled the operation
//         }

//         const editor = vscode.window.activeTextEditor;
//         if (editor) {
//             const completionItems = await getIconCompletionItems(iconType.toLowerCase(), context.extensionPath);

//             const iconName = await vscode.window.showQuickPick(
//                 completionItems.map(item => ({
//                     label: item.label.toString(),
//                     description: `Preview: ![${item.label}](${item.documentation})`
//                 })),
//                 { placeHolder: 'Start typing the icon name...' }
//             );

//             if (!iconName) {
//                 return; // User cancelled the operation
//             }

//             const iconPath = path.join('assets', 'icons', iconType.toLowerCase(), `${iconName.label}.svg`);
//             const fullIconPath = path.join(iconBasePath, iconType.toLowerCase(), `${iconName.label}.svg`);

//             // Check if the icon exists; if not, copy it from the bundled icons
//             if (!fs.existsSync(fullIconPath)) {
//                 copyIconFromBundle(iconType.toLowerCase(), iconName.label, fullIconPath, context.extensionPath);
//             }

//             editor.edit(editBuilder => {
//                 editor.selections.forEach(selection => {
//                     editBuilder.replace(selection, iconPath); // Insert the relative path
//                 });
//             });
//             vscode.window.showInformationMessage(`Icon path '${iconPath}' inserted successfully!`);
//         }
//     });

//     context.subscriptions.push(searchCommand);

//     // Register icon completion provider for supported languages
//     const iconCompletionProvider = vscode.languages.registerCompletionItemProvider(
//         ['html', 'dart', 'typescript', 'javascript'],
//         {
//             provideCompletionItems: async (document: vscode.TextDocument, position: vscode.Position) => {
//                 const lineText = document.lineAt(position).text;
//                 const iconTypeMatch = Object.keys(IconType).find(type => lineText.includes(type));

//                 if (!iconTypeMatch) {
//                     return [];
//                 }

//                 const iconType = iconTypeMatch.toLowerCase();
//                 const completionItems = await getIconCompletionItems(iconType, context.extensionPath);

//                 return completionItems;
//             }
//         },
//         ':' // Trigger autocomplete when the user types `:` after typing the icon type
//     );

//     context.subscriptions.push(iconCompletionProvider);
// }

// // Ensure the required icon directories exist, create them if necessary, and copy bundled icons
// function ensureIconDirectories(extensionPath: string): string {
//     // Get the root path of the current Flutter project
//     const workspaceFolder = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0].uri.fsPath : undefined;
//     if (!workspaceFolder) {
//         vscode.window.showErrorMessage('No workspace folder found!');
//         return '';
//     }

//     const iconDirPath = path.join(workspaceFolder, 'assets', 'icons');

//     // Create directories for each icon type if they don't exist
//     Object.values(IconType).forEach(type => {
//         const dirPath = path.join(iconDirPath, type.toLowerCase());
//         if (!fs.existsSync(dirPath)) {
//             fs.mkdirSync(dirPath, { recursive: true });

//             // Copy the bundled icons from the extension to the Flutter project
//             const bundledIconPath = path.join(extensionPath, 'assets', 'icons', type.toLowerCase());
//             if (fs.existsSync(bundledIconPath)) {
//                 fse.copySync(bundledIconPath, dirPath); // Copy icons recursively
//             }
//         }
//     });

//     return iconDirPath;
// }

// // Update pubspec.yaml with new icon directories
// function updatePubspecWithIconDirectories(iconBasePath: string) {
//     const pubspecPath = path.join(iconBasePath, '..', 'pubspec.yaml'); // Get path to pubspec.yaml

//     if (fs.existsSync(pubspecPath)) {
//         const fileContent = fs.readFileSync(pubspecPath, 'utf8');
//         const data = yaml.load(fileContent) as any;

//         if (!data.assets) {
//             data.assets = [];
//         }

//         // Define icon directories to add
//         const iconDirectories = Object.values(IconType).map(type => `assets/icons/${type.toLowerCase()}/`);

//         // Add icon directories if they don't already exist
//         iconDirectories.forEach(dir => {
//             if (!data.assets.includes(dir)) {
//                 data.assets.push(dir);
//             }
//         });

//         // Write back to pubspec.yaml
//         const yamlStr = yaml.dump(data);
//         fs.writeFileSync(pubspecPath, yamlStr, 'utf8');
//         vscode.window.showInformationMessage('pubspec.yaml updated with new icon directories!');
//     } else {
//         vscode.window.showErrorMessage('pubspec.yaml not found!');
//     }
// }

// // Get the icon completion items with preview
// async function getIconCompletionItems(iconType: string, extensionPath: string): Promise<vscode.CompletionItem[]> {
//     const iconDir = path.join(extensionPath, 'assets', 'icons', iconType);
//     const iconFiles = fs.readdirSync(iconDir);

//     const completionItems: vscode.CompletionItem[] = iconFiles.map(iconFile => {
//         const iconName = path.basename(iconFile, '.svg');
//         const iconPath = vscode.Uri.file(path.join(iconDir, iconFile));
//         const completionItem = new vscode.CompletionItem(iconName, vscode.CompletionItemKind.File);

//         // Add icon preview in detail
//         completionItem.detail = iconName;
//         completionItem.documentation = new vscode.MarkdownString(`![${iconName}](${iconPath.toString()})`);

//         return completionItem;
//     });

//     return completionItems;
// }

// // Copy an icon from the bundled assets to the required directory
// function copyIconFromBundle(iconType: string, iconName: string, targetPath: string, basePath: string) {
//     const sourcePath = path.join(basePath, 'assets', 'bundle', iconType, `${iconName}.svg`);

//     if (fs.existsSync(sourcePath)) {
//         fs.copyFileSync(sourcePath, targetPath);
//         console.log(`Icon '${iconName}.svg' copied from bundle to ${targetPath}`);
//     } else {
//         console.warn(`Icon '${iconName}.svg' not found in the bundle.`);
//         vscode.window.showWarningMessage(`Icon '${iconName}.svg' not found in the bundle.`);
//     }
// }

// // Deactivate function
// export function deactivate() {
//     console.log('SVG Icon Extension deactivated.');
// }
