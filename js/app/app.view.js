define(
	[
		'app/app',
		'backbone',
		'backbone.layoutmanager'
	],
	function(){

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
			template: 'site',

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
			template: 'site-head'

		});

		/**
		 *
		 * Define site menu view
		 *
		 *
		**/
		AppSubview.SiteMenu = AppSubview.Site.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'site-menu'

		});

		/**
		 *
		 * Define site menu nav / navfoot view
		 *
		 *
		**/
		AppSubview.SiteMenu.Nav = AppSubview.SiteMenu.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'nav-main'

		});

		/**
		 *
		 * Define site body view
		 *
		 *
		**/
		AppSubview.SiteBody = AppSubview.Site.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'site-body'

		});

		/**
		 *
		 * Define site foot view
		 *
		 *
		**/
		AppSubview.SiteFoot = AppSubview.Site.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'site-foot'

		});

		/**
		 *
		 * Define site foot nav / navfoot view
		 *
		 *
		**/
		AppSubview.SiteFoot.Nav = AppSubview.SiteFoot.extend({

			// Backbone.Layout: Specify a template for the view.
			template: 'nav-foot'

		});

		/**
		 *
		 * Define top level wrapper view
		 * Circumvent obnoxious scope issues
		 *
		**/
		AppView = Backbone.View.extend({

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
									"": new AppSubview.SiteMenu.Nav({ model: App.Model })
								} // views
							}), // new AppSuview.SiteMenu
							new AppSubview.SiteBody({
								model: App.Model
							}), // new AppSubview.SiteBody
							new AppSubview.SiteFoot({
								model: App.Model,
								views: {
									"": new AppSubview.SiteFoot.Nav({ model: App.Model }),
								} // views
							}) // new AppSuview.SiteFoot
						] // ""
					} // views
				}) // new AppSubview.Site
			} // views

		}); // AppView

		AppView.Subviews = AppSubview;

		return AppView;

	} // fn
); // define
