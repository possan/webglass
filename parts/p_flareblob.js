// flareblob
// #include "almosteverything.h"
// #include "images.h"

//#define FLAREBLOB_FLARE 10
//#define FLAREBLOB_LOGO 11

// void p_flareblob_init() {
//	glaUploadGif( FLAREBLOB_FLARE, (unsigned char *)&gif_flare, 0x01020304 );
//	glaUploadGif( FLAREBLOB_LOGO, (unsigned char *)&gif_psikorp2, 0x01020304 );
// };

// void p_flareblob_kill() {
// };

// #define sqr(x) ((x)*(x))

function p_flareblob_run() {
/*
	float rx, ry, rz, t;
	float mbx1, mby1, mbz1;
	float mbx2, mby2, mbz2;

	glaReset();
	do {
		t = glaRelBeat() / 2.0f;
		//b = glaBeat();

		glaCls(0.33f);
	glBlendFunc( GL_ONE, GL_ONE );

	mbx1 = (float)(5.0f*sin( (t+32.0f)*M_PI/4.5f ));
		mby1 = (float)(5.0f*cos( (t+15.0f)*M_PI/2.2f ));
		mbz1 = (float)(5.0f*cos( (t+65.0f)*M_PI/6.3f ));
		mbx2 = (float)(5.0f*sin( (t+43.0f)*M_PI/5.1f ));
		mby2 = (float)(5.0f*cos( (t+57.0f)*M_PI/3.5f ));
		mbz2 = (float)(5.0f*sin( (t+93.0f)*M_PI/7.4f ));

		if( t>2 && t<4 ) {
			rx = 2143.40f * t;
			ry = 3052.3f * t;
			rz = 4875.6f * t;
		} else if( t>6 && t<8 ) {
			rx = 3140.40f * t;
			ry = 5002.3f * t;
			rz = 2370.6f * t;
		} else if( t>10 && t<12 ) {
			rx = 11140.40f * t;
			ry = 9002.3f * t;
			rz = 17370.6f * t;
		} else {
			rx = 143.40f * t;
			ry = 2052.3f * t;
			rz = 3875.6f * t;
		};

		MATRIX m;
		build_rotation_matrix( rx, ry, rz, &m );

		 

		//glPointSize( 2 );
		//glEnable( GL_POINT_SIZE );

		glaSetTexture( GIF_PSIBAND );
		glEnable( GL_BLEND );

		{
			float r;
			glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );
		glBegin( GL_QUADS );
			for( int k=0; k<15; k++ ) {
				r = 0.3f + 0.2f*(float)sin(t*2.6f-((float)k*25)) + 0.2f*(float)cos(t*3.1f+((float)k*30));
				glColor3f( (float)k/150, (float)k/30, (float)k/110 );
				glaQuadR( 0.75f, (float)cos(k+t/8), 0.0f, 90, r*2.56f, r*0.64f, 0, 1, 1, 0 );
			};
		glEnd();
 

		}

			glTexEnvi(GL_TEXTURE_ENV, GL_TEXTURE_ENV_MODE, GL_MODULATE );
	glBlendFunc( GL_ONE, GL_ONE );

		glDisable( GL_BLEND );
		glDisable( GL_DEPTH_TEST );

		 
		glaSetTexture( GIF_FLARE );
		glEnable( GL_BLEND );

		glBegin( GL_QUADS );
		glColor3f( 0.4f, 0.4f, 0.4f );

		for( float k=-6; k<=6; k+=1 ) {
			for( float j=-6; j<=6; j+=1 ) {
				for( float i=-6; i<=6; i+=1 ) {

					VECTOR v, r;
					v.x = i;
					v.y = j;
					v.z = k;

					//glColor3f( 2 / (1+fabs((float)i*3)), 2 / (1+fabs((float)j*3)), 2 / (1+fabs((float)k*3)) );

					float d1 = (float)sqrt( sqr(v.x-mbx1) + sqr(v.y-mby1) + sqr(v.z-mbz1) );
					float d2 = (float)sqrt( sqr(v.x-mbx2) + sqr(v.y-mby2) + sqr(v.z-mbz2) );

					float ra;

					//ra = 0.7f + (0.4f*(float)sin(d1+d2));// + d2;
					ra = (float)sin((d1*d2)/12.0f);
					//ra *= 0.85+0.5*sin(d2/1);// + d2;

					ra *= 2.3f;

					//*ra = 4 + 3*sin( i*j*k+t );

					vector_mul( &m, &v, &r );

					vector_project( &r, &v, 67, -15 );

					v.x -= 0.4f;

					ra /= (float)(1+fabs((v.z*v.z*2500)));
					//ra
					ra -= 0.08f;
					if( ra > 0.3f ) ra = 0.3f;

					if( ra>0 ) {
						//glColor3f( ra*2.0, ra*1.5, ra*1.0 );
						//glColor3f( (float)k/50, (float)k/40, (float)k/30 );
						//glColor3f( ra*80/50, ra*80/40, ra*80/50 );
						glColor3f( 0.7f, 0.8f, 0.9f );
						glaQuad( v.x, v.y, v.z, ra, ra, 0, 1, 1, 0 );
					};
				};
			};
		};

		glEnd();

		//	glaSetTexture( FLAREBLOB_FLARE );

		//glEnable( GL_DEPTH_TEST );
		glaBlit();

	} while( !glaExit() && t<12 );
*/
};
