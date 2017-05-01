package gov.usa.forestryservice.permitting.model;

import java.io.Serializable;

public class PermitApplication implements Serializable {

	private static final long serialVersionUID = 8776920196759676902L;

	private String tempControlNumber;

	private String region;
	private String forest;
	private String district;
	private String authorizingOfficerName;
	private String authorizingOfficerTitle;
	private ApplicantInfo applicantInfo;
	private PermitType type;

	public PermitApplication() {
		// empty for now
	}

	public String getRegion() {
		return region;
	}

	public void setRegion(String region) {
		this.region = region;
	}

	public String getForest() {
		return forest;
	}

	public void setForest(String forest) {
		this.forest = forest;
	}

	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getAuthorizingOfficerName() {
		return authorizingOfficerName;
	}

	public void setAuthorizingOfficerName(String authorizingOfficerName) {
		this.authorizingOfficerName = authorizingOfficerName;
	}

	public String getAuthorizingOfficerTitle() {
		return authorizingOfficerTitle;
	}

	public void setAuthorizingOfficerTitle(String authorizingOfficerTitle) {
		this.authorizingOfficerTitle = authorizingOfficerTitle;
	}

	public ApplicantInfo getApplicantInfo() {
		return applicantInfo;
	}

	public void setApplicantInfo(ApplicantInfo applicantInfo) {
		this.applicantInfo = applicantInfo;
	}

	public PermitType getType() {
		return type;
	}

	public void setType(PermitType type) {
		this.type = type;
	}

	public String getTempControlNumber() {
		return tempControlNumber;
	}

	public void setTempControlNumber(String tempControlNumber) {
		this.tempControlNumber = tempControlNumber;
	}

}
