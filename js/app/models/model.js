define(
	[
		'backbone'
		//,'backbone.localstorage'
	],
	function(){

		App.Example = App.Example || {};

		/**
		 *
		 *
		 *
		 *
		**/
		App.Example.Model = Backbone.Model.extend({

			// Backbone.LocalStorage: Save to a localStorage database
			// localStorage: new Backbone.LocalStorage("uniquename"),

			// Backbone: Specify for models w/out collections.
			// urlRoot: '',

			// Backbone: Hash (or fn that returns one) of default attrs for model.
			defaults: {
				example: 'World',
				count: 0
			} // defaults

			// Backbone: Will be invoked when the model is created.
			// initialize: function(){} // initialize

		}); // App.Example.Model

		return App.Example.Model;

	} // fn
); // define