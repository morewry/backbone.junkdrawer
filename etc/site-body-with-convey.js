define(
	[
		'modules/convey/convey',
		'app/app',
		'backbone',
		'backbone.layoutmanager'
	],
	function( conveyView ){

		var AppView = AppView || {};

		/**
		 *
		 * Define site-body subview
		 *
		 *
		**/
		AppView.Body = Backbone.View.extend({
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
							template: 'convey/modal'
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
							origin: App.Use().getView({template: 'site'}).getView({template: 'site-head'}),
							template: 'convey/examplecustom'
						}, // options
						model: {
							cvid: tConfig[2]
						} // model
					} // e
				); // trigger('setup.conveyor')
			}, // openCustom

			// Backbone.Layout: Specify a template for the view.
			template: 'site-body',

			// Backbone: Called when view first created. Access this.options.
			initialize: Backbone.Layout.prototype.options.initialize
		}); // AppView.Body

		return AppView;

	} // fn
); // define
