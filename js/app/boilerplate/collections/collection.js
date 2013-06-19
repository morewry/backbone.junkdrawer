define(
	[
		'app/boilerplate/models/model',
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
		App.Example.Collection = Backbone.Collection.extend({

			// Backbone.LocalStorage: Save to a localStorage database
			// localStorage: new Backbone.LocalStorage("uniquename"),

			// Backbone: Reference to reference collection location on server.
			url: '',

			// Backbone: Specify the model class that the collection contains.
			model: App.Example.Model

			// Backbone: Will be invoked when the collection is created.
			// initialize: function(){}, // initialize

			// Backbone: Called whenever a collection is fetched from server.
			// parse: function( response ){} // parse

		}); // App.Example.Collection

		return App.Example.Collection;

	} // fn
); // define
