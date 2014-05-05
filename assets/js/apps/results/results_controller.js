SearchApp.module("Results", function(Results, SearchApp, Backbone, Marionette, $, _){
	Results.Controller = {
		resultsView: {},
		getResults: function(query){
			
			var fetchingResults = SearchApp.request("results:entities", query);
			var that = this;
			$.when(fetchingResults).done(function(results){
				that.renderView(results);
				SearchApp.trigger("search:results:ready");
			});

		},
		renderView: function(results){
			var resultsView = new Results.CollectionView({
					collection: results
			});
			SearchApp.mainRegion.show(resultsView);
			resultsView.setTiles();
			Results.Controller.resultsView = resultsView;
			
		},

		filterResults: function(e){
			var filteredResults = SearchApp.request("filtered:results:entities", e);
			this.renderView(filteredResults);
			//this.resultsView.collection.reset(filteredResults);
			//this.resultsView.setTiles();

		},
		resetResults: function(){
			var fetchingResults = SearchApp.request("access:results:entities");
			this.renderView(fetchingResults);
			//this.resultsView.collection.reset(filteredResults);
			//this.resultsView.setTiles();
		}

	}
});