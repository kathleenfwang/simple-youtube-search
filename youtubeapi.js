/*function backgroundPicture() {
  var searchArr = ['tree','vacation','plants','spring','flower','fall','winter','nature','summer','field','animal','leaves','water','lake','ocean','forest','mountain','city']
  var $search = searchArr[ Math.floor(Math.random()*searchArr.length)]
  var $picture = $("#picture")
  var unsplashURL = 'https://api.unsplash.com/search/photos?page=1&query=' + $search + '&client_id=cb4c69f9d48851b5363fab7ae6fe7cb88ab3998a56edaea4cec6e70861cc393f'
  
  $.getJSON(unsplashURL, function(data) {
    
    
     var int = Math.floor(Math.random() * data.results.length) 
   var imgurl= data.results[int].urls.raw
   
    $("body").append('<img class ="backgroundimg" src="'+imgurl+'">')
    
    
  })
  
  return false; 
}

document.onload = backgroundPicture()*/

/*var imgurl = 'https://source.unsplash.com/collection/190727'
$("body").append('<img class ="backgroundimg" src="'+imgurl+'">') */
function newPic(){
var urlsnip = 'https://source.unsplash.com/collection/'
var imgurls = ['878616','1482865','385724','212915']
//waterfall,ocean, nature
for (var i =0;i<imgurls.length;i++) {
  imgurls[i] = urlsnip + imgurls[i]
}

var imgurl = '';
 imgurl = imgurls[randomNum()]
function randomNum() {
  return Math.floor(Math.random()*imgurls.length)
 
}
$("body").append('<img class ="backgroundimg" src="'+imgurl+'">') 
}
newPic();
/* make new pic button
$('button').click(function(){
  $('.backgroundimg').remove();
  newPic();
})
*/
function getTime(){
  var $date = $("#currentDate")
  var now = new Date(); //sets now to = current date&time
  var dateOnly =now.toString() // converts now obj to str
  dateOnly = dateOnly.slice(0,dateOnly.indexOf('G')) // take away the pacific standard time information, starting at GMT 
  $date.text(dateOnly) // change the text to display date string.
  $date.css({color:"coral", backgroundColor: "white"}) // change css of text to purple. 
}

setInterval(getTime,10) // makes this run every 10ms. 
 
 
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
    
  youtubeImgUrl = '<img src="'+ youtubeImg + '">'
   
 youtubeUrl = '<a href ="https://www.youtube.com/watch?v=' + youtubeArr[i].id.videoId + '"target = "_blank">' + youtubeArr[i].snippet.title +' </a>'
//Ex: '<a href ="www.google.com" target = "_blank"> text </a> 
  $youtubeLinks.append('<li class ="links">' + youtubeImgUrl +   '<p>' + youtubeUrl + '  </p> </li> ')
}
}) 

var wikiurl = 'https://en.wikipedia.org/w/api.php?action=opensearch&search='+ $search+ '&limit=5&namespace=0&format=json'

$.ajax(wikiurl, {
	dataType : "jsonp",
	jsonp: "callback",
	success: function (response){
		$("#wikihead").text('Top 5 Wikipedia links for ' + $search)
		var articleList = response[1]; 
	for (var j=0;j<articleList.length;j++){
		$wikilinks.append('<li> <a href="https://en.wikipedia.org/wiki/' + articleList[j] + '">' + articleList[j] + '</a> </li>' )

	}
	}
})

return false; 


}
$("#form-container").submit(loadData)
