
/* **************************************************************** *
 *     Daragh Walshe        	B00064428    		Nov. 2014       *
 *     Rich Web Developent      Assignment_02				        *
 * **************************************************************** */

$(document).on("pagecreate","#page5Map",function(){
   //alert("kickoff: ");
   //initialize();
});


var rendererOptions = {
	draggable: true
};
var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
var directionsService = new google.maps.DirectionsService();
var map;

//some variables with latitude and logtitude
var howth = new google.maps.LatLng(53.390647, -6.071300);
var howthDive = new google.maps.LatLng(53.391824, -6.066622);

///////////////////////////////
var loc = $("#startLoc").val();
///////////////////////////////


function initialize() {

	var mapOptions = {
		zoom: 10,
		//center: mapCenter
		center: howth
	};

	//a new google map centered on howth harbour
	map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	directionsDisplay.setMap(map);
	directionsDisplay.setPanel(document.getElementById('directionsPanel'));

	//a listener to watch if a marker gets mooved
	google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
		computeTotalDistance(directionsDisplay.getDirections());
	});

	calcRoute();

	//contents of pop-up window
	var contentString = '<div id="content">'+
		'<h3 id="firstHeading" class="firstHeading">Howth Harbour</h3>'+
		'<p><img src="images/howthSmall.jpg" class="mapPic" alt="picture of howth"></p>' +
		'<p><i>We are located on the</br>' +
		'West pier of picturesque</br> ' +
		'howth harbour, which is</br>' +
		'in North Dublin</i></p>'+
		'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	//customised marker
	var marker = new google.maps.Marker({
		position: howthDive,
		map: map,
		title: 'Howth Harbour'
	});

	//listener for the marker
	google.maps.event.addListener(marker, 'click', function() {
		infowindow.open(map,marker);
	});

}//end initialize


//---------------------------------
function calcRoute() {

	//two draggable markers with second one set on the dive club
	var request = {
		origin: ($("#startLoc").val()),
		destination: '16 W Pier, Dublin',
		travelMode: google.maps.TravelMode.DRIVING,
	};

	//use google direction service to get the directions
	directionsService.route(request, function(response, status) {
		if (status == google.maps.DirectionsStatus.OK) {
			directionsDisplay.setDirections(response);
		}
	});
}

//calculate the distance to the club
function computeTotalDistance(result) {
	var total = 0;
	var myroute = result.routes[0];
	for (var i = 0; i < myroute.legs.length; i++) {
		total += myroute.legs[i].distance.value;
	}
	total = total / 1000.0;
	document.getElementById('total').innerHTML = total + ' km';
}

//google.maps.event.addDomListener(window, 'load', initialize);

//---------------------------------
//re-initalise with new loc string
$(document).ready(function() {
  	var loc;

  	$("#button").click(function(){
		loc = $("#startLoc").val();
		initialize();
		//alert("outerFunc: " + loc);
  	});

 });


	//--------------------------------------------
	//initialize map
	//styling for the total distance output field
	$(document).on("pageshow", "#page5Map", function(){

		initialize();
		$("#totDist").css({"background": "black", "color": "white",
					"padding": "0.8em", "border-radius": "0.6em",
					"box-shadow": "inset 0 1px 3px", "margin": "0.5em"});
	});



