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
		normal: {
			events: ["normal"]
		},
		active: {
			events: ["active"]
		},
		hover: {
			events: ["mouseenter", "mouseleave", "focus", "blur"],
			on: ["mouseenter", "focus", "focusin"],
			off: ["mouseleave", "blur", "focusout"]
		},
		states: {
			normal: "",
			active: "active",
			hover: "hover"
		}
	};
	function Plugin ( el, options ) {
		this.el = el;
		this.$el = $(el);
		this._defaults = defaults;
		this._name = pluginName;
		this._data = (this.$el.data('states')) ? $.parseJSON('{"' + this.$el.data('states').replace(/( )?[:,]( )?/gi, function(m) { return '"' + m + '"'; }) + '"}') : false;
		this.settings = $.extend( {}, defaults, options );
		this.settings.states = $.extend( {}, this.settings.states, this.justStates(this._data) ) || this.settings.states;
		this.settings.delegate = (this._data && this._data.to) ? this._data.to : false;
		this.settings.inactiveList = $.map( this.settings.states, function( v, k ) { return (k !== "active") ? v : null; } ).join(" ");
		this.init();
	}
	Plugin.prototype = {

		init: function () {
			this.bindStateEvents();
			// console.log(this.settings);
		}, // init

		// Create a copy of html data- config that removes opts "id" and "to"
		justStates: function ( oIn ) {
			var oOut = $.extend({}, oIn);
			if (oOut && oOut.to) { delete oOut.to; } // optional config property from html
			if (oOut && oOut.id) { delete oOut.id; } // optional config property from html
			return oOut;
		}, // justStates

		// Generate a space separated list of events with namespace
		genEventNames: function ( stateName ) {
			var plugin = this
			    eventNames = [];
			// For each state
			$.each(plugin.settings.states, function( stateName ){
				// If there is an events configuration, gen namespace using those events
				if ( plugin.settings[stateName] && plugin.settings[stateName].events ) {
					eventNames[eventNames.length] = $.map( plugin.settings[stateName].events, function( v, k, s ) { return plugin.genEventNamespace( v, s ); }).join(" ");
				}
				// Otherwise gen namespacae using state name
				else {
					eventNames[eventNames.length] = plugin.genEventNamespace( false, stateName );
				}
			}); // each plugin.settings.states
			return eventNames.join(" ") || false;
		}, // genEventNames

		// Generate the namespace for an event
		genEventNamespace: function ( eventName, stateName ) {
			// ex: normal.stateClasses
			var eventNamespace = stateName + '.' + this._name;
			// If this state is triggered by other events
			if ( eventName ) {
				// ex: mouseleave.hover.stateClasses
				eventNamespace = eventName + '.' + eventNamespace;
			}
			// If this state's event is delegated from elsewhere
			if ( this.settings.delegate ) {
				// ex: active.stateClasses.data-tog
				eventNamespace = eventNamespace + '.' + this.settings.delegate.replace(/[^a-z0-9-]/gi, "");
			}
			return eventNamespace;
		}, // getNamespace

		// Check if $el is currently active
		isActiveNow: function ( $el ) {
			return $el.hasClass( this.settings.states.active );
		}, // isActiveNow

		// Get classname from triggered event
		getClassName: function ( event ) {
			// todo better getClassname logic for arbitrary unkown events
			return this.settings.states[event.type];
		}, // getClassName

		// Bind events to stateful el using on if possible, bind if not
		bindStateEvents: function () {
			var plugin = this,
			    statefulEl = plugin.settings.delegate || plugin.settings.selector,
			    statefulEvents = plugin.genEventNames( plugin.settings.states );
			// If $el not stateful and has statefulEvents to bind
			if ( !plugin.$el.data( plugin._name ) && statefulEvents ) {
				if ( plugin.settings.delegate ) {
					$(document).off(statefulEvents).on(
						statefulEvents,
						statefulEl,
						{ plugin: plugin },
						plugin.updateClasses
					); // on
				} // if delegate
				else {
					plugin.$el.off(statefulEvents).unbind(statefulEvents).bind(
						statefulEvents,
						{ plugin: plugin },
						plugin.updateClasses
					); // bind
				} // else !delegate
			} // if !plugin.$el.data( plugin._name ) && statefulEvents
		}, // bindStateEvents

		// Event superhandler that swaps state class names as appropriate
		updateClasses: function( event ) {
			event.stopPropagation();
			var plugin = event.data.plugin,
			    $this = $(this),
			    isActiveNow = plugin.isActiveNow( $this );
			// If not currently active, or setting to normal
			if ( !isActiveNow || event.type == "normal" ) {
				// If setting to normal, swap out active class
				if ( event.type == "normal" ) {
					$this
					.removeClass( plugin.settings.states.active )
					.addClass( plugin.settings.states.normal );
				} // event.type == "normal"
				else {
					// If on event (ex mouseenter, focus), add hover class
					if( plugin.settings.hover.on.indexOf(event.type) > -1 ) { $this.addClass( plugin.settings.states.hover ); }
					// If off event (ex mouseleave, blur), remove hover class
					else if( plugin.settings.hover.off.indexOf(event.type) > -1 ) { $this.removeClass( plugin.settings.states.hover ); }
					// If any other event, toggle its configured class
					else {
						$this.toggleClass( plugin.settings.states[event.type] || '' );
						// If setting to active, also remove all other state classes
						if ( event.type == "active" ) {
							$this.removeClass( plugin.settings.inactiveList );
						} // event.type == "active"
					} // event.type !== "mouseenter" || "mouseleave"
				} // event.type !== "normal"
			} // !isActiveNow || event.type == "normal"
		} // updateClasses

	}; // prototype
	$.fn[ pluginName ] = function ( options ) {
		var instance, returns, options = options || {};
		returns = this.each(function () {
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
