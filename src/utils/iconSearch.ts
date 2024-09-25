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
    // Command to search and insert icons
    let disposable = vscode.commands.registerCommand('svg-icons-extension.searchIcons', async () => {

        // Prompt user to select the icon type (e.g., outline, solid, duotone, colored)
        const iconType = await vscode.window.showQuickPick(
            Object.keys(IconType),
            { placeHolder: 'Choose an icon type (outline, duotone, colored, solid)' }
        );

        if (!iconType) {
            return; // If no icon type selected, exit
        }

        // Prompt user to search for the icon name
        const iconName = await vscode.window.showInputBox({
            placeHolder: 'Enter the icon name (e.g., user, home, camera)',
        });

        if (!iconName) {
            return; // If no icon name entered, exit
        }

        // Construct the icon path based on user input
        const iconPath = path.join(context.extensionPath, 'assets', 'icons', iconType, `${iconName}.svg`);

        // Check if the icon exists
        if (!fs.existsSync(iconPath)) {
            vscode.window.showErrorMessage(`Icon '${iconName}' not found in the '${iconType}' folder.`);
            return;
        }

        // Preview the icon
        previewIcon(iconPath);

        // Generate the Flutter code based on the selected icon type and name
        const flutterCode = generateFlutterIconCode(iconType, iconName);

        // Insert the Flutter code into the active editor
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            editor.edit(editBuilder => {
                editor.selections.forEach(selection => {
                    editBuilder.replace(selection, flutterCode);
                });
            });
            vscode.window.showInformationMessage(`Icon '${iconName}' inserted successfully!`);
        }
    });

    // Autocomplete provider for icon names
    registerCompletionProvider(context);

    context.subscriptions.push(disposable);
}

// Function to generate Flutter icon code
function generateFlutterIconCode(iconType: string, iconName: string): string {
    const iconPath = `assets/icons/${iconType}/${iconName}.svg`;

    // Flutter SvgIcon or SvgPicture code generation based on the icon type
    let flutterCode = '';

    switch (iconType) {
        case IconType.Outline:
        case IconType.Duotone:
        case IconType.Solid:
        case IconType.Colored:
            flutterCode = `
import 'package:flutter_svg/flutter_svg.dart';
import 'package:svgicons/svgicons.dart';

class ${capitalizeFirstLetter(iconName)}Icon extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SvgIcon(
      "${iconPath}",
      color: Colors.black,  // Change color as required
      size: 24.0,           // Adjust size
    );
  }
}
            `;
            break;
        default:
            flutterCode = `
import 'package:flutter_svg/flutter_svg.dart';

class ${capitalizeFirstLetter(iconName)}Icon extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return SvgPicture.asset(
      "${iconPath}",
      color: Colors.black,  // Adjust color
      width: 24.0,          // Adjust width
      height: 24.0,         // Adjust height
    );
  }
}
            `;
    }
    return flutterCode;
}

// Function to preview the icon
function previewIcon(iconPath: string) {
    const panel = vscode.window.createWebviewPanel(
        'svgPreview', // Identifies the type of the webview
        'SVG Icon Preview', // Title of the panel
        vscode.ViewColumn.Two, // Editor column to show the new webview panel in
        {} // Webview options
    );

    // Read SVG content and show it as HTML
    const svgContent = fs.readFileSync(iconPath, 'utf8');
    panel.webview.html = `
      <html>
        <body>
          <div style="display: flex; justify-content: center; align-items: center; height: 100vh;">
            ${svgContent}
          </div>
        </body>
      </html>
    `;
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1);
}

// Register completion provider for icon suggestions
function registerCompletionProvider(context: vscode.ExtensionContext) {
    const provider = vscode.languages.registerCompletionItemProvider(
        { scheme: 'file', language: '*' }, // All file types
        {
            provideCompletionItems(document, position) {
                const line = document.lineAt(position);
                const completionItems: vscode.CompletionItem[] = [];

                const icons = loadIconsFromLocal();

                icons.forEach(icon => {
                    const completionItem = new vscode.CompletionItem(icon, vscode.CompletionItemKind.File);
                    completionItem.insertText = icon;
                    completionItems.push(completionItem);
                });

                return completionItems;
            }
        },
        ':' // Trigger autocomplete after typing ":"
    );

    context.subscriptions.push(provider);
}

// Load icons from local folders
function loadIconsFromLocal(): string[] {
    const icons: string[] = [];
    const baseDir = path.join(__dirname, 'assets', 'icons');

    // Scan the icons folder for icon files
    Object.values(IconType).forEach(type => {
        const typeDir = path.join(baseDir, type);
        if (fs.existsSync(typeDir)) {
            const files = fs.readdirSync(typeDir);
            files.forEach(file => {
                if (file.endsWith('.svg')) {
                    icons.push(file.replace('.svg', ''));
                }
            });
        }
    });

    return icons;
}

// Deactivate function
export function deactivate() {}
