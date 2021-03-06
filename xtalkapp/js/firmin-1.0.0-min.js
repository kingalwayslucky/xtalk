Firmin = (typeof Firmin == 'undefined') ? {} : Firmin;
Firmin.CSSMatrix = WebKitCSSMatrix;
Firmin.prefix = (function() {
	var a = document.createElement("div"),
		b = ["webkit", "Moz", "O"],
		c = 3,
		d;
	while (c--) {
		d = b[c];
		a.style.cssText = "-" + d.toLowerCase() + "-transition-property:opacity;";
		if (typeof a.style[d + "TransitionProperty"] != "undefined") return d
	}
	return d
})();
Firmin.angleToRadians = function(a, b) {
	var c;
	switch (a) {
		case "rad":
			return b;
		case "deg":
			c = Math.PI / 180;
			break;
		case "grad":
			c = Math.PI / 200;
			break;
		case "turn":
			c = Math.PI * 2;
			break
	}
	return c * b
};
Firmin.pointToVector = function(a) {
	if (!a) return null;
	return a instanceof Array ? a : [a.x, a.y, a.z]
};
Firmin.NUMBER_PATTERN = /^-?\d+(\.\d+)?/;
Firmin.parseNumeric = function(e, f) {
	return function(b) {
		var c, d;
		if (typeof b == "number") {
			return [f, b]
		} else if (typeof b != "string") {
			return null
		}
		d = (b.match(Firmin.NUMBER_PATTERN) || [""])[0];
		if (d.length === b.length) {
			c = f
		} else {
			c = e.filter(function(a) {
				return b.substr(d.length) === a
			})[0]
		}
		return c && d ? [c, parseFloat(d)] : null
	}
};
Firmin.parseAngle = Firmin.parseNumeric(["deg", "grad", "rad", "turn"], "deg");
Firmin.parseTime = Firmin.parseNumeric(["s", "ms"], "s");
Firmin.Transform = function(a, b) {
	this.ctm = a || new Firmin.CSSMatrix();
	this.centre = Firmin.pointToVector(b) || ["50%", "50%", 0]
};
Firmin.Transform.methods = ["translate", "translate3d", "translateX", "translateY", "translateZ", "scale", "scale3d", "scaleX", "scaleY", "scaleZ", "rotate", "rotate3d", "rotateX", "rotateY", "rotateZ", "skew", "skewX", "skewY", "matrix", "matrix3d"];
Firmin.Transform.parse = function(a, b) {
	var c = Firmin.Transform.methods,
		d = {},
		e = null,
		f, g;
	if (typeof b === "object" && b.transform) {
		f = b.transform.ctm;
		g = b.transform.centre;
		e = new Firmin.Transform(f, g)
	}
	for (property in a) {
		if (c.indexOf(property) !== -1) {
			e = e || new Firmin.Transform();
			e[property](a[property])
		} else if (property === "origin") {
			e = e || new Firmin.Transform();
			e[property](a[property])
		} else {
			d[property] = a[property]
		}
	}
	return {
		result: e,
		remainder: d
	}
};
Firmin.Transform.prototype.build = function(a) {
	a = a || {};
	a[Firmin.prefix + "Transform"] = this.ctm.toString();
	a[Firmin.prefix + "TransformOrigin"] = this.centre.join(" ");
	return a
};
Firmin.Transform.prototype.matrix = Firmin.Transform.prototype.matrix3d = function(a) {
	var b = new Firmin.CSSMatrix();
	if (a.length === 6) {
		b.a = a[0];
		b.b = a[1];
		b.c = a[2];
		b.d = a[3];
		b.e = a[4];
		b.f = a[5]
	} else {
		b.m11 = a[0];
		b.m12 = a[1];
		b.m13 = a[2];
		b.m14 = a[3];
		b.m21 = a[4];
		b.m22 = a[5];
		b.m23 = a[6];
		b.m24 = a[7];
		b.m31 = a[8];
		b.m32 = a[9];
		b.m33 = a[10];
		b.m34 = a[11];
		b.m41 = a[12];
		b.m42 = a[13];
		b.m43 = a[14];
		b.m44 = a[15]
	}
	this.ctm = this.ctm.multiply(b)
};
Firmin.Transform.prototype.translate = Firmin.Transform.prototype.translate3d = function(a) {
	var b, c, d, e;
	if (typeof a == "number" || typeof a == "string") {
		c = d = parseInt(a, 10) || 0;
		e = 0
	} else {
		b = Firmin.pointToVector(a);
		c = b[0];
		d = b[1];
		e = b[2];
		if (typeof c != "number") c = parseInt(c, 10) || 0;
		if (typeof d != "number") d = parseInt(d, 10) || 0;
		if (typeof e != "number") e = parseInt(e, 10) || 0
	}
	this.ctm = this.ctm.translate(c, d, e)
};
Firmin.Transform.prototype.translateX = function(a) {
	this.translate([a, 0])
};
Firmin.Transform.prototype.translateY = function(a) {
	this.translate([0, a])
};
Firmin.Transform.prototype.translateZ = function(a) {
	this.translate3d([0, 0, a])
};
Firmin.Transform.prototype.scale = Firmin.Transform.prototype.scale3d = function(a) {
	var b, c, d, e;
	if (typeof a == "number") {
		c = d = a;
		e = 1
	} else {
		b = Firmin.pointToVector(a);
		c = b[0];
		d = b[1];
		e = b[2]
	}
	this.ctm = this.ctm.scale(c, d, e)
};
Firmin.Transform.prototype.scaleX = function(a) {
	this.scale3d([a, 1, 1])
};
Firmin.Transform.prototype.scaleY = function(a) {
	this.scale3d([1, a, 1])
};
Firmin.Transform.prototype.scaleZ = function(a) {
	this.scale3d([1, 1, a])
};
Firmin.Transform.prototype.skew = function(a) {
	var b = Firmin.parseAngle,
		c = Firmin.angleToRadians,
		d, e;
	if (typeof a == "number" || typeof a == "string") {
		d = e = c.apply(null, b(a)) || 0
	} else {
		a = Firmin.pointToVector(a);
		d = c.apply(null, b(a[0])) || 0;
		e = c.apply(null, b(a[1])) || 0
	}
	this.matrix([1, Math.tan(e), Math.tan(d), 1, 0, 0])
};
Firmin.Transform.prototype.skewX = function(a) {
	this.skew([a, 0])
};
Firmin.Transform.prototype.skewY = function(a) {
	this.skew([0, a])
};
Firmin.Transform.prototype.rotate = function(a) {
	a = Firmin.angleToRadians.apply(null, Firmin.parseAngle(a)) * (180 / Math.PI);
	this.ctm = this.ctm.rotate(0, 0, a)
};
Firmin.Transform.prototype.rotate3d = function(a) {
	var b = a.x,
		c = a.y,
		d = a.z,
		e = a.angle;
	if (typeof b != "number") b = 0;
	if (typeof c != "number") c = 0;
	if (typeof d != "number") d = 0;
	e = Firmin.angleToRadians.apply(null, Firmin.parseAngle(e)) * (180 / Math.PI);
	this.ctm = this.ctm.rotateAxisAngle(b, c, d, e)
};
Firmin.Transform.prototype.rotateX = function(a) {
	this.rotate3d({
		x: 1,
		angle: a
	})
};
Firmin.Transform.prototype.rotateY = function(a) {
	this.rotate3d({
		y: 1,
		angle: a
	})
};
Firmin.Transform.prototype.rotateZ = function(a) {
	this.rotate3d({
		z: 1,
		angle: a
	})
};
Firmin.Transform.prototype.origin = function(a) {
	var b = Firmin.pointToVector(a),
		c, d, e;
	if ((v0 = b[0])) this.centre[0] = v0;
	if ((c = b[1])) this.centre[1] = c;
	if ((d = b[2])) this.centre[2] = d
};
Firmin.Transition = function() {
	this.properties = ["all"];
	this.duration = ["ms", 0];
	this.delay = ["ms", 0];
	this.timingFunction = "ease"
};
Firmin.Transition.methods = ["properties", "timingFunction", "duration", "delay"];
Firmin.Transition.parse = function(a, b) {
	var c = Firmin.Transition.methods,
		d = {},
		e = new Firmin.Transition(),
		f, g;
	for (p in a) {
		if (c.indexOf(p) !== -1) {
			if (p === "properties" && typeof p == "string") {
				e[p] = [a[p]]
			} else if (p === "timingFunction" && typeof a[p] != "string") {
				e[p] = "cubic-bezier(" + a[p].join(",") + ")"
			} else if (p === "duration") {
				f = Firmin.parseTime(a[p]);
				if (f) {
					e[p] = f
				}
			} else if (p === "delay") {
				g = Firmin.parseTime(a[p]);
				if (g) {
					e[p] = g
				}
			} else {
				e[p] = a[p]
			}
		} else {
			d[p] = a[p]
		}
	}
	return {
		result: e,
		remainder: d
	}
};
Firmin.Transition.prototype.hasDuration = function() {
	return this.duration[1] !== 0
};
Firmin.Transition.prototype.getDuration = function() {
	var a = this.duration;
	return a[0] === "s" ? a[1] * 1000 : a[1]
};
Firmin.Transition.prototype.hasDelay = function() {
	return this.delay[1] !== 0
};
Firmin.Transition.prototype.getDelay = function() {
	var a = this.delay;
	return a[0] === "s" ? a[1] * 1000 : a[1]
};
Firmin.Transition.prototype.build = function(a) {
	a = a || {};
	if (typeof this.properties == "string") {
		a[Firmin.prefix + "TransitionProperty"] = this.properties
	} else {
		a[Firmin.prefix + "TransitionProperty"] = this.properties.join(", ")
	}
	a[Firmin.prefix + "TransitionDuration"] = this.duration[1] + this.duration[0];
	a[Firmin.prefix + "TransitionDelay"] = this.delay[1] + this.delay[0];
	if (this.timingFunction) {
		a[Firmin.prefix + "TransitionTimingFunction"] = this.timingFunction
	}
	return a
};
Firmin.Animation = function(a, b) {
	var c, d;
	if (typeof a.callback == "function") {
		this.callback = a.callback
	}
	delete a.callback;
	c = Firmin.Transition.parse(a, b);
	this.transition = c.result;
	d = Firmin.Transform.parse(c.remainder, b);
	this.transform = d.result;
	this.style = d.remainder
};
Firmin.Animation.prototype.hasDuration = function() {
	return this.transition && this.transition.hasDuration()
};
Firmin.Animation.prototype.getTotalDuration = function() {
	return this.transition ? this.transition.getDuration() + this.transition.getDelay() : 0
};
Firmin.Animation.prototype.exec = function(a) {
	var b = this.style,
		c;
	if (this.transition) b = this.transition.build(b);
	if (this.transform) b = this.transform.build(b);
	for (c in b) {
		a.style[c] = b[c]
	}
};
Firmin.Animated = function(a) {
	var b = this;
	this.element = a;
	this.operations = [];
	this.callback = null
};
Firmin.Animated.prototype.run = function() {
	var a = this.operations.shift(),
		b = this;
	if (!a) {
		this.fired = true;
		return this
	}
	a.exec(this.element);
	setTimeout(function() {
		b.fireCallback();
		b.run()
	}, a.getTotalDuration() || 1);
	this.callback = a.callback;
	return this
};
Firmin.Animated.prototype.fireCallback = function() {
	var a = this.callback;
	if (typeof a === "function") {
		a.call(null, this.element)
	}
};
Firmin.Animated.prototype.__animate__ = function(a) {
	this.operations.push(a);
	this.__lastAnim = a;
	if (this.fired) {
		this.fired = false;
		this.run()
	}
	return this
};
Firmin.Animated.prototype.animate = function(a, b, c) {
	a.duration = b;
	a.callback = c;
	return this.__animate__(new Firmin.Animation(a))
};
Firmin.Animated.prototype.animateR = function(a, b, c) {
	a.duration = b;
	a.callback = c;
	return this.__animate__(new Firmin.Animation(a, this.__lastAnim))
};
Firmin.animate = function(a, b, c, d) {
	var e = new Firmin.Animated(a);
	e.animate(b, c, d);
	return e.run()
};
Firmin.animateR = function(a, b, c, d) {
	var e = new Firmin.Animated(a),
		f = new Firmin.Animation({}),
		g = new Firmin.Transform(),
		h = new Firmin.CSSMatrix(),
		i = a.style[Firmin.prefix + "Transform"];
	h.setMatrixValue(i);
	g.ctm = h;
	f.transform = g;
	e.__lastAnim = f;
	e.animateR(b, c, d);
	return e.run()
};
Firmin.Transform.methods.forEach(function(f) {
	var g = f + "R";
	Firmin[f] = function(a, b, c, d) {
		var e = {};
		e[f] = b;
		return Firmin.animate(a, e, c, d)
	};
	Firmin[g] = function(a, b, c, d) {
		var e = {};
		e[f] = b;
		return Firmin.animateR(a, e, c, d)
	};
	Firmin.Animated.prototype[f] = function(a, b, c) {
		var d = {};
		d[f] = a;
		return this.animate(d, b, c)
	};
	Firmin.Animated.prototype[g] = function(a, b, c) {
		var d = {};
		d[f] = a;
		return this.animateR(d, b, c)
	}
});