SearchApp.module("Map", function(Map, SearchApp, Backbone, Marionette, $, _){
	Map.Controller = {
		mapView: {},
		moduleInteractionIn: {
			
		},
		initializeMap: function(){
			this.mapView = new Map.MapView({});
			SearchApp.mapRegion.show(this.mapView);

		},
		populateMap: function(){
			var fetchingResults = SearchApp.request("access:results:entities");
			var that = this;
			that.mapView.showObjects(fetchingResults);		
			that.mapView.on("map:marker:click", function(e){
				SearchApp.trigger("map:filter:results", e);
			});
			that.mapView.on("map:reset", function(){
				
				SearchApp.trigger("map:reset:results");
			});

		},
		serveModules: function(){
			console.log('serving map module');
		}
	}
})