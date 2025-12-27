const path = require('path');
const dotenv = require('dotenv');
const { defineConfig } = require('@rspack/cli');
const { HtmlRspackPlugin, CopyRspackPlugin } = require('@rspack/core');
const ReactRefreshPlugin = require('@rspack/plugin-react-refresh');

dotenv.config({ path: path.resolve(__dirname, '.env') });

const isProduction = process.env.NODE_ENV === 'production';
const publicUrl = (process.env.PUBLIC_URL || '').replace(/\/$/, '');

const defaultEnvKeys = [
  'REACT_APP_GOOGLE_MAPS_API_KEY',
  'REACT_APP_GOOGLE_MAPS_MAP_ID',
  'REACT_APP_GOOGLE_MAPS_PLACE_ID',
  'REACT_APP_GOOGLE_TAG_ID',
  'PUBLIC_URL'
];

const envDefinitions = defaultEnvKeys.reduce((acc, key) => {
  acc[`process.env.${key}`] = JSON.stringify(process.env[key] || '');
  return acc;
}, { 'process.env': '{}' });

envDefinitions['process.env.NODE_ENV'] = JSON.stringify(
  process.env.NODE_ENV || 'development'
);

module.exports = defineConfig({
  mode: isProduction ? 'production' : 'development',
  entry: path.resolve(__dirname, 'src/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: isProduction
      ? 'static/js/[name].[contenthash:8].js'
      : 'static/js/[name].js',
    assetModuleFilename: 'static/media/[name].[hash][ext][query]',
    publicPath: publicUrl ? `${publicUrl}/` : '/',
    clean: true
  },
  devtool: isProduction ? 'source-map' : 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, 'src'),
        loader: 'builtin:swc-loader',
        options: {
          jsc: {
            parser: {
              syntax: 'ecmascript',
              jsx: true
            },
            transform: {
              react: {
                runtime: 'automatic',
                refresh: !isProduction,
                development: !isProduction
              }
            }
          }
        }
      },
      {
        test: /\.css$/i,
        use: ['style-loader', { loader: 'css-loader', options: { importLoaders: 1 } }]
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/media/[name].[hash][ext][query]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'static/fonts/[name].[hash][ext][query]'
        }
      }
    ]
  },
  plugins: [
    new HtmlRspackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
      templateParameters: {
        PUBLIC_URL: publicUrl
      }
    }),
    new CopyRspackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'public'),
          to: path.resolve(__dirname, 'dist'),
          globOptions: { ignore: ['**/index.html'] }
        }
      ]
    }),
    !isProduction && new ReactRefreshPlugin()
  ].filter(Boolean),
  builtins: {
    define: envDefinitions,
    react: {
      refresh: !isProduction
    }
  },
  devServer: {
    port: process.env.PORT ? Number(process.env.PORT) : 3000,
    historyApiFallback: true,
    hot: true,
    static: {
      directory: path.resolve(__dirname, 'public'),
      watch: true
    }
  }
});

