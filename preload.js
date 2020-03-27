// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const path = require("path");
const url = require("url");

const customTitlebar = require("custom-electron-titlebar");

window.addEventListener("DOMContentLoaded", () => {});
