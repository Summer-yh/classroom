// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    require('/ueditor/ueditor.config');
    require('/ueditor/ueditor.all');
    require('/ueditor/ueditor.parse');
    var $ = require('jquery');
    var temp = require('temp');
    // var Handlebars = require('handlebars');

    var url = {
        search_men:'',
        search_id:'/admin/searchMenber',
        search_number:'/admin/searchMenber2',
        add_men:'',
        confirm_add:'/admin/comfirm_add',
        tel_send:'/admin/sendMessage',
        deliver:'/admin/deliverArticle'
    };

    var admin = {
        init:function () {
            this.switch ($('.aside_bar_item'),$('.panel'));
            this.searchMenberById();
            this.searchMenberByNumber();
            this.searchMenberById2();
            this.confirm_add();
            this.addMenber();
            this.searchTel();
            this.deliverArticle();
        },
        switch:function(node,block){
            var panel = block;
            var tab = node;
            // console.log(block,node);
            tab.mouseover(function () {
                panel.each(function () {
                    $(this).removeClass('panel_active');
                })
                tab.each(function(){
                    $(this).removeClass('tab_active');
                })
                $(this).addClass('tab_active');
                var index = $(this).index();
                panel.eq(index).addClass('panel_active');
            })
        },
        getData:function(url,type,data,callback){
            $.ajax({
                url:url,
                type:type,
                // async:true,    //或false,是否异步
                data:data,
                timeout:5000,    //超时时间
                // dataType:'json',    //返回的数据格式：json/xml/html/script/jsonp/text
                success:function(res){
                    callback(res);
                },
                error:function(err,textStatus){
                    console.log('错误')
                    console.log(err)
                    console.log(textStatus)
                }
            })
        },
        addMenber:function (event) {
            var that = this;
            $('.add_single').click(function(){
                var data = {
                    userName:$('.stu_name').html(),
                    uid:$('.stu_uid').html(),
                    class:$('.stu_class').html()
                };
                console.log(data);
                var template = Handlebars.compile(temp.m3);
                var html = template(data);
                $('.panel_2 .menber_add_list').append(html);
            })
        },
        searchMenberById:function () {
            var that = this;
            $('.search_by_id').click(function(){
                var data = {
                    uid:$('.panel_1 .id_input').val()
                };
                that.getData(url.search_id,'GET',data,function (res) {
                    var template = Handlebars.compile(temp.m1);
                    for (var i = 0; i < res.length; i++) {
                        var html = template(res[i]);
                        $('.panel_1 .content_list').append(html);
                    }
                })
            })
        },
        searchMenberById2:function () {
            var that = this;
            $('.menber_search').click(function(){
                var data = {
                    uid:$('.panel_2 .id_input').val()
                };
                // var template = Handlebars.compile(test);
                // console.log(Handlebars.compile('test'));
                that.getData(url.search_id,'GET',data,function (res) {
                    var template = Handlebars.compile(temp.m2);
                    for (var i = 0; i < res.length; i++) {
                        var html = template(res[i]);
                        $('.panel_2 .menber_list_result').empty().append(html);
                    }
                })
            })
        },
        searchMenberByNumber:function () {
            var that = this;
            $('.search_by_number').click(function(){
                var data = {
                    sTime:$('.select_number').val()
                };
                console.log(data);
                that.getData(url.search_number,'GET',data,function (res) {
                    var template = Handlebars.compile(temp.m1);
                    for (var i = 0; i < res.length; i++) {
                        var html = template(res[i]);
                        $('.panel_1 .content_list').append(html);
                    }
                })
            })
        },
        confirm_add:function (event) {
            var that = this;
            var data;
            $('.menber_add .sure_btn').click(function(){
                var list = $('.menber_add_list p');
                for (var i = 0; i < list.length; i++) {
                    var arr = list[i].innerText.split(' ');
                    data = {
                        sTime:$('.sTime').val(),
                        uid:arr[1]
                    };
                    that.getData(url.confirm_add,'POST',data,function (res) {
                        alert('添加成功')
                    })
                }
            })
        },
        searchTel:function () {
            var that = this;
            $('.notic_send').click(function(){
                alert(1)
                that.getData(url.tel_send,'POST','',function (res) {
                    console.log(res);
                })
            })
        },
        deliverArticle:function (event) {
            var that = this;
            $('.send_article').click(function(){
                var content = UE.getEditor('editor').getContentTxt();
                var data = {
                    title:$('.article_title').val(),
                    content:content
                }
                console.log(data);
                that.getData(url.deliver,'POST',data,function (res) {
                    if(res.code == 200){
                        location.href = '/PartyLecture/newsCollection.html';
                    }
                })
            })
        }
    }
    admin.init();

    //编辑器初始化
    var ueditor = {
        init:function () {
            setTimeout(function(){
                editor = UE.getEditor('editor');
            },50)
        }
    }
    ueditor.init();
    // 或者通过 module.exports 提供整个接口
    // module.exports = ...

});
