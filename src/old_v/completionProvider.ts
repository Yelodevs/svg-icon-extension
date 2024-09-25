// import * as vscode from 'vscode';
// import { getIcons } from './iconService';

// export function registerCompletionProvider(context: vscode.ExtensionContext) {
//     const provider = vscode.languages.registerCompletionItemProvider(
//         ['html', 'dart', 'typescript', 'javascript'],
//         {
//             async provideCompletionItems(document: vscode.TextDocument, position: vscode.Position) {
//                 const query = document.getText(document.getWordRangeAtPosition(position));
//                 const icons = await getIcons(context, query);

//                 const completionItems: vscode.CompletionItem[] = icons.map(icon => {
//                     const item = new vscode.CompletionItem(icon.label, vscode.CompletionItemKind.Snippet);
//                     item.insertText = new vscode.SnippetString(icon.svg);
//                     item.documentation = new vscode.MarkdownString(`![icon](${icon.svg})`);
//                     return item;
//                 });

//                 return completionItems;
//             }
//         }
//     );

//     context.subscriptions.push(provider);
// }
