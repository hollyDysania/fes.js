
export default (api) => {
    api.describe({
        key: 'entrys',
        config: {
            schema(joi) {
                return joi.boolean();
            }
        }
    });
};
