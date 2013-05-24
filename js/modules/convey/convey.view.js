define(
	[
		'module/convey/convey.model',
		'module/convey/convey.collection',
		'jquery',
		'jquery.ui.position',
		'backbone',
		'backbone.layoutmanager'
	],
	function(){

		App.Convey = App.Convey || {};

		/**
		 *
		 *
		 *
		 *
		**/
		App.Convey.View = Backbone.View.extend({

			// Backbone: Hash (or fn that returns one) of delegated events.
			events: function() {
				var vents = {};
				vents['click [data-convey*="show-' + this.options.cvid + '"]'] = 'showConveyor';
				vents['click [data-convey*="hide-' + this.options.cvid + '"]'] = 'hideConveyor';
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
					collision: 'fit',
					within: App.Layout.Use().$el
				},
				origin: App.Layout.Use(),
				cvid: 'none',
				title: null,
				message: null
			}, // options

			// Backbone.Layout: Specify a template for the view.
			// template: // from options

			// Backbone.Layout: Declare nested subviews.
			// views: {},

			// Backbone.Layout: Provide data to Layout Manager render.
			serialize: function() {
				return {
					cvid: this.options.cvid,
					title: this.options.title,
					message: this.options.message
				};
			}, // serialize

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
				this.$el.position(this.options.position);
				App.Event.trigger('render.conveyor', this);
				this.showConveyor();
			},

			/**
			 *
			 * showConveyor
			 *
			 *
			**/
			showConveyor: function(){
				this.$el.toggleClass('fadein', 'fadeout').removeClass("invisible").position(this.options.position);
				App.Event.trigger('show.conveyor', this);
			},

			/**
			 *
			 * hideConveyor
			 *
			 *
			**/
			hideConveyor: function(){
				this.$el.toggleClass('fadeout', 'fadein').removeClass("invisible").position(this.options.position);
				App.Event.trigger('hide.conveyor', this);
			}

		}); // App.Convey.View

		/**
		 *
		 * setup.conveyor listener
		 *
		 *
		**/
		App.Event.on('setup.conveyor', function(conveyorOpts) {
			var conveyorView = new App.Convey.View(conveyorOpts);
			App.Event.trigger('ready.conveyor', conveyorView);
		});

		return App.Convey.View;

	} // fn
); // define
