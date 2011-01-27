// wireframe landscape
// #include "almosteverything.h"// 
// && #include "images.h"

function pw_drawbuilding(x, y, z, height, r1, r2, t) {
	// glDisable( GL_TEXTURE_2D );

	glColor3f(0.4, 0.2, 0);// /(1.0f+10*height), 0 );

	// lTexCoord2f( 0, 0 ); glVertex3f( x-r1, y z-r1 );
	// lTexCoord2f( 1, 0 ); glVertex3f( x+r1, y, z-r1 );
	// lTexCoord2f( 1, 1 ); glVertex3f( x+r1, y, z+r1 );
	// lTexCoord2f( 0, 1 ); glVertex3f( x-r1, y, z+r1 );

	glTexCoord2f(0, 0);
	glVertex3f(x - r2, y + height, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r2, y + height, z - r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r2, y + height, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r2, y + height, z + r2);

	glTexCoord2f(0, 0);
	glVertex3f(x - r1, y, z - r1);
	glTexCoord2f(1, 0);
	glVertex3f(x - r2, y + height, z - r2);
	glTexCoord2f(1, 1);
	glVertex3f(x - r2, y + height, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r1, y, z + r1);

	glTexCoord2f(0, 0);
	glVertex3f(x + r2, y + height, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r1, y, z - r1);
	glTexCoord2f(1, 1);
	glVertex3f(x + r1, y, z + r1);
	glTexCoord2f(0, 1);
	glVertex3f(x + r2, y + height, z + r2);

	glTexCoord2f(0, 0);
	glVertex3f(x - r1, y, z - r1);
	glTexCoord2f(1, 0);
	glVertex3f(x - r2, y + height, z - r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r2, y + height, z - r2);
	glTexCoord2f(0, 1);
	glVertex3f(x + r1, y, z - r1);

	glTexCoord2f(0, 0);
	glVertex3f(x - r2, y + height, z + r2);
	glTexCoord2f(1, 0);
	glVertex3f(x - r1, y, z + r1);
	glTexCoord2f(1, 1);
	glVertex3f(x + r1, y, z + r1);
	glTexCoord2f(0, 1);
	glVertex3f(x + r2, y + height, z + r2);

}

function pw_draw_tile(x, y, z, r, b) {
	glColor3f(0.1 * b, 0.2 * b, 0.3 * b);

	glTexCoord2f(0, 0);
	glVertex3f(x - r, y, z - r);

	glTexCoord2f(1, 0);
	glVertex3f(x + r, y, z - r);

	glTexCoord2f(1, 1);
	glVertex3f(x + r, y, z + r);

	glTexCoord2f(0, 1);
	glVertex3f(x - r, y, z + r);
}

function pw_draw_obj(x, y, z, r) {

	// var r2 = r/4.0f;
	var r2 = r;
	glBegin(GL_QUADS);

	glColor3f(0.4, 0.3, 0.2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, y - r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, y - r, z - r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, y - r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, y - r, z + r2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, y + r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, y + r, z - r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, y + r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, y + r, z + r2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, y - r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, y - r, z - r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, y + r, z - r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, y + r, z - r2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, y - r, z + r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, y - r, z + r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, y + r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, y + r, z + r2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, y - r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x - r, y - r, z + r2);
	glTexCoord2f(1, 1);
	glVertex3f(x - r, y + r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, y + r, z - r2);
	glTexCoord2f(0, 0);
	glVertex3f(x + r, y - r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, y - r, z + r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, y + r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x + r, y + r, z - r2);

	glColor3f(0.075, 0.15, 0.2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, -y - r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, -y - r, z - r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, -y - r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, -y - r, z + r2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, -y + r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, -y + r, z - r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, -y + r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, -y + r, z + r2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, -y - r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, -y - r, z - r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, -y + r, z - r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, -y + r, z - r2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, -y - r, z + r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, -y - r, z + r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, -y + r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, -y + r, z + r2);
	glTexCoord2f(0, 0);
	glVertex3f(x - r, -y - r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x - r, -y - r, z + r2);
	glTexCoord2f(1, 1);
	glVertex3f(x - r, -y + r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x - r, -y + r, z - r2);
	glTexCoord2f(0, 0);
	glVertex3f(x + r, -y - r, z - r2);
	glTexCoord2f(1, 0);
	glVertex3f(x + r, -y - r, z + r2);
	glTexCoord2f(1, 1);
	glVertex3f(x + r, -y + r, z + r2);
	glTexCoord2f(0, 1);
	glVertex3f(x + r, -y + r, z - r2);

	glEnd();
}

function pw_draw_world(t, b) {
	var i, j;

	// glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );
	glaSetTexture(GIF_GRID);

	glBegin(GL_QUADS);
	for (j = -12; j < 12; j++) {
		for (i = -12; i < 12; i++) {

			var b = 1.0 - (Math.sqrt(i * i + j * j) / 10.0);
			if (b > 0)
				pw_draw_tile(i, 0, j, 0.5, b);
		}
	}
	glEnd();

	var r, x;

	r = 0.4;

	glPushMatrix();

	glRotatef(t * 180, 0, 1, 0);

	x = -2.0;
	pw_draw_obj(x - 1, 5, 0, r);
	pw_draw_obj(x - 1, 4, 0, r);
	pw_draw_obj(x - 1, 3, 0, r);
	pw_draw_obj(x + 0, 3, 0, r);
	pw_draw_obj(x + 1, 3, 0, r);
	pw_draw_obj(x - 1, 2, 0, r);
	pw_draw_obj(x + 1, 2, 0, r);
	pw_draw_obj(x - 1, 1, 0, r);
	pw_draw_obj(x + 0, 1, 0, r);
	pw_draw_obj(x + 1, 1, 0, r);

	x = 2.0;
	pw_draw_obj(x - 1, 5, 0, r);
	pw_draw_obj(x + 1, 5, 0, r);
	pw_draw_obj(x - 1, 4, 0, r);
	pw_draw_obj(x + 1, 4, 0, r);
	pw_draw_obj(x - 1, 3, 0, r);
	pw_draw_obj(x + 0, 3, 0, r);
	pw_draw_obj(x + 1, 3, 0, r);
	pw_draw_obj(x + 1, 2, 0, r);
	pw_draw_obj(x + 1, 1, 0, r);

	glPopMatrix();

	glaSetTexture(GIF_PSIKORP4);
	glBegin(GL_QUADS);

	var xs = 5 + 2.5 * Math.cos(t * 2.5);
	var ys = 4 + 2.0 * Math.sin(t * 3.4);

	glColor3f(0.6, 0.3, 0.2);
	if (t % 2.0 > 1.25) {
		xs *= 1.5;
		ys *= 1.5;
		glColor3f(1.0, 0.4, 0.2);
	}
	// //+(0.2f*((fmod(b,2.0f)-1.25f)*1.2f));//- 0.3f/(1+fmod(b,2.0f));

	glTexCoord2f(0, 1);
	glVertex3f(-1.5 * xs, 7, -1 * ys);
	glTexCoord2f(1, 1);
	glVertex3f(1.5 * xs, 7, -1 * ys);
	glTexCoord2f(1, 0);
	glVertex3f(1.5 * xs, 7, 1 * ys);
	glTexCoord2f(0, 0);
	glVertex3f(-1.5 * xs, 7, 1 * ys);

	glColor3f(0.1, 0.2, 0.3);
	if (t % 2.0 > 1.25) {
		glColor3f(0.2, 0.3, 0.5);
	}

	glTexCoord2f(0, 1);
	glVertex3f(-1.5 * xs, -7, -1 * ys);
	glTexCoord2f(1, 1);
	glVertex3f(1.5 * xs, -7, -1 * ys);
	glTexCoord2f(1, 0);
	glVertex3f(1.5 * xs, -7, 1 * ys);
	glTexCoord2f(0, 0);
	glVertex3f(-1.5 * xs, -7, 1 * ys);

	for (i = 0; i < 3; i += 0.15) {

		var s = 1 + (i / 5.0);
		var b = 0.2 / (1 + i * 3.0);
		glColor3f(b, 0.4 * b, b * 0.2);
		glTexCoord2f(0, 1);
		glVertex3f(-1.5 * xs * s, 7 - i, -1 * ys * s);
		glTexCoord2f(1, 1);
		glVertex3f(1.5 * xs * s, 7 - i, -1 * ys * s);
		glTexCoord2f(1, 0);
		glVertex3f(1.5 * xs * s, 7 - i, 1 * ys * s);
		glTexCoord2f(0, 0);
		glVertex3f(-1.5 * xs * s, 7 - i, 1 * ys * s);

		glColor3f(0.1 * b, 0.2 * b, 0.3 * b);
		glTexCoord2f(0, 1);
		glVertex3f(-1.5 * xs * s, -7 + i, -1 * ys * s);
		glTexCoord2f(1, 1);
		glVertex3f(1.5 * xs * s, -7 + i, -1 * ys * s);
		glTexCoord2f(1, 0);
		glVertex3f(1.5 * xs * s, -7 + i, 1 * ys * s);
		glTexCoord2f(0, 0);
		glVertex3f(-1.5 * xs * s, -7 + i, 1 * ys * s);
	} 

	glColor3f(0.4, 0.2, 0.1);
	glTexCoord2f(0, 1);
	glVertex3f(-1.5 * xs * 2, 0, -1 * ys * 2);
	glTexCoord2f(1, 1);
	glVertex3f(1.5 * xs * 2, 0, -1 * ys * 2);
	glTexCoord2f(1, 0);
	glVertex3f(1.5 * xs * 2, 0, 1 * ys * 2);
	glTexCoord2f(0, 0);
	glVertex3f(-1.5 * xs * 2, 0, 1 * ys * 2);

	glEnd()
}

function p_wirelandscape_run(e) {

	var t, b;
	/*
	 * glMatrixMode( GL_PROJECTION ); glLoadIdentity(); glTranslatef( 0, 0, -1 );
	 * 
	 * glMatrixMode( GL_MODELVIEW ); glLoadIdentity();
	 * 
	 * //glCullFace( GL_FRONT );
	 */
	gl.disable(gl.CULL_FACE);

	// glClearDepth( 20 );
	gl.disable(gl.DEPTH_TEST);
	// glDepthFunc( GL_LESS );

	t = e.localTime;
	b = e.localBeat;

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective(120, 4 / 3, 0.001, 100.0);

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	var r = 1;
	// if( fmod(b,2.0f)>1.25f ) r =
	// 0.9f;//+(0.2f*((fmod(b,2.0f)-1.25f)*1.2f));//- 0.3f/(1+fmod(b,2.0f));

	gluLookAt(r * 6 * Math.cos(t / 5), 3.0 + r * 0.3 * Math.cos(t / 3), r * 7
			* Math.sin(t / 3), 0, 1.0 + 0.5 * Math.cos(t / 3), 0, Math
			.cos(t / 4), 1, Math.sin(t / 5));

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);

	// glEnable( GL_FOG );
	pw_draw_world(t, b);

	// glLoadIdentity();
	// rita varroflashnnn
}
