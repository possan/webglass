// aftershit
// #include "almosteverything.h"
// #include "images.h"
var _pd = [];
var _pu = [];
var _pv = [];

function pas_drawbackground(t1, t2, scale, br) {
	var i, j;

	// hˆjdmap
	for (j = 0; j < 30; j++) {
		for (i = 0; i < 40; i++) {
			var o = j * 40 + i;
			_pd[o] = 2;
			_pd[o] += 3 * Math.cos((j - t2) / 5.4) * Math.cos((i - t1) / 6.1);
			_pd[o] += 2 * Math.sin((i - t1) / 3.4);
			_pd[o] += 2 * Math.cos((j - t2) / 4.0);
			_pu[o] = 0.5 + (((i - 20) * scale) / 20.0);
			_pv[o] = 0.5 + (((j - 15) * scale) / 15.0);
		}
	}

	// envmap
	for (j = 1; j < 29; j++) {
		for (i = 1; i < 39; i++) {
			var o = j * 40 + i;
			var ny = _pd[o + 40] - _pd[o - 40];
			var nx = _pd[o + 1] - _pd[o - 1];
			_pu[o] += (nx / 3.0);
			_pv[o] += (ny / 3.0);
		}
	}
	// render
	glBegin(GL_QUADS);
	for (j = 1; j < 29; j++) {
		for (i = 1; i < 39; i++) {
			var o = (j * 40) + i;
			var x = (i - 20.0) / 20.0;
			var y = (j - 15.0) / 15.0;
			var x2 = (i - 19.0) / 20.0;
			var y2 = (j - 14.0) / 15.0;
			x *= 1.07;
			y *= 1.07;
			x2 *= 1.07;
			y2 *= 1.07;

			glColor3f(br, br, br);

			glTexCoord2f(_pu[o], 1 - _pv[o]);
			glVertex3f(x, y, 0);

			glTexCoord2f(_pu[o + 1], 1 - _pv[o + 1]);
			glVertex3f(x2, y, 0);

			glTexCoord2f(_pu[o + 41], 1 - _pv[o + 41]);
			glVertex3f(x2, y2, 0);

			glTexCoord2f(_pu[o + 40], 1 - _pv[o + 40]);
			glVertex3f(x, y2, 0);
		}
	}
	glEnd();
};

function pas_renderfade(t) {
	// gl.disable(GL_TEXTURE_2D);
	glBegin(GL_QUADS);
	var magic = 0.5 / 10.0;
	for ( var i = 0; i <= 20; i++) {

		var t2 = t - i / 5.0;
		if (t2 > 0) {
			if (t2 > 1.0)
				t2 = 1.0;

			var x = (i - 10.5) / 10.0;
			var w = magic - (t2);
			w = t2 * (magic);
			if (w > magic)
				w = magic;

			// var b = t2;
			glColor3f(t2, t2, t2);

			glVertex3f(x - w, -1, 0);
			glVertex3f(x + w, -1, 0);
			glVertex3f(x + w, 1, 0);
			glVertex3f(x - w, 1, 0);
		}
	}
	glEnd();
}

function pas_drawtitle(t) {

	// glColor3f( b*1*s3, b*s3*0.5f + b*0.3f*Math.sin(time*7+y), b*s3*0.5f +
	// b*0.3f*Math.cos(time*7-y) );

	var fadein = 0;
	if (t < 2)
		fadein = 2.0 - 2.0 * Math.sin(t * 3.142 / 4.0);
	if (t > 4)
		fadein = 2.0 - 2.0 * Math.sin((6 - t) * 3.142 / 4.0);

	glaSetTexture(GIF_PSIKORP3);

	glBegin(GL_QUADS);
	glColor3f(1, 1, 1);
	glaQuadR(fadein, 0, 0, 0, 0.6, 0.2, 0, 1, 1, 0);
	glEnd();

	glaSetTexture(GIF_FONT);

	glBegin(GL_QUADS);
	glColor3f(1, 1, 1);
	glaDrawString(-fadein, 0.3, 0, 0.033, 0.033, 0.1, "glass  (c)2000");
	// glaDrawString( 0, -0.3f+fadein, 0, 0.033f, 0.033f, 0.1f, "penguins
	// sucks!" );
	glaDrawString(0, -0.3 + fadein, 0, 0.025, 0.025, 0.05, "r.i.p lolo ferrari");
	glEnd();
}

function pas_drawcreds(t) {
	// glColor3f( b*1*s3, b*s3*0.5f + b*0.3f*Math.sin(time*7+y), b*s3*0.5f +
	// b*0.3f*Math.cos(time*7-y) );

	var fadein = 0;
	if (t < 2)
		fadein = 2.0 - 2.0 * Math.sin(t * 3.142 / 4.0);
	if (t > 4)
		fadein = 2.0 - 2.0 * Math.sin((6 - t) * 3.142 / 4.0);

	glaSetTexture(GIF_FONT);
	glBegin(GL_QUADS);
	glColor3f(1, 1, 1);

	glaDrawString(-fadein * 1.7, 0.6, 0, 0.03, 0.03, 0.04, "illuminator");
	glaDrawString(fadein * 1.6, 0.5, 0, 0.03, 0.03, 0.04, "code, graphics");
	glaDrawString(0, 0.05 - fadein * 1.1, 0, 0.03, 0.03, 0.04, "h-ecs");
	glaDrawString(fadein * 1.97, -0.05, 0, 0.03, 0.03, 0.04, "music, graphics");
	glaDrawString(0, -0.5 + fadein * 0.7, 0, 0.03, 0.03, 0.04,
			"hanzon, summlan, weird ed");
	glaDrawString(fadein * 1.42, -0.6 - fadein * 0.84, 0, 0.03, 0.03, 0.04,
			"ideas");
	glEnd();

}

function p_aftershit_run(e) {
	var t;

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	glTranslatef(0, 0, 0);

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();

	gl.disable(gl.CULL_FACE);
	// gl.clearColor( 0,0,0,0 );
	gl.disable(gl.FOG);

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);
	// glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );

	// glDisable( GL_DEPTH_TEST );

	t = e.localTime;

	// pt_draw_dudes( t );

	// for( var k=0; k<1; k+=0.33f ) {
	// var k=0;
	// var t2 = t - (k/10.0f);

	glaSetTexture(GIF_CLOUDS);

	// pas_drawbackground( t2*13, t2*17, 1.0f + k*2.0f, 1.0f - (k/4.0f) );
	pas_drawbackground(t * 10, t * 7, 1.0, 0.25);
	// };

	// glBlendFunc( GL_ONE, GL_ONE_MINUS_SRC_COLOR );

	if (t > 4 && t < 10)
		pas_drawtitle(t - 4.0);

	if (t > 10 && t < 16)
		pas_drawcreds(t - 10.0);

	if (t < 1.25)
		pas_renderfade((1.25 - t) * 4);

}
