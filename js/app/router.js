define(
	[
		'backbone',
		'backbone.subroute'
	],
	function() {

		App.Main = App.Main || {};

		/**
		 *
		 *
		 *
		 *
		**/
		App.Main.Router = Backbone.Router.extend({

			routes: {
				//'*actions': 'defaultRoute',
				'': 'defaultRoute',
				'listing(/*subroute)': 'routeListingModule',
				'real-estate(/*subroute)': 'routeSearchModule',
				'home-values(/*subroute)': 'routeValuesModule',
				'buyers(/*subroute)': 'routeBuyersModule',
				'sellers(/*subroute)': 'routeSellersModule',
				'user(/*subroute)': 'routeUserModule'
			}, // routes

			routeListingModule: function(subroute){
				if (!App.Router.Listing) {
					App.Router.Listing = new App.Listing.Router('listing/');
				}
			},

			routeSearchModule: function(subroute){
				if (!App.Router.Search) {
					App.Router.Search = new App.Search.Router('real-estate/');
				}
			},

			routeValuesModule: function(subroute){
				if (!App.Router.Values) {
					App.Router.Values = new App.Values.Router('home-values/');
				}
			},

			routeBuyersModule: function(subroute){
				if (!App.Router.Buyers) {
					App.Router.Buyers = new App.Buyers.Router('buyers/');
				}
			},

			routeSellersModule: function(subroute){
				if (!App.Router.Sellers) {
					App.Router.Sellers = new App.Sellers.Router('sellers/');
				}
			},

			routeUserModule: function(subroute){
				if (!App.Router.User) {
					App.Router.User = new App.User.Router('user/');
				}
			}

		}); // App.Main.Router

		return App.Main.Router;

	} // fn
); // define
