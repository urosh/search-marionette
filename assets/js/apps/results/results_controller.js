SearchApp.module("Results", function(Results, SearchApp, Backbone, Marionette, $, _){
	Results.Controller = {

		resultsView: {},
		activeModules: [],
		moduleInteractionIn: {
			'collection':  function(){
				if(!_.isEmpty(Results.Controller.resultsView)){
					Results.Controller.resultsView.addCollectionTools();
				}
			}
		},
		moduleInteractionOut: {

		},

		getResults: function(query){
			
			var loadingView = new SearchApp.Common.Views.Loading();
      SearchApp.mainRegion.show(loadingView);
      // ok here i need a list of active modules. 
      
      var fetchingResults = SearchApp.request("results:entities", query);
			var that = this;
			$.when(fetchingResults).done(function(results){
				//loadingView.remove();
				that.renderView(results);
					
      	//this.moduleInteraction[tst]();

				SearchApp.trigger("search:results:ready");
			});

		},
		serveModules: function(){
			this.activeModules = SearchApp.request("active:modules:entities");
				for(var i = 0, j = this.activeModules.length; i < j; i++){
					if(this.moduleInteractionIn.hasOwnProperty( this.activeModules[i].module )){
      			this.moduleInteractionIn[this.activeModules[i].module]();	
      		}
      		
      	}
		},

		
		
		renderView: function(results){
			this.resultsView = new Results.CollectionView({
					collection: results
			});
			SearchApp.mainRegion.show(this.resultsView);
			this.resultsView.on("results:show:item", function(e){
				SearchApp.trigger("results:show:item", e);
			})
			this.resultsView.setTiles();
			//Results.Controller.resultsView = resultsView;
			this.serveModules();
			
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