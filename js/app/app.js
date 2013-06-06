define(
	function() {
		require.config({
			baseUrl: '/js/',
			// enforceDefine: true,
			/**
			 *
			 * Shims
			 * Configure the dependencies and exports for older, traditional 'browser globals'
			 * scripts that do not use define() to declare the dependencies and set a module value.
			 *
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
					'backbone.localstorage': {
						deps: ['backbone'],
						exports: 'Backbone.LocalStorage'
					}, // backbone.localstorage
					'backbone.subroute': {
						deps: ['backbone'],
						exports: 'Backbone.SubRoute'
					}, // backbone.subroute
					'backbone.syphon': {
						deps: ['backbone'],
						exports: 'Backbone.Syphon'
					}, // backbone.syphon
				'json2': {
					exports: 'JSON'
				},
				'jquery': {
					exports: 'jQuery',
					init: function() {
						jQuery.noConflict();
					}
				},
					'libs/custom/jquery.convey': {
						deps: [
							'jquery',
							'libs/jquery/jquery.ui.position',
							'libs/jquery/jquery.timeout'
						],
						exports: 'jQuery.conveyPlugin'
					},
					'libs/jquery/jquery.timeout': {
						deps: ['jquery'],
						exports: 'jQuery.timeout'
					},
					'libs/jquery/jquery.ui.position': {
						deps: ['jquery'],
						exports: 'jQuery.position'
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
			 *
			 * Paths
			 * Path mappings for module names not found directly under baseUrl
			 * Don't have to add one for each file. Used as shortcuts or for scripts with shims above.
			 *
			**/
			paths: {
				'backbone': 'libs/backbone/backbone',
					'backbone.layoutmanager': 'libs/backbone/backbone.layoutmanager',
					'backbone.localstorage': 'libs/backbone/backbone.localstorage',
					'backbone.subroute': 'libs/backbone/backbone.subroute',
					'backbone.syphon': 'libs/backbone/backbone.syphon',
				'hogan': 'libs/hogan',
				'html': '/html',
				'json2': 'libs/json2',
				'jquery': 'libs/jquery/jquery',
				'require': 'libs/require/require',
					'async': 'libs/require/async',
					'cache': 'libs/require/cache',
					'depend': 'libs/require/depend',
					'domReady': 'libs/require/domReady',
					'font': 'libs/require/font',
					'goog': 'libs/require/goog',
					'hgn': 'libs/require/hgn',
					'image': 'libs/require/image',
					'json': 'libs/require/json',
					'mdown': 'libs/require/mdown',
					'markdownConverter': 'libs/require/markdown.converter',
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

				/**
				 *
				 * Configure layout manager
				 * Provide defaults, override w/async fetch & render
				 *
				**/
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
					}, // render
					serialize: function() {
						return _.extend({}, _.clone(this.options), _.clone(this.model.attributes));
					} // serialize
				}); // Backbone.Layout.configure

				/**
				 *
				 * Create global App object
				 * Establishes naming convention for modules
				 *
				**/
				window.App = {
					View: {},
					Collection: {},
					Model: {},
					Template: {},
					Router: {},
					Event: _.extend({}, Backbone.Events),
					Log: function(val) { if (window.console) console.log(val); },
					Layout: {
						Use: function(options) {
							options = options || {};
							// If only a name was passed in, use as template
							if (_.isString(options)) {
								options = _.extend({}, { template: options })
							} else {
								options = _.extend({}, options);
							}
							// Check if a layout already exists
							if (this.layout) {
								// If so, update the template
								this.layout.template = options.template;
							} else {
								// Or create a new layout with options
								this.layout = new Backbone.Layout(_.extend({
									el: '#js-body'
								}, options));
							} // if

							// Cache the layout reference
							return this.layout;
						} // Use
					} // Layout
				}; // App

				/**
				 *
				 * Start history
				 *
				 *
				**/
				// Backbone.history.start({pushState: true, root: '/'});
				Backbone.history.start();

				/**
				 *
				 * Prevent default on 'click' events
				 * Route if no associated handler
				 *
				**/
				$(document).on('click.backbone', 'a[href]:not([data-bypass])', function(e) {
					e.preventDefault();
					_this = $(this);
					App.Log('Click handled by backbone');
					Backbone.history.navigate(_this.attr('href'), {trigger: true});
				}); // on click


				/**
				 *
				 * Prevent default on 'submit' events
				 * Route if no associated handler
				 *
				**/
				$(document).on('submit.backbone', 'form[action]:not([data-bypass])', function(e) {
					e.preventDefault();
					_this = $(this);
					App.Log('Submit handled by backbone');
					Backbone.history.navigate(_this.attr('action'), {trigger: true});
				}); // on submit

				/**
				 *
				 * Request
				 *
				 *
				**/
				require(
					[
						'app/app.router',
						'app/app.model',
						'app/app.view'
					],
					function(appRouter, appModel, appView) {
						App.Router.Main = App.Router.Main || new appRouter;
						App.Model.Layout = App.Model.Layout || new appModel;

						/**
						 *
						 * Instantiate main router
						 *
						 *
						**/
						App.Router.Main.on('route', function(actions) {
							App.Log( 'Route: ' + actions );
						});

						/**
						 *
						 * Create main layout
						 *
						 *
						**/
						App.Layout.Use().setView(new appView.Main({
							model: App.Model.Layout
						}), true).render();
					} // fn
				); // require
			} // callback
		}); // require.config
 } // fn
); // define
