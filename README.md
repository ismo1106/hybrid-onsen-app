Onsen UI Quick Startup Guide
====

This document describes the minimum information required to develop an app using Onsen UI.

## Requirements

 * Node.js - [Install Node.js](http://nodejs.org)
 * NPM - [Install NPM](https://www.npmjs.com/)
 * Cordova - Install by running `npm install cordova`

## Instructions

1. Install dependencies `npm install`

2. Install gulp globally `npm install -g gulp`

3. Run `gulp serve` and run the web server

You should see running app in your browser and you can start to develop your app with Onsen UI.

### Directory Layout

    README.md     --> This file
    gulpfile.js   --> Gulp tasks definition
    www/          --> Asset files for app
      index.html  --> App entry point
      js/
      lib/
        angular/  --> AngularJS dependency
        onsen/
          stylus/ --> Stylus files for onsen-css-components.css
          js/     --> JS files for Onsen UI
          css/    --> CSS files for Onsen UI
      scripts/    --> Cordova scripts directory
    platforms/    --> Cordova platform directory
    plugins/      --> Cordova plugin directory
    merges/       --> Cordova merge directory
    hooks/        --> Cordova hook directory
    scripts/      --> Cordova TS scripts directory and TS definitions

## Gulp Tasks

 * `gulp serve` - Running the app for development.
 * `gulp build` - Build files for the project.
 * `gulp jshint` - Generate a [jshint](https://github.com/jshint/jshint) report.