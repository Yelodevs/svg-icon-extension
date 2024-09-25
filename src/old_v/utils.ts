// // import * as vscode from 'vscode';
// // import axios from 'axios';
// // import cheerio from 'cheerio';
// // import * as fs from 'fs';
// // import * as path from 'path';
// // import { AxiosError } from 'axios';

// // // Scrape from Heroicons
// // async function scrapeFromHeroicons(iconName: string): Promise<string | null> {
// //     try {
// //         const response = await axios.get(`https://heroicons.com/search?q=${iconName}`);
// //         const $ = cheerio.load(response.data);
// //         const svgElement = $('svg').first();
// //         return svgElement.length > 0 ? svgElement.html() : null;
// //     } catch (error) {
// //         handleError(error, 'Heroicons');
// //         return null;
// //     }
// // }

// // // Scrape from Feather Icons
// // async function scrapeFromFeatherIcons(iconName: string): Promise<string | null> {
// //     try {
// //         const response = await axios.get(`https://feathericons.com/?search=${iconName}`);
// //         const $ = cheerio.load(response.data);
// //         const svgElement = $('svg').first();
// //         return svgElement.length > 0 ? svgElement.html() : null;
// //     } catch (error) {
// //         handleError(error, 'Feather Icons');
// //         return null;
// //     }
// // }

// // // Scrape from Material Design Icons
// // async function scrapeFromMaterialIcons(iconName: string): Promise<string | null> {
// //     try {
// //         const response = await axios.get(`https://materialdesignicons.com/search/${iconName}`);
// //         const $ = cheerio.load(response.data);
// //         const svgElement = $('svg').first();
// //         return svgElement.length > 0 ? svgElement.html() : null;
// //     } catch (error) {
// //         handleError(error, 'Material Design Icons');
// //         return null;
// //     }
// // }

// // // Handle errors
// // function handleError(error: unknown, source: string) {
// //     if (error instanceof AxiosError) {
// //         vscode.window.showErrorMessage(`Error scraping ${source}: ${error.message}`);
// //     } else {
// //         vscode.window.showErrorMessage(`An unknown error occurred while scraping ${source}`);
// //     }
// // }

// // // Main function to scrape icons from multiple sources
// // export async function scrapeSvgIconsFromWebsite(iconName: string): Promise<{ svg: string; source: string } | null> {
// //     const heroiconsSvg = await scrapeFromHeroicons(iconName);
// //     if (heroiconsSvg) {
// //         return { svg: heroiconsSvg, source: 'Heroicons' };
// //     }

// //     const featherSvg = await scrapeFromFeatherIcons(iconName);
// //     if (featherSvg) {
// //         return { svg: featherSvg, source: 'Feather Icons' };
// //     }

// //     const materialSvg = await scrapeFromMaterialIcons(iconName);
// //     if (materialSvg) {
// //         return { svg: materialSvg, source: 'Material Design Icons' };
// //     }

// //     return null;
// // }

// // // Save SVG to the local assets/icons folder
// // // Save SVG to the local assets/icons folder
// // export function saveSvgToAssets(iconName: string, svgCode: string): string {
// //     const iconDir = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, 'assets', 'icons');
// //     if (!fs.existsSync(iconDir)) {
// //         fs.mkdirSync(iconDir, { recursive: true });
// //     }
// //     const iconPath = path.join(iconDir, `${iconName}.svg`);
// //     fs.writeFileSync(iconPath, svgCode, 'utf8');
// //     return iconPath;
// // }

// // // Update pubspec.yaml for Flutter projects
// // export function updatePubspecYaml(iconPath: string) {
// //     const workspaceFolder = vscode.workspace.workspaceFolders?.[0]?.uri.fsPath;

// //     if (!workspaceFolder) {
// //         throw new Error("No workspace folder found.");
// //     }

// //     const pubspecPath = path.join(workspaceFolder, 'pubspec.yaml');

// //     if (fs.existsSync(pubspecPath)) {
// //         try {
// //             const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');
// //             if (!pubspecContent.includes('assets/icons')) {
// //                 const updatedContent = pubspecContent + `\n  - ${iconPath}`;
// //                 fs.writeFileSync(pubspecPath, updatedContent, 'utf8');
// //             }

// //         } catch (err: unknown) {
// //             if (err instanceof Error) {
// //                 console.error(err.message);
// //             } else {
// //                 console.error("An unknown error occurred.");
// //             }
// //         }
// //     }
// // }


// //? Testing
// import * as fs from 'fs';
// import * as path from 'path';
// import * as vscode from 'vscode';
// import axios from 'axios';
// import cheerio from 'cheerio';

// // Scrapes SVG icons from a website like Heroicons
// export async function scrapeSvgIconsFromWebsite(iconName: string): Promise<string | null> {
//     try {
//         const response = await axios.get(`https://heroicons.com/search?q=${iconName}`);
//         const $ = cheerio.load(response.data);

//         const svgElement = $('svg').first(); // Adjust to fit the site structure

//         return svgElement ? svgElement.html() : null;
//     } catch (error) {
//         vscode.window.showErrorMessage(`Error scraping icons: }`);
//         return null;
//     }
// }

// // Ensures that the assets/icons folder exists
// export function ensureAssetsFolderExists() {
//     const assetsDir = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, 'assets', 'icons');
//     if (!fs.existsSync(assetsDir)) {
//         fs.mkdirSync(assetsDir, { recursive: true });
//     }
// }

// // Saves SVG code to the assets/icons folder
// export function saveSvgToAssets(iconName: string, svgCode: string): string {
//     const iconPath = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, 'assets', 'icons', `${iconName}.svg`);
//     fs.writeFileSync(iconPath, svgCode, 'utf8');
//     return iconPath;
// }

// // Updates the Flutter pubspec.yaml to include new icons
// export function updatePubspecYaml(iconPath: string) {
//     const pubspecPath = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, 'pubspec.yaml');

//     if (fs.existsSync(pubspecPath)) {
//         const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');
//         if (!pubspecContent.includes('assets/icons')) {
//             const updatedContent = pubspecContent + `\n  - ${iconPath}`;
//             fs.writeFileSync(pubspecPath, updatedContent, 'utf8');
//         }
//     }
// }
