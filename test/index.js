"use strict";

const color = require("../dist");
const chai = require("chai");
const should = chai.should();

chai.use(require("chai-match"));

describe("Convert hex code to rgb", () => {
  it("it should correctly convert hex code to rgb", (done) => {
    const colors = [
      "#000000",
      "ffffff",
      "2e2532",
      "#B2ABF2",
      "f00",
      "#A0E",
      "eF89aC",
    ];

    color.hexToRgb(colors[0]).should.equal("0, 0, 0");
    color.hexToRgb(colors[1]).should.equal("255, 255, 255");
    color.hexToRgb(colors[2]).should.equal("46, 37, 50");
    color.hexToRgb(colors[3]).should.equal("178, 171, 242");
    color.hexToRgb(colors[4]).should.equal("255, 0, 0");
    color.hexToRgb(colors[5]).should.equal("170, 0, 238");
    color.hexToRgb(colors[6]).should.equal("239, 137, 172");

    done();
  });

  it("it should not convert an invalid hex code format", (done) => {
    const invalidColors = ["A4E8", "R12F35", "#@12345", "#FfFfF#"];
    invalidColors.forEach((c) => {
      try {
        color.hexToRgb(c);
      } catch (e) {
        e.message.should.equal("Invalid hex format");
      }
    });
    done();
  });
});

describe("Check if the color is dark or bright", () => {
  it("it should correctly know whether the color is dark or bright", (done) => {
    const colors = [
      "#000000",
      "ffffff",
      "2e2532",
      "#B2ABF2",
      [255, 0, 0],
      "#A0E",
      "eF89aC",
    ];

    color.isDarkColor(colors[0]).should.be.true;
    color.isDarkColor(colors[1]).should.be.false;
    color.isDarkColor(colors[2]).should.be.true;
    color.isDarkColor(colors[3]).should.be.false;
    color.isDarkColor(...colors[4]).should.be.false;
    color.isDarkColor(colors[5]).should.be.true;
    color.isDarkColor(colors[6]).should.be.false;

    done();
  });

  it("it should not check an invalid hex code format", (done) => {
    const invalidColors = ["A4E8", [256, -1, 0]];

    try {
      color.isDarkColor(invalidColors[0]);
    } catch (e) {
      e.message.should.equal("Invalid hex format");
    }

    try {
      color.isDarkColor(...invalidColors[1]);
    } catch (e) {
      e.message.should.equal("Invalid RGB format");
    }

    try {
      color.isDarkColor(1, 200);
    } catch (e) {
      e.message.should.equal("1 or 3 parameters are required");
    }

    done();
  });
});

describe("Generate random hex color", () => {
  it("it should generate a valid hex color format", (done) => {
    color.randomHexColor().should.match(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);
    done();
  });
});
