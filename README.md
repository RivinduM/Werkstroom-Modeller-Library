# WerkstroomModellerLibrary

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.7.3.

## Prerequisities

bootstrap 4.0.0 ==> npm install bootstrap@4.0.0
popper.js ==> npm install popper.js@1.12.9
jquery ==> npm install jquery@1.9.1
ng-bootstrap ==> npm install --save @ng-bootstrap/ng-bootstrap

## Installation

Run npm install workflow-modeller

## Usage

add "../node_modules/bootstrap/dist/css/bootstrap.min.css" & "../node_modules/font-awesome/css/font-awesome.css" to styles in .angular-cli.json

import CanvasComponent and CanvasModule from the library

import { CanvasComponent} from 'werkstroom-modeller-library';
import {CanvasModule} from 'werkstroom-modeller-library';

In @ngModule declare CanvasComponent and import Canvas Module

Call <app-canvas><app-canvas/> to insert the workflow modeller

## Custom styling

paletteColor - to change backgroung color of the drawing area

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
