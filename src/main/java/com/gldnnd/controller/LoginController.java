package com.gldnnd.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gldnnd.service.UserServiceImpl;
import com.gldnnd.utils.web.WebContent;

@Controller
@RequestMapping("loginController")
public class LoginController extends WebContent {

	@Autowired
	private UserServiceImpl userServiceImpl;
	
}
