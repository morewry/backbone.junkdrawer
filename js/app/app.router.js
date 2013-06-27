define(
	[
		'app/app',
		'backbone',
		'backbone.subroute'
	],
	function() {

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
					ref: 'Module.Listing.Router',
					url: 'modules/listing/listing.router',
					route: 'listing/'
				},

				search: {
					name: 'search',
					ref: 'Module.Search.Router',
					url: 'modules/listing/listing.router',
					route: 'real-estate/'
				},

				value: {
					name: 'value',
					ref: 'Module.Values.Router',
					url: '',
					route: 'home-values/'
				},

				buyers: {
					name: 'buyers',
					ref: 'Module.Buyers.Router',
					url: '',
					route: 'buyers/'
				},

				sellers: {
					name: 'sellers',
					ref: 'Module.Sellers.Router',
					url: '',
					route: 'sellers/'
				},

				user: {
					name: 'user',
					ref: 'Module.User.Router',
					url: '',
					route: 'user/'
				},

				portfolio: {
					name: 'portfolio',
					ref: 'Module.Portfolio.Router',
					url: 'modules/portfolio/portfolio.router',
					route: 'portfolio/'
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
				App.Log("...either exists or...");
				var config = App.Router.config[route];
				if ( typeof App[config.ref] === "undefined" ) {
					require([config.url], function( thisRouter ){
						App[config.ref] = new thisRouter(config.route);
						App.Log("...initialized");
					}); // require
				} // if !App[ref]
			}, // subroute

			/**
			 *
			 *
			 *
			 *
			**/
			register: function( config ) {
				var _this = this;
				this.route(config.route, config.name, function() {
					var _args = arguments;
					require(
						[config.path],
						function ( module ) {
							var options = function() {
								var params = config.route.match(/[:\*]\w+/g),
								    options;
								if ( params ) {
									options = {};
									_.each(params, function( n, i ){
										options[n.substring(1)] = _args[i];
									}); // each
								} // if
								// http://blogs.captechconsulting.com/blog/philip-kedy/modularizing-your-backbone-router-using-requirejs
							} // fn
						} // fn
					); // require
				}); // route
			} // register

		}); // AppRouter

		return AppRouter;

	} // fn
); // define
