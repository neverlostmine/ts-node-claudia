# ts-node-claudia

This is an example project to demonstrate how to make a serverless application with [`Node.js`](https://nodejs.org/en/), [`TypeScript`](https://www.typescriptlang.org/), and [`Claudia.js`](https://github.com/claudiajs/claudia) on [`Amazon Web Services (AWS)`](https://aws.amazon.com/).

## Install dependencies

Run `npm i` to install dependencies.

## Install global packages

Run `npm run glob` to install [`typescript`](https://www.typescriptlang.org/), [`ts-node`](https://github.com/TypeStrong/ts-node), [`nodemon`](https://github.com/remy/nodemon), and [`claudia`](https://github.com/claudiajs/claudia). Those are all required for this project.

## Environment variables

`env.json` is used for setting environment variables (.gitignore ignores this file to protect you from leaking top secrets).

By default, the project uses conn variable to link [`MongoDB`](https://www.mongodb.com/).

```
{
  "conn": "mongodb://{username}:{password}@ds123456.mlab.com:45678/{dbname}"
}
```

You can use [`mLib`](https://mlab.com/) for testing.

`Development server` loads `env.json` in `serve.ts` when you run `npm run dev`, and [`Claudia.js`](https://github.com/claudiajs/claudia) also uses `env.json` to set environment variables on [`Lambda`](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html).

## Development server

Run `npm run dev` for a dev server. It uses [`nodemon`](https://github.com/remy/nodemon) to watch files and uses [`ts-node`](https://github.com/TypeStrong/ts-node) to run .ts code.

## AWS settings

Your `IAM user` must to have permissions at least [`Lambda`](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html), [`API Gateway`](http://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html), and [`IAM`](http://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html) in order to run [`Claudia.js`](https://github.com/claudiajs/claudia).

Add the keys to your `.aws/credentials` file.

```
[claudia]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_ACCESS_SECRET
```

> The AWS credentials file – located at ~/.aws/credentials on Linux, macOS, or Unix, or at C:\Users\USERNAME \.aws\credentials on Windows. This file can contain multiple named profiles in addition to a default profile.

> See more detail in [INSTALLING AND CONFIGURING CLAUDIA.JS](https://claudiajs.com/tutorials/installing.html#configuring-access-credentials).

## Deploy stepts

1. Run `npm run build` to compile .ts to .js into `dist folder`. It will also copy package.json into `dist folder` in order to run [`Claudia.js`](https://github.com/claudiajs/claudia).

   > If you are using Windows OS, please run `npm run build-win` instead.

2. Run `npm run create` to initialize [`Claudia.js`](https://github.com/claudiajs/claudia). [`Claudia.js`](https://github.com/claudiajs/claudia) will install packages, zip files, upload to [`Lambda`](http://docs.aws.amazon.com/lambda/latest/dg/welcome.html), and setup [`API Gateway`](http://docs.aws.amazon.com/apigateway/latest/developerguide/welcome.html).

   > :warning: The `--region` option is mandatory for the create command, and the `package.json` uses `us-east-1` for the default. If you want to deploy to the different region, please change it before you run the script.

   > Here are the [AWS Available Regions](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/using-regions-availability-zones.html#concepts-available-regions).

   > See more detail in [Claudia.js create command](https://github.com/claudiajs/claudia/blob/master/docs/create.md).

3. Run `npm run update` to update api if you have done `npm run create` before. Be careful to keep claudia.json into `dist folder`. Claudia will generate it after creating api, and use it to update api.

   > See more detail in [Claudia.js update command](https://github.com/claudiajs/claudia/blob/master/docs/update.md).

## Testing

This project uses [`mocha`](https://mochajs.org/), [`sinon`](http://sinonjs.org/), and [`chai`](http://chaijs.com/) for unit testing.

All files with *.spec.ts will be tested.

Run `npm run test` to execute all unit tests, and you can see the html report on `/mochawesome-report/mochawesome.html`.

Run `npm run coverage` to execute coverage check, and you can see the html report on `/coverage/index.html`.

## Example API

see [`API.md`](API.md) for API Usages
