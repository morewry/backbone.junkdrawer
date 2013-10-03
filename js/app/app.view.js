define(
	[
		'app/app',
		'backbone',
		'backbone.layoutmanager'
		//,'backbone.modelbinder'
	],
	function () {

		// Has nested subviews
		var AppView,
		    AppSubview = {};

		/**
		 *
		 * Define site view
		 *
		 *
		**/
		AppSubview.Site = Backbone.View.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'app/site',

			// Backbone: Called when view first created. Access this.options.
			initialize: Backbone.Layout.prototype.options.initialize

		}); // AppSubview.Site

		/**
		 *
		 * Define site head view
		 *
		 *
		**/
		AppSubview.SiteHead = AppSubview.Site.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'app/site-head'

		});

		/**
		 *
		 * Define site menu view
		 *
		 *
		**/
		AppSubview.SiteMenu = AppSubview.Site.extend({

			// Backbone: Hash (or fn that returns one) of delegated events.
			events: {
				'click [data-togglemenu]': 'toggleSiteMenu'
			},

			visibility: true,

			// Backbone.Layout: Specify a template for the view.
			template: 'app/site-menu',

			toggleSiteMenu: function ( e ) {
				if ( this.visibility ) {
					this.visibility = false;
					this.$el.removeClass('slideInLeft expanded').addClass('slideOutLeft collapsed');
				}
				else {
					this.visibility = true;
					this.$el.removeClass('slideOutLeft collapsed').addClass('slideInLeft expanded');
				}
				App.Event.trigger('toggle:siteMenu', this.visibility);
			}

		});

		/**
		 *
		 * Define site menu nav / navfoot view
		 *
		 *
		**/
		AppSubview.SiteMenu.Nav = AppSubview.SiteMenu.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'app/nav-main'

		});

		/**
		 *
		 * Define site body view
		 *
		 *
		**/
		AppSubview.SiteBody = AppSubview.Site.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'app/site-body',

			// Backbone.Layout: Run before view is rendered
			beforeRender: function () {
				_.bindAll(this, 'toggleSiteBody');
				App.Event.on('toggle:siteMenu', this.toggleSiteBody);
			},

			toggleSiteBody: function ( visibility ) {
				console.log("visible = " + visibility);
				// todo css animation
				if ( visibility ) {
					this.$el.css("left", "0");
				}
				else {
					this.$el.css("left", "-10%");
				}
			}

		});

		/**
		 *
		 * Define site foot view
		 *
		 *
		**/
		AppSubview.SiteFoot = AppSubview.Site.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'app/site-foot'

		});

		/**
		 *
		 * Define site foot nav / navfoot view
		 *
		 *
		**/
		AppSubview.SiteFoot.Nav = AppSubview.SiteFoot.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'app/nav-foot'

		});

		/**
		 *
		 * Define top level wrapper view
		 * Circumvent obnoxious scope issues
		 *
		**/
		AppView = function () {
			return Backbone.View.extend({
				// Backbone.Layout: Declare nested subviews.
				views: {
					"": new AppSubview.Site({
						model: App.Model,
						views: {
							"": [
								new AppSubview.SiteHead({
									model: App.Model
								}), // new AppSubview.SiteHead
								new AppSubview.SiteMenu({
									model: App.Model,
									views: {
										"[data-id='content']": new AppSubview.SiteMenu.Nav({ model: App.Model })
									} // views
								}), // new AppSuview.SiteMenu
								new AppSubview.SiteBody({
									model: App.Model
								}), // new AppSubview.SiteBody
								new AppSubview.SiteFoot({
									model: App.Model,
									views: {
										"[data-id='content']": new AppSubview.SiteFoot.Nav({ model: App.Model }),
									} // views
								}) // new AppSuview.SiteFoot
							] // ""
						} // views
					}) // new AppSubview.Site
				} // views
			}) // Backbone.View.extend
		}; // AppView

		AppView.Subviews = AppSubview;

		return AppView;

	} // fn
); // define
