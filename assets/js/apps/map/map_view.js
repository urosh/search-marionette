SearchApp.module("Map", function(Map, SearchMap, Backbone, Marionette, $, _){
	Map.MapView = Marionette.ItemView.extend({
		className: 'map',
		initialize: function(){
			this.markers = [];
		},

		render: function(){
			var myLatlng = new google.maps.LatLng(35.06, 33.270);
		  var mapOptions = {
	      center: (myLatlng),
	      streetViewControl: false,
	  		zoom: 8
	    };
	    
	    this.map = new google.maps.Map(this.el, mapOptions);
		},

		showObjects: function(results){
			this.clearMap();

			results.each(this.addMarker, this);
		},

		clearMap: function(){
			for(var i = 0, l = this.markers.length; i < l; i++){
				this.markers[i].setMap(null);
			}
			this.markers = [];
		},

		addMarker: function(item){
			var addThisMarker = true;
			if ( ( parseInt(item.get('lat')) === 0 ) || ( parseInt(item.get('lat')) === 0 )  ){
				addThisMarker = false;

				//console.log('ajme mene opet1 ' + item.get('lat'));
			}else{
				for(var i = 0, l = this.markers.length; i < l; i++){
					if(parseFloat(this.markers[i].position.k.toFixed(5)) === parseFloat(item.get('lat')) && parseFloat(this.markers[i].position.A.toFixed(5)) === parseFloat(item.get('lng'))){
							addThisMarker = false;
							
					}			//console.log(this.markers[i].position.k);
					
				}	
			}
			
			if(addThisMarker){
				var marker = new google.maps.Marker({
			    position: new google.maps.LatLng(item.get('lat'), item.get('lng')),
			    map: this.map,
			    title:"nonclicked"
				});
				marker.setMap(this.map);
				google.maps.event.addListener(marker, 'click',   _.bind(this.markerClicked, this));
				this.markers.push(marker);	
			}
		},

		markerClicked: function(e){
			for(var i = 0, j = this.markers.length; i < j; i++){
				if( this.markers[i].position.k == e.latLng.k && this.markers[i].position.A == e.latLng.A ){
				}else{
					this.markers[i].setIcon(null);
					this.markers[i].setTitle('nonclicked');	
				}
			}
			
			for(var i = 0, j = this.markers.length; i < j; i++){
				if( this.markers[i].position.k == e.latLng.k && this.markers[i].position.A == e.latLng.A ){
					
					if(this.markers[i].title == 'nonclicked'){
						this.markers[i].setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
						
						this.markers[i].setTitle('clicked');
						// ok now i want to replace this marker color to green. 
						this.trigger("map:marker:click", [e.latLng.k, e.latLng.A]);	
					}else{

						this.markers[i].setIcon(null);
						this.trigger("map:reset");	
					}
					
					
				}
			}
			
		}

	})
})