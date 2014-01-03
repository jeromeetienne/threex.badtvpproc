/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};

THREEx.BadTVSound	= function(context, destination, onLoad, onError){
	var buffer	= null
	// start loading the sound
	var url		= THREEx.BadTVSound.baseUrl + 'sounds/132834__bekir-virtualdj__electric.mp3'
	var url		= THREEx.BadTVSound.baseUrl + 'sounds/19487__halleck__jacobsladdersingle2.wav'
	loadSoundWebAudio(url, function(decodedBuffer){
		buffer	= decodedBuffer
	}, onLoad, onError);

	/**
	 * test if the sound is ready to be played
	 * @return {Boolean} true if the sound is ready, false otherwise
	 */
	this.isReady	= function(){
		return buffer === null ? false : true
	}
	/**
	 * play the sound
	 */
	this.play	= function(){
		if( !buffer )	return;
		// BufferSource
		var source	= context.createBufferSource();
		source.buffer	= buffer;
		source.connect(destination);
		source.start(0)
		return source
	}
	
	/**
	 * Load and decode a sound
	 */
	function loadSoundWebAudio(url, onLoad, onError){
		onLoad	= onLoad	|| function(){}
		onError	= onError	|| function(){}
		var request = new XMLHttpRequest();
		request.open('GET', url, true);
		request.responseType = 'arraybuffer';
		request.onload = function() {
			context.decodeAudioData(request.response, onLoad, onError);
		}
		request.send();
	}
}

THREEx.BadTVSound.baseUrl	= '../'