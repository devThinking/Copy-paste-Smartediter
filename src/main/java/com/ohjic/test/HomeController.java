package com.ohjic.test;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import sun.misc.BASE64Decoder;

@Controller
public class HomeController {
	
	@RequestMapping(value = "/index.do", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		return "home";
	}
	
	@SuppressWarnings({ "restriction", "resource" })
	@RequestMapping(value = "/base64ImageUpload.do", method = RequestMethod.POST)
	@ResponseBody
	public String base64ImageUpload(HttpServletRequest req){
		String image = req.getParameter("image").split(",")[1];
	
		BASE64Decoder decoder = new BASE64Decoder();
		String url = "";
		try {
			byte[] btDataFile = decoder.decodeBuffer(image);
			File of = new File(req.getSession().getServletContext().getRealPath("/")+"resources/"+System.nanoTime()+".png");
			FileOutputStream osf = new FileOutputStream(of);
			osf.write(btDataFile);
			osf.flush();
			url = req.getContextPath()+"/resources/"+of.getName();
		}catch (IOException e) {
			e.printStackTrace();
		}
		return url;
	}
}
