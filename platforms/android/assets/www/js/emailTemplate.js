function saveEmailTemplate() {
	
	var emailSubject = document.getElementById("emailSubject");
	app.saveSetting("emailSubject", emailSubject.value); 
	
	var emailBody = document.getElementById("emailBody");
	app.saveSetting("emailBody", emailBody.value);
	
	alert("Email template saved.");
	
	app.loadSettings();
	resetFields();
	
}

function resetFields() {
	
	var emailSubject = document.getElementById("emailSubject");
	emailSubject.value = app.settings.emailSubject; 
	
	var emailBody = document.getElementById("emailBody");
	emailBody.value = app.settings.emailBody;
	
}
