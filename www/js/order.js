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
	encodingType: '' // image encoding type
};

// Called when a photo is successfully retrieved
//
function onPhotoDataSuccess(imageData) {
	// Uncomment to view the base64 encoded image data
	console.log(imageData);
	
	var id = document.getElementById('order_id').innerHTML;
	var attachmentName = 'order-' + id + '-' + formatDate(new Date());

	var thumbsDiv = document.getElementById('thumbnails');
	thumbsDiv.innerHTML += '<img style="width: 100px; height: 100px; margin: 4px;" id="'+ attachmentName +'" />';
	
	// Create image handle
	var thumbnail = document.getElementById(attachmentName);

	// Show the captured photo
	// The inline CSS rules are used to resize the image
	thumbnail.src = "data:image/jpeg;base64," + imageData;
	
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

function sendEmail() {
	
	var hemail = document.getElementById('hemail').value;
	var customerName = document.getElementById('customerName').innerHTML;
	var templatedMessage = app.settings.emailBody.replace(/\[NAME\]/g, customerName);
	
	var list, images = [], index;
	list = document.getElementById("thumbnails").getElementsByTagName("img");
	for (index = 0; index < list.length; index++) {
		var attachmentName = list[index].id + '.png';
		var imageData = list[index].src.replace("data:image/jpeg;base64,",'');
	    images.push([attachmentName, imageData]);
	}

	// [["attachment1.png", imageData]]
    window.plugins.emailComposer.showEmailComposerWithCallback(
		  null,
		  app.settings.emailSubject,
		  templatedMessage,
		  [hemail],
		  [],
		  ["guillaume.devaux+P2P@gmail.com"],
		  false,
		  [],
		  images
	);
    	
	markEmailSent();
}

// save order id
//
function markEmailSent() {
	var id = document.getElementById('order_id').innerHTML;
	app.saveEmailedOrderId(id);
	
	showRemarks();
}

function showRemarks() {
	document.getElementById('remarks').style.display = 'block';
}

function formatDate(temp) {
    var dateStr = padStr(temp.getFullYear()) +
                  padStr(1 + temp.getMonth()) +
                  padStr(temp.getDate()) +
                  padStr(temp.getHours()) +
                  padStr(temp.getMinutes()) +
                  padStr(temp.getSeconds());
    return (dateStr );
}

function padStr(i) {
    return (i < 10) ? "0" + i : "" + i;
}
