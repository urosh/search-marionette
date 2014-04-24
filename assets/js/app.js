var SearchApp = new Marionette.Application();

SearchApp.addRegions({
		'searchRegion': '#search-region',
		'mainRegion': '#main-region',
		'mapRegion': '#map-region'
});

SearchApp.on('initialize:after', function(){
	// ok now i need to start thins up. 
	// first we want to add search module. 
	
	SearchApp.Search.Controller.initializeSearch();

});

SearchApp.on('search:run', function(event){
	// ok. 
})

