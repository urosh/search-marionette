SearchApp.module("Menu", function(Menu, SearchApp, Backbone, Marionette, $, _){
	Menu.Controller = {
		activeModules: ['search', 'results', 'map'],
		initializeMenu: function(){
			var modulesModel = SearchApp.request("modules:entities");
			var menuView = new Menu.View({model: modulesModel});
			
			SearchApp.menuRegion.show(menuView);
			//menuView.initializeModules();
			menuView.on("add:module", function(e){
				SearchApp.trigger("module:add", e);

			});
			menuView.on("remove:module", function(e){
				SearchApp.trigger("module:remove", e);
				
			});

		},

	}
})