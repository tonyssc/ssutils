/**
 * @file 字符串相关方法
 * @date 2018-02-28
 * @author sunshaocheng
 */

/**
 *
 * @desc   现金额转大写
 * @param  {Number} n
 * @return {String}
 */
const digitUppercase = (n) => {
    let inputNumber;
    if (n && typeof (n) === 'number') {
        let fraction = ['角', '分'];
        let digit = [
            '零', '壹', '贰', '叁', '肆',
            '伍', '陆', '柒', '捌', '玖'
        ];
        let unit = [
            ['元', '万', '亿'],
            ['', '拾', '佰', '仟']
        ];
        let head = n < 0 ? '欠' : '';
        inputNumber = Math.abs(n);
        let s = '';
        for (let i = 0; i < fraction.length; i++) {
            s += (digit[Math.floor(inputNumber * 10 * Math.pow(10, i)) % 10] + fraction[i]).replace(/零./, '');
        }
        s = s || '整';
        inputNumber = Math.floor(n);
        for (let i = 0; i < unit[0].length && inputNumber > 0; i++) {
            let p = '';
            for (let j = 0; j < unit[1].length && inputNumber > 0; j++) {
                p = digit[inputNumber % 10] + unit[1][j] + p;
                inputNumber = Math.floor(inputNumber / 10);
            }
            s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s;
        }
        return head + s.replace(/(零.)*零元/, '元')
            .replace(/(零.)+/g, '零')
            .replace(/^整$/, '零元整');
    } else {
        throw new Error('请输入要转换的金额, 金额类型必须为数字类型');
    }
};

module.exports = { digitUppercase };
