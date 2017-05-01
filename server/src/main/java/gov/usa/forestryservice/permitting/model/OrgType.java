package gov.usa.forestryservice.permitting.model;

public enum OrgType {
	INDIVIDUAL("Individual");

	private String typeText;

	private OrgType(final String typeText) {
		this.typeText = typeText;
	}

	public String getTypeText() {
		return typeText;
	}

	@Override
	public String toString() {
		return getTypeText();
	}
}
