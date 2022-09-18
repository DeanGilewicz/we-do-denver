<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <h2 align="center">🏔 We Do Denver ✈️</h2>
  <p align="center">
    An Express Application!
  </p>
</div>

<br />
<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#deployment">Deployment</a></li>
  </ol>
</details>

<br />

## About The Project

This application allows users to keep a record of "places" that they have visited in Denver, CO. Users can categorize these "places" and provide tags to easily sort and filter. An image can also be uploaded for each "place".

Users must first create an account ( handled by `Passport JS`), which then triggers an email to be sent.

Once the user is logged in they can create, update, delete and view their "places". Users are also able to upload an image of the "places" that they visit.

Data is persisted in `MongoDB` via `Mongoose` which provides a schema-based solution to model our application data.

`Pug` is used as the template language to display each page to the user and `webpack` takes care of bundling and optimizing application code.

There were several reasons for working on this project, including the chance to:

- implement an Express server
- work with MongoDB
- handle authentication
- manage image upload
- send email
- use a template language

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### **Built With**

Below is a list of the major pieces of the tech stack that were used for this application.

- [![Express][express]][express-url]
- [![Mongodb][mongodb]][mongodb-url]
- [![Mongoose][mongoose]][mongoose-url]
- [![Passport][passport]][passport-url]
- [![Webpack][webpack]][webpack-url]
- [![Pug][pug]][pug-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br />

## Getting Started

The following information will provide you with the details necessary to get the application up and running locally.

### **Prerequisites**

On your operating system of choice, ensure that [NodeJS](https://nodejs.org/en/) version `18.8.0` is installed. It is recommended that a Node Version Manager be used, such as [NVM](https://github.com/nvm-sh/nvm). When installing `NodeJS` this way, the correctly associated `npm` version should automatically be installed.

```sh
nvm install node@18.8.0
```

It's recommended to download [MongoDB Compass](https://www.mongodb.com/products/compass) or another GUI to work with MongoDB. Once installed, create a new `localhost` connection with port `27017`. The url will look something like:

```sh
mongodb://127.0.0.1:27017
```

You'll also need to create a [Mailtrap](https://mailtrap.io/) account since this will be used to "trap" transaction emails that are sent to users in non-production environments. Keep a note of the `host`, `port`, `username` and `password`.

You'll then want to create a local `variable.env` file at the root of the project with the following info:

```sh
  NODE_ENV=local
  DATABASE_URL=mongodb://127.0.0.1:27017/?readPreference=primary&directConnection=true&ssl=false
  MAIL_USER=<Mailtrap User>
  MAIL_PASS=<Mailtrap User Password>
  MAIL_HOST=<Mailtrap Host>
  MAIL_PORT=<Mailtrap Port>
  PORT=7777
  SECRET=mySecret
  KEY=myKey
```

### **Installation**

Once `NodeJS` and `npm` are installed you can follow these steps:

1. Clone the repo
   ```sh
   git clone https://github.com/DeanGilewicz/we-do-denver.git
   ```
2. Install NPM packages
   ```sh
   npm i
   ```
3. Run local DB server
   ```sh
   brew services start mongodb-community
   ```
4. Run the application
   ```sh
   npm run dev
   ```

_Note: once the server is shut down, remember to run the following to shut down the DB server_

```sh
brew services stop mongodb-community
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br />

## Usage

This application provides a variety of commands in `package.json`:

- assets
  - bundles app for development
- build
  - bundles app for production
- dev
  - combines commands to be used when developing app locally
- start
  - runs app
- watch
  - runs app in watch mode

Once the server is up and running `npm run dev` you can visit [http://localhost:7777/](http://localhost:7777/) to view the app.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<br />

## Deployment

You may have noticed a `fly.toml` file and a `.dockerignore` file with no `Dockerfile`. This is because this setup allows this application to be deployed by [Fly.io](https://fly.io/docs/languages-and-frameworks/node/) via `flyctl deploy`.

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[express]: https://img.shields.io/badge/Express-20232A?style=for-the-badge&logo=express&logoColor=ffffff
[express-url]: https://expressjs.com/
[passport]: https://img.shields.io/badge/Passport-000000?style=for-the-badge&logo=passport&logoColor=34E27A
[passport-url]: https://www.passportjs.org/
[mongodb]: https://img.shields.io/badge/MongoDB-ffffff?style=for-the-badge&logo=mongodb&logoColor=47A248
[mongodb-url]: https://www.mongodb.com/
[mongoose]: https://img.shields.io/badge/Mongoose-A03437?style=for-the-badge&logo=mongoose&logoColor=ffffff
[mongoose-url]: https://mongoosejs.com/
[pug]: https://img.shields.io/badge/Pug-A86454?style=for-the-badge&logo=pug&logoColor=ffffff
[pug-url]: https://pugjs.org/api/getting-started.html
[webpack]: https://img.shields.io/badge/Webpack-8DD6F9?style=for-the-badge&logo=webpack&logoColor=000000
[webpack-url]: https://webpack.js.org/
