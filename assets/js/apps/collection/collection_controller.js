SearchApp.module("Collection", function(Collection, SearchApp, Backbone, Marionette, $, _){
	Collection.Controller = {
		collectionView: {},
		initializeModule: function(){
			
			$('#collection-region').slideDown();
			
			this.collectionView = new Collection.CollectionItemView();
			//SearchApp.dialogRegion.show(this.collectionView);
			SearchApp.collectionRegion.show(this.collectionView);
			
			SearchApp.trigger("module:active:notification", "collection");

		},
		removeModule: function(){
			$('#collection-region').slideUp();
			this.collectionView.remove();
			// remove collection view 
			
		},
		serveModules: function(){
			console.log('serving collection module');
		}
	}
})