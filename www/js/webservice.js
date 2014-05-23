
function getAndListOrders()
{
	var request = new XMLHttpRequest();
	var wsUrl	= getWebserviceHandle("orders");

	request.open("GET", wsUrl + "&filter[current_state]=[3]", true);

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var ordersXml = request.responseXML;

				var ordersRequest = new XMLHttpRequest();
				var orders = ordersXml.getElementsByTagName('orders');
				var orderList = orders[0].getElementsByTagName('order');

				for ( i = 0; i < orderList.length; i++) {
					var row = "<tr>";
					row += getEmailSentColumnText(orderList[i].getAttribute('id'));
					row += "<td> <a href='order.html?id= " + orderList[i].getAttribute('id') + "'>P2P order # :" + orderList[i].getAttribute('id') + "</a></td>";
					row += "<td></td>";
					row += "</tr>";
					
					document.getElementById('result-rows').innerHTML += row;
				}
			}
		}
	};

	console.log("asking for orders");
	request.send();
}

function getOrderDetails()
{
	var id = getIdFromParam();
	var request = new XMLHttpRequest();
	var wsUrl	= getWebserviceHandle("orders/" + id);

	request.open("GET", wsUrl, true);

	request.onreadystatechange = function() {
		if (request.readyState == 4) {
			if (request.status == 200 || request.status == 0) {
				var ordersXml = request.responseXML;

				var order = ordersXml.getElementsByTagName("order");

				console.log(order[0]);
				var customerId = order[0].getElementsByTagName("id_customer")[0].childNodes[0].nodeValue;

				var jarray = ["id", "id_customer", "invoice_number", "invoice_date", "payment"];

				for ( x = 0; x < 5; x++) {
					document.getElementById('result-rows').innerHTML += "<tr><td>  " + jarray[x] + " : </td><td> <span id='order_"+ jarray[x] +"'>" + order[0].getElementsByTagName(jarray[x])[0].childNodes[0].nodeValue + "</span> </td></tr>";
				}

				var customerRequest = new XMLHttpRequest();
				var customerWsUrl	= getWebserviceHandle("customers/" + customerId);

				customerRequest.open("GET", customerWsUrl, true);

				customerRequest.onreadystatechange = function() {
					if (customerRequest.readyState == 4) {
						if (customerRequest.status == 200 || customerRequest.status == 0) {
							var customerXml = customerRequest.responseXML;
							var customer = customerXml.getElementsByTagName("customer");
							console.log(customer[0]);
							document.getElementById('result-rows').innerHTML += "<tr><td>  Name : </td><td id='customerName'>" + customer[0].getElementsByTagName("firstname")[0].childNodes[0].nodeValue + " " + customer[0].getElementsByTagName("lastname")[0].childNodes[0].nodeValue + "</td></tr>";
							document.getElementById('result-rows').innerHTML += "<tr><td>  Email : </td><td>" + customer[0].getElementsByTagName("email")[0].childNodes[0].nodeValue + "</td></tr>";

							// save email on a hidden field for sending photo
							var email = customer[0].getElementsByTagName("email")[0].childNodes[0].nodeValue;
							$('#hemail').val(email);
						}
					}
				};
				console.log("fetching email address");
				customerRequest.send();
				
				var id = document.getElementById('order_id').innerHTML;
				if (app.isEmailSent(id)) {
					showRemarks(); 
				}
			}
		}
	};

	console.log("asking for orders");
	request.send();
}

function getWebserviceHandle(controlKey)
{
	return app.settings.prestaUrl + "/api/" + controlKey + "?ws_key=" + app.settings.prestaKey;
}

function getIdFromParam()
{
	var $_GET = {};

	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function() {
		function decode(s) {
			return decodeURIComponent(s.split("+").join(" "));
		}

		$_GET[decode(arguments[1])] = decode(arguments[2]);
	});

	return $_GET["id"];
}

function getEmailSentColumnText(id) {

	if (app.isEmailSent(id)) {
 		return "<td><img src='img/email.png' style='height:24px; width:24px'/></td>"; 
 	}
 	
	return "<td></td>";	
}
