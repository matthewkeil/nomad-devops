"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const PROD = process.env.NODE_ENV === "production";
const config = {
    mode: PROD ? "production" : "development",
    target: "node",
    devtool: PROD ? undefined : "eval-source-map",
    entry: path_1.resolve(__dirname, "src", "customResourceProvider.ts"),
    output: {
        path: path_1.resolve(__dirname, "build"),
        filename: "nomad-devops-custom-resource-provider.js"
    },
    resolve: {
        modules: ["node_modules"],
        extensions: [".ts", ".js", ".json"]
    },
    externals: [],
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    configFile: "tsconfig.prod.json"
                }
            }
        ]
    }
};
exports.default = config;
//# sourceMappingURL=webpack.config.js.map