const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // Create html file in output directory with importing tags (building files)
const { ModuleFederationPlugin } = webpack.container; // For MicroFrontend
const deps = require("./package.json").dependencies;

module.exports = {
  entry: {
    main: path.resolve(__dirname, "./src/index.ts"),
    // Can add more entry point here for multiple bundling
  },
  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx"],
  },
  module: {
    rules: [
      {
        test: /.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.(png|jpe?g|gif|woff(2)?|ttf|otf|eot|svg)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./resource",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: path.resolve(__dirname, "./public/index.html"),
      favicon: false,
      // favicon: './src/resource/image/favicon.png',
    }),
    // Preset environment variable while compiling
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    // For MicroFrontend
    new ModuleFederationPlugin({
      name: "remoteCart", // 해당 앱의 유니크한 이름 (중복 X)
      filename: "remoteEntry.js", // 해당 앱을 다른 앱에서 사용하기 위한 정보가 담긴 파일 이름 지정
      /*
        remoteEntry.js가 사용되는 플로우
        호스트앱이 열리고,
        리모트앱에서 expose한 모듈에 대한 정보와 shared 의존성 패키지에 대한 정보가 담긴 remoteEntry.js를 각각 받아와 글로벌 변수에 저장한다.
        expose된 모듈을 사용할 당시에, 저장해두었던 글로벌 변수를 통해 비동기적으로 모듈을 불러온다.
      */
      exposes: {
        // key와 value로 이루어진 Object 형태로, 외부에서 사용하기 위해 노출시킬 모듈을 정의
        "./Cart": "./src/component/Cart", // Cart 컴포넌트 이외에 다수 컴포넌트 노출 가능
      },
      shared: {
        ...deps,
        react: { singleton: true, requiredVersion: deps.react },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
};
