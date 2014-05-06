SearchApp.module("Menu", function(Menu, SearchApp, Backbone, Marionette, $, _){
	Menu.View = Marionette.ItemView.extend({
		template: '#tools-menu',
		initialize: function(modules){
			this.activeModules = modules;
		},
		events:{
			"click li a": "toolSelected",
			"click .icon-remove": "removeModule"
		},
		initializeModules: function(){
			var i = 0, j = this.activeModules.length;
			for(i = 0; i < j; i++){
				$('.active-modules-div').append('<div class="moduleTab"> ' + this.activeModules[i] + '<div data-module="' + this.activeModules[i] + '" class="icon-remove"></div></div>');
			}
		
		},
		removeModule: function(e){
			console.log(e.currentTarget.getAttribute('data-module'));
			// notify module manager of the change. 
			e.currentTarget.parentNode.remove();
		},
		toolSelected: function(e){
			//console.log(e.currentTarget.getAttribute('data-module'));
			// ok i have to check if this tools i already in active modules. 
			var addNewModule = true;
			for(var i = 0, j = this.activeModules.length; i < j; i++){
				if(this.activeModules[i] === e.currentTarget.getAttribute('data-module')){
					addNewModule = false;
				}
			}
			if(addNewModule){
				$('.active-modules-div').append('<div class="moduleTab"> ' + e.currentTarget.getAttribute('data-module') + '<div data-module="' + e.currentTarget.getAttribute('data-module') + '" class="icon-remove"></div></div>');
				// now i need to send a signal 
				
			}
			
			
			
		}
	});
})