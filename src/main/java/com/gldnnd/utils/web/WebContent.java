package com.gldnnd.utils.web;

import java.io.PrintWriter;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.context.ApplicationContext;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.context.support.WebApplicationContextUtils;

import net.sf.json.JSONObject;
/**
 * web 应用上下文
 * @author Administrator
 */
public class WebContent extends WebConstants{

	/**
	 * 获取 HttpServletRequest
	 * 
	 * @return
	 */
	public HttpServletRequest getRequest() {
		ServletRequestAttributes sra = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
		return sra.getRequest();
	}

	/**
	 * 获取 HttpSession
	 * 
	 * @return
	 */
	public HttpSession getSession() {
		return getRequest().getSession();
	}

	/***
	 * 获取 ApplicationContext
	 * 
	 * @return
	 */
	public ApplicationContext getApplicationContext() {
		return WebApplicationContextUtils.getRequiredWebApplicationContext(getRequest().getServletContext());
	}
	
	/**
	 * 获取当前访问的页面URL
	 * 
	 * @return
	 */
	public String getCurrentURL() {
		String requestUrl = getRequest().getRequestURL().toString();
		String contextPath = getRequest().getContextPath();
		String resourceCode = requestUrl.substring(requestUrl.indexOf(contextPath) + contextPath.length() + 1);
		return resourceCode;
	}
	
	/**
	 * response.write(obj)
	 * @param obj
	 */
	public void write(HttpServletResponse response, Object obj){
	    if(response == null || obj == null){
	        return;
	    }
	    response.setContentType("text/html;charset=utf-8");
        response.setCharacterEncoding("utf-8");
        
        String msg = null;
        PrintWriter out = null;
        try {
            out = response.getWriter();
            msg = JSONObject.fromObject(obj).toString();
        } catch (Exception e) {
            msg = obj.toString();
        }
        out.write(msg);
	}
	
	/**
	 * response.write(obj)
	 * @param obj
	 */
	public void writeJson(HttpServletResponse response, Object obj){
	    if(response == null || obj == null){
	        return;
	    }
	    response.setContentType("text/javascript");
        String msg = null;
        PrintWriter out = null;
        try {
            out = response.getWriter();
            msg = JSONObject.fromObject(obj).toString();
        } catch (Exception e) {
            msg = obj.toString();
        }
        out.write(msg);
	}
	
	/**
	 * response.write(obj)
	 * @param obj
	 */
	public void writeHtml(HttpServletResponse response, Object obj){
	    if(response == null || obj == null){
	        return;
	    }
	    response.setContentType("text/html; charset=UTF-8");
	    response.setHeader("Access-Control-Allow-Origin", "*");
        String msg = null;
        PrintWriter out = null;
        try {
            out = response.getWriter();
            msg = JSONObject.fromObject(obj).toString();
        } catch (Exception e) {
            msg = obj.toString();
        }
        out.write(msg);
	}
	
	/**
	 * response.write(obj)
	 * @param obj
	 */
	public Cookie[] getAllCookie(HttpServletRequest request){
		// 获取所有的cookie值
		Cookie[] cookies = request.getCookies();
		if(cookies != null){
			return cookies;
		}
		return null;
	}
}
