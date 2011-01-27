// siluett
// flareblob
// #include "almosteverything.h"
// #include "images.h"
// #include <stdlib.h>

var SILU_LIST = 40;

function psilufunc(model, time, px, py, pz, u, v) {

	var r2 = 0.05 + 0.05 * Math.cos((time * v * 3 + model)) + 0.05
			* Math.sin((time * v * 1.8 + model));
	var r = 0.2 + r2 * Math.sin((model + v + time) * (model + 3));
	// r = 1.0f;

	px = r * Math.cos(u * M_PI / 0.5);
	pz = r * Math.sin(u * M_PI / 0.5);
	py = v - 0.5;

	px *= 6;
	py *= 6;
	pz *= 6;

};

function p_silu_rit(t) {

	var u, v;
	var x, y, z;

	glPushMatrix();

	glRotatef(t * 5, 1, 0, 0);
	glRotatef(t * 40, 0, 1, 0);
	glRotatef(t * 3, 0, 0, 1);
	if (t > 2 && t < 4) {
		glRotatef(t * 15, 1, 0, 0);
		glRotatef(t * 30, 0, 1, 0);
		glRotatef(t * 10, 0, 0, 1);
	} else if (t > 6 && t < 8) {
		glRotatef(t * 35, 1, 0, 0);
		glRotatef(t * 4, 0, 1, 0);
		glRotatef(t * 7, 0, 0, 1);
	}
	;
	gl.pointSize(3);

	glBegin(GL_POINTS);
	for (u = 0; u < 100; u++) {
		for (v = 0; v <= 100; v++) {
			if (u % 10 == 0 || v % 10 == 0) {
				psilufunc(0, t, x, y, z, u / 100.0, v / 100.0);
				glColor3f(1, 0.5, 0.1);
				glVertex3f(x, y, z);
			}
		}
	}

	for (u = 0; u < 100; u++) {
		for (v = 0; v <= 100; v++) {
			if (v % 10 == 0) {
				psilufunc(0, t, x, y, z, u / 100.0, v / 100.0);

				glColor3f(0.1, 0.15, 0.207);
				glVertex3f(x * 1.1, y * 1.0, z * 1.1);
				glVertex3f(x * 1.2, y * 1.0, z * 1.2);
				glVertex3f(x * 1.3, y * 1.0, z * 1.3);

				glColor3f(0.08, 0.11, 0.107);
				glVertex3f(x * 1.4, y * 1.0, z * 1.4);
				glVertex3f(x * 1.5, y * 1.0, z * 1.5);

				glColor3f(0.06, 0.09, 0.057);
				glVertex3f(x * 1.6, y * 1.0, z * 1.6);
				glVertex3f(x * 1.7, y * 1.0, z * 1.7);

				glColor3f(0.04, 0.07, 0.017);
				glVertex3f(x * 1.8, y * 1.0, z * 1.8);
				glVertex3f(x * 1.9, y * 1.0, z * 1.9);

				glColor3f(0.02, 0.05, 0.007);
				glVertex3f(x * 2.0, y * 1.0, z * 2.0);
				glVertex3f(x * 2.1, y * 1.0, z * 2.1);

				glColor3f(0.01, 0.025, 0.0035);
				glVertex3f(x * 2.2, y * 1.0, z * 2.2);
				glVertex3f(x * 2.3, y * 1.0, z * 2.3);
			}
		}
	}
	glEnd();

	glPopMatrix();
}

function p_silu_klutt(a, b, r0) {

	glaSetTexture(GIF_PSIKORP2);
	glBegin(GL_QUADS);

	var r1 = r0 + (r0 / 10) * Math.cos((a / 2));
	var r2 = r0 - (r0 / 5) * Math.sin((a / 3));

	glColor3f(b * (0.3 + 0.3 * Math.cos(a)), b * (0.3 + 0.3 * Math.sin(a)), 0.0);

	for ( var i = 0; i < 100; i++) {
		var x1, y1, x2, y2;
		var u1, u2;

		x1 = Math.cos((i) * 3.142 / 50);
		y1 = Math.sin((i) * 3.142 / 50);
		x2 = Math.cos((i + 1) * 3.142 / 50);
		y2 = Math.sin((i + 1) * 3.142 / 50);

		u1 = -((i) / 5.0) + a;
		u2 = -((i + 1) / 5.0) + a;

		glTexCoord2f(u1, 1);
		glVertex3f(r1 * x1, r1 * y1, 0);
		glTexCoord2f(u1, 0);
		glVertex3f(r2 * x1, r2 * y1, 0);

		glTexCoord2f(u2, 0);
		glVertex3f(r2 * x2, r2 * y2, 0);
		glTexCoord2f(u2, 1);
		glVertex3f(r1 * x2, r1 * y2, 0);

	}
	glEnd();
}

function p_silu_cube(t) {
	// glTexCoord( Math.sin(t), Math.cos(t) );

	glColor3f(0.01, 0.01, 0.01);

	glVertex3f(-1, -1, -1);
	glVertex3f(1, -1, -1);
	glVertex3f(1, 1, -1);
	glVertex3f(-1, 1, -1);

	glVertex3f(-1, -1, 1);
	glVertex3f(1, -1, 1);
	glVertex3f(1, 1, 1);
	glVertex3f(-1, 1, 1);

	glColor3f(0.033, 0.033, 0.033);

	glVertex3f(-1, -1, 1);
	glVertex3f(-1, -1, -1);
	glVertex3f(-1, 1, -1);
	glVertex3f(-1, 1, 1);

	glVertex3f(1, -1, 1);
	glVertex3f(1, -1, -1);
	glVertex3f(1, 1, -1);
	glVertex3f(1, 1, 1);

	glColor3f(0.001, 0.001, 0.001);

	glVertex3f(-1, -1, 1);
	glVertex3f(-1, -1, -1);
	glVertex3f(1, -1, -1);
	glVertex3f(1, -1, 1);

	glVertex3f(-1, 1, 1);
	glVertex3f(-1, 1, -1);
	glVertex3f(1, 1, -1);
	glVertex3f(1, 1, 1);
}

function p_silu_run(e) {

	gl.disable(gl.DEPTH_TEST);

	var t = e.localTime;
	var b = e.localBeat;

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);

	glMatrixMode(GL_PROJECTION);
	// glScalef( 0.2, 0.3, 0.4 );
	glLoadIdentity();
	glOrtho(-1, 1, -1, 1, -100, 100);

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();

	// rita distad bild

	gl.disable(gl.TEXTURE_2D);
	// rita bakgrunden
	{

	}

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();

	b = 1;
	if (t >= 12) {
		b = 1 - ((t - 12) / 3.0);
	}

	// p_silu_klutt2( t, b );

	// p_silu_klutt( t, 0.2f, 0.7f );

	p_silu_klutt(t - 0.0, 0.3 * b, 0.7);
	p_silu_klutt(t - 0.2, 0.25 * b, 0.75);
	p_silu_klutt(t - 0.4, 0.2 * b, 0.8);
	p_silu_klutt(t - 0.6, 0.1 * b, 0.85);
	p_silu_klutt(t - 0.8, 0.05 * b, 0.9);
	p_silu_klutt(t - 1.0, 0.025 * b, 0.95);

	glFrustum(-1, 1, -0.75, 0.75, 1.0, 15.0);

	if (t < 2) {
		var p = 0 - (((2 - t) * (2 - t)) / 4.0);
		glTranslatef(0.0 + p, 0, -4 - (t * 3));
	} else if (t > 13) {
		glTranslatef(0.0, 0, -10 + ((t - 13) * 5));
	} else {
		glTranslatef(0.0, 0, -10);
	}
	;

	// glScalef( 0.2, 0.3, 0.4 );

	gl.disable(gl.TEXTURE_2D);
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);

	// siluett/wireframe/nurbsliknande sak
	p_silu_rit(t);
	/*
	 * glLoadIdentity();
	 * 
	 * var h = 0.4f; if( t<3 ) { h = 0.4f + ( ((3-t)*(3-t))/9.0f); };
	 */
}
