// // import * as vscode from 'vscode';

// // export class IconCompletionItemProvider implements vscode.CompletionItemProvider {
// //     private iconsCache: Record<string, string>;

// //     constructor(iconsCache: Record<string, string>) {
// //         this.iconsCache = iconsCache;
// //     }

// //     provideCompletionItems(): vscode.CompletionItem[] {
// //         const completionItems: vscode.CompletionItem[] = [];

// //         for (const [iconName, svgCode] of Object.entries(this.iconsCache)) {
// //             const item = new vscode.CompletionItem(iconName, vscode.CompletionItemKind.Snippet);
// //             item.documentation = new vscode.MarkdownString(`![${iconName}](data:image/svg+xml;base64,${Buffer.from(svgCode).toString('base64')})`);
// //             item.insertText = `SvgIcon("assets/icons/${iconName}.svg")`; // For Flutter users
// //             completionItems.push(item);
// //         }

// //         return completionItems;
// //     }
// // }


// //? Testing

// import * as vscode from 'vscode';

// export class IconCompletionItemProvider implements vscode.CompletionItemProvider {
//     private iconsCache: Record<string, string>;

//     constructor(iconsCache: Record<string, string>) {
//         this.iconsCache = iconsCache;
//     }

//     provideCompletionItems(): vscode.CompletionItem[] {
//         const completionItems: vscode.CompletionItem[] = [];

//         for (const [iconName, svgCode] of Object.entries(this.iconsCache)) {
//             const item = new vscode.CompletionItem(iconName, vscode.CompletionItemKind.Snippet);
//             item.documentation = new vscode.MarkdownString(`![${iconName}](data:image/svg+xml;base64,${Buffer.from(svgCode).toString('base64')})`);
//             item.insertText = `SvgIcon("assets/icons/${iconName}.svg")`; // For Flutter users
//             completionItems.push(item);
//         }

//         return completionItems;
//     }
// }
