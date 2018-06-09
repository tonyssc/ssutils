module.exports = {
    extends: [
        'eslint-config-alloy',
    ],
    globals: {
        // 这里填入你的项目需要的全局变量
        // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
        //
        // jQuery: false,
        // $: false
    },
    rules: {
        // 项目需要的个性化配置
        "no-new": 0, // 允许new一个实例后不赋值
        "no-undef": 0, // 允许直接引入类似layer的插件，不定义
        "max-nested-callbacks": [0, 5] // 最多5层嵌套回调
    }
};
