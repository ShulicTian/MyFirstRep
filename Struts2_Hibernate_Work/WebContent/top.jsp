<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
<%@ taglib uri="/struts-tags" prefix="s" %>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>Insert title here</title>
</head>
<body>
	<s:if test="#session.user==null">
		<a href="login.jsp">��½</a>
		<a href="reg.jsp">ע��</a>
	</s:if>
	<s:else>
		��ӭ��<s:property value="#session.user.uname"/>
		<a href="msg_add.jsp">д��</a>
	<a href="message!listMsg">������</a>
	<a href="getmessage!getHaveMsg" >�ռ���</a>
	<a href="getmessage!getDelStataMsg">������</a>
	<hr color="red">
	</s:else><br/>

</body>
</html>