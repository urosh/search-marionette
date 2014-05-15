SearchApp.module("Search.Entities", function(Entities, SearchApp, Backbone, Marionette, $, _){
	//ok here i need to have model, 
	//collection 
	//for initializing search first. 
	Entities.SearchInitModel = Backbone.Model.extend({
		
		url: 'http://public.cyi.ac.cy/starcRepo/map/init',
	});

	Entities.Details = Backbone.Model.extend({
		
		url: 'http://public.cyi.ac.cy/starcRepo/map/details',
	});

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

	Entities.Collection = Backbone.Collection.extend({

	});

	Entities.CollectionsCollection = Backbone.Collection.extend({
		model: Entities.Collection
	});

	Entities.collectionsCollection = new Entities.CollectionsCollection();



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
					Entities.results = {};
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
		
		getItemDetails: function(e){
			var item = new Entities.Details();
			var defer = $.Deferred();
			item.fetch({
				data: {'docID': e},
				success: function(res){
					console.log(res);
					// process the result into correct format
					
					Entities.item = res;
					defer.resolve(res);
				},
				error: function(res){
					defer.resolve(undefined);
				}
			});
			
			return defer.promise();
		},
		getObjectDetailsId: function(e){
			Entities.results.each(function(item){
			//console.log(item.get('lat') + " -- " + parseFloat(e[0].toFixed(5)));
				if( item.get('docID') === e ) {

					var newId = Entities.collectionsCollection.length + item.get('id');
					item.set({'id': newId});
					Entities.collectionsCollection.add(item)
					return(item);
				}
			});
			return {};
		},
		getCollectionsData: function(){
			return Entities.collectionsCollection;
		}


		
	}

	SearchApp.reqres.setHandler("getInits:search:entities", function(){
    return API.getSearchInits();
  });

  SearchApp.reqres.setHandler("getResults:search:entities", function(query){
    
    return API.getResults(query);
  });

  SearchApp.reqres.setHandler("accessResultsData:search:entities", function(){
  	return API.getExistingResults();
  });

  SearchApp.reqres.setHandler("filterResults:search:entities", function(e){
  	return API.getFilteredResults(e);
  });
  /* Module entities */
  

  SearchApp.reqres.setHandler("details:entities", function(e){
  	return API.getItemDetails(e);
  });

  SearchApp.reqres.setHandler("get:object:id", function(e){
  	
  	return API.getObjectDetailsId(e);
  });

  SearchApp.reqres.setHandler("get:collections:data", function(e){
  	
  	return API.getCollectionsData();
  });


  

})