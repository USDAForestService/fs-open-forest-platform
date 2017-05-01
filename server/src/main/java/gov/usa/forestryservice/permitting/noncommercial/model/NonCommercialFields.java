package gov.usa.forestryservice.permitting.noncommercial.model;

import java.io.Serializable;

public class NonCommercialFields implements Serializable {

	private static final long serialVersionUID = -1214869530572062668L;

	private String activityDescription;
	private String locationDescription;
	private String startDateTime;
	private String endDateTime;
	private int numberParticipants;

	public NonCommercialFields() {
		// empty for now
	}

	public String getActivityDescription() {
		return activityDescription;
	}

	public void setActivityDescription(String activityDescription) {
		this.activityDescription = activityDescription;
	}

	public String getLocationDescription() {
		return locationDescription;
	}

	public void setLocationDescription(String locationDescription) {
		this.locationDescription = locationDescription;
	}

	public String getStartDateTime() {
		return startDateTime;
	}

	public void setStartDateTime(String startDateTime) {
		this.startDateTime = startDateTime;
	}

	public String getEndDateTime() {
		return endDateTime;
	}

	public void setEndDateTime(String endDateTime) {
		this.endDateTime = endDateTime;
	}

	public int getNumberParticipants() {
		return numberParticipants;
	}

	public void setNumberParticipants(int numberParticipants) {
		this.numberParticipants = numberParticipants;
	}

}
