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
		toggleGroupSelector: "[data-toggles]",
		targetSelector: '[data-id="{{target}}"]',
		states: {
			"active": "active"
		}
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
			$(document).off("click.toggleActive").on("click.toggleActive", this.settings.toggleSelector, this, this.toggleActive );
		}, // init

		toggleActive: function (e) {
			var plugin = e.data,
			    $this = $(this),
			    $group = $this.parents(plugin.settings.toggleGroupSelector),
			    $all = $group.find(plugin.settings.toggleSelector),
			    $sibs = $all.not($this),
			    stateClass = function($this) {
			    	return $this.data("states") || $group.data("states") || plugin.settings.states;
			    };

			$this.data("tog", true);
			$sibs.data("tog", false);

			$.each($all, function(i) {
				var $this = $(this),
				    $target = $(plugin.settings.targetSelector.replace("{{target}}", $this.data("target")));

				if( !!$this.data("tog") ) {
					$this.trigger("active");
					$target.removeClass("hide");
				}
				else {
					$this.trigger("normal");
					$target.addClass("hide");
				}
			}); // each $all
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
