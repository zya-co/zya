// ES Module wrapper for color-string
// Webpack will handle the CommonJS -> ESM conversion
import * as colorStringModule from 'color-string';

// Handle both default export and namespace import
const colorString = colorStringModule.default || colorStringModule;

export const get = colorString.get;
export const to = colorString.to;
export default colorString;

