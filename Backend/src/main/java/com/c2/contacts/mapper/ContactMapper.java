package com.c2.contacts.mapper;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.BeanPropertyRowMapper;

import com.c2.contacts.dto.ContactDTO;
import com.c2.contacts.dto.UserDTO;
import com.c2.contacts.util.Base64Check;

public class ContactMapper extends BeanPropertyRowMapper<ContactDTO>{
	public ContactDTO mapRow(ResultSet rs, int rowNumber) throws SQLException{
//		Base64Check base64Check =  new Base64Check();
		
		ContactDTO dto = new ContactDTO();
		dto.setEmail(rs.getString("email"));
		dto.setName(rs.getString("name"));
		dto.setMoblieNumber(rs.getString("mobile_number"));
		
		return dto;
		
	}
	

}
