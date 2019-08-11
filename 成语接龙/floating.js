let width = device.width;
let height = device.height;

let window = floaty.window(
    <vertical>
        <horizontal>
            <button id="move" padding="0" text="移动" w="20" h="20" bg="#77ffffff" textSize="8sp"/>
            <button id="info" padding="0" text="说明" w="20" h="20" bg="#77e0e0e0" textSize="8sp"/>
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
setInterval(() => {
}, 1000);
window.exitOnClose();
let x, y, windowX, windowY, downTime;

//=======以上是悬浮窗设置============

let isStrictMatch = false;//是否严格匹配成语末尾
let optionSend = false;//是否立即发送
let opt = 0;//成语范围选项
let send;//send函数，最后会加载函数

//这个函数是对应悬浮窗的移动
window.move.setOnTouchListener(function (view, event) {
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


window.exit.setOnTouchListener(function (view, event) {
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
    dialogs.select("点击生成后", a, function (index) {
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
    dialogs.select("成语范围", a, function (index) {
        console.log(index, a[index]);
        if (index >= 0) {
            opt = index;
        }
    });
}

//对应设置3
function dialog3() {
    let a = ["尽量满足条件范围，否则随机接龙", "严格满足条件范围"];
    dialogs.select("对于设置2中成语的筛选", a, function (index) {
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

window.info.click(() => {
    let title = "说明 by sleepybear";
    let msg = "用来QQ红包的成语接龙\n在手机内部储存的脚本文件夹→QQ红包成语接龙助手文件夹中有所有成语的的文本，打开可修改接龙死局和全部成语\n点击确定复制(使用方法)的网址链接";
    confirm(title, msg).then(isOk => {
        if (isOk) {
            let url = "https://github.com/sleepybear1113/QQ-red-packet-idiom-solitaire-assistant/blob/master/README.md";
            setClip(url);
            toastLog("将助手使用方法的网址加入剪切板，或者在日志页面查看网址");
            console.log(url);
        }
    });
});

//加载实际脚本
send = require("script.js");