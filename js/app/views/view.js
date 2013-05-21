define(
	[
		'backbone',
		'backbone.layoutmanager',
		'backbone.syphon'
	],
	function(){

		App.View.Main = Backbone.View.extend({

			// Backbone: Hash (or fn that returns one) of delegated events.
			events: {
				'submit': 'updateCount'
			},

			// Backbone.Layout: Specify a template for the view.
			template: 'template',

			// Backbone.Layout: Declare nested subviews.
			// views: { },

			// Backbone.Layout: Provide the correct data to Layout Manager render.
			serialize: function() { return _.clone(this.model.attributes); },

			// Backbone: Called when view first created. Access this.options.
			initialize: function() {
				this.render().view.$el.prependTo('body');
				this.model.on('change', this.render, this);
			},

			// Backbone: Render template from model data & update this.el.
			// Backbone.Layout: Overrides render throughout
			// render: function() { }

			updateCount: function(e) {
				this.model.set(Backbone.Syphon.serialize(this.$el.find('form')[0]));
			}

		}); // App.View.Main

		return App.View.Main;

	} // fn
); // define
