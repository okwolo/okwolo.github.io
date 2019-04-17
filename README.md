# Development

```
npm run dev
```

# Deploy

To upload files to the bucket, rename the `config.example.json` file to `config.json` and modify contents with valid credentials.

```
npm run aws-deploy
```

By default, this command will build and upload all files from the `/dist` directory except ones in `/dist/res`. Note that this will override the files in the s3 bucket.

To include changes to the resources folder in the deployment:

```
npm run aws-deploy -- --includeResources
```