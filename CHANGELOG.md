
# SVG Icon Extension Changelog

All notable changes to this project will be documented in this file.
## [1.0.05] - 2024-09-28
- Refactor icon name to remove [(copy 1)]
- Removed duplicates

## [1.0.04] - 2024-09-27

### Added
- Autocomplete: Type `:iconType` (e.g., `bold:iconName`) to get autocompletion and preview for icons.
- Feature to browse and search SVG icons by type (outline, duotone, colored, solid)
- Icon preview functionality in the selection menu
- Management of icon assets in Flutter projects
- Automatically creates icon directories in the Flutter project's `assets/icons` folder.
- Updates `pubspec.yaml` to include new icon directories for assets.
- Easy insertion of SVG icons into code with previews.
- Added more svg icons of diff types
- Icons structure changed to [`outline, linear, bold, broken, twotone`]


### Changed
- Improved icon preview by hiding file paths and showing only the icon in the selection menu
- Corrected the path resolution for `pubspec.yaml` to point to the root of the project.
- Ensured the icon paths are correctly formatted for different languages (Dart, HTML, JavaScript).

### Fixed
- Issue with duplicate entries being added to pubspec.yaml

## [1.0.03] - 2024-09-25

### Added
- Support for accessing local SVG icons in multiple categories: outline, duotone, colored, solid.
- Code snippets for Flutter (Dart), HTML, TypeScript, and JavaScript to insert SVG icons.
- Icon search functionality to browse local icons from the `assets/icons/` folder.

### Removed
- Removed web scraping functionality for external SVG icons.

## [1.0.02] - 2024-09-20

### Added
- Web scraping functionality for fetching SVG icons from external sources.
- Basic snippet support for HTML and JavaScript.

## [1.0.01] - 2024-09-15

### Added
- Initial release with basic support for searching SVG icons.
