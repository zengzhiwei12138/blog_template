/**
 * 博客文章模板
 *
 */
var article = `<ul>
                    {{each articleList value index}}
                        <li class="wow fadeInUp">
                            <div class="single_new">
                                <a class="new" href="detail.html?id={{value.id}}" target="_blank">
                                    <div class="articleImg" style="background-image: url('{{value.image}}')"></div>
                                    <div class="archive_content">
                                        <span>
                                            {{@value.topContent}}
                                        </span>
                                    </div>
                                </a>
                                <div class="article_other">
                                    <h2 class="article_title">
                                        <a href="/detail.html?id={{value.id}}" target="_blank"> 
                                            {{value.title}}
                                        </a>
                                    </h2>
                                    <span class="article_info">
                                        <i class="fa fa-clock-o"></i>{{value.updateTime}}
                                        <i class="fa fa-eye"></i>{{value.viewNum}}
                                        <i class="fa fa-heart"></i>{{value.praiseNum}}
                                        <i class="fa fa-comment"></i>{{value.commentNum}}
                                    </span>
                                </div>
                            </div>
                        </li>
                  {{/each}}
                </ul>`;


var friendLinks = `<ul>
                        {{each linkList link index}}
                            <li class="wow fadeInUp">
                                <div class="link">
                                    <a href="{{link.address}}" target="_blank">
                                        <img src="{{link.logo}}">
                                        <h3>{{link.linkName}}</h3>
                                        <p>{{link.content}}</p>
                                    </a>
                                </div>
                            </li>
                        {{/each}}
                    </ul>`;


$(function () {
    $('#loading').fadeOut(500);
    // next 按钮事件
    $('#next').click(function () {
        $('html,body').animate({
            scrollTop: $('.page1').outerHeight() + 1
        }, 600);
    });
    // 解析article
    var articleRender = template.compile(article);
    var articleHtml = "";
    $.ajax({
        type: 'POST',
        url: '/index/article.action',
        success: function (res) {
            let articleData = {
                articleList: res.data
            };
            articleHtml = articleRender(articleData);
            $('#article').html(articleHtml);
        }
    });

    // 解析friendLink
    var linksRender = template.compile(friendLinks);
    var linksHtml = "";
    $.ajax({
        type : 'POST',
        url: '/index/friendLink.action',
        success:function (res) {
            if (res.status == 200){
                var linksData = {
                    linkList : res.data
                };
                linksHtml = linksRender(linksData);
                $('#friendLinks').html(linksHtml);
            }
        }
    });
});

$(document).keyup(function (event) {
    if (event.keyCode == 13){
        $("a[href='/article.html']")[0].click();
    }
});




