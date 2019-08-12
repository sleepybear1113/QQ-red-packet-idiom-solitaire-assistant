# 这啥

这是一个Android上用于QQ的成语接龙红包的APP，可以用来辅助抢/捣乱红包，最低要求Android 7.0

而且不需要联网权限，全靠本地文件，用auto.js写的，autojs是Android上免root类似按键精灵的工具

[点击此处下载apk](https://github.com/sleepybear1113/QQ-red-packet-idiom-solitaire-assistant/raw/master/QQ%E7%BA%A2%E5%8C%85%E6%88%90%E8%AF%AD%E6%8E%A5%E9%BE%99%E5%8A%A9%E6%89%8B.apk)

建议查看本文档末尾的更新日志，否则可能成语文件改动而无法正常生效

# 咋用

下载apk，安装就完成一半了。需要无障碍功能才能使用。而一般的手机打开这个APP，就会自动打开设置，进入无障碍界面，在安装的应用里面选择这个APP，名字应该叫做“QQ红包成语接龙助手”吧。

## 下面是三星S8的4步操作

### 第一步

![第一步](https://raw.githubusercontent.com/sleepybear1113/QQ-red-packet-idiom-solitaire-assistant/master/imgs/001.jpg)

### 第二步

![第二步](https://raw.githubusercontent.com/sleepybear1113/QQ-red-packet-idiom-solitaire-assistant/master/imgs/002.jpg)

### 第三步

![第三步](https://raw.githubusercontent.com/sleepybear1113/QQ-red-packet-idiom-solitaire-assistant/master/imgs/003.jpg)

然后点击确定就行了

### 第四步

授予悬浮窗权限，这里就不贴图了。要是没授予的话，emmm，自行百度各个品牌手机怎么开启吧。同时无障碍模式各个品牌手机都不一样，具体自己去百度

### 第五步

进入群，点击要抢的红包，会在你的对话框那里显示下一个音（红圈所示），此时点击生成就行啦。或者绿圈的信息也能识别

![img](https://raw.githubusercontent.com/sleepybear1113/QQ-red-packet-idiom-solitaire-assistant/master/imgs/005.jpg)

## 为什么我点不了确定？

你可能使用了别的悬浮窗或者悬浮球，需要关闭才能点击

# 成功启动的样子

回到APP，在红字之余会有下面的一些提示信息。

![成功加载](https://raw.githubusercontent.com/sleepybear1113/QQ-red-packet-idiom-solitaire-assistant/master/imgs/004.jpg)

具体操作在悬浮窗上，可移动可退出。若将APP杀后台，则要重新开启无障碍

# 如何自定义

APP启动之后，会在手机内部储存下面生成一个脚本文件夹，进入会有这个APP的文件夹，可以看到三个文件chengyu.txt、nearDead.txt、dead.txt文件，分别代表全部成语、往下接可能会死局的成语尾音、直接死局的成语尾音，具体自己打开文件查看。

修改上述的文件，就能自定义了

## 文件被我改坏了，软件启动报错怎么办

那就删掉改错的文件，再重启APP

## 本地没有这三文件怎么办

那就只能用APP自带的默认的了

# 软件出现bug了怎么办

联系我，我会告诉你，我可能懒得修复。因为我自己能用啊，免费的白嫖用着就行啦

# 更新日志

2019/08/11 v2.0.9 优化查询性能，修改为HashMap

2019/08/12 v2.1.2 删除nearDead.txt，从dead.txt中自动查询。修改其中个别成语的错音。需要删除本地的文件才能生效，详见运行APP后的说明按钮的文件路径。不过其中还是有不少错音的。

# 其他

我想到再补
