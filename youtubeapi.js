function loadData() {

var $h2 =  $("#youtubehead")
var $search = $("#search").val(); 
 var $youtubeLinks = $("#youtubeVidLinks");
 var $playlist = $("#playlistlinks");  
var youtubeImg = '' 
var youtubeVidId = '' ; 
var youtubeImgUrl = ''; 
var youtubeUrl = '';   
var $wikilinks = $("#wikilinks"); 
var youtubeUrlSeach = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q=' + $search +' &key=AIzaSyBSW1Jg2C946dH8yZewOiI9AbN8oV4hXhM&type=video&maxResults=20'

$youtubeLinks.text("");  
$wikilinks.text("")

$.getJSON(youtubeUrlSeach, function(data){

$h2.text('Youtube videos for ' + $search + ':')
 
var youtubeArr = data.items 

for (var i=0;i<youtubeArr.length;i++){
    youtubeImg = youtubeArr[i].snippet.thumbnails.default.url; //img url 
    
  youtubeImgUrl = '<img class ="youtubeimages" src="'+ youtubeImg + '">'
   
 youtubeUrl = '<a href ="https://www.youtube.com/watch?v=' + youtubeArr[i].id.videoId + '" target ="_blank">' + youtubeArr[i].snippet.title +' </a>'

  $youtubeLinks.append('<li class ="links">' + youtubeImgUrl + '<p>' + youtubeUrl + ' </p> </li> ')
}
}) 

var wikiurl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ $search+ '&limit=10&namespace=0&format=json'

$.ajax(wikiurl, {
	dataType : "jsonp",
	jsonp: "callback",
	success: function (response){
		$("#wikihead").text('Wikipedia links for ' + $search)
		var articleList = response[1]; 
	for (var j=0;j<articleList.length;j++){
		$wikilinks.append('<li> <a href="https://en.wikipedia.org/wiki/' + articleList[j] + '"target ="_blank">' + articleList[j] + '</a> </li>' )
	}
	}
})

return false; 


}
$("#form-container").submit(loadData)