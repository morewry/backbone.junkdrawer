define(
	[
		'app/config',
		'backbone',
		'backbone.layoutmanager'
	],
	function(appConfig){

		App.View.Site = {};

		App.View.Site.Head = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'site-head',

			// Backbone.Layout: Declare nested subviews.
			// views: {}, // views

			// Backbone.Layout: Provide the correct data to Layout Manager render.
			serialize: function() {
				return _.clone(this.model.attributes);
			}, // serialize

			// Backbone: Called when view first created. Access this.options.
			initalize: function() {
				this.model.on('change', this.render, this);
			} // initalize
		}); // App.View.Site.Head

		App.View.Site.NavMain = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'nav-main',

			// Backbone.Layout: Declare nested subviews.
			// views: {}, // views

			// Backbone.Layout: Provide the correct data to Layout Manager render.
			serialize: function() {
				return _.clone(this.model.attributes);
			}, // serialize

			// Backbone: Called when view first created. Access this.options.
			initalize: function() {
				this.model.on('change', this.render, this);
			} // initalize
		}); // App.View.Site.NavMain

		App.View.Site.Menu = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'site-menu',

			// Backbone.Layout: Declare nested subviews.
			views: {
				"": [
					new App.View.Site.NavMain({
						model: new appConfig
					})
				]
			}, // views

			// Backbone.Layout: Provide the correct data to Layout Manager render.
			serialize: function() {
				return _.clone(this.model.attributes);
			}, // serialize

			// Backbone: Called when view first created. Access this.options.
			initalize: function() {
				this.model.on('change', this.render, this);
			} // initalize
		}); // App.View.Site.Menu

		App.View.Site.Body = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'site-body',

			// Backbone.Layout: Declare nested subviews.
			// views: {}, // views

			// Backbone.Layout: Provide the correct data to Layout Manager render.
			serialize: function() {
				return _.clone(this.model.attributes);
			}, // serialize

			// Backbone: Called when view first created. Access this.options.
			initalize: function() {
				this.model.on('change', this.render, this);
			} // initalize
		}); // App.View.Site.Body

		App.View.Site.NavFoot = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'nav-foot',

			// Backbone.Layout: Declare nested subviews.
			// views: {}, // views

			// Backbone.Layout: Provide the correct data to Layout Manager render.
			serialize: function() {
				return _.clone(this.model.attributes);
			}, // serialize

			// Backbone: Called when view first created. Access this.options.
			initalize: function() {
				this.model.on('change', this.render, this);
			} // initalize
		}); // App.View.Site.NavFoot

		App.View.Site.Foot = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'site-foot',

			// Backbone.Layout: Declare nested subviews.
			views: {
				"": [
					new App.View.Site.NavFoot({
						model: new appConfig
					})
				]
			}, // views

			// Backbone.Layout: Provide the correct data to Layout Manager render.
			serialize: function() {
				return _.clone(this.model.attributes);
			}, // serialize

			// Backbone: Called when view first created. Access this.options.
			initalize: function() {
				this.model.on('change', this.render, this);
			} // initalize
		}); // App.View.Site.Foot

		App.View.Site.Main = Backbone.View.extend({

			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'site',

			// Backbone.Layout: Declare nested subviews.
			views: {
				"": [
					new App.View.Site.Head({
						model: new appConfig
					}),
					new App.View.Site.Menu({
						model: new appConfig
					}),
					new App.View.Site.Body({
						model: new appConfig
					}),
					new App.View.Site.Foot({
						model: new appConfig
					})
				]
			}, // views

			// Backbone.Layout: Provide the correct data to Layout Manager render.
			serialize: function() {
				return _.clone(this.model.attributes);
			}, // serialize

			// Backbone: Called when view first created. Access this.options.
			initalize: function() {
				this.model.on('change', this.render, this);
			} // initalize

		}); // App.View.Site.Main

		return App.View.Site;

	} // fn
); // define
