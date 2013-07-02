define(
	[
		'app/app',
		'backbone',
		'backbone.subroute'
	],
	function () {

		/**
		 *
		 *
		 *
		 *
		**/
		var AppRouter = Backbone.Router.extend({

			routes: {
				//'*actions': 'default',
				'': 'default',
				'listing(/*subroute)': 'listing',
				'real-estate(/*subroute)': 'search',
				'home-values(/*subroute)': 'value',
				'buyers(/*subroute)': 'buyers',
				'sellers(/*subroute)': 'sellers',
				'user(/*subroute)': 'user',
				'portfolio(/*subroute)': 'portfolio'
			}, // routes

			/**
			 *
			 *
			 *
			 *
			**/
			config: {

				listing: {
					name: 'listing',
					ref: 'Router.Listing',
					url: 'modules/listing/listing.router',
					route: 'listing'
				},

				search: {
					name: 'search',
					ref: 'Router.Search',
					url: 'modules/listing/listing.router',
					route: 'real-estate'
				},

				value: {
					name: 'value',
					ref: 'Router.Values',
					url: '',
					route: 'home-values'
				},

				buyers: {
					name: 'buyers',
					ref: 'Router.Buyers',
					url: '',
					route: 'buyers'
				},

				sellers: {
					name: 'sellers',
					ref: 'Router.Sellers',
					url: '',
					route: 'sellers'
				},

				user: {
					name: 'user',
					ref: 'Router.User',
					url: '',
					route: 'user'
				},

				portfolio: {
					name: 'portfolio',
					ref: 'Router.Portfolio',
					url: 'modules/portfolio/portfolio.router',
					route: 'portfolio'
				}

			}, // config

			/**
			 *
			 *
			 *
			 *
			**/
			subroute: function ( route ) {
				App.Log("App.Router.subroute (" + route + ")...");
				if ( !App.Router.config[route] ) return;
				var config = App.Router.config[route];
				if ( typeof App[config.ref] === "undefined" ) {
					require(
						[
							config.url
						],
						function ( thisRouter ) {
							App[config.ref] = new thisRouter(config.route);
						}
					); // require
				} // if !App[ref]
			} // subroute

		}); // AppRouter

		return AppRouter;

	} // fn
); // define
