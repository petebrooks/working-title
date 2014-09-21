$(document).ready(function(){
	$('header .search-button').on("click", function(){
		if ($(this).hasClass('fa-search')) {
			$('#search-form').show();
			$('#pages-nav').hide();
			$('#session-nav').hide();
			$(this).removeClass('fa-search').addClass('fa-times');
		}	else if ($(this).hasClass('fa-times')) {
			$('#search-form').hide();
			$('#pages-nav').show();
			$('#session-nav').show();
			$(this).removeClass('fa-times').addClass('fa-search');
		}
	});
});