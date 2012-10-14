function e(a) {
  throw a;
}
var h = void 0, j = !0, l = null, o = !1;
function s() {
  return function() {
  }
}
function aa(a) {
  return function(b) {
    this[a] = b
  }
}
function t(a) {
  return function() {
    return this[a]
  }
}
function w(a) {
  return function() {
    return a
  }
}
var y, ba = ba || {}, z = this;
function ca(a, b) {
  var c = a.split("."), d = z;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var g;c.length && (g = c.shift());) {
    !c.length && da(b) ? d[g] = b : d = d[g] ? d[g] : d[g] = {}
  }
}
function ea(a) {
  for(var a = a.split("."), b = z, c;c = a.shift();) {
    if(b[c] != l) {
      b = b[c]
    }else {
      return l
    }
  }
  return b
}
function fa() {
}
function ga(a) {
  a.X = function() {
    return a.zg ? a.zg : a.zg = new a
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
function da(a) {
  return a !== h
}
function ia(a) {
  return"array" == ha(a)
}
function ja(a) {
  var b = ha(a);
  return"array" == b || "object" == b && "number" == typeof a.length
}
function B(a) {
  return"string" == typeof a
}
function ma(a) {
  return"number" == typeof a
}
function na(a) {
  return"function" == ha(a)
}
function oa(a) {
  var b = typeof a;
  return"object" == b && a != l || "function" == b
}
function pa(a) {
  return a[qa] || (a[qa] = ++ra)
}
var qa = "closure_uid_" + Math.floor(2147483648 * Math.random()).toString(36), ra = 0;
function sa(a, b, c) {
  return a.call.apply(a.bind, arguments)
}
function ta(a, b, c) {
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
function C(a, b, c) {
  C = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? sa : ta;
  return C.apply(l, arguments)
}
function ua(a, b) {
  var c = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, c);
    return a.apply(this, b)
  }
}
var va = Date.now || function() {
  return+new Date
};
function E(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.b = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
}
;function wa(a) {
  var b = a.length - 1;
  return 0 <= b && a.indexOf("%", b) == b
}
function xa(a, b) {
  for(var c = 1;c < arguments.length;c++) {
    var d = ("" + arguments[c]).replace(/\$/g, "$$$$"), a = a.replace(/\%s/, d)
  }
  return a
}
function za(a) {
  return a.replace(/[\t\r\n ]+/g, " ").replace(/^[\t\r\n ]+|[\t\r\n ]+$/g, "")
}
function Aa(a) {
  return a.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
}
function Ba(a) {
  if(!Ca.test(a)) {
    return a
  }
  -1 != a.indexOf("&") && (a = a.replace(Da, "&amp;"));
  -1 != a.indexOf("<") && (a = a.replace(Ea, "&lt;"));
  -1 != a.indexOf(">") && (a = a.replace(Fa, "&gt;"));
  -1 != a.indexOf('"') && (a = a.replace(Ga, "&quot;"));
  return a
}
var Da = /&/g, Ea = /</g, Fa = />/g, Ga = /\"/g, Ca = /[&<>\"]/, Ha = 2147483648 * Math.random() | 0;
function Ia(a) {
  return("" + a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  })
}
;var Ja, Ka, La, Ma, Na, Oa, Pa;
function Qa() {
  return z.navigator ? z.navigator.userAgent : l
}
function Ra() {
  return z.navigator
}
Na = Ma = La = Ka = Ja = o;
var Sa;
if(Sa = Qa()) {
  var Ta = Ra();
  Ja = 0 == Sa.indexOf("Opera");
  Ka = !Ja && -1 != Sa.indexOf("MSIE");
  Ma = (La = !Ja && -1 != Sa.indexOf("WebKit")) && -1 != Sa.indexOf("Mobile");
  Na = !Ja && !La && "Gecko" == Ta.product
}
var Ua = Ja, G = Ka, H = Na, I = La, Va = Ma, Wa, Xa = Ra();
Wa = Xa && Xa.platform || "";
Oa = -1 != Wa.indexOf("Mac");
Pa = -1 != Wa.indexOf("Win");
var Ya = !!Ra() && -1 != (Ra().appVersion || "").indexOf("X11"), Za;
a: {
  var $a = "", ab;
  if(Ua && z.opera) {
    var bb = z.opera.version, $a = "function" == typeof bb ? bb() : bb
  }else {
    if(H ? ab = /rv\:([^\);]+)(\)|;)/ : G ? ab = /MSIE\s+([^\);]+)(\)|;)/ : I && (ab = /WebKit\/(\S+)/), ab) {
      var db = ab.exec(Qa()), $a = db ? db[1] : ""
    }
  }
  if(G) {
    var eb, fb = z.document;
    eb = fb ? fb.documentMode : h;
    if(eb > parseFloat($a)) {
      Za = "" + eb;
      break a
    }
  }
  Za = $a
}
var gb = {};
function J(a) {
  var b;
  if(!(b = gb[a])) {
    b = 0;
    for(var c = Aa("" + Za).split("."), d = Aa("" + a).split("."), g = Math.max(c.length, d.length), f = 0;0 == b && f < g;f++) {
      var k = c[f] || "", m = d[f] || "", n = RegExp("(\\d*)(\\D*)", "g"), p = RegExp("(\\d*)(\\D*)", "g");
      do {
        var q = n.exec(k) || ["", "", ""], r = p.exec(m) || ["", "", ""];
        if(0 == q[0].length && 0 == r[0].length) {
          break
        }
        b = ((0 == q[1].length ? 0 : parseInt(q[1], 10)) < (0 == r[1].length ? 0 : parseInt(r[1], 10)) ? -1 : (0 == q[1].length ? 0 : parseInt(q[1], 10)) > (0 == r[1].length ? 0 : parseInt(r[1], 10)) ? 1 : 0) || ((0 == q[2].length) < (0 == r[2].length) ? -1 : (0 == q[2].length) > (0 == r[2].length) ? 1 : 0) || (q[2] < r[2] ? -1 : q[2] > r[2] ? 1 : 0)
      }while(0 == b)
    }
    b = gb[a] = 0 <= b
  }
  return b
}
var hb = {};
function jb(a) {
  return hb[a] || (hb[a] = G && !!document.documentMode && document.documentMode >= a)
}
;function kb(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, kb) : this.stack = Error().stack || "";
  a && (this.message = "" + a)
}
E(kb, Error);
kb.prototype.name = "CustomError";
function lb(a, b) {
  b.unshift(a);
  kb.call(this, xa.apply(l, b));
  b.shift()
}
E(lb, kb);
lb.prototype.name = "AssertionError";
function mb(a, b) {
  e(new lb("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
}
;var nb = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
function ob(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
}
function pb(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
}
function qb(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
}
function rb(a, b) {
  for(var c in a) {
    if(b.call(h, a[c], c, a)) {
      return c
    }
  }
}
function sb(a, b, c) {
  b in a && e(Error('The object already contains the key "' + b + '"'));
  a[b] = c
}
var tb = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
function ub(a, b) {
  for(var c, d, g = 1;g < arguments.length;g++) {
    d = arguments[g];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < tb.length;f++) {
      c = tb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;var K = Array.prototype, vb = K.indexOf ? function(a, b, c) {
  return K.indexOf.call(a, b, c)
} : function(a, b, c) {
  c = c == l ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
  if(B(a)) {
    return!B(b) || 1 != b.length ? -1 : a.indexOf(b, c)
  }
  for(;c < a.length;c++) {
    if(c in a && a[c] === b) {
      return c
    }
  }
  return-1
}, L = K.forEach ? function(a, b, c) {
  K.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = B(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in g && b.call(c, g[f], f, a)
  }
}, wb = K.filter ? function(a, b, c) {
  return K.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = [], f = 0, k = B(a) ? a.split("") : a, m = 0;m < d;m++) {
    if(m in k) {
      var n = k[m];
      b.call(c, n, m, a) && (g[f++] = n)
    }
  }
  return g
}, xb = K.map ? function(a, b, c) {
  return K.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = Array(d), f = B(a) ? a.split("") : a, k = 0;k < d;k++) {
    k in f && (g[k] = b.call(c, f[k], k, a))
  }
  return g
}, yb = K.some ? function(a, b, c) {
  return K.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = B(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in g && b.call(c, g[f], f, a)) {
      return j
    }
  }
  return o
}, zb = K.every ? function(a, b, c) {
  return K.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = B(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in g && !b.call(c, g[f], f, a)) {
      return o
    }
  }
  return j
};
function Ab(a, b) {
  var c = Bb(a, b, h);
  return 0 > c ? l : B(a) ? a.charAt(c) : a[c]
}
function Bb(a, b, c) {
  for(var d = a.length, g = B(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in g && b.call(c, g[f], f, a)) {
      return f
    }
  }
  return-1
}
function M(a, b) {
  return 0 <= vb(a, b)
}
function Cb(a, b) {
  var c = vb(a, b);
  0 <= c && K.splice.call(a, c, 1)
}
function Db(a, b) {
  var c = Bb(a, b, h);
  return 0 <= c ? (K.splice.call(a, c, 1), j) : o
}
function Eb(a) {
  return K.concat.apply(K, arguments)
}
function Fb(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
}
function Gb(a, b, c, d) {
  K.splice.apply(a, Hb(arguments, 1))
}
function Hb(a, b, c) {
  return 2 >= arguments.length ? K.slice.call(a, b) : K.slice.call(a, b, c)
}
;function Ib(a) {
  if("function" == typeof a.Ua) {
    return a.Ua()
  }
  if(B(a)) {
    return a.split("")
  }
  if(ja(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return pb(a)
}
function Jb(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(ja(a) || B(a)) {
      L(a, b, c)
    }else {
      var d;
      if("function" == typeof a.kc) {
        d = a.kc()
      }else {
        if("function" != typeof a.Ua) {
          if(ja(a) || B(a)) {
            d = [];
            for(var g = a.length, f = 0;f < g;f++) {
              d.push(f)
            }
          }else {
            d = qb(a)
          }
        }else {
          d = h
        }
      }
      for(var g = Ib(a), f = g.length, k = 0;k < f;k++) {
        b.call(c, g[k], d && d[k], a)
      }
    }
  }
}
;function Kb(a, b) {
  this.Xa = {};
  this.B = [];
  var c = arguments.length;
  if(1 < c) {
    c % 2 && e(Error("Uneven number of arguments"));
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    if(a) {
      a instanceof Kb ? (c = a.kc(), d = a.Ua()) : (c = qb(a), d = pb(a));
      for(var g = 0;g < c.length;g++) {
        this.set(c[g], d[g])
      }
    }
  }
}
y = Kb.prototype;
y.q = 0;
y.Id = t("q");
y.Ua = function() {
  Lb(this);
  for(var a = [], b = 0;b < this.B.length;b++) {
    a.push(this.Xa[this.B[b]])
  }
  return a
};
y.kc = function() {
  Lb(this);
  return this.B.concat()
};
y.Cb = function(a) {
  return Mb(this.Xa, a)
};
y.ya = function(a, b) {
  if(this === a) {
    return j
  }
  if(this.q != a.Id()) {
    return o
  }
  var c = b || Nb;
  Lb(this);
  for(var d, g = 0;d = this.B[g];g++) {
    if(!c(this.get(d), a.get(d))) {
      return o
    }
  }
  return j
};
function Nb(a, b) {
  return a === b
}
y.remove = function(a) {
  return Mb(this.Xa, a) ? (delete this.Xa[a], this.q--, this.B.length > 2 * this.q && Lb(this), j) : o
};
function Lb(a) {
  if(a.q != a.B.length) {
    for(var b = 0, c = 0;b < a.B.length;) {
      var d = a.B[b];
      Mb(a.Xa, d) && (a.B[c++] = d);
      b++
    }
    a.B.length = c
  }
  if(a.q != a.B.length) {
    for(var g = {}, c = b = 0;b < a.B.length;) {
      d = a.B[b], Mb(g, d) || (a.B[c++] = d, g[d] = 1), b++
    }
    a.B.length = c
  }
}
y.get = function(a, b) {
  return Mb(this.Xa, a) ? this.Xa[a] : b
};
y.set = function(a, b) {
  Mb(this.Xa, a) || (this.q++, this.B.push(a));
  this.Xa[a] = b
};
y.M = function() {
  return new Kb(this)
};
function Mb(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
;function Ob(a, b) {
  var c;
  if(a instanceof Ob) {
    this.ma = da(b) ? b : a.ma, Pb(this, a.pb), c = a.Yb, Qb(this), this.Yb = c, c = a.Ta, Qb(this), this.Ta = c, Rb(this, a.sc), this.wf(a.nb), Sb(this, a.Ma.M()), c = a.Ib, Qb(this), this.Ib = c
  }else {
    if(a && (c = ("" + a).match(nb))) {
      this.ma = !!b;
      Pb(this, c[1] || "", j);
      var d = c[2] || "";
      Qb(this);
      this.Yb = d ? decodeURIComponent(d) : "";
      d = c[3] || "";
      Qb(this);
      this.Ta = d ? decodeURIComponent(d) : "";
      Rb(this, c[4]);
      this.wf(c[5] || "", j);
      Sb(this, c[6] || "", j);
      c = c[7] || "";
      Qb(this);
      this.Ib = c ? decodeURIComponent(c) : ""
    }else {
      this.ma = !!b, this.Ma = new Tb(l, 0, this.ma)
    }
  }
}
y = Ob.prototype;
y.pb = "";
y.Yb = "";
y.Ta = "";
y.sc = l;
y.nb = "";
y.Ib = "";
y.ji = o;
y.ma = o;
y.toString = function() {
  var a = [], b = this.pb;
  b && a.push(Ub(b, Vb), ":");
  if(b = this.Ta) {
    a.push("//");
    var c = this.Yb;
    c && a.push(Ub(c, Vb), "@");
    a.push(encodeURIComponent("" + b));
    b = this.sc;
    b != l && a.push(":", "" + b)
  }
  if(b = this.nb) {
    this.Ta && "/" != b.charAt(0) && a.push("/"), a.push(Ub(b, "/" == b.charAt(0) ? Wb : Xb))
  }
  (b = this.Ma.toString()) && a.push("?", b);
  (b = this.Ib) && a.push("#", Ub(b, Yb));
  return a.join("")
};
function Zb(a, b) {
  var c = a.M(), d = !!b.pb;
  d ? Pb(c, b.pb) : d = !!b.Yb;
  if(d) {
    var g = b.Yb;
    Qb(c);
    c.Yb = g
  }else {
    d = !!b.Ta
  }
  d ? (g = b.Ta, Qb(c), c.Ta = g) : d = b.sc != l;
  var f = b.nb;
  if(d) {
    Rb(c, b.sc)
  }else {
    if(d = !!b.nb) {
      if("/" != f.charAt(0) && (a.Ta && !a.nb ? f = "/" + f : (g = c.nb.lastIndexOf("/"), -1 != g && (f = c.nb.substr(0, g + 1) + f))), ".." == f || "." == f) {
        f = ""
      }else {
        if(!(-1 == f.indexOf("./") && -1 == f.indexOf("/."))) {
          for(var g = 0 == f.lastIndexOf("/", 0), f = f.split("/"), k = [], m = 0;m < f.length;) {
            var n = f[m++];
            "." == n ? g && m == f.length && k.push("") : ".." == n ? ((1 < k.length || 1 == k.length && "" != k[0]) && k.pop(), g && m == f.length && k.push("")) : (k.push(n), g = j)
          }
          f = k.join("/")
        }
      }
    }
  }
  d ? c.wf(f) : d = "" !== b.Ma.toString();
  d ? Sb(c, b.Ma.toString() ? decodeURIComponent(b.Ma.toString()) : "") : d = !!b.Ib;
  d && (d = b.Ib, Qb(c), c.Ib = d);
  return c
}
y.M = function() {
  return new Ob(this)
};
function Pb(a, b, c) {
  Qb(a);
  a.pb = c ? b ? decodeURIComponent(b) : "" : b;
  a.pb && (a.pb = a.pb.replace(/:$/, ""))
}
function Rb(a, b) {
  Qb(a);
  b ? (b = Number(b), (isNaN(b) || 0 > b) && e(Error("Bad port number " + b)), a.sc = b) : a.sc = l
}
y.wf = function(a, b) {
  Qb(this);
  this.nb = b ? a ? decodeURIComponent(a) : "" : a
};
function Sb(a, b, c) {
  Qb(a);
  b instanceof Tb ? (a.Ma = b, a.Ma.uf(a.ma)) : (c || (b = Ub(b, $b)), a.Ma = new Tb(b, 0, a.ma))
}
function Qb(a) {
  a.ji && e(Error("Tried to modify a read-only Uri"))
}
y.uf = function(a) {
  this.ma = a;
  this.Ma && this.Ma.uf(a);
  return this
};
function Ub(a, b) {
  return B(a) ? encodeURI(a).replace(b, ac) : l
}
function ac(a) {
  a = a.charCodeAt(0);
  return"%" + (a >> 4 & 15).toString(16) + (a & 15).toString(16)
}
var Vb = /[#\/\?@]/g, Xb = /[\#\?:]/g, Wb = /[\#\?]/g, $b = /[\#\?@]/g, Yb = /#/g;
function Tb(a, b, c) {
  this.la = a || l;
  this.ma = !!c
}
function bc(a) {
  if(!a.A && (a.A = new Kb, a.q = 0, a.la)) {
    for(var b = a.la.split("&"), c = 0;c < b.length;c++) {
      var d = b[c].indexOf("="), g = l, f = l;
      0 <= d ? (g = b[c].substring(0, d), f = b[c].substring(d + 1)) : g = b[c];
      g = decodeURIComponent(g.replace(/\+/g, " "));
      g = cc(a, g);
      a.add(g, f ? decodeURIComponent(f.replace(/\+/g, " ")) : "")
    }
  }
}
y = Tb.prototype;
y.A = l;
y.q = l;
y.Id = function() {
  bc(this);
  return this.q
};
y.add = function(a, b) {
  bc(this);
  this.la = l;
  var a = cc(this, a), c = this.A.get(a);
  c || this.A.set(a, c = []);
  c.push(b);
  this.q++;
  return this
};
y.remove = function(a) {
  bc(this);
  a = cc(this, a);
  return this.A.Cb(a) ? (this.la = l, this.q -= this.A.get(a).length, this.A.remove(a)) : o
};
y.Cb = function(a) {
  bc(this);
  a = cc(this, a);
  return this.A.Cb(a)
};
y.kc = function() {
  bc(this);
  for(var a = this.A.Ua(), b = this.A.kc(), c = [], d = 0;d < b.length;d++) {
    for(var g = a[d], f = 0;f < g.length;f++) {
      c.push(b[d])
    }
  }
  return c
};
y.Ua = function(a) {
  bc(this);
  var b = [];
  if(a) {
    this.Cb(a) && (b = Eb(b, this.A.get(cc(this, a))))
  }else {
    for(var a = this.A.Ua(), c = 0;c < a.length;c++) {
      b = Eb(b, a[c])
    }
  }
  return b
};
y.set = function(a, b) {
  bc(this);
  this.la = l;
  a = cc(this, a);
  this.Cb(a) && (this.q -= this.A.get(a).length);
  this.A.set(a, [b]);
  this.q++;
  return this
};
y.get = function(a, b) {
  var c = a ? this.Ua(a) : [];
  return 0 < c.length ? "" + c[0] : b
};
y.toString = function() {
  if(this.la) {
    return this.la
  }
  if(!this.A) {
    return""
  }
  for(var a = [], b = this.A.kc(), c = 0;c < b.length;c++) {
    for(var d = b[c], g = encodeURIComponent("" + d), d = this.Ua(d), f = 0;f < d.length;f++) {
      var k = g;
      "" !== d[f] && (k += "=" + encodeURIComponent("" + d[f]));
      a.push(k)
    }
  }
  return this.la = a.join("&")
};
y.M = function() {
  var a = new Tb;
  a.la = this.la;
  this.A && (a.A = this.A.M());
  return a
};
function cc(a, b) {
  var c = "" + b;
  a.ma && (c = c.toLowerCase());
  return c
}
y.uf = function(a) {
  a && !this.ma && (bc(this), this.la = l, Jb(this.A, function(a, c) {
    var d = c.toLowerCase();
    c != d && (this.remove(c), this.remove(d), 0 < a.length && (this.la = l, this.A.set(cc(this, d), Fb(a)), this.q += a.length))
  }, this));
  this.ma = a
};
function dc() {
}
var ec = 0;
y = dc.prototype;
y.key = 0;
y.Ub = o;
y.He = o;
y.Wa = function(a, b, c, d, g, f) {
  na(a) ? this.Ag = j : a && a.handleEvent && na(a.handleEvent) ? this.Ag = o : e(Error("Invalid listener argument"));
  this.pc = a;
  this.Kg = b;
  this.src = c;
  this.type = d;
  this.capture = !!g;
  this.Ld = f;
  this.He = o;
  this.key = ++ec;
  this.Ub = o
};
y.handleEvent = function(a) {
  return this.Ag ? this.pc.call(this.Ld || this.src, a) : this.pc.handleEvent.call(this.pc, a)
};
var fc = !G || jb(9), gc = !G || jb(9), hc = G && !J("8");
!I || J("528");
H && J("1.9b") || G && J("8") || Ua && J("9.5") || I && J("528");
H && !J("8") || G && J("9");
var ic = {bj:"click", hj:"dblclick", Fj:"mousedown", Jj:"mouseup", Ij:"mouseover", Hj:"mouseout", Gj:"mousemove", Uj:"selectstart", zj:"keypress", yj:"keydown", Aj:"keyup", Wg:"blur", Zg:"focus", Yg:"deactivate", rj:G ? "focusin" : "DOMFocusIn", sj:G ? "focusout" : "DOMFocusOut", Xg:"change", $g:"select", Wj:"submit", xj:"input", Qj:"propertychange", mj:"dragstart", jj:"dragenter", lj:"dragover", kj:"dragleave", nj:"drop", $j:"touchstart", Zj:"touchmove", Yj:"touchend", Xj:"touchcancel", ej:"contextmenu", 
qj:"error", uj:"help", Cj:"load", Dj:"losecapture", Rj:"readystatechange", Sj:"resize", Tj:"scroll", dk:"unload", tj:"hashchange", Mj:"pagehide", Nj:"pageshow", Pj:"popstate", fj:"copy", Oj:"paste", gj:"cut", Wi:"beforecopy", Xi:"beforecut", Yi:"beforepaste", Lj:"online", Kj:"offline", Ej:"message", dj:"connect", ak:I ? "webkitTransitionEnd" : Ua ? "oTransitionEnd" : "transitionend"};
function jc() {
  this.z = o
}
jc.prototype.N = function() {
  this.z || (this.z = j, this.f())
};
jc.prototype.f = function() {
  this.Lh && kc.apply(l, this.Lh);
  if(this.Hg) {
    for(;this.Hg.length;) {
      this.Hg.shift()()
    }
  }
};
function mc(a) {
  a && "function" == typeof a.N && a.N()
}
function kc(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    ja(d) ? kc.apply(l, d) : mc(d)
  }
}
;function N(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
y = N.prototype;
y.f = s();
y.N = s();
y.Sb = o;
y.defaultPrevented = o;
y.ce = j;
y.stopPropagation = function() {
  this.Sb = j
};
y.preventDefault = function() {
  this.defaultPrevented = j;
  this.ce = o
};
function nc(a) {
  a.preventDefault()
}
;function oc(a) {
  oc[" "](a);
  return a
}
oc[" "] = fa;
function pc(a, b) {
  a && this.Wa(a, b)
}
E(pc, N);
var qc = [1, 4, 2];
y = pc.prototype;
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
y.qf = o;
y.$ = l;
y.Wa = function(a, b) {
  var c = this.type = a.type;
  N.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(H) {
      var g;
      a: {
        try {
          oc(d.nodeName);
          g = j;
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
  this.offsetX = I || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = I || a.offsetY !== h ? a.offsetY : a.layerY;
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
  this.qf = Oa ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.$ = a;
  a.defaultPrevented && this.preventDefault();
  delete this.Sb
};
function rc(a) {
  return(fc ? 0 == a.$.button : "click" == a.type ? j : !!(a.$.button & qc[0])) && !(I && Oa && a.ctrlKey)
}
y.stopPropagation = function() {
  pc.b.stopPropagation.call(this);
  this.$.stopPropagation ? this.$.stopPropagation() : this.$.cancelBubble = j
};
y.preventDefault = function() {
  pc.b.preventDefault.call(this);
  var a = this.$;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = o, hc) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
y.Qh = t("$");
y.f = s();
var sc = {}, tc = {}, uc = {}, vc = {};
function wc(a, b, c, d, g) {
  if(b) {
    if(ia(b)) {
      for(var f = 0;f < b.length;f++) {
        wc(a, b[f], c, d, g)
      }
      return l
    }
    var d = !!d, k = tc;
    b in k || (k[b] = {q:0, ta:0});
    k = k[b];
    d in k || (k[d] = {q:0, ta:0}, k.q++);
    var k = k[d], m = pa(a), n;
    k.ta++;
    if(k[m]) {
      n = k[m];
      for(f = 0;f < n.length;f++) {
        if(k = n[f], k.pc == c && k.Ld == g) {
          if(k.Ub) {
            break
          }
          return n[f].key
        }
      }
    }else {
      n = k[m] = [], k.q++
    }
    f = xc();
    f.src = a;
    k = new dc;
    k.Wa(c, f, a, b, d, g);
    c = k.key;
    f.key = c;
    n.push(k);
    sc[c] = k;
    uc[m] || (uc[m] = []);
    uc[m].push(k);
    a.addEventListener ? (a == z || !a.Ke) && a.addEventListener(b, f, d) : a.attachEvent(b in vc ? vc[b] : vc[b] = "on" + b, f);
    return c
  }
  e(Error("Invalid event type"))
}
function xc() {
  var a = yc, b = gc ? function(c) {
    return a.call(b.src, b.key, c)
  } : function(c) {
    c = a.call(b.src, b.key, c);
    if(!c) {
      return c
    }
  };
  return b
}
function zc(a, b, c, d, g) {
  if(ia(b)) {
    for(var f = 0;f < b.length;f++) {
      zc(a, b[f], c, d, g)
    }
  }else {
    a = wc(a, b, c, d, g), sc[a].He = j
  }
}
function Ac(a, b, c, d, g) {
  if(ia(b)) {
    for(var f = 0;f < b.length;f++) {
      Ac(a, b[f], c, d, g)
    }
  }else {
    if(d = !!d, a = Bc(a, b, d)) {
      for(f = 0;f < a.length;f++) {
        if(a[f].pc == c && a[f].capture == d && a[f].Ld == g) {
          Cc(a[f].key);
          break
        }
      }
    }
  }
}
function Cc(a) {
  if(!sc[a]) {
    return o
  }
  var b = sc[a];
  if(b.Ub) {
    return o
  }
  var c = b.src, d = b.type, g = b.Kg, f = b.capture;
  c.removeEventListener ? (c == z || !c.Ke) && c.removeEventListener(d, g, f) : c.detachEvent && c.detachEvent(d in vc ? vc[d] : vc[d] = "on" + d, g);
  c = pa(c);
  uc[c] && (g = uc[c], Cb(g, b), 0 == g.length && delete uc[c]);
  b.Ub = j;
  if(b = tc[d][f][c]) {
    b.Fg = j, Dc(d, f, c, b)
  }
  delete sc[a];
  return j
}
function Dc(a, b, c, d) {
  if(!d.Td && d.Fg) {
    for(var g = 0, f = 0;g < d.length;g++) {
      d[g].Ub ? d[g].Kg.src = l : (g != f && (d[f] = d[g]), f++)
    }
    d.length = f;
    d.Fg = o;
    0 == f && (delete tc[a][b][c], tc[a][b].q--, 0 == tc[a][b].q && (delete tc[a][b], tc[a].q--), 0 == tc[a].q && delete tc[a])
  }
}
function Ec(a) {
  var b, c = 0, d = b == l;
  b = !!b;
  if(a == l) {
    ob(uc, function(a) {
      for(var f = a.length - 1;0 <= f;f--) {
        var g = a[f];
        if(d || b == g.capture) {
          Cc(g.key), c++
        }
      }
    })
  }else {
    if(a = pa(a), uc[a]) {
      for(var a = uc[a], g = a.length - 1;0 <= g;g--) {
        var f = a[g];
        if(d || b == f.capture) {
          Cc(f.key), c++
        }
      }
    }
  }
}
function Bc(a, b, c) {
  var d = tc;
  return b in d && (d = d[b], c in d && (d = d[c], a = pa(a), d[a])) ? d[a] : l
}
function Fc(a, b, c, d, g) {
  var f = 1, b = pa(b);
  if(a[b]) {
    a.ta--;
    a = a[b];
    a.Td ? a.Td++ : a.Td = 1;
    try {
      for(var k = a.length, m = 0;m < k;m++) {
        var n = a[m];
        n && !n.Ub && (f &= Gc(n, g) !== o)
      }
    }finally {
      a.Td--, Dc(c, d, b, a)
    }
  }
  return Boolean(f)
}
function Gc(a, b) {
  a.He && Cc(a.key);
  return a.handleEvent(b)
}
function yc(a, b) {
  if(!sc[a]) {
    return j
  }
  var c = sc[a], d = c.type, g = tc;
  if(!(d in g)) {
    return j
  }
  var g = g[d], f, k;
  if(!gc) {
    f = b || ea("window.event");
    var m = j in g, n = o in g;
    if(m) {
      if(0 > f.keyCode || f.returnValue != h) {
        return j
      }
      a: {
        var p = o;
        if(0 == f.keyCode) {
          try {
            f.keyCode = -1;
            break a
          }catch(q) {
            p = j
          }
        }
        if(p || f.returnValue == h) {
          f.returnValue = j
        }
      }
    }
    p = new pc;
    p.Wa(f, this);
    f = j;
    try {
      if(m) {
        for(var r = [], D = p.currentTarget;D;D = D.parentNode) {
          r.push(D)
        }
        k = g[j];
        k.ta = k.q;
        for(var v = r.length - 1;!p.Sb && 0 <= v && k.ta;v--) {
          p.currentTarget = r[v], f &= Fc(k, r[v], d, j, p)
        }
        if(n) {
          k = g[o];
          k.ta = k.q;
          for(v = 0;!p.Sb && v < r.length && k.ta;v++) {
            p.currentTarget = r[v], f &= Fc(k, r[v], d, o, p)
          }
        }
      }else {
        f = Gc(c, p)
      }
    }finally {
      r && (r.length = 0)
    }
    return f
  }
  d = new pc(b, this);
  return f = Gc(c, d)
}
;function O(a, b) {
  this.width = a;
  this.height = b
}
function Hc(a, b) {
  return a == b ? j : !a || !b ? o : a.width == b.width && a.height == b.height
}
y = O.prototype;
y.M = function() {
  return new O(this.width, this.height)
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
var Ic;
function Jc(a) {
  a = a.className;
  return B(a) && a.match(/\S+/g) || []
}
function P(a, b) {
  for(var c = Jc(a), d = Hb(arguments, 1), g = c.length + d.length, f = c, k = 0;k < d.length;k++) {
    M(f, d[k]) || f.push(d[k])
  }
  a.className = c.join(" ");
  return c.length == g
}
function Kc(a, b) {
  var c = Jc(a), d = Hb(arguments, 1), g = Lc(c, d);
  a.className = g.join(" ");
  return g.length == c.length - d.length
}
function Lc(a, b) {
  return wb(a, function(a) {
    return!M(b, a)
  })
}
;var Mc = !G || jb(9), Nc = !H && !G || G && jb(9) || H && J("1.9.1"), Oc = G && !J("9");
function Q(a, b) {
  this.x = da(a) ? a : 0;
  this.y = da(b) ? b : 0
}
Q.prototype.M = function() {
  return new Q(this.x, this.y)
};
Q.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function Pc(a, b) {
  return new Q(a.x - b.x, a.y - b.y)
}
;function R(a) {
  return a ? new Qc(S(a)) : Ic || (Ic = new Qc)
}
function Rc(a, b, c) {
  return Sc(document, a, b, c)
}
function Sc(a, b, c, d) {
  a = d || a;
  b = b && "*" != b ? b.toUpperCase() : "";
  if(a.querySelectorAll && a.querySelector && (b || c)) {
    return a.querySelectorAll(b + (c ? "." + c : ""))
  }
  if(c && a.getElementsByClassName) {
    a = a.getElementsByClassName(c);
    if(b) {
      for(var d = {}, g = 0, f = 0, k;k = a[f];f++) {
        b == k.nodeName && (d[g++] = k)
      }
      d.length = g;
      return d
    }
    return a
  }
  a = a.getElementsByTagName(b || "*");
  if(c) {
    d = {};
    for(f = g = 0;k = a[f];f++) {
      b = k.className, "function" == typeof b.split && M(b.split(/\s+/), c) && (d[g++] = k)
    }
    d.length = g;
    return d
  }
  return a
}
function Tc(a, b) {
  ob(b, function(b, d) {
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in Uc ? a.setAttribute(Uc[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
  })
}
var Uc = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
function Vc(a) {
  a = a.document;
  a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
  return new O(a.clientWidth, a.clientHeight)
}
function Wc(a) {
  return a.parentWindow || a.defaultView
}
function Xc(a, b, c) {
  return $c(document, arguments)
}
function $c(a, b) {
  var c = b[0], d = b[1];
  if(!Mc && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', Ba(d.name), '"');
    if(d.type) {
      c.push(' type="', Ba(d.type), '"');
      var g = {};
      ub(g, d);
      d = g;
      delete d.type
    }
    c.push(">");
    c = c.join("")
  }
  c = a.createElement(c);
  d && (B(d) ? c.className = d : ia(d) ? P.apply(l, [c].concat(d)) : Tc(c, d));
  2 < b.length && ad(a, c, b, 2);
  return c
}
function ad(a, b, c, d) {
  function g(c) {
    c && b.appendChild(B(c) ? a.createTextNode(c) : c)
  }
  for(;d < c.length;d++) {
    var f = c[d];
    ja(f) && !(oa(f) && 0 < f.nodeType) ? L(bd(f) ? Fb(f) : f, g) : g(f)
  }
}
function cd(a) {
  var b = document, c = b.createElement("div");
  G ? (c.innerHTML = "<br>" + a, c.removeChild(c.firstChild)) : c.innerHTML = a;
  if(1 == c.childNodes.length) {
    return c.removeChild(c.firstChild)
  }
  for(a = b.createDocumentFragment();c.firstChild;) {
    a.appendChild(c.firstChild)
  }
  return a
}
function dd(a, b) {
  ad(S(a), a, arguments, 1)
}
function ed(a) {
  for(var b;b = a.firstChild;) {
    a.removeChild(b)
  }
}
function fd(a) {
  return a && a.parentNode ? a.parentNode.removeChild(a) : l
}
function gd(a) {
  if(a.firstElementChild != h) {
    a = a.firstElementChild
  }else {
    for(a = a.firstChild;a && 1 != a.nodeType;) {
      a = a.nextSibling
    }
  }
  return a
}
function hd(a, b) {
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
function S(a) {
  return 9 == a.nodeType ? a : a.ownerDocument || a.document
}
function id(a, b) {
  if("textContent" in a) {
    a.textContent = b
  }else {
    if(a.firstChild && 3 == a.firstChild.nodeType) {
      for(;a.lastChild != a.firstChild;) {
        a.removeChild(a.lastChild)
      }
      a.firstChild.data = b
    }else {
      ed(a), a.appendChild(S(a).createTextNode(b))
    }
  }
}
function jd(a, b) {
  var c = [];
  return kd(a, b, c, j) ? c[0] : h
}
function kd(a, b, c, d) {
  if(a != l) {
    for(a = a.firstChild;a;) {
      if(b(a) && (c.push(a), d) || kd(a, b, c, d)) {
        return j
      }
      a = a.nextSibling
    }
  }
  return o
}
var ld = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, md = {IMG:" ", BR:"\n"};
function nd(a) {
  var b = a.getAttributeNode("tabindex");
  return b && b.specified ? (a = a.tabIndex, ma(a) && 0 <= a && 32768 > a) : o
}
function od(a, b) {
  b ? a.tabIndex = 0 : (a.tabIndex = -1, a.removeAttribute("tabIndex"))
}
function pd(a) {
  if(Oc && "innerText" in a) {
    a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n")
  }else {
    var b = [];
    qd(a, b, j);
    a = b.join("")
  }
  a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
  a = a.replace(/\u200B/g, "");
  Oc || (a = a.replace(/ +/g, " "));
  " " != a && (a = a.replace(/^\s*/, ""));
  return a
}
function rd(a) {
  var b = [];
  qd(a, b, o);
  return b.join("")
}
function qd(a, b, c) {
  if(!(a.nodeName in ld)) {
    if(3 == a.nodeType) {
      c ? b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue)
    }else {
      if(a.nodeName in md) {
        b.push(md[a.nodeName])
      }else {
        for(a = a.firstChild;a;) {
          qd(a, b, c), a = a.nextSibling
        }
      }
    }
  }
}
function bd(a) {
  if(a && "number" == typeof a.length) {
    if(oa(a)) {
      return"function" == typeof a.item || "string" == typeof a.item
    }
    if(na(a)) {
      return"function" == typeof a.item
    }
  }
  return o
}
function sd(a, b) {
  for(var a = a.parentNode, c = 0;a;) {
    if(b(a)) {
      return a
    }
    a = a.parentNode;
    c++
  }
  return l
}
function Qc(a) {
  this.s = a || z.document || document
}
y = Qc.prototype;
y.g = R;
function td(a) {
  return a.s
}
y.a = function(a) {
  return B(a) ? this.s.getElementById(a) : a
};
y.Ni = Tc;
y.d = function(a, b, c) {
  return $c(this.s, arguments)
};
y.createElement = function(a) {
  return this.s.createElement(a)
};
y.createTextNode = function(a) {
  return this.s.createTextNode(a)
};
function ud(a) {
  return"CSS1Compat" == a.s.compatMode
}
y.Jb = function() {
  return Wc(this.s)
};
function vd(a) {
  var b = a.s, a = !I && "CSS1Compat" == b.compatMode ? b.documentElement : b.body, b = Wc(b);
  return new Q(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop)
}
y.appendChild = function(a, b) {
  a.appendChild(b)
};
y.append = dd;
y.removeNode = fd;
y.ng = function(a) {
  return Nc && a.children != h ? a.children : wb(a.childNodes, function(a) {
    return 1 == a.nodeType
  })
};
y.qg = gd;
y.contains = hd;
function wd() {
  this.z = o
}
E(wd, jc);
y = wd.prototype;
y.Ke = j;
y.$d = l;
y.vf = aa("$d");
y.addEventListener = function(a, b, c, d) {
  wc(this, a, b, c, d)
};
y.removeEventListener = function(a, b, c, d) {
  Ac(this, a, b, c, d)
};
y.dispatchEvent = function(a) {
  var b = a.type || a, c = tc;
  if(b in c) {
    if(B(a)) {
      a = new N(a, this)
    }else {
      if(a instanceof N) {
        a.target = a.target || this
      }else {
        var d = a, a = new N(b, this);
        ub(a, d)
      }
    }
    var d = 1, g, c = c[b], b = j in c, f;
    if(b) {
      g = [];
      for(f = this;f;f = f.$d) {
        g.push(f)
      }
      f = c[j];
      f.ta = f.q;
      for(var k = g.length - 1;!a.Sb && 0 <= k && f.ta;k--) {
        a.currentTarget = g[k], d &= Fc(f, g[k], a.type, j, a) && a.ce != o
      }
    }
    if(o in c) {
      if(f = c[o], f.ta = f.q, b) {
        for(k = 0;!a.Sb && k < g.length && f.ta;k++) {
          a.currentTarget = g[k], d &= Fc(f, g[k], a.type, o, a) && a.ce != o
        }
      }else {
        for(g = this;!a.Sb && g && f.ta;g = g.$d) {
          a.currentTarget = g, d &= Fc(f, g, a.type, o, a) && a.ce != o
        }
      }
    }
    a = Boolean(d)
  }else {
    a = j
  }
  return a
};
y.f = function() {
  wd.b.f.call(this);
  Ec(this);
  this.$d = l
};
function xd(a) {
  this.z = o;
  this.$b = a || window;
  this.Sd = wc(this.$b, "resize", this.fi, o, this);
  this.xc = Vc(this.$b || window);
  if(I && Pa || Ua && this.$b.self != this.$b.top) {
    this.le = window.setInterval(C(this.gg, this), yd)
  }
}
E(xd, wd);
var yd = 500;
y = xd.prototype;
y.Sd = l;
y.$b = l;
y.xc = l;
y.le = l;
y.Se = function() {
  return this.xc ? this.xc.M() : l
};
y.f = function() {
  xd.b.f.call(this);
  this.Sd && (Cc(this.Sd), this.Sd = l);
  this.le && (window.clearInterval(this.le), this.le = l);
  this.xc = this.$b = l
};
y.fi = function() {
  this.gg()
};
y.gg = function() {
  var a = Vc(this.$b || window);
  Hc(a, this.xc) || (this.xc = a, this.dispatchEvent("resize"))
};
function zd(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d
}
zd.prototype.M = function() {
  return new zd(this.top, this.right, this.bottom, this.left)
};
zd.prototype.toString = function() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
};
zd.prototype.contains = function(a) {
  return!this || !a ? o : a instanceof zd ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom
};
function Ad(a, b, c, d) {
  this.left = a;
  this.top = b;
  this.width = c;
  this.height = d
}
Ad.prototype.M = function() {
  return new Ad(this.left, this.top, this.width, this.height)
};
Ad.prototype.toString = function() {
  return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
};
Ad.prototype.contains = function(a) {
  return a instanceof Ad ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
Ad.prototype.Se = function() {
  return new O(this.width, this.height)
};
function Bd(a, b, c) {
  B(b) ? Cd(a, c, b) : ob(b, ua(Cd, a))
}
function Cd(a, b, c) {
  a.style[Ia(c)] = b
}
function Dd(a, b) {
  var c = S(a);
  return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, l)) ? c[b] || c.getPropertyValue(b) || "" : ""
}
function Ed(a, b) {
  return Dd(a, b) || (a.currentStyle ? a.currentStyle[b] : l) || a.style && a.style[b]
}
function Fd(a) {
  return Ed(a, "position")
}
function Gd(a, b, c) {
  var d, g = H && (Oa || Ya) && J("1.9");
  b instanceof Q ? (d = b.x, b = b.y) : (d = b, b = c);
  a.style.left = Hd(d, g);
  a.style.top = Hd(b, g)
}
function Id(a) {
  if(Va && I) {
    var b = a.ownerDocument.defaultView;
    if(b != b.top) {
      return o
    }
  }
  return!!a.getBoundingClientRect
}
function Jd(a) {
  var b = a.getBoundingClientRect();
  G && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
  return b
}
function Kd(a) {
  if(G && !jb(8)) {
    return a.offsetParent
  }
  for(var b = S(a), c = Ed(a, "position"), d = "fixed" == c || "absolute" == c, a = a.parentNode;a && a != b;a = a.parentNode) {
    if(c = Ed(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) {
      return a
    }
  }
  return l
}
function Ld(a) {
  for(var b = new zd(0, Infinity, Infinity, 0), c = R(a), d = c.s.body, g = c.s.documentElement, f = !I && "CSS1Compat" == c.s.compatMode ? c.s.documentElement : c.s.body;a = Kd(a);) {
    if((!G || 0 != a.clientWidth) && (!I || 0 != a.clientHeight || a != d) && a != d && a != g && "visible" != Ed(a, "overflow")) {
      var k = Md(a), m;
      m = a;
      if(H && !J("1.9")) {
        var n = parseFloat(Dd(m, "borderLeftWidth"));
        if(Nd(m)) {
          var p = m.offsetWidth - m.clientWidth - n - parseFloat(Dd(m, "borderRightWidth")), n = n + p
        }
        m = new Q(n, parseFloat(Dd(m, "borderTopWidth")))
      }else {
        m = new Q(m.clientLeft, m.clientTop)
      }
      k.x += m.x;
      k.y += m.y;
      b.top = Math.max(b.top, k.y);
      b.right = Math.min(b.right, k.x + a.clientWidth);
      b.bottom = Math.min(b.bottom, k.y + a.clientHeight);
      b.left = Math.max(b.left, k.x)
    }
  }
  d = f.scrollLeft;
  f = f.scrollTop;
  b.left = Math.max(b.left, d);
  b.top = Math.max(b.top, f);
  c = Vc(c.Jb() || window);
  b.right = Math.min(b.right, d + c.width);
  b.bottom = Math.min(b.bottom, f + c.height);
  return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : l
}
function Md(a) {
  var b, c = S(a), d = Ed(a, "position"), g = H && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY), f = new Q(0, 0), k;
  b = c ? S(c) : document;
  k = G && !jb(9) && !ud(R(b)) ? b.body : b.documentElement;
  if(a == k) {
    return f
  }
  if(Id(a)) {
    b = Jd(a), a = vd(R(c)), f.x = b.left + a.x, f.y = b.top + a.y
  }else {
    if(c.getBoxObjectFor && !g) {
      b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(k), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY
    }else {
      b = a;
      do {
        f.x += b.offsetLeft;
        f.y += b.offsetTop;
        b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
        if(I && "fixed" == Fd(b)) {
          f.x += c.body.scrollLeft;
          f.y += c.body.scrollTop;
          break
        }
        b = b.offsetParent
      }while(b && b != a);
      if(Ua || I && "absolute" == d) {
        f.y -= c.body.offsetTop
      }
      for(b = a;(b = Kd(b)) && b != c.body && b != k;) {
        if(f.x -= b.scrollLeft, !Ua || "TR" != b.tagName) {
          f.y -= b.scrollTop
        }
      }
    }
  }
  return f
}
function Od(a, b, c) {
  b instanceof O ? (c = b.height, b = b.width) : c == h && e(Error("missing height argument"));
  a.style.width = Hd(b, j);
  a.style.height = Hd(c, j)
}
function Hd(a, b) {
  "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
  return a
}
function Pd(a) {
  if("none" != Ed(a, "display")) {
    return Qd(a)
  }
  var b = a.style, c = b.display, d = b.visibility, g = b.position;
  b.visibility = "hidden";
  b.position = "absolute";
  b.display = "inline";
  a = Qd(a);
  b.display = c;
  b.position = g;
  b.visibility = d;
  return a
}
function Qd(a) {
  var b = a.offsetWidth, c = a.offsetHeight, d = I && !b && !c;
  return(!da(b) || d) && a.getBoundingClientRect ? (a = Jd(a), new O(a.right - a.left, a.bottom - a.top)) : new O(b, c)
}
function Rd(a) {
  var b = Md(a), a = Pd(a);
  return new Ad(b.x, b.y, a.width, a.height)
}
function Sd(a, b) {
  var c = a.style;
  "opacity" in c ? c.opacity = b : "MozOpacity" in c ? c.MozOpacity = b : "filter" in c && (c.filter = "" === b ? "" : "alpha(opacity=" + 100 * b + ")")
}
function T(a, b) {
  a.style.display = b ? "" : "none"
}
function Nd(a) {
  return"rtl" == Ed(a, "direction")
}
var Td = H ? "MozUserSelect" : I ? "WebkitUserSelect" : l;
function Ud(a, b, c) {
  c = !c ? a.getElementsByTagName("*") : l;
  if(Td) {
    if(b = b ? "none" : "", a.style[Td] = b, c) {
      for(var a = 0, d;d = c[a];a++) {
        d.style[Td] = b
      }
    }
  }else {
    if(G || Ua) {
      if(b = b ? "on" : "", a.setAttribute("unselectable", b), c) {
        for(a = 0;d = c[a];a++) {
          d.setAttribute("unselectable", b)
        }
      }
    }
  }
}
function Vd(a) {
  return new O(a.offsetWidth, a.offsetHeight)
}
function Xd(a, b) {
  var c = ud(R(S(a)));
  if(G && (!c || !J("8"))) {
    var d = a.style;
    if(c) {
      var c = Yd(a), g = Zd(a);
      d.pixelWidth = b.width - g.left - c.left - c.right - g.right;
      d.pixelHeight = b.height - g.top - c.top - c.bottom - g.bottom
    }else {
      d.pixelWidth = b.width, d.pixelHeight = b.height
    }
  }else {
    d = a.style, H ? d.MozBoxSizing = "border-box" : I ? d.WebkitBoxSizing = "border-box" : d.boxSizing = "border-box", d.width = Math.max(b.width, 0) + "px", d.height = Math.max(b.height, 0) + "px"
  }
}
function $d(a) {
  var b = S(a), c = G && a.currentStyle;
  if(c && ud(R(b)) && "auto" != c.width && "auto" != c.height && !c.boxSizing) {
    return b = ae(a, c.width, "width", "pixelWidth"), a = ae(a, c.height, "height", "pixelHeight"), new O(b, a)
  }
  c = Vd(a);
  b = Yd(a);
  a = Zd(a);
  return new O(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
}
function ae(a, b, c, d) {
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
function be(a, b) {
  return ae(a, a.currentStyle ? a.currentStyle[b] : l, "left", "pixelLeft")
}
function Yd(a) {
  if(G) {
    var b = be(a, "paddingLeft"), c = be(a, "paddingRight"), d = be(a, "paddingTop"), a = be(a, "paddingBottom");
    return new zd(d, c, a, b)
  }
  b = Dd(a, "paddingLeft");
  c = Dd(a, "paddingRight");
  d = Dd(a, "paddingTop");
  a = Dd(a, "paddingBottom");
  return new zd(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
}
var ce = {thin:2, medium:4, thick:6};
function de(a, b) {
  if("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : l)) {
    return 0
  }
  var c = a.currentStyle ? a.currentStyle[b + "Width"] : l;
  return c in ce ? ce[c] : ae(a, c, "left", "pixelLeft")
}
function Zd(a) {
  if(G) {
    var b = de(a, "borderLeft"), c = de(a, "borderRight"), d = de(a, "borderTop"), a = de(a, "borderBottom");
    return new zd(d, c, a, b)
  }
  b = Dd(a, "borderLeftWidth");
  c = Dd(a, "borderRightWidth");
  d = Dd(a, "borderTopWidth");
  a = Dd(a, "borderBottomWidth");
  return new zd(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
}
var ee = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
function U(a) {
  this.z = o;
  this.Ob = a;
  this.B = []
}
E(U, jc);
var fe = [];
U.prototype.c = function(a, b, c, d, g) {
  ia(b) || (fe[0] = b, b = fe);
  for(var f = 0;f < b.length;f++) {
    this.B.push(wc(a, b[f], c || this, d || o, g || this.Ob || this))
  }
  return this
};
U.prototype.O = function(a, b, c, d, g) {
  if(ia(b)) {
    for(var f = 0;f < b.length;f++) {
      this.O(a, b[f], c, d, g)
    }
  }else {
    a: {
      c = c || this;
      g = g || this.Ob || this;
      d = !!d;
      if(a = Bc(a, b, d)) {
        for(b = 0;b < a.length;b++) {
          if(!a[b].Ub && a[b].pc == c && a[b].capture == d && a[b].Ld == g) {
            a = a[b];
            break a
          }
        }
      }
      a = l
    }
    a && (a = a.key, Cc(a), Cb(this.B, a))
  }
  return this
};
function ge(a) {
  L(a.B, Cc);
  a.B.length = 0
}
U.prototype.f = function() {
  U.b.f.call(this);
  ge(this)
};
U.prototype.handleEvent = function() {
  e(Error("EventHandler.handleEvent not implemented"))
};
function he() {
}
ga(he);
he.prototype.ri = 0;
he.X();
function V(a) {
  this.z = o;
  this.V = a || R();
  this.ob = ie
}
E(V, wd);
V.prototype.hi = he.X();
var ie = l, je = {Zi:"beforeshow", Vj:"show", vj:"hide", ij:"disable", oj:"enable", wj:"highlight", ck:"unhighlight", Vi:"activate", Yg:"deactivate", $g:"select", ek:"unselect", aj:"check", bk:"uncheck", Zg:"focus", Wg:"blur", OPEN:"open", cj:"close", pj:"enter", Bj:"leave", Ui:"action", Xg:"change"};
function ke(a, b) {
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
y = V.prototype;
y.Va = l;
y.m = o;
y.e = l;
y.ob = l;
y.mf = l;
y.r = l;
y.w = l;
y.ja = l;
y.Tg = o;
function le(a) {
  return a.Va || (a.Va = ":" + (a.hi.ri++).toString(36))
}
function me(a, b) {
  if(a.r && a.r.ja) {
    var c = a.r.ja, d = a.Va;
    d in c && delete c[d];
    sb(a.r.ja, b, a)
  }
  a.Va = b
}
y.a = t("e");
y.o = function() {
  return this.Kb || (this.Kb = new U(this))
};
function ne(a, b) {
  a == b && e(Error("Unable to set parent component"));
  b && a.r && a.Va && oe(a.r, a.Va) && a.r != b && e(Error("Unable to set parent component"));
  a.r = b;
  V.b.vf.call(a, b)
}
y.getParent = t("r");
y.vf = function(a) {
  this.r && this.r != a && e(Error("Method not supported"));
  V.b.vf.call(this, a)
};
y.g = t("V");
y.d = function() {
  this.e = this.V.createElement("div")
};
y.ua = function(a) {
  pe(this, a)
};
function pe(a, b, c) {
  a.m && e(Error("Component already rendered"));
  a.e || a.d();
  b ? b.insertBefore(a.e, c || l) : a.V.s.body.appendChild(a.e);
  (!a.r || a.r.m) && a.h()
}
y.t = function(a) {
  this.m && e(Error("Component already rendered"));
  if(a && this.ia(a)) {
    this.Tg = j;
    if(!this.V || this.V.s != S(a)) {
      this.V = R(a)
    }
    this.u(a);
    this.h()
  }else {
    e(Error("Invalid element to decorate"))
  }
};
y.ia = w(j);
y.u = aa("e");
y.h = function() {
  this.m = j;
  this.Hb(function(a) {
    !a.m && a.a() && a.h()
  })
};
y.W = function() {
  this.Hb(function(a) {
    a.m && a.W()
  });
  this.Kb && ge(this.Kb);
  this.m = o
};
y.f = function() {
  V.b.f.call(this);
  this.m && this.W();
  this.Kb && (this.Kb.N(), delete this.Kb);
  this.Hb(function(a) {
    a.N()
  });
  !this.Tg && this.e && fd(this.e);
  this.r = this.mf = this.e = this.ja = this.w = l
};
y.cc = function(a, b) {
  this.Be(a, qe(this), b)
};
y.Be = function(a, b, c) {
  a.m && (c || !this.m) && e(Error("Component already rendered"));
  (0 > b || b > qe(this)) && e(Error("Child component index out of bounds"));
  if(!this.ja || !this.w) {
    this.ja = {}, this.w = []
  }
  a.getParent() == this ? (this.ja[le(a)] = a, Cb(this.w, a)) : sb(this.ja, le(a), a);
  ne(a, this);
  Gb(this.w, b, 0, a);
  a.m && this.m && a.getParent() == this ? (c = this.D(), c.insertBefore(a.a(), c.childNodes[b] || l)) : c ? (this.e || this.d(), b = re(this, b + 1), pe(a, this.D(), b ? b.e : l)) : this.m && !a.m && a.e && a.e.parentNode && a.h()
};
y.D = t("e");
function se(a) {
  a.ob == l && (a.ob = Nd(a.m ? a.e : a.V.s.body));
  return a.ob
}
y.vc = function(a) {
  this.m && e(Error("Component already rendered"));
  this.ob = a
};
function qe(a) {
  return a.w ? a.w.length : 0
}
function oe(a, b) {
  return a.ja && b ? (b in a.ja ? a.ja[b] : h) || l : l
}
function re(a, b) {
  return a.w ? a.w[b] || l : l
}
y.Hb = function(a, b) {
  this.w && L(this.w, a, b)
};
function te(a, b) {
  return a.w && b ? vb(a.w, b) : -1
}
y.removeChild = function(a, b) {
  if(a) {
    var c = B(a) ? a : le(a), a = oe(this, c);
    if(c && a) {
      var d = this.ja;
      c in d && delete d[c];
      Cb(this.w, a);
      b && (a.W(), a.e && fd(a.e));
      ne(a, l)
    }
  }
  a || e(Error("Child is not in parent component"));
  return a
};
var ue = {};
function ve(a, b, c) {
  this.Eh = new xd;
  this.nd = a;
  this.Ea = b;
  V.call(this, c)
}
E(ve, V);
ve.prototype.d = function() {
  var a = this.g(), b = a.d("div", we), c = a.d("div", xe);
  this.e = a.d("div", ye, b, c);
  this.qh = b;
  this.Kf = c;
  this.nd.a() || this.nd.d();
  this.Ea.a() || this.Ea.d();
  a.appendChild(this.qh, this.nd.a());
  a.appendChild(this.Kf, this.Ea.a())
};
ve.prototype.h = function() {
  ve.b.h.call(this);
  this.nd.h();
  this.Ea.h();
  var a = this.g();
  this.o().c(a.Jb(), "resize", this.mb);
  this.mb()
};
ve.prototype.mb = function() {
  var a = this.Eh.Se();
  Bd(this.Ea.a(), {height:a.height - Rd(this.Ea.a()).top + "px", width:a.width + "px"});
  this.Ea.mb(Vd(this.Kf))
};
var ye = "synthjs-sdkoscillator", we = "synthjs-sdkoscillator-menu-container", xe = "synthjs-sdkoscillator-workspace-container";
/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function ze(a, b) {
  this.gb = [];
  this.fg = a;
  this.Le = b || l
}
y = ze.prototype;
y.Ha = o;
y.ib = o;
y.La = 0;
y.yf = o;
y.Je = o;
y.dc = 0;
y.cancel = function(a) {
  if(this.Ha) {
    this.va instanceof ze && this.va.cancel()
  }else {
    if(this.r) {
      var b = this.r;
      delete this.r;
      a ? b.cancel(a) : (b.dc--, 0 >= b.dc && b.cancel())
    }
    this.fg ? this.fg.call(this.Le, this) : this.yf = j;
    this.Ha || this.Oc(new Ae)
  }
};
y.Db = function(a, b) {
  Be(this, a, b);
  this.La--;
  0 == this.La && this.Ha && this.Fd()
};
function Be(a, b, c) {
  a.Ha = j;
  a.va = c;
  a.ib = !b;
  a.Fd()
}
function Ce(a) {
  a.Ha && (a.yf || e(new De), a.yf = o)
}
y.F = function(a) {
  Ce(this);
  Be(this, j, a)
};
y.Oc = function(a) {
  Ce(this);
  Be(this, o, a)
};
function Ee(a, b, c) {
  return Fe(a, b, l, c)
}
function Fe(a, b, c, d) {
  a.gb.push([b, c, d]);
  a.Ha && a.Fd();
  return a
}
function Ge(a, b) {
  Fe(a, b.F, b.Oc, b)
}
function He(a, b) {
  return Ee(a, C(b.cg, b))
}
y.cg = function(a) {
  var b = new ze;
  Ge(this, b);
  a && (b.r = this, this.dc++);
  return b
};
y.Sc = function() {
  return yb(this.gb, function(a) {
    return na(a[1])
  })
};
y.Fd = function() {
  this.yc && this.Ha && this.Sc() && (z.clearTimeout(this.yc), delete this.yc);
  this.r && (this.r.dc--, delete this.r);
  for(var a = this.va, b = o, c = o;this.gb.length && 0 == this.La;) {
    var d = this.gb.shift(), g = d[0], f = d[1], d = d[2];
    if(g = this.ib ? f : g) {
      try {
        var k = g.call(d || this.Le, a);
        da(k) && (this.ib = this.ib && (k == a || k instanceof Error), this.va = a = k);
        a instanceof ze && (c = j, this.La++)
      }catch(m) {
        a = m, this.ib = j, this.Sc() || (b = j)
      }
    }
  }
  this.va = a;
  c && this.La && (Fe(a, C(this.Db, this, j), C(this.Db, this, o)), a.Je = j);
  b && (this.yc = z.setTimeout(function() {
    e(new Ie(a))
  }, 0))
};
function De() {
  kb.call(this)
}
E(De, kb);
De.prototype.message = "Already called";
function Ae() {
  kb.call(this)
}
E(Ae, kb);
Ae.prototype.message = "Deferred was cancelled";
function Ie(a) {
  kb.call(this);
  this.message = "Unhandled Error in Deferred: " + (a.message || "[No message]")
}
E(Ie, kb);
function Je() {
  ze.call(this)
}
E(Je, ze);
function Ke(a, b) {
  a.gb.push([b, l, l]);
  return a
}
Je.prototype.Sc = function() {
  return yb(this.gb, function(a) {
    return a[0] instanceof ze ? a[0].Sc() : na(a[1])
  })
};
Je.prototype.Fd = function() {
  this.yc && this.Ha && this.Sc() && (z.clearTimeout(this.yc), delete this.yc);
  this.r && (this.r.dc--, delete this.r);
  for(var a = this.va, b = o;this.gb.length && 0 == this.La;) {
    var c = this.gb.shift();
    if(c[0] instanceof ze) {
      c[0].Ha ? c[0].Db(j, this.va) : c[0].F(this.va), this.va = a = c[0].va, c[0].La && (a.Je = o, Fe(a, C(c[0].Db, c[0], j), C(c[0].Db, c[0], o)), b = j, this.La++)
    }else {
      var d = c[0], g = c[1], c = c[2];
      if(d = this.ib ? g : d) {
        d = d.call(c || this.Le, a), da(d) && (this.ib = this.ib && (d == a || d instanceof Error), this.va = a = d), a instanceof ze && (b = j, this.La++)
      }
    }
  }
  this.va = a;
  b && this.La && (Fe(a, C(this.Db, this, j), C(this.Db, this, o)), a.Je = j)
};
Je.prototype.cg = function(a) {
  var b = new Je;
  b.name = "branch";
  Ge(this, b);
  a && (b.r = this, this.dc++);
  return b
};
function Le(a) {
  return Me(a || arguments.callee.caller, [])
}
function Me(a, b) {
  var c = [];
  if(M(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && 50 > b.length) {
      c.push(Ne(a) + "(");
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
            f = (f = Ne(f)) ? f : "[fn]";
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
        c.push(Me(a.caller, b))
      }catch(k) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
}
function Ne(a) {
  if(Oe[a]) {
    return Oe[a]
  }
  a = "" + a;
  if(!Oe[a]) {
    var b = /function ([^\(]+)/.exec(a);
    Oe[a] = b ? b[1] : "[Anonymous]"
  }
  return Oe[a]
}
var Oe = {};
function Pe(a, b, c, d, g) {
  this.reset(a, b, c, d, g)
}
Pe.prototype.kg = l;
Pe.prototype.jg = l;
var Qe = 0;
Pe.prototype.reset = function(a, b, c, d, g) {
  "number" == typeof g || Qe++;
  d || va();
  this.Xc = a;
  this.pi = b;
  delete this.kg;
  delete this.jg
};
Pe.prototype.ge = aa("Xc");
function Re(a) {
  this.qi = a
}
Re.prototype.r = l;
Re.prototype.Xc = l;
Re.prototype.w = l;
Re.prototype.ug = l;
function Se(a, b) {
  this.name = a;
  this.value = b
}
Se.prototype.toString = t("name");
var Te = new Se("SEVERE", 1E3), Ue = new Se("WARNING", 900), Ve = new Se("CONFIG", 700), We = new Se("FINE", 500), Xe = new Se("ALL", 0);
y = Re.prototype;
y.getParent = t("r");
y.ng = function() {
  this.w || (this.w = {});
  return this.w
};
y.ge = aa("Xc");
function Ye(a) {
  if(a.Xc) {
    return a.Xc
  }
  if(a.r) {
    return Ye(a.r)
  }
  mb("Root logger has no level set.");
  return l
}
y.log = function(a, b, c) {
  if(a.value >= Ye(this).value) {
    a = this.Sh(a, b, c);
    b = "log:" + a.pi;
    z.console && (z.console.timeStamp ? z.console.timeStamp(b) : z.console.markTimeline && z.console.markTimeline(b));
    z.msWriteProfilerMark && z.msWriteProfilerMark(b);
    for(b = this;b;) {
      var c = b, d = a;
      if(c.ug) {
        for(var g = 0, f = h;f = c.ug[g];g++) {
          f(d)
        }
      }
      b = b.getParent()
    }
  }
};
y.Sh = function(a, b, c) {
  var d = new Pe(a, "" + b, this.qi);
  if(c) {
    d.kg = c;
    var g;
    var f = arguments.callee.caller;
    try {
      var k;
      var m = ea("window.location.href");
      if(B(c)) {
        k = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:m, stack:"Not available"}
      }else {
        var n, p, q = o;
        try {
          n = c.lineNumber || c.sk || "Not available"
        }catch(r) {
          n = "Not available", q = j
        }
        try {
          p = c.fileName || c.filename || c.sourceURL || m
        }catch(D) {
          p = "Not available", q = j
        }
        k = q || !c.lineNumber || !c.fileName || !c.stack ? {message:c.message, name:c.name, lineNumber:n, fileName:p, stack:c.stack || "Not available"} : c
      }
      g = "Message: " + Ba(k.message) + '\nUrl: <a href="view-source:' + k.fileName + '" target="_new">' + k.fileName + "</a>\nLine: " + k.lineNumber + "\n\nBrowser stack:\n" + Ba(k.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + Ba(Le(f) + "-> ")
    }catch(v) {
      g = "Exception trying to expose exception! You win, we lose. " + v
    }
    d.jg = g
  }
  return d
};
function W(a, b) {
  a.log(We, b, h)
}
var Ze = {}, $e = l;
function af(a) {
  $e || ($e = new Re(""), Ze[""] = $e, $e.ge(Ve));
  var b;
  if(!(b = Ze[a])) {
    b = new Re(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = af(a.substr(0, c));
    c.ng()[d] = b;
    b.r = c;
    Ze[a] = b
  }
  return b
}
;function bf() {
  this.z = o;
  this.Wb = [];
  this.dd = {}
}
E(bf, jc);
y = bf.prototype;
y.ae = 0;
y.Qi = function(a) {
  if(0 != this.ae) {
    this.Yc || (this.Yc = []), this.Yc.push(a)
  }else {
    var b = this.Wb[a];
    b && ((b = this.dd[b]) && Cb(b, a), delete this.Wb[a], delete this.Wb[a + 1], delete this.Wb[a + 2])
  }
};
y.Lg = function(a, b) {
  var c = this.dd[a];
  if(c) {
    this.ae++;
    for(var d = Hb(arguments, 1), g = 0, f = c.length;g < f;g++) {
      var k = c[g];
      this.Wb[k + 1].apply(this.Wb[k + 2], d)
    }
    this.ae--;
    if(this.Yc && 0 == this.ae) {
      for(;c = this.Yc.pop();) {
        this.Qi(c)
      }
    }
  }
};
y.Id = function(a) {
  if(a) {
    var b = this.dd[a];
    return b ? b.length : 0
  }
  a = 0;
  for(b in this.dd) {
    a += this.Id(b)
  }
  return a
};
y.f = function() {
  bf.b.f.call(this);
  delete this.Wb;
  delete this.dd;
  delete this.Yc
};
function cf() {
  this.eb = 48E3;
  this.Yf = new bf;
  this.Rf = "function" == typeof webkitAudioContext;
  this.re = o;
  "function" == typeof Audio && (this.re = "function" == typeof(new Audio).mozSetup);
  this.Cc = {};
  this.jh = 0;
  this.Fc = "stop"
}
ga(cf);
af("synthjs.audiocore.Player").ge(Xe);
function df(a, b) {
  console.trace();
  ob(a.Cc, function(a, d) {
    b == a && delete this.Cc[d]
  }, a)
}
cf.prototype.play = function() {
  "play" == this.Fc && this.stop();
  if(this.re) {
    return this.Fc = "play", ef(this)
  }
  return this.Rf ? (this.Fc = "play", ff(this)) : o
};
cf.prototype.stop = function() {
  if(this.re) {
    return this.Yf.Lg("finish"), this.Fc = "stop", clearInterval(this.ah), j
  }
  return this.Rf ? (this.Yf.Lg("finish"), this.Fc = "stop", this.ne.disconnect(), j) : o
};
cf.prototype.ic = function() {
  var a = j;
  ob(this.Cc, function(b) {
    a = a && b.ic()
  });
  return a
};
function gf(a, b) {
  var c = [];
  ob(a.Cc, function(a) {
    a.ic() || c.push(a.Qe(b))
  });
  var d = new ze;
  return He(Ee(new ze, function() {
    Ge(Ee(new hf(c), function(a) {
      var c = new Float32Array(b), d = new Float32Array(b);
      a && L(a, function(a) {
        for(var g = 0;g < b;g++) {
          c[g] += a[1].Wc[g], d[g] += a[1].ad[g]
        }
      });
      a = h;
      return{Wc:c, ad:d}
    }), d);
    L(c, function(a) {
      a.F()
    })
  }), d)
}
function ff(a) {
  a.me || (a.me = new webkitAudioContext, a.ne = a.me.createJavaScriptNode(2048, 1, 2));
  a.ne.onaudioprocess = function(b) {
    function c(a, b) {
      for(;2048 > f;) {
        d[f] = a[f], g[f] = b[f], f++
      }
    }
    var d = b.outputBuffer.getChannelData(0), g = b.outputBuffer.getChannelData(1), f = 0;
    if(a.ic()) {
      setTimeout(function() {
        a.stop()
      }, 100), b = new Float32Array(2048), c(b, b)
    }else {
      var k = Ee(gf(a, 2048), function(a) {
        c(a.Wc, a.ad);
        k = h
      });
      k.F()
    }
  };
  a.ne.connect(a.me.destination);
  return j
}
function ef(a) {
  var b = new Audio, c = 0, d = a.eb / 4, g;
  b.mozSetup(1, a.eb);
  a.ah = setInterval(function() {
    if(a.ic()) {
      a.stop()
    }else {
      var f;
      g && (totaltail += g.length, f = b.mozWriteAudio(g), c += f, g = l);
      var k = b.mozCurrentSampleOffset() + d - c;
      if(0 < k && !a.ic()) {
        var m = 8192 <= k ? 8192 : k;
        Ee(gf(a, m), function(a) {
          for(var d = a.Wc, a = a.ad, k = new Float32Array(2 * d.length), r = 0;r < d.length;r++) {
            k[2 * r] = d[r], k[2 * r + 1] = a[r]
          }
          f = b.mozWriteAudio(d);
          f < m && (g = soundData.subarray(f));
          c += f
        }).F()
      }
    }
  }, 100);
  return j
}
;function jf(a) {
  this.ye = a;
  a = this.Of();
  this.Ea || (this.Ae || (this.Ae = new kf), this.Ea = this.Ae);
  this.Bh = new ve(a, this.Ea);
  this.Bh.ua(B(this.ye) ? document.getElementById(this.ye) : this.ye);
  this.Hf()
}
jf.prototype.Hf = s();
jf.prototype.o = function() {
  return this.Y || (this.Y = new U(this))
};
function nf(a, b, c) {
  V.call(this, c);
  this.Y = new U;
  this.nh = a
}
E(nf, V);
nf.prototype.ya = function(a) {
  return this.constructor == a.constructor
};
nf.prototype.be = s();
function of() {
}
ga(of);
of.prototype.t = function(a, b, c, d) {
  var g = C(d.d, d), f = g("div"), k = g("div"), m = c, n = 1, p, q;
  P(a, "keybord-wrapper");
  Bd(a, "position", "relative");
  P(f, "white-keybord");
  for(P(k, "black-keybord");m.ea >= b.ea;) {
    q = g("div"), d.Ni(q, {"data-note":m.getString()}), m.ki ? (m.ea == c.ea && -1 !== "cdfga".indexOf(m.Z, 0) ? (p = 9, P(q, "edge_short")) : m.ea == b.ea && -1 !== "degab".indexOf(m.Z, 0) ? (p = 9, P(q, "edge_short")) : -1 !== "dga".indexOf(m.Z, 0) ? (p = 19, P(q, "long")) : (p = 14, P(q, "short")), f.appendChild(q), n += p + 1) : (Bd(q, {position:"absolute", top:n - 5 - 1 + "px"}), k.appendChild(q)), m.ea === c.ea && P(q, "top"), P(q, "keybord-key"), m.ea === c.ea && P(q, "first-key"), q = p = 
    h, "c" === m.Z ? (p = m.jf - 1, q = "b") : (p = m.jf, q = pf[vb(pf, m.Z) - 1]), m = new qf(q, p, m.bg)
  }
  a.appendChild(f);
  a.appendChild(k)
};
function qf(a, b, c) {
  this.bg = c ? c : 440;
  rf[a] && (a = rf[a]);
  Ab(pf, function(b) {
    return b == a
  }) || e(Error("Can't create Note because of invalid parameters: " + a));
  this.Z = a;
  this.jf = b;
  this.ea = this.bg * Math.pow(2, vb(pf, a) / 12 + b);
  this.ki = /^[a-g]$/.test(a)
}
qf.prototype.ya = function(a) {
  return a.ea === this.ea
};
function sf(a) {
  a = new qf("c", a, h);
  return a.Z ? a : o
}
qf.prototype.getString = function() {
  return this.jf + "|" + this.Z
};
var rf = {"d-":"c+", "e-":"d+", "g-":"f+", "a-":"g+", "b-":"a+"}, pf = "c,c+,d,d+,e,f,f+,g,g+,a,a+,b".split(",");
function tf(a, b, c, d) {
  this.ph = a;
  this.kh = b;
  this.cb = this.bb = l;
  this.md = o;
  this.xe = l;
  this.Ah = c ? c : ue.fk.X();
  this.Y = new U;
  V.call(this, d)
}
E(tf, V);
y = tf.prototype;
y.u = function(a) {
  tf.b.u.call(this, a);
  this.Ah.t(a, this.ph, this.kh, this.g())
};
y.h = function() {
  tf.b.h.call(this);
  this.Y.c(this.a(), ["mousedown", "mousemove"], this.si, o, this);
  this.Y.c(this.a(), ["mouseup"], this.vi, o, this);
  this.Y.c(this.a(), ["mouseout"], this.xi, o, this)
};
y.xi = function(a) {
  if(a.relatedTarget && !hd(this.a(), a.relatedTarget) || a.relatedTarget == this.a()) {
    this.bb && uf(this, this.bb.dataset.note, vf), this.bb = l, this.cb && Kc(this.cb, "mouseover"), this.cb = l, this.md = o
  }
};
y.vi = function(a) {
  a.preventDefault();
  this.md = o;
  this.bb = l;
  a.target.dataset.note && uf(this, a.target.dataset.note, vf)
};
y.si = function(a) {
  a.preventDefault();
  "mousedown" == a.type && (this.md = j);
  a.target.dataset.note && (this.md && this.bb != a.target && (this.bb && uf(this, this.bb.dataset.note, vf), uf(this, a.target.dataset.note, wf), this.bb = a.target), this.cb != a.target && (this.cb && Kc(this.cb, "mouseover"), this.cb = a.target, P(this.cb, "mouseover")))
};
function uf(a, b, c) {
  a.xe && c == wf && uf(a, a.xe, vf);
  var d = event = new N(c), g = b.indexOf("|"), f = b.slice(0, g), g = b.slice(g + 1);
  (f = new qf(g, parseInt(f), h)) || e(Error("invalid strings"));
  d.Z = f.Z ? f : o;
  a.dispatchEvent(event);
  c == wf && (a.xe = b)
}
var wf = "keyboard-on", vf = "keyboard-off";
function xf(a, b, c, d) {
  this.Fa = a;
  this.Oa = b;
  nf.call(this, "debug", 0, d)
}
E(xf, nf);
xf.prototype.f = function() {
  this.Fa.N();
  this.Fa = l;
  this.Oa.N();
  this.Oa = l
};
xf.prototype.u = function(a) {
  xf.b.u.call(this, a);
  var b = this.g();
  this.te = b.d("div", "window-oscillator-keyboard");
  this.we = b.d("div", "window-oscillator-oscillator");
  this.Fa.t(this.te);
  this.Oa && this.Oa.t(this.we);
  b.append(a, this.te);
  b.append(a, this.we)
};
xf.prototype.be = function() {
  this.g();
  var a = Vd(this.te), b = $d(this.a());
  Bd(this.we, {width:b.width - a.width + "px"});
  this.Oa && this.Oa.be()
};
function yf() {
  this.z = o
}
E(yf, wd);
yf.prototype.o = function() {
  return this.Y || (this.Y = new U(this))
};
yf.prototype.f = function() {
  yf.b.f.call(this);
  this.Kb && (this.Y.N(), delete this.Y)
};
function zf(a) {
  this.zb = a;
  this.yi = C(function(a) {
    a.data.callback ? (this.yb[a.data.callback] ? (this.yb[a.data.callback].F(a.data), delete this.yb[a.data.callback]) : e(Error("invalid callback name")), this.Nf[a.data.callback] && delete this.Nf[a.data.callback]) : console.log(a.data)
  }, this);
  C(function(a) {
    a.data.callback && (this.yb[a.data.callback] ? (this.yb[a.data.callback].F(a.data), delete this.yb[a.data.callback]) : e(Error("invalid callback name")))
  }, this);
  this.yb = {};
  this.Nf = {};
  this.zb.addEventListener("message", this.yi)
}
zf.prototype.create = function(a) {
  var a = a || {}, b = (65536 * (1 + Math.random()) | 0).toString(16).substring(1) + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1) + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1) + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1), c = new Je, d = He(Ee(new Je, C(function(c) {
    na(a) ? (c = a(c), c.callback = b, this.zb.postMessage(c)) : (a.callback = b, this.zb.postMessage(a))
  }, this)), c);
  this.yb[b] = c;
  return d
};
function Af(a, b) {
  this.z = o;
  this.Dh = a;
  this.eb = b && b.de ? b.de : 48E3;
  (!b || !b.de) && console.log("wavePlugin set default sample rate: 48000");
  this.se = o;
  this.zb = new Worker(a);
  this.rd = new zf(this.zb);
  this.Bc = C(function(a) {
    var b = new N(Bf);
    b.error = a;
    this.dispatchEvent(b)
  }, this);
  this.zb.addEventListener("error", this.Bc);
  this.o().c(document, "error", this.Bc, o, this)
}
E(Af, yf);
Af.prototype.f = function() {
  Af.b.f.call(this);
  this.zb.removeEventListener("error", this.Bc);
  this.Y.N()
};
Af.prototype.M = function() {
  return new Af(this.Dh, {de:this.eb})
};
function Cf(a) {
  a.se = j;
  return Ee(a.rd.create({action:"init", initParams:{sampleRate:a.eb}}), function(b) {
    a.dispatchEvent(new N(Df, b));
    return b
  })
}
function Ef(a, b) {
  var c = a.rd.create({action:"addEvent", event:b});
  return a.se ? c : Ke(Cf(a), c)
}
Af.prototype.Qe = function(a) {
  var b = this.rd.create({action:"getBuffer", length:a}, {error:function() {
    console.log("GET BUFFER ERROR");
    return{Wc:new Float32Array(a), ad:new Float32Array(a)}
  }});
  return Ee(this.se ? b : Ke(Cf(this), b), function(a) {
    return{Wc:a.leftBuffer, ad:a.rightBuffer}
  })
};
function Ff(a, b, c) {
  return a.rd.create({action:"setParam", name:b, value:c}, {error:s()})
}
function Gf(a, b) {
  this.type = a;
  if(a == Hf || a == If) {
    if(b.Z.constructor != qf || b.Ff) {
      this.note = {freq:b.Z.ea}
    }
    this.velocity = b.Ff
  }
}
var Hf = "noteon", If = "noteoff", Bf = "waveplugin_error", Df = "waveplugin_init";
function Jf(a, b) {
  a || e(Error("Invalid class name " + a));
  na(b) || e(Error("Invalid decorator function " + b));
  Kf[a] = b
}
var Lf = {}, Kf = {};
function Mf(a, b) {
  a.setAttribute("role", b)
}
function Nf(a, b, c) {
  a.setAttribute("aria-" + b, c)
}
;function Of() {
}
var Pf;
ga(Of);
y = Of.prototype;
y.Aa = s();
y.d = function(a) {
  var b = a.g().d("div", this.jc(a).join(" "), a.Q);
  this.ee(a, b);
  return b
};
y.D = function(a) {
  return a
};
y.Nc = function(a, b, c) {
  if(a = a.a ? a.a() : a) {
    if(G && !J("7")) {
      var d = Qf(Jc(a), b);
      d.push(b);
      ua(c ? P : Kc, a).apply(l, d)
    }else {
      c ? P(a, b) : Kc(a, b)
    }
  }
};
y.ia = w(j);
y.t = function(a, b) {
  b.id && me(a, b.id);
  var c = this.D(b);
  c && c.firstChild ? Rf(a, c.firstChild.nextSibling ? Fb(c.childNodes) : c.firstChild) : a.Q = l;
  var d = 0, g = this.l(), f = this.l(), k = o, m = o, c = o, n = Jc(b);
  L(n, function(a) {
    !k && a == g ? (k = j, f == g && (m = j)) : !m && a == f ? m = j : d |= this.Te(a)
  }, this);
  a.tb = d;
  k || (n.push(g), f == g && (m = j));
  m || n.push(f);
  var p = a.za;
  p && n.push.apply(n, p);
  if(G && !J("7")) {
    var q = Qf(n);
    0 < q.length && (n.push.apply(n, q), c = j)
  }
  if(!k || !m || p || c) {
    b.className = n.join(" ")
  }
  this.ee(a, b);
  return b
};
y.nc = function(a) {
  se(a) && this.vc(a.a(), j);
  a.isEnabled() && this.sb(a, a.p)
};
y.ee = function(a, b) {
  a.isEnabled() || this.ca(b, 1, j);
  X(a, 8) && this.ca(b, 8, j);
  a.C & 16 && this.ca(b, 16, X(a, 16));
  a.C & 64 && this.ca(b, 64, X(a, 64))
};
y.bd = function(a, b) {
  Ud(a, !b, !G && !Ua)
};
y.vc = function(a, b) {
  this.Nc(a, this.l() + "-rtl", b)
};
y.jb = function(a) {
  var b;
  return a.C & 32 && (b = a.H()) ? nd(b) : o
};
y.sb = function(a, b) {
  var c;
  if(a.C & 32 && (c = a.H())) {
    if(!b && X(a, 32)) {
      try {
        c.blur()
      }catch(d) {
      }
      X(a, 32) && a.Lb(l)
    }
    nd(c) != b && od(c, b)
  }
};
y.v = function(a, b) {
  T(a, b)
};
y.ha = function(a, b, c) {
  var d = a.a();
  if(d) {
    var g = this.Pc(b);
    g && this.Nc(a, g, c);
    this.ca(d, b, c)
  }
};
y.ca = function(a, b, c) {
  Pf || (Pf = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  (b = Pf[b]) && Nf(a, b, c)
};
y.qb = function(a, b) {
  var c = this.D(a);
  if(c && (ed(c), b)) {
    if(B(b)) {
      id(c, b)
    }else {
      var d = function(a) {
        if(a) {
          var b = S(c);
          c.appendChild(B(a) ? b.createTextNode(a) : a)
        }
      };
      ia(b) ? L(b, d) : ja(b) && !("nodeType" in b) ? L(Fb(b), d) : d(b)
    }
  }
};
y.H = function(a) {
  return a.a()
};
y.l = w("goog-control");
y.jc = function(a) {
  var b = this.l(), c = [b], d = this.l();
  d != b && c.push(d);
  b = a.tb;
  for(d = [];b;) {
    var g = b & -b;
    d.push(this.Pc(g));
    b &= ~g
  }
  c.push.apply(c, d);
  (a = a.za) && c.push.apply(c, a);
  G && !J("7") && c.push.apply(c, Qf(c));
  return c
};
function Qf(a, b) {
  var c = [];
  b && (a = a.concat([b]));
  L([], function(d) {
    zb(d, ua(M, a)) && (!b || M(d, b)) && c.push(d.join("_"))
  });
  return c
}
y.Pc = function(a) {
  this.zd || Sf(this);
  return this.zd[a]
};
y.Te = function(a) {
  if(!this.Qg) {
    this.zd || Sf(this);
    var b = this.zd, c = {}, d;
    for(d in b) {
      c[b[d]] = d
    }
    this.Qg = c
  }
  a = parseInt(this.Qg[a], 10);
  return isNaN(a) ? 0 : a
};
function Sf(a) {
  var b = a.l();
  a.zd = {1:b + "-disabled", 2:b + "-hover", 4:b + "-active", 8:b + "-selected", 16:b + "-checked", 32:b + "-focused", 64:b + "-open"}
}
;function Tf() {
}
E(Tf, Of);
ga(Tf);
Tf.prototype.d = function(a) {
  return a.g().d("div", this.l())
};
Tf.prototype.t = function(a, b) {
  b.id && me(a, b.id);
  if("HR" == b.tagName) {
    var c = b, b = this.d(a);
    c.parentNode && c.parentNode.insertBefore(b, c);
    fd(c)
  }else {
    P(b, this.l())
  }
  return b
};
Tf.prototype.qb = s();
Tf.prototype.l = w("goog-menuseparator");
function Uf(a, b, c, d, g) {
  if(!G && (!I || !J("525"))) {
    return j
  }
  if(Oa && g) {
    return Vf(a)
  }
  if(g && !d || !c && (17 == b || 18 == b) || G && d && b == a) {
    return o
  }
  switch(a) {
    case 13:
      return!(G && jb(9));
    case 27:
      return!I
  }
  return Vf(a)
}
function Vf(a) {
  if(48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || I && 0 == a) {
    return j
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
      return j;
    default:
      return o
  }
}
function Wf(a) {
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
;function Xf(a, b) {
  this.z = o;
  a && Yf(this, a, b)
}
E(Xf, wd);
y = Xf.prototype;
y.e = l;
y.Od = l;
y.df = l;
y.Pd = l;
y.lb = -1;
y.kb = -1;
var Zf = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, $f = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, ag = G || 
I && J("525");
y = Xf.prototype;
y.$h = function(a) {
  if(I && (17 == this.lb && !a.ctrlKey || 18 == this.lb && !a.altKey)) {
    this.kb = this.lb = -1
  }
  ag && !Uf(a.keyCode, this.lb, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : this.kb = H ? Wf(a.keyCode) : a.keyCode
};
y.ai = function() {
  this.kb = this.lb = -1
};
y.handleEvent = function(a) {
  var b = a.$, c, d;
  G && "keypress" == a.type ? (c = this.kb, d = 13 != c && 27 != c ? b.keyCode : 0) : I && "keypress" == a.type ? (c = this.kb, d = 0 <= b.charCode && 63232 > b.charCode && Vf(c) ? b.charCode : 0) : Ua ? (c = this.kb, d = Vf(c) ? b.keyCode : 0) : (c = b.keyCode || this.kb, d = b.charCode || 0, Oa && 63 == d && 224 == c && (c = 191));
  var g = c, f = b.keyIdentifier;
  c ? 63232 <= c && c in Zf ? g = Zf[c] : 25 == c && a.shiftKey && (g = 9) : f && f in $f && (g = $f[f]);
  a = g == this.lb;
  this.lb = g;
  this.dispatchEvent(new bg(g, d, a, b))
};
y.a = t("e");
function Yf(a, b, c) {
  a.Pd && a.detach();
  a.e = b;
  a.Od = wc(a.e, "keypress", a, c);
  a.df = wc(a.e, "keydown", a.$h, c, a);
  a.Pd = wc(a.e, "keyup", a.ai, c, a)
}
y.detach = function() {
  this.Od && (Cc(this.Od), Cc(this.df), Cc(this.Pd), this.Pd = this.df = this.Od = l);
  this.e = l;
  this.kb = this.lb = -1
};
y.f = function() {
  Xf.b.f.call(this);
  this.detach()
};
function bg(a, b, c, d) {
  d && this.Wa(d, h);
  this.type = "key";
  this.keyCode = a;
  this.charCode = b;
  this.repeat = c
}
E(bg, pc);
function Z(a, b, c) {
  V.call(this, c);
  if(!b) {
    for(var b = this.constructor, d;b;) {
      d = pa(b);
      if(d = Lf[d]) {
        break
      }
      b = b.b ? b.b.constructor : l
    }
    b = d ? na(d.X) ? d.X() : new d : l
  }
  this.j = b;
  this.Q = a
}
E(Z, V);
y = Z.prototype;
y.Q = l;
y.tb = 0;
y.C = 39;
y.Fe = 255;
y.Za = 0;
y.p = j;
y.za = l;
y.Ze = j;
y.ud = o;
y.Zc = l;
function cg(a, b) {
  a.m && b != a.Ze && dg(a, b);
  a.Ze = b
}
y.H = function() {
  return this.j.H(this)
};
y.Jd = function() {
  return this.na || (this.na = new Xf)
};
y.Nc = function(a, b) {
  b ? a && (this.za ? M(this.za, a) || this.za.push(a) : this.za = [a], this.j.Nc(this, a, j)) : a && this.za && (Cb(this.za, a), 0 == this.za.length && (this.za = l), this.j.Nc(this, a, o))
};
y.d = function() {
  var a = this.j.d(this);
  this.e = a;
  var b = this.Zc || this.j.Aa();
  b && Mf(a, b);
  this.ud || this.j.bd(a, o);
  this.p || this.j.v(a, o)
};
y.D = function() {
  return this.j.D(this.a())
};
y.ia = function(a) {
  return this.j.ia(a)
};
y.u = function(a) {
  this.e = a = this.j.t(this, a);
  var b = this.Zc || this.j.Aa();
  b && Mf(a, b);
  this.ud || this.j.bd(a, o);
  this.p = "none" != a.style.display
};
y.h = function() {
  Z.b.h.call(this);
  this.j.nc(this);
  if(this.C & -2 && (this.Ze && dg(this, j), this.C & 32)) {
    var a = this.H();
    if(a) {
      var b = this.Jd();
      Yf(b, a);
      this.o().c(b, "key", this.Ja).c(a, "focus", this.Kd).c(a, "blur", this.Lb)
    }
  }
};
function dg(a, b) {
  var c = a.o(), d = a.a();
  b ? (c.c(d, "mouseover", a.af).c(d, "mousedown", a.Mb).c(d, "mouseup", a.Nb).c(d, "mouseout", a.$e), a.Rc != fa && c.c(d, "contextmenu", a.Rc), G && c.c(d, "dblclick", a.tg)) : (c.O(d, "mouseover", a.af).O(d, "mousedown", a.Mb).O(d, "mouseup", a.Nb).O(d, "mouseout", a.$e), a.Rc != fa && c.O(d, "contextmenu", a.Rc), G && c.O(d, "dblclick", a.tg))
}
y.W = function() {
  Z.b.W.call(this);
  this.na && this.na.detach();
  this.p && this.isEnabled() && this.j.sb(this, o)
};
y.f = function() {
  Z.b.f.call(this);
  this.na && (this.na.N(), delete this.na);
  delete this.j;
  this.za = this.Q = l
};
y.qb = function(a) {
  this.j.qb(this.a(), a);
  this.Q = a
};
function Rf(a, b) {
  a.Q = b
}
y.Hd = function() {
  var a = this.Q;
  if(!a) {
    return""
  }
  a = B(a) ? a : ia(a) ? xb(a, rd).join("") : pd(a);
  return za(a)
};
y.vc = function(a) {
  Z.b.vc.call(this, a);
  var b = this.a();
  b && this.j.vc(b, a)
};
y.bd = function(a) {
  this.ud = a;
  var b = this.a();
  b && this.j.bd(b, a)
};
y.v = function(a, b) {
  if(b || this.p != a && this.dispatchEvent(a ? "show" : "hide")) {
    var c = this.a();
    c && this.j.v(c, a);
    this.isEnabled() && this.j.sb(this, a);
    this.p = a;
    return j
  }
  return o
};
y.isEnabled = function() {
  return!X(this, 1)
};
y.rb = function(a) {
  var b = this.getParent();
  if((!b || "function" != typeof b.isEnabled || b.isEnabled()) && eg(this, 1, !a)) {
    a || (this.setActive(o), this.Ba(o)), this.p && this.j.sb(this, a), this.ha(1, !a)
  }
};
y.Ba = function(a) {
  eg(this, 2, a) && this.ha(2, a)
};
y.Vc = function() {
  return X(this, 4)
};
y.setActive = function(a) {
  eg(this, 4, a) && this.ha(4, a)
};
y.K = function(a) {
  eg(this, 64, a) && this.ha(64, a)
};
function X(a, b) {
  return!!(a.tb & b)
}
y.ha = function(a, b) {
  this.C & a && b != X(this, a) && (this.j.ha(this, a, b), this.tb = b ? this.tb | a : this.tb & ~a)
};
function fg(a, b, c) {
  a.m && X(a, b) && !c && e(Error("Component already rendered"));
  !c && X(a, b) && a.ha(b, o);
  a.C = c ? a.C | b : a.C & ~b
}
function gg(a, b) {
  return!!(a.Fe & b) && !!(a.C & b)
}
function eg(a, b, c) {
  return!!(a.C & b) && X(a, b) != c && (!(a.Za & b) || a.dispatchEvent(ke(b, c))) && !a.z
}
y.af = function(a) {
  !hg(a, this.a()) && this.dispatchEvent("enter") && this.isEnabled() && gg(this, 2) && this.Ba(j)
};
y.$e = function(a) {
  !hg(a, this.a()) && this.dispatchEvent("leave") && (gg(this, 4) && this.setActive(o), gg(this, 2) && this.Ba(o))
};
y.Rc = fa;
function hg(a, b) {
  return!!a.relatedTarget && hd(b, a.relatedTarget)
}
y.Mb = function(a) {
  this.isEnabled() && (gg(this, 2) && this.Ba(j), rc(a) && (gg(this, 4) && this.setActive(j), this.j.jb(this) && this.H().focus()));
  !this.ud && rc(a) && a.preventDefault()
};
y.Nb = function(a) {
  this.isEnabled() && (gg(this, 2) && this.Ba(j), this.Vc() && this.Rb(a) && gg(this, 4) && this.setActive(o))
};
y.tg = function(a) {
  this.isEnabled() && this.Rb(a)
};
y.Rb = function(a) {
  if(gg(this, 16)) {
    var b = !X(this, 16);
    eg(this, 16, b) && this.ha(16, b)
  }
  gg(this, 8) && eg(this, 8, j) && this.ha(8, j);
  gg(this, 64) && this.K(!X(this, 64));
  b = new N("action", this);
  a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.qf = a.qf);
  return this.dispatchEvent(b)
};
y.Kd = function() {
  gg(this, 32) && eg(this, 32, j) && this.ha(32, j)
};
y.Lb = function() {
  gg(this, 4) && this.setActive(o);
  gg(this, 32) && eg(this, 32, o) && this.ha(32, o)
};
y.Ja = function(a) {
  return this.p && this.isEnabled() && this.Ka(a) ? (a.preventDefault(), a.stopPropagation(), j) : o
};
y.Ka = function(a) {
  return 13 == a.keyCode && this.Rb(a)
};
na(Z) || e(Error("Invalid component class " + Z));
na(Of) || e(Error("Invalid renderer class " + Of));
var ig = pa(Z);
Lf[ig] = Of;
Jf("goog-control", function() {
  return new Z(l)
});
function jg(a, b) {
  Z.call(this, l, a || Tf.X(), b);
  fg(this, 1, o);
  fg(this, 2, o);
  fg(this, 4, o);
  fg(this, 32, o);
  this.tb = 1
}
E(jg, Z);
jg.prototype.h = function() {
  jg.b.h.call(this);
  Mf(this.a(), "separator")
};
Jf("goog-menuseparator", function() {
  return new jg
});
function kg(a) {
  jg.call(this, Tf.X(), a)
}
E(kg, jg);
Jf("goog-menuseparator", function() {
  return new jg
});
function lg(a, b, c, d, g, f, k, m, n) {
  var p, q;
  if(p = c.offsetParent) {
    var r = "HTML" == p.tagName || "BODY" == p.tagName;
    if(!r || "static" != Fd(p)) {
      q = Md(p), r || (r = (r = Nd(p)) && H ? -p.scrollLeft : r && (!G || !J("8")) ? p.scrollWidth - p.clientWidth - p.scrollLeft : p.scrollLeft, q = Pc(q, new Q(r, p.scrollTop)))
    }
  }
  p = q || new Q;
  q = Rd(a);
  if(r = Ld(a)) {
    var D = new Ad(r.left, r.top, r.right - r.left, r.bottom - r.top), r = Math.max(q.left, D.left), v = Math.min(q.left + q.width, D.left + D.width);
    if(r <= v) {
      var ya = Math.max(q.top, D.top), D = Math.min(q.top + q.height, D.top + D.height);
      ya <= D && (q.left = r, q.top = ya, q.width = v - r, q.height = D - ya)
    }
  }
  r = R(a);
  ya = R(c);
  if(r.s != ya.s) {
    var v = r.s.body, ya = ya.Jb(), D = new Q(0, 0), ka = S(v) ? Wc(S(v)) : window, cb = v;
    do {
      var A;
      if(ka == ya) {
        A = Md(cb)
      }else {
        A = cb;
        var la = new Q;
        if(1 == A.nodeType) {
          if(Id(A)) {
            var x = Jd(A);
            la.x = x.left;
            la.y = x.top
          }else {
            var x = vd(R(A)), Y = Md(A);
            la.x = Y.x - x.x;
            la.y = Y.y - x.y
          }
          H && !J(12) && (x = h, x = h, G ? x = "-ms-transform" : I ? x = "-webkit-transform" : Ua ? x = "-o-transform" : H && (x = "-moz-transform"), Y = h, x && (Y = Ed(A, x)), Y || (Y = Ed(A, "transform")), Y ? (A = Y.match(ee), x = !A ? new Q(0, 0) : new Q(parseFloat(A[1]), parseFloat(A[2]))) : x = new Q(0, 0), la = new Q(la.x + x.x, la.y + x.y))
        }else {
          x = na(A.Qh), Y = A, A.targetTouches ? Y = A.targetTouches[0] : x && A.$.targetTouches && (Y = A.$.targetTouches[0]), la.x = Y.clientX, la.y = Y.clientY
        }
        A = la
      }
      D.x += A.x;
      D.y += A.y
    }while(ka && ka != ya && (cb = ka.frameElement) && (ka = ka.parent));
    v = Pc(D, Md(v));
    G && !ud(r) && (v = Pc(v, vd(r)));
    q.left += v.x;
    q.top += v.y
  }
  a = (b & 4 && Nd(a) ? b ^ 2 : b) & -5;
  b = new Q(a & 2 ? q.left + q.width : q.left, a & 1 ? q.top + q.height : q.top);
  b = Pc(b, p);
  g && (b.x += (a & 2 ? -1 : 1) * g.x, b.y += (a & 1 ? -1 : 1) * g.y);
  var u;
  if(k) {
    if(n) {
      u = n
    }else {
      if(u = Ld(c)) {
        u.top -= p.y, u.right -= p.x, u.bottom -= p.y, u.left -= p.x
      }
    }
  }
  a: {
    n = u;
    g = b.M();
    u = 0;
    a = (d & 4 && Nd(c) ? d ^ 2 : d) & -5;
    d = Pd(c);
    m = m ? m.M() : d.M();
    if(f || 0 != a) {
      a & 2 ? g.x -= m.width + (f ? f.right : 0) : f && (g.x += f.left), a & 1 ? g.y -= m.height + (f ? f.bottom : 0) : f && (g.y += f.top)
    }
    if(k) {
      if(n) {
        f = g;
        u = 0;
        if(65 == (k & 65) && (f.x < n.left || f.x >= n.right)) {
          k &= -2
        }
        if(132 == (k & 132) && (f.y < n.top || f.y >= n.bottom)) {
          k &= -5
        }
        f.x < n.left && k & 1 && (f.x = n.left, u |= 1);
        f.x < n.left && f.x + m.width > n.right && k & 16 && (m.width = Math.max(m.width - (f.x + m.width - n.right), 0), u |= 4);
        f.x + m.width > n.right && k & 1 && (f.x = Math.max(n.right - m.width, n.left), u |= 1);
        k & 2 && (u |= (f.x < n.left ? 16 : 0) | (f.x + m.width > n.right ? 32 : 0));
        f.y < n.top && k & 4 && (f.y = n.top, u |= 2);
        f.y >= n.top && f.y + m.height > n.bottom && k & 32 && (m.height = Math.max(m.height - (f.y + m.height - n.bottom), 0), u |= 8);
        f.y + m.height > n.bottom && k & 4 && (f.y = Math.max(n.bottom - m.height, n.top), u |= 2);
        k & 8 && (u |= (f.y < n.top ? 64 : 0) | (f.y + m.height > n.bottom ? 128 : 0));
        k = u
      }else {
        k = 256
      }
      u = k;
      if(u & 496) {
        c = u;
        break a
      }
    }
    Gd(c, g);
    Hc(d, m) || Xd(c, m);
    c = u
  }
  return c
}
;function mg() {
}
mg.prototype.$c = s();
function ng(a, b, c) {
  this.element = a;
  this.Ad = b;
  this.Gi = c
}
E(ng, mg);
ng.prototype.$c = function(a, b, c) {
  lg(this.element, this.Ad, a, b, h, c, this.Gi)
};
var og = function(a) {
  return function() {
    return a
  }
}(j);
function pg(a, b, c, d) {
  ng.call(this, a, b);
  this.Qd = c ? 5 : 0;
  this.of = d || h
}
E(pg, ng);
pg.prototype.Rh = t("Qd");
pg.prototype.$c = function(a, b, c, d) {
  var g = lg(this.element, this.Ad, a, b, l, c, 10, d, this.of);
  if(g & 496) {
    var f = qg(g, this.Ad), b = qg(g, b), g = lg(this.element, f, a, b, l, c, 10, d, this.of);
    g & 496 && (f = qg(g, f), b = qg(g, b), lg(this.element, f, a, b, l, c, this.Qd, d, this.of))
  }
};
function qg(a, b) {
  a & 48 && (b ^= 2);
  a & 192 && (b ^= 1);
  return b
}
;function rg(a, b, c, d) {
  pg.call(this, a, b, c || d);
  if(c || d) {
    this.Qd = 65 | (d ? 32 : 132)
  }
}
E(rg, pg);
function sg() {
}
E(sg, Of);
ga(sg);
y = sg.prototype;
y.Aa = w("button");
y.ca = function(a, b, c) {
  16 == b ? Nf(a, "pressed", c) : sg.b.ca.call(this, a, b, c)
};
y.d = function(a) {
  var b = sg.b.d.call(this, a), c = a.Qc();
  c && this.xf(b, c);
  (c = a.lc()) && this.wc(b, c);
  a.C & 16 && this.ca(b, 16, X(a, 16));
  return b
};
y.t = function(a, b) {
  var b = sg.b.t.call(this, a, b), c = this.lc(b);
  a.Ef = c;
  a.Af = this.Qc(b);
  a.C & 16 && this.ca(b, 16, X(a, 16));
  return b
};
y.lc = fa;
y.wc = fa;
y.Qc = function(a) {
  return a.title
};
y.xf = function(a, b) {
  a && (a.title = b || "")
};
y.l = w("goog-button");
function tg() {
}
E(tg, sg);
ga(tg);
y = tg.prototype;
y.Aa = s();
y.d = function(a) {
  ug(a);
  return a.g().d("button", {"class":this.jc(a).join(" "), disabled:!a.isEnabled(), title:a.Qc() || "", value:a.lc() || ""}, a.Hd() || "")
};
y.ia = function(a) {
  return"BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
};
y.t = function(a, b) {
  ug(a);
  b.disabled && P(b, this.Pc(1));
  return tg.b.t.call(this, a, b)
};
y.nc = function(a) {
  a.o().c(a.a(), "click", a.Rb)
};
y.bd = fa;
y.vc = fa;
y.jb = function(a) {
  return a.isEnabled()
};
y.sb = fa;
y.ha = function(a, b, c) {
  tg.b.ha.call(this, a, b, c);
  if((a = a.a()) && 1 == b) {
    a.disabled = c
  }
};
y.lc = function(a) {
  return a.value
};
y.wc = function(a, b) {
  a && (a.value = b)
};
y.ca = fa;
function ug(a) {
  cg(a, o);
  a.Fe &= -256;
  fg(a, 32, o)
}
;function vg(a, b, c) {
  Z.call(this, a, b || tg.X(), c)
}
E(vg, Z);
y = vg.prototype;
y.lc = t("Ef");
y.wc = function(a) {
  this.Ef = a;
  this.j.wc(this.a(), a)
};
y.Qc = t("Af");
y.xf = function(a) {
  this.Af = a;
  this.j.xf(this.a(), a)
};
y.f = function() {
  vg.b.f.call(this);
  delete this.Ef;
  delete this.Af
};
y.h = function() {
  vg.b.h.call(this);
  if(this.C & 32) {
    var a = this.H();
    a && this.o().c(a, "keyup", this.Ka)
  }
};
y.Ka = function(a) {
  return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.Rb(a) : 32 == a.keyCode
};
Jf("goog-button", function() {
  return new vg(l)
});
function wg(a, b) {
  this.z = o;
  this.Uc = a || 1;
  this.cd = b || xg;
  this.Ge = C(this.Pi, this);
  this.hf = va()
}
E(wg, wd);
wg.prototype.enabled = o;
var xg = z.window;
y = wg.prototype;
y.ba = l;
y.setInterval = function(a) {
  this.Uc = a;
  this.ba && this.enabled ? (this.stop(), this.start()) : this.ba && this.stop()
};
y.Pi = function() {
  if(this.enabled) {
    var a = va() - this.hf;
    0 < a && a < 0.8 * this.Uc ? this.ba = this.cd.setTimeout(this.Ge, this.Uc - a) : (this.dispatchEvent(yg), this.enabled && (this.ba = this.cd.setTimeout(this.Ge, this.Uc), this.hf = va()))
  }
};
y.start = function() {
  this.enabled = j;
  this.ba || (this.ba = this.cd.setTimeout(this.Ge, this.Uc), this.hf = va())
};
y.stop = function() {
  this.enabled = o;
  this.ba && (this.cd.clearTimeout(this.ba), this.ba = l)
};
y.f = function() {
  wg.b.f.call(this);
  this.stop();
  delete this.cd
};
var yg = "tick";
var zg, Ag;
Ag = zg = o;
var Bg = Qa();
Bg && (-1 != Bg.indexOf("Firefox") || -1 != Bg.indexOf("Camino") || (-1 != Bg.indexOf("iPhone") || -1 != Bg.indexOf("iPod") ? zg = j : -1 != Bg.indexOf("iPad") && (Ag = j)));
var Cg = zg, Dg = Ag;
function Eg() {
}
ga(Eg);
y = Eg.prototype;
y.Aa = s();
function Fg(a, b) {
  a && (a.tabIndex = b ? 0 : -1)
}
y.d = function(a) {
  return a.g().d("div", this.jc(a).join(" "))
};
y.D = function(a) {
  return a
};
y.ia = function(a) {
  return"DIV" == a.tagName
};
y.t = function(a, b) {
  b.id && me(a, b.id);
  var c = this.l(), d = o, g = Jc(b);
  g && L(g, function(b) {
    b == c ? d = j : b && (b == c + "-disabled" ? a.rb(o) : b == c + "-horizontal" ? Gg(a, Hg) : b == c + "-vertical" && Gg(a, Ig))
  }, this);
  d || P(b, c);
  Jg(this, a, this.D(b));
  return b
};
function Jg(a, b, c) {
  if(c) {
    for(var d = c.firstChild, g;d && d.parentNode == c;) {
      g = d.nextSibling;
      if(1 == d.nodeType) {
        var f = a.Re(d);
        f && (f.e = d, b.isEnabled() || f.rb(o), b.cc(f), f.t(d))
      }else {
        (!d.nodeValue || "" == Aa(d.nodeValue)) && c.removeChild(d)
      }
      d = g
    }
  }
}
y.Re = function(a) {
  a: {
    for(var b = Jc(a), c = 0, d = b.length;c < d;c++) {
      if(a = b[c] in Kf ? Kf[b[c]]() : l) {
        break a
      }
    }
    a = l
  }
  return a
};
y.nc = function(a) {
  a = a.a();
  Ud(a, j, H);
  G && (a.hideFocus = j);
  var b = this.Aa();
  b && Mf(a, b)
};
y.H = function(a) {
  return a.a()
};
y.l = w("goog-container");
y.jc = function(a) {
  var b = this.l(), c = [b, a.Qb == Hg ? b + "-horizontal" : b + "-vertical"];
  a.isEnabled() || c.push(b + "-disabled");
  return c
};
y.pg = function() {
  return Ig
};
function Kg() {
}
E(Kg, Eg);
ga(Kg);
y = Kg.prototype;
y.Aa = w("menu");
y.ia = function(a) {
  return"UL" == a.tagName || Kg.b.ia.call(this, a)
};
y.Re = function(a) {
  return"HR" == a.tagName ? new jg : Kg.b.Re.call(this, a)
};
y.Bb = function(a, b) {
  return hd(a.a(), b)
};
y.l = w("goog-menu");
y.nc = function(a) {
  Kg.b.nc.call(this, a);
  a = a.a();
  Nf(a, "haspopup", "true")
};
function Lg() {
  this.hg = []
}
E(Lg, Of);
ga(Lg);
function Mg(a, b) {
  var c = a.hg[b];
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
    a.hg[b] = c
  }
  return c
}
y = Lg.prototype;
y.Aa = w("menuitem");
y.d = function(a) {
  var b = a.g().d("div", this.jc(a).join(" "), Ng(this, a.Q, a.g()));
  Og(this, a, b, !!(a.C & 8) || !!(a.C & 16));
  return b
};
y.D = function(a) {
  return a && a.firstChild
};
y.t = function(a, b) {
  var c = gd(b), d = Mg(this, 2);
  c && M(Jc(c), d) || b.appendChild(Ng(this, b.childNodes, a.g()));
  M(Jc(b), "goog-option") && (a.fe(j), this.fe(a, b, j));
  return Lg.b.t.call(this, a, b)
};
y.qb = function(a, b) {
  var c = this.D(a), d = Pg(this, a) ? c.firstChild : l;
  Lg.b.qb.call(this, a, b);
  d && !Pg(this, a) && c.insertBefore(d, c.firstChild || l)
};
function Ng(a, b, c) {
  a = Mg(a, 2);
  return c.d("div", a, b)
}
y.fe = function(a, b, c) {
  b && (Mf(b, c ? "menuitemcheckbox" : this.Aa()), Og(this, a, b, c))
};
function Pg(a, b) {
  var c = a.D(b);
  if(c) {
    var c = c.firstChild, d = Mg(a, 1);
    return!!c && M(Jc(c), d)
  }
  return o
}
function Og(a, b, c, d) {
  d != Pg(a, c) && (d ? P(c, "goog-option") : Kc(c, "goog-option"), c = a.D(c), d ? (a = Mg(a, 1), c.insertBefore(b.g().d("div", a), c.firstChild || l)) : c.removeChild(c.firstChild))
}
y.Pc = function(a) {
  switch(a) {
    case 2:
      return Mg(this, 0);
    case 16:
    ;
    case 8:
      return"goog-option-selected";
    default:
      return Lg.b.Pc.call(this, a)
  }
};
y.Te = function(a) {
  var b = Mg(this, 0);
  switch(a) {
    case "goog-option-selected":
      return 16;
    case b:
      return 2;
    default:
      return Lg.b.Te.call(this, a)
  }
};
y.l = w("goog-menuitem");
function Qg(a, b, c, d) {
  Z.call(this, a, d || Lg.X(), c);
  this.wc(b)
}
E(Qg, Z);
y = Qg.prototype;
y.lc = function() {
  var a = this.mf;
  return a != l ? a : this.Hd()
};
y.wc = aa("mf");
y.fe = function(a) {
  fg(this, 16, a);
  var b = this.a();
  b && this.j.fe(this, b, a)
};
y.Hd = function() {
  var a = this.Q;
  return ia(a) ? (a = xb(a, function(a) {
    var c = Jc(a);
    return M(c, "goog-menuitem-accel") || M(c, "goog-menuitem-mnemonic-separator") ? "" : rd(a)
  }).join(""), za(a)) : Qg.b.Hd.call(this)
};
y.Nb = function(a) {
  var b = this.getParent();
  if(b) {
    var c = b.Jg;
    b.Jg = l;
    if(b = c && ma(a.clientX)) {
      b = new Q(a.clientX, a.clientY), b = c == b ? j : !c || !b ? o : c.x == b.x && c.y == b.y
    }
    if(b) {
      return
    }
  }
  Qg.b.Nb.call(this, a)
};
y.Ka = function(a) {
  return a.keyCode == this.Dg && this.Rb(a) ? j : Qg.b.Ka.call(this, a)
};
y.Th = t("Dg");
Jf("goog-menuitem", function() {
  return new Qg(l)
});
function Rg(a, b, c) {
  V.call(this, c);
  this.j = b || Eg.X();
  this.Qb = a || this.j.pg()
}
E(Rg, V);
var Hg = "horizontal", Ig = "vertical";
y = Rg.prototype;
y.ef = l;
y.na = l;
y.j = l;
y.Qb = l;
y.p = j;
y.xa = j;
y.Pe = j;
y.R = -1;
y.J = l;
y.Ya = o;
y.Gh = o;
y.Ei = j;
y.Ra = l;
y.H = function() {
  return this.ef || this.j.H(this)
};
y.Jd = function() {
  return this.na || (this.na = new Xf(this.H()))
};
y.d = function() {
  this.e = this.j.d(this)
};
y.D = function() {
  return this.j.D(this.a())
};
y.ia = function(a) {
  return this.j.ia(a)
};
y.u = function(a) {
  this.e = this.j.t(this, a);
  "none" == a.style.display && (this.p = o)
};
y.h = function() {
  Rg.b.h.call(this);
  this.Hb(function(a) {
    a.m && Sg(this, a)
  }, this);
  var a = this.a();
  this.j.nc(this);
  this.v(this.p, j);
  this.o().c(this, "enter", this.Xe).c(this, "highlight", this.Ye).c(this, "unhighlight", this.bf).c(this, "open", this.ei).c(this, "close", this.Wh).c(a, "mousedown", this.Mb).c(S(a), "mouseup", this.Yh).c(a, ["mousedown", "mouseup", "mouseover", "mouseout", "contextmenu"], this.Vh);
  this.jb() && Tg(this, j)
};
function Tg(a, b) {
  var c = a.o(), d = a.H();
  b ? c.c(d, "focus", a.Kd).c(d, "blur", a.Lb).c(a.Jd(), "key", a.Ja) : c.O(d, "focus", a.Kd).O(d, "blur", a.Lb).O(a.Jd(), "key", a.Ja)
}
y.W = function() {
  Ug(this, -1);
  this.J && this.J.K(o);
  this.Ya = o;
  Rg.b.W.call(this)
};
y.f = function() {
  Rg.b.f.call(this);
  this.na && (this.na.N(), this.na = l);
  this.j = this.J = this.Ra = this.ef = l
};
y.Xe = w(j);
y.Ye = function(a) {
  var b = te(this, a.target);
  if(-1 < b && b != this.R) {
    var c = re(this, this.R);
    c && c.Ba(o);
    this.R = b;
    c = re(this, this.R);
    this.Ya && c.setActive(j);
    this.Ei && this.J && c != this.J && (c.C & 64 ? c.K(j) : this.J.K(o))
  }
  Nf(this.a(), "activedescendant", a.target.a().id)
};
y.bf = function(a) {
  a.target == re(this, this.R) && (this.R = -1);
  Nf(this.a(), "activedescendant", "")
};
y.ei = function(a) {
  if((a = a.target) && a != this.J && a.getParent() == this) {
    this.J && this.J.K(o), this.J = a
  }
};
y.Wh = function(a) {
  a.target == this.J && (this.J = l)
};
y.Mb = function(a) {
  this.xa && (this.Ya = j);
  var b = this.H();
  b && nd(b) ? b.focus() : a.preventDefault()
};
y.Yh = function() {
  this.Ya = o
};
y.Vh = function(a) {
  var b;
  a: {
    b = a.target;
    if(this.Ra) {
      for(var c = this.a();b && b !== c;) {
        var d = b.id;
        if(d in this.Ra) {
          b = this.Ra[d];
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
        b.Mb(a);
        break;
      case "mouseup":
        b.Nb(a);
        break;
      case "mouseover":
        b.af(a);
        break;
      case "mouseout":
        b.$e(a);
        break;
      case "contextmenu":
        b.Rc(a)
    }
  }
};
y.Kd = s();
y.Lb = function() {
  Ug(this, -1);
  this.Ya = o;
  this.J && this.J.K(o)
};
y.Ja = function(a) {
  return this.isEnabled() && this.p && (0 != qe(this) || this.ef) && this.Ka(a) ? (a.preventDefault(), a.stopPropagation(), j) : o
};
y.Ka = function(a) {
  var b = re(this, this.R);
  if(b && "function" == typeof b.Ja && b.Ja(a) || this.J && this.J != b && "function" == typeof this.J.Ja && this.J.Ja(a)) {
    return j
  }
  if(a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) {
    return o
  }
  switch(a.keyCode) {
    case 27:
      if(this.jb()) {
        this.H().blur()
      }else {
        return o
      }
      break;
    case 36:
      Vg(this);
      break;
    case 35:
      Wg(this);
      break;
    case 38:
      if(this.Qb == Ig) {
        Xg(this)
      }else {
        return o
      }
      break;
    case 37:
      if(this.Qb == Hg) {
        se(this) ? Yg(this) : Xg(this)
      }else {
        return o
      }
      break;
    case 40:
      if(this.Qb == Ig) {
        Yg(this)
      }else {
        return o
      }
      break;
    case 39:
      if(this.Qb == Hg) {
        se(this) ? Xg(this) : Yg(this)
      }else {
        return o
      }
      break;
    default:
      return o
  }
  return j
};
function Sg(a, b) {
  var c = b.a(), c = c.id || (c.id = le(b));
  a.Ra || (a.Ra = {});
  a.Ra[c] = b
}
y.cc = function(a, b) {
  Rg.b.cc.call(this, a, b)
};
y.Be = function(a, b, c) {
  a.Za |= 2;
  a.Za |= 64;
  (this.jb() || !this.Gh) && fg(a, 32, o);
  cg(a, o);
  Rg.b.Be.call(this, a, b, c);
  a.m && this.m && Sg(this, a);
  b <= this.R && this.R++
};
y.removeChild = function(a, b) {
  if(a = B(a) ? oe(this, a) : a) {
    var c = te(this, a);
    -1 != c && (c == this.R ? a.Ba(o) : c < this.R && this.R--);
    var d = a.a();
    d && d.id && this.Ra && (c = this.Ra, d = d.id, d in c && delete c[d])
  }
  a = Rg.b.removeChild.call(this, a, b);
  cg(a, j);
  return a
};
function Gg(a, b) {
  a.a() && e(Error("Component already rendered"));
  a.Qb = b
}
y.v = function(a, b) {
  if(b || this.p != a && this.dispatchEvent(a ? "show" : "hide")) {
    this.p = a;
    var c = this.a();
    c && (T(c, a), this.jb() && Fg(this.H(), this.xa && this.p), b || this.dispatchEvent(this.p ? "aftershow" : "afterhide"));
    return j
  }
  return o
};
y.isEnabled = t("xa");
y.rb = function(a) {
  if(this.xa != a && this.dispatchEvent(a ? "enable" : "disable")) {
    a ? (this.xa = j, this.Hb(function(a) {
      a.Ug ? delete a.Ug : a.rb(j)
    })) : (this.Hb(function(a) {
      a.isEnabled() ? a.rb(o) : a.Ug = j
    }), this.Ya = this.xa = o), this.jb() && Fg(this.H(), a && this.p)
  }
};
y.jb = t("Pe");
y.sb = function(a) {
  a != this.Pe && this.m && Tg(this, a);
  this.Pe = a;
  this.xa && this.p && Fg(this.H(), a)
};
function Ug(a, b) {
  var c = re(a, b);
  c ? c.Ba(j) : -1 < a.R && re(a, a.R).Ba(o)
}
y.Ba = function(a) {
  Ug(this, te(this, a))
};
function Vg(a) {
  Zg(a, function(a, c) {
    return(a + 1) % c
  }, qe(a) - 1)
}
function Wg(a) {
  Zg(a, function(a, c) {
    a--;
    return 0 > a ? c - 1 : a
  }, 0)
}
function Yg(a) {
  Zg(a, function(a, c) {
    return(a + 1) % c
  }, a.R)
}
function Xg(a) {
  Zg(a, function(a, c) {
    a--;
    return 0 > a ? c - 1 : a
  }, a.R)
}
function Zg(a, b, c) {
  for(var c = 0 > c ? te(a, a.J) : c, d = qe(a), c = b.call(a, c, d), g = 0;g <= d;) {
    var f = re(a, c);
    if(f && a.eg(f)) {
      Ug(a, c);
      break
    }
    g++;
    c = b.call(a, c, d)
  }
}
y.eg = function(a) {
  return a.p && a.isEnabled() && !!(a.C & 2)
};
function $g() {
}
E($g, Of);
ga($g);
$g.prototype.l = w("goog-menuheader");
function ah(a, b, c) {
  Z.call(this, a, c || $g.X(), b);
  fg(this, 1, o);
  fg(this, 2, o);
  fg(this, 4, o);
  fg(this, 32, o);
  this.tb = 1
}
E(ah, Z);
Jf("goog-menuheader", function() {
  return new ah(l)
});
function bh(a, b) {
  Rg.call(this, Ig, b || Kg.X(), a);
  this.sb(o)
}
E(bh, Rg);
y = bh.prototype;
y.Ee = j;
y.Hh = o;
y.l = function() {
  return this.j.l()
};
y.Bb = function(a) {
  if(this.j.Bb(this, a)) {
    return j
  }
  for(var b = 0, c = qe(this);b < c;b++) {
    var d = re(this, b);
    if("function" == typeof d.Bb && d.Bb(a)) {
      return j
    }
  }
  return o
};
y.ag = function(a) {
  this.cc(a, j)
};
y.v = function(a, b, c) {
  (b = bh.b.v.call(this, a, b)) && a && this.m && this.Ee && this.H().focus();
  this.Jg = a && c && ma(c.clientX) ? new Q(c.clientX, c.clientY) : l;
  return b
};
y.Xe = function(a) {
  this.Ee && this.H().focus();
  return bh.b.Xe.call(this, a)
};
y.eg = function(a) {
  return(this.Hh || a.isEnabled()) && a.p && !!(a.C & 2)
};
y.u = function(a) {
  var b = this.j, c;
  c = this.g();
  c = Sc(c.s, "div", b.l() + "-content", a);
  for(var d = c.length, g = 0;g < d;g++) {
    Jg(b, this, c[g])
  }
  bh.b.u.call(this, a)
};
y.Ka = function(a) {
  var b = bh.b.Ka.call(this, a);
  b || this.Hb(function(c) {
    !b && c.Th && c.Dg == a.keyCode && (this.isEnabled() && this.Ba(c), b = c.Ja(a))
  }, this);
  return b
};
function ch() {
}
E(ch, sg);
ga(ch);
y = ch.prototype;
y.d = function(a) {
  var b = {"class":"goog-inline-block " + this.jc(a).join(" "), title:a.Qc() || ""}, b = a.g().d("div", b, this.Bd(a.Q, a.g()));
  this.ee(a, b);
  return b
};
y.Aa = w("button");
y.ee = function(a, b) {
  a.isEnabled() || this.ca(b, 1, j);
  X(a, 8) && this.ca(b, 8, j);
  a.C & 16 && this.ca(b, 16, j);
  X(a, 64) && this.ca(b, 64, j)
};
y.D = function(a) {
  return a && a.firstChild.firstChild
};
y.Bd = function(a, b) {
  return b.d("div", "goog-inline-block " + (this.l() + "-outer-box"), b.d("div", "goog-inline-block " + (this.l() + "-inner-box"), a))
};
y.ia = function(a) {
  return"DIV" == a.tagName
};
y.t = function(a, b) {
  dh(b, j);
  dh(b, o);
  var c;
  a: {
    c = a.g().qg(b);
    var d = this.l() + "-outer-box";
    if(c && M(Jc(c), d) && (c = a.g().qg(c), d = this.l() + "-inner-box", c && M(Jc(c), d))) {
      c = j;
      break a
    }
    c = o
  }
  c || b.appendChild(this.Bd(b.childNodes, a.g()));
  P(b, "goog-inline-block", this.l());
  return ch.b.t.call(this, a, b)
};
y.l = w("goog-custom-button");
function dh(a, b) {
  if(a) {
    for(var c = b ? a.firstChild : a.lastChild, d;c && c.parentNode == a;) {
      d = b ? c.nextSibling : c.previousSibling;
      if(3 == c.nodeType) {
        var g = c.nodeValue;
        if("" == Aa(g)) {
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
;function eh() {
}
E(eh, ch);
ga(eh);
H && (eh.prototype.qb = function(a, b) {
  var c = eh.b.D.call(this, a && a.firstChild);
  if(c) {
    var d = this.createCaption(b, R(a)), g = c.parentNode;
    g && g.replaceChild(d, c)
  }
});
y = eh.prototype;
y.D = function(a) {
  a = eh.b.D.call(this, a && a.firstChild);
  H && a && a.__goog_wrapper_div && (a = a.firstChild);
  return a
};
y.t = function(a, b) {
  var c = Rc("*", "goog-menu", b)[0];
  if(c) {
    T(c, o);
    S(c).body.appendChild(c);
    var d = new bh;
    d.t(c);
    fh(a, d)
  }
  return eh.b.t.call(this, a, b)
};
y.Bd = function(a, b) {
  return eh.b.Bd.call(this, [this.createCaption(a, b), b.d("div", "goog-inline-block " + (this.l() + "-dropdown"), "\u00a0")], b)
};
y.createCaption = function(a, b) {
  return b.d("div", "goog-inline-block " + (this.l() + "-caption"), a)
};
y.l = w("goog-menu-button");
function gh(a, b, c, d) {
  vg.call(this, a, c || eh.X(), d);
  fg(this, 64, j);
  this.Ud = new rg(l, 5);
  b && fh(this, b);
  this.ni = l;
  this.ba = new wg(500);
  if((Cg || Dg) && !J("533.17.9")) {
    this.Nd = j
  }
}
E(gh, vg);
y = gh.prototype;
y.Nd = o;
y.Ki = o;
y.h = function() {
  gh.b.h.call(this);
  this.i && hh(this, this.i, j);
  Nf(this.a(), "haspopup", "true")
};
y.W = function() {
  gh.b.W.call(this);
  if(this.i) {
    this.K(o);
    this.i.W();
    hh(this, this.i, o);
    var a = this.i.a();
    a && fd(a)
  }
};
y.f = function() {
  gh.b.f.call(this);
  this.i && (this.i.N(), delete this.i);
  delete this.Hi;
  this.ba.N()
};
y.Mb = function(a) {
  gh.b.Mb.call(this, a);
  this.Vc() && (this.K(!X(this, 64), a), this.i && (this.i.Ya = X(this, 64)))
};
y.Nb = function(a) {
  gh.b.Nb.call(this, a);
  this.i && !this.Vc() && (this.i.Ya = o)
};
y.Rb = function() {
  this.setActive(o);
  return j
};
y.Xh = function(a) {
  this.i && this.i.p && !this.Bb(a.target) && this.K(o)
};
y.Bb = function(a) {
  return a && hd(this.a(), a) || this.i && this.i.Bb(a) || o
};
y.Ka = function(a) {
  if(32 == a.keyCode) {
    if(a.preventDefault(), "keyup" != a.type) {
      return j
    }
  }else {
    if("key" != a.type) {
      return o
    }
  }
  if(this.i && this.i.p) {
    var b = this.i.Ja(a);
    return 27 == a.keyCode ? (this.K(o), j) : b
  }
  return 40 == a.keyCode || 38 == a.keyCode || 32 == a.keyCode ? (this.K(j), j) : o
};
y.bi = function() {
  this.K(o)
};
y.ci = function() {
  this.Vc() || this.K(o)
};
y.Lb = function(a) {
  this.Nd || this.K(o);
  gh.b.Lb.call(this, a)
};
function fh(a, b) {
  var c = a.i;
  b != c && (c && (a.K(o), a.m && hh(a, c, o), delete a.i), b && (a.i = b, ne(b, a), b.v(o), c = a.Nd, (b.Ee = c) && b.sb(j), a.m && hh(a, b, j)))
}
y.ag = function(a) {
  this.i || fh(this, new bh(this.g()));
  (this.i || l).cc(a, j)
};
y.v = function(a, b) {
  var c = gh.b.v.call(this, a, b);
  c && !this.p && this.K(o);
  return c
};
y.rb = function(a) {
  gh.b.rb.call(this, a);
  this.isEnabled() || this.K(o)
};
y.K = function(a, b) {
  gh.b.K.call(this, a);
  if(this.i && X(this, 64) == a) {
    if(a) {
      this.i.m || (this.Ki ? this.i.ua(this.a().parentNode) : this.i.ua()), this.Zb = Ld(this.a()), this.Ab = Rd(this.a()), ih(this), Ug(this.i, -1)
    }else {
      if(this.setActive(o), this.i.Ya = o, this.a() && Nf(this.a(), "activedescendant", ""), this.Zd != l) {
        this.Zd = h;
        var c = this.i.a();
        c && Od(c, "", "")
      }
    }
    this.i.v(a, o, b);
    if(!this.z) {
      var c = this.o(), d = a ? c.c : c.O;
      d.call(c, td(this.g()), "mousedown", this.Xh, j);
      this.Nd && d.call(c, this.i, "blur", this.ci);
      d.call(c, this.ba, yg, this.Ci);
      a ? this.ba.start() : this.ba.stop()
    }
  }
};
function ih(a) {
  if(a.i.m) {
    var b = a.Ud;
    a.Ud.element = a.Hi || a.a();
    var c = a.i.a();
    a.i.p || (c.style.visibility = "hidden", T(c, j));
    !a.Zd && a.Ud.Rh && a.Ud.Qd & 32 && (a.Zd = Pd(c));
    b.$c(c, b.Ad ^ 1, a.ni, a.Zd);
    a.i.p || (T(c, o), c.style.visibility = "visible")
  }
}
y.Ci = function() {
  var a = Rd(this.a()), b = Ld(this.a());
  if(!(this.Ab == a || (!this.Ab || !a ? 0 : this.Ab.left == a.left && this.Ab.width == a.width && this.Ab.top == a.top && this.Ab.height == a.height)) || !(this.Zb == b || (!this.Zb || !b ? 0 : this.Zb.top == b.top && this.Zb.right == b.right && this.Zb.bottom == b.bottom && this.Zb.left == b.left))) {
    this.Ab = a, this.Zb = b, ih(this)
  }
};
function hh(a, b, c) {
  var d = a.o(), c = c ? d.c : d.O;
  c.call(d, b, "action", a.bi);
  c.call(d, b, "highlight", a.Ye);
  c.call(d, b, "unhighlight", a.bf)
}
y.Ye = function(a) {
  Nf(this.a(), "activedescendant", a.target.a().id)
};
y.bf = function() {
  re(this.i, this.i.R) || Nf(this.a(), "activedescendant", "")
};
Jf("goog-menu-button", function() {
  return new gh(l)
});
function jh(a, b) {
  bh.call(this, a, b)
}
E(jh, bh);
function kh(a) {
  var b = new jh, c = pb(je);
  L(a, function(a) {
    a.F || e(new Exeption("submenu info does not have callback"));
    var g;
    a.label ? (g = new Qg(a.label), me(g, a.label)) : g = new kg;
    g.Za |= 255;
    b.o().c(g, c, function(b) {
      "action" == b.type && a.F()
    });
    b.ag(g)
  });
  return b
}
;function lh() {
}
E(lh, Eg);
ga(lh);
lh.prototype.Aa = w("menubar");
lh.prototype.l = w("goog-menubar");
lh.prototype.pg = function() {
  return Hg
};
function mh(a) {
  var b = new Rg(l, lh.X(), h);
  L(a, function(a) {
    a.label || e(new Exeption("menu info does not have label"));
    a.Rg || e(new Exeption("menu info does not have submenu"));
    var d = kh(a.Rg), a = new gh(a.label, d);
    a.Za |= 255;
    b.cc(a, j)
  });
  return b
}
;function nh(a) {
  this.z = o;
  this.ac = a
}
E(nh, wd);
nh.prototype.ac = {};
nh.prototype.set = function(a, b, c) {
  a in this.ac || e(Error("'" + a + "' does not match attrs."));
  var d = this.ac[a];
  this.ac[a] = b;
  if(c) {
    return j
  }
  this.dispatchEvent(new N("model_change", {wd:a, gk:d, De:b, oi:this}));
  return j
};
nh.prototype.get = function(a) {
  a in this.ac || e(Error("'" + a + "' does not match attrs."));
  return this.ac[a]
};
nh.prototype.ya = function(a) {
  return a == this
};
function oh(a, b, c) {
  this.z = o;
  this.target = a;
  this.handle = b || a;
  this.kf = c || new Ad(NaN, NaN, NaN, NaN);
  this.s = S(a);
  this.Ga = new U(this);
  wc(this.handle, ["touchstart", "mousedown"], this.Ng, o, this)
}
E(oh, wd);
var ph = G || H && J("1.9.3");
y = oh.prototype;
y.clientX = 0;
y.clientY = 0;
y.screenX = 0;
y.screenY = 0;
y.Og = 0;
y.Pg = 0;
y.fc = 0;
y.gc = 0;
y.xa = j;
y.Gb = o;
y.vg = 0;
y.ii = o;
y.Df = o;
y.o = t("Ga");
y.rb = aa("xa");
y.f = function() {
  oh.b.f.call(this);
  Ac(this.handle, ["touchstart", "mousedown"], this.Ng, o, this);
  ge(this.Ga);
  ph && this.s.releaseCapture();
  this.Ga = this.handle = this.target = l
};
function qh(a) {
  da(a.ob) || (a.ob = Nd(a.target));
  return a.ob
}
y.Ng = function(a) {
  var b = "mousedown" == a.type;
  if(this.xa && !this.Gb && (!b || rc(a))) {
    rh(a);
    if(0 == this.vg) {
      if(this.dispatchEvent(new sh("start", this, a.clientX, a.clientY))) {
        this.Gb = j, a.preventDefault()
      }else {
        return
      }
    }else {
      a.preventDefault()
    }
    var b = this.s, c = b.documentElement, d = !ph;
    this.Ga.c(b, ["touchmove", "mousemove"], this.di, d);
    this.Ga.c(b, ["touchend", "mouseup"], this.Dd, d);
    ph ? (c.setCapture(o), this.Ga.c(c, "losecapture", this.Dd)) : this.Ga.c(b ? Wc(b) : window, "blur", this.Dd);
    G && this.ii && this.Ga.c(b, "dragstart", nc);
    this.Li && this.Ga.c(this.Li, "scroll", this.Bi, d);
    this.clientX = this.Og = a.clientX;
    this.clientY = this.Pg = a.clientY;
    this.screenX = a.screenX;
    this.screenY = a.screenY;
    this.Df ? (a = this.target, b = a.offsetLeft, c = a.offsetParent, !c && "fixed" == Fd(a) && (c = S(a).documentElement), c ? (H ? (d = Zd(c), b += d.left) : jb(8) && (d = Zd(c), b -= d.left), a = Nd(c) ? c.clientWidth - (b + a.offsetWidth) : b) : a = b) : a = this.target.offsetLeft;
    this.fc = a;
    this.gc = this.target.offsetTop;
    this.pf = vd(R(this.s));
    va()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
y.Dd = function(a) {
  ge(this.Ga);
  ph && this.s.releaseCapture();
  if(this.Gb) {
    rh(a);
    this.Gb = o;
    var b = th(this, this.fc), c = zh(this, this.gc);
    this.dispatchEvent(new sh("end", this, a.clientX, a.clientY, 0, b, c))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == a.type || "touchcancel" == a.type) && a.preventDefault()
};
function rh(a) {
  var b = a.type;
  "touchstart" == b || "touchmove" == b ? a.Wa(a.$.targetTouches[0], a.currentTarget) : ("touchend" == b || "touchcancel" == b) && a.Wa(a.$.changedTouches[0], a.currentTarget)
}
y.di = function(a) {
  if(this.xa) {
    rh(a);
    var b = (this.Df && qh(this) ? -1 : 1) * (a.clientX - this.clientX), c = a.clientY - this.clientY;
    this.clientX = a.clientX;
    this.clientY = a.clientY;
    this.screenX = a.screenX;
    this.screenY = a.screenY;
    if(!this.Gb) {
      var d = this.Og - this.clientX, g = this.Pg - this.clientY;
      if(d * d + g * g > this.vg) {
        if(this.dispatchEvent(new sh("start", this, a.clientX, a.clientY))) {
          this.Gb = j
        }else {
          this.z || this.Dd(a);
          return
        }
      }
    }
    c = Ah(this, b, c);
    b = c.x;
    c = c.y;
    this.Gb && this.dispatchEvent(new sh("beforedrag", this, a.clientX, a.clientY, 0, b, c)) && (Bh(this, a, b, c), a.preventDefault())
  }
};
function Ah(a, b, c) {
  var d = vd(R(a.s)), b = b + (d.x - a.pf.x), c = c + (d.y - a.pf.y);
  a.pf = d;
  a.fc += b;
  a.gc += c;
  b = th(a, a.fc);
  a = zh(a, a.gc);
  return new Q(b, a)
}
y.Bi = function(a) {
  var b = Ah(this, 0, 0);
  a.clientX = this.clientX;
  a.clientY = this.clientY;
  Bh(this, a, b.x, b.y)
};
function Bh(a, b, c, d) {
  a.Df && qh(a) ? a.target.style.right = c + "px" : a.target.style.left = c + "px";
  a.target.style.top = d + "px";
  a.dispatchEvent(new sh("drag", a, b.clientX, b.clientY, 0, c, d))
}
function th(a, b) {
  var c = a.kf, d = !isNaN(c.left) ? c.left : l, c = !isNaN(c.width) ? c.width : 0;
  return Math.min(d != l ? d + c : Infinity, Math.max(d != l ? d : -Infinity, b))
}
function zh(a, b) {
  var c = a.kf, d = !isNaN(c.top) ? c.top : l, c = !isNaN(c.height) ? c.height : 0;
  return Math.min(d != l ? d + c : Infinity, Math.max(d != l ? d : -Infinity, b))
}
function sh(a, b, c, d, g, f, k) {
  N.call(this, a);
  this.clientX = c;
  this.clientY = d;
  this.left = da(f) ? f : b.fc;
  this.top = da(k) ? k : b.gc
}
E(sh, N);
/*
 Portions of this code are from MochiKit, received by The Closure
 Library Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Library Authors. All Rights Reserved.
*/
function hf(a, b, c, d, g, f) {
  ze.call(this, g, f);
  this.Bg = a;
  this.Me = [];
  this.lg = !!b;
  this.Ph = !!c;
  this.Jh = !!d;
  for(b = 0;b < a.length;b++) {
    Fe(a[b], C(this.sg, this, b, j), C(this.sg, this, b, o))
  }
  0 == a.length && !this.lg && this.F(this.Me)
}
E(hf, ze);
hf.prototype.Gg = 0;
hf.prototype.sg = function(a, b, c) {
  this.Gg++;
  this.Me[a] = [b, c];
  this.Ha || (this.lg && b ? this.F([a, c]) : this.Ph && !b ? this.Oc(c) : this.Gg == this.Bg.length && this.F(this.Me));
  this.Jh && !b && (c = l);
  return c
};
hf.prototype.Oc = function(a) {
  hf.b.Oc.call(this, a);
  L(this.Bg, function(a) {
    a.cancel()
  })
};
/*
 Portions of this code are from MochiKit, received by The Closure
 Library Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Library Authors. All Rights Reserved.
*/
function Ch(a) {
  this.ze = a;
  this.qe = [];
  new Float32Array(0)
}
af("synthjs.audiocore.DynamicGenerator").ge(Xe);
Ch.prototype.Qe = function(a) {
  this.eb || e(Error("Generator can't create buffer without setting sampleRate"));
  var b = this.ze.Qe(a);
  b.name = "wave";
  L(this.qe, function(a) {
    a = a.lk();
    a.name = "filter";
    Ke(b, a)
  });
  return b
};
function Dh(a, b) {
  a.eb = b;
  for(i = 0;i < a.qe.length;i++) {
    rt = Dh(a.qe[i], b)
  }
}
Ch.prototype.ic = w(o);
function Eh(a) {
  this.ih = a || R();
  this.Pf = this.z = o
}
E(Eh, yf);
y = Eh.prototype;
y.t = function(a) {
  this.bc = a;
  this.u(a);
  this.Pf || this.h();
  this.Pf = j
};
y.Ia = function() {
  return this.bc || o
};
y.u = s();
y.h = s();
y.g = t("ih");
function Fh(a, b, c, d, g, f) {
  6 == arguments.length ? this.setTransform(a, b, c, d, g, f) : (0 != arguments.length && e(Error("Insufficient matrix parameters")), this.oa = this.ra = 1, this.ga = this.pa = this.qa = this.sa = 0)
}
y = Fh.prototype;
y.M = function() {
  return new Fh(this.oa, this.ga, this.pa, this.ra, this.qa, this.sa)
};
y.setTransform = function(a, b, c, d, g, f) {
  (!ma(a) || !ma(b) || !ma(c) || !ma(d) || !ma(g) || !ma(f)) && e(Error("Invalid transform parameters"));
  this.oa = a;
  this.ga = b;
  this.pa = c;
  this.ra = d;
  this.qa = g;
  this.sa = f;
  return this
};
y.scale = function(a, b) {
  this.oa *= a;
  this.ga *= a;
  this.pa *= b;
  this.ra *= b;
  return this
};
y.translate = function(a, b) {
  this.qa += a * this.oa + b * this.pa;
  this.sa += a * this.ga + b * this.ra;
  return this
};
y.rotate = function(a, b, c) {
  a = Gh(a, b, c);
  b = this.oa;
  c = this.pa;
  this.oa = a.oa * b + a.ga * c;
  this.pa = a.pa * b + a.ra * c;
  this.qa += a.qa * b + a.sa * c;
  b = this.ga;
  c = this.ra;
  this.ga = a.oa * b + a.ga * c;
  this.ra = a.pa * b + a.ra * c;
  this.sa += a.qa * b + a.sa * c;
  return this
};
y.toString = function() {
  return"matrix(" + [this.oa, this.ga, this.pa, this.ra, this.qa, this.sa].join() + ")"
};
function Gh(a, b, c) {
  var d = new Fh, g = Math.cos(a), a = Math.sin(a);
  return d.setTransform(g, a, -a, g, b - b * g + c * a, c - b * a - c * g)
}
y.ya = function(a) {
  return this == a ? j : !a ? o : this.oa == a.oa && this.pa == a.pa && this.qa == a.qa && this.ga == a.ga && this.ra == a.ra && this.sa == a.sa
};
function Hh(a, b) {
  this.z = o;
  this.e = a;
  this.rg = b;
  this.Ke = o
}
E(Hh, wd);
y = Hh.prototype;
y.rg = l;
y.e = l;
y.Bf = l;
y.a = t("e");
y.Ia = t("rg");
y.addEventListener = function(a, b, c, d) {
  wc(this.e, a, b, c, d)
};
y.removeEventListener = function(a, b, c, d) {
  Ac(this.e, a, b, c, d)
};
y.f = function() {
  Hh.b.f.call(this);
  Ec(this.e)
};
function Ih(a, b) {
  Hh.call(this, a, b)
}
E(Ih, Hh);
function Jh(a, b) {
  Hh.call(this, a, b)
}
E(Jh, Hh);
function Kh(a, b) {
  Hh.call(this, a, b)
}
E(Kh, Ih);
Kh.prototype.Ca = function(a, b) {
  Lh(this.a(), {width:a, height:b})
};
function Mh(a, b) {
  Hh.call(this, a, b)
}
E(Mh, Jh);
Mh.prototype.Ca = function(a, b) {
  Lh(this.a(), {width:a, height:b})
};
Mh.prototype.he = function(a) {
  Lh(this.a(), {"xlink:href":a})
};
function Nh(a, b, c, d, g) {
  V.call(this, g);
  this.width = a;
  this.height = b;
  this.wa = c || l;
  this.Kc = d || l
}
E(Nh, V);
y = Nh.prototype;
y.G = l;
y.hb = 0;
y.Eb = 0;
y.og = function() {
  return this.wa ? new O(this.wa, this.Kc) : this.fa()
};
y.Se = function() {
  return this.fa()
};
y.fa = function() {
  return this.m ? Pd(this.a()) : ma(this.width) && ma(this.height) ? new O(this.width, this.height) : l
};
y.Uh = function() {
  var a = this.fa();
  return a ? a.width / this.og().width : 0
};
function Oh(a, b, c, d, g) {
  Nh.call(this, a, b, c, d, g);
  this.Kh = {};
  this.Cf = I && !J(526);
  this.Ob = new U(this)
}
var Ph;
E(Oh, Nh);
function Qh(a, b, c) {
  a = a.V.s.createElementNS("http://www.w3.org/2000/svg", b);
  c && Lh(a, c);
  return a
}
function Lh(a, b) {
  for(var c in b) {
    a.setAttribute(c, b[c])
  }
}
y = Oh.prototype;
y.vd = function(a, b) {
  (b || this.G).a().appendChild(a.a())
};
y.tf = function(a, b, c, d, g, f) {
  a.a().setAttribute("transform", "translate(" + b + "," + c + ") rotate(" + d + " " + g + " " + f + ")")
};
y.d = function() {
  var a = Qh(this, "svg", {width:this.width, height:this.height, overflow:"hidden"}), b = Qh(this, "g");
  this.ig = Qh(this, "defs");
  this.G = new Kh(b, this);
  a.appendChild(this.ig);
  a.appendChild(b);
  this.e = a;
  if(this.wa || this.hb || this.Eb) {
    this.a().setAttribute("preserveAspectRatio", "none"), this.Cf ? this.ke() : this.a().setAttribute("viewBox", this.hb + " " + this.Eb + " " + (this.wa ? this.wa + " " + this.Kc : ""))
  }
};
y.ke = function() {
  if(this.m && (this.wa || this.hb || !this.Eb)) {
    var a = this.fa();
    if(0 == a.width) {
      this.a().style.visibility = "hidden"
    }else {
      this.a().style.visibility = "";
      var b = -this.hb, c = -this.Eb, d = a.width / this.wa, a = a.height / this.Kc;
      this.G.a().setAttribute("transform", "scale(" + d + " " + a + ") translate(" + b + " " + c + ")")
    }
  }
};
y.Ca = function(a, b) {
  Od(this.a(), a, b)
};
y.fa = function() {
  if(!H) {
    return this.m ? Pd(this.a()) : Oh.b.fa.call(this)
  }
  var a = this.width, b = this.height, c = B(a) && -1 != a.indexOf("%"), d = B(b) && -1 != b.indexOf("%");
  if(!this.m && (c || d)) {
    return l
  }
  var g, f;
  c && (g = this.a().parentNode, f = Pd(g), a = parseFloat(a) * f.width / 100);
  d && (g = g || this.a().parentNode, f = f || Pd(g), b = parseFloat(b) * f.height / 100);
  return new O(a, b)
};
y.drawImage = function(a, b, c, d, g, f) {
  a = Qh(this, "image", {x:a, y:b, width:c, height:d, "image-rendering":"optimizeQuality", preserveAspectRatio:"none"});
  a.setAttributeNS("http://www.w3.org/1999/xlink", "href", g);
  g = new Mh(a, this);
  this.vd(g, f);
  return g
};
y.Lc = function(a) {
  var b = Qh(this, "g");
  (a || this.G).a().appendChild(b);
  return new Kh(b, this)
};
y.h = function() {
  var a = this.fa();
  Oh.b.h.call(this);
  a || this.dispatchEvent("resize");
  if(this.Cf) {
    var a = this.width, b = this.height;
    "string" == typeof a && -1 != a.indexOf("%") && "string" == typeof b && -1 != b.indexOf("%") && this.Ob.c(Rh(), yg, this.ke);
    this.ke()
  }
};
y.W = function() {
  Oh.b.W.call(this);
  this.Cf && this.Ob.O(Rh(), yg, this.ke)
};
y.f = function() {
  delete this.Kh;
  delete this.ig;
  delete this.G;
  Oh.b.f.call(this)
};
function Rh() {
  Ph || (Ph = new wg(400), Ph.start());
  return Ph
}
;function Sh() {
  return this.e = this.Ia().V.a(this.Va) || this.e
}
function Th(a, b) {
  this.Va = a.id;
  Hh.call(this, a, b)
}
E(Th, Ih);
Th.prototype.a = Sh;
Th.prototype.Ca = function(a, b) {
  var c = this.a(), d = c.style;
  d.width = $(a) + "px";
  d.height = $(b) + "px";
  c.coordsize = $(a) + " " + $(b);
  this.Ia().G != this && (c.coordorigin = "0 0")
};
function Uh(a, b) {
  this.Va = a.id;
  Hh.call(this, a, b)
}
E(Uh, Jh);
Uh.prototype.a = Sh;
Uh.prototype.Ca = function(a, b) {
  var c = this.a().style;
  c.width = Vh(a);
  c.height = Vh(b)
};
Uh.prototype.he = function(a) {
  var b = this.a();
  Wh ? b.src = a : b.setAttribute("src", a)
};
function Xh(a, b, c, d, g) {
  Nh.call(this, a, b, c, d, g);
  this.Ob = new U(this)
}
E(Xh, Nh);
var Wh = document.documentMode && 8 <= document.documentMode;
function Vh(a) {
  return Math.round(100 * (parseFloat(a.toString()) - 0.5)) + "px"
}
function $(a) {
  return Math.round(100 * parseFloat(a.toString()))
}
function Yh(a, b) {
  var c = a.V.createElement("g_vml_:" + b);
  c.id = "goog_" + Ha++;
  return c
}
function Zh(a) {
  Wh && a.m && (a.a().innerHTML = a.a().innerHTML)
}
Xh.prototype.vd = function(a, b) {
  (b || this.G).a().appendChild(a.a());
  Zh(this)
};
Xh.prototype.tf = function(a, b, c, d, g, f) {
  a = a.a();
  a.style.left = Vh(b);
  a.style.top = Vh(c);
  if(d || a.rotation) {
    a.rotation = d, a.coordsize = $(2 * g) + " " + $(2 * f)
  }
};
function $h(a, b, c, d, g) {
  var f = a.style;
  f.position = "absolute";
  f.left = Vh(b);
  f.top = Vh(c);
  f.width = $(d) + "px";
  f.height = $(g) + "px";
  "shape" == a.tagName && (a.coordsize = $(d) + " " + $(g))
}
try {
  eval("document.namespaces")
}catch(ai) {
}
y = Xh.prototype;
y.d = function() {
  var a = this.V.s;
  a.namespaces.g_vml_ || (Wh ? a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml", "#default#VML") : a.namespaces.add("g_vml_", "urn:schemas-microsoft-com:vml"), a.createStyleSheet().cssText = "g_vml_\\:*{behavior:url(#default#VML)}");
  var a = this.width, b = this.height, c = this.V.d("div", {style:"overflow:hidden;position:relative;width:" + (B(a) && wa(a) ? a : parseFloat(a.toString()) + "px") + ";height:" + (B(b) && wa(b) ? b : parseFloat(b.toString()) + "px")});
  this.e = c;
  var d = Yh(this, "group"), g = d.style;
  g.position = "absolute";
  g.left = g.top = 0;
  g.width = this.width;
  g.height = this.height;
  d.coordsize = this.wa ? $(this.wa) + " " + $(this.Kc) : $(a) + " " + $(b);
  d.coordorigin = da(this.hb) ? $(this.hb) + " " + $(this.Eb) : "0 0";
  c.appendChild(d);
  this.G = new Th(d, this);
  wc(c, "resize", C(this.We, this))
};
y.We = function() {
  var a = Pd(this.a()), b = this.G.a().style;
  if(a.width) {
    b.width = a.width + "px", b.height = a.height + "px"
  }else {
    for(a = this.a();a && a.currentStyle && "none" != a.currentStyle.display;) {
      a = a.parentNode
    }
    a && a.currentStyle && this.Ob.c(a, "propertychange", this.We)
  }
  this.dispatchEvent("resize")
};
y.Ca = function(a, b) {
  Od(this.a(), a, b)
};
y.fa = function() {
  var a = this.a();
  return new O(a.style.pixelWidth || a.offsetWidth || 1, a.style.pixelHeight || a.offsetHeight || 1)
};
y.drawImage = function(a, b, c, d, g, f) {
  var k = Yh(this, "image");
  $h(k, a, b, c, d);
  Wh ? k.src = g : k.setAttribute("src", g);
  a = new Uh(k, this);
  this.vd(a, f);
  return a
};
y.Lc = function(a) {
  var b = Yh(this, "group"), c = this.og();
  $h(b, 0, 0, c.width, c.height);
  (a || this.G).a().appendChild(b);
  return new Th(b, this)
};
y.h = function() {
  Xh.b.h.call(this);
  this.We();
  Zh(this)
};
y.f = function() {
  this.G = l;
  Xh.b.f.call(this)
};
function bi(a) {
  Hh.call(this, l, a);
  this.w = []
}
E(bi, Ih);
bi.prototype.Ca = s();
bi.prototype.appendChild = function(a) {
  this.w.push(a)
};
bi.prototype.Mc = function() {
  for(var a = 0, b = this.w.length;a < b;a++) {
    ci(this.Ia(), this.w[a])
  }
};
function di(a, b, c, d, g, f, k) {
  Hh.call(this, a, b);
  this.Si = c;
  this.Ti = d;
  this.Gf = g;
  this.Ve = f;
  this.Mg = k
}
E(di, Jh);
y = di.prototype;
y.Ne = o;
y.Ca = function(a, b) {
  this.Gf = a;
  this.Ve = b;
  this.Ne && this.Ia().uc()
};
y.he = function(a) {
  this.Mg = a;
  this.Ne && this.Ia().uc()
};
y.Mc = function(a) {
  this.xg ? (this.Gf && this.Ve && a.drawImage(this.xg, this.Si, this.Ti, this.Gf, this.Ve), this.Ne = j) : (a = new Image, a.onload = C(this.Zh, this, a), a.src = this.Mg)
};
y.Zh = function(a) {
  this.xg = a;
  this.Ia().uc()
};
function ei(a, b, c, d, g) {
  Nh.call(this, a, b, c, d, g)
}
E(ei, Nh);
y = ei.prototype;
y.tf = function() {
  this.uc()
};
function fi(a, b) {
  var c = a.getContext();
  c.save();
  var d = b.Bf ? b.Bf.M() : new Fh, g = d.qa, f = d.sa;
  (g || f) && c.translate(g, f);
  (d = d.ga) && c.rotate(Math.asin(d))
}
y.d = function() {
  var a = this.V.d("div", {style:"position:relative;overflow:hidden"});
  this.e = a;
  this.Jc = this.V.d("canvas");
  a.appendChild(this.Jc);
  this.ff = this.G = new bi(this);
  this.Ji = 0;
  gi(this)
};
y.getContext = function() {
  this.a() || this.d();
  this.ec || (this.ec = this.Jc.getContext("2d"), this.ec.save());
  return this.ec
};
y.Ca = function(a, b) {
  this.width = a;
  this.height = b;
  gi(this);
  this.uc()
};
y.fa = function() {
  var a = this.width, b = this.height, c = B(a) && -1 != a.indexOf("%"), d = B(b) && -1 != b.indexOf("%");
  if(!this.m && (c || d)) {
    return l
  }
  var g, f;
  c && (g = this.a().parentNode, f = Pd(g), a = parseFloat(a) * f.width / 100);
  d && (g = g || this.a().parentNode, f = f || Pd(g), b = parseFloat(b) * f.height / 100);
  return new O(a, b)
};
function gi(a) {
  Od(a.a(), a.width, a.height);
  var b = a.fa();
  b && (Od(a.Jc, b.width, b.height), a.Jc.width = b.width, a.Jc.height = b.height, a.ec = l)
}
y.reset = function() {
  var a = this.getContext();
  a.restore();
  var b = this.fa();
  b.width && b.height && a.clearRect(0, 0, b.width, b.height);
  a.save()
};
y.uc = function() {
  if(!this.uk && this.m) {
    this.reset();
    if(this.wa) {
      var a = this.fa();
      this.getContext().scale(a.width / this.wa, a.height / this.Kc)
    }
    (this.hb || this.Eb) && this.getContext().translate(-this.hb, -this.Eb);
    fi(this, this.G);
    this.G.Mc(this.ec);
    this.getContext().restore()
  }
};
function ci(a, b) {
  var c = a.getContext();
  fi(a, b);
  if(!b.kk || !b.mk) {
    b.Mc(c)
  }else {
    var d = b.fill;
    if(d) {
      var g = c.createLinearGradient(d.ok(), d.qk(), d.pk(), d.rk());
      g.addColorStop(0, d.ik());
      g.addColorStop(1, d.jk());
      c.fillStyle = g;
      b.Mc(c);
      c.fill()
    }
    if(d = b.wk) {
      b.Mc(c), c.strokeStyle = d.hk(), d = d.nk(), B(d) && -1 != d.indexOf("px") && (d = parseFloat(d) / a.Uh()), c.lineWidth = d, c.stroke()
    }
  }
  a.getContext().restore()
}
y.vd = function(a, b) {
  this.append(a, b)
};
y.append = function(a, b) {
  b = b || this.G;
  b.appendChild(a);
  this.m && !this.Ji && !(b != this.G && b != this.ff) && ci(this, a)
};
y.drawImage = function(a, b, c, d, g, f) {
  a = new di(l, this, a, b, c, d, g);
  this.append(a, f);
  return a
};
y.Lc = function(a) {
  var b = new bi(this), a = a || this.G;
  if(a == this.G || a == this.ff) {
    this.ff = b
  }
  this.append(b, a);
  return b
};
y.f = function() {
  this.ec = l;
  ei.b.f.call(this)
};
y.h = function() {
  var a = this.fa();
  ei.b.h.call(this);
  a || (gi(this), this.dispatchEvent("resize"));
  this.uc()
};
function hi(a, b) {
  var c;
  c = G && !J("9") ? new Xh(a, b, h, h, h) : I && (!J("420") || Va) ? new ei(a, b, h, h, h) : new Oh(a, b, h, h, h);
  c.d();
  return c
}
;function ii(a, b, c) {
  Eh.call(this, c);
  this.n = a
}
E(ii, Eh);
y = ii.prototype;
y.u = function(a) {
  ii.b.u.call(this, a);
  var b = this.n.get("width"), c = this.n.get("height"), d = this.n.get("offsetX"), g = this.n.get("offsetY"), f = this.n.get("value"), k = this.n.get("imagepathOn"), m = this.n.get("imagepathOff"), f = f ? k : m;
  this.ld = k;
  this.kd = m;
  this.uh = d - b / 2;
  this.vh = g - c / 2;
  this.qd = b;
  this.jd = c;
  a.Lc().Ca(b + "px", c + "px");
  this.ed(f)
};
y.h = function() {
  ii.b.h.call(this);
  this.fb(this.n.get("value"));
  this.o().c(this.n, "model_change", this.Ec)
};
y.ed = function(a) {
  this.ab ? (this.ab.he(a), this.ab instanceof Mh && Lh(this.ab.a(), {href:a})) : (this.ab = this.Ia().drawImage(this.uh, this.vh, this.qd, this.jd, a), this.o().c(this.ab, "click", this.ue))
};
y.fb = function(a) {
  this.ed(a ? this.ld : this.kd)
};
y.Ec = function(a) {
  this.fb(a.target.De)
};
y.ue = function() {
  this.n.set("value", this.n.get("value") ? 0 : 1)
};
function ji(a, b, c) {
  Eh.call(this, c);
  this.n = a
}
E(ji, Eh);
y = ji.prototype;
y.u = function(a) {
  ji.b.u.call(this, a);
  var b = this.n.get("width"), c = this.n.get("height"), d = this.n.get("offsetX"), g = this.n.get("offsetY"), f = this.n.get("imagepath");
  this.n.get("value");
  this.dh = d;
  this.eh = g;
  a.Lc().Ca(b + "px", c + "px");
  this.ab = a.drawImage(d - b / 2, g - c / 2, b, c, f)
};
y.h = function() {
  ji.b.h.call(this);
  this.fb(this.n.get("value"));
  this.o().c(this.ab, "mousedown", this.wh).c(this.n, "model_change", this.Ec)
};
y.fb = function(a) {
  var b = this.ab, a = 270 * (a - 0.5), c = this.dh, d = this.eh;
  b.Bf = Gh(a * Math.PI / 180, c, d).translate(0, 0);
  b.Ia().tf(b, 0, 0, a, c, d)
};
y.Ec = function(a) {
  this.fb(a.target.De)
};
y.wh = function(a) {
  this.o().c(td(this.g()), "mouseup", this.Xf).c(td(this.g()), "mousemove", this.Wf);
  this.Jf = a.clientY
};
y.Wf = function(a) {
  var b = a.clientY;
  this.n.set("value", this.n.get("value") + (this.Jf - b) * (a.ctrlKey ? 3.0E-4 : 0.0030));
  this.Jf = b;
  a.stopPropagation()
};
y.Xf = function() {
  this.o().O(td(this.g()), "mousemove", this.Wf).O(td(this.g()), "mouseup", this.Xf)
};
function ki(a, b, c) {
  Eh.call(this, c);
  this.n = a
}
E(ki, Eh);
y = ki.prototype;
y.u = function(a) {
  ki.b.u.call(this, a);
  var b = this.n.get("width"), c = this.n.get("height"), d = this.n.get("offsets");
  this.n.get("value");
  var g = this.n.get("imagepathOn"), f = this.n.get("imagepathOff");
  this.ld = g;
  this.kd = f;
  this.th = xb(d, function(a) {
    return{offsetX:a.offsetX - b / 2, offsetY:a.offsetY - c / 2}
  });
  this.qd = b;
  this.jd = c;
  a.Lc().Ca(b + "px", c + "px");
  this.ed()
};
y.h = function() {
  ki.b.h.call(this);
  this.fb(this.n.get("value"));
  this.o().c(this.n, "model_change", this.Ec)
};
y.ed = function() {
  this.gd ? L(this.gd, function(a, b) {
    var c = this.n.get("value") == b ? this.ld : this.kd;
    a.he(c);
    a instanceof Mh && Lh(a.a(), {href:c})
  }, this) : (this.gd = [], L(this.th, function(a, b) {
    var c = this.n.get("value") == b ? this.ld : this.kd, c = this.Ia().drawImage(a.offsetX, a.offsetY, this.qd, this.jd, c);
    this.o().c(c, "click", this.ue);
    this.gd.push(c)
  }, this))
};
y.fb = function() {
  this.ed()
};
y.Ec = function() {
  this.fb()
};
y.ue = function(a) {
  this.n.set("value", Bb(this.gd, function(b) {
    return b == a.currentTarget
  }))
};
function li(a, b, c, d, g) {
  this.bh = b;
  this.pe = c;
  this.If = d;
  this.yh = a;
  this.gh = [];
  V.call(this, g)
}
E(li, V);
li.prototype.u = function(a) {
  li.b.u.call(this, a);
  var b = this.g();
  this.sd = b.d("div", "plugin-controlpanel-wrapper");
  this.bc = hi(this.pe, this.If);
  this.bc.drawImage(0, 0, this.pe, this.If, this.bh);
  Bd(this.sd, {marginTop:"100px", width:this.qd + "px", height:this.jd + "px"});
  L(this.yh.getAll(), function(a) {
    if(a instanceof mi) {
      var b = new ji(a)
    }else {
      a instanceof ni ? b = new ii(a) : a instanceof oi && (b = new ki(a))
    }
    b.t(this.bc);
    this.gh.push(b)
  }, this);
  b.appendChild(a, this.sd);
  this.bc.ua(this.sd)
};
li.prototype.h = function() {
  var a = pb(ic);
  this.o().c(this.bc.a(), a, function(a) {
    a.preventDefault()
  })
};
li.prototype.be = function() {
  var a = $d(this.a());
  this.g();
  Bd(this.sd, {marginLeft:(a.width - this.pe) / 2 + "px"})
};
function oi(a, b, c, d, g, f, k) {
  nh.call(this, {name:a, value:b, width:c, height:d, offsets:g, imagepathOn:f, imagepathOff:k})
}
E(oi, nh);
oi.prototype.set = function(a, b) {
  "value" == a && (b %= this.get("offsets").length);
  oi.b.set.call(this, a, b)
};
function mi(a, b, c, d, g, f, k) {
  nh.call(this, {name:a, value:b, width:c, height:d, offsetX:g, offsetY:f, imagepath:k})
}
E(mi, nh);
mi.prototype.set = function(a, b) {
  "value" == a && (b = Math.max(0, b), b = Math.min(1, b));
  mi.b.set.call(this, a, b)
};
function pi(a) {
  this.z = o;
  this.sh = a;
  this.od = []
}
E(pi, yf);
pi.prototype.add = function(a) {
  var b;
  a instanceof this.sh || e(Error("Collection was added invalid instance."));
  this.od.push([a, b ? b : l]);
  this.dispatchEvent(new N(qi, a))
};
pi.prototype.remove = function(a) {
  return ri(this, a)
};
function ri(a, b) {
  return Db(a.od, function(a) {
    return b.ya(a[0])
  }) ? (a.dispatchEvent(new N(si, b)), j) : o
}
pi.prototype.reset = function() {
  this.od = [];
  this.dispatchEvent(new N(ti))
};
pi.prototype.getAll = function() {
  return xb(this.od, function(a) {
    return a[0]
  })
};
var qi = "collection-add", si = "collection-remove", ti = "collection-reset";
function ni(a, b, c, d, g, f, k, m) {
  nh.call(this, {name:a, value:b ? 1 : 0, width:c, height:d, offsetX:g, offsetY:f, imagepathOn:k, imagepathOff:m})
}
E(ni, nh);
ni.prototype.set = function(a, b) {
  "value" == a && (b = b ? 1 : 0);
  ni.b.set.call(this, a, b)
};
function ui(a) {
  this.z = o;
  this.wb = a
}
E(ui, yf);
y = ui.prototype;
y.Wa = function() {
  this.oe = cf.X();
  this.pd = new Af(this.wb.toString(), {de:48E3});
  this.hd = new Ch(this.pd);
  var a = this.oe, b = this.hd;
  Dh(b, a.eb);
  var c = a.jh++;
  a.Cc[c] = b;
  this.oe.play();
  this.Fa = new tf(sf(-4), sf(4), of.X());
  this.o().c(this.Fa, wf, this.Vf, o, this).c(this.Fa, vf, this.Uf, o, this).c(this.pd, Bf, this.Bc, o, this).c(this.pd, Df, this.mh, o, this)
};
y.Jb = t("xh");
y.f = function() {
  alert("dispose");
  V.b.f.call(this)
};
y.Vf = function(a) {
  Ef(this.hd.ze, new Gf(Hf, {Z:a.Z, Ff:1})).F()
};
y.Uf = function(a) {
  Ef(this.hd.ze, new Gf(If, {Z:a.Z, Ff:1})).F()
};
y.Bc = function(a) {
  console.log(a.error.filename);
  df(this.oe, this.hd);
  this.o().O(this.Fa, wf, this.Vf).O(this.Fa, vf, this.Uf);
  this.dispatchEvent(a)
};
y.mh = function(a) {
  var b = new pi(nh);
  if(a = a.target.controller) {
    if(!da(a.background)) {
      alert("Plugin did not send 'background'");
      return
    }
    if(!ia(a.controls)) {
      alert("Plugin did not send 'background'");
      return
    }
    var c = j;
    L(a.controls, function(a) {
      if(!B(a.name) || !ma(a.value)) {
        c = o
      }else {
        switch(a.type) {
          case "control":
            a = new mi(a.name, a.value, a.width, a.height, a.offsetX, a.offsetY, Zb(this.wb, new Ob(a.image)).toString());
            break;
          case "toggle":
            a = new ni(a.name, a.value, a.width, a.height, a.offsetX, a.offsetY, Zb(this.wb, new Ob(a.imageOn)).toString(), Zb(this.wb, new Ob(a.imageOff)).toString());
            break;
          case "radio":
            a = new oi(a.name, a.value, a.width, a.height, a.offsets, Zb(this.wb, new Ob(a.imageOn)).toString(), Zb(this.wb, new Ob(a.imageOff)).toString());
            break;
          default:
            e(Error("invalid param"))
        }
        b.add(a)
      }
    }, this);
    if(c) {
      L(b.getAll(), function(a) {
        this.o().c(a, "model_change", this.Ch)
      }, this)
    }else {
      alert("Plugin init parameter is invalid.;");
      return
    }
    this.Oa = new li(b, Zb(this.wb, new Ob(a.background.image)).toString(), a.background.width, a.background.height)
  }
  this.xh = this.Oa ? new xf(this.Fa, this.Oa) : new xf(this.Fa);
  this.dispatchEvent(new N(vi))
};
y.Ch = function(a) {
  Ff(this.pd, a.target.oi.get("name"), a.target.De).F()
};
var vi = "oscillator-init";
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
var wi = function() {
  function a(a, c) {
    if(!a) {
      return[]
    }
    if(a.constructor == Array) {
      return a
    }
    if(!B(a)) {
      return[a]
    }
    if(B(c) && (c = B(c) ? document.getElementById(c) : c, !c)) {
      return[]
    }
    var c = c || document, f = c.ownerDocument || c.documentElement;
    lc = c.contentType && "application/xml" == c.contentType || Ua && (c.doctype || "[object XMLDocument]" == f.toString()) || !!f && (G ? f.xml : c.xmlVersion || f.xmlVersion);
    return(f = d(a)(c)) && f.Vd ? f : b(f)
  }
  function b(a) {
    if(a && a.Vd) {
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
    ib++;
    if(G && lc) {
      var c = ib + "";
      a[0].setAttribute("_zipIdx", c);
      for(var d = 1, f;f = a[d];d++) {
        a[d].getAttribute("_zipIdx") != c && b.push(f), f.setAttribute("_zipIdx", c)
      }
    }else {
      if(G && a.Ih) {
        try {
          for(d = 1;f = a[d];d++) {
            cb(f) && b.push(f)
          }
        }catch(g) {
        }
      }else {
        a[0] && (a[0]._zipIdx = ib);
        for(d = 1;f = a[d];d++) {
          a[d]._zipIdx != ib && b.push(f), f._zipIdx = ib
        }
      }
    }
    return b
  }
  function c(a, b) {
    if(!b) {
      return 1
    }
    var c = jj(a);
    return!b[c] ? b[c] = 1 : 0
  }
  function d(a, b) {
    if(uh) {
      var c = vh[a];
      if(c && !b) {
        return c
      }
    }
    if(c = wh[a]) {
      return c
    }
    var c = a.charAt(0), f = -1 == a.indexOf(" ");
    0 <= a.indexOf("#") && f && (b = j);
    if(uh && !b && -1 == ">~+".indexOf(c) && (!G || -1 == a.indexOf(":")) && !(Y && 0 <= a.indexOf(".")) && -1 == a.indexOf(":contains") && -1 == a.indexOf("|=")) {
      var k = 0 <= ">~+".indexOf(a.charAt(a.length - 1)) ? a + " *" : a;
      return vh[a] = function(b) {
        try {
          9 == b.nodeType || f || e("");
          var c = b.querySelectorAll(k);
          G ? c.Ih = j : c.Vd = j;
          return c
        }catch(g) {
          return d(a, j)(b)
        }
      }
    }
    var m = a.split(/\s*,\s*/);
    return wh[a] = 2 > m.length ? g(a) : function(a) {
      for(var b = 0, c = [], d;d = m[b++];) {
        c = c.concat(g(d)(a))
      }
      return c
    }
  }
  function g(a) {
    var b = la(Aa(a));
    if(1 == b.length) {
      var c = f(b[0]);
      return function(a) {
        if(a = c(a, [])) {
          a.Vd = j
        }
        return a
      }
    }
    return function(a) {
      for(var a = x(a), c, d, g = b.length, k, m, lf = 0;lf < g;lf++) {
        m = [];
        c = b[lf];
        d = a.length - 1;
        0 < d && (k = {}, m.Vd = j);
        d = f(c);
        for(var n = 0;c = a[n];n++) {
          d(c, m, k)
        }
        if(!m.length) {
          break
        }
        a = m
      }
      return m
    }
  }
  function f(a) {
    var b = xh[a.tc];
    if(b) {
      return b
    }
    var c = a.yg, c = c ? c.Yd : "", d = p(a, {hc:1}), f = "*" == a.aa, g = document.getElementsByClassName;
    if(c) {
      g = {hc:1}, f && (g.aa = 1), d = p(a, g), "+" == c ? b = n(d) : "~" == c ? b = m(d) : ">" == c && (b = k(d))
    }else {
      if(a.id) {
        d = !a.Cg && f ? og : p(a, {hc:1, id:1}), b = function(b, c) {
          var f = R(b).a(a.id), g;
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
        if(g && /\{\s*\[native code\]\s*\}/.test("" + g) && a.Sa.length && !Y) {
          var d = p(a, {hc:1, Sa:1, id:1}), q = a.Sa.join(" "), b = function(a, b) {
            for(var c = x(0, b), f, g = 0, k = a.getElementsByClassName(q);f = k[g++];) {
              d(f, a) && c.push(f)
            }
            return c
          }
        }else {
          !f && !a.Cg ? b = function(b, c) {
            for(var d = x(0, c), f, g = 0, k = b.getElementsByTagName(a.Ue());f = k[g++];) {
              d.push(f)
            }
            return d
          } : (d = p(a, {hc:1, aa:1, id:1}), b = function(b, c) {
            for(var f = x(0, c), g, k = 0, m = b.getElementsByTagName(a.Ue());g = m[k++];) {
              d(g, b) && f.push(g)
            }
            return f
          })
        }
      }
    }
    return xh[a.tc] = b
  }
  function k(a) {
    a = a || og;
    return function(b, d, f) {
      for(var g = 0, k = b[u];b = k[g++];) {
        Yc(b) && (!f || c(b, f)) && a(b, g) && d.push(b)
      }
      return d
    }
  }
  function m(a) {
    return function(b, d, f) {
      for(b = b[Zc];b;) {
        if(Yc(b)) {
          if(f && !c(b, f)) {
            break
          }
          a(b) && d.push(b)
        }
        b = b[Zc]
      }
      return d
    }
  }
  function n(a) {
    return function(b, d, f) {
      for(;b = b[Zc];) {
        if(!Wd || cb(b)) {
          (!f || c(b, f)) && a(b) && d.push(b);
          break
        }
      }
      return d
    }
  }
  function p(a, b) {
    if(!a) {
      return og
    }
    var b = b || {}, c = l;
    b.hc || (c = A(c, cb));
    b.aa || "*" != a.aa && (c = A(c, function(b) {
      return b && b.tagName == a.Ue()
    }));
    b.Sa || L(a.Sa, function(a, b) {
      var d = RegExp("(?:^|\\s)" + a + "(?:\\s|$)");
      c = A(c, function(a) {
        return d.test(a.className)
      });
      c.count = b
    });
    b.Tb || L(a.Tb, function(a) {
      var b = a.name;
      mf[b] && (c = A(c, mf[b](b, a.value)))
    });
    b.xd || L(a.xd, function(a) {
      var b, d = a.wd;
      a.type && yh[a.type] ? b = yh[a.type](d, a.lf) : d.length && (b = kj(d));
      b && (c = A(c, b))
    });
    b.id || a.id && (c = A(c, function(b) {
      return!!b && b.id == a.id
    }));
    c || "default" in b || (c = og);
    return c
  }
  function q(a) {
    return D(a) % 2
  }
  function r(a) {
    return!(D(a) % 2)
  }
  function D(a) {
    var b = a.parentNode, c = 0, d = b[u], f = a._i || -1, g = b._l || -1;
    if(!d) {
      return-1
    }
    d = d.length;
    if(g == d && 0 <= f && 0 <= g) {
      return f
    }
    b._l = d;
    f = -1;
    for(b = b.firstElementChild || b.firstChild;b;b = b[Zc]) {
      Yc(b) && (b._i = ++c, a === b && (f = c))
    }
    return f
  }
  function v(a) {
    for(;a = a[Zc];) {
      if(Yc(a)) {
        return o
      }
    }
    return j
  }
  function ya(a) {
    for(;a = a[lj];) {
      if(Yc(a)) {
        return o
      }
    }
    return j
  }
  function ka(a, b) {
    return!a ? "" : "class" == b ? a.className || "" : "for" == b ? a.htmlFor || "" : "style" == b ? a.style.cssText || "" : (lc ? a.getAttribute(b) : a.getAttribute(b, 2)) || ""
  }
  function cb(a) {
    return 1 == a.nodeType
  }
  function A(a, b) {
    return!a ? b : !b ? a : function() {
      return a.apply(window, arguments) && b.apply(window, arguments)
    }
  }
  function la(a) {
    function b() {
      0 <= p && (F.id = c(p, v).replace(/\\/g, ""), p = -1);
      if(0 <= q) {
        var a = q == v ? l : c(q, v);
        0 > ">~+".indexOf(a) ? F.aa = a : F.Yd = a;
        q = -1
      }
      0 <= n && (F.Sa.push(c(n + 1, v).replace(/\\/g, "")), n = -1)
    }
    function c(b, d) {
      return Aa(a.slice(b, d))
    }
    for(var a = 0 <= ">~+".indexOf(a.slice(-1)) ? a + " * " : a + " ", d = [], f = -1, g = -1, k = -1, m = -1, n = -1, p = -1, q = -1, r = "", u = "", A, v = 0, D = a.length, F = l, x = l;r = u, u = a.charAt(v), v < D;v++) {
      if("\\" != r) {
        if(F || (A = v, F = {tc:l, Tb:[], xd:[], Sa:[], aa:l, Yd:l, id:l, Ue:function() {
          return lc ? this.Fi : this.aa
        }}, q = v), 0 <= f) {
          if("]" == u) {
            x.wd ? x.lf = c(k || f + 1, v) : x.wd = c(f + 1, v);
            if((f = x.lf) && ('"' == f.charAt(0) || "'" == f.charAt(0))) {
              x.lf = f.slice(1, -1)
            }
            F.xd.push(x);
            x = l;
            f = k = -1
          }else {
            "=" == u && (k = 0 <= "|~^$*".indexOf(r) ? r : "", x.type = k + u, x.wd = c(f + 1, v - k.length), k = v + 1)
          }
        }else {
          0 <= g ? ")" == u && (0 <= m && (x.value = c(g + 1, v)), m = g = -1) : "#" == u ? (b(), p = v + 1) : "." == u ? (b(), n = v) : ":" == u ? (b(), m = v) : "[" == u ? (b(), f = v, x = {}) : "(" == u ? (0 <= m && (x = {name:c(m + 1, v), value:l}, F.Tb.push(x)), g = v) : " " == u && r != u && (b(), 0 <= m && F.Tb.push({name:c(m + 1, v)}), F.Cg = F.Tb.length || F.xd.length || F.Sa.length, F.tk = F.tc = c(A, v), F.Fi = F.aa = F.Yd ? l : F.aa || "*", F.aa && (F.aa = F.aa.toUpperCase()), d.length && 
          d[d.length - 1].Yd && (F.yg = d.pop(), F.tc = F.yg.tc + " " + F.tc), d.push(F), F = l)
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
  var Y = I && "BackCompat" == document.compatMode, u = document.firstChild.children ? "children" : "childNodes", lc = o, yh = {"*=":function(a, b) {
    return function(c) {
      return 0 <= ka(c, a).indexOf(b)
    }
  }, "^=":function(a, b) {
    return function(c) {
      return 0 == ka(c, a).indexOf(b)
    }
  }, "$=":function(a, b) {
    return function(c) {
      c = " " + ka(c, a);
      return c.lastIndexOf(b) == c.length - b.length
    }
  }, "~=":function(a, b) {
    var c = " " + b + " ";
    return function(b) {
      return 0 <= (" " + ka(b, a) + " ").indexOf(c)
    }
  }, "|=":function(a, b) {
    b = " " + b;
    return function(c) {
      c = " " + ka(c, a);
      return c == b || 0 == c.indexOf(b + "-")
    }
  }, "=":function(a, b) {
    return function(c) {
      return ka(c, a) == b
    }
  }}, Wd = "undefined" == typeof document.firstChild.nextElementSibling, Zc = !Wd ? "nextElementSibling" : "nextSibling", lj = !Wd ? "previousElementSibling" : "previousSibling", Yc = Wd ? cb : og, mf = {checked:function() {
    return function(a) {
      return a.checked || a.attributes.checked
    }
  }, "first-child":function() {
    return ya
  }, "last-child":function() {
    return v
  }, "only-child":function() {
    return function(a) {
      return!ya(a) || !v(a) ? o : j
    }
  }, empty:function() {
    return function(a) {
      for(var b = a.childNodes, a = a.childNodes.length - 1;0 <= a;a--) {
        var c = b[a].nodeType;
        if(1 === c || 3 == c) {
          return o
        }
      }
      return j
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
    var c = la(b)[0], d = {hc:1};
    "*" != c.aa && (d.aa = 1);
    c.Sa.length || (d.Sa = 1);
    var f = p(c, d);
    return function(a) {
      return!f(a)
    }
  }, "nth-child":function(a, b) {
    if("odd" == b) {
      return q
    }
    if("even" == b) {
      return r
    }
    if(-1 != b.indexOf("n")) {
      var c = b.split("n", 2), d = c[0] ? "-" == c[0] ? -1 : parseInt(c[0], 10) : 1, f = c[1] ? parseInt(c[1], 10) : 0, g = 0, k = -1;
      0 < d ? 0 > f ? f = f % d && d + f % d : 0 < f && (f >= d && (g = f - f % d), f %= d) : 0 > d && (d *= -1, 0 < f && (k = f, f %= d));
      if(0 < d) {
        return function(a) {
          a = D(a);
          return a >= g && (0 > k || a <= k) && a % d == f
        }
      }
      b = f
    }
    var m = parseInt(b, 10);
    return function(a) {
      return D(a) == m
    }
  }}, kj = G ? function(a) {
    var b = a.toLowerCase();
    "class" == b && (a = "className");
    return function(c) {
      return lc ? c.getAttribute(a) : c[a] || c[b]
    }
  } : function(a) {
    return function(b) {
      return b && b.getAttribute && b.hasAttribute(a)
    }
  }, xh = {}, wh = {}, vh = {}, uh = !!document.querySelectorAll && (!I || J("526")), ib = 0, jj = G ? function(a) {
    return lc ? a.getAttribute("_uid") || a.setAttribute("_uid", ++ib) || ib : a.uniqueID
  } : function(a) {
    return a._uid || (a._uid = ++ib)
  };
  a.Tb = mf;
  return a
}();
ca("goog.dom.query", wi);
ca("goog.dom.query.pseudos", wi.Tb);
function xi(a, b, c) {
  this.Pa = [];
  this.Dc = {};
  this.Tf = {};
  this.Ac = {};
  this.xb = this.Mf = 0;
  this.lh = a;
  this.Y = new U;
  this.Zf = [];
  this.$f = {};
  V.call(this, c)
}
E(xi, V);
function yi(a, b) {
  var c = rb(a.$f, function(a) {
    return a == b
  });
  B(c) && (a.Zf[c].N(), a.Zf[c] = o, delete a.$f[c])
}
y = xi.prototype;
y.d = function() {
  this.e = cd(this.lh)
};
function zi(a) {
  a = wi(".windowsection-header", a.a());
  1 != a.length && e(Error("fatal error"));
  return a[0]
}
function Ai(a) {
  a = wi(".windowsection-body", a.a());
  1 != a.length && e(Error("fatal error"));
  return a[0]
}
y.h = function() {
  xi.b.h.call(this);
  this.mb()
};
y.Ce = function(a, b) {
  this.Pa.push({window:a, vk:b, index:this.xb});
  var c = cd("<div class='windowIndex" + this.xb + " windowsection-body-inner-wrapper'></div>"), d = cd("<div class='windowsection-header-label-inner-wrapper windowHeaderIndex" + this.xb + "'><div class='windowsection-header-label left'></div><div class='windowsection-header-label center'><span class='windowsection-header-label-text'>" + a.nh + "</span><a class='windowsection-header-label-closebutton' href='#'>x</a></div><div class='windowsection-header-label right'></div></div>");
  Bi(this, a, d, c);
  Ai(this).appendChild(c);
  zi(this).appendChild(d);
  this.Ac[this.xb] = c;
  this.Dc[this.xb] = d;
  this.Tf[this.xb] = wi(".windowsection-header-label-text", d)[0];
  a.t(c);
  this.mb();
  this.xb++;
  Ci(this, a)
};
y.ui = function(a) {
  Di(this, a.target.xk, a.target.filename)
};
function Di(a, b, c) {
  var d = 0;
  L(a.Pa, function(a) {
    b.ya(a.window) && (id(this.Tf[a.index], c), a.label = c, d++)
  }, a);
  1 != d && e(Error("component does not exist in _windowInfoList at setLabel()"))
}
y.Md = function(a) {
  return 0 == wb(this.Pa, function(b) {
    return a.ya(b.window)
  }, this).length ? o : j
};
function Ci(a, b) {
  Ab(a.Pa, function() {
    return b.ya(b)
  }) || e(Error("window section doesn't have the window object to activate."));
  L(a.Pa, function(a) {
    b.ya(a.window) ? (P(this.Dc[a.index], "active"), L(wi(".windowsection-header-label", this.Dc[a.index]), function(a) {
      Bd(a, {"z-index":this.Mf});
      P(a, "active")
    }), P(this.Ac[a.index], "active"), T(this.Ac[a.index], j)) : (Kc(this.Dc[a.index], "active"), L(wi(".windowsection-header-label", this.Dc[a.index]), function(a) {
      Kc(a, "active")
    }), Kc(this.Ac[a.index], "active"), T(this.Ac[a.index], o))
  }, a);
  a.Mf++
}
function Bi(a, b, c, d) {
  var g = jd(c, function(a) {
    return M(Jc(a), "windowsection-header-label-closebutton")
  });
  a.o().c(c, "click", function() {
    Ci(this, b)
  }).c(d, "click", function() {
    Ci(this, b)
  }).c(g, "click", function(a) {
    this.rf(b);
    a.preventDefault();
    a.stopPropagation()
  }).c(b, "change_label", a.ui)
}
y.rf = function(a) {
  yi(this, a);
  ob(wb(this.Pa, function(b) {
    return a.ya(b.window)
  }), function(a) {
    L(wi(".windowIndex" + a.index, this.a()), function(a) {
      fd(a)
    }, this);
    L(wi(".windowHeaderIndex" + a.index, this.a()), function(a) {
      fd(a)
    }, this)
  }, this);
  this.Pa = wb(this.Pa, function(b) {
    return!a.ya(b.window)
  });
  a.N()
};
y.mb = function() {
  var a = Vd(zi(this));
  Ai(this);
  var b = Vd(sd(this.a(), w(j)));
  Xd(Ai(this), new O(b.width, b.height - a.height));
  L(this.Pa, function(a) {
    a.window.be()
  })
};
function kf(a) {
  this.Fh = "<div class='windowsection'><div class='windowsection-header'></div><div class='windowsection-body_wrapper'><div class='windowsection-body'></div></div></div>";
  this.Gc = [];
  this.zc = l;
  V.call(this, a)
}
E(kf, V);
y = kf.prototype;
y.u = function(a) {
  kf.b.u.call(this, a);
  var b = Xc("div", {"class":"windowholder"});
  a.appendChild(b);
  P(a, "synthjs-sdkoscillator-windowholder-pane")
};
y.d = function() {
  this.e = Xc("div", "windowholder")
};
y.f = function() {
  kf.b.f.call(this)
};
y.Ce = function(a) {
  this.zc == l && (this.zc = new xi(this.Fh), this.zc.ua(this.a()), this.Gc.push(this.zc));
  this.Md(a) ? Ei(this, a) : this.zc.Ce(a)
};
y.Md = function(a) {
  var b = o;
  L(this.Gc, function(c) {
    b |= c.Md(a)
  }, this);
  return b
};
function Ei(a, b) {
  L(a.Gc, function(a) {
    Ci(a, b)
  }, a)
}
y.rf = function(a) {
  var b = 0;
  L(this.Gc, function(c) {
    c.Md(a) && (c.rf(a), b++)
  }, this);
  b && a.N();
  return b
};
y.mb = function(a) {
  L(this.Gc, function(b) {
    b.mb(a)
  })
};
function Fi(a, b) {
  jf.call(this, a);
  this.Lf = b.bootstrapJs;
  this.ve = new ui(new Ob(this.Lf));
  this.o().c(this.ve, vi, this.oh);
  this.ve.Wa()
}
E(Fi, jf);
y = Fi.prototype;
y.Lf = "main.js";
y.Of = function() {
  return mh([])
};
y.Hf = function() {
  this.o().c(document, "keydown", this.zi)
};
y.zi = s();
y.oh = function() {
  this.Ae.Ce(this.ve.Jb())
};
window.OscillatorPlayer = Fi;
function Gi(a) {
  this.z = o;
  this.e = a;
  a = G ? "focusout" : "blur";
  this.li = wc(this.e, G ? "focusin" : "focus", this, !G);
  this.mi = wc(this.e, a, this, !G)
}
E(Gi, wd);
Gi.prototype.handleEvent = function(a) {
  var b = new pc(a.$);
  b.type = "focusin" == a.type || "focus" == a.type ? "focusin" : "focusout";
  this.dispatchEvent(b)
};
Gi.prototype.f = function() {
  Gi.b.f.call(this);
  Cc(this.li);
  Cc(this.mi);
  delete this.e
};
function Hi(a, b) {
  V.call(this, b);
  this.Ri = !!a
}
E(Hi, V);
y = Hi.prototype;
y.Oe = l;
y.p = o;
y.da = l;
y.T = l;
y.Na = l;
y.l = w("goog-modalpopup");
y.Gd = t("da");
y.d = function() {
  Hi.b.d.call(this);
  var a = this.a();
  P(a, this.l());
  od(a, j);
  T(a, o);
  Ii(this);
  Ji(this)
};
function Ii(a) {
  if(a.Ri && !a.T) {
    var b;
    b = a.g().d("iframe", {frameborder:0, style:"border:0;vertical-align:bottom;", src:'javascript:""'});
    a.T = b;
    a.T.className = a.l() + "-bg";
    T(a.T, o);
    Sd(a.T, 0)
  }
  a.da || (a.da = a.g().d("div", a.l() + "-bg"), T(a.da, o))
}
function Ji(a) {
  a.Na || (a.Na = a.g().createElement("span"), T(a.Na, o), od(a.Na, j), a.Na.style.position = "absolute")
}
y.ia = function(a) {
  return!!a && "DIV" == a.tagName
};
y.u = function(a) {
  Hi.b.u.call(this, a);
  P(this.a(), this.l());
  Ii(this);
  Ji(this);
  T(this.a(), o)
};
y.h = function() {
  if(this.T) {
    var a = this.a();
    a.parentNode && a.parentNode.insertBefore(this.T, a)
  }
  a = this.a();
  a.parentNode && a.parentNode.insertBefore(this.da, a);
  Hi.b.h.call(this);
  a = this.a();
  a.parentNode && a.parentNode.insertBefore(this.Na, a.nextSibling);
  this.Oe = new Gi(td(this.g()));
  this.o().c(this.Oe, "focusin", this.wi)
};
y.W = function() {
  this.p && this.v(o);
  mc(this.Oe);
  Hi.b.W.call(this);
  fd(this.T);
  fd(this.da);
  fd(this.Na)
};
y.v = function(a) {
  a != this.p && (this.rc && this.rc.stop(), this.Ic && this.Ic.stop(), this.qc && this.qc.stop(), this.Hc && this.Hc.stop(), a ? this.Oi() : this.gi())
};
y.Oi = function() {
  this.dispatchEvent("beforeshow") && (this.sf(), this.$c(), this.o().c(this.g().Jb(), "resize", this.sf), Ki(this, j), this.focus(), this.p = j, this.rc && this.Ic ? (zc(this.rc, "end", this.Xd, o, this), this.Ic.play(), this.rc.play()) : this.Xd())
};
y.gi = function() {
  this.dispatchEvent("beforehide") && (this.o().O(this.g().Jb(), "resize", this.sf), this.p = o, this.qc && this.Hc ? (zc(this.qc, "end", this.Wd, o, this), this.Hc.play(), this.qc.play()) : this.Wd())
};
function Ki(a, b) {
  a.T && T(a.T, b);
  a.da && T(a.da, b);
  T(a.a(), b);
  T(a.Na, b)
}
y.Xd = function() {
  this.dispatchEvent("show")
};
y.Wd = function() {
  Ki(this, o);
  this.dispatchEvent("hide")
};
y.focus = function() {
  this.mg()
};
y.sf = function() {
  this.T && T(this.T, o);
  this.da && T(this.da, o);
  var a = td(this.g()), b = Vc((a ? Wc(a) : window) || window || window), c = Math.max(b.width, Math.max(a.body.scrollWidth, a.documentElement.scrollWidth)), a = Math.max(b.height, Math.max(a.body.scrollHeight, a.documentElement.scrollHeight));
  this.T && (T(this.T, j), Od(this.T, c, a));
  this.da && (T(this.da, j), Od(this.da, c, a))
};
y.$c = function() {
  var a = td(this.g()), b = (a ? Wc(a) : window) || window;
  if("fixed" == Fd(this.a())) {
    var c = a = 0
  }else {
    c = vd(this.g()), a = c.x, c = c.y
  }
  var d = Pd(this.a()), b = Vc(b || window), a = Math.max(a + b.width / 2 - d.width / 2, 0), c = Math.max(c + b.height / 2 - d.height / 2, 0);
  Gd(this.a(), a, c);
  Gd(this.Na, a, c)
};
y.wi = function(a) {
  a.target == this.Na && (a = this.mg, na(a) ? this && (a = C(a, this)) : a && "function" == typeof a.handleEvent ? a = C(a.handleEvent, a) : e(Error("Invalid listener argument")), xg.setTimeout(a, 0))
};
y.mg = function() {
  try {
    G && td(this.g()).body.focus(), this.a().focus()
  }catch(a) {
  }
};
y.f = function() {
  mc(this.rc);
  this.rc = l;
  mc(this.qc);
  this.qc = l;
  mc(this.Ic);
  this.Ic = l;
  mc(this.Hc);
  this.Hc = l;
  Hi.b.f.call(this)
};
function Li(a, b, c) {
  Hi.call(this, b, c);
  this.U = a || "modal-dialog";
  this.P = Mi()
}
E(Li, Hi);
y = Li.prototype;
y.Oh = j;
y.cf = j;
y.Eg = j;
y.Nh = j;
y.yd = 0.5;
y.zf = "";
y.Q = "";
y.Fb = l;
y.Mh = o;
y.S = l;
y.ub = l;
y.je = l;
y.$a = l;
y.ka = l;
y.L = l;
y.Zc = "dialog";
y.l = t("U");
y.qb = function(a) {
  this.Q = a;
  this.ka && (this.ka.innerHTML = a)
};
y.D = function() {
  this.a() || this.ua();
  return this.ka
};
y.Gd = function() {
  this.a() || this.ua();
  return Li.b.Gd.call(this)
};
function Ni(a, b) {
  a.yd = b;
  if(a.a()) {
    var c = a.Gd();
    c && Sd(c, a.yd)
  }
}
function Oi(a, b) {
  if(a.a()) {
    var c = a.S, d = a.U + "-title-draggable";
    b ? P(c, d) : Kc(c, d)
  }
  b && !a.Fb ? (a.Fb = new oh(a.a(), a.S), P(a.S, a.U + "-title-draggable"), wc(a.Fb, "start", a.Mi, o, a)) : !b && a.Fb && (a.Fb.N(), a.Fb = l)
}
y.d = function() {
  Li.b.d.call(this);
  var a = this.a(), b = this.g();
  this.S = b.d("div", {className:this.U + "-title", id:le(this)}, this.ub = b.d("span", this.U + "-title-text", this.zf), this.$a = b.d("span", this.U + "-title-close"));
  dd(a, this.S, this.ka = b.d("div", this.U + "-content"), this.L = b.d("div", this.U + "-buttons"));
  this.je = this.S.id;
  Mf(a, this.Zc);
  Nf(a, "labelledby", this.je || "");
  this.Q && (this.ka.innerHTML = this.Q);
  T(this.$a, this.cf);
  this.P && (a = this.P, a.e = this.L, a.ua());
  T(this.L, !!this.P);
  Ni(this, this.yd)
};
y.u = function(a) {
  Li.b.u.call(this, a);
  a = this.U + "-content";
  (this.ka = Rc(l, a, this.a())[0]) ? this.Q = this.ka.innerHTML : (this.ka = this.g().d("div", a), this.Q && (this.ka.innerHTML = this.Q), this.a().appendChild(this.ka));
  var a = this.U + "-title", b = this.U + "-title-text", c = this.U + "-title-close";
  (this.S = Rc(l, a, this.a())[0]) ? (this.ub = Rc(l, b, this.S)[0], this.$a = Rc(l, c, this.S)[0], this.S.id || (this.S.id = le(this))) : (this.S = this.g().d("div", {className:a, id:le(this)}), this.a().insertBefore(this.S, this.ka));
  this.je = this.S.id;
  this.ub ? this.zf = pd(this.ub) : (this.ub = this.g().d("span", b, this.zf), this.S.appendChild(this.ub));
  Nf(this.a(), "labelledby", this.je || "");
  this.$a || (this.$a = this.g().d("span", c), this.S.appendChild(this.$a));
  T(this.$a, this.cf);
  a = this.U + "-buttons";
  (this.L = Rc(l, a, this.a())[0]) ? (this.P = new Pi(this.g()), this.P.t(this.L)) : (this.L = this.g().d("div", a), this.a().appendChild(this.L), this.P && (a = this.P, a.e = this.L, a.ua()), T(this.L, !!this.P));
  Ni(this, this.yd)
};
y.h = function() {
  Li.b.h.call(this);
  this.o().c(this.a(), "keydown", this.Ig).c(this.a(), "keypress", this.Ig);
  this.o().c(this.L, "click", this.ti);
  Oi(this, this.Nh);
  this.o().c(this.$a, "click", this.Di);
  Mf(this.a(), this.Zc);
  "" !== this.ub.id && Nf(this.a(), "labelledby", this.ub.id);
  if(!this.Eg && (this.Eg = o, this.m)) {
    var a = this.g(), b = this.Gd();
    a.removeNode(this.T);
    a.removeNode(b)
  }
};
y.W = function() {
  this.p && this.v(o);
  Oi(this, o);
  Li.b.W.call(this)
};
y.v = function(a) {
  a != this.p && (this.m || this.ua(), Li.b.v.call(this, a))
};
y.Xd = function() {
  Li.b.Xd.call(this);
  this.dispatchEvent(Qi)
};
y.Wd = function() {
  Li.b.Wd.call(this);
  this.dispatchEvent(Ri);
  this.Mh && this.N()
};
y.focus = function() {
  Li.b.focus.call(this);
  if(this.P) {
    var a = this.P.Cd;
    if(a) {
      for(var b = td(this.g()), c = this.L.getElementsByTagName("button"), d = 0, g;g = c[d];d++) {
        if(g.name == a) {
          try {
            if(I || Ua) {
              var f = b.createElement("input");
              f.style.cssText = "position:fixed;width:0;height:0;left:0;top:0;";
              this.a().appendChild(f);
              f.focus();
              this.a().removeChild(f)
            }
            g.focus()
          }catch(k) {
          }
          break
        }
      }
    }
  }
};
y.Mi = function() {
  var a = td(this.g()), b = Vc((a ? Wc(a) : window) || window || window), c = Math.max(a.body.scrollWidth, b.width), a = Math.max(a.body.scrollHeight, b.height), d = Pd(this.a());
  this.Fb.kf = "fixed" == Fd(this.a()) ? new Ad(0, 0, Math.max(0, b.width - d.width), Math.max(0, b.height - d.height)) || new Ad(NaN, NaN, NaN, NaN) : new Ad(0, 0, c - d.width, a - d.height) || new Ad(NaN, NaN, NaN, NaN)
};
y.Di = function() {
  if(this.cf) {
    var a = this.P, b = a && a.Ie;
    b ? (a = a.get(b), this.dispatchEvent(new Si(b, a)) && this.v(o)) : this.v(o)
  }
};
y.f = function() {
  this.L = this.$a = l;
  Li.b.f.call(this)
};
y.ti = function(a) {
  a: {
    for(a = a.target;a != l && a != this.L;) {
      if("BUTTON" == a.tagName) {
        break a
      }
      a = a.parentNode
    }
    a = l
  }
  if(a && !a.disabled) {
    var a = a.name, b = this.P.get(a);
    this.dispatchEvent(new Si(a, b)) && this.v(o)
  }
};
y.Ig = function(a) {
  var b = o, c = o, d = this.P, g = a.target;
  if("keydown" == a.type) {
    if(this.Oh && 27 == a.keyCode) {
      var f = d && d.Ie, g = "SELECT" == g.tagName && !g.disabled;
      f && !g ? (c = j, b = d.get(f), b = this.dispatchEvent(new Si(f, b))) : g || (b = j)
    }else {
      9 == a.keyCode && a.shiftKey && g == this.a() && (c = j)
    }
  }else {
    if(13 == a.keyCode) {
      if("BUTTON" == g.tagName) {
        f = g.name
      }else {
        if(d) {
          var k = d.Cd, m;
          if(m = k) {
            a: {
              m = d.e.getElementsByTagName("BUTTON");
              for(var n = 0, p;p = m[n];n++) {
                if(p.name == k || p.id == k) {
                  m = p;
                  break a
                }
              }
              m = l
            }
          }
          g = ("TEXTAREA" == g.tagName || "SELECT" == g.tagName) && !g.disabled;
          m && !m.disabled && !g && (f = k)
        }
      }
      f && d && (c = j, b = this.dispatchEvent(new Si(f, "" + d.get(f))))
    }
  }
  if(b || c) {
    a.stopPropagation(), a.preventDefault()
  }
  b && this.v(o)
};
function Si(a, b) {
  this.type = Ti;
  this.key = a;
  this.caption = b
}
E(Si, N);
var Ti = "dialogselect", Ri = "afterhide", Qi = "aftershow";
function Pi(a) {
  this.V = a || R();
  Kb.call(this)
}
E(Pi, Kb);
y = Pi.prototype;
y.U = "goog-buttonset";
y.Cd = l;
y.e = l;
y.Ie = l;
y.set = function(a, b, c, d) {
  Kb.prototype.set.call(this, a, b);
  c && (this.Cd = a);
  d && (this.Ie = a);
  return this
};
function Ui(a, b, c, d) {
  return a.set(b.key, b.caption, c, d)
}
y.ua = function() {
  if(this.e) {
    this.e.innerHTML = "";
    var a = R(this.e);
    Jb(this, function(b, c) {
      var d = a.d("button", {name:c}, b);
      c == this.Cd && (d.className = this.U + "-default");
      this.e.appendChild(d)
    }, this)
  }
};
y.t = function(a) {
  if(a && 1 == a.nodeType) {
    this.e = a;
    for(var a = this.e.getElementsByTagName("button"), b = 0, c, d, g;c = a[b];b++) {
      if(d = c.name || c.id, g = pd(c) || c.value, d) {
        var f = 0 == b;
        this.set(d, g, f, c.name == Vi);
        f && P(c, this.U + "-default")
      }
    }
  }
};
y.a = t("e");
y.g = t("V");
var Vi = "cancel", Wi = {key:"ok", caption:"OK"}, Xi = {key:Vi, caption:"Cancel"}, Yi = {key:"yes", caption:"Yes"}, Zi = {key:"no", caption:"No"}, $i = {key:"save", caption:"Save"}, aj = {key:"continue", caption:"Continue"};
function Mi() {
  return Ui(Ui(new Pi, Wi, j), Xi, o, j)
}
"undefined" != typeof document && (Ui(new Pi, Wi, j, j), Mi(), Ui(Ui(new Pi, Yi, j), Zi, o, j), Ui(Ui(Ui(new Pi, Yi), Zi, j), Xi, o, j), Ui(Ui(Ui(new Pi, aj), $i), Xi, j, j));
function bj() {
}
bj.prototype.dg = l;
function cj(a) {
  var b;
  if(!(b = a.dg)) {
    b = {}, dj(a) && (b[0] = j, b[1] = j), b = a.dg = b
  }
  return b
}
;var ej;
function fj() {
}
E(fj, bj);
function gj(a) {
  return(a = dj(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}
function dj(a) {
  if(!a.wg && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for(var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.wg = d
      }catch(g) {
      }
    }
    e(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
  }
  return a.wg
}
ej = new fj;
function hj(a) {
  this.z = o;
  this.headers = new Kb;
  this.vb = a || l
}
E(hj, wd);
hj.prototype.I = af("goog.net.XhrIo");
var ij = /^https?$/i;
y = hj.prototype;
y.Qa = o;
y.k = l;
y.fd = l;
y.Rd = "";
y.gf = "";
y.oc = "";
y.Ed = o;
y.mc = o;
y.Tc = o;
y.Pb = o;
y.Xb = 0;
y.Da = l;
y.Vb = "";
y.Vg = o;
y.send = function(a, b, c, d) {
  this.k && e(Error("[goog.net.XhrIo] Object is active with another request"));
  b = b ? b.toUpperCase() : "GET";
  this.Rd = a;
  this.oc = "";
  this.gf = b;
  this.Ed = o;
  this.Qa = j;
  this.k = this.vb ? gj(this.vb) : gj(ej);
  this.fd = this.vb ? cj(this.vb) : cj(ej);
  this.k.onreadystatechange = C(this.nf, this);
  try {
    W(this.I, mj(this, "Opening Xhr")), this.Tc = j, this.k.open(b, a, j), this.Tc = o
  }catch(g) {
    W(this.I, mj(this, "Error opening Xhr: " + g.message));
    nj(this, g);
    return
  }
  var a = c || "", f = this.headers.M();
  d && Jb(d, function(a, b) {
    f.set(b, a)
  });
  "POST" == b && !f.Cb("Content-Type") && f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  Jb(f, function(a, b) {
    this.k.setRequestHeader(b, a)
  }, this);
  this.Vb && (this.k.responseType = this.Vb);
  "withCredentials" in this.k && (this.k.withCredentials = this.Vg);
  try {
    this.Da && (xg.clearTimeout(this.Da), this.Da = l), 0 < this.Xb && (W(this.I, mj(this, "Will abort after " + this.Xb + "ms if incomplete")), this.Da = xg.setTimeout(C(this.Sg, this), this.Xb)), W(this.I, mj(this, "Sending request")), this.mc = j, this.k.send(a), this.mc = o
  }catch(k) {
    W(this.I, mj(this, "Send error: " + k.message)), nj(this, k)
  }
};
y.Sg = function() {
  "undefined" != typeof ba && this.k && (this.oc = "Timed out after " + this.Xb + "ms, aborting", W(this.I, mj(this, this.oc)), this.dispatchEvent("timeout"), this.abort(8))
};
function nj(a, b) {
  a.Qa = o;
  a.k && (a.Pb = j, a.k.abort(), a.Pb = o);
  a.oc = b;
  oj(a);
  pj(a)
}
function oj(a) {
  a.Ed || (a.Ed = j, a.dispatchEvent("complete"), a.dispatchEvent("error"))
}
y.abort = function() {
  this.k && this.Qa && (W(this.I, mj(this, "Aborting")), this.Qa = o, this.Pb = j, this.k.abort(), this.Pb = o, this.dispatchEvent("complete"), this.dispatchEvent("abort"), pj(this))
};
y.f = function() {
  this.k && (this.Qa && (this.Qa = o, this.Pb = j, this.k.abort(), this.Pb = o), pj(this, j));
  hj.b.f.call(this)
};
y.nf = function() {
  !this.Tc && !this.mc && !this.Pb ? this.Ai() : qj(this)
};
y.Ai = function() {
  qj(this)
};
function qj(a) {
  if(a.Qa && "undefined" != typeof ba) {
    if(a.fd[1] && 4 == rj(a) && 2 == sj(a)) {
      W(a.I, mj(a, "Local request error detected and ignored"))
    }else {
      if(a.mc && 4 == rj(a)) {
        xg.setTimeout(C(a.nf, a), 0)
      }else {
        if(a.dispatchEvent("readystatechange"), 4 == rj(a)) {
          W(a.I, mj(a, "Request complete"));
          a.Qa = o;
          try {
            var b = sj(a), c, d;
            a: {
              switch(b) {
                case 200:
                ;
                case 201:
                ;
                case 202:
                ;
                case 204:
                ;
                case 304:
                ;
                case 1223:
                  d = j;
                  break a;
                default:
                  d = o
              }
            }
            if(!(c = d)) {
              var g;
              if(g = 0 === b) {
                var f = ("" + a.Rd).match(nb)[1] || l;
                if(!f && self.location) {
                  var k = self.location.protocol, f = k.substr(0, k.length - 1)
                }
                g = !ij.test(f ? f.toLowerCase() : "")
              }
              c = g
            }
            if(c) {
              a.dispatchEvent("complete"), a.dispatchEvent("success")
            }else {
              var m;
              try {
                m = 2 < rj(a) ? a.k.statusText : ""
              }catch(n) {
                W(a.I, "Can not get status: " + n.message), m = ""
              }
              a.oc = m + " [" + sj(a) + "]";
              oj(a)
            }
          }finally {
            pj(a)
          }
        }
      }
    }
  }
}
function pj(a, b) {
  if(a.k) {
    var c = a.k, d = a.fd[0] ? fa : l;
    a.k = l;
    a.fd = l;
    a.Da && (xg.clearTimeout(a.Da), a.Da = l);
    b || a.dispatchEvent("ready");
    try {
      c.onreadystatechange = d
    }catch(g) {
      a.I.log(Te, "Problem encountered resetting onreadystatechange: " + g.message, h)
    }
  }
}
y.Vc = function() {
  return!!this.k
};
function rj(a) {
  return a.k ? a.k.readyState : 0
}
function sj(a) {
  try {
    return 2 < rj(a) ? a.k.status : -1
  }catch(b) {
    return a.I.log(Ue, "Can not get status: " + b.message, h), -1
  }
}
function tj(a) {
  try {
    if(!a.k) {
      return l
    }
    if("response" in a.k) {
      return a.k.response
    }
    switch(a.Vb) {
      case "":
      ;
      case "text":
        return a.k.responseText;
      case "arraybuffer":
        if("mozResponseArrayBuffer" in a.k) {
          return a.k.mozResponseArrayBuffer
        }
    }
    a.I.log(Te, "Response type " + a.Vb + " is not supported on this browser", h);
    return l
  }catch(b) {
    return W(a.I, "Can not get response: " + b.message), l
  }
}
function mj(a, b) {
  return b + " [" + a.gf + " " + a.Rd + " " + sj(a) + "]"
}
;function uj(a) {
  hj.call(this, a)
}
E(uj, hj);
uj.prototype.send = function(a, b, c, d) {
  this.k && e(Error("[goog.net.XhrIo] Object is active with another request"));
  b = b ? b.toUpperCase() : "GET";
  this.Rd = a;
  this.oc = "";
  this.gf = b;
  this.Ed = o;
  this.Qa = j;
  this.k = this.vb ? gj(this.vb) : gj(ej);
  this.fd = this.vb ? cj(this.vb) : cj(ej);
  this.k.onreadystatechange = C(this.nf, this);
  try {
    W(this.I, mj(this, "Opening Xhr")), this.Tc = j, this.k.open(b, a, j), this.Tc = o
  }catch(g) {
    W(this.I, mj(this, "Error opening Xhr: " + g.message));
    nj(this, g);
    return
  }
  var a = c || "", f = this.headers.M();
  d && Jb(d, function(a, b) {
    f.set(b, a)
  });
  "POST" == b && !(a instanceof FormData) && !f.Cb("Content-Type") && f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  Jb(f, function(a, b) {
    this.k.setRequestHeader(b, a)
  }, this);
  this.Vb && (this.k.responseType = this.Vb);
  "withCredentials" in this.k && (this.k.withCredentials = this.Vg);
  try {
    this.Da && (xg.clearTimeout(this.Da), this.Da = l), 0 < this.Xb && (W(this.I, mj(this, "Will abort after " + this.Xb + "ms if incomplete")), this.Da = xg.setTimeout(C(this.Sg, this), this.Xb)), W(this.I, mj(this, "Sending request")), this.mc = j, this.k.send(a), this.mc = o
  }catch(k) {
    W(this.I, mj(this, "Send error: " + k.message)), nj(this, k)
  }
};
function vj(a, b, c) {
  ze.call(this);
  b = b || {};
  this.Y = new U;
  this.rh = b.method && ("post" == b.method.toLowerCase() || "put" == b.method.toLowerCase()) ? b.method.toLowerCase() : "get";
  this.hh = b.data || {};
  this.Sf = {};
  "undefined" != typeof b.contentType && (this.Sf["Content-Type"] = b.contentType);
  this.td = new uj;
  var d = new Je;
  b.ie && (c && (b.ie = C(b.ie, c)), this.Y.c(this.td, "success", function(a) {
    b.ie(a.target);
    d.F()
  }));
  b.error && (b.error = C(b.error, c), this.Y.c(this.td, "error", function(a) {
    d.F(b.error(a.target))
  }));
  b.responseType && (this.td.Vb = b.responseType);
  He(Ee(this, function() {
    this.td.send(a, this.rh, this.hh, this.Sf)
  }, this), d)
}
E(vj, Je);
function wj(a, b, c, d, g) {
  Li.call(this, c, d, g);
  this.P = Ui(new Pi, Xi, o, j);
  this.L && (this.P ? (a = this.P, a.e = this.L, a.ua()) : this.L.innerHTML = "", T(this.L, !!this.P));
  console.log(Pi.$i);
  this.Qf = o;
  this.fh = b
}
E(wj, Li);
wj.prototype.v = function(a) {
  this.Qf ? wj.b.v.call(this, a) : (new vj(this.fh.toString(), {ie:C(function(b) {
    this.qb(tj(b));
    this.Qf = j;
    this.v(a)
  }, this)})).F()
};
function xj(a, b) {
  this.zh = new Ob(b.publishUrl);
  Fi.call(this, a, b)
}
E(xj, Fi);
xj.prototype.Of = function() {
  return mh([{label:"Menu", Rg:[{label:"Publish", F:C(this.Ii, this)}]}])
};
xj.prototype.Ii = function() {
  (new wj(0, this.zh)).v(j)
};
window.OscillatorTestPlayer = xj;

