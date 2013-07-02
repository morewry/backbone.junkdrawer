define(
	[
		'app/app',
		'backbone',
		'backbone.layoutmanager',
		'backbone.syphon'
	],
	function () {

		/**
		 *
		 *
		 *
		 *
		**/
		var ExampleView = Backbone.View.extend({

			// Backbone: Hash (or fn that returns one) of delegated events.
			events: {
				'submit': 'update'
			},

			// Backbone.Layout: Specify a template for the view.
			template: 'template',

			// Backbone.Layout: Declare nested subviews.
			// views: { },

			// Backbone: Called when view first created. Access this.options.
			// initialize: function () { this.render().view.$el.prependTo('body'); }
			initialize: Backbone.Layout.prototype.options.initialize,

			// Backbone.Layout: Provide data to Layout Manager render.
			// serialize: function () { },

			// Update: Example of custom method, backbone Syphon
			update: function ( e ) {
				this.model.set(Backbone.Syphon.serialize(this.$el.find('form')[0]));
				// or e.target
			}

		}); // ExampleView

		return ExampleView;

	} // fn
); // define
