// greetings...
// #include "almosteverything.h"
// #include "images.h"
// #include <stdlib.h>

//#define GREET_FLOWER 30
//#define GREET_BACKGROUND 31
var GREET_LIST = 232;

function p_greetings_list() {
	var x, y, z, r, u, v;

	// srand(12345);
	Math.seedrandom(12345);
	for ( var i = 0; i < 1000; i++) {
		// glPushMatrix();
		// glRotatef( 312, cos(x), sin(y), cos(r) );

		x = -100 + Math.random() * 200.0;
		y = -Math.random() * 160.0;
		z = -100 + Math.random() * 200.0;
		r = Math.random() * 100.0 / 22.0;

		// a = rand()%360;
		// b = (float)(rand()%100) / 100.0f;

		u = Math.round( Math.random() * 1.0 );
		v = Math.round( Math.random() * 1.0 );

		glColor3f(0.1, 0.1, 0.1);

		glTexCoord2f(u, v);
		glVertex3f(x - r, y, z - r);
		glTexCoord2f(0.5 + u, v);
		glVertex3f(x + r, y, z - r);
		glTexCoord2f(0.5 + u, 0.5 + v);
		glVertex3f(x + r, y, z + r);
		glTexCoord2f(u, 0.5 + v);
		glVertex3f(x - r, y, z + r);
		// glPopMatrix();
	}
}

function p_greetings_init() {

	// glaUploadGif( GREET_FLOWER, (unsigned char *)&gif_flower, 0x0000FF );
	// glaUploadGif( GREET_BACKGROUND, (unsigned char *)&gif_greetback, 0x0000FF
	// );
	// glaUploadGif( GREET_GRID, (unsigned char *)&gif_grid, 0x0000FF );

	// glNewList( GREET_LIST, GL_COMPILE );
	// p_greetings_list();
	// glEndList();

}

var NPGTEXT = 16;
var pgtext = [ "we luhv..", "neurodruid", "mind", "",

"aardbei", "former k2", "woorlic", "tbl",

"jeskola", "yodel", "trauma", "mediascience",

"komplex", "bingoberra", "", "grilla!?" ];

function pgot(x, y, str, time) {
	for ( var i = 0; i < 5; i += 0.5) {
		var s = 1 + (i / 5.0);
		var b = 1 / (1 + i * 2);
		// glColor3f( b*0.7f, b*(0.7f + 0.35f*sin(time+i*30)), b*(0.6f +
		// 0.3f*cos(time-i*21)) );
		// glColor3f( b/2.0f, b/1.5f, b );
		var s2 = 1.0 + (i / 3.0);
		var s3 = 1.0 / (1 + i * i);
		glColor3f(b * 1 * s3, b * s3 * 0.5 + b * 0.3 * Math.sin(time * 7 + y),
				b * s3 * 0.5 + b * 0.3 * Math.cos(time * 7 - y));
		glaDrawString(x, y, 0, 0.1 * s, 0.1 * s, 0.1 * s, str);
	}
}

function p_greetings_run(e) {

	var t = e.localTime / 4;

	gl.disable(gl.CULL_FACE);
	gl.disable(gl.DEPTH_TEST);

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();

	var y0, y1;
	y0 = -(t * t * 7);
	y1 = -(t * t * 25);

	gluPerspective(105 + 1 * Math.cos(y0 * 3.142 / 5.0), 4 / 3, 0.1, 300);
	// ya = 45*(y0/5.0f);

	// gluLookAt( 19*cos(t/5), y0, 17*sin(t/6), 30*cos(t/4), y1, 30*sin(t/7), 0,
	// 1,
	// 0 );
	gluLookAt(1 * Math.cos(t * 3), y0, 0.1 * Math.cos(t * 5), 0, y1, -1, 0, 1,
			0);
	// gluLookAt( 0, y0, 0, 0, y1, -1, 0,1,0 );

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	glaSetTexture(GIF_GREEN);
	glBegin(GL_QUADS);
	// glCallList( GREET_LIST );
	p_greetings_list();

	glEnd();

	// glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );

	glaSetTexture(GIF_FONT);
	glRotatef(270, 1, 0, 0);
	glBegin(GL_QUADS);
	glColor3f(1, 1, 1);
	for ( var i = 0; i < NPGTEXT; i++) {
		// glPushMatrix();
		// glRotatef( i*90, 1,0,0 );
		// glColor3f( 1, 0.5f + 0.3f*(float)sin(t+i), 0.5f +
		// 0.3f*(float)cos(t-i) );
		glColor3f(0.2, 0.4, 0.7);
		// glaDrawString( 2*cos(i),4*sin(i/3),-10 + -10*i, 0.75f,0.75f,1.0f,
		// pgtext[i] );
		glaDrawString(0, 0, -10 + -10 * i, 0.5, 0.65, 0.5, pgtext[i]);

		// glColor3f( 0.1f, 0.2f, 0.3f );
		// glaDrawString( 2*cos(i),4*sin(i/3),-10 + -10*i, 0.75f,0.75f,1.0f,
		// pgtext[i] );
		// glaDrawString( 0,0,-10 + -10*i, 0.9f,0.9f,0.5f, pgtext[i] );

		// glPopMatrix();
	}
	glEnd();

}
