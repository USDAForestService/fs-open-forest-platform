package gov.usa.forestryservice.permitting.noncommercial.model;

import gov.usa.forestryservice.permitting.model.PermitApplication;

public class NonCommercialPermitApplication extends PermitApplication {

	private static final long serialVersionUID = -1691246265026576101L;

	private NonCommercialFields noncommercialFields;

	public NonCommercialPermitApplication() {
		// empty for now
	}

	public NonCommercialFields getNoncommercialFields() {
		return noncommercialFields;
	}

	public void setNoncommercialFields(NonCommercialFields noncommercialFields) {
		this.noncommercialFields = noncommercialFields;
	}

}
