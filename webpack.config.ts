import { resolve } from "path";
import { Configuration } from "webpack";

const PROD = process.env.NODE_ENV === "production";

const config: Configuration = {
  mode: PROD ? "production" : "development",
  target: "node",
  devtool: PROD ? undefined : "eval-source-map",
  entry: resolve(__dirname, "src", "customResourceProvider.ts"),
  output: {
    path: resolve(__dirname, "build"),
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

export default config;
