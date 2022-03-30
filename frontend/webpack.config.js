// const HtmlWebpackPlugin = require("html-webpack-plugin");
const Path = require("path");

module.exports = {
  entry: {
    main: Path.resolve(__dirname, "./src/index.js"),
  },
  output: {
    filename: "bundle.js",
    path: Path.resolve(__dirname, "dist"),
  },
  // plugins: [new HtmlWebpackPlugin()],
  devServer: {
    contentBase: "./dist",
    open: true,
    // port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: [["@babel/transform-runtime"]],
          },
        },
      },
      {
        test: /\.css/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
