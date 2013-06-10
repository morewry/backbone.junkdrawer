/*
 *
 * jQuery toggleActive
 * Andrew Aponte, Rachael L Moore
 *
 * via jQuery Plugin Boilerplate http://jqueryboilerplate.com/
 * via UMD (Universal Module Definition) https://github.com/umdjs/umd
 *
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {

	var pluginName = "toggleActive",
	defaults = {
		toggleSelector: "[data-tog]",
		toggleGroupSelector: "[data-toggles]"
	};

	function Plugin ( el, options ) {
		this.el = el;
		this.$el = $(el);
		this.settings = $.extend( {}, defaults, options );
		this._defaults = defaults;
		this._name = pluginName;
		this.init();
	}

	Plugin.prototype = {
		init: function () {
			$(document).on("click.toggleActive", this.settings.toggleSelector, this.toggleActive );
		}, // init
		toggleActive: function (e) {
			var $this = $(e.target),
			    $parent = function($this) {
			    	return $this.parents(this.settings.toggleGroupSelector);
			    },
			    $toggles = $parent($this).find(this.settings.toggleSelector),
			    $all = $this.add($toggles),
			    stateClass = function($this) {
			    	return $this.data("states") || $parent($this).data("states") || { "active" : "active" };
			    };

			$this.data({ tog: true });
			$toggles.data({ tog: false });

			$.each($all, function() {
				var $this = $(this),
				    $target = $('[data-id="' + $this.data("target") + '"]');
				if( $this.data("tog") ) {
					$this.addClass(stateClass($this).active);
					$target.removeClass("hide");
				}
				else {
					$this.removeClass(stateClass($this).active);
					$target.addClass("hide");
				}
			}); // each
		} // toggleActive
	}; // prototype

	$.fn[ pluginName ] = function ( options ) {
		var instance, returns, options = options || {};
		returns = this.each(function() {
			instance = $.data( this, "plugin_" + pluginName );
			if ( typeof options === 'object' && !instance ) {
				$.data( this, "plugin_" + pluginName, new Plugin( this, options ) );
			}
			if ( instance instanceof Plugin && typeof instance[options] === 'function' ) {
				returns = instance[options].apply( instance, Array.prototype.slice.call( arguments, 1 ) );
			}
		});
		return returns;
	}; // $.fn

}));
