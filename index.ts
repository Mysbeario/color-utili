const validateHexColor = (color: string): string => {
  const hexColorRegex = /^([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  let hex = color;

  if (hex.charAt(0) === "#") hex = hex.substr(1);
  if (!hexColorRegex.test(hex)) throw new Error("Invalid hex format");

  // Convert the shortened hex color to a full one
  // This is important because the function gives the correct result only when it's provided a full hex color
  if (hex.length === 3) {
    let fullHex = "";
    for (let i = 0; i < hex.length; i++) fullHex += `${hex[i]}${hex[i]}`;
    hex = fullHex;
  }

  return hex;
};

const hexToRgb = (color: string): string => {
  const hex = validateHexColor(color);

  const bigInt = parseInt(hex, 16);
  const r = (bigInt >> 16) & 255;
  const g = (bigInt >> 8) & 255;
  const b = bigInt & 255;

  return [r, g, b].join(", ");
};

const isDarkColor = (...args: Array<string | number>): boolean => {
  let rgb: number[];

  if (args.length === 1 && typeof args[0] === "string")
    rgb = hexToRgb(args[0])
      .split(",")
      .map((n) => parseInt(n));
  else if (args.length === 3) {
    if (!args.every((p) => p >= 0 && p <= 255))
      throw new Error("Invalid RGB format");
    rgb = args.map((n) => parseInt(n as string));
  } else throw new Error("1 or 3 parameters are required");

  const [r, g, b] = rgb;
  const hsp = Math.sqrt(0.299 * (r * r) + 0.587 * (g * g) + 0.114 * (b * b));

  return hsp <= 127.5;
};

const randomHexColor = (): string =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export { isDarkColor, hexToRgb, randomHexColor };
