/**
 * 博客文章模板
 *
 */
let labelArticle = `{{each articleList value index}}
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
                  {{/each}}`;

let pageNum = 1;
//获取labelId
let href = window.location.href;
let label = href.substring(href.lastIndexOf("?") + 4).split("&");
let labelId = label[0];
// 解析模板
let labelArticleRender = template.compile(labelArticle);
let exist = false;

$(function () {
    // 获取第一页的标签文章数据
    getArticleByLabel(pageNum);
    let labelName = decodeURI(label[1].substring(5));
    $('#labelName').text(labelName);
});


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
        getArticleByLabel(pageNum);
    }
};

function getArticleByLabel(pageNum) {
    if (!exist){
        $.ajax({
            type : 'POST',
            data : {
                pageNum : pageNum,
                labelId : labelId,
                classifyId : "",
                keywords : ""
            },
            url : '/article/getPageArticle.action',
            success : function (res) {
                if (res.data.length > 0){
                    let articleData = {
                        articleList: res.data
                    };
                    let labelArticleHtml = labelArticleRender(articleData);
                    $('#label').append(labelArticleHtml);
                }else {
                    exist = true;
                }
                if (res.data.length < 20){
                    exist = true;
                }
            }
        });
    }
}