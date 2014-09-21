if ($.ui) {
    (function () {
        var oldEffect = $.fn.effect;
        $.fn.effect = function (effectName) {
            if (effectName === "shake") {
                var old = $.effects.createWrapper;
                $.effects.createWrapper = function (element) {
                    var result;
                    var oldCSS = $.fn.css;

                    $.fn.css = function (size) {
                        var _element = this;
                        var hasOwn = Object.prototype.hasOwnProperty;
                        return _element === element && hasOwn.call(size, "width") && hasOwn.call(size, "height") && _element || oldCSS.apply(this, arguments);
                    };

                    result = old.apply(this, arguments);

                    $.fn.css = oldCSS;
                    return result;
                };
            }
            return oldEffect.apply(this, arguments);
        };
    })();
}


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
				form.find("#password").val("");
			}
		});
	});
});