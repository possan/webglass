// portions from: https://cyanox.nl/trac/peragro/browser/branches/assetserver/assets/templates/js/webgl/csview.js?rev=3477
// 

var GL_PROJECTION = 1;
var GL_MODELVIEW = 2;
var GL_TEXTURE = 3;
var GL_NORMAL = 3;

var GL_QUADS = 10;
var GL_TRIANGLES = 11;

var gl_trianglecounter;

var modelMatrixStack = [];
var projMatrixStack = [];
var texMatrixStack = [];
var normMatrixStack = [];
var modelMatrix = Matrix.I(4);
var projMatrix = Matrix.I(4);
var texMatrix = Matrix.I(4);
var normMatrix = Matrix.I(4);
var matrixmode = 0;

function glCompabilityBeforeFrame() {
	modelMatrixStack = [];
	projMatrixStack = [];
	texMatrixStack = [];
	normMatrixStack = [];
	modelMatrix = Matrix.I(4);
	projMatrix = Matrix.I(4);
	texMatrix = Matrix.I(4);
	normMatrix = Matrix.I(4);
	matrixmode = GL_MODELVIEW;
}

function multMatrix(m) {
	if (matrixmode == GL_MODELVIEW)
		modelMatrix = modelMatrix.x(m);
	if (matrixmode == GL_PROJECTION)
		projMatrix = projMatrix.x(m);
	if (matrixmode == GL_TEXTURE)
		texMatrix = texMatrix.x(m);
	if (matrixmode == GL_NORMAL)
		normMatrix = normMatrix.x(m);
}
function glMatrixMode(mm) {
	matrixmode = mm;
}
function glPushMatrix(m) {
	if (matrixmode == GL_MODELVIEW) {
		if (m) {
			modelMatrixStack.push(m.dup());
			modelMatrix = m.dup();
		} else {
			modelMatrixStack.push(modelMatrix.dup());
		}
	}
	if (matrixmode == GL_PROJECTION) {
		if (m) {
			projMatrixStack.push(m.dup());
			projMatrix = m.dup();
		} else {
			projMatrixStack.push(projMatrix.dup());
		}
	}
	if (matrixmode == GL_TEXTURE) {
		if (m) {
			texMatrixStack.push(m.dup());
			texMatrix = m.dup();
		} else {
			texMatrixStack.push(texMatrix.dup());
		}
	}
	if (matrixmode == GL_NORMAL) {
		if (m) {
			normMatrixStack.push(m.dup());
			normMatrix = m.dup();
		} else {
			normMatrixStack.push(normMatrix.dup());
		}
	}
}
function glPopMatrix() {
	if (matrixmode == GL_MODELVIEW) {
		if (modelMatrixStack.length == 0)
			return;
		modelMatrix = modelMatrixStack.pop();
	}
	if (matrixmode == GL_PROJECTION) {
		if (projMatrixStack.length == 0)
			return;
		projMatrix = projMatrixStack.pop();
	}
	if (matrixmode == GL_TEXTURE) {
		if (texMatrixStack.length == 0)
			return;
		texMatrix = texMatrixStack.pop();
	}
	if (matrixmode == GL_NORMAL) {
		if (normMatrixStack.length == 0)
			return;
		normMatrix = normMatrixStack.pop();
	}
}
function glLoadIdentity() {
	var m = Matrix.I(4);
	glPushMatrix(m);
}
function glRotatef(a, x, y, z) {
	var arad = a * Math.PI / 180.0;
	var m = Matrix.Rotation(arad, $V( [ x, y, z ])).ensure4x4();
	multMatrix(m);
}
function glScalef(x, y, z) {
	var m = Matrix.Diagonal( [ x, y, z, 1 ]);
	multMatrix(m);
}
function glTranslatef(x, y, z) {
	var m = Matrix.Translation($V( [ x, y, z ])).ensure4x4();
	multMatrix(m);
}

var vbVerts = [];
var vbColors = [];
var vbTex = [];
var vbTempVerts = [];
var vbTempColors = [];
var vbTempTex = [];
var bufVertex = 0;
var bufColor = 0;
var bufTex = 0;
var maxpoints = 0;
var lastbeginmode = 0;
var vbpos = 0;
var vbcounter = 0;
var tempvbcounter = 0;
var vertindex = 0;
var colorindex = 0;
var texindex = 0;
var tempvertindex = 0;
var tempcolorindex = 0;
var temptexindex = 0;
var lastcolor_r = 0;
var lastcolor_g = 0;
var lastcolor_b = 0;
var lastcolor_a = 0;
var lasttex_u = 0;
var lasttex_v = 0;

function glInitImmediateBuffers() {
	/*
	 * maxpoints = 100000;
	 * 
	 * vbVerts = (GL*)malloc(sizeof(GL) * 3 * maxpoints); vbColors =
	 * (GL*)malloc(sizeof(GL) * 4 * maxpoints); vbTex = (GL*)malloc(sizeof(GL) *
	 * 2 * maxpoints); vbTempVerts = (GL*)malloc(sizeof(GL) * 3 * 10);
	 * vbTempColors = (GL*)malloc(sizeof(GL) * 4 * 10); vbTempTex =
	 * (GL*)malloc(sizeof(GL) * 2 * 10);
	 */
}

function glFreeImmediateBuffers() {
	/*
	 * free( vbVerts ); free( vbColors ); free( vbTex ); free( vbTempVerts );
	 * free( vbTempColors ); free( vbTempTex );
	 */
}

var texturecache = {};
var last_texture = 0;

function UPLOADMACRO(id, filename) {
	if (console && console.log)
		console.log("load file " + filename + " as #" + id)

	var tex = gl.createTexture();
	texturecache[id] = tex;

	var img = new Image();
	img.onload = function(self) {
		console.log('image #' + id + ' loaded. (' + filename + ', ' + img.width
				+ 'x' + img.height + ')');
		gl.bindTexture(gl.TEXTURE_2D, tex);
		gl
				.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,
						gl.UNSIGNED_BYTE, img);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
		gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER,
				gl.LINEAR_MIPMAP_NEAREST);
		gl.generateMipmap(gl.TEXTURE_2D);
		gl.bindTexture(gl.TEXTURE_2D, null);
	};
	img.src = "parts/" + filename;
}

function glaSetTexture(n) {
	last_texture = n;
}

function glBegin(beginmode) {
	// console.log('glBegin');

	lastbeginmode = beginmode;
	vbcounter = 0;
	vertindex = 0;
	texindex = 0;
	colorindex = 0;
	tempvertindex = 0;
	temptexindex = 0;
	tempcolorindex = 0;
}

function glTexCoord2f(u, v) {
	lasttex_u = u;
	lasttex_v = v;
}

function glColor3f(r, g, b) {
	glColor4f(r, g, b, 1.0);
}

function glNormal3f(x,y,z) {
}

function glColor4f(r, g, b, a) {
	lastcolor_r = r;
	lastcolor_g = g;
	lastcolor_b = b;
	lastcolor_a = a;
}

function addTempVertex(localindex) {
	for ( var i = 0; i < 2; i++)
	//	vbTex[texindex++] = (Math.random() * 15.0);
		vbTex[texindex++] = vbTempTex[localindex * 2 + i];

	for ( var i = 0; i < 4; i++)
		vbColors[colorindex++] = vbTempColors[localindex * 4 + i];

	for ( var i = 0; i < 3; i++)
		vbVerts[vertindex++] = vbTempVerts[localindex * 3 + i];

	vbcounter++;
}

function glVertex3f(x, y, z) {
	// console.log( "vertex",x,y,z );
	vbTempTex[temptexindex++] = lasttex_u;
	vbTempTex[temptexindex++] = lasttex_v;
	vbTempColors[tempcolorindex++] = lastcolor_r;
	vbTempColors[tempcolorindex++] = lastcolor_g;
	vbTempColors[tempcolorindex++] = lastcolor_b;
	vbTempColors[tempcolorindex++] = lastcolor_a;
	vbTempVerts[tempvertindex++] = x;
	vbTempVerts[tempvertindex++] = y;
	vbTempVerts[tempvertindex++] = z;
	tempvbcounter++;

	var reset = 0;
	switch (lastbeginmode) {
	case GL_QUADS: {
		if (tempvbcounter == 4) {
			addTempVertex(0);
			addTempVertex(1);
			addTempVertex(3);
			addTempVertex(1);
			addTempVertex(2);
			addTempVertex(3);
			reset = 1;
		}
		break;
	}
	case GL_TRIANGLES: {
		if (tempvbcounter == 3) {
			addTempVertex(0);
			addTempVertex(1);
			addTempVertex(2);
			reset = 1;
		}
		break;
	}
	default:
		reset = 1;
		break;
	}

	if (reset == 1) {
		tempvbcounter = 0;
		tempvertindex = 0;
		temptexindex = 0;
		tempcolorindex = 0;
	}
}

function glEnd() {

	// console.log("glEnd, draw " + vbcounter + " triangles");

	if (bufVertex == 0)
		bufVertex = gl.createBuffer();
	if (bufColor == 0)
		bufColor = gl.createBuffer();
	if (bufTex == 0)
		bufTex = gl.createBuffer();

	if (last_texture != 0) {
		// gl.activeTexture(gl.TEXTURE0);
		gl.activeTexture(gl.TEXTURE0);
		gl.bindTexture(gl.TEXTURE_2D, texturecache[last_texture]);
		// gl.bindTexture(gl.TEXTURE_2D, crateTexture);
		gl.uniform1i(shaderProgram.textureSampler, 0);
		gl.uniform1i(shaderProgram.textureEnabler, 1);
		gl.enable(gl.TEXTURE_2D);
	} else {
		gl.activeTexture(gl.TEXTURE0);
		gl.uniform1i(shaderProgram.textureEnabler, 0);
		gl.disable(gl.TEXTURE_2D);
	}

	gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, new Float32Array(
			projMatrix.flatten()));
	gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, new Float32Array(
			modelMatrix.flatten()));
	gl.uniformMatrix4fv(shaderProgram.tMatrixUniform, false, new Float32Array(
			texMatrix.flatten()));
	gl.uniformMatrix4fv(shaderProgram.nMatrixUniform, false, new Float32Array(
			normMatrix.flatten()));

	// gl.uniform1i(shaderProgram.textureSampler, last_texture);
	// gl.uniform1i(shaderProgram.textureEnabler, last_texture > 0);

	gl.bindBuffer(gl.ARRAY_BUFFER, bufVertex);
	bufVertex.itemSize = 3;
	bufVertex.numItems = vbcounter;
	gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, 3, gl.FLOAT,
			false, 0, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vbVerts), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

	gl.bindBuffer(gl.ARRAY_BUFFER, bufTex);
	bufTex.itemSize = 2;
	bufTex.numItems = vbcounter;
	gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, 2, gl.FLOAT,
			false, 0, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vbTex), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

	gl.bindBuffer(gl.ARRAY_BUFFER, bufColor);
	bufColor.itemSize = 4;
	bufColor.numItems = vbcounter;
	gl.vertexAttribPointer(shaderProgram.vertexColorAttribute, 4, gl.FLOAT,
			false, 0, 0);
	gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vbColors), gl.STATIC_DRAW);
	gl.enableVertexAttribArray(shaderProgram.vertexColorAttribute);

	gl.drawArrays(gl.TRIANGLES, 0, vbcounter);

	gl_trianglecounter += vbcounter;
}

function gluLookAtX(ex, ey, ez, lx, ly, lz, ux, uy, uz) {
	var m = makeLookAt(ex, ey, ez, lx, ly, lz, ux, uy, uz);
	multMatrix(m);
}

function gluLookAt(ex, ey, ez, lx, ly, lz, ux, uy, uz) {
	var m = makeLookAt(ex, ey, ez, lx, ly, lz, ux, uy, uz);
	multMatrix(m);
}

function gluPerspective(fovy, aspect, zNear, zFar) {
	var xmin, xmax, ymin, ymax;
	if (zNear < 0.001)
		zNear = 0.001;
	ymax = zNear * Math.tan(fovy * M_PI / 360.0);
	ymin = -ymax;
	xmin = ymin * aspect;
	xmax = ymax * aspect;
	m = makeFrustum(xmin, xmax, ymin, ymax, zNear, zFar);
	multMatrix(m);
}

function glOrtho(left, right, top, bottom, nearz, farz) {
	if (nearz < 0.001)
		nearz = 0.001;
	var m = makeOrtho(left, right, top, bottom, nearz, farz);
	multMatrix(m);
}

function glFrustum(left, right, top, bottom, nearz, farz) {
	if (nearz < 0.001)
		nearz = 0.001;
	var m = makeFrustumf(left, right, top, bottom, nearz, farz);
	multMatrix(m);
}

function glClearDepth(farz) {
	gl.clearDepthf(farz);
}
