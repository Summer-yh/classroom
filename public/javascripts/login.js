// // 所有模块都通过 define 来定义
// define(function(require, exports, module) {
//     var $ = require('jquery');
//     var login = {
//         init:function () {
//             this.postInfo();
//         },
//         postInfo:function () {
//             $('.btn_submit').click(function () {
//                 var data = {
//                     uid:$('.userid').val(),
//                     password:$('.pwd').val()
//                 }
//                 $.ajax({
//                     url:'/PartyLecture/login',
//                     type:'POST',
//                     data:data,
//                     timeout:5000,    //超时时间
//                     success:function(res,callback){
//                         // callback(res);
//                         console.log(res)
//                         location.href = '/PartyLecture/index.html';
//                     },
//                     error:function(err,textStatus){
//                         console.log('错误')
//                         console.log(err)
//                         console.log(textStatus)
//                     }
//                 })
//             })
//         },
//
//         setLocalStorage:function (res) {
//             if(typeof(Storage)!=="undefined"){
//                 localStorage.setItem(res,value);
//             }else{
//                 document.getElementById("result").innerHTML="对不起，您的浏览器不支持 web 存储。";
//             }
//         }
//     }
//     login.init();
//
// });
