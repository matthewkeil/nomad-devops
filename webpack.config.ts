require("dotenv").config();
import { Configuration } from "webpack";
import UglifyJsPlugin from "uglifyjs-webpack-plugin";
import { config } from "./config";
import { resolve } from "path";

const _config: Configuration = {
  mode: config.PROD ? "production" : "development",
  target: "node",
  output: {
    filename: "[name].js",
    libraryTarget: "commonjs"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".ts", ".js", ".json"]
  },
  externals: ["aws-sdk"],
  module: {
    rules: [
      {
        test: /\.(t|j)sx?$/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "ts-loader",
            options: {
              configFile: resolve(__dirname, "tsconfig.webpack.json")
            }
          }
        ]
      },
      {
        test: /\.(t|j)s$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "shebang-loader"
          }
        ]
      }
    ]
  },
  optimization: {
    minimizer: [new UglifyJsPlugin()]
  }
};

if (config.PROD) {
  _config.devtool = "eval-source-map";
}

export default _config;
