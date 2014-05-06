SearchApp.module("Menu", function(Menu, SearchApp, Backbone, Marionette, $, _){
	Menu.Controller = {
		activeModules: ['search', 'results', 'map'],
		initializeMenu: function(){
			var menuView = new Menu.View(this.activeModules);
			SearchApp.menuRegion.show(menuView);
			menuView.initializeModules();
		},

	}
})