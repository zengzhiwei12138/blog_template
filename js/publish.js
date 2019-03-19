const classify = `<select name="classifyId">
                        <option value="0">选择分类</option>
                        {{each classifyList value index}}
                            <option value="{{value.id}}">{{value.classifyName}}</option>
                        {{/each}}
                    </select>`;


$(function () {
    var classifyHtml = "";
    var classifyRender = template.compile(classify);
    $.ajax({
        url: '/classify/getClassify.action',
        success:function (data) {
            var classifyData = {
                classifyList:data.data
            };
            classifyHtml = classifyRender(classifyData);
            $('#classify').html(classifyHtml);
        }
    });

    let E = window.wangEditor;
    let top_editor = new E('#top_toolbar','#top_text');
    let publish_editor = new E('#publish_toolbar','#publish_text');
    // 自定义菜单配置
    top_editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'undo',  // 撤销
        'redo'  // 重复
    ];
    // 自定义配置颜色（字体颜色、背景色）
    top_editor.customConfig.colors = [
        '#000000',
        '#ffffff',
        '#ee2c2c',
        '#9b9b9b'
    ];
    // 自定义配置颜色（字体颜色、背景色）
    publish_editor.customConfig.colors = [
        '#000000',
        '#ffffff',
        '#ee2c2c',
        '#9b9b9b',
        '#eeece0',
        '#1c487f',
        '#4d80bf',
        '#c24f4a',
        '#8baa4a',
        '#7b5ba1',
        '#46acc8',
        '#f9963b'
    ];
    publish_editor.customConfig.customUploadImg = function (files, insert) {
        let file;
        for (file in files){
            var formData = new FormData();
            formData.append('file',files[file]);
            $.ajax({
                url:'https://image.baidu.com/pcdutu/a_upload?fr=html5&target=pcSearchImage&needJson=true',
                type:'POST',
                data:formData,
                processData:false,
                contentType : false,
                success:function(res){
                    var rj = $.parseJSON(res);
                    if (rj.errno == 0){
                        let imgUrl = 'https://image.baidu.com/search/down?tn=download&url='+rj.url;
                        insert(imgUrl);
                    }
                }
            });
        }
    };
    getEditorConfig(top_editor);
    getEditorConfig(publish_editor);
    top_editor.create();
    publish_editor.create();

    $('#uploadImg').change(function () {
        var file = this.files[0];
        if (file != undefined){
            var formData = new FormData();
            formData.append('file',file);
            $.ajax({
                url:'https://image.baidu.com/pcdutu/a_upload?fr=html5&target=pcSearchImage&needJson=true',
                type:'POST',
                data:formData,
                processData:false,
                contentType : false,
                success:function(res){
                    var rj = $.parseJSON(res);
                    if (rj.errno == 0){
                        $('.uploadImg').css("background-image","url(https://image.baidu.com/search/down?tn=download&url="+rj.url+")");
                        $("input[name='image']").val('https://image.baidu.com/search/down?tn=download&url='+rj.url);
                    }
                }
            });
        }
    });

    $('#publishBtn').click(function () {
        // 填充博客内容值
        let content = $('#publish_text>div');
        let topContent = $('#top_text>div');
        let contentHtml = content.html();
        let topContentHtml = topContent.html();
        let classifyName = $('option:checked').text();
        $("textarea[name='content']").val(contentHtml);
        $("input[name='classifyName']").val(classifyName);
        $("textarea[name='topContent']").val(topContentHtml);
        $.ajax({
            type:'POST',
            url: "/article/publish.action",
            data: $('#publish_form').serialize(),
            success:function (res) {
                if (res.status == 200){
                    swal("文章发布成功!",{
                        button:false,
                        timer:2000
                    });
                }
            }
        });
    });
});