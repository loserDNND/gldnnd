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
	bottom:0px;
	margin-bottom: 10px;
}
</style>
</head>
<body>
	<!-- 页面内容容器 -->
	<div class="container-fluid">
		<div class="top-container">
			<div class="row" id="b-header-mask">
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
			<div class="reasch row">
				<input id="index-reasch"/>
			</div>
		</div>
		
		<div id="item_list" class="item_list">
		
		</div>
		
		<div id="foot" class="pc_show" style="max-height: 200px;">
		
		</div>
	</div>
</body>
</html>