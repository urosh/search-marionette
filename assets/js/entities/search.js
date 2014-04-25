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

	})

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
					console.log('we are here');
					defer.resolve(res);
				},
				error: function(res){
					defer.resolve(undefined);
				}
			});
			return defer.promise();
		}
	}

	SearchApp.reqres.setHandler("searchInits:entities", function(){
    return API.getSearchInits();
  });

  SearchApp.reqres.setHandler("results:entities", function(query){
    
    return API.getResults(query);
  });


})