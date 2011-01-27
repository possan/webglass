// twister...
// #include "almosteverything.h"
// #include "images.h"

var NSIDES = 5;
var pt_x = [];
var pt_b = [];
var pt_c = [];

function pt_funktionen_f(t, offset) {
	var f;
	f = t / 1;
	f -= offset / 4;
	f += Math.sin(t - offset + 42);
	// f -= 3*Math.cos( t/2+offset+4 );
	f -= 2 * Math.sin((t + 32) / 3 - offset);

	// if( offset>0.5 ) f = -f;
	// f += Math.cos( t+offset*2 );
	// f -= Math.sin( t-offset*2 );
	f *= 3;
	return f;
};

function ptffff(time) {
	if (time < 1.5) {
		return -2.5 + 2.0 * Math.sin(time * M_PI / 3.0);
		// return 0.65f;
	}
	;

	if (time > 8.0) {
		return -2.5 + 2.0 * Math.sin((10.0 - time) * M_PI / 4.0);
		// return 0.65f;
	}
	;

	// if( time > 8 ) {
	// return 0.35f;
	// };
	return -0.5;
};

function pt_draw(t) {

	var i, j;

	/*
	 * pt_c[0][0] = 0.7f; pt_c[0][1] = 0.7f; pt_c[0][2] = 0.5f; pt_c[1][0] =
	 * 0.5f; pt_c[1][1] = 0.0f; pt_c[1][2] = 0.8f; pt_c[2][0] = 0.8f; pt_c[2][1] =
	 * 0.8f; pt_c[2][2] = 0.5f; pt_c[3][0] = 0.0f; pt_c[3][1] = 0.5f; pt_c[3][2] =
	 * 0.8f; pt_c[4][0] = 0.7f; pt_c[4][1] = 0.5f; pt_c[4][2] = 0.6f;
	 */
	for (i = 0; i < 110; i++) {
		var a = pt_funktionen_f(t, i / 75.0);

		var r = 0.3 + 0.15 * Math.cos(a - t * 3);

		for (j = 0; j < NSIDES; j++) {
			var a2 = a + M_PI * j / (NSIDES / 2.0);
			pt_x[i * NSIDES + j] = r * Math.sin(a2);
			pt_b[i * NSIDES + j] = 0.7 + 0.4 * Math.cos(a2);
		}
	}

	gl.disable(GL_TEXTURE_2D);
	gl.enable(GL_BLEND);
	gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
	glBegin(GL_QUADS);

	for (i = 0; i < 100; i++) {

		var y1 = (i - 50) / 50.0;
		var y2 = (i + 1 - 50) / 50.0;

		var xd1 = ptffff(t - (i / 100.0));
		var xd2 = ptffff(t - ((i + 1) / 100.0));

		for (j = 0; j < NSIDES; j++) {

			var x1 = pt_x[i * NSIDES + j];
			var x2 = pt_x[i * NSIDES + ((j + 1) % NSIDES)];
			var x3 = pt_x[(i + 1) * NSIDES + ((j + 1) % NSIDES)];
			var x4 = pt_x[(i + 1) * NSIDES + j];

			var j2 = j;// loat)j + (int)t;

			var v1 = 1 - (i / 100.0);
			var v2 = 1 - ((i + 1) / 100.0);

			var b1 = pt_b[i * NSIDES + j];
			// var b2 = pt_b[i+1][j];

			if (x2 <= x1) {

				var u1 = j2 * 0.25;
				var u2 = (j2 + 1) * 0.25;

				// glColor3f( Math.cos(j/3)*b1, Math.sin(j/2)*b1, Math.cos(j)*b1
				// );
				glColor3f(0.3, 0.28, 0.26);

				glVertex3f(xd1 + x1 * 1.2 + 0.2, y1, 0);
				glVertex3f(xd1 + x2 * 1.2 + 0.2, y1, 0);
				glVertex3f(xd2 + x3 * 1.2 + 0.2, y2, 0);
				glVertex3f(xd2 + x4 * 1.2 + 0.2, y2, 0);

			}
			;

		}
		;

	}
	;

	glEnd();

	gl.disable(GL_BLEND);
	glaSetTexture(GIF_TWISTER2);
	// glTexEnvi( GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );

	glBegin(GL_QUADS);

	for (i = 0; i < 100; i++) {

		var y1 = (i - 50) / 50.0;
		var y2 = (i + 1 - 50) / 50.0;

		var xd1 = ptffff(t - (i / 100.0));
		var xd2 = ptffff(t - ((i + 1) / 100.0));

		for (j = 0; j < NSIDES; j++) {

			var x1 = pt_x[i * NSIDES + j];
			var x2 = pt_x[i * NSIDES + ((j + 1) % NSIDES)];
			var x3 = pt_x[(i + 1) * NSIDES + ((j + 1) % NSIDES)];
			var x4 = pt_x[(i + 1) * NSIDES + j];

			var j2 = j;// loat)j + (int)t;

			var v1 = 1 - (i / 100.0);
			var v2 = 1 - ((i + 1) / 100.0);

			var b1 = pt_b[i][j];
			// var b2 = pt_b[i+1][j];

			if (x2 <= x1) {

				var u1 = j2 * 0.25;
				var u2 = (j2 + 1) * 0.25;

				u1 = 0;
				u2 = 1;

				// glColor3f( Math.cos(j/3)*b1, Math.sin(j/2)*b1, Math.cos(j)*b1
				// );
				glColor3f(pt_c[j][0], pt_c[j][1], pt_c[j][2]);

				glTexCoord2f(u1, v1);
				glVertex3f(x1 + xd1, y1, 0);

				glTexCoord2f(u2, v1);
				glVertex3f(x2 + xd1, y1, 0);

				glTexCoord2f(u2, v2);
				glVertex3f(x3 + xd2, y2, 0);

				glTexCoord2f(u1, v2);
				glVertex3f(x4 + xd2, y2, 0);

			}
		}
	}
	glEnd();

}

/*
 * function pt_draw_dudes( var t ) { glEnable( GL_BLEND ); glBlendFunc(
 * GL_ONE_MINUS_SRC_COLOR, GL_DST_COLOR );
 * 
 * glaSetTexture( GIF_FACES ); glBegin( GL_QUADS );
 * 
 * //glColor3f( 1, 1, 1 ); //glaQuadR( 0, 0, 0, 0, 0.25f, 0.25f, 0.45f, 0.6f, 1,
 * 0 );
 * 
 * for( var k=0; k<15; k++ ) {
 * 
 * var t2 = t - (k/14); //var r = var b = 1 - (k/7.0f); var r = 1.0f +
 * (k/30.0f);
 * 
 * //var xr = 1.0f + 0.5f*Math.cos( t2 * 5 ); //var yr = 1.0f + 0.5f*Math.sin(
 * t2 * 6 );
 * 
 * var a = (170*Math.cos(t2*2) + 170*Math.sin(t2*3) + 170*Math.sin(t2/3));
 * 
 * //a = 0;
 * 
 * glColor3f( b, b, b ); glaQuadR( 0.6f, 0, 0, a, r, r, 0, 1, 1, 0 ); };
 * 
 * glEnd(); };
 */

function p_twister_run(e) {
	/*
	 * var t;
	 * 
	 * glMatrixMode( GL_PROJECTION ); glLoadIdentity(); glTranslatef( 0, 0, -1 );
	 * 
	 * glMatrixMode( GL_MODELVIEW ); glLoadIdentity();
	 * 
	 * glDisable( GL_CULL_FACE );
	 * 
	 * glClearColor( 1, 1, 1, 1 );
	 * 
	 * glDisable( GL_BLEND ); glClearDepth( 20 ); glDisable( GL_DEPTH_TEST );
	 * 
	 * glDisable( GL_FOG );
	 * 
	 * //glDisable( GL_DEPTH_TEST );
	 * 
	 * t = e->localTime;
	 * 
	 * //pt_draw_dudes( t );
	 * 
	 * pt_draw( t );
	 * 
	 * glDisable( GL_FOG );
	 */
};
