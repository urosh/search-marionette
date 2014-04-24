SearchApp.module("Search", function(Search, SearchApp, Backbone, Marionette, $, _){
	

	Search.InitView = Marionette.ItemView.extend({
		template: Handlebars.compile($("#search-layout").html()),
        events: {
        	"click .advancedSearchLink": "advancedSearch",
            "click .searchButton" : "runSearch"
        },
        advancedSearch: function(e){
            e.preventDefault();
        	e.stopPropagation();
        	$('.advancedSearchLink a').toggleClass('down');
            $('#advancedSearch').toggle();
        },
        runSearch: function(){
            // ok now i need to send search object to where it needs to go.
            var query = {
                search: '',
                types: [],
                collections: []
            };

            query.search = $('#searchQuery').val();
            $('.types :checkbox').each(function() {
                if(this.checked){
                    query.types.push($(this).val());
                }   
            });

            $('.collections :checkbox').each(function() {
                if(this.checked){
                    query.collections.push($(this).val());
                }   
            });
            this.trigger('search:run', query);
        }
	});
	
	
	
})