<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>��Ʒ����</title>
<style type="text/css">
body{
	margin: 0px;
	padding: 0px;
}
</style>
<script type="text/javascript">

	function a(){
		alert("�ɹ����빺�ﳵ");
	}

</script>
</head>
<body>
	${requestScope.item.photo}<br/>
	${requestScope.item.name}  ��${requestScope.item.much}<br/>
	<a href="addcart?id=${requestScope.item.id}" onclick="a()" >���빺�ﳵ</a>
	<a href="buy?id=${requestScope.item.id} ">��������</a>
</body>
</html>