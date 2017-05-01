package gov.usa.forestryservice.permitting.model;

public enum PermitType {
	NONCOMMERCIAL("noncommercial");

	private String typeText;

	private PermitType(String typeText) {
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
