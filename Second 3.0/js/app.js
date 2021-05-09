
window.onload = function(){
    // 用户的id
    var user_id = undefined;

    //设置表情的内容:返回一个对象
    function setEmojiContent(){
        let chatEmoji = [
            {"[微笑]":"./img/emoji/1.jpg"},
            {"[无语]":"./img/emoji/2.jpg"},
            {"[大哭]":"./img/emoji/3.jpg"},
            {"[好吃]":"./img/emoji/4.jpg"},
            {"[滑稽]":"./img/emoji/5.jpg"},
            {"[生闷气]":"./img/emoji/6.jpg"},
            {"[大笑]":"./img/emoji/7.jpg"},
            {"[墨镜]":"./img/emoji/8.jpg"},
            {"[喷饭]":"./img/emoji/9.jpg"},
            {"[震惊]":"./img/emoji/10.jpg"},
            {"[生气]":"./img/emoji/11.jpg"},
            {"[彩虹]":"./img/emoji/12.jpg"},
            {"[剪刀手]":"./img/emoji/13.jpg"},
            {"[拇指]":"./img/emoji/14.jpg"},
            {"[玫瑰]":"./img/emoji/15.jpg"},
            {"[巨生气]":"./img/emoji/16.jpg"},
            {"[礼物]":"./img/emoji/17.jpg"},
            {"[睡觉]":"./img/emoji/18.jpg"},
            {"[好奇]":"./img/emoji/19.jpg"},
            {"[问号]":"./img/emoji/20.jpg"},
        ];
        return chatEmoji;
    }
    //创建表情库
    var EmojiDepository = setEmojiContent();


    //header的样式设置
    (function topnav(){
         // 移入导航栏中下拉框弹出
        (function slip(){
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
        })();
   
        // 点击搜索栏时框变蓝
        (function clickchange(){
                var searchInput = document.querySelector(".header .content .search input");
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
        })();
    
    
        // 点击头像跳出下拉框
        (function(){
            var login_user = document.querySelector(".header .content .userLogin .head");
            var slip_out = document.querySelector(".header .content .userLogin .slip-out");
            login_user.onclick = function(){
                slip_out.style.display = "block";
            }
            document.addEventListener("mouseup",function(){
                slip_out.style.display = "none";
            },false)
            
            
        })();
        
        // 点击账号输入时变蓝
        (function(){
            var login_client = document.querySelectorAll(".login-layer .loginBox input");
            for(let i=0; i<login_client.length; i++){
                login_client[i].onfocus = function(){
                    this.style.borderColor = "#007FFF";  
                } 
                login_client[i].onblur = function(){
                    this.style.borderColor = "#E9E9E9";
                }
            }
        })();
        
        //登录弹出窗口
        (function(){
            var open_button = document.querySelector(".header .content .login");
            var open_window = document.querySelector(".login-layer");
            open_button.onclick  =function(){
                open_window.style.display = "block";
                loginLayerPage();
            }
        })();

        // 回到首页
        (function(){
            var back = document.getElementById("MainPage");
            var page = document.querySelectorAll(".juejin .pageList");
            back.onclick = function(){
                for(let i=0; i<page.length; i++){
                    page[i].style.display = "none";
                }
                page[0].style.display = "block";
                document.querySelector(".header .items #MainPage a").style.color = "#007fff";
            }
        })();

        //设置header滑动上移的效果
        (function(){
            window.addEventListener("scroll",function(){
                let scroll_top = document.documentElement.scrollTop||document.body.scrollTop;
                let headerPage = document.querySelector(".header");
                let headerBottom = document.querySelector(".mainbox .nav");
                if(scroll_top >= 700){
                    headerPage.style.transform = "translateY(-60px)";
                    headerBottom.style.transform = "translateY(-60px)";
                }else{
                    headerPage.style.transform = "translateY(0)";
                    headerBottom.style.transform = "translateY(0)";
                } 
            },false);
        })();

    })();
    
    //设置登录的框
    function loginLayerPage(){
        // 点击cross关闭窗口
        function closeWindow(window,button){
            button.onclick = function(){
                window.style.display = "none";
            }
        }
        (function(){
            var cross_button = document.querySelector(".login-layer .loginBox .title .cross");
            var close_window = document.querySelector(".login-layer");
            closeWindow(close_window,cross_button);
        })();
    }

    //设定登录和登出 
    (function(){
        var login_button = document.querySelector(".login-layer .loginBox .login-button");
        var log_key = document.querySelector(".header .content .login");
        var log_user = document.querySelector(".header .content .userLogin");
        var log_window = document.querySelector(".login-layer");
        // 给登录按钮设置响应函数
        login_button.onclick = async function(){
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
                user_id = res.data.data.userId;
                var user_message = res.data.data.message;
                if(user_message == "登录成功"||user_message == "该用户已登录"){
                    (async function(){
                        //发送获取用户信息请求
                        function getMyInfoRequest(){
                            return new Promise((resolve,reject)=>{
                                axios.get("http://47.100.42.144:3389/user/getUserInfo",{params:{userId:user_id}})
                                .then(res=>{
                                    resolve(res.data.data);
                                }).catch(err=>{
                                    console.log(err);
                                })
                            })
                        }
                        // 关闭登录窗口
                        log_window.style.display = "none";
                        // 显示用户的头像
                        log_key.style.display = "none";
                        log_user.style.display = "flex";
                        let message = await getMyInfoRequest();
                        // console.log(message);
                        document.querySelector(".header .userLogin .head img").src = "http://47.100.42.144:3389/"+message.avatar;
                        //设置进入用户个人主页
                        var userMainpageButton = document.querySelector(".header .content .userLogin .slip-out a:nth-of-type(2)"); 
                        var page = document.querySelectorAll(".juejin .pageList");
                        userMainpageButton.onclick = function(){
                            //跳转页面
                            for(let i=0; i<page.length; i++){
                                page[i].style.display = "none";
                            }
                            page[2].style.display = "block";
                            userPage(user_id);
                            //改变首页样式
                            document.querySelector(".header .items #MainPage a").style.color = "#71777C";
                        };
                        })();

                }else{
                    alert("登录失败");
                    user_id = undefined;
                }   
            }).catch(err=>{
                alert("出错啦");
            })
        }
        // 登出响应函数
        var logout_button = document.querySelector(".header .content .userLogin .slip-out a:nth-of-type(3)");
        logout_button.onclick = async function(){
            let res = await loginOutRequest(); 
            if(res.message == "退出登录成功"){
                log_key.style.display = "flex";
                log_user.style.display = "none";
                user_id = undefined;
                //回到主页
                backMainPage();
            }
        }
        //发送请求
        function loginOutRequest(){
            return new Promise((resolve,reject)=>{
                axios({
                    method:"post",
                    url:"http://47.100.42.144:3389/user/logout",
                    data:{
                        userId: user_id
                    }
                }).then(res=>{
                    console.log(res);
                    resolve(res.data.data);
                }).catch(err=>{
                    alert("出错啦");
                })
            })
        }
        //回到主页
        function backMainPage(){
            let page = document.querySelectorAll(".pageList");
            for(let i=0;i<page.length;i++){
                page[i].style.display = "none";
            }
            page[0].style.display = "block";
            mainPage();
        }
    })();
    

    //设置主页
    (function mainPage(){
        //进入主页
        (function(){
            //进入主页的配置函数
            (async function setMainPage(){
                //获取窗口的信息
                function getwindow(){
                    if(typeof window != 'undefined'){
                        return {
                            width: window.innerWidth,
                            height: window.innerHeight,
                        }
                    }else{
                        return {
                            width: document.documentElement.clientWidth,
                            height: document.documentElement.clientHeight,
                        }
                    }
                }
                //配置主页面一页的文章
                async function getOnePage(res){
                    for(let j=0; j<res.data.data.length; j++){
                        //找到文章内容存在数组中
                        if(res.data.data[j]!=""){
                            let List = res.data.data[j];
                            let detail = await getArtDetail(List.articleId,125);
                            //显示文章的列表
                            function showArt(){
                                //设置显示的每一个文章
                                let box = document.querySelector(".mainbox .midbox .left .artList");
                                let item = document.createElement("li");
                                item.className = "items";
                                item.innerHTML ="<div class='click'></div>" 
                                +"<div class='author'>"+detail.author+"</div>"
                                +"<div class='title'>"+detail.title+"</div>"
                                +"<div class='ar-content'>"
                                    +"<div class='articleBox'>"
                                        +detail.content
                                    +"</div>"
                                +"</div>"
                                +"<div class='button'>"
                                    +"<a href='javascript:;' class='thumbUp'><i class='iconfont'>&#xe613;</i> <span>"+detail.thumbUpNum+"</span></a>"
                                    +"<a href='javascript:;' class='comment'><i class='iconfont'>&#xe9b0;</i> <span>"+detail.commentNum+"</span></a>"
                                +"</div>"
                                box.appendChild(item);
                                let damn = document.querySelector(".mainbox .midbox .left .artList .items:nth-of-type(1)");
                                damn.style.display = "none"; 
                                //设置对应按钮作用
                                button(item);
                                //设置跳转文章
                                jumpPage(item);
                            };
                            showArt();

                            //设置按钮的作用
                            function button(item){    
                                let thumbUp = item.lastElementChild.firstElementChild;
                                let comment = item.lastElementChild.lastElementChild;
                                //显示样式
                                function youThumbUp(){
                                    let thumbButton = item.lastElementChild.firstElementChild;
                                    let thumb = item.lastElementChild.firstElementChild.firstElementChild; 
                                    thumbButton.style.color = "#007fff";
                                    thumb.innerHTML = "&#xe60c;";
                                }
                                function youNotThumbUp(){
                                    let thumbButton = item.lastElementChild.firstElementChild;
                                    let thumb = item.lastElementChild.firstElementChild.firstElementChild; 
                                    thumbButton.style.color = "#000";
                                    thumb.innerHTML = "&#xe613;";
                                }
                                if(detail.isThumbUp == true){
                                    youThumbUp();
                                }
                                //点击可以点赞
                                thumbUp.onclick = async function(){
                                    let inner = item.lastElementChild.firstElementChild.lastElementChild;
                                    let newDetail = await getArtDetail(List.articleId,user_id);
                                    let num = newDetail.thumbUpNum;
                                    let opt = newDetail.isThumbUp;
                                    if(opt == false){
                                        num++;
                                        inner.innerHTML = num;
                                        axios({
                                            method:"post",
                                            url:"http://47.100.42.144:3389/article/thumbUpArticle",
                                            data:{
                                                userId: user_id,
                                                articleId: List.articleId,
                                                flag: "true"
                                            }
                                        }).then(res=>{
                                            console.log(res);
                                        }).catch(err=>{
                                            console.log(err);
                                        })
                                        //改变样式
                                        youThumbUp();
                                    }else if(opt == true){
                                        num--;
                                        inner.innerHTML = num;
                                        axios({
                                            method:"post",
                                            url:"http://47.100.42.144:3389/article/thumbUpArticle",
                                            data:{
                                                userId: user_id,
                                                articleId: List.articleId,
                                                flag: "false"
                                            }
                                        }).then(res=>{
                                            console.log(res);
                                        }).catch(err=>{
                                            console.log(err);
                                        })
                                        //改变样式
                                        youNotThumbUp();
                                    }
                                    
                                }
                                //跳转到写评论页面
                                comment.onclick = function(){
                                    showArticlePage(detail,List.articleId,List.authorId);
                                }
                            }

                            //设置点击文章跳转到对应的文章页面
                            function jumpPage(item){
                                let articleButton = item.firstElementChild;
                                let loginPage = document.querySelector(".login-layer");
                                articleButton.onclick = function(){
                                    if(user_id == undefined){
                                        loginPage.style.display = "block";
                                        loginLayerPage();
                                    }else{
                                        showArticlePage(detail,List.articleId,List.authorId);
                                    }
                                }
                            }
                        }         
                    }
                }

                //执行
                (async function(){
                    var pageNum = 1;
                    //先执行一次
                    var res = await Find(pageNum);
                    getOnePage(res);
                    //滑动再执行
                    window.addEventListener("scroll",async function mainScroll(){
                        let artBox = document.querySelector(".mainbox .midbox .artList");
                        let distance = artBox.getBoundingClientRect().bottom - getwindow().height; 
                        if(distance > -3 && distance < 3 ){
                            //执行下一步
                            pageNum++;
                            res = await Find(pageNum);
                            getOnePage(res);
                            if(res.data.data == ""){
                                window.removeEventListener("scroll",mainScroll,false);
                                alert("已经到底了哦！");
                            }
                        }
                    },false);
                })();

            })();
        })();


        // 配置所有文章列表(用于回调函数)
        // 用promise封装axios请求
        function Find(pageNum){
            return new Promise((resolve,reject)=>{
                axios.get("http://47.100.42.144:3389/article/getArticle",{params:{userId:125,page:pageNum}})
                .then(res=>{
                    resolve(res);
                }).catch(err=>{
                    console.log(err);
                })
            })
        }
        //获取文章的详细数据
        function getArtDetail(artId,user_id){
            return new Promise((resolve,reject)=>{
                axios.get("http://47.100.42.144:3389/article/getContent",{params:{userId:user_id,articleId:artId}})
                .then(res=>{
                    resolve(res.data.data);
                }).catch(err=>{
                    console.log(err);
                })
            })
        }


    })();


    // 设置个人主页
    function userPage(userId){
        //进入个人主页
        (async function comein(){
            //修改用户头像和昵称
            function userPageHead(userId){
                var pic = document.querySelector(".user-page .main-area .top .userHead img");
                var Name = document.querySelector(".user-page .main-area .top .userMessage .name");
                axios({
                    method:"get",
                    url:"http://47.100.42.144:3389/user/getUserInfo",
                    params:{
                        userId: userId
                    },
                }).then(res=>{
                    pic.src = "http://47.100.42.144:3389/"+res.data.data.avatar;
                    Name.innerHTML = res.data.data.nickname;
                }).catch(err=>{
                    console.log(err);
                })
            };
            //配置个人主页的头像和昵称
            userPageHead(userId);

            //配置编辑或者关注
            async function changeOrSub(userId){
                var change = document.querySelector(".user-page .top .userChange .change");
                var subscribe = document.querySelector(".user-page .top .userChange .subscribe");
                if(userId == user_id){
                    change.style.display = "flex";
                    subscribe.style.display = "none";
                    changeUserPage();
                }else{
                    change.style.display = "none";
                    subscribe.style.display = "flex";
                    flag = await isSubscribe(userId);
                    //判断是否关注
                    if(flag == true){
                        subscribe.innerHTML = "已关注";
                        subscribe.style.backgroundColor = "white";
                        subscribe.style.color = "#92c452";
                    }else if(flag == false){
                        subscribe.innerHTML = "关注";
                        subscribe.style.backgroundColor = "#92c452";
                        subscribe.style.color = "white";
                    }
                    //绑定点击函数
                    subscribe.onclick  =function(){
                        //点击取消关注
                        if(flag == true){
                            axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/user/cancelSubscribe",
                                data:{
                                    userId:user_id,
                                    subscribeId:userId
                                }
                            }).then(res=>{
                                console.log(res);
                                subscribe.innerHTML = "关注";
                                subscribe.style.backgroundColor = "#92c452";
                                subscribe.style.color = "white";
                                flag = false;                                
                            }).catch(err=>{ 
                                console.log(err);
                            })
                        }
                        //点击关注
                        if(flag == false){
                            axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/user/subscribeSomeone",
                                data:{
                                    userId:user_id,
                                    subscribeId:userId
                                }
                            }).then(res=>{
                                console.log(res);
                                subscribe.innerHTML = "已关注";
                                subscribe.style.backgroundColor = "white";
                                subscribe.style.color = "#92c452";
                                flag = true;                                
                            }).catch(err=>{ 
                                console.log(err);
                            })
                        }
                        
                    }

                }
                //判断是否关注此人:返回一个boolean值
                async function isSubscribe(userId){
                    //发送用户关注列表
                    function listRequest(){
                        return new Promise((resolve,reject)=>{
                            axios.get("http://47.100.42.144:3389/user/getMySubscribe",{params:{userId:user_id}})
                            .then(res=>{
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    let List = await listRequest();
                    for(let i=0;i<List.length;i++){
                        if(List[i].subId == userId){
                            return true;
                        }
                    }
                    return false;
                }
            }
            changeOrSub(userId);

            //配置用户的文章列表
            async function setArtList(userId){
                
                //发送获取用户点赞文章的请求:返回一个数组
                function thumbUpListRequest(userId){
                    return new Promise((resolve,reject)=>{
                        axios.get("http://47.100.42.144:3389/user/getUserWriteArticles",{params:{userId:userId}})
                        .then(res=>{
                            // console.log(res.data.data);
                            resolve(res.data.data);
                        }).catch(err=>{
                            console.log(err);
                        })
                    })
                }
                //显示一篇文章
                function show(artContent){
                    var artBox = document.querySelector(".user-page .main-area .down .article .innerContent");
                    let article = document.createElement("div");
                    article.className = "items";
                    article.innerHTML = "<div class='author'>"+artContent.author+"</div>"
                    +"<div class='title'>"+artContent.title+"</div>"
                    +"<div class='ar-content'>"
                        +"<div class='articleBox'>"
                            +artContent.content
                        +"</div>"
                    +"</div>"
                    +"<div class='button'>"
                        +"<a href='javascript:;' class='thumbUp'><i class='iconfont'>&#xe613;</i> <span>0</span></a>"
                        +"<a href='javascript:;' class='comment'><i class='iconfont'>&#xe9b0;</i> <span>0</span></a>"
                        +"<div class='more'>"
                            +"<a href='javascript:;' class='ell'>...</a>"
                            +"<div class='slip-out'>"
                                +"<a href='javascript:;' class='delete'>删除</a>"
                            +"</div>"
                        +"</div>"
                    +"</div>";
                    artBox.appendChild(article);
                    //点赞
                    setThumbup(artContent,article);
                    //评论
                    setComment(artContent,article);
                    //删除
                    deleteMyArt(artContent,article);
                    //点击跳转
                    jumpToArt(artContent,article);
                    //设置下拉框弹出样式
                    setSlipOut(article);
                }
                //设置点赞数
                function setThumbup(artContent,article){
                    let thumbUpNum = article.lastElementChild.firstElementChild.lastElementChild;
                    thumbUpNum.innerHTML = artContent.thumbUpNum;
                } 
                //设置评论数
                function setComment(artContent,article){
                    let commentNum = article.lastElementChild.children[1].lastElementChild;
                    commentNum.innerHTML = artContent.commentNum;
                } 
                //设置删除
                function deleteMyArt(artContent,article){
                    let deleteBtn = article.lastElementChild.children[2].lastElementChild.lastElementChild;
                    //发送删除请求
                    function deleteRequest(){
                        return new Promise((resolve,reject)=>{
                            axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/article/deleteArticle",
                                data:{
                                    userId:user_id,
                                    articleId:artContent.articleId
                                }
                            }).then(res=>{
                                console.log(res);
                                alert("删除成功");
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    deleteBtn.onclick = function(){
                        if(confirm("文章删除后不可回复，您确定删除吗？")==true){
                            deleteRequest();
                            article.parentNode.removeChild(article);
                        }
                    }
                }
                //设置下拉框
                function setSlipOut(article){
                    let slipOutBtn = article.lastElementChild.lastElementChild.firstElementChild;
                    let slipOutBox = slipOutBtn.nextSibling;
                    if(userId == user_id){
                        slipOutBtn.style.display = "flex";
                    }else{
                        slipOutBtn.style.display = "none";
                    }
                    slipOutBtn.onclick = function(){
                        slipOutBox.style.display = "block";
                    }
                    document.addEventListener("mouseup",function(e){
                        e=e||window.e;
                        if(e.target.className != "more" && e.target.className != "ell" && e.target.className != "delete"){
                            slipOutBox.style.display = "none";
                        }
                    },false)
                }
                //点击文章跳转
                function jumpToArt(artContent,article){
                    //获取文章中的详细内容
                    function getDetail(){
                        return new Promise((resolve,reject)=>[
                            axios.get("http://47.100.42.144:3389/article/getContent",{params:{userId:user_id,articleId:artContent.articleId}})
                            .then(res=>{
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);  
                            })
                        ])
                    }
                    //点击跳转
                    article.onclick = async function(e){
                        e = e||window.e;
                        if(e.target.className != "more" && e.target.className != "ell" && e.target.className != "delete"){
                            let detail = await getDetail();
                            showArticlePage(detail,artContent.articleId,userId);
                        }
                    }
                }
                //显示空白
                function showEmpty(Box){
                    let emptyBox = document.createElement("div");
                    emptyBox.className = "emptyBox";
                    emptyBox.innerHTML = "<i class='iconfont'>&#xe673;</i><div>这里什么都没有</div>";
                    Box.appendChild(emptyBox);
                }
                //执行
                (async function main(){
                    var artBox = document.querySelector(".user-page .main-area .down .article .innerContent");
                    artBox.innerHTML = "";
                    let List = await thumbUpListRequest(userId);
                    if(List.message == "该用户暂无文章"){
                        showEmpty(artBox);
                    }
                    for(let i=0;i<List.length;i++){
                        show(List[i]);
                    }
                })();

            }
            setArtList(userId);
            
            //配置用户点赞的文章列表
            async function setThumbUpArt(userId){
                //发送获取用户点赞文章的请求:返回一个数组
                function thumbUpListRequest(userId){
                    return new Promise((resolve,reject)=>{
                        axios.get("http://47.100.42.144:3389/user/getUserLikeArticles",{params:{userId:userId}})
                        .then(res=>{
                            // console.log(res.data.data);
                            resolve(res.data.data);
                        }).catch(err=>{
                            console.log(err);
                        })
                    })
                }
                //显示点赞文章的数量
                function setThumbListNum(num){
                    var title = document.querySelector(".user-page .main-area .down .userItems .thumbUpArt span");
                    var article = document.querySelector(".user-page .main-area .down .consent .tit .items span");
                    if(num != undefined){
                        title.innerHTML = num;
                        article.innerHTML = num;
                    }
                }
                //显示一篇文章
                function show(artContent){
                    var artBox = document.querySelector(".user-page .main-area .down .consent .innerContent");
                    let article = document.createElement("div");
                    article.className = "items";
                    article.innerHTML = "<div class='author'>"+artContent.author+"</div>"
                    +"<div class='title'>"+artContent.title+"</div>"
                    +"<div class='ar-content'>"
                        +"<div class='articleBox'>"
                            +artContent.content
                        +"</div>"
                    +"</div>"
                    +"<div class='button'>"
                        +"<a href='javascript:;' class='thumbUp'><i class='iconfont'>&#xe613;</i> <span>0</span></a>"
                        +"<a href='javascript:;' class='comment'><i class='iconfont'>&#xe9b0;</i> <span>0</span></a>"
                        +"<div class='more'>"
                            +"<a href='javascript:;' class='ell'>...</a>"
                            +"<div class='slip-out'>"
                                +"<a href='javascript:;' class='delete'>删除</a>"
                            +"</div>"
                        +"</div>"
                    +"</div>";
                    artBox.appendChild(article);
                    //点赞
                    setThumbup(artContent,article);
                    //评论
                    setComment(artContent,article);
                    //删除
                    if(artContent.authorId == user_id){
                        deleteMyArt(artContent,article);
                    }else{
                        article.lastElementChild.children[2].style.display = "none";
                    }
                    //设置下拉框
                    setSlipOut(article);
                    //点击跳转
                    jumpToArt(artContent,article);
                }
                //设置点赞数
                function setThumbup(artContent,article){
                    let thumbUpNum = article.lastElementChild.firstElementChild.lastElementChild;
                    thumbUpNum.innerHTML = artContent.thumbUpNum;
                } 
                //设置评论数
                function setComment(artContent,article){
                    let commentNum = article.lastElementChild.children[1].lastElementChild;
                    commentNum.innerHTML = artContent.commentNum;
                } 
                //设置删除
                function deleteMyArt(artContent,article){
                    let deleteBtn = article.lastElementChild.children[2].lastElementChild.lastElementChild;
                    //发送删除请求
                    function deleteRequest(){
                        return new Promise((resolve,reject)=>{
                            axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/article/deleteArticle",
                                data:{
                                    userId:user_id,
                                    articleId:artContent.articleId
                                }
                            }).then(res=>{
                                console.log(res);
                                alert("删除成功");
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    deleteBtn.onclick = function(){
                        if(confirm("文章删除后不可回复，您确定删除吗？")==true){
                            deleteRequest();
                            article.parentNode.removeChild(article);
                        }
                    }
                }
                //设置下拉框
                function setSlipOut(article){
                    let slipOutBtn = article.lastElementChild.lastElementChild.firstElementChild;
                    let slipOutBox = slipOutBtn.nextSibling;
                    slipOutBtn.onclick = function(){
                        slipOutBox.style.display = "block";
                    }
                    document.addEventListener("mouseup",function(e){
                        e=e||window.e;
                        if(e.target.className != "more" && e.target.className != "ell" && e.target.className != "delete"){
                            slipOutBox.style.display = "none";
                        }
                    },false)
                }
                //点击文章跳转
                function jumpToArt(artContent,article){
                    //获取文章中的详细内容
                    function getDetail(){
                        return new Promise((resolve,reject)=>[
                            axios.get("http://47.100.42.144:3389/article/getContent",{params:{userId:user_id,articleId:artContent.articleId}})
                            .then(res=>{
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);  
                            })
                        ])
                    }
                    //点击跳转
                    article.onclick = async function(e){
                        e = e||window.e;
                        if(e.target.className != "more" && e.target.className != "ell" && e.target.className != "delete"){
                            let detail = await getDetail();
                            showArticlePage(detail,artContent.articleId,artContent.authorId);
                        }
                    }
                }
                //显示空白
                function showEmpty(Box){
                    let emptyBox = document.createElement("div");
                    emptyBox.className = "emptyBox";
                    emptyBox.innerHTML = "<i class='iconfont'>&#xe673;</i><div>这里什么都没有</div>";
                    Box.appendChild(emptyBox);
                }
                //执行
                (async function main(){
                    var artBox = document.querySelector(".user-page .main-area .down .consent .innerContent");
                    artBox.innerHTML = "";
                    let List = await thumbUpListRequest(userId);
                    setThumbListNum(List.length);
                    if(List.message == "暂无点赞文章"){
                        showEmpty(artBox);
                    }
                    for(let i=0;i<List.length;i++){
                        show(List[i]);
                    }
                })();
            }
            setThumbUpArt(userId);

            //配置关注的用户和被关注的用户列表
            async function setSubscribe(userId){

                //关注的用户
                function setYouSubscribe(userId){
                    //发送获取用户关注的列表
                    function subListRequest(userId){
                        return new Promise((resolve,reject)=>{
                            axios.get("http://47.100.42.144:3389/user/getMySubscribe",{params:{userId:userId}})
                            .then(res=>{
                                // console.log(res.data.data);
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //发送获取用户关注的详细信息
                    function subDetailRequest(subId){
                        return new Promise((resolve,reject)=>{
                            axios.get("http://47.100.42.144:3389/user/getUserInfo",{params:{userId:subId}})
                            .then(res=>{
                                // console.log(res);
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //发送关注请求
                    function subRequest(userId,subId){
                        return new Promise((resolve,reject)=>{
                            axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/user/subscribeSomeone",
                                data:{
                                    userId:userId,
                                    subscribeId:subId
                                }
                            }).then(res=>{
                                console.log(res);
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //发送取消关注请求
                    function cancelSubRequest(userId,subId){
                        return new Promise((resolve,reject)=>{
                            axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/user/cancelSubscribe",
                                data:{
                                    userId:userId,
                                    subscribeId:subId
                                }
                            }).then(res=>{
                                console.log(res);
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //显示一个
                    async function show(detail,userMessage,userBox,MyList){    
                        let userwrapper = document.createElement("div");
                        userwrapper.className = "userBox";
                        userwrapper.innerHTML = "<div class='userAvater'>"
                                                    +"<img src='"+"http://47.100.42.144:3389/"+detail.avatar+"'>"
                                                +"</div>"
                                                +"<div class='userName'>"+userMessage.subName+"</div>"
                                                +"<div class='subscribeBtn'>已关注</div>";
                        userBox.appendChild(userwrapper);
                        //配置关注按钮样式
                        await setSubButton(userMessage.subId,userwrapper,MyList);
                        //设置关注按钮点击样式
                        await subButton(userMessage.subId,userwrapper,MyList);
                        //设置点击用户页面跳转
                        clickUserPage(userMessage.subId,userwrapper);
                    }   
                    //发送请求获取我关注的列表
                    function getMySubList(){
                        return new Promise((resolve,reject)=>{
                            axios.get("http://47.100.42.144:3389/user/getMySubscribe",{params:{userId:user_id}})
                            .then(res=>{
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //判断是否关注此人:返回一个boolean值
                    async function isSubscribe(userId,List){
                        for(let i=0;i<List.length;i++){
                            if(List[i].subId == userId){
                                return true;
                            }
                        }
                        return false;
                    }
                    //配置用户关注按钮
                    async function setSubButton(subId,userwrapper,MyList){
                        
                        let subbtn = userwrapper.lastElementChild;
                        let flag = await isSubscribe(subId,MyList);
                        if(flag == true){
                            subbtn.innerHTML = "已关注";
                            subbtn.style.backgroundColor = "white";
                            subbtn.style.color = "#92c452";  
                        }else if(flag == false){
                            subbtn.innerHTML = "关注";
                            subbtn.style.backgroundColor = "#92c452";
                            subbtn.style.color = "white"; 
                        }
                    } 
                    //设置关注按钮点击
                    async function subButton(subUserId,userwrapper,MyList){
                        let subbtn = userwrapper.lastElementChild;
                        var flag = await isSubscribe(subUserId,MyList);
                        subbtn.onclick = async function(){
                            if(flag == true){
                                //改变样式
                                subbtn.innerHTML = "关注";
                                subbtn.style.backgroundColor = "#92c452";
                                subbtn.style.color = "white";
                                flag = false;
                                //发送取消关注请求
                                await cancelSubRequest(user_id,subUserId);
                            }else if(flag == false){
                                //改变样式
                                subbtn.innerHTML = "已关注";
                                subbtn.style.backgroundColor = "white";
                                subbtn.style.color = "#92c452";
                                flag = true;
                                //发送关注请求
                                await subRequest(user_id,subUserId);
                            }
                        }
                    }
                    //设置页面右上角的关注者个数显示
                    function setYouSubNum(Num){
                        var numBox = document.querySelector(".user-page .container .deside-area .focus .focus-num");
                        if(Num != undefined){numBox.innerHTML = Num;}
                    }
                    //设置点击用户页面跳转
                    function clickUserPage(userId,userwrapper){
                        userwrapper.onclick = function(e){
                            e=e||window.e;
                            if(e.target.className != "subscribeBtn"){
                                userPage(userId);
                            }
                        }
                    }
                    //显示空白
                    function showEmpty(Box){
                        let emptyBox = document.createElement("div");
                        emptyBox.className = "emptyBox";
                        emptyBox.innerHTML = "<i class='iconfont'>&#xe673;</i><div>这里什么都没有</div>";
                        Box.appendChild(emptyBox);
                    }
                    //执行
                    (async function main(){
                        let List = await subListRequest(userId);
                        let MyList = await getMySubList();
                        setYouSubNum(List.length);
                        let userBox = document.querySelector(".user-page .container .main-area .down .more .innerContent .youSubBox");
                        userBox.innerHTML = "";
                        if(List.message == "暂无关注用户"){
                            showEmpty(userBox);
                        }
                        for(let i=0;i<List.length;i++){
                            let detail = await subDetailRequest(List[i].subId);
                            show(detail,List[i],userBox,MyList);
                        }
                    })();

                }
                setYouSubscribe(userId);
                
                //被关注用户
                function setSubscriber(userId){
                    //发送获取关注我的用户的列表
                    function subListRequest(userId){
                        return new Promise((resolve,reject)=>{
                            axios.get("http://47.100.42.144:3389/user/getSubscribeMe",{params:{userId:userId}})
                            .then(res=>{
                                // console.log(res.data.data);
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //发送获取用户关注的详细信息
                    function subDetailRequest(subId){
                        return new Promise((resolve,reject)=>{
                            axios.get("http://47.100.42.144:3389/user/getUserInfo",{params:{userId:subId}})
                            .then(res=>{
                                // console.log(res);
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //发送关注请求
                    function subRequest(userId,subId){
                        return new Promise((resolve,reject)=>{
                            axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/user/subscribeSomeone",
                                data:{
                                    userId:userId,
                                    subscribeId:subId
                                }
                            }).then(res=>{
                                console.log(res);
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //发送取消关注请求
                    function cancelSubRequest(userId,subId){
                        return new Promise((resolve,reject)=>{
                            axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/user/cancelSubscribe",
                                data:{
                                    userId:userId,
                                    subscribeId:subId
                                }
                            }).then(res=>{
                                console.log(res);
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //显示一个
                    async function show(detail,userMessage,userBox,MyList){    
                        let userwrapper = document.createElement("div");
                        userwrapper.className = "userBox";
                        userwrapper.innerHTML = "<div class='userAvater'>"
                                                    +"<img src='"+"http://47.100.42.144:3389/"+detail.avatar+"'>"
                                                +"</div>"
                                                +"<div class='userName'>"+userMessage.subName+"</div>"
                                                +"<div class='subscribeBtn'>已关注</div>";
                        userBox.appendChild(userwrapper);
                        //配置关注按钮样式
                        await setSubButton(userMessage.subId,userwrapper,MyList);
                        //设置关注按钮点击样式
                        await subButton(userMessage.subId,userwrapper,MyList);
                        //设置点击页面跳转
                        clickUserPage(userMessage.subId,userwrapper);
                    }
                    //发送请求获取我关注的用户列表
                    function getMySubList(){
                        return new Promise((resolve,reject)=>{
                            axios.get("http://47.100.42.144:3389/user/getMySubscribe",{params:{userId:user_id}})
                            .then(res=>{
                                resolve(res.data.data);
                            }).catch(err=>{
                                console.log(err);
                            })
                        })
                    }
                    //判断是否关注此人:返回一个boolean值
                    async function isSubscribe(userId,List){
                        for(let i=0;i<List.length;i++){
                            if(List[i].subId == userId){
                                return true;
                            }
                        }
                        return false;
                    }
                    //配置用户关注按钮
                    async function setSubButton(subId,userwrapper,MyList){
                        
                        let subbtn = userwrapper.lastElementChild;
                        let flag = await isSubscribe(subId,MyList);
                        if(flag == true){
                            subbtn.innerHTML = "已关注";
                            subbtn.style.backgroundColor = "white";
                            subbtn.style.color = "#92c452";  
                        }else if(flag == false){
                            subbtn.innerHTML = "关注";
                            subbtn.style.backgroundColor = "#92c452";
                            subbtn.style.color = "white"; 
                        }
                    } 
                    //设置关注按钮点击
                    async function subButton(subUserId,userwrapper,MyList){
                        let subbtn = userwrapper.lastElementChild;
                        var flag = await isSubscribe(subUserId,MyList);
                        subbtn.onclick = async function(){
                            if(flag == true){
                                //改变样式
                                subbtn.innerHTML = "关注";
                                subbtn.style.backgroundColor = "#92c452";
                                subbtn.style.color = "white";
                                flag = false;
                                //发送取消关注请求
                                await cancelSubRequest(user_id,subUserId);
                            }else if(flag == false){
                                //改变样式
                                subbtn.innerHTML = "已关注";
                                subbtn.style.backgroundColor = "white";
                                subbtn.style.color = "#92c452";
                                flag = true;
                                //发送关注请求
                                await subRequest(user_id,subUserId);
                            }
                        }
                    }
                    //设置页面右上方的关注者数量
                    function setSubYouNum(Num){
                        var numBox = document.querySelector(".user-page .container .deside-area .focus-user .focus-user-num");
                        if(Num != undefined){numBox.innerHTML = Num;}
                    }
                    //设置点击用户页面跳转
                    function clickUserPage(userId,userwrapper){
                        userwrapper.onclick = function(e){
                            e=e||window.e;
                            if(e.target.className != "subscribeBtn"){
                                userPage(userId);
                            }
                        }
                    }
                    //显示空白
                    function showEmpty(Box){
                        let emptyBox = document.createElement("div");
                        emptyBox.className = "emptyBox";
                        emptyBox.innerHTML = "<i class='iconfont'>&#xe673;</i><div>这里什么都没有</div>";
                        Box.appendChild(emptyBox);
                    }
                    //执行
                    (async function main(){
                        let List = await subListRequest(userId);
                        let MyList = await getMySubList();
                        setSubYouNum(List.length);
                        let userBox = document.querySelector(".user-page .container .main-area .down .more .innerContent .subYouBox");
                        userBox.innerHTML = "";
                        if(List.message == "暂无人关注"){
                            showEmpty(userBox);
                        }
                        for(let i=0;i<List.length;i++){
                            let detail = await subDetailRequest(List[i].subId);
                            show(detail,List[i],userBox,MyList);
                        }
                    })();
                }
                setSubscriber(userId);


                //点击切换关注者和被关注者
                (function(){
                    var youSubscribe = document.querySelector(".user-page .main-area .down .more .tit .items a:nth-of-type(1)");
                    var subscribeYou = document.querySelector(".user-page .main-area .down .more .tit .items a:nth-of-type(2)");
                    var youSubPage = document.querySelector(".user-page .main-area .down .more .innerContent .youSubBox");
                    var subYouPage = document.querySelector(".user-page .main-area .down .more .innerContent .subYouBox");
                    youSubscribe.onclick = function(){  
                        youSubPage.style.display = "block";
                        subYouPage.style.display = "none";
                    }
                    subscribeYou.onclick = function(){
                        youSubPage.style.display = "none";
                        subYouPage.style.display = "block";
                    }
                })();

            }
            setSubscribe(userId);

        })();


        // 文章和赞和关注页面
        (function switchPage(){
            const Btn = document.querySelectorAll(".user-page .main-area .down .userItems a");
            const Page = document.querySelectorAll(".user-page .main-area .down .content li");
            for(let i=0; i<Page.length; i++){
                Btn[i].addEventListener("click",function(){
                    //换样式
                    for(let j=0; j<Btn.length; j++){
                        Btn[j].style.color = "#31445B";
                        Btn[j].style.borderBottom = "3px solid white";
                    }
                    Btn[i].style.color = "#007fff";
                    Btn[i].style.borderBottom = "3px solid #007fff";

                    //换内容
                    for(let j=0; j<Btn.length; j++){
                        Page[j].style.display = "none";
                    }
                    Page[i].style.display = "block"; 
                },false)
            }
             //最后一个点击有一个下拉框
            (function(){
                let slip_out = document.querySelector(".user-page .main-area .down .userItems").lastElementChild;
                Btn[Btn.length-1].addEventListener("click",function(){
                    slip_out.style.display = "flex";
                },false);
                document.addEventListener("click",function(e){
                    e=e||window.e;
                    if(e.target.className != "moreBtn"){
                        slip_out.style.display = "none";
                    }
                },false);
            })();
            
        })();
           
    }
     

    // 处理修改用户信息的页面
    function changeUserPage(){

        // 进入修改个人页面
        (function comein(){
            var comein_btn = document.querySelector(".user-page .top .userChange .change");
            var pageList = document.querySelectorAll(".juejin .pageList");
            comein_btn.onclick = function(){
                // 弹出页面
                for(let i=0; i<pageList.length; i++){
                    pageList[i].style.display = "none"; 
                }
                pageList[3].style.display = "block"; 

                //判断登录的人调整页面的内容
                //个人资料
                (function(){
                    axios({
                        method:"get",
                        url:"http://47.100.42.144:3389/user/getUserInfo",
                        params:{
                            userId: user_id
                        },
                    }).then(res=>{
                        console.log(res);
                        console.log(res.data.data.avatar);
                        // 获取元素
                        var user_pic = document.querySelector(".header .content .userLogin .head img");
                        var pic = document.querySelector(".change-userPage .main-box .head .pic img");
                        var nickName = document.querySelector(".change-userPage .main-box .nickName input");
                        var userIntroduction = document.querySelector(".change-userPage .main-box .userIntroduction input");
                        //修改内容
                        pic.src = "http://47.100.42.144:3389/"+res.data.data.avatar;
                        user_pic.src = "http://47.100.42.144:3389/"+res.data.data.avatar;
                        nickName.value = res.data.data.nickname;
                        userIntroduction.value = res.data.data.introduction;
                    }).catch(err=>{
                        console.log(err);
                    })
                })();
                //右上角的用户图片
                (function(){
                    var pic = document.querySelector(".header .content .userLogin .head img");
                    var userItiem = document.querySelector(".header .content .userLogin");
                    var login = document.querySelector(".header .content .login");               
                    userItiem.style.display = "flex";
                    login.style.display = "none";

                })();


            }
        })();

        // 跳转页面
        (function jump(){
            const jumpPage = document.querySelectorAll(".juejin .pageList");
            const button =document.querySelectorAll(".change-userPage .top-nav a");
            button[0].onclick = function(){
                for(let j=0; j<jumpPage.length; j++){
                    jumpPage[j].style.display = "none";
                }
                jumpPage[2].style.display = "block"; 
                //个人主页修中改用户头像和昵称
                userPage(user_id);
            }
            button[1].onclick = function(){
                for(let j=0; j<jumpPage.length; j++){
                    jumpPage[j].style.display = "none";
                }
                jumpPage[3].style.display = "block";    
            }
        })();

        // 点击输入框变样式
        (function focusInput(){
            const items = document.querySelectorAll(".change-userPage .main-box li");
            const input = document.querySelectorAll(".change-userPage .main-box li input");
            const change = document.querySelectorAll(".change-userPage .main-box li .change");
            for(let i=1; i<items.length; i++){
                input[i].onfocus = function(){
                    change[i].innerHTML = "<a href='javascript:;' class='save'>保存</a>"
                    +"<a href='javascript:;' class='cancel'>取消</a>";
                    change[i].lastElementChild.onclick = function(e){
                        e=e||window.e;
                        e.cancelBubble = true;
                    }
                }
                input[i].onblur = function(){
                    setTimeout(function(){
                        change[i].innerHTML = "<i class='iconfont'>&#xe614;</i>&nbsp;修改";
                    },100)
                }

            }
        })();

        // 发送保存个人信息的请求
        (function(){
            const button = document.querySelectorAll(".change-userPage .main-box li .change");
            var newName = document.querySelector(".change-userPage .main-box .nickName input");
            var newIntroduct = document.querySelector(".change-userPage .main-box .userIntroduction input");
            for(let i=1; i<button.length; i++){
                button[i].onclick = function(){
                    axios({
                        method: "post",
                        url: "http://47.100.42.144:3389/user/changeUserInfo",
                        data:{
                            userId: user_id,
                            nickname: newName.value,
                            introduction: newIntroduct.value 
                        }
                    }).then(res=>{
                        if(res.data.data.message == "修改资料成功"){
                            console.log("修改成功");
                        }else{
                            alert("修改失败");
                        }
                    }).catch(err=>{
                        console.log(err);
                    })
                }
            }
        })();

        // 发送修改个人头像的请求
        (function sendHead(){
            var btn = document.querySelector(".change-userPage .main-box .head .change");
            var file = document.querySelector(".change-userPage .main-box .head input");
            btn.onclick = function(){
                file.click();//调用file点击出现文件选择
            }

            file.onchange = function (event) {
                let file = event.target.files[0];
                upload(file);
            }
            //上传个人头像
            function upload(file) {
                let formData = new FormData();
                formData.append('avatar', file);
                formData.append('userId', user_id);
                axios.post(
                    "http://47.100.42.144:3389/user/changeUserAvatar",
                    formData,
                ).then(res=>{
                    console.log(res);
                    show();
                }).catch(err=>{
                    alert("出错啦");
                })
            }
            //显示个人头像
            function show(){
                axios({
                    method:"get",
                    url:"http://47.100.42.144:3389/user/getUserInfo",
                    params:{
                        userId: user_id
                    },
                }).then(res=>{
                    var pic = document.querySelector(".change-userPage .main-box .head .pic img");
                    var userhead = document.querySelector(".header .userLogin .head img");
                    pic.src = "http://47.100.42.144:3389/"+res.data.data.avatar;
                    userhead.src = "http://47.100.42.144:3389/"+res.data.data.avatar;
                }).catch(err=>{
                    console.log(err);
                })

            }
            
        })();

    }


    // 写文章页面
    (function writePage(){

        //跳转页面
        (function(){
            //跳转进入写文章
            const jumpPage = document.querySelectorAll(".juejin .pageList");
            const button = document.querySelectorAll(".header .userLogin .slip-out a");
            var loginBtn = document.querySelector(".header .write .article");
            var header = document.querySelector(".header");
            button[0].onclick = function(){
                for(let j=0; j<jumpPage.length; j++){
                    jumpPage[j].style.display = "none";
                }
                jumpPage[4].style.display = "block"; 
                header.style.display = "none";
                writePage();
            }
            loginBtn.onclick = function(){
                if(user_id == undefined){
                    let loginPage = document.querySelector(".login-layer");
                    loginPage.style.display = "block";
                    loginLayerPage();
                }else{
                    for(let j=0; j<jumpPage.length; j++){
                        jumpPage[j].style.display = "none";
                    }
                    jumpPage[4].style.display = "block"; 
                    header.style.display = "none";
                    writePage();
                }
            }
            //设置用户头像
            var pic = document.querySelector(".write-article .title .user img");
            axios({
                method:"get",
                url:"http://47.100.42.144:3389/user/getUserInfo",
                params:{
                    userId: user_id
                },
            }).then(res=>{
                pic.src = "http://47.100.42.144:3389/"+res.data.data.avatar;
            }).catch(err=>{
                console.log(err);
            })
        })();

        // 文章页面的头像下拉框
        (function slip(){
            //下拉框弹出
            var slip = document.querySelector(".write-article .title .user .slip-out");
            var btn = document.querySelector(".write-article .title .user");
            btn.onclick = function(){
                slip.style.display = "block";
            }
            document.addEventListener("mouseup",function(){
                slip.style.display = "none";
            },false)

        })();
        //跳转退出写文章
        (function(){
            var btn = document.querySelector(".write-article .title .user .slip-out a:nth-of-type(2)");
            var slip = document.querySelector(".write-article .title .user .slip-out");
            const page = document.querySelectorAll(".pageList");
            var header = document.querySelector(".header");
            var header_slip = document.querySelector(".header .slip-out");
            btn .onclick = function(){
                header.style.display = "block";
                header_slip.style.display = "none";
                slip.style.display = "none";
                page[4].style.display = "none";
                page[2].style.display = "block";
                userPage(user_id);
            }
        })();

        // 上传文章
        (function upload(){
            var btn = document.querySelector(".write-article .title .post");
            var Title = document.querySelector(".write-article .title .input");
            var Content = document.querySelector(".write-article .content .ar-content");
            btn.onclick = function(){
                console.log("123");
                axios({
                    method:"post",
                    url:"http://47.100.42.144:3389/article/writeArticle",
                    data:{
                        userId: user_id,
                        title: Title.value,
                        content: Content.value
                    }
                }).then(res=>{
                    console.log(res);
                    if(res.data.data.message == "提交成功"){
                        Title.value = "";
                        Content.value = "";
                        alert("你的文章已上传成功!");
                        //退出文章的页面
                        var slip = document.querySelector(".write-article .title .user .slip-out");
                        const page = document.querySelectorAll(".pageList");
                        var header = document.querySelector(".header");
                        var header_slip = document.querySelector(".header .slip-out");
                        (function out(){
                            header.style.display = "block";
                            header_slip.style.display = "none";
                            slip.style.display = "none";
                            page[4].style.display = "none";
                            page[2].style.display = "block";
                        })();
                        //刷新个人主页
                        userPage(user_id);
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
            
        })();
        
        
    })();


    //显示文章的页面
    function showArticlePage(detail,articleId,authorId){
        //跳转
        (function jump(){
            //跳转
            let articlePage = document.querySelector(".show-article");
            let pages = document.querySelectorAll(".pageList");
            for(let i=0; i<pages.length; i++){
                pages[i].style.display = "none";
            }
            document.querySelector(".header .items #MainPage a").style.color = "#71777C";
            articlePage.style.display = "block";
        })();
        //配置文章页面的信息
        (function(){
            let page_userHead = document.querySelector(".show-article .deside-area .Head img");
            let page_userName = document.querySelector(".show-article .deside-area .Name");
            let art_userHead = document.querySelector(".show-article .artBox .user .userHead img"); 
            let art_userName = document.querySelector(".show-article .artBox .user .userName"); 
            let art_title = document.querySelector(".show-article .artBox .tit"); 
            let art_content = document.querySelector(".show-article .artBox .content");
            art_userHead.src = "http://47.100.42.144:3389/"+detail.authorAvatar;
            page_userHead.src = "http://47.100.42.144:3389/"+detail.authorAvatar;
            art_userName.innerHTML = detail.author;
            page_userName.innerHTML = detail.author;
            art_title.innerHTML = detail.title;
            art_content.innerHTML = detail.content;
            //设置点击文章作者头像跳转
            (function jumpToUserPage(){
                let user = document.querySelector(".show-article .main-area .artBox .user");
                let aboutAuthor = document.querySelector(".show-article .deside-area .userItem");
                let page = document.querySelectorAll(".pageList"); 
                user.onclick = function(){
                    for(let i=0;i<page.length;i++){
                        page[i].style.display = "none";
                    }
                    page[2].style.display = "block";
                    userPage(authorId);
                };
                aboutAuthor.onclick = function(){
                    for(let i=0;i<page.length;i++){
                        page[i].style.display = "none";
                    }
                    page[2].style.display = "block";
                    userPage(authorId);
                };
            })(); 
        })();

        //设置侧边点赞点踩评论按钮
        (function button(){
            //获取文章的详细数据
            function getArtDetail(artId,user_id){
                return new Promise((resolve,reject)=>{
                    axios.get("http://47.100.42.144:3389/article/getContent",{params:{userId:user_id,articleId:artId}})
                    .then(res=>{
                        resolve(res.data.data);
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            }

            (async function thumbUp(){
                var thumb = document.querySelector(".show-article .fixed-area .thumbUp");
                var thumbNum = document.querySelector(".show-article .deside-area .thumbUp span");
                var dislike = document.querySelector(".show-article .fixed-area .dislike");       
                //设置点赞的样式
                thumbNum.innerHTML = detail.thumbUpNum;
                (function setThumbStyle(){
                    if(detail.isThumbUp == true){
                        thumb.style.color = "#48c94e";
                    }else{
                        thumb.style.color = "rgba(0, 0, 0, .3)";
                    }
                })();
                //设置点踩的样式
                (function setdislikeStyle(){
                    if(detail.isDislike == true){
                        dislike.style.color = "#48c94e";
                    }else{
                        dislike.style.color = "rgba(0, 0, 0, .3)";
                    }
                })();

                thumb.onclick = async function(){
                    //发送请求
                    detail = await getArtDetail(articleId,user_id);
                    //上传数据
                    if(detail.isThumbUp == false){
                        // 改变样式
                        thumb.style.color = "#48c94e";
                        axios({
                            method:"post",
                            url:"http://47.100.42.144:3389/article/thumbUpArticle",
                            data:{
                                userId: user_id,
                                articleId: articleId,
                                flag:"true",
                            }
                        }).then(res=>{
                            console.log(res);
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else if(detail.isThumbUp == true){
                        // 改变样式
                        thumb.style.color = "#48c94e";
                        axios({
                            method:"post",
                            url:"http://47.100.42.144:3389/article/thumbUpArticle",
                            data:{
                                userId: user_id,
                                articleId: articleId,
                                flag: "false",
                            }
                        }).then(res=>{
                            console.log(res);
                            thumb.style.color = "rgba(0, 0, 0, .3)";
                        }).catch(err=>{
                            console.log(err);
                        })
                    }

                }

                dislike.onclick = async function(){
                    //发送请求
                    detail = await getArtDetail(articleId,user_id);
                    //上传数据
                    if(detail.isDislike == false){
                        axios({
                            method:"post",
                            url:"http://47.100.42.144:3389/article/dislikeArticle",
                            data:{
                                userId: user_id,
                                articleId: articleId,
                                flag:"true",
                            }
                        }).then(res=>{
                            console.log(res);
                            dislike.style.color = "#48c94e";
                        }).catch(err=>{
                            console.log(err);
                        })
                    }else if(detail.isDislike == true){
                        axios({
                            method:"post",
                            url:"http://47.100.42.144:3389/article/dislikeArticle",
                            data:{
                                userId: user_id,
                                articleId: articleId,
                                flag: "false",
                            }
                        }).then(res=>{
                            console.log(res);
                            dislike.style.color = "rgba(0, 0, 0, .3)";
                        }).catch(err=>{
                            console.log(err);
                        })
                    }
                }

            })();

        })();

        //设置评论
        (async function(){
            //获取用户信息的封装函数
            function getUserInfo(user_id){
                return new Promise((resolve,reject)=>{
                        axios.get("http://47.100.42.144:3389/user/getUserInfo",{params:{userId:user_id}})
                    .then(res=>{
                        console.log(res);
                        resolve(res.data.data);
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            }
            //发送获取评论的请求函数
            function getComMessage(pageNum){
                return new Promise((resolve,reject)=>{
                    axios.get("http://47.100.42.144:3389/comment/getComment",{params:{page:pageNum,userId:user_id,articleId:articleId}})
                    .then(res=>{
                        // console.log(res.data.data);
                        resolve(res.data.data);
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            }
            //获取窗口的信息函数
            function getwindow(){
                if(typeof window != 'undefined'){
                    return {
                        width: window.innerWidth,
                        height: window.innerHeight,
                    }
                }else{
                    return {
                        width: document.documentElement.clientWidth,
                        height: document.documentElement.clientHeight,
                    }
                }
            }
            //获取回复请求的函数
            function getResponse(comId,pageNum){
                return new Promise((resolve,reject)=>{
                    axios.get("http://47.100.42.144:3389/reply/getReply",{params:{userId:user_id,commentId:comId,page:pageNum}})
                    .then(res=>{
                        resolve(res.data.data);
                    }).catch(err=>{
                        console.log(err);
                    })
                })
            }
            //删除回复函数
            function deleteReply(btn,replyId,reply){
                btn.onclick = function(){
                    if(confirm("回复删除后不可回复，您确定要删除吗?")==true){
                        axios({
                            method:"post",
                            url:"http://47.100.42.144:3389/reply/deleteReply",
                            data:{
                                userId:user_id+"",
                                replyId:replyId+""
                            }
                        }).then(res=>{
                            
                        }).catch(err=>{
                            console.log(err);
                        })
                        reply.innerHTML = "";
                        reply.parentNode.removeChild(reply);
                    }
                }
            }

            //你是谁
            var myInfo = await getUserInfo(user_id);
            //发评论样式
            
            //总体评论区域的显示
            (function setComment(){
                //输入评论
                (function slip(){
                    var avatar = document.querySelector(".show-article .main-area .user .userHead img");
                    var inputAvatar = document.querySelector(".show-article .main-area .inputCom .pic img");
                    var slip_out = document.querySelector(".show-article .main-area .inputCom .slip-out");
                    var inputComBox = document.querySelector(".show-article .main-area .inputCom");
                    var input = document.querySelector(".show-article .main-area .inputCom .input");
                    var postButton = document.querySelector(".show-article .main-area .inputCom .upload");
                    //样式
                    inputComBox.onclick = function(e){
                        e=e||window.e;
                        e.cancelBubble = true;
                        if(e.target.className == "input" ){
                            slip_out.style.display = "flex";
                        }
                    };
                    document.addEventListener("click",function(){
                        slip_out.style.display = "none";
                    },false);

                    avatar.src = "http://47.100.42.144:3389/"+ detail.authorAvatar;
                    inputAvatar.src = "http://47.100.42.144:3389/"+ myInfo.avatar;
                    //发送表情
                    (function Emoji(){
                        //点击输入表情函数
                        function setEmoji(input,emojiNum,emojiFace){
                            let key = Object.keys(emojiFace[emojiNum]);
                            input.value += key[0];
                        }
                         
                        //执行函数
                        (function(){
                            let emojiFace = setEmojiContent();
                            let sendEmojiBtn = document.querySelector(".show-article .main-area .inputCom .slip-out .sendEmoji");
                            let emojiBox = document.querySelector(".show-article .main-area .inputCom .slip-out .emojiSlipOut");
                            var flag = true;
                            //样式出现
                            sendEmojiBtn.onclick = function(){
                                if(flag == true){
                                    //改变样式
                                    emojiBox.style.display = "block";
                                    flag = false;
                                }else{
                                    emojiBox.style.display = "none"
                                    flag = true;
                                }
                                
                            }; 
                            //设置每个emoji点击
                            (function(){
                                let Btns = document.querySelectorAll(".show-article .main-area .inputCom .slip-out .emojiSlipOut img");
                                for(let i=0;i<Btns.length;i++){
                                    Btns[i].onclick = function(){
                                        setEmoji(input,i,emojiFace);
                                    }
                                }
                            })();
                            
                        })();
                    })();

                    //发送评论
                    postButton.onclick = async function(){
                        if(input.value != ""){
                            //发送
                            await axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/comment/postComment",
                                data:{
                                    userId: user_id,
                                    articleId: articleId,
                                    comment:input.value,
                                }
                            }).then(res=>{
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                            input.value = "";
                            //显示输入的评论
                            // showComment(comBox,myInfo,input.value);
                            setComment();
                        }else{
                            alert("用户您没有输入任何信息哦");
                        }
                    }


                })();
                //显示评论
                function showUserCom(userInfo,comMessage,comBox){
                    //设置内容的表情
                    comMessage.comment = setContentEmoji(comMessage.comment);
                    //创建元素
                    let comment = document.createElement("li");
                    comment.className = "comments";
                    comment.innerHTML = "<div class='comHead'><img src='"+"http://47.100.42.144:3389/"+comMessage.commentatorAvatar+"'></div>"
                                        +"<div class='innerCom'>"
                                            +"<a href='javascript:;' class='comAuthor'>"+comMessage.commentator+"</a>"
                                            +"<div class='comContent'>"+comMessage.comment+"</div>"
                                            +"<div class='comButtons'>"
                                                +"<a href='javascript:;' class='deleteCom'>删除</a>"
                                                +"<a href='javascript:;'><i class='iconfont thumbUpCom'>&#xe613;</i></a>"
                                                +"<a href='javascript:;'><i class='iconfont dislike'>&#xe613;</i></a>"
                                                +"<a href='javascript:;' class='reply'><i class='iconfont reply'>&#xe9b0;</i> 回复</a>"
                                            +"</div>"
                                            +"<div class='comSlipOut'>"
                                                +"<input type='text' class='replyInput' autocomplete='off' placeholder='输入回复...'>"
                                                +"<div class='postCom'>"
                                                    +"<div class='sendEmoji'><i class='iconfont'>&#xe66e;</i> 表情</div>"
                                                    +"<div class='emojiSlipOut'><img src='./img/emoji/1.jpg'><img src='./img/emoji/2.jpg'><img src='./img/emoji/3.jpg'><img src='./img/emoji/4.jpg'><img src='./img/emoji/5.jpg'><br><img src='./img/emoji/6.jpg'><img src='./img/emoji/7.jpg'><img src='./img/emoji/8.jpg'><img src='./img/emoji/9.jpg'><img src='./img/emoji/10.jpg'><br><img src='./img/emoji/11.jpg'><img src='./img/emoji/12.jpg'><img src='./img/emoji/13.jpg'><img src='./img/emoji/14.jpg'><img src='./img/emoji/15.jpg'><br><img src='./img/emoji/16.jpg'><img src='./img/emoji/17.jpg'><img src='./img/emoji/18.jpg'><img src='./img/emoji/19.jpg'><img src='./img/emoji/20.jpg'></div>"
                                                    +"<a href='javascript:;'>评论</a>"
                                                +"</div>"
                                            +"</div>"
                                        +"</div>";   
                    comBox.appendChild(comment);
                    //设置点赞
                    setThumbUp(comMessage,comment,setComment);
                    //设置点踩
                    setDislike(comMessage,comment,setComment);
                    //设置删除
                    deleteMyCom(userInfo,comMessage,comment,setComment);
                    return comment;
                }
                //设置显示表情
                function setContentEmoji(comment){
                    comment = comment.replace(/\[.{0,3}\]/ig,function(){
                        let args = arguments;
                        // console.log(args[0]);
                        for(let i=0;i<EmojiDepository.length;i++){
                            let key = Object.keys(EmojiDepository[i]);
                            if(args[0] == key){
                                return '<img src="'+EmojiDepository[i][key]+'">';
                            }
                        }
                    });
                    return comment;
                }
                //发送评论点赞或取消点赞
                function setThumbUp(commentDetail,comment){
                    let thumb = comment.lastElementChild.children[2].children[1];
                    if(commentDetail.isThumbUp == false){
                        thumb.style.color = "#9c9d9e";
                        thumb.innerHTML ="<i class='iconfont thumUpCom'>&#xe613;</i>";
                    }else if(commentDetail.isThumbUp == true){
                        thumb.style.color = "#48c94e";
                        thumb.innerHTML = "<i class='iconfont thumUpCom'>&#xe60c;</i>";
                    }
                    thumb.onclick = async function(){
                        if(commentDetail.isThumbUp == false){
                            await axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/comment/thumbUpComment",
                                data:{
                                    userId:user_id+"",
                                    commentId:commentDetail.commentId+"",
                                    flag:"true"
                                }
                            }).then(res=>{
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }else if(commentDetail.isThumbUp == true){
                            await axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/comment/thumbUpComment",
                                data:{
                                    userId:user_id+"",
                                    commentId:commentDetail.commentId+"",
                                    flag:"false"
                                }
                            }).then(res=>{
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                        setComment();
                    }
                }
                //发送评论点踩或取消点踩
                function setDislike(commentDetail,comment){
                    let dislike = comment.lastElementChild.children[2].children[2];
                    if(commentDetail.isDislike == false){
                        dislike.style.color = "#9c9d9e";
                        dislike.innerHTML ="<i class='iconfont dislike'>&#xe613;</i>";
                    }else if(commentDetail.isDislike == true){
                        dislike.style.color = "#48c94e";
                        dislike.innerHTML = "<i class='iconfont dislike'>&#xe60c;</i>";
                    }
                    dislike.onclick = async function(){
                        if(commentDetail.isDislike == false){
                            await axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/comment/dislikeComment",
                                data:{
                                    userId:user_id,
                                    commentId:commentDetail.commentId,
                                    flag:"true"
                                }
                            }).then(res=>{
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }else if(commentDetail.isDislike == true){
                            await axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/comment/dislikeComment",
                                data:{
                                    userId:user_id,
                                    commentId:commentDetail.commentId,
                                    flag:"false"
                                }
                            }).then(res=>{
                                console.log(res);
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                        setComment();
                    }
                }
                //删除评论函数
                function deleteMyCom(userInfo,commentMessage,comment){
                    let deleteBtn = comment.lastElementChild.children[2].firstElementChild; 
                    if(commentMessage.commentator != userInfo.nickname){
                        deleteBtn.style.display = "none";
                    }
                    deleteBtn.onclick = async function(){
                        if(confirm("删除评论后不能恢复，您确定删除吗?") == true){
                            await axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/comment/deleteComment",
                                data:{
                                    userId:user_id,
                                    commentId:commentMessage.commentId,
                                }
                            }).then(res=>{
                                setComment();
                                alert("删除成功!");
                            }).catch(err=>{
                                console.log(err);
                            })
                        }
                    }
                }
                //发送回复的函数
                function showReply(comList,comment){
                    let showReplyBtn = comment.lastElementChild.children[3].lastElementChild.lastElementChild;
                    let ReplySlipOut = comment.lastElementChild.children[3];
                    let inputReply = comment.lastElementChild.children[3].firstElementChild;
                    comment.onclick = function(e){
                        e = e || window.e;
                        e.cancelBubble = true;
                        if(e.target.className == "reply" || e.target.className == "iconfont reply"){
                            ReplySlipOut.style.display = "block";
                        }
                    }
                    document.addEventListener("click",function(){
                        ReplySlipOut.style.display = "none";
                    },false);

                    showReplyBtn.onclick = async function(){
                        if(inputReply.value != ""){
                            await axios({
                                method:"post",
                                url:"http://47.100.42.144:3389/reply/postReply",
                                data:{
                                    userId:user_id,
                                    commentId:comList.commentId,
                                    reply:inputReply.value
                                }
                            }).then(res=>{
                                setComment();
                            }).catch(err=>{
                                console.log(err);
                            })
                        }else{
                            alert("用户您没有输入任何内容哦");
                        }
                        
                    };
                    //设置输入表情
                    (function(){
                        let sendEmojiBtn = comment.lastElementChild.children[3].lastElementChild.firstElementChild;
                        let emojiSlipOut = comment.lastElementChild.children[3].lastElementChild.children[1];
                        let emojiFace = setEmojiContent();
                        flag = true;
                        //点击出现选框
                        sendEmojiBtn.onclick = function(){
                            if(flag == true){
                                emojiSlipOut.style.display = "block";
                                flag = false;
                            }else{
                                emojiSlipOut.style.display = "none";
                                flag = true;
                            }
                        };
                        //选择表情
                        function getEmojiBtn(){
                            let Btns = new Array;
                            for(let i=0;i<20;i++){
                                let readyBtn = comment.lastElementChild.children[3].lastElementChild.children[1].children[i];
                                if(readyBtn.nodeName == "IMG")
                                Btns.push(readyBtn);
                            }
                            return Btns;
                        }
                        let Btns = getEmojiBtn();
                        function setEmoji(emojiNum,emojiFace){
                            let key = Object.keys(emojiFace[emojiNum]);
                            inputReply.value += key[0];
                        }
                        //循环给表情点击赋值
                        for(let i=0;i<Btns.length;i++){
                            Btns[i].onclick = function(){
                                setEmoji(i,emojiFace);
                            }
                        }

                    })();
                }
                //获取并显示回复的函数
                async function showResponse(comId,comment){
                    for(let i=1;;i++){
                        let onePage = await getResponse(comId,i);
                        for(let j=0;j<onePage.length;j++){
                            //设置评论内容中的表情显示
                            onePage[j].replyContent = setContentEmoji(onePage[j].replyContent);
                            //创建元素
                            let reply = document.createElement("div");
                            reply.className = "response";
                            reply.innerHTML = "<div class='resHead'><img src='"+"http://47.100.42.144:3389/"+onePage[j].replierAvatar+"'></div>"
                            +"<div class='innerRes'>"
                                +"<a href='javascript:;' class='resAuthor'>"+onePage[j].replier+"</a>"
                                +"<div class='resContent'>"+onePage[j].replyContent+"</div>"
                                +"<div class='resButtons'><a href='javascript:;' class='deleteRes'>删除</a><a href='javascript:;' class='reply'><i class='iconfont'>&#xe9b0;</i> 回复</a></div>"
                            +"</div>";
                            comment.lastChild.appendChild(reply);
                            let deleteBtn = reply.lastElementChild.lastElementChild.firstElementChild;
                            if(onePage[j].replier != myInfo.nickname){
                                deleteBtn.style.display = "none";
                            }
                            deleteReply(deleteBtn,onePage[j].replyId,reply);
                        }
                        if(onePage ==""){
                            break;
                        }
                    }
                }
                //评论底部显示到底
                function showComLast(comBox){
                    let lastBox = document.createElement("div");
                    lastBox.className = "lastBox";
                    lastBox.innerHTML ="已经滑到底了呢...";
                    comBox.appendChild(lastBox);
                }

                var comBox = document.querySelector(".show-article .main-area .showAllCom");
                var pageNum = 1;
                var clientHeight = getwindow().height;
                comBox.innerHTML = "";
                //显示一页内容调用函数
                async function show(){
                    let comList = await getComMessage(pageNum);
                    for(let i=0;i<comList.length;i++){
                        //显示评论
                        let comment = showUserCom(myInfo,comList[i],comBox,setComment);
                        //显示输入回复
                        showReply(comList[i],comment,setComment);
                        //显示回复
                        showResponse(comList[i].commentId,comment);
                    }
                    return comList;
                }
                (async function main(){
                    //滚动显示下面的显示
                    show();
                    
                    window.addEventListener("scroll", async function showArticlePage(){
                        //判断滚动的位置
                        var distance = comBox.getBoundingClientRect().bottom - clientHeight;
                        if(distance < 3 && distance > -3){
                            let comList = await getComMessage(pageNum);
                            pageNum++;
                            show();
                            if(comList == ""){
                                showComLast(comBox);
                                window.removeEventListener("scroll",showArticlePage,false);
                            }
                        }
                        
                    },false);
                })();

               

                
            })();



        })();

    }






































































}