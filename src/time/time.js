/**
 * @file 时间相关方法
 * @date 2018-02-28
 * @author sunshaocheng
 */

/**
 * @desc   格式化${startTime}距现在的已过时间
 * @param  {Date} startTime 需要计算的时间(毫秒)
 * @return {String} 格式化后的日期
 */
const formatPassTime = (startTime) => {
    if (startTime && typeof (startTime === 'number')) {
        let currentTime = Date.parse(new Date());
        let time = currentTime - startTime;
        let day = parseInt(time / (1000 * 60 * 60 * 24), 10);
        let hour = parseInt(time / (1000 * 60 * 60), 10);
        let min = parseInt(time / (1000 * 60), 10);
        let month = parseInt(day / 30, 10);
        let year = parseInt(month / 12, 10);

        if (year) return year + '年前';
        if (month) return month + '个月前';
        if (day) return day + '天前';
        if (hour) return hour + '小时前';
        if (min) return min + '分钟前';
        else return '刚刚';
    } else {
        throw new Error('请输入需要格式化的时间，数字类型，单位为毫秒');
    }
};

/**
 *
 * @desc   格式化现在距${endTime}的剩余时间
 * @param  {Date} endTime
 * @return {String}
 */
const formatRemainTime = (endTime) => {
    if (endTime && typeof (endTime === 'number')) {
        let startDate = new Date(); // 开始时间
        let endDate = new Date(endTime); // 结束时间
        let t = endDate.getTime() - startDate.getTime(); // 时间差
        let d = 0;
        let h = 0;
        let m = 0;
        let s = 0;

        if (t >= 0) {
            d = Math.floor(t / 1000 / 3600 / 24);
            h = Math.floor(t / 1000 / 60 / 60 % 24);
            m = Math.floor(t / 1000 / 60 % 60);
            s = Math.floor(t / 1000 % 60);
        }
        return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒';
    } else {
        throw new Error('请输入需要计算的时间，数字类型，单位为毫秒');
    }
};

/**
 * @desc   判断是否为同一天
 * @param  {Date} date1
 * @param  {Date} date2 可选／默认值：当天
 * @return {Boolean}
 */
const isSameDay = (date1, date2) => {
    let dataTemp;
    if (!date2) {
        dataTemp = new Date();
    }
    let date1Year = date1.getFullYear();
    let date1Month = date1.getMonth() + 1;
    let date1Date = date1.getDate();
    let date2Year = dataTemp.getFullYear();
    let date2Month = dataTemp.getMonth() + 1;
    let date2Date = dataTemp.getDate();

    return date1Date === date2Date && date1Month === date2Month && date1Year === date2Year;
};

/**
 * @desc   格式化时间戳为指定格式日期
 * @param  {string || number} date 毫秒格式时间戳
 * @param  {string} format 需要格式化的日期格式
 * @return {string} 格式化后的日期格式
 */
const formatDate = (date, format) => {
    let formatTemp;
    let dataTemp;
    if (!date) return '';
    if (!format) formatTemp = 'yyyy-MM-dd';
    switch (typeof date) {
        case 'string':
            dataTemp = new Date(Date.parse(date.replace(/-/g, '/')));
            break;
        case 'number':
            dataTemp = new Date(date);
            break;
    }
    if (!(dataTemp instanceof Date)) return;
    let dict = {
        'yyyy': dataTemp.getFullYear(),
        'M': dataTemp.getMonth() + 1,
        'd': dataTemp.getDate(),
        'H': dataTemp.getHours(),
        'm': dataTemp.getMinutes(),
        's': dataTemp.getSeconds(),
        'MM': (String(dataTemp.getMonth() + 101)).substr(1),
        'dd': (String(dataTemp.getDate() + 100)).substr(1),
        'HH': (String(dataTemp.getHours() + 100)).substr(1),
        'mm': (String(dataTemp.getMinutes() + 100)).substr(1),
        'ss': (String(dataTemp.getSeconds() + 100)).substr(1)
    };
    return formatTemp.replace(/(yyyy|MM?|dd?|HH?|ss?|mm?)/g, function() {
        return dict[arguments[0]];
    });
};

module.exports = { formatPassTime, formatRemainTime, isSameDay, formatDate };
