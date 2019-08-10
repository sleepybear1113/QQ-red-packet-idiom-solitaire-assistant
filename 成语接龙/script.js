let read = require("./read.js");
let allList = read.cyFile;
let nearDeadList = read.nearDeadFile;
let deadList = read.deadFile;

//通用的点击函数
function clickItemInCenter(item, time) {
    if (time === undefined) {
        time = 50;
    }

    if (item != null) {
        let x = item.bounds().centerX();
        let y = item.bounds().centerY();
        press(x, y, time);
        return true;
    }
    return false;
}

//获取QQ界面中最后一个拼音
function getLastPinYin() {
    let bar_last = text("下一个接龙拼音：").findOnce();
    let last = null;
    if (bar_last != null) {
        let parent = bar_last.parent();
        let child = parent.child(1);
        last = child.getText();
    } else {
        let list = id("graybar").find();

        let bottom = 0;
        for (let i = 0; i < list.length; i++) {
            let item = list[i];
            let desc = item.desc();
            if (desc == null) {
                continue;
            }
            if (desc.indexOf("接龙红包下一个拼音") !== -1) {
                let b = item.bounds().bottom;
                if (b > bottom) {
                    bottom = b;
                    last = desc.split("：")[1];
                }
            }
        }
    }

    console.log("接龙红包下一个拼音:" + last);
    return last;
}

/**
 * 筛选器，输入接龙的首尾可以筛选出符合条件的成语列表
 * @param first 成语开头拼音，必须
 * @param last 成语结尾拼音，可变。若为null，则不进行筛选；若为集合，则尾音要符合集合中的音
 * @returns {*[]} 返回筛选出来的列表集合
 */
function filterList(first, last) {
    let list0 = [];//未经过筛选的集合
    let list1 = [];//经过筛选的集合

    //如果集合为空，那么表示首尾音相同，将首音加入尾音
    if (last != null) {
        if (last.length === 0) {
            last.push(first);
        } else {
            console.log("要接龙的成语尾音：" + last);
        }
    }

    //遍历全部集合
    for (let i = 0; i < allList.length; i++) {
        let item = allList[i];
        let py0 = item[1];
        let py1 = item[2];

        //如果首音匹配，加入未筛选集合
        if (first === py0) {
            list0.push(item);

            //如果尾音不为空，那么对尾音中的音进行遍历，将符合的音加入筛选集合
            if (last != null) {
                for (let j = 0; j < last.length; j++) {
                    if (last[j] === py1) {
                        list1.push(item);
                    }
                }
            }
        }
    }

    let ret;//返回的结果

    //以下true代表经过筛选（包含不设置筛选）后的集合。false代表筛选后没有结果，返回的是筛选前的结果
    if (last != null) {
        if (list1.length > 0) {
            ret = [list1, true];
        } else {
            ret = [list0, false];
        }
    } else {
        ret = [list0, true];
    }
    return ret;
}

/**
 * 随机获取一个成语
 * @param first 成语开头拼音，必须
 * @param last 成语结尾拼音，可变。若为null，则不进行筛选；若为集合，则尾音要符合集合中的音
 * @param isStrictMatch 是否严格符合要求筛选结果。若是，则可能返回空；否则在不符合筛选下，返回未筛选的结果
 * @returns {null|*} 返回一个成语字符串
 */
function getRandomFromList(first, last, isStrictMatch) {
    let result = filterList(first, last);
    let symbol = result[1];//筛选成功标志
    let list = result[0];//筛选后的列表
    let length = list.length;//筛选后的列表长度

    let chengyu;//最后要返回的成语
    let r = -1;//随机数
    if (length > 0) {
        r = rnd(0, length - 1);
    }

    //当启用严格符合，当筛选成功标志为false，表示虽然返回未筛选的结果，但是用户需要的是要筛选的结果，那么返回空
    if (isStrictMatch === true) {
        if (symbol === false) {
            toastLog("没有以“" + first + "”开头以“" + last + "”结尾的成语");
            return null;
        }
    }

    if (r >= 0) {
        chengyu = list[r][0];
        if (symbol === false) {
            toastLog("没有符合结尾为“" + last + "”的成语\n替代成语：" + chengyu);
        } else {
            toastLog(chengyu);
        }
        return chengyu;
    }
    toastLog("emmm好像没有成语能接得上");
    return null;
}

/**
 * 生成[n,m]间的随机数
 * @param n
 * @param m
 * @returns {number}
 */
function rnd(n, m) {
    return Math.floor(Math.random() * (m - n + 1) + n);
}

/**
 * 发送按钮，将获取的最后的成语写入输入框或者直接发送
 * @param opt 筛选选项  0-不筛选    1-首尾音相同    2-接龙之后，在往下接可以造成死局    3-直接接死局
 * @param isDirectlySend
 * @param isStrictMatch
 * @returns {null|boolean}
 */
function send(opt, isDirectlySend, isStrictMatch) {
    let first = getLastPinYin();
    let last = null;
    if (first == null) {
        toastLog("没有找到成语接龙，请保证可见页面上显示了“接龙红包下一个拼音：xxx”");
        return null;
    }

    if (opt === 0) {
        last = null;
    } else if (opt === 1) {
        last = [];
    } else if (opt === 2) {
        last = nearDeadList;
    } else if (opt === 3) {
        last = deadList;
    }

    let chengyu = getRandomFromList(first, last, isStrictMatch);
    if (chengyu == null) {
        return null;
    }

    inputText(chengyu, isDirectlySend);
    return true;
}

/**
 * 输入QQ发送消息框
 * @param text 要发的消息
 * @param isDirectlySend 是否直接发送，还是留在框中
 */
function inputText(text, isDirectlySend) {
    let input_view = id("input").findOnce();
    if (input_view != null) {
        input_view.setText(text);
        if (isDirectlySend === true) {
            let send_btn = id("fun_btn").findOnce();
            threads.start(function () {
                sleep(150);
                clickItemInCenter(send_btn);
            });
        }
    }
}

module.exports = send;



