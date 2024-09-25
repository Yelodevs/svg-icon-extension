import * as vscode from 'vscode';
import axios from 'axios';
import cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';
import { AxiosError } from 'axios';

// Scrape from Heroicons
async function scrapeFromHeroicons(iconName: string): Promise<string | null> {
    try {
        const response = await axios.get(`https://heroicons.com/search?q=${iconName}`);
        const $ = cheerio.load(response.data);
        const svgElement = $('svg').first();
        return svgElement ? svgElement.html() : null;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          vscode.window.showErrorMessage(`Error scraping Heroicons: ${error.message}`);
        } else {
          vscode.window.showErrorMessage(`An unknown error occurred while scraping Heroicons`);
        }
        return null;
      }
}

// Scrape from Feather Icons
async function scrapeFromFeatherIcons(iconName: string): Promise<string | null> {
    try {
        const response = await axios.get(`https://feathericons.com/?search=${iconName}`);
        const $ = cheerio.load(response.data);
        const svgElement = $('svg').first();
        return svgElement ? svgElement.html() : null;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          vscode.window.showErrorMessage(`Error scraping Heroicons: ${error.message}`);
        } else {
          vscode.window.showErrorMessage(`An unknown error occurred while scraping Heroicons`);
        }
        return null;
      }
}

// Scrape from Material Design Icons
async function scrapeFromMaterialIcons(iconName: string): Promise<string | null> {
    try {
        const response = await axios.get(`https://materialdesignicons.com/search/${iconName}`);
        const $ = cheerio.load(response.data);
        const svgElement = $('svg').first();
        return svgElement ? svgElement.html() : null;
    } catch (error: unknown) {
        if (error instanceof AxiosError) {
          vscode.window.showErrorMessage(`Error scraping Heroicons: ${error.message}`);
        } else {
          vscode.window.showErrorMessage(`An unknown error occurred while scraping Heroicons`);
        }
        return null;
      }
}

// Main function to scrape icons from multiple sources
export async function scrapeSvgIconsFromWebsite(iconName: string): Promise<{ svg: string, source: string } | null> {
    const heroiconsSvg = await scrapeFromHeroicons(iconName);
    if (heroiconsSvg) {
        return { svg: heroiconsSvg, source: 'Heroicons' };
    }

    const featherSvg = await scrapeFromFeatherIcons(iconName);
    if (featherSvg) {
        return { svg: featherSvg, source: 'Feather Icons' };
    }

    const materialSvg = await scrapeFromMaterialIcons(iconName);
    if (materialSvg) {
        return { svg: materialSvg, source: 'Material Design Icons' };
    }

    return null;
}

// Save SVG to the local assets/icons folder
export function saveSvgToAssets(iconName: string, svgCode: string): string {
    const iconDir = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, 'assets', 'icons');
    if (!fs.existsSync(iconDir)) {
        fs.mkdirSync(iconDir, { recursive: true });
    }
    const iconPath = path.join(iconDir, `${iconName}.svg`);
    fs.writeFileSync(iconPath, svgCode, 'utf8');
    return iconPath;
}

// Update pubspec.yaml for Flutter projects
export function updatePubspecYaml(iconPath: string) {
    const pubspecPath = path.join(vscode.workspace.workspaceFolders![0].uri.fsPath, 'pubspec.yaml');
    if (fs.existsSync(pubspecPath)) {
        const pubspecContent = fs.readFileSync(pubspecPath, 'utf8');
        if (!pubspecContent.includes('assets/icons')) {
            const updatedContent = pubspecContent + `\n  - ${iconPath}`;
            fs.writeFileSync(pubspecPath, updatedContent, 'utf8');
        }
    }
}
