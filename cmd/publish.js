const fs = require('fs');
const util = require('util');

const AWS = require('aws-sdk');
const globby = require('globby');
const mime = require('mime-types');

if (!fs.existsSync('config.json')) {
    console.error('couldn\'t read config file (config.json)');
    process.exit(1);
}

AWS.config.loadFromPath('config.json');

const s3 = new AWS.S3({
    apiVersion: '2018-1-1',
    params: {
        Bucket: 'aws-website-okwolo-rven6',
    },
});

const upload = async (includeResources = false) => {
    const sourceDir = './dist';

    const filePatterns = [`${sourceDir}/**`];
    if (!includeResources) {
        filePatterns.push(`!${sourceDir}/res/**`);
    }

    const filePaths = await globby(filePatterns);

    const files = await Promise.all(filePaths.map(async (filePath) => {
        const destination = filePath.replace(`${sourceDir}/`, '');
        const contents = await util.promisify(fs.readFile)(filePath, 'utf8');
        const type = mime.lookup(filePath);

        return {destination, contents, type};
    }));

    await Promise.all(files.map(async (file) => {
        return new Promise((resolve, reject) => {
            s3.upload({
                Key: file.destination,
                Body: file.contents,
                ContentEncoding: 'utf8',
                ContentType: file.type,
                ACL: 'public-read',
            }, (err, data) => {
                if (err) {
                    reject(err);
                }
                console.log(`uploaded ${file.destination}`);
                resolve(data);
            });
        });
    }));
};

upload(process.argv.indexOf('--includeResources') !== -1);
