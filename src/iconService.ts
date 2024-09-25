import * as vscode from 'vscode';
import axios from 'axios';

const iconLibraries: { [key: string]: (query: string) => string } = {
    heroicons: (query: string) => `https://heroicons.com/search?q=${query}`,
    feather: (query: string) => `https://feathericons.com/icons?q=${query}`,
    material: (query: string) => `https://material.io/icons?q=${query}`,
    fontAwesome: (query: string) => `https://fontawesome.com/search?q=${query}`,
    octicons: (query: string) => `https://primer.style/octicons/search?q=${query}`
};

export interface Icon {
    label: string;
    svg: string;
    url?: string;
    className?: string;
}

export async function getIcons(context: vscode.ExtensionContext, query: string): Promise<Icon[]> {
    const cacheKey = `svg-icons-${query}`;
    let icons = context.globalState.get<Icon[]>(cacheKey);

    if (!icons) {
        icons = await fetchIconsFromWeb(query);
        context.globalState.update(cacheKey, icons);
    }

    return icons || [];
}

export async function fetchIconsFromWeb(query: string): Promise<Icon[]> {
    const icons: Icon[] = [];

    for (const library in iconLibraries) {
        try {
            const response = await axios.get(iconLibraries[library](query));
            const fetchedIcons = parseIconsFromHTML(response.data, library);
            icons.push(...fetchedIcons);
        } catch (error) {
            console.error(`Failed to fetch icons from ${library}`, error);
        }
    }

    return icons;
}

function parseIconsFromHTML(html: string, library: string): Icon[] {
    // Simplified parsing logic, adapt based on real HTML structure
    const icons: Icon[] = [];

    const regex = /<svg.*?<\/svg>/g;
    const matches = html.match(regex);

    if (matches) {
        matches.forEach(svg => {
            icons.push({ label: `${library}-icon`, svg });
        });
    }

    return icons;
}
