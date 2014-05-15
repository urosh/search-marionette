SearchApp.module("Collection", function(Collection, SearchApp, Backbone, Marionette, $, _){
	Collection.CollectionItemView = Marionette.ItemView.extend({
		template: Handlebars.compile($('#collection-item').html()),
		className: 'item-container'
	});

	Collection.CollectionModuleView = Marionette.CompositeView.extend({
		className: "collection-div",
		template: '#new-collection',
		itemView: Collection.CollectionItemView,
		itemViewContainer: "#collection-content",
		
	});

})