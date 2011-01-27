// #include "testApp.h"
// #ifdef USEFMOD
// #include <minifmod.h>
// #endif
// #include "almosteverything.h"
// #include "parts.h"
// #include "images.h"
// #include <stdio.h>

var resettime;
var resetbeat;
var g_time;
// extern DWORD startbeat;

function glaSetTime(t) {
	g_time = t;
};

function glaTime() {
	return g_time;
};

function glaRelBeat() {
	return g_time;
};

function upload_images() {

	UPLOADMACRO(GIF_FLARE, "gif_flare.gif");
	UPLOADMACRO(GIF_PSIKORP2, "gif_psikorp2.gif");
	// UPLOADMACRO( GIF_FLOWER, gif_flower );
	UPLOADMACRO(GIF_GRID, "gif_grid.gif");
	// UPLOADMACRO( GIF_PSIBAND, gif_psiband );
	UPLOADMACRO(GIF_ROST, "gif_rost.gif");
	// UPLOADMACRO( GIF_LANDSCAPE, gif_landscape );
	UPLOADMACRO(GIF_CLOUDS, "gif_clouds.gif");
	UPLOADMACRO(GIF_PSIKORP3, "gif_psikorp3.gif");
	UPLOADMACRO(GIF_TITLE, "gif_title.gif");
	// UPLOADMACRO( GIF_FULL, gif_full );
	// UPLOADMACRO( GIF_TWISTER, gif_twister );
	UPLOADMACRO(GIF_TWISTER2, "gif_twister2.gif");
	// UPLOADMACRO( GIF_SYMBOLER, gif_symboler );
	// UPLOADMACRO( GIF_FACES, gif_faces );
	// UPLOADMACRO( GIF_KROM, gif_krom );
	UPLOADMACRO(GIF_PSIKORP4, "gif_psikorp4.gif");
	UPLOADMACRO(GIF_GREEN, "gif_green.gif");
	UPLOADMACRO(GIF_SILU, "gif_silu.gif");
	UPLOADMACRO(GIF_NAMES, "gif_names.gif");
}

function testApp__setup() {
	/*
	 * ofSetCircleResolution(50); ofBackground(0,0,0); ofSetWindowTitle("glAss
	 * openFrameworks port"); ofSetFrameRate(100);
	 * 
	 * _pd = (float *)malloc( 150*40*sizeof(float) ); _pu = (float *)malloc(
	 * 150*40*sizeof(float) ); _pv = (float *)malloc( 150*40*sizeof(float) );
	 * _pu2 = (float *)malloc( 150*40*sizeof(float) ); _pv2 = (float *)malloc(
	 * 150*40*sizeof(float) );
	 */
	music_init();
	// music.loadSound( "intromusic.xm" );
	// music.setMultiPlay( false );
	// undantag...

	UPLOADMACRO(GIF_FONT, "gif_font.gif");

	event_init();

	upload_images();
	p_cubes_init();
	p_greetings_init();
	p_klask_init();

	// initeringen kalas, glad påsk...
	// Sleep( 100 );
	// glaCls(0.33);

	// FÖRSTA TEXTEN I INTROT
	event_register(5, 5.2, p_tunnel_run, 1);
	event_register(5.1, 5.3, p_wirelandscape_run, 0);
	event_register(5.2, 5.4, p_sphere_run, 0);
	event_register(2, 5.5, p_fulintro_run, 0);

	// ANDRA TEXTEN I INTROT
	event_register(9, 9.2, p_cubes_run, 0);
	event_register(9.1, 9.3, p_psyk_run, 0);
	event_register(9.2, 9.4, p_twist3d_run, 0);
	event_register(6, 9.5, p_fulintro_run, 1);

	// TREDJE TEXTEN I INTROT
	event_register(13, 13.2, p_twist3d_run, 0);
	event_register(13.1, 13.3, p_psyk_run, 0);
	event_register(13.2, 13.4, p_tunnel_run, 1);
	event_register(10, 13.5, p_fulintro_run, 2);

	// FLIMMER I INTROT
	event_register(1, 13.7, p_static_run, 256);

	// FLASH Å SEN 64 SNURRA
	event_register(14, 15, p_whiteflash_run, 0);
	event_register(14, 29, p_wirelandscape_run, 0);

	// FLASH Å HANZON+PSYKSNURR (MUSIKEN KOMMER IGÅNG)
	event_register(29, 30, p_whiteflash_run, 0);
	event_register(29, 42, p_psyk_run, 0);
	event_register(41, 58, p_title_run, 3);
	event_register(29, 34, p_hanzon_run, 0);

	// VÅRA NAMN
	event_register(32, 35, p_name_run, 0);
	event_register(36, 39, p_name_run, 1);

	// TWISTERN SNURRAR IN... BÅDA TVÅ (2D OCH 3D)
	event_register(42, 58, p_twist3d_run, 0);
	event_register(42, 43, p_whiteflash_run, 0);
	event_register(39, 52, p_twister_run, 0);

	// KUBERNA (MUSIKEN LUGNAR NER SIG)
	event_register(58, 79, p_cubes_run, 0);
	event_register(58, 59, p_whiteflash_run, 0);

	// TUNNELN EFTERÅT, MED BLOBSPHERE
	event_register(79, 80, p_whiteflash_run, 0);
	event_register(79, 85, p_tunnel_run, 512);
	event_register(79, 85, p_sphere_run, 0);

	// FSOL PSYK
	event_register(85, 141, p_klask_run, 264);

	// ÖVERGÅR I GREETS, SOM ÖVERGÅR I TUNNEL
	event_register(85, 128, p_greetings_run, 0);
	event_register(85, 86, p_whiteflash_run, 0);
	event_register(100, 141, p_tunnel_run, 512);

	// TUNNELN ÖVERGÅR I '64' PLUS MASSOR AV EFFEKTER, COLOR DODGE'AT
	event_register(114, 124.0, p_wirelandscape_run, 0);
	event_register(114, 124.0, p_psyk_run, 2);
	event_register(114, 115, p_whiteflash_run, 0);
	// event_register( 125, 126, p_whiteflash_run, 0 );

	// LUGNARE MUSIK, EFTER UPPLADDNINGEN, BYT TILL FLUM MED FLASH
	event_register(124.0, 141, p_aftershit_run, 0);
	event_register(138.5, 141, p_fadeblack_run, 0);

	music_play();
}

function testApp__draw() {
	var t = glaTime();
	// console.log("begin draw, t=" + t);
	glaDefaultProjection();
	glaCls(0.33);
	event_run(t, 0);
	// console.log("efter draw");
	// kör 142 sekunder
}
