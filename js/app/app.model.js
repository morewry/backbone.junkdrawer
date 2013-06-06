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
			// urlRoot: '',

			// Backbone: Hash (or fn that returns one) of default attrs for model.
			defaults: {
				sid: 0,
				site: true,
				siteMenu: true,
				siteHead: true,
				siteMedia: false,
				siteLogo: true,
				siteTitle: "Test site title",
				siteSubTitle: "Test site subtitle",
				siteFoot: true,
				siteDisclaimer: "Test site disclaimer",
				siteBody: true,
				navMain: {
					items: [
						{
							link: "Properties",
							href: "real-estate"
						},
						{
							link: "Buyers",
							href: "buyers"
						},
						{
							link: "Sellers",
							href: "sellers"
						},
						{
							link: "About",
							href: "about"
						},
						{
							link: "Contact",
							href: "contact"
						}
					],
				},
				navFoot: false
			} // defaults

			// Backbone: Will be invoked when the model is created.
			// initialize: function(){} // initialize

		}); // App.Layout.Model

		return App.Layout.Model;

	} // fn
); // define
