var THREEx	= THREEx	|| {}
/**
 * the post processing passes for a BadTV effect
 * - ideas and shaders by @felixturner
 */
THREEx.BadTVPasses	= function(){
	// add EventDispatcher in this object
	THREE.EventDispatcher.prototype.apply(this)

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
			
	// create shaders passes
	var badTVPass	= new THREE.ShaderPass( THREE.BadTVShader );
	var rgbPass	= new THREE.ShaderPass( THREE.RGBShiftShader );
	var filmPass	= new THREE.ShaderPass( THREE.FilmShader );
	filmPass.uniforms[ "grayscale" ].value = 0;
	var staticPass	= new THREE.ShaderPass( THREE.StaticShader );

	this.addPassesTo	= function(composer){
		composer.addPass( filmPass );
		composer.addPass( badTVPass );
		composer.addPass( rgbPass );
		composer.addPass( staticPass );	
	}
	
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	this.update	= function(delta, now){
		badTVPass.uniforms[ 'time' ].value	= now
		filmPass.uniforms[ 'time' ].value	= now
		staticPass.uniforms[ 'time' ].value	= now

		if( tweenStartDate !== null ){
			var present	= Date.now()/1000
			if( present - tweenStartDate >= this.tweenDelay ){
				params.copy(tweenDstParams)
				tweenStartDate = null
				this.dispatchEvent({ type: 'tweenCompleted' })
			}else{
				var amount = (present - tweenStartDate) / this.tweenDelay
				// console.log('tweening', amount)
				params.lerp(tweenSrcParams, tweenDstParams, amount)
			}
			updateUniforms()	
		}
	}.bind(this)

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	var params	= new THREEx.BadTVPasses.Params()

	this.tweenDelay		= 0.1
	
	var tweenStartDate	= null
	var tweenSrcParams	= new THREEx.BadTVPasses.Params()
	var tweenDstParams	= new THREEx.BadTVPasses.Params()
	
	this.params	= tweenDstParams

	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////

	this.onParamsChange	= onParamsChange
	function onParamsChange() {
		// update value for tween
		tweenStartDate	= Date.now()/1000;
		tweenSrcParams.copy(params)
		
		updateUniforms()
	}
	function updateUniforms() {
		//copy gui params into shader uniforms
		badTVPass.uniforms[ "distortion" ].value	= params.badTV.distortion
		badTVPass.uniforms[ "distortion2" ].value	= params.badTV.distortion2
		badTVPass.uniforms[ "speed" ].value		= params.badTV.speed
		badTVPass.uniforms[ "rollSpeed" ].value		= params.badTV.rollSpeed
		badTVPass.uniforms[ "randomSeed" ].value	= params.badTV.randomSeed

		staticPass.uniforms[ "amount" ].value		= params.staticNoise.amount
		staticPass.uniforms[ "size" ].value		= params.staticNoise.size2

		rgbPass.uniforms[ "angle" ].value		= params.rgb.angle*Math.PI
		rgbPass.uniforms[ "amount" ].value		= params.rgb.amount

		filmPass.uniforms[ "sCount" ].value		= params.film.count
		filmPass.uniforms[ "sIntensity" ].value		= params.film.sIntensity
		filmPass.uniforms[ "nIntensity" ].value 	= params.film.nIntensity
	}
}

//////////////////////////////////////////////////////////////////////////////////
//		comment								//
//////////////////////////////////////////////////////////////////////////////////


/**
 * parameters for THREEx.BadTVPasses
 */
THREEx.BadTVPasses.Params	= function(){
	var film	= this.film	= {
		count		: 800,
		sIntensity	: 0.9,
		nIntensity	: 0.4
	}
	var badTV	= this.badTV	= {
		distortion	: 0.1,
		distortion2	: 0.1,
		speed		: 0.0,
		rollSpeed	: 0.0,
		randomSeed	: 0.0,
	}
	var rgb	= this.rgb	= {
		amount		: 0.0,
		angle		: 0.0,
	}
	var staticNoise	= this.staticNoise	= {
		amount		: 0.0,
		size2		: 4.0
	}
	//////////////////////////////////////////////////////////////////////////////////
	//		comment								//
	//////////////////////////////////////////////////////////////////////////////////
	
	this.lerp	= function(srcParams, dstParams, amount){
		// console.log('angle', this.rgb.angle, dstParams.rgb.angle)
		this.film.count		= compute(srcParams.film.count, dstParams.film.count)
		this.film.sIntensity	= compute(srcParams.film.sIntensity, dstParams.film.sIntensity)
		this.film.nIntensity	= compute(srcParams.film.nIntensity, dstParams.film.nIntensity)

		this.badTV.distortion	= compute(srcParams.badTV.distortion, dstParams.badTV.distortion)
		this.badTV.distortion2	= compute(srcParams.badTV.distortion2, dstParams.badTV.distortion2)
		this.badTV.speed	= compute(srcParams.badTV.speed, dstParams.badTV.speed)
		this.badTV.rollSpeed	= compute(srcParams.badTV.rollSpeed, dstParams.badTV.rollSpeed)

		// this.badTV.randomSeed	= compute(srcParams.badTV.randomSeed, dstParams.badTV.randomSeed)
		this.badTV.randomSeed	= dstParams.badTV.randomSeed

		this.rgb.angle		= compute(srcParams.rgb.angle, dstParams.rgb.angle)
		this.rgb.angle		= dstParams.rgb.angle
		this.rgb.amount		= compute(srcParams.rgb.amount, dstParams.rgb.amount)

		this.staticNoise.amount	= compute(srcParams.staticNoise.amount, dstParams.staticNoise.amount)
		this.staticNoise.size2	= compute(srcParams.staticNoise.size2, dstParams.staticNoise.size2)

		return
		
		function compute(srcValue, dstValue){
			return srcValue + (dstValue-srcValue)*amount
		}
	}
	
	this.copy	= function(other){
		this.badTV.distortion	= other.badTV.distortion
		this.badTV.distortion2	= other.badTV.distortion2
		this.badTV.speed	= other.badTV.speed
		this.badTV.rollSpeed	= other.badTV.rollSpeed
		this.badTV.randomSeed	= other.badTV.randomSeed

		this.staticNoise.amount	= other.staticNoise.amount
		this.staticNoise.size2	= other.staticNoise.size2

		this.rgb.amount		= other.rgb.amount
		this.rgb.angle		= other.rgb.angle

		this.film.count		= other.film.count
		this.film.sIntensity	= other.film.sIntensity
		this.film.nIntensity	= other.film.nIntensity
	}

	//////////////////////////////////////////////////////////////////////////////////
	//		presets								//
	//////////////////////////////////////////////////////////////////////////////////

	var presets	= this.presets	= {
		'reset'		: function(){
			badTV.distortion	= 0.1
			badTV.distortion2	= 0.1
			badTV.speed		= 0
			badTV.rollSpeed		= 0
			badTV.randomSeed	= 0
			rgb.angle		= 0
			rgb.amount		= 0
			staticNoise.amount	= 0
			// staticNoise.size2	= 0
			film.count	= 800;
			film.sIntensity	= 0.0;
			film.nIntensity	= 0.0;
		},
		'resetInterlace': function(){
			presets.reset()
			
			film.count	= 800;
			film.sIntensity	= 0.9;
			film.nIntensity	= 0.4;
		},
		'light'	: function(){
			badTV.distortion	= Math.random()*3+3;
			badTV.distortion2	= Math.random()*1+0.1;
			badTV.randomSeed	= Math.random()*150
			// badTV.speed		= Math.random()*.4;
			// badTV.rollSpeed		= Math.random()*.2;
			rgb.angle		= Math.random()*10/180*Math.PI*2;
			rgb.amount		= Math.random()*0.02+0.0;
			// staticNoise.amount	= Math.random()*0.2;
		},
		'strong'	: function(){
			badTV.distortion	= Math.random()*10+0.1;
			badTV.distortion2	= Math.random()*10+0.1;
			badTV.speed		= Math.random()*.4;
			badTV.rollSpeed		= Math.random()*.2;
			rgb.angle		= Math.random()*2;
			rgb.amount		= Math.random()*0.03;
			staticNoise.amount	= Math.random()*0.2;			
		},
	}
	
	this.preset	= function(label){
		console.assert(label in this.presets === true)
		var preset	= this.presets[label]
		preset()
	}

	this.reset	= function(){
		this.preset('reset')
	}
}