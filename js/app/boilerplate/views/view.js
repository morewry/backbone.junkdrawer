define(
	[
		'backbone',
		'backbone.layoutmanager',
		'backbone.syphon'
	],
	function(){

		App.Example = App.Example || {};

		/**
		 *
		 *
		 *
		 *
		**/
		App.Example.View = Backbone.View.extend({

			// Backbone: Hash (or fn that returns one) of delegated events.
			events: {
				'submit': 'update'
			},

			// Backbone.Layout: Specify a template for the view.
			template: 'template',

			// Backbone.Layout: Declare nested subviews.
			// views: { },

			// Backbone.Layout: Provide data to Layout Manager render.
			// serialize: function() { },

			// Backbone: Called when view first created. Access this.options.
			// initialize: function() { this.render().view.$el.prependTo('body'); }
			initialize: Backbone.Layout.prototype.options.initialize,

			update: function( e ) {
				this.model.set(Backbone.Syphon.serialize(this.$el.find('form')[0]));
			}

		}); // App.Example.View

		return App.Example.View;

	} // fn
); // define
