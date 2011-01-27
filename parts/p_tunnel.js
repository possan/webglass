// shit
// #include "almosteverything.h"
// #include "images.h"
// #include <stdlib.h>

function p_tunnel_function(t, u) {

	var a = 0.2 * Math.cos(t * 4);
	var b = 0.2 * Math.sin(t * 5);
	var r2 = 1.0 + a * Math.cos(((u * 3) - (t * 40)) * 3.142 / 50.0);
	r2 += b * Math.cos(((u * 2) - (t * 60)) * 3.142 / 50.0);

	var r = r2 * 40;// *sin( u*3.142/100 );
	var x = r * Math.cos(u * M_PI / 50);
	var y = r * Math.sin(u * M_PI / 50);
	// float y = r2*40*cos( u*3.142/100 );//(v-50);//40*sin( v*3.142/50 );

	return {
		x : x,
		y : y
	};
}

function p_tunnel_render(t, br) {

	var u, v;

	glaSetTexture(GIF_CLOUDS);

	glBegin(GL_QUADS);

	v = t / 5.0;

	for (u = 0; u < 100; u += 2) {

		var u1 = u / 100.0;
		var u2 = (u + 2) / 100.0;

		var a = p_tunnel_function(t, u);
		var b = p_tunnel_function(t, u + 2);

		glColor3f(0, 0, 0);

		glTexCoord2f(u2, v - 0.2);
		glVertex3f(b.x, b.y, -700);

		glTexCoord2f(u1, v - 0.2);
		glVertex3f(a.x, a.y, -700);

		glColor3f(1.0 * br, 0.6 * br, 0.3 * br);

		glTexCoord2f(u1, v - 0.1);
		glVertex3f(a.x, a.y, -200);

		glTexCoord2f(u2, v - 0.1);
		glVertex3f(b.x, b.y, -200);

		// glColor3f( 1.0f, 0.6f, 0.3f );

		glTexCoord2f(u1, v - 0.1);
		glVertex3f(a.x, a.y, -200);

		glTexCoord2f(u2, v - 0.1);
		glVertex3f(b.x, b.y, -200);

		glColor3f(0.2 * br, 0.4 * br, 0.6 * br);
		// glColor3f( 0.2f, 0.05f, 0.12f );

		glTexCoord2f(u2, v);
		glVertex3f(b.x, b.y, 0);

		glTexCoord2f(u1, v);
		glVertex3f(a.x, a.y, 0);

		glTexCoord2f(u1, v);
		glVertex3f(a.x, a.y, 0);

		glTexCoord2f(u2, v);
		glVertex3f(b.x, b.y, 0);

		glColor3f(1.0 * br, 0.6 * br, 0.3 * br);

		glTexCoord2f(u2, v + 0.1);
		glVertex3f(b.x, b.y, 200);

		glTexCoord2f(u1, v + 0.1);
		glVertex3f(a.x, a.y, 200);

		// glColor3f( 1.0f, 0.6f, 0.3f );

		glTexCoord2f(u1, v + 0.1);
		glVertex3f(a.x, a.y, 200);

		glTexCoord2f(u2, v + 0.1);
		glVertex3f(b.x, b.y, 200);

		glColor3f(0, 0, 0);

		glTexCoord2f(u2, v + 0.2);
		glVertex3f(b.x, b.y, 700);

		glTexCoord2f(u1, v + 0.2);
		glVertex3f(a.x, a.y, 700);

	}
	glEnd();

}

function p_tunnel_run(e) {
	var t;
	// console.log(e);
	gl.disable(gl.DEPTH_TEST);
	gl.disable(gl.CULL_FACE);

	t = e.localTime;

	gl.enable(gl.BLEND);
	gl.blendFunc(gl.ONE, gl.ONE);

	glMatrixMode(GL_TEXTURE);
	// gluLookAt( -0.7f*(float)cos(t/5), -0.7f*(float)cos(t/2),
	// -0.7f*(float)sin(t*1), 0, 0, 0, 0, 1, 0 );
	glLoadIdentity();

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	gluPerspective(125, 4 / 3, 1, 1000);
	// glTranslatef( 0,0,-70 );

	var z0, z1, r0;

	z0 = -10 + t;
	z1 = 10 - t;
	r0 = t * 2;
	if (r0 > 10)
		r0 = 10.0;
	// r1 = 0;

	// glRotatef( 60, cos(t*3),sin(t*2),cos(t/4) );

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	gluLookAt(r0 * Math.cos(t / 5), r0 * Math.cos(t / 2), z0 + r0
			* Math.sin(t * 1), 0, 0, z1, 0, 1, 0);

	// glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE);

	var b = t / (e.customData / 256.0);
	if (b > 1.0)
		b = 1.0;
	// console.log("t="+t+", b="+b);

	p_tunnel_render(t, b);

}
