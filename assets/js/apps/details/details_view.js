SearchApp.module("Details", function(Details, SearchApp, Backbone, Marionette, $, _){
	Details.View = Marionette.ItemView.extend({
		template: Handlebars.compile($("#details-template").html()),
		initialize: function(){
			console.log(this.options.modal);
		},
		onShow: function(){
      if(this.options.modal) {
        $('.md-modal > div').addClass('md-content');
      }
    }
	})
})