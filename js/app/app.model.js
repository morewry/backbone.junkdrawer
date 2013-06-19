define(
	[
		'backbone'
		//,'backbone.localstorage'
	],
	function(){

		App.Layout = App.Layout || {};

		/**
		 *
		 *
		 *
		 *
		**/
		App.Layout.Model = Backbone.Model.extend({

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
				this.fetch({
					success: function( model, response, options ) {
						App.Log(model.attributes);
					}
				});
			} // initialize

		}); // App.Layout.Model

		return App.Layout.Model;

	} // fn
); // define
