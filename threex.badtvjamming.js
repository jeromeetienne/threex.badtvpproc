/**
 * vendor.js framework definition
 * @type {Object}
 */
var THREEx	= THREEx || {};


THREEx.BadTVJamming	= function(badTVPasses, context, destination){
	destination	= destination	|| context.destination
	
	var badTVSound	= new THREEx.BadTVSound(context, destination)

	this.trigger	= function(){
		badTVPasses.params.randomize()
		badTVPasses.onParamsChange()
		// NOTE: assume a given badTVPasses
		badTVSound.tweenDelay	= 0.1
		var nShakeSteps		= 30

		badTVSound.play()

		badTVPasses.addEventListener('tweenCompleted', function callback(){
			nShakeSteps	-= 1;
			if( nShakeSteps > 0 ){
				badTVPasses.params.randomize()			
			}else{
				badTVPasses.params.reset()
				badTVPasses.removeEventListener('tweenCompleted', callback)
			}
			badTVPasses.onParamsChange()		
		})		
	}
}