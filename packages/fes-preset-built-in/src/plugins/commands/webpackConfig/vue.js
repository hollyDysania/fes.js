import qs from 'qs';

export default function createVueWebpackConfig({
    config,
    webpackConfig
}) {
    webpackConfig.module
        .rule('vue')
        .test(/\.vue$/)
        .use('vue-loader')
        .loader(require.resolve('vue-loader'))
        .options({
            babelParserPlugins: ['jsx', 'classProperties', 'decorators-legacy'],
            ...(config.vueLoader || {})
        })
        .end();

    webpackConfig.module
        .rule('vue-custom')
        .resourceQuery((query) => {
            if (!query) {
                return false;
            }
            const parsed = qs.parse(query.slice(1));
            return parsed.vue != null;
        }).use('vue-custom-loader').loader(require.resolve('./pitcher'));

    webpackConfig
        .plugin('vue-loader-plugin')
        .use(require('vue-loader').VueLoaderPlugin);
}
