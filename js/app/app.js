define(
	function() {

		require.config({
			baseUrl: '/js/',
			// enforceDefine: true,
			/**
			 * Shims
			 * Configure the dependencies and exports for older, traditional 'browser globals'
			 * scripts that do not use define() to declare the dependencies and set a module value.
			**/
			shim: {
				'backbone': {
					deps: [
						'json2',
						'underscore',
						'zepto'
					],
					exports: 'Backbone'
				}, // backbone
					'backbone.layoutmanager': {
						deps: [
							'backbone',
							'zepto.deferred'
						],
						exports: 'Backbone.Layout'
					}, // backbone.layoutmanager
					'backbone.syphon': {
						deps: ['backbone'],
						exports: 'Backbone.Syphon'
					}, // backbone.syphon
					'backbone.localstorage': {
						deps: ['backbone'],
						exports: 'Backbone.LocalStorage'
					}, // backbone.syphon
				'json2': {
					exports: 'JSON'
				},
				'underscore': {
					exports: '_'
				}, // underscore
					'underscore.string': {
						deps: ['underscore'],
						exports: '_.str'
					}, // underscore.string
				'zepto': {
					exports: 'Zepto'
				}, // zepto
					'zepto.deferred': {
						deps: ['zepto'],
						exports: 'Deferred',
						init: function() {
							this.Deferred.installInto(Zepto);
						}
					} // zepto.deferred
			}, // shim
			/**
			 * Paths
			 * Path mappings for module names not found directly under baseUrl
			 * Don't have to add one for each file. Used as shortcuts or for scripts with shims above.
			**/
			paths: {
				'app/router': '/js/app/router',
				'app/config': '/js/app/config',
				'app/layout': '/js/app/layout',
				'backbone': 'libs/backbone/backbone',
					'backbone.syphon': 'libs/backbone/backbone.syphon',
					'backbone.layoutmanager': 'libs/backbone/backbone.layoutmanager',
					'backbone.localstorage': 'libs/backbone/backbone.localstorage',
				'custom': 'libs/custom',
				'hogan': 'libs/hogan',
				'html': '/html',
				'json2': 'libs/json2',
				'module': 'modules',
				'require': 'libs/require/require',
					'async': 'libs/require/async',
					'depend': 'libs/require/depend',
					'domReady': 'libs/require/domReady',
					'font': 'libs/require/font',
					'goog': 'libs/require/goog',
					'hgn': 'libs/require/hgn',
					'image': 'libs/require/image',
					'json': 'libs/require/json',
					'mdown': 'libs/require/mdown',
					'noext': 'libs/require/noext',
					'propertyParser': 'libs/require/propertyParser',
					'step': 'libs/require/step',
					'text': 'libs/require/text',
				'underscore': 'libs/underscore',
					'underscore.string': 'libs/underscore.string',
				'zepto': 'libs/zepto',
					'zepto.deferred': 'libs/zepto.deferred'
			}, // paths
			map: {
			  '*': {
				 'css': 'libs/require/css/css'
			  }
			}, // map
			hgn: {
				templateExtension: '.html'
			}, // hgn
			deps: [
				'backbone',
				'backbone.layoutmanager'
			], // deps
			callback: function() {

				// console.log utility
				$.log = function(val) { if (window.console) console.log(val); }

				// Configure layout manager
				Backbone.Layout.configure({
					manage: true,
					el: false,
					prefix: 'hgn!html/',
					fetch: function(name) {
						var done = this.async();
						require([name], function(pcTemplate){
							done(pcTemplate);
						});
					}, // fetch
					render: function(template, context) {
						var done = this.async();
						done(
							template(context)
						);
					} // render
				}); // Backbone.Layout.configure

				// create global object
				window.App = {
					View: {},
					Collection: {},
					Model: {},
					Template: {},
					Router: {},
					Layout: {
						Use: function(options) {
							var defaults = {
								name: null,
								template: null
							};
							// Ensure options is an object, extend w/defaults
							options = options || {};
							_.extend(defaults, options);
							// If a name was specified, use as template
							options.template = (_.isString(options.name)) ? options.name : options.template;

							// Check if a layout already exists
							if (this.layout) {
								// If so, update the template
								this.layout.template = options.template;
							} else {
								// Or create a new layout with options
								this.layout = new Backbone.Layout(_.extend({
									el: '#body'
								}, options));
							} // if

							// Cache the layout reference
							return this.layout;
						} // Use
					}, // Layout
					Event: _.extend({}, Backbone.Events)
				}; // App

				// Start history
				// Backbone.history.start({pushState: true, root: '/'});
				Backbone.history.start();

				// Route all click events by default
				$(document).on('click', 'a[href]:not([data-bypass])', function(e) {
					e.preventDefault();
					$.log('Click routed by backbone');
					// Backbone.history.navigate($(this).attr('href'), {trigger: true, replace: true});
					Backbone.history.navigate($(this).attr('href'), {trigger: true});
				}); // on click

				// Route all submit events by default
				$(document).on('submit', 'form:not([data-bypass])', function(e) {
					e.preventDefault();
					$.log('Submit routed by backbone');
					// Backbone.history.navigate($(this).attr('action'), {trigger: true, replace: true});
					Backbone.history.navigate($(this).attr('action'), {trigger: true});
				}); // on submit

				// Retrieve & instantiate main layout & router
				require(
					[
						'app/router',
						'app/config',
						'app/layout'
					],
					function(appRouter, appConfig, appLayout) {

						// Listen for route events
						new appRouter().on('route:defaultRoute', function(actions) {
							$.log( 'Route: ' + actions );
						});

						// Create initial layout
						App.Layout.Use().setView(new appLayout.Main({
							model: new appConfig()
						}), true).render();

					} // fn
				); // require

			} // callback
		}); // require.config

	} // fn
); // define
