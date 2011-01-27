// psykedelic...
// #include "almosteverything.h"
// #include "images.h"
// #include <stdlib.h>
// #define M_PI 3.14159265358979323846f
// #define M_PI2 3.14159265358979323846f*2
var CYL_RADIUS = 15.0;
var CYL_SEGMENTS = 9;
var CYL_LENGTH = 25.0;

// #define PSYK_LIST 71
// #define PSYK_TEXTURE 72
// #define PSYK_SYMBOLER 73

// GLubyte shitTexture[128*128*4];

var tuo, tvo;

function pp_glMappa(x, y) {

	var x2, y2;

	// x2 = tuo + ((x*x)/10);
	// y2 = tvo + ((y*y)/10);

	var r = 1 / (1 + Math.sqrt(x * x + y * y) * 3);

	x2 = x * r;
	y2 = y * r;

	// x2 = x*((-x*-x)/3);
	// y2 = y*((-y*-y)/3);

	x2 += tuo;
	y2 += tvo;

	glTexCoord2f(x2, y2);

};

function pp_generateScene(frame) {

	var i;
	var x, y, x2, y2;

	tuo = 0.5 + 0.45 * Math.cos(frame * 0.813);
	tvo = 0.5 + 0.45 * Math.sin(frame * 1.324);

	// glNewList( PSYK_LIST, GL_COMPILE );

	glBegin(GL_TRIANGLES);

	for ( var i = 0; i < CYL_SEGMENTS; i++) {
		x = Math.cos(i * M_PI2 / CYL_SEGMENTS);
		y = Math.sin(i * M_PI2 / CYL_SEGMENTS);

		x2 = Math.cos((i + 1.0) * M_PI2 / CYL_SEGMENTS);
		y2 = Math.sin((i + 1.0) * M_PI2 / CYL_SEGMENTS);

		pp_glMappa(x2, y2);
		glVertex3f(x2 * CYL_RADIUS, y2 * CYL_RADIUS, -CYL_LENGTH);

		pp_glMappa(x, y);
		glVertex3f(x * CYL_RADIUS, y * CYL_RADIUS, -CYL_LENGTH);

		pp_glMappa(0, 0);
		glVertex3f(0, 0, -CYL_LENGTH * 1.4);

		pp_glMappa(x, y);
		glVertex3f(x * CYL_RADIUS, y * CYL_RADIUS, CYL_LENGTH);

		pp_glMappa(x2, y2);
		glVertex3f(x2 * CYL_RADIUS, y2 * CYL_RADIUS, CYL_LENGTH);

		pp_glMappa(0, 0);
		glVertex3f(0, 0, CYL_LENGTH * 1.4);

	}
	;

	glEnd();

	glBegin(GL_QUADS);

	for ( var i = 0; i < CYL_SEGMENTS; i++) {

		x = Math.cos(i * M_PI2 / CYL_SEGMENTS);
		y = Math.sin(i * M_PI2 / CYL_SEGMENTS);

		x2 = Math.cos((i + 1.0) * M_PI2 / CYL_SEGMENTS);
		y2 = Math.sin((i + 1.0) * M_PI2 / CYL_SEGMENTS);

		pp_glMappa(x, y);

		glVertex3f(x * CYL_RADIUS, y * CYL_RADIUS, -CYL_LENGTH);

		pp_glMappa(x2, y2);

		glVertex3f(x2 * CYL_RADIUS, y2 * CYL_RADIUS, -CYL_LENGTH);

		glVertex3f(x2 * CYL_RADIUS, y2 * CYL_RADIUS, CYL_LENGTH);

		pp_glMappa(x, y);

		glVertex3f(x * CYL_RADIUS, y * CYL_RADIUS, CYL_LENGTH);

	}

	glEnd();

	// glEndList();
}

function p_psyk_run(e) {
	var t;
	gl.cullFace( gl.FRONT );

	gl.disable(gl.DEPTH_TEST);

	t = e.localTime;

	gl.enable(gl.BLEND);

	gl.enable( gl.CULL_FACE );

	gl.blendFunc(gl.ONE, gl.ONE);

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective(105, 4 / 4, 0, 1000);

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	gluLookAt(CYL_RADIUS * 0.5 * Math.cos(t / 5), CYL_RADIUS * 0.5
			* Math.cos(t / 2), CYL_RADIUS * 0.5 * Math.sin(t * 1), 0, 0, 0, 0,
			1, 0);

	var a;

	glPushMatrix();

	glaSetTexture(GIF_CLOUDS);
	// glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE);

	a = 0.3 + 0.3 * Math.cos(t * 1.0);

	glColor3f(a + a * Math.cos(t * 3.0), a + a * Math.cos(t * 2.6), a + a
			* Math.sin(t * 3.4));

	glRotatef(t * 21, 1, 0, 0);
	glRotatef(t * 13, 0, 1, 0);
	glRotatef(t * 7, 0, 0, 1);

	// glCallList( PSYK_LIST );
	pp_generateScene(t);

	a = 0.3 + 0.3 * Math.sin(t * 1.9);

	glColor3f(a + a * Math.sin(t * 4.0), a + a * Math.cos(t * 3.6), a + a
			* Math.cos(t * 2.2));

	glRotatef(90, 1, 0, 0);
	glRotatef(t * 90, 1, 0, 0);

	// glCallList( PSYK_LIST );
	pp_generateScene(t);

	a = 0.3 + 0.3 * Math.sin(t * 2.2);

	glColor3f(a + a * Math.sin(t * 3.0), a + a * Math.cos(t * 2.6), a + a
			* Math.cos(t * 4.4));

	glRotatef(90, 0, 1, 0);
	glRotatef(t * 72, 0, 0, 1);

	pp_generateScene(t);
	// glCallList( PSYK_LIST );

	glPopMatrix();

	// glLoadIdentity();

	gl.disable(gl.CULL_FACE);
//	gl.enable(gl.DEPTH_TEST);


}
