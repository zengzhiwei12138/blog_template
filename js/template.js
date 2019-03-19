/**定义模板文件**/
// header模板
let header = `<menu class="menu_close" id="menu">
    <span class="wow fadeInRight" data-wow-delay=".3s"></span>
    <span class="wow fadeInRight" data-wow-delay=".6s"></span>
    <span class="wow fadeInRight" data-wow-delay=".9s"></span>
</menu>

<nav hidden="hidden" id="nav" class="wow bounceInRight">
    <div class="nav">
        <a class="nav-logo" href="/">
            <img src="https://wx3.sinaimg.cn/small/007aGNoFly1fvysv6bn70g305k05k3yy.gif" alt="logo">
            <h1>a&nbsp;z&nbsp;j</h1>
        </a>
        <div class="nav-content">
            <ul>
                {{each titleList value index}}
                    <li><a href="{{value.href}}">{{value.titleName}}</a></li>
                {{/each}}
            </ul>
        </div>
    </div>
</nav>`;

// 回到顶部模板
let fixBars = `<ul class="fix_bar">
    <li id="toTop" hidden="hidden" class="wow fadeInRight">
        <i class="fa fa-arrow-up"></i>
    </li>
</ul>`;

let footer = `<a href="https://github.com/zengzhiwei12138"><i class="fa fa-github"></i></a>
    <a href="https://wpa.qq.com/msgrd?v=3&uin=876784235&site=qq&menu=yes"><i class="fa fa-qq"></i></a>
    <a href="mailto:zengzhiwei_hfut@163.com"><i class="fa fa-envelope-o"></i></a>
    <a href="https://gitee.com/zzwazj"><i class="fa fa-google-plus"></i></a>
    <p>Copyright © 2018-2019 AZJ@二人世界 All Rights Reserved 京ICP备18053311号</p>`;

$(function () {
    // 加载模板数据
    // 解析模板文件
    let headerRender = template.compile(header);
    let fixBarsRender = template.compile(fixBars);
    let footerRender = template.compile(footer);
    let headerHtml = "";
    // 加载数据
    $.ajax({
        type: "POST",
        url:'/nav/content.action',
        success:function (data) {
            var titleData = {
                titleList:data.data
            };
            headerHtml = headerRender(titleData);
            // 渲染页面
            $('#header').html(headerHtml);
            // 按钮点击事件
            let menuId = $('#menu');
            let nav = $('#nav');
            let spans = $('#menu>span');
            // menu点击事件
            menuId.click(function () {
                if (menuId.hasClass('menu_close')){
                    nav.removeClass('bounceOutRight');
                    nav.removeAttr('style');
                    nav.addClass('bounceInRight');
                    spans.each(function () {
                        $(this).removeClass('fadeInRight');
                        $(this).removeAttr('style');
                    });
                    menuId.removeClass('menu_close');
                    menuId.addClass('menu_open');
                    nav.removeAttr('hidden');
                }else {
                    nav.removeClass('bounceInRight');
                    nav.removeAttr('style');
                    nav.addClass('bounceOutRight');
                    menuId.removeClass('menu_open');
                    menuId.addClass('menu_close');
                }
            });
        }
    });
    let fixBarsHtml = fixBarsRender();
    let footerHtml = footerRender();
    $('#fixBars').html(fixBarsHtml);
    $('#footer').html(footerHtml);
});