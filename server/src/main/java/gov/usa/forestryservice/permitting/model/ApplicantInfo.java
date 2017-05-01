package gov.usa.forestryservice.permitting.model;

import java.io.Serializable;

public class ApplicantInfo implements Serializable {

	private static final long serialVersionUID = -6220580852172478067L;

	private String firstName;
	private String lastName;
	private Phone dayPhone;
	private Phone eveningPhone;
	private String emailAddress;
	private String mailingAddress;
	private String mailingAddress2;
	private String mailingCity;
	private String mailingState;
	private String mailingZIP;
	private String organizationName;
	private String website;
	private OrgType orgType;

	public ApplicantInfo() {
		// empty for now
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Phone getDayPhone() {
		return dayPhone;
	}

	public void setDayPhone(Phone dayPhone) {
		this.dayPhone = dayPhone;
	}

	public Phone getEveningPhone() {
		return eveningPhone;
	}

	public void setEveningPhone(Phone eveningPhone) {
		this.eveningPhone = eveningPhone;
	}

	public String getEmailAddress() {
		return emailAddress;
	}

	public void setEmailAddress(String emailAddress) {
		this.emailAddress = emailAddress;
	}

	public String getMailingAddress() {
		return mailingAddress;
	}

	public void setMailingAddress(String mailingAddress) {
		this.mailingAddress = mailingAddress;
	}

	public String getMailingAddress2() {
		return mailingAddress2;
	}

	public void setMailingAddress2(String mailingAddress2) {
		this.mailingAddress2 = mailingAddress2;
	}

	public String getMailingCity() {
		return mailingCity;
	}

	public void setMailingCity(String mailingCity) {
		this.mailingCity = mailingCity;
	}

	public String getMailingState() {
		return mailingState;
	}

	public void setMailingState(String mailingState) {
		this.mailingState = mailingState;
	}

	public String getMailingZIP() {
		return mailingZIP;
	}

	public void setMailingZIP(String mailingZIP) {
		this.mailingZIP = mailingZIP;
	}

	public String getOrganizationName() {
		return organizationName;
	}

	public void setOrganizationName(String organizationName) {
		this.organizationName = organizationName;
	}

	public String getWebsite() {
		return website;
	}

	public void setWebsite(String website) {
		this.website = website;
	}

	public OrgType getOrgType() {
		return orgType;
	}

	public void setOrgType(OrgType orgType) {
		this.orgType = orgType;
	}

}
