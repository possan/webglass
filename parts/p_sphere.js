// shit
// #include "almosteverything.h"
// #include "images.h"
// && #include <stdlib.h>

function p_sf(u, v) {
	return 1.0;
}

function p_sphere_function(t, u, v) {

	var ve = {};

	var a = 0.3 * Math.cos(t * 2);
	var b = 0.3 * Math.sin(t * 3);
	var r2 = 1.0 + a * Math.cos(((u * 3) - (t * 40)) * 3.142 / 50.0);
	r2 += b * Math.cos(((v * 2) - (t * 60)) * 3.142 / 50.0);

	var r = r2 * 30 * Math.sin(v * 3.142 / 100);
	var x = r * Math.cos(u * 3.142 / 50);
	var z = r * Math.sin(u * 3.142 / 50);
	var y = r2 * 30 * Math.cos(v * 3.142 / 100);// (v-50);//40*Math.sin(
	// v*3.142/50
	// );

	ve.x = x;
	ve.y = y;
	ve.z = z;

	return ve;
}

function p_sphere_render(t) {

	var u, v;

	glaSetTexture(GIF_CLOUDS);

	var STEP = 4;

	glBegin(GL_QUADS);
	glColor3f(0.05, 0.3, 0.1);

	for (v = 0; v < 100; v += STEP) {

		for (u = 0; u < 100; u += STEP) {

			var a = p_sphere_function(t, u + STEP, v + STEP);
			var b = p_sphere_function(t, u, v + STEP);
			var c = p_sphere_function(t, u, v);
			var d = p_sphere_function(t, u + STEP, v);

			// glColor3f( 0.3f + 0.2f*Math.cos(t*14+(u*5+v*6)/125.0f), 0.1f,
			// 0.3f + 0.2f*Math.sin(t*20+(v*7+u*5)/125.0f) );

			glTexCoord2f((u + STEP) / 10.0, (v + STEP) / 10.0);
			glVertex3f(a.x, a.y, a.z);

			glTexCoord2f((u + 0) / 10.0, (v + STEP) / 10.0);
			glVertex3f(b.x, b.y, b.z);

			glTexCoord2f((u + 0) / 10.0, (v + 0) / 10.0);
			glVertex3f(c.x, c.y, c.z);

			glTexCoord2f((u + STEP) / 10.0, (v + 0) / 10.0);
			glVertex3f(d.x, d.y, d.z);

		}

	}

	glEnd();

}

function p_sphere_run(e) {

	var t;

	gl.cullFace(gl.BACK);

	gl.disable(gl.DEPTH_TEST);
	// glEnable( GL_DEPTH_TEST );
	// glDepthFunc( GL_LESS );

	t = e.localTime;

	gl.disable(gl.CULL_FACE);

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);

	// glMatrixMode(GL_TEXTURE);
	// gluLookAt( -0.7f*Math.cos(t/5), -0.7f*Math.cos(t/2),
	// -0.7f*Math.sin(t*1), 0, 0, 0, 0, 1, 0 );
	// glLoadIdentity();

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	// glFrustum( -1, 1, -0.75, 0.75, 0.1, 1 );

	gluPerspective(85, 4 / 3, 1, 1000);

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();

	// MATRIX m;
	glTranslatef(0, 0, -70);
	// gluLookAt( 0.7f*Math.cos(t/5), 0.7f*Math.cos(t/2),
	// 0.7f*Math.sin(t*1), 0, 0, 0, 0, 1, 0 );
	glRotatef(60, Math.cos(t * 3), Math.sin(t * 2), Math.cos(t / 4));

	p_sphere_render(t);

}
