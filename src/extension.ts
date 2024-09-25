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

// // Main function to activate extension
// export function activate(context: vscode.ExtensionContext) {

//     let disposable = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {

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
//         const iconPath = path.join('assets', 'icons', iconType, `${iconName}.svg`);

//         // Full path to check if the file exists
//         const fullPath = path.join(context.extensionPath, iconPath);

//         // Check if the icon exists
//         if (!fs.existsSync(fullPath)) {
//             vscode.window.showErrorMessage(`Icon '${iconName}' not found in the '${iconType}' folder.`);
//             return;
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

// // Deactivate function
// export function deactivate() {}


// updates added

// import * as vscode from 'vscode';
// import * as path from 'path';
// import * as fs from 'fs';
// import axios from 'axios'; // For web scraping
// import { optimize } from 'svgo'; // For SVG optimization

// // Enum for different icon types and packs
// enum IconType {
//     Outline = 'outline',
//     Duotone = 'duotone',
//     Colored = 'colored',
//     Solid = 'solid'
// }

// enum IconPack {
//     Material = 'material',
//     FontAwesome = 'fontawesome',
//     Feather = 'feather',
//     Custom = 'custom' // For external or custom icon packs
// }

// // Main function to activate the extension
// export function activate(context: vscode.ExtensionContext) {
//     let disposable = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {

//         // Ensure icon directories are created
//         const iconBasePath = ensureIconDirectories(context.extensionPath);

//         // Choose the icon pack first
//         const iconPack = await vscode.window.showQuickPick(
//             Object.keys(IconPack),
//             { placeHolder: 'Choose an icon pack (Material, FontAwesome, Feather, etc.)' }
//         );

//         if (!iconPack) return; // User cancelled

//         // Choose the icon type
//         const iconType = await vscode.window.showQuickPick(
//             Object.keys(IconType),
//             { placeHolder: 'Choose an icon type (outline, duotone, colored, solid)' }
//         );

//         if (!iconType) return; // User cancelled

//         // Prompt the user for icon name
//         const iconName = await vscode.window.showInputBox({
//             placeHolder: 'Enter the icon name (e.g., user, home, camera)',
//         });

//         if (!iconName) return; // User cancelled

//         // Show icon previews (by loading icons and creating previews)
//         const fullIconPath = path.join(iconBasePath, iconPack.toLowerCase(), iconType.toLowerCase(), `${iconName}.svg`);
//         if (!fs.existsSync(fullIconPath)) {
//             vscode.window.showErrorMessage(`Icon '${iconName}' not found in the selected pack!`);
//             return;
//         }

//         // Load icon preview
//         const iconPreview = createIconPreview(fullIconPath);

//         // Customize the icon (color, size, etc.)
//         const customAttributes = await customizeIcon();

//         // Insert the relative path automatically
//         const iconPath = path.relative(vscode.workspace.rootPath || '', fullIconPath);

//         // Insert into the editor
//         const editor = vscode.window.activeTextEditor;
//         if (editor) {
//             editor.edit(editBuilder => {
//                 editor.selections.forEach(selection => {
//                     editBuilder.replace(selection, `<img src="${iconPath}" ${customAttributes}/>`); // Insert the path with customization
//                 });
//             });
//             vscode.window.showInformationMessage(`Icon inserted with customization!`);
//         }
//     });

//     context.subscriptions.push(disposable);
// }

// // Ensure the required icon directories exist, create them if necessary
// function ensureIconDirectories(basePath: string): string {
//     const iconDirPath = path.join(basePath, 'assets', 'icons');
//     Object.values(IconPack).forEach(pack => {
//         Object.values(IconType).forEach(type => {
//             const dirPath = path.join(iconDirPath, pack.toLowerCase(), type.toLowerCase());
//             if (!fs.existsSync(dirPath)) {
//                 fs.mkdirSync(dirPath, { recursive: true });
//             }
//         });
//     });
//     return iconDirPath;
// }

// // Fetch the icon from the web (external sources)
// async function fetchIconFromWeb(pack: string, iconName: string, iconType: string): Promise<string> {
//     const iconUrl = `https://example.com/icons/${pack}/${iconType}/${iconName}.svg`;

//     try {
//         const response = await axios.get(iconUrl);
//         const iconData = response.data;

//         // Save the icon data to the appropriate local directory
//         const iconPath = path.join('assets', 'icons', pack, iconType, `${iconName}.svg`);
//         fs.writeFileSync(iconPath, iconData, 'utf8');

//         return iconPath;
//     } catch (error) {
//         const errorMessage = (error as Error).message;
//         vscode.window.showErrorMessage(`Failed to fetch icon: ${errorMessage}`);
//         return '';
//     }
// }

// // Create an icon preview from the SVG
// function createIconPreview(iconPath: string): string {
//     const svgContent = fs.readFileSync(iconPath, 'utf8');
//     const svgBase64 = Buffer.from(svgContent).toString('base64');
//     const dataUri = `data:image/svg+xml;base64,${svgBase64}`;

//     // Display preview
//     vscode.window.showInformationMessage(`Preview: ${dataUri}`, { modal: true });
//     return dataUri;
// }

// // Allow users to customize the icon (color, size)
// async function customizeIcon(): Promise<string> {
//     const color = await vscode.window.showInputBox({ placeHolder: 'Enter the fill color (e.g., #ff0000)' });
//     const width = await vscode.window.showInputBox({ placeHolder: 'Enter the width (e.g., 24px)' });
//     const height = await vscode.window.showInputBox({ placeHolder: 'Enter the height (e.g., 24px)' });

//     const attributes: string[] = [];
//     if (color) attributes.push(`fill="${color}"`);
//     if (width) attributes.push(`width="${width}"`);
//     if (height) attributes.push(`height="${height}"`);

//     return attributes.join(' ');
// }

// // Optimize the SVG to reduce file size
// function optimizeSvg(svgContent: string): string {
//     const optimizedSvg = optimize(svgContent, {
//         multipass: true,
//         plugins: [
//             {
//                 name: 'preset-default',
//                 params: {
//                     overrides: {
//                         removeViewBox: false, // Disable removeViewBox plugin
//                     },
//                 },
//             },
//         ],
//     });
//     return optimizedSvg.data;
// }

// // Deactivate function
// export function deactivate() {}



// import * as vscode from 'vscode';
// import * as path from 'path';
// import * as fs from 'fs';
// import axios from 'axios'; // For web scraping
// import { optimize } from 'svgo'; // For SVG optimization

// // Enum for different icon types and packs
// enum IconType {
//     Outline = 'outline',
//     Duotone = 'duotone',
//     Colored = 'colored',
//     Solid = 'solid'
// }

// enum IconPack {
//     Material = 'material',
//     FontAwesome = 'fontawesome',
//     Feather = 'feather',
//     Custom = 'custom' // For external or custom icon packs
// }

// // Main function to activate the extension
// export function activate(context: vscode.ExtensionContext) {
//     let disposable = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {

//         // Ensure icon directories are created
//         const iconBasePath = ensureIconDirectories(context.extensionPath);

//         // Choose the icon pack first
//         const iconPack = await vscode.window.showQuickPick(
//             Object.keys(IconPack),
//             { placeHolder: 'Choose an icon pack (Material, FontAwesome, Feather, etc.)' }
//         );

//         if (!iconPack) return; // User cancelled

//         // Choose the icon type
//         const iconType = await vscode.window.showQuickPick(
//             Object.keys(IconType),
//             { placeHolder: 'Choose an icon type (outline, duotone, colored, solid)' }
//         );

//         if (!iconType) return; // User cancelled

//         // Prompt the user for icon name
//         const iconName = await vscode.window.showInputBox({
//             placeHolder: 'Enter the icon name (e.g., user, home, camera)',
//         });

//         if (!iconName) return; // User cancelled

//         // Show icon previews (by loading icons and creating previews)
//         const fullIconPath = path.join(iconBasePath, iconPack.toLowerCase(), iconType.toLowerCase(), `${iconName}.svg`);
//         if (!fs.existsSync(fullIconPath)) {
//             vscode.window.showErrorMessage(`Icon '${iconName}' not found in the selected pack!`);
//             return;
//         }

//         // Load icon preview
//         const iconPreview = createIconPreview(fullIconPath);

//         // Customize the icon (color, size, etc.)
//         const customAttributes = await customizeIcon();

//         // Insert the relative path automatically
//         const iconPath = path.relative(vscode.workspace.rootPath || '', fullIconPath);

//         // Insert into the editor
//         const editor = vscode.window.activeTextEditor;
//         if (editor) {
//             editor.edit(editBuilder => {
//                 editor.selections.forEach(selection => {
//                     editBuilder.replace(selection, `<img src="${iconPath}" ${customAttributes}/>`); // Insert the path with customization
//                 });
//             });
//             vscode.window.showInformationMessage(`Icon inserted with customization!`);
//         }
//     });

//     // Add command to list available icons
//     let listIconsCommand = vscode.commands.registerCommand('svg-icons-extension.listIcons', async () => {
//         const iconType = await vscode.window.showQuickPick(Object.keys(IconType), { placeHolder: 'Choose an icon type' });
//         if (iconType) {
//             const iconDir = path.join(context.extensionPath, 'assets', 'icons', iconType.toLowerCase());
//             if (fs.existsSync(iconDir)) {
//                 const icons = fs.readdirSync(iconDir).filter(file => file.endsWith('.svg')).map(file => file.replace('.svg', ''));
//                 vscode.window.showInformationMessage(`Available icons in '${iconType}': ${icons.join(', ')}`);
//             } else {
//                 vscode.window.showErrorMessage(`No icons found for type '${iconType}'.`);
//             }
//         }
//     });

//     context.subscriptions.push(disposable, listIconsCommand);
// }

// // Ensure the required icon directories exist, create them if necessary
// function ensureIconDirectories(basePath: string): string {
//     const iconDirPath = path.join(basePath, 'assets', 'icons');
//     Object.values(IconPack).forEach(pack => {
//         Object.values(IconType).forEach(type => {
//             const dirPath = path.join(iconDirPath, pack.toLowerCase(), type.toLowerCase());
//             if (!fs.existsSync(dirPath)) {
//                 fs.mkdirSync(dirPath, { recursive: true });
//             }
//         });
//     });
//     return iconDirPath;
// }

// // Create an icon preview from the SVG
// function createIconPreview(iconPath: string): string {
//     const svgContent = fs.readFileSync(iconPath, 'utf8');
//     const svgBase64 = Buffer.from(svgContent).toString('base64');
//     const dataUri = `data:image/svg+xml;base64,${svgBase64}`;

//     // Display preview
//     vscode.window.showInformationMessage(`Preview: ${dataUri}`, { modal: true });
//     return dataUri;
// }

// // Allow users to customize the icon (color, size)
// async function customizeIcon(): Promise<string> {
//     const color = await vscode.window.showInputBox({ placeHolder: 'Enter the fill color (e.g., #ff0000)' });
//     const width = await vscode.window.showInputBox({ placeHolder: 'Enter the width (e.g., 24px)' });
//     const height = await vscode.window.showInputBox({ placeHolder: 'Enter the height (e.g., 24px)' });

//     const attributes: string[] = [];
//     if (color) attributes.push(`fill="${color}"`);
//     if (width) attributes.push(`width="${width}"`);
//     if (height) attributes.push(`height="${height}"`);

//     return attributes.join(' ');
// }

// // Optimize the SVG to reduce file size
// function optimizeSvg(svgContent: string): string {
//     const optimizedSvg = optimize(svgContent, {
//         multipass: true,
//         plugins: [
//             {
//                 name: 'preset-default',
//                 params: {
//                     overrides: {
//                         removeViewBox: false, // Disable removeViewBox plugin
//                     },
//                 },
//             },
//         ],
//     });
//     return optimizedSvg.data;
// }

// // Deactivate function
// export function deactivate() {}



//? auto dir create

import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// Enum for different icon types
enum IconType {
    Outline = 'outline',
    Duotone = 'duotone',
    Colored = 'colored',
    Solid = 'solid'
}

// Main function to activate extension
export function activate(context: vscode.ExtensionContext) {
    let disposable = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {

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

        // Prompt the user for icon name
        const iconName = await vscode.window.showInputBox({
            placeHolder: 'Enter the icon name (e.g., user, home, camera)',
        });

        if (!iconName) {
            return; // User cancelled the operation
        }

        // Construct the icon path based on the type and name
        const iconPath = path.join('assets', 'icons', iconType.toLowerCase(), `${iconName}.svg`);
        const fullIconPath = path.join(iconBasePath, iconType.toLowerCase(), `${iconName}.svg`);

        // Check if the icon exists; if not, create a placeholder file (for demonstration purposes)
        if (!fs.existsSync(fullIconPath)) {
            createPlaceholderIcon(fullIconPath);
        }

        // Insert the relative icon path into the active editor
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit(editBuilder => {
                editor.selections.forEach(selection => {
                    editBuilder.replace(selection, iconPath); // Insert the relative path
                });
            });
            vscode.window.showInformationMessage(`Icon path '${iconPath}' inserted successfully!`);
        }
    });

    context.subscriptions.push(disposable);
}

// Ensure the required icon directories exist, create them if necessary
function ensureIconDirectories(basePath: string): string {
    const iconDirPath = path.join(basePath, 'assets', 'icons');

    // Create directories for each icon type if they don't exist
    Object.values(IconType).forEach(type => {
        const dirPath = path.join(iconDirPath, type.toLowerCase());
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }
    });

    return iconDirPath;
}

// Create a simple placeholder SVG icon file if the icon doesn't exist
function createPlaceholderIcon(filePath: string) {
    const placeholderSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
        <rect width="100" height="100" fill="gray"/>
        <text x="10" y="50" font-size="12" fill="white">Placeholder</text>
    </svg>`;

    fs.writeFileSync(filePath, placeholderSvg, 'utf8');
}

// Deactivate function
export function deactivate() {}
