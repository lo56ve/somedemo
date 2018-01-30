/**
 * Created by x on 2017/11/20.
 */
var express = require('express');
var app = express();
var qr_image = require('qr-image');

app.get('/qrcode', function (req, res) {
    var temp_qrcode = qr_image.image('https://lo56ve.github.io');
    res.type('png');
    temp_qrcode.pipe(res);

})

// 需要先请求localhost才能执行createWriteStream生成本地图片用于引用
// app.get('/', function (req, res) {
//     var temp_qrcode = qr_image.image('i love you',{type: 'svg'});
//     temp_qrcode.pipe(require('fs').createWriteStream('i_love_you.svg')).on('error', function (e) {
//         console.error(e)
//     })
// })

app.listen(80);