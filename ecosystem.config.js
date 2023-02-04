module.exports = {
    apps : [{
        name: "bonzai-bot",
        script: "./index.js",
        env: {
            NODE_ENV: "development",
        },
        env_production: {
            NODE_ENV: "production",
        }
    }]
}