SearchApp.module("Results", function(Results, SearchApp, Backbone, Marionette, $, _){
	Results.Controller = {
		getResults: function(query){
			
			var fetchingResults = SearchApp.request("results:entities", query);

			$.when(fetchingResults).done(function(results){

				
				var resultsView = new Results.CollectionView({
					collection: results
				});
				SearchApp.mainRegion.show(resultsView);
				resultsView.setTiles();
			});


		}
	}
});