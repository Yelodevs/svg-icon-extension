import * as vscode from 'vscode';
import { getIcons, fetchIconsFromWeb } from './iconService';
import { registerCompletionProvider } from './completionProvider';

export function activate(context: vscode.ExtensionContext) {
    // Command to search and insert SVG icons
    let disposable = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {
        const query = await vscode.window.showInputBox({ prompt: 'Search for SVG Icons' });

        if (query) {
            const icons = await getIcons(context, query);
            if (icons.length === 0) {
                vscode.window.showInformationMessage('No icons found!');
                return;
            }

            const iconLabels = icons.map(icon => icon.label);
            const selectedIconLabel = await vscode.window.showQuickPick(iconLabels);

            if (selectedIconLabel) {
                const selectedIcon = icons.find(icon => icon.label === selectedIconLabel);
                if (selectedIcon) {
                    const editor = vscode.window.activeTextEditor;
                    if (editor) {
                        editor.edit(editBuilder => {
                            editBuilder.insert(editor.selection.active, selectedIcon.svg);
                        });
                    }
                }
            }
        }
    });

    // Register completion provider for icon suggestions with previews
    registerCompletionProvider(context);

    context.subscriptions.push(disposable);
}

export function deactivate() {}




// import * as vscode from 'vscode';
// import { scrapeSvgIconsFromWebsite, saveSvgToAssets, updatePubspecYaml } from './utils';

// export function activate(context: vscode.ExtensionContext) {
//     vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {
//         const iconName = await vscode.window.showInputBox({ placeHolder: 'Search for an icon (e.g., user, home, etc.)' });

//         if (!iconName) {
//             return;
//         }

//         const iconData = await scrapeSvgIconsFromWebsite(iconName);

//         if (iconData && iconData.svg) {
//             const savedIconPath = saveSvgToAssets(iconName, iconData.svg);
//             vscode.window.showInformationMessage(`Icon '${iconName}' saved from ${iconData.source} to assets/icons/${iconName}.svg`);

//             updatePubspecYaml(savedIconPath); // Update Flutter pubspec.yaml
//         } else {
//             vscode.window.showErrorMessage(`Icon '${iconName}' not found!`);
//         }
//     });
// }



// //? Testing
// import * as vscode from 'vscode';
// import * as fs from 'fs';
// import * as path from 'path';
// import { scrapeSvgIconsFromWebsite, ensureAssetsFolderExists, saveSvgToAssets, updatePubspecYaml } from './utils';
// import { IconCompletionItemProvider } from './iconAutocompleteProvider';

// // Function to register the icon autocomplete provider
// function registerIconCompletionProvider(context: vscode.ExtensionContext) {
//     const cache = loadCache();
//     const provider = new IconCompletionItemProvider(cache);

//     context.subscriptions.push(
//         vscode.languages.registerCompletionItemProvider(
//             { scheme: 'file', language: 'dart' }, // Flutter files for now
//             provider,
//             ':' // Trigger completion after colon
//         )
//     );
// }

// // Activation function for the extension
// export function activate(context: vscode.ExtensionContext) {
//     vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {
//         const iconName = await vscode.window.showInputBox({ placeHolder: 'Search for an icon (e.g., user, home, etc.)' });

//         if (!iconName) {
//             return;
//         }

//         const iconSvg = await scrapeSvgIconsFromWebsite(iconName);

//         if (iconSvg) {
//             ensureAssetsFolderExists();
//             const savedIconPath = saveSvgToAssets(iconName, iconSvg);
//             updatePubspecYaml(savedIconPath); // Update pubspec.yaml for Flutter

//             vscode.window.showInformationMessage(`Icon '${iconName}' saved to assets/icons/${iconName}.svg`);
//         } else {
//             vscode.window.showErrorMessage(`Icon '${iconName}' not found!`);
//         }
//     });

//     // Register autocomplete
//     registerIconCompletionProvider(context);
// }

// // Function to load cached icons
// function loadCache(): Record<string, string> {
//     const cachePath = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, '.vscode', 'iconCache.json');

//     if (fs.existsSync(cachePath)) {
//         return JSON.parse(fs.readFileSync(cachePath, 'utf8'));
//     }

//     return {};
// }
