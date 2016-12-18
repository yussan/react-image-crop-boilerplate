const Path = require('path')
const Webpack = require('webpack')
const BUILD_DIR = './views/build'
const COM_DIR = './views/components'

const Config = {
    entry: {
        app: [COM_DIR + '/index.jsx'],
        vendor: ['react', 'react-dom']
    },
    output: {
        path: Path.resolve(__dirname, BUILD_DIR),
        filename: '[name].js',
        publicPath: BUILD_DIR
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: ['babel-loader'],
                exclude: [Path.resolve(__dirname, 'node_modules')],
                query: {
                    presets: ['es2015', 'react']
                }
            },
        ],
        resolve: {
            extensions: ['', '.js', '.jsx']
        }
    },
    plugins: [
        new Webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: 'Infinity'
        })
    ]
}

module.exports = Config