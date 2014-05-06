var SearchApp = new Marionette.Application();

SearchApp.addRegions({
		'searchRegion': '#search-region',
		'mainRegion': '#main',
		'mapRegion': '#map-region',
		'menuRegion': '#menu-region'
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

