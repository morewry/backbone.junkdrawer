define(
	[
		'app/app',
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
		var AppModel = Backbone.Model.extend({

			// Backbone.LocalStorage: Save to a localStorage database
			// localStorage: new Backbone.LocalStorage("uniquename"),

			// Backbone: Specify for models w/out collections.
			urlRoot: '/js/app/app.config.json',

			// Backbone: Hash (or fn that returns one) of default attrs for model.
			defaults: {
				sid: 0,
				site: true, // boolean
				siteMenu: false, // boolean
					navMain: false, // object {items: [{link, href}]}
				siteHead: false, // boolean
					siteMedia: false, // string, html
					siteLogo: false, // boolean
					siteTitle: false, // string, simple or html
					siteSubTitle: false, // string, simple or html
				siteBody: false, // boolean
				siteFoot: false, // boolean
					siteDisclaimer: false, // string, simple or html
					navFoot: false // object {items: [{link, href}]}
			}, // defaults

			// Backbone: Will be invoked when the model is created.
			initialize: function(){
				this.deferred = this.fetch({
					success: function ( model, response, options ) {
						App.Log("App Model Fetched Successfully");
					} // success
				}); // fetch
			} // initialize

		}); // AppModel

		return AppModel;

	} // fn
); // define
