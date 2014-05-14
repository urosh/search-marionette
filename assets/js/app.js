var SearchApp = new Marionette.Application();

SearchApp.addRegions({
		'searchRegion': '#search-region',
		'mainRegion': '#main',
		'mapRegion': '#map-region',
		'menuRegion': '#menu-region',
		'collectionRegion': '#collection-region',
		'dialogRegion': Marionette.Region.Dialog.extend({
    	el: ".md-modal"
  	})
});

SearchApp.on('initialize:after', function(){
	// ok now i need to start thins up. 
	// first we want to add search module. 
	
	SearchApp.Search.Controller.initializeSearch();
	SearchApp.Map.Controller.initializeMap();
	SearchApp.Menu.Controller.initializeMenu();

});

SearchApp.on('search:run', function(event){
	// ok. 
	SearchApp.Results.Controller.getResults(event);
});

SearchApp.on('search:results:ready', function(){
	SearchApp.Map.Controller.populateMap();
	// now from here i can initialize map
});

SearchApp.on("map:filter:results", function(e){
	SearchApp.Results.Controller.filterResults(e);
});

SearchApp.on("map:reset:results", function(){
	
	SearchApp.Results.Controller.resetResults();
});

SearchApp.on("results:show:item", function(e){
	// ok now i need details module, that will show object details in 
	// the modal window. 
	// Lets see how this will work.
	SearchApp.Details.Controller.initializeModule(e);
	

});

SearchApp.on("module:add", function(e){
	//add new module;

	// this might return me a method to run
	SearchApp.request("module:add:entities", e);
	// add module to its view
	// sort out layout, transitions, apearance etc
	var moduleName = SearchApp.request("name:module:entities", e);
	// how to know which module to load
	if(  SearchApp[moduleName] ) {
		SearchApp[moduleName].Controller.initializeModule();
		
	}
	//base on selection i want to add module. 
});

SearchApp.on("module:remove", function(e){
	//remove module;
	SearchApp.request("module:remove:entities", e);
	SearchApp.Collection.Controller.removeModule();
	
	
});

SearchApp.on("module:active:notification", function(e){
	// ok we have a name of the module that is notifying. 
	// now we need to get the list of active modules and send them notification 
	// so they can decide if they want to do something. 
	// so basically i need some kind of API that will enable uniform communication between modules. 
	// each module should have a common function that will be executed with the name of the new module. 
	var activeModules = SearchApp.request("active:modules:entities");
	for(var i = 0, j = activeModules.length; i < j; i++){
		SearchApp[activeModules[i].moduleName].Controller.serveModules();
	}
});




