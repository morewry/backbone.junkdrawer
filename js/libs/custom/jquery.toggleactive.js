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
		groupSelector: "[data-toggles]",
		targetSelector: '[data-id="{{target}}"]',
		states: {
			"active": "active"
		}
	};
	function Plugin ( el, options ) {
		this.el = el;
		this.$el = $(el);
		this._defaults = defaults;
		this._name = pluginName;
		this.settings = $.extend( {}, defaults, options );
		this.init();
	}
	Plugin.prototype = {

		init: function () {
			var eventName = 'click' + '.' + this._name;
			$(document).off(eventName).on(
				eventName,
				this.settings.toggleSelector,
				{
					plugin: this,
					$group: this.$el,
					$all: this.$el.find(this.settings.toggleSelector),
					classNames: function ( $this, plugin ) {
						return plugin.parseData( 'states', $this ) || plugin.parseData( 'states', $group ) || plugin.settings.states;
					}
				},
				this.toggleActive
			);
		}, // init

		parseData: function ( which, $where ) {
			return $.parseJSON('{"' + this.$el.data('states').replace(/( )?[:,]( )?/gi, function(m) { return '"' + m + '"'; }) + '"}');
		}, // parseData

		toggleActive: function (e) {
			var plugin = e.data.plugin,
			    $group = e.data.$group,
			    $all = e.data.$all,
			    $this = $(this),
			    $sibs = $all.not($this),
			    classNames = e.data.classNames( $this, plugin );
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
			instance = $.data( this, pluginName );
			if ( typeof options === 'object' && !instance ) {
				$.data( this, pluginName, new Plugin( this, options ) );
			}
			if ( instance instanceof Plugin && typeof instance[options] === 'function' ) {
				returns = instance[options].apply( instance, Array.prototype.slice.call( arguments, 1 ) );
			}
		});
		return returns;
	}; // $.fn
}));
