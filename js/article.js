const article = `<ul>
                   {{each articleList article index}}
                        <li class="wow zoomIn">
                            <a href="/detail.html?id={{article.id}}" target="_blank" class="article">
                                <div class="blog_image">
                                    <img src="{{article.image}}">
                                </div>
                                <h3>{{if article.type!="Y"}}<span>【转载】</span>{{/if}}{{article.title}}</h3>
                                <div>
                                    <div class="article_content">{{@article.topContent}}</div>
                                    <div class="article_info">
                                        <span><i class="fa fa-eye"></i>{{article.viewNum}}</span>
                                        <span class="blog_heart"><i class="fa fa-heart"></i>{{article.praiseNum}}</span>
                                        <span class="blog_comment"><i class="fa fa-commenting-o"></i>{{article.commentNum}}</span>
                                        <span class="blog_date"><i class="fa fa-clock-o"></i>{{article.updateTime}}</span>
                                    </div>
                                </div>
                            </a>
                            <div class="article_classify" name="{{article.classifyId}}">
                                    {{article.classifyName}}
                            </div>
                            <a class="line"></a>
                            {{if article.special=="top" }}
                                 <div class="top">置顶</div>
                            {{/if}}
                            <a href="/detail.html?id={{article.id}}" target="_blank" class="read_more">阅读全文</a>
                        </li>
                    {{/each}}
            </ul>`;


const classify = ` {{each classifyList classify index}}
                    <li name="{{classify.id}}" clickNum="{{classify.clickNum}}">
                        <a>{{classify.classifyName}}</a>
                    </li>
                 {{/each}}`;

const hot_article = ` {{each hotArticleList hotArticle index}}
                            <li>
                                <a href="/detail.html?id={{hotArticle.id}}" target="_blank">{{hotArticle.title}}</a>
                            </li>
                       {{/each}}`;

const label = `{{each labelList label index}}
                    <span name="{{label.id}}">{{label.labelName}}</span>
                 {{/each}}`;

const line = "<p style='color: rgba(255,255,255,.9);text-align: center;font-size:14px;letter-spacing: 2px;font-weight: bold'>我也是有底线的!</p>";

let pageNum = 1;
let articleRender = template.compile(article);
let exist = false;

//定义分类，标签，搜索
let is_classify_id = 0;
let is_search_keywords = "";
let is_label_id = "";

$(function () {
    getPageArticle(pageNum);
    let classifyRender = template.compile(classify);
    $.ajax({
        url: '/classify/getClassify.action',
        type: 'POST',
        success: function (res) {
            let classifyData = {
                classifyList: res.data
            };
            let classifyHtml = classifyRender(classifyData);
            $('#classify').html(classifyHtml);
            //分类的点击事件
            $('#classify>li').each(function () {
                $(this).click(function () {
                    let classifyId = $(this).attr('name');

                    getArticleByClassify(classifyId);
                });
            });
        }
    });

    let hotArticleRender = template.compile(hot_article);
    $.ajax({
        url: '/article/hotArticle.action',
        type: 'POST',
        success: function (res) {
            let hotArticleData = {
                hotArticleList: res.data
            };
            let hotArticleHtml = hotArticleRender(hotArticleData);
            $('#hot_article').html(hotArticleHtml);
        }
    });

    $.ajax({
        url: '/article/topArticle.action',
        type: 'POST',
        success: function (res) {
            let topArticleData = {
                hotArticleList: res.data
            };
            let topArticleHtml = hotArticleRender(topArticleData);
            $('#top_article').html(topArticleHtml);
        }
    });

    let labelRender = template.compile(label);
    $.ajax({
        url: '/label/getLabel.action',
        type: 'POST',
        success: function (res) {
            let labelData = {
                labelList: res.data
            };
            let labelHtml = labelRender(labelData);
            $('#tag_cloud_widget').html(labelHtml);
            tagCloud();
            $('#tag_cloud_widget>span').each(function () {
                $(this).click(function () {
                    // 清楚分类和搜索的标记
                    is_classify_id = 0;
                    is_search_keywords = "";
                    pageNum = 1;
                    exist = false;
                    // 获取labelId
                    let labelId = $(this).attr('name');
                    is_label_id = labelId;
                    getPageArticle(pageNum);
                    $('body,html').animate({scrollTop: 0}, 300);
                });
            });
        }
    });

    if (document.body.offsetWidth <= 500) {
        $('.left1').click(function () {
            let hot_article = $("li[name='hot_article']");
            let article_label = $("li[name='article_label']");
            let classify = $('#classifyBox');
            if ($('.left1').text() == '<') {
                $('#overLay').removeAttr('hidden');
                $('.left1').text('>');
                if (article_label.hasClass('label_mobile_open')) {
                    article_label.removeAttr('style');
                    article_label.removeClass('fadeInUp');
                    article_label.addClass('fadeOutDown');
                    $('.left2').text('<');
                }
                if (classify.hasClass('classify_mobile_open')) {
                    classify.removeAttr('style');
                    classify.removeClass('bounceInDown');
                    classify.addClass('bounceOutDown');
                }
                if (hot_article.hasClass('hot_mobile_open')) {
                    hot_article.removeAttr('style');
                    hot_article.addClass('fadeInRight');
                    hot_article.removeClass('fadeOutRight');
                } else {
                    hot_article.addClass('hot_mobile_open');
                    hot_article.removeClass('mobile_close');
                }
            } else {
                hot_article.removeAttr('style');
                hot_article.removeClass('fadeInRight');
                hot_article.addClass('fadeOutRight');
                $('#overLay').attr('hidden', 'hidden');
                $('.left1').text('<');
            }

            $('#overLay').click(function () {
                hot_article.removeAttr('style');
                hot_article.removeClass('fadeInRight');
                hot_article.addClass('fadeOutRight');
                $('#overLay').attr('hidden', 'hidden');
                $('.left1').text('<');
            });
        });

        $('.left2').click(function () {
            let hot_article = $("li[name='hot_article']");
            let article_label = $("li[name='article_label']");
            let classify = $('#classifyBox');
            if (hot_article.hasClass('hot_mobile_open')) {
                hot_article.removeAttr('style');
                hot_article.removeClass('fadeInRight');
                hot_article.addClass('fadeOutRight');
                $('.left1').text('<');
            }
            if (classify.hasClass('classify_mobile_open')) {
                classify.removeAttr('style');
                classify.removeClass('bounceInDown');
                classify.addClass('bounceOutDown');
            }
            if ($('.left2').text() == '<') {
                $('#overLay').removeAttr('hidden');
                $('.left2').text('>');
                if (article_label.hasClass('label_mobile_open')) {
                    article_label.removeAttr('style');
                    article_label.addClass('fadeInUp');
                    article_label.removeClass('fadeOutDown');
                } else {
                    article_label.addClass('label_mobile_open');
                    article_label.removeClass('mobile_close');
                }
            } else {
                article_label.removeAttr('style');
                article_label.removeClass('fadeInUp');
                article_label.addClass('fadeOutDown');
                $('#overLay').attr('hidden', 'hidden');
                $('.left2').text('<');
            }

            $('#overLay').click(function () {
                article_label.removeAttr('style');
                article_label.removeClass('fadeInUp');
                article_label.addClass('fadeOutDown');
                $('#overLay').attr('hidden', 'hidden');
                $('.left2').text('<');
            });
        });

        $('.top1').click(function () {
            let hot_article = $("li[name='hot_article']");
            let article_label = $("li[name='article_label']");
            let classify = $('#classifyBox');
            if (hot_article.hasClass('hot_mobile_open')) {
                hot_article.removeAttr('style');
                hot_article.removeClass('fadeInRight');
                hot_article.addClass('fadeOutRight');
                $('.left1').text('<');
            }
            if (article_label.hasClass('label_mobile_open')) {
                article_label.removeAttr('style');
                article_label.removeClass('fadeInUp');
                article_label.addClass('fadeOutDown');
                $('.left2').text('<');
            }
            $('#overLay').removeAttr('hidden');
            if (classify.hasClass('classify_mobile_open')) {
                if (classify.hasClass('bounceInDown')) {
                    classify.removeAttr('style');
                    classify.removeClass('bounceInDown');
                    classify.addClass('bounceOutDown');
                    $('#overLay').attr('hidden', 'hidden');
                } else {
                    classify.removeAttr('style');
                    classify.addClass('bounceInDown');
                    classify.removeClass('bounceOutDown');
                }
            } else {
                classify.removeAttr('style');
                classify.removeClass('flipInY');
                classify.addClass('bounceInDown');
                classify.addClass('classify_mobile_open');
                classify.removeClass('mobile_close');
            }
            $('#overLay').click(function () {
                classify.removeAttr('style');
                classify.removeClass('bounceInDown');
                classify.addClass('bounceOutDown');
                $('#overLay').attr('hidden', 'hidden');
            });
        });
    }

    $('#allClassify').click(function () {
        is_search_keywords = "";
        is_classify_id = 0;
        is_label_id = "";
        exist = false;
        pageNum = 1;
        getPageArticle(pageNum);
        $('body,html').animate({scrollTop: 0}, 300);
    });

    $(".searchBox>input[type='text']").click(function () {
        $(document).keyup(function (event) {
            if (event.keyCode == 13) {
                searchArticle();
            }
        });
    });

    $('.searchBox>i').click(function () {
        searchArticle();
    });

});

function searchArticle() {
    is_label_id = "";
    is_classify_id = 0;
    pageNum = 1;
    exist = false;
    is_search_keywords = $(".searchBox>input[type='text']").val();
    if (is_search_keywords == "") {
        swal("请输入查询关键字！", {
            button: false,
            timer: 2000
        });
    }
    getPageArticle(pageNum);
    $('body,html').animate({scrollTop: 0}, 300);
}

function getArticleByClassify(classifyId) {
    // 清空标签和搜索的分页条件
    is_search_keywords = "";
    is_label_id = "";
    exist = false;
    pageNum = 1;
    is_classify_id = classifyId;
    getPageArticle(pageNum);
    $('body,html').animate({scrollTop: 0}, 300);
}

//获取滚动条当前的位置
function getScrollTop() {
    let scrollTop = 0;
    if (document.documentElement && document.documentElement.scrollTop) {
        scrollTop = document.documentElement.scrollTop;
    } else if (document.body) {
        scrollTop = document.body.scrollTop;
    }
    return scrollTop;
}

//获取当前可视范围的高度
function getClientHeight() {
    let clientHeight = 0;
    if (document.body.clientHeight && document.documentElement.clientHeight) {
        clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
    } else {
        clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
    }
    return clientHeight;
}

//获取文档完整的高度
function getScrollHeight() {
    return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
}

//滚动事件触发
window.onscroll = function () {
    if (getScrollTop() + getClientHeight() > getScrollHeight() - 110) {
        pageNum++;
        getPageArticle(pageNum);
    }
};

function getPageArticle(pageNum) {
    if (!exist) {
        $.ajax({
            url: '/article/getPageArticle.action',
            data: {
                pageNum: pageNum,
                labelId: is_label_id,
                classifyId: is_classify_id,
                keywords: is_search_keywords
            },
            type: 'POST',
            success: function (res) {
                if (document.body.offsetWidth <= 500){
                    let hot_article = $("li[name='hot_article']");
                    let article_label = $("li[name='article_label']");
                    let classify = $('#classifyBox');
                    if (article_label.hasClass('label_mobile_open')) {
                        article_label.removeAttr('style');
                        article_label.removeClass('fadeInUp');
                        article_label.addClass('fadeOutDown');
                        $('.left2').text('<');
                    }
                    if (classify.hasClass('classify_mobile_open')) {
                        classify.removeAttr('style');
                        classify.removeClass('bounceInDown');
                        classify.addClass('bounceOutDown');
                    }
                    if (hot_article.hasClass('hot_mobile_open')) {
                        hot_article.removeAttr('style');
                        hot_article.removeClass('fadeInRight');
                        hot_article.addClass('fadeOutRight');
                        $('.left1').text('<');
                    }
                    $('#overLay').attr('hidden', 'hidden');
                }
                if (res.data.length > 0) {
                    var articleData = {
                        articleList: res.data
                    };
                    let articleHtml = articleRender(articleData);
                    if (pageNum == 1) {
                        $('#blog_content').html(articleHtml);
                    } else {
                        $('#blog_content').append(articleHtml);
                    }
                    $('.article_classify').each(function () {
                        $(this).click(function () {
                            let classifyId = $(this).attr('name');
                            getArticleByClassify(classifyId);
                        });
                    });
                    if (res.data.length < 20){
                        $('#blog_content').append(line);
                        exist = true;
                    }
                } else {
                    if (pageNum == 1) {
                        $('#blog_content').html(line);
                        exist = true;
                    } else if (!exist) {
                        $('#blog_content').append(line);
                        exist = true;
                    }
                }
            }
        });
    }
}
