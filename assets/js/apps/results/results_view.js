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
    tagName: 'ul',
    initialize: function(){
    	this.$el.prop('id', 'tiles');

    },
    
    events: {
    	"mouseover #main #tiles li.tile": "editClicked",
    	"click li": "editClicked"
    },
	editClicked: function(){
	
	},
    itemView: Results.ItemView,
    setTiles: function(opt){
    	var opt = opt || {};
    	this.handler = $('#tiles li');

	    var options = {
	    	autoResize: true, // This will auto-update the layout when the browser window is resized.
	        container: $('#main'), // Optional, used for some extra CSS styling
	        offset: 5, // Optional, the distance between grid items
	        outerOffset: 5, // Optional, the distance to the containers border
	        itemWidth: 110 // Optional, the width of a grid item
	    	
	    }
	    
	    if(opt.collection === true){
	    	$("#tiles li .tile").append('<div class="collection-menu"><span class="icon-add"> </span><span class="icon-view"> </span></div>');
    		
    	}
	    this.handler.wookmark(options);
	    
	    
    },
    addCollectionTools:function(){
    	var options = {'collection' : true };
    	this.setTiles(options);
        that = this;
    	$('.icon-view').on("click", function(e){
    		e.preventDefault();
    		e.stopPropagation();
    		console.log($(this).parent().parent().attr('data-id'));
            that.trigger("results:show:item", $(this).parent().parent().attr('data-id'));

    	});
    }
  });

})