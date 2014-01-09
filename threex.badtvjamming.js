/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};


THREEx.BadTVJamming	= function(badTVPasses, context, destination){
	destination	= destination	|| context.destination
	
	var badTVSound	= new THREEx.BadTVSound(context, destination)


	/**
	 * true if a jamming is in progress, false otherwise
	 * @type {Boolean}
	 */
	this.inProgress	= false
	this.trigger	= function(passesFirstLabel, passesLastLabel, nShakeSteps, tweenDelay){
		// default values for arguments
		console.assert( typeof(presetLabel) === 'string' )
		console.assert( typeof(nShakeSteps) === 'number' )
		console.assert( typeof(tweenDelay) === 'number' )
		// prevent another trigger when a jamming is in progress
		if( this.inProgress === true )	return
		this.inProgress	= true
		// start the sound
		badTVSound.play()
		
		// set initial params
		badTVPasses.params.preset(passesFirstLabel)
		badTVPasses.onParamsChange()
		
		// handle badTVPasses.params animation
		badTVPasses.tweenDelay	= tweenDelay

		badTVPasses.addEventListener('tweenCompleted', function callback(){
			// if it is the last shake, return now
			if( nShakeSteps === 0 )	return
			// count this shake
			nShakeSteps	-= 1;
			if( nShakeSteps > 0 ){
				// start the next shake
				badTVPasses.params.preset(passesFirstLabel)			
			}else{
				// end all shake
				badTVPasses.params.preset(passesLastLabel)
				badTVPasses.removeEventListener('tweenCompleted', callback)
				this.inProgress	= false
			}
			badTVPasses.onParamsChange()		
		}.bind(this))
	}


	//////////////////////////////////////////////////////////////////////////////////
	//		presets								//
	//////////////////////////////////////////////////////////////////////////////////

	/**
	 * Presets you can use
	 * @type {Object}
	 */
	this.presets	= {
		'lightNoScroll'	: ['light' , 'resetInterlace'	,  2, 0.1],
		'strongScrolly'	: ['strong', 'resetInterlace'	, 10, 0.10]
	}
	this.preset	= function(label){
		console.assert(label in this.presets === true)
		var presetArgs	= this.presets[label]
		this.trigger.apply(this, presetArgs)
	}
}
