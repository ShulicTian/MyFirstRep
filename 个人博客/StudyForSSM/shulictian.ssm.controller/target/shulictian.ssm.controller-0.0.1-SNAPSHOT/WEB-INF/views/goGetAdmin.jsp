<%@ page language="java" contentType="text/html; charset=GB18030"
    pageEncoding="GB18030" import="shulictian.ssm.po.*"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=GB18030">
<link rel="stylesheet" type="text/css" href="css/oneindex.css">
<title>Insert title here</title>
<script type="text/javascript" src="http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js"></script>
<script type="text/javascript">

		$(document).ready(function(){
			if(${getStatus!=null}){
				if(${getStatus=="yes"}){
					alert("��ϲ��������Ϊ����Ա��");
				}else{
					alert("��֤ʧ�ܣ��������������룡");
				}
			}
		});			
	
	$(function(){
		$("#validata").click(function(){
			var type=${user.type};
			if(type==1){
				alert("���Ѿ��ǹ���Ա�������ظ����룡");
				return false;
			}
			var code=$("#code").val();
			if(code=="" || code==null){
				alert("�����벻��Ϊ�գ�");
				return false;				
			}
		});
	});
</script>
<style type="text/css">
a{text-decoration: none;color:black;}
a:hover{color:blue;text-decoration:underline;}
</style>
</head>
<body>
	<jsp:include page="/WEB-INF/views/heads.jsp"></jsp:include>
	<div style="margin:auto;margin-top:30px;padding:30px;;width:70%;text-align:center;background-color:white;">
		<form action="goGetAdmin" method="get">
			������������:<input type="text" name="code" id="code"><input type="submit" value="��֤" id="validata">
			<p>��������������ϵ<i style="color:blue;">����:<a href="##" style="text-decoration:underline;">ShulicTian</a></i></p>
			<a href="##" onclick="location.href='index';return false" style="border:1px gray solid;display:block;width:50px;height:25px;line-height:25px;margin:auto;">
				����
			</a>
		</form>
	</div>
</body>
</html>