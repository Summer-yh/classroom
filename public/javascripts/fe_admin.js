// 所有模块都通过 define 来定义
define(function(require, exports, module) {
    require('/ueditor/ueditor.config');
    require('/ueditor/ueditor.all');
    require('/ueditor/ueditor.parse');
    var $ = require('jquery');
    var Handlebars = require('handlebars');

    var url = {
        search_men:'',
        search_id:'/admin/searchMenber',
        add_men:'',
        confirm_men:'',
        dispost:''
    }

    var admin = {
        init:function () {
            this.switch ($('.aside_bar_item'),$('.panel'));
            this.searchMenberById();
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
        searchMenber:function (event) {
            // var year = $('.select_year').value();
            // var number = $('.select_number').value();
            $('.panel_1 .sure_btn').click(function(){
                event.stopPropagation();
                var data = {
                    year:$('.panel_1 .select_year').val(),
                    number:$('.panel_1 .select_number').val()
                };
                this.getData(url.search_men,'GET',data,function (res) {
                    var template = Handlebars.compile($('.panel_1 .content_item').html());
                    //匹配json内容
                    var html = template(res);
                    //输入模板
                    $('.panel_1 .content_list').empty().append(html);
                })
            })
        },
        addMenber:function (event) {
            var that = this;
            $('.menber_list .sure_btn').click(function(){
                event.stopPropagation();
                var data = {
                    name:$('.menber_list .stu_name').val(),
                    uid:$('.menber_list .stu_uid').val(),
                    class:$('.menber_list .stu_class').val()
                };
                that.getData(url.add_men,'POST',data,function (res) {
                    console.log('已提交')
                })
            })
        },
        searchMenberById:function () {
            var that = this;
            $('.search_by_id').click(function(){
                var data = {
                    uid:$('.panel_1 .id_input').val()
                };
                that.getData(url.search_id,'GET',data,function (res) {
                    var source   = $("#some_template").html();
    var template = Handlebars.compile(source);
                    // console.log(res);
                    // var template = Handlebars.Compile($('.panel_2 .menber_list_result').html());
                    console.log(template);
                    //匹配json内容
                    // var html = template(res);
                    //输入模板
                    // $('.panel_2 .content_list').empty().append(html);
                })
            })
        },
        confirm_add:function (event) {
            event.stopPropagation();
            $('.menber_add .sure_btn').click(function(){
                var data = {
                    uid:$('.menber_add_list .uid').val()
                };
                this.getData(url.confirm_men,'POST',data,function (res) {
                    console.log('已提交')
                })
            })
        },
        dispost:function (event) {
            event.stopPropagation();
            $('.panel_5 .sure_btn').click(function(){
                var data = UE.getEditor('editor').getContentTxt();
                console.log(data);
                this.getData(url.dispost,'POST',data,function (res) {
                    console.log('已提交')
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
