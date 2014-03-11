(function($) {
	var properties = [
		"name",
		"iteration-count",
		"duration",
		"timing-function",
		"delay",
		"direction"
	], defaults = {
		"name" : "fade",
		"iteration-count" : 1,
		"duration" : "3s",
		"timing-function" : "ease",
		"delay" : 0,
		"direction" : "alternate"
	};

	function MessageDialog($el) {
		function durationToMillis(value) {
			var idx1 = value.indexOf("ms"),
				idx2 = value.indexOf("s");
			if (idx1 != -1) {
				value = value.substring(0, value.length - 2);
				return parseInt(value);
			} else if (idx2 != -1) {
				value = value.substring(0, value.length - 1);
			}
			return parseInt(value) * 1000;

		}
	    function show(msg, options) {
	    	var params = {};
	    	if (!options) {
	    		options = {};
	    	}
	    	for (var i=0; i<properties.length; i++) {
	    		var name = properties[i],
	    			value = null;
	    		if (options[name]) {
	    			value = options[name];
	    		} else if (initials[name]) {
	    			value = initials[name];
	    		} else {
	    			value = defaults[name];
	    		}
	    		params["animation-" + name] = value;
	    		params["-webkit-animation-" + name] = value;
	    	}
    		if (msg) {
    			$el.find(".message").text(msg);
	    	}
console.log(JSON.stringify(params));
    		$el.css(params);
    		$el.show();
    		setTimeout(function() {
    			$el.hide();
	        }, durationToMillis(params["animation-duration"]));
    	}
    	var initials = {};
    	for (var i=0; i<properties.length; i++) {
    		var name = properties[i],
    			value = $el.css("animation-" + name);
    		if (value) {
    			initials[name] = value;
    		}
    	}
	    $.extend(this, {
    	  "show" : show
    	})
    }

    $.fn.animateDialog = function(msg, options) {
    	if (this.length == 0) {
    		return;
    	}
    	if (typeof(msg) === "object") {
    		options = msg;
    		msg = null;
    	}
    	var dlg = $.data(this[0], "animateDialog");
    	if (!dlg) {
    		dlg = new MessageDialog(this);
    		$.data(this[0], "animateDialog", dlg);
    	}
    	dlg.show(msg, options);
    }
})(jQuery);