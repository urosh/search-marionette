Marionette.Region.Dialog = Marionette.Region.extend({
  onShow: function(view){
    this.listenTo(view, "dialog:close", this.closeDialog);

    var self = this;
    
    var overlay = $('.md-overlay' );
    
    var modal = $('.md-modal' ),
      close = $('.md-close' );
    
      
      
    setTimeout(function(){
      modal.addClass('md-show' );
    }, 1);

    function removeModalHandler() {
        modal.removeClass('md-show' );
    }
    overlay.on( 'click', removeModalHandler );

    close.on('click', function( ev ) {
      ev.stopPropagation();
      removeModalHandler();
    });
  },
  onRender:function(view){
    console.log('ohoj');
  },

  closeDialog: function(){
    this.stopListening();
    this.close();
    this.$el.dialog("destroy");
  }
});