<a id="readme-top"></a>

[![Contributors][contributors-shield]][contributors-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascript logo">
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express logo"/>
<img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="firebase logo">
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node logo">
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="jest logo" />
<!-- PROJECT LOGO -->
<br />
<div align="center">
<h1>Daily Dish</h1>
  <h2 align="center">Backend API for Meal Planner</h2>
  <h3 align="center">by Event Handlers</h3>

  <p align="center">
    <br />
    <a href="https://github.com/nldblanch/event-handlers-meal-planner-BE"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://event-handlers-meal-planner-be.onrender.com/api">View Demo</a>
    ·
    <a href="https://github.com/nldblanch/event-handlers-meal-planner-BE/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/nldblanch/event-handlers-meal-planner-BE/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
  </p>
</div>

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
        <li><a href="#hosting">Hosting</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

![Daily Dish Backend Screen Shot][product-screenshot]

This backend is half of the story for our [Northcoders][NC-url] final group project. The other half can be found in this [repo][FE-repo-url].

This database and server:

- Handles and manipulates data for users, recipes, and lists
- Accepts GET, POST, PATCH and DELETE to the Firebase Firestore Database
- Is fully tested with Jest and SuperTest

### Built With

<img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E" alt="javascript logo">
<img src="https://img.shields.io/badge/Express%20js-000000?style=for-the-badge&logo=express&logoColor=white" alt="express logo"/>
<img src="https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black" alt="firebase logo">
<img src="https://img.shields.io/badge/Node%20js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="node logo">
<img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="jest logo" />

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- GETTING STARTED -->

## Getting Started

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Prerequisites

This is an example of how to list things you need to use the software and how to install them.

- npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

_Below is an example of how you can instruct your audience on installing and setting up your app. This template doesn't rely on any external dependencies or services._

1. Get a free Firestore Database at [https://firebase.google.com](https://firebase.google.com)
2. Clone the repo
   ```sh
   git clone https://github.com/nldblanch/event-handlers-meal-planner-BE.git
   ```
3. Install NPM packages
   ```sh
   npm install
   ```
4. Create environment files
   ```js
   touch .env.test .env.production
   ```
5. Enter your Firebase configurations as environment variables

   _You can find these by going to Firebase Project Settings and adding a new web app. It will give an example of what firebaseConfig looks like._

   ```js
   FIREBASECONFIG = "{"apiKey":"abcde","authDomain":"meal-planner.firebaseapp.com","projectId":"meal-planner","storageBucket":"meal-planner.appspot.com","messagingSenderId":"12345","appId":"1:12345:web:da1b2c3","measurementId":"G-A0B1C2"}"
   ```

   _Note: it needs to be a JSON string, like above. It looks messy, but you can console log JSON.stringify(object) to visualise this quickly._

   ```js
   const config = {
     apiKey: "",
     authDomain: "",
     projectId: "",
     storageBucket: "",
     messagingSenderId: "",
     appId: "",
     measurementId: "",
   };
   console.log(JSON.strignify(config));
   ```

6. Change git remote url to avoid accidental pushes to base project
   ```sh
   git remote set-url origin github_username/repo_name
   git remote -v # confirm the changes
   ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Hosting

#### 1. Seed your online database

**Run the seed-prod script**

```bash
npm run seed-prod
```

#### 2. Get your API hosted using render

Sign up to [Render](https://render.com/). Once you're signed up, click on the "New +" button and create a new `Web Service`.

You can connect your github account and give the app permission to access your apps repo, alternatively you can paste in the URL of your git repository, providing it is a public repo

Once you have selected your repo, give your app a name. Most of the options can be left on their default settings, hosted in the EU using the main branch. The default commands can be left as is. (yarn is a package manager, an alternative to npm)

At the bottom, underneath the payment tier options you will have the option to provide some environment variables by clicking on the `Advanced` button.

You will need to add the following variables yourself using the `Add Environment Variable` button.

1. Set `FIREBASECONFIG` to the same string you put in your `.env.production`.
2. Set `NODE_ENV` to the string "production" (you won't need to add the quotes).

Create your service and it will begin the deploy process. This will take a few minutes the first time so be patient. If you have made a mistake, or forgotten to add environment variables you can select the `Environment` tab on your app dashboard. Once you have saved any changes Render will re-deploy your app with the new environment.

You can see the progress on this by following the links on the `Events` tab and any logs from your server are shown on the Logs tab.

#### 3. Check your API online

There's a link to your hosted app at the top of the page. Check your endpoints are working, and you're good to go! 🎉

The link is to the `/` path which your server will correctly 404. Make a request to an existing endpoint such as `/api` to check you're getting data from the db correctly.

nb If your data is appearing on one line, it can be hard to read. You may find it easier to read by installing a JSON Formatter extension to your browser. We recommend [this one](https://chrome.google.com/webstore/detail/json-formatter/bcjindcccaagfpapjjmafapmmgkkhgoa?hl=en) for Chrome.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

This API was made for our meal planner which you can find [here][FE-host].

_For more examples, please refer to the [Documentation](https://example.com)_

### Top contributors:

<a href="https://github.com/nldblanch/event-handlers-meal-planner-BE/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=nldblanch/event-handlers-meal-planner-BE" alt="contrib.rocks image" />
</a>

## Acknowledgments

- [Northcoders][NC-url]

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->

[FE-repo-url]: https://github.com/coderRaph1/FE---Meal-Planner
[NC-url]: https://northcoders.com
[contributors-shield]: https://img.shields.io/github/contributors/nldblanch/event-handlers-meal-planner-BE.svg?style=for-the-badge
[contributors-url]: https://github.com/nldblanch/event-handlers-meal-planner-BE/graphs/contributors
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/nathanblanch
[product-screenshot]: https://github.com/user-attachments/assets/51a926c7-bfd9-4ae9-a045-6b7acdc99d1b
[FE-host]: https://google.com
