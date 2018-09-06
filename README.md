# whale-oss-cli
[![NPM version](https://img.shields.io/npm/v/whale-oss-cli.svg?style=flat)](https://npmjs.org/package/whale-oss-cli)
[![NPM downloads](http://img.shields.io/npm/dm/whale-oss-cli.svg?style=flat)](https://npmjs.org/package/whale-oss-cli)

CLI for [dva-native](https://github.com/react-native-examples/react-native-dva-starter) 

## Getting Started

Install, create and start.

```bash
# Install
$ npm install whale-oss-cli -g
or
$ yarn global add whale-oss-cli

# Create app
$ whale-oss create Myapp

# Start app
$ cd Myapp
$ npm run ios
```

## Commands

We have 2 commands: `create`  and `generate`(alias `g`).

### whale-oss new appName

Create app with new directory.

#### Usage Examples

```bash
$ whale-oss create myapp

```


### whale-oss g <type> <name> <?pagename> (short-cut alias: "g")

Generate page and component.

#### Usage Examples

```bash
$ whale-oss g rgpage home
```

## License

[MIT](https://tldrlegal.com/license/mit-license)
