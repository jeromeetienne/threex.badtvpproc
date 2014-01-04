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
	this.trigger	= function(){
		// prevent another trigger when a jamming is in progress
		if( this.inProgress === true )	return
		this.inProgress	= true
		// start the sound
		badTVSound.play()
		
		// set initial params
		badTVPasses.params.randomize()
		badTVPasses.onParamsChange()
		
		// handle badTVPasses.params animation
		badTVPasses.tweenDelay	= 0.1
		var nShakeSteps		= 10
		badTVPasses.addEventListener('tweenCompleted', function callback(){
			// if it is the last shake, return now
			if( nShakeSteps === 0 )	return
			// count this shake
			nShakeSteps	-= 1;
			if( nShakeSteps > 0 ){
				// start the next shake
				badTVPasses.params.randomize()			
			}else{
				// end all shake
				badTVPasses.params.reset()
				badTVPasses.removeEventListener('tweenCompleted', callback)
				this.inProgress	= false
			}
			badTVPasses.onParamsChange()		
		}.bind(this))
	}
}
