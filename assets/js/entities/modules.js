SearchApp.module("Modules.Entities", function(Entities, SearchApp, Backbone, Marionette, $, _){
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
			for (var i = 0, j = Entities.activeModulesList.length; i < j; i++){
  		if(e === Entities.activeModulesList[i].name){
  				return Entities.activeModulesList[i].moduleName;
  			}
  		}
  		return "";
		},
	}

	SearchApp.reqres.setHandler("getModulesList:modules:entities", function(){
  	return API.getModuleList();
  });

  SearchApp.reqres.setHandler("addModule:modules:entities", function(e){
  	API.addActiveModule(e);
  });

  SearchApp.reqres.setHandler("removeModule:modules:entities", function(e){
  	API.removeActiveModule(e);
  });

  SearchApp.reqres.setHandler("getActiveModules:modules:entities", function(){
  	return API.getActiveModuleList();
  });

  SearchApp.reqres.setHandler("getModuleName:modules:entities", function(e){
  	return API.getModuleName(e);
  });


})