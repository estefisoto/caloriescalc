jQuery(function($) {

	trailSelect = $('#trail-selector').first();
	distanceInput = $('#dist');
	elevGainInput = $('#elevg');
	paceValInput = $('#pace');
	paceDisplayTextInput = $('#pace-text');
	weightValInput = $('#weight');
	weightDisplayTextInput = $('#weight-text');
	trailSelectedId = trailSelect.val();
	// To convert meters to miles
	meter_const = 1609.34

	// set defaul value for sliders
	paceDisplayTextInput.val(paceValInput.val());
	weightDisplayTextInput.val(weightValInput.val());


	getElevationStats = function(trailId){
		$.get( "https://demo9253916.mockable.io/api/alltrails/trails/"+ trailId, function( data ) {
			result = data.trails[0];
			geoStats = result.trailGeoStats;
			distanceMi = parseFloat(geoStats.length)/meter_const;
			elevationGainMi = parseFloat(geoStats.elevationGain)/meter_const;
			distanceInput.val(distanceMi.toFixed(2));
			elevGainInput.val(elevationGainMi.toFixed(2));
		});
	}

	trailSelect.on('change', function(){
		trailSelectedId = this.value;
		getElevationStats(trailSelectedId);
	});

	paceValInput.on('change', function(){
		paceDisplayTextInput.val(this.value);
	});
	weightValInput.on('change', function(){
		weightDisplayTextInput.val(this.value);
	});

	 // Let's set the values for default select - read only for form so user cant change this
	getElevationStats(trailSelectedId);

});