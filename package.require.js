define( [ 'module'
	, './threex.badtvpasses.js',
	, './threex.badtvdatgui.js',
	, './threex.badtvsound.js',
	, './threex.badtvjamming.js',
	, './shaders/BadTVShader.js',
	, './shaders/FilmShader.js',
	, './shaders/RGBShiftShader.js',
	, './shaders/StaticShader.js',
	], function(module){
	THREEx.BadTVSound.baseUrl	= module.uri+'/../'
});