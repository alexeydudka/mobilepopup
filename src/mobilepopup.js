/*
    ver 1.4
    $.mobilepopup jQuery plugin
    2017 Alexey Dudka
*/

(function($) {

	var defaults = {   
        ajax: '',
        html: '',
        targetblock: '',

        width: '',
        height: '',

        closehtml: '<a href="" class="button-close close"></a>',
        loadinghtml: '<div class="loader-wrap"><div class="loader"><span></span><span></span><span></span></div></div>',
        customclass: '',

        onloaded : function(el){
            return true;
        },
        onclosed : function(el){
            return true;
        },
        onformsubmited : function(data,el){ 
            return true;
        }
    }; 

    var options = defaults,
    	popupblock_class = "mobilepopup",
    	popupoverflow_class = "mobilepopup-overflow",
        popupouter_class = "mobilepopup-outer",
    	popupinner_class = "mobilepopup-inner",
    	currenttopposition = 0,
        _window = $(window);
    	popupblock = popupoverflow = popupouter = popupinner = "";

	var methods = {
	    init : function(args) { 
            var opt = {};
	    	options = $.extend(opt, defaults, args);
	    	currenttopposition = $("body").scrollTop();
	      	append_html_to_body();
            set_popup_outer_sizes();
	    	get_popup_content();
	    	popupblock.addClass("open");
	    	$("body").addClass("mobilepopup-opened");
	    	if($(document).width()<=767){ $("body").scrollTop(0); }
	    },
	    reload: function(args) {
            options = $.extend(options, args);
            popupblock.attr("class",popupblock_class+" "+options.customclass+" open loading");
            set_popup_outer_sizes();
	    	get_popup_content();
	    },
        resize: function(args) {
            options = $.extend(options, args);
            set_popup_outer_sizes();
        },
	    close : function( ) {
	    	popupblock.removeClass("open");
	    	$("body").removeClass("mobilepopup-opened");
	    	if($(document).width()<=767){ $("body").scrollTop(currenttopposition); }
    		popupinner.html("");
            options.onclosed(popupblock);
	    }
	};

	var append_html_to_body = function(){
    	if($("."+popupblock_class).length==0){
    		$("body").append("<div class='"+popupblock_class+" "+options.customclass+" disabled-animation-in-child loading'><div class='"+popupoverflow_class+"'></div><div class='"+popupouter_class+"'><div class='"+popupinner_class+"'></div>"+options.closehtml+options.loadinghtml+"</div></div>");
    		popupblock = $("."+popupblock_class);
		    popupoverflow = $("."+popupoverflow_class);
            popupinner = $("."+popupinner_class);
		    popupouter = $("."+popupouter_class);
            init_actions();
    	}
    }

    var set_popup_outer_sizes = function(){
        var sizes = "";
        if($.trim(options.width)!=""){
            sizes += "width:"+options.width+";";
        }
        if($.trim(options.height)!=""){
            sizes += "height:"+options.height+";";
        }
        popupouter.attr("style",sizes);
        set_poppup_max_sizes();
    }

    var get_popup_content = function(){
    	if($.trim(options.ajax)!=""){
	    	$.post(options.ajax,function(data){
	    		popupinner.html(data);
                popupblock.removeClass("loading");
                options.onloaded(popupblock);
	    	});
    	}
    	if($.trim(options.html)!=""||$.trim(options.targetblock)!=""){
		    popupinner.html($.trim(options.html)!="" ? options.html : $(options.targetblock).find(">*").clone());
            popupblock.removeClass("loading");
            options.onloaded(popupblock);
    	}
    }

    var set_poppup_max_sizes = function(){
        popupouter.css({"max-width":_window.innerWidth()+"px","max-height":_window.innerHeight()+"px"});
    }

    var init_actions = function(){
    	popupoverflow.on("click",function(){
			methods.close();
    		return false;
    	});
    	popupblock.on("click",".close",function(){
    		methods.close();
    		return false;
    	});
        popupblock.on("click",".submit-popup-form",function(){
            var form = popupblock.find(".popup-form");
            popupblock.addClass("loading");
            $.post(form.attr("action")+"?"+form.serialize(),function(data){
                options.onformsubmited(data,popupblock);
                popupblock.removeClass("loading");
            });
            return false;
        });
        _window.on('orientationchange resize', function() {
            set_poppup_max_sizes();
        });
    }

	$.mobilepopup = function(method, options){
		if ( methods[method] ) {
      		return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
    	} else if ( typeof method === 'object' || ! method ) {
      		return methods.init.apply( this, arguments );
    	} else {
      		$.error( 'Method ' +  method + ' not found for mobilepopup' );
    	} 
	}
})(jQuery);