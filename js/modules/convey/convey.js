define(
	[
		'modules/convey/convey.model',
		'modules/convey/convey.view',
		'backbone'
	],
	function(conveyModel, conveyView){

		/**
		 *
		 * setup.conveyor listener
		 *
		 *
		**/
		App.Event.on('setup.conveyor', function(conveyorOpts) {
			App.Event.trigger('ready.conveyor', new conveyView(
				_.extend(
					{},
					conveyorOpts.options,
					{ model: new conveyModel(conveyorOpts.model) }
				)
			));
		});

	} // fn
); // define
