// klask

// fullscreen part
// #include "almosteverything.h"
// #include "images.h"
// #include <stdlib.h>

/*#define FULLSCREEN_PIC1 61
 #define FULLSCREEN_PIC2 62
 #define FULLSCREEN_PIC3 63*/

//#define KLASK_PIC 81
var KLASK_CYLINDER = 82;
var NSIDES = 7;
var NROWS = 30;
var NOBJECTS = 6;

var klr = [];

function p_klask_list() {

	Math.seedrandom(12345);
	for ( var k = 0; k < NOBJECTS; k++) {
		klr.push(Math.random() * 360);
		klr.push(Math.random() * 360);
		klr.push(Math.random() * 360);
	}
	;

	var lxc, xc, lyc, yc, lzc, zc, lvc, vc, zd, vd, lra, ra;

	zd = 5.0 / NROWS;
	vd = 1.0 / NROWS;

	xc = 0;
	yc = 0;
	zc = zd;
	vc = vd;

	lra = 0.3;
	lxc = 0;
	lyc = 0;
	lzc = 0;
	lvc = 0;

	for ( var r = 0; r < NROWS; r++) {

		var b = 0.5 - ((r / NROWS) / 2.0);
		ra = 0.3 / (r / 2.0 + 1.0);
		// glColor3f( 0.8*b, 0.9*b, 1.0*b );

		for ( var c = 0; c < NSIDES; c++) {

			var x1 = Math.cos((c + 0) * M_PI / (NSIDES / 2));
			var y1 = Math.sin((c + 0) * M_PI / (NSIDES / 2));
			var x2 = Math.cos((c + 1) * M_PI / (NSIDES / 2));
			var y2 = Math.sin((c + 1) * M_PI / (NSIDES / 2));

			var u1 = c / NSIDES;
			var u2 = (c + 1) / NSIDES;

			// glColor3f( c/NSIDES, r/NROWS, 0 );

			// glNormal3f( x1*x2, 0, y1*y2 );

			glColor3f(b, b, b);

			glTexCoord2f(u1, vc);
			glVertex3f(ra * x1 + xc, zc, ra * y1 + yc);

			glTexCoord2f(u2, vc);
			glVertex3f(ra * x2 + xc, zc, ra * y2 + yc);

			// glColor3f( b1,b1,b1 );

			glTexCoord2f(u2, lvc);
			glVertex3f(lra * x2 + lxc, lzc, lra * y2 + lyc);

			glTexCoord2f(u1, lvc);
			glVertex3f(lra * x1 + lxc, lzc, lra * y1 + lyc);
		}
		;

		lxc = xc;
		lyc = yc;
		lzc = zc;
		lvc = vc;
		lra = ra;

		// xc += ((rand()%200) - 100.0f) / 200.0f;
		// yc += ((rand()%200) - 100.0f) / 200.0f;

		xc += 0.05 * Math.cos(r / 4.3);
		yc += 0.05 * Math.sin(r / 3.6);
		// xc += Math.sin( r / 8.7f );
		// yc += Math.cos( r / 8.1f );

		zc += zd;
		vc += vd;

		// ra += 0.01f;

	}
}

function p_klask_init() {
	// glaUploadGif( KLASK_PIC, (unsigned char *)&gif_rost, 123 );
	/*
	 * glNewList( KLASK_CYLINDER, GL_COMPILE ); glEndList();
	 */
};

function p_klask_run(e) {

	var t;

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	glTranslatef(0, 0, -1);

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();

	gl.disable(gl.CULL_FACE);
	// glCullFace( GL_BACK );

	gl.disable(gl.DEPTH_TEST);

	gl.disable(gl.FOG);

	t = e.localTime;

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);

	glMatrixMode(GL_MODELVIEW);

	// for( float step=0; step<10; step+=3 ) {

	var t2 = t;// - (step/20.0f);

	glLoadIdentity();
	// glFrustum( -1, 1, -0.75, 0.75, 0.1, 1 );
	gluPerspective(105, 4 / 3, 1, 1000);
	// MATRIX m;
	gluLookAt(5 * Math.cos(t2 / 6), 5 * Math.cos(t2 / 7), 5 * Math.sin(t2 / 5),
			5 * Math.cos(t2 / 5), 5 * Math.cos(t2 / 4), 5 * Math.sin(t2 / 3),
			0, 1, 0);

	glaSetTexture(GIF_CLOUDS);
	// glTexEnvi( GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );

	var br = 0.5 * e.renderAmount;// / fmod(b*2,4.0f);

	for ( var n = 0; n < NOBJECTS; n++) {
		glPushMatrix();

		glRotatef(t2 * 17 + klr[n * 3 + 0], 1, 0, 0);
		glRotatef(t2 * 12 - klr[n * 3 + 1], 0, 1, 0);
		glRotatef(t2 * 10 + klr[n * 3 + 2], 0, 0, 1);
		glRotatef(Math.cos(t2 + n) * 20, 0, 1, 1);
		glRotatef(Math.sin(t2 - n * 3) * 20, 1, 0, 1);

		glBegin(GL_QUADS);
		switch (n % 3) {
		case 0:
			glColor3f(0.6 * br, 0.4 * br, 0.2 * br);
			break;
		case 1:
			glColor3f(0.3 * br, 0.7 * br, 0.4 * br);
			break;
		case 2:
			glColor3f(0.2 * br, 0.4 * br, 0.6 * br);
			break;
		}
		// glCallList( KLASK_CYLINDER );
		p_klask_list();
		glEnd();
		glPopMatrix();
	}

}
