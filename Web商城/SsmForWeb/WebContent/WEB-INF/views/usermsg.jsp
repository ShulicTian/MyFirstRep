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
a{	
	text-decoration: none;
	color:#000000;
}
</style>
</head>
<body>
	<%  if(request.getSession().getAttribute("clickmsg").equals("off")){ %>
		Name:<br/><input type="text" value="${requestScope.usermsg.name}" ><br/><br/>
		Age:<br/><input type="text" value="${requestScope.usermsg.age}" ><br/><br/>
		Day:<br/><input type="text" value="${requestScope.usermsg.day}" ><br/><br/>
		IdCard:<br/><input type="text" value="${requestScope.usermsg.idcard}" ><br/><br/>
		YourslfText:<br/><textarea rows="3" cols="20">
	${requestScope.usermsg.youslftext}
	</textarea><br/><br/>
	<a href="changemsg">�޸�����</a>
	<a href="userindex">����</a>
	<% }else{ %>
		<form action="setusermsg" method="post">
			Name:<br/><input type="text" name="name" value="${requestScope.usermsg.name}"/><br/><br/>
			Age:<br/><input type="text" name="age" value="${requestScope.usermsg.age}"/><br/><br/>
			Day:<br/><input type="text" name="day" value="${requestScope.usermsg.day}"/><br/><br/>
			IdCard:<br/><input type="text" name="idCard" value="${requestScope.usermsg.idcard}"/><br/><br/>
			YourslfText:<br/><textarea rows="3" cols="20" name="youslftext">${requestScope.usermsg.youslftext}</textarea><br/><br/>
			<input type="submit" value="����" />
		</form>
		<form action="usermsg" method="post">
			<input type="submit" value="ȡ��" >
		</form>
	<% } %>
	
</body>
</html>