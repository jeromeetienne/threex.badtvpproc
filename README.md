threex.badtv
===================

threex.badtv is a three.js extension which provide an badtv effect. It is a post
processing cumulating various effects.
It is from the excelent [badtv demo](http://www.airtightinteractive.com/demos/js/badtvshader/)
of [@felixturner](https://twitter.com/felixturner).
You can see more of the good stuff what he does on
[his blog](http://www.airtightinteractive.com/news).

Status: super early

TODO
====
* create threex.badtvjam.js
  * .trigger()
* some shader are the same as in three.js distribution. DO NOT DUPLICATE code
  * RGBShiftShader
  * FilmShader
* DONE do a bad tv demo with webaudio API sound
  * find the sound on freesounds
    * this one http://www.freesound.org/people/Bekir_VirtualDJ/sounds/132834/
  * use tween.js for animation - i didnt
* DONE externalize the ping in demo
  * currently this is in dat.gui 
* DONE change to BatTVPasses.params.badTV
* DONE do an examples from threex boilerplate
* DONE do threex.badtvdatgui.js 
  * see threex.glowkeycolor.postprocdatgui.js or others
* DONE how to update the time in the shader
  * .update() function ?
  * isnt it already done by composer ?


Show Don't Tell
===============
* [examples/demo.html](http://jeromeetienne.github.io/threex.badtv/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.badtv/blob/master/examples/demo.html)\] :
It show a full featured demo using each aspect of this extension.
It uses require.js too.
* [examples/basic.html](http://jeromeetienne.github.io/threex.badtv/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.badtv/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/sound.html](http://jeromeetienne.github.io/threex.badtv/examples/sound.html)
\[[view source](https://github.com/jeromeetienne/threex.badtv/blob/master/examples/sound.html)\] :
It show up the 'jam the tv' effect. It animate ```threex.badtvpasses.js``` thru various 
random steps, thus it appears as a broken tv set. Additionally it use a 
[electric sound](http://www.freesound.org/people/Bekir_VirtualDJ/sounds/132834/)
from
[freesound](http://www.freesound.org/) and use ```threex.badtvsound.js``` to play it thru webaudio API.
* [examples/felixturner_badtv.html](http://jeromeetienne.github.io/threex.badtv/examples/felixturner_badtv.html)
\[[view source](https://github.com/jeromeetienne/threex.badtv/blob/master/examples/felixturner_badtv.html)\] :
It show the original demo from [@felixturner](https://twitter.com/felixturner).

How To Install It
=================

You can install it via script tag

```html
<script src='threex.badtv.js'></script>
```

Or you can install with [bower](http://bower.io/), as you wish.

```bash
bower install threex.badtv
```

How To Use It
=============

there is no real use as it is only a boilerplate for your own extension.

```javascript
var instance	= new THREEx.Sample()
```

threex.badtvpasses.js
=====================
It build the passes for the badTV effect.
It exposes ```badtvpasses.passes``` for a ```THREE.EffectComposer``` instance.

Create an instance

```
var badTVPasses	= new THREEx.BadTVPasses();
```

Everytime you render the scene, be sure to update it

```
badTVPasses.update(delta, now)		
```

threex.badtvsound.js
====================
It plays a electical sound thru Web Audio API. It is used to simulate
the noise made by a broken [cathod ray tube](http://en.wikipedia.org/wiki/Cathode_ray_tube).
First create the object.

```
var context		= new AudioContext()
var badTVSound		= new THREEx.BadTVSound(context, context.destination)
```

When you want to play it, do 

```
badTVSound.play()
```

threex.badtvdatgui.js
=====================

It provide an easy way to fine tune ```threex.badtvpasses``` parameters
thanks to 
[Dat.GUI](https://code.google.com/p/dat-gui/). 
It is interactive and simple!
The typical usage is just:

```
THREEx.addBadTVPasses2DatGui(badTVPasses)
```