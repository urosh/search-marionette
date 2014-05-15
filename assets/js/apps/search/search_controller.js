SearchApp.module("Search", function(Search, SearchApp, Backbone, Marionette, $, _){
	Search.Controller = {
		moduleInteractionIn: {
		
		},
		initializeSearch: function(){
			
			
			var fetchingContacts = SearchApp.request("getInits:search:entities");
			
			
			$.when(fetchingContacts).done(function(inits){
				var searchView = new SearchApp.Search.InitView({
					model: inits
				});
				SearchApp.searchRegion.show(searchView);
				searchView.on('search:run', function(event){

					SearchApp.trigger('search:run', event);
				})
			});
			
			
		},
		serveModules: function(){
			this.activeModules = SearchApp.request("getActiveModules:modules:entities");
			for(var i = 0, j = this.activeModules.length; i < j; i++){
				if(this.moduleInteractionIn.hasOwnProperty( this.activeModules[i].module )){
    			this.moduleInteractionIn[this.activeModules[i].module]();	
    		}
    		
    	}
		}

	}
})