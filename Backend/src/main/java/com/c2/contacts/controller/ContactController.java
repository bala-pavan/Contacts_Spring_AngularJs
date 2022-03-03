package com.c2.contacts.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.c2.contacts.dto.ContactDTO;
import com.c2.contacts.dto.LoginDTO;
import com.c2.contacts.mapper.ContactMapper;
import com.c2.contacts.mapper.UserMapper;
import com.c2.contacts.util.Base64Check;
import com.c2.contacts.util.UserUtil;

@CrossOrigin
@RestController
@RequestMapping("/contact")
public class ContactController {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private UserUtil userUtil;

	@Autowired
	private Base64Check base64Check;

	Logger logger = LogManager.getLogger(ContactController.class);

	@PostMapping(value = "/add", produces = MediaType.APPLICATION_JSON_VALUE)
	public String add(@RequestBody ContactDTO data) {

		int temp = 0;

		data.setEmail(data.getEmail().trim());
		data.setMoblieNumber(data.getMoblieNumber().trim());
		data.setName(data.getName().trim());
		
		// checking with null and empty
		if ((data.getEmail() == null || data.getEmail().isEmpty())
				|| (data.getName() == null || data.getName().isEmpty())
				|| (data.getMoblieNumber() == null || data.getMoblieNumber().isEmpty())) {
			return "You are Entering Null values";
		}
		
		if (!userUtil.isProperEmail(data.getEmail())) {
			return "check with email";
		}
		
		try {

			// query to insert
			String query = "insert into Contact(name, email, mobile_number) values (?, ?, ?)";

			// if update in sql temp will be 1
			temp = jdbcTemplate.update(query, data.getName(), data.getEmail(), data.getMoblieNumber());
		} catch (Exception e) {
			logger.error(e.getMessage());
			// if any error occurs
			return e.getMessage();
		}
		logger.info("signup method end");
		return (temp == 1) ? "true" : "false";
	}
	
	
	@GetMapping(value = "/getContacts")
	public List<ContactDTO> getContacts() {
		List<ContactDTO> contactDTOs = new ArrayList<ContactDTO>();
		
		String query = "select * from contact";
		
		try {
			contactDTOs = jdbcTemplate.query(query, new ContactMapper());
		} catch (Exception e) {
			logger.error(e.getMessage());
		}
		
		return contactDTOs;
	}
}
