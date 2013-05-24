define(
	[
		'module/convey/convey.view',
		'module/layout/layout.model',
		'backbone',
		'backbone.layoutmanager'
	],
	function(conveyView, layoutModel){

		App.Layout = App.Layout || {};
		App.Layout.View = App.Layout.View || {};
		App.Model.Layout = App.Model.Layout || new layoutModel;

		/**
		 *
		 * Define site-head subview
		 *
		 *
		**/
		App.Layout.View.Head = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'site-head',

			// Backbone.Layout: Declare nested subviews.
			// views: {}, // views

			// Backbone.Layout: Provide data to Layout Manager render.
			// serialize: function() { }, // serialize

			// Backbone: Called when view first created. Access this.options.
			// initalize: function() {} // initalize

		}); // App.Layout.View.Head

		/**
		 *
		 * Define nav-main subview
		 *
		 *
		**/
		App.Layout.View.NavMain = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'nav-main',

			// Backbone.Layout: Declare nested subviews.
			// views: {}, // views

			// Backbone.Layout: Provide data to Layout Manager render.
			// serialize: function() { }, // serialize

			// Backbone: Called when view first created. Access this.options.
			// initalize: function() {} // initalize

		}); // App.Layout.View.NavMain

		/**
		 *
		 * Define site-menu subview
		 *
		 *
		**/
		App.Layout.View.Menu = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'site-menu',

			// Backbone.Layout: Declare nested subviews.
			views: {
				"": [
					new App.Layout.View.NavMain({
						model: App.Model.Layout
					})
				]
			}, // views

			// Backbone.Layout: Provide data to Layout Manager render.
			// serialize: function() { }, // serialize

			// Backbone: Called when view first created. Access this.options.
			// initalize: function() {} // initalize

		}); // App.Layout.View.Menu

		/**
		 *
		 * Define site-body subview
		 *
		 *
		**/
		App.Layout.View.Body = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			events: {
				'click [data-convey*="show-"]': 'openMessage'
			},

			openMessage: function(e) {
				App.Event.trigger(
					'setup.conveyor',
					{
						origin: this,
						cvid: $(e.currentTarget).data('convey').replace('show-', ''),
						title: 'Modal Title',
						message: 'This is a simple message I can place anywhere (as soon as I figure out why the position is failing to position) and skin anyhow with different templates',
						template: 'modal'
					}
				); // trigger('setup.conveyor')
			}, // openMessage

			// Backbone.Layout: Specify a template for the view.
			template: 'site-body',

			// Backbone.Layout: Declare nested subviews.
			// views: {}, // views

			// Backbone.Layout: Provide data to Layout Manager render.
			// serialize: function() { }, // serialize

			// Backbone: Called when view first created. Access this.options.
			// initalize: function() {} // initalize

		}); // App.Layout.View.Body

		/**
		 *
		 * Define nav-foot subview
		 *
		 *
		**/
		App.Layout.View.NavFoot = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'nav-foot',

			// Backbone.Layout: Declare nested subviews.
			// views: {}, // views

			// Backbone.Layout: Provide data to Layout Manager render.
			// serialize: function() { }, // serialize

			// Backbone: Called when view first created. Access this.options.
			// initalize: function() {} // initalize

		}); // App.Layout.View.NavFoot

		/**
		 *
		 * Define site-foot subview
		 *
		 *
		**/
		App.Layout.View.Foot = Backbone.View.extend({
			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'site-foot',

			// Backbone.Layout: Declare nested subviews.
			views: {
				"": [
					new App.Layout.View.NavFoot({
						model: App.Model.Layout
					})
				]
			}, // views

			// Backbone.Layout: Provide data to Layout Manager render.
			// serialize: function() { }, // serialize

			// Backbone: Called when view first created. Access this.options.
			//initalize: function() {} // initalize

		}); // App.Layout.View.Foot

		/**
		 *
		 * Define site view
		 *
		 *
		**/
		App.Layout.View.Main = Backbone.View.extend({

			// Backbone: Hash (or fn that returns one) of delegated events.
			// events: {},

			// Backbone.Layout: Specify a template for the view.
			template: 'site',

			// Backbone.Layout: Declare nested subviews.
			views: {
				"": [
					new App.Layout.View.Head({
						model: App.Model.Layout
					}),
					new App.Layout.View.Menu({
						model: App.Model.Layout
					}),
					new App.Layout.View.Body({
						model: App.Model.Layout
					}),
					new App.Layout.View.Foot({
						model: App.Model.Layout
					})
				]
			}, // views

			// Backbone.Layout: Provide data to Layout Manager render.
			// serialize: function() { }, // serialize

			// Backbone: Called when view first created. Access this.options.
			// initalize: function() {} // initalize

		}); // App.Layout.View.Main

		return App.Layout.View;

	} // fn
); // define
