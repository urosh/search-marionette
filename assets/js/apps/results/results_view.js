SearchApp.module("Results", function(Results, SearchApp, Backbone, Marionette, $, _){
	Results.ItemView = Marionette.ItemView.extend({
		
		tagName: "li",
		className: "tile",
    template: Handlebars.compile($("#results-layout").html()),
    events:{
    	"click #main #tiles li": "hov",
    	"mouseover #main #tiles li": "hov"
    	
    },
    hov: function(e){
    	//e.preventDefault();
    	console.log('we are hovering');
    }
	});
	

  Results.CollectionView = Marionette.CollectionView.extend({
    el: "#tiles",
    
    events: {
			"mouseover #main #tiles li.tile": "editClicked",
			"click li": "editClicked"
		},
		editClicked: function(){
			console.log('ajme');
		},
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
	    handler.on("mouseover", function(e){
	    	//console.log(handler);
	    });
	    $("#tiles li .tile").on("mouseover", function(e){
	    	$(this).append('<p>ajmo</p>');
	    	handler.wookmark(options);
	    })
    }
  });

})