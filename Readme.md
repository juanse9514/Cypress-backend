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
|- cypress/           # Folder used to store builded (output) files.
|- node_modules/      # Markdowns files; one for each chapter.
|- cypress.json       # Images folder.
|- package-lock.json  # Metadata content (title, author...).
|- package.json       # Makefile used for building our documents.
|- Readme.md          # Makefile Readme, contains useful information about the project.
```

### Running Cypress

Once you installed node.js in your machine, you must install cypress by using the following command:

```
npm install
```
Now, you can open cypress by typing the following command:
```
npx cypress open
```