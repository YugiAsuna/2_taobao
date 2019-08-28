/**
 * @Description:
 * @author YugiAsuna
 * @date 2019/7/30
 */

// 初始化函数
function init() {
    rememberPass();
    topNavList();
    myXian();
    shopNavClick();
    popClick();
    unusedClick();
    loginBtnClick();
    userImgFade();
    turnPage();
    shopData();
}

init();

// 刷新页面记住密码
function rememberPass() {
    // 登录框-内容区
    var userLoginContent = $('#user-login .content');
    // 登录框-用户名
    var userNameInput = userLoginContent.find('.idInput');
    // 登录框-密码
    var passwordInput = userLoginContent.find('.passInput');
    // 登录框-记住密码
    var remember = userLoginContent.find('#remember');
    $(window).on('load', function () {
        if (localStorage.remFlag == 'true') {
            console.log('检测到记住密码，已填充');
            userNameInput.val(localStorage.userId);
            passwordInput.val(localStorage.password);
            remember.prop('checked', true);
        } else {
            console.log('???????');
            userNameInput.val("");
            passwordInput.val("");
            remember.prop('checked', false);
        }
    });

}

// 顶部导航条下拉列表事件绑定
function topNavList() {
    // 导航区对象
    var navBox = $('.nav-box');

    // 导航按钮对象
    var navTitle = $('.nav-title');

    // 下拉列表对象
    var navList = $('.nav-list');

    // 初始隐藏下拉列表
    navList.hide();
    for (var i = 0; i < navBox.length; i++) {
        (function (i) {
            navTitle.eq(i).on('mouseenter', function () {
                navBox.eq(i).addClass('active');
                navTitle.eq(i).addClass('active');
                navList.eq(i).show();
                navBox.eq(i).on('mouseleave', function () {
                    navBox.eq(i).removeClass('active');
                    navTitle.eq(i).removeClass('active');
                    navList.eq(i).hide();
                })
            })
        })(i)
    }
}

// 我的闲置下拉列表事件绑定
function myXian() {
    // 我的闲置区对象
    var myXian = $('.my-xian');
    // 我的闲置按钮对象
    var myXianTitle = $('.my-xian-title');
    // 我的闲置下拉列表对象
    var myXianList = $('.my-xian-list');
    myXianList.hide();
    myXianTitle.on('mouseenter', function () {
        myXianTitle.find('span').addClass('active');
        myXianList.show();
        myXian.on('mouseleave', function () {
            myXianTitle.find('span').removeClass('active');
            myXianList.hide();
        })
    })
}

// 用户登录按钮点击事件绑定
function loginBtnClick() {
    // 顶部导航登录按钮
    var topLogin = $('.top-nav .top-login');
    // 请登录按钮
    var pleaseLogin = $('.user .please-login');
    // 免费注册按钮
    var register = $('.user .register');
    // 欢迎信息
    var welcome = $('.user .welcome');
    // 退出登录按钮
    var quit = $('.user .quit');
    // 登录框
    var userLogin = $('#user-login');
    // 登录框-内容区
    var userLoginContent = $('#user-login .content');
    // 登录框-登录按钮
    var loginBtn = userLoginContent.find('.login-btn');
    // 登录框-用户名
    var userNameInput = userLoginContent.find('.idInput');
    // 登录框-密码
    var passwordInput = userLoginContent.find('.passInput');
    // 登录框-错误提示
    var errorMessage = userLoginContent.find('.error-message');
    // 登录框-记住密码
    var remember = userLoginContent.find('#remember');

    userLogin.hide();
    topLogin.on('click', userLoginShow);
    pleaseLogin.on('click', userLoginShow);


    // 遮罩层外部点击遮罩层隐藏
    userLogin.on('click', function () {
        userLoginHide();
    });
    // 内容区点击遮罩层不消失
    userLoginContent.on('click', function (e) {
        // 取消冒泡事件
        e.stopPropagation();
    });
    // 密码输入框回车键登录
    passwordInput.on('keyup', function (e) {
        if (e.keyCode == 13) {
            loginBtn.trigger('click');
        }
    });
    // 退出登录
    quit.on('click', function () {
        var flag = confirm("是否确认退出登录？");
        if (flag) {
            pleaseLogin.show();
            register.show();
            quit.hide();
            welcome.hide();
            if (localStorage.remFlag == 'true') {
                userNameInput.val(localStorage.userId);
                passwordInput.val(localStorage.password);
                remember.prop('checked', true);
            } else {
                userNameInput.val("");
                passwordInput.val("");
                remember.prop('checked', false);
            }
        }
    });
    // 登录
    loginBtn.on('click', function () {
        if (localStorage.userId == userNameInput.val()) {
            console.log('账户名存在');
            errorMessage.hide();
            if (localStorage.userId == userNameInput.val() && localStorage.password == passwordInput.val()) {
                console.log("登录成功");
                userLoginHide();
                pleaseLogin.hide();
                register.hide();
                quit.show();
                welcome.text('欢迎您，' + userNameInput.val()).show();
                if (remember.prop('checked') == true) {
                    localStorage.setItem('remFlag', 'true');
                }
                else {
                    localStorage.setItem('remFlag', 'false');
                }
            }
            else {
                errorMessage.text('用户名或密码错误！').show();
            }
        }
        else {
            errorMessage.text('用户名不存在！').show();
        }
    });

    // 遮罩层显示
    function userLoginShow() {
        userLogin.fadeIn();
    }

    // 遮罩层隐藏
    function userLoginHide() {
        userLogin.fadeOut();
    }
}

// 商品分类点击事件绑定
function shopNavClick() {
    var shopNav = $('.shop-nav .shop-item');
    shopNav.on('click', function () {
        for (var i = 0; i < shopNav.length; i++) {
            $(shopNav[i]).removeClass('active');
        }
        $(this).addClass('active');
    })
}

// 右下角悬浮下载块点击事件绑定
function popClick() {
    var fixedLink = $('.fixed-link');
    var popIcon = $('.pop-icon');
    var popLock = true;
    var popMain = $('<div class="pop-main">\n' +
        '            <img src="../images/pop-logo.png" alt="" class="pop-logo">\n' +
        '            <a href="">\n' +
        '                <img src="../images/pop-download-ios.png" alt=""  class="pop-download-ios">\n' +
        '            </a>\n' +
        '            <img src="../images/pop-download-android.png" class="pop-download-android">\n' +
        '            <div class="pop-download-code">\n' +
        '                <img src="../images/pop-QRcode.png" alt="" class="pop-QRcode">\n' +
        '            </div>\n' +
        '        </div>');
    var popClose = $('<img src="../images/pop-close.jpg" class="pop-close">');
    fixedLink.append(popMain).append(popClose);
    popMain.hide();
    popClose.hide();
// 右下角悬浮下载栏开启
    fixedLink.on('click', function () {
        if (popLock) {
            popIcon.hide();
            popMain.show();
            popClose.show();
            // $(this).append(popMain).append(popClose);
            fixedLink.animate({width: '100%'}, 400);
            popLock = false;
        }
    });
// 右下角悬浮下载栏关闭
    popClose.on('click', function () {
        if (!popLock) {
            // fixedLink.removeChild(popMain).removeChild(popClose);
            popMain.hide();
            popClose.hide();
            popIcon.show();
            fixedLink.animate({width: '132px'}, 400, function () {
                popLock = true;
            });
        }
    });
}

// 遮罩层事件绑定
function unusedClick() {
    var unused = $('.unused');
    var unusedContent = $('.unused .message');
    var unusedClose = $('.unused .close');
    var taobaoDirect = $('.taobaoDirect');
    var publish = $('.publish');

    unused.hide();
    taobaoDirect.on('click', unusedShow);
    publish.on('click', unusedShow);

    // 遮罩层外部点击遮罩层隐藏
    unused.on('click', function () {
        unusedHide();
    });
    // 取消冒泡事件，在内容区点击遮罩层不消失
    unusedContent.on('click', function (e) {
        e.stopPropagation();
    });
    unusedClose.on('click', unusedHide);

    // 遮罩层显示
    function unusedShow() {
        unused.fadeIn();
    }

    // 遮罩层隐藏
    function unusedHide() {
        unused.fadeOut();
    }
}

// 用户信息页图片轮播
function userImgFade() {
    var fadeContent = $('.user .content');
    fadeContent.css({animation: 'bgImg 8s linear infinite forwards'});
}

// 翻页按钮点击事件绑定
function turnPage() {
    var pageBtn = $('.page-change .page-btn');
    var prevBtn = $('.page-change .prev');
    var nextBtn = $('.page-change .next');
    for (var i = 0; i < pageBtn.length; i++) {
        pageBtn.eq(i).on('click', function () {
            var shopItemActive = $('.shop-nav .shop-item.active');
            for (var j = 0; j < pageBtn.length; j++) {
                pageBtn.eq(j).removeClass('active')
            }
            $(this).addClass('active');
            ajaxFunc(shopItemActive);
        })
    }
    prevBtn.on('click', function () {
        var shopItemActive = $('.shop-nav .shop-item.active');
        var active = $('.page-change .active');
        if (active.prev().is('li')) {
            active.prev().addClass('active');
            active.removeClass('active');
            ajaxFunc(shopItemActive);
        }
    });
    nextBtn.on('click', function () {
        var shopItemActive = $('.shop-nav .shop-item.active');
        var active = $('.page-change .active');
        if (active.next().is('li')) {
            active.next().addClass('active');
            active.removeClass('active');
            ajaxFunc(shopItemActive);
        }
    })
}

// ajax数据请求
function ajaxFunc(shopItem) {
    var itemType = $(shopItem).attr('item-type');
    $.ajax({
        url: 'https://ys.lumingx.com/api/gem/getFishList',
        success: function (res) {
            shopItemAppend(res.data[itemType]);
        }
    })
}

// 商品导航切换数据请求
function shopData() {
    var $shopItem = $('.shop-nav .shop-item');

    for (var i = 0; i < $shopItem.length; i++) {
        (function (i) {
            $shopItem.eq(i).on('click', function () {
                var pageBtn = $('.page-change .page-btn');
                pageBtn.eq(0).trigger('click');
                ajaxFunc(this);
            })
        })(i);
        $shopItem.eq(0).trigger('click');
    }
}

// 商品列表按页渲染
function shopItemAppend(data) {
    var pageIndex = $('.page-change .page-btn.active').index();
    var shopList = $('.shop-list .shop-list-wrapper');
    if (pageIndex % 2 == 0) {
        var shopImg = data[0].shopImg;
        var shopItemTpl = '<a href="" class="shop-item">\n' +
            '                <div class="item-img" style="background-image: url' + '("' + shopImg + '")' + '"></div>\n' +
            '                <div class="item-info">\n' +
            '                    <p>' + data[0].shopTitle + '</p>\n' +
            '                    <div class="price">\n' +
            '                        <span class="price-unit">￥</span>\n' +
            '                        <span class="price-value">' + data[0].shopPrice + '</span>\n' +
            '                        <span class="want">' + data[0].shopWant + '</span>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="user-line">\n' +
            '                    <div class="user-info">\n' +
            '                        <img src="' + data[0].shopIcon + '" alt="" class="user-icon">\n' +
            '                        <p class="user-id">' + data[0].shopId + '</p>\n' +
            '                        <img src="' + (data[0].credit ? (data[0].creditLevel == 1 ? '../images/credit-1.png' : '../images/credit-2.png') : "") + '" alt="" class="user-credit">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </a>';
        shopList.empty();
        for (var i = 0; i < 20; i++) {
            shopList.append($(shopItemTpl).find('.item-img').css({backgroundImage: 'url(' + shopImg + ')'}).end());
        }
    } else {
        var shopImg = data[1].shopImg;
        shopImg.replace('/', '//');
        var shopItemTpl = '<a href="" class="shop-item">\n' +
            '                <div class="item-img"style="background-image: url' + '("' + shopImg + '")' + '"></div>\n' +
            '                <div class="item-info">\n' +
            '                    <p>' + data[1].shopTitle + '</p>\n' +
            '                    <div class="price">\n' +
            '                        <span class="price-unit">￥</span>\n' +
            '                        <span class="price-value">' + data[1].shopPrice + '</span>\n' +
            '                        <span class="want">' + data[1].shopWant + '</span>\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '                <div class="user-line">\n' +
            '                    <div class="user-info">\n' +
            '                        <img src="' + data[1].shopIcon + '" alt="" class="user-icon">\n' +
            '                        <p class="user-id">' + data[1].shopId + '</p>\n' +
            '                        <img src="' + (data[1].credit ? (data[1].creditLevel == 1 ? '../images/credit-1.png' : '../images/credit-2.png') : "") + '" alt="" class="user-credit">\n' +
            '                    </div>\n' +
            '                </div>\n' +
            '            </a>';
        shopList.empty();
        for (var i = 0; i < 20; i++) {
            shopList.append($(shopItemTpl).find('.item-img').css({backgroundImage: 'url(' + shopImg + ')'}).end());
        }
    }
}
