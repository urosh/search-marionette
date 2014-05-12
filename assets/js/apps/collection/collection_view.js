SearchApp.module("Collection", function(Collection, SearchApp, Backbone, Marionette, $, _){
	Collection.CollectionItemView = Marionette.ItemView.extend({
		template: Handlebars.compile($('#new-collection').html()),
		className: 'md-content'
	});

	Collection.CollectionsModuleView = Marionette.CompositeView.extend({
		template: "#new-collection",
		itemView: Collection.CollectionItemView,
		itemViewContainer: "#items"
	});

})