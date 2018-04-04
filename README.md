# Werkstroom Modeller Library

  Design workflow models easily in your project by dragging and dropping of components.

## Prerequisities


popper.js `npm install popper.js@1.12.9`

jquery `npm install jquery@1.9.1`

ng-bootstrap `npm install --save @ng-bootstrap/ng-bootstrap`

## Installation

Using npm

`npm install werkstroom-modeller-library`

## Usage

##### Add Styles

Add `"../node_modules/bootstrap/dist/css/bootstrap.min.css"` 
 and `"../node_modules/font-awesome/css/font-awesome.css"` under styles in `.angular-cli.json`.

##### Import `CanvasComponent` and `CanvasModule` from the library

`import { CanvasComponent} from 'werkstroom-modeller-library'`

`import {CanvasModule} from 'werkstroom-modeller-library';`

In `@ngModule` declare `CanvasComponent` and import `CanvasModule`.

Call `<app-canvas><app-canvas/>` to insert the workflow modeller to your html file.

## Custom styling

backColor - background colour of the working area \
toolboxColor - toolbox background color\
toolboxFontColor - toolbox heading color\
paletteHeight - height of the working area (minimum 300px)\
paletteWidth - width of the palette (minimum 1000px)\
canvasColor - background color of the canvas area\
componentColor - component fill color\
componentHeaderColor - component header bar color\
componentHeadTxt - font color of component header\
componentBodyTxt - font color of component body\
lineColor - connecting line color
  
`<app-canvas backColor="red" toolboxColor="#85b909" paletteHeight="500px">`
`<app-canvas/>`

###### Note

Colors can be called by Color name or by their HEX notation./
Add `px` for heights and widths.


