const webpack = require("webpack");

module.exports = {
    webpack: {
        configure: {
            resolve: {
                fallback: {
                    process: require.resolve("process/browser"),
                    stream: require.resolve("stream-browserify"),
                    buffer: require.resolve("buffer"),
                },
            },
            plugins: [
                new webpack.ProvidePlugin({
                    Buffer: ["buffer", "Buffer"],
                    process: "process/browser",
                }),
            ],
            /* supresses non-actionable sourcemap warnings from other packages. see
             * https://github.com/facebook/create-react-app/discussions/11767 */
            ignoreWarnings: [
                function ignoreSourcemapsloaderWarnings(warning) {
                    return (
                        warning.module &&
                        warning.module.resource.includes("node_modules") &&
                        warning.details &&
                        warning.details.includes("source-map-loader")
                    );
                },
            ],
        },
    },
};
