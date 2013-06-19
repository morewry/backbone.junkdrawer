/*
 *
 * jQuery toggleActive
 * Andrew Aponte, Rachael L Moore
 *
 * via jQuery Plugin Boilerplate http://jqueryboilerplate.com/
 * via UMD (Universal Module Definition) https://github.com/umdjs/umd
 *
 * Loose dependency on jquery.stateClasses
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
		// use {{target}} token to represent a dynamic selector
		targetSelector: '[data-id="{{target}}"]',
		// default callbacks
		activeCallback: function ( event, each ) {
			// Trigger active state assumes plugin jquery.stateClasses.
			// You can pass a custom activeCallback -- or set up your own event handler.
			each.$this.trigger("active");
			// Assumes css animation, only changes class to show/hide
			// You can pass a custom activeCallback
			each.$target.removeClass("hide");
		},
		normalCallback: function( event, each ) {
			// Trigger normal state assumes plugin jquery.statecClasses.
			// You can pass a custom normalCallback -- or set up your own event handler.
			each.$this.trigger("normal");
			// Assumes css animation, only changes class to show/hide
			// You can pass a custom normalCallback
			each.$target.addClass("hide");
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
					$all: this.$el.find(this.settings.toggleSelector)
				},
				this.toggleActive
			);
		}, // init

		toggleActive: function ( event ) {
			// Refs to clicked el, its siblings
			event.data.$this = $(this);
			event.data.$sibs = event.data.$all.not(event.data.$this);
			// Set event origin toggler to true / active
			event.data.$this.data("tog", true);
			// Set sibling toggles to false / inactive
			event.data.$sibs.data("tog", false);
			// For each possible toggle
			$.each(event.data.$all, function(i) {
				// Refs to current toggle, its target
				var each = { data: {} };
				each.$this = $(this),
				each.$target = $(event.data.plugin.settings.targetSelector.replace("{{target}}", each.$this.data("target")));
				// If this toggle is currently active
				if( !!each.$this.data("tog") ) {
					// Call active callback
					event.data.plugin.settings.activeCallback( event, each );
				}
				// If this toggle IS NOT ACTIVE
				else {
					// Call normal callback
					event.data.plugin.settings.normalCallback( event, each );
				}
			}); // each event.data.$all
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
