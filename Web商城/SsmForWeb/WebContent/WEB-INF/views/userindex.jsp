<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
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
#u2{
	padding-top: 20px;
}
#u2 li{
	list-style-type: none;
	margin:10px 0px 10px 0px;
}
#u2 li a{	
	text-decoration: none;
	color:#000000;
}
</style>
</head>
<body>
	<jsp:include page="head.jsp"></jsp:include>
	
	<% if(request.getSession().getAttribute("user")!=null){ %>
	<ul id="u2">
		<li>
			<a href="usermsg">�������� </a>
		</li>
		<li>
			<a href="useradd">�ջ���ַ</a>
		</li>
		<li>
			<a href="">������</a>
		</li>
		<li>
			<a href="">���ջ�</a>
		</li>
		<li>
			<a href="">������</a>
		</li>
	</ul>
	<% }else{ %>
	<br/>�����!
	<% } %>

</body>
</html>