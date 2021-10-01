<h1 align="center">
    <br>
    Rest API NodeJS + Express + MongoDB
</h1>

<h4 align="center">
Project developed for student purposes
</h4>
<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/marlonsilva21/rest-api-nodejs.svg">

  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/marlonsilva21/rest-api-nodejs.svg">

  <a href="https://www.codacy.com/app/marlonsilva21/rest-api-nodejsjava?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=marlonsilva21/rest-api-nodejs&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy grade" src="https://api.codacy.com/project/badge/Grade/691b85e51bf240b997ae6ff82ea41590">
  </a>

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/marlonsilva21/rest-api-nodejs.svg">
  <a href="https://github.com/marlonsilva21/rest-api-nodejs/commits/master">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/marlonsilva21/rest-api-nodejs.svg">
  </a>

  <a href="https://github.com/marlonsilva21/rest-api-nodejs/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/marlonsilva21/rest-api-nodejs.svg">
  </a>

  <img alt="GitHub" src="https://img.shields.io/github/license/marlonsilva21/rest-api-nodejs.svg">
</p>

<p align="center">
  <a href="#rocket-technologies">Technologies </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#install">How to install </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#features">Features </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <a href="#structure">Project structure </a>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</p>

## :rocket: Technologies

<p id="rocket-technologies">This repository was developed having as main technologies:</p>

- [NodeJS](https://www.oracle.com/br/java/technologies/javase-jdk11-downloads.html)
- [Express](https://www.eclipse.org/downloads/)
- [JavaScript](https://spring.io/projects/spring-boot)
- [MongoDB](https://www.mysql.com/)
- [WebStorm](https://www.eclipse.org/downloads/)
- And another bunch of packages....

<h2 id="install"> How to install </h2>

### Using Git (recommended)

1.  Clone the project from github. 

```bash
git clone https://github.com/MarlonSilva21/rest-api-nodejs.git 
```

### Using manual download ZIP

1.  Download repository
2.  Uncompress to your desired directory

### Install npm dependencies after installing (Git or manual download)

```bash
npm install
```
<h2 id="features"> Features </h2>

- Basic Authentication (Register/Login with hashed password)
- Email helper ready just import and use. --x
- JWT Tokens, make requests with a token after login with `Authorization` header with value `Bearer yourToken` where `yourToken` will be returned in Login response.
- Pre-defined response structures with proper status codes.
- Validations added.
- Light-weight project.

<h2 id="structure"> Project structure </h2>

```sh
.
├── package.json
└── src
    ├── app
    │   ├── controlles
    │   │   ├── authController.js
    │   │   ├── index.js
    │   │   └── projectController.js
    │   │
    │   ├── middlewares
    │   │   └── auth.js
    │   │
    │   └── models
    │       ├── authController.js
    │       ├── index.js
    │       └── projectController.js
    │   
    ├── config
    │   ├── auth.json
    │   └── mail.json
    │ 
    ├── database
    │   └── index.js
    │ 
    ├── modules
    │   └── mailer.js
    │ 
    ├── resources
    │   └── mail
    │       └── auth
    │           └── forgot_password.html
    │ 
    └── index.js



```

### Running API server locally

```bash
npm start 
```

##

Made with ♥ by Marlon Silva :wave: [Get in touch!](https://www.linkedin.com/in/marlon-silva-43075a184/)


