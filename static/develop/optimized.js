function e(a) {
  throw a;
}
var h = void 0, k = !0, l = null, r = !1;
function aa() {
  return function() {
  }
}
function ba(a) {
  return function(b) {
    this[a] = b
  }
}
function s(a) {
  return function() {
    return this[a]
  }
}
function t(a) {
  return function() {
    return a
  }
}
var w, ca = ca || {}, y = this;
function da(a, b) {
  var c = a.split("."), d = y;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var g;c.length && (g = c.shift());) {
    !c.length && ea(b) ? d[g] = b : d = d[g] ? d[g] : d[g] = {}
  }
}
function fa(a) {
  for(var a = a.split("."), b = y, c;c = a.shift();) {
    if(b[c] != l) {
      b = b[c]
    }else {
      return l
    }
  }
  return b
}
function ha() {
}
function A(a) {
  a.K = function() {
    return a.Nf ? a.Nf : a.Nf = new a
  }
}
function ia(a) {
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
function ea(a) {
  return a !== h
}
function ja(a) {
  return"array" == ia(a)
}
function ka(a) {
  var b = ia(a);
  return"array" == b || "object" == b && "number" == typeof a.length
}
function B(a) {
  return"string" == typeof a
}
function la(a) {
  return"number" == typeof a
}
function ma(a) {
  return"function" == ia(a)
}
function na(a) {
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
function D(a, b) {
  function c() {
  }
  c.prototype = b.prototype;
  a.b = b.prototype;
  a.prototype = new c;
  a.prototype.constructor = a
}
;function wa(a, b) {
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
var Ba = /&/g, Ca = /</g, Da = />/g, Ea = /\"/g, Aa = /[&<>\"]/;
function Fa(a) {
  var b = {"&amp;":"&", "&lt;":"<", "&gt;":">", "&quot;":'"'}, c = document.createElement("div");
  return a.replace(Ga, function(a, g) {
    var f = b[a];
    if(f) {
      return f
    }
    if("#" == g.charAt(0)) {
      var j = Number("0" + g.substr(1));
      isNaN(j) || (f = String.fromCharCode(j))
    }
    f || (c.innerHTML = a + " ", f = c.firstChild.nodeValue.slice(0, -1));
    return b[a] = f
  })
}
function Ha(a) {
  return a.replace(/&([^;]+);/g, function(a, c) {
    switch(c) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if("#" == c.charAt(0)) {
          var d = Number("0" + c.substr(1));
          if(!isNaN(d)) {
            return String.fromCharCode(d)
          }
        }
        return a
    }
  })
}
var Ga = /&([^;\s<&]+);?/g;
function Ja(a) {
  return("" + a).replace(/\-([a-z])/g, function(a, c) {
    return c.toUpperCase()
  })
}
;var Ka, La, Ma, Na, Oa, Pa, Qa;
function Ra() {
  return y.navigator ? y.navigator.userAgent : l
}
function Ta() {
  return y.navigator
}
Oa = Na = Ma = La = Ka = r;
var Ua;
if(Ua = Ra()) {
  var Va = Ta();
  Ka = 0 == Ua.indexOf("Opera");
  La = !Ka && -1 != Ua.indexOf("MSIE");
  Na = (Ma = !Ka && -1 != Ua.indexOf("WebKit")) && -1 != Ua.indexOf("Mobile");
  Oa = !Ka && !Ma && "Gecko" == Va.product
}
var Xa = Ka, E = La, F = Oa, G = Ma, Ya = Na, Za, $a = Ta();
Za = $a && $a.platform || "";
Pa = -1 != Za.indexOf("Mac");
Qa = -1 != Za.indexOf("Win");
var ab = !!Ta() && -1 != (Ta().appVersion || "").indexOf("X11"), bb;
a: {
  var cb = "", db;
  if(Xa && y.opera) {
    var eb = y.opera.version, cb = "function" == typeof eb ? eb() : eb
  }else {
    if(F ? db = /rv\:([^\);]+)(\)|;)/ : E ? db = /MSIE\s+([^\);]+)(\)|;)/ : G && (db = /WebKit\/(\S+)/), db) {
      var fb = db.exec(Ra()), cb = fb ? fb[1] : ""
    }
  }
  if(E) {
    var gb, hb = y.document;
    gb = hb ? hb.documentMode : h;
    if(gb > parseFloat(cb)) {
      bb = "" + gb;
      break a
    }
  }
  bb = cb
}
var ib = {};
function H(a) {
  var b;
  if(!(b = ib[a])) {
    b = 0;
    for(var c = ya("" + bb).split("."), d = ya("" + a).split("."), g = Math.max(c.length, d.length), f = 0;0 == b && f < g;f++) {
      var j = c[f] || "", m = d[f] || "", n = RegExp("(\\d*)(\\D*)", "g"), p = RegExp("(\\d*)(\\D*)", "g");
      do {
        var o = n.exec(j) || ["", "", ""], q = p.exec(m) || ["", "", ""];
        if(0 == o[0].length && 0 == q[0].length) {
          break
        }
        b = ((0 == o[1].length ? 0 : parseInt(o[1], 10)) < (0 == q[1].length ? 0 : parseInt(q[1], 10)) ? -1 : (0 == o[1].length ? 0 : parseInt(o[1], 10)) > (0 == q[1].length ? 0 : parseInt(q[1], 10)) ? 1 : 0) || ((0 == o[2].length) < (0 == q[2].length) ? -1 : (0 == o[2].length) > (0 == q[2].length) ? 1 : 0) || (o[2] < q[2] ? -1 : o[2] > q[2] ? 1 : 0)
      }while(0 == b)
    }
    b = ib[a] = 0 <= b
  }
  return b
}
var jb = {};
function kb(a) {
  return jb[a] || (jb[a] = E && !!document.documentMode && document.documentMode >= a)
}
;function lb() {
}
var mb = 0;
w = lb.prototype;
w.key = 0;
w.wb = r;
w.jf = r;
w.Da = function(a, b, c, d, g, f) {
  ma(a) ? this.Of = k : a && a.handleEvent && ma(a.handleEvent) ? this.Of = r : e(Error("Invalid listener argument"));
  this.Ub = a;
  this.bg = b;
  this.src = c;
  this.type = d;
  this.capture = !!g;
  this.cd = f;
  this.jf = r;
  this.key = ++mb;
  this.wb = r
};
w.handleEvent = function(a) {
  return this.Of ? this.Ub.call(this.cd || this.src, a) : this.Ub.handleEvent.call(this.Ub, a)
};
function nb(a, b, c) {
  for(var d in a) {
    b.call(c, a[d], d, a)
  }
}
function ob(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = a[d]
  }
  return b
}
function pb(a) {
  var b = [], c = 0, d;
  for(d in a) {
    b[c++] = d
  }
  return b
}
function qb(a, b, c) {
  b in a && e(Error('The object already contains the key "' + b + '"'));
  a[b] = c
}
var rb = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",");
function sb(a, b) {
  for(var c, d, g = 1;g < arguments.length;g++) {
    d = arguments[g];
    for(c in d) {
      a[c] = d[c]
    }
    for(var f = 0;f < rb.length;f++) {
      c = rb[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c])
    }
  }
}
;var tb = !E || kb(9), ub = !E || kb(9), vb = E && !H("8");
!G || H("528");
F && H("1.9b") || E && H("8") || Xa && H("9.5") || G && H("528");
F && !H("8") || E && H("9");
function wb(a) {
  Error.captureStackTrace ? Error.captureStackTrace(this, wb) : this.stack = Error().stack || "";
  a && (this.message = "" + a)
}
D(wb, Error);
wb.prototype.name = "CustomError";
function xb(a, b) {
  b.unshift(a);
  wb.call(this, wa.apply(l, b));
  b.shift()
}
D(xb, wb);
xb.prototype.name = "AssertionError";
function yb(a, b) {
  e(new xb("Failure" + (a ? ": " + a : ""), Array.prototype.slice.call(arguments, 1)))
}
;var I = Array.prototype, zb = I.indexOf ? function(a, b, c) {
  return I.indexOf.call(a, b, c)
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
}, J = I.forEach ? function(a, b, c) {
  I.forEach.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = B(a) ? a.split("") : a, f = 0;f < d;f++) {
    f in g && b.call(c, g[f], f, a)
  }
}, Ab = I.filter ? function(a, b, c) {
  return I.filter.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = [], f = 0, j = B(a) ? a.split("") : a, m = 0;m < d;m++) {
    if(m in j) {
      var n = j[m];
      b.call(c, n, m, a) && (g[f++] = n)
    }
  }
  return g
}, Bb = I.map ? function(a, b, c) {
  return I.map.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = Array(d), f = B(a) ? a.split("") : a, j = 0;j < d;j++) {
    j in f && (g[j] = b.call(c, f[j], j, a))
  }
  return g
}, Cb = I.some ? function(a, b, c) {
  return I.some.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = B(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in g && b.call(c, g[f], f, a)) {
      return k
    }
  }
  return r
}, Db = I.every ? function(a, b, c) {
  return I.every.call(a, b, c)
} : function(a, b, c) {
  for(var d = a.length, g = B(a) ? a.split("") : a, f = 0;f < d;f++) {
    if(f in g && !b.call(c, g[f], f, a)) {
      return r
    }
  }
  return k
};
function Eb(a, b, c) {
  a: {
    for(var d = a.length, g = B(a) ? a.split("") : a, f = 0;f < d;f++) {
      if(f in g && b.call(c, g[f], f, a)) {
        b = f;
        break a
      }
    }
    b = -1
  }
  return 0 > b ? l : B(a) ? a.charAt(b) : a[b]
}
function K(a, b) {
  return 0 <= zb(a, b)
}
function Fb(a, b) {
  var c = zb(a, b);
  0 <= c && I.splice.call(a, c, 1)
}
function Gb(a) {
  var b = a.length;
  if(0 < b) {
    for(var c = Array(b), d = 0;d < b;d++) {
      c[d] = a[d]
    }
    return c
  }
  return[]
}
function Hb(a, b, c, d) {
  I.splice.apply(a, Ib(arguments, 1))
}
function Ib(a, b, c) {
  return 2 >= arguments.length ? I.slice.call(a, b) : I.slice.call(a, b, c)
}
;function Jb() {
  this.G = r
}
Jb.prototype.R = function() {
  this.G || (this.G = k, this.e())
};
Jb.prototype.e = function() {
  this.eh && Kb.apply(l, this.eh);
  if(this.Yf) {
    for(;this.Yf.length;) {
      this.Yf.shift()()
    }
  }
};
function Kb(a) {
  for(var b = 0, c = arguments.length;b < c;++b) {
    var d = arguments[b];
    ka(d) ? Kb.apply(l, d) : d && "function" == typeof d.R && d.R()
  }
}
;function Lb(a, b) {
  this.type = a;
  this.currentTarget = this.target = b
}
w = Lb.prototype;
w.e = aa();
w.R = aa();
w.ub = r;
w.defaultPrevented = r;
w.wd = k;
w.stopPropagation = function() {
  this.ub = k
};
w.preventDefault = function() {
  this.defaultPrevented = k;
  this.wd = r
};
function Mb(a) {
  a.preventDefault()
}
;function Nb(a) {
  Nb[" "](a);
  return a
}
Nb[" "] = ha;
function Ob(a, b) {
  a && this.Da(a, b)
}
D(Ob, Lb);
var Rb = [1, 4, 2];
w = Ob.prototype;
w.target = l;
w.relatedTarget = l;
w.offsetX = 0;
w.offsetY = 0;
w.clientX = 0;
w.clientY = 0;
w.screenX = 0;
w.screenY = 0;
w.button = 0;
w.keyCode = 0;
w.charCode = 0;
w.ctrlKey = r;
w.altKey = r;
w.shiftKey = r;
w.metaKey = r;
w.De = r;
w.S = l;
w.Da = function(a, b) {
  var c = this.type = a.type;
  Lb.call(this, c);
  this.target = a.target || a.srcElement;
  this.currentTarget = b;
  var d = a.relatedTarget;
  if(d) {
    if(F) {
      var g;
      a: {
        try {
          Nb(d.nodeName);
          g = k;
          break a
        }catch(f) {
        }
        g = r
      }
      g || (d = l)
    }
  }else {
    "mouseover" == c ? d = a.fromElement : "mouseout" == c && (d = a.toElement)
  }
  this.relatedTarget = d;
  this.offsetX = G || a.offsetX !== h ? a.offsetX : a.layerX;
  this.offsetY = G || a.offsetY !== h ? a.offsetY : a.layerY;
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
  this.De = Pa ? a.metaKey : a.ctrlKey;
  this.state = a.state;
  this.S = a;
  a.defaultPrevented && this.preventDefault();
  delete this.ub
};
function Sb(a) {
  return(tb ? 0 == a.S.button : "click" == a.type ? k : !!(a.S.button & Rb[0])) && !(G && Pa && a.ctrlKey)
}
w.stopPropagation = function() {
  Ob.b.stopPropagation.call(this);
  this.S.stopPropagation ? this.S.stopPropagation() : this.S.cancelBubble = k
};
w.preventDefault = function() {
  Ob.b.preventDefault.call(this);
  var a = this.S;
  if(a.preventDefault) {
    a.preventDefault()
  }else {
    if(a.returnValue = r, vb) {
      try {
        if(a.ctrlKey || 112 <= a.keyCode && 123 >= a.keyCode) {
          a.keyCode = -1
        }
      }catch(b) {
      }
    }
  }
};
w.ih = s("S");
w.e = aa();
var Tb = {}, Ub = {}, Vb = {}, Wb = {};
function Xb(a, b, c, d, g) {
  if(b) {
    if(ja(b)) {
      for(var f = 0;f < b.length;f++) {
        Xb(a, b[f], c, d, g)
      }
      return l
    }
    var d = !!d, j = Ub;
    b in j || (j[b] = {F:0, fa:0});
    j = j[b];
    d in j || (j[d] = {F:0, fa:0}, j.F++);
    var j = j[d], m = pa(a), n;
    j.fa++;
    if(j[m]) {
      n = j[m];
      for(f = 0;f < n.length;f++) {
        if(j = n[f], j.Ub == c && j.cd == g) {
          if(j.wb) {
            break
          }
          return n[f].key
        }
      }
    }else {
      n = j[m] = [], j.F++
    }
    f = Yb();
    f.src = a;
    j = new lb;
    j.Da(c, f, a, b, d, g);
    c = j.key;
    f.key = c;
    n.push(j);
    Tb[c] = j;
    Vb[m] || (Vb[m] = []);
    Vb[m].push(j);
    a.addEventListener ? (a == y || !a.wf) && a.addEventListener(b, f, d) : a.attachEvent(b in Wb ? Wb[b] : Wb[b] = "on" + b, f);
    return c
  }
  e(Error("Invalid event type"))
}
function Yb() {
  var a = Zb, b = ub ? function(c) {
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
  if(ja(b)) {
    for(var f = 0;f < b.length;f++) {
      $b(a, b[f], c, d, g)
    }
  }else {
    if(d = !!d, a = ac(a, b, d)) {
      for(f = 0;f < a.length;f++) {
        if(a[f].Ub == c && a[f].capture == d && a[f].cd == g) {
          bc(a[f].key);
          break
        }
      }
    }
  }
}
function bc(a) {
  if(!Tb[a]) {
    return r
  }
  var b = Tb[a];
  if(b.wb) {
    return r
  }
  var c = b.src, d = b.type, g = b.bg, f = b.capture;
  c.removeEventListener ? (c == y || !c.wf) && c.removeEventListener(d, g, f) : c.detachEvent && c.detachEvent(d in Wb ? Wb[d] : Wb[d] = "on" + d, g);
  c = pa(c);
  Vb[c] && (g = Vb[c], Fb(g, b), 0 == g.length && delete Vb[c]);
  b.wb = k;
  if(b = Ub[d][f][c]) {
    b.Vf = k, cc(d, f, c, b)
  }
  delete Tb[a];
  return k
}
function cc(a, b, c, d) {
  if(!d.nd && d.Vf) {
    for(var g = 0, f = 0;g < d.length;g++) {
      d[g].wb ? d[g].bg.src = l : (g != f && (d[f] = d[g]), f++)
    }
    d.length = f;
    d.Vf = r;
    0 == f && (delete Ub[a][b][c], Ub[a][b].F--, 0 == Ub[a][b].F && (delete Ub[a][b], Ub[a].F--), 0 == Ub[a].F && delete Ub[a])
  }
}
function dc(a) {
  var b, c = 0, d = b == l;
  b = !!b;
  if(a == l) {
    nb(Vb, function(a) {
      for(var g = a.length - 1;0 <= g;g--) {
        var f = a[g];
        if(d || b == f.capture) {
          bc(f.key), c++
        }
      }
    })
  }else {
    if(a = pa(a), Vb[a]) {
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
  return b in d && (d = d[b], c in d && (d = d[c], a = pa(a), d[a])) ? d[a] : l
}
function ec(a, b, c, d, g) {
  var f = 1, b = pa(b);
  if(a[b]) {
    a.fa--;
    a = a[b];
    a.nd ? a.nd++ : a.nd = 1;
    try {
      for(var j = a.length, m = 0;m < j;m++) {
        var n = a[m];
        n && !n.wb && (f &= fc(n, g) !== r)
      }
    }finally {
      a.nd--, cc(c, d, b, a)
    }
  }
  return Boolean(f)
}
function fc(a, b) {
  a.jf && bc(a.key);
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
  if(!ub) {
    f = b || fa("window.event");
    var m = k in g, n = r in g;
    if(m) {
      if(0 > f.keyCode || f.returnValue != h) {
        return k
      }
      a: {
        var p = r;
        if(0 == f.keyCode) {
          try {
            f.keyCode = -1;
            break a
          }catch(o) {
            p = k
          }
        }
        if(p || f.returnValue == h) {
          f.returnValue = k
        }
      }
    }
    p = new Ob;
    p.Da(f, this);
    f = k;
    try {
      if(m) {
        for(var q = [], v = p.currentTarget;v;v = v.parentNode) {
          q.push(v)
        }
        j = g[k];
        j.fa = j.F;
        for(var x = q.length - 1;!p.ub && 0 <= x && j.fa;x--) {
          p.currentTarget = q[x], f &= ec(j, q[x], d, k, p)
        }
        if(n) {
          j = g[r];
          j.fa = j.F;
          for(x = 0;!p.ub && x < q.length && j.fa;x++) {
            p.currentTarget = q[x], f &= ec(j, q[x], d, r, p)
          }
        }
      }else {
        f = fc(c, p)
      }
    }finally {
      q && (q.length = 0)
    }
    return f
  }
  d = new Ob(b, this);
  return f = fc(c, d)
}
;function gc() {
  this.G = r
}
D(gc, Jb);
w = gc.prototype;
w.wf = k;
w.td = l;
w.Je = ba("td");
w.addEventListener = function(a, b, c, d) {
  Xb(this, a, b, c, d)
};
w.removeEventListener = function(a, b, c, d) {
  $b(this, a, b, c, d)
};
w.dispatchEvent = function(a) {
  var b = a.type || a, c = Ub;
  if(b in c) {
    if(B(a)) {
      a = new Lb(a, this)
    }else {
      if(a instanceof Lb) {
        a.target = a.target || this
      }else {
        var d = a, a = new Lb(b, this);
        sb(a, d)
      }
    }
    var d = 1, g, c = c[b], b = k in c, f;
    if(b) {
      g = [];
      for(f = this;f;f = f.td) {
        g.push(f)
      }
      f = c[k];
      f.fa = f.F;
      for(var j = g.length - 1;!a.ub && 0 <= j && f.fa;j--) {
        a.currentTarget = g[j], d &= ec(f, g[j], a.type, k, a) && a.wd != r
      }
    }
    if(r in c) {
      if(f = c[r], f.fa = f.F, b) {
        for(j = 0;!a.ub && j < g.length && f.fa;j++) {
          a.currentTarget = g[j], d &= ec(f, g[j], a.type, r, a) && a.wd != r
        }
      }else {
        for(g = this;!a.ub && g && f.fa;g = g.td) {
          a.currentTarget = g, d &= ec(f, g, a.type, r, a) && a.wd != r
        }
      }
    }
    a = Boolean(d)
  }else {
    a = k
  }
  return a
};
w.e = function() {
  gc.b.e.call(this);
  dc(this);
  this.td = l
};
function hc(a) {
  this.G = r;
  this.Db = a
}
D(hc, gc);
hc.prototype.Db = {};
hc.prototype.set = function(a, b) {
  a in this.Db || e(Error("'" + a + "' does not match attrs."));
  var c = this.Db[a];
  this.Db[a] = b;
  this.dispatchEvent(new Lb("model_change", {ic:a, Gi:c, Jg:b}));
  return k
};
hc.prototype.get = function(a) {
  a in this.Db || e(Error("'" + a + "' does not match attrs."));
  return this.Db[a]
};
function ic(a, b) {
  var c;
  B(b) ? c = jc : "undefined" == typeof b ? c = kc : e(Error("content is not string"));
  var d = a.split("/"), g = d.pop();
  hc.call(this, {dirpath:d.join("/"), filename:g, type:c, content:b.replace(/\r/g, "")})
}
D(ic, hc);
var jc = "filetype-text", kc = "filetype-dir";
/*
 Portions of this code are from MochiKit, received by
 The Closure Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Authors. All Rights Reserved.
*/
function L(a, b) {
  this.Na = [];
  this.lf = a;
  this.Xd = b || l
}
w = L.prototype;
w.ta = r;
w.Oa = r;
w.ya = 0;
w.Le = r;
w.Ud = r;
w.Gb = 0;
w.cancel = function(a) {
  if(this.ta) {
    this.ga instanceof L && this.ga.cancel()
  }else {
    if(this.m) {
      var b = this.m;
      delete this.m;
      a ? b.cancel(a) : (b.Gb--, 0 >= b.Gb && b.cancel())
    }
    this.lf ? this.lf.call(this.Xd, this) : this.Le = k;
    this.ta || this.kc(new lc)
  }
};
w.ib = function(a, b) {
  mc(this, a, b);
  this.ya--;
  0 == this.ya && this.ta && this.Vc()
};
function mc(a, b, c) {
  a.ta = k;
  a.ga = c;
  a.Oa = !b;
  a.Vc()
}
function nc(a) {
  a.ta && (a.Le || e(new oc), a.Le = r)
}
w.s = function(a) {
  nc(this);
  mc(this, k, a)
};
w.kc = function(a) {
  nc(this);
  mc(this, r, a)
};
function pc(a, b, c) {
  return qc(a, b, l, c)
}
function qc(a, b, c, d) {
  a.Na.push([b, c, d]);
  a.ta && a.Vc();
  return a
}
function rc(a, b) {
  qc(a, b.s, b.kc, b)
}
function sc(a, b) {
  return pc(a, C(b.gf, b))
}
w.gf = function(a) {
  var b = new L;
  rc(this, b);
  a && (b.m = this, this.Gb++);
  return b
};
w.tc = function() {
  return Cb(this.Na, function(a) {
    return ma(a[1])
  })
};
w.Vc = function() {
  this.bc && this.ta && this.tc() && (y.clearTimeout(this.bc), delete this.bc);
  this.m && (this.m.Gb--, delete this.m);
  for(var a = this.ga, b = r, c = r;this.Na.length && 0 == this.ya;) {
    var d = this.Na.shift(), g = d[0], f = d[1], d = d[2];
    if(g = this.Oa ? f : g) {
      try {
        var j = g.call(d || this.Xd, a);
        ea(j) && (this.Oa = this.Oa && (j == a || j instanceof Error), this.ga = a = j);
        a instanceof L && (c = k, this.ya++)
      }catch(m) {
        a = m, this.Oa = k, this.tc() || (b = k)
      }
    }
  }
  this.ga = a;
  c && this.ya && (qc(a, C(this.ib, this, k), C(this.ib, this, r)), a.Ud = k);
  b && (this.bc = y.setTimeout(function() {
    e(new tc(a))
  }, 0))
};
function oc() {
  wb.call(this)
}
D(oc, wb);
oc.prototype.message = "Already called";
function lc() {
  wb.call(this)
}
D(lc, wb);
lc.prototype.message = "Deferred was cancelled";
function tc(a) {
  wb.call(this);
  this.message = "Unhandled Error in Deferred: " + (a.message || "[No message]")
}
D(tc, wb);
function uc() {
  L.call(this)
}
D(uc, L);
function vc(a, b) {
  a.Na.push([b, l, l]);
  return a
}
uc.prototype.tc = function() {
  return Cb(this.Na, function(a) {
    return a[0] instanceof L ? a[0].tc() : ma(a[1])
  })
};
uc.prototype.Vc = function() {
  this.bc && this.ta && this.tc() && (y.clearTimeout(this.bc), delete this.bc);
  this.m && (this.m.Gb--, delete this.m);
  for(var a = this.ga, b = r;this.Na.length && 0 == this.ya;) {
    var c = this.Na.shift();
    if(c[0] instanceof L) {
      c[0].ta ? c[0].ib(k, this.ga) : c[0].s(this.ga), this.ga = a = c[0].ga, c[0].ya && (a.Ud = r, qc(a, C(c[0].ib, c[0], k), C(c[0].ib, c[0], r)), b = k, this.ya++)
    }else {
      var d = c[0], g = c[1], c = c[2];
      if(d = this.Oa ? g : d) {
        d = d.call(c || this.Xd, a), ea(d) && (this.Oa = this.Oa && (d == a || d instanceof Error), this.ga = a = d), a instanceof L && (b = k, this.ya++)
      }
    }
  }
  this.ga = a;
  b && this.ya && (qc(a, C(this.ib, this, k), C(this.ib, this, r)), a.Ud = k)
};
uc.prototype.gf = function(a) {
  var b = new uc;
  b.name = "branch";
  rc(this, b);
  a && (b.m = this, this.Gb++);
  return b
};
function M(a) {
  this.G = r;
  this.Hf = a;
  this.u = []
}
D(M, Jb);
var wc = [];
M.prototype.c = function(a, b, c, d, g) {
  ja(b) || (wc[0] = b, b = wc);
  for(var f = 0;f < b.length;f++) {
    this.u.push(Xb(a, b[f], c || this, d || r, g || this.Hf || this))
  }
  return this
};
M.prototype.V = function(a, b, c, d, g) {
  if(ja(b)) {
    for(var f = 0;f < b.length;f++) {
      this.V(a, b[f], c, d, g)
    }
  }else {
    a: {
      c = c || this;
      g = g || this.Hf || this;
      d = !!d;
      if(a = ac(a, b, d)) {
        for(b = 0;b < a.length;b++) {
          if(!a[b].wb && a[b].Ub == c && a[b].capture == d && a[b].cd == g) {
            a = a[b];
            break a
          }
        }
      }
      a = l
    }
    a && (a = a.key, bc(a), Fb(this.u, a))
  }
  return this
};
function xc(a) {
  J(a.u, bc);
  a.u.length = 0
}
M.prototype.e = function() {
  M.b.e.call(this);
  xc(this)
};
M.prototype.handleEvent = function() {
  e(Error("EventHandler.handleEvent not implemented"))
};
var Bc = RegExp("^(?:([^:/?#.]+):)?(?://(?:([^/?#]*)@)?([\\w\\d\\-\\u0100-\\uffff.%]*)(?::([0-9]+))?)?([^?#]+)?(?:\\?([^#]*))?(?:#(.*))?$");
function Cc(a, b) {
  this.G = r;
  this.vc = a || 1;
  this.Fc = b || Dc;
  this.Td = C(this.gi, this);
  this.ue = va()
}
D(Cc, gc);
Cc.prototype.enabled = r;
var Dc = y.window;
w = Cc.prototype;
w.U = l;
w.setInterval = function(a) {
  this.vc = a;
  this.U && this.enabled ? (this.stop(), this.start()) : this.U && this.stop()
};
w.gi = function() {
  if(this.enabled) {
    var a = va() - this.ue;
    0 < a && a < 0.8 * this.vc ? this.U = this.Fc.setTimeout(this.Td, this.vc - a) : (this.dispatchEvent(Ec), this.enabled && (this.U = this.Fc.setTimeout(this.Td, this.vc), this.ue = va()))
  }
};
w.start = function() {
  this.enabled = k;
  this.U || (this.U = this.Fc.setTimeout(this.Td, this.vc), this.ue = va())
};
w.stop = function() {
  this.enabled = r;
  this.U && (this.Fc.clearTimeout(this.U), this.U = l)
};
w.e = function() {
  Cc.b.e.call(this);
  this.stop();
  delete this.Fc
};
var Ec = "tick";
function Fc(a) {
  if("function" == typeof a.qc) {
    return a.qc()
  }
  if(B(a)) {
    return a.split("")
  }
  if(ka(a)) {
    for(var b = [], c = a.length, d = 0;d < c;d++) {
      b.push(a[d])
    }
    return b
  }
  return ob(a)
}
function Gc(a) {
  if("function" == typeof a.oc) {
    return a.oc()
  }
  if("function" != typeof a.qc) {
    if(ka(a) || B(a)) {
      for(var b = [], a = a.length, c = 0;c < a;c++) {
        b.push(c)
      }
      return b
    }
    return pb(a)
  }
}
function Hc(a, b, c) {
  if("function" == typeof a.forEach) {
    a.forEach(b, c)
  }else {
    if(ka(a) || B(a)) {
      J(a, b, c)
    }else {
      for(var d = Gc(a), g = Fc(a), f = g.length, j = 0;j < f;j++) {
        b.call(c, g[j], d && d[j], a)
      }
    }
  }
}
;function Ic(a, b) {
  this.xa = {};
  this.u = [];
  var c = arguments.length;
  if(1 < c) {
    c % 2 && e(Error("Uneven number of arguments"));
    for(var d = 0;d < c;d += 2) {
      this.set(arguments[d], arguments[d + 1])
    }
  }else {
    if(a) {
      a instanceof Ic ? (c = a.oc(), d = a.qc()) : (c = pb(a), d = ob(a));
      for(var g = 0;g < c.length;g++) {
        this.set(c[g], d[g])
      }
    }
  }
}
w = Ic.prototype;
w.F = 0;
w.qc = function() {
  Jc(this);
  for(var a = [], b = 0;b < this.u.length;b++) {
    a.push(this.xa[this.u[b]])
  }
  return a
};
w.oc = function() {
  Jc(this);
  return this.u.concat()
};
w.Vd = function(a) {
  return Kc(this.xa, a)
};
w.clear = function() {
  this.xa = {};
  this.F = this.u.length = 0
};
w.remove = function(a) {
  return Kc(this.xa, a) ? (delete this.xa[a], this.F--, this.u.length > 2 * this.F && Jc(this), k) : r
};
function Jc(a) {
  if(a.F != a.u.length) {
    for(var b = 0, c = 0;b < a.u.length;) {
      var d = a.u[b];
      Kc(a.xa, d) && (a.u[c++] = d);
      b++
    }
    a.u.length = c
  }
  if(a.F != a.u.length) {
    for(var g = {}, c = b = 0;b < a.u.length;) {
      d = a.u[b], Kc(g, d) || (a.u[c++] = d, g[d] = 1), b++
    }
    a.u.length = c
  }
}
w.get = function(a, b) {
  return Kc(this.xa, a) ? this.xa[a] : b
};
w.set = function(a, b) {
  Kc(this.xa, a) || (this.F++, this.u.push(a));
  this.xa[a] = b
};
w.da = function() {
  return new Ic(this)
};
function Kc(a, b) {
  return Object.prototype.hasOwnProperty.call(a, b)
}
;function Lc() {
}
Lc.prototype.hf = l;
function Mc(a) {
  var b;
  if(!(b = a.hf)) {
    b = {}, Nc(a) && (b[0] = k, b[1] = k), b = a.hf = b
  }
  return b
}
;var Oc;
function Pc() {
}
D(Pc, Lc);
function Qc(a) {
  return(a = Nc(a)) ? new ActiveXObject(a) : new XMLHttpRequest
}
function Nc(a) {
  if(!a.Kf && "undefined" == typeof XMLHttpRequest && "undefined" != typeof ActiveXObject) {
    for(var b = ["MSXML2.XMLHTTP.6.0", "MSXML2.XMLHTTP.3.0", "MSXML2.XMLHTTP", "Microsoft.XMLHTTP"], c = 0;c < b.length;c++) {
      var d = b[c];
      try {
        return new ActiveXObject(d), a.Kf = d
      }catch(g) {
      }
    }
    e(Error("Could not create ActiveXObject. ActiveX might be disabled, or MSXML might not be installed"))
  }
  return a.Kf
}
Oc = new Pc;
function Rc(a) {
  return Sc(a || arguments.callee.caller, [])
}
function Sc(a, b) {
  var c = [];
  if(K(b, a)) {
    c.push("[...circular reference...]")
  }else {
    if(a && 50 > b.length) {
      c.push(Tc(a) + "(");
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
            f = (f = Tc(f)) ? f : "[fn]";
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
        c.push(Sc(a.caller, b))
      }catch(j) {
        c.push("[exception trying to get caller]\n")
      }
    }else {
      a ? c.push("[...long stack...]") : c.push("[end]")
    }
  }
  return c.join("")
}
function Tc(a) {
  if(Uc[a]) {
    return Uc[a]
  }
  a = "" + a;
  if(!Uc[a]) {
    var b = /function ([^\(]+)/.exec(a);
    Uc[a] = b ? b[1] : "[Anonymous]"
  }
  return Uc[a]
}
var Uc = {};
function Vc(a, b, c, d, g) {
  this.reset(a, b, c, d, g)
}
Vc.prototype.yf = l;
Vc.prototype.xf = l;
var Wc = 0;
Vc.prototype.reset = function(a, b, c, d, g) {
  "number" == typeof g || Wc++;
  d || va();
  this.yc = a;
  this.Jh = b;
  delete this.yf;
  delete this.xf
};
Vc.prototype.Ad = ba("yc");
function Xc(a) {
  this.Kh = a
}
Xc.prototype.m = l;
Xc.prototype.yc = l;
Xc.prototype.z = l;
Xc.prototype.If = l;
function Yc(a, b) {
  this.name = a;
  this.value = b
}
Yc.prototype.toString = s("name");
var Zc = new Yc("SEVERE", 1E3), $c = new Yc("WARNING", 900), ad = new Yc("CONFIG", 700), bd = new Yc("FINE", 500), cd = new Yc("ALL", 0);
w = Xc.prototype;
w.getParent = s("m");
w.Xc = function() {
  this.z || (this.z = {});
  return this.z
};
w.Ad = ba("yc");
function dd(a) {
  if(a.yc) {
    return a.yc
  }
  if(a.m) {
    return dd(a.m)
  }
  yb("Root logger has no level set.");
  return l
}
w.log = function(a, b, c) {
  if(a.value >= dd(this).value) {
    a = this.kh(a, b, c);
    b = "log:" + a.Jh;
    y.console && (y.console.timeStamp ? y.console.timeStamp(b) : y.console.markTimeline && y.console.markTimeline(b));
    y.msWriteProfilerMark && y.msWriteProfilerMark(b);
    for(b = this;b;) {
      var c = b, d = a;
      if(c.If) {
        for(var g = 0, f = h;f = c.If[g];g++) {
          f(d)
        }
      }
      b = b.getParent()
    }
  }
};
w.kh = function(a, b, c) {
  var d = new Vc(a, "" + b, this.Kh);
  if(c) {
    d.yf = c;
    var g;
    var f = arguments.callee.caller;
    try {
      var j;
      var m = fa("window.location.href");
      if(B(c)) {
        j = {message:c, name:"Unknown error", lineNumber:"Not available", fileName:m, stack:"Not available"}
      }else {
        var n, p, o = r;
        try {
          n = c.lineNumber || c.Ji || "Not available"
        }catch(q) {
          n = "Not available", o = k
        }
        try {
          p = c.fileName || c.filename || c.sourceURL || m
        }catch(v) {
          p = "Not available", o = k
        }
        j = o || !c.lineNumber || !c.fileName || !c.stack ? {message:c.message, name:c.name, lineNumber:n, fileName:p, stack:c.stack || "Not available"} : c
      }
      g = "Message: " + za(j.message) + '\nUrl: <a href="view-source:' + j.fileName + '" target="_new">' + j.fileName + "</a>\nLine: " + j.lineNumber + "\n\nBrowser stack:\n" + za(j.stack + "-> ") + "[end]\n\nJS stack traversal:\n" + za(Rc(f) + "-> ")
    }catch(x) {
      g = "Exception trying to expose exception! You win, we lose. " + x
    }
    d.xf = g
  }
  return d
};
function N(a, b) {
  a.log(bd, b, h)
}
var ed = {}, fd = l;
function gd(a) {
  fd || (fd = new Xc(""), ed[""] = fd, fd.Ad(ad));
  var b;
  if(!(b = ed[a])) {
    b = new Xc(a);
    var c = a.lastIndexOf("."), d = a.substr(c + 1), c = gd(a.substr(0, c));
    c.Xc()[d] = b;
    b.m = c;
    ed[a] = b
  }
  return b
}
;function hd(a) {
  this.G = r;
  this.headers = new Ic;
  this.Xa = a || l
}
D(hd, gc);
hd.prototype.v = gd("goog.net.XhrIo");
var id = /^https?$/i;
w = hd.prototype;
w.za = r;
w.i = l;
w.Hc = l;
w.ld = "";
w.te = "";
w.Tb = "";
w.Uc = r;
w.Rb = r;
w.uc = r;
w.qb = r;
w.Ab = 0;
w.ra = l;
w.vd = "";
w.og = r;
w.send = function(a, b, c, d) {
  this.i && e(Error("[goog.net.XhrIo] Object is active with another request"));
  b = b ? b.toUpperCase() : "GET";
  this.ld = a;
  this.Tb = "";
  this.te = b;
  this.Uc = r;
  this.za = k;
  this.i = this.Xa ? Qc(this.Xa) : Qc(Oc);
  this.Hc = this.Xa ? Mc(this.Xa) : Mc(Oc);
  this.i.onreadystatechange = C(this.Ae, this);
  try {
    N(this.v, O(this, "Opening Xhr")), this.uc = k, this.i.open(b, a, k), this.uc = r
  }catch(g) {
    N(this.v, O(this, "Error opening Xhr: " + g.message));
    jd(this, g);
    return
  }
  var a = c || "", f = this.headers.da();
  d && Hc(d, function(a, b) {
    f.set(b, a)
  });
  "POST" == b && !f.Vd("Content-Type") && f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  Hc(f, function(a, b) {
    this.i.setRequestHeader(b, a)
  }, this);
  this.vd && (this.i.responseType = this.vd);
  "withCredentials" in this.i && (this.i.withCredentials = this.og);
  try {
    this.ra && (Dc.clearTimeout(this.ra), this.ra = l), 0 < this.Ab && (N(this.v, O(this, "Will abort after " + this.Ab + "ms if incomplete")), this.ra = Dc.setTimeout(C(this.kg, this), this.Ab)), N(this.v, O(this, "Sending request")), this.Rb = k, this.i.send(a), this.Rb = r
  }catch(j) {
    N(this.v, O(this, "Send error: " + j.message)), jd(this, j)
  }
};
w.kg = function() {
  "undefined" != typeof ca && this.i && (this.Tb = "Timed out after " + this.Ab + "ms, aborting", N(this.v, O(this, this.Tb)), this.dispatchEvent("timeout"), this.abort(8))
};
function jd(a, b) {
  a.za = r;
  a.i && (a.qb = k, a.i.abort(), a.qb = r);
  a.Tb = b;
  kd(a);
  ld(a)
}
function kd(a) {
  a.Uc || (a.Uc = k, a.dispatchEvent("complete"), a.dispatchEvent("error"))
}
w.abort = function() {
  this.i && this.za && (N(this.v, O(this, "Aborting")), this.za = r, this.qb = k, this.i.abort(), this.qb = r, this.dispatchEvent("complete"), this.dispatchEvent("abort"), ld(this))
};
w.e = function() {
  this.i && (this.za && (this.za = r, this.qb = k, this.i.abort(), this.qb = r), ld(this, k));
  hd.b.e.call(this)
};
w.Ae = function() {
  !this.uc && !this.Rb && !this.qb ? this.Vh() : md(this)
};
w.Vh = function() {
  md(this)
};
function md(a) {
  if(a.za && "undefined" != typeof ca) {
    if(a.Hc[1] && 4 == nd(a) && 2 == od(a)) {
      N(a.v, O(a, "Local request error detected and ignored"))
    }else {
      if(a.Rb && 4 == nd(a)) {
        Dc.setTimeout(C(a.Ae, a), 0)
      }else {
        if(a.dispatchEvent("readystatechange"), 4 == nd(a)) {
          N(a.v, O(a, "Request complete"));
          a.za = r;
          try {
            var b = od(a), c, d;
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
                  d = k;
                  break a;
                default:
                  d = r
              }
            }
            if(!(c = d)) {
              var g;
              if(g = 0 === b) {
                var f = ("" + a.ld).match(Bc)[1] || l;
                if(!f && self.location) {
                  var j = self.location.protocol, f = j.substr(0, j.length - 1)
                }
                g = !id.test(f ? f.toLowerCase() : "")
              }
              c = g
            }
            if(c) {
              a.dispatchEvent("complete"), a.dispatchEvent("success")
            }else {
              var m;
              try {
                m = 2 < nd(a) ? a.i.statusText : ""
              }catch(n) {
                N(a.v, "Can not get status: " + n.message), m = ""
              }
              a.Tb = m + " [" + od(a) + "]";
              kd(a)
            }
          }finally {
            ld(a)
          }
        }
      }
    }
  }
}
function ld(a, b) {
  if(a.i) {
    var c = a.i, d = a.Hc[0] ? ha : l;
    a.i = l;
    a.Hc = l;
    a.ra && (Dc.clearTimeout(a.ra), a.ra = l);
    b || a.dispatchEvent("ready");
    try {
      c.onreadystatechange = d
    }catch(g) {
      a.v.log(Zc, "Problem encountered resetting onreadystatechange: " + g.message, h)
    }
  }
}
w.wc = function() {
  return!!this.i
};
function nd(a) {
  return a.i ? a.i.readyState : 0
}
function od(a) {
  try {
    return 2 < nd(a) ? a.i.status : -1
  }catch(b) {
    return a.v.log($c, "Can not get status: " + b.message, h), -1
  }
}
function O(a, b) {
  return b + " [" + a.te + " " + a.ld + " " + od(a) + "]"
}
;function pd(a) {
  hd.call(this, a)
}
D(pd, hd);
hd.prototype.send = function(a, b, c, d) {
  this.i && e(Error("[goog.net.XhrIo] Object is active with another request"));
  b = b ? b.toUpperCase() : "GET";
  this.ld = a;
  this.Tb = "";
  this.te = b;
  this.Uc = r;
  this.za = k;
  this.i = this.Xa ? Qc(this.Xa) : Qc(Oc);
  this.Hc = this.Xa ? Mc(this.Xa) : Mc(Oc);
  this.i.onreadystatechange = C(this.Ae, this);
  try {
    N(this.v, O(this, "Opening Xhr")), this.uc = k, this.i.open(b, a, k), this.uc = r
  }catch(g) {
    N(this.v, O(this, "Error opening Xhr: " + g.message));
    jd(this, g);
    return
  }
  var a = c || "", f = this.headers.da();
  d && Hc(d, function(a, b) {
    f.set(b, a)
  });
  "POST" == b && !(a instanceof FormData) && !f.Vd("Content-Type") && f.set("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
  Hc(f, function(a, b) {
    this.i.setRequestHeader(b, a)
  }, this);
  this.vd && (this.i.responseType = this.vd);
  "withCredentials" in this.i && (this.i.withCredentials = this.og);
  try {
    this.ra && (Dc.clearTimeout(this.ra), this.ra = l), 0 < this.Ab && (N(this.v, O(this, "Will abort after " + this.Ab + "ms if incomplete")), this.ra = Dc.setTimeout(C(this.kg, this), this.Ab)), N(this.v, O(this, "Sending request")), this.Rb = k, this.i.send(a), this.Rb = r
  }catch(j) {
    N(this.v, O(this, "Send error: " + j.message)), jd(this, j)
  }
};
function qd(a, b, c) {
  L.call(this);
  b = b || {};
  this.p = new M;
  this.Ag = b.method && ("post" == b.method.toLowerCase() || "put" == b.method.toLowerCase()) ? b.method.toLowerCase() : "get";
  this.qg = b.data || {};
  this.Ve = {};
  "undefined" != typeof b.contentType && (this.Ve["Content-Type"] = b.contentType);
  this.Pd = new pd;
  var d = new uc;
  b.Ec && (c && (b.Ec = C(b.Ec, c)), this.p.c(this.Pd, "success", function(a) {
    b.Ec(a.target);
    d.s()
  }));
  b.error && (b.error = C(b.error, c), this.p.c(this.Pd, "error", function(a) {
    d.s(b.error(a.target))
  }));
  sc(pc(this, function() {
    this.Pd.send(a, this.Ag, this.qg, this.Ve)
  }, this), d)
}
D(qd, uc);
function rd(a) {
  this.Qe = a;
  this.ab = []
}
rd.prototype.Qd = function(a, b) {
  td(this, a) && e(Error("PluginPoster can't have duplicate files."));
  this.ab.push([a, b])
};
function td(a, b) {
  return Eb(a.ab, function(a) {
    return a[0] == b
  }, a) ? k : r
}
function ud(a) {
  var b = new FormData;
  J(a.ab, function(a) {
    b.append(a[0], a[1])
  });
  return new qd(a.Qe, {data:b, method:"post", Fi:l, Ec:aa()})
}
rd.prototype.Qe = l;
function vd(a, b) {
  a = a || window.URL || window.webkitURL;
  b = b || window.MozBlobBuilder || window.WebKitBlobBuilder;
  (!a || !b) && e(Error("BlobBuilder is not available."));
  this.Re = new b
}
vd.prototype.append = function(a) {
  return this.Re.append(a)
};
vd.prototype.getBlob = function(a) {
  return this.Re.getBlob(a)
};
function wd() {
  this.G = r;
  this.Va = [];
  this.ac = {}
}
D(wd, Jb);
w = wd.prototype;
w.ud = 0;
w.lg = function(a) {
  if(0 != this.ud) {
    return this.Ac || (this.Ac = []), this.Ac.push(a), r
  }
  var b = this.Va[a];
  if(b) {
    var c = this.ac[b];
    c && Fb(c, a);
    delete this.Va[a];
    delete this.Va[a + 1];
    delete this.Va[a + 2]
  }
  return!!b
};
w.cg = function(a, b) {
  var c = this.ac[a];
  if(c) {
    this.ud++;
    for(var d = Ib(arguments, 1), g = 0, f = c.length;g < f;g++) {
      var j = c[g];
      this.Va[j + 1].apply(this.Va[j + 2], d)
    }
    this.ud--;
    if(this.Ac && 0 == this.ud) {
      for(;c = this.Ac.pop();) {
        this.lg(c)
      }
    }
  }
};
w.clear = function(a) {
  if(a) {
    var b = this.ac[a];
    b && (J(b, this.lg, this), delete this.ac[a])
  }else {
    this.Va.length = 0, this.ac = {}
  }
};
w.e = function() {
  wd.b.e.call(this);
  delete this.Va;
  delete this.ac;
  delete this.Ac
};
function xd() {
  this.Ja = 48E3;
  this.Ze = new wd;
  this.Ue = "function" == typeof webkitAudioContext;
  this.Kd = r;
  "function" == typeof Audio && (this.Kd = "function" == typeof(new Audio).mozSetup);
  this.ec = {};
  this.sg = 0;
  this.hc = "stop"
}
A(xd);
gd("synthjs.audiocore.Player").Ad(cd);
function yd(a, b) {
  zd(b, a.Ja);
  var c = a.sg++;
  a.ec[c] = b
}
function Ad(a, b) {
  console.trace();
  nb(a.ec, function(a, d) {
    b == a && delete this.ec[d]
  }, a)
}
xd.prototype.play = function() {
  "play" == this.hc && this.stop();
  if(this.Kd) {
    return this.hc = "play", Bd(this)
  }
  return this.Ue ? (this.hc = "play", Cd(this)) : r
};
xd.prototype.stop = function() {
  if(this.Kd) {
    return this.Ze.cg("finish"), this.hc = "stop", clearInterval(this.pg), k
  }
  return this.Ue ? (this.Ze.cg("finish"), this.hc = "stop", this.Dd.disconnect(), k) : r
};
xd.prototype.Kb = function() {
  var a = k;
  nb(this.ec, function(b) {
    a = a && b.Kb()
  });
  return a
};
function Dd(a, b) {
  var c = [];
  nb(a.ec, function(a) {
    a.Kb() || c.push(a.de(b))
  });
  var d = new L;
  return sc(pc(new L, function() {
    rc(pc(new Ed(c), function(a) {
      var c = new Float32Array(b), d = new Float32Array(b);
      a && J(a, function(a) {
        for(var g = 0;g < b;g++) {
          c[g] += a[1].xc[g], d[g] += a[1].Bc[g]
        }
      });
      a = h;
      return{xc:c, Bc:d}
    }), d);
    J(c, function(a) {
      a.s()
    })
  }), d)
}
function Cd(a) {
  a.Cd || (a.Cd = new webkitAudioContext, a.Dd = a.Cd.createJavaScriptNode(2048, 1, 2));
  a.Dd.onaudioprocess = function(b) {
    function c(a, b) {
      for(;2048 > f;) {
        d[f] = a[f], g[f] = b[f], f++
      }
    }
    var d = b.outputBuffer.getChannelData(0), g = b.outputBuffer.getChannelData(1), f = 0;
    if(a.Kb()) {
      setTimeout(function() {
        a.stop()
      }, 100), b = new Float32Array(2048), c(b, b)
    }else {
      var j = pc(Dd(a, 2048), function(a) {
        c(a.xc, a.Bc);
        j = h
      });
      j.s()
    }
  };
  a.Dd.connect(a.Cd.destination);
  return k
}
function Bd(a) {
  var b = new Audio, c = 0, d = a.Ja / 4, g;
  b.mozSetup(1, a.Ja);
  a.pg = setInterval(function() {
    if(a.Kb()) {
      a.stop()
    }else {
      var f;
      g && (totaltail += g.length, f = b.mozWriteAudio(g), c += f, g = l);
      var j = b.mozCurrentSampleOffset() + d - c;
      if(0 < j && !a.Kb()) {
        var m = 8192 <= j ? 8192 : j;
        pc(Dd(a, m), function(a) {
          for(var d = a.xc, a = a.Bc, j = new Float32Array(2 * d.length), q = 0;q < d.length;q++) {
            j[2 * q] = d[q], j[2 * q + 1] = a[q]
          }
          f = b.mozWriteAudio(d);
          f < m && (g = soundData.subarray(f));
          c += f
        }).s()
      }
    }
  }, 100);
  return k
}
;/*
 Portions of this code are from MochiKit, received by The Closure
 Library Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Library Authors. All Rights Reserved.
*/
function Ed(a, b, c, d, g, f) {
  L.call(this, g, f);
  this.Rf = a;
  this.Yd = [];
  this.zf = !!b;
  this.gh = !!c;
  this.Og = !!d;
  for(b = 0;b < a.length;b++) {
    qc(a[b], C(this.Ff, this, b, k), C(this.Ff, this, b, r))
  }
  0 == a.length && !this.zf && this.s(this.Yd)
}
D(Ed, L);
Ed.prototype.Wf = 0;
Ed.prototype.Ff = function(a, b, c) {
  this.Wf++;
  this.Yd[a] = [b, c];
  this.ta || (this.zf && b ? this.s([a, c]) : this.gh && !b ? this.kc(c) : this.Wf == this.Rf.length && this.s(this.Yd));
  this.Og && !b && (c = l);
  return c
};
Ed.prototype.kc = function(a) {
  Ed.b.kc.call(this, a);
  J(this.Rf, function(a) {
    a.cancel()
  })
};
function Fd(a, b, c) {
  this.ff = c ? c : 440;
  Gd[a] && (a = Gd[a]);
  Eb(Hd, function(b) {
    return b == a
  }) || e(Error("Can't create Note because of invalid parameters: " + a));
  this.Q = a;
  this.ve = b;
  this.ja = this.ff * Math.pow(2, zb(Hd, a) / 12 + b);
  this.Fh = /^[a-g]$/.test(a)
}
function Id(a) {
  a = new Fd("c", a, h);
  return a.Q ? a : r
}
Fd.prototype.getString = function() {
  return this.ve + "|" + this.Q
};
var Gd = {"d-":"c+", "e-":"d+", "g-":"f+", "a-":"g+", "b-":"a+"}, Hd = "c,c+,d,d+,e,f,f+,g,g+,a,a+,b".split(",");
/*
 Portions of this code are from MochiKit, received by The Closure
 Library Authors under the MIT license. All other code is Copyright
 2005-2009 The Closure Library Authors. All Rights Reserved.
*/
function Jd(a) {
  this.Nd = a;
  this.Jd = [];
  new Float32Array(0)
}
gd("synthjs.audiocore.DynamicGenerator").Ad(cd);
Jd.prototype.de = function(a) {
  this.Ja || e(Error("Generator can't create buffer without setting sampleRate"));
  var b = this.Nd.de(a);
  b.name = "wave";
  J(this.Jd, function(a) {
    a = a.Ii();
    a.name = "filter";
    vc(b, a)
  });
  return b
};
function zd(a, b) {
  a.Ja = b;
  for(i = 0;i < a.Jd.length;i++) {
    rt = zd(a.Jd[i], b)
  }
}
Jd.prototype.Kb = t(r);
function P(a, b) {
  this.x = ea(a) ? a : 0;
  this.y = ea(b) ? b : 0
}
P.prototype.da = function() {
  return new P(this.x, this.y)
};
P.prototype.toString = function() {
  return"(" + this.x + ", " + this.y + ")"
};
function Kd(a, b) {
  return new P(a.x - b.x, a.y - b.y)
}
;function Ld(a, b, c, d) {
  this.top = a;
  this.right = b;
  this.bottom = c;
  this.left = d
}
Ld.prototype.da = function() {
  return new Ld(this.top, this.right, this.bottom, this.left)
};
Ld.prototype.toString = function() {
  return"(" + this.top + "t, " + this.right + "r, " + this.bottom + "b, " + this.left + "l)"
};
Ld.prototype.contains = function(a) {
  return!this || !a ? r : a instanceof Ld ? a.left >= this.left && a.right <= this.right && a.top >= this.top && a.bottom <= this.bottom : a.x >= this.left && a.x <= this.right && a.y >= this.top && a.y <= this.bottom
};
function Q(a, b) {
  this.width = a;
  this.height = b
}
function Md(a, b) {
  return a == b ? k : !a || !b ? r : a.width == b.width && a.height == b.height
}
Q.prototype.da = function() {
  return new Q(this.width, this.height)
};
Q.prototype.toString = function() {
  return"(" + this.width + " x " + this.height + ")"
};
Q.prototype.floor = function() {
  this.width = Math.floor(this.width);
  this.height = Math.floor(this.height);
  return this
};
Q.prototype.round = function() {
  this.width = Math.round(this.width);
  this.height = Math.round(this.height);
  return this
};
function R(a, b, c, d) {
  this.left = a;
  this.top = b;
  this.width = c;
  this.height = d
}
R.prototype.da = function() {
  return new R(this.left, this.top, this.width, this.height)
};
R.prototype.toString = function() {
  return"(" + this.left + ", " + this.top + " - " + this.width + "w x " + this.height + "h)"
};
R.prototype.contains = function(a) {
  return a instanceof R ? this.left <= a.left && this.left + this.width >= a.left + a.width && this.top <= a.top && this.top + this.height >= a.top + a.height : a.x >= this.left && a.x <= this.left + this.width && a.y >= this.top && a.y <= this.top + this.height
};
R.prototype.Ef = function() {
  return new Q(this.width, this.height)
};
var Nd;
function Od(a) {
  a = a.className;
  return B(a) && a.match(/\S+/g) || []
}
function S(a, b) {
  for(var c = Od(a), d = Ib(arguments, 1), g = c.length + d.length, f = c, j = 0;j < d.length;j++) {
    K(f, d[j]) || f.push(d[j])
  }
  a.className = c.join(" ");
  return c.length == g
}
function Pd(a, b) {
  var c = Od(a), d = Ib(arguments, 1), g = Qd(c, d);
  a.className = g.join(" ");
  return g.length == c.length - d.length
}
function Qd(a, b) {
  return Ab(a, function(a) {
    return!K(b, a)
  })
}
function Rd(a, b, c) {
  for(var d = Od(a), g = r, f = 0;f < d.length;f++) {
    d[f] == b && (Hb(d, f--, 1), g = k)
  }
  g && (d.push(c), a.className = d.join(" "))
}
;var Sd = !E || kb(9), Td = !F && !E || E && kb(9) || F && H("1.9.1"), Ud = E && !H("9");
function U(a) {
  return a ? new Vd(V(a)) : Nd || (Nd = new Vd)
}
function Wd(a, b, c, d) {
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
      b = j.className, "function" == typeof b.split && K(b.split(/\s+/), c) && (d[g++] = j)
    }
    d.length = g;
    return d
  }
  return a
}
function Xd(a, b) {
  nb(b, function(b, d) {
    "style" == d ? a.style.cssText = b : "class" == d ? a.className = b : "for" == d ? a.htmlFor = b : d in Yd ? a.setAttribute(Yd[d], b) : 0 == d.lastIndexOf("aria-", 0) || 0 == d.lastIndexOf("data-", 0) ? a.setAttribute(d, b) : a[d] = b
  })
}
var Yd = {cellpadding:"cellPadding", cellspacing:"cellSpacing", colspan:"colSpan", frameborder:"frameBorder", height:"height", maxlength:"maxLength", role:"role", rowspan:"rowSpan", type:"type", usemap:"useMap", valign:"vAlign", width:"width"};
function Zd(a) {
  a = a.document;
  a = "CSS1Compat" == a.compatMode ? a.documentElement : a.body;
  return new Q(a.clientWidth, a.clientHeight)
}
function $d(a, b, c) {
  return ae(document, arguments)
}
function ae(a, b) {
  var c = b[0], d = b[1];
  if(!Sd && d && (d.name || d.type)) {
    c = ["<", c];
    d.name && c.push(' name="', za(d.name), '"');
    if(d.type) {
      c.push(' type="', za(d.type), '"');
      var g = {};
      sb(g, d);
      d = g;
      delete d.type
    }
    c.push(">");
    c = c.join("")
  }
  c = a.createElement(c);
  d && (B(d) ? c.className = d : ja(d) ? S.apply(l, [c].concat(d)) : Xd(c, d));
  2 < b.length && be(a, c, b, 2);
  return c
}
function be(a, b, c, d) {
  function g(c) {
    c && b.appendChild(B(c) ? a.createTextNode(c) : c)
  }
  for(;d < c.length;d++) {
    var f = c[d];
    if(ka(f) && !(na(f) && 0 < f.nodeType)) {
      var j;
      a: {
        if(f && "number" == typeof f.length) {
          if(na(f)) {
            j = "function" == typeof f.item || "string" == typeof f.item;
            break a
          }
          if(ma(f)) {
            j = "function" == typeof f.item;
            break a
          }
        }
        j = r
      }
      J(j ? Gb(f) : f, g)
    }else {
      g(f)
    }
  }
}
function ce(a, b) {
  var c = a.createElement("div");
  E ? (c.innerHTML = "<br>" + b, c.removeChild(c.firstChild)) : c.innerHTML = b;
  if(1 == c.childNodes.length) {
    return c.removeChild(c.firstChild)
  }
  for(var d = a.createDocumentFragment();c.firstChild;) {
    d.appendChild(c.firstChild)
  }
  return d
}
function de(a) {
  return a && a.parentNode ? a.parentNode.removeChild(a) : l
}
function ee(a) {
  if(a.firstElementChild != h) {
    a = a.firstElementChild
  }else {
    for(a = a.firstChild;a && 1 != a.nodeType;) {
      a = a.nextSibling
    }
  }
  return a
}
function fe(a, b) {
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
var ge = {SCRIPT:1, STYLE:1, HEAD:1, IFRAME:1, OBJECT:1}, he = {IMG:" ", BR:"\n"};
function ie(a) {
  var b = a.getAttributeNode("tabindex");
  return b && b.specified ? (a = a.tabIndex, la(a) && 0 <= a && 32768 > a) : r
}
function je(a) {
  var b = [];
  ke(a, b, r);
  return b.join("")
}
function ke(a, b, c) {
  if(!(a.nodeName in ge)) {
    if(3 == a.nodeType) {
      c ? b.push(("" + a.nodeValue).replace(/(\r\n|\r|\n)/g, "")) : b.push(a.nodeValue)
    }else {
      if(a.nodeName in he) {
        b.push(he[a.nodeName])
      }else {
        for(a = a.firstChild;a;) {
          ke(a, b, c), a = a.nextSibling
        }
      }
    }
  }
}
function le(a, b) {
  for(var a = a.parentNode, c = 0;a;) {
    if(b(a)) {
      return a
    }
    a = a.parentNode;
    c++
  }
  return l
}
function Vd(a) {
  this.o = a || y.document || document
}
w = Vd.prototype;
w.n = U;
function me(a) {
  return a.o
}
w.a = function(a) {
  return B(a) ? this.o.getElementById(a) : a
};
w.ei = Xd;
w.d = function(a, b, c) {
  return ae(this.o, arguments)
};
w.createElement = function(a) {
  return this.o.createElement(a)
};
w.createTextNode = function(a) {
  return this.o.createTextNode(a)
};
function ne(a) {
  return"CSS1Compat" == a.o.compatMode
}
w.ad = function() {
  return this.o.parentWindow || this.o.defaultView
};
function oe(a) {
  var b = a.o, a = !G && "CSS1Compat" == b.compatMode ? b.documentElement : b.body, b = b.parentWindow || b.defaultView;
  return new P(b.pageXOffset || a.scrollLeft, b.pageYOffset || a.scrollTop)
}
w.appendChild = function(a, b) {
  a.appendChild(b)
};
w.append = function(a, b) {
  be(V(a), a, arguments, 1)
};
w.removeNode = de;
w.Xc = function(a) {
  return Td && a.children != h ? a.children : Ab(a.childNodes, function(a) {
    return 1 == a.nodeType
  })
};
w.Df = ee;
w.contains = fe;
function pe(a, b, c) {
  B(b) ? qe(a, c, b) : nb(b, ua(qe, a))
}
function qe(a, b, c) {
  a.style[Ja(c)] = b
}
function re(a, b) {
  var c = V(a);
  return c.defaultView && c.defaultView.getComputedStyle && (c = c.defaultView.getComputedStyle(a, l)) ? c[b] || c.getPropertyValue(b) || "" : ""
}
function se(a, b) {
  return re(a, b) || (a.currentStyle ? a.currentStyle[b] : l) || a.style && a.style[b]
}
function te(a) {
  return se(a, "position")
}
function ue(a, b, c) {
  var d, g = F && (Pa || ab) && H("1.9");
  b instanceof P ? (d = b.x, b = b.y) : (d = b, b = c);
  a.style.left = ve(d, g);
  a.style.top = ve(b, g)
}
function we(a) {
  return new P(a.offsetLeft, a.offsetTop)
}
function xe(a) {
  if(Ya && G) {
    var b = a.ownerDocument.defaultView;
    if(b != b.top) {
      return r
    }
  }
  return!!a.getBoundingClientRect
}
function ye(a) {
  var b = a.getBoundingClientRect();
  E && (a = a.ownerDocument, b.left -= a.documentElement.clientLeft + a.body.clientLeft, b.top -= a.documentElement.clientTop + a.body.clientTop);
  return b
}
function ze(a) {
  if(E && !kb(8)) {
    return a.offsetParent
  }
  for(var b = V(a), c = se(a, "position"), d = "fixed" == c || "absolute" == c, a = a.parentNode;a && a != b;a = a.parentNode) {
    if(c = se(a, "position"), d = d && "static" == c && a != b.documentElement && a != b.body, !d && (a.scrollWidth > a.clientWidth || a.scrollHeight > a.clientHeight || "fixed" == c || "absolute" == c || "relative" == c)) {
      return a
    }
  }
  return l
}
function Ae(a) {
  for(var b = new Ld(0, Infinity, Infinity, 0), c = U(a), d = c.o.body, g = c.o.documentElement, f = !G && "CSS1Compat" == c.o.compatMode ? c.o.documentElement : c.o.body;a = ze(a);) {
    if((!E || 0 != a.clientWidth) && (!G || 0 != a.clientHeight || a != d) && a != d && a != g && "visible" != se(a, "overflow")) {
      var j = Be(a), m;
      m = a;
      if(F && !H("1.9")) {
        var n = parseFloat(re(m, "borderLeftWidth"));
        if(Ce(m)) {
          var p = m.offsetWidth - m.clientWidth - n - parseFloat(re(m, "borderRightWidth")), n = n + p
        }
        m = new P(n, parseFloat(re(m, "borderTopWidth")))
      }else {
        m = new P(m.clientLeft, m.clientTop)
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
  c = Zd(c.ad() || window);
  b.right = Math.min(b.right, d + c.width);
  b.bottom = Math.min(b.bottom, f + c.height);
  return 0 <= b.top && 0 <= b.left && b.bottom > b.top && b.right > b.left ? b : l
}
function Be(a) {
  var b, c = V(a), d = se(a, "position"), g = F && c.getBoxObjectFor && !a.getBoundingClientRect && "absolute" == d && (b = c.getBoxObjectFor(a)) && (0 > b.screenX || 0 > b.screenY), f = new P(0, 0), j;
  b = c ? V(c) : document;
  j = E && !kb(9) && !ne(U(b)) ? b.body : b.documentElement;
  if(a == j) {
    return f
  }
  if(xe(a)) {
    b = ye(a), a = oe(U(c)), f.x = b.left + a.x, f.y = b.top + a.y
  }else {
    if(c.getBoxObjectFor && !g) {
      b = c.getBoxObjectFor(a), a = c.getBoxObjectFor(j), f.x = b.screenX - a.screenX, f.y = b.screenY - a.screenY
    }else {
      b = a;
      do {
        f.x += b.offsetLeft;
        f.y += b.offsetTop;
        b != a && (f.x += b.clientLeft || 0, f.y += b.clientTop || 0);
        if(G && "fixed" == te(b)) {
          f.x += c.body.scrollLeft;
          f.y += c.body.scrollTop;
          break
        }
        b = b.offsetParent
      }while(b && b != a);
      if(Xa || G && "absolute" == d) {
        f.y -= c.body.offsetTop
      }
      for(b = a;(b = ze(b)) && b != c.body && b != j;) {
        if(f.x -= b.scrollLeft, !Xa || "TR" != b.tagName) {
          f.y -= b.scrollTop
        }
      }
    }
  }
  return f
}
function De(a) {
  var b = new P;
  if(1 == a.nodeType) {
    if(xe(a)) {
      var c = ye(a);
      b.x = c.left;
      b.y = c.top
    }else {
      var c = oe(U(a)), d = Be(a);
      b.x = d.x - c.x;
      b.y = d.y - c.y
    }
    if(F && !H(12)) {
      var g;
      E ? g = "-ms-transform" : G ? g = "-webkit-transform" : Xa ? g = "-o-transform" : F && (g = "-moz-transform");
      var f;
      g && (f = se(a, g));
      f || (f = se(a, "transform"));
      f ? (a = f.match(Fe), a = !a ? new P(0, 0) : new P(parseFloat(a[1]), parseFloat(a[2]))) : a = new P(0, 0);
      b = new P(b.x + a.x, b.y + a.y)
    }
  }else {
    g = ma(a.ih), f = a, a.targetTouches ? f = a.targetTouches[0] : g && a.S.targetTouches && (f = a.S.targetTouches[0]), b.x = f.clientX, b.y = f.clientY
  }
  return b
}
function ve(a, b) {
  "number" == typeof a && (a = (b ? Math.round(a) : a) + "px");
  return a
}
function Ge(a) {
  if("none" != se(a, "display")) {
    return He(a)
  }
  var b = a.style, c = b.display, d = b.visibility, g = b.position;
  b.visibility = "hidden";
  b.position = "absolute";
  b.display = "inline";
  a = He(a);
  b.display = c;
  b.position = g;
  b.visibility = d;
  return a
}
function He(a) {
  var b = a.offsetWidth, c = a.offsetHeight, d = G && !b && !c;
  return(!ea(b) || d) && a.getBoundingClientRect ? (a = ye(a), new Q(a.right - a.left, a.bottom - a.top)) : new Q(b, c)
}
function Ie(a) {
  var b = Be(a), a = Ge(a);
  return new R(b.x, b.y, a.width, a.height)
}
function Je(a, b) {
  a.style.display = b ? "" : "none"
}
function Ce(a) {
  return"rtl" == se(a, "direction")
}
var Ke = F ? "MozUserSelect" : G ? "WebkitUserSelect" : l;
function Le(a, b, c) {
  c = !c ? a.getElementsByTagName("*") : l;
  if(Ke) {
    if(b = b ? "none" : "", a.style[Ke] = b, c) {
      for(var a = 0, d;d = c[a];a++) {
        d.style[Ke] = b
      }
    }
  }else {
    if(E || Xa) {
      if(b = b ? "on" : "", a.setAttribute("unselectable", b), c) {
        for(a = 0;d = c[a];a++) {
          d.setAttribute("unselectable", b)
        }
      }
    }
  }
}
function Me(a) {
  return new Q(a.offsetWidth, a.offsetHeight)
}
function Ne(a, b) {
  var c = ne(U(V(a)));
  if(E && (!c || !H("8"))) {
    var d = a.style;
    if(c) {
      var c = Oe(a), g = Pe(a);
      d.pixelWidth = b.width - g.left - c.left - c.right - g.right;
      d.pixelHeight = b.height - g.top - c.top - c.bottom - g.bottom
    }else {
      d.pixelWidth = b.width, d.pixelHeight = b.height
    }
  }else {
    d = a.style, F ? d.MozBoxSizing = "border-box" : G ? d.WebkitBoxSizing = "border-box" : d.boxSizing = "border-box", d.width = Math.max(b.width, 0) + "px", d.height = Math.max(b.height, 0) + "px"
  }
}
function Qe(a) {
  var b = V(a), c = E && a.currentStyle;
  if(c && ne(U(b)) && "auto" != c.width && "auto" != c.height && !c.boxSizing) {
    return b = Re(a, c.width, "width", "pixelWidth"), a = Re(a, c.height, "height", "pixelHeight"), new Q(b, a)
  }
  c = Me(a);
  b = Oe(a);
  a = Pe(a);
  return new Q(c.width - a.left - b.left - b.right - a.right, c.height - a.top - b.top - b.bottom - a.bottom)
}
function Re(a, b, c, d) {
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
function Se(a, b) {
  return Re(a, a.currentStyle ? a.currentStyle[b] : l, "left", "pixelLeft")
}
function Oe(a) {
  if(E) {
    var b = Se(a, "paddingLeft"), c = Se(a, "paddingRight"), d = Se(a, "paddingTop"), a = Se(a, "paddingBottom");
    return new Ld(d, c, a, b)
  }
  b = re(a, "paddingLeft");
  c = re(a, "paddingRight");
  d = re(a, "paddingTop");
  a = re(a, "paddingBottom");
  return new Ld(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
}
var Te = {thin:2, medium:4, thick:6};
function Ue(a, b) {
  if("none" == (a.currentStyle ? a.currentStyle[b + "Style"] : l)) {
    return 0
  }
  var c = a.currentStyle ? a.currentStyle[b + "Width"] : l;
  return c in Te ? Te[c] : Re(a, c, "left", "pixelLeft")
}
function Pe(a) {
  if(E) {
    var b = Ue(a, "borderLeft"), c = Ue(a, "borderRight"), d = Ue(a, "borderTop"), a = Ue(a, "borderBottom");
    return new Ld(d, c, a, b)
  }
  b = re(a, "borderLeftWidth");
  c = re(a, "borderRightWidth");
  d = re(a, "borderTopWidth");
  a = re(a, "borderBottomWidth");
  return new Ld(parseFloat(d), parseFloat(c), parseFloat(a), parseFloat(b))
}
var Fe = /matrix\([0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, [0-9\.\-]+, ([0-9\.\-]+)p?x?, ([0-9\.\-]+)p?x?\)/;
function Ve() {
}
A(Ve);
Ve.prototype.Lh = 0;
Ve.K();
function W(a) {
  this.G = r;
  this.kb = a || U();
  this.Sa = We
}
D(W, gc);
W.prototype.Dh = Ve.K();
var We = l, Xe = {li:"beforeshow", zi:"show", vi:"hide", ri:"disable", si:"enable", wi:"highlight", Bi:"unhighlight", ki:"activate", qi:"deactivate", yi:"select", Ci:"unselect", oi:"check", Ai:"uncheck", ui:"focus", mi:"blur", OPEN:"open", pi:"close", ti:"enter", xi:"leave", ji:"action", ni:"change"};
function Ye(a, b) {
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
w = W.prototype;
w.Qb = l;
w.l = r;
w.f = l;
w.Sa = l;
w.ze = l;
w.m = l;
w.z = l;
w.ca = l;
w.mg = r;
function Ze(a) {
  return a.Qb || (a.Qb = ":" + (a.Dh.Lh++).toString(36))
}
function $e(a, b) {
  if(a.m && a.m.ca) {
    var c = a.m.ca, d = a.Qb;
    d in c && delete c[d];
    qb(a.m.ca, b, a)
  }
  a.Qb = b
}
w.a = s("f");
w.la = function() {
  return this.Ob || (this.Ob = new M(this))
};
function af(a, b) {
  a == b && e(Error("Unable to set parent component"));
  b && a.m && a.Qb && bf(a.m, a.Qb) && a.m != b && e(Error("Unable to set parent component"));
  a.m = b;
  W.b.Je.call(a, b)
}
w.getParent = s("m");
w.Je = function(a) {
  this.m && this.m != a && e(Error("Method not supported"));
  W.b.Je.call(this, a)
};
w.n = s("kb");
w.d = function() {
  this.f = this.kb.createElement("div")
};
function cf(a, b, c) {
  a.l && e(Error("Component already rendered"));
  a.f || a.d();
  b ? b.insertBefore(a.f, c || l) : a.kb.o.body.appendChild(a.f);
  (!a.m || a.m.l) && a.j()
}
w.t = function(a) {
  this.l && e(Error("Component already rendered"));
  if(a && this.ba(a)) {
    this.mg = k;
    if(!this.kb || this.kb.o != V(a)) {
      this.kb = U(a)
    }
    this.O(a);
    this.j()
  }else {
    e(Error("Invalid element to decorate"))
  }
};
w.ba = t(k);
w.O = ba("f");
w.j = function() {
  this.l = k;
  df(this, function(a) {
    !a.l && a.a() && a.j()
  })
};
w.P = function() {
  df(this, function(a) {
    a.l && a.P()
  });
  this.Ob && xc(this.Ob);
  this.l = r
};
w.e = function() {
  W.b.e.call(this);
  this.l && this.P();
  this.Ob && (this.Ob.R(), delete this.Ob);
  df(this, function(a) {
    a.R()
  });
  !this.mg && this.f && de(this.f);
  this.m = this.ze = this.f = this.ca = this.z = l
};
w.Ma = function(a, b) {
  this.Fb(a, ef(this), b)
};
w.Fb = function(a, b, c) {
  a.l && (c || !this.l) && e(Error("Component already rendered"));
  (0 > b || b > ef(this)) && e(Error("Child component index out of bounds"));
  if(!this.ca || !this.z) {
    this.ca = {}, this.z = []
  }
  a.getParent() == this ? (this.ca[Ze(a)] = a, Fb(this.z, a)) : qb(this.ca, Ze(a), a);
  af(a, this);
  Hb(this.z, b, 0, a);
  a.l && this.l && a.getParent() == this ? (c = this.M(), c.insertBefore(a.a(), c.childNodes[b] || l)) : c ? (this.f || this.d(), b = X(this, b + 1), cf(a, this.M(), b ? b.f : l)) : this.l && !a.l && a.f && a.f.parentNode && a.j()
};
w.M = s("f");
function ff(a) {
  a.Sa == l && (a.Sa = Ce(a.l ? a.f : a.kb.o.body));
  return a.Sa
}
w.Yb = function(a) {
  this.l && e(Error("Component already rendered"));
  this.Sa = a
};
function gf(a) {
  return!!a.z && 0 != a.z.length
}
function ef(a) {
  return a.z ? a.z.length : 0
}
function bf(a, b) {
  return a.ca && b ? (b in a.ca ? a.ca[b] : h) || l : l
}
function X(a, b) {
  return a.z ? a.z[b] || l : l
}
function df(a, b, c) {
  a.z && J(a.z, b, c)
}
function hf(a, b) {
  return a.z && b ? zb(a.z, b) : -1
}
w.removeChild = function(a, b) {
  if(a) {
    var c = B(a) ? a : Ze(a), a = bf(this, c);
    if(c && a) {
      var d = this.ca;
      c in d && delete d[c];
      Fb(this.z, a);
      b && (a.P(), a.f && de(a.f));
      af(a, l)
    }
  }
  a || e(Error("Child is not in parent component"));
  return a
};
var jf = {};
function kf() {
}
A(kf);
kf.prototype.t = function(a, b, c, d) {
  var g = C(d.d, d), f = g("div"), j = g("div"), m = c, n = 1, p, o;
  S(a, "keyboard-wrapper");
  pe(a, "position", "relative");
  S(f, "white-keyboard");
  for(S(j, "black-keyboard");m.ja >= b.ja;) {
    o = g("div"), d.ei(o, {"data-note":m.getString()}), m.Fh ? (m.ja == c.ja && -1 !== "cdfga".indexOf(m.Q, 0) ? (p = 9, S(o, "edge_short")) : m.ja == b.ja && -1 !== "degab".indexOf(m.Q, 0) ? (p = 9, S(o, "edge_short")) : -1 !== "dga".indexOf(m.Q, 0) ? (p = 19, S(o, "long")) : (p = 14, S(o, "short")), f.appendChild(o), n += p + 1) : (pe(o, {position:"absolute", top:n - 5 - 1 + "px"}), j.appendChild(o)), m.ja === c.ja && S(o, "top"), S(o, "keyboard-key"), m.ja === c.ja && S(o, "first-key"), o = p = 
    h, "c" === m.Q ? (p = m.ve - 1, o = "b") : (p = m.ve, o = Hd[zb(Hd, m.Q) - 1]), m = new Fd(o, p, m.ff)
  }
  a.appendChild(f);
  a.appendChild(j)
};
function lf(a, b, c, d) {
  this.xg = a;
  this.tg = b;
  this.Ia = this.Ha = l;
  this.Kc = r;
  this.Md = l;
  this.Dg = c ? c : jf.Di.K();
  this.p = new M;
  W.call(this, d)
}
D(lf, W);
w = lf.prototype;
w.O = function(a) {
  lf.b.O.call(this, a);
  this.Dg.t(a, this.xg, this.tg, this.n())
};
w.j = function() {
  lf.b.j.call(this);
  this.p.c(this.a(), ["mousedown", "mousemove"], this.Mh, r, this);
  this.p.c(this.a(), ["mouseup"], this.Ph, r, this);
  this.p.c(this.a(), ["mouseout"], this.Th, r, this)
};
w.Th = function(a) {
  if(!fe(this.a(), a.relatedTarget) || a.relatedTarget == this.a()) {
    this.Ha && mf(this, this.Ha.dataset.note, nf), this.Ha = l, this.Ia && Pd(this.Ia, "mouseover"), this.Ia = l, this.Kc = r
  }
};
w.Ph = function(a) {
  a.preventDefault();
  this.Kc = r;
  this.Ha = l;
  a.target.dataset.note && mf(this, a.target.dataset.note, nf)
};
w.Mh = function(a) {
  a.preventDefault();
  "mousedown" == a.type && (this.Kc = k);
  a.target.dataset.note && (this.Kc && this.Ha != a.target && (this.Ha && mf(this, this.Ha.dataset.note, nf), mf(this, a.target.dataset.note, of), this.Ha = a.target), this.Ia != a.target && (this.Ia && Pd(this.Ia, "mouseover"), this.Ia = a.target, S(this.Ia, "mouseover")))
};
function mf(a, b, c) {
  a.Md && c == of && mf(a, a.Md, nf);
  var d = event = new Lb(c), g = b.indexOf("|"), f = b.slice(0, g), g = b.slice(g + 1);
  (f = new Fd(g, parseInt(f), h)) || e(Error("invalid strings"));
  d.Q = f.Q ? f : r;
  a.dispatchEvent(event);
  c == of && (a.Md = b)
}
var of = "keyboard-on", nf = "keyboard-off";
function pf(a) {
  this.fb = a;
  this.Uh = C(function(a) {
    a.data.callback && (this.cb[a.data.callback] ? (this.cb[a.data.callback].s(a.data), delete this.cb[a.data.callback]) : e(Error("invalid callback name")), this.Te[a.data.callback] && delete this.Te[a.data.callback])
  }, this);
  C(function(a) {
    a.data.callback && (this.cb[a.data.callback] ? (this.cb[a.data.callback].s(a.data), delete this.cb[a.data.callback]) : e(Error("invalid callback name")))
  }, this);
  this.cb = {};
  this.Te = {};
  this.fb.addEventListener("message", this.Uh)
}
pf.prototype.create = function(a) {
  var a = a || {}, b = (65536 * (1 + Math.random()) | 0).toString(16).substring(1) + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1) + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1) + "_" + (65536 * (1 + Math.random()) | 0).toString(16).substring(1), c = new uc, d = sc(pc(new uc, C(function(c) {
    ma(a) ? (c = a(c), c.callback = b, this.fb.postMessage(c)) : (a.callback = b, this.fb.postMessage(a))
  }, this)), c);
  this.cb[b] = c;
  return d
};
function qf(a, b) {
  this.G = r;
  this.Gg = a;
  this.Ja = b && b.xd ? b.xd : 48E3;
  (!b || !b.xd) && console.log("wavePlugin set default sample rate: 48000");
  this.Ld = r;
  this.fb = new Worker(a);
  this.Od = new pf(this.fb);
  this.Id = C(function(a) {
    var b = new Lb(rf);
    b.error = a;
    this.dispatchEvent(b)
  }, this);
  this.fb.addEventListener("error", this.Id);
  this.p = new M;
  this.p.c(document, "error", this.Id, r, this)
}
D(qf, gc);
qf.prototype.e = function() {
  qf.b.e.call(this);
  this.fb.removeEventListener("error", this.Id);
  this.p.R()
};
qf.prototype.da = function() {
  return new qf(this.Gg, {xd:this.Ja})
};
function sf(a) {
  a.Ld = k;
  return a.Od.create({action:"init", initParams:{sampleRate:a.Ja}})
}
function tf(a, b) {
  var c = a.Od.create({action:"addEvent", event:b});
  return a.Ld ? c : vc(sf(a), c)
}
qf.prototype.de = function(a) {
  var b = this.Od.create({action:"getBuffer", length:a}, {error:function() {
    console.log("GET BUFFER ERROR");
    return{xc:new Float32Array(a), Bc:new Float32Array(a)}
  }});
  return pc(this.Ld ? b : vc(sf(this), b), function(a) {
    return{xc:a.leftBuffer, Bc:a.rightBuffer}
  })
};
function uf(a, b) {
  this.type = a;
  if(a == vf || a == wf) {
    if(b.Q.constructor != Fd || b.Pe) {
      this.note = {freq:b.Q.ja}
    }
    this.velocity = b.Pe
  }
}
var vf = "noteon", wf = "noteoff", rf = "waveplugin_error";
function xf(a, b, c) {
  W.call(this, c);
  this.p = new M;
  this.vg = a
}
D(xf, W);
function yf(a, b, c) {
  this.bb = a;
  xf.call(this, "debug", 0, c)
}
D(yf, xf);
yf.prototype.O = function(a) {
  yf.b.O.call(this, a);
  var b = this.n(), c = b.d("div", "window-oscillator-keyboard"), d = b.d("div", "window-oscillator-oscillator");
  this.bb.t(c);
  b.append(a, c);
  b.append(a, d)
};
function zf(a) {
  this.G = r;
  this.Ic = xd.K();
  this.p = new M;
  this.bf = new qf(a, {xd:48E3});
  this.Jc = new Jd(this.bf);
  yd(this.Ic, this.Jc);
  this.Ic.play();
  this.bb = new lf(Id(-4), Id(4), kf.K());
  this.Cg = new yf(this.bb);
  this.Ye = function(a) {
    tf(this.Jc.Nd, new uf(vf, {Q:a.Q, Pe:1})).s()
  };
  this.Xe = function(a) {
    tf(this.Jc.Nd, new uf(wf, {Q:a.Q, Pe:1})).s()
  };
  this.p.c(this.bb, of, this.Ye, r, this);
  this.p.c(this.bb, nf, this.Xe, r, this);
  this.p.c(this.bf, rf, function(a) {
    console.log(a.error.filename);
    Ad(this.Ic, this.Jc);
    this.p.V(this.bb, of, this.Ye);
    this.p.V(this.bb, nf, this.Xe);
    this.dispatchEvent(a)
  }, r, this)
}
D(zf, gc);
zf.prototype.ad = s("Cg");
zf.prototype.e = function() {
  W.b.e.call(this);
  this.p.R()
};
function Af(a) {
  this.Hd = a
}
Af.prototype.focus = function() {
  return this.Hd.focus()
};
Af.prototype.ua = function(a) {
  return a ? this.Hd.getValue().split("\n").join(a) : this.Hd.getValue()
};
function Bf(a, b, c) {
  this.$a = a;
  this.gc = r;
  xf.call(this, a.get("filename"), 0, c)
}
D(Bf, xf);
Bf.prototype.O = function(a) {
  Bf.b.O.call(this, a);
  var b = this.$a.get("content"), b = $d("textarea", {}, b);
  a.appendChild(b);
  var a = {Qf:k, Tf:k, mode:"javascript", Xf:C(this.Rh, this)}, c = {};
  a && (a.Qf && (c.lineNumbers = a.Qf), a.Tf && (c.matchBrackets = a.Tf), a.mode && (c.mode = a.mode), a.Xf && (c.onChange = a.Xf));
  this.Gd = new Af(CodeMirror.fromTextArea(b, c));
  this.p.c(this.$a, "model_change", this.Sh, r, this)
};
Bf.prototype.getFile = s("$a");
Bf.prototype.Rh = function() {
  Cf(this)
};
function Cf(a) {
  !a.gc && a.Gd.ua() != a.$a.get("content") ? (Df(a, "*" + a.$a.get("filename")), a.gc = k) : a.gc && a.Gd.ua() == a.$a.get("content") && (Df(a, a.$a.get("filename")), a.gc = r)
}
function Df(a, b) {
  a.dispatchEvent(new Lb("change_label", {ii:a, filename:b}))
}
Bf.prototype.Sh = function(a) {
  switch(a.target.ic) {
    case "filename":
      Df(this, a.target.Jg);
      break;
    case "content":
      Cf(this)
  }
};
function Ef(a, b) {
  a != l && this.append.apply(this, arguments)
}
w = Ef.prototype;
w.A = "";
w.set = function(a) {
  this.A = "" + a
};
w.append = function(a, b, c) {
  this.A += a;
  if(b != l) {
    for(var d = 1;d < arguments.length;d++) {
      this.A += arguments[d]
    }
  }
  return this
};
w.clear = function() {
  this.A = ""
};
w.toString = s("A");
function Ff(a, b, c, d, g) {
  if(!E && (!G || !H("525"))) {
    return k
  }
  if(Pa && g) {
    return Gf(a)
  }
  if(g && !d || !c && (17 == b || 18 == b) || E && d && b == a) {
    return r
  }
  switch(a) {
    case 13:
      return!(E && kb(9));
    case 27:
      return!G
  }
  return Gf(a)
}
function Gf(a) {
  if(48 <= a && 57 >= a || 96 <= a && 106 >= a || 65 <= a && 90 >= a || G && 0 == a) {
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
      return r
  }
}
function Hf(a) {
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
;function If(a, b) {
  a.setAttribute("role", b)
}
function Y(a, b, c) {
  a.setAttribute("aria-" + b, c)
}
;function Z(a, b, c) {
  W.call(this, c);
  this.J = b || Jf;
  this.Pb = a
}
D(Z, W);
var Kf = {};
w = Z.prototype;
w.He = r;
w.lc = r;
w.hi = l;
w.Kg = "";
w.gd = k;
w.Sc = -1;
w.e = function() {
  Z.b.e.call(this);
  this.Wa && (this.Wa.removeNode(this), this.Wa = l);
  this.f = l
};
w.dd = function() {
  var a = this.a();
  if(a) {
    var b = Lf(this);
    b && !b.id && (b.id = Ze(this) + ".label");
    If(a, "treeitem");
    Y(a, "selected", r);
    Y(a, "expanded", r);
    Y(a, "level", this.mb());
    b && Y(a, "labelledby", b.id);
    (a = this.Yc()) && If(a, "presentation");
    (a = this.fe()) && If(a, "presentation");
    a = Mf(this);
    If(a, "group");
    if(a.hasChildNodes()) {
      a = ef(this);
      for(b = 1;b <= a;b++) {
        var c = X(this, b - 1).a();
        Y(c, "setsize", a);
        Y(c, "posinset", b)
      }
    }
  }
};
w.d = function() {
  var a = new Ef;
  Nf(this, a);
  var b = this.n();
  this.f = ce(b.o, a.toString())
};
w.j = function() {
  Z.b.j.call(this);
  Kf[Ze(this)] = this;
  this.dd()
};
w.P = function() {
  Z.b.P.call(this);
  delete Kf[Ze(this)]
};
w.Fb = function(a, b) {
  var c = X(this, b - 1), d = X(this, b);
  Z.b.Fb.call(this, a, b);
  a.tb = c;
  a.ma = d;
  c ? c.ma = a : this.Af = a;
  d ? d.tb = a : this.Pf = a;
  var g = this.Y();
  g && Of(a, g);
  Pf(a, this.mb() + 1);
  if(this.a() && (this.cc(), this.X())) {
    g = Mf(this);
    a.a() || a.d();
    var f = a.a(), j = d && d.a();
    g.insertBefore(f, j);
    this.l && a.j();
    d || (c ? c.cc() : (Je(g, k), this.yb(this.X())))
  }
};
w.add = function(a, b) {
  a.getParent() && a.getParent().removeChild(a);
  this.Fb(a, b ? hf(this, b) : ef(this));
  return a
};
w.removeChild = function(a) {
  var b = this.Y(), c = b ? b.oa : l;
  if(c == a || a.contains(c)) {
    b.hasFocus() ? (this.select(), c = this.Yh, ma(c) ? this && (c = C(c, this)) : c && "function" == typeof c.handleEvent ? c = C(c.handleEvent, c) : e(Error("Invalid listener argument")), Dc.setTimeout(c, 10)) : this.select()
  }
  Z.b.removeChild.call(this, a);
  this.Pf == a && (this.Pf = a.tb);
  this.Af == a && (this.Af = a.ma);
  a.tb && (a.tb.ma = a.ma);
  a.ma && (a.ma.tb = a.tb);
  c = !a.ma;
  a.Wa = l;
  a.Sc = -1;
  if(b && (b.removeNode(this), this.l)) {
    b = Mf(this);
    if(a.l) {
      var d = a.a();
      b.removeChild(d);
      a.P()
    }
    c && (c = X(this, ef(this) - 1)) && c.cc();
    gf(this) || (b.style.display = "none", this.cc(), this.Yc().className = this.Mb())
  }
  return a
};
w.remove = Z.prototype.removeChild;
w.Yh = function() {
  this.select()
};
w.mb = function() {
  var a = this.Sc;
  0 > a && (a = (a = this.getParent()) ? a.mb() + 1 : 0, Pf(this, a));
  return a
};
function Pf(a, b) {
  if(b != a.Sc) {
    a.Sc = b;
    var c = Qf(a);
    if(c) {
      var d = Math.max(0, (a.mb() - 1) * a.J.qe) + "px";
      ff(a) ? c.style.paddingRight = d : c.style.paddingLeft = d
    }
    df(a, function(a) {
      Pf(a, b + 1)
    })
  }
}
w.contains = function(a) {
  for(;a;) {
    if(a == this) {
      return k
    }
    a = a.getParent()
  }
  return r
};
w.Xc = function() {
  var a = [];
  df(this, function(b) {
    a.push(b)
  });
  return a
};
w.fd = s("He");
w.select = function() {
  var a = this.Y();
  if(a && a.oa != this) {
    var b = r;
    a.oa && (b = a.oa == a.hh, Rf(a.oa, r));
    a.oa = this;
    this && (Rf(this, k), b && this.select());
    a.dispatchEvent("change")
  }
};
function Rf(a, b) {
  if(a.He != b) {
    a.He = b;
    Sf(a);
    var c = a.a();
    c && (Y(c, "selected", b), b && Y(a.Y().a(), "activedescendant", Ze(a)))
  }
}
w.X = s("lc");
w.yb = function(a) {
  var b = a != this.lc;
  if(!b || this.dispatchEvent(a ? "beforeexpand" : "beforecollapse")) {
    var c;
    this.lc = a;
    c = this.Y();
    var d = this.a();
    if(gf(this)) {
      if(!a && c && this.contains(c.oa) && this.select(), d) {
        if(c = Mf(this)) {
          if(Je(c, a), a && this.l && !c.hasChildNodes()) {
            var g = new Ef;
            df(this, function(a) {
              Nf(a, g)
            });
            c.innerHTML = g.toString();
            df(this, function(a) {
              a.j()
            })
          }
        }
        this.cc()
      }
    }else {
      (c = Mf(this)) && Je(c, r)
    }
    d && (this.Yc().className = this.Mb(), Y(d, "expanded", a));
    b && this.dispatchEvent(a ? "expand" : "collapse")
  }
};
w.toggle = function() {
  this.yb(!this.X())
};
w.Ge = function() {
  var a = this.getParent();
  a && (a.yb(k), a.Ge())
};
function Nf(a, b) {
  var c = a.Y(), c = !c.eg || c == a.getParent() && !c.fg ? a.J.Qg : a.J.Pg, d = a.X() && gf(a);
  b.append('<div class="', a.J.Zg, '" id="', Ze(a), '">', Tf(a), '<div class="', c, '" style="', "background-position:" + Uf(a) + ";", d ? "" : "display:none;", '">');
  d && df(a, function(a) {
    Nf(a, b)
  });
  b.append("</div></div>")
}
function Tf(a) {
  var b = new Ef;
  b.append('<div class="', a.$c(), '" style="padding-', ff(a) ? "right:" : "left:", Math.max(0, (a.mb() - 1) * a.J.qe), 'px">', a.Cf(), '<span style="display:inline-block" class="' + a.Mb() + '"></span>', Vf(a), "</div>");
  return b.toString()
}
w.$c = function() {
  return this.J.dh + (this.fd() ? " " + this.J.bh : "")
};
function Vf(a) {
  var b = a.hi, c = new Ef;
  c.append('<span class="', a.J.$g, '"', b ? ' title="' + za(b) + '"' : "", ">", a.Pb, "</span>", "<span>", a.Kg, "</span>");
  return c.toString()
}
w.Cf = function() {
  return'<span type="expand" style="display:inline-block" class="' + Wf(this) + '"></span>'
};
function Wf(a) {
  var b = a.Y(), c = !b.eg || b == a.getParent() && !b.fg, d = a.J, g = new Ef;
  g.append(d.jb, " ", d.Rg, " ");
  if(gf(a)) {
    var f = 0;
    b.fi && a.gd && (f = a.X() ? 2 : 1);
    c || (f = !a.ma ? f + 4 : f + 8);
    switch(f) {
      case 1:
        g.append(d.Vg);
        break;
      case 2:
        g.append(d.Ug);
        break;
      case 4:
        g.append(d.rf);
        break;
      case 5:
        g.append(d.Tg);
        break;
      case 6:
        g.append(d.Sg);
        break;
      case 8:
        g.append(d.sf);
        break;
      case 9:
        g.append(d.Xg);
        break;
      case 10:
        g.append(d.Wg);
        break;
      default:
        g.append(d.qf)
    }
  }else {
    c ? g.append(d.qf) : !a.ma ? g.append(d.rf) : g.append(d.sf)
  }
  return g.toString()
}
function Uf(a) {
  return(!a.ma ? "-100" : (a.mb() - 1) * a.J.qe) + "px 0"
}
w.a = function() {
  var a = Z.b.a.call(this);
  a || (this.f = a = this.n().a(Ze(this)));
  return a
};
function Qf(a) {
  return(a = a.a()) ? a.firstChild : l
}
w.fe = function() {
  var a = Qf(this);
  return a ? a.firstChild : l
};
w.Yc = function() {
  var a = Qf(this);
  return a ? a.childNodes[1] : l
};
function Lf(a) {
  return(a = Qf(a)) && a.lastChild ? a.lastChild.previousSibling : l
}
function Mf(a) {
  return(a = a.a()) ? a.lastChild : l
}
function Xf(a) {
  return-1 != a.Pb.indexOf("&") ? "document" in y ? Fa(a.Pb) : Ha(a.Pb) : a.Pb
}
function Sf(a) {
  var b = Qf(a);
  b && (b.className = a.$c())
}
w.cc = function() {
  var a = this.fe();
  a && (a.className = Wf(this));
  if(a = Mf(this)) {
    a.style.backgroundPosition = Uf(this)
  }
};
w.Oh = Mb;
function Yf(a) {
  return!a.X() || !gf(a) ? a : Yf(X(a, ef(a) - 1))
}
function Of(a, b) {
  a.Wa != b && (a.Wa = b, Zf(b.Gc, a), df(a, function(a) {
    Of(a, b)
  }))
}
;function $f(a, b, c) {
  Z.call(this, a, b, c)
}
D($f, Z);
$f.prototype.Wa = l;
$f.prototype.Y = function() {
  if(this.Wa) {
    return this.Wa
  }
  var a = this.getParent();
  return a && (a = a.Y()) ? (Of(this, a), a) : l
};
$f.prototype.Mb = function() {
  var a = this.X();
  if(a && this.Zd) {
    return this.Zd
  }
  if(!a && this.pe) {
    return this.pe
  }
  var b = this.J;
  if(gf(this)) {
    if(a && b.tf) {
      return b.jb + " " + b.tf
    }
    if(!a && b.Wd) {
      return b.jb + " " + b.Wd
    }
  }else {
    if(b.vf) {
      return b.jb + " " + b.vf
    }
  }
  return""
};
function ag(a, b, c, d) {
  a = za(a);
  Z.call(this, a, c, d);
  this.rg = b
}
D(ag, $f);
ag.prototype.Mb = function() {
  if(this.rg == bg && !gf(this)) {
    var a = this.J;
    return a.jb + " " + a.Wd
  }
  return ag.b.Mb.call(this)
};
var bg = "nodetype-directroy";
function cg(a) {
  this.I = {};
  if(a) {
    for(var b = Gc(a), a = Fc(a), c = 0;c < b.length;c++) {
      this.set(b[c], a[c])
    }
  }
}
w = cg.prototype;
w.aa = h;
w.set = function(a, b) {
  dg(this, a, b, r)
};
w.add = function(a, b) {
  dg(this, a, b, k)
};
function dg(a, b, c, d) {
  for(var g = 0;g < b.length;g++) {
    var f = b.charAt(g);
    a.I[f] || (a.I[f] = new cg);
    a = a.I[f]
  }
  d && a.aa !== h && e(Error('The collection already contains the key "' + b + '"'));
  a.aa = c
}
w.get = function(a) {
  for(var b = this, c = 0;c < a.length;c++) {
    var d = a.charAt(c);
    if(!b.I[d]) {
      return
    }
    b = b.I[d]
  }
  return b.aa
};
w.qc = function() {
  var a = [];
  eg(this, a);
  return a
};
function eg(a, b) {
  a.aa !== h && b.push(a.aa);
  for(var c in a.I) {
    eg(a.I[c], b)
  }
}
w.oc = function(a) {
  var b = [];
  if(a) {
    for(var c = this, d = 0;d < a.length;d++) {
      var g = a.charAt(d);
      if(!c.I[g]) {
        return[]
      }
      c = c.I[g]
    }
    fg(c, a, b)
  }else {
    fg(this, "", b)
  }
  return b
};
function fg(a, b, c) {
  a.aa !== h && c.push(b);
  for(var d in a.I) {
    fg(a.I[d], b + d, c)
  }
}
w.Vd = function(a) {
  return this.get(a) !== h
};
w.clear = function() {
  this.I = {};
  this.aa = h
};
w.remove = function(a) {
  for(var b = this, c = [], d = 0;d < a.length;d++) {
    var g = a.charAt(d);
    b.I[g] || e(Error('The collection does not have the key "' + a + '"'));
    c.push([b, g]);
    b = b.I[g]
  }
  a = b.aa;
  for(delete b.aa;0 < c.length;) {
    g = c.pop();
    b = g[0];
    g = g[1];
    a: {
      d = h;
      for(d in b.I[g].I) {
        d = r;
        break a
      }
      d = k
    }
    if(d) {
      delete b.I[g]
    }else {
      break
    }
  }
  return a
};
w.da = function() {
  return new cg(this)
};
function gg() {
  this.rb = new cg
}
w = gg.prototype;
w.A = "";
w.ye = l;
w.od = l;
w.zc = 0;
w.Vb = 0;
function Zf(a, b) {
  var c = Xf(b);
  if(c && !/^[\s\xa0]*$/.test(c == l ? "" : "" + c)) {
    var c = c.toLowerCase(), d = a.rb.get(c);
    d ? d.push(b) : a.rb.set(c, [b])
  }
}
function hg(a, b) {
  var c = r, d = a.rb.oc(b);
  if(d && d.length && (a.Vb = 0, a.zc = 0, c = ig(a, a.rb.get(d[0])))) {
    a.ye = d
  }
  return c
}
function ig(a, b) {
  var c;
  b && (a.Vb < b.length && (c = b[a.Vb], a.od = b), c && (c.Ge(), c.select()));
  return!!c
}
w.clear = function() {
  this.A = ""
};
function jg(a, b) {
  this.G = r;
  a && kg(this, a, b)
}
D(jg, gc);
w = jg.prototype;
w.f = l;
w.hd = l;
w.re = l;
w.jd = l;
w.Ra = -1;
w.Qa = -1;
var lg = {3:13, 12:144, 63232:38, 63233:40, 63234:37, 63235:39, 63236:112, 63237:113, 63238:114, 63239:115, 63240:116, 63241:117, 63242:118, 63243:119, 63244:120, 63245:121, 63246:122, 63247:123, 63248:44, 63272:46, 63273:36, 63275:35, 63276:33, 63277:34, 63289:144, 63302:45}, mg = {Up:38, Down:40, Left:37, Right:39, Enter:13, F1:112, F2:113, F3:114, F4:115, F5:116, F6:117, F7:118, F8:119, F9:120, F10:121, F11:122, F12:123, "U+007F":46, Home:36, End:35, PageUp:33, PageDown:34, Insert:45}, ng = E || 
G && H("525");
w = jg.prototype;
w.wh = function(a) {
  if(G && (17 == this.Ra && !a.ctrlKey || 18 == this.Ra && !a.altKey)) {
    this.Qa = this.Ra = -1
  }
  ng && !Ff(a.keyCode, this.Ra, a.shiftKey, a.ctrlKey, a.altKey) ? this.handleEvent(a) : this.Qa = F ? Hf(a.keyCode) : a.keyCode
};
w.xh = function() {
  this.Qa = this.Ra = -1
};
w.handleEvent = function(a) {
  var b = a.S, c, d;
  E && "keypress" == a.type ? (c = this.Qa, d = 13 != c && 27 != c ? b.keyCode : 0) : G && "keypress" == a.type ? (c = this.Qa, d = 0 <= b.charCode && 63232 > b.charCode && Gf(c) ? b.charCode : 0) : Xa ? (c = this.Qa, d = Gf(c) ? b.keyCode : 0) : (c = b.keyCode || this.Qa, d = b.charCode || 0, Pa && 63 == d && 224 == c && (c = 191));
  var g = c, f = b.keyIdentifier;
  c ? 63232 <= c && c in lg ? g = lg[c] : 25 == c && a.shiftKey && (g = 9) : f && f in mg && (g = mg[f]);
  a = g == this.Ra;
  this.Ra = g;
  this.dispatchEvent(new og(g, d, a, b))
};
w.a = s("f");
function kg(a, b, c) {
  a.jd && a.detach();
  a.f = b;
  a.hd = Xb(a.f, "keypress", a, c);
  a.re = Xb(a.f, "keydown", a.wh, c, a);
  a.jd = Xb(a.f, "keyup", a.xh, c, a)
}
w.detach = function() {
  this.hd && (bc(this.hd), bc(this.re), bc(this.jd), this.jd = this.re = this.hd = l);
  this.f = l;
  this.Qa = this.Ra = -1
};
w.e = function() {
  jg.b.e.call(this);
  this.detach()
};
function og(a, b, c, d) {
  d && this.Da(d, h);
  this.type = "key";
  this.keyCode = a;
  this.charCode = b;
  this.repeat = c
}
D(og, Ob);
function pg(a) {
  this.G = r;
  this.f = a;
  a = E ? "focusout" : "blur";
  this.Gh = Xb(this.f, E ? "focusin" : "focus", this, !E);
  this.Hh = Xb(this.f, a, this, !E)
}
D(pg, gc);
pg.prototype.handleEvent = function(a) {
  var b = new Ob(a.S);
  b.type = "focusin" == a.type || "focus" == a.type ? "focusin" : "focusout";
  this.dispatchEvent(b)
};
pg.prototype.e = function() {
  pg.b.e.call(this);
  bc(this.Gh);
  bc(this.Hh);
  delete this.f
};
function qg(a, b, c) {
  Z.call(this, a, b, c);
  this.lc = k;
  Rf(this, k);
  this.oa = this;
  this.Gc = new gg;
  if(E) {
    try {
      document.execCommand("BackgroundImageCache", r, k)
    }catch(d) {
      this.v.log($c, "Failed to enable background image cache", h)
    }
  }
}
D(qg, Z);
w = qg.prototype;
w.N = l;
w.$d = l;
w.v = gd("goog.ui.tree.TreeControl");
w.be = r;
w.hh = l;
w.eg = k;
w.fi = k;
w.Dc = k;
w.fg = k;
w.Y = function() {
  return this
};
w.mb = t(0);
w.Ge = aa();
w.vh = function() {
  this.be = k;
  S(this.a(), "focused");
  this.oa && this.oa.select()
};
w.mh = function() {
  this.be = r;
  Pd(this.a(), "focused")
};
w.hasFocus = s("be");
w.X = function() {
  return!this.Dc || qg.b.X.call(this)
};
w.yb = function(a) {
  this.Dc ? qg.b.yb.call(this, a) : this.lc = a
};
w.Cf = t("");
w.Yc = function() {
  var a = Qf(this);
  return a ? a.firstChild : l
};
w.fe = t(l);
w.cc = aa();
w.$c = function() {
  return qg.b.$c.call(this) + (this.Dc ? "" : " " + this.J.Yg)
};
w.Mb = function() {
  var a = this.X();
  if(a && this.Zd) {
    return this.Zd
  }
  if(!a && this.pe) {
    return this.pe
  }
  var b = this.J;
  return a && b.uf ? b.jb + " " + b.uf : !a && b.pf ? b.jb + " " + b.pf : ""
};
w.dd = function() {
  qg.b.dd.call(this);
  var a = this.a();
  If(a, "tree");
  Y(a, "labelledby", Lf(this).id)
};
w.j = function() {
  qg.b.j.call(this);
  var a = this.a();
  a.className = this.J.ah;
  a.setAttribute("hideFocus", "true");
  a = this.a();
  a.tabIndex = 0;
  var b = this.N = new jg(a), c = this.$d = new pg(a);
  this.la().c(c, "focusout", this.mh).c(c, "focusin", this.vh).c(b, "key", this.ea).c(a, "mousedown", this.ke).c(a, "click", this.ke).c(a, "dblclick", this.ke);
  this.dd()
};
w.P = function() {
  qg.b.P.call(this);
  this.N.R();
  this.N = l;
  this.$d.R();
  this.$d = l
};
w.ke = function(a) {
  N(this.v, "Received event " + a.type);
  var b;
  a: {
    b = l;
    for(var c = a.target;c != l;) {
      if(b = Kf[c.id]) {
        break a
      }
      if(c == this.a()) {
        break
      }
      c = c.parentNode
    }
    b = l
  }
  if(b) {
    switch(a.type) {
      case "mousedown":
        "expand" == a.target.getAttribute("type") && gf(b) ? b.gd && b.toggle() : (b.select(), Sf(b));
        break;
      case "click":
        b.Oh(a);
        break;
      case "dblclick":
        "expand" == a.target.getAttribute("type") && gf(b) || b.gd && b.toggle()
    }
  }
};
w.ea = function(a) {
  var b = r, b = this.Gc, c = r;
  switch(a.keyCode) {
    case 40:
    ;
    case 38:
      if(a.ctrlKey) {
        var c = 40 == a.keyCode ? 1 : -1, d = b.ye;
        if(d) {
          var g = l, f = r;
          if(b.od) {
            var j = b.Vb + c;
            0 <= j && j < b.od.length ? (b.Vb = j, g = b.od) : f = k
          }
          g || (j = b.zc + c, 0 <= j && j < d.length && (b.zc = j), d.length > b.zc && (g = b.rb.get(d[b.zc])), g && g.length && f && (b.Vb = -1 == c ? g.length - 1 : 0));
          ig(b, g) && (b.ye = d)
        }
        c = k
      }
      break;
    case 8:
      d = b.A.length - 1;
      c = k;
      0 < d ? (b.A = b.A.substring(0, d), hg(b, b.A)) : 0 == d ? b.A = "" : c = r;
      break;
    case 27:
      b.A = "", c = k
  }
  if(!(b = c)) {
    if(b = this.oa) {
      b = this.oa;
      c = k;
      switch(a.keyCode) {
        case 39:
          if(a.altKey) {
            break
          }
          gf(b) && (b.X() ? X(b, 0).select() : b.yb(k));
          break;
        case 37:
          if(a.altKey) {
            break
          }
          gf(b) && b.X() && b.gd ? b.yb(r) : (d = b.getParent(), g = b.Y(), d && (g.Dc || d != g) && d.select());
          break;
        case 40:
          a: {
            if(gf(b) && b.X()) {
              d = X(b, 0)
            }else {
              for(d = b;d != b.Y();) {
                g = d.ma;
                if(g != l) {
                  d = g;
                  break a
                }
                d = d.getParent()
              }
              d = l
            }
          }
          d && d.select();
          break;
        case 38:
          d = b.tb;
          d != l ? d = Yf(d) : (d = b.getParent(), g = b.Y(), d = !g.Dc && d == g ? l : d);
          d && d.select();
          break;
        default:
          c = r
      }
      c && (a.preventDefault(), (g = b.Y()) && g.Gc.clear());
      b = c
    }
    if(!b) {
      b = this.Gc;
      c = r;
      if(!a.ctrlKey && !a.altKey && (d = String.fromCharCode(a.charCode || a.keyCode).toLowerCase(), (1 == d.length && " " <= d && "~" >= d || "\u0080" <= d && "\ufffd" >= d) && (" " != d || b.A))) {
        b.A += d, c = hg(b, b.A)
      }
      b = c
    }
  }
  b && a.preventDefault();
  return b
};
w.removeNode = function(a) {
  var b = this.Gc, c = Xf(a);
  if(c && !/^[\s\xa0]*$/.test(c == l ? "" : "" + c)) {
    var c = c.toLowerCase(), d = b.rb.get(c);
    d && (Fb(d, a), d.length && b.rb.remove(c))
  }
};
var Jf = {qe:19, ah:"goog-tree-root goog-tree-item", Yg:"goog-tree-hide-root", Zg:"goog-tree-item", Pg:"goog-tree-children", Qg:"goog-tree-children-nolines", dh:"goog-tree-row", $g:"goog-tree-item-label", jb:"goog-tree-icon", Rg:"goog-tree-expand-icon", Vg:"goog-tree-expand-icon-plus", Ug:"goog-tree-expand-icon-minus", Xg:"goog-tree-expand-icon-tplus", Wg:"goog-tree-expand-icon-tminus", Tg:"goog-tree-expand-icon-lplus", Sg:"goog-tree-expand-icon-lminus", sf:"goog-tree-expand-icon-t", rf:"goog-tree-expand-icon-l", 
qf:"goog-tree-expand-icon-blank", tf:"goog-tree-expanded-folder-icon", Wd:"goog-tree-collapsed-folder-icon", vf:"goog-tree-file-icon", uf:"goog-tree-expanded-folder-icon", pf:"goog-tree-collapsed-folder-icon", bh:"selected"};
function rg() {
  var a = Jf, b = {}, c;
  for(c in a) {
    b[c] = a[c]
  }
  b.Hi = "/static/develop/closure/goog/images/tree/cleardot.gif";
  qg.call(this, "/", b)
}
D(rg, qg);
function sg(a, b, c) {
  this.G = r;
  this.target = a;
  this.handle = b || a;
  this.we = c || new R(NaN, NaN, NaN, NaN);
  this.o = V(a);
  this.sa = new M(this);
  Xb(this.handle, ["touchstart", "mousedown"], this.gg, r, this)
}
D(sg, gc);
var tg = E || F && H("1.9.3");
w = sg.prototype;
w.clientX = 0;
w.clientY = 0;
w.screenX = 0;
w.screenY = 0;
w.hg = 0;
w.ig = 0;
w.Hb = 0;
w.Ib = 0;
w.ha = k;
w.lb = r;
w.Jf = 0;
w.Eh = r;
w.Oe = r;
w.la = s("sa");
w.Ta = ba("ha");
w.e = function() {
  sg.b.e.call(this);
  $b(this.handle, ["touchstart", "mousedown"], this.gg, r, this);
  xc(this.sa);
  tg && this.o.releaseCapture();
  this.sa = this.handle = this.target = l
};
function ug(a) {
  ea(a.Sa) || (a.Sa = Ce(a.target));
  return a.Sa
}
w.gg = function(a) {
  var b = "mousedown" == a.type;
  if(this.ha && !this.lb && (!b || Sb(a))) {
    vg(a);
    if(0 == this.Jf) {
      if(this.dispatchEvent(new wg("start", this, a.clientX, a.clientY))) {
        this.lb = k, a.preventDefault()
      }else {
        return
      }
    }else {
      a.preventDefault()
    }
    var b = this.o, c = b.documentElement, d = !tg;
    this.sa.c(b, ["touchmove", "mousemove"], this.Ah, d);
    this.sa.c(b, ["touchend", "mouseup"], this.Tc, d);
    tg ? (c.setCapture(r), this.sa.c(c, "losecapture", this.Tc)) : this.sa.c(b ? b.parentWindow || b.defaultView : window, "blur", this.Tc);
    E && this.Eh && this.sa.c(b, "dragstart", Mb);
    this.di && this.sa.c(this.di, "scroll", this.Wh, d);
    this.clientX = this.hg = a.clientX;
    this.clientY = this.ig = a.clientY;
    this.screenX = a.screenX;
    this.screenY = a.screenY;
    this.Oe ? (a = this.target, b = a.offsetLeft, c = a.offsetParent, !c && "fixed" == te(a) && (c = V(a).documentElement), c ? (F ? (d = Pe(c), b += d.left) : kb(8) && (d = Pe(c), b -= d.left), a = Ce(c) ? c.clientWidth - (b + a.offsetWidth) : b) : a = b) : a = this.target.offsetLeft;
    this.Hb = a;
    this.Ib = this.target.offsetTop;
    this.Ce = oe(U(this.o));
    va()
  }else {
    this.dispatchEvent("earlycancel")
  }
};
w.Tc = function(a) {
  xc(this.sa);
  tg && this.o.releaseCapture();
  if(this.lb) {
    vg(a);
    this.lb = r;
    var b = xg(this, this.Hb), c = yg(this, this.Ib);
    this.dispatchEvent(new wg("end", this, a.clientX, a.clientY, 0, b, c))
  }else {
    this.dispatchEvent("earlycancel")
  }
  ("touchend" == a.type || "touchcancel" == a.type) && a.preventDefault()
};
function vg(a) {
  var b = a.type;
  "touchstart" == b || "touchmove" == b ? a.Da(a.S.targetTouches[0], a.currentTarget) : ("touchend" == b || "touchcancel" == b) && a.Da(a.S.changedTouches[0], a.currentTarget)
}
w.Ah = function(a) {
  if(this.ha) {
    vg(a);
    var b = (this.Oe && ug(this) ? -1 : 1) * (a.clientX - this.clientX), c = a.clientY - this.clientY;
    this.clientX = a.clientX;
    this.clientY = a.clientY;
    this.screenX = a.screenX;
    this.screenY = a.screenY;
    if(!this.lb) {
      var d = this.hg - this.clientX, g = this.ig - this.clientY;
      if(d * d + g * g > this.Jf) {
        if(this.dispatchEvent(new wg("start", this, a.clientX, a.clientY))) {
          this.lb = k
        }else {
          this.G || this.Tc(a);
          return
        }
      }
    }
    c = zg(this, b, c);
    b = c.x;
    c = c.y;
    this.lb && this.dispatchEvent(new wg("beforedrag", this, a.clientX, a.clientY, 0, b, c)) && (Ag(this, a, b, c), a.preventDefault())
  }
};
function zg(a, b, c) {
  var d = oe(U(a.o)), b = b + (d.x - a.Ce.x), c = c + (d.y - a.Ce.y);
  a.Ce = d;
  a.Hb += b;
  a.Ib += c;
  b = xg(a, a.Hb);
  a = yg(a, a.Ib);
  return new P(b, a)
}
w.Wh = function(a) {
  var b = zg(this, 0, 0);
  a.clientX = this.clientX;
  a.clientY = this.clientY;
  Ag(this, a, b.x, b.y)
};
function Ag(a, b, c, d) {
  a.Oe && ug(a) ? a.target.style.right = c + "px" : a.target.style.left = c + "px";
  a.target.style.top = d + "px";
  a.dispatchEvent(new wg("drag", a, b.clientX, b.clientY, 0, c, d))
}
function xg(a, b) {
  var c = a.we, d = !isNaN(c.left) ? c.left : l, c = !isNaN(c.width) ? c.width : 0;
  return Math.min(d != l ? d + c : Infinity, Math.max(d != l ? d : -Infinity, b))
}
function yg(a, b) {
  var c = a.we, d = !isNaN(c.top) ? c.top : l, c = !isNaN(c.height) ? c.height : 0;
  return Math.min(d != l ? d + c : Infinity, Math.max(d != l ? d : -Infinity, b))
}
function wg(a, b, c, d, g, f, j) {
  Lb.call(this, a);
  this.clientX = c;
  this.clientY = d;
  this.left = ea(f) ? f : b.Hb;
  this.top = ea(j) ? j : b.Ib
}
D(wg, Lb);
function Bg(a, b, c, d) {
  W.call(this, d);
  this.na = c;
  this.Lb = a;
  this.Ma(a);
  this.Xb = b;
  this.Ma(b)
}
D(Bg, W);
w = Bg.prototype;
w.zb = l;
w.H = l;
w.xb = l;
w.sc = 5;
w.Mf = l;
w.dg = l;
w.mc = l;
w.of = k;
w.wa = l;
w.d = function() {
  var a = this.n(), b = a.d("div", "goog-splitpane-first-container"), c = a.d("div", "goog-splitpane-second-container"), d = a.d("div", "goog-splitpane-handle");
  this.f = a.d("div", "goog-splitpane", b, c, d);
  this.H = b;
  this.xb = c;
  this.$ = d;
  Cg(this);
  Dg(this)
};
w.ba = function(a) {
  var b = Wd(document, l, "goog-splitpane-first-container", a)[0];
  if(!b) {
    return r
  }
  this.H = b;
  b = Wd(document, l, "goog-splitpane-second-container", a)[0];
  if(!b) {
    return r
  }
  this.xb = b;
  a = Wd(document, l, "goog-splitpane-handle", a)[0];
  if(!a) {
    return r
  }
  this.$ = a;
  return k
};
w.O = function(a) {
  Bg.b.O.call(this, a);
  Cg(this);
  a = Me(a);
  Eg(this, new Q(a.width, a.height));
  Dg(this)
};
function Dg(a) {
  var b = a.n();
  a.Lb.a() || a.Lb.d();
  b.appendChild(a.H, a.Lb.a());
  a.Xb.a() || a.Xb.d();
  b.appendChild(a.xb, a.Xb.a());
  a.zb = new sg(a.$, a.$);
  a.H.style.position = "absolute";
  a.xb.style.position = "absolute";
  a = a.$.style;
  a.position = "absolute";
  a.overflow = "hidden";
  a.zIndex = 2
}
w.j = function() {
  Bg.b.j.call(this);
  var a = this.a();
  "static" == te(a) && (a.style.position = "relative");
  this.la().c(this.$, "dblclick", this.rh).c(this.zb, "start", this.th).c(this.zb, "drag", this.uh).c(this.zb, "end", this.sh);
  Fg(this, this.Mf)
};
function Gg(a) {
  return"vertical" == a.na
}
function Cg(a) {
  Gg(a) ? (a.$.style.height = a.sc + "px", S(a.$, "goog-splitpane-handle-vertical")) : (a.$.style.width = a.sc + "px", S(a.$, "goog-splitpane-handle-horizontal"))
}
w.Ie = function(a) {
  if(this.na != a && (this.na = a, a = Gg(this), this.l)) {
    if(Gg(this) ? Rd(this.$, "goog-splitpane-handle-horizontal", "goog-splitpane-handle-vertical") : Rd(this.$, "goog-splitpane-handle-vertical", "goog-splitpane-handle-horizontal"), la(this.mc)) {
      var b = Me(this.a());
      Fg(this, this.mc * (a ? b.height / b.width : b.width / b.height))
    }else {
      Fg(this)
    }
  }
};
function Hg(a, b) {
  ue(a, b.left, b.top);
  Ne(a, new Q(Math.max(b.width, 0), Math.max(b.height, 0)))
}
function Fg(a, b) {
  var c = Me(a.a()), d = Gg(a), g = la(b) ? b : la(a.mc) ? a.mc : Math.floor((d ? c.height : c.width) / 2);
  a.mc = g;
  var f, j, m, n, p, o, q;
  d ? (m = d = c.width, n = a.sc, j = c.height - g - n, f = c.width, q = 0 + g, o = 0, p = q + n, c = 0) : (d = g, g = c.height, m = a.sc, n = c.height, f = c.width - d - m, j = c.height, o = 0 + d, q = 0, c = o + m, p = 0);
  Hg(a.H, new R(0, 0, d, g));
  "function" == typeof a.Lb.Fe && a.Lb.Fe(new Q(d, g));
  Hg(a.$, new R(o, q, m, n));
  Hg(a.xb, new R(c, p, f, j));
  "function" == typeof a.Xb.Fe && a.Xb.Fe(new Q(f, j));
  a.dispatchEvent("change")
}
function Eg(a, b) {
  Ne(a.a(), b);
  a.wa && Ne(a.wa, b);
  Fg(a)
}
w.th = function() {
  if(!this.wa) {
    var a = "position: relative";
    E && (a += ";background-color: #000;filter: Alpha(Opacity=0)");
    this.wa = this.n().d("div", {style:a});
    this.n().appendChild(this.a(), this.wa)
  }
  this.wa.style.zIndex = 1;
  Ne(this.wa, Me(this.a()));
  var b = we(this.H), c = a = 0, d = b.x, b = b.y, g = Me(this.H), f = Qe(this.H), j = Qe(this.xb);
  Gg(this) ? (c = f.height + j.height, b += g.height - f.height) : (a = f.width + j.width, d += g.width - f.width);
  this.zb.we = new R(d, b, a, c) || new R(NaN, NaN, NaN, NaN)
};
w.uh = function(a) {
  this.of && (Gg(this) ? Fg(this, a.top - we(this.H).y) : Fg(this, a.left - we(this.H).x))
};
w.sh = function(a) {
  this.wa.style.zIndex = -1;
  this.of || (Gg(this) ? Fg(this, a.top - we(this.H).y) : Fg(this, a.left - we(this.H).x));
  this.dispatchEvent("handle_drag_end")
};
w.rh = function() {
  var a;
  a = this.H;
  var b = De(this.$);
  a = De(a);
  a = new P(b.x - a.x, b.y - a.y);
  var c = Me(this.H), d = Qe(this.H);
  (b = Gg(this)) ? (c = c.height - d.height, a = a.y) : (c = c.width - d.width, a = a.x);
  c == a ? Fg(this, this.dg) : (this.dg = b ? Me(this.H).height : Me(this.H).width, Fg(this, c))
};
w.e = function() {
  Bg.b.e.call(this);
  this.zb.R();
  this.zb = l;
  de(this.wa);
  this.wa = l
};
function Ig(a, b, c, d) {
  Bg.call(this, a, b, c, d)
}
D(Ig, Bg);
Ig.prototype.j = function() {
  Ig.b.j.call(this);
  pe(this.H, {height:"100%"});
  pe(this.xb, {height:"100%"});
  pe(this.Lb.a(), {height:"100%"});
  pe(this.Xb.a(), {height:"100%"})
};
function Jg(a, b, c, d) {
  this.Hg = new Kg;
  this.Lc = a;
  this.af = b;
  this.La = c;
  this.p = new M;
  W.call(this, d)
}
D(Jg, W);
Jg.prototype.d = function() {
  var a = this.n(), b = a.d("div", Lg), c = a.d("div", Mg), d = new Ig(this.af, this.La, "horizontal");
  d.Mf = 170;
  d.sc = 5;
  this.f = a.d("div", Ng, b, c);
  this.yg = b;
  this.df = c;
  this.Ka = d;
  a = this.n();
  this.Lc.a() || this.Lc.d();
  a.appendChild(this.yg, this.Lc.a());
  this.Ka.a() || this.Ka.d();
  a.appendChild(this.df, this.Ka.a())
};
Jg.prototype.Fa = function() {
  var a = this.Hg.Ef();
  pe(this.Ka.a(), {height:a.height - Ie(this.Ka.a()).top + "px", width:a.width + "px"});
  a = Me(this.df);
  Eg(this.Ka, new Q(a.width, a.height));
  this.Zf()
};
Jg.prototype.Zf = function() {
  this.La.Fa()
};
Jg.prototype.j = function() {
  Jg.b.j.call(this);
  this.Lc.j();
  this.Ka.j();
  S(this.af.a(), Og);
  S(this.La.a(), Jg.Ei);
  this.p.c(window, "resize", this.Fa, r, this);
  this.p.c(this.Ka, "change", this.Zf, r, this);
  this.Fa()
};
var Ng = "synthjs-sdkoscillator", Lg = "synthjs-sdkoscillator-menu-container", Mg = "synthjs-sdkoscillator-workspace-container", Og = "synthjs-sdkoscillator-tree-pane";
function Pg(a, b, c, d, g, f, j, m, n) {
  var p, o;
  if(p = c.offsetParent) {
    var q = "HTML" == p.tagName || "BODY" == p.tagName;
    if(!q || "static" != te(p)) {
      o = Be(p), q || (q = (q = Ce(p)) && F ? -p.scrollLeft : q && (!E || !H("8")) ? p.scrollWidth - p.clientWidth - p.scrollLeft : p.scrollLeft, o = Kd(o, new P(q, p.scrollTop)))
    }
  }
  p = o || new P;
  o = Ie(a);
  if(q = Ae(a)) {
    var v = new R(q.left, q.top, q.right - q.left, q.bottom - q.top), q = Math.max(o.left, v.left), x = Math.min(o.left + o.width, v.left + v.width);
    if(q <= x) {
      var oa = Math.max(o.top, v.top), v = Math.min(o.top + o.height, v.top + v.height);
      oa <= v && (o.left = q, o.top = oa, o.width = x - q, o.height = v - oa)
    }
  }
  q = U(a);
  oa = U(c);
  if(q.o != oa.o) {
    var x = q.o.body, oa = oa.ad(), v = new P(0, 0), T = V(x) ? V(x).parentWindow || V(x).defaultView : window, Sa = x;
    do {
      var Ia = T == oa ? Be(Sa) : De(Sa);
      v.x += Ia.x;
      v.y += Ia.y
    }while(T && T != oa && (Sa = T.frameElement) && (T = T.parent));
    x = Kd(v, Be(x));
    E && !ne(q) && (x = Kd(x, oe(q)));
    o.left += x.x;
    o.top += x.y
  }
  a = (b & 4 && Ce(a) ? b ^ 2 : b) & -5;
  b = new P(a & 2 ? o.left + o.width : o.left, a & 1 ? o.top + o.height : o.top);
  b = Kd(b, p);
  g && (b.x += (a & 2 ? -1 : 1) * g.x, b.y += (a & 1 ? -1 : 1) * g.y);
  var u;
  if(j) {
    if(n) {
      u = n
    }else {
      if(u = Ae(c)) {
        u.top -= p.y, u.right -= p.x, u.bottom -= p.y, u.left -= p.x
      }
    }
  }
  a: {
    n = u;
    g = b.da();
    u = 0;
    a = (d & 4 && Ce(c) ? d ^ 2 : d) & -5;
    d = Ge(c);
    m = m ? m.da() : d.da();
    if(f || 0 != a) {
      a & 2 ? g.x -= m.width + (f ? f.right : 0) : f && (g.x += f.left), a & 1 ? g.y -= m.height + (f ? f.bottom : 0) : f && (g.y += f.top)
    }
    if(j) {
      if(n) {
        f = g;
        u = 0;
        if(65 == (j & 65) && (f.x < n.left || f.x >= n.right)) {
          j &= -2
        }
        if(132 == (j & 132) && (f.y < n.top || f.y >= n.bottom)) {
          j &= -5
        }
        f.x < n.left && j & 1 && (f.x = n.left, u |= 1);
        f.x < n.left && f.x + m.width > n.right && j & 16 && (m.width = Math.max(m.width - (f.x + m.width - n.right), 0), u |= 4);
        f.x + m.width > n.right && j & 1 && (f.x = Math.max(n.right - m.width, n.left), u |= 1);
        j & 2 && (u |= (f.x < n.left ? 16 : 0) | (f.x + m.width > n.right ? 32 : 0));
        f.y < n.top && j & 4 && (f.y = n.top, u |= 2);
        f.y >= n.top && f.y + m.height > n.bottom && j & 32 && (m.height = Math.max(m.height - (f.y + m.height - n.bottom), 0), u |= 8);
        f.y + m.height > n.bottom && j & 4 && (f.y = Math.max(n.bottom - m.height, n.top), u |= 2);
        j & 8 && (u |= (f.y < n.top ? 64 : 0) | (f.y + m.height > n.bottom ? 128 : 0));
        j = u
      }else {
        j = 256
      }
      u = j;
      if(u & 496) {
        c = u;
        break a
      }
    }
    ue(c, g);
    Md(d, m) || Ne(c, m);
    c = u
  }
  return c
}
;function Qg() {
}
Qg.prototype.Ee = aa();
function Rg(a, b, c) {
  this.element = a;
  this.Qc = b;
  this.ai = c
}
D(Rg, Qg);
Rg.prototype.Ee = function(a, b, c) {
  Pg(this.element, this.Qc, a, b, h, c, this.ai)
};
function Sg() {
  return k
}
;function Tg(a, b, c, d) {
  Rg.call(this, a, b);
  this.kd = c ? 5 : 0;
  this.Be = d || h
}
D(Tg, Rg);
Tg.prototype.jh = s("kd");
Tg.prototype.Ee = function(a, b, c, d) {
  var g = Pg(this.element, this.Qc, a, b, l, c, 10, d, this.Be);
  if(g & 496) {
    var f = bh(g, this.Qc), b = bh(g, b), g = Pg(this.element, f, a, b, l, c, 10, d, this.Be);
    g & 496 && (f = bh(g, f), b = bh(g, b), Pg(this.element, f, a, b, l, c, this.kd, d, this.Be))
  }
};
function bh(a, b) {
  a & 48 && (b ^= 2);
  a & 192 && (b ^= 1);
  return b
}
;function ch(a, b, c, d) {
  Tg.call(this, a, b, c || d);
  if(c || d) {
    this.kd = 65 | (d ? 32 : 132)
  }
}
D(ch, Tg);
function dh() {
}
var eh;
A(dh);
w = dh.prototype;
w.ka = aa();
w.d = function(a) {
  var b = a.n().d("div", this.Nb(a).join(" "), a.Ca);
  this.yd(a, b);
  return b
};
w.M = function(a) {
  return a
};
w.jc = function(a, b, c) {
  if(a = a.a ? a.a() : a) {
    if(E && !H("7")) {
      var d = fh(Od(a), b);
      d.push(b);
      ua(c ? S : Pd, a).apply(l, d)
    }else {
      c ? S(a, b) : Pd(a, b)
    }
  }
};
w.ba = t(k);
w.t = function(a, b) {
  b.id && $e(a, b.id);
  var c = this.M(b);
  c && c.firstChild ? gh(a, c.firstChild.nextSibling ? Gb(c.childNodes) : c.firstChild) : a.Ca = l;
  var d = 0, g = this.k(), f = this.k(), j = r, m = r, c = r, n = Od(b);
  J(n, function(a) {
    !j && a == g ? (j = k, f == g && (m = k)) : !m && a == f ? m = k : d |= this.ge(a)
  }, this);
  a.q = d;
  j || (n.push(g), f == g && (m = k));
  m || n.push(f);
  var p = a.ia;
  p && n.push.apply(n, p);
  if(E && !H("7")) {
    var o = fh(n);
    0 < o.length && (n.push.apply(n, o), c = k)
  }
  if(!j || !m || p || c) {
    b.className = n.join(" ")
  }
  this.yd(a, b);
  return b
};
w.Sb = function(a) {
  ff(a) && this.Yb(a.a(), k);
  a.isEnabled() && this.Ua(a, a.r)
};
w.yd = function(a, b) {
  a.isEnabled() || this.W(b, 1, k);
  a.fd() && this.W(b, 8, k);
  a.w & 16 && this.W(b, 16, !!(a.q & 16));
  a.w & 64 && this.W(b, 64, !!(a.q & 64))
};
w.Cc = function(a, b) {
  Le(a, !b, !E && !Xa)
};
w.Yb = function(a, b) {
  this.jc(a, this.k() + "-rtl", b)
};
w.Pa = function(a) {
  var b;
  return a.w & 32 && (b = a.B()) ? ie(b) : r
};
w.Ua = function(a, b) {
  var c;
  if(a.w & 32 && (c = a.B())) {
    if(!b && a.q & 32) {
      try {
        c.blur()
      }catch(d) {
      }
      a.q & 32 && a.nb(l)
    }
    ie(c) != b && (b ? c.tabIndex = 0 : (c.tabIndex = -1, c.removeAttribute("tabIndex")))
  }
};
w.qa = function(a, b) {
  Je(a, b)
};
w.Z = function(a, b, c) {
  var d = a.a();
  if(d) {
    var g = this.nc(b);
    g && this.jc(a, g, c);
    this.W(d, b, c)
  }
};
w.W = function(a, b, c) {
  eh || (eh = {1:"disabled", 8:"selected", 16:"checked", 64:"expanded"});
  (b = eh[b]) && Y(a, b, c)
};
w.B = function(a) {
  return a.a()
};
w.k = t("goog-control");
w.Nb = function(a) {
  var b = this.k(), c = [b], d = this.k();
  d != b && c.push(d);
  b = a.q;
  for(d = [];b;) {
    var g = b & -b;
    d.push(this.nc(g));
    b &= ~g
  }
  c.push.apply(c, d);
  (a = a.ia) && c.push.apply(c, a);
  E && !H("7") && c.push.apply(c, fh(c));
  return c
};
function fh(a, b) {
  var c = [];
  b && (a = a.concat([b]));
  J([], function(d) {
    Db(d, ua(K, a)) && (!b || K(d, b)) && c.push(d.join("_"))
  });
  return c
}
w.nc = function(a) {
  this.Pc || hh(this);
  return this.Pc[a]
};
w.ge = function(a) {
  if(!this.jg) {
    this.Pc || hh(this);
    var b = this.Pc, c = {}, d;
    for(d in b) {
      c[b[d]] = d
    }
    this.jg = c
  }
  a = parseInt(this.jg[a], 10);
  return isNaN(a) ? 0 : a
};
function hh(a) {
  var b = a.k();
  a.Pc = {1:b + "-disabled", 2:b + "-hover", 4:b + "-active", 8:b + "-selected", 16:b + "-checked", 32:b + "-focused", 64:b + "-open"}
}
;function ih(a, b) {
  a || e(Error("Invalid class name " + a));
  ma(b) || e(Error("Invalid decorator function " + b));
  jh[a] = b
}
var kh = {}, jh = {};
function $(a, b, c) {
  W.call(this, c);
  if(!b) {
    for(var b = this.constructor, d;b;) {
      d = pa(b);
      if(d = kh[d]) {
        break
      }
      b = b.b ? b.b.constructor : l
    }
    b = d ? ma(d.K) ? d.K() : new d : l
  }
  this.h = b;
  this.Ca = a
}
D($, W);
w = $.prototype;
w.Ca = l;
w.q = 0;
w.w = 39;
w.Sd = 255;
w.Ga = 0;
w.r = k;
w.ia = l;
w.le = k;
w.Nc = r;
w.ag = l;
function lh(a, b) {
  a.l && b != a.le && mh(a, b);
  a.le = b
}
w.B = function() {
  return this.h.B(this)
};
w.Zc = function() {
  return this.N || (this.N = new jg)
};
w.jc = function(a, b) {
  b ? a && (this.ia ? K(this.ia, a) || this.ia.push(a) : this.ia = [a], this.h.jc(this, a, k)) : a && this.ia && (Fb(this.ia, a), 0 == this.ia.length && (this.ia = l), this.h.jc(this, a, r))
};
w.d = function() {
  var a = this.h.d(this);
  this.f = a;
  var b = this.ag || this.h.ka();
  b && If(a, b);
  this.Nc || this.h.Cc(a, r);
  this.r || this.h.qa(a, r)
};
w.M = function() {
  return this.h.M(this.a())
};
w.ba = function(a) {
  return this.h.ba(a)
};
w.O = function(a) {
  this.f = a = this.h.t(this, a);
  var b = this.ag || this.h.ka();
  b && If(a, b);
  this.Nc || this.h.Cc(a, r);
  this.r = "none" != a.style.display
};
w.j = function() {
  $.b.j.call(this);
  this.h.Sb(this);
  if(this.w & -2 && (this.le && mh(this, k), this.w & 32)) {
    var a = this.B();
    if(a) {
      var b = this.Zc();
      kg(b, a);
      this.la().c(b, "key", this.ea).c(a, "focus", this.bd).c(a, "blur", this.nb)
    }
  }
};
function mh(a, b) {
  var c = a.la(), d = a.a();
  b ? (c.c(d, "mouseover", a.ne).c(d, "mousedown", a.ob).c(d, "mouseup", a.pb).c(d, "mouseout", a.me), a.rc != ha && c.c(d, "contextmenu", a.rc), E && c.c(d, "dblclick", a.Gf)) : (c.V(d, "mouseover", a.ne).V(d, "mousedown", a.ob).V(d, "mouseup", a.pb).V(d, "mouseout", a.me), a.rc != ha && c.V(d, "contextmenu", a.rc), E && c.V(d, "dblclick", a.Gf))
}
w.P = function() {
  $.b.P.call(this);
  this.N && this.N.detach();
  this.r && this.isEnabled() && this.h.Ua(this, r)
};
w.e = function() {
  $.b.e.call(this);
  this.N && (this.N.R(), delete this.N);
  delete this.h;
  this.ia = this.Ca = l
};
function gh(a, b) {
  a.Ca = b
}
w.Wc = function() {
  var a = this.Ca;
  if(!a) {
    return""
  }
  if(!B(a)) {
    if(ja(a)) {
      a = Bb(a, je).join("")
    }else {
      if(Ud && "innerText" in a) {
        a = a.innerText.replace(/(\r\n|\r|\n)/g, "\n")
      }else {
        var b = [];
        ke(a, b, k);
        a = b.join("")
      }
      a = a.replace(/ \xAD /g, " ").replace(/\xAD/g, "");
      a = a.replace(/\u200B/g, "");
      Ud || (a = a.replace(/ +/g, " "));
      " " != a && (a = a.replace(/^\s*/, ""))
    }
  }
  return xa(a)
};
w.Yb = function(a) {
  $.b.Yb.call(this, a);
  var b = this.a();
  b && this.h.Yb(b, a)
};
w.Cc = function(a) {
  this.Nc = a;
  var b = this.a();
  b && this.h.Cc(b, a)
};
w.qa = function(a, b) {
  if(b || this.r != a && this.dispatchEvent(a ? "show" : "hide")) {
    var c = this.a();
    c && this.h.qa(c, a);
    this.isEnabled() && this.h.Ua(this, a);
    this.r = a;
    return k
  }
  return r
};
w.isEnabled = function() {
  return!(this.q & 1)
};
w.Ta = function(a) {
  var b = this.getParent();
  if((!b || "function" != typeof b.isEnabled || b.isEnabled()) && nh(this, 1, !a)) {
    a || (this.setActive(r), this.pa(r)), this.r && this.h.Ua(this, a), this.Z(1, !a)
  }
};
w.pa = function(a) {
  nh(this, 2, a) && this.Z(2, a)
};
w.wc = function() {
  return!!(this.q & 4)
};
w.setActive = function(a) {
  nh(this, 4, a) && this.Z(4, a)
};
w.fd = function() {
  return!!(this.q & 8)
};
w.D = function(a) {
  nh(this, 64, a) && this.Z(64, a)
};
w.Z = function(a, b) {
  this.w & a && b != !!(this.q & a) && (this.h.Z(this, a, b), this.q = b ? this.q | a : this.q & ~a)
};
function oh(a, b, c) {
  a.l && a.q & b && !c && e(Error("Component already rendered"));
  !c && a.q & b && a.Z(b, r);
  a.w = c ? a.w | b : a.w & ~b
}
function ph(a, b) {
  return!!(a.Sd & b) && !!(a.w & b)
}
function nh(a, b, c) {
  return!!(a.w & b) && !!(a.q & b) != c && (!(a.Ga & b) || a.dispatchEvent(Ye(b, c))) && !a.G
}
w.ne = function(a) {
  !qh(a, this.a()) && this.dispatchEvent("enter") && this.isEnabled() && ph(this, 2) && this.pa(k)
};
w.me = function(a) {
  !qh(a, this.a()) && this.dispatchEvent("leave") && (ph(this, 4) && this.setActive(r), ph(this, 2) && this.pa(r))
};
w.rc = ha;
function qh(a, b) {
  return!!a.relatedTarget && fe(b, a.relatedTarget)
}
w.ob = function(a) {
  this.isEnabled() && (ph(this, 2) && this.pa(k), Sb(a) && (ph(this, 4) && this.setActive(k), this.h.Pa(this) && this.B().focus()));
  !this.Nc && Sb(a) && a.preventDefault()
};
w.pb = function(a) {
  this.isEnabled() && (ph(this, 2) && this.pa(k), this.wc() && this.sb(a) && ph(this, 4) && this.setActive(r))
};
w.Gf = function(a) {
  this.isEnabled() && this.sb(a)
};
w.sb = function(a) {
  if(ph(this, 16)) {
    var b = !(this.q & 16);
    nh(this, 16, b) && this.Z(16, b)
  }
  ph(this, 8) && nh(this, 8, k) && this.Z(8, k);
  ph(this, 64) && this.D(!(this.q & 64));
  b = new Lb("action", this);
  a && (b.altKey = a.altKey, b.ctrlKey = a.ctrlKey, b.metaKey = a.metaKey, b.shiftKey = a.shiftKey, b.De = a.De);
  return this.dispatchEvent(b)
};
w.bd = function() {
  ph(this, 32) && nh(this, 32, k) && this.Z(32, k)
};
w.nb = function() {
  ph(this, 4) && this.setActive(r);
  ph(this, 32) && nh(this, 32, r) && this.Z(32, r)
};
w.ea = function(a) {
  return this.r && this.isEnabled() && this.va(a) ? (a.preventDefault(), a.stopPropagation(), k) : r
};
w.va = function(a) {
  return 13 == a.keyCode && this.sb(a)
};
ma($) || e(Error("Invalid component class " + $));
ma(dh) || e(Error("Invalid renderer class " + dh));
var rh = pa($);
kh[rh] = dh;
ih("goog-control", function() {
  return new $(l)
});
function sh() {
}
D(sh, dh);
A(sh);
w = sh.prototype;
w.ka = t("button");
w.W = function(a, b, c) {
  16 == b ? Y(a, "pressed", c) : sh.b.W.call(this, a, b, c)
};
w.d = function(a) {
  var b = sh.b.d.call(this, a), c = a.pc();
  c && this.Ke(b, c);
  (c = a.ua()) && this.Zb(b, c);
  a.w & 16 && this.W(b, 16, !!(a.q & 16));
  return b
};
w.t = function(a, b) {
  var b = sh.b.t.call(this, a, b), c = this.ua(b);
  a.aa = c;
  a.Ne = this.pc(b);
  a.w & 16 && this.W(b, 16, !!(a.q & 16));
  return b
};
w.ua = ha;
w.Zb = ha;
w.pc = function(a) {
  return a.title
};
w.Ke = function(a, b) {
  a && (a.title = b || "")
};
w.k = t("goog-button");
function th() {
}
D(th, sh);
A(th);
w = th.prototype;
w.ka = aa();
w.d = function(a) {
  uh(a);
  return a.n().d("button", {"class":this.Nb(a).join(" "), disabled:!a.isEnabled(), title:a.pc() || "", value:a.ua() || ""}, a.Wc() || "")
};
w.ba = function(a) {
  return"BUTTON" == a.tagName || "INPUT" == a.tagName && ("button" == a.type || "submit" == a.type || "reset" == a.type)
};
w.t = function(a, b) {
  uh(a);
  b.disabled && S(b, this.nc(1));
  return th.b.t.call(this, a, b)
};
w.Sb = function(a) {
  a.la().c(a.a(), "click", a.sb)
};
w.Cc = ha;
w.Yb = ha;
w.Pa = function(a) {
  return a.isEnabled()
};
w.Ua = ha;
w.Z = function(a, b, c) {
  th.b.Z.call(this, a, b, c);
  if((a = a.a()) && 1 == b) {
    a.disabled = c
  }
};
w.ua = function(a) {
  return a.value
};
w.Zb = function(a, b) {
  a && (a.value = b)
};
w.W = ha;
function uh(a) {
  lh(a, r);
  a.Sd &= -256;
  oh(a, 32, r)
}
;function vh(a, b, c) {
  $.call(this, a, b || th.K(), c)
}
D(vh, $);
w = vh.prototype;
w.ua = s("aa");
w.Zb = function(a) {
  this.aa = a;
  this.h.Zb(this.a(), a)
};
w.pc = s("Ne");
w.Ke = function(a) {
  this.Ne = a;
  this.h.Ke(this.a(), a)
};
w.e = function() {
  vh.b.e.call(this);
  delete this.aa;
  delete this.Ne
};
w.j = function() {
  vh.b.j.call(this);
  if(this.w & 32) {
    var a = this.B();
    a && this.la().c(a, "keyup", this.va)
  }
};
w.va = function(a) {
  return 13 == a.keyCode && "key" == a.type || 32 == a.keyCode && "keyup" == a.type ? this.sb(a) : 32 == a.keyCode
};
ih("goog-button", function() {
  return new vh(l)
});
var wh, xh;
xh = wh = r;
var yh = Ra();
yh && (-1 != yh.indexOf("Firefox") || -1 != yh.indexOf("Camino") || (-1 != yh.indexOf("iPhone") || -1 != yh.indexOf("iPod") ? wh = k : -1 != yh.indexOf("iPad") && (xh = k)));
var zh = wh, Ah = xh;
function Bh() {
}
D(Bh, dh);
A(Bh);
Bh.prototype.d = function(a) {
  return a.n().d("div", this.k())
};
Bh.prototype.t = function(a, b) {
  b.id && $e(a, b.id);
  if("HR" == b.tagName) {
    var c = b, b = this.d(a);
    c.parentNode && c.parentNode.insertBefore(b, c);
    de(c)
  }else {
    S(b, this.k())
  }
  return b
};
Bh.prototype.k = t("goog-menuseparator");
function Ch(a, b) {
  $.call(this, l, a || Bh.K(), b);
  oh(this, 1, r);
  oh(this, 2, r);
  oh(this, 4, r);
  oh(this, 32, r);
  this.q = 1
}
D(Ch, $);
Ch.prototype.j = function() {
  Ch.b.j.call(this);
  If(this.a(), "separator")
};
ih("goog-menuseparator", function() {
  return new Ch
});
function Dh() {
}
A(Dh);
w = Dh.prototype;
w.ka = aa();
function Eh(a, b) {
  a && (a.tabIndex = b ? 0 : -1)
}
w.d = function(a) {
  return a.n().d("div", this.Nb(a).join(" "))
};
w.M = function(a) {
  return a
};
w.ba = function(a) {
  return"DIV" == a.tagName
};
w.t = function(a, b) {
  b.id && $e(a, b.id);
  var c = this.k(), d = r, g = Od(b);
  g && J(g, function(b) {
    b == c ? d = k : b && (b == c + "-disabled" ? a.Ta(r) : b == c + "-horizontal" ? a.Ie(Fh) : b == c + "-vertical" && a.Ie(Gh))
  }, this);
  d || S(b, c);
  Hh(this, a, this.M(b));
  return b
};
function Hh(a, b, c) {
  if(c) {
    for(var d = c.firstChild, g;d && d.parentNode == c;) {
      g = d.nextSibling;
      if(1 == d.nodeType) {
        var f = a.ee(d);
        f && (f.f = d, b.isEnabled() || f.Ta(r), b.Ma(f), f.t(d))
      }else {
        (!d.nodeValue || "" == ya(d.nodeValue)) && c.removeChild(d)
      }
      d = g
    }
  }
}
w.ee = function(a) {
  a: {
    for(var b = Od(a), c = 0, d = b.length;c < d;c++) {
      if(a = b[c] in jh ? jh[b[c]]() : l) {
        break a
      }
    }
    a = l
  }
  return a
};
w.Sb = function(a) {
  a = a.a();
  Le(a, k, F);
  E && (a.hideFocus = k);
  var b = this.ka();
  b && If(a, b)
};
w.B = function(a) {
  return a.a()
};
w.k = t("goog-container");
w.Nb = function(a) {
  var b = this.k(), c = [b, a.na == Fh ? b + "-horizontal" : b + "-vertical"];
  a.isEnabled() || c.push(b + "-disabled");
  return c
};
w.Bf = function() {
  return Gh
};
function Ih() {
}
D(Ih, Dh);
A(Ih);
w = Ih.prototype;
w.ka = t("menu");
w.ba = function(a) {
  return"UL" == a.tagName || Ih.b.ba.call(this, a)
};
w.ee = function(a) {
  return"HR" == a.tagName ? new Ch : Ih.b.ee.call(this, a)
};
w.hb = function(a, b) {
  return fe(a.a(), b)
};
w.k = t("goog-menu");
w.Sb = function(a) {
  Ih.b.Sb.call(this, a);
  a = a.a();
  Y(a, "haspopup", "true")
};
function Jh(a) {
  Ch.call(this, Bh.K(), a)
}
D(Jh, Ch);
ih("goog-menuseparator", function() {
  return new Ch
});
function Kh() {
  this.nf = []
}
D(Kh, dh);
A(Kh);
function Lh(a, b) {
  var c = a.nf[b];
  if(!c) {
    switch(b) {
      case 0:
        c = a.k() + "-highlight";
        break;
      case 1:
        c = a.k() + "-checkbox";
        break;
      case 2:
        c = a.k() + "-content"
    }
    a.nf[b] = c
  }
  return c
}
w = Kh.prototype;
w.ka = t("menuitem");
w.d = function(a) {
  var b = a.n().d("div", this.Nb(a).join(" "), Mh(this, a.Ca, a.n()));
  Nh(this, a, b, !!(a.w & 8) || !!(a.w & 16));
  return b
};
w.M = function(a) {
  return a && a.firstChild
};
w.t = function(a, b) {
  var c = ee(b), d = Lh(this, 2);
  c && K(Od(c), d) || b.appendChild(Mh(this, b.childNodes, a.n()));
  K(Od(b), "goog-option") && (a.zd(k), this.zd(a, b, k));
  return Kh.b.t.call(this, a, b)
};
function Mh(a, b, c) {
  a = Lh(a, 2);
  return c.d("div", a, b)
}
w.zd = function(a, b, c) {
  b && (If(b, c ? "menuitemcheckbox" : this.ka()), Nh(this, a, b, c))
};
function Nh(a, b, c, d) {
  var g;
  if(g = a.M(c)) {
    g = g.firstChild;
    var f = Lh(a, 1);
    g = !!g && K(Od(g), f)
  }else {
    g = r
  }
  d != g && (d ? S(c, "goog-option") : Pd(c, "goog-option"), c = a.M(c), d ? (a = Lh(a, 1), c.insertBefore(b.n().d("div", a), c.firstChild || l)) : c.removeChild(c.firstChild))
}
w.nc = function(a) {
  switch(a) {
    case 2:
      return Lh(this, 0);
    case 16:
    ;
    case 8:
      return"goog-option-selected";
    default:
      return Kh.b.nc.call(this, a)
  }
};
w.ge = function(a) {
  var b = Lh(this, 0);
  switch(a) {
    case "goog-option-selected":
      return 16;
    case b:
      return 2;
    default:
      return Kh.b.ge.call(this, a)
  }
};
w.k = t("goog-menuitem");
function Oh(a, b, c, d) {
  $.call(this, a, d || Kh.K(), c);
  this.Zb(b)
}
D(Oh, $);
w = Oh.prototype;
w.ua = function() {
  var a = this.ze;
  return a != l ? a : this.Wc()
};
w.Zb = ba("ze");
w.zd = function(a) {
  oh(this, 16, a);
  var b = this.a();
  b && this.h.zd(this, b, a)
};
w.Wc = function() {
  var a = this.Ca;
  return ja(a) ? (a = Bb(a, function(a) {
    var c = Od(a);
    return K(c, "goog-menuitem-accel") || K(c, "goog-menuitem-mnemonic-separator") ? "" : je(a)
  }).join(""), xa(a)) : Oh.b.Wc.call(this)
};
w.pb = function(a) {
  var b = this.getParent();
  if(b) {
    var c = b.$f;
    b.$f = l;
    if(b = c && la(a.clientX)) {
      b = new P(a.clientX, a.clientY), b = c == b ? k : !c || !b ? r : c.x == b.x && c.y == b.y
    }
    if(b) {
      return
    }
  }
  Oh.b.pb.call(this, a)
};
w.va = function(a) {
  return a.keyCode == this.Uf && this.sb(a) ? k : Oh.b.va.call(this, a)
};
w.lh = s("Uf");
ih("goog-menuitem", function() {
  return new Oh(l)
});
function Ph(a, b, c) {
  W.call(this, c);
  this.h = b || Dh.K();
  this.na = a || this.h.Bf()
}
D(Ph, W);
var Fh = "horizontal", Gh = "vertical";
w = Ph.prototype;
w.se = l;
w.N = l;
w.h = l;
w.na = l;
w.r = k;
w.ha = k;
w.ae = k;
w.L = -1;
w.C = l;
w.Ea = r;
w.Lg = r;
w.Zh = k;
w.Aa = l;
w.B = function() {
  return this.se || this.h.B(this)
};
w.Zc = function() {
  return this.N || (this.N = new jg(this.B()))
};
w.d = function() {
  this.f = this.h.d(this)
};
w.M = function() {
  return this.h.M(this.a())
};
w.ba = function(a) {
  return this.h.ba(a)
};
w.O = function(a) {
  this.f = this.h.t(this, a);
  "none" == a.style.display && (this.r = r)
};
w.j = function() {
  Ph.b.j.call(this);
  df(this, function(a) {
    a.l && Qh(this, a)
  }, this);
  var a = this.a();
  this.h.Sb(this);
  this.qa(this.r, k);
  this.la().c(this, "enter", this.ie).c(this, "highlight", this.je).c(this, "unhighlight", this.oe).c(this, "open", this.Bh).c(this, "close", this.oh).c(a, "mousedown", this.ob).c(V(a), "mouseup", this.qh).c(a, ["mousedown", "mouseup", "mouseover", "mouseout", "contextmenu"], this.nh);
  this.Pa() && Rh(this, k)
};
function Rh(a, b) {
  var c = a.la(), d = a.B();
  b ? c.c(d, "focus", a.bd).c(d, "blur", a.nb).c(a.Zc(), "key", a.ea) : c.V(d, "focus", a.bd).V(d, "blur", a.nb).V(a.Zc(), "key", a.ea)
}
w.P = function() {
  Sh(this, -1);
  this.C && this.C.D(r);
  this.Ea = r;
  Ph.b.P.call(this)
};
w.e = function() {
  Ph.b.e.call(this);
  this.N && (this.N.R(), this.N = l);
  this.h = this.C = this.Aa = this.se = l
};
w.ie = t(k);
w.je = function(a) {
  var b = hf(this, a.target);
  if(-1 < b && b != this.L) {
    var c = X(this, this.L);
    c && c.pa(r);
    this.L = b;
    c = X(this, this.L);
    this.Ea && c.setActive(k);
    this.Zh && this.C && c != this.C && (c.w & 64 ? c.D(k) : this.C.D(r))
  }
  Y(this.a(), "activedescendant", a.target.a().id)
};
w.oe = function(a) {
  a.target == X(this, this.L) && (this.L = -1);
  Y(this.a(), "activedescendant", "")
};
w.Bh = function(a) {
  if((a = a.target) && a != this.C && a.getParent() == this) {
    this.C && this.C.D(r), this.C = a
  }
};
w.oh = function(a) {
  a.target == this.C && (this.C = l)
};
w.ob = function(a) {
  this.ha && (this.Ea = k);
  var b = this.B();
  b && ie(b) ? b.focus() : a.preventDefault()
};
w.qh = function() {
  this.Ea = r
};
w.nh = function(a) {
  var b;
  a: {
    b = a.target;
    if(this.Aa) {
      for(var c = this.a();b && b !== c;) {
        var d = b.id;
        if(d in this.Aa) {
          b = this.Aa[d];
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
        b.ob(a);
        break;
      case "mouseup":
        b.pb(a);
        break;
      case "mouseover":
        b.ne(a);
        break;
      case "mouseout":
        b.me(a);
        break;
      case "contextmenu":
        b.rc(a)
    }
  }
};
w.bd = aa();
w.nb = function() {
  Sh(this, -1);
  this.Ea = r;
  this.C && this.C.D(r)
};
w.ea = function(a) {
  return this.isEnabled() && this.r && (0 != ef(this) || this.se) && this.va(a) ? (a.preventDefault(), a.stopPropagation(), k) : r
};
w.va = function(a) {
  var b = X(this, this.L);
  if(b && "function" == typeof b.ea && b.ea(a) || this.C && this.C != b && "function" == typeof this.C.ea && this.C.ea(a)) {
    return k
  }
  if(a.shiftKey || a.ctrlKey || a.metaKey || a.altKey) {
    return r
  }
  switch(a.keyCode) {
    case 27:
      if(this.Pa()) {
        this.B().blur()
      }else {
        return r
      }
      break;
    case 36:
      Th(this);
      break;
    case 35:
      Uh(this);
      break;
    case 38:
      if(this.na == Gh) {
        Vh(this)
      }else {
        return r
      }
      break;
    case 37:
      if(this.na == Fh) {
        ff(this) ? Wh(this) : Vh(this)
      }else {
        return r
      }
      break;
    case 40:
      if(this.na == Gh) {
        Wh(this)
      }else {
        return r
      }
      break;
    case 39:
      if(this.na == Fh) {
        ff(this) ? Vh(this) : Wh(this)
      }else {
        return r
      }
      break;
    default:
      return r
  }
  return k
};
function Qh(a, b) {
  var c = b.a(), c = c.id || (c.id = Ze(b));
  a.Aa || (a.Aa = {});
  a.Aa[c] = b
}
w.Ma = function(a, b) {
  Ph.b.Ma.call(this, a, b)
};
w.Fb = function(a, b, c) {
  a.Ga |= 2;
  a.Ga |= 64;
  (this.Pa() || !this.Lg) && oh(a, 32, r);
  lh(a, r);
  Ph.b.Fb.call(this, a, b, c);
  a.l && this.l && Qh(this, a);
  b <= this.L && this.L++
};
w.removeChild = function(a, b) {
  if(a = B(a) ? bf(this, a) : a) {
    var c = hf(this, a);
    -1 != c && (c == this.L ? a.pa(r) : c < this.L && this.L--);
    var d = a.a();
    d && d.id && this.Aa && (c = this.Aa, d = d.id, d in c && delete c[d])
  }
  a = Ph.b.removeChild.call(this, a, b);
  lh(a, k);
  return a
};
w.Ie = function(a) {
  this.a() && e(Error("Component already rendered"));
  this.na = a
};
w.qa = function(a, b) {
  if(b || this.r != a && this.dispatchEvent(a ? "show" : "hide")) {
    this.r = a;
    var c = this.a();
    c && (Je(c, a), this.Pa() && Eh(this.B(), this.ha && this.r), b || this.dispatchEvent(this.r ? "aftershow" : "afterhide"));
    return k
  }
  return r
};
w.isEnabled = s("ha");
w.Ta = function(a) {
  if(this.ha != a && this.dispatchEvent(a ? "enable" : "disable")) {
    a ? (this.ha = k, df(this, function(a) {
      a.ng ? delete a.ng : a.Ta(k)
    })) : (df(this, function(a) {
      a.isEnabled() ? a.Ta(r) : a.ng = k
    }), this.Ea = this.ha = r), this.Pa() && Eh(this.B(), a && this.r)
  }
};
w.Pa = s("ae");
w.Ua = function(a) {
  a != this.ae && this.l && Rh(this, a);
  this.ae = a;
  this.ha && this.r && Eh(this.B(), a)
};
function Sh(a, b) {
  var c = X(a, b);
  c ? c.pa(k) : -1 < a.L && X(a, a.L).pa(r)
}
w.pa = function(a) {
  Sh(this, hf(this, a))
};
function Th(a) {
  Xh(a, function(a, c) {
    return(a + 1) % c
  }, ef(a) - 1)
}
function Uh(a) {
  Xh(a, function(a, c) {
    a--;
    return 0 > a ? c - 1 : a
  }, 0)
}
function Wh(a) {
  Xh(a, function(a, c) {
    return(a + 1) % c
  }, a.L)
}
function Vh(a) {
  Xh(a, function(a, c) {
    a--;
    return 0 > a ? c - 1 : a
  }, a.L)
}
function Xh(a, b, c) {
  for(var c = 0 > c ? hf(a, a.C) : c, d = ef(a), c = b.call(a, c, d), g = 0;g <= d;) {
    var f = X(a, c);
    if(f && a.kf(f)) {
      Sh(a, c);
      break
    }
    g++;
    c = b.call(a, c, d)
  }
}
w.kf = function(a) {
  return a.r && a.isEnabled() && !!(a.w & 2)
};
function Yh() {
}
D(Yh, dh);
A(Yh);
Yh.prototype.k = t("goog-menuheader");
function Zh(a, b, c) {
  $.call(this, a, c || Yh.K(), b);
  oh(this, 1, r);
  oh(this, 2, r);
  oh(this, 4, r);
  oh(this, 32, r);
  this.q = 1
}
D(Zh, $);
ih("goog-menuheader", function() {
  return new Zh(l)
});
function $h(a, b) {
  Ph.call(this, Gh, b || Ih.K(), a);
  this.Ua(r)
}
D($h, Ph);
w = $h.prototype;
w.Rd = k;
w.Mg = r;
w.k = function() {
  return this.h.k()
};
w.hb = function(a) {
  if(this.h.hb(this, a)) {
    return k
  }
  for(var b = 0, c = ef(this);b < c;b++) {
    var d = X(this, b);
    if("function" == typeof d.hb && d.hb(a)) {
      return k
    }
  }
  return r
};
w.ef = function(a) {
  this.Ma(a, k)
};
w.qa = function(a, b, c) {
  (b = $h.b.qa.call(this, a, b)) && a && this.l && this.Rd && this.B().focus();
  this.$f = a && c && la(c.clientX) ? new P(c.clientX, c.clientY) : l;
  return b
};
w.ie = function(a) {
  this.Rd && this.B().focus();
  return $h.b.ie.call(this, a)
};
w.kf = function(a) {
  return(this.Mg || a.isEnabled()) && a.r && !!(a.w & 2)
};
w.O = function(a) {
  var b = this.h, c;
  c = this.n();
  c = Wd(c.o, "div", b.k() + "-content", a);
  for(var d = c.length, g = 0;g < d;g++) {
    Hh(b, this, c[g])
  }
  $h.b.O.call(this, a)
};
w.va = function(a) {
  var b = $h.b.va.call(this, a);
  b || df(this, function(c) {
    !b && c.lh && c.Uf == a.keyCode && (this.isEnabled() && this.pa(c), b = c.ea(a))
  }, this);
  return b
};
function ai() {
}
D(ai, sh);
A(ai);
w = ai.prototype;
w.d = function(a) {
  var b = {"class":"goog-inline-block " + this.Nb(a).join(" "), title:a.pc() || ""}, b = a.n().d("div", b, this.Rc(a.Ca, a.n()));
  this.yd(a, b);
  return b
};
w.ka = t("button");
w.yd = function(a, b) {
  a.isEnabled() || this.W(b, 1, k);
  a.fd() && this.W(b, 8, k);
  a.w & 16 && this.W(b, 16, k);
  a.q & 64 && this.W(b, 64, k)
};
w.M = function(a) {
  return a && a.firstChild.firstChild
};
w.Rc = function(a, b) {
  return b.d("div", "goog-inline-block " + (this.k() + "-outer-box"), b.d("div", "goog-inline-block " + (this.k() + "-inner-box"), a))
};
w.ba = function(a) {
  return"DIV" == a.tagName
};
w.t = function(a, b) {
  bi(b, k);
  bi(b, r);
  var c;
  a: {
    c = a.n().Df(b);
    var d = this.k() + "-outer-box";
    if(c && K(Od(c), d) && (c = a.n().Df(c), d = this.k() + "-inner-box", c && K(Od(c), d))) {
      c = k;
      break a
    }
    c = r
  }
  c || b.appendChild(this.Rc(b.childNodes, a.n()));
  S(b, "goog-inline-block", this.k());
  return ai.b.t.call(this, a, b)
};
w.k = t("goog-custom-button");
function bi(a, b) {
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
;function ci() {
}
D(ci, ai);
A(ci);
w = ci.prototype;
w.M = function(a) {
  a = ci.b.M.call(this, a && a.firstChild);
  F && a && a.__goog_wrapper_div && (a = a.firstChild);
  return a
};
w.t = function(a, b) {
  var c = Wd(document, "*", "goog-menu", b)[0];
  if(c) {
    Je(c, r);
    V(c).body.appendChild(c);
    var d = new $h;
    d.t(c);
    di(a, d)
  }
  return ci.b.t.call(this, a, b)
};
w.Rc = function(a, b) {
  return ci.b.Rc.call(this, [this.createCaption(a, b), b.d("div", "goog-inline-block " + (this.k() + "-dropdown"), "\u00a0")], b)
};
w.createCaption = function(a, b) {
  return b.d("div", "goog-inline-block " + (this.k() + "-caption"), a)
};
w.k = t("goog-menu-button");
function ei(a, b, c, d) {
  vh.call(this, a, c || ci.K(), d);
  oh(this, 64, k);
  this.pd = new ch(l, 5);
  b && di(this, b);
  this.Ih = l;
  this.U = new Cc(500);
  if((zh || Ah) && !H("533.17.9")) {
    this.ed = k
  }
}
D(ei, vh);
w = ei.prototype;
w.ed = r;
w.ci = r;
w.j = function() {
  ei.b.j.call(this);
  this.g && fi(this, this.g, k);
  Y(this.a(), "haspopup", "true")
};
w.P = function() {
  ei.b.P.call(this);
  if(this.g) {
    this.D(r);
    this.g.P();
    fi(this, this.g, r);
    var a = this.g.a();
    a && de(a)
  }
};
w.e = function() {
  ei.b.e.call(this);
  this.g && (this.g.R(), delete this.g);
  delete this.bi;
  this.U.R()
};
w.ob = function(a) {
  ei.b.ob.call(this, a);
  this.wc() && (this.D(!(this.q & 64), a), this.g && (this.g.Ea = !!(this.q & 64)))
};
w.pb = function(a) {
  ei.b.pb.call(this, a);
  this.g && !this.wc() && (this.g.Ea = r)
};
w.sb = function() {
  this.setActive(r);
  return k
};
w.ph = function(a) {
  this.g && this.g.r && !this.hb(a.target) && this.D(r)
};
w.hb = function(a) {
  return a && fe(this.a(), a) || this.g && this.g.hb(a) || r
};
w.va = function(a) {
  if(32 == a.keyCode) {
    if(a.preventDefault(), "keyup" != a.type) {
      return k
    }
  }else {
    if("key" != a.type) {
      return r
    }
  }
  if(this.g && this.g.r) {
    var b = this.g.ea(a);
    return 27 == a.keyCode ? (this.D(r), k) : b
  }
  return 40 == a.keyCode || 38 == a.keyCode || 32 == a.keyCode ? (this.D(k), k) : r
};
w.yh = function() {
  this.D(r)
};
w.zh = function() {
  this.wc() || this.D(r)
};
w.nb = function(a) {
  this.ed || this.D(r);
  ei.b.nb.call(this, a)
};
function di(a, b) {
  var c = a.g;
  b != c && (c && (a.D(r), a.l && fi(a, c, r), delete a.g), b && (a.g = b, af(b, a), b.qa(r), c = a.ed, (b.Rd = c) && b.Ua(k), a.l && fi(a, b, k)))
}
w.ef = function(a) {
  this.g || di(this, new $h(this.n()));
  (this.g || l).Ma(a, k)
};
w.qa = function(a, b) {
  var c = ei.b.qa.call(this, a, b);
  c && !this.r && this.D(r);
  return c
};
w.Ta = function(a) {
  ei.b.Ta.call(this, a);
  this.isEnabled() || this.D(r)
};
w.D = function(a, b) {
  ei.b.D.call(this, a);
  if(this.g && !!(this.q & 64) == a) {
    if(a) {
      if(!this.g.l) {
        if(this.ci) {
          var c = this.a().parentNode;
          cf(this.g, c)
        }else {
          cf(this.g, h)
        }
      }
      this.Bb = Ae(this.a());
      this.gb = Ie(this.a());
      gi(this);
      Sh(this.g, -1)
    }else {
      if(this.setActive(r), this.g.Ea = r, this.a() && Y(this.a(), "activedescendant", ""), this.sd != l && (this.sd = h, c = this.g.a())) {
        var d = "", g;
        d instanceof Q ? (g = d.height, d = d.width) : g = "";
        c.style.width = ve(d, k);
        c.style.height = ve(g, k)
      }
    }
    this.g.qa(a, r, b);
    this.G || (c = this.la(), d = a ? c.c : c.V, d.call(c, me(this.n()), "mousedown", this.ph, k), this.ed && d.call(c, this.g, "blur", this.zh), d.call(c, this.U, Ec, this.Xh), a ? this.U.start() : this.U.stop())
  }
};
function gi(a) {
  if(a.g.l) {
    var b = a.pd;
    a.pd.element = a.bi || a.a();
    var c = a.g.a();
    a.g.r || (c.style.visibility = "hidden", Je(c, k));
    !a.sd && a.pd.jh && a.pd.kd & 32 && (a.sd = Ge(c));
    b.Ee(c, b.Qc ^ 1, a.Ih, a.sd);
    a.g.r || (Je(c, r), c.style.visibility = "visible")
  }
}
w.Xh = function() {
  var a = Ie(this.a()), b = Ae(this.a());
  if(!(this.gb == a || (!this.gb || !a ? 0 : this.gb.left == a.left && this.gb.width == a.width && this.gb.top == a.top && this.gb.height == a.height)) || !(this.Bb == b || (!this.Bb || !b ? 0 : this.Bb.top == b.top && this.Bb.right == b.right && this.Bb.bottom == b.bottom && this.Bb.left == b.left))) {
    this.gb = a, this.Bb = b, gi(this)
  }
};
function fi(a, b, c) {
  var d = a.la(), c = c ? d.c : d.V;
  c.call(d, b, "action", a.yh);
  c.call(d, b, "highlight", a.je);
  c.call(d, b, "unhighlight", a.oe)
}
w.je = function(a) {
  Y(this.a(), "activedescendant", a.target.a().id)
};
w.oe = function() {
  X(this.g, this.g.L) || Y(this.a(), "activedescendant", "")
};
ih("goog-menu-button", function() {
  return new ei(l)
});
function hi() {
}
D(hi, Dh);
A(hi);
hi.prototype.ka = t("menubar");
hi.prototype.k = t("goog-menubar");
hi.prototype.Bf = function() {
  return Fh
};
function ii(a) {
  var b = new Ph(l, hi.K(), h), c = new M, d = ob(Xe);
  J(a, function(a) {
    var f = new $h;
    a.label || e(new Exeption("menu info does not have label"));
    a.Me || e(new Exeption("menu info does not have submenu"));
    J(a.Me, function(a) {
      a.s || e(new Exeption("submenu info does not have callback"));
      var b;
      a.label ? (b = new Oh(a.label), $e(b, a.label)) : b = new Jh;
      b.Ga |= 255;
      c.c(b, d, function(b) {
        "action" == b.type && a.s()
      });
      f.ef(b)
    });
    a = new ei(a.label, f);
    a.Ga |= 255;
    b.Ma(a, k)
  });
  return b
}
;/*
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
var ji = function() {
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
    Qb = c.contentType && "application/xml" == c.contentType || Xa && (c.doctype || "[object XMLDocument]" == f.toString()) || !!f && (E ? f.xml : c.xmlVersion || f.xmlVersion);
    return(f = d(a)(c)) && f.qd ? f : b(f)
  }
  function b(a) {
    if(a && a.qd) {
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
    Wa++;
    if(E && Qb) {
      var c = Wa + "";
      a[0].setAttribute("_zipIdx", c);
      for(var d = 1, f;f = a[d];d++) {
        a[d].getAttribute("_zipIdx") != c && b.push(f), f.setAttribute("_zipIdx", c)
      }
    }else {
      if(E && a.Ng) {
        try {
          for(d = 1;f = a[d];d++) {
            Sa(f) && b.push(f)
          }
        }catch(g) {
        }
      }else {
        a[0] && (a[0]._zipIdx = Wa);
        for(d = 1;f = a[d];d++) {
          a[d]._zipIdx != Wa && b.push(f), f._zipIdx = Wa
        }
      }
    }
    return b
  }
  function c(a, b) {
    if(!b) {
      return 1
    }
    var c = qi(a);
    return!b[c] ? b[c] = 1 : 0
  }
  function d(a, b) {
    if(Vg) {
      var c = Wg[a];
      if(c && !b) {
        return c
      }
    }
    if(c = Xg[a]) {
      return c
    }
    var c = a.charAt(0), f = -1 == a.indexOf(" ");
    0 <= a.indexOf("#") && f && (b = k);
    if(Vg && !b && -1 == ">~+".indexOf(c) && (!E || -1 == a.indexOf(":")) && !(Yg && 0 <= a.indexOf(".")) && -1 == a.indexOf(":contains") && -1 == a.indexOf("|=")) {
      var j = 0 <= ">~+".indexOf(a.charAt(a.length - 1)) ? a + " *" : a;
      return Wg[a] = function(b) {
        try {
          9 == b.nodeType || f || e("");
          var c = b.querySelectorAll(j);
          E ? c.Ng = k : c.qd = k;
          return c
        }catch(g) {
          return d(a, k)(b)
        }
      }
    }
    var m = a.split(/\s*,\s*/);
    return Xg[a] = 2 > m.length ? g(a) : function(a) {
      for(var b = 0, c = [], d;d = m[b++];) {
        c = c.concat(g(d)(a))
      }
      return c
    }
  }
  function g(a) {
    var b = u(ya(a));
    if(1 == b.length) {
      var c = f(b[0]);
      return function(a) {
        if(a = c(a, [])) {
          a.qd = k
        }
        return a
      }
    }
    return function(a) {
      for(var a = yc(a), c, d, g = b.length, j, Pb, m = 0;m < g;m++) {
        Pb = [];
        c = b[m];
        d = a.length - 1;
        0 < d && (j = {}, Pb.qd = k);
        d = f(c);
        for(var Ug = 0;c = a[Ug];Ug++) {
          d(c, Pb, j)
        }
        if(!Pb.length) {
          break
        }
        a = Pb
      }
      return Pb
    }
  }
  function f(a) {
    var b = Zg[a.Wb];
    if(b) {
      return b
    }
    var c = a.Lf, c = c ? c.rd : "", d = p(a, {Jb:1}), f = "*" == a.T, g = document.getElementsByClassName;
    if(c) {
      g = {Jb:1}, f && (g.T = 1), d = p(a, g), "+" == c ? b = n(d) : "~" == c ? b = m(d) : ">" == c && (b = j(d))
    }else {
      if(a.id) {
        d = !a.Sf && f ? Sg : p(a, {Jb:1, id:1}), b = function(b, c) {
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
            return yc(f, c)
          }
        }
      }else {
        if(g && /\{\s*\[native code\]\s*\}/.test("" + g) && a.Ba.length && !Yg) {
          var d = p(a, {Jb:1, Ba:1, id:1}), o = a.Ba.join(" "), b = function(a, b) {
            for(var c = yc(0, b), f, g = 0, j = a.getElementsByClassName(o);f = j[g++];) {
              d(f, a) && c.push(f)
            }
            return c
          }
        }else {
          !f && !a.Sf ? b = function(b, c) {
            for(var d = yc(0, c), f, g = 0, j = b.getElementsByTagName(a.he());f = j[g++];) {
              d.push(f)
            }
            return d
          } : (d = p(a, {Jb:1, T:1, id:1}), b = function(b, c) {
            for(var f = yc(0, c), g, j = 0, m = b.getElementsByTagName(a.he());g = m[j++];) {
              d(g, b) && f.push(g)
            }
            return f
          })
        }
      }
    }
    return Zg[a.Wb] = b
  }
  function j(a) {
    a = a || Sg;
    return function(b, d, f) {
      for(var g = 0, j = b[$g];b = j[g++];) {
        zc(b) && (!f || c(b, f)) && a(b, g) && d.push(b)
      }
      return d
    }
  }
  function m(a) {
    return function(b, d, f) {
      for(b = b[Ac];b;) {
        if(zc(b)) {
          if(f && !c(b, f)) {
            break
          }
          a(b) && d.push(b)
        }
        b = b[Ac]
      }
      return d
    }
  }
  function n(a) {
    return function(b, d, f) {
      for(;b = b[Ac];) {
        if(!sd || Sa(b)) {
          (!f || c(b, f)) && a(b) && d.push(b);
          break
        }
      }
      return d
    }
  }
  function p(a, b) {
    if(!a) {
      return Sg
    }
    var b = b || {}, c = l;
    b.Jb || (c = Ia(c, Sa));
    b.T || "*" != a.T && (c = Ia(c, function(b) {
      return b && b.tagName == a.he()
    }));
    b.Ba || J(a.Ba, function(a, b) {
      var d = RegExp("(?:^|\\s)" + a + "(?:\\s|$)");
      c = Ia(c, function(a) {
        return d.test(a.className)
      });
      c.count = b
    });
    b.vb || J(a.vb, function(a) {
      var b = a.name;
      Ee[b] && (c = Ia(c, Ee[b](b, a.value)))
    });
    b.Oc || J(a.Oc, function(a) {
      var b, d = a.ic;
      a.type && ah[a.type] ? b = ah[a.type](d, a.xe) : d.length && (b = ri(d));
      b && (c = Ia(c, b))
    });
    b.id || a.id && (c = Ia(c, function(b) {
      return!!b && b.id == a.id
    }));
    c || "default" in b || (c = Sg);
    return c
  }
  function o(a) {
    return v(a) % 2
  }
  function q(a) {
    return!(v(a) % 2)
  }
  function v(a) {
    var b = a.parentNode, c = 0, d = b[$g], f = a._i || -1, g = b._l || -1;
    if(!d) {
      return-1
    }
    d = d.length;
    if(g == d && 0 <= f && 0 <= g) {
      return f
    }
    b._l = d;
    f = -1;
    for(b = b.firstElementChild || b.firstChild;b;b = b[Ac]) {
      zc(b) && (b._i = ++c, a === b && (f = c))
    }
    return f
  }
  function x(a) {
    for(;a = a[Ac];) {
      if(zc(a)) {
        return r
      }
    }
    return k
  }
  function oa(a) {
    for(;a = a[si];) {
      if(zc(a)) {
        return r
      }
    }
    return k
  }
  function T(a, b) {
    return!a ? "" : "class" == b ? a.className || "" : "for" == b ? a.htmlFor || "" : "style" == b ? a.style.cssText || "" : (Qb ? a.getAttribute(b) : a.getAttribute(b, 2)) || ""
  }
  function Sa(a) {
    return 1 == a.nodeType
  }
  function Ia(a, b) {
    return!a ? b : !b ? a : function() {
      return a.apply(window, arguments) && b.apply(window, arguments)
    }
  }
  function u(a) {
    function b() {
      0 <= o && (z.id = c(o, v).replace(/\\/g, ""), o = -1);
      if(0 <= p) {
        var a = p == v ? l : c(p, v);
        0 > ">~+".indexOf(a) ? z.T = a : z.rd = a;
        p = -1
      }
      0 <= n && (z.Ba.push(c(n + 1, v).replace(/\\/g, "")), n = -1)
    }
    function c(b, d) {
      return ya(a.slice(b, d))
    }
    for(var a = 0 <= ">~+".indexOf(a.slice(-1)) ? a + " * " : a + " ", d = [], f = -1, g = -1, j = -1, m = -1, n = -1, o = -1, p = -1, q = "", u = "", x, v = 0, T = a.length, z = l, ga = l;q = u, u = a.charAt(v), v < T;v++) {
      if("\\" != q) {
        if(z || (x = v, z = {Wb:l, vb:[], Oc:[], Ba:[], T:l, rd:l, id:l, he:function() {
          return Qb ? this.$h : this.T
        }}, p = v), 0 <= f) {
          if("]" == u) {
            ga.ic ? ga.xe = c(j || f + 1, v) : ga.ic = c(f + 1, v);
            if((f = ga.xe) && ('"' == f.charAt(0) || "'" == f.charAt(0))) {
              ga.xe = f.slice(1, -1)
            }
            z.Oc.push(ga);
            ga = l;
            f = j = -1
          }else {
            "=" == u && (j = 0 <= "|~^$*".indexOf(q) ? q : "", ga.type = j + u, ga.ic = c(f + 1, v - j.length), j = v + 1)
          }
        }else {
          0 <= g ? ")" == u && (0 <= m && (ga.value = c(g + 1, v)), m = g = -1) : "#" == u ? (b(), o = v + 1) : "." == u ? (b(), n = v) : ":" == u ? (b(), m = v) : "[" == u ? (b(), f = v, ga = {}) : "(" == u ? (0 <= m && (ga = {name:c(m + 1, v), value:l}, z.vb.push(ga)), g = v) : " " == u && q != u && (b(), 0 <= m && z.vb.push({name:c(m + 1, v)}), z.Sf = z.vb.length || z.Oc.length || z.Ba.length, z.Ki = z.Wb = c(x, v), z.$h = z.T = z.rd ? l : z.T || "*", z.T && (z.T = z.T.toUpperCase()), d.length && 
          d[d.length - 1].rd && (z.Lf = d.pop(), z.Wb = z.Lf.Wb + " " + z.Wb), d.push(z), z = l)
        }
      }
    }
    return d
  }
  function yc(a, b) {
    var c = b || [];
    a && c.push(a);
    return c
  }
  var Yg = G && "BackCompat" == document.compatMode, $g = document.firstChild.children ? "children" : "childNodes", Qb = r, ah = {"*=":function(a, b) {
    return function(c) {
      return 0 <= T(c, a).indexOf(b)
    }
  }, "^=":function(a, b) {
    return function(c) {
      return 0 == T(c, a).indexOf(b)
    }
  }, "$=":function(a, b) {
    return function(c) {
      c = " " + T(c, a);
      return c.lastIndexOf(b) == c.length - b.length
    }
  }, "~=":function(a, b) {
    var c = " " + b + " ";
    return function(b) {
      return 0 <= (" " + T(b, a) + " ").indexOf(c)
    }
  }, "|=":function(a, b) {
    b = " " + b;
    return function(c) {
      c = " " + T(c, a);
      return c == b || 0 == c.indexOf(b + "-")
    }
  }, "=":function(a, b) {
    return function(c) {
      return T(c, a) == b
    }
  }}, sd = "undefined" == typeof document.firstChild.nextElementSibling, Ac = !sd ? "nextElementSibling" : "nextSibling", si = !sd ? "previousElementSibling" : "previousSibling", zc = sd ? Sa : Sg, Ee = {checked:function() {
    return function(a) {
      return a.checked || a.attributes.checked
    }
  }, "first-child":function() {
    return oa
  }, "last-child":function() {
    return x
  }, "only-child":function() {
    return function(a) {
      return!oa(a) || !x(a) ? r : k
    }
  }, empty:function() {
    return function(a) {
      for(var b = a.childNodes, a = a.childNodes.length - 1;0 <= a;a--) {
        var c = b[a].nodeType;
        if(1 === c || 3 == c) {
          return r
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
    var c = u(b)[0], d = {Jb:1};
    "*" != c.T && (d.T = 1);
    c.Ba.length || (d.Ba = 1);
    var f = p(c, d);
    return function(a) {
      return!f(a)
    }
  }, "nth-child":function(a, b) {
    if("odd" == b) {
      return o
    }
    if("even" == b) {
      return q
    }
    if(-1 != b.indexOf("n")) {
      var c = b.split("n", 2), d = c[0] ? "-" == c[0] ? -1 : parseInt(c[0], 10) : 1, f = c[1] ? parseInt(c[1], 10) : 0, g = 0, j = -1;
      0 < d ? 0 > f ? f = f % d && d + f % d : 0 < f && (f >= d && (g = f - f % d), f %= d) : 0 > d && (d *= -1, 0 < f && (j = f, f %= d));
      if(0 < d) {
        return function(a) {
          a = v(a);
          return a >= g && (0 > j || a <= j) && a % d == f
        }
      }
      b = f
    }
    var m = parseInt(b, 10);
    return function(a) {
      return v(a) == m
    }
  }}, ri = E ? function(a) {
    var b = a.toLowerCase();
    "class" == b && (a = "className");
    return function(c) {
      return Qb ? c.getAttribute(a) : c[a] || c[b]
    }
  } : function(a) {
    return function(b) {
      return b && b.getAttribute && b.hasAttribute(a)
    }
  }, Zg = {}, Xg = {}, Wg = {}, Vg = !!document.querySelectorAll && (!G || H("526")), Wa = 0, qi = E ? function(a) {
    return Qb ? a.getAttribute("_uid") || a.setAttribute("_uid", ++Wa) || Wa : a.uniqueID
  } : function(a) {
    return a._uid || (a._uid = ++Wa)
  };
  a.vb = Ee;
  return a
}();
da("goog.dom.query", ji);
da("goog.dom.query.pseudos", ji.vb);
function ki(a, b, c) {
  this.eb = [];
  this.fc = {};
  this.We = {};
  this.dc = {};
  this.Ed = l;
  this.Eb = this.Se = 0;
  this.ug = a;
  this.p = new M;
  W.call(this, c)
}
D(ki, W);
w = ki.prototype;
w.d = function() {
  this.f = ce(document, this.ug)
};
w.ce = function() {
  return this.Ed ? this.Ed.window : l
};
function li(a) {
  a = ji(".windowsection-header", a.a());
  1 != a.length && e(Error("fatal error"));
  return a[0]
}
function mi(a) {
  a = ji(".windowsection-body", a.a());
  1 != a.length && e(Error("fatal error"));
  return a[0]
}
w.j = function() {
  ki.b.j.call(this);
  this.Fa()
};
w.Mc = function(a, b) {
  this.eb.push({window:a, Li:b, index:this.Eb});
  var c = ce(document, "<div class='windowIndex" + this.Eb + " windowsection-body-inner-wrapper'></div>"), d = ce(document, "<div class='windowsection-header-label-inner-wrapper'><div class='windowsection-header-label left'></div><div class='windowsection-header-label center'><span class='windowsection-header-label-text'>" + a.vg + "</span></div><div class='windowsection-header-label right'></div></div>");
  ni(this, a, d, c);
  mi(this).appendChild(c);
  li(this).appendChild(d);
  this.dc[this.Eb] = c;
  this.fc[this.Eb] = d;
  this.We[this.Eb] = ji(".windowsection-header-label-text", d)[0];
  a.t(c);
  this.Fa();
  this.Eb++;
  oi(this, a)
};
w.Nh = function(a) {
  pi(this, a.target.ii, a.target.filename)
};
function pi(a, b, c) {
  var d = 0;
  J(a.eb, function(a) {
    if(a.window == b) {
      var f = this.We[a.index];
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
function oi(a, b) {
  var c = Eb(a.eb, function(a) {
    return a.window == b
  });
  c || e(Error("window section doesn't have the window object to activate."));
  J(a.eb, function(a) {
    b == a.window ? (S(this.fc[a.index], "active"), J(ji(".windowsection-header-label", this.fc[a.index]), function(a) {
      pe(a, {"z-index":this.Se});
      S(a, "active")
    }), S(this.dc[a.index], "active"), Je(this.dc[a.index], k)) : (Pd(this.fc[a.index], "active"), J(ji(".windowsection-header-label", this.fc[a.index]), function(a) {
      Pd(a, "active")
    }), Pd(this.dc[a.index], "active"), Je(this.dc[a.index], r))
  }, a);
  a.Se++;
  a.Ed = c
}
function ni(a, b, c, d) {
  a.p.c(c, "click", function() {
    oi(this, b)
  }, r, a);
  a.p.c(d, "click", function() {
    oi(this, b)
  }, r, a);
  a.p.c(b, "change_label", a.Nh, r, a)
}
w.remove = function(a) {
  _.fh(_.filter(this.eb, function(b) {
    return b.window == a
  }), function(a) {
    _.fh(ji(".windowIndex" + a.index, this.a()), function(a) {
      de(a)
    }, this)
  }, this);
  this.eb = _.filter(this.eb, function(b) {
    return b.window != a
  })
};
w.Fa = function() {
  var a = Me(li(this));
  mi(this);
  var b = Me(le(this.a(), t(k)));
  Ne(mi(this), new Q(b.width, b.height - a.height))
};
function ti(a) {
  this.Ig = "<div class='windowsection'><div class='windowsection-header'></div><div class='windowsection-body_wrapper'><div class='windowsection-body'></div></div></div>";
  this.cf = [];
  this.Ya = l;
  W.call(this, a)
}
D(ti, W);
w = ti.prototype;
w.O = function(a) {
  ti.b.O.call(this, a);
  var b = $d("div", {"class":"windowholder"});
  a.appendChild(b)
};
w.d = function() {
  this.f = $d("div", "windowholder")
};
w.e = function() {
  ti.b.e.call(this)
};
w.Mc = function(a) {
  if(this.Ya == l) {
    this.Ya = new ki(this.Ig);
    var b = this.a();
    cf(this.Ya, b);
    this.cf.push(this.Ya)
  }
  this.Ya.Mc(a)
};
w.ce = function() {
  if(this.Ya) {
    var a = this.Ya.ce();
    if(a) {
      return a
    }
  }
  return l
};
w.Fa = function(a) {
  J(this.cf, function(b) {
    b.Fa(a)
  })
};
function Kg(a) {
  this.G = r;
  this.Cb = a || window;
  this.md = Xb(this.Cb, "resize", this.Ch, r, this);
  this.$b = Zd(this.Cb || window);
  if(G && Qa || Xa && this.Cb.self != this.Cb.top) {
    this.Bd = window.setInterval(C(this.mf, this), ui)
  }
}
D(Kg, gc);
var ui = 500;
w = Kg.prototype;
w.md = l;
w.Cb = l;
w.$b = l;
w.Bd = l;
w.Ef = function() {
  return this.$b ? this.$b.da() : l
};
w.e = function() {
  Kg.b.e.call(this);
  this.md && (bc(this.md), this.md = l);
  this.Bd && (window.clearInterval(this.Bd), this.Bd = l);
  this.$b = this.Cb = l
};
w.Ch = function() {
  this.mf()
};
w.mf = function() {
  var a = Zd(this.Cb || window);
  Md(a, this.$b) || (this.$b = a, this.dispatchEvent("resize"))
};
function vi(a, b) {
  (this.Fd = b && b.api) || e(Error("api is null"));
  (this.$e = b && b.sampleurl) || e(Error("sampleurl is null"));
  (new qd(this.$e, {Ec:function(a) {
    var b;
    try {
      b = a.i ? a.i.responseText : ""
    }catch(g) {
      N(a.v, "Can not get responseText: " + g.message), b = ""
    }
    this.Fg = b;
    this.Da()
  }}, this)).s()
}
w = vi.prototype;
w.Da = function() {
  this.Ic = xd.K();
  this.p = new M;
  this.ab = [];
  var a = [{label:"File", Me:[{label:"Save", s:function() {
    alert("child1")
  }}, {label:"child2", s:function() {
    alert("child2")
  }}]}, {label:"Debug", Me:[{label:"Run", s:C(this.Qh, this)}]}];
  this.zg = ii(a);
  this.Za = new rg;
  this.La = new ti;
  this.Eg = new Jg(this.zg, this.Za, this.La);
  cf(this.Eg, B("application") ? document.getElementById("application") : "application");
  a = new ic("main.js", this.Fg);
  this.Qd(a);
  this.La.Mc(new Bf(a));
  wi(this)
};
function wi(a) {
  a.p.c(document, "keydown", function(a) {
    a.ctrlKey && "S" == String.fromCharCode(a.keyCode) && (a.preventDefault(), win = this.La.ce(), win instanceof Bf && win.gc && (a = win.Gd.ua(), win.getFile().set("content", a)))
  }, r, a)
}
w.Fa = aa();
function xi(a) {
  var b = new rd(a.Fd);
  J(yi(a), function(a) {
    var d = new vd;
    d.append(a.get("content"));
    b.Qd(a.get("filename"), d.getBlob("text/plain"))
  }, a);
  return ud(b)
}
w.Qh = function() {
  pc(xi(this), C(this.wg, this)).s()
};
w.wg = function() {
  this.Bg = new zf(this.Fd + "main.js");
  this.La.Mc(this.Bg.ad())
};
function yi(a) {
  var b = [];
  J(a.ab, function(a) {
    console.log(a);
    a.get("type") == jc && b.push(a)
  }, a);
  return b
}
w.Qd = function(a) {
  var b = r, c;
  if("" == a.get("dirpath")) {
    b = k, c = this.Za
  }else {
    J(this.ab, function(c) {
      b |= (c.get("dirpath") + "/" + c.get("filename") == a.get("dirpath"))(c.get("type") == kc)
    }, this);
    b || e(Error("A directory to contain added file does not exist."));
    var d = this.Za, g;
    c = a.get("dirpath").substr(1).split("/");
    J(c, function(a) {
      console.log(d);
      g = d.Xc();
      var b = Eb(g, function(b) {
        return b.Pb == a
      }, this);
      b || e(Error("Parent directory is not contained in Directory Tree"));
      d = b
    }, this);
    c = d
  }
  a.get("type") == kc ? c.add(new ag(a.get("filename"), bg, this.Za.J, this.Za.n())) : c.add(new ag(a.get("filename"), "nodetype-file", this.Za.J, this.Za.n()));
  this.ab.push(a)
};
window.Application = vi;

