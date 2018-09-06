"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = opts.name;

  runReactNativeCli(["init", name], function (code, command, args) {
    var cwd = opts.cwd || process.cwd();

    console.log("run react-nativ-cli end2");
    if (code !== 0) {
      console.error("`" + command + " " + args.join(" ") + "` failed");
      return;
    }
    //1.删除3个文件 App.js index.js .babelrc
    var appfile = (0, _path.join)(cwd, name, "App.js");
    var indexfile = (0, _path.join)(cwd, name, "index.js");
    var babelrcfile = (0, _path.join)(cwd, name, ".babelrc");
    if (fileExists(appfile)) {
      (0, _fs.unlink)(appfile, function (err) {
        if (err) return console.log(err);
      });
    }
    if (fileExists(indexfile)) {
      (0, _fs.unlink)(indexfile, function (err) {
        if (err) return console.log(err);
      });
    }
    if (fileExists(babelrcfile)) {
      (0, _fs.unlink)(babelrcfile, function (err) {
        if (err) return console.log(err);
      });
    }

    //2.拷贝src目录
    //3.拷贝babelrc 并改名.babelrc
    //4.拷贝eslintrc 并改名.eslintrc
    //5.拷贝index.js
    //6.拷贝README.md
    var targ = (0, _path.join)(__dirname, "../app");
    var dest = process.cwd() + ("/" + name + "/");
    var projectName = (0, _path.basename)(dest);
    console.log("Adding Eslint and Dva.");
    console.log();

    _vinylFs2.default.src(["**/*", "!node_modules/**/*"], {
      cwd: targ,
      cwdbase: true,
      dot: true
    }).pipe(template(dest, cwd)).pipe(_vinylFs2.default.dest(dest)).on("end", function () {
      info("rename", "babelrc -> .babelrc");
      (0, _fs.renameSync)((0, _path.join)(dest, "babelrc"), (0, _path.join)(dest, ".babelrc"));
      info("rename", "eslintrc -> .eslintrc");
      (0, _fs.renameSync)((0, _path.join)(dest, "eslintrc"), (0, _path.join)(dest, ".eslintrc"));
      console.log("Adding Eslint and Dva... Success");
      addPackage(opts);
    }).resume();
  });
};

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _crossSpawn = require("cross-spawn");

var _crossSpawn2 = _interopRequireDefault(_crossSpawn);

var _yargsParser = require("yargs-parser");

var _yargsParser2 = _interopRequireDefault(_yargsParser);

var _fs = require("fs");

var _path = require("path");

var _vinylFs = require("vinyl-fs");

var _vinylFs2 = _interopRequireDefault(_vinylFs);

var _through = require("through2");

var _through2 = _interopRequireDefault(_through);

var _chalk = require("chalk");

var _chalk2 = _interopRequireDefault(_chalk);

var _ejs = require("ejs");

var _ejs2 = _interopRequireDefault(_ejs);

var _fsExtra = require("fs-extra");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function directoryExists(path) {
  return (0, _fs.existsSync)(path) && (0, _fs.statSync)(path).isDirectory();
}

function fileExists(path) {
  return (0, _fs.existsSync)(path) && (0, _fs.statSync)(path).isFile();
}
function stripEmptyLine(content) {
  var ret = content.trim()
  // 两行 -> 一行
  .replace(/\n\n/g, "\n");

  // 结尾空行
  return ret + "\n";
}
function info(type, message) {
  console.log(_chalk2.default.green.bold(type) + "  " + message);
}

function error(message) {
  console.error(_chalk2.default.red(message));
}

function success(message) {
  console.error(_chalk2.default.green(message));
}
function template(dest, cwd) {
  return _through2.default.obj(function (file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    info("create", file.path.replace(cwd + "/", ""));
    this.push(file);
    cb();
  });
}

//7.安装插件
function addPackage() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var name = opts.name;

  var cwd = process.cwd();
  var jsonTargetPath = (0, _path.join)(cwd, name, "package.json");
  var jsTargetPath = (0, _path.join)(cwd, name, "src", "index.js");

  var jsonTpl = (0, _fs.readFileSync)((0, _path.join)(__dirname, "../package/package.json"), "utf-8");
  var jsTpl = (0, _fs.readFileSync)((0, _path.join)(__dirname, "../package/index.js"), "utf-8");
  var jsonContent = _ejs2.default.render(jsonTpl, {
    name: name
  }, {
    _with: false,
    localsName: "oni"
  });
  var jsContent = _ejs2.default.render(jsTpl, {
    name: name
  }, {
    _with: false,
    localsName: "oni"
  });
  (0, _fsExtra.outputFileSync)(jsonTargetPath, stripEmptyLine(jsonContent), "utf-8");
  (0, _fsExtra.outputFileSync)(jsTargetPath, stripEmptyLine(jsContent), "utf-8");

  install(name, function (code, command, args) {
    if (code !== 0) {
      console.error("`" + command + " " + args.join(" ") + "` failed");
      console.log("you can use npm install or yarn install");
    } else {
      console.log("create success");
    }
    process.exit(code);
  });
}
function runReactNativeCli(args, callback) {
  (0, _crossSpawn2.default)("react-native", args, { stdio: "inherit" }).on("exit", function (code) {
    console.log("run react-nativ-cli end");
    // process.exit(code);
    callback(code, "react-native", args);
  }).on("error", function () {
    console.warn("This command requires React-Native-CLI.");
    var rl = require("readline").createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question("Do you want to install it globally [Y/n]? ", function (answer) {
      rl.close();
      if (/^n/i.test(answer.trim())) {
        process.exit(1);
      } else {
        console.log("Installing the package 'expo-cli'...");
        (0, _crossSpawn2.default)("npm", ["install", "--global", "--loglevel", "error", "react-native-cli@latest"], {
          stdio: ["inherit", "ignore", "inherit"]
        }).on("close", function (code) {
          if (code !== 0) {
            console.error("Installing React-Native-CLI failed. You can install it manually with:");
            console.error("  npm install --global react-native-cl");
            process.exit(code);
          } else {
            console.log("React-Native-CLI installed. You can run `react-native --help` for instructions.");
            runReactNativeCli(args, callback);
          }
        });
      }
    });
  });
}

function userHasYarn() {
  try {
    var result = _crossSpawn2.default.sync("yarnpkg", ["--version"], { stdio: "ignore" });
    if (result.error || result.status !== 0) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
function packageManagerType() {
  var defaultType = "npm";
  return userHasYarn() ? "yarn" : defaultType;
}

function packageManagerCmd() {
  return packageManagerType() === "yarn" ? "yarnpkg" : "npm";
}
function install(name, callback) {
  var command = void 0;
  var cmd = packageManagerCmd();
  try {
    process.chdir(name);
    (0, _crossSpawn2.default)("ls", "", { stdio: "inherit" });
    command = (0, _crossSpawn2.default)(cmd, "install", { stdio: "inherit" });
    command.stdout.on("data", function (data) {
      console.log(data.toString());
    });
    command.on("close", function (code) {
      return callback(code, cmd, ["install"]);
    });
  } catch (err) {
    console.error("chdir: " + err);
  }
}
module.exports = exports["default"];