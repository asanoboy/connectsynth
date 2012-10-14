(function($){

	var showModalWindow = function(html, width, height){
		var windowWidth = $(window).width(),
			windowHeight = $(window).height(),
			documentHeight = $(document).height(),
			scrollTop = $(window).scrollTop(),
			$background = $("<div>").css({
					width: windowWidth,
					height: $(document).height(),
					opacity: 0.5,
					position: "absolute",
					backgroundColor: "#999",
					top: 0,
					zIndex: 100
				})
				.appendTo($("body")),
			$close = $("<a>").html('x').attr("href", "#")
				.click(function(){$background.remove(); $window.remove(); return false;})
				.css({
					"float": "right"
				}),
			$header = $("<div>").css({
					width: width,
					height: 50,
					position: "relative"
				})
				.append($close),
			$body = $("<div>").html(html)
				.css({
					width: width,
					height: height-50,
					position: "relative"
				}),
			$window = $("<div>").css({
					width: width,
					height: height,
					top: (windowHeight - height)/2 + scrollTop,
					left: (windowWidth - width)/2,
					position: "absolute",
					backgroundColor: "#FFF",
					zIndex: 101
				})
				.append($header)
				.append($body)
				.appendTo($("body"))
			;
			
	}
	
	$.fn.bindModalWindow = function(){
		
		return this.click(function(e){
			var $this = $(this);
			$.ajax($this.attr("href"))
				.success(function(rt){
					showModalWindow(rt, 400, 500);
				})
				.fail(function(){
					alert("System error occurred");
				});
				
			return false;
		});
	}
	
	$.fn.delegateAjaxFormButtonClick = function(selector, formSelector, opt){
		return this.delegate(selector, "click", function(e){
			var $this = $(this),
			$form = $this.parent(formSelector);
			
			var successHandler = opt.success || function(){},
				errorHandler = opt.error || function(){},
				dataType = opt.dataType || false;
			
			console.log('a');
			console.log($form.serializeArray());
			console.log('b');
			
			$.ajax(
				$form.attr("action"), 
				{
					data: $form.serialize(),
					type: $form.attr("method") || "get",
					dataType: dataType
				}
			)
			.success(successHandler)
			.fail(errorHandler)
			;
			
		});
	}
	
	// Attach ajax action to form element including input.button element.
	
	
})(jQuery);
