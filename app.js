$(document).ready(function() {
	$('.inspiration-getter').submit(function(event) {
			$(".new-pic").remove();
			var allTags = $(".tag-getter").val();
			getPics(allTags);
	});
});

var getPics = function(allTags) {
	var result = $.ajax({
		url: "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=30733f7c4952f9bafc6635efea845c87&text=" + allTags + "&sort=interestingness-desc&extras=url_c&format=json",
		dataType: "jsonp",
		jsonp: 'jsoncallback',
		type: "GET",
		cache: true
		})
	.done(function(result){
		for (var i = 0; i < result.photos.photo.length; i++) {
			var owner = result.photos.photo[i].owner;
			var id = result.photos.photo[i].id;
			var farmId = result.photos.photo[i].farm;
			var serverId = result.photos.photo[i].server;
			var secret = result.photos.photo[i].secret;
			$(".results").append("<div class='new-pic'><a href='https://www.flickr.com/photos/" + owner + "/" + id + "' target='_blank'><img src='https://farm" + farmId + ".staticflickr.com/" + serverId + "/" + id + "_" + secret + ".jpg' style='max-width:100%;' onload='$(this).fadeIn();'' /></a></div>");
		};
	});
};