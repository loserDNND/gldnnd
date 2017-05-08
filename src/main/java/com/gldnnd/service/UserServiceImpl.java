package com.gldnnd.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gldnnd.dao.UserMapper;
import com.gldnnd.pojo.User;

@Service
public class UserServiceImpl {

	@Autowired 
	private UserMapper userMapper;
	
	public int deleteByPrimaryKey(String id){
		return userMapper.deleteByPrimaryKey(id);
	}
	
	public int insert(User user){
		return userMapper.insert(user);
	}
	
	public User selectByPrimaryKey(String id){
		return userMapper.selectByPrimaryKey(id);
	}
	
	public int updateByPrimaryKeySelective(User user){
		return userMapper.updateByPrimaryKeySelective(user);
	}
	
	public int updateByPrimaryKey(User user){
		return userMapper.updateByPrimaryKey(user);
	}
}
