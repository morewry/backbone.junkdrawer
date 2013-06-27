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
				'libs/jath': {
					exports: 'Jath'
				},
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
				'app/app'
			] // deps
			// callback: function(app) { 	app(); } // callback
		}); // require.config
 } // fn
); // define
