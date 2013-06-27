define(
	[
		'backbone'
		//,'backbone.localstorage'
	],
	function(){

		/**
		 *
		 *
		 *
		 *
		**/
		var ConveyModel = Backbone.Model.extend({

			// Backbone.LocalStorage: Save to a localStorage database
			// localStorage: new Backbone.LocalStorage("uniquename"),

			// Backbone: Specify for models w/out collections.
			// urlRoot: '',

			// Backbone: Hash (or fn that returns one) of default attrs for model.
			defaults: {
				cvid: 'none',
				title: null,
				message: null
			} // defaults

			// Backbone: Will be invoked when the model is created.
			// initialize: function(){} // initialize

		}); // ConveyModel

		return ConveyModel;

	} // fn
); // define
