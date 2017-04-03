    // 修改为您的apikey.可在官网（https://www.yunpian.com)登录后获取
    var https = require('https');
    var qs = require('querystring');

    var apikey = '76dab99c20b7fc868363e6e85a52203c';
    // 修改为您要发送的手机号码，多个号码用逗号隔开
    // var mobile = '18814127584';
    // 指定发送的模板编号
    var tpl_id = 1747372;
    // 指定发送模板的内容
    var tpl_value =  {'#name#':'林要改','#title#':'何胖胖老师的课'};
    // 智能匹配模板发送https地址
    var sms_host = 'sms.yunpian.com';
    // 指定模板发送接口https地址
    send_tpl_sms_uri = '/v1/sms/tpl_send.json';

    var message = {
        init:function (mobile) {
            this.send_tpl_sms(send_tpl_sms_uri,apikey,mobile,tpl_id,tpl_value);
        },
        send_tpl_sms:function (uri,apikey,mobile,tpl_id,tpl_value) {
            var post_data = {
                'apikey': apikey,
                'mobile':mobile,
                'tpl_id':tpl_id,
                'tpl_value':qs.stringify(tpl_value),
            };//这是需要提交的数据
            var content = qs.stringify(post_data);
            console.log(1212);
            // this.post(uri,content,sms_host);
        },
        post:function (uri,content,host) {
            var options = {
                hostname: host,
                port: 443,
                path: uri,
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            };
            var req = https.request(options, function (res) {
                // console.log('STATUS: ' + res.statusCode);
                // console.log('HEADERS: ' + JSON.stringify(res.headers));
                res.setEncoding('utf8');
                res.on('data', function (chunk) {
                    console.log('BODY: ' + chunk);
                });
            });
            //console.log(content);
            req.write(content);
            req.end();
        }
    }

    module.exports = message;
