SearchApp.module("Results", function(Results, SearchApp, Backbone, Marionette, $, _){
	Results.ItemView = Marionette.ItemView.extend({
		tagName: "li",
    template: Handlebars.compile($("#results-layout").html())
	});
	

  Results.CollectionView = Marionette.CollectionView.extend({
    el: "#tiles",
    itemView: Results.ItemView,
    setTiles: function(){
    	var handler = $('#tiles li');

	    var options = {
	    	autoResize: true, // This will auto-update the layout when the browser window is resized.
	        container: $('#main'), // Optional, used for some extra CSS styling
	        offset: 5, // Optional, the distance between grid items
	        outerOffset: 5, // Optional, the distance to the containers border
	        itemWidth: 110 // Optional, the width of a grid item
	    	
	    }
	    
	    handler.wookmark(options);
    }
  });

})