define(
	[
		'app/router',
		'modules/layout/layout.model',
		'modules/layout/layout.view',
		'backbone',
		'backbone.layoutmanager'
	],
	function(appRouter, layoutModel, layoutView) {

		App.Router.Main = App.Router.Main || new appRouter;
		App.Model.Layout = App.Model.Layout || new layoutModel;

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
		App.Layout.Use().setView(new layoutView.Main({
			model: App.Model.Layout
		}), true).render();
	} // fn
); // define
