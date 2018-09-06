import assert from "assert";
import spawn from "cross-spawn";
import yParser from "yargs-parser";
import {
  existsSync,
  statSync,
  readFileSync,
  writeFileSync,
  unlink,
  renameSync
} from "fs";
import { join, basename } from "path";
import vfs from "vinyl-fs";
import through from "through2";
import chalk from "chalk";
import ejs from "ejs";
import { outputFileSync } from "fs-extra";

function directoryExists(path) {
  return existsSync(path) && statSync(path).isDirectory();
}

function fileExists(path) {
  return existsSync(path) && statSync(path).isFile();
}
function stripEmptyLine(content) {
  const ret = content
    .trim()
    // 两行 -> 一行
    .replace(/\n\n/g, "\n");

  // 结尾空行
  return `${ret}\n`;
}
function info(type, message) {
  console.log(`${chalk.green.bold(type)}  ${message}`);
}

function error(message) {
  console.error(chalk.red(message));
}

function success(message) {
  console.error(chalk.green(message));
}
function template(dest, cwd) {
  return through.obj(function(file, enc, cb) {
    if (!file.stat.isFile()) {
      return cb();
    }

    info("create", file.path.replace(cwd + "/", ""));
    this.push(file);
    cb();
  });
}
export default function(opts = {}) {
  const { name } = opts;
  runReactNativeCli(["init", name], (code, command, args) => {
    const cwd = opts.cwd || process.cwd();

    console.log("run react-nativ-cli end2");
    if (code !== 0) {
      console.error(`\`${command} ${args.join(" ")}\` failed`);
      return;
    }
    //1.删除3个文件 App.js index.js .babelrc
    const appfile = join(cwd, name, "App.js");
    const indexfile = join(cwd, name, "index.js");
    const babelrcfile = join(cwd, name, ".babelrc");
    if (fileExists(appfile)) {
      unlink(appfile, err => {
        if (err) return console.log(err);
      });
    }
    if (fileExists(indexfile)) {
      unlink(indexfile, err => {
        if (err) return console.log(err);
      });
    }
    if (fileExists(babelrcfile)) {
      unlink(babelrcfile, err => {
        if (err) return console.log(err);
      });
    }

    //2.拷贝src目录
    //3.拷贝babelrc 并改名.babelrc
    //4.拷贝eslintrc 并改名.eslintrc
    //5.拷贝index.js
    //6.拷贝README.md
    const targ = join(__dirname, "../app");
    const dest = process.cwd() + `/${name}/`;
    const projectName = basename(dest);
    console.log(`Adding Eslint and Dva.`);
    console.log();

    vfs
      .src(["**/*", "!node_modules/**/*"], {
        cwd: targ,
        cwdbase: true,
        dot: true
      })
      .pipe(template(dest, cwd))
      .pipe(vfs.dest(dest))
      .on("end", function() {
        info("rename", "babelrc -> .babelrc");
        renameSync(join(dest, "babelrc"), join(dest, ".babelrc"));
        info("rename", "eslintrc -> .eslintrc");
        renameSync(join(dest, "eslintrc"), join(dest, ".eslintrc"));
        console.log("Adding Eslint and Dva... Success");
        addPackage(opts);
      })
      .resume();
  });
}
//7.安装插件
function addPackage(opts = {}) {
  const { name } = opts;
  const cwd = process.cwd();
  const jsonTargetPath = join(cwd, name, "package.json");
  const jsTargetPath = join(cwd, name,"src", "index.js");

  const jsonTpl = readFileSync(
    join(__dirname, "../package/package.json"),
    "utf-8"
  );
  const jsTpl = readFileSync(
    join(__dirname, "../package/index.js"),
    "utf-8"
  );
  const jsonContent = ejs.render(
    jsonTpl,
    {
      name
    },
    {
      _with: false,
      localsName: "oni"
    }
  );
  const jsContent = ejs.render(
    jsTpl,
    {
      name
    },
    {
      _with: false,
      localsName: "oni"
    }
  );
  outputFileSync(jsonTargetPath, stripEmptyLine(jsonContent), "utf-8");
  outputFileSync(jsTargetPath, stripEmptyLine(jsContent), "utf-8");
  
  install(name, (code, command, args) => {
    if (code !== 0) {
      console.error(`\`${command} ${args.join(" ")}\` failed`);
      console.log("you can use npm install or yarn install");
    } else {
      console.log("create success");
    }
    process.exit(code);
  });
}
function runReactNativeCli(args, callback) {
  spawn("react-native", args, { stdio: "inherit" })
    .on("exit", function(code) {
      console.log("run react-nativ-cli end");
      // process.exit(code);
      callback(code, "react-native", args);
    })
    .on("error", function() {
      console.warn("This command requires React-Native-CLI.");
      var rl = require("readline").createInterface({
        input: process.stdin,
        output: process.stdout
      });
      rl.question("Do you want to install it globally [Y/n]? ", function(
        answer
      ) {
        rl.close();
        if (/^n/i.test(answer.trim())) {
          process.exit(1);
        } else {
          console.log("Installing the package 'expo-cli'...");
          spawn(
            "npm",
            [
              "install",
              "--global",
              "--loglevel",
              "error",
              "react-native-cli@latest"
            ],
            {
              stdio: ["inherit", "ignore", "inherit"]
            }
          ).on("close", function(code) {
            if (code !== 0) {
              console.error(
                "Installing React-Native-CLI failed. You can install it manually with:"
              );
              console.error("  npm install --global react-native-cl");
              process.exit(code);
            } else {
              console.log(
                "React-Native-CLI installed. You can run `react-native --help` for instructions."
              );
              runReactNativeCli(args, callback);
            }
          });
        }
      });
    });
}

function userHasYarn() {
  try {
    const result = spawn.sync("yarnpkg", ["--version"], { stdio: "ignore" });
    if (result.error || result.status !== 0) {
      return false;
    }
    return true;
  } catch (e) {
    return false;
  }
}
function packageManagerType() {
  const defaultType = "npm";
  return userHasYarn() ? "yarn" : defaultType;
}

function packageManagerCmd() {
  return packageManagerType() === "yarn" ? "yarnpkg" : "npm";
}
function install(name, callback) {
  let command;
  let cmd = packageManagerCmd();
  try {
    process.chdir(name);
    spawn("ls", "", { stdio: "inherit" });
    command = spawn(cmd, "install", { stdio: "inherit" });
    command.stdout.on("data", function(data) {
      console.log(data.toString());
    });
    command.on("close", function(code) {
      return callback(code, cmd, ["install"]);
    });
  } catch (err) {
    console.error(`chdir: ${err}`);
  }
}
