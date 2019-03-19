var friend = `{{each friendList friend index}}
                <li>
                    <div class="wow fadeInUp link">
                        <a href="{{friend.address}}" target="_blank">
                            <img src="{{friend.logo}}">
                            <h3>{{friend.linkName}}</h3>
                            <p>{{friend.content}}</p>
                        </a>
                    </div>
                </li>
            {{/each}}`;


var pageFun = {
    validateLink : function () {
        // 获取链接名称
        let linkName = $("input[name='linkName']").val();
        // 获取链接地址和logo地址
        let address = $("input[name='address']").val();
        let logo = $("input[name='logo']").val();
        // 获取描述
        let content = $("input[name='content']").val();
        if (linkName == "" || address == "" || logo == "" || content == ""){
            swal("友情链接信息不能为空！",{
                button:false,
                timer:2000
            });
            return false;
        }
        return true;
    }
};

$(function () {
    $('.link_add').click(function () {
        $('#overLay').removeAttr('hidden');
        $('.add_link_box').removeAttr('hidden');
    });

    $('.close').click(function () {
        $('.add_link_box').attr('hidden', 'hidden');
        $('#overLay').attr('hidden', 'hidden');
    });

    var friendRender = template.compile(friend);
    var friendHtml = "";
    $.ajax({
        url: '/link/getLink.action',
        type: 'POST',
        success: function (res) {
            var friendData = {
                friendList : res.data
            };
            friendHtml = friendRender(friendData);
            $('#friend').html(friendHtml);
        }
    });

    var addFriend = "";

    $('#addLink').click(function () {
        // 校验友情链接
        if (pageFun.validateLink()){
            $.ajax({
                type: 'POST',
                url: '/link/add.action',
                data: $('#link_form').serialize(),
                success: function (res) {
                    if (res.status == 200) {
                        var friendData = {
                            friendList : res.data
                        };
                        addFriend = friendRender(friendData);
                        $('#friend').append(addFriend);
                        swal("友情链接增加成功！",{
                            button:false,
                            timer:2000
                        });
                    }else if (res.status == 520) {
                        swal(res.msg,{
                            button:false
                        });
                    }else {
                        swal("友情链接新增失败，请联系站长！",{
                            button:false
                        });
                    }
                }
            });
        }
    });
});
