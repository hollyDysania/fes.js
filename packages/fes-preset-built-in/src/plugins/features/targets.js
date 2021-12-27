
export default (api) => {
    api.describe({
        key: 'targets',
        config: {
            default: {
                chrome: 52,
                firefox: 64,
                safari: 10,
                edge: 13,
                ios: 10
            },
            schema(joi) {
                return joi.object();
            }
        }
    });
};
