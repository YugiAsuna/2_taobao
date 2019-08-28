var usernameReg = /^[A-z][0-9A-z]{5,15}$/;
var passwordReg = /^[0-9A-z]{6,20}$/;
var mailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
var qqReg = /^[1-9][0-9]{4,10}$/;
var telReg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;

var form = document.getElementsByClassName('myForm')[0];

var usernameInput = document.getElementsByClassName('username-input')[0];
var passwordInput = document.getElementsByClassName('password-input')[0];
var mailInput = document.getElementsByClassName('mail-input')[0];
var qqInput = document.getElementsByClassName('qq-input')[0];
var telInput = document.getElementsByClassName('tel-input')[0];

var registerBtn = document.getElementsByClassName('register')[0];

var usernameTips = document.getElementsByClassName('username-tips')[0];
var passwordTips = document.getElementsByClassName('password-tips')[0];
var mailTips = document.getElementsByClassName('mail-tips')[0];
var qqTips = document.getElementsByClassName('qq-tips')[0];
var telTips = document.getElementsByClassName('tel-tips')[0];


var testFlag = 1;
var userReg = false;
// 注册按钮点击事件
registerBtn.onclick = function () {
    testFlag = 1;
    userReg = false;
    test(usernameReg, usernameInput, usernameTips, '用户名');
    //判断用户名是否存在
    if(!userReg){
        test(passwordReg, passwordInput, passwordTips, '密码');
        test(mailReg, mailInput, mailTips, '邮箱');
        test(qqReg, qqInput, qqTips, 'QQ');
        test(telReg, telInput, telTips, '手机号');
    }
    if(testFlag){
        localStorage.setItem('userId', usernameInput.value);
        localStorage.setItem('password', passwordInput.value);
        confirm("注册成功");
        window.location.href = '2_taobao.html';
    }
};
// 表单验证
function test(Reg, input, tips, text) {
    if(input.value == ""){
        tips.innerHTML = text + "不能为空";
        input.classList.add('error');
        testFlag = 0;
    }
    else if(!Reg.test(input.value)){
        tips.innerHTML = text + "格式错误";
        input.classList.add('error');
        testFlag = 0;
    }
    else{
        tips.innerHTML = "";
        input.classList.remove('error');
    }
    if(input == usernameInput){
        if(localStorage[input.value]){
            tips.innerHTML = "该用户名已被注册";
            input.classList.add('error');
            testFlag = 0;
            userReg = true;
        }else{
            tips.innerHTML = "";
            input.classList.remove('error');
        }
    }
    if(testFlag == 0){
        return false;
    }
    else{
        testFlag = 1;
    }
}