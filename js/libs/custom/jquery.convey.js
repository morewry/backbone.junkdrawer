/*
 *
 * jQuery Convey
 * Requires jquery.ui.position
 * via jQuery Plugin Boilerplate
 * via UMD
 *
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], factory);
	} else {
		factory(jQuery);
	}
}(function ($) {

	var pluginName = "conveyPlugin",
	defaults = {
		// Per api.jqueryui.com/position/
		position: {
			my: 'center',
			at: 'center',
			of: 'body',
			within: 'body'
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
			// $(document).on('click', ':not([data-js*="convey-"])', this.conveyClear);
		},

		conveyShow: function() {
			return this.$el
			.position(this.settings.position)
			.removeClass('fadeout hidden').addClass('fadein');

		},

		conveyHide: function() {
			return this.$el
			.removeClass('fadein').addClass('fadeout hidden');
		},

		conveyClear: function() {
			console.log("conveyorClear");
			// this.$el.conveyPlugin('conveyHide');
		}
	};

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
	};

}));
