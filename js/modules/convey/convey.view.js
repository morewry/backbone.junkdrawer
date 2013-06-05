define(
	[
		'libs/custom/jquery.convey',
		'modules/convey/convey.model',
		'modules/convey/convey.collection',
		'backbone',
		'backbone.layoutmanager'
	],
	function(){

		Backbone.$ = jQuery;
		App.Convey = App.Convey || {};

		/**
		 *
		 * Convey View
		 *
		 *
		**/
		App.Convey.View = Backbone.View.extend({

			// Backbone: Hash (or fn that returns one) of delegated events.
			// move to jquery plugin (?)
			events: function() {
				var vents = {};
				// vents['click [data-js="convey-show-' + this.model.get('cvid') + '"]'] = 'showConveyor';
				vents['click [data-js="convey-hide-' + this.model.get('cvid') + '"]'] = 'hideConveyor';
				// vents['click :not([data-js*="convey-"])'] = 'clearConveyors';
				return vents;
			},

			// Backbone: View options
			options: {
				// Per Backbone.Layout
				template: 'convey',
				append: true,
				// Per api.jqueryui.com/position/
				position: {
					my: 'center',
					at: 'center',
					of: App.Layout.Use().$el,
					within: App.Layout.Use().$el
				},
				// Should be a Backbone.Layout view or layout
				origin: App.Layout.Use()
			}, // options

			// Backbone.Layout: Specify a template for the view.
			// template: this.options.template

			// Backbone.Layout: Declare nested subviews.
			// views: {},

			// Backbone: Called when view first created. Access this.options.
			initialize: function() {
				// when ready (after setup), position and populate convey
				App.Event.on('ready.conveyor', function(cv) {
					var conveyorView = cv.options.origin.setView(cv, cv.options.append);
					App.Event.trigger('init.conveyor', this);
					conveyorView.render();
				}); // on('setup.conveyor')
			},

			// Backbone.Layout: called before view render
			// beforeRender: function() {},

			// Backbone.Layout: Called after view render
			afterRender: function() {
				App.Event.trigger('render.conveyor', this);
				this.$el.conveyPlugin({ position: this.options.position });
				this.showConveyor();
			},

			/**
			 *
			 * showConveyor
			 *
			 *
			**/
			showConveyor: function(conveyor) {
				App.Event.trigger('show.conveyor', this);
				this.$el.conveyPlugin('conveyShow');
			},

			/**
			 *
			 * hideConveyor
			 *
			 *
			**/
			hideConveyor: function(conveyor) {
				App.Event.trigger('hide.conveyor', this);
				this.$el.conveyPlugin('conveyHide');
			},

			/**
			 *
			 * clearConveyors
			 *
			 *
			**/
			clearConveyors: function() {
				App.Event.trigger('hide.conveyor', this);
				this.$el.conveyPlugin('conveyClear');
			}

		}); // App.Convey.View

		/**
		 *
		 * setup.conveyor listener
		 *
		 *
		**/
		App.Event.on('setup.conveyor', function(conveyorOpts) {
			App.Event.trigger('ready.conveyor', new App.Convey.View(
				_.extend(
					{},
					conveyorOpts.options,
					{ model: new App.Convey.Model(conveyorOpts.model) }
				)
			));
		});

		return App.Convey.View;

	} // fn
); // define
