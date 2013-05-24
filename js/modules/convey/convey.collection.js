define(
	[
		'module/convey/convey.model',
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
		App.Convey.Collection = Backbone.Collection.extend({

			// Backbone.LocalStorage: Save to a localStorage database
			// localStorage: new Backbone.LocalStorage("uniquename"),

			// Backbone: Reference to reference collection location on server.
			// url: "",

			// Backbone: Specify the model class that the collection contains.
			model: App.Convey.Model

			// Backbone: Will be invoked when the collection is created.
			// initialize: function(){}, // initialize

			// Backbone: Called whenever a collection is fetched from server.
			// parse: function(response){} // parse

		}); // App.Convey.Collection

		return App.Convey.Collection;

	} // fn
); // define
