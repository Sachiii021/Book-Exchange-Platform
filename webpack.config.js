const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    //where our bundling of react components start
    main: path.resolve(__dirname, './client/index.js'),
  },
  output: {
    //name the file 
    filename: 'bundle.js',
    //path where we put the file above into
    //created everytime npm run build 
    path: path.resolve(__dirname, './public/build'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: ['file-loader'],
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  mode: 'development',
  resolve: {
    // Enable importing JS / JSX files without specifying their extension
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    static: {
      publicPath: '/public',
      directory: path.join(__dirname, './public'),
    },
    port: 8080,
    proxy: {
      '*': { target: 'http://localhost:3000' },
      '/api': { target: 'http://localhost:3000' },
    }
  },
};
