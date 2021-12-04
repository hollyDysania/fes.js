import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import fs from 'fs';
import path from 'path';


export async function startDevServer({
    webpackConfig,
    host,
    port,
    proxy,
    https,
    beforeMiddlewares,
    afterMiddlewares,
    customerDevServerConfig
}) {
    const options = {
        hot: true,
        host,
        port,
        proxy,
        allowedHosts: 'all',
        static: webpackConfig.output.path,
        devMiddleware: {
            stats: 'errors-only'
        },
        onBeforeSetupMiddleware: (devServer) => {
            beforeMiddlewares.forEach((middleware) => {
                devServer.app.use(middleware);
            });
        },
        onAfterSetupMiddleware: (devServer) => {
            afterMiddlewares.forEach((middleware) => {
                devServer.app.use(middleware);
            });
        },
        headers: {
            'access-control-allow-origin': '*'
        },
        ...(customerDevServerConfig || {})
    };
    if (https) {
        options.https = {
            key: fs.readFileSync(path.resolve(__dirname, './cert/key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, './cert/cert.pem'))
        };
    }
    const compiler = webpack(webpackConfig);
    const server = new WebpackDevServer(options, compiler);

    await server.start();

    return server;
}
