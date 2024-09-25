# SVG Icon Extension

## Why This Extension?
The **SVG Icon Extension** provides developers with easy access to SVG icons from local folders. This eliminates the need for web scraping or external API calls, enhancing performance and reliability. By categorizing icons into `outline`, `duotone`, `colored`, and `solid`, users can quickly find the right icon for their project.

## Benefits
- **Local Storage**: Icons are stored locally, ensuring fast access and no internet dependency.
- **Categorization**: Icons are organized into categories, making it easier to find what you need.
- **Easy Integration**: Provides code snippets for various programming languages, allowing quick insertion of icons into your projects.
- **Simplicity**: User-friendly commands and keybindings make the extension easy to use for everyone, regardless of skill level.

## Getting Started
### Installation
1. Open Visual Studio Code.
2. Go to the Extensions view by clicking on the Extensions icon in the Activity Bar or pressing `Ctrl+Shift+X`.
3. Search for `SVG Icon Extension` and click the install button.

### Usage
1. **Search for Icons**:
   - Use the command palette (`Ctrl+Shift+P`) and type **Search SVG Icons**.
   - Enter the icon name you wish to find (e.g., `home`, `user`) and choose the desired category.

2. **Insert Icons Using Snippets**:
   - Snippets are available for different languages. To use them:
     - **HTML**:
       ```html
       <img src="path/to/icon.svg" alt="Icon description" />
       ```
     - **JavaScript/TypeScript**:
       ```javascript
       const icon = require('path/to/icon.svg');
       console.log(icon);
       ```
     - **Dart (Flutter)**:
       ```dart
       Image.asset('assets/icons/outline/icon_name.svg');
       ```
     - **Flutter**:
       ```dart
       SvgPicture.asset('assets/icons/solid/icon_name.svg');
       ```

   - You can access snippets by typing the snippet prefix in the respective file. Snippets will auto-suggest as you type.

## Further Updates
Future updates will include:
- Adding more icon categories and a broader range of icons.
- Enhancements to the search functionality, making it more intuitive.
- Integration of user-requested features based on feedback.

## Contributing
If you have suggestions or find issues with the extension, feel free to open an issue or a pull request on the [GitHub repository](https://github.com/Linxford/svg-icon-extension).

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

# WIP
