# Automation framework for Pet store (home challenge)

## Description

This repository contains a cypress automation framework with API test cases for testing the swagger [petstore API](https://github.com/swagger-api/swagger-petstore).


## Usage

### Installing

In order to use this automation framework, you will need to make sure that the following
dependencies are installed on your system:
  - [Node.js >= 12v](https://nodejs.org/es/)


### Folder structure

Folder structure for the automation framework document:

```
home-challenge/       # Root directory.
|- node_modules/      # Generated after installing all the modules necessaries.
|- cypress.json       # Contains the sypress configurations.
|- package-lock.json  # Metadata content (title, author...).
|- package.json       # Contains all the dependencies.
|- Readme.md          # Makefile Readme, contains useful information about the project.
|- cypress/           # Folder that contains all the tests.
|-- downloads         # Folder that contains all the downloaded files.
|-- fixtures          # Contains all the attachment files.
|-- integration       # Contains all the test case structure.
|--- api-testing      # Contains all the test cases classified by epic.
|---- order           # Contains all the test cases for the "order" features.
|---- pet             # Contains all the test cases for the "pet" features.
|---- user            # Contains all the test cases for the "user" features.
|-- support           # Contains all the commands that can be used in the tests.
|--- */Commands       # Contains all the shared commands, these can be used in the tests.
|-- utils             # Contains all the classes used in the test cases.
|-- video             # Contain the evidence collected after every execution.

```

### Running Cypress

Once you installed node.js in your machine, you must install cypress by using the following command:

```
npm install
```
Now, you can run all the tests by typing the following command:
```
npm run test
```
in case you want to open the cypress UI, you should run the following command:
```
npx cypress open
```