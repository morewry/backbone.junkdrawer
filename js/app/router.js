define(
	[
		'backbone'
	],
	function() {

		App.Router.Main = Backbone.Router.extend({

			routes: {
				'*actions': 'defaultRoute'
			} // routes

		}); // App.Router.Main

		return App.Router.Main;

	} // fn
); // define