define(
	[
		'backbone'
		//,'backbone.localstorage'
	],
	function(){

		App.Collection.Main = Backbone.Collection.extend({

			// Backbone.LocalStorage: Save to a localStorage database
			// localStorage: new Backbone.LocalStorage("uniquename"),

			// Backbone: Reference to reference collection location on server.
			url: "",

			// Backbone: Specify the model class that the collection contains.
			model: ,

			// Backbone: Will be invoked when the collection is created.
			initialize: function(){}, // initialize

			// Backbone: Called whenever a collection is fetched from server.
			parse: function(response){} // parse

		}); // App.Collection.Main

		return App.Collection.Main;

	} // fn
); // define
