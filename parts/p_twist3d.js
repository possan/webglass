// 3d twister
// flareblob
// #include "almosteverything.h"
// #include "images.h"

var NSIDES = 5;
var CUBES_LIST = 20;

var ASTEP = 3.142 / 2.0;
var ASTEP2 = 3.142 / 4.0;

function p_twist3d_render_section(y0, b0, b1, a0, a1, v0, v1, r0, r1) {

	var x = [];
	var z = [];
	var nx = [];
	var nz = [];
	var y1 = y0 + 1.0;

	for ( var i = 0; i < 4; i++) {

		var aa0 = a0 + i * ASTEP;
		var aa1 = a1 + i * ASTEP;
		x[i * 2 + 0] = r0 * 4.0 * Math.cos(aa0);
		z[i * 2 + 0] = r0 * 4.0 * Math.sin(aa0);
		x[i * 2 + 1] = r1 * 4.0 * Math.cos(aa1);
		z[i * 2 + 1] = r1 * 4.0 * Math.sin(aa1);
		nx[i * 2 + 0] = Math.cos(aa0 - ASTEP2);
		nz[i * 2 + 0] = Math.sin(aa0 - ASTEP2);
		nx[i * 2 + 1] = Math.cos(aa1 - ASTEP2);
		nz[i * 2 + 1] = Math.sin(aa1 - ASTEP2);
	}

	glColor3f(b0, b0 / 2, b0 / 4);

	// A
	// glNormal3f( nx[0*2+0],0,nz[0*2+0] );
	glTexCoord2f(0, v0);
	glVertex3f(x[0 * 2 + 0], y0, z[0 * 2 + 0]);

	glTexCoord2f(1, v0);
	glVertex3f(x[1 * 2 + 0], y0, z[1 * 2 + 0]);

	// glNormal3f( nx[0*2+1],0,nz[0*2+1] );
	glTexCoord2f(1, v1);
	glVertex3f(x[1 * 2 + 1], y1, z[1 * 2 + 1]);

	glTexCoord2f(0, v1);
	glVertex3f(x[0 * 2 + 1], y1, z[0 * 2 + 1]);

	// B

	glColor3f(b0 / 4, b0 / 2, b0);

	// glNormal3f( nx[1*2+0],0,nz[1*2+0] );
	glTexCoord2f(0, v0);
	glVertex3f(x[1 * 2 + 0], y0, z[1 * 2 + 0]);

	glTexCoord2f(1, v0);
	glVertex3f(x[2 * 2 + 0], y0, z[2 * 2 + 0]);

	// glNormal3f( nx[1*2+1],0,nz[1*2+1] );
	glTexCoord2f(1, v1);
	glVertex3f(x[2 * 2 + 1], y1, z[2 * 2 + 1]);

	glTexCoord2f(0, v1);
	glVertex3f(x[1 * 2 + 1], y1, z[1 * 2 + 1]);

	// C

	glColor3f(b0, b0 / 2, b0 / 4);

	glNormal3f(nx[2 * 2 + 0], 0, nz[2 * 2 + 0]);
	glTexCoord2f(0, v0);
	glVertex3f(x[2 * 2 + 0], y0, z[2 * 2 + 0]);

	glTexCoord2f(1, v0);
	glVertex3f(x[3 * 2 + 0], y0, z[3 * 2 + 0]);

	glNormal3f(nx[2 * 2 + 1], 0, nz[2 * 2 + 1]);

	glTexCoord2f(1, v1);
	glVertex3f(x[3 * 2 + 1], y1, z[3 * 2 + 1]);
	glTexCoord2f(0, v1);
	glVertex3f(x[2 * 2 + 1], y1, z[2 * 2 + 1]);

	// D

	glColor3f(b0 / 4, b0 / 2, b0);

	// glNormal3f( nx[3*2+0],0,nz[3*2+0] );
	glTexCoord2f(0, v0);
	glVertex3f(x[3 * 2 + 0], y0, z[3 * 2 + 0]);

	glTexCoord2f(1, v0);
	glVertex3f(x[0 * 2 + 0], y0, z[0 * 2 + 0]);
	// glNormal3f( nx[3*2+1],0,nz[3*2+1] );
	glTexCoord2f(1, v1);
	glVertex3f(x[0 * 2 + 1], y1, z[0 * 2 + 1]);
	glTexCoord2f(0, v1);
	glVertex3f(x[3 * 2 + 1], y1, z[3 * 2 + 1]);

}

function xptffff(time) {
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
}

function pt3d_funktionen_f(t, offset) {
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
}

function p_twist3d_render(t, bb) {

	var angle = [];
	var rad = [];
	var i;

	for (i = 0; i < 100; i++) {
		var a = pt3d_funktionen_f(t, i / 35.0);
		var r = 1.0 + 0.5 * Math.cos((a + i + t) / 15.0);
		angle[i] = a;
		rad[i] = r;
	}

	glBegin(GL_QUADS);
	for (i = -40; i < 40; i++) {

		var b0 = 1.0 / (1 + Math.abs(i));
		var b1 = 1.0 / (1 + Math.abs(i + 1));

		b0 *= bb;
		b1 *= bb;

		var a0 = angle[i + 50];
		var a1 = angle[i + 51];
		var r0 = rad[i + 50];
		var r1 = rad[i + 51];

		var v0 = (i + 40) / 8.0;
		var v1 = (i + 41) / 8.0;

		p_twist3d_render_section(i, b0, b1, a0, a1, v0, v1, r0, r1);
	}
	glEnd();

}

function p_twist3d_run(e) {

	var t;
	// int i;

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	glTranslatef(0, 0, -1.0);

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	// glTranslatef( 0, 0, -1 );
	// glEnable( GL_DEPTH_TEST );
	// glDepthFunc( GL_LESS );
	// glCullFace( GL_FRONT );

	gl.clearDepth(1);
	gl.disable(gl.DEPTH_TEST);
	gl.disable(gl.ALPHA_TEST);

	// glHint( GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST );

	t = e.localTime;

	// t = t + (0.31f*Math.cos(t*3.142/0.5f));

	// b = glaBeat();

	gl.disable(gl.DEPTH_TEST);

	glMatrixMode(GL_PROJECTION);
	// glTexEnvi( GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );
	glLoadIdentity();

	gluPerspective(75, 4 / 3, 1, 100);

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();

	switch (Math.round((t / 4) - 0.5)) {
	case 1:
	case 5:
		gluLookAt(19 * Math.cos(t / 5), 0 * Math.cos(t / 3), 17 * Math
				.sin(t / 6), 1 * Math.cos(t / 3), 1 * Math.cos(t / 4), 1 * Math
				.sin(t / 7), 0, 1, 0);
		glRotatef(105, Math.sin(t / 8), Math.sin(t / 5), Math.cos(t / 3));
		break;
	// // flyg...
	// gluLookAt( 10-t*10, 70-t*4, 1, 0, 60-t*4, 0, 0, 1, 0 );
	// break;
	case 2:
	case 6:
		// flyg...
		gluLookAt(1 * Math.cos(t * 3), 70 - t * 4, 1, 0, 60 - t * 4, 0, 0, 1, 0);
		break;
	case 4:
		gluLookAt(17 * Math.cos(t / 3), 0 * Math.cos(t / 5), 18 * Math
				.sin(t / 4), 1 * Math.cos(t / 4), 1 * Math.cos(t / 3), 1 * Math
				.sin(t / 5), 0, 1, 0);
		break;
	default:
		gluLookAt(18 * Math.sin(t / 4), 0 * Math.cos(t / 6), 19 * Math
				.sin(t / 3), 1 * Math.cos(t / 5), 1 * Math.cos(t / 7), 1 * Math
				.sin(t / 4), 0, 1, 0);
		glRotatef(-45, Math.sin(t / 8), Math.sin(t / 5), Math.cos(t / 3));
		break;
	}
	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);
	glaSetTexture(GIF_TWISTER2);

	p_twist3d_render(t, 1.0);

	glScalef(4, 4, 4);

	p_twist3d_render(t + 132, 0.25);

	gl.disable(gl.FOG);
	gl.disable(gl.LIGHT0);
	gl.disable(gl.LIGHTING);

}
