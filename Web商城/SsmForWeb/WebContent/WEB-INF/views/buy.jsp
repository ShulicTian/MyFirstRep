<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030"%>
<%@ page import="web.ssm.po.ordermsg.*,java.util.*,java.text.*" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<title>Insert title here</title>
</head>
<body>
	<% 
	   Date date = new Date();
		date.setTime(1800000);
	   DateFormat df = new SimpleDateFormat("mm");
	%>
	����<%=df.format(date)%>������֧��<br/>
	������:${requestScope.order.order.orderNum}<br/>
	��ע:<input type="text" name="remarks"/><br/>
	��Ʒ:${requestScope.order.item.name} X${requestScope.order.number} ${requestScope.order.item.much}<br/>
	<a>����֧��</a>
</body>
</html>