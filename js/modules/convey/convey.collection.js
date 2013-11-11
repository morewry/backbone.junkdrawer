define(
	[
		'modules/convey/convey.model',
		'backbone'
		//,'backbone.localstorage'
	],
	function ( conveyModel ) {

		/**
		 *
		 *
		 *
		 *
		**/
		var ConveyCollection = Backbone.Collection.extend({

			// Backbone.LocalStorage: Save to a localStorage database
			// localStorage: new Backbone.LocalStorage("uniquename"),

			// Backbone: Reference to reference collection location on server.
			// url: "",

			// Backbone: Specify the model class that the collection contains.
			model: conveyModel

			// Backbone: Will be invoked when the collection is created.
			// initialize: function () {}, // initialize

			// Backbone: Called whenever a collection is fetched from server.
			// parse: function (response) {} // parse

		}); // ConveyCollection

		return ConveyCollection;

	} // fn
); // define
