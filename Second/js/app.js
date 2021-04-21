window.onload = function(){

    // 移入导航栏中下拉框弹出
    var topNavItems = document.querySelectorAll(".mainbox .nav .navContainer li");
    var topNav_button = document.querySelectorAll(".mainbox .nav .navContainer li .item");
    for( let i=1; i < topNavItems.length; i++){
        topNav_button[i].onmouseover = function(){
            topNavItems[i].lastChild.style.display = "block";
        }
        topNavItems[i].onmouseleave = function(){
            topNavItems[i].lastChild.style.display = "none";
        }
    }
    // 点击搜索栏时框变蓝
    var searchInput = document.querySelector(".header .content .search input");
    
    // var searchInput = document.getElementById("search");
    var searchInput_button = document.querySelector(".header .content .search .mag");
    searchInput.onfocus = function(){
        searchInput.placeholder = "文章/小册/标签/用户";
        searchInput.style.borderColor = "#007FFF";
        searchInput_button.style.borderColor = "#007FFF";
        searchInput_button.style.color = "#007FFF";
    }
    searchInput.onblur = function(){
        searchInput.placeholder = "探索掘金";
        searchInput.style.borderColor = "#E5E6E7";
        searchInput_button.style.borderColor = "#E5E6E7"; 
        searchInput_button.style.color = "#E5E6E7";
    }
    
    // 点击头像跳出下拉框
        var login_user = document.querySelector(".header .content .userLogin .head");
        var slip_out = document.querySelector(".header .content .userLogin .slip-out");
        login_user.onclick = function(){
            slip_out.style.display = "block";
        }
        document.onmouseup = function(){
            slip_out.style.display = "none";
        }
    // 点击账号输入时变蓝
    var login_client = document.querySelectorAll(".login-layer .loginBox input");
    for(let i=0; i<login_client.length; i++){
        login_client[i].onfocus = function(){
            this.style.borderColor = "#007FFF";  
        } 
        login_client[i].onblur = function(){
            this.style.borderColor = "#E9E9E9";
        }
    }
    // 点击cross关闭窗口
    function closeWindow(window,button){
        button.onclick = function(){
            window.style.display = "none";
        }
    }
    // 点击button弹出登录窗口
    function openWindow(window,button){
        button.onclick = function(){
            window.style.display = "block";
        }
    }
    (function(){
        var cross_button = document.querySelector(".login-layer .loginBox .title .cross");
        var close_window = document.querySelector(".login-layer");
        closeWindow(close_window,cross_button);
        var open_button = document.querySelector(".header .content .login");
        var open_window = document.querySelector(".login-layer");
        openWindow(open_window,open_button);
    })();
   

    //使用post函数登录账户 
    // function Post(Url){
    //     axios(
    //     {
    //         method:"post",
    //         url:'http://47.100.42.144:3389' + Url,
    //         data: {
    //             username:arguments[1],
    //             password:arguments[2]
    //         }
    //     }
    // ).then(res=>{
    //     // console.log(res.data);
    //     return res.data;
    // }).catch(err=>{
    //     console.log(err);
    //     alert("出错了!!");
    // })
    // }

    // const instance = axios.create({
    //     baseURL:"http://47.100.42.144:3389",
    // })

    // const request = ({
    //     url,
    //     data,
    //     method
    // })=>{
    //     return new Promise((resolve,reject)=>{
    //         switch(method){
    //             case "post":{
    //                 instance.post({
    //                     url,
    //                     data
    //                 }).then(res=>{
    //                     resolve(res);
    //                 }).catch(err=>{
    //                     reject(err);
    //                 })
    //                 break;
    //             }
    //             case "get":{
    //                 instance.post({
    //                     url,
    //                     data
    //                 }).then(res=>{
    //                     resolve(res);
    //                 }).catch(err=>{
    //                     reject(err);
    //                 })
    //                 break;
    //             }
    //         }
    //     })
    // }


    // 用户的id
    var user_id = undefined;
    //设定登录和登出 
    (function(){
        var login_button = document.querySelector(".login-layer .loginBox .login-button");
        var log_key = document.querySelector(".header .content .login");
        var log_user = document.querySelector(".header .content .userLogin");
        var log_window = document.querySelector(".login-layer");
        // 给登录按钮设置响应函数
        login_button.onclick = function(){
            var userName = document.querySelector(".login-layer .loginBox .input-account input").value;
            var userPassword = document.querySelector(".login-layer .loginBox .password input").value;
            axios({
                method:"post",
                url: "http://47.100.42.144:3389/user/login",
                data:{
                    username: userName,
                    password: userPassword    
                }
            }).then(res=>{
                console.log(res);
                user_id = res.data.data.userId;
                var user_message = res.data.data.message;
                if(user_message == "登录成功"||user_message == "该用户已登录"){
                    // 关闭登录窗口
                    log_window.style.display = "none";
                    // 显示用户的头像
                    log_key.style.display = "none";
                    log_user.style.display = "flex";
                }else{
                    alert("登录失败");
                }   
            }).catch(err=>{
                alert("出错啦");
            })
        }
        // 登出响应函数
            var logout_button = document.querySelector(".header .content .userLogin .slip-out a:nth-of-type(3)");
            logout_button.onclick = function(){
                axios({
                    method:"post",
                    url:"http://47.100.42.144:3389/user/logout",
                    data:{
                        userId: user_id
                    }
                }).then(res=>{
                    console.log(res);
                    if(res.data.data.message == "退出登录成功"){
                        log_key.style.display = "flex";
                        log_user.style.display = "none";
                        user_id = undefined;
                    }
                }).catch(err=>{
                    alert("出错啦");
                })
            }
    })();
    
        // 判断登录状态
    function judgeLog(id){
        axios({
            method:"get",
            url:"http://47.100.42.144:3389/user/isLogin",
            params:{
                userId: id
            }
        }).then(res=>{
            console.log(res);
            if(res.data.data.message == "已登录"){
                return true;
            }else{
                return false;
            }
        }).catch(err=>{
            return false;
        })
    } 
    // 进入个人主页
    (function(){
        var userMainpageButton = document.querySelector(".header .content .userLogin .slip-out a:nth-of-type(2)"); 
        var userMainpage = document.querySelector(".juejin .user-page");
        userMainpageButton.onclick = function(){
            userMainpage.style.display = "block";
        } 
    })();
       
    // 回到首页
    (function(){
        var back = document.getElementById("MainPage");
        var userPage = document.querySelector(".juejin .user-page");
        back.onclick = function(){
            userPage.style.display = "none";
        }
    })();
   


























}