# simpleowl 0.0.1
> No more scripting required to integrate carousel.owl into your website! This plugin uses HTML5 attributes rather then JS codes.

## Bower
Install with Bower: ``bower install simpleowl``

## Documentation
[See here for more info](https://github.com/Qaraqter/simpleowl/blob/master/DOCUMENTATION.md)

## Examples
Coming.

# Using this repo
## NodeJS

### NPM
If you haven't used [npm](https://www.npmjs.com/) before, be sure to check out the [Getting Started](https://docs.npmjs.com/getting-started/what-is-npm) guide, as it explains how to [install npm](https://docs.npmjs.com/getting-started/installing-node). Once you're familiar with that process, install the required plugins with this command in the root of your project:

```shell
npm install
```

### Bower
After installing the required NodeJS modules we also need to download dependecies from bower.
```shell
bower install
```

### Building
To build the source files into `simpleowl.js`, `simpleowl.min.js`  and `simpleowl.dev.js`, simple run:
```shell
npm run build
```

To watch the source files for new changes and to automatically build `simpleowl.dev.js`:
```shell
npm run watch
```

Other commands:
```shell
npm run build-min
```
```shell
npm run build-dev
```
```shell
npm run build-main
```

## SourceMap
`simpleowl.dev.js` contains a sourcemap and is - beside the sourcemap - identical to `simpleowl.js`
