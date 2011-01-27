// flareblob
// #include "almosteverything.h"
// #include "images.h"

//#define CUBES_IMG 21
var CUBES_LIST = 20;
// efine FLAREBLOB_LOGO 11

function p_cubes_list() {
	var r = 1.0;

	glBegin(GL_QUADS);

	// glColor3f( 1, 1, 1 );
	glColor3f(0.05, 0.1, 0.15);
	// toppen
	// glColor3f( 1, 0, 0 );
	// glBegin( GL_LINE_LOOP );
	glNormal3f(0, 0, -1);
	glTexCoord2f(0, 0);
	glVertex3f(-r, -r, -r);
	glTexCoord2f(1, 0);
	glVertex3f(r, -r, -r);
	glTexCoord2f(1, 1);
	glVertex3f(r, r, -r);
	glTexCoord2f(0, 1);
	glVertex3f(-r, r, -r);
	// glEnd();
	// glBegin( GL_LINE_LOOP );
	glNormal3f(0, 0, 1);
	glTexCoord2f(0, 1);
	glVertex3f(r, -r, r);
	glTexCoord2f(1, 1);
	glVertex3f(-r, -r, r);
	glTexCoord2f(1, 0);
	glVertex3f(-r, r, r);
	glTexCoord2f(0, 0);
	glVertex3f(r, r, r);
	// glEnd();

	// glColor3f( 0, 1, 0 );
	// glBegin( GL_LINE_LOOP );
	glNormal3f(0, -1, 0);
	glTexCoord2f(1, 1);
	glVertex3f(-r, -r, -r);
	glTexCoord2f(0, 1);
	glVertex3f(r, -r, -r);
	glTexCoord2f(0, 0);
	glVertex3f(r, -r, r);
	glTexCoord2f(1, 0);
	glVertex3f(-r, -r, r);
	// glEnd();
	// glBegin( GL_LINE_LOOP );
	glNormal3f(0, 1, 0);
	glTexCoord2f(0, 0);
	glVertex3f(r, r, -r);
	glTexCoord2f(1, 0);
	glVertex3f(-r, r, -r);
	glTexCoord2f(1, 1);
	glVertex3f(-r, r, r);
	glTexCoord2f(0, 1);
	glVertex3f(r, r, r);
	// glEnd();

	// glColor3f( 0, 0, 1 );
	// glBegin( GL_LINE_LOOP );
	glNormal3f(-1, 0, 0);
	glTexCoord2f(1, 1);
	glVertex3f(-r, -r, -r);
	glTexCoord2f(0, 1);
	glVertex3f(-r, r, -r);
	glTexCoord2f(0, 0);
	glVertex3f(-r, r, r);
	glTexCoord2f(1, 0);
	glVertex3f(-r, -r, r);
	// glEnd();
	// glBegin( GL_LINE_LOOP );
	glNormal3f(1, 0, 0);
	glTexCoord2f(0, 1);
	glVertex3f(r, r, -r);
	glTexCoord2f(1, 1);
	glVertex3f(r, -r, -r);
	glTexCoord2f(1, 0);
	glVertex3f(r, -r, r);
	glTexCoord2f(0, 0);
	glVertex3f(r, r, r);
	// glEnd();

	glEnd();
}

function p_cubes_init() {

	// glaUploadGif( CUBES_IMG, (unsigned char *)&gif_rost, 1 );
	/*
	 * glNewList( CUBES_LIST, GL_COMPILE );
	 * 
	 * 
	 * glEndList();
	 */
}
/*
 * function pcdt( text, deltatime ) {
 * 
 * var s2 = 0.5f+(deltatime*deltatime*deltatime);
 * 
 * var a = 1.0f - (deltatime / 2.0f);
 *  // glColor3f( 1*a, 1*a, 1*a );
 * 
 * var max = text.length; var len = (int)(deltatime * 30); if( len>max )
 * len=max;
 * 
 * char s[50]; memcpy( s, text, len ); s[len] = 0; if( fmod(deltatime,0.1)<0.05 ) {
 * s[len] = '_'; s[len+1] = 0; };
 * 
 * var xx = 0; if( deltatime>1.8 ) { xx = -(deltatime - 1.8)*7.0; }; var ss = 1;
 * if( deltatime>0.25 && deltatime<1 ) { ss = 1.75 - (deltatime-0.25); };
 * 
 * glColor3f( 0.4, 1.0, 0.75 ); glaDrawStringL( -0.9+xx, 0.85, 0, 0.03, 0.03,
 * 0.08, s );
 * 
 *  }
 */

function p_cubes_render_world(t) {

	return;
	glPushMatrix();
	glaSetTexture(GIF_ROST);
	// glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );

	for ( var k = -4; k <= 4; k+=2) {
		for ( var j = -4; j <= 4; j+=2) {
			for ( var i = -4; i <= 4; i+=2) {
				glPushMatrix();

				// var b = 1.0f / (sqrt( (k*k)+(j*j)+(i*i) )) / 10.0f;
				// glColor3f( b,b,b );
				glTranslatef(i * 2, j * 2, k * 2);
				glScalef(0.25, 0.25, 0.25);
				// glRotatef( 130, Math.cos(t*4+j*3), Math.sin(t*5-k*4),
				// Math.cos(t*3-i*2) );
				// glScalef( Math.cos(t*5+j*3), Math.sin(t*4-k*4),
				// Math.cos(t*3-i*5) );
				// glScalef( 0.5f, 0.5f, 0.5f );
				// glCallList( CUBES_LIST );
				p_cubes_list();

				glPopMatrix();
			}
			;
		}
		;
	}
	;
	glPopMatrix();
}

var old_matrix = [];

function p_cubes_render_flow(t, x, y, z, r, g, b) {

	var rad = [];

	var a0 = 0.5 + 0.5 * Math.sin(t * 3.142 / 1.2);
	var a1 = 0.5 + 0.5 * Math.cos(t * 3.142 / 3.8);
	var a2 = 0.5 - 0.5 * Math.sin(t * 3.142 / 2.3);
	for ( var j = 0; j < 51; j++) {
		var c0 = 0.3 + 0.2 * Math.sin((t * 8 + j) * 3.142 / 6.25);
		var c1 = 0.3 + 0.2 * Math.sin((t * 9 + j) * 3.142 / 5.0);
		var c2 = 0.3 + 0.2 * Math.sin((t * 7 + j) * 3.142 / 25.0);
		rad[j] = c0 * a0 + c1 * a1 + c2 * a2;
	}

	glaSetTexture(GIF_CLOUDS);
	// glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );

	var ra = 4.0;// + 3.0f*Math.cos( t );

	glPushMatrix();
	glTranslatef(x, y, z);
	glRotatef(100, Math.sin(t * 2), Math.cos(t), Math.sin(t * 3));
	glBegin(GL_QUADS);
	for ( var i = 0; i < 20; i++) {

		// var x0 = rad[i]*Math.cos((i)*3.142f/25)*0.2f;
		// var y0 = rad[i]*Math.sin((i)*3.142f/25)*0.2f;
		var x1 = rad[i] * Math.cos((i + 0) * 3.142 / 25);
		var y1 = rad[i] * Math.sin((i + 0) * 3.142 / 25);
		var x2 = rad[i + 1] * Math.cos((i + 1) * 3.142 / 25);
		var y2 = rad[i + 1] * Math.sin((i + 1) * 3.142 / 25);

		if (i % 10 == 1) {
			x1 *= ra;
			y1 *= ra;
			x2 *= ra;
			y2 *= ra;
		}
		;

		var u = i / 50.0;
		var u2 = (i + 1) / 50.0;

		glColor3f(r, g, b);
		glTexCoord2f(u2, 0);
		glVertex3f(0, 0, 0);
		glTexCoord2f(u, 0);
		glVertex3f(0, 0, 0);

		glColor3f(0, 0, 0);
		glTexCoord2f(u, 1);
		glVertex3f(x1, y1, 0);
		glTexCoord2f(u2, 1);
		glVertex3f(x2, y2, 0);

		glColor3f(r, g, b);
		glTexCoord2f(u2, 0);
		glVertex3f(0, 0, 0);
		glTexCoord2f(u, 0);
		glVertex3f(0, 0, 0);

		glColor3f(0, 0, 0);
		glTexCoord2f(u, 1);
		glVertex3f(0, x1, y1);
		glTexCoord2f(u2, 1);
		glVertex3f(0, x2, y2);

		glColor3f(r, g, b);
		glTexCoord2f(u2, 0);
		glVertex3f(0, 0, 0);
		glTexCoord2f(u, 0);
		glVertex3f(0, 0, 0);

		glColor3f(0, 0, 0);
		glTexCoord2f(u, 1);
		glVertex3f(x1, 0, y1);
		glTexCoord2f(u2, 1);
		glVertex3f(x2, 0, y2);

	}
	;
	glEnd();
	glPopMatrix();
}

function p_cubes_run(e) {

	var t;
	var i;

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);
	gl.disable(gl.DEPTH_TEST);

	var _t = e.localTime / 2.0;

	var _if = _t % 1.0;
	if (_if < 0.25) {
		t = _if * 2.0;
	} else {
		t = 0.5 + (_if - 0.25) * 0.2;
	}
	;
	t += Math.round(_t - 0.5);

	glMatrixMode(GL_TEXTURE);
	glLoadIdentity();

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();

	gluPerspective(110, 4 / 3, 1, 1000);

	switch (Math.round((t / 4) - 0.5)) {
	case 1:
	case 5:
		gluLookAt(5 * Math.cos(t / 5), 3 * Math.cos(t / 3),
				7 * Math.sin(t / 6), 1 * Math.cos(t / 3), 1 * Math.cos(t / 4),
				1 * Math.sin(t / 7), 0, 1, 0);
		break;
	case 3:
	case 7:
		gluLookAt(7 * Math.cos(t / 3), 5 * Math.cos(t / 5),
				3 * Math.sin(t / 4), 1 * Math.cos(t / 4), 1 * Math.cos(t / 3),
				1 * Math.sin(t / 5), 0, 1, 0);
		break;
	default:
		gluLookAt(3 * Math.cos(t / 4), 7 * Math.cos(t / 6),
				5 * Math.sin(t / 3), 1 * Math.cos(t / 5), 1 * Math.cos(t / 7),
				1 * Math.sin(t / 4), 0, 1, 0);
		break;
	}
	;

	if (t < 3) {
		glTranslatef(0, 0, 10 - t * 3.3333);
	}
	;

	if (t > 21) {
		glTranslatef(0, 0, (t - 21) * (t - 21) * 3);
	}
	;

	glRotatef(130, Math.sin(t / 8), Math.sin(t / 5), Math.cos(t / 3));

	p_cubes_render_world(t);

	for (i = 0; i < 10; i++) {
		var t2 = t - i / 3.0;
		var x = 1 * Math.cos(t2 * 3.142 / 2);
		var y = 1 * Math.sin(t2 * 3.142 / 4);
		var z = 1 * Math.cos(t2 * 3.142 / 3);
		p_cubes_render_flow(t + i, x, y, z, 1, 0.3, 0.2);
		p_cubes_render_flow(t + i, y, z, x, 0.3, 1, 0.2);
		p_cubes_render_flow(t + i, z, x, y, 0.2, 0.3, 1);
	}
	;

}
