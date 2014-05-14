Marionette.Region.Dialog = Marionette.Region.extend({
  onShow: function(view){
    this.listenTo(view, "dialog:close", this.closeDialog);

    var self = this;
    
    var overlay = $('.md-overlay' );
    
    var modal = $('.md-modal' ),
      close = $('.md-icon-close' );
    
      
      
    setTimeout(function(){
      modal.addClass('md-show' );
      //modal.append("<input type='button' class='close-modal'/>")
    }, 1);

    function removeModalHandler() {
        //this.close();
        modal.removeClass('md-show' );
    }
    overlay.on( 'click', removeModalHandler );

    close.on('click', function( ev ) {
      ev.stopPropagation();
      removeModalHandler();
    });
  },
  

  
});