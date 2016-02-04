jQuery(function($) {

	trailSelect = $('#trail-selector')
  trailSelect.on('change', function(){
  	optionSelected = $("option:selected", this);
    valueSelected = this.value;
    console.log('Val: ' + valueSelected);
    $.get( "https://demo9253916.mockable.io/api/alltrails/trails/"+ valueSelected, function( data ) {
		  debugger;
		  alert( "Call done" );
		});
  }
 );


});