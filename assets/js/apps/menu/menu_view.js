SearchApp.module("Menu", function(Menu, SearchApp, Backbone, Marionette, $, _){
	Menu.View = Marionette.ItemView.extend({
		template: Handlebars.compile($('#tools-menu').html()),
		
		events:{
			"click li a": "toolSelected",
			"click .icon-remove": "removeModule"
		},
		removeModule: function(e){
			// notify module manager of the change. 
			e.currentTarget.parentNode.remove();
			this.trigger("remove:module", e.currentTarget.getAttribute('data-module'));
		},
		toolSelected: function(e){
			//console.log(e.currentTarget.getAttribute('data-module'));
			// ok i have to check if this tools i already in active modules. 
			var addNewModule = true;
			var activeModules = this.model.get('active');
			for(var i = 0, j = activeModules.length; i < j; i++){
				if(activeModules[i].name === e.currentTarget.getAttribute('data-module')){
					addNewModule = false;
				}
			}
			if(addNewModule){
				$('.active-modules-div').append('<div class="moduleTab"> ' + e.currentTarget.getAttribute('data-module') + '<div data-module="' + e.currentTarget.getAttribute('data-module') + '" class="icon-remove"></div></div>');
				// now i need to send a signal 
				
				this.trigger("add:module", e.currentTarget.getAttribute('data-module'));
			}
		}
	});
})