function glaCls(mb) {

	glaSetTexture(0);
	if (mb > 0) {
		gl.enable(gl.BLEND);
		gl.enable(gl.ALPHA);
		gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
		glPushMatrix();
		glLoadIdentity();
		glBegin(gl.QUADS);
		glColor4f(0.0, 0.0, 0.0, mb);
		glVertex3f(-1, -1.0, 0);
		glVertex3f(1, -1.0, 0);
		glVertex3f(1, 1.0, 0);
		glVertex3f(-1, 1.0, 0);
		glEnd();
		glPopMatrix();
		gl.disable(gl.ALPHA);
		gl.disable(gl.BLEND);
		gl.clear(gl.DEPTH_BUFFER_BIT);
	} else {
		gl.clearColor(0, 0, 0, 0);
		gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
	}
}

function glaQuad(xc, yc, zc, xr, yr, u1, v1, u2, v2) {
	glTexCoord2f(u1, v1);
	glVertex3f(xc - xr, yc - yr, zc);
	glTexCoord2f(u2, v1);
	glVertex3f(xc + xr, yc - yr, zc);
	glTexCoord2f(u2, v2);
	glVertex3f(xc + xr, yc + yr, zc);
	glTexCoord2f(u1, v2);
	glVertex3f(xc - xr, yc + yr, zc);
};

function glaRotate2d( x, y, r) {
	var xx, yy;
	xx = x * Math.cos(r) + y * Math.sin(r);
	yy = x * -Math.sin(r) + y * Math.cos(r);
	return {
		x : xx,
		y : yy
	}
}

function glaQuadR(xc, yc, zc, angle, xr, yr, u1, v1, u2, v2) {

	var r = [];
	var rangle = angle * M_PI / 180;
	
	// console.log( r);

	r.push(glaRotate2d(-xr, -yr, rangle));
	r.push(glaRotate2d(xr, -yr, rangle));
	r.push(glaRotate2d(xr, yr, rangle));
	r.push(glaRotate2d(-xr, yr, rangle));

//	console.log(r);

	glTexCoord2f(u1, v1);
	glVertex3f(xc + r[0].x, yc + r[0].y, zc);

	glTexCoord2f(u2, v1);
	glVertex3f(xc + r[1].x, yc + r[1].y, zc);

	glTexCoord2f(u2, v2);
	glVertex3f(xc + r[2].x, yc + r[2].y, zc);

	glTexCoord2f(u1, v2);
	glVertex3f(xc + r[3].x, yc + r[3].y, zc);
}

function glaDefaultProjection() {
	gl.clearColor(0, 0, 0, 0);

	glMatrixMode(gl.PROJECTION);
	glLoadIdentity();
	glOrtho(-1, 1, -0.75, 0.75, -100, 100); // glOrtho( -1, 1, -1, 1, -100, 100
	// );

	glMatrixMode(gl.MODELVIEW);
	glLoadIdentity();

	glMatrixMode(gl.TEXTURE);
	glLoadIdentity();

	gl.enable(gl.DEPTH_TEST);
	gl.depthFunc(gl.LEQUAL);
	gl.clearDepth(1.0);
}

// char *fonttable = "abcdefghijklmnopqrstuvwxyz0123456789.,:;@!\"/\\-+()&%~?#";
var fonttable = "abcdefghijklmnopqrstuvwxyz0123456789!?@\"':,.-/()_";

function misc_strlen(str) {
	return str.length;
	// long l = 0;
	// while( str[l] != 0 ) l++;
	// return l;
}

function glaDrawChar(x, y, z, width, height, ch) {

	var ctn = misc_strlen(fonttable);
	var f = -1;

	if (ch == 32)
		return; // space...

	var n;
	if (height == 0 || width == 0)
		return;

	for (n = 0; n < ctn; n++)
		if (fonttable[n] == ch)
			f = n;
	if (f == -1)
		return;

	var num = (1024.0 / 16.0);
	var one = 1.0 / num;
	var v1, v2;
	v2 = f * one;
	v1 = v2 + one * 15.0 / 16.0; // *FULKÅD*

	glaQuad(x, y, z, width, height, 0, v1, 1, v2);
};

function glaDrawString(xc, yc, zc, w, h, spacing, texten) {

	var l = misc_strlen(texten);
	var x1 = xc - (l * spacing / 2);
	var j;
	for (j = 0; j < l; j++) {
		glaDrawChar(x1 + (j * spacing), yc, zc, w, h, texten[j]);
	}
}

function glaDrawStringL(xc, yc, zc, w, h, spacing, texten) {

	var l = misc_strlen(texten);
	var j;
	for (j = 0; j < l; j++) {
		glaDrawChar(xc + (j * spacing), yc, zc, w, h, texten[j]);
	}
}
