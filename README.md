# color-utili

This is a collection of utility functions to deal with color value (hex code and rgb).

## Installation

```bash
$ npm install --save color-utili
```

## List of functions

### `hexToRgb`

Convert a color from hex color format to rgb format.

This function accepts a 6 or 3 character hex alphanumeric value, with or without `#` character (valid: #123456, #fe2, 58a510, 6e8).

It returns an RGB value in `string`, parts of the value are separated by a comma trailing space character.

Passing an invalid hex format will cause this function throws an error.

```javascript
hexToRgb("#fe256d"); // 254, 37, 109
```

### `isDarkColor`

Check if the color is dark or bright.

This function accepts a 6 or 3 character hex alphanumeric value, with or without starting `#` character (valid: #123456, #fe2, 58a510, 6e8). Or an RGB value as 3 arguments.

It returns `true` if this is a dark color, otherwise it returns `false`.

Passing an invalid color format will cause this function throws an error.

```javascript
isDarkColor("#000000"); // true
```

### `randomHexColor`

Generate a random color in hex format.

This function returns a 6 character hex alphanumeric value with starting `#` character.

```javascript
randomHexColor(); // ex: #1a2b3c
```
