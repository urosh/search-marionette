var SearchApp = new Marionette.Application();

SearchApp.addRegions({
		'searchRegion': '#search-region',
		'mainRegion': '#main-region',
		'mapRegion': '#map-region'
});

SearchApp.on('initialize:after', function(){
	// ok now i need to start thins up. 
	// first we want to add search module. 

	var searchView = new SearchApp.Search.Input(model: {
		label: 'ajmo ajde'
	});
	SearchApp.searchRegion.show(searchView);
})

