package gov.usa.forestryservice.permitting.model;

import java.io.Serializable;

public class Phone implements Serializable {

	private static final long serialVersionUID = 3201242220742658633L;

	private int areaCode;
	private int number;
	private String extension;
	private String type;

	public Phone() {
		// empty for now
	}

	public int getAreaCode() {
		return areaCode;
	}

	public void setAreaCode(int areaCode) {
		this.areaCode = areaCode;
	}

	public int getNumber() {
		return number;
	}

	public void setNumber(int number) {
		this.number = number;
	}

	public String getExtension() {
		return extension;
	}

	public void setExtension(String extension) {
		this.extension = extension;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

}
