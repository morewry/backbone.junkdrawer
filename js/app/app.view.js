define(
	[
		'modules/convey/convey.view',
		'app/app.model',
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
			// move to jquery plugin (?)
			events: {
				'click [data-js="convey-show-msg"]': 'openMsg',
				'click [data-js="convey-show-dialog"]': 'openDialog',
				'click [data-js="convey-show-custom"]': 'openCustom'
			},

			/**
			 *
			 * Display a message (using convey)
			 *
			 *
			**/
			// move to jquery plugin (?)
			openMsg: function(e) {
				var $target = $(e.currentTarget),
				tConfig = $target.data('js').split("-");
				App.Event.trigger(
					'setup.conveyor',
					{
						options: {
							origin: this,
							position: {
								my: 'left top',
								at: 'right bottom',
								of: $target
							}
						}, // options
						model: {
							cvid: tConfig[2],
							message: 'This is a simple message I can place anywhere and skin anyhow'
						} // model
					} // e
				); // trigger('setup.conveyor')
			}, // openMsg

			/**
			 *
			 * Display a dialog (using convey)
			 *
			 *
			**/
			// move to jquery plugin (?)
			openDialog: function(e) {
				var tConfig = $(e.currentTarget).data('js').split("-");
				App.Event.trigger(
					'setup.conveyor',
					{
						options: {
							template: 'modal'
						}, // options
						model: {
							cvid: tConfig[2],
							title: 'Modal Dialog Title',
							message: 'A modal dialog I can place anywhere and skin anyhow with css or with different templates'
						} // model
					} // e
				); // trigger('setup.conveyor')
			}, // openDialog

			/**
			 *
			 * Display a custom modal (using convey)
			 *
			 *
			**/
			// move to jquery plugin (?)
			openCustom: function(e) {
				var tConfig = $(e.currentTarget).data('js').split("-");
				App.Event.trigger(
					'setup.conveyor',
					{
						options: {
							origin: App.Layout.Use().getView({template: 'site'}).getView({template: 'site-head'}),
							template: 'examplecustom'
						}, // options
						model: {
							cvid: tConfig[2]
						} // model
					} // e
				); // trigger('setup.conveyor')
			}, // openCustom

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
