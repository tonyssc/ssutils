# ssutils

前端业务代码工具库

> 目的：高效完成前端业务代码

业务开发过程中，会经常用到`日期格式化`、`url参数转对象`、`浏览器类型判断`等常用函数，为避免不同项目多次复制粘贴的麻烦，这里统一封装，并发布到npm，以提高开发效率。

## 安装使用

1. 直接下载`dist`目录下的[ss-utils.min.js](https://github.com/tonyssc/ssutils/master/dist/ssutils.min.js)
2. 使用yarn或者npm安装

### 浏览器
```html
    <script src="ssutils.min.js"></script>
    <script>
        var browser = ssutils.browser()
    </script>
```

### yarn or npm
```bash
$ yarn install --dev ssutils
$ npm install --save-dev ssutils
```

webpack、RequireJS、SeaJS等

``` javascript
// 完整引入
const ssutils = require('ssutils')
const browser = ssutils.browser()
```

