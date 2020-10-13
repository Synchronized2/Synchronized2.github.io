getWeather();

function getWeather() {
    $.getJSON('https://www.tianqiapi.com/api/?version=v9&appid=84233236&appsecret=x5ILOZ2d', function(result) {
        var update_time = Date.parse(result.update_time);
        update_time = getTime(update_time);
        $('.tianqi_icon').html(setWeatherIcon(result.data[0].wea));
        $('.tianqi_bg').css('background-image', setBgImg(result.data[0].wea));

        $('.weather-header-city').append(result.city);
        $('.weather-header-time').html(update_time + ' 更新');
        $('.weather-content-content .wea').html(result.data[0].wea);
        $('.weather-content-content .tem').html(result.data[0].hours[0].tem);

        $('.weather-content-right .win').html(result.data[0].hours[0].win + '&nbsp;' + result.data[0].hours[0].win_speed);
        $('.weather-content-right .air_level').html('空气&nbsp;' + result.data[0].air_level);
        $('.weather-content-right .humidity').html('相对湿度&nbsp;' + result.data[0].humidity);

        $('.weather-list').html('');
        var str = '';
        var tianqi_icon = setWeatherIcon(result.data[0].wea);
        var wea = result.data[0].wea;
        var tem = result.data[0].hours[0].tem;
        var week = '今天';
        for (var i = 0; i < 3; i++) {
            if (i > 0) {
                tianqi_icon = setWeatherIcon(result.data[i].hours[0].wea);
                week = result.data[i].week;
                wea = result.data[i].hours[0].wea;
                tem = result.data[i].hours[0].tem;
            }
            str += '<ul>\n' +
                '            <li>' + week + '</li>\n' +
                '            <li>' + tianqi_icon + '</li>\n' +
                '            <li class="text">' + wea + '</li>\n' +
                '            <li>' + tem + '</li>\n' +
                '        </ul>';
        }
        $('.weather-list').html(str);
    })
}

// 根据天气设置背景图片
function setBgImg(wea) {
    var bg_img = '';
    if (wea.indexOf("晴") >= 0) {
        bg_img = 'url("./images/weather/bg/qingtian.jpg"';
    } else if (wea.indexOf("雷") >= 0) {
        bg_img = 'url("./images/weather/bg/lei.gif"';
    } else if (wea.indexOf("雨") >= 0) {
        bg_img = 'url("./images/weather/bg/rain.gif"';
    } else if (wea.indexOf("多云") >= 0) {
        if (wea.indexOf("雨") >= 0) {
            bg_img = 'url("./images/weather/bg/rain.gif"';
        } else {
            bg_img = 'url("./images/weather/bg/qingtian.jpg"';
        }
    } else {
        bg_img = 'url("./images/weather/bg/qingtian.jpg"';
    }
    return bg_img;
}

// 根据天气设置图标
function setWeatherIcon(wea) {
    var wea_img = '';
    if (wea.indexOf("晴") >= 0) {
        if (wea.indexOf("雨") >= 0) {
            wea_img = '<img src="./images/weather/icon/clearr.png" />';
        } else if (wea.indexOf("云") >= 0) {
            wea_img = '<img src="./images/weather/icon/clear.png" />';
        } else {
            wea_img = '<img src="./images/weather/icon/sunny.png" />';
        }
    } else if (wea.indexOf("雷") >= 0) {
        if (wea.indexOf("暴") >= 0) {
            wea_img = '<img src="./images/weather/icon/blusteryr.png" />';
        } else {
            wea_img = '<img src="./images/weather/icon/blustery.png" />';
        }
    } else if (wea.indexOf("雨") >= 0) {
        if (wea.indexOf("晴") >= 0) {
            wea_img = '<img src="./images/weather/icon/clearr.png" />';
        } else {
            wea_img = '<img src="./images/weather/icon/rainy.png" />';
        }
    } else {
        wea_img = '<img src="./images/weather/icon/cloudy.png" />';
    }
    return wea_img;
}

function getTime(timestamp) {
    var date = new Date(timestamp);
    //var Y = date.getFullYear() + '-';
    //var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    //var D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
    var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes());
    //var s = (date.getSeconds() <10 ? '0' + date.getSeconds() : date.getSeconds());
    return h + m;
}