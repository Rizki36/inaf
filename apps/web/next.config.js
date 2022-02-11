const withTM = require("next-transpile-modules")(["ui"]);

module.exports = withTM({
    reactStrictMode: true,
    async rewrites() {
        return [
            {
                source: "/login",
                destination: "/auth/login",
            },
        ];
    },
});
