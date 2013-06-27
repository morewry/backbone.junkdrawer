define(
	[
		'backbone',
		'backbone.layoutmanager'
	],
	function() {

		var AppInit = {

			/**
			 *
			 *
			 *
			 *
			**/
			_preinit: function() {

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
						require(
							[name],
							function(pcTemplate){
								done(pcTemplate);
							} // fn
						); // require
					}, // fetch
					initialize: function() {
						App.Log("Backbone Layout-View initialized");
						var _this = this;
						if ( this.model ) {
							this.model.deferred.done(function(){
								_this.listenTo(_this.model, 'change', _this.render);
								_this.listenTo(_this.model, 'destroy', _this.render);
							}); // this.model.deferred.done
						} // if this.model
					}, // initialize
					render: function(template, context) {
						var done = this.async();
						done(
							template(context),
							App.Log("Backbone Layout-View rendered")
						);
					}, // render
					serialize: function() {
						return _.extend({}, this.options, this.model.attributes);
					} // serialize
				}); // Backbone.Layout.configure

				/**
				 *
				 * Create App object
				 *
				 * Include event aggregator
				 * Include console.log wrapper
				 * Include Use layout utility
				 * Include Name utility
				 *
				**/
				var AppObject = {
					Init: false,
					Module: {},
					Event: _.extend({}, Backbone.Events),
					Log: function(val) { if (window.console) console.log(val); },
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
								el: '[data-view="app"]'
							}, options));
						} // if
						// Cache the layout reference
						return this.layout;
					} // Use
				}; // App

				/**
				 *
				 *
				 *
				 *
				**/
				window.App = AppObject;

			}, // _preinit

			/**
			 *
			 *
			 *
			 *
			**/
			_init: function() {

				/**
				 *
				 *
				 *
				 *
				**/
				if ( typeof App === "undefined" ) { AppInit._preinit(); }

				/**
				 *
				 *
				 *
				 *
				**/
				if ( !App.Init ) {
					require(
						[
							'app/app.model',
							'app/app.router'
						],
						function ( appModel, appRouter ) {
							App.Model = new appModel;
							App.Router = new appRouter;
							App.Model.deferred.done(function(){
								require(['app/app.view'], function( appView ){
									App.View = App.Use().setView(new appView({
										model: App.Model
									}), true).render(); // setView
									AppInit._postinit();
								}); // require
							}); // App.Model.deferred.done
						} // fn
					); // require
				} // if !App.Init

			}, // _init

			/**
			 *
			 *
			 *
			 *
			**/
			_postinit: function() {

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
				$(document).off('submit.backbone')
				.on('click.backbone', 'a[href]:not([data-bypass])', function(e) {
					e.preventDefault();
					$this = $(this);
					Backbone.history.navigate($this.attr('href'), {trigger: true});
					App.Log("Click: preventDefault, Backbone.history.navigate");
				}); // on click

				/**
				 *
				 * Prevent default on 'submit' events
				 * Route if no associated handler
				 *
				**/
				$(document).off('submit.backbone')
				.on('submit.backbone', 'form[action]:not([data-bypass])', function(e) {
					e.preventDefault();
					$this = $(this);
					Backbone.history.navigate($this.attr('action'), {trigger: true});
					App.Log("Submit: preventDefault, Backbone.history.navigate");
				}); // on submit

				/**
				 *
				 * Event-driven routing
				 *
				 *
				**/
				App.Router.on('route', function( route ) {
					App.Router.subroute(route);
					App.Log( 'Backbone Route: ' + route );
				});

			} // _postinit

		}; // AppInit

		/**
		 *
		 *
		 *
		 *
		**/
		AppInit._init();

 } // fn
); // define
