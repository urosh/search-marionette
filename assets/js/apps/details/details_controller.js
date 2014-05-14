SearchApp.module("Details", function(Details, SearchApp, Backbone, Marionette, $, _){
	Details.Controller = {
		moduleInteractionIn:{},
		initializeModule: function(e){
			var loadingView = new SearchApp.Common.Views.Loading({modal: true});
      SearchApp.dialogRegion.show(loadingView);

			var fetchingDetails = SearchApp.request("details:entities", e);
			$.when(fetchingDetails).done(function(item){
				var detailsView = new SearchApp.Details.View({
					model: item, 
					modal: true
				});
				
				SearchApp.dialogRegion.show(detailsView);
				
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

	}
})