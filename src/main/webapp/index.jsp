<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Welcome GL-DNND</title>
<%@ include file="/common/common.jsp"%>
<link rel="stylesheet" type="text/css" href="<c:url value='/css/index.css'/>"/> 
<style type="text/css">
.container-fluid{
	padding-left: 0px;
	padding-right: 0px;
}
.top-container{
	background-image: url('/gldnnd/images/57c5ced363be9f08b4cacf1745e221d3bb99d7c5.png');
	height: 170px;
	position:relative;
}
ul {
	margin:0;
	padding:0;
}
li.home,li.comic,li.live,li.phone-client {
	float:right;
	list-style-type:none;
	margin: 10px 20px 0px 20px;
	position: relative;
}
li.login,li.registered,li.history,li.contribute {
	float:left;
	list-style-type:none;
	margin: 10px 20px 0px 20px;
	position: relative;
}
#b-header-mask{
	height:42px;
	background-color: rgba(255,255,255,0.4);
}

.uns-box{
	float: right;
}
.reasch{
	position:absolute; 
	bottom:20px;
}

.top-bottom-nav-li{
	float:left;
	list-style-type:none;
	margin: 10px 20px 0px 20px;
	position: relative;
}
#mod-nav{
	margin: auto;
}
.v-item{
	float:left;
	list-style-type:none;
    position: relative;
    margin: 10px 10px;
}
.v-item img{
	width: 160px;
    height: 100px;
}
</style>
</head>
<body>
	<!-- 页面内容容器 -->
	<div class="container-fluid">
		<div class="top-container">
			<div class="row">
				<div id="b-header-mask">
					<div class="col-md-6">
						<ul class="top-ul-left">
							<li class="phone-client"><a href="#">移动端</a></li>
							<li class="live"><a href="#">直播</a></li>
							<li class="comic"><a href="#">番剧</a></li>
							<li class="home"><a href="#">主站</a></li>
						</ul>
					</div>
					<div class="col-md-6">
						<ul class="top-ul-right">
							<li class="login">登录</li>
							<li class="registered">注册</li>
							<li class="history">历史</li>
							<li class="contribute">投稿</li>
						</ul>
					</div>
				</div>
			</div>
			<div class="reasch row">
				<div class="col-lg-1 col-md-2" style="float:right ">
					<input id="index-reasch"/>
				</div>
			</div>
		</div>
		<div class="top-bottom-nav row">
			<div class="col-md-2"></div>
			<div class="col-md-10" id="mod-nav">
				<ul>
					<li class="top-bottom-nav-li">首页</li>
					<li class="top-bottom-nav-li">首页</li>
					<li class="top-bottom-nav-li">首页</li>
					<li class="top-bottom-nav-li">首页</li>
					<li class="top-bottom-nav-li">首页</li>
					<li class="top-bottom-nav-li">首页</li>
					<li class="top-bottom-nav-li">首页</li>
				</ul>
			</div>
			<div class="col-md-2"></div>
		</div>
		
		<div id="item_list" class="item_list col-md-12">
			<div class="col-md-2"></div>
			<div class="col-md-8">
				<ul>
					<li class="v-item">
						<img style="width: 400px; height: 222px;" 
						alt="#" src="http://i0.hdslb.com/bfs/archive/96770b1901804d50bb5eacff8d9c081bcdb672af.jpg@.webp">
					</li>
					<li class="v-item">
						<img alt="#" src="http://i2.hdslb.com/bfs/archive/943a9da192e0b32caab134e4bcaccc8c3f65b61a.jpg@320w_200h.webp">
					</li>
					<li class="v-item">
						<img alt="#" src="http://i2.hdslb.com/bfs/archive/943a9da192e0b32caab134e4bcaccc8c3f65b61a.jpg@320w_200h.webp">
					</li>
					<li class="v-item">
						<img alt="#" src="http://i2.hdslb.com/bfs/archive/943a9da192e0b32caab134e4bcaccc8c3f65b61a.jpg@320w_200h.webp">
					</li>
					<li class="v-item">
						<img alt="#" src="http://i2.hdslb.com/bfs/archive/943a9da192e0b32caab134e4bcaccc8c3f65b61a.jpg@320w_200h.webp">
					</li>
					<li class="v-item">
						<img alt="#" src="http://i2.hdslb.com/bfs/archive/943a9da192e0b32caab134e4bcaccc8c3f65b61a.jpg@320w_200h.webp">
					</li>
					<li class="v-item">
						<img alt="#" src="http://i2.hdslb.com/bfs/archive/943a9da192e0b32caab134e4bcaccc8c3f65b61a.jpg@320w_200h.webp">
					</li>
					<li class="v-item">
						<img alt="#" src="http://i2.hdslb.com/bfs/archive/943a9da192e0b32caab134e4bcaccc8c3f65b61a.jpg@320w_200h.webp">
					</li>
					<li class="v-item">
						<img alt="#" src="http://i2.hdslb.com/bfs/archive/943a9da192e0b32caab134e4bcaccc8c3f65b61a.jpg@320w_200h.webp">
					</li>
				</ul>
			</div>
			<div class="col-md-2"></div>
		</div>
		
		<div id="foot" class="pc_show" style="max-height: 200px;">
		
		</div>
	</div>
</body>
</html>