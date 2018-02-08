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

<script type='text/javascript' src='dwr/engine.js'></script>  
<script type='text/javascript' src='dwr/util.js'></script>  
<script type='text/javascript' src='dwr/interface/receiveDao.js'></script>

<script type="text/javascript">
		function regain(id,b){
			
			receiveDao.regain(id,function(result){
				
				if(result){
					alert("�ָ��ɹ�");
					var tr = b.parentNode.parentNode;
					tr.parentNode.removeChild(tr);
				}else{
					alert("�ָ�ʧ��");		
				}
				
			});
		}
			
			function remove(id,b){
				
				receiveDao.remove(id,function(result){
					
					if(result){
						alert("ɾ���ɹ�");
						var tr = b.parentNode.parentNode;
						tr.parentNode.removeChild(tr);
					}else{
						alert("ɾ��ʧ��");		
					}
					
				});
		}	

</script>
<style type="text/css">
th{
	border:1px solid;
	text-align:center;
	}
td{
	border:1px solid;
	text-align:center;
	}
a{
	text-decoration: none;
	color: blue;
}
</style>
</head>
<body>
<s:include value="top.jsp"></s:include>
	<table width="80%" style="border:1px solid;" cellspacing="0">
		<caption><b>������</b></caption>
		<tr>
			<th><small>��Դ</small></th><th><small>����</small></th><th><small>����</small></th><th><small>����</small></th>
		</tr>
		
		<s:iterator value="listmsg" var="li">
			<tr>
				<s:if test="#li.del==1">
					<td>������</td>
				</s:if>
				<s:else>
					<td>�ռ���</td>
				</s:else>
				<td>
				
					<b><s:property value="#li.title"/></b>
				
				</td>
				
				<td>
				
					<s:property value="#li.content"/>
				
				</td>
				
				<td>
				
					<a href="javascript:void(0)" onclick="regain(<s:property value="#li.id"/> ,this )">||�ָ�||</a>
					<a href="javascript:void(0)" onclick="remove(<s:property value="#li.id"/> ,this)">||����ɾ��||</a>
					
				</td>
			</tr>
		</s:iterator>
	</table>
</body>
</html>