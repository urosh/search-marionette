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
			console.log('ok we are running the search with: ' + query );
		}
	}

	SearchApp.reqres.setHandler("searchInits:entities", function(){
    return API.getSearchInits();
  });

})