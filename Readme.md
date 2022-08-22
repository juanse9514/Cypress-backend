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


## Explaination
This test framework was developed using cypress due to the possibilities of including in the short term front end tests, as you may know, with cypress you have the ability to build a framework to test APIs and front-end applications, this could be seen as an advantage if you want to centralize your tests by using the same tool for both test types.

In this home-Challenge I gave a priority for each test case designed [home-challenge-test-case](https://1drv.ms/x/s!ApWt2MCOuV1sibVx0NQhctZokpyMDQ?e=Zjk8a6), the tests are designed according to the cases that can commonly arise during the use of the application in production, with this test suit, you can identify if some endpoint/scenario is failing since all endpoints are being tested by at least one happy path scenario, i took this approach due the given resources (time, qa automation guys) hbut anyways this framework can be improved by adding test cases with invalid data or aplying other test design strategies if you had more information about the requirements.