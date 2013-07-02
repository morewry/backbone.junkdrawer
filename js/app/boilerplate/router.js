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
				'example(/*subroute)': 'example'
			}, // routes

			/**
			 *
			 *
			 *
			 *
			**/
			config: {

				example: {
					name: 'example',
					ref: 'Module.Example.Router',
					url: 'modules/example/example.router',
					route: 'example'
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
			}, // subroute

			/**
			 *
			 *
			 *
			 *
			**/
			register: function ( config ) {
				var _this = this;
				this.route(config.route, config.name, function () {
					var _args = arguments;
					require(
						[
							config.path
						],
						function ( module ) {
							var options = function () {
								var params = config.route.match(/[:\*]\w+/g),
								    options;
								if ( params ) {
									options = {};
									_.each(params, function ( n, i ) {
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
