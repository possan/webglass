var pEvent = [];
var Events = 0;

function event_run(time, beat) {
	gl_trianglecounter = 0;
	var allnames = [];
	for ( var i = 0; i < nEvents; i++) {
		var e = pEvent[i];
		if (time >= e.start_time && time < e.end_time) {
			var e2 = {
				globalTime : time,
				globalBeat : beat,
				customData : e.custom,
				localTime : time - e.start_time,
				localBeat : 0,
				renderAmount : Math.sin((time - e.start_time) * 3.142
						/ e.delta_time)
			};
			// glPushMatrix();
			e.routine(e2);
			var name=/\W*function\s+([\w\$]+)\(/.exec(e.routine)[1];
			allnames.push( name );
			// glPopMatrix();
		}
	}
	
	// if( console && console.log ) console.log(time + " tris="+gl_trianglecounter+", eff="+allnames.join(','));
}

function event_register(starttime, endtime, er, custom) {
	var e = {
		start_time : starttime,
		end_time : endtime,
		delta_time : endtime - starttime,
		routine : er,
		custom : custom
	};
	pEvent.push(e);
	nEvents++;
}

function event_init() {
	// for( int i=0; i<1024; i++ )
	// pEvent[i] = NULL;
	pEvent = [];
	nEvents = 0;
}

function event_free() {
	// for( int i=0; i<1024; i++ )
	// if( pEvent[i] != NULL )
	// delete pEvent[i];
}
