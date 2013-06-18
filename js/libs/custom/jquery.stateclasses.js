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
			events: ["normal"],
			type: "swap",
			classname: ""
		},
		active: {
			events: ["active"],
			type: "swap",
			classname: "active"
		},
		hover: {
			events: ["mouseenter", "mouseleave"],
			type: "toggle",
			classname: "hover"
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
		this.settings.delegate = (this._data && this._data.delegate) ? this._data.delegate : false;
		this.settings.inactiveList = $.map( this.settings.states, function( v, k ) { return (k !== "active") ? v : null; } ).join(" ");
		this.init();
	}
	Plugin.prototype = {

		init: function () {
			this.bindStateEvents();
			// console.log(this.settings);
		}, // init

		justStates: function ( oIn ) {
			var oOut = $.extend({}, oIn);
			if (oOut && oOut.delegate) { delete oOut.delegate; }
			return oOut;
		}, // justStates

		genEventNames: function ( stateName ) {
			var eNames = false,
			    plugin = this;
			if ( plugin.settings[stateName] && plugin.settings[stateName].events ) {
				eNames = $.map( plugin.settings[stateName].events, function( v, k, s ) { return plugin.genEventNamespace( v, s ); }).join(" ");
			}
			return eNames;
		}, // genEventNames

		genEventNamespace: function ( eventName, stateName ) {
			var eNamespace = eventName + '.' + stateName + '.' + this._name;
			if ( this.settings.delegate ) {
				eNamespace = eNamespace + '.' + this.settings.delegate.replace(/[^a-z0-9-]/gi, "");
			}
			return eNamespace;
		}, // getNamespace

		isActiveNow: function ( $el ) {
			return $el.hasClass( this.settings.states.active );
		}, // isActiveNow

		bindStateEvents: function () {
			var plugin = this,
			    statefulEl = plugin.settings.delegate || plugin.settings.selector,
			    statefulEvents;
			if ( !plugin.$el.data( plugin._name ) ) {
				$.each(plugin.settings.states, function( stateName, stateClassName ) {
					statefulEvents = plugin.genEventNames( stateName );
					if ( statefulEvents ) {
						if ( plugin.settings.delegate ) {
							$(document).off(statefulEvents).on(
								statefulEvents,
								statefulEl,
								{ plugin: plugin, stateName: stateName, stateClassName: stateClassName },
								plugin.toggleClasses
							); // on
						} // if delegate
						else {
							plugin.$el.off(statefulEvents).unbind(statefulEvents).bind(
								statefulEvents,
								{ plugin: plugin, stateName: stateName, stateClassName: stateClassName },
								plugin.toggleClasses
							); // bind
						} // else !delegate
					} // if statefulEvents
				}); // each plugin.settings.states
			} // if $el not already stated
		}, // bindStateEvents

		toggleClasses: function( e ) {
			e.stopPropagation();
			var plugin = e.data.plugin,
			    $this = $(this),
			    isActiveNow = plugin.isActiveNow( $this );
			// If not currently active, or setting to normal
			if ( !isActiveNow || e.data.stateName == "normal" ) {
				if ( e.data.stateName == "normal" ) {
					$this.removeClass( plugin.settings.states.active );
				}
				else {
					if( e.type == "mouseenter" ) { $this.addClass( e.data.stateClassName ); }
					else if( e.type == "mouseleave" ) { $this.removeClass( e.data.stateClassName ); }
					else {
						$this.toggleClass( e.data.stateClassName );
						if ( e.data.stateName == "active" ) {
							$this.removeClass( plugin.settings.inactiveList );
						}
					}
				}
			}
		} // toggleClasses

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
