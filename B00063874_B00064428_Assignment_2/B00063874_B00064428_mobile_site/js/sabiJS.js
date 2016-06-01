/* WORDPRESS JSON Restful API */
function listPosts(data) {
	var output='<ul data-role="listview" data-filter="true">';
	$.each(data.posts,function(key,val) {

		var tempDiv = document.createElement("tempDiv");
		tempDiv.innerHTML = val.excerpt;
		$("a",tempDiv).remove();
		var excerpt = tempDiv.innerHTML;

		output += '<li>';
		//onclick call function showPost
		output += '<a href="#blogpost" onclick="showPost(' + val.id + ')">';
		//output += '<h3>' + val.title + '</h3>';

		output += (val.thumbnail) ?
			'<img src="' + val.thumbnail + '" alt="' + val.title + '" />':
			'<img src="images/seahSmall2.png" alt="seahorse pic" />';

		output += '<h3>' + val.title + '</h3>';

		output += '<p>' + excerpt + '</p>';
		output += '</a>';
		output += '</li>';
	}); // go through each post
	output+='</ul>';
	$('#postlist').html(output);
} // lists all the posts


function showPost(id) {
	$.getJSON('http://sabi11.co/?json=get_post&post_id=' + id + '&callback=?', function(data) {
		var output='';
		output += '<span class="fa fa-wordpress fa"></span>';
		console.log(data);
		output += '<h2 id="blogTitle">' + data.post.title + '</h2>';
		output += data.post.content;
		output += '<span class="fa fa-wordpress fa"></span>';
		$('#mypost').html(output);
	}); //get JSON Data for Stories
} //showPost

$(document).on("pageshow","#blogpost",function(){
	$('#showBlogEntry').css({"color": "#B3D2EF",
						"font-size": "1em"});
	//you may want to change this, green is just a test
});

// *******************************************************************************************************
function listVideos(data) {
  console.log(data);

  var output ='';
  for ( var i=0; i < data.feed.entry.length; i++) {

    var title = data.feed.entry[i].title.$t;
    var thumbnail = data.feed.entry[i].media$group.media$thumbnail[0].url;
    var description = data.feed.entry[i].media$group.media$description.$t;
    var id = data.feed.entry[i].id.$t.substring(38);

    output += '<div class="videoContainer">';

    output += '<a href="#videoPlay" data-transition="slide" onclick="playVideo(\'' +  id +'\',\'' + title + '\',\'' + escape(description) + '\')">';
    output += '<h3 class="videoTitle">' + title + '</h3>';
    output += '<img src="' + thumbnail + '" alt="' + title + '" />';
    output += '</a>';
    output += '</div>';
  }
  $('#videoList').html(output);
}

function playVideo(id, title, description) {
  var output ='<iframe src="http://www.youtube.com/embed/'+ id +'?wmode=transparent&amp;HD=0&amp;rel=0&amp;showinfo=0&amp;controls=1&amp;autoplay=1" frameborder="0"  allowfullscreen></iframe>';
  output += '<h3 class="videoTitle">' + title + '</h3>';
  output += '<p>' + unescape(description) + '</p>';
  $('#playground').html(output);
}