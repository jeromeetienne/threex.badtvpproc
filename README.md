threex.badtv
===================

threex.badtv is a three.js extension which provide an badtv effect. It is a post
processing cumulating various effects.
It is from the excelent [badtv demo](http://www.airtightinteractive.com/demos/js/badtvshader/)
of [@felixturner](https://twitter.com/felixturner).
You can see more of the good stuff what he does on
[his blog](http://www.airtightinteractive.com/news).

Show Don't Tell
===============
* [examples/demo.html](http://jeromeetienne.github.io/threex.badtvpproc/examples/demo.html)
\[[view source](https://github.com/jeromeetienne/threex.badtvpproc/blob/master/examples/demo.html)\] :
It show a full featured demo using each aspect of this extension.
It uses require.js too.
* [examples/basic.html](http://jeromeetienne.github.io/threex.badtvpproc/examples/basic.html)
\[[view source](https://github.com/jeromeetienne/threex.badtvpproc/blob/master/examples/basic.html)\] :
It shows this feature, and that one which is coded like that.
* [examples/sound.html](http://jeromeetienne.github.io/threex.badtvpproc/examples/sound.html)
\[[view source](https://github.com/jeromeetienne/threex.badtvpproc/blob/master/examples/sound.html)\] :
It show up the 'jam the tv' effect. It animate ```threex.badtvpasses.js``` thru various 
random steps, thus it appears as a broken tv set. Additionally it use a 
[electric sound](http://www.freesound.org/people/Bekir_VirtualDJ/sounds/132834/)
from
[freesound](http://www.freesound.org/) and use ```threex.badtvsound.js``` to play it thru webaudio API.
* [examples/felixturner_badtv.html](http://jeromeetienne.github.io/threex.badtvpproc/examples/felixturner_badtv.html)
\[[view source](https://github.com/jeromeetienne/threex.badtvpproc/blob/master/examples/felixturner_badtv.html)\] :
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

Here is the split out of each javascript files


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

Then you add those passes to an ```THREE.EffectComposer``` like that

```
badTVPasses.addPassesTo(composer)
```

threex.badtvjamming.js
======================

It provides a bad tv jamming effect with sound. 
It depends on ```threex.badtvsound.js``` for the sound.
First create the object.

```
var context   = new AudioContext()
var badTVJamming  = new THREEx.BadTVJamming(badTVPasses, context)
```

When you want to trigger the effect, just do

```
badTVJamming.trigger()
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

TODO
====
* some shader are the same as in three.js distribution. DO NOT DUPLICATE code
  * RGBShiftShader
  * FilmShader


