SearchApp.module("Entities", function(Entities, SearchApp, Backbone, Marionette, $, _){
	//ok here i need to have model, 
	//collection 
	//for initializing search first. 
	Entities.SearchInitModel = Backbone.Model.extend({
		
		url: 'http://public.cyi.ac.cy/starcRepo/map/init',
	})
	Entities.SearchInitCollection = Backbone.Collection.extend({
		url: 'http://public.cyi.ac.cy/starcRepo/map/init',
		model: Entities.SearchInitModel
	});

	Entities.ResultsModel = Backbone.Model.extend({

	});
	Entities.ResultsCollection = Backbone.Collection.extend({
		model: Entities.ResultsModel,
		url: 'http://public.cyi.ac.cy/starcRepo/map/search',

	});
	Entities.activeModulesList = [
		{"name" : "search", "text" : "Search objects", "module": "search", "moduleName": "Search"},
		{"name" : "results", "text" : "Search results", "module": "results", "moduleName": "Results"},
		{"name" : "map", "text" : "Objects locations", "module": "map", "moduleName": "Map"}
	];

	Entities.availableModulesList = [
		{"name" : "search", "text" : "Search objects", "module": "search", "moduleName": "Search"},
		{"name" : "browse", "text" : "Browse objects", "module": "browse", "moduleName": "Browse"},
		{"name" : "results", "text" : "Search results", "module": "results", "moduleName": "Results"},
		{"name" : "map", "text" : "Objects locations", "module": "map", "moduleName": "Map"},
		{"name" : "collection", "text" : "Create collections", "module": "collection", "moduleName": "Collection"},
		{"name" : "connections", "text" : "Explore connections", "module": "connections", "moduleName": "Connections"},
		{"name" : "navigation paths", "text" : "Explore navigation paths", "module": "navigation_paths", "moduleName": "Paths"},
		{"name" : "clustering", "text" : "Explore clusters", "module": "clustering", "moduleName": "Clustering"}
	];



	Entities.ModuleList = Backbone.Model.extend({
		defaults:{
			active: Entities.activeModulesList,
			modules: Entities.availableModulesList
		}
		
	});


	var API = {
		getSearchInits: function(){
			var searchInits = new Entities.SearchInitModel();
			var defer = $.Deferred();
			searchInits.fetch({
          success: function(data){
          	defer.resolve(data);
          },
          error: function(data){
          	defer.resolve(undefined);
          }
      });
			return defer.promise();
		}, 
		getResults: function(query){
			var searchResults = new Entities.ResultsCollection();
			var defer = $.Deferred();
			searchResults.fetch({
				data: query,
				success: function(res){
					Entities.results = res;
					defer.resolve(res);
				},
				error: function(res){
					defer.resolve(undefined);
				}
			});
			
			return defer.promise();
		},
		getExistingResults: function(){
			return Entities.results;
		},
		getFilteredResults: function(e){
			var filteredCollection = new Entities.ResultsCollection();
			Entities.results.each(function(item){
			//console.log(item.get('lat') + " -- " + parseFloat(e[0].toFixed(5)));

				if( item.get('lat') == parseFloat(e[0].toFixed(5)) && item.get('lng') == parseFloat(e[1].toFixed(5)) ) {
					filteredCollection.push(item);
				
				}
			}, this);
			
			return filteredCollection;
		},
		getModuleList: function(){
			return new Entities.ModuleList();
		},
		addActiveModule: function(e){
			for (var i = 0, j = Entities.availableModulesList.length; i < j; i++){
  		if(e === Entities.availableModulesList[i].name){
  				Entities.activeModulesList.push(Entities.availableModulesList[i]);
  			}
  		}
		},
		removeActiveModule: function(e){
			for (var i = 0, j = Entities.activeModulesList.length; i < j; i++){
  		if(e === Entities.activeModulesList[i].name){
  				var index = i;
  			}
  		}

  		Entities.activeModulesList.splice(index, 1);
		},
		getActiveModuleList: function(){
			return Entities.activeModulesList;
		},
		getModuleName: function(e){
			console.log(e);
			for (var i = 0, j = Entities.activeModulesList.length; i < j; i++){
  		if(e === Entities.activeModulesList[i].name){
  				return Entities.activeModulesList[i].moduleName;
  			}
  		}
  		return "";
		}

		
	}

	SearchApp.reqres.setHandler("searchInits:entities", function(){
    return API.getSearchInits();
  });

  SearchApp.reqres.setHandler("results:entities", function(query){
    
    return API.getResults(query);
  });

  SearchApp.reqres.setHandler("access:results:entities", function(){
  	return API.getExistingResults();
  });

  SearchApp.reqres.setHandler("filtered:results:entities", function(e){
  	return API.getFilteredResults(e);
  });

  SearchApp.reqres.setHandler("modules:entities", function(){
  	return API.getModuleList();
  });

  SearchApp.reqres.setHandler("module:add:entities", function(e){
  	API.addActiveModule(e);
  });

  SearchApp.reqres.setHandler("module:remove:entities", function(e){
  	API.removeActiveModule(e);
  });

  SearchApp.reqres.setHandler("active:modules:entities", function(){
  	return API.getActiveModuleList();
  });

  SearchApp.reqres.setHandler("name:module:entities", function(e){
  	return API.getModuleName(e);
  })
  

})