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
<script type='text/javascript' src='dwr/interface/messageDao.js'></script>

<script type="text/javascript">
		function del(id,a){
			messageDao.del(id,function(result){
				
				if(result){
					alert("ɾ���ɹ�");
					var tr = a.parentNode.parentNode;
					tr.parentNode.removeChild(tr);
				}else{
					alert("ɾ��ʧ��");		
				}
				
			});
			
		}

</script>
</head>
<body>
<s:include value="top.jsp"></s:include>
	<table width="80%" border="1" >
		<tr>
			<th>����</th><th>����</th><th>����</th>
		</tr>
		<s:iterator value="list" var="li">
			<tr>
				<td><s:property value="#li.title"/></td>
				<td><s:property value="#li.content"/></td>
				<td><a href="javascript:void(0)" onclick="del(<s:property value="#li.id" />,this)">ɾ��</a></td>
			</tr>
		</s:iterator>
	</table>
</body>
</html>