let detail = `<h3 class="article_title">{{article.title}}</h3>
              <p class="wow fadeInUp article_label"data-wow-delay=".5s">
                {{each labelList label index}}
                    <a href="/label.html?id={{label.id}}&name={{label.labelName}}"><span>$</span>{{label.labelName}}</a>
                {{/each}}
              </p>
              <div class="detail_info">
                <i class="fa fa-user-o"></i><span>{{article.author}}</span>
                <i class="fa fa-clock-o"></i><span>{{article.updateTime}}</span>
                <i class="fa fa-eye"></i><span>{{article.viewNum}}</span>
                <i class="fa fa-comment"></i><span>{{article.commentNum}}</span>
              </div>
              <div class="detail_content">
                <fieldset>
                    <legend>{{article.topDesc}}</legend>
                    <span>{{@article.topContent}}</span>
                </fieldset>
                <div>{{@article.content}}</div>
                <div class="prise">
                    <div class="like">
                        <span class="likeHeart"></span>
                        <span>{{article.praiseNum}}</span>人点赞
                    </div>
                    <div class="pay">
                        <div class="priseImg">
                            <div class="weChatPay">
                                <p>微信打赏</p>
                                <img src="https://wx3.sinaimg.cn/small/007aGNoFly1fw1stlbtkej30fr0fjmzc.jpg"alt="微信打赏">
                            </div>
                            <div class="aliPay">
                                <p>支付宝打赏</p>
                                <img src="https://wx3.sinaimg.cn/small/007aGNoFly1fw1svwy4d8j30ix0ij0ve.jpg"alt="支付宝打赏">
                            </div>
                            <p class="mobile">手机版可截图扫描相册二维码打赏</p>
                        </div>
                        <i class="fa fa-gift"></i>打赏
                    </div>
                </div>
              </div>`;
let reply = `<div class="reply_comment wow fadeInUp">
                <form id="reply_form">
                    <input type="text"name="replyId"hidden="hidden">
                    <input type="text"name="articleId"hidden="hidden">
                    <input type="text"name="commentId"hidden="hidden">
                    <input type="text" name="commentNum" hidden="hidden">
                    <textarea type="text"name="replyComment"hidden="hidden"></textarea>
                    <input type="text"name="replyHeadImage"hidden="hidden">
                    <input type="text"name="commentName"hidden="hidden">
                    <ul>
                        <li>
                            <label for="replyHeadImage">头像</label>
                            <img src="https://wx1.sinaimg.cn/square/007aGNoFly1fvys0zjwv7j301o01o0si.jpg"alt=""width="38px"height="38px"id="replyHeadImage">
                        </li>
                        <li>
                            <label for="replyName">昵称（必填）</label>
                            <input type="text"name="replyName"id="replyName">
                        </li>
                        <li>
                            <label for="replyEmail">邮箱（必填）</label>
                            <input type="text"id="replyEmail"name="replyEmail">
                        </li>
                    </ul>
                <div class="detail_editor">
                    <div id="reply_toolbar"class="toolbar"></div>
                    <div id="reply_text"class="text"></div>
                </div>
                <p id="replyMsg"></p>
                <div class="submit_info">
                    <input type="checkbox"id="email_reply"value="Y"name="emailReply">
                    <label for="email_reply"class="email_reply"><span>接收回复邮件通知</span></label>
                    <span class="reply_commit">确认回复</span>
                </div>
               </form>
             </div>`;
let comment = `{{each commentList comment index}}
                    <li name="{{comment.id}}" class="wow fadeInUp">
                        <div class="commentHeadImg">
                            <img src="{{comment.commentHeadImage}}"alt="">
                        </div>
                        <div class="comment">
                            <h3>{{comment.commentName}}</h3>
                            <span>{{@comment.commentContent}}</span>
                            <p><span>{{comment.commentTime}}</span><span class="reply" name="{{comment.id}}">回复</span></p>
                            <div name="replyBox"></div>
                        </div>
                 {{each replyList reply index}}
                    {{if comment.id==reply.commentId}}
                        <div class="wow fadeInUp article_reply">
                            <div class="replyHeadImg">
                                <img src="{{reply.replyHeadImage}}">
                            </div>
                            <div class="comment_reply">
                                <h3>{{reply.replyName}}</h3>
                                <span><span class="reply_sign">@{{reply.commentName}}</span> {{@reply.replyComment}}</span>
                                <p><span>{{reply.replyTime}}</span><span class="reply" name="{{reply.id}}">回复</span></p>
                                <div name="replyBox"></div>
                            </div>
                        </div>
                    {{/if}}
                  {{/each}}
                    </li>
                {{/each}}`;
let replyContent = `<div class="wow fadeInUp article_reply">
                        <div class="replyHeadImg">
                            <img src="{{reply.replyHeadImage}}">
                        </div>
                        <div class="comment_reply">
                            <h3>{{reply.replyName}}</h3>
                            <span><span class="reply_sign">@{{reply.commentName}}</span>{{@reply.replyComment}}</span>
                            <p><span>{{reply.replyTime}}</span><span class="reply" name="{{reply.id}}">回复</span></p>
                            <div name="replyBox"></div>
                        </div>
                     </div>`;
let commentContent = `<li name="{{comment.id}}"class="wow fadeInUp"><div class="commentHeadImg"><img src="{{comment.commentHeadImage}}"alt=""></div><div class="comment"><h3>{{comment.commentName}}</h3><span>{{@comment.commentContent}}</span><p><span>{{comment.commentTime}}</span><span class="reply" name="{{comment.id}}">回复</span></p><div name="replyBox"></div></div></li>`;
let pageNum = 1;
let replyOrComment;
let E = window.wangEditor;
let replyRender = template.compile(reply);
let replyHtml = replyRender();
let reply_editor = new E("#reply_toolbar", '#reply_text');
reply_editor.customConfig.menus = ['bold', 'fontSize', 'foreColor', 'backColor', 'link', 'quote', 'emoticon', 'code', 'undo', 'redo'];
getEditorConfig(reply_editor);
let href = window.location.href;
let articleId = href.substring(href.lastIndexOf("?") + 4);
let exist = false;
let detailRender = template.compile(detail);
let commentRender = template.compile(comment);

var pageFun = {
    highLight: function () {
        var _this = this;
        _this.codePrettify();
    },
    codePrettify: function () {
        var _this = this;
        $('pre code').each(function () {
            var lang = $(this).attr('class');
            if (!$(this).parent().hasClass('prettyprinted')) {
                $(this).parent().attr('class', 'prettyprint linenums lang-' + lang).html(this.innerHTML)
                    .wrap('<div class="code-pretty-container"></div>')
                    .parent().append(_this.codePrettifyToolbar(lang));
                prettyPrint();
                _this.codePrettifyToolbarAction();
            }
        });
    },
    codePrettifyToolbar: function (lang) {
        var _lang;
        switch (lang.toLowerCase()) {
            case 'js':
            case 'javascript':
                _lang = 'JavaScript';
                break;
            case 'java':
                _lang = lang.charAt(0).toUpperCase().concat(lang.toLowerCase().slice(1));
                break;
            case 'html':
            case 'css':
            case 'xml':
                _lang = lang.toUpperCase();
                break;
            default:
                _lang = lang;
        }

        var toolbar = '<div class="code-pretty-toolbar">' +
            '<span class="title">' + _lang + '</span>' +
            '<a href="javascript:void(0);" title="复制代码" class="tool clipboard"><i class="fa fa-file-text-o"></i></a>' +
            '<a href="javascript:void(0);" title="查看纯文本代码" class="tool view-source"><i class="fa fa-code"></i></a>' +
            '<a href="javascript:void(0);" title="返回代码高亮" class="tool back-to-pretty"><i class="fa fa-undo"></i></a>' +
            '<span class="msg"></span>' +
            '</div>';

        return toolbar;
    },
    //代码高亮工具栏功能
    codePrettifyToolbarAction: function () {
        /* 复制代码 */
        _this = this;
        var clipboard = new ClipboardJS('.clipboard', {
            text: function (e) {
                let container = $(e).parent().parent();
                return _this.getPrettifyCode(container);
            }
        });
        clipboard.on('success', function (e) {
            let container = $(e.trigger).parent().parent();
            let msg = container.find('.msg');
            msg.text('已复制').stop().slideDown();
            setTimeout(function () {
                msg.fadeOut();
            },2000);
        });

        clipboard.on('error', function (e) {
            let container = $(e.trigger).parent().parent();
            let msg = container.find('.msg');
            msg.text('暂不支持当前浏览器，请手动复制 (ctrl + c)').stop().slideDown();
            setTimeout(function () {
                msg.fadeOut();
            },3000);
            container.find('.view-source').trigger('click');
        });

        /* 其他事件 */
        $('.code-pretty-toolbar a').on('click', function () {
            /* 查看纯文本代码 */
            let container = $(this).parent().parent();
            // 获取源代码
            var pre = container.find('pre');

            if ($(this).hasClass('view-source')) {
                // 获取代码文本
                code = _this.getPrettifyCode(container);

                // 填充 textarea
                if (!container.find('textarea').length) {
                    container.append('<textarea class="code-pretty-text">' + code + '</textarea>');
                } else {
                    container.find('textarea').val(code);
                }
                // 去除滚动条
                pre.css('white-space','inherit');
                pre.css('overflow-x','hidden');
                if (pre.hasClass('lang-bash')) { // bash 固定不变
                    var w = pre.width() - 15;
                    var h = pre.height() + 10;
                    var marginLeft = 32;
                } else {
                    var liCount = pre.find('li').length;
                    var offset = liCount / 1000;
                    var w = pre.width() - 30 - 5 * offset;
                    var h = pre.height() + 10;
                    var marginLeft = 53 + 5 * offset;
                }
                // 显示 textarea
                container.find('textarea').css({height: h, width: w, 'margin-left': marginLeft})
                    .show().select();

                container.find('.view-source').hide();
                container.find('.back-to-pretty').css('display', 'inline-block');

            } else if ($(this).hasClass('back-to-pretty')) {
                container.find('.back-to-pretty').hide();
                container.find('.view-source').css('display', 'inline-block');
                // 添加滚动条
                pre.css('white-space','pre');
                pre.css('overflow-x','scroll');
                container.find('textarea').hide();
            }
        });
    },
    //获取代码文本
    getPrettifyCode: function (container) {
        code = [];
        container.find('li').each(function () {
            code.push($(this).text());
        });
        code = code.join('\r');
        code = code.replace(/\u00a0/g, " ");
        return code;
    },

    // show comment message
    showCommentMsg: function (status, msg, isHide , isComment) {
        switch (status) {
            case 'wait':
                msg = '<i class="fa fa-location-arrow" aria-hidden="true"></i> ' + msg;
                break;
            case 'success':
                msg = '<span class="comment_success"><i class="fa fa-check" aria-hidden="true"></i> ' + msg + '</span>';
                break;
            case 'error':
                msg = '<span class="comment_error"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ' + msg + '</span>';
                break;
        }
        isComment ? $('#commentMsg').html(msg).stop().slideDown() : $('#replyMsg').html(msg).stop().slideDown();
        isHide && setTimeout(function () {
            isComment ? $('#commentMsg').stop().fadeOut() : $('#replyMsg').stop().fadeOut();
        },3000);
    },

    createHtml : function (text , flag) {
        return flag ? "<li class='menu_one'>"+text+"</li>" : "<li class='menu_two'>"+text+"</li>";
    }
};

$(function () {
    let commentContentRender = template.compile(commentContent);
    getPageComment(pageNum, articleId);
    $("#comment_form input[name='articleId']").val(articleId);
    let detail_editor = new E('#detail_toolbar', '#detail_text');
    detail_editor.customConfig.menus = ['bold', 'foreColor', 'backColor', 'link', 'emoticon', 'code',];
    getEditorConfig(detail_editor);
    detail_editor.create();
    $('.close').click(function () {
        $('.headImg').attr('hidden', 'hidden');
    });
    $('#commentHeadImage').click(function () {
        $('.headImg').removeAttr('hidden');
        replyOrComment = 'comment';
    });
    $('.headImg ul li img').click(function () {
        $('.headImg').attr('hidden', 'hidden');
        let src = $(this).attr('src');
        if (replyOrComment == 'comment') {
            $('#commentHeadImage').attr('src', src);
        } else {
            $('#replyHeadImage').attr('src', src);
        }
    });
    $('#commentName').focus(function () {
        pageFun.showCommentMsg('success','新功能：在昵称框输入qq号可快速获取昵称，邮箱和头像!',true , true);
    });
    $('#commentName').blur(function () {
        let qq = $('#commentName').val();
        if (/^[1-9]\d{4,12}$/.test(qq)) {
            $.ajax({
                url: 'https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=' + qq,
                dataType: "jsonp",
                jsonpCallback: "portraitCallBack",
                scriptCharset: "gbk",
                beforeSend: function () {
                    $('#commentName').val('');
                    $('#commentName').attr('placeholder', '获取中...')
                },
                success: function (res) {
                    if (res[qq] && res[qq][6]) {
                        $('#commentName').val(res[qq][6]);
                        $('#commentEmail').val(qq + '@qq.com');
                        $('#commentName').removeAttr('placeholder');
                        $('#commentHeadImage').attr('src','https://q1.qlogo.cn/g?b=qq&nk='+qq+'&s=100');
                    }else {
                        pageFun.showCommentMsg('error', 'QQ信息获取失败！', true , true);
                        $('#commentName').val(qq);
                    }
                }
            });
        }
    });

    $('.commit_comment').click(function () {
        let commentHeadImage = $('#commentHeadImage').attr('src');
        let comment = $('#detail_text>div');
        let commentHtml = comment.html();
        if (validateForm($('#commentName').val(), $('#commentEmail').val(), commentHtml,true)) {
            $("input[name='commentHeadImage']").val(commentHeadImage);
            $("textarea[name='commentContent']").val(commentHtml);
            // 获取本文章的浏览量
            let commentNum = $('.detail_info>span:last-child').text();
            // 填充本文章的浏览量，避免再次查询数据库
            $("#comment_form input[name='commentNum']").val(commentNum);
            $.ajax({
                url: '/article/addComment.action',
                data: $('#comment_form').serialize(),
                type: 'POST',
                beforeSend : function(res){
                    pageFun.showCommentMsg('wait','让评论飞一会儿～',false , true);
                },
                success: function (res) {
                    let contentData = {
                        comment: res.data
                    };
                    let commentContentHtml = commentContentRender(contentData);
                    $('#commentBox').prepend(commentContentHtml);
                    // 清空评论框内容
                    $('#commentHeadImage').attr('src', 'https://wx1.sinaimg.cn/square/007aGNoFly1fvys0zjwv7j301o01o0si.jpg');
                    $('#commentName').val("");
                    $('#commentEmail').val("");
                    comment.html("");
                    $('#email_comment').prop('checked', false);
                    pageFun.showCommentMsg('success','评论发布成功！',true , true);
                    // 更新文章评论数量
                    $('.detail_info>span:last-child').text(res.data.commentNum);
                    replyClick();
                    if (commentContentHtml.indexOf("<pre>") != -1) {
                        pageFun.highLight();
                    }
                    $('html,body').animate({
                        scrollTop: $('#commentBox').offset().top
                    }, 200);
                },
                error : function () {
                    pageFun.showCommentMsg('error','评论发布失败，请联系站长！',true , true);
                }
            })
        }
    })
});

function replyClick() {
    $('.reply').each(function () {
        $(this).unbind('click');
        $(this).click(function () {
            let text = $(this).text();
            let commentId = "";
            let replyId = "";
            // 判断是否是评论还是回复
            if ($(this).parent().parent().hasClass('comment')) {
                // 是要回复评论
                commentId = $(this).attr('name');
            } else {
                commentId = $(this).parent().parent().parent().parent().attr('name');
                replyId = $(this).attr('name');
            }
            let commentName = $(this).parent().prev().prev().text();
            if (text == '回复') {
                $(this).text('取消回复');
                let num = $('.reply_comment').length;
                if (num > 0) {
                    $('.reply_comment').parent().prev().find('.reply').text('回复');
                    $('.reply_comment').parent().html("");
                }
                $(this).parent().next().html(replyHtml);
                reply_editor.create();
                $('#replyName').focus(function () {
                    pageFun.showCommentMsg('success','新功能：在昵称框输入qq号可快速获取昵称，邮箱和头像!',true , false);
                });
                $('#replyName').blur(function () {
                    let qq = $('#replyName').val();
                    if (/^[1-9]\d{4,12}$/.test(qq)) {
                        $.ajax({
                            url: 'https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=' + qq,
                            dataType: "jsonp",
                            jsonpCallback: "portraitCallBack",
                            scriptCharset: "gbk",
                            beforeSend: function () {
                                $('#replyName').val('');
                                $('#replyName').attr('placeholder', '获取中...')
                            },
                            success: function (res) {
                                if (res[qq] && res[qq][6]) {
                                    $('#replyName').val(res[qq][6]);
                                    $('#replyEmail').val(qq + '@qq.com');
                                    $('#replyName').removeAttr('placeholder');
                                    $('#replyHeadImage').attr('src','https://q1.qlogo.cn/g?b=qq&nk='+qq+'&s=100');
                                }else {
                                    pageFun.showCommentMsg('error', 'QQ信息获取失败！', true , false);
                                    $('#replyName').val(qq);
                                }
                            }
                        });
                    }
                });
                $('#replyHeadImage').click(function () {
                    $('.headImg').removeAttr('hidden');
                    replyOrComment = 'reply'
                });
                $('.reply_commit').click(function () {
                    let replyHeadImage = $('#replyHeadImage').attr('src');
                    let reply = $('#reply_text>div');
                    let replyHtml = reply.html();
                    // 验证表单内容 主要验证邮箱和评论不能为空
                    if (validateForm($('#replyName').val(), $('#replyEmail').val(), replyHtml , false)) {
                        $("input[name='replyId']").val(replyId);
                        $("#reply_form input[name='commentName']").val(commentName);
                        $("input[name='replyHeadImage']").val(replyHeadImage);
                        $("textarea[name='replyComment']").val(replyHtml);
                        $("input[name='commentId']").val(commentId);
                        $("#reply_form input[name='articleId']").val(articleId);
                        // 获取本文章的浏览量
                        let commentNum = $('.detail_info>span:last-child').text();
                        $("#reply_form input[name='commentNum']").val(commentNum);
                        $.ajax({
                            url: '/article/addReply.action',
                            data: $('#reply_form').serialize(),
                            type: 'POST',
                            beforeSend : function(res){
                                pageFun.showCommentMsg('wait','让回复飞一会儿～',false , false);
                            },
                            success: function (res) {
                                if (res.status == 200) {
                                    let replyContentRender = template.compile(replyContent);
                                    let replyContentData = {
                                        reply: res.data,
                                    };
                                    let replyContentHtml = replyContentRender(replyContentData);
                                    // 情况reply form的数据
                                    $('#replyHeadImage').attr('src','https://wx1.sinaimg.cn/square/007aGNoFly1fvys0zjwv7j301o01o0si.jpg');
                                    $('#replyName').val("");
                                    $('#replyEmail').val("");
                                    $('#email_reply').prop('checked', false);
                                    reply.html("");
                                    pageFun.showCommentMsg('success','回复发布成功！',true , false);
                                    // 隐藏回复框
                                    $('.reply_comment').parent().prev().find('.reply').text('回复');
                                    $('.reply_comment').parent().html("");
                                    // 更新文章评论量
                                    $('.detail_info>span:last-child').text(res.data.commentNum);
                                    let dom = $("li[name=" + commentId + "]");
                                    $('html,body').animate({
                                        scrollTop: dom.innerHeight() + dom.offset().top - 200
                                    }, 200);
                                    dom.append(replyContentHtml);
                                    if (replyContentHtml.indexOf("<pre>") != -1) {
                                        pageFun.highLight();
                                    }
                                    replyClick();
                                }
                            },
                            error : function () {
                                pageFun.showCommentMsg('success','回复发布失败，请联系站长！',true , false);
                            }
                        })
                    }
                    ;
                })
            } else {
                $(this).text('回复');
                $(this).parent().next().html("");
            }
        })
    })
}

function getScrollTop() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop
    } else if (document.body) {
        scrollTop = document.body.scrollTop
    }
    return scrollTop;
}

function getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight)
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight)
    }
    return clientHeight;
}

function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

window.onscroll = function () {
    if (getScrollTop() + getClientHeight() > getScrollHeight() - 110) {
        pageNum++;
        getPageComment(pageNum, articleId);
    }
};

function getPageComment(pageNum, articleId) {
    if (!exist) {
        $.ajax({
            url: '/article/detail.action',
            type: 'POST',
            data: {
                pageNum: pageNum,
                articleId: articleId
            },
            success: function (res) {
                if (pageNum == 1) {
                    let detailData = {
                        article: res.data.article,
                        labelList: res.data.labelList
                    };
                    let detailHtml = detailRender(detailData);
                    $('#detail').html(detailHtml);
                    var menu = "";
                    // 右边导航栏
                    $('.detail_content h2 , .detail_content h3').each(function (index) {
                        // 获取标题文本
                        let text = $(this).text();
                        text = text.replace('$','');
                        $(this).attr('id',"title"+index);
                        menu += $(this).prop('tagName') == 'H2' ? "<li class='menu_one' name='title"+index+"'>"+text+"</li>" : "<li class='menu_two' name='title"+index+"'>"+text+"</li>";
                    });
                    $('#article_menu>ul').html(menu);
                    $('.menu_one,.menu_two').click(function () {
                        let title_name = $(this).attr('name');
                        $('html,body').animate({scrollTop: $('#'+title_name).offset().top - 200}, 800);
                    });
                    //var last_position = 0;
                    $(window).scroll(function () {
                        let dTop = $(document).scrollTop();
                        /*if (last_position > dTop){
                            $('.article_share').stop().fadeIn();
                        } else {
                            $('.article_share').stop().fadeOut();
                        }*/
                        if ($(document).scrollTop() < $('.detail_content').offset().top || $(document).scrollTop() > $('.prise').offset().top){
                            $('#article_menu').stop().fadeOut();
                            //$('.article_share').stop().fadeOut();
                        } else {
                            $('#article_menu').fadeIn();
                        }
                        //last_position = dTop;
                        $('.detail_content h2 , .detail_content h3').each(function (index) {
                            let top = $(this).offset().top;
                            if (dTop >= top - 201){
                                // 获取标题id
                                let id = $(this).attr('id');
                                id && $('.active').attr('name') != id &&
                                ($('.active').removeClass('active'),$('li[name='+id+']').addClass('active'));
                            }
                        });

                    });
                    $('title').text(res.data.article.title);
                    // fancybox open the picture
                    $(".detail_content img:not([src$='.gif'])").each(function () {
                        let url = $(this).attr('src');
                        $(this).wrap(`<a href="${url}" data-fancybox="images"></a>`);
                    });
                    $('.like').click(function () {
                        let priseNum = $('.like > span:last-child').text();
                        $.ajax({
                            type: 'POST',
                            url: '/article/prise.action',
                            data: {
                                articleId: articleId,
                                ip: returnCitySN["cip"]
                            },
                            success: function (res) {
                                if (res.status == 520) {
                                    swal(res.msg, {
                                        button: false,
                                        timer: 2000
                                    })
                                } else if (res.status == 200) {
                                    $('.like > span:last-child').text(parseInt(priseNum) + 1)
                                }
                            }
                        })
                    })
                }
                if (res.data.articleComments.length > 0) {
                    let commentData = {
                        commentList: res.data.articleComments,
                        replyList: res.data.articleReplies
                    };
                    let commentHtml = commentRender(commentData);
                    $('#commentBox').append(commentHtml);
                    replyClick();
                    if (res.data.articleComments.length < 20) {
                        exist = true
                    }
                } else {
                    exist = true
                }
                if ($('pre code').length > 0) {
                    pageFun.highLight();
                }
            }
        })
    }
}

// 验证表单
function validateForm(name, email, content,isComment) {
    if (name == "") {
        pageFun.showCommentMsg('error','请输入昵称！',true , isComment);
        return false;
    }
    let emailPattern = /^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
    if (!emailPattern.test(email)) {
        pageFun.showCommentMsg('error','邮箱格式不正确！',true , isComment);
        return false;
    }
    let contentPattern = /[\u4e00-\u9fa5]/;
    if (!contentPattern.test(content)) {
        pageFun.showCommentMsg('error','评论回复内容至少包含一个汉字！',true , isComment);
        return false;
    }
    return true;
}