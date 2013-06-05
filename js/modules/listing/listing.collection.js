define(
	[
		'model/listing',
		'backbone'
		//,'backbone.localstorage'
	],
	function(){

		App.Listing = App.Listing || {};

		/**
		 *
		 *
		 *
		 *
		**/
		App.Listing.Collection = Backbone.Collection.extend({

			// Backbone.LocalStorage: Save to a localStorage database
			// localStorage: new Backbone.LocalStorage("uniquename"),

			// Backbone: Reference to reference collection location on server.
			url: "/js/fake.json",

			// Backbone: Specify the model class that the collection contains.
			model: App.Listing.Model,

			// Backbone: Will be invoked when the collection is created.
			initialize: function(){}, // initialize

			// Backbone: Called whenever a collection is fetched from server.
			parse: function(response){} // parse

		}); // App.Listing.Collection

		return App.Listing.Collection;

	} // fn
); // define
