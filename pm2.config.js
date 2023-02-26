module.exports = {
    apps: [
        {
            name: "nestjs-api",
            script: "./dist/main.js",
            env: {
                NODE_ENV: "production",
                PORT: 80
            },
        }
    ]
}