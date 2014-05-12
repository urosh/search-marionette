SearchApp.module("Search", function(Search, SearchApp, Backbone, Marionette, $, _){
	Search.Controller = {
		moduleInteractionIn: {
		
		},
		initializeSearch: function(){
			
			
			var fetchingContacts = SearchApp.request("searchInits:entities");
			
			
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
			console.log('serving search module');
		}

	}
})