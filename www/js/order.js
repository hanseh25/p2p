/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var order = {
	destinationType: '', // sets the format of returned value 
	encodingType: '', // image encoding type
	imageData: []
};

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
	// Uncomment to view the base64 encoded image data
	console.log(imageData);
	
	var attachmentName = 'attachment-'+ (1 + order.imageData.length);

	var thumbsDiv = document.getElementById('thumbnails');
	thumbsDiv.innerHTML += '<img style="width: 100px; height: 100px; margin: 4px;" id="'+ attachmentName +'" />';
	
	// Create image handle
	var thumbnail = document.getElementById(attachmentName);

	// Show the captured photo
	// The inline CSS rules are used to resize the image
	thumbnail.src = "data:image/jpeg;base64," + imageData;
	
	order.imageData.push([attachmentName+".png", imageData]);
	
}

// A button will call this function
//
function capturePhoto() {
	
	// Take picture using device camera and retrieve image as base64-encoded string
	navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
		quality : 50,
		destinationType : order.destinationType,
		encodingType: order.encodingType,
        saveToPhotoAlbum : true,
	});
	
}

// Called if something bad happens.
// 
function onFail(message) {
	alert('Failed because: ' + message);
}

// Called when email was successful 
//
function onSuccessEmailCallback(result) {
	console.log("email sent" + result);
}

function sendEmail() {
	var hemail = document.getElementById('hemail').value;
	var customerName = document.getElementById('customerName').innerHTML;
	var templatedMessage = app.settings.emailBody.replace(/\[NAME\]/g, customerName);
	
	// [["attachment1.png", imageData]]
    window.plugins.emailComposer.showEmailComposerWithCallback(
		  onSuccessEmailCallback,
		  app.settings.emailSubject,
		  templatedMessage,
		  [hemail],
		  [],
		  ["hans.torres@98labs.com","allan.danos@98labs.com"],
		  false,
		  [],
		  order.imageData
	);
    	
}