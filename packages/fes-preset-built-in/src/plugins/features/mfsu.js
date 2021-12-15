import { MFSU } from '@umijs/mfsu';
import webpack from 'webpack';

export default (api) => {
    api.describe({
        key: 'mfsu',
        config: {
            schema(joi) {
                return joi
                    .object();
            },
            default: {
            }
        },
        enableBy() {
            return (
                (api.env === 'development' && api.userConfig.mfsu)
              || (api.env === 'production' && api.userConfig.mfsu?.production)
              || process.env.ENABLE_MFSU
            );
        }
    });

    const mfsu = new MFSU({
        implementor: webpack,
        buildDepWithESBuild: {}
    });

    api.addBeforeMiddlewares(() => mfsu.getMiddlewares());

    api.modifyBabelOpts((babelOpts) => {
        babelOpts.plugins.push(...mfsu.getBabelPlugins());

        return babelOpts;
    });

    api.modifyBundleConfig((config) => {
        mfsu.setWebpackConfig({
            config
        });
        config.experiments = {
            ...config.experiments,
            topLevelAwait: true
        };
        return config;
    });
};
