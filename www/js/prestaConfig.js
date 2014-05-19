function savePrestaConfig() {
	
	var prestaUrl = document.getElementById("prestaUrl");
	app.saveSetting("prestaUrl", prestaUrl.value); 
	
	var prestaKey = document.getElementById("prestaKey");
	app.saveSetting("prestaKey", prestaKey.value);
	
	alert("Presta config saved.");
	
	app.loadSettings();
	
}

function resetFields() {
	
	var prestaUrl = document.getElementById("prestaUrl");
	prestaUrl.value = app.settings.prestaUrl; 
	
	var prestaKey = document.getElementById("prestaKey");
	prestaKey.value = app.settings.prestaKey;
	
}

function testPrestaConfig()
{

}
