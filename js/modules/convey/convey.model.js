define(
	[
		'backbone'
		//,'backbone.localstorage'
	],
	function(){

		App.Convey = App.Convey || {};

		/**
		 *
		 *
		 *
		 *
		**/
		App.Convey.Model = Backbone.Model.extend({

			// Backbone.LocalStorage: Save to a localStorage database
			// localStorage: new Backbone.LocalStorage("uniquename"),

			// Backbone: Specify for models w/out collections.
			// urlRoot: '',

			// Backbone: Hash (or fn that returns one) of default attrs for model.
			defaults: {
				// Per Backbone.Layout
				template: 'convey',
				append: true,
				// Per api.jqueryui.com/position/
				position: {
					my: 'center',
					at: 'center',
					of: App.Layout.Use().$el,
					collision: 'fit',
					within: App.Layout.Use().$el
				},
				origin: App.Layout.Use(),
				cvid: 'none',
				message: null
			} // defaults

			// Backbone: Will be invoked when the model is created.
			// initialize: function(){} // initialize

		}); // App.Convey.Model

		return App.Convey.Model;

	} // fn
); // define
