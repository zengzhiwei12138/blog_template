// 富文本编辑器表情管理
const emoji = [];
const toot = [];
const cute = [];
const mogutou = [];

getImg(emoji,"emoji",96);
getImg(toot,"toot",16);
getImg(cute,'cute',8);
getImg(mogutou,'mogutou',15);

function getImg(arr,name,max) {
    if (max < 10){
        for(let i = 1; i< max; i++){
            arr.push({alt:"0"+i,src:"https://www.zzwazj.online/images/emoticon/"+name+"/0"+i+".gif"});
        }
    }else {
        for(let i = 1; i < 10; i++){
            arr.push({alt:"0"+i,src:"https://www.zzwazj.online/images/emoticon/"+name+"/0"+i+".gif"});
        }
        for (let j = 10; j <= max; j++){
            arr.push({alt:j,src:"https://www.zzwazj.online/images/emoticon/"+name+"/"+j+".gif"});
        }
    }
}

$(function () {
    console.log("如果你喜欢本站模板,欢迎发邮件给876784235@qq.com,免费分享本站静态模板哦~");
    console.log("欢迎加群进行学习交流哦~");
    // 刷新回到顶部 防止wow.js的动画失效
    $('body,html').animate({scrollTop: 0},700);
    // 初始化wow
    new WOW().init();

    // 鼠标点击事件
    var i = 0;
    $('html').click(function (element) {
        let arr = ["富强","民主","文明","和谐","自由","平等","公正","法治","爱国","敬业","诚信","友善"];
        let dom = $("<span/>").text(arr[i]);
        i = (i+1) % arr.length;
        let x = element.pageX;
        let y = element.pageY;
        dom.css({
            "z-index": 99999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#ff6651"
        });
        $('body').append(dom);
        dom.animate({
            "top": y-180,
            "opacity":0
        },1500,function () {
            dom.remove();
        });
    });
    // toTop事件
    $('#toTop').click(function () {
        $('html,body').animate({scrollTop:0},500);
    });

    // 上一次滚轮的位置
    var last_position = 0;
    // 监听滚轮事件
    $(window).scroll(function () {
        let offset = 500;
        let pageY = $(window).scrollTop();
        pageY > offset ? $('#toTop').removeAttr('hidden') : $('#toTop').attr('hidden','hidden');
        if (document.body.offsetWidth > 500){
            if (pageY > 1000){
                $("#classifyBox").removeAttr('style');
                $("#classifyBox").addClass('box_bounceInDown_fixed');
            }else {
                $("#classifyBox").removeClass('box_bounceInDown_fixed');
            }
            if (pageY>700){
                $('.about_me').removeAttr('style');
                $('.about_me').addClass('box_bounceInDown_fixed');
            }else {
                $('.about_me').removeClass('box_bounceInDown_fixed');
            }
            if (pageY>600){
                $('#message_search').removeAttr('hidden','hidden');
                $("#message_search").removeAttr('style');
                $("#message_search").addClass('box_bounceInUp_fixed');
            }else{
                $('#message_search').attr('hidden','hidden');
                $("#message_search").removeClass('box_bounceInUp_fixed');
            }
        }
        // 获取当前位置
        let position = window.scrollY;
        if(position - last_position > 0) {
            let menuId = $('#menu');
            let nav = $('#nav');
            if (menuId.hasClass("menu_open")) {
                nav.removeClass('bounceInRight');
                nav.removeAttr('style');
                nav.addClass('bounceOutRight');
                menuId.removeClass('menu_open');
                menuId.addClass('menu_close');
            }
        }
        last_position = position;
    });
});



function getEditorConfig(editor) {
    editor.customConfig.emotions = [
        {
            title: '默认',
            type: 'image',
            content: emoji
        },
        {
            title: '蒙嘟嘟',
            type: 'image',
            content: toot
        },
        {
            title: '乖巧宝宝',
            type: 'image',
            content: cute
        },
        {
            title: '骚气蘑菇头',
            type: 'image',
            content: mogutou
        }
    ];
}