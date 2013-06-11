/*
 *
 * jQuery stateClasses
 * Yoel Morales, Rachael L Moore
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

	var pluginName = "stateClasses",
	defaults = {
		selector: "[data-states]",
		states: {
			active: "active",
			hover: "hover",
			normal: ""
		},
		hoverEvents: ["mouseenter", "mouseleave"]
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
			var statesTemp = '{' + this.$el.data('states').replace(/[']/gi, '"') + '}',
			    statesConfig = $.parseJSON(statesTemp);
			if ( statesConfig ) { $.extend( this.settings.states, statesConfig ); }
			this.setEventNamespace();
			this.bindAllEvents();
		}, // init

		getEventFullname: function ( eventName ) {
			eventName = eventName || 'eventname';
			return eventName + '.' + this.getEventNamespace();
		}, // getEventFullname

		setEventNamespace: function () {
			var eventNamespace,
			    delegateTo = this.settings.states.delegateTo;
			if ( delegateTo ) {
				eventNamespace = this._name + '.' + delegateTo.replace(/[^a-z0-9-]/gi, '');
			}
			else {
				eventNamespace = this._name;
			}
			this.settings.eventNamespace = eventNamespace;
		}, // setEventNamespace

		getEventNamespace: function () {
			return this.settings.eventNamespace;
		}, // getEventNamespace

		getPreviousState: function () {
			var statesConfig = this.settings.states;
			return (this.isStateActive) ? statesConfig.active : statesConfig.normal;
		}, // getPreviousState

		isStateActive: function () {
			var statesConfig = this.settings.states;
			return this.$el.hasClass(statesConfig.active);
		}, // isStateActive

		bindHoverEvents: function ( statefulEl ) {
			var plugin = this;
			$.each(plugin.settings.hoverEvents, function( i, curEventName ) {
				plugin.bindOtherEvents( statefulEl, curEventName, plugin.settings.states.hover)
			}); // each this.settings.hoverEvents
		}, // bindHoverEvents

		bindOtherEvents: function ( statefulEl, stateName, stateClass ) {
			var plugin = this,
			    eventFullname = plugin.getEventFullname(stateName);
			$(document).off(eventFullname).on(eventFullname, statefulEl, function() {
				var $this = $(this),
				    previousState = plugin.getPreviousState();
				$this.toggleClass(stateClass);
				if ( !plugin.isStateActive ) {
					$this.toggleClass(previousState);
				}
			}); // on eventFullname
		}, // bindOtherEvents

		bindAllEvents: function () {
			var plugin = this,
			    delegateTo = plugin.settings.states.delegateTo,
			    statefulEl = (delegateTo) ? delegateTo : plugin.$el.selector;
			$.each(plugin.settings.states, function( stateName, stateClass ) {
				if ( stateName == "hover") {
					plugin.bindHoverEvents( statefulEl );
				}
				else {
					plugin.bindOtherEvents( statefulEl, stateName, stateClass );
				}
			}); // each statesConfig
		} // bindEvents
	}; // prototype

	$.fn[ pluginName ] = function ( options ) {
		var instance, returns, options = options || {};
		returns = this.each(function () {
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
