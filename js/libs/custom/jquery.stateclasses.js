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
			var statesConfig = this.$el.data('states');
			if( statesConfig ) { $.extend( this.settings.states, statesConfig ); }
			this.setEventNamespace();
			this.bindAllEvents();
			// $(this.settings.selector).each(function( i, el ) { });
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
			return (this.$el.hasClass(statesConfig.active)) ? statesConfig.active : statesConfig.normal;
		}, // getPreviousState

		bindHoverEvents: function ( $statefulEl ) {
			$.each(this.settings.hoverEvents, function( i, curEvent ) {
				var eventFullname = this.getEventFullname(curEvent);
				$statefulEl.unbind(eventFullname).bind(eventFullname, function() {
					this.$el.toggleClass(this.getPreviousState()).toggleClass(this.settings.states.hover);
				}); // bind eventFullname
			}); // each this.settings.hoverEvents
		}, // bindHoverEvents

		bindAllEvents: function () {
			var $statefulEl = $(this.settings.states.delegateTo) || this.$el;
			$.each(this.settings.states, function( curState, stateClass ) {
				this.$el.removeClass(stateClass);
				switch( curState ){
					case "hover":
						this.bindHoverEvents( $statefulEl );
					break;
				} // switch curState
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
