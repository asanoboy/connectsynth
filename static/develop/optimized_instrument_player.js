function e(a) {
  throw a;
}
var h = void 0, k = !0, l = null, o = !1;
function u() {
  return function() {
  }
}
function aa(a) {
  return function(b) {
    this[a] = b
  }
}
function v(a) {
  return function() {
    return this[a]
  }
}
function w(a) {
  return function() {
    return a
  }
}
var y, z = this;
function ba(a, b) {
  var c = a.split("."), d = z;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var g;c.length && (g = c.shift());) {
    !c.length && ca(b) ? d[g] = b : d = d[g] ? d[g] : d[g] = {}
  }
}
function fa(a) {
  for(var a = a.split("."), b = z, c;c = a.shift();) {
    if(b[c] != l) {
      b = b[c]
    }else {
      return l
    }
  }
  return b
}
function ga() {
}
function B(a) {
  a.L = function() {
    return a.qf ? a.qf : a.qf = new a
  }
}
function ha(a) {
  var b = typeof a;
  if("object" == b) {
    if(a) {
      if(a instanceof Array) {
        return"array"
      }
      if(a instanceof Object) {
        return b
      }
      var c = Object.prototype.toString.call(a);
      if("[object Window]" == c) {
        return"object"
      }
      if("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice")) {
        return"array"
      }
      if("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if("function" == b && "undefined" == typeof a.call) {
      return"object"
    }
  }
  return b
}
function ca(a) {
  return a !== h
}
function ia(a) {
  return"array" == ha(a)
}
function ja(a) {
  var b = ha(a);
  return"array" == b || "object" == b && "number" == typeof a.length
}
function E(a) {
  return"string" == typeof a
}
function ka(a) {
  return"number" == typeof a
}
function ma(a) {
  return"function" == ha(a)
}
function na(a) {
  var b = typeof a;
  return"object" == b && a != l || "function" == b
}
function oa(a) {
  return a[pa] || (a[pa] = ++qa)
}
var pa = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), qa = 0;
function ra(a, b, c) {
  return a.call.apply(a.bind, arguments)
}
function sa(a, b, c) {
  a || e(Error());
  if(2 < arguments.length) {
    var d = Array.prototype.slice.call(arguments, 2);
    return function() {
      var c = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(c, d);
      return a.apply(b, c)
    }
  }
  return function() {
    return a.apply(b, arguments)
  }
}
function F(a, b, c) {
  F = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ra : sa;
  return F.apply(l, arguments)
}
function ta(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
}
var ua = Date.now || function() {
  return+new Date
};
function G(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.b = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
}
;function va(a) {
  var b = a.length - 1;
  return 0 <= b && a.indexOf("%", b) == b
}
function wa(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = ("" + arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
}
function xa(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
}
function ya(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
}
function za(a) {
  if(!Aa.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(Ba, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(Ca, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(Da, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(Ea, "&quot;"));
  return a
}
var Ba = /&/g, Ca = /</g, Da = />/g, Ea = /\"/g, Aa = /[&<>\"]/, Fa = 2147483648 * Math.random() | 0;
function Ga(a) {
  return("" + a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  })
}
;var Ha, Ia, Ja, Ka, La, Ma, Na;
function Pa() {
  return z.navigator ? z.navigator.userAgent : l
}
function Qa() {
  return z.navigator
}
La = Ka = Ja = Ia = Ha = o;
var Ra;
if(Ra = Pa()) {
  var Ta = Qa();
  Ha = 0 == Ra.indexOf("Opera");
  Ia = !Ha && -1 != Ra.indexOf("MSIE");
  Ka = (Ja = !Ha && -1 != Ra.indexOf("WebKit")) && -1 != Ra.indexOf("Mobile");
  La = !Ha && !Ja && "Gecko" == Ta.product
}
var Ua = Ha, H = Ia, I = La, J = Ja, Va = Ka, Wa, Xa = Qa();
Wa = Xa && Xa.platform || "";
Ma = -1 != Wa.indexOf("Mac");
Na = -1 != Wa.indexOf("Win");
var Ya = !!Qa() && -1 != (Qa().appVersion || "").indexOf("X11"), Za;
a: {
  var $a = "", ab;
  if(Ua && z.opera) {
    var bb = z.opera.version, $a = "function" == typeof bb ? bb() : bb
  }else {
    if(I ? ab = /rv\:([^\);]+)(\)|;)/ : H ? ab = /MSIE\s+([^\);]+)(\)|;)/ : J && (ab = /WebKit\/(\S+)/), ab) {
      var cb = ab.exec(Pa()), $a = cb ? cb[1] : ""
    }
  }
  if(H) {
    var db, eb = z.document;
    db = eb ? eb.documentMode : h;
    if(db > parseFloat($a)) {
      Za = "" + db;
      break a
    }
  }
  Za = $a
}
var fb = {};
function K(a) {
  var b;
  if(!(b = fb[a])) {
    b = 0;
    for(var c = ya("" + Za).split("."), d = ya("" + a).split("."), g = Math.max(c.length, d.length), f = 0;0 == b && f < g;f++) {
      var j = c[f] || "", m = d[f] || "", n = RegExp("(\\d*)(\\D*)", "g"), q = RegExp("(\\d*)(\\D*)", "g");
      do {
        var p = n.exec(j) || ["", "", ""], r = q.exec(m) || ["", "", ""];
        if(0 == p[0].length && 0 == r[0].length) {
          break
        }
        b = ((0 == p[1].length ? 0 : parseInt(p[1], 10)) < (0 == r[1].length ? 0 : parseInt(r[1], 10)) ? -1 : (0 == p[1].length ? 0 : parseInt(p[1], 10)) > (0 == r[1].length ? 0 : parseInt(r[1], 10)) ? 1 : 0) || ((0 == p[2].length) < (0 == r[2].length) ? -1 : (0 == p[2].length) > (0 == r[2].length) ? 1 : 0) || (p[2] < r[2] ? -1 : p[2] > r[2] ? 1 : 0)
      }while(0 == b)
    }
    b = fb[a] = 0 <= b
  }
  return b
}
var gb = {};
function hb(a) {
  return gb[a] || (gb[a] = H && !!document.documentMode && document.documentMode >= a)
}
;function ib() {
}
var jb = 0;
y = ib.prototype;
y.key = 0;
y.vb = o;
y.Xe = o;
y.qb = function(a, b, c, d, g, f) {
  ma(a) ? this.rf = k : a && a.handleEvent && ma(a.handleEvent) ? this.rf = o : e(Error("Invalid listener argument"));
  this.Mb = a;
  this.Af = b;
  this.src = c;
  this.type = d;
  this.capture = !!g;
  this.Wc = f;
  this.Xe = o;
  this.key = ++jb;
  this.vb = o
};
y.handleEvent = function(a) {
  return this.rf ? this.Mb.call(this.Wc || this.src, a) : this.Mb.handleEvent.call(this.Mb, a)
};
function kb(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
}
function lb(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
}
function mb(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
}
function nb(a, b) {
  for(var c in a) {
    if(b.call(h, a[c], c, a)) {
      return c
    }
  }
}
function ob(a, b, c) {
  b in a && e(Error('The object already contains the key "' + b + '"'));
  a[b] = c
}
var pb = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
function qb(a, b) {
  for(var c, d, g = 1;g < arguments.length;g++) {
    d = arguments[g];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < pb.length;f++) {
      c = pb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;var rb = !H || hb(9), sb = !H || hb(9), tb = H && !K("8");
!J || K("528");
I && K("1.9b") || H && K("8") || Ua && K("9.5") || J && K("528");
I && !K("8") || H && K("9");
function ub(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, ub) : this.stack = Error().stack || "";
  a && (this.message = "" + a)
}
G(ub, Error);
ub.prototype.name = "CustomError";
function vb(a, b) {
  b.unshift(a);
  ub.call(this, wa.apply(l, b));
  b.shift()
}
G(vb, ub);
vb.prototype.name = "AssertionError";
function wb(a, b) {
  e(new vb("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
}
;var L = Array.prototype, xb = L.indexOf ? function(a, b, c) {
  return L.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == l ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(E(a)) {
    return!E(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, M = L.forEach ? function(a, b, c) {
  L.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = E(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in g && b.call(c, g[f], f, a)
  }
}, yb = L.filter ? function(a, b, c) {
  return L.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = [], f = 0, j = E(a) ? a.split("") : a, m = 0;m < d;m++) {
    if(m in j) {
      var n = j[m];
      b.call(c, n, m, a) && (g[f++] = n)
    }
  }
  return g
}, zb = L.map ? function(a, b, c) {
  return L.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = Array(d), f = E(a) ? a.split("") : a, j = 0;j < d;j++) {
    j in f && (g[j] = b.call(c, f[j], j, a))
  }
  return g
}, Ab = L.some ? function(a, b, c) {
  return L.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = E(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in g && b.call(c, g[f], f, a)) {
      return k
    }
  }
  return o
}, Bb = L.every ? function(a, b, c) {
  return L.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = E(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in g && !b.call(c, g[f], f, a)) {
      return o
    }
  }
  return k
};
function Cb(a, b) {
  var c = Db(a, b, h);
  return 0 > c ? l : E(a) ? a.charAt(c) : a[c]
}
function Db(a, b, c) {
  for(var d = a.length, g = E(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in g && b.call(c, g[f], f, a)) {
      return f
    }
  }
  return-1
}
function N(a, b) {
  return 0 <= xb(a, b)
}
function Eb(a, b) {
  var c = xb(a, b);
  0 <= c && L.splice.call(a, c, 1)
}
function Fb(a, b) {
  var c = Db(a, b, h);
  return 0 <= c ? (L.splice.call(a, c, 1), k) : o
}
function Gb(a) {
  return L.concat.apply(L, arguments)
}
function Hb(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
}
function Ib(a, b, c, d) {
  L.splice.apply(a, Jb(arguments, 1))
}
function Jb(a, b, c) {
  return 2 >= arguments.length ? L.slice.call(a, b) : L.slice.call(a, b, c)
}
;var Kb = {qh:"click", wh:"dblclick", Uh:"mousedown", Yh:"mouseup", Xh:"mouseover", Wh:"mouseout", Vh:"mousemove", ii:"selectstart", Oh:"keypress", Nh:"keydown", Ph:"keyup", Gf:"blur", Jf:"focus", If:"deactivate", Gh:H ? "focusin" : "DOMFocusIn", Hh:H ? "focusout" : "DOMFocusOut", Hf:"change", Kf:"select", ki:"submit", Mh:"input", ei:"propertychange", Bh:"dragstart", yh:"dragenter", Ah:"dragover", zh:"dragleave", Ch:"drop", oi:"touchstart", ni:"touchmove", mi:"touchend", li:"touchcancel", th:"contextmenu", 
Fh:"error", Jh:"help", Rh:"load", Sh:"losecapture", fi:"readystatechange", gi:"resize", hi:"scroll", si:"unload", Ih:"hashchange", ai:"pagehide", bi:"pageshow", di:"popstate", uh:"copy", ci:"paste", vh:"cut", lh:"beforecopy", mh:"beforecut", nh:"beforepaste", $h:"online", Zh:"offline", Th:"message", sh:"connect", pi:J ? "webkitTransitionEnd" : Ua ? "oTransitionEnd" : "transitionend"};
function Lb() {
  this.F = o
}
Lb.prototype.J = function() {
  this.F || (this.F = k, this.f())
};
Lb.prototype.f = function() {
  this.qg && Mb.apply(l, this.qg);
  if(this.xf) {
    for(;this.xf.length;) {
      this.xf.shift()()
    }
  }
};
function Mb(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    ja(d) ? Mb.apply(l, d) : d && "function" == typeof d.J && d.J()
  }
}
;function O(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
y = O.prototype;
y.f = u();
y.J = u();
y.tb = o;
y.defaultPrevented = o;
y.ld = k;
y.stopPropagation = function() {
  this.tb = k
};
y.preventDefault = function() {
  this.defaultPrevented = k;
  this.ld = o
};
function Nb(a) {
  Nb[" "](a);
  return a
}
Nb[" "] = ga;
function Qb(a, b) {
  a && this.qb(a, b)
}
G(Qb, O);
var Rb = [1, 4, 2];
y = Qb.prototype;
y.target = l;
y.relatedTarget = l;
y.offsetX = 0;
y.offsetY = 0;
y.clientX = 0;
y.clientY = 0;
y.screenX = 0;
y.screenY = 0;
y.button = 0;
y.keyCode = 0;
y.charCode = 0;
y.ctrlKey = o;
y.altKey = o;
y.shiftKey = o;
y.metaKey = o;
y.oe = o;
y.la = l;
y.qb = function(a, b) {
  var c = this.type = a.type;
  O.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(I) {
      var g;
      a: {
        try {
          Nb(d.nodeName);
          g = k;
          break a
        }catch(f) {
        }
        g = o
      }
      g || (d = l)
    }
  }else {
    "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement)
  }
  this.relatedTarget = d;
  this.offsetX = J || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = J || a.offsetY !== h ? a.offsetY : a.layerY;
  this.clientX = a.clientX !== h ? a.clientX : a.pageX;
  this.clientY = a.clientY !== h ? a.clientY : a.pageY;
  this.screenX = a.screenX || 0;
  this.screenY = a.screenY || 0;
  this.button = a.button;
  this.keyCode = a.keyCode || 0;
  this.charCode = a.charCode || ("keypress" == c ? a.keyCode : 0);
  this.ctrlKey = a.ctrlKey;
  this.altKey = a.altKey;
  this.shiftKey = a.shiftKey;
  this.metaKey = a.metaKey;
  this.oe = Ma ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.la = a;
  a.defaultPrevented && this.preventDefault();
  delete this.tb
};
function Sb(a) {
  return rb ? 0 == a.la.button : "click" == a.type ? k : !!(a.la.button & Rb[0])
}
y.stopPropagation = function() {
  Qb.b.stopPropagation.call(this);
  this.la.stopPropagation ? this.la.stopPropagation() : this.la.cancelBubble = k
};
y.preventDefault = function() {
  Qb.b.preventDefault.call(this);
  var a = this.la;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = o, tb) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
y.sg = v("la");
y.f = u();
var Tb = {}, Ub = {}, Vb = {}, Wb = {};
function Xb(a, b, c, d, g) {
  if(b) {
    if(ia(b)) {
      for(var f = 0;f < b.length;f++) {
        Xb(a, b[f], c, d, g)
      }
      return l
    }
    var d = !!d, j = Ub;
    b in j || (j[b] = {m:0, ga:0});
    j = j[b];
    d in j || (j[d] = {m:0, ga:0}, j.m++);
    var j = j[d], m = oa(a), n;
    j.ga++;
    if(j[m]) {
      n = j[m];
      for(f = 0;f < n.length;f++) {
        if(j = n[f], j.Mb == c && j.Wc == g) {
          if(j.vb) {
            break
          }
          return n[f].key
        }
      }
    }else {
      n = j[m] = [], j.m++
    }
    f = Yb();
    f.src = a;
    j = new ib;
    j.qb(c, f, a, b, d, g);
    c = j.key;
    f.key = c;
    n.push(j);
    Tb[c] = j;
    Vb[m] || (Vb[m] = []);
    Vb[m].push(j);
    a.addEventListener ? (a == z || !a.Pd) && a.addEventListener(b, f, d) : a.attachEvent(b in Wb ? Wb[b] : Wb[b] = "on" + b, f);
    return c
  }
  e(Error("Invalid event type"))
}
function Yb() {
  var a = Zb, b = sb ? function(c) {
    return a.call(b.src, b.key, c)
  } : function(c) {
    c = a.call(b.src, b.key, c);
    if(!c) {
      return c
    }
  };
  return b
}
function $b(a, b, c, d, g) {
  if(ia(b)) {
    for(var f = 0;f < b.length;f++) {
      $b(a, b[f], c, d, g)
    }
  }else {
    if(d = !!d, a = ac(a, b, d)) {
      for(f = 0;f < a.length;f++) {
        if(a[f].Mb == c && a[f].capture == d && a[f].Wc == g) {
          bc(a[f].key);
          break
        }
      }
    }
  }
}
function bc(a) {
  if(!Tb[a]) {
    return o
  }
  var b = Tb[a];
  if(b.vb) {
    return o
  }
  var c = b.src, d = b.type, g = b.Af, f = b.capture;
  c.removeEventListener ? (c == z || !c.Pd) && c.removeEventListener(d, g, f) : c.detachEvent && c.detachEvent(d in Wb ? Wb[d] : Wb[d] = "on" + d, g);
  c = oa(c);
  Vb[c] && (g = Vb[c], Eb(g, b), 0 == g.length && delete Vb[c]);
  b.vb = k;
  if(b = Ub[d][f][c]) {
    b.vf = k, cc(d, f, c, b)
  }
  delete Tb[a];
  return k
}
function cc(a, b, c, d) {
  if(!d.cd && d.vf) {
    for(var g = 0, f = 0;g < d.length;g++) {
      d[g].vb ? d[g].Af.src = l : (g != f && (d[f] = d[g]), f++)
    }
    d.length = f;
    d.vf = o;
    0 == f && (delete Ub[a][b][c], Ub[a][b].m--, 0 == Ub[a][b].m && (delete Ub[a][b], Ub[a].m--), 0 == Ub[a].m && delete Ub[a])
  }
}
function dc(a) {
  var b, c = 0, d = b == l;
  b = !!b;
  if(a == l) {
    kb(Vb, function(a) {
      for(var f = a.length - 1;0 <= f;f--) {
        var g = a[f];
        if(d || b == g.capture) {
          bc(g.key), c++
        }
      }
    })
  }else {
    if(a = oa(a), Vb[a]) {
      for(var a = Vb[a], g = a.length - 1;0 <= g;g--) {
        var f = a[g];
        if(d || b == f.capture) {
          bc(f.key), c++
        }
      }
    }
  }
}
function ac(a, b, c) {
  var d = Ub;
  return b in d && (d = d[b], c in d && (d = d[c], a = oa(a), d[a])) ? d[a] : l
}
function ec(a, b, c, d, g) {
  var f = 1, b = oa(b);
  if(a[b]) {
    a.ga--;
    a = a[b];
    a.cd ? a.cd++ : a.cd = 1;
    try {
      for(var j = a.length, m = 0;m < j;m++) {
        var n = a[m];
        n && !n.vb && (f &= fc(n, g) !== o)
      }
    }finally {
      a.cd--, cc(c, d, b, a)
    }
  }
  return Boolean(f)
}
function fc(a, b) {
  a.Xe && bc(a.key);
  return a.handleEvent(b)
}
function Zb(a, b) {
  if(!Tb[a]) {
    return k
  }
  var c = Tb[a], d = c.type, g = Ub;
  if(!(d in g)) {
    return k
  }
  var g = g[d], f, j;
  if(!sb) {
    f = b || fa("window.event");
    var m = k in g, n = o in g;
    if(m) {
      if(0 > f.keyCode || f.returnValue != h) {
        return k
      }
      a: {
        var q = o;
        if(0 == f.keyCode) {
          try {
            f.keyCode = -1;
            break a
          }catch(p) {
            q = k
          }
        }
        if(q || f.returnValue == h) {
          f.returnValue = k
        }
      }
    }
    q = new Qb;
    q.qb(f, this);
    f = k;
    try {
      if(m) {
        for(var r = [], C = q.currentTarget;C;C = C.parentNode) {
          r.push(C)
        }
        j = g[k];
        j.ga = j.m;
        for(var s = r.length - 1;!q.tb && 0 <= s && j.ga;s--) {
          q.currentTarget = r[s], f &= ec(j, r[s], d, k, q)
        }
        if(n) {
          j = g[o];
          j.ga = j.m;
          for(s = 0;!q.tb && s < r.length && j.ga;s++) {
            q.currentTarget = r[s], f &= ec(j, r[s], d, o, q)
          }
        }
      }else {
        f = fc(c, q)
      }
    }finally {
      r && (r.length = 0)
    }
    return f
  }
  d = new Qb(b, this);
  return f = fc(c, d)
}
;function P(a, b) {
  this.width = a;
  this.height = b
}
function gc(a, b) {
  return a == b ? k : !a || !b ? o : a.width == b.width && a.height == b.height
}
y = P.prototype;
y.I = function() {
  return new P(this.width, this.height)
};
y.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
};
y.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
y.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
y.scale = function(a) {
  this.width *= a;
  this.height *= a;
  return this
};
var hc;
function Q(a) {
  a = a.className;
  return E(a) && a.match(/\S+/g) || []
}
function S(a, b) {
  for(var c = Q(a), d = Jb(arguments, 1), g = c.length + d.length, f = c, j = 0;j < d.length;j++) {
    N(f, d[j]) || f.push(d[j])
  }
  a.className = c.join(" ");
  return c.length == g
}
function ic(a, b) {
  var c = Q(a), d = Jb(arguments, 1), g = jc(c, d);
  a.className = g.join(" ");
  return g.length == c.length - d.length
}
function jc(a, b) {
  return yb(a, function(a) {
    return!N(b, a)
  })
}
;var kc = !H || hb(9), lc = !I && !H || H && hb(9) || I && K("1.9.1"), mc = H && !K("9");
function T(a, b) {
  this.x = ca(a) ? a : 0;
  this.y = ca(b) ? b : 0
}
T.prototype.I = function() {
  return new T(this.x, this.y)
};
T.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function nc(a, b) {
  return new T(a.x - b.x, a.y - b.y)
}
;function U(a) {
  return a ? new oc(V(a)) : hc || (hc = new oc)
}
function pc(a, b, c, d) {
  a = d || a;
  b = b && "*" != b ? b.toUpperCase() : "";
  if(a.querySelectorAll && a.querySelector && (b || c)) {
    return a.querySelectorAll(b + (c ? "." + c : ""))
  }
  if(c && a.getElementsByClassName) {
    a = a.getElementsByClassName(c);
    if(b) {
      for(var d = {}, g = 0, f = 0, j;j = a[f];f++) {
        b == j.nodeName && (d[g++] = j)
      }
      d.length = g;
      return d
    }
    return a
  }
  a = a.getElementsByTagName(b || "*");
  if(c) {
    d = {};
    for(f = g = 0;j = a[f];f++) {
      b = j.className, "function" == typeof b.split && N(b.split(/\s+/), c) && (d[g++] = j)
    }
    d.length = g;
    return d
  }
  return a
}
function qc(a, b) {
  kb(b, function(b, d) {
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in rc ? a.setAttribute(rc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
  })
}
var rc = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
function sc(a) {
  a = a.document;
  a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
  return new P(a.clientWidth, a.clientHeight)
}
function tc(a, b, c) {
  return uc(document, arguments)
}
function uc(a, b) {
  var c = b[0], d = b[1];
  if(!kc && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', za(d.name), '"');
    if(d.type) {
      c.push(' type="', za(d.type), '"');
      var g = {};
      qb(g, d);
      d = g;
      delete d.type
    }
    c.push(">");
    c = c.join("")
  }
  c = a.createElement(c);
  d && (E(d) ? c.className = d : ia(d) ? S.apply(l, [c].concat(d)) : qc(c, d));
  2 < b.length && vc(a, c, b, 2);
  return c
}
function vc(a, b, c, d) {
  function g(c) {
    c && b.appendChild(E(c) ? a.createTextNode(c) : c)
  }
  for(;d < c.length;d++) {
    var f = c[d];
    ja(f) && !(na(f) && 0 < f.nodeType) ? M(wc(f) ? Hb(f) : f, g) : g(f)
  }
}
function xc(a) {
  var b = document, c = b.createElement("div");
  H ? (c.innerHTML = "<br>" + a, c.removeChild(c.firstChild)) : c.innerHTML = a;
  if(1 == c.childNodes.length) {
    return c.removeChild(c.firstChild)
  }
  for(a = b.createDocumentFragment();c.firstChild;) {
    a.appendChild(c.firstChild)
  }
  return a
}
function yc(a) {
  a && a.parentNode && a.parentNode.removeChild(a)
}
function zc(a) {
  if(a.firstElementChild != h) {
    a = a.firstElementChild
  }else {
    for(a = a.firstChild;a && 1 != a.nodeType;) {
      a = a.nextSibling
    }
  }
  return a
}
function Ac(a, b) {
  if(a.contains && 1 == b.nodeType) {
    return a == b || a.contains(b)
  }
  if("undefined" != typeof a.compareDocumentPosition) {
    return a == b || Boolean(a.compareDocumentPosition(b) & 16)
  }
  for(;b && a != b;) {
    b = b.parentNode
  }
  return b == a
}
function V(a) {
  return 9 == a.nodeType ? a : a.ownerDocument || a.document
}
function Bc(a, b) {
  var c = [];
  return Cc(a, b, c, k) ? c[0] : h
}
function Cc(a, b, c, d) {
  if(a != l) {
    for(a = a.firstChild;a;) {
      if(b(a) && (c.push(a), d) || Cc(a, b, c, d)) {
        return k
      }
      a = a.nextSibling
    }
  }
  return o
}
var Dc = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, Ec = {IMG:" ", BR:"\n"};
function Fc(a) {
  var b = a.getAttributeNode("tabindex");
  return b && b.specified ? (a = a.tabIndex, ka(a) && 0 <= a && 32768 > a) : o
}
function Ic(a) {
  var b = [];
  Jc(a, b, o);
  return b.join("")
}
function Jc(a, b, c) {
  if(!(a.nodeName in Dc)) {
    if(3 == a.nodeType) {
      c ? b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue)
    }else {
      if(a.nodeName in Ec) {
        b.push(Ec[a.nodeName])
      }else {
        for(a = a.firstChild;a;) {
          Jc(a, b, c), a = a.nextSibling
        }
      }
    }
  }
}
function wc(a) {
  if(a && "number" == typeof a.length) {
    if(na(a)) {
      return"function" == typeof a.item || "string" == typeof a.item
    }
    if(ma(a)) {
      return"function" == typeof a.item
    }
  }
  return o
}
function Kc(a, b) {
  for(var a = a.parentNode, c = 0;a;) {
    if(b(a)) {
      return a
    }
    a = a.parentNode;
    c++
  }
  return l
}
function oc(a) {
  this.s = a || z.document || document
}
y = oc.prototype;
y.o = U;
function Lc(a) {
  return a.s
}
y.a = function(a) {
  return E(a) ? this.s.getElementById(a) : a
};
y.dh = qc;
y.d = function(a, b, c) {
  return uc(this.s, arguments)
};
y.createElement = function(a) {
  return this.s.createElement(a)
};
y.createTextNode = function(a) {
  return this.s.createTextNode(a)
};
function Mc(a) {
  return"CSS1Compat" == a.s.compatMode
}
y.kc = function() {
  return this.s.parentWindow || this.s.defaultView
};
function Nc(a) {
  var b = a.s, a = !J && "CSS1Compat" == b.compatMode ? b.documentElement : b.body, b = b.parentWindow || b.defaultView;
  return new T(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop)
}
y.appendChild = function(a, b) {
  a.appendChild(b)
};
y.append = function(a, b) {
  vc(V(a), a, arguments, 1)
};
y.ff = function(a) {
  return lc && a.children != h ? a.children : yb(a.childNodes, function(a) {
    return 1 == a.nodeType
  })
};
y.jf = zc;
y.contains = Ac;
function Oc() {
  this.F = o
}
G(Oc, Lb);
y = Oc.prototype;
y.Pd = k;
y.hd = l;
y.te = aa("hd");
y.addEventListener = function(a, b, c, d) {
  Xb(this, a, b, c, d)
};
y.removeEventListener = function(a, b, c, d) {
  $b(this, a, b, c, d)
};
y.dispatchEvent = function(a) {
  var b = a.type || a, c = Ub;
  if(b in c) {
    if(E(a)) {
      a = new O(a, this)
    }else {
      if(a instanceof O) {
        a.target = a.target || this
      }else {
        var d = a, a = new O(b, this);
        qb(a, d)
      }
    }
    var d = 1, g, c = c[b], b = k in c, f;
    if(b) {
      g = [];
      for(f = this;f;f = f.hd) {
        g.push(f)
      }
      f = c[k];
      f.ga = f.m;
      for(var j = g.length - 1;!a.tb && 0 <= j && f.ga;j--) {
        a.currentTarget = g[j], d &= ec(f, g[j], a.type, k, a) && a.ld != o
      }
    }
    if(o in c) {
      if(f = c[o], f.ga = f.m, b) {
        for(j = 0;!a.tb && j < g.length && f.ga;j++) {
          a.currentTarget = g[j], d &= ec(f, g[j], a.type, o, a) && a.ld != o
        }
      }else {
        for(g = this;!a.tb && g && f.ga;g = g.hd) {
          a.currentTarget = g, d &= ec(f, g, a.type, o, a) && a.ld != o
        }
      }
    }
    a = Boolean(d)
  }else {
    a = k
  }
  return a
};
y.f = function() {
  Oc.b.f.call(this);
  dc(this);
  this.hd = l
};
function Pc(a) {
  this.F = o;
  this.Ab = a || window;
  this.bd = Xb(this.Ab, "resize", this.Hg, o, this);
  this.Sb = sc(this.Ab || window);
  if(J && Na || Ua && this.Ab.self != this.Ab.top) {
    this.sd = window.setInterval(F(this.$e, this), Qc)
  }
}
G(Pc, Oc);
var Qc = 500;
y = Pc.prototype;
y.bd = l;
y.Ab = l;
y.Sb = l;
y.sd = l;
y.Wd = function() {
  return this.Sb ? this.Sb.I() : l
};
y.f = function() {
  Pc.b.f.call(this);
  this.bd && (bc(this.bd), this.bd = l);
  this.sd && (window.clearInterval(this.sd), this.sd = l);
  this.Sb = this.Ab = l
};
y.Hg = function() {
  this.$e()
};
y.$e = function() {
  var a = sc(this.Ab || window);
  gc(a, this.Sb) || (this.Sb = a, this.dispatchEvent("resize"))
};
function Rc(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d
}
Rc.prototype.I = function() {
  return new Rc(this.top, this.right, this.bottom, this.left)
};
Rc.prototype.toString = function() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
};
Rc.prototype.contains = function(a) {
  return!this || !a ? o : a instanceof Rc ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom
};
function Sc(a, b, c, d) {
  this.left = a;
  this.top = b;
  this.width = c;
  this.height = d
}
Sc.prototype.I = function() {
  return new Sc(this.left, this.top, this.width, this.height)
};
Sc.prototype.toString = function() {
  return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
};
Sc.prototype.contains = function(a) {
  return a instanceof Sc ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
Sc.prototype.Wd = function() {
  return new P(this.width, this.height)
};
function Tc(a, b, c) {
  E(b) ? Uc(a, c, b) : kb(b, ta(Uc, a))
}
function Uc(a, b, c) {
  a.style[Ga(c)] = b
}
function Vc(a, b) {
  var c = V(a);
  return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, l)) ? c[b] || c.getPropertyValue(b) || "" : ""
}
function Wc(a, b) {
  return Vc(a, b) || (a.currentStyle ? a.currentStyle[b] : l) || a.style && a.style[b]
}
function Xc(a) {
  if(Va && J) {
    var b = a.ownerDocument.defaultView;
    if(b != b.top) {
      return o
    }
  }
  return!!a.getBoundingClientRect
}
function Yc(a) {
  var b = a.getBoundingClientRect();
  H && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
  return b
}
function Zc(a) {
  if(H && !hb(8)) {
    return a.offsetParent
  }
  for(var b = V(a), c = Wc(a, "position"), d = "fixed" == c || "absolute" == c, a = a.parentNode;a && a != b;a = a.parentNode) {
    if(c = Wc(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) {
      return a
    }
  }
  return l
}
function $c(a) {
  for(var b = new Rc(0, Infinity, Infinity, 0), c = U(a), d = c.s.body, g = c.s.documentElement, f = !J && "CSS1Compat" == c.s.compatMode ? c.s.documentElement : c.s.body;a = Zc(a);) {
    if((!H || 0 != a.clientWidth) && (!J || 0 != a.clientHeight || a != d) && a != d && a != g && "visible" != Wc(a, "overflow")) {
      var j = ad(a), m;
      m = a;
      if(I && !K("1.9")) {
        var n = parseFloat(Vc(m, "borderLeftWidth"));
        if(bd(m)) {
          var q = m.offsetWidth - m.clientWidth - n - parseFloat(Vc(m, "borderRightWidth")), n = n + q
        }
        m = new T(n, parseFloat(Vc(m, "borderTopWidth")))
      }else {
        m = new T(m.clientLeft, m.clientTop)
      }
      j.x += m.x;
      j.y += m.y;
      b.top = Math.max(b.top, j.y);
      b.right = Math.min(b.right, j.x + a.clientWidth);
      b.bottom = Math.min(b.bottom, j.y + a.clientHeight);
      b.left = Math.max(b.left, j.x)
    }
  }
  d = f.scrollLeft;
  f = f.scrollTop;
  b.left = Math.max(b.left, d);
  b.top = Math.max(b.top, f);
  c = sc(c.kc() || window);
  b.right = Math.min(b.right, d + c.width);
  b.bottom = Math.min(b.bottom, f + c.height);
  return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : l
}
function ad(a) {
  var b, c = V(a), d = Wc(a, "position"), g = I && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY), f = new T(0, 0), j;
  b = c ? V(c) : document;
  j = H && !hb(9) && !Mc(U(b)) ? b.body : b.documentElement;
  if(a == j) {
    return f
  }
  if(Xc(a)) {
    b = Yc(a), a = Nc(U(c)), f.x = b.left + a.x, f.y = b.top + a.y
  }else {
    if(c.getBoxObjectFor && !g) {
      b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(j), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY
    }else {
      b = a;
      do {
        f.x += b.offsetLeft;
        f.y += b.offsetTop;
        b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
        if(J && "fixed" == Wc(b, "position")) {
          f.x += c.body.scrollLeft;
          f.y += c.body.scrollTop;
          break
        }
        b = b.offsetParent
      }while(b && b != a);
      if(Ua || J && "absolute" == d) {
        f.y -= c.body.offsetTop
      }
      for(b = a;(b = Zc(b)) && b != c.body && b != j;) {
        if(f.x -= b.scrollLeft, !Ua || "TR" != b.tagName) {
          f.y -= b.scrollTop
        }
      }
    }
  }
  return f
}
function cd(a, b, c) {
  b instanceof P ? (c = b.height, b = b.width) : c == h && e(Error("missing height argument"));
  a.style.width = dd(b, k);
  a.style.height = dd(c, k)
}
function dd(a, b) {
  "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
  return a
}
function ed(a) {
  if("none" != Wc(a, "display")) {
    return fd(a)
  }
  var b = a.style, c = b.display, d = b.visibility, g = b.position;
  b.visibility = "hidden";
  b.position = "absolute";
  b.display = "inline";
  a = fd(a);
  b.display = c;
  b.position = g;
  b.visibility = d;
  return a
}
function fd(a) {
  var b = a.offsetWidth, c = a.offsetHeight, d = J && !b && !c;
  return(!ca(b) || d) && a.getBoundingClientRect ? (a = Yc(a), new P(a.right - a.left, a.bottom - a.top)) : new P(b, c)
}
function gd(a) {
  var b = ad(a), a = ed(a);
  return new Sc(b.x, b.y, a.width, a.height)
}
function hd(a, b) {
  a.style.display = b ? "" : "none"
}
function bd(a) {
  return"rtl" == Wc(a, "direction")
}
var id = I ? "MozUserSelect" : J ? "WebkitUserSelect" : l;
function jd(a, b, c) {
  c = !c ? a.getElementsByTagName("*") : l;
  if(id) {
    if(b = b ? "none" : "", a.style[id] = b, c) {
      for(var a = 0, d;d = c[a];a++) {
        d.style[id] = b
      }
    }
  }else {
    if(H || Ua) {
      if(b = b ? "on" : "", a.setAttribute("unselectable", b), c) {
        for(a = 0;d = c[a];a++) {
          d.setAttribute("unselectable", b)
        }
      }
    }
  }
}
function kd(a) {
  return new P(a.offsetWidth, a.offsetHeight)
}
function ld(a, b) {
  var c = Mc(U(V(a)));
  if(H && (!c || !K("8"))) {
    var d = a.style;
    if(c) {
      var c = md(a), g = nd(a);
      d.pixelWidth = b.width - g.left - c.left - c.right - g.right;
      d.pixelHeight = b.height - g.top - c.top - c.bottom - g.bottom
    }else {
      d.pixelWidth = b.width, d.pixelHeight = b.height
    }
  }else {
    d = a.style, I ? d.MozBoxSizing = "border-box" : J ? d.WebkitBoxSizing = "border-box" : d.boxSizing = "border-box", d.width = Math.max(b.width, 0) + "px", d.height = Math.max(b.height, 0) + "px"
  }
}
function od(a) {
  var b = V(a), c = H && a.currentStyle;
  if(c && Mc(U(b)) && "auto" != c.width && "auto" != c.height && !c.boxSizing) {
    return b = pd(a, c.width, "width", "pixelWidth"), a = pd(a, c.height, "height", "pixelHeight"), new P(b, a)
  }
  c = kd(a);
  b = md(a);
  a = nd(a);
  return new P(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
}
function pd(a, b, c, d) {
  if(/^\d+px?$/.test(b)) {
    return parseInt(b, 10)
  }
  var g = a.style[c], f = a.runtimeStyle[c];
  a.runtimeStyle[c] = a.currentStyle[c];
  a.style[c] = b;
  b = a.style[d];
  a.style[c] = g;
  a.runtimeStyle[c] = f;
  return b
}
function qd(a, b) {
  return pd(a, a.currentStyle ? a.currentStyle[b] : l, "left", "pixelLeft")
}
function md(a) {
  if(H) {
    var b = qd(a, "paddingLeft"), c = qd(a, "paddingRight"), d = qd(a, "paddingTop"), a = qd(a, "paddingBottom");
    return new Rc(d, c, a, b)
  }
  b = Vc(a, "paddingLeft");
  c = Vc(a, "paddingRight");
  d = Vc(a, "paddingTop");
  a = Vc(a, "paddingBottom");
  return new Rc(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
}
var rd = {thin:2, medium:4, thick:6};
function sd(a, b) {
  if("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : l)) {
    return 0
  }
  var c = a.currentStyle ? a.currentStyle[b + "Width"] : l;
  return c in rd ? rd[c] : pd(a, c, "left", "pixelLeft")
}
function nd(a) {
  if(H) {
    var b = sd(a, "borderLeft"), c = sd(a, "borderRight"), d = sd(a, "borderTop"), a = sd(a, "borderBottom");
    return new Rc(d, c, a, b)
  }
  b = Vc(a, "borderLeftWidth");
  c = Vc(a, "borderRightWidth");
  d = Vc(a, "borderTopWidth");
  a = Vc(a, "borderBottomWidth");
  return new Rc(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
}
var td = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
function W(a) {
  this.F = o;
  this.pb = a;
  this.w = []
}
G(W, Lb);
var vd = [];
W.prototype.c = function(a, b, c, d, g) {
  ia(b) || (vd[0] = b, b = vd);
  for(var f = 0;f < b.length;f++) {
    this.w.push(Xb(a, b[f], c || this, d || o, g || this.pb || this))
  }
  return this
};
W.prototype.H = function(a, b, c, d, g) {
  if(ia(b)) {
    for(var f = 0;f < b.length;f++) {
      this.H(a, b[f], c, d, g)
    }
  }else {
    a: {
      c = c || this;
      g = g || this.pb || this;
      d = !!d;
      if(a = ac(a, b, d)) {
        for(b = 0;b < a.length;b++) {
          if(!a[b].vb && a[b].Mb == c && a[b].capture == d && a[b].Wc == g) {
            a = a[b];
            break a
          }
        }
      }
      a = l
    }
    a && (a = a.key, bc(a), Eb(this.w, a))
  }
  return this
};
function wd(a) {
  M(a.w, bc);
  a.w.length = 0
}
W.prototype.f = function() {
  W.b.f.call(this);
  wd(this)
};
W.prototype.handleEvent = function() {
  e(Error("EventHandler.handleEvent not implemented"))
};
function xd() {
}
B(xd);
xd.prototype.Pg = 0;
xd.L();
function X(a) {
  this.F = o;
  this.O = a || U();
  this.tc = yd
}
G(X, Oc);
X.prototype.Ig = xd.L();
var yd = l, zd = {oh:"beforeshow", ji:"show", Kh:"hide", xh:"disable", Dh:"enable", Lh:"highlight", ri:"unhighlight", kh:"activate", If:"deactivate", Kf:"select", ti:"unselect", ph:"check", qi:"uncheck", Jf:"focus", Gf:"blur", OPEN:"open", rh:"close", Eh:"enter", Qh:"leave", jh:"action", Hf:"change"};
function Ad(a, b) {
  switch(a) {
    case 1:
      return b ? "disable" : "enable";
    case 2:
      return b ? "highlight" : "unhighlight";
    case 4:
      return b ? "activate" : "deactivate";
    case 8:
      return b ? "select" : "unselect";
    case 16:
      return b ? "check" : "uncheck";
    case 32:
      return b ? "focus" : "blur";
    case 64:
      return b ? "open" : "close"
  }
  e(Error("Invalid component state"))
}
y = X.prototype;
y.Ga = l;
y.j = o;
y.e = l;
y.tc = l;
y.me = l;
y.n = l;
y.t = l;
y.X = l;
y.Ef = o;
function Bd(a) {
  return a.Ga || (a.Ga = ":" + (a.Ig.Pg++).toString(36))
}
function Cd(a, b) {
  if(a.n && a.n.X) {
    var c = a.n.X, d = a.Ga;
    d in c && delete c[d];
    ob(a.n.X, b, a)
  }
  a.Ga = b
}
y.a = v("e");
y.p = function() {
  return this.lb || (this.lb = new W(this))
};
function Dd(a, b) {
  a == b && e(Error("Unable to set parent component"));
  b && a.n && a.Ga && Ed(a.n, a.Ga) && a.n != b && e(Error("Unable to set parent component"));
  a.n = b;
  X.b.te.call(a, b)
}
y.getParent = v("n");
y.te = function(a) {
  this.n && this.n != a && e(Error("Method not supported"));
  X.b.te.call(this, a)
};
y.o = v("O");
y.d = function() {
  this.e = this.O.createElement("div")
};
y.rc = function(a) {
  Fd(this, a)
};
function Fd(a, b, c) {
  a.j && e(Error("Component already rendered"));
  a.e || a.d();
  b ? b.insertBefore(a.e, c || l) : a.O.s.body.appendChild(a.e);
  (!a.n || a.n.j) && a.i()
}
y.r = function(a) {
  this.j && e(Error("Component already rendered"));
  if(a && this.ia(a)) {
    this.Ef = k;
    if(!this.O || this.O.s != V(a)) {
      this.O = U(a)
    }
    this.u(a);
    this.i()
  }else {
    e(Error("Invalid element to decorate"))
  }
};
y.ia = w(k);
y.u = aa("e");
y.i = function() {
  this.j = k;
  this.jb(function(a) {
    !a.j && a.a() && a.i()
  })
};
y.Z = function() {
  this.jb(function(a) {
    a.j && a.Z()
  });
  this.lb && wd(this.lb);
  this.j = o
};
y.f = function() {
  X.b.f.call(this);
  this.j && this.Z();
  this.lb && (this.lb.J(), delete this.lb);
  this.jb(function(a) {
    a.J()
  });
  !this.Ef && this.e && yc(this.e);
  this.n = this.me = this.e = this.X = this.t = l
};
y.Db = function(a, b) {
  this.Id(a, Gd(this), b)
};
y.Id = function(a, b, c) {
  a.j && (c || !this.j) && e(Error("Component already rendered"));
  (0 > b || b > Gd(this)) && e(Error("Child component index out of bounds"));
  if(!this.X || !this.t) {
    this.X = {}, this.t = []
  }
  a.getParent() == this ? (this.X[Bd(a)] = a, Eb(this.t, a)) : ob(this.X, Bd(a), a);
  Dd(a, this);
  Ib(this.t, b, 0, a);
  a.j && this.j && a.getParent() == this ? (c = this.K(), c.insertBefore(a.a(), c.childNodes[b] || l)) : c ? (this.e || this.d(), b = Hd(this, b + 1), Fd(a, this.K(), b ? b.e : l)) : this.j && !a.j && a.e && a.e.parentNode && a.i()
};
y.K = v("e");
function Id(a) {
  a.tc == l && (a.tc = bd(a.j ? a.e : a.O.s.body));
  return a.tc
}
y.Qb = function(a) {
  this.j && e(Error("Component already rendered"));
  this.tc = a
};
function Gd(a) {
  return a.t ? a.t.length : 0
}
function Ed(a, b) {
  return a.X && b ? (b in a.X ? a.X[b] : h) || l : l
}
function Hd(a, b) {
  return a.t ? a.t[b] || l : l
}
y.jb = function(a, b) {
  this.t && M(this.t, a, b)
};
function Jd(a, b) {
  return a.t && b ? xb(a.t, b) : -1
}
y.removeChild = function(a, b) {
  if(a) {
    var c = E(a) ? a : Bd(a), a = Ed(this, c);
    if(c && a) {
      var d = this.X;
      c in d && delete d[c];
      Eb(this.t, a);
      b && (a.Z(), a.e && yc(a.e));
      Dd(a, l)
    }
  }
  a || e(Error("Child is not in parent component"));
  return a
};
var Kd = {};
function Ld(a, b, c) {
  this.jg = new Pc;
  this.Ec = a;
  this.ra = b;
  X.call(this, c)
}
G(Ld, X);
Ld.prototype.d = function() {
  var a = this.o(), b = a.d("div", Md), c = a.d("div", Nd);
  this.e = a.d("div", Od, b, c);
  this.Yf = b;
  this.Ge = c;
  this.Ec.a() || this.Ec.d();
  this.ra.a() || this.ra.d();
  a.appendChild(this.Yf, this.Ec.a());
  a.appendChild(this.Ge, this.ra.a())
};
Ld.prototype.i = function() {
  Ld.b.i.call(this);
  this.Ec.i();
  this.ra.i();
  var a = this.o();
  this.p().c(a.kc(), "resize", this.Va);
  this.Va()
};
Ld.prototype.Va = function() {
  var a = this.jg.Wd();
  Tc(this.ra.a(), {height:a.height - gd(this.ra.a()).top + "px", width:a.width + "px"});
  this.ra.Va(kd(this.Ge))
};
var Od = "synthjs-sdkoscillator", Md = "synthjs-sdkoscillator-menu-container", Nd = "synthjs-sdkoscillator-workspace-container";
/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function Pd(a, b) {
  this.Pa = [];
  this.Ze = a;
  this.Qd = b || l
}
y = Pd.prototype;
y.ta = o;
y.Ra = o;
y.xa = 0;
y.we = o;
y.Od = o;
y.Eb = 0;
y.cancel = function(a) {
  if(this.ta) {
    this.ha instanceof Pd && this.ha.cancel()
  }else {
    if(this.n) {
      var b = this.n;
      delete this.n;
      a ? b.cancel(a) : (b.Eb--, 0 >= b.Eb && b.cancel())
    }
    this.Ze ? this.Ze.call(this.Qd, this) : this.we = k;
    this.ta || this.hc(new Qd)
  }
};
y.gb = function(a, b) {
  Rd(this, a, b);
  this.xa--;
  0 == this.xa && this.ta && this.Rc()
};
function Rd(a, b, c) {
  a.ta = k;
  a.ha = c;
  a.Ra = !b;
  a.Rc()
}
function Sd(a) {
  a.ta && (a.we || e(new Td), a.we = o)
}
y.M = function(a) {
  Sd(this);
  Rd(this, k, a)
};
y.hc = function(a) {
  Sd(this);
  Rd(this, o, a)
};
function Ud(a, b) {
  return Vd(a, b, l, h)
}
function Vd(a, b, c, d) {
  a.Pa.push([b, c, d]);
  a.ta && a.Rc();
  return a
}
function Wd(a, b) {
  Vd(a, b.M, b.hc, b)
}
function Xd(a, b) {
  return Ud(a, F(b.We, b))
}
y.We = function(a) {
  var b = new Pd;
  Wd(this, b);
  a && (b.n = this, this.Eb++);
  return b
};
y.mc = function() {
  return Ab(this.Pa, function(a) {
    return ma(a[1])
  })
};
y.Rc = function() {
  this.Tb && this.ta && this.mc() && (z.clearTimeout(this.Tb), delete this.Tb);
  this.n && (this.n.Eb--, delete this.n);
  for(var a = this.ha, b = o, c = o;this.Pa.length && 0 == this.xa;) {
    var d = this.Pa.shift(), g = d[0], f = d[1], d = d[2];
    if(g = this.Ra ? f : g) {
      try {
        var j = g.call(d || this.Qd, a);
        ca(j) && (this.Ra = this.Ra && (j == a || j instanceof Error), this.ha = a = j);
        a instanceof Pd && (c = k, this.xa++)
      }catch(m) {
        a = m, this.Ra = k, this.mc() || (b = k)
      }
    }
  }
  this.ha = a;
  c && this.xa && (Vd(a, F(this.gb, this, k), F(this.gb, this, o)), a.Od = k);
  b && (this.Tb = z.setTimeout(function() {
    e(new Yd(a))
  }, 0))
};
function Td() {
  ub.call(this)
}
G(Td, ub);
Td.prototype.message = "Already called";
function Qd() {
  ub.call(this)
}
G(Qd, ub);
Qd.prototype.message = "Deferred was cancelled";
function Yd(a) {
  ub.call(this);
  this.message = "Unhandled Error in Deferred: " + (a.message || "[No message]")
}
G(Yd, ub);
function Zd() {
  Pd.call(this)
}
G(Zd, Pd);
function $d(a, b) {
  a.Pa.push([b, l, l]);
  return a
}
Zd.prototype.mc = function() {
  return Ab(this.Pa, function(a) {
    return a[0] instanceof Pd ? a[0].mc() : ma(a[1])
  })
};
Zd.prototype.Rc = function() {
  this.Tb && this.ta && this.mc() && (z.clearTimeout(this.Tb), delete this.Tb);
  this.n && (this.n.Eb--, delete this.n);
  for(var a = this.ha, b = o;this.Pa.length && 0 == this.xa;) {
    var c = this.Pa.shift();
    if(c[0] instanceof Pd) {
      c[0].ta ? c[0].gb(k, this.ha) : c[0].M(this.ha), this.ha = a = c[0].ha, c[0].xa && (a.Od = o, Vd(a, F(c[0].gb, c[0], k), F(c[0].gb, c[0], o)), b = k, this.xa++)
    }else {
      var d = c[0], g = c[1], c = c[2];
      if(d = this.Ra ? g : d) {
        d = d.call(c || this.Qd, a), ca(d) && (this.Ra = this.Ra && (d == a || d instanceof Error), this.ha = a = d), a instanceof Pd && (b = k, this.xa++)
      }
    }
  }
  this.ha = a;
  b && this.xa && (Vd(a, F(this.gb, this, k), F(this.gb, this, o)), a.Od = k)
};
Zd.prototype.We = function(a) {
  var b = new Zd;
  b.name = "branch";
  Wd(this, b);
  a && (b.n = this, this.Eb++);
  return b
};
function ae(a) {
  if("function" == typeof a.Fa) {
    return a.Fa()
  }
  if(E(a)) {
    return a.split("")
  }
  if(ja(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return lb(a)
}
function be(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(ja(a) || E(a)) {
      M(a, b, c)
    }else {
      var d;
      if("function" == typeof a.Jb) {
        d = a.Jb()
      }else {
        if("function" != typeof a.Fa) {
          if(ja(a) || E(a)) {
            d = [];
            for(var g = a.length, f = 0;f < g;f++) {
              d.push(f)
            }
          }else {
            d = mb(a)
          }
        }else {
          d = h
        }
      }
      for(var g = ae(a), f = g.length, j = 0;j < f;j++) {
        b.call(c, g[j], d && d[j], a)
      }
    }
  }
}
;function ce(a, b) {
  this.Ha = {};
  this.w = [];
  var c = arguments.length;
  if(1 < c) {
    c % 2 && e(Error("Uneven number of arguments"));
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    if(a) {
      a instanceof ce ? (c = a.Jb(), d = a.Fa()) : (c = mb(a), d = lb(a));
      for(var g = 0;g < c.length;g++) {
        this.set(c[g], d[g])
      }
    }
  }
}
y = ce.prototype;
y.m = 0;
y.Tc = v("m");
y.Fa = function() {
  de(this);
  for(var a = [], b = 0;b < this.w.length;b++) {
    a.push(this.Ha[this.w[b]])
  }
  return a
};
y.Jb = function() {
  de(this);
  return this.w.concat()
};
y.cc = function(a) {
  return ee(this.Ha, a)
};
y.ka = function(a, b) {
  if(this === a) {
    return k
  }
  if(this.m != a.Tc()) {
    return o
  }
  var c = b || fe;
  de(this);
  for(var d, g = 0;d = this.w[g];g++) {
    if(!c(this.get(d), a.get(d))) {
      return o
    }
  }
  return k
};
function fe(a, b) {
  return a === b
}
y.remove = function(a) {
  return ee(this.Ha, a) ? (delete this.Ha[a], this.m--, this.w.length > 2 * this.m && de(this), k) : o
};
function de(a) {
  if(a.m != a.w.length) {
    for(var b = 0, c = 0;b < a.w.length;) {
      var d = a.w[b];
      ee(a.Ha, d) && (a.w[c++] = d);
      b++
    }
    a.w.length = c
  }
  if(a.m != a.w.length) {
    for(var g = {}, c = b = 0;b < a.w.length;) {
      d = a.w[b], ee(g, d) || (a.w[c++] = d, g[d] = 1), b++
    }
    a.w.length = c
  }
}
y.get = function(a, b) {
  return ee(this.Ha, a) ? this.Ha[a] : b
};
y.set = function(a, b) {
  ee(this.Ha, a) || (this.m++, this.w.push(a));
  this.Ha[a] = b
};
y.I = function() {
  return new ce(this)
};
function ee(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
;function ge(a) {
  return he(a || arguments.callee.caller, [])
}
function he(a, b) {
  var c = [];
  if(N(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && 50 > b.length) {
      c.push(ie(a) + "(");
      for(var d = a.arguments, g = 0;g < d.length;g++) {
        0 < g && c.push(", ");
        var f;
        f = d[g];
        switch(typeof f) {
          case "object":
            f = f ? "object" : "null";
            break;
          case "string":
            break;
          case "number":
            f = "" + f;
            break;
          case "boolean":
            f = f ? "true" : "false";
            break;
          case "function":
            f = (f = ie(f)) ? f : "[fn]";
            break;
          default:
            f = typeof f
        }
        40 < f.length && (f = f.substr(0, 40) + "...");
        c.push(f)
      }
      b.push(a);
      c.push(")\n");
      try {
        c.push(he(a.caller, b))
      }catch(j) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
}
function ie(a) {
  if(je[a]) {
    return je[a]
  }
  a = "" + a;
  if(!je[a]) {
    var b = /function ([^\(]+)/.exec(a);
    je[a] = b ? b[1] : "[Anonymous]"
  }
  return je[a]
}
var je = {};
function ke(a, b, c, d, g) {
  this.reset(a, b, c, d, g)
}
ke.prototype.df = l;
ke.prototype.cf = l;
var le = 0;
ke.prototype.reset = function(a, b, c, d, g) {
  "number" == typeof g || le++;
  d || ua();
  this.pc = a;
  this.Ng = b;
  delete this.df;
  delete this.cf
};
ke.prototype.pd = aa("pc");
function me(a) {
  this.Og = a
}
me.prototype.n = l;
me.prototype.pc = l;
me.prototype.t = l;
me.prototype.nf = l;
function ne(a, b) {
  this.name = a;
  this.value = b
}
ne.prototype.toString = v("name");
var oe = new ne("CONFIG", 700), pe = new ne("ALL", 0);
y = me.prototype;
y.getParent = v("n");
y.ff = function() {
  this.t || (this.t = {});
  return this.t
};
y.pd = aa("pc");
function qe(a) {
  if(a.pc) {
    return a.pc
  }
  if(a.n) {
    return qe(a.n)
  }
  wb("Root logger has no level set.");
  return l
}
y.log = function(a, b, c) {
  if(a.value >= qe(this).value) {
    a = this.ug(a, b, c);
    b = "log:" + a.Ng;
    z.console && (z.console.timeStamp ? z.console.timeStamp(b) : z.console.markTimeline && z.console.markTimeline(b));
    z.msWriteProfilerMark && z.msWriteProfilerMark(b);
    for(b = this;b;) {
      var c = b, d = a;
      if(c.nf) {
        for(var g = 0, f = h;f = c.nf[g];g++) {
          f(d)
        }
      }
      b = b.getParent()
    }
  }
};
y.ug = function(a, b, c) {
  var d = new ke(a, "" + b, this.Og);
  if(c) {
    d.df = c;
    var g;
    var f = arguments.callee.caller;
    try {
      var j;
      var m = fa("window.location.href");
      if(E(c)) {
        j = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:m, stack:"Not available"}
      }else {
        var n, q, p = o;
        try {
          n = c.lineNumber || c.Hi || "Not available"
        }catch(r) {
          n = "Not available", p = k
        }
        try {
          q = c.fileName || c.filename || c.sourceURL || m
        }catch(C) {
          q = "Not available", p = k
        }
        j = p || !c.lineNumber || !c.fileName || !c.stack ? {message:c.message, name:c.name, lineNumber:n, fileName:q, stack:c.stack || "Not available"} : c
      }
      g = "Message: " + za(j.message) + '\nUrl: <a href="view-source:' + j.fileName + '" target="_new">' + j.fileName + "</a>\nLine: " + j.lineNumber + "\n\nBrowser stack:\n" + za(j.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + za(ge(f) + "-> ")
    }catch(s) {
      g = "Exception trying to expose exception! You win, we lose. " + s
    }
    d.cf = g
  }
  return d
};
var re = {}, se = l;
function te(a) {
  se || (se = new me(""), re[""] = se, se.pd(oe));
  var b;
  if(!(b = re[a])) {
    b = new me(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = te(a.substr(0, c));
    c.ff()[d] = b;
    b.n = c;
    re[a] = b
  }
  return b
}
;function ue() {
  this.F = o;
  this.xb = [];
  this.wc = {}
}
G(ue, Lb);
y = ue.prototype;
y.jd = 0;
y.gh = function(a) {
  if(0 != this.jd) {
    this.qc || (this.qc = []), this.qc.push(a)
  }else {
    var b = this.xb[a];
    b && ((b = this.wc[b]) && Eb(b, a), delete this.xb[a], delete this.xb[a + 1], delete this.xb[a + 2])
  }
};
y.Bf = function(a, b) {
  var c = this.wc[a];
  if(c) {
    this.jd++;
    for(var d = Jb(arguments, 1), g = 0, f = c.length;g < f;g++) {
      var j = c[g];
      this.xb[j + 1].apply(this.xb[j + 2], d)
    }
    this.jd--;
    if(this.qc && 0 == this.jd) {
      for(;c = this.qc.pop();) {
        this.gh(c)
      }
    }
  }
};
y.Tc = function(a) {
  if(a) {
    var b = this.wc[a];
    return b ? b.length : 0
  }
  a = 0;
  for(b in this.wc) {
    a += this.Tc(b)
  }
  return a
};
y.f = function() {
  ue.b.f.call(this);
  delete this.xb;
  delete this.wc;
  delete this.qc
};
function ve() {
  this.Na = 48E3;
  this.Re = new ue;
  this.Le = "function" == typeof webkitAudioContext;
  this.yd = o;
  "function" == typeof Audio && (this.yd = "function" == typeof(new Audio).mozSetup);
  this.Xb = {};
  this.Rf = 0;
  this.$b = "stop"
}
B(ve);
te("synthjs.audiocore.Player").pd(pe);
function we(a, b) {
  console.trace();
  kb(a.Xb, function(a, d) {
    b == a && delete this.Xb[d]
  }, a)
}
ve.prototype.play = function() {
  "play" == this.$b && this.stop();
  if(this.yd) {
    return this.$b = "play", xe(this)
  }
  return this.Le ? (this.$b = "play", ze(this)) : o
};
ve.prototype.stop = function() {
  if(this.yd) {
    return this.Re.Bf("finish"), this.$b = "stop", clearInterval(this.Lf), k
  }
  return this.Le ? (this.Re.Bf("finish"), this.$b = "stop", this.ud.disconnect(), k) : o
};
ve.prototype.Hb = function() {
  var a = k;
  kb(this.Xb, function(b) {
    a = a && b.Hb()
  });
  return a
};
function Ae(a, b) {
  var c = [];
  kb(a.Xb, function(a) {
    a.Hb() || c.push(a.Ud(b))
  });
  var d = new Pd;
  return Xd(Ud(new Pd, function() {
    Wd(Ud(new Be(c), function(a) {
      var c = new Float32Array(b), d = new Float32Array(b);
      a && M(a, function(a) {
        for(var g = 0;g < b;g++) {
          c[g] += a[1].oc[g], d[g] += a[1].sc[g]
        }
      });
      a = h;
      return{oc:c, sc:d}
    }), d);
    M(c, function(a) {
      a.M()
    })
  }), d)
}
function ze(a) {
  a.td || (a.td = new webkitAudioContext, a.ud = a.td.createJavaScriptNode(2048, 1, 2));
  a.ud.onaudioprocess = function(b) {
    function c(a, b) {
      for(;2048 > f;) {
        d[f] = a[f], g[f] = b[f], f++
      }
    }
    var d = b.outputBuffer.getChannelData(0), g = b.outputBuffer.getChannelData(1), f = 0;
    if(a.Hb()) {
      setTimeout(function() {
        a.stop()
      }, 100), b = new Float32Array(2048), c(b, b)
    }else {
      var j = Ud(Ae(a, 2048), function(a) {
        c(a.oc, a.sc);
        j = h
      });
      j.M()
    }
  };
  a.ud.connect(a.td.destination);
  return k
}
function xe(a) {
  var b = new Audio, c = 0, d = a.Na / 4, g;
  b.mozSetup(1, a.Na);
  a.Lf = setInterval(function() {
    if(a.Hb()) {
      a.stop()
    }else {
      var f;
      g && (totaltail += g.length, f = b.mozWriteAudio(g), c += f, g = l);
      var j = b.mozCurrentSampleOffset() + d - c;
      if(0 < j && !a.Hb()) {
        var m = 8192 <= j ? 8192 : j;
        Ud(Ae(a, m), function(a) {
          for(var d = a.oc, a = a.sc, j = new Float32Array(2 * d.length), r = 0;r < d.length;r++) {
            j[2 * r] = d[r], j[2 * r + 1] = a[r]
          }
          f = b.mozWriteAudio(d);
          f < m && (g = soundData.subarray(f));
          c += f
        }).M()
      }
    }
  }, 100);
  return k
}
;function Ce(a) {
  this.Fd = a;
  a = De();
  this.ra || (this.Hd || (this.Hd = new Ee), this.ra = this.Hd);
  this.gg = new Ld(a, this.ra);
  this.gg.rc(E(this.Fd) ? document.getElementById(this.Fd) : this.Fd);
  this.De()
}
Ce.prototype.De = u();
Ce.prototype.p = function() {
  return this.W || (this.W = new W(this))
};
var Fe = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
function Ge(a, b) {
  var c;
  if(a instanceof Ge) {
    this.$ = ca(b) ? b : a.$, He(this, a.Xa), c = a.yb, Ie(this), this.yb = c, c = a.Ea, Ie(this), this.Ea = c, Je(this, a.Nb), this.ue(a.Wa), Ke(this, a.ya.I()), c = a.kb, Ie(this), this.kb = c
  }else {
    if(a && (c = ("" + a).match(Fe))) {
      this.$ = !!b;
      He(this, c[1] || "", k);
      var d = c[2] || "";
      Ie(this);
      this.yb = d ? decodeURIComponent(d) : "";
      d = c[3] || "";
      Ie(this);
      this.Ea = d ? decodeURIComponent(d) : "";
      Je(this, c[4]);
      this.ue(c[5] || "", k);
      Ke(this, c[6] || "", k);
      c = c[7] || "";
      Ie(this);
      this.kb = c ? decodeURIComponent(c) : ""
    }else {
      this.$ = !!b, this.ya = new Le(l, 0, this.$)
    }
  }
}
y = Ge.prototype;
y.Xa = "";
y.yb = "";
y.Ea = "";
y.Nb = l;
y.Wa = "";
y.kb = "";
y.Jg = o;
y.$ = o;
y.toString = function() {
  var a = [], b = this.Xa;
  b && a.push(Me(b, Ne), ":");
  if(b = this.Ea) {
    a.push("//");
    var c = this.yb;
    c && a.push(Me(c, Ne), "@");
    a.push(encodeURIComponent("" + b));
    b = this.Nb;
    b != l && a.push(":", "" + b)
  }
  if(b = this.Wa) {
    this.Ea && "/" != b.charAt(0) && a.push("/"), a.push(Me(b, "/" == b.charAt(0) ? Oe : Pe))
  }
  (b = this.ya.toString()) && a.push("?", b);
  (b = this.kb) && a.push("#", Me(b, Qe));
  return a.join("")
};
function Re(a, b) {
  var c = a.I(), d = !!b.Xa;
  d ? He(c, b.Xa) : d = !!b.yb;
  if(d) {
    var g = b.yb;
    Ie(c);
    c.yb = g
  }else {
    d = !!b.Ea
  }
  d ? (g = b.Ea, Ie(c), c.Ea = g) : d = b.Nb != l;
  var f = b.Wa;
  if(d) {
    Je(c, b.Nb)
  }else {
    if(d = !!b.Wa) {
      if("/" != f.charAt(0) && (a.Ea && !a.Wa ? f = "/" + f : (g = c.Wa.lastIndexOf("/"), -1 != g && (f = c.Wa.substr(0, g + 1) + f))), ".." == f || "." == f) {
        f = ""
      }else {
        if(!(-1 == f.indexOf("./") && -1 == f.indexOf("/."))) {
          for(var g = 0 == f.lastIndexOf("/", 0), f = f.split("/"), j = [], m = 0;m < f.length;) {
            var n = f[m++];
            "." == n ? g && m == f.length && j.push("") : ".." == n ? ((1 < j.length || 1 == j.length && "" != j[0]) && j.pop(), g && m == f.length && j.push("")) : (j.push(n), g = k)
          }
          f = j.join("/")
        }
      }
    }
  }
  d ? c.ue(f) : d = "" !== b.ya.toString();
  d ? Ke(c, b.ya.toString() ? decodeURIComponent(b.ya.toString()) : "") : d = !!b.kb;
  d && (d = b.kb, Ie(c), c.kb = d);
  return c
}
y.I = function() {
  return new Ge(this)
};
function He(a, b, c) {
  Ie(a);
  a.Xa = c ? b ? decodeURIComponent(b) : "" : b;
  a.Xa && (a.Xa = a.Xa.replace(/:$/, ""))
}
function Je(a, b) {
  Ie(a);
  b ? (b = Number(b), (isNaN(b) || 0 > b) && e(Error("Bad port number " + b)), a.Nb = b) : a.Nb = l
}
y.ue = function(a, b) {
  Ie(this);
  this.Wa = b ? a ? decodeURIComponent(a) : "" : a
};
function Ke(a, b, c) {
  Ie(a);
  b instanceof Le ? (a.ya = b, a.ya.se(a.$)) : (c || (b = Me(b, Se)), a.ya = new Le(b, 0, a.$))
}
function Ie(a) {
  a.Jg && e(Error("Tried to modify a read-only Uri"))
}
y.se = function(a) {
  this.$ = a;
  this.ya && this.ya.se(a);
  return this
};
function Me(a, b) {
  return E(a) ? encodeURI(a).replace(b, Te) : l
}
function Te(a) {
  a = a.charCodeAt(0);
  return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
}
var Ne = /[#\/\?@]/g, Pe = /[\#\?:]/g, Oe = /[\#\?]/g, Se = /[\#\?@]/g, Qe = /#/g;
function Le(a, b, c) {
  this.Y = a || l;
  this.$ = !!c
}
function Ue(a) {
  if(!a.v && (a.v = new ce, a.m = 0, a.Y)) {
    for(var b = a.Y.split("&"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("="), g = l, f = l;
      0 <= d ? (g = b[c].substring(0, d), f = b[c].substring(d + 1)) : g = b[c];
      g = decodeURIComponent(g.replace(/\+/g, " "));
      g = Ve(a, g);
      a.add(g, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
    }
  }
}
y = Le.prototype;
y.v = l;
y.m = l;
y.Tc = function() {
  Ue(this);
  return this.m
};
y.add = function(a, b) {
  Ue(this);
  this.Y = l;
  var a = Ve(this, a), c = this.v.get(a);
  c || this.v.set(a, c = []);
  c.push(b);
  this.m++;
  return this
};
y.remove = function(a) {
  Ue(this);
  a = Ve(this, a);
  return this.v.cc(a) ? (this.Y = l, this.m -= this.v.get(a).length, this.v.remove(a)) : o
};
y.cc = function(a) {
  Ue(this);
  a = Ve(this, a);
  return this.v.cc(a)
};
y.Jb = function() {
  Ue(this);
  for(var a = this.v.Fa(), b = this.v.Jb(), c = [], d = 0;d < b.length;d++) {
    for(var g = a[d], f = 0;f < g.length;f++) {
      c.push(b[d])
    }
  }
  return c
};
y.Fa = function(a) {
  Ue(this);
  var b = [];
  if(a) {
    this.cc(a) && (b = Gb(b, this.v.get(Ve(this, a))))
  }else {
    for(var a = this.v.Fa(), c = 0;c < a.length;c++) {
      b = Gb(b, a[c])
    }
  }
  return b
};
y.set = function(a, b) {
  Ue(this);
  this.Y = l;
  a = Ve(this, a);
  this.cc(a) && (this.m -= this.v.get(a).length);
  this.v.set(a, [b]);
  this.m++;
  return this
};
y.get = function(a, b) {
  var c = a ? this.Fa(a) : [];
  return 0 < c.length ? "" + c[0] : b
};
y.toString = function() {
  if(this.Y) {
    return this.Y
  }
  if(!this.v) {
    return""
  }
  for(var a = [], b = this.v.Jb(), c = 0;c < b.length;c++) {
    for(var d = b[c], g = encodeURIComponent("" + d), d = this.Fa(d), f = 0;f < d.length;f++) {
      var j = g;
      "" !== d[f] && (j += "=" + encodeURIComponent("" + d[f]));
      a.push(j)
    }
  }
  return this.Y = a.join("&")
};
y.I = function() {
  var a = new Le;
  a.Y = this.Y;
  this.v && (a.v = this.v.I());
  return a
};
function Ve(a, b) {
  var c = "" + b;
  a.$ && (c = c.toLowerCase());
  return c
}
y.se = function(a) {
  a && !this.$ && (Ue(this), this.Y = l, be(this.v, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), this.remove(d), 0 < a.length && (this.Y = l, this.v.set(Ve(this, d), Hb(a)), this.m += a.length))
  }, this));
  this.$ = a
};
function We(a, b, c) {
  X.call(this, c);
  this.W = new W;
  this.Vf = a
}
G(We, X);
We.prototype.ka = function(a) {
  return this.constructor == a.constructor
};
We.prototype.kd = u();
function Xe() {
}
B(Xe);
Xe.prototype.r = function(a, b, c, d) {
  var g = F(d.d, d), f = g("div"), j = g("div"), m = c, n = 1, q, p;
  S(a, "keyboard-wrapper");
  Tc(a, "position", "relative");
  S(f, "white-keyboard");
  for(S(j, "black-keyboard");m.S >= b.S;) {
    p = g("div"), d.dh(p, {"data-note":m.getString()}), m.Kg ? (m.S == c.S && -1 !== "cdfga".indexOf(m.N, 0) ? (q = 9, S(p, "edge_short")) : m.S == b.S && -1 !== "degab".indexOf(m.N, 0) ? (q = 9, S(p, "edge_short")) : -1 !== "dga".indexOf(m.N, 0) ? (q = 19, S(p, "long")) : (q = 14, S(p, "short")), f.appendChild(p), n += q + 1) : (Tc(p, {position:"absolute", top:n - 5 - 1 + "px"}), j.appendChild(p)), m.S === c.S && S(p, "top"), S(p, "keyboard-key"), m.S === c.S && S(p, "first-key"), p = q = h, "c" === 
    m.N ? (q = m.ke - 1, p = "b") : (q = m.ke, p = Ye[xb(Ye, m.N) - 1]), m = new Ze(p, q, m.Ve)
  }
  a.appendChild(f);
  a.appendChild(j)
};
function Ze(a, b, c) {
  this.Ve = c ? c : 440;
  $e[a] && (a = $e[a]);
  Cb(Ye, function(b) {
    return b == a
  }) || e(Error("Can't create Note because of invalid parameters: " + a));
  this.N = a;
  this.ke = b;
  this.S = this.Ve * Math.pow(2, xb(Ye, a) / 12 + b);
  this.Kg = /^[a-g]$/.test(a)
}
Ze.prototype.ka = function(a) {
  return a.S === this.S
};
function af(a) {
  a = new Ze("c", a, h);
  return a.N ? a : o
}
Ze.prototype.getString = function() {
  return this.ke + "|" + this.N
};
var $e = {"d-":"c+", "e-":"d+", "g-":"f+", "a-":"g+", "b-":"a+"}, Ye = "c,c+,d,d+,e,f,f+,g,g+,a,a+,b".split(",");
function bf(a, b, c, d) {
  this.Xf = a;
  this.Sf = b;
  this.Ma = this.La = l;
  this.Dc = o;
  this.Ed = l;
  this.fg = c ? c : Kd.ui.L();
  this.W = new W;
  X.call(this, d)
}
G(bf, X);
y = bf.prototype;
y.u = function(a) {
  bf.b.u.call(this, a);
  this.fg.r(a, this.Xf, this.Sf, this.o())
};
y.i = function() {
  bf.b.i.call(this);
  this.W.c(this.a(), ["mousedown", "mousemove"], this.Qg, o, this);
  this.W.c(this.a(), ["mouseup"], this.Sg, o, this);
  this.W.c(this.a(), ["mouseout"], this.Tg, o, this)
};
y.Tg = function(a) {
  if(a.relatedTarget && !Ac(this.a(), a.relatedTarget) || a.relatedTarget == this.a()) {
    this.La && cf(this, this.La.dataset.note, df), this.La = l, this.Ma && ic(this.Ma, "mouseover"), this.Ma = l, this.Dc = o
  }
};
y.Sg = function(a) {
  a.preventDefault();
  this.Dc = o;
  this.La = l;
  a.target.dataset.note && cf(this, a.target.dataset.note, df)
};
y.Qg = function(a) {
  a.preventDefault();
  "mousedown" == a.type && (this.Dc = k);
  a.target.dataset.note && (this.Dc && this.La != a.target && (this.La && cf(this, this.La.dataset.note, df), cf(this, a.target.dataset.note, ef), this.La = a.target), this.Ma != a.target && (this.Ma && ic(this.Ma, "mouseover"), this.Ma = a.target, S(this.Ma, "mouseover")))
};
function cf(a, b, c) {
  a.Ed && c == ef && cf(a, a.Ed, df);
  var d = event = new O(c), g = b.indexOf("|"), f = b.slice(0, g), g = b.slice(g + 1);
  (f = new Ze(g, parseInt(f), h)) || e(Error("invalid strings"));
  d.N = f.N ? f : o;
  a.dispatchEvent(event);
  c == ef && (a.Ed = b)
}
var ef = "keyboard-on", df = "keyboard-off";
function ff(a, b, c, d) {
  this.sa = a;
  this.za = b;
  We.call(this, "debug", 0, d)
}
G(ff, We);
ff.prototype.f = function() {
  this.sa.J();
  this.sa = l;
  this.za.J();
  this.za = l
};
ff.prototype.u = function(a) {
  ff.b.u.call(this, a);
  var b = this.o();
  this.Ad = b.d("div", "window-oscillator-keyboard");
  this.Dd = b.d("div", "window-oscillator-oscillator");
  this.sa.r(this.Ad);
  this.za && this.za.r(this.Dd);
  b.append(a, this.Ad);
  b.append(a, this.Dd)
};
ff.prototype.kd = function() {
  this.o();
  var a = kd(this.Ad), b = od(this.a());
  Tc(this.Dd, {width:b.width - a.width + "px"});
  this.za && this.za.kd()
};
function gf() {
  this.F = o
}
G(gf, Oc);
gf.prototype.p = function() {
  return this.W || (this.W = new W(this))
};
gf.prototype.f = function() {
  gf.b.f.call(this);
  this.lb && (this.W.J(), delete this.W)
};
function hf(a) {
  this.cb = a;
  this.Ug = F(function(a) {
    a.data.callback ? (this.bb[a.data.callback] ? (this.bb[a.data.callback].M(a.data), delete this.bb[a.data.callback]) : e(Error("invalid callback name")), this.Je[a.data.callback] && delete this.Je[a.data.callback]) : console.log(a.data)
  }, this);
  F(function(a) {
    a.data.callback && (this.bb[a.data.callback] ? (this.bb[a.data.callback].M(a.data), delete this.bb[a.data.callback]) : e(Error("invalid callback name")))
  }, this);
  this.bb = {};
  this.Je = {};
  this.cb.addEventListener("message", this.Ug)
}
hf.prototype.create = function(a) {
  var a = a || {}, b = (65536 * (1 + Math.random()) | 0).toString(16).substring(1) + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1) + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1) + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1), c = new Zd, d = Xd(Ud(new Zd, F(function(c) {
    ma(a) ? (c = a(c), c.callback = b, this.cb.postMessage(c)) : (a.callback = b, this.cb.postMessage(a))
  }, this)), c);
  this.bb[b] = c;
  return d
};
function jf(a, b) {
  this.F = o;
  this.ig = a;
  this.Na = b && b.md ? b.md : 48E3;
  (!b || !b.md) && console.log("wavePlugin set default sample rate: 48000");
  this.zd = o;
  this.cb = new Worker(a);
  this.Ic = new hf(this.cb);
  this.Wb = F(function(a) {
    var b = new O(kf);
    b.error = a;
    this.dispatchEvent(b)
  }, this);
  this.cb.addEventListener("error", this.Wb);
  this.p().c(document, "error", this.Wb, o, this)
}
G(jf, gf);
jf.prototype.f = function() {
  jf.b.f.call(this);
  this.cb.removeEventListener("error", this.Wb);
  this.W.J()
};
jf.prototype.I = function() {
  return new jf(this.ig, {md:this.Na})
};
function lf(a) {
  a.zd = k;
  return Ud(a.Ic.create({action:"init", initParams:{sampleRate:a.Na}}), function(b) {
    a.dispatchEvent(new O(mf, b));
    return b
  })
}
function nf(a, b) {
  var c = a.Ic.create({action:"addEvent", event:b});
  return a.zd ? c : $d(lf(a), c)
}
jf.prototype.Ud = function(a) {
  var b = this.Ic.create({action:"getBuffer", length:a}, {error:function() {
    console.log("GET BUFFER ERROR");
    return{oc:new Float32Array(a), sc:new Float32Array(a)}
  }});
  return Ud(this.zd ? b : $d(lf(this), b), function(a) {
    return{oc:a.leftBuffer, sc:a.rightBuffer}
  })
};
function of(a, b, c) {
  return a.Ic.create({action:"setParam", name:b, value:c}, {error:u()})
}
function pf(a, b) {
  this.type = a;
  if(a == qf || a == rf) {
    if(b.N.constructor != Ze || b.Be) {
      this.note = {freq:b.N.S}
    }
    this.velocity = b.Be
  }
}
var qf = "noteon", rf = "noteoff", kf = "waveplugin_error", mf = "waveplugin_init";
function sf(a, b) {
  a || e(Error("Invalid class name " + a));
  ma(b) || e(Error("Invalid decorator function " + b));
  tf[a] = b
}
var uf = {}, tf = {};
function vf(a, b, c) {
  a.setAttribute("aria-" + b, c)
}
;function wf() {
}
var xf;
B(wf);
y = wf.prototype;
y.na = u();
y.d = function(a) {
  var b = a.o().d("div", this.Ib(a).join(" "), a.Da);
  this.nd(a, b);
  return b
};
y.K = function(a) {
  return a
};
y.gc = function(a, b, c) {
  if(a = a.a ? a.a() : a) {
    if(H && !K("7")) {
      var d = yf(Q(a), b);
      d.push(b);
      ta(c ? S : ic, a).apply(l, d)
    }else {
      c ? S(a, b) : ic(a, b)
    }
  }
};
y.ia = w(k);
y.r = function(a, b) {
  b.id && Cd(a, b.id);
  var c = this.K(b);
  c && c.firstChild ? zf(a, c.firstChild.nextSibling ? Hb(c.childNodes) : c.firstChild) : a.Da = l;
  var d = 0, g = this.l(), f = this.l(), j = o, m = o, c = o, n = Q(b);
  M(n, function(a) {
    !j && a == g ? (j = k, f == g && (m = k)) : !m && a == f ? m = k : d |= this.Xd(a)
  }, this);
  a.Za = d;
  j || (n.push(g), f == g && (m = k));
  m || n.push(f);
  var q = a.ma;
  q && n.push.apply(n, q);
  if(H && !K("7")) {
    var p = yf(n);
    0 < p.length && (n.push.apply(n, p), c = k)
  }
  if(!j || !m || q || c) {
    b.className = n.join(" ")
  }
  this.nd(a, b);
  return b
};
y.Lb = function(a) {
  Id(a) && this.Qb(a.a(), k);
  a.isEnabled() && this.Ya(a, a.q)
};
y.nd = function(a, b) {
  a.isEnabled() || this.R(b, 1, k);
  Y(a, 8) && this.R(b, 8, k);
  a.z & 16 && this.R(b, 16, Y(a, 16));
  a.z & 64 && this.R(b, 64, Y(a, 64))
};
y.uc = function(a, b) {
  jd(a, !b, !H && !Ua)
};
y.Qb = function(a, b) {
  this.gc(a, this.l() + "-rtl", b)
};
y.Sa = function(a) {
  var b;
  return a.z & 32 && (b = a.B()) ? Fc(b) : o
};
y.Ya = function(a, b) {
  var c;
  if(a.z & 32 && (c = a.B())) {
    if(!b && Y(a, 32)) {
      try {
        c.blur()
      }catch(d) {
      }
      Y(a, 32) && a.mb(l)
    }
    Fc(c) != b && (b ? c.tabIndex = 0 : (c.tabIndex = -1, c.removeAttribute("tabIndex")))
  }
};
y.qa = function(a, b) {
  hd(a, b)
};
y.V = function(a, b, c) {
  var d = a.a();
  if(d) {
    var g = this.ic(b);
    g && this.gc(a, g, c);
    this.R(d, b, c)
  }
};
y.R = function(a, b, c) {
  xf || (xf = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  (b = xf[b]) && vf(a, b, c)
};
y.B = function(a) {
  return a.a()
};
y.l = w("goog-control");
y.Ib = function(a) {
  var b = this.l(), c = [b], d = this.l();
  d != b && c.push(d);
  b = a.Za;
  for(d = [];b;) {
    var g = b & -b;
    d.push(this.ic(g));
    b &= ~g
  }
  c.push.apply(c, d);
  (a = a.ma) && c.push.apply(c, a);
  H && !K("7") && c.push.apply(c, yf(c));
  return c
};
function yf(a, b) {
  var c = [];
  b && (a = a.concat([b]));
  M([], function(d) {
    Bb(d, ta(N, a)) && (!b || N(d, b)) && c.push(d.join("_"))
  });
  return c
}
y.ic = function(a) {
  this.Oc || Af(this);
  return this.Oc[a]
};
y.Xd = function(a) {
  if(!this.Df) {
    this.Oc || Af(this);
    var b = this.Oc, c = {}, d;
    for(d in b) {
      c[b[d]] = d
    }
    this.Df = c
  }
  a = parseInt(this.Df[a], 10);
  return isNaN(a) ? 0 : a
};
function Af(a) {
  var b = a.l();
  a.Oc = {1:b + "-disabled", 2:b + "-hover", 4:b + "-active", 8:b + "-selected", 16:b + "-checked", 32:b + "-focused", 64:b + "-open"}
}
;function Bf() {
}
G(Bf, wf);
B(Bf);
Bf.prototype.d = function(a) {
  return a.o().d("div", this.l())
};
Bf.prototype.r = function(a, b) {
  b.id && Cd(a, b.id);
  if("HR" == b.tagName) {
    var c = b, b = this.d(a);
    c.parentNode && c.parentNode.insertBefore(b, c);
    yc(c)
  }else {
    S(b, this.l())
  }
  return b
};
Bf.prototype.l = w("goog-menuseparator");
function Cf(a, b, c, d, g) {
  if(!H && (!J || !K("525"))) {
    return k
  }
  if(Ma && g) {
    return Df(a)
  }
  if(g && !d || !c && (17 == b || 18 == b) || H && d && b == a) {
    return o
  }
  switch(a) {
    case 13:
      return!(H && hb(9));
    case 27:
      return!J
  }
  return Df(a)
}
function Df(a) {
  if(48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || J && 0 == a) {
    return k
  }
  switch(a) {
    case 32:
    ;
    case 63:
    ;
    case 107:
    ;
    case 109:
    ;
    case 110:
    ;
    case 111:
    ;
    case 186:
    ;
    case 59:
    ;
    case 189:
    ;
    case 187:
    ;
    case 61:
    ;
    case 188:
    ;
    case 190:
    ;
    case 191:
    ;
    case 192:
    ;
    case 222:
    ;
    case 219:
    ;
    case 220:
    ;
    case 221:
      return k;
    default:
      return o
  }
}
function Ef(a) {
  switch(a) {
    case 61:
      return 187;
    case 59:
      return 186;
    case 224:
      return 91;
    case 0:
      return 224;
    default:
      return a
  }
}
;function Ff(a, b) {
  this.F = o;
  a && Gf(this, a, b)
}
G(Ff, Oc);
y = Ff.prototype;
y.e = l;
y.Zc = l;
y.ge = l;
y.$c = l;
y.Ua = -1;
y.Ta = -1;
var Hf = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, If = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, Jf = H || 
J && K("525");
y = Ff.prototype;
y.Cg = function(a) {
  if(J && (17 == this.Ua && !a.ctrlKey || 18 == this.Ua && !a.altKey)) {
    this.Ta = this.Ua = -1
  }
  Jf && !Cf(a.keyCode, this.Ua, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : this.Ta = I ? Ef(a.keyCode) : a.keyCode
};
y.Dg = function() {
  this.Ta = this.Ua = -1
};
y.handleEvent = function(a) {
  var b = a.la, c, d;
  H && "keypress" == a.type ? (c = this.Ta, d = 13 != c && 27 != c ? b.keyCode : 0) : J && "keypress" == a.type ? (c = this.Ta, d = 0 <= b.charCode && 63232 > b.charCode && Df(c) ? b.charCode : 0) : Ua ? (c = this.Ta, d = Df(c) ? b.keyCode : 0) : (c = b.keyCode || this.Ta, d = b.charCode || 0, Ma && 63 == d && 224 == c && (c = 191));
  var g = c, f = b.keyIdentifier;
  c ? 63232 <= c && c in Hf ? g = Hf[c] : 25 == c && a.shiftKey && (g = 9) : f && f in If && (g = If[f]);
  a = g == this.Ua;
  this.Ua = g;
  this.dispatchEvent(new Kf(g, d, a, b))
};
y.a = v("e");
function Gf(a, b, c) {
  a.$c && a.detach();
  a.e = b;
  a.Zc = Xb(a.e, "keypress", a, c);
  a.ge = Xb(a.e, "keydown", a.Cg, c, a);
  a.$c = Xb(a.e, "keyup", a.Dg, c, a)
}
y.detach = function() {
  this.Zc && (bc(this.Zc), bc(this.ge), bc(this.$c), this.$c = this.ge = this.Zc = l);
  this.e = l;
  this.Ta = this.Ua = -1
};
y.f = function() {
  Ff.b.f.call(this);
  this.detach()
};
function Kf(a, b, c, d) {
  d && this.qb(d, h);
  this.type = "key";
  this.keyCode = a;
  this.charCode = b;
  this.repeat = c
}
G(Kf, Qb);
function Z(a, b, c) {
  X.call(this, c);
  if(!b) {
    for(var b = this.constructor, d;b;) {
      d = oa(b);
      if(d = uf[d]) {
        break
      }
      b = b.b ? b.b.constructor : l
    }
    b = d ? ma(d.L) ? d.L() : new d : l
  }
  this.h = b;
  this.Da = a
}
G(Z, X);
y = Z.prototype;
y.Da = l;
y.Za = 0;
y.z = 39;
y.Md = 255;
y.Ja = 0;
y.q = k;
y.ma = l;
y.ce = k;
y.Kc = o;
y.zf = l;
function Lf(a, b) {
  a.j && b != a.ce && Mf(a, b);
  a.ce = b
}
y.B = function() {
  return this.h.B(this)
};
y.Uc = function() {
  return this.aa || (this.aa = new Ff)
};
y.gc = function(a, b) {
  b ? a && (this.ma ? N(this.ma, a) || this.ma.push(a) : this.ma = [a], this.h.gc(this, a, k)) : a && this.ma && (Eb(this.ma, a), 0 == this.ma.length && (this.ma = l), this.h.gc(this, a, o))
};
y.d = function() {
  var a = this.h.d(this);
  this.e = a;
  var b = this.zf || this.h.na();
  b && a.setAttribute("role", b);
  this.Kc || this.h.uc(a, o);
  this.q || this.h.qa(a, o)
};
y.K = function() {
  return this.h.K(this.a())
};
y.ia = function(a) {
  return this.h.ia(a)
};
y.u = function(a) {
  this.e = a = this.h.r(this, a);
  var b = this.zf || this.h.na();
  b && a.setAttribute("role", b);
  this.Kc || this.h.uc(a, o);
  this.q = "none" != a.style.display
};
y.i = function() {
  Z.b.i.call(this);
  this.h.Lb(this);
  if(this.z & -2 && (this.ce && Mf(this, k), this.z & 32)) {
    var a = this.B();
    if(a) {
      var b = this.Uc();
      Gf(b, a);
      this.p().c(b, "key", this.va).c(a, "focus", this.Vc).c(a, "blur", this.mb)
    }
  }
};
function Mf(a, b) {
  var c = a.p(), d = a.a();
  b ? (c.c(d, "mouseover", a.ee).c(d, "mousedown", a.nb).c(d, "mouseup", a.ob).c(d, "mouseout", a.de), a.lc != ga && c.c(d, "contextmenu", a.lc), H && c.c(d, "dblclick", a.mf)) : (c.H(d, "mouseover", a.ee).H(d, "mousedown", a.nb).H(d, "mouseup", a.ob).H(d, "mouseout", a.de), a.lc != ga && c.H(d, "contextmenu", a.lc), H && c.H(d, "dblclick", a.mf))
}
y.Z = function() {
  Z.b.Z.call(this);
  this.aa && this.aa.detach();
  this.q && this.isEnabled() && this.h.Ya(this, o)
};
y.f = function() {
  Z.b.f.call(this);
  this.aa && (this.aa.J(), delete this.aa);
  delete this.h;
  this.ma = this.Da = l
};
function zf(a, b) {
  a.Da = b
}
y.Sc = function() {
  var a = this.Da;
  if(!a) {
    return""
  }
  if(!E(a)) {
    if(ia(a)) {
      a = zb(a, Ic).join("")
    }else {
      if(mc && "innerText" in a) {
        a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n")
      }else {
        var b = [];
        Jc(a, b, k);
        a = b.join("")
      }
      a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
      a = a.replace(/\u200B/g, "");
      mc || (a = a.replace(/ +/g, " "));
      " " != a && (a = a.replace(/^\s*/, ""))
    }
  }
  return xa(a)
};
y.Qb = function(a) {
  Z.b.Qb.call(this, a);
  var b = this.a();
  b && this.h.Qb(b, a)
};
y.uc = function(a) {
  this.Kc = a;
  var b = this.a();
  b && this.h.uc(b, a)
};
y.qa = function(a, b) {
  if(b || this.q != a && this.dispatchEvent(a ? "show" : "hide")) {
    var c = this.a();
    c && this.h.qa(c, a);
    this.isEnabled() && this.h.Ya(this, a);
    this.q = a;
    return k
  }
  return o
};
y.isEnabled = function() {
  return!Y(this, 1)
};
y.wb = function(a) {
  var b = this.getParent();
  if((!b || "function" != typeof b.isEnabled || b.isEnabled()) && Nf(this, 1, !a)) {
    a || (this.setActive(o), this.oa(o)), this.q && this.h.Ya(this, a), this.V(1, !a)
  }
};
y.oa = function(a) {
  Nf(this, 2, a) && this.V(2, a)
};
y.setActive = function(a) {
  Nf(this, 4, a) && this.V(4, a)
};
y.D = function(a) {
  Nf(this, 64, a) && this.V(64, a)
};
function Y(a, b) {
  return!!(a.Za & b)
}
y.V = function(a, b) {
  this.z & a && b != Y(this, a) && (this.h.V(this, a, b), this.Za = b ? this.Za | a : this.Za & ~a)
};
function Of(a, b, c) {
  a.j && Y(a, b) && !c && e(Error("Component already rendered"));
  !c && Y(a, b) && a.V(b, o);
  a.z = c ? a.z | b : a.z & ~b
}
function Pf(a, b) {
  return!!(a.Md & b) && !!(a.z & b)
}
function Nf(a, b, c) {
  return!!(a.z & b) && Y(a, b) != c && (!(a.Ja & b) || a.dispatchEvent(Ad(b, c))) && !a.F
}
y.ee = function(a) {
  !Qf(a, this.a()) && this.dispatchEvent("enter") && this.isEnabled() && Pf(this, 2) && this.oa(k)
};
y.de = function(a) {
  !Qf(a, this.a()) && this.dispatchEvent("leave") && (Pf(this, 4) && this.setActive(o), Pf(this, 2) && this.oa(o))
};
y.lc = ga;
function Qf(a, b) {
  return!!a.relatedTarget && Ac(b, a.relatedTarget)
}
y.nb = function(a) {
  if(this.isEnabled() && (Pf(this, 2) && this.oa(k), Sb(a) && (!J || !Ma || !a.ctrlKey))) {
    Pf(this, 4) && this.setActive(k), this.h.Sa(this) && this.B().focus()
  }
  !this.Kc && Sb(a) && (!J || !Ma || !a.ctrlKey) && a.preventDefault()
};
y.ob = function(a) {
  this.isEnabled() && (Pf(this, 2) && this.oa(k), Y(this, 4) && this.sb(a) && Pf(this, 4) && this.setActive(o))
};
y.mf = function(a) {
  this.isEnabled() && this.sb(a)
};
y.sb = function(a) {
  if(Pf(this, 16)) {
    var b = !Y(this, 16);
    Nf(this, 16, b) && this.V(16, b)
  }
  Pf(this, 8) && Nf(this, 8, k) && this.V(8, k);
  Pf(this, 64) && this.D(!Y(this, 64));
  b = new O("action", this);
  a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.oe = a.oe);
  return this.dispatchEvent(b)
};
y.Vc = function() {
  Pf(this, 32) && Nf(this, 32, k) && this.V(32, k)
};
y.mb = function() {
  Pf(this, 4) && this.setActive(o);
  Pf(this, 32) && Nf(this, 32, o) && this.V(32, o)
};
y.va = function(a) {
  return this.q && this.isEnabled() && this.wa(a) ? (a.preventDefault(), a.stopPropagation(), k) : o
};
y.wa = function(a) {
  return 13 == a.keyCode && this.sb(a)
};
ma(Z) || e(Error("Invalid component class " + Z));
ma(wf) || e(Error("Invalid renderer class " + wf));
var Rf = oa(Z);
uf[Rf] = wf;
sf("goog-control", function() {
  return new Z(l)
});
function Sf(a, b) {
  Z.call(this, l, a || Bf.L(), b);
  Of(this, 1, o);
  Of(this, 2, o);
  Of(this, 4, o);
  Of(this, 32, o);
  this.Za = 1
}
G(Sf, Z);
Sf.prototype.i = function() {
  Sf.b.i.call(this);
  this.a().setAttribute("role", "separator")
};
sf("goog-menuseparator", function() {
  return new Sf
});
function Tf(a) {
  Sf.call(this, Bf.L(), a)
}
G(Tf, Sf);
sf("goog-menuseparator", function() {
  return new Sf
});
function Uf(a, b, c, d, g, f, j, m, n) {
  var q, p;
  if(q = c.offsetParent) {
    var r = "HTML" == q.tagName || "BODY" == q.tagName;
    if(!r || "static" != Wc(q, "position")) {
      p = ad(q), r || (r = (r = bd(q)) && I ? -q.scrollLeft : r && (!H || !K("8")) ? q.scrollWidth - q.clientWidth - q.scrollLeft : q.scrollLeft, p = nc(p, new T(r, q.scrollTop)))
    }
  }
  q = p || new T;
  p = gd(a);
  if(r = $c(a)) {
    var C = new Sc(r.left, r.top, r.right - r.left, r.bottom - r.top), r = Math.max(p.left, C.left), s = Math.min(p.left + p.width, C.left + C.width);
    if(r <= s) {
      var la = Math.max(p.top, C.top), C = Math.min(p.top + p.height, C.top + C.height);
      la <= C && (p.left = r, p.top = la, p.width = s - r, p.height = C - la)
    }
  }
  r = U(a);
  la = U(c);
  if(r.s != la.s) {
    var s = r.s.body, la = la.kc(), C = new T(0, 0), da = V(s) ? V(s).parentWindow || V(s).defaultView : window, Oa = s;
    do {
      var A;
      if(da == la) {
        A = ad(Oa)
      }else {
        A = Oa;
        var ea = new T;
        if(1 == A.nodeType) {
          if(Xc(A)) {
            var x = Yc(A);
            ea.x = x.left;
            ea.y = x.top
          }else {
            var x = Nc(U(A)), R = ad(A);
            ea.x = R.x - x.x;
            ea.y = R.y - x.y
          }
          I && !K(12) && (x = h, x = h, H ? x = "-ms-transform" : J ? x = "-webkit-transform" : Ua ? x = "-o-transform" : I && (x = "-moz-transform"), R = h, x && (R = Wc(A, x)), R || (R = Wc(A, "transform")), R ? (A = R.match(td), x = !A ? new T(0, 0) : new T(parseFloat(A[1]), parseFloat(A[2]))) : x = new T(0, 0), ea = new T(ea.x + x.x, ea.y + x.y))
        }else {
          x = ma(A.sg), R = A, A.targetTouches ? R = A.targetTouches[0] : x && A.la.targetTouches && (R = A.la.targetTouches[0]), ea.x = R.clientX, ea.y = R.clientY
        }
        A = ea
      }
      C.x += A.x;
      C.y += A.y
    }while(da && da != la && (Oa = da.frameElement) && (da = da.parent));
    s = nc(C, ad(s));
    H && !Mc(r) && (s = nc(s, Nc(r)));
    p.left += s.x;
    p.top += s.y
  }
  a = (b & 4 && bd(a) ? b ^ 2 : b) & -5;
  b = new T(a & 2 ? p.left + p.width : p.left, a & 1 ? p.top + p.height : p.top);
  b = nc(b, q);
  g && (b.x += (a & 2 ? -1 : 1) * g.x, b.y += (a & 1 ? -1 : 1) * g.y);
  var t;
  if(j) {
    if(n) {
      t = n
    }else {
      if(t = $c(c)) {
        t.top -= q.y, t.right -= q.x, t.bottom -= q.y, t.left -= q.x
      }
    }
  }
  a: {
    n = t;
    g = b.I();
    t = 0;
    a = (d & 4 && bd(c) ? d ^ 2 : d) & -5;
    d = ed(c);
    m = m ? m.I() : d.I();
    if(f || 0 != a) {
      a & 2 ? g.x -= m.width + (f ? f.right : 0) : f && (g.x += f.left), a & 1 ? g.y -= m.height + (f ? f.bottom : 0) : f && (g.y += f.top)
    }
    if(j) {
      if(n) {
        f = g;
        t = 0;
        if(65 == (j & 65) && (f.x < n.left || f.x >= n.right)) {
          j &= -2
        }
        if(132 == (j & 132) && (f.y < n.top || f.y >= n.bottom)) {
          j &= -5
        }
        f.x < n.left && j & 1 && (f.x = n.left, t |= 1);
        f.x < n.left && f.x + m.width > n.right && j & 16 && (m.width = Math.max(m.width - (f.x + m.width - n.right), 0), t |= 4);
        f.x + m.width > n.right && j & 1 && (f.x = Math.max(n.right - m.width, n.left), t |= 1);
        j & 2 && (t |= (f.x < n.left ? 16 : 0) | (f.x + m.width > n.right ? 32 : 0));
        f.y < n.top && j & 4 && (f.y = n.top, t |= 2);
        f.y >= n.top && f.y + m.height > n.bottom && j & 32 && (m.height = Math.max(m.height - (f.y + m.height - n.bottom), 0), t |= 8);
        f.y + m.height > n.bottom && j & 4 && (f.y = Math.max(n.bottom - m.height, n.top), t |= 2);
        j & 8 && (t |= (f.y < n.top ? 64 : 0) | (f.y + m.height > n.bottom ? 128 : 0));
        j = t
      }else {
        j = 256
      }
      t = j;
      if(t & 496) {
        c = t;
        break a
      }
    }
    f = I && (Ma || Ya) && K("1.9");
    g instanceof T ? (j = g.x, g = g.y) : (j = g, g = h);
    c.style.left = dd(j, f);
    c.style.top = dd(g, f);
    gc(d, m) || ld(c, m);
    c = t
  }
  return c
}
;function Vf() {
}
Vf.prototype.qe = u();
function Wf(a, b, c) {
  this.element = a;
  this.Pc = b;
  this.Zg = c
}
G(Wf, Vf);
Wf.prototype.qe = function(a, b, c) {
  Uf(this.element, this.Pc, a, b, h, c, this.Zg)
};
var Xf = function(a) {
  return function() {
    return a
  }
}(k);
function Yf(a, b, c, d) {
  Wf.call(this, a, b);
  this.ad = c ? 5 : 0;
  this.ne = d || h
}
G(Yf, Wf);
Yf.prototype.tg = v("ad");
Yf.prototype.qe = function(a, b, c, d) {
  var g = Uf(this.element, this.Pc, a, b, l, c, 10, d, this.ne);
  if(g & 496) {
    var f = Zf(g, this.Pc), b = Zf(g, b), g = Uf(this.element, f, a, b, l, c, 10, d, this.ne);
    g & 496 && (f = Zf(g, f), b = Zf(g, b), Uf(this.element, f, a, b, l, c, this.ad, d, this.ne))
  }
};
function Zf(a, b) {
  a & 48 && (b ^= 2);
  a & 192 && (b ^= 1);
  return b
}
;function $f(a, b, c, d) {
  Yf.call(this, a, b, c || d);
  if(c || d) {
    this.ad = 65 | (d ? 32 : 132)
  }
}
G($f, Yf);
function ag() {
}
G(ag, wf);
B(ag);
y = ag.prototype;
y.na = w("button");
y.R = function(a, b, c) {
  16 == b ? vf(a, "pressed", c) : ag.b.R.call(this, a, b, c)
};
y.d = function(a) {
  var b = ag.b.d.call(this, a), c = a.jc();
  c && this.ve(b, c);
  (c = a.Kb()) && this.Rb(b, c);
  a.z & 16 && this.R(b, 16, Y(a, 16));
  return b
};
y.r = function(a, b) {
  var b = ag.b.r.call(this, a, b), c = this.Kb(b);
  a.Ae = c;
  a.xe = this.jc(b);
  a.z & 16 && this.R(b, 16, Y(a, 16));
  return b
};
y.Kb = ga;
y.Rb = ga;
y.jc = function(a) {
  return a.title
};
y.ve = function(a, b) {
  a && (a.title = b || "")
};
y.l = w("goog-button");
function bg() {
}
G(bg, ag);
B(bg);
y = bg.prototype;
y.na = u();
y.d = function(a) {
  cg(a);
  return a.o().d("button", {"class":this.Ib(a).join(" "), disabled:!a.isEnabled(), title:a.jc() || "", value:a.Kb() || ""}, a.Sc() || "")
};
y.ia = function(a) {
  return"BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
};
y.r = function(a, b) {
  cg(a);
  b.disabled && S(b, this.ic(1));
  return bg.b.r.call(this, a, b)
};
y.Lb = function(a) {
  a.p().c(a.a(), "click", a.sb)
};
y.uc = ga;
y.Qb = ga;
y.Sa = function(a) {
  return a.isEnabled()
};
y.Ya = ga;
y.V = function(a, b, c) {
  bg.b.V.call(this, a, b, c);
  if((a = a.a()) && 1 == b) {
    a.disabled = c
  }
};
y.Kb = function(a) {
  return a.value
};
y.Rb = function(a, b) {
  a && (a.value = b)
};
y.R = ga;
function cg(a) {
  Lf(a, o);
  a.Md &= -256;
  Of(a, 32, o)
}
;function dg(a, b, c) {
  Z.call(this, a, b || bg.L(), c)
}
G(dg, Z);
y = dg.prototype;
y.Kb = v("Ae");
y.Rb = function(a) {
  this.Ae = a;
  this.h.Rb(this.a(), a)
};
y.jc = v("xe");
y.ve = function(a) {
  this.xe = a;
  this.h.ve(this.a(), a)
};
y.f = function() {
  dg.b.f.call(this);
  delete this.Ae;
  delete this.xe
};
y.i = function() {
  dg.b.i.call(this);
  if(this.z & 32) {
    var a = this.B();
    a && this.p().c(a, "keyup", this.wa)
  }
};
y.wa = function(a) {
  return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.sb(a) : 32 == a.keyCode
};
sf("goog-button", function() {
  return new dg(l)
});
function eg(a, b) {
  this.F = o;
  this.nc = a || 1;
  this.vc = b || fg;
  this.Nd = F(this.fh, this);
  this.je = ua()
}
G(eg, Oc);
eg.prototype.enabled = o;
var fg = z.window;
y = eg.prototype;
y.Q = l;
y.setInterval = function(a) {
  this.nc = a;
  this.Q && this.enabled ? (this.stop(), this.start()) : this.Q && this.stop()
};
y.fh = function() {
  if(this.enabled) {
    var a = ua() - this.je;
    0 < a && a < 0.8 * this.nc ? this.Q = this.vc.setTimeout(this.Nd, this.nc - a) : (this.dispatchEvent(gg), this.enabled && (this.Q = this.vc.setTimeout(this.Nd, this.nc), this.je = ua()))
  }
};
y.start = function() {
  this.enabled = k;
  this.Q || (this.Q = this.vc.setTimeout(this.Nd, this.nc), this.je = ua())
};
y.stop = function() {
  this.enabled = o;
  this.Q && (this.vc.clearTimeout(this.Q), this.Q = l)
};
y.f = function() {
  eg.b.f.call(this);
  this.stop();
  delete this.vc
};
var gg = "tick";
var hg, ig;
ig = hg = o;
var jg = Pa();
jg && (-1 != jg.indexOf("Firefox") || -1 != jg.indexOf("Camino") || (-1 != jg.indexOf("iPhone") || -1 != jg.indexOf("iPod") ? hg = k : -1 != jg.indexOf("iPad") && (ig = k)));
var kg = hg, lg = ig;
function mg() {
}
B(mg);
y = mg.prototype;
y.na = u();
function ng(a, b) {
  a && (a.tabIndex = b ? 0 : -1)
}
y.d = function(a) {
  return a.o().d("div", this.Ib(a).join(" "))
};
y.K = function(a) {
  return a
};
y.ia = function(a) {
  return"DIV" == a.tagName
};
y.r = function(a, b) {
  b.id && Cd(a, b.id);
  var c = this.l(), d = o, g = Q(b);
  g && M(g, function(b) {
    b == c ? d = k : b && (b == c + "-disabled" ? a.wb(o) : b == c + "-horizontal" ? og(a, pg) : b == c + "-vertical" && og(a, qg))
  }, this);
  d || S(b, c);
  rg(this, a, this.K(b));
  return b
};
function rg(a, b, c) {
  if(c) {
    for(var d = c.firstChild, g;d && d.parentNode == c;) {
      g = d.nextSibling;
      if(1 == d.nodeType) {
        var f = a.Vd(d);
        f && (f.e = d, b.isEnabled() || f.wb(o), b.Db(f), f.r(d))
      }else {
        (!d.nodeValue || "" == ya(d.nodeValue)) && c.removeChild(d)
      }
      d = g
    }
  }
}
y.Vd = function(a) {
  a: {
    for(var b = Q(a), c = 0, d = b.length;c < d;c++) {
      if(a = b[c] in tf ? tf[b[c]]() : l) {
        break a
      }
    }
    a = l
  }
  return a
};
y.Lb = function(a) {
  a = a.a();
  jd(a, k, I);
  H && (a.hideFocus = k);
  var b = this.na();
  b && a.setAttribute("role", b)
};
y.B = function(a) {
  return a.a()
};
y.l = w("goog-container");
y.Ib = function(a) {
  var b = this.l(), c = [b, a.rb == pg ? b + "-horizontal" : b + "-vertical"];
  a.isEnabled() || c.push(b + "-disabled");
  return c
};
y.hf = function() {
  return qg
};
function sg() {
}
G(sg, mg);
B(sg);
y = sg.prototype;
y.na = w("menu");
y.ia = function(a) {
  return"UL" == a.tagName || sg.b.ia.call(this, a)
};
y.Vd = function(a) {
  return"HR" == a.tagName ? new Sf : sg.b.Vd.call(this, a)
};
y.fb = function(a, b) {
  return Ac(a.a(), b)
};
y.l = w("goog-menu");
y.Lb = function(a) {
  sg.b.Lb.call(this, a);
  a = a.a();
  vf(a, "haspopup", "true")
};
function tg() {
  this.af = []
}
G(tg, wf);
B(tg);
function ug(a, b) {
  var c = a.af[b];
  if(!c) {
    switch(b) {
      case 0:
        c = a.l() + "-highlight";
        break;
      case 1:
        c = a.l() + "-checkbox";
        break;
      case 2:
        c = a.l() + "-content"
    }
    a.af[b] = c
  }
  return c
}
y = tg.prototype;
y.na = w("menuitem");
y.d = function(a) {
  var b = a.o().d("div", this.Ib(a).join(" "), vg(this, a.Da, a.o()));
  wg(this, a, b, !!(a.z & 8) || !!(a.z & 16));
  return b
};
y.K = function(a) {
  return a && a.firstChild
};
y.r = function(a, b) {
  var c = zc(b), d = ug(this, 2);
  c && N(Q(c), d) || b.appendChild(vg(this, b.childNodes, a.o()));
  N(Q(b), "goog-option") && (a.od(k), this.od(a, b, k));
  return tg.b.r.call(this, a, b)
};
function vg(a, b, c) {
  a = ug(a, 2);
  return c.d("div", a, b)
}
y.od = function(a, b, c) {
  b && (b.setAttribute("role", c ? "menuitemcheckbox" : this.na()), wg(this, a, b, c))
};
function wg(a, b, c, d) {
  var g;
  if(g = a.K(c)) {
    g = g.firstChild;
    var f = ug(a, 1);
    g = !!g && N(Q(g), f)
  }else {
    g = o
  }
  d != g && (d ? S(c, "goog-option") : ic(c, "goog-option"), c = a.K(c), d ? (a = ug(a, 1), c.insertBefore(b.o().d("div", a), c.firstChild || l)) : c.removeChild(c.firstChild))
}
y.ic = function(a) {
  switch(a) {
    case 2:
      return ug(this, 0);
    case 16:
    ;
    case 8:
      return"goog-option-selected";
    default:
      return tg.b.ic.call(this, a)
  }
};
y.Xd = function(a) {
  var b = ug(this, 0);
  switch(a) {
    case "goog-option-selected":
      return 16;
    case b:
      return 2;
    default:
      return tg.b.Xd.call(this, a)
  }
};
y.l = w("goog-menuitem");
function xg(a, b, c, d) {
  Z.call(this, a, d || tg.L(), c);
  this.Rb(b)
}
G(xg, Z);
y = xg.prototype;
y.Kb = function() {
  var a = this.me;
  return a != l ? a : this.Sc()
};
y.Rb = aa("me");
y.od = function(a) {
  Of(this, 16, a);
  var b = this.a();
  b && this.h.od(this, b, a)
};
y.Sc = function() {
  var a = this.Da;
  return ia(a) ? (a = zb(a, function(a) {
    var c = Q(a);
    return N(c, "goog-menuitem-accel") || N(c, "goog-menuitem-mnemonic-separator") ? "" : Ic(a)
  }).join(""), xa(a)) : xg.b.Sc.call(this)
};
y.ob = function(a) {
  var b = this.getParent();
  if(b) {
    var c = b.yf;
    b.yf = l;
    if(b = c && ka(a.clientX)) {
      b = new T(a.clientX, a.clientY), b = c == b ? k : !c || !b ? o : c.x == b.x && c.y == b.y
    }
    if(b) {
      return
    }
  }
  xg.b.ob.call(this, a)
};
y.wa = function(a) {
  return a.keyCode == this.uf && this.sb(a) ? k : xg.b.wa.call(this, a)
};
y.vg = v("uf");
sf("goog-menuitem", function() {
  return new xg(l)
});
function Eg(a, b, c) {
  X.call(this, c);
  this.h = b || mg.L();
  this.rb = a || this.h.hf()
}
G(Eg, X);
var pg = "horizontal", qg = "vertical";
y = Eg.prototype;
y.he = l;
y.aa = l;
y.h = l;
y.rb = l;
y.q = k;
y.ib = k;
y.Td = k;
y.G = -1;
y.C = l;
y.Ia = o;
y.lg = o;
y.Xg = k;
y.Ba = l;
y.B = function() {
  return this.he || this.h.B(this)
};
y.Uc = function() {
  return this.aa || (this.aa = new Ff(this.B()))
};
y.d = function() {
  this.e = this.h.d(this)
};
y.K = function() {
  return this.h.K(this.a())
};
y.ia = function(a) {
  return this.h.ia(a)
};
y.u = function(a) {
  this.e = this.h.r(this, a);
  "none" == a.style.display && (this.q = o)
};
y.i = function() {
  Eg.b.i.call(this);
  this.jb(function(a) {
    a.j && Fg(this, a)
  }, this);
  var a = this.a();
  this.h.Lb(this);
  this.qa(this.q, k);
  this.p().c(this, "enter", this.ae).c(this, "highlight", this.be).c(this, "unhighlight", this.fe).c(this, "open", this.Gg).c(this, "close", this.yg).c(a, "mousedown", this.nb).c(V(a), "mouseup", this.Ag).c(a, ["mousedown", "mouseup", "mouseover", "mouseout", "contextmenu"], this.xg);
  this.Sa() && Gg(this, k)
};
function Gg(a, b) {
  var c = a.p(), d = a.B();
  b ? c.c(d, "focus", a.Vc).c(d, "blur", a.mb).c(a.Uc(), "key", a.va) : c.H(d, "focus", a.Vc).H(d, "blur", a.mb).H(a.Uc(), "key", a.va)
}
y.Z = function() {
  Hg(this, -1);
  this.C && this.C.D(o);
  this.Ia = o;
  Eg.b.Z.call(this)
};
y.f = function() {
  Eg.b.f.call(this);
  this.aa && (this.aa.J(), this.aa = l);
  this.h = this.C = this.Ba = this.he = l
};
y.ae = w(k);
y.be = function(a) {
  var b = Jd(this, a.target);
  if(-1 < b && b != this.G) {
    var c = Hd(this, this.G);
    c && c.oa(o);
    this.G = b;
    c = Hd(this, this.G);
    this.Ia && c.setActive(k);
    this.Xg && this.C && c != this.C && (c.z & 64 ? c.D(k) : this.C.D(o))
  }
  vf(this.a(), "activedescendant", a.target.a().id)
};
y.fe = function(a) {
  a.target == Hd(this, this.G) && (this.G = -1);
  vf(this.a(), "activedescendant", "")
};
y.Gg = function(a) {
  if((a = a.target) && a != this.C && a.getParent() == this) {
    this.C && this.C.D(o), this.C = a
  }
};
y.yg = function(a) {
  a.target == this.C && (this.C = l)
};
y.nb = function(a) {
  this.ib && (this.Ia = k);
  var b = this.B();
  b && Fc(b) ? b.focus() : a.preventDefault()
};
y.Ag = function() {
  this.Ia = o
};
y.xg = function(a) {
  var b;
  a: {
    b = a.target;
    if(this.Ba) {
      for(var c = this.a();b && b !== c;) {
        var d = b.id;
        if(d in this.Ba) {
          b = this.Ba[d];
          break a
        }
        b = b.parentNode
      }
    }
    b = l
  }
  if(b) {
    switch(a.type) {
      case "mousedown":
        b.nb(a);
        break;
      case "mouseup":
        b.ob(a);
        break;
      case "mouseover":
        b.ee(a);
        break;
      case "mouseout":
        b.de(a);
        break;
      case "contextmenu":
        b.lc(a)
    }
  }
};
y.Vc = u();
y.mb = function() {
  Hg(this, -1);
  this.Ia = o;
  this.C && this.C.D(o)
};
y.va = function(a) {
  return this.isEnabled() && this.q && (0 != Gd(this) || this.he) && this.wa(a) ? (a.preventDefault(), a.stopPropagation(), k) : o
};
y.wa = function(a) {
  var b = Hd(this, this.G);
  if(b && "function" == typeof b.va && b.va(a) || this.C && this.C != b && "function" == typeof this.C.va && this.C.va(a)) {
    return k
  }
  if(a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) {
    return o
  }
  switch(a.keyCode) {
    case 27:
      if(this.Sa()) {
        this.B().blur()
      }else {
        return o
      }
      break;
    case 36:
      Ig(this);
      break;
    case 35:
      Jg(this);
      break;
    case 38:
      if(this.rb == qg) {
        Kg(this)
      }else {
        return o
      }
      break;
    case 37:
      if(this.rb == pg) {
        Id(this) ? Lg(this) : Kg(this)
      }else {
        return o
      }
      break;
    case 40:
      if(this.rb == qg) {
        Lg(this)
      }else {
        return o
      }
      break;
    case 39:
      if(this.rb == pg) {
        Id(this) ? Kg(this) : Lg(this)
      }else {
        return o
      }
      break;
    default:
      return o
  }
  return k
};
function Fg(a, b) {
  var c = b.a(), c = c.id || (c.id = Bd(b));
  a.Ba || (a.Ba = {});
  a.Ba[c] = b
}
y.Db = function(a, b) {
  Eg.b.Db.call(this, a, b)
};
y.Id = function(a, b, c) {
  a.Ja |= 2;
  a.Ja |= 64;
  (this.Sa() || !this.lg) && Of(a, 32, o);
  Lf(a, o);
  Eg.b.Id.call(this, a, b, c);
  a.j && this.j && Fg(this, a);
  b <= this.G && this.G++
};
y.removeChild = function(a, b) {
  if(a = E(a) ? Ed(this, a) : a) {
    var c = Jd(this, a);
    -1 != c && (c == this.G ? a.oa(o) : c < this.G && this.G--);
    var d = a.a();
    d && d.id && this.Ba && (c = this.Ba, d = d.id, d in c && delete c[d])
  }
  a = Eg.b.removeChild.call(this, a, b);
  Lf(a, k);
  return a
};
function og(a, b) {
  a.a() && e(Error("Component already rendered"));
  a.rb = b
}
y.qa = function(a, b) {
  if(b || this.q != a && this.dispatchEvent(a ? "show" : "hide")) {
    this.q = a;
    var c = this.a();
    c && (hd(c, a), this.Sa() && ng(this.B(), this.ib && this.q), b || this.dispatchEvent(this.q ? "aftershow" : "afterhide"));
    return k
  }
  return o
};
y.isEnabled = v("ib");
y.wb = function(a) {
  if(this.ib != a && this.dispatchEvent(a ? "enable" : "disable")) {
    a ? (this.ib = k, this.jb(function(a) {
      a.Ff ? delete a.Ff : a.wb(k)
    })) : (this.jb(function(a) {
      a.isEnabled() ? a.wb(o) : a.Ff = k
    }), this.Ia = this.ib = o), this.Sa() && ng(this.B(), a && this.q)
  }
};
y.Sa = v("Td");
y.Ya = function(a) {
  a != this.Td && this.j && Gg(this, a);
  this.Td = a;
  this.ib && this.q && ng(this.B(), a)
};
function Hg(a, b) {
  var c = Hd(a, b);
  c ? c.oa(k) : -1 < a.G && Hd(a, a.G).oa(o)
}
y.oa = function(a) {
  Hg(this, Jd(this, a))
};
function Ig(a) {
  Mg(a, function(a, c) {
    return(a + 1) % c
  }, Gd(a) - 1)
}
function Jg(a) {
  Mg(a, function(a, c) {
    a--;
    return 0 > a ? c - 1 : a
  }, 0)
}
function Lg(a) {
  Mg(a, function(a, c) {
    return(a + 1) % c
  }, a.G)
}
function Kg(a) {
  Mg(a, function(a, c) {
    a--;
    return 0 > a ? c - 1 : a
  }, a.G)
}
function Mg(a, b, c) {
  for(var c = 0 > c ? Jd(a, a.C) : c, d = Gd(a), c = b.call(a, c, d), g = 0;g <= d;) {
    var f = Hd(a, c);
    if(f && a.Ye(f)) {
      Hg(a, c);
      break
    }
    g++;
    c = b.call(a, c, d)
  }
}
y.Ye = function(a) {
  return a.q && a.isEnabled() && !!(a.z & 2)
};
function Ng() {
}
G(Ng, wf);
B(Ng);
Ng.prototype.l = w("goog-menuheader");
function Og(a, b, c) {
  Z.call(this, a, c || Ng.L(), b);
  Of(this, 1, o);
  Of(this, 2, o);
  Of(this, 4, o);
  Of(this, 32, o);
  this.Za = 1
}
G(Og, Z);
sf("goog-menuheader", function() {
  return new Og(l)
});
function Pg(a, b) {
  Eg.call(this, qg, b || sg.L(), a);
  this.Ya(o)
}
G(Pg, Eg);
y = Pg.prototype;
y.Ld = k;
y.mg = o;
y.l = function() {
  return this.h.l()
};
y.fb = function(a) {
  if(this.h.fb(this, a)) {
    return k
  }
  for(var b = 0, c = Gd(this);b < c;b++) {
    var d = Hd(this, b);
    if("function" == typeof d.fb && d.fb(a)) {
      return k
    }
  }
  return o
};
y.Ue = function(a) {
  this.Db(a, k)
};
y.qa = function(a, b, c) {
  (b = Pg.b.qa.call(this, a, b)) && a && this.j && this.Ld && this.B().focus();
  this.yf = a && c && ka(c.clientX) ? new T(c.clientX, c.clientY) : l;
  return b
};
y.ae = function(a) {
  this.Ld && this.B().focus();
  return Pg.b.ae.call(this, a)
};
y.Ye = function(a) {
  return(this.mg || a.isEnabled()) && a.q && !!(a.z & 2)
};
y.u = function(a) {
  var b = this.h, c;
  c = this.o();
  c = pc(c.s, "div", b.l() + "-content", a);
  for(var d = c.length, g = 0;g < d;g++) {
    rg(b, this, c[g])
  }
  Pg.b.u.call(this, a)
};
y.wa = function(a) {
  var b = Pg.b.wa.call(this, a);
  b || this.jb(function(c) {
    !b && c.vg && c.uf == a.keyCode && (this.isEnabled() && this.oa(c), b = c.va(a))
  }, this);
  return b
};
function Qg() {
}
G(Qg, ag);
B(Qg);
y = Qg.prototype;
y.d = function(a) {
  var b = {"class":"goog-inline-block " + this.Ib(a).join(" "), title:a.jc() || ""}, b = a.o().d("div", b, this.Qc(a.Da, a.o()));
  this.nd(a, b);
  return b
};
y.na = w("button");
y.nd = function(a, b) {
  a.isEnabled() || this.R(b, 1, k);
  Y(a, 8) && this.R(b, 8, k);
  a.z & 16 && this.R(b, 16, k);
  Y(a, 64) && this.R(b, 64, k)
};
y.K = function(a) {
  return a && a.firstChild.firstChild
};
y.Qc = function(a, b) {
  return b.d("div", "goog-inline-block " + (this.l() + "-outer-box"), b.d("div", "goog-inline-block " + (this.l() + "-inner-box"), a))
};
y.ia = function(a) {
  return"DIV" == a.tagName
};
y.r = function(a, b) {
  Rg(b, k);
  Rg(b, o);
  var c;
  a: {
    c = a.o().jf(b);
    var d = this.l() + "-outer-box";
    if(c && N(Q(c), d) && (c = a.o().jf(c), d = this.l() + "-inner-box", c && N(Q(c), d))) {
      c = k;
      break a
    }
    c = o
  }
  c || b.appendChild(this.Qc(b.childNodes, a.o()));
  S(b, "goog-inline-block", this.l());
  return Qg.b.r.call(this, a, b)
};
y.l = w("goog-custom-button");
function Rg(a, b) {
  if(a) {
    for(var c = b ? a.firstChild : a.lastChild, d;c && c.parentNode == a;) {
      d = b ? c.nextSibling : c.previousSibling;
      if(3 == c.nodeType) {
        var g = c.nodeValue;
        if("" == ya(g)) {
          a.removeChild(c)
        }else {
          c.nodeValue = b ? g.replace(/^[\s\xa0]+/, "") : g.replace(/[\s\xa0]+$/, "");
          break
        }
      }else {
        break
      }
      c = d
    }
  }
}
;function Sg() {
}
G(Sg, Qg);
B(Sg);
y = Sg.prototype;
y.K = function(a) {
  a = Sg.b.K.call(this, a && a.firstChild);
  I && a && a.__goog_wrapper_div && (a = a.firstChild);
  return a
};
y.r = function(a, b) {
  var c = pc(document, "*", "goog-menu", b)[0];
  if(c) {
    hd(c, o);
    V(c).body.appendChild(c);
    var d = new Pg;
    d.r(c);
    Tg(a, d)
  }
  return Sg.b.r.call(this, a, b)
};
y.Qc = function(a, b) {
  return Sg.b.Qc.call(this, [this.createCaption(a, b), b.d("div", "goog-inline-block " + (this.l() + "-dropdown"), "\u00a0")], b)
};
y.createCaption = function(a, b) {
  return b.d("div", "goog-inline-block " + (this.l() + "-caption"), a)
};
y.l = w("goog-menu-button");
function Ug(a, b, c, d) {
  dg.call(this, a, c || Sg.L(), d);
  Of(this, 64, k);
  this.dd = new $f(l, 5);
  b && Tg(this, b);
  this.Lg = l;
  this.Q = new eg(500);
  if((kg || lg) && !K("533.17.9")) {
    this.Yc = k
  }
}
G(Ug, dg);
y = Ug.prototype;
y.Yc = o;
y.bh = o;
y.i = function() {
  Ug.b.i.call(this);
  this.g && Vg(this, this.g, k);
  vf(this.a(), "haspopup", "true")
};
y.Z = function() {
  Ug.b.Z.call(this);
  if(this.g) {
    this.D(o);
    this.g.Z();
    Vg(this, this.g, o);
    var a = this.g.a();
    a && yc(a)
  }
};
y.f = function() {
  Ug.b.f.call(this);
  this.g && (this.g.J(), delete this.g);
  delete this.$g;
  this.Q.J()
};
y.nb = function(a) {
  Ug.b.nb.call(this, a);
  Y(this, 4) && (this.D(!Y(this, 64), a), this.g && (this.g.Ia = Y(this, 64)))
};
y.ob = function(a) {
  Ug.b.ob.call(this, a);
  this.g && !Y(this, 4) && (this.g.Ia = o)
};
y.sb = function() {
  this.setActive(o);
  return k
};
y.zg = function(a) {
  this.g && this.g.q && !this.fb(a.target) && this.D(o)
};
y.fb = function(a) {
  return a && Ac(this.a(), a) || this.g && this.g.fb(a) || o
};
y.wa = function(a) {
  if(32 == a.keyCode) {
    if(a.preventDefault(), "keyup" != a.type) {
      return k
    }
  }else {
    if("key" != a.type) {
      return o
    }
  }
  if(this.g && this.g.q) {
    var b = this.g.va(a);
    return 27 == a.keyCode ? (this.D(o), k) : b
  }
  return 40 == a.keyCode || 38 == a.keyCode || 32 == a.keyCode ? (this.D(k), k) : o
};
y.Eg = function() {
  this.D(o)
};
y.Fg = function() {
  Y(this, 4) || this.D(o)
};
y.mb = function(a) {
  this.Yc || this.D(o);
  Ug.b.mb.call(this, a)
};
function Tg(a, b) {
  var c = a.g;
  b != c && (c && (a.D(o), a.j && Vg(a, c, o), delete a.g), b && (a.g = b, Dd(b, a), b.qa(o), c = a.Yc, (b.Ld = c) && b.Ya(k), a.j && Vg(a, b, k)))
}
y.Ue = function(a) {
  this.g || Tg(this, new Pg(this.o()));
  (this.g || l).Db(a, k)
};
y.qa = function(a, b) {
  var c = Ug.b.qa.call(this, a, b);
  c && !this.q && this.D(o);
  return c
};
y.wb = function(a) {
  Ug.b.wb.call(this, a);
  this.isEnabled() || this.D(o)
};
y.D = function(a, b) {
  Ug.b.D.call(this, a);
  if(this.g && Y(this, 64) == a) {
    if(a) {
      this.g.j || (this.bh ? this.g.rc(this.a().parentNode) : this.g.rc()), this.zb = $c(this.a()), this.eb = gd(this.a()), Wg(this), Hg(this.g, -1)
    }else {
      if(this.setActive(o), this.g.Ia = o, this.a() && vf(this.a(), "activedescendant", ""), this.gd != l) {
        this.gd = h;
        var c = this.g.a();
        c && cd(c, "", "")
      }
    }
    this.g.qa(a, o, b);
    if(!this.F) {
      var c = this.p(), d = a ? c.c : c.H;
      d.call(c, Lc(this.o()), "mousedown", this.zg, k);
      this.Yc && d.call(c, this.g, "blur", this.Fg);
      d.call(c, this.Q, gg, this.Wg);
      a ? this.Q.start() : this.Q.stop()
    }
  }
};
function Wg(a) {
  if(a.g.j) {
    var b = a.dd;
    a.dd.element = a.$g || a.a();
    var c = a.g.a();
    a.g.q || (c.style.visibility = "hidden", hd(c, k));
    !a.gd && a.dd.tg && a.dd.ad & 32 && (a.gd = ed(c));
    b.qe(c, b.Pc ^ 1, a.Lg, a.gd);
    a.g.q || (hd(c, o), c.style.visibility = "visible")
  }
}
y.Wg = function() {
  var a = gd(this.a()), b = $c(this.a());
  if(!(this.eb == a || (!this.eb || !a ? 0 : this.eb.left == a.left && this.eb.width == a.width && this.eb.top == a.top && this.eb.height == a.height)) || !(this.zb == b || (!this.zb || !b ? 0 : this.zb.top == b.top && this.zb.right == b.right && this.zb.bottom == b.bottom && this.zb.left == b.left))) {
    this.eb = a, this.zb = b, Wg(this)
  }
};
function Vg(a, b, c) {
  var d = a.p(), c = c ? d.c : d.H;
  c.call(d, b, "action", a.Eg);
  c.call(d, b, "highlight", a.be);
  c.call(d, b, "unhighlight", a.fe)
}
y.be = function(a) {
  vf(this.a(), "activedescendant", a.target.a().id)
};
y.fe = function() {
  Hd(this.g, this.g.G) || vf(this.a(), "activedescendant", "")
};
sf("goog-menu-button", function() {
  return new Ug(l)
});
function Xg(a, b) {
  Pg.call(this, a, b)
}
G(Xg, Pg);
function Yg(a) {
  var b = new Xg, c = lb(zd);
  M(a, function(a) {
    a.M || e(new Exeption("submenu info does not have callback"));
    var g;
    a.label ? (g = new xg(a.label), Cd(g, a.label)) : g = new Tf;
    g.Ja |= 255;
    b.p().c(g, c, function(b) {
      "action" == b.type && a.M()
    });
    b.Ue(g)
  });
  return b
}
;function Zg() {
}
G(Zg, mg);
B(Zg);
Zg.prototype.na = w("menubar");
Zg.prototype.l = w("goog-menubar");
Zg.prototype.hf = function() {
  return pg
};
function De() {
  var a = new Eg(l, Zg.L(), h);
  M([], function(b) {
    b.label || e(new Exeption("menu info does not have label"));
    b.eh || e(new Exeption("menu info does not have submenu"));
    var c = Yg(b.eh), b = new Ug(b.label, c);
    b.Ja |= 255;
    a.Db(b, k)
  });
  return a
}
;function $g(a) {
  this.F = o;
  this.Bb = a
}
G($g, Oc);
$g.prototype.Bb = {};
$g.prototype.set = function(a, b, c) {
  a in this.Bb || e(Error("'" + a + "' does not match attrs."));
  var d = this.Bb[a];
  this.Bb[a] = b;
  if(c) {
    return k
  }
  this.dispatchEvent(new O("model_change", {Mc:a, vi:d, Kd:b, Mg:this}));
  return k
};
$g.prototype.get = function(a) {
  a in this.Bb || e(Error("'" + a + "' does not match attrs."));
  return this.Bb[a]
};
$g.prototype.ka = function(a) {
  return a == this
};
H || I && K("1.9.3");
/*
 Portions of this code are from MochiKit, received by The Closure
 Library Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Library Authors. All Rights Reserved.
*/
function Be(a, b, c, d, g, f) {
  Pd.call(this, g, f);
  this.sf = a;
  this.Rd = [];
  this.ef = !!b;
  this.rg = !!c;
  this.og = !!d;
  for(b = 0;b < a.length;b++) {
    Vd(a[b], F(this.lf, this, b, k), F(this.lf, this, b, o))
  }
  0 == a.length && !this.ef && this.M(this.Rd)
}
G(Be, Pd);
Be.prototype.wf = 0;
Be.prototype.lf = function(a, b, c) {
  this.wf++;
  this.Rd[a] = [b, c];
  this.ta || (this.ef && b ? this.M([a, c]) : this.rg && !b ? this.hc(c) : this.wf == this.sf.length && this.M(this.Rd));
  this.og && !b && (c = l);
  return c
};
Be.prototype.hc = function(a) {
  Be.b.hc.call(this, a);
  M(this.sf, function(a) {
    a.cancel()
  })
};
/*
 Portions of this code are from MochiKit, received by The Closure
 Library Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Library Authors. All Rights Reserved.
*/
function ah(a) {
  this.Gd = a;
  this.xd = [];
  new Float32Array(0)
}
te("synthjs.audiocore.DynamicGenerator").pd(pe);
ah.prototype.Ud = function(a) {
  this.Na || e(Error("Generator can't create buffer without setting sampleRate"));
  var b = this.Gd.Ud(a);
  b.name = "wave";
  M(this.xd, function(a) {
    a = a.Ai();
    a.name = "filter";
    $d(b, a)
  });
  return b
};
function bh(a, b) {
  a.Na = b;
  for(i = 0;i < a.xd.length;i++) {
    rt = bh(a.xd[i], b)
  }
}
ah.prototype.Hb = w(o);
function ch(a) {
  this.Qf = a || U();
  this.Ke = this.F = o
}
G(ch, gf);
y = ch.prototype;
y.r = function(a) {
  this.Cb = a;
  this.u(a);
  this.Ke || this.i();
  this.Ke = k
};
y.ua = function() {
  return this.Cb || o
};
y.u = u();
y.i = u();
y.o = v("Qf");
function dh(a, b, c, d, g, f) {
  6 == arguments.length ? this.setTransform(a, b, c, d, g, f) : (0 != arguments.length && e(Error("Insufficient matrix parameters")), this.ba = this.ea = 1, this.U = this.ca = this.da = this.fa = 0)
}
y = dh.prototype;
y.I = function() {
  return new dh(this.ba, this.U, this.ca, this.ea, this.da, this.fa)
};
y.setTransform = function(a, b, c, d, g, f) {
  (!ka(a) || !ka(b) || !ka(c) || !ka(d) || !ka(g) || !ka(f)) && e(Error("Invalid transform parameters"));
  this.ba = a;
  this.U = b;
  this.ca = c;
  this.ea = d;
  this.da = g;
  this.fa = f;
  return this
};
y.scale = function(a, b) {
  this.ba *= a;
  this.U *= a;
  this.ca *= b;
  this.ea *= b;
  return this
};
y.translate = function(a, b) {
  this.da += a * this.ba + b * this.ca;
  this.fa += a * this.U + b * this.ea;
  return this
};
y.rotate = function(a, b, c) {
  a = eh(a, b, c);
  b = this.ba;
  c = this.ca;
  this.ba = a.ba * b + a.U * c;
  this.ca = a.ca * b + a.ea * c;
  this.da += a.da * b + a.fa * c;
  b = this.U;
  c = this.ea;
  this.U = a.ba * b + a.U * c;
  this.ea = a.ca * b + a.ea * c;
  this.fa += a.da * b + a.fa * c;
  return this
};
y.toString = function() {
  return"matrix(" + [this.ba, this.U, this.ca, this.ea, this.da, this.fa].join() + ")"
};
function eh(a, b, c) {
  var d = new dh, g = Math.cos(a), a = Math.sin(a);
  return d.setTransform(g, a, -a, g, b - b * g + c * a, c - b * a - c * g)
}
y.ka = function(a) {
  return this == a ? k : !a ? o : this.ba == a.ba && this.ca == a.ca && this.da == a.da && this.U == a.U && this.ea == a.ea && this.fa == a.fa
};
function fh(a, b) {
  this.F = o;
  this.e = a;
  this.kf = b;
  this.Pd = o
}
G(fh, Oc);
y = fh.prototype;
y.kf = l;
y.e = l;
y.ye = l;
y.a = v("e");
y.ua = v("kf");
y.addEventListener = function(a, b, c, d) {
  Xb(this.e, a, b, c, d)
};
y.removeEventListener = function(a, b, c, d) {
  $b(this.e, a, b, c, d)
};
y.f = function() {
  fh.b.f.call(this);
  dc(this.e)
};
function gh(a, b) {
  fh.call(this, a, b)
}
G(gh, fh);
function hh(a, b) {
  fh.call(this, a, b)
}
G(hh, fh);
function ih(a, b) {
  fh.call(this, a, b)
}
G(ih, gh);
ih.prototype.pa = function(a, b) {
  jh(this.a(), {width:a, height:b})
};
function kh(a, b) {
  fh.call(this, a, b)
}
G(kh, hh);
kh.prototype.pa = function(a, b) {
  jh(this.a(), {width:a, height:b})
};
kh.prototype.qd = function(a) {
  jh(this.a(), {"xlink:href":a})
};
function lh(a, b, c, d, g) {
  X.call(this, g);
  this.width = a;
  this.height = b;
  this.ja = c || l;
  this.dc = d || l
}
G(lh, X);
y = lh.prototype;
y.A = l;
y.Qa = 0;
y.hb = 0;
y.gf = function() {
  return this.ja ? new P(this.ja, this.dc) : this.T()
};
y.Wd = function() {
  return this.T()
};
y.T = function() {
  return this.j ? ed(this.a()) : ka(this.width) && ka(this.height) ? new P(this.width, this.height) : l
};
y.wg = function() {
  var a = this.T();
  return a ? a.width / this.gf().width : 0
};
function mh(a, b, c, d, g) {
  lh.call(this, a, b, c, d, g);
  this.pg = {};
  this.ze = J && !K(526);
  this.pb = new W(this)
}
var nh;
G(mh, lh);
function oh(a, b, c) {
  a = a.O.s.createElementNS("http://www.w3.org/2000/svg", b);
  c && jh(a, c);
  return a
}
function jh(a, b) {
  for(var c in b) {
    a.setAttribute(c, b[c])
  }
}
y = mh.prototype;
y.Lc = function(a, b) {
  (b || this.A).a().appendChild(a.a())
};
y.re = function(a, b, c, d, g, f) {
  a.a().setAttribute("transform", "translate(" + b + "," + c + ") rotate(" + d + " " + g + " " + f + ")")
};
y.d = function() {
  var a = oh(this, "svg", {width:this.width, height:this.height, overflow:"hidden"}), b = oh(this, "g");
  this.bf = oh(this, "defs");
  this.A = new ih(b, this);
  a.appendChild(this.bf);
  a.appendChild(b);
  this.e = a;
  if(this.ja || this.Qa || this.hb) {
    this.a().setAttribute("preserveAspectRatio", "none"), this.ze ? this.rd() : this.a().setAttribute("viewBox", this.Qa + " " + this.hb + " " + (this.ja ? this.ja + " " + this.dc : ""))
  }
};
y.rd = function() {
  if(this.j && (this.ja || this.Qa || !this.hb)) {
    var a = this.T();
    if(0 == a.width) {
      this.a().style.visibility = "hidden"
    }else {
      this.a().style.visibility = "";
      var b = -this.Qa, c = -this.hb, d = a.width / this.ja, a = a.height / this.dc;
      this.A.a().setAttribute("transform", "scale(" + d + " " + a + ") translate(" + b + " " + c + ")")
    }
  }
};
y.pa = function(a, b) {
  cd(this.a(), a, b)
};
y.T = function() {
  if(!I) {
    return this.j ? ed(this.a()) : mh.b.T.call(this)
  }
  var a = this.width, b = this.height, c = E(a) && -1 != a.indexOf("%"), d = E(b) && -1 != b.indexOf("%");
  if(!this.j && (c || d)) {
    return l
  }
  var g, f;
  c && (g = this.a().parentNode, f = ed(g), a = parseFloat(a) * f.width / 100);
  d && (g = g || this.a().parentNode, f = f || ed(g), b = parseFloat(b) * f.height / 100);
  return new P(a, b)
};
y.drawImage = function(a, b, c, d, g, f) {
  a = oh(this, "image", {x:a, y:b, width:c, height:d, "image-rendering":"optimizeQuality", preserveAspectRatio:"none"});
  a.setAttributeNS("http://www.w3.org/1999/xlink", "href", g);
  g = new kh(a, this);
  this.Lc(g, f);
  return g
};
y.ec = function(a) {
  var b = oh(this, "g");
  (a || this.A).a().appendChild(b);
  return new ih(b, this)
};
y.i = function() {
  var a = this.T();
  mh.b.i.call(this);
  a || this.dispatchEvent("resize");
  if(this.ze) {
    var a = this.width, b = this.height;
    "string" == typeof a && -1 != a.indexOf("%") && "string" == typeof b && -1 != b.indexOf("%") && this.pb.c(ph(), gg, this.rd);
    this.rd()
  }
};
y.Z = function() {
  mh.b.Z.call(this);
  this.ze && this.pb.H(ph(), gg, this.rd)
};
y.f = function() {
  delete this.pg;
  delete this.bf;
  delete this.A;
  mh.b.f.call(this)
};
function ph() {
  nh || (nh = new eg(400), nh.start());
  return nh
}
;function qh() {
  return this.e = this.ua().O.a(this.Ga) || this.e
}
function rh(a, b) {
  this.Ga = a.id;
  fh.call(this, a, b)
}
G(rh, gh);
rh.prototype.a = qh;
rh.prototype.pa = function(a, b) {
  var c = this.a(), d = c.style;
  d.width = $(a) + "px";
  d.height = $(b) + "px";
  c.coordsize = $(a) + " " + $(b);
  this.ua().A != this && (c.coordorigin = "0 0")
};
function sh(a, b) {
  this.Ga = a.id;
  fh.call(this, a, b)
}
G(sh, hh);
sh.prototype.a = qh;
sh.prototype.pa = function(a, b) {
  var c = this.a().style;
  c.width = th(a);
  c.height = th(b)
};
sh.prototype.qd = function(a) {
  var b = this.a();
  uh ? b.src = a : b.setAttribute("src", a)
};
function vh(a, b, c, d, g) {
  lh.call(this, a, b, c, d, g);
  this.pb = new W(this)
}
G(vh, lh);
var uh = document.documentMode && 8 <= document.documentMode;
function th(a) {
  return Math.round(100 * (parseFloat(a.toString()) - 0.5)) + "px"
}
function $(a) {
  return Math.round(100 * parseFloat(a.toString()))
}
function wh(a, b) {
  var c = a.O.createElement("g_vml_:" + b);
  c.id = "goog_" + Fa++;
  return c
}
function xh(a) {
  uh && a.j && (a.a().innerHTML = a.a().innerHTML)
}
vh.prototype.Lc = function(a, b) {
  (b || this.A).a().appendChild(a.a());
  xh(this)
};
vh.prototype.re = function(a, b, c, d, g, f) {
  a = a.a();
  a.style.left = th(b);
  a.style.top = th(c);
  if(d || a.rotation) {
    a.rotation = d, a.coordsize = $(2 * g) + " " + $(2 * f)
  }
};
function yh(a, b, c, d, g) {
  var f = a.style;
  f.position = "absolute";
  f.left = th(b);
  f.top = th(c);
  f.width = $(d) + "px";
  f.height = $(g) + "px";
  "shape" == a.tagName && (a.coordsize = $(d) + " " + $(g))
}
try {
  eval("document.namespaces")
}catch(zh) {
}
y = vh.prototype;
y.d = function() {
  var a = this.O.s;
  a.namespaces.g_vml_ || (uh ? a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML") : a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml"), a.createStyleSheet().cssText = "g_vml_\\:*{behavior:url(#default#VML)}");
  var a = this.width, b = this.height, c = this.O.d("div", {style:"overflow:hidden;position:relative;width:" + (E(a) && va(a) ? a : parseFloat(a.toString()) + "px") + ";height:" + (E(b) && va(b) ? b : parseFloat(b.toString()) + "px")});
  this.e = c;
  var d = wh(this, "group"), g = d.style;
  g.position = "absolute";
  g.left = g.top = 0;
  g.width = this.width;
  g.height = this.height;
  d.coordsize = this.ja ? $(this.ja) + " " + $(this.dc) : $(a) + " " + $(b);
  d.coordorigin = ca(this.Qa) ? $(this.Qa) + " " + $(this.hb) : "0 0";
  c.appendChild(d);
  this.A = new rh(d, this);
  Xb(c, "resize", F(this.$d, this))
};
y.$d = function() {
  var a = ed(this.a()), b = this.A.a().style;
  if(a.width) {
    b.width = a.width + "px", b.height = a.height + "px"
  }else {
    for(a = this.a();a && a.currentStyle && "none" != a.currentStyle.display;) {
      a = a.parentNode
    }
    a && a.currentStyle && this.pb.c(a, "propertychange", this.$d)
  }
  this.dispatchEvent("resize")
};
y.pa = function(a, b) {
  cd(this.a(), a, b)
};
y.T = function() {
  var a = this.a();
  return new P(a.style.pixelWidth || a.offsetWidth || 1, a.style.pixelHeight || a.offsetHeight || 1)
};
y.drawImage = function(a, b, c, d, g, f) {
  var j = wh(this, "image");
  yh(j, a, b, c, d);
  uh ? j.src = g : j.setAttribute("src", g);
  a = new sh(j, this);
  this.Lc(a, f);
  return a
};
y.ec = function(a) {
  var b = wh(this, "group"), c = this.gf();
  yh(b, 0, 0, c.width, c.height);
  (a || this.A).a().appendChild(b);
  return new rh(b, this)
};
y.i = function() {
  vh.b.i.call(this);
  this.$d();
  xh(this)
};
y.f = function() {
  this.A = l;
  vh.b.f.call(this)
};
function Ah(a) {
  fh.call(this, l, a);
  this.t = []
}
G(Ah, gh);
Ah.prototype.pa = u();
Ah.prototype.appendChild = function(a) {
  this.t.push(a)
};
Ah.prototype.fc = function() {
  for(var a = 0, b = this.t.length;a < b;a++) {
    Bh(this.ua(), this.t[a])
  }
};
function Ch(a, b, c, d, g, f, j) {
  fh.call(this, a, b);
  this.hh = c;
  this.ih = d;
  this.Ce = g;
  this.Zd = f;
  this.Cf = j
}
G(Ch, hh);
y = Ch.prototype;
y.Sd = o;
y.pa = function(a, b) {
  this.Ce = a;
  this.Zd = b;
  this.Sd && this.ua().Pb()
};
y.qd = function(a) {
  this.Cf = a;
  this.Sd && this.ua().Pb()
};
y.fc = function(a) {
  this.of ? (this.Ce && this.Zd && a.drawImage(this.of, this.hh, this.ih, this.Ce, this.Zd), this.Sd = k) : (a = new Image, a.onload = F(this.Bg, this, a), a.src = this.Cf)
};
y.Bg = function(a) {
  this.of = a;
  this.ua().Pb()
};
function Dh(a, b, c, d, g) {
  lh.call(this, a, b, c, d, g)
}
G(Dh, lh);
y = Dh.prototype;
y.re = function() {
  this.Pb()
};
function Eh(a, b) {
  var c = a.getContext();
  c.save();
  var d = b.ye ? b.ye.I() : new dh, g = d.da, f = d.fa;
  (g || f) && c.translate(g, f);
  (d = d.U) && c.rotate(Math.asin(d))
}
y.d = function() {
  var a = this.O.d("div", {style:"position:relative;overflow:hidden"});
  this.e = a;
  this.bc = this.O.d("canvas");
  a.appendChild(this.bc);
  this.ie = this.A = new Ah(this);
  this.ah = 0;
  Fh(this)
};
y.getContext = function() {
  this.a() || this.d();
  this.Fb || (this.Fb = this.bc.getContext("2d"), this.Fb.save());
  return this.Fb
};
y.pa = function(a, b) {
  this.width = a;
  this.height = b;
  Fh(this);
  this.Pb()
};
y.T = function() {
  var a = this.width, b = this.height, c = E(a) && -1 != a.indexOf("%"), d = E(b) && -1 != b.indexOf("%");
  if(!this.j && (c || d)) {
    return l
  }
  var g, f;
  c && (g = this.a().parentNode, f = ed(g), a = parseFloat(a) * f.width / 100);
  d && (g = g || this.a().parentNode, f = f || ed(g), b = parseFloat(b) * f.height / 100);
  return new P(a, b)
};
function Fh(a) {
  cd(a.a(), a.width, a.height);
  var b = a.T();
  b && (cd(a.bc, b.width, b.height), a.bc.width = b.width, a.bc.height = b.height, a.Fb = l)
}
y.reset = function() {
  var a = this.getContext();
  a.restore();
  var b = this.T();
  b.width && b.height && a.clearRect(0, 0, b.width, b.height);
  a.save()
};
y.Pb = function() {
  if(!this.Ji && this.j) {
    this.reset();
    if(this.ja) {
      var a = this.T();
      this.getContext().scale(a.width / this.ja, a.height / this.dc)
    }
    (this.Qa || this.hb) && this.getContext().translate(-this.Qa, -this.hb);
    Eh(this, this.A);
    this.A.fc(this.Fb);
    this.getContext().restore()
  }
};
function Bh(a, b) {
  var c = a.getContext();
  Eh(a, b);
  if(!b.zi || !b.Bi) {
    b.fc(c)
  }else {
    var d = b.fill;
    if(d) {
      var g = c.createLinearGradient(d.Di(), d.Fi(), d.Ei(), d.Gi());
      g.addColorStop(0, d.xi());
      g.addColorStop(1, d.yi());
      c.fillStyle = g;
      b.fc(c);
      c.fill()
    }
    if(d = b.Li) {
      b.fc(c), c.strokeStyle = d.wi(), d = d.Ci(), E(d) && -1 != d.indexOf("px") && (d = parseFloat(d) / a.wg()), c.lineWidth = d, c.stroke()
    }
  }
  a.getContext().restore()
}
y.Lc = function(a, b) {
  this.append(a, b)
};
y.append = function(a, b) {
  b = b || this.A;
  b.appendChild(a);
  this.j && !this.ah && !(b != this.A && b != this.ie) && Bh(this, a)
};
y.drawImage = function(a, b, c, d, g, f) {
  a = new Ch(l, this, a, b, c, d, g);
  this.append(a, f);
  return a
};
y.ec = function(a) {
  var b = new Ah(this), a = a || this.A;
  if(a == this.A || a == this.ie) {
    this.ie = b
  }
  this.append(b, a);
  return b
};
y.f = function() {
  this.Fb = l;
  Dh.b.f.call(this)
};
y.i = function() {
  var a = this.T();
  Dh.b.i.call(this);
  a || (Fh(this), this.dispatchEvent("resize"));
  this.Pb()
};
function Gh(a, b) {
  var c;
  c = H && !K("9") ? new vh(a, b, h, h, h) : J && (!K("420") || Va) ? new Dh(a, b, h, h, h) : new mh(a, b, h, h, h);
  c.d();
  return c
}
;function Hh(a, b, c) {
  ch.call(this, c);
  this.k = a
}
G(Hh, ch);
y = Hh.prototype;
y.u = function(a) {
  Hh.b.u.call(this, a);
  var b = this.k.get("width"), c = this.k.get("height"), d = this.k.get("offsetX"), g = this.k.get("offsetY"), f = this.k.get("value"), j = this.k.get("imagepathOn"), m = this.k.get("imagepathOff"), f = f ? j : m;
  this.Cc = j;
  this.Bc = m;
  this.ag = d - b / 2;
  this.bg = g - c / 2;
  this.Hc = b;
  this.Ac = c;
  a.ec().pa(b + "px", c + "px");
  this.xc(f)
};
y.i = function() {
  Hh.b.i.call(this);
  this.Oa(this.k.get("value"));
  this.p().c(this.k, "model_change", this.Zb)
};
y.xc = function(a) {
  this.Ka ? (this.Ka.qd(a), this.Ka instanceof kh && jh(this.Ka.a(), {href:a})) : (this.Ka = this.ua().drawImage(this.ag, this.bg, this.Hc, this.Ac, a), this.p().c(this.Ka, "click", this.Bd))
};
y.Oa = function(a) {
  this.xc(a ? this.Cc : this.Bc)
};
y.Zb = function(a) {
  this.Oa(a.target.Kd)
};
y.Bd = function() {
  this.k.set("value", this.k.get("value") ? 0 : 1)
};
function Ih(a, b, c) {
  ch.call(this, c);
  this.k = a
}
G(Ih, ch);
y = Ih.prototype;
y.u = function(a) {
  Ih.b.u.call(this, a);
  var b = this.k.get("width"), c = this.k.get("height"), d = this.k.get("offsetX"), g = this.k.get("offsetY"), f = this.k.get("imagepath");
  this.k.get("value");
  this.Nf = d;
  this.Of = g;
  a.ec().pa(b + "px", c + "px");
  this.Ka = a.drawImage(d - b / 2, g - c / 2, b, c, f)
};
y.i = function() {
  Ih.b.i.call(this);
  this.Oa(this.k.get("value"));
  this.p().c(this.Ka, "mousedown", this.cg).c(this.k, "model_change", this.Zb)
};
y.Oa = function(a) {
  var b = this.Ka, a = 270 * (a - 0.5), c = this.Nf, d = this.Of;
  b.ye = eh(a * Math.PI / 180, c, d).translate(0, 0);
  b.ua().re(b, 0, 0, a, c, d)
};
y.Zb = function(a) {
  this.Oa(a.target.Kd)
};
y.cg = function(a) {
  this.p().c(Lc(this.o()), "mouseup", this.Qe).c(Lc(this.o()), "mousemove", this.Pe);
  this.Fe = a.clientY
};
y.Pe = function(a) {
  var b = a.clientY;
  this.k.set("value", this.k.get("value") + (this.Fe - b) * (a.ctrlKey ? 3.0E-4 : 0.0030));
  this.Fe = b;
  a.stopPropagation()
};
y.Qe = function() {
  this.p().H(Lc(this.o()), "mousemove", this.Pe).H(Lc(this.o()), "mouseup", this.Qe)
};
function Jh(a, b, c) {
  ch.call(this, c);
  this.k = a
}
G(Jh, ch);
y = Jh.prototype;
y.u = function(a) {
  Jh.b.u.call(this, a);
  var b = this.k.get("width"), c = this.k.get("height"), d = this.k.get("offsets");
  this.k.get("value");
  var g = this.k.get("imagepathOn"), f = this.k.get("imagepathOff");
  this.Cc = g;
  this.Bc = f;
  this.$f = zb(d, function(a) {
    return{offsetX:a.offsetX - b / 2, offsetY:a.offsetY - c / 2}
  });
  this.Hc = b;
  this.Ac = c;
  a.ec().pa(b + "px", c + "px");
  this.xc()
};
y.i = function() {
  Jh.b.i.call(this);
  this.Oa(this.k.get("value"));
  this.p().c(this.k, "model_change", this.Zb)
};
y.xc = function() {
  this.yc ? M(this.yc, function(a, b) {
    var c = this.k.get("value") == b ? this.Cc : this.Bc;
    a.qd(c);
    a instanceof kh && jh(a.a(), {href:c})
  }, this) : (this.yc = [], M(this.$f, function(a, b) {
    var c = this.k.get("value") == b ? this.Cc : this.Bc, c = this.ua().drawImage(a.offsetX, a.offsetY, this.Hc, this.Ac, c);
    this.p().c(c, "click", this.Bd);
    this.yc.push(c)
  }, this))
};
y.Oa = function() {
  this.xc()
};
y.Zb = function() {
  this.Oa()
};
y.Bd = function(a) {
  this.k.set("value", Db(this.yc, function(b) {
    return b == a.currentTarget
  }))
};
function Kh(a, b, c, d, g) {
  this.Mf = b;
  this.wd = c;
  this.Ee = d;
  this.eg = a;
  this.Pf = [];
  X.call(this, g)
}
G(Kh, X);
Kh.prototype.u = function(a) {
  Kh.b.u.call(this, a);
  var b = this.o();
  this.Jc = b.d("div", "plugin-controlpanel-wrapper");
  this.Cb = Gh(this.wd, this.Ee);
  this.Cb.drawImage(0, 0, this.wd, this.Ee, this.Mf);
  Tc(this.Jc, {marginTop:"100px", width:this.Hc + "px", height:this.Ac + "px"});
  M(this.eg.getAll(), function(a) {
    if(a instanceof Lh) {
      var b = new Ih(a)
    }else {
      a instanceof Mh ? b = new Hh(a) : a instanceof Nh && (b = new Jh(a))
    }
    b.r(this.Cb);
    this.Pf.push(b)
  }, this);
  b.appendChild(a, this.Jc);
  this.Cb.rc(this.Jc)
};
Kh.prototype.i = function() {
  var a = lb(Kb);
  this.p().c(this.Cb.a(), a, function(a) {
    a.preventDefault()
  })
};
Kh.prototype.kd = function() {
  var a = od(this.a());
  this.o();
  Tc(this.Jc, {marginLeft:(a.width - this.wd) / 2 + "px"})
};
function Nh(a, b, c, d, g, f, j) {
  $g.call(this, {name:a, value:b, width:c, height:d, offsets:g, imagepathOn:f, imagepathOff:j})
}
G(Nh, $g);
Nh.prototype.set = function(a, b) {
  "value" == a && (b %= this.get("offsets").length);
  Nh.b.set.call(this, a, b)
};
function Lh(a, b, c, d, g, f, j) {
  $g.call(this, {name:a, value:b, width:c, height:d, offsetX:g, offsetY:f, imagepath:j})
}
G(Lh, $g);
Lh.prototype.set = function(a, b) {
  "value" == a && (b = Math.max(0, b), b = Math.min(1, b));
  Lh.b.set.call(this, a, b)
};
function Oh(a) {
  this.F = o;
  this.Zf = a;
  this.Fc = []
}
G(Oh, gf);
Oh.prototype.add = function(a) {
  var b;
  a instanceof this.Zf || e(Error("Collection was added invalid instance."));
  this.Fc.push([a, b ? b : l]);
  this.dispatchEvent(new O(Ph, a))
};
Oh.prototype.remove = function(a) {
  return Qh(this, a)
};
function Qh(a, b) {
  return Fb(a.Fc, function(a) {
    return b.ka(a[0])
  }) ? (a.dispatchEvent(new O(Rh, b)), k) : o
}
Oh.prototype.reset = function() {
  this.Fc = [];
  this.dispatchEvent(new O(Sh))
};
Oh.prototype.getAll = function() {
  return zb(this.Fc, function(a) {
    return a[0]
  })
};
var Ph = "collection-add", Rh = "collection-remove", Sh = "collection-reset";
function Mh(a, b, c, d, g, f, j, m) {
  $g.call(this, {name:a, value:b ? 1 : 0, width:c, height:d, offsetX:g, offsetY:f, imagepathOn:j, imagepathOff:m})
}
G(Mh, $g);
Mh.prototype.set = function(a, b) {
  "value" == a && (b = b ? 1 : 0);
  Mh.b.set.call(this, a, b)
};
function Th(a) {
  this.F = o;
  this.$a = a
}
G(Th, gf);
y = Th.prototype;
y.qb = function() {
  this.vd = ve.L();
  this.Gc = new jf(this.$a.toString(), {md:48E3});
  this.zc = new ah(this.Gc);
  var a = this.vd, b = this.zc;
  bh(b, a.Na);
  var c = a.Rf++;
  a.Xb[c] = b;
  this.vd.play();
  this.sa = new bf(af(-4), af(4), Xe.L());
  this.p().c(this.sa, ef, this.Oe, o, this).c(this.sa, df, this.Ne, o, this).c(this.Gc, kf, this.Wb, o, this).c(this.Gc, mf, this.Uf, o, this)
};
y.kc = v("dg");
y.f = function() {
  alert("dispose");
  X.b.f.call(this)
};
y.Oe = function(a) {
  nf(this.zc.Gd, new pf(qf, {N:a.N, Be:1})).M()
};
y.Ne = function(a) {
  nf(this.zc.Gd, new pf(rf, {N:a.N, Be:1})).M()
};
y.Wb = function(a) {
  console.log(a.error.filename);
  we(this.vd, this.zc);
  this.p().H(this.sa, ef, this.Oe).H(this.sa, df, this.Ne);
  this.dispatchEvent(a)
};
y.Uf = function(a) {
  var b = new Oh($g);
  if(a = a.target.controller) {
    if(!ca(a.background)) {
      alert("Plugin did not send 'background'");
      return
    }
    if(!ia(a.controls)) {
      alert("Plugin did not send 'background'");
      return
    }
    var c = k;
    M(a.controls, function(a) {
      if(!E(a.name) || !ka(a.value)) {
        c = o
      }else {
        switch(a.type) {
          case "control":
            a = new Lh(a.name, a.value, a.width, a.height, a.offsetX, a.offsetY, Re(this.$a, new Ge(a.image)).toString());
            break;
          case "toggle":
            a = new Mh(a.name, a.value, a.width, a.height, a.offsetX, a.offsetY, Re(this.$a, new Ge(a.imageOn)).toString(), Re(this.$a, new Ge(a.imageOff)).toString());
            break;
          case "radio":
            a = new Nh(a.name, a.value, a.width, a.height, a.offsets, Re(this.$a, new Ge(a.imageOn)).toString(), Re(this.$a, new Ge(a.imageOff)).toString());
            break;
          default:
            e(Error("invalid param"))
        }
        b.add(a)
      }
    }, this);
    if(c) {
      M(b.getAll(), function(a) {
        this.p().c(a, "model_change", this.hg)
      }, this)
    }else {
      alert("Plugin init parameter is invalid.;");
      return
    }
    this.za = new Kh(b, Re(this.$a, new Ge(a.background.image)).toString(), a.background.width, a.background.height)
  }
  this.dg = this.za ? new ff(this.sa, this.za) : new ff(this.sa);
  this.dispatchEvent(new O(Uh))
};
y.hg = function(a) {
  of(this.Gc, a.target.Mg.get("name"), a.target.Kd).M()
};
var Uh = "oscillator-init";
/*
 Portions of this code are from the Dojo Toolkit, received by
 The Closure Library Authors under the BSD license. All other code is
 Copyright 2005-2009 The Closure Library Authors. All Rights Reserved.

 The "New" BSD License:

 Copyright (c) 2005-2009, The Dojo Foundation
 All rights reserved.

 Redistribution and use in source and binary forms, with or without
 modification, are permitted provided that the following conditions are met:

 Redistributions of source code must retain the above copyright notice, this
 list of conditions and the following disclaimer.
 Redistributions in binary form must reproduce the above copyright notice,
 this list of conditions and the following disclaimer in the documentation
 and/or other materials provided with the distribution.
 Neither the name of the Dojo Foundation nor the names of its contributors
 may be used to endorse or promote products derived from this software
 without specific prior written permission.

 THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 DISCLAIMED.  IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
var Vh = function() {
  function a(a, c) {
    if(!a) {
      return[]
    }
    if(a.constructor == Array) {
      return a
    }
    if(!E(a)) {
      return[a]
    }
    if(E(c) && (c = E(c) ? document.getElementById(c) : c, !c)) {
      return[]
    }
    var c = c || document, f = c.ownerDocument || c.documentElement;
    Pb = c.contentType && "application/xml" == c.contentType || Ua && (c.doctype || "[object XMLDocument]" == f.toString()) || !!f && (H ? f.xml : c.xmlVersion || f.xmlVersion);
    return(f = d(a)(c)) && f.ed ? f : b(f)
  }
  function b(a) {
    if(a && a.ed) {
      return a
    }
    var b = [];
    if(!a || !a.length) {
      return b
    }
    a[0] && b.push(a[0]);
    if(2 > a.length) {
      return b
    }
    Sa++;
    if(H && Pb) {
      var c = Sa + "";
      a[0].setAttribute("_zipIdx", c);
      for(var d = 1, f;f = a[d];d++) {
        a[d].getAttribute("_zipIdx") != c && b.push(f), f.setAttribute("_zipIdx", c)
      }
    }else {
      if(H && a.ng) {
        try {
          for(d = 1;f = a[d];d++) {
            Oa(f) && b.push(f)
          }
        }catch(g) {
        }
      }else {
        a[0] && (a[0]._zipIdx = Sa);
        for(d = 1;f = a[d];d++) {
          a[d]._zipIdx != Sa && b.push(f), f._zipIdx = Sa
        }
      }
    }
    return b
  }
  function c(a, b) {
    if(!b) {
      return 1
    }
    var c = $h(a);
    return!b[c] ? b[c] = 1 : 0
  }
  function d(a, b) {
    if(zg) {
      var c = Ag[a];
      if(c && !b) {
        return c
      }
    }
    if(c = Bg[a]) {
      return c
    }
    var c = a.charAt(0), f = -1 == a.indexOf(" ");
    0 <= a.indexOf("#") && f && (b = k);
    if(zg && !b && -1 == ">~+".indexOf(c) && (!H || -1 == a.indexOf(":")) && !(R && 0 <= a.indexOf(".")) && -1 == a.indexOf(":contains") && -1 == a.indexOf("|=")) {
      var j = 0 <= ">~+".indexOf(a.charAt(a.length - 1)) ? a + " *" : a;
      return Ag[a] = function(b) {
        try {
          9 == b.nodeType || f || e("");
          var c = b.querySelectorAll(j);
          H ? c.ng = k : c.ed = k;
          return c
        }catch(g) {
          return d(a, k)(b)
        }
      }
    }
    var m = a.split(/\s*,\s*/);
    return Bg[a] = 2 > m.length ? g(a) : function(a) {
      for(var b = 0, c = [], d;d = m[b++];) {
        c = c.concat(g(d)(a))
      }
      return c
    }
  }
  function g(a) {
    var b = ea(ya(a));
    if(1 == b.length) {
      var c = f(b[0]);
      return function(a) {
        if(a = c(a, [])) {
          a.ed = k
        }
        return a
      }
    }
    return function(a) {
      for(var a = x(a), c, d, g = b.length, j, Ob, m = 0;m < g;m++) {
        Ob = [];
        c = b[m];
        d = a.length - 1;
        0 < d && (j = {}, Ob.ed = k);
        d = f(c);
        for(var yg = 0;c = a[yg];yg++) {
          d(c, Ob, j)
        }
        if(!Ob.length) {
          break
        }
        a = Ob
      }
      return Ob
    }
  }
  function f(a) {
    var b = Cg[a.Ob];
    if(b) {
      return b
    }
    var c = a.pf, c = c ? c.fd : "", d = q(a, {Gb:1}), f = "*" == a.P, g = document.getElementsByClassName;
    if(c) {
      g = {Gb:1}, f && (g.P = 1), d = q(a, g), "+" == c ? b = n(d) : "~" == c ? b = m(d) : ">" == c && (b = j(d))
    }else {
      if(a.id) {
        d = !a.tf && f ? Xf : q(a, {Gb:1, id:1}), b = function(b, c) {
          var f = U(b).a(a.id), g;
          if(g = f && d(f)) {
            if(!(g = 9 == b.nodeType)) {
              for(g = f.parentNode;g && !(g == b);) {
                g = g.parentNode
              }
              g = !!g
            }
          }
          if(g) {
            return x(f, c)
          }
        }
      }else {
        if(g && /\{\s*\[native code\]\s*\}/.test("" + g) && a.Ca.length && !R) {
          var d = q(a, {Gb:1, Ca:1, id:1}), p = a.Ca.join(" "), b = function(a, b) {
            for(var c = x(0, b), f, g = 0, j = a.getElementsByClassName(p);f = j[g++];) {
              d(f, a) && c.push(f)
            }
            return c
          }
        }else {
          !f && !a.tf ? b = function(b, c) {
            for(var d = x(0, c), f, g = 0, j = b.getElementsByTagName(a.Yd());f = j[g++];) {
              d.push(f)
            }
            return d
          } : (d = q(a, {Gb:1, P:1, id:1}), b = function(b, c) {
            for(var f = x(0, c), g, j = 0, m = b.getElementsByTagName(a.Yd());g = m[j++];) {
              d(g, b) && f.push(g)
            }
            return f
          })
        }
      }
    }
    return Cg[a.Ob] = b
  }
  function j(a) {
    a = a || Xf;
    return function(b, d, f) {
      for(var g = 0, j = b[t];b = j[g++];) {
        Gc(b) && (!f || c(b, f)) && a(b, g) && d.push(b)
      }
      return d
    }
  }
  function m(a) {
    return function(b, d, f) {
      for(b = b[Hc];b;) {
        if(Gc(b)) {
          if(f && !c(b, f)) {
            break
          }
          a(b) && d.push(b)
        }
        b = b[Hc]
      }
      return d
    }
  }
  function n(a) {
    return function(b, d, f) {
      for(;b = b[Hc];) {
        if(!ud || Oa(b)) {
          (!f || c(b, f)) && a(b) && d.push(b);
          break
        }
      }
      return d
    }
  }
  function q(a, b) {
    if(!a) {
      return Xf
    }
    var b = b || {}, c = l;
    b.Gb || (c = A(c, Oa));
    b.P || "*" != a.P && (c = A(c, function(b) {
      return b && b.tagName == a.Yd()
    }));
    b.Ca || M(a.Ca, function(a, b) {
      var d = RegExp("(?:^|\\s)" + a + "(?:\\s|$)");
      c = A(c, function(a) {
        return d.test(a.className)
      });
      c.count = b
    });
    b.ub || M(a.ub, function(a) {
      var b = a.name;
      ye[b] && (c = A(c, ye[b](b, a.value)))
    });
    b.Nc || M(a.Nc, function(a) {
      var b, d = a.Mc;
      a.type && Dg[a.type] ? b = Dg[a.type](d, a.le) : d.length && (b = ai(d));
      b && (c = A(c, b))
    });
    b.id || a.id && (c = A(c, function(b) {
      return!!b && b.id == a.id
    }));
    c || "default" in b || (c = Xf);
    return c
  }
  function p(a) {
    return C(a) % 2
  }
  function r(a) {
    return!(C(a) % 2)
  }
  function C(a) {
    var b = a.parentNode, c = 0, d = b[t], f = a._i || -1, g = b._l || -1;
    if(!d) {
      return-1
    }
    d = d.length;
    if(g == d && 0 <= f && 0 <= g) {
      return f
    }
    b._l = d;
    f = -1;
    for(b = b.firstElementChild || b.firstChild;b;b = b[Hc]) {
      Gc(b) && (b._i = ++c, a === b && (f = c))
    }
    return f
  }
  function s(a) {
    for(;a = a[Hc];) {
      if(Gc(a)) {
        return o
      }
    }
    return k
  }
  function la(a) {
    for(;a = a[bi];) {
      if(Gc(a)) {
        return o
      }
    }
    return k
  }
  function da(a, b) {
    return!a ? "" : "class" == b ? a.className || "" : "for" == b ? a.htmlFor || "" : "style" == b ? a.style.cssText || "" : (Pb ? a.getAttribute(b) : a.getAttribute(b, 2)) || ""
  }
  function Oa(a) {
    return 1 == a.nodeType
  }
  function A(a, b) {
    return!a ? b : !b ? a : function() {
      return a.apply(window, arguments) && b.apply(window, arguments)
    }
  }
  function ea(a) {
    function b() {
      0 <= p && (D.id = c(p, s).replace(/\\/g, ""), p = -1);
      if(0 <= q) {
        var a = q == s ? l : c(q, s);
        0 > ">~+".indexOf(a) ? D.P = a : D.fd = a;
        q = -1
      }
      0 <= n && (D.Ca.push(c(n + 1, s).replace(/\\/g, "")), n = -1)
    }
    function c(b, d) {
      return ya(a.slice(b, d))
    }
    for(var a = 0 <= ">~+".indexOf(a.slice(-1)) ? a + " * " : a + " ", d = [], f = -1, g = -1, j = -1, m = -1, n = -1, p = -1, q = -1, r = "", t = "", A, s = 0, C = a.length, D = l, x = l;r = t, t = a.charAt(s), s < C;s++) {
      if("\\" != r) {
        if(D || (A = s, D = {Ob:l, ub:[], Nc:[], Ca:[], P:l, fd:l, id:l, Yd:function() {
          return Pb ? this.Yg : this.P
        }}, q = s), 0 <= f) {
          if("]" == t) {
            x.Mc ? x.le = c(j || f + 1, s) : x.Mc = c(f + 1, s);
            if((f = x.le) && ('"' == f.charAt(0) || "'" == f.charAt(0))) {
              x.le = f.slice(1, -1)
            }
            D.Nc.push(x);
            x = l;
            f = j = -1
          }else {
            "=" == t && (j = 0 <= "|~^$*".indexOf(r) ? r : "", x.type = j + t, x.Mc = c(f + 1, s - j.length), j = s + 1)
          }
        }else {
          0 <= g ? ")" == t && (0 <= m && (x.value = c(g + 1, s)), m = g = -1) : "#" == t ? (b(), p = s + 1) : "." == t ? (b(), n = s) : ":" == t ? (b(), m = s) : "[" == t ? (b(), f = s, x = {}) : "(" == t ? (0 <= m && (x = {name:c(m + 1, s), value:l}, D.ub.push(x)), g = s) : " " == t && r != t && (b(), 0 <= m && D.ub.push({name:c(m + 1, s)}), D.tf = D.ub.length || D.Nc.length || D.Ca.length, D.Ii = D.Ob = c(A, s), D.Yg = D.P = D.fd ? l : D.P || "*", D.P && (D.P = D.P.toUpperCase()), d.length && 
          d[d.length - 1].fd && (D.pf = d.pop(), D.Ob = D.pf.Ob + " " + D.Ob), d.push(D), D = l)
        }
      }
    }
    return d
  }
  function x(a, b) {
    var c = b || [];
    a && c.push(a);
    return c
  }
  var R = J && "BackCompat" == document.compatMode, t = document.firstChild.children ? "children" : "childNodes", Pb = o, Dg = {"*=":function(a, b) {
    return function(c) {
      return 0 <= da(c, a).indexOf(b)
    }
  }, "^=":function(a, b) {
    return function(c) {
      return 0 == da(c, a).indexOf(b)
    }
  }, "$=":function(a, b) {
    return function(c) {
      c = " " + da(c, a);
      return c.lastIndexOf(b) == c.length - b.length
    }
  }, "~=":function(a, b) {
    var c = " " + b + " ";
    return function(b) {
      return 0 <= (" " + da(b, a) + " ").indexOf(c)
    }
  }, "|=":function(a, b) {
    b = " " + b;
    return function(c) {
      c = " " + da(c, a);
      return c == b || 0 == c.indexOf(b + "-")
    }
  }, "=":function(a, b) {
    return function(c) {
      return da(c, a) == b
    }
  }}, ud = "undefined" == typeof document.firstChild.nextElementSibling, Hc = !ud ? "nextElementSibling" : "nextSibling", bi = !ud ? "previousElementSibling" : "previousSibling", Gc = ud ? Oa : Xf, ye = {checked:function() {
    return function(a) {
      return a.checked || a.attributes.checked
    }
  }, "first-child":function() {
    return la
  }, "last-child":function() {
    return s
  }, "only-child":function() {
    return function(a) {
      return!la(a) || !s(a) ? o : k
    }
  }, empty:function() {
    return function(a) {
      for(var b = a.childNodes, a = a.childNodes.length - 1;0 <= a;a--) {
        var c = b[a].nodeType;
        if(1 === c || 3 == c) {
          return o
        }
      }
      return k
    }
  }, contains:function(a, b) {
    var c = b.charAt(0);
    if('"' == c || "'" == c) {
      b = b.slice(1, -1)
    }
    return function(a) {
      return 0 <= a.innerHTML.indexOf(b)
    }
  }, not:function(a, b) {
    var c = ea(b)[0], d = {Gb:1};
    "*" != c.P && (d.P = 1);
    c.Ca.length || (d.Ca = 1);
    var f = q(c, d);
    return function(a) {
      return!f(a)
    }
  }, "nth-child":function(a, b) {
    if("odd" == b) {
      return p
    }
    if("even" == b) {
      return r
    }
    if(-1 != b.indexOf("n")) {
      var c = b.split("n", 2), d = c[0] ? "-" == c[0] ? -1 : parseInt(c[0], 10) : 1, f = c[1] ? parseInt(c[1], 10) : 0, g = 0, j = -1;
      0 < d ? 0 > f ? f = f % d && d + f % d : 0 < f && (f >= d && (g = f - f % d), f %= d) : 0 > d && (d *= -1, 0 < f && (j = f, f %= d));
      if(0 < d) {
        return function(a) {
          a = C(a);
          return a >= g && (0 > j || a <= j) && a % d == f
        }
      }
      b = f
    }
    var m = parseInt(b, 10);
    return function(a) {
      return C(a) == m
    }
  }}, ai = H ? function(a) {
    var b = a.toLowerCase();
    "class" == b && (a = "className");
    return function(c) {
      return Pb ? c.getAttribute(a) : c[a] || c[b]
    }
  } : function(a) {
    return function(b) {
      return b && b.getAttribute && b.hasAttribute(a)
    }
  }, Cg = {}, Bg = {}, Ag = {}, zg = !!document.querySelectorAll && (!J || K("526")), Sa = 0, $h = H ? function(a) {
    return Pb ? a.getAttribute("_uid") || a.setAttribute("_uid", ++Sa) || Sa : a.uniqueID
  } : function(a) {
    return a._uid || (a._uid = ++Sa)
  };
  a.ub = ye;
  return a
}();
ba("goog.dom.query", Vh);
ba("goog.dom.query.pseudos", Vh.ub);
function Wh(a, b, c) {
  this.Aa = [];
  this.Yb = {};
  this.Me = {};
  this.Vb = {};
  this.ab = this.Ie = 0;
  this.Tf = a;
  this.W = new W;
  this.Se = [];
  this.Te = {};
  X.call(this, c)
}
G(Wh, X);
function Xh(a, b) {
  var c = nb(a.Te, function(a) {
    return a == b
  });
  E(c) && (a.Se[c].J(), a.Se[c] = o, delete a.Te[c])
}
y = Wh.prototype;
y.d = function() {
  this.e = xc(this.Tf)
};
function Yh(a) {
  a = Vh(".windowsection-header", a.a());
  1 != a.length && e(Error("fatal error"));
  return a[0]
}
function Zh(a) {
  a = Vh(".windowsection-body", a.a());
  1 != a.length && e(Error("fatal error"));
  return a[0]
}
y.i = function() {
  Wh.b.i.call(this);
  this.Va()
};
y.Jd = function(a, b) {
  this.Aa.push({window:a, Ki:b, index:this.ab});
  var c = xc("<div class='windowIndex" + this.ab + " windowsection-body-inner-wrapper'></div>"), d = xc("<div class='windowsection-header-label-inner-wrapper windowHeaderIndex" + this.ab + "'><div class='windowsection-header-label left'></div><div class='windowsection-header-label center'><span class='windowsection-header-label-text'>" + a.Vf + "</span><a class='windowsection-header-label-closebutton' href='#'>x</a></div><div class='windowsection-header-label right'></div></div>");
  ci(this, a, d, c);
  Zh(this).appendChild(c);
  Yh(this).appendChild(d);
  this.Vb[this.ab] = c;
  this.Yb[this.ab] = d;
  this.Me[this.ab] = Vh(".windowsection-header-label-text", d)[0];
  a.r(c);
  this.Va();
  this.ab++;
  di(this, a)
};
y.Rg = function(a) {
  ei(this, a.target.Mi, a.target.filename)
};
function ei(a, b, c) {
  var d = 0;
  M(a.Aa, function(a) {
    if(b.ka(a.window)) {
      var f = this.Me[a.index];
      if("textContent" in f) {
        f.textContent = c
      }else {
        if(f.firstChild && 3 == f.firstChild.nodeType) {
          for(;f.lastChild != f.firstChild;) {
            f.removeChild(f.lastChild)
          }
          f.firstChild.data = c
        }else {
          for(var j;j = f.firstChild;) {
            f.removeChild(j)
          }
          f.appendChild(V(f).createTextNode(c))
        }
      }
      a.label = c;
      d++
    }
  }, a);
  1 != d && e(Error("component does not exist in _windowInfoList at setLabel()"))
}
y.Xc = function(a) {
  return 0 == yb(this.Aa, function(b) {
    return a.ka(b.window)
  }, this).length ? o : k
};
function di(a, b) {
  Cb(a.Aa, function() {
    return b.ka(b)
  }) || e(Error("window section doesn't have the window object to activate."));
  M(a.Aa, function(a) {
    b.ka(a.window) ? (S(this.Yb[a.index], "active"), M(Vh(".windowsection-header-label", this.Yb[a.index]), function(a) {
      Tc(a, {"z-index":this.Ie});
      S(a, "active")
    }), S(this.Vb[a.index], "active"), hd(this.Vb[a.index], k)) : (ic(this.Yb[a.index], "active"), M(Vh(".windowsection-header-label", this.Yb[a.index]), function(a) {
      ic(a, "active")
    }), ic(this.Vb[a.index], "active"), hd(this.Vb[a.index], o))
  }, a);
  a.Ie++
}
function ci(a, b, c, d) {
  var g = Bc(c, function(a) {
    return N(Q(a), "windowsection-header-label-closebutton")
  });
  a.p().c(c, "click", function() {
    di(this, b)
  }).c(d, "click", function() {
    di(this, b)
  }).c(g, "click", function(a) {
    this.pe(b);
    a.preventDefault();
    a.stopPropagation()
  }).c(b, "change_label", a.Rg)
}
y.pe = function(a) {
  Xh(this, a);
  kb(yb(this.Aa, function(b) {
    return a.ka(b.window)
  }), function(a) {
    M(Vh(".windowIndex" + a.index, this.a()), function(a) {
      yc(a)
    }, this);
    M(Vh(".windowHeaderIndex" + a.index, this.a()), function(a) {
      yc(a)
    }, this)
  }, this);
  this.Aa = yb(this.Aa, function(b) {
    return!a.ka(b.window)
  });
  a.J()
};
y.Va = function() {
  var a = kd(Yh(this));
  Zh(this);
  var b = kd(Kc(this.a(), w(k)));
  ld(Zh(this), new P(b.width, b.height - a.height));
  M(this.Aa, function(a) {
    a.window.kd()
  })
};
function Ee(a) {
  this.kg = "<div class='windowsection'><div class='windowsection-header'></div><div class='windowsection-body_wrapper'><div class='windowsection-body'></div></div></div>";
  this.ac = [];
  this.Ub = l;
  X.call(this, a)
}
G(Ee, X);
y = Ee.prototype;
y.u = function(a) {
  Ee.b.u.call(this, a);
  var b = tc("div", {"class":"windowholder"});
  a.appendChild(b);
  S(a, "synthjs-sdkoscillator-windowholder-pane")
};
y.d = function() {
  this.e = tc("div", "windowholder")
};
y.f = function() {
  Ee.b.f.call(this)
};
y.Jd = function(a) {
  this.Ub == l && (this.Ub = new Wh(this.kg), this.Ub.rc(this.a()), this.ac.push(this.Ub));
  this.Xc(a) ? fi(this, a) : this.Ub.Jd(a)
};
y.Xc = function(a) {
  var b = o;
  M(this.ac, function(c) {
    b |= c.Xc(a)
  }, this);
  return b
};
function fi(a, b) {
  M(a.ac, function(a) {
    di(a, b)
  }, a)
}
y.pe = function(a) {
  var b = 0;
  M(this.ac, function(c) {
    c.Xc(a) && (c.pe(a), b++)
  }, this);
  b && a.J();
  return b
};
y.Va = function(a) {
  M(this.ac, function(b) {
    b.Va(a)
  })
};
function gi(a, b) {
  Ce.call(this, a);
  this.He = b.bootstrapJs;
  this.Cd = new Th(new Ge(this.He));
  this.p().c(this.Cd, Uh, this.Wf);
  this.Cd.qb()
}
G(gi, Ce);
gi.prototype.He = "main.js";
gi.prototype.De = function() {
  this.p().c(document, "keydown", this.Vg)
};
gi.prototype.Vg = u();
gi.prototype.Wf = function() {
  this.Hd.Jd(this.Cd.kc())
};
window.OscillatorPlayer = gi;

