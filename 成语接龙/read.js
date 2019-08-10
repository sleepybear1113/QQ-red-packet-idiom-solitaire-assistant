/**
 * 一个通用的读取文件的函数
 * 作用：在第一次运行的时候将文件写入本地，在之后的运行中，可以修改本地成语文件
 * @param appPath 在APP内部的默认文件
 * @param sdcardPath 写入手机本地文件夹的文件
 * @returns {list} 返回一个读取文件后的list
 */
function createAndReadFile(appPath, sdcardPath) {
    files.ensureDir(sdcardPath);
    if (files.exists(sdcardPath) === false) {
        files.copy(appPath, sdcardPath);
    }

    let file;
    if (files.exists(sdcardPath) === true) {
        file = open(sdcardPath, "r");
        console.log("加载本地文件" + appPath);
    } else {
        file = open(appPath, "r");
        console.log("加载默认文件" + appPath);
    }

    file.readline();
    let lines = file.readlines();
    file.close();
    return lines;
}

//读取全部的成语列表
function readCYFile() {
    let sdcard_path = "/sdcard/脚本/QQ红包成语接龙助手/chengyu.txt";
    let app_path = "chengyu.txt";

    let lines = createAndReadFile(app_path, sdcard_path);
    let list = [];

    for (let i = 0; i < lines.length; i++) {
        let sp = lines[i].split("@");
        let py = sp[1].split(":");
        let py0 = py[0];
        let py1 = py[py.length - 1];

        let s = [sp[0], py0, py1];
        list.push(s);
    }
    return list;
}


//读取存放的可以往下接死局的成语的文件
function readNearDeadFile() {
    let sdcard_path = "/sdcard/脚本/QQ红包成语接龙助手/nearDead.txt";
    let app_path = "nearDead.txt";
    let getList = createAndReadFile(app_path, sdcard_path);
    let list = [];
    for (let i = 0; i < getList.length; i++) {
        list.push(getList[i]);
    }
    return list;
}

//读取死局结尾音的成语的文件
function readDeadFile() {
    let sdcard_path = "/sdcard/脚本/QQ红包成语接龙助手/dead.txt";
    let app_path = "dead.txt";
    let list = [];
    let getList = createAndReadFile(app_path, sdcard_path);
    for (let i = 0; i < getList.length; i++) {
        list.push(getList[i]);
    }
    return list;
}

toastLog("正在读取成语列表，请稍后");
let cyFile = readCYFile();
let nearDeadFile = readNearDeadFile();
let deadFile = readDeadFile();
toastLog("成语列表读取完毕，共" + cyFile.length + "行");

let out = {};
out.cyFile = cyFile;
out.nearDeadFile = nearDeadFile;
out.deadFile = deadFile;
module.exports = out;

