define(
	[
		'backbone',
		'backbone.layoutmanager'
	],
	function () {

		var AppInit = {

			/**
			 *
			 *
			 *
			 *
			**/
			_preinit: function () {

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
					fetch: function ( name ) {
						var done = this.async();
						require(
							[name],
							function ( pcTemplate ) {
								done(pcTemplate);
							} // fn
						); // require
					}, // fetch
					initialize: function () {
						// App.Log("Backbone Layout-View initialized");
						var _this = this,
						doModelListen = function () {
							_this.listenTo(_this.model, 'change add', _this.render);
							_this.listenTo(_this.model, 'destroy remove', _this.remove);
						},
						doCollectionListen = function () {
							_this.listenTo(_this.collection, 'reset change add remove', _this.render);
						};
						if ( this.model ) {
							if ( this.model.deferred ) {
								this.model.deferred.done(doModelListen);
							}
							else {
								doModelListen();
							}
						} // if this.model
						if ( this.collection ) {
							if ( this.collection.deferred ) {
								this.collection.deferred.done(doCollectionListen);
							}
							else {
								doCollectionListen();
							}
						} // if this.model
						// todo: collection
						if ( Backbone.ModelBinder ) {
							this.options.modelbinder = new Backbone.ModelBinder();
						}
					}, // initialize
					render: function ( template, context ) {
						var done = this.async();
						done(
							template(context)
							//, App.Log("Backbone Layout-View rendered")
						);
						if ( this.options && this.options.modelbinder ) {
							this.options.modelbinder.bind( this.model, this.el, null, { boundAttribute: 'data-key' } );
						}
					}, // render
					serialize: function () {
						// todo filter out prototypes, functions, private vars
						var data,
						options = _.clone(this.options) || {},
						model = (this.model) ? this.model.attributes : {};
						delete options.model;
						data = _.extend({}, options, model);
						return data;
					} // serialize
				}); // Backbone.Layout.configure

				/**
				 *
				 * Create App object
				 *
				 * Include event aggregator
				 * Include console.log wrapper
				 * Include Name (create nested objects from str name if they don't exist) utility
				 * Include UseLayout (access/swap top level layout) utility
				 * Include Region (search nested view) utility
				 *
				**/
				var AppObject = {
					Init: false,
					Collection: {},
					Model: {},
					Router: {},
					Module: {},
					// State: _.extend({}, Backbone.Model),
					Event: _.extend({}, Backbone.Events),
					Log: function ( val ) { if (window.console) console.log(val); },
					UseLayout: function ( options ) {
						options = options || {};
						// If only a name was passed in, use as template
						if (_.isString(options)) {
							options = _.extend({}, { template: options })
						} else {
							options = _.extend({}, options);
						}
						// Check if a layout already exists
						if (this.Layout) {
							// If so, update the template
							this.Layout.template = options.template;
						} else {
							// Or create a new layout with options
							this.Layout = new Backbone.Layout(_.extend({
								el: '[data-view="app"]'
							}, options));
						} // if
						// Cache the layout reference
						return this.Layout;
					}, // UseLayout
					Region: function ( search ) {
						var sv = App.UseLayout(),
						rv,
						doSearch = function ( cv ) {
							cv.getView( function ( nv ) {
								if ( search( nv ) ) {
									rv = nv;
								}
								else {
									doSearch( nv );
								}
							}); // getView
						}; // doSearch
						doSearch( sv );
						return rv;
					} // Region
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
			_init: function () {

				/**
				 *
				 * Initialize model and view
				 *
				 *
				**/
				require(
					[
						'app/app.model',
						'app/app.view'
					],
					function ( appModel, appView ) {
						AppInit._preinit();
						App.Model = new appModel;
						App.Model.deferred.done(function () {
							var newAppView = appView();
							App.View = App.UseLayout().setView(new newAppView({ model: App.Model }), true).render();
							AppInit._postinit();
						}); // App.Model.deferred.done
					} // fn
				); // require

			}, // _init

			/**
			 *
			 *
			 *
			 *
			**/
			_postinit: function () {

				/**
				 *
				 * Initialize router and start history
				 *
				 *
				**/
				require(
					[
						'app/app.router'
					],
					function ( appRouter ) {
						App.Router = new appRouter;
						Backbone.history.start({ pushState: true, silent: false, hashChange: true, root: '/' });
						//Backbone.history.navigate(Backbone.history.fragment, {trigger: true});
						//Backbone.history.loadUrl(Backbone.history.fragment);
						if ( Backbone.history.fragment ) App.Router.subroute( Backbone.history.fragment.split('/')[0] );

						/**
						 *
						 * Event-driven top-level routing
						 *
						 *
						**/
						App.Router.on('route', function ( route ) {
							App.Router.subroute(route);
							App.Event.trigger( 'route', { route: route } );
							// App.Log( 'Backbone Route: ' + route );
						});

						/**
						 *
						 * Prevent default on 'click' events
						 * Route if no associated handler
						 *
						**/
						$(document).off('submit.backbone')
						.on('click.backbone', 'a[href]:not([data-bypass])', function ( e ) {
							e.preventDefault();
							$this = $(this);
							Backbone.history.navigate( $this.attr('href'), { trigger: true } );
							// App.Log("Click: preventDefault, Backbone.history.navigate");
						}); // on click

						/**
						 *
						 * Prevent default on 'submit' events
						 * Route if no associated handler
						 *
						**/
						$(document).off('submit.backbone')
						.on('submit.backbone', 'form[action]:not([data-bypass])', function ( e ) {
							e.preventDefault();
							$this = $(this);
							Backbone.history.navigate( $this.attr('action'), { trigger: true } );
							// App.Log("Submit: preventDefault, Backbone.history.navigate");
						}); // on submit

						/**
						 *
						 *
						 *
						 *
						**/
						App.Init = true;
					} // fn
				); // require

			} // _postinit

		}; // AppInit

		/**
		 *
		 *
		 *
		 *
		**/
		if ( typeof App === "undefined" || !App.Init ) { AppInit._init(); }

 } // fn
); // define
