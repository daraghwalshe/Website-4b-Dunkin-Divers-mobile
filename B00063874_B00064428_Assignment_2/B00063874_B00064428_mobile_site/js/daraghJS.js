
//recieving data from flickr
function jsonFlickrFeed(data) {
	console.log(data);

	var fragOut='';

	var tagType = ["diver", "wreck", "creature"];

	//retrieve first six of each tagType
	for (var j = 0; j < tagType.length; j++) {
		fragOut += '<div class="thumbHeading"><br><h3><span class="fa fa-camera-retro fa-2x"></span>&nbsp;&nbsp;Some ';
		fragOut += tagType[j] + ' pics</h3></div>';
		fragOut += filterPhotos(data, tagType[j]);
		}

	$('#photolist').html(fragOut);
} //jsonFlickrFeed

/*********************************************************/
// filter out 6 photos by tag
function filterPhotos(data, tagIn) {
	//console.log("length is: " + data.items[0].media.m.length);

	var frag='';
	var chopd_string = (data.items[0].media.m.length)-6;
	var k = 0;
	for (var i = 0; i < data.items.length; i++) {
		console.log(data.items[i].tags);

		if(data.items[i].tags === (tagIn + ' dunkinphoto') && k<6){
			var title = data.items[i].title;
			var link = data.items[i].media.m.substring(0, chopd_string);
			var blocktype =
				((k%3)===2) ? 'c':
				((k%3)===1) ? 'b':
				'a';
				k++;
			frag += '<div class="thumb ui-block-' + blocktype + '">';
			// link to showphoto, onclick call showphoto and pass link and title
			frag += '<a href="#showphoto" data-transition="flip" onclick="showPhoto(\'' + link +'\',\'' + title + '\')">';
			frag += '<img src="' + link + '_s.jpg" class="thumbPhoto" alt="' + title + '" />';
			frag += '</a>';
			frag += '</div>';
			}
	} // go through each photo
	return frag;
}//end filterPhotos
/*********************************************************/

/*********************************************************/
// show a single photo
function showPhoto(link, title) {
	var bigPic='<a href="#page3photos" data-transition="flip">';
	bigPic += '<img src="' + link + '_b.jpg" alt="' + title +'" />';
	bigPic += '</a>';
	bigPic += '<h2>' + title + '</h2>';
	$('#myphoto').html(bigPic);
}

/*********************************************************/
//  style for thumbnail pictures (not working for mobile)
$( document ).on( "vmouseover", "img.thumbPhoto", function() {
 	$( this ).css({"box-shadow":"0 0 12px #EE3355"});
});

$( document ).on( "vmouseout", "img.thumbPhoto", function() {
 	$( this ).css({"box-shadow": "0 0 12px #9D4789"});
});


/*********************************************************/
// thumbnails and headings
// sizing layout and colour
$(document).on("pageshow", "#page3photos", function(){
	var screenLeft = screen.availWidth - 300;

	$("div.thumbHeading h3").css({"color":  "blue",
							"display":"block",
							"text-shadow":"0px 0px #000",
							"text-align": "center"
							});

	$("div.thumbHeading h3").css({"border-top": "1px solid blue",
							"clear":"both",
							"padding-top": screenLeft/3,
							"margin-left": screenLeft/6,
							"margin-right": screenLeft/2});

	$("div#photolist").css({"width": screen.availWidth, "padding": screenLeft/6});

	$(".thumb").css({"margin-left": screenLeft/6,
					"margin-top": screenLeft/6,
					"margin-bottom": screenLeft/6});

});

/*********************************************************/
//style for picture title
$(document).on("pageshow", "#showphoto", function(){
	$('#showphoto').css({"color": "blue",
						"font-size": "1em",
						"text-shadow":"0px 0px #000",
						"text-align": "center"});
});

/*********************************************************/





