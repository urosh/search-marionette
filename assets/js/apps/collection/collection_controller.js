SearchApp.module("Collection", function(Collection, SearchApp, Backbone, Marionette, $, _){
	Collection.Controller = {
		collectionView: {},
		moduleInteractionIn:{},
		initializeModule: function(){
			
			$('#collection-region').slideDown();
			
			// ok i need here collectonData collection
			

			SearchApp.trigger("module:active:notification", "collection");
			this.collection = SearchApp.request("get:collections:data");
			

			this.collectionView = new Collection.CollectionModuleView({
				collection : this.collection
			});
			//SearchApp.dialogRegion.show(this.collectionView);
			SearchApp.collectionRegion.show(this.collectionView);

		},
		

		removeModule: function(){
			$('#collection-region').slideUp();
			this.collectionView.remove();
			// remove collection view 
			
		},
		serveModules: function(){
			
			this.activeModules = SearchApp.request("getActiveModules:modules:entities");
			for(var i = 0, j = this.activeModules.length; i < j; i++){
				if(this.moduleInteractionIn.hasOwnProperty( this.activeModules[i].module )){
    			this.moduleInteractionIn[this.activeModules[i].module]();	
    		}
    		
    	}
		
		}
	}
})