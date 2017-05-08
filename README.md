# marxjs

 Javascript plugin for development and testing HTML forms via populating installed via npm.

 ### Install

 Simply install from your terminal:

 ```
   $ npm i marxjs --save-dev
 ```


 or add to your `package.json` and run npm install:

 ```
   // package.json
   {
      "name": "my-app",
      "devDependencies": {
        "marxjs": "^0.4.1"
      }
    }
 ```

 ```
   $ npm install
 ```


 ### Usage

 Require the module and instantiate Marx object:

 ```
   Marx = require('marxjs');

   new Marx();
 ```

 That's it! You're now up and running with Marx.js. Running your project in the browser you will see the Marx.js widget in the bottom-right corner. Click the button to open and use it.

 #### Configuring

 If you wish to have advanced usage of the Marx.js widget, change the position of the plugin or bind it's functionality to only one specific form, just pass a JavaScript object with the proper key/value pairs _(below)_ to make this happen. Example:

 ```
  const Marx = require('marxjs');
  new Marx({
    controls: 'toggle-all',
    position: 'top-right',
    form: '.my-form'
  });
 ```

 ### Options

| Value    | Default  | Description |
|----------|----------|------------------------------------------|
| controls | standard | select controls provided by MarxJS. See below for options |
| form | null | css selector of a specific form in which to effect changes on |
| position | bottom-right | top-left, top-right, bottom-right, bottom-left |
| ipsum | 3 | default number of paragraphs for the ipsum generator |
| ipsum-max | 10 | maximum paragraphs allowed to generate |
| onload    | false | have marx.js fire on page load. options of <em>true</em>, or an array of all or a subset of [inputs, textareas, checkboxes, radios, selects] |


**Control Options**

| Value    | Description |
|----------|----------------------------------------------------|
| minimum  | just the MarxJS button that fills out entire form. |
| standard | gives options for populate whole form or individual form field types. |
| advanced | all standard options and Clear Form, Populate and Submit, Show Hidden Fields, Expand Select Boxes and Generate Ipsum.|
| toggle-advanced | gives both standard and advanced options but hides advanced till you need them |
| toggle-all | provides buttons to populate whole form, show standard controls and show advanced controls |
