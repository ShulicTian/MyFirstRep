<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
<%@ page import="web.ssm.po.user.User" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>Insert title here</title>
<style type="text/css">
body{
	margin: 0px;
	padding: 0px;
}
#u1 li{
	float: left;
	list-style-type: none;
	margin-right:5px;
	width: 100px; 
}
#u1 li a{	
	text-decoration: none;
	color:#000000;
}
</style>
</head>
<body>

	<% 
	User u = (User) request.getSession().getAttribute("user");
	if(u == null){
	%>
	<a href="reg.jsp">ע��</a>
	<a href="login.jsp">����</a>
	<% }else{%>
	��ӭ��
	${requestScope.user.name}
	<a href="exit">ע��</a>
	<ul style="float: right;" id="u1">
	
		<li>
			<a href="index" >��ҳ</a>
		</li>
		<li>
			<a href="userindex" >������ҳ</a>
		</li>
		<li>
			<a href="cart" >���ﳵ</a>
		</li>
		<li>
			<a href="sell" >��������</a>
		</li>
		<li>
			<a href="" >��ϵ�ͷ�</a>
		</li>
	</ul>
	
	<%
	}
	%>

</body>
</html>