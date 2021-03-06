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
var app = {
	
	// Comma delimited Order Ids
	emailedOrderIds: '',
	
	// Array of Order Ids
	emailOrderIdList: [],
	
	// App Config Settings 
	settings : {
		prestaUrl: '',
		prestaKey: '',
		emailSubject:'',
		emailBody:''
	},
	
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    },
    
    loadSettings: function() {
    	this.settings.prestaUrl = window.localStorage.getItem("prestaUrl");
		this.settings.prestaKey = window.localStorage.getItem("prestaKey");
		this.settings.emailSubject = window.localStorage.getItem("emailSubject");
		this.settings.emailBody = window.localStorage.getItem("emailBody");

		this.setDefaultSettings();
    },
    
    setDefaultSettings: function() {
		this.settings.prestaUrl = '';
    	if (this.settings.prestaUrl == null || this.settings.prestaUrl == undefined || this.settings.prestaUrl == '') {			
			//this.settings.prestaUrl = "http://192.155.80.132/prestashop";
			this.settings.prestaUrl = "http://www.auparadisduthe.com";
			this.saveSetting("prestaUrl", this.settings.prestaUrl);
		}

		this.settings.prestaKey = '';
		if (this.settings.prestaKey == null || this.settings.prestaKey == undefined || this.settings.prestaKey == '') {			
			//this.settings.prestaKey = "U653UHI3X7QT2U4QS1DGVP7YN1VAD4K2";
			this.settings.prestaKey = "4ZJD1HRDQJ4Y6Q3WWSYMJXXPHR18M5XM";
			this.saveSetting("prestaKey", this.settings.prestaKey);
		}
		
		if (this.settings.emailSubject == null || this.settings.emailSubject == undefined || this.settings.emailSubject == '') {
			this.settings.emailSubject ='P2P Order Photos';
			this.saveSetting("emailSubject", this.settings.emailSubject);
		}
		
		if (this.settings.emailBody == null || this.settings.emailBody == undefined || this.settings.emailBody == '') {
			this.settings.emailBody = 'Bonjour,\n\n Nous avons le plaisir de vous annoncer que la préparation de votre commande est achevée. Elle sera remise au transporteur dans les plus brefs délais.\nVous trouverez ci-dessous une photo de votre colis et de son contenu.\nNous restons à votre disposition,\n\nL’équipe du Paradis du Thé.';
			this.saveSetting("emailBody", this.settings.emailBody);
		}
    },
    
    saveSetting: function(key, value) {
    	window.localStorage.setItem(key, value);
    },
    
    loadEmailedOrderIds: function() {
    	this.emailedOrderIds = window.localStorage.getItem("emailedOrderIds");
    	if (this.emailedOrderIds == null || this.emailedOrderIds == undefined || this.emailedOrderIds == '') {
			this.emailedOrderIds = '';
			this.emailOrderIdList = [];
		} else {
			this.emailOrderIdList = this.emailedOrderIds.split(',');
		}
    },
    
    isEmailSent: function(orderId) {
    	this.loadEmailedOrderIds(); // get the latest
    	return (this.emailOrderIdList.indexOf(orderId) > -1);
    },
    
    saveEmailedOrderId: function(orderId) {
    	if (!this.isEmailSent(orderId)) {
	    	var newStr = this.emailedOrderIds += "," + orderId;
	    	this.saveSetting("emailedOrderIds", this.emailedOrderIds);
    	}
    }
    
};
