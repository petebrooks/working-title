$(document).ready(function(){
	$('#login').on("submit", function(event){
		event.preventDefault();
		var form = $(this);
		var url = form.attr("action");
		var data = form.serialize();
		var request = $.ajax(url, {method: "POST", data: data})

		request.done(function(response){
			response = JSON.parse(response);
			if (response != false) {
				window.location.replace(response)
			} else {
				form.parent().effect( "shake" );
			}
		});
	});
});