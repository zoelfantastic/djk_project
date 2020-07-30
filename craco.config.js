const fs = require('fs');
const path = require('path');
const CracoLessPlugin = require('craco-less');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = {
    webpack: {
        alias: {
            themes: resolveApp("src/themes"),
            app: resolveApp("src/app"),
        }
    },
    plugins: [
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        },
    ],
}