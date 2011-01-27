// name
// #include "almosteverything.h"
// #include "images.h"
// #include <stdlib.h>

var p_name_name = [ "illuminator", "h-ecs", "bajs1", "bajs2" ];

function p_name_run(e) {

	// glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER, GL_NEAREST );
	// glTexParameteri( GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER, GL_NEAREST );

	glMatrixMode(GL_PROJECTION);
	glLoadIdentity();
	// glOrtho(-1, 1, -0.75, 0.75, -100, 100);

	var t = e.localTime;

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();

	glaSetTexture(GIF_NAMES);

	var v = 0;
	v = e.customData / 2.0;

	gl.enable(gl.BLEND);
	// 	gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
	gl.blendFunc(gl.ONE, gl.ONE);
	glBegin(GL_QUADS);

	for ( var i = 0; i < 0.5; i += 0.1) {

		var t2 = t - (i / 5.0);
		var xs = 1.0 + 0.2 * Math.cos(t2 * 4);
		var ys = 1.0 + 0.2 * Math.sin(t2 * 3);
		var r = 10 * Math.cos(t2 * 5);

		var b = 1 / (1 + i * 100);
		var s = 1 + i;

		glColor3f(b, b, b);
		glaQuadR(0, 0, 0, r, 1.0 * xs * s, 0.30 * ys * s, 0, v + 0.49, 1,
				v + 0.01);

	}
	glEnd();

}

function p_title_run(e) {

	// gl.disable(gl.BLEND);
	// gl.blendFunc(gl.ONE, gl.ONE);

	glMatrixMode(GL_PROJECTION);
	// glScalef( 0.2, 0.3, 0.4 );
	glLoadIdentity();
//	glOrtho(-1, 1, -0.75, 0.75, -100, 100);

	glMatrixMode(GL_MODELVIEW);
	glLoadIdentity();
	glaSetTexture(GIF_TITLE);

	// glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_BLEND );
	// gl.blendFunc(gl.ZERO, gl.ONE_MINUS_SRC_COLOR);
	gl.blendFunc(gl.ONE, gl.ONE);
	gl.enable(gl.BLEND);
	var cd = (e.localTime);
	// if( cd<1 ) cd=1;
	var s = 0.7 + (3 / (cd * cd));
	if (s < 0.7)
		s = 0.7;
	var f = (e.localTime - 1.5) / 3;
	if (f > 1)
		f = 1;

	// console.log(cd,s,f)
	glBegin(GL_QUADS);
	glColor3f(f, f, f);
	glTexCoord2f(0, 1);
	glVertex3f(-1.024 * s, -0.256 * s, 0);
	glTexCoord2f(1, 1);
	glVertex3f(1.024 * s, -0.256 * s, 0);
	glTexCoord2f(1, 0);
	glVertex3f(1.024 * s, 0.256 * s, 0);
	glTexCoord2f(0, 0);
	glVertex3f(-1.024 * s, 0.256 * s, 0);
	glEnd();
}
