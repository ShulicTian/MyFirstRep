/*
 * Generated by the Jasper component of Apache Tomcat
 * Version: Apache Tomcat/7.0.37
 * Generated at: 2018-03-15 08:59:19 UTC
 * Note: The last modified time of this file was set to
 *       the last modified time of the source file after
 *       generation to assist with modification tracking.
 */
package org.apache.jsp.WEB_002dINF.views;

import javax.servlet.*;
import javax.servlet.http.*;
import javax.servlet.jsp.*;

public final class addTopic_jsp extends org.apache.jasper.runtime.HttpJspBase
    implements org.apache.jasper.runtime.JspSourceDependent {

  private static final javax.servlet.jsp.JspFactory _jspxFactory =
          javax.servlet.jsp.JspFactory.getDefaultFactory();

  private static java.util.Map<java.lang.String,java.lang.Long> _jspx_dependants;

  private javax.el.ExpressionFactory _el_expressionfactory;
  private org.apache.tomcat.InstanceManager _jsp_instancemanager;

  public java.util.Map<java.lang.String,java.lang.Long> getDependants() {
    return _jspx_dependants;
  }

  public void _jspInit() {
    _el_expressionfactory = _jspxFactory.getJspApplicationContext(getServletConfig().getServletContext()).getExpressionFactory();
    _jsp_instancemanager = org.apache.jasper.runtime.InstanceManagerFactory.getInstanceManager(getServletConfig());
  }

  public void _jspDestroy() {
  }

  public void _jspService(final javax.servlet.http.HttpServletRequest request, final javax.servlet.http.HttpServletResponse response)
        throws java.io.IOException, javax.servlet.ServletException {

    final javax.servlet.jsp.PageContext pageContext;
    javax.servlet.http.HttpSession session = null;
    final javax.servlet.ServletContext application;
    final javax.servlet.ServletConfig config;
    javax.servlet.jsp.JspWriter out = null;
    final java.lang.Object page = this;
    javax.servlet.jsp.JspWriter _jspx_out = null;
    javax.servlet.jsp.PageContext _jspx_page_context = null;


    try {
      response.setContentType("text/html; charset=UTF-8");
      pageContext = _jspxFactory.getPageContext(this, request, response,
      			null, true, 8192, true);
      _jspx_page_context = pageContext;
      application = pageContext.getServletContext();
      config = pageContext.getServletConfig();
      session = pageContext.getSession();
      out = pageContext.getOut();
      _jspx_out = out;

      out.write('\r');
      out.write('\n');

	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";

      out.write("\r\n");
      out.write("<!DOCTYPE html PUBLIC \"-//W3C//DTD HTML 4.01 Transitional//EN\" \"http://www.w3.org/TR/html4/loose.dtd\">\r\n");
      out.write("<html>\r\n");
      out.write("<head>\r\n");
      out.write("<base href=\"");
      out.print(basePath);
      out.write("\">\r\n");
      out.write("<meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\">\r\n");
      out.write("<title>Insert title here</title>\r\n");
      out.write("<script type=\"text/javascript\" src=\"ckeditor/ckeditor.js\"></script>\r\n");
      out.write("<style type=\"text/css\">\r\n");
      out.write("body {\r\n");
      out.write("\tmargin: 0px;\r\n");
      out.write("\tpadding: 0px;\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("#butt {\r\n");
      out.write("\twidth: 70%;\r\n");
      out.write("\tmargin: 0 auto;\r\n");
      out.write("\ttext-align: center;\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("#d1 {\r\n");
      out.write("\twidth: 60%;\r\n");
      out.write("\tmargin: 0 auto;\r\n");
      out.write("\tbackground-color: white;\r\n");
      out.write("\tpadding: 20px;\r\n");
      out.write("\tmargin-top: 20px;\r\n");
      out.write("}\r\n");
      out.write("\r\n");
      out.write("#texts {\r\n");
      out.write("\twidth: 90%;\r\n");
      out.write("\tmargin: 0 auto;\r\n");
      out.write("}\r\n");
      out.write("</style>\r\n");
      out.write("</head>\r\n");
      out.write("<body>\r\n");
      out.write("\t<div style=\"background-color: #f5f6f7;\">\r\n");
      out.write("\t\t");
      org.apache.jasper.runtime.JspRuntimeLibrary.include(request, response, "head.jsp", out, false);
      out.write("\r\n");
      out.write("\t\t<div id=\"d1\">\r\n");
      out.write("\t\t\t<form class=\"layui-form\" action=\"bigCow/topic/add\" id=\"send\"\r\n");
      out.write("\t\t\t\tmethod=\"post\" enctype=\"multipart/form-data\">\r\n");
      out.write("\t\t\t\t<input type=\"hidden\" name=\"topicToken\" value=\"");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${sessionScope.topicToken}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("\">\r\n");
      out.write("\t\t\t\t<div class=\"layui-form-item\">\r\n");
      out.write("\t\t\t\t\t<div class=\"layui-input-block\"\r\n");
      out.write("\t\t\t\t\t\tstyle=\"margin-left: 50px; width: 100px; float: left; padding: 10px 5px;\">\r\n");
      out.write("\t\t\t\t\t\t<select name=\"genre\" lay-filter=\"aihao\">\r\n");
      out.write("\t\t\t\t\t\t\t<option value=\"0\">原创</option>\r\n");
      out.write("\t\t\t\t\t\t\t<option value=\"1\">转载</option>\r\n");
      out.write("\t\t\t\t\t\t\t<option value=\"2\">翻译</option>\r\n");
      out.write("\t\t\t\t\t\t</select>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t<div class=\"layui-input-block\"\r\n");
      out.write("\t\t\t\t\t\tstyle=\"margin: 0px; padding: 10px 5px; width: 900px; float: left;\">\r\n");
      out.write("\t\t\t\t\t\t<input name=\"title\" lay-verify=\"title\" autocomplete=\"off\"\r\n");
      out.write("\t\t\t\t\t\t\tplaceholder=\"请输入标题\" class=\"layui-input\" type=\"text\">\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t<div id=\"texts\">\r\n");
      out.write("\t\t\t\t\t<textarea rows=\"3\" cols=\"3\" name=\"text\"></textarea>\r\n");
      out.write("\t\t\t\t\t<br>\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t<div class=\"layui-form-item\" style=\"margin-left: 50px;\">\r\n");
      out.write("\t\t\t\t\t<label class=\"layui-form-label\" style=\"width: 100px;\">文章类型</label>\r\n");
      out.write("\t\t\t\t\t<div class=\"layui-input-inline\" style=\"width: 200px;\">\r\n");
      out.write("\t\t\t\t\t\t<select name=\"type\" lay-filter=\"aihao\">\r\n");
      out.write("\t\t\t\t\t\t\t<option value=\"\"></option>\r\n");
      out.write("\t\t\t\t\t\t\t<option v-for=\"types in names\" v-bind:value=\"types.type\">{{types.name}}</option>\r\n");
      out.write("\t\t\t\t\t\t</select>\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t\t<div class=\"layui-input-inline\"\r\n");
      out.write("\t\t\t\t\t\tstyle=\"margin: 5px 15px; margin-left: 30px;\">\r\n");
      out.write("\t\t\t\t\t\t<input class=\"easyui-filebox\" name=\"file\"\r\n");
      out.write("\t\t\t\t\t\t\tdata-options=\"prompt:'上传小图片'\" style=\"width: 200px;\">\r\n");
      out.write("\t\t\t\t\t</div>\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\r\n");
      out.write("\t\t\t\t<div id=\"butt\">\r\n");
      out.write("\t\t\t\t\t<input class=\"layui-btn layui-btn-primary\" type=\"submit\" value=\"发布\">\r\n");
      out.write("\t\t\t\t\t<input class=\"layui-btn layui-btn-primary\" type=\"button\"\r\n");
      out.write("\t\t\t\t\t\tvalue=\"存入草稿\" @click=\"draft\"> <input\r\n");
      out.write("\t\t\t\t\t\tclass=\"layui-btn layui-btn-primary\" type=\"button\" value=\"取消\"\r\n");
      out.write("\t\t\t\t\t\t@click=\"cancel\">\r\n");
      out.write("\t\t\t\t</div>\r\n");
      out.write("\t\t\t</form>\r\n");
      out.write("\t\t</div>\r\n");
      out.write("\t\t<div style=\"width: 100%; height: 50px;\"></div>\r\n");
      out.write("\t</div>\r\n");
      out.write("\r\n");
      out.write("\t<script type=\"text/javascript\">\r\n");
      out.write("\tlayui.use(['form', 'layedit','upload'], function(){\r\n");
      out.write("\t\t  var form = layui.form\r\n");
      out.write("\t\t  ,layedit = layui.layedit\r\n");
      out.write("\t\t  ,upload = layui.upload;\r\n");
      out.write("\t\t  \r\n");
      out.write("\t\t  \r\n");
      out.write("\t\t  //创建一个编辑器\r\n");
      out.write("\t\t  var editIndex = layedit.build('LAY_demo_editor');\r\n");
      out.write("\t\t  \r\n");
      out.write("\t\t});\r\n");
      out.write("\t</script>\r\n");
      out.write("\t<script type=\"text/javascript\">\r\n");
      out.write("\t\tnew Vue({\r\n");
      out.write("\t\t\tel: '#d1',\r\n");
      out.write("\t\t\tdata: {\r\n");
      out.write("\t\t\t\tnames:[\r\n");
      out.write("\t\t\t\t\t{name:'Vue.js',type:0},\r\n");
      out.write("\t\t\t\t\t{name:'Node.js',type:1},\r\n");
      out.write("\t\t\t\t\t{name:'JavaScript',type:2},\r\n");
      out.write("\t\t\t\t\t{name:'Ajax',type:3},\r\n");
      out.write("\t\t\t\t\t{name:'JQuery',type:4},\r\n");
      out.write("\t\t\t\t\t{name:'JQueryUI',type:5},\r\n");
      out.write("\t\t\t\t\t{name:'EasyUI',type:6},\r\n");
      out.write("\t\t\t\t\t{name:'LayUI',type:7},\r\n");
      out.write("\t\t\t\t\t{name:'BootStrap',type:8},\r\n");
      out.write("\t\t\t\t\t{name:'C/C++',type:9},\r\n");
      out.write("\t\t\t\t\t{name:'Java',type:10},\r\n");
      out.write("\t\t\t\t\t{name:'Java框架',type:11},\r\n");
      out.write("\t\t\t\t\t{name:'Maven',type:12},\r\n");
      out.write("\t\t\t\t\t{name:'Svn/Git',type:13},\r\n");
      out.write("\t\t\t\t\t{name:'Solr',type:14},\r\n");
      out.write("\t\t\t\t\t{name:'Navicat for Mysql',type:15},\r\n");
      out.write("\t\t\t\t\t{name:'Eclipse',type:16},\r\n");
      out.write("\t\t\t\t\t{name:'IntelliJ IDEA',type:17},\r\n");
      out.write("\t\t\t\t\t{name:'WebStorm',type:18},\r\n");
      out.write("\t\t\t\t\t{name:'Mysql',type:19},\r\n");
      out.write("\t\t\t\t\t{name:'Tomcat',type:20},\r\n");
      out.write("\t\t\t\t\t{name:'Weblogic',type:21},\r\n");
      out.write("\t\t\t\t\t{name:'Servlet/JSP',type:22},\r\n");
      out.write("\t\t\t\t\t{name:'Log4j',type:23},\r\n");
      out.write("\t\t\t\t\t{name:'Nginx',type:24},\r\n");
      out.write("\t\t\t\t\t{name:'redis',type:25},\r\n");
      out.write("\t\t\t\t\t{name:'shiro',type:26}\r\n");
      out.write("\t\t\t\t]\r\n");
      out.write("\t\t\t},\r\n");
      out.write("\t\t\tmethods:{\r\n");
      out.write("\t\t\t\tcancel: function(){\r\n");
      out.write("\t\t\t\t\tlocation.href=\"\"\r\n");
      out.write("\t\t\t\t},\r\n");
      out.write("\t\t\t\tdraft:function(){\r\n");
      out.write("\t\t\t\t\t$(\"#send\").attr(\"action\",\"bigCow/page/toDraft\")\r\n");
      out.write("\t\t\t\t\t$(\"#send\").submit() \r\n");
      out.write("\t\t\t\t},\r\n");
      out.write("\t\t\t\tsub:function(){\r\n");
      out.write("\t\t\t\t\t$(\"form\").submit()\r\n");
      out.write("\t\t\t\t}\r\n");
      out.write("\t\t\t},\r\n");
      out.write("\t\t\tcreated:function(){\r\n");
      out.write("\t\t\t\tconsole.log()\r\n");
      out.write("\t\t\t}\r\n");
      out.write("\t\t})\r\n");
      out.write("\t</script>\r\n");
      out.write("\t<script type=\"text/javascript\">CKEDITOR.replace('text',{height:500});</script>\r\n");
      out.write("\t<script type=\"text/javascript\">\r\n");
      out.write("\t$(document).ready(function(){\r\n");
      out.write("\t\t\tif(");
      out.write((java.lang.String) org.apache.jasper.runtime.PageContextImpl.proprietaryEvaluate("${user==null}", java.lang.String.class, (javax.servlet.jsp.PageContext)_jspx_page_context, null, false));
      out.write("){\r\n");
      out.write("\t\t\t\talert(\"请登入！\");\r\n");
      out.write("\t\t\t\t$(location).attr('href', 'bigCow/page/toGlobalLogin');\r\n");
      out.write("\t\t\t}\r\n");
      out.write("\t});\r\n");
      out.write("</script>\r\n");
      out.write("</body>\r\n");
      out.write("</html>");
    } catch (java.lang.Throwable t) {
      if (!(t instanceof javax.servlet.jsp.SkipPageException)){
        out = _jspx_out;
        if (out != null && out.getBufferSize() != 0)
          try { out.clearBuffer(); } catch (java.io.IOException e) {}
        if (_jspx_page_context != null) _jspx_page_context.handlePageException(t);
        else throw new ServletException(t);
      }
    } finally {
      _jspxFactory.releasePageContext(_jspx_page_context);
    }
  }
}
