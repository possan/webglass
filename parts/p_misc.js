// misc parter
// #include "almosteverything.h"
// #include "images.h"

function p_whiteflash_run( e ) {
	
	glMatrixMode( GL_PROJECTION );
	glLoadIdentity();
//	glOrtho(-1, 1, -0.75, 0.75, -100, 100);

	glMatrixMode( GL_MODELVIEW );
	glLoadIdentity();

	gl.disable( gl.TEXTURE_2D );
	gl.blendFunc( gl.ONE, gl.ONE );
	gl.enable( gl.BLEND );
	glBegin( GL_QUADS );

	var b = 1/(1+e.localTime*10);// >renderAmount;
	glColor4f( b, b, b, b );

	glaQuadR( 0,0,0, 0, 1,1, 0,0,0,0 );

	glEnd();
}

function p_fadeblack_run( e ) {
	glMatrixMode( GL_PROJECTION );
	glLoadIdentity();
//	glOrtho(-1, 1, -0.75, 0.75, -100, 100);
	
	glMatrixMode( GL_MODELVIEW );
	glLoadIdentity();	


	gl.disable( gl.TEXTURE_2D );
	gl.blendFunc( gl.ZERO, gl.ONE_MINUS_SRC_COLOR );
	gl.enable( gl.BLEND );
	glBegin( GL_QUADS );

	var b = 1.0 - (1/(1+e.localTime*20));// >renderAmount;
	glColor3f( b, b, b );
	glaQuadR( 0,0,0, 0, 1,1, 0,0,0,0 );

	glEnd();
}

function p_static_run( e ) {

	glMatrixMode( GL_PROJECTION );
	glLoadIdentity();
	// glOrtho(-1, 1, -0.75, 0.75, -100, 100);

	glMatrixMode( GL_MODELVIEW );
	glLoadIdentity();

	gl.enable( gl.BLEND );
	gl.blendFunc( gl.ZERO, gl.ONE );
	var u = e.localTime;
	var b = e.customData / 255.0;

	glaSetTexture( GIF_CLOUDS );
	glBegin( GL_QUADS ); 
	glColor3f( b,b,b );
	glaQuadR( 0,0,0, 0, 1,1, u,0.1,u+0.01,-1.2 );
	// glaQuad( 0,0,0, 1,1, u,1.1f,u+0.001f,-1.3f );
	glEnd();

}

function p_futurama_run( e ) {
/*
 * float x0, y0, x1, y1, u0, u1, v0, v1; float b = e->renderAmount; float t =
 * e->localTime;
 * 
 * glMatrixMode( GL_MODELVIEW ); glLoadIdentity(); glMatrixMode( GL_PROJECTION );
 * glLoadIdentity();
 * 
 * glBlendFunc( GL_ONE, GL_ONE ); glEnable( GL_BLEND ); glaSetTexture(
 * GIF_CLOUDS ); glBegin( GL_QUADS );
 * 
 * for( int i=0; i<100; i++ ) {
 * 
 * u0 = (float)i/33; u1 = (float)(i+1)/33; v0 = t/4; v1 = v0-0.01f;//+0.01f;
 * 
 * x0 = 2.0f*(float)cos( (float)i*3.142/50 ); y0 = 2.0f*(float)sin(
 * (float)i*3.142/50 ); x1 = 2.0f*(float)cos( ((float)i+1)*3.142/50 ); y1 =
 * 2.0f*(float)sin( ((float)i+1)*3.142/50 );
 * 
 * glColor3f( 0.1f*b, 0.3f*b, 0.7f*b);
 * 
 * glTexCoord2f( u1, v0 ); glVertex3f( 0,0,0 );
 * 
 * glTexCoord2f( u0, v0 ); glVertex3f( 0,0,0 );
 * 
 * glColor3f( 0.001f*b, 0.003f*b, 0.006f*b);
 * 
 * glTexCoord2f( u0, v1 ); glVertex3f( x0, y0, 0 );
 * 
 * glTexCoord2f( u1, v1 ); glVertex3f( x1, y1, 0 );
 *  }; glEnd();
 */
}

function p_fulintro_run( e ) {

	var b = 1.0;
	var t = e.localTime;
	
	glMatrixMode( GL_PROJECTION );
	glLoadIdentity();
//	glOrtho(-1, 1, -0.75, 0.75, -100, 100);

	glMatrixMode( GL_MODELVIEW );
	glLoadIdentity();

	gl.blendFunc( gl.ONE, gl.ONE );
	gl.enable( gl.BLEND );
	glaSetTexture( GIF_CLOUDS );
	glBegin( GL_QUADS );
 	glaSetTexture( GIF_FONT );
	b = e.renderAmount;
	glColor3f( b, b, b );
	switch( e.customData ) {
		case 0:
			glaDrawString( 0,0,0, 0.04,0.04,0.04, "april 2000, norway..." );
			break;
		case 1:
			glaDrawString( 0,0,0, 0.04,0.04,0.04, "you're not dreaming..." );
			break;
		case 2:
			glaDrawString( 0,0,0, 0.04,0.04,0.04, "vi kan javascript! :)" );
			break;
	}
	glEnd();
}

function p_hanzon_run( e ) {
	
	glMatrixMode( GL_PROJECTION );
	glLoadIdentity();
//	glOrtho(-1, 1, -0.75, 0.75, -100, 100);
	
	glMatrixMode( GL_MODELVIEW );
	glLoadIdentity();

	var b = 0.3 * e.renderAmount;
	// console.log( "b="+b);
	// rita hanson

	gl.disable(gl.DEPTH_TEST);
	gl.disable(gl.CULL_FACE);
	gl.depthFunc( gl.ALWAYS );

	gl.enable( gl.BLEND );
	gl.blendFunc( gl.SRC_COLOR, gl.ONE );
	
	glaSetTexture( GIF_SILU );
//	glaSetTexture( GIF_FONT );
	
	glBegin( GL_QUADS );
	glColor4f( b, b, b, 1 );
	glaQuadR( -0.5,-0.1,0, 0, 0.4, 1.0, 0.01, 0.99, 0.99,0.01 );
	glEnd();
}

