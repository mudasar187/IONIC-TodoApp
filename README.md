# IONIC - TodoApp

A TodoApp by using IONIC

My first realworld app

## Run

You'll need:

- [Firestore](https://firebase.google.com/)
- [IONIC](https://ionicframework.com/)
- [Node.js](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)

Do:

- Create an account on [Firestore](https://firebase.google.com/) , then add a new project and then go to a symbol like this '</>', click there and get the api key, and make a file inside 'environment' folder called 'env.ts' and paste the key inside there like this:

export default { <br />
  apiKey: "-----------------------------------",<br />
  authDomain: "-----------------------------------",<br />
  databaseURL: "-----------------------------------",<br />
  projectId: "-----------------------------------",<br />
  storageBucket: "-----------------------------------",<br />
  messagingSenderId: "-----------------------------------"<br />
};

On command line:

- npm install (Install all dependencies you need)
- ionic serve --port 1234
