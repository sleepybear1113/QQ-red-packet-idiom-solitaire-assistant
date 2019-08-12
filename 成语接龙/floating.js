let width = device.width;
let height = device.height;

let window = floaty.window(
    <vertical>
        <horizontal>
            <button id="move" padding="0" text="移动" w="20" h="20" bg="#77ffffff" textSize="8sp"/>
            <button id="more" padding="0" text="更多" w="20" h="20" bg="#77e0e0e0" textSize="8sp"/>
            <button id="exit" padding="0" text="退出" w="20" h="20" bg="#77ffffff" textSize="8sp"/>
        </horizontal>
        <horizontal>
            <button id="setting1" padding="0" text="设置1" w="20" h="25" bg="#77ffffff" textSize="8sp"/>
            <button id="setting2" padding="0" text="设置2" w="20" h="25" bg="#77ffffff" textSize="8sp"/>
            <button id="setting3" padding="0" text="设置3" w="20" h="25" bg="#77ffffff" textSize="8sp"/>
        </horizontal>
        <button id="start" padding="0" text="生成成语" w="60" h="30" bg="#77ffffff" textSize="10sp"/>
    </vertical>
);
window.setPosition(parseInt(width * 0.75), parseInt(height * 0.1));
setInterval(() => {}, 1000);
window.exitOnClose();
let x, y, windowX, windowY, downTime;

//=======以上是悬浮窗设置============

let isStrictMatch = false; //是否严格匹配成语末尾
let optionSend = false; //是否立即发送
let opt = 0; //成语范围选项
let send; //send函数，最后会加载函数
let download;

//这个函数是对应悬浮窗的移动
window.move.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //如果按下的时间超过xx秒判断为长按，调整悬浮窗位置
            if (new Date().getTime() - downTime > 300) {
                window.setPosition(windowX + (event.getRawX() - x), windowY + (event.getRawY() - y));
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 30 && Math.abs(event.getRawX() - x) < 30) {
                toastLog("长按调整位置")
            }
            return true;
    }
    return true;
});


window.exit.setOnTouchListener(function(view, event) {
    switch (event.getAction()) {
        case event.ACTION_DOWN:
            x = event.getRawX();
            y = event.getRawY();
            windowX = window.getX();
            windowY = window.getY();
            downTime = new Date().getTime();
            return true;
        case event.ACTION_MOVE:
            //如果按下的时间超过xx秒判断为长按，退出
            if (new Date().getTime() - downTime > 500) {
                toastLog("退出脚本！");
                exit();
            }
            return true;
        case event.ACTION_UP:
            //手指弹起时如果偏移很小则判断为点击
            if (Math.abs(event.getRawY() - y) < 30 && Math.abs(event.getRawX() - x) < 30) {
                toastLog("长按退出脚本")
            }
            return true;
    }
    return true;
});

//对应设置1
function dialog1() {
    let a = ["直接发送成语", "不发送，留在输入框中"];
    dialogs.select("点击生成后", a, function(index) {
        console.log(index, a[index]);
        if (index === 0) {
            optionSend = true;
        } else if (index === 1) {
            optionSend = false;
        }
    });
}

//对应设置2
function dialog2() {
    let a = ["全部成语列表", "全部成语列表(首尾读音相同)", "以可能造成死局结尾的成语", "输入死局"];
    dialogs.select("成语范围", a, function(index) {
        console.log(index, a[index]);
        if (index >= 0) {
            opt = index;
        }
    });
}

//对应设置3
function dialog3() {
    let a = ["尽量满足条件范围，否则随机接龙", "严格满足条件范围"];
    dialogs.select("对于设置2中成语的筛选", a, function(index) {
        console.log(index, a[index]);
        if (index === 0) {
            isStrictMatch = false;
        } else if (index === 1) {
            isStrictMatch = true;
        }
    });
}


window.start.click(() => {
    if (send == null) {
        toastLog("请等待加载成语列表");
    } else {
        send(opt, optionSend, isStrictMatch);
    }
});

window.setting1.click(() => {
    dialog1();
});

window.setting2.click(() => {
    dialog2();
});

window.setting3.click(() => {
    dialog3();
});


function more() {
    let a = ["辅助APP说明", "联网更新词库选项"];
    dialogs.select("更多", a, function(index) {
        console.log(index, a[index]);
        if (index == 0) {
            info();
        } else if (index == 1) {
            update();
        }
    });
}

function info() {
    let title = "说明 by sleepybear";
    let msg = "〇这是一个用来辅助QQ红包的成语接龙的脚本APP\n〇在手机内部储存[(sdcard/脚本/QQ红包成语接龙助手)文件夹]，有所有成语的词库(chengyu.txt)，和死局的成语尾音(dead.txt)，可修改添加词库中未收录的词\n〇当修改词库导致APP无法正常使用时，可以选择更新词库或者将修改的文件删除，系统会复制加载默认词库文件\n〇点击“确定”复制(使用方法)的网址链接";
    confirm(title, msg).then(isOk => {
        if (isOk) {
            let url = "https://github.com/sleepybear1113/QQ-red-packet-idiom-solitaire-assistant/blob/master/README.md";
            setClip(url);
            toastLog("将助手使用方法的网址加入剪切板，或者在日志页面查看网址");
            console.log(url);
        }
    });
}

function update() {
    let a = ["返回×", "更新总成语词库(大小约1MB，8秒)", "更新死局词语(1KB)"];
    let fileNameCY = "chengyu.txt";
    let fileNameDead = "dead.txt";
    let path = "/sdcard/脚本/QQ红包成语接龙助手/";
    let url = "https://raw.githubusercontent.com/sleepybear1113/QQ-red-packet-idiom-solitaire-assistant/master/%E6%88%90%E8%AF%AD%E6%8E%A5%E9%BE%99/";

    dialogs.select("更新选项(在我自己用的时候，词库可能会变化，所以将词库以更新的形式呈现，这样就不用重新下载安装APP了)\n更新完请重启APP", a, function(index) {
        console.log(index, a[index]);
        if (index === 1) {
            threads.start(function() {
                toastLog("开始更新总成语词库");
                download(url + fileNameCY, path + fileNameCY, 1024 * 700);
                toastLog("请重启APP以重新加载词库");
            });
        } else if (index === 2) {
            threads.start(function() {
                toastLog("开始更新死局尾音文档");
                download(url + fileNameDead, path + fileNameDead, 200);
                toastLog("请重启APP以重新加载词库");
            });
        }
    });
}

window.more.click(() => {
    more();
});

//加载下载模块
download = require("./download.js");
//加载实际脚本
send = require("./script.js");