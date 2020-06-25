"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomHexColor = exports.hexToRgb = exports.isDarkColor = void 0;
var validateHexColor = function (color) {
    var hexColorRegex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    var hex = color;
    if (hex.charAt(0) === "#")
        hex = hex.substr(1);
    if (!hexColorRegex.test(hex))
        throw new Error("Invalid hex color format");
    // Convert the shortened hex color to a full one
    // This is important because the function gives the correct result only when it's provided a full hex color
    if (hex.length === 3) {
        var fullHex = "";
        for (var i = 0; i < hex.length; i++)
            fullHex += "" + hex[i] + hex[i];
        hex = fullHex;
    }
    return hex;
};
var hexToRgb = function (color) {
    var hex = validateHexColor(color);
    var bigInt = parseInt(hex, 16);
    var r = (bigInt >> 16) & 255;
    var g = (bigInt >> 8) & 255;
    var b = bigInt & 255;
    return [r, g, b].join(", ");
};
exports.hexToRgb = hexToRgb;
var isDarkColor = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    var rgb;
    if (args.length === 1 && typeof args[0] === "string")
        rgb = hexToRgb(args[0])
            .split(",")
            .map(function (n) { return parseInt(n); });
    else if (args.length === 3)
        rgb = args.map(function (n) { return parseInt(n); });
    else
        throw new Error("1 or 3 parameters are required");
    var r = rgb[0], g = rgb[1], b = rgb[2];
    var hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));
    return hsp <= 127.5;
};
exports.isDarkColor = isDarkColor;
var randomHexColor = function () {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
};
exports.randomHexColor = randomHexColor;
