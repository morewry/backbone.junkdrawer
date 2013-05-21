define(
	[
		'backbone'
		//,'backbone.localstorage'
	],
	function(){

		App.Model.Main = Backbone.Model.extend({

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

		}); // App.Model.Main

		return App.Model.Main;

	} // fn
); // define
