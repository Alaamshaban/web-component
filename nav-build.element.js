const concat = require("concat");
(async function build() {
    const files = [
        "./dist/elements/browser/polyfills.js",
        "./dist/elements/browser/main.js",
    ];
    await concat(files, "dist/navigation-ui.js");
})();
