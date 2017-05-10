var GNS = { _NAME_: "GNS" },
    tidSet = [1, 3, 4, 5, 11, 13, 23, 36, 119, 129, 155, 160, 165, 167];
window.rec_rp = window.rec_rp || function() {
    (rec_rp.q = rec_rp.q || []).push(arguments)
};
"undefined" == typeof window.console && (window.console = { log: function() {} });
Array.prototype.indexOf || (Array.prototype.indexOf = function(e, f) {
    var d = this.length >>> 0;
    f = Number(f) || 0;
    f = 0 > f ? Math.ceil(f) : Math.floor(f);
    for (0 > f && (f += d); f < d; f++) {
        if (f in this && this[f] === e) {
            return f
        }
    }
    return -1
});
if ("function" == typeof Object.defineProperty) {
    try { Object.defineProperty(Array.prototype, "shuffle", { enumerable: !1, writable: !0 }) } catch (error$$3) {}
    Array.prototype.shuffle = function() {
        for (var e, f, d = this.length; d; e = parseInt(Math.random() * d), f = this[--d], this[d] = this[e], this[e] = f) {}
        return this
    }
}
var array_shuffle = function(f) {
        for (var h, e, g = f.length; g; h = parseInt(Math.random() * g), e = f[--g], f[g] = f[h], f[h] = e) {}
        return f
    },
    LoadWebp = {
        isWebp: function() {
            try {
                return 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
            } catch (b) {
                return !1
            }
        }(),
        setSrc: function(g) {
            var j = this._urlFormat(g);
            g = j ? j : g;
            var j = "",
                j = g.match(/_(\d+)x(\d+)./),
                f = -1 != g.indexOf("/bfs/") ? !0 : !1,
                i = -1 != g.indexOf(".gif") ? !0 : !1,
                h = -1 != g.indexOf(".webp") ? !0 : !1;
            if (!this.isWebp || !f || i || h) {
                return g
            }
            j = null === j ? g + "@.webp" : g.split("_")[0] + "@" + j[1] + "w_" + j[2] + "h.webp";
            return utils.trimHttp(j)
        },
        _urlFormat: function(e) {
            var f = /\/\d+?_\d+?\/bfs/,
                d = e.replace(f, "/bfs");
            if (!f.test(e)) {
                return !1
            }
            /\/(\d+?)_(\d+?)\/bfs\/\w+?\/.+?(\.\w{3,4})/.exec(e);
            return d + "_" + RegExp.$1 + "x" + RegExp.$2 + RegExp.$3
        }
    },
    utils = {
        uncurryThis: function(b) {
            return function() {
                return b.call.apply(b, arguments)
            }
        },
        curryThis: function(b) {
            return function() {
                var a = Array.prototype.slice.call(arguments);
                a.unshift(this);
                return b.apply(null, a)
            }
        },
        bindFn: function(e, f) {
            var d = Array.prototype.slice.call(arguments, 2);
            return function() {
                return e.apply(f, d.concat(Array.prototype.slice.call(arguments)))
            }
        },
        extend: function(f, h) {
            function e() {}
            for (var g in h) { h.hasOwnProperty(g) && (f[g] = h[g]) }
            e.prototype = h.prototype;
            f.prototype = new e;
            f.prototype.constructor = f;
            f.__super__ = h.prototype;
            return f
        },
        mixin: function(g) {
            for (var j = Array.prototype.slice.call(arguments, 1), f = 0; f < j.length; f++) {
                var i = j[f],
                    h;
                for (h in i) { g[h] || (g[h] = i[h]) }
            }
        },
        distinctArray: function(h) {
            for (var l = [], g = {}, k = 0, j; k < h.length; k++) {
                j = h[k];
                var i = j + ":" + typeof j;
                g[i] || (l.push(j), g[i] = !0)
            }
            return l
        },
        browser: {
            version: function() {
                var b = navigator.userAgent;
                return { trident: /Trident/i.test(b), presto: /Presto/i.test(b), webKit: /AppleWebKit/i.test(b), gecko: /Gecko/i.test(b) && !/KHTML/i.test(b), mobile: /AppleWebKit.*Mobile.*/i.test(b), ios: /\(i[^;]+;( U;)? CPU.+Mac OS X/i.test(b), android: /Android/i.test(b) || /Linux/i.test(b), windowsphone: /Windows Phone/i.test(b), iPhone: /iPhone/i.test(b), iPad: /iPad/i.test(b), MicroMessenger: /MicroMessenger/i.test(b), webApp: !/Safari/i.test(b), edge: /edge/i.test(b), weibo: /Weibo/i.test(b), uc: /UCBrowser/i.test(b), qq: /MQQBrowser/i.test(b), baidu: /Baidu/i.test(b) }
            }(),
            language: (navigator.browserLanguage || navigator.language).toLowerCase(),
            lteIE: function(b) {
                return $.browser.msie && parseInt($.browser.version) <= b
            }
        },
        cookie: {
            get: function(f) {
                var h = "" + document.cookie,
                    e = h.indexOf(f + "=");
                if (-1 == e || "" == f) {
                    return ""
                }
                var g = h.indexOf(";", e); - 1 == g && (g = h.length);
                return unescape(h.substring(e + f.length + 1, g))
            },
            set: function(f, h, e) {
                e = void 0 !== e ? e : 365;
                var g = new Date;
                g.setTime(g.getTime() + 86400000 * e);
                document.cookie = f + "=" + escape(h) + ";expires=" + g.toGMTString() + "; path=/; domain=.bilibili.com"
            },
            "delete": function(b) { this.set(b, "", -1) }
        },
        readFromLocal: function(b) {
            return this.localStorage._support ? localStorage.getItem(b) : this.cookie.get(b)
        },
        saveToLocal: function(e, f, d) {
            return this.localStorage._support ? localStorage.setItem(e, f) : this.cookie.set(e, f, d)
        },
        localStorage: {
            _support: window.localStorage && "object" == typeof window.localStorage ? !0 : !1,
            getItem: function(b) {
                return this._support ? window.localStorage.getItem(b) : null
            },
            setItem: function(b, d) { this._support && window.localStorage.setItem(b, d) },
            removeItem: function(b) { this.getItem(b) && window.localStorage.removeItem(b) }
        },
        unhtml: function(b, d) {
            return b ? b.replace(d || /[&<">'](?:(amp|lt|quot|gt|#39|nbsp|#\d+);)?/g, function(e, f) {
                return f ? e : { "<": "&lt;", "&": "&amp;", '"': "&quot;", ">": "&gt;", "'": "&#39;" }[e]
            }) : ""
        },
        html: function(b) {
            return b ? b.replace(/&((g|l|quo)t|amp|#39|nbsp);/g, function(c) {
                return { "&lt;": "<", "&amp;": "&", "&quot;": '"', "&gt;": ">", "&#39;": "'", "&nbsp;": " " }[c]
            }) : ""
        },
        HashManage: {
            prependHash: "!",
            _change: function(w, u) {
                var v = location.hash,
                    t = {},
                    s = "",
                    r = 0;
                v && (v = v.substring(1), this.prependHash && (v = v.replace(RegExp("^" + this.prependHash.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")), "")));
                for (var v = v.split("&"), q = 0; q < v.length; q++) {
                    var o = v[q].split("=")[0],
                        j = v[q].split("=")[1];
                    o && (t[o] = decodeURIComponent(j))
                }
                if ("object" == typeof w) {
                    for (var l in w) {
                        (v = w[l]) ? t[l] = encodeURIComponent(v): !1 === v && delete t[l]
                    }
                } else {
                    if (u) { t[w] = encodeURIComponent(u) } else {
                        if (!1 === u) { delete t[w] } else {
                            return "undefined" == typeof w ? t : t[w] || null
                        }
                    }
                }
                for (var i in t) { s = 0 != r ? s + "&" : s + this.prependHash, s += i + "=" + t[i], r++ }
                location.hash = s;
                return t
            },
            get: function(b) {
                return this._change(b, null)
            },
            set: function(b, d) {
                return this._change(b, d)
            },
            clear: function() { location.hash = "" }
        },
        getColor16: function(f) {
            function h(b) {
                b = parseInt(b).toString(16);
                return 1 == b.length ? "0" + b : b
            }

            function e(i) {
                for (var c = "#", j = 0; 3 > j; j++) { c += h(i[j]) }
                return c
            }
            var g = "",
                g = [];
            null != f.match(/\((.*)\)/) ? (g = f.match(/\((.*)\)/)[1].split(","), g = e(g)) : null != f.match(/,+/g) ? (g = f.split(","), g = e(g)) : g = h(f);
            return g
        },
        serializeParam: function(f) {
            var h = [],
                e;
            for (e in f) {
                if ("function" != (typeof f[e]).toLowerCase() && "object" != (typeof f[e]).toLowerCase()) { h.push(encodeURIComponent(e) + "=" + encodeURIComponent(f[e])) } else {
                    if ($.isArray(f[e])) {
                        for (var g = 0; g < f[e].length; g++) { h.push(encodeURIComponent(e) + "[]=" + encodeURIComponent(f[e][g])) }
                    }
                }
            }
            return h.join("&")
        },
        query2json: function(f) {
            if ($.isPlainObject(f)) {
                return f
            }
            if (void 0 === f) {
                return {}
            }
            f = f.split("&");
            for (var h = {}, e = 0; e < f.length; e++) {
                var g = f[e].split("=");
                h[g[0]] = g[1]
            }
            return h
        },
        hash2json: function() {
            return 1 < window.location.href.split("#").length ? this.query2json(window.location.href.split("#")[1].split("?")[0].replace(/#/, "")) : {}
        },
        query: {
            get: function(b) {
                var d = utils.query2json(this._getQuery());
                return b ? d[b] : d
            },
            set: function(g, j) {
                var f = utils.query2json(this._getQuery()),
                    i = utils.hash2json();
                if ("object" == typeof g) {
                    for (var h in g) { this._set(f, h, g[h]) }
                } else { this._set(f, g, j) }
                return utils.makeUrl("", f, i)
            },
            _set: function(e, f, d) {
                null === d ? delete e[f] : e[f] = d;
                return e
            },
            _getQuery: function() {
                return void 0 !== window.location.search ? window.location.search.substring(1) : window.location.href.split("?")[1] ? window.location.href.split("?")[1].split("#")[0] : ""
            }
        },
        makeUrl: function(e, f, d) {
            f = this.serializeParam(f);
            d = this.serializeParam(d);
            e = f ? (e || location.pathname) + "?" + f : e || location.pathname;
            d && (e = e + "#" + d);
            return e
        },
        formatNum: function(h, l) {
            if (void 0 === h || "string" == typeof h && isNaN(parseInt(h))) {
                return "--"
            }
            var g = { "\u4e07": 10000 };
            l = "string" == typeof l ? l : "\u4e07";
            g = g[l] || g["\u4e07"];
            if (!("string" == typeof h && 0 <= h.indexOf(l))) {
                if ("string" == typeof h && 0 <= h.indexOf(",")) {
                    for (var k = h.split(","), j = "", i = 0; i < k.length; i++) { j += k[i] }
                    h = j
                }
                h = parseInt(h);
                h >= g && (h = (h / g).toFixed(1) + l);
                return h
            }
        },
        parseCardProps: function(g, j) {
            var f;
            f = g.stat ? { "data-gk": g.stat && g.stat.view, "data-sc": g.stat && g.stat.favorite, "data-pl": g.stat && g.stat.reply, "data-dm": g.stat && g.stat.danmaku, "data-up": g.owner && g.owner.name, "data-lm": g.tname || "", "data-tg": (new Date(1000 * g.pubdate)).format("yyyy-MM-dd hh:mm"), "data-txt": g.desc, "data-yb": g.stat && g.stat.coin } : { "data-gk": g.play, "data-sc": g.favorites, "data-pl": g.review, "data-dm": g.video_review, "data-up": g.author, "data-subtitle": g.subtitle, "data-lm": g.typename || "", "data-tg": g.created ? (new Date(1000 * g.created)).format("yyyy-MM-dd hh:mm") : g.create || g.created_at, "data-txt": g.description, "data-yb": g.coins };
            var i = "";
            if ("string" == j) {
                for (var h in f) { "" != i && (i += " "), i += h + '="' + f[h] + '"' }
                return i
            }
            return f
        },
        newParseCardProps: function(b, d) {
            return b.stat ? { "data-gk": b.stat && b.stat.view, "data-sc": b.stat && b.stat.favorite, "data-pl": b.stat && b.stat.reply, "data-dm": b.stat && b.stat.danmaku, "data-up": b.owner && b.owner.name, "data-lm": b.tname || "", "data-tg": (new Date(1000 * b.pubdate)).format("yyyy-MM-dd hh:mm"), "data-txt": b.desc, "data-yb": b.stat && b.stat.coin } : { "data-gk": b.play, "data-sc": b.favorites, "data-pl": b.review, "data-dm": b.video_review, "data-up": b.author, "data-subtitle": b.subtitle, "data-lm": b.typename || "", "data-tg": b.created ? (new Date(1000 * b.created)).format("yyyy-MM-dd hh:mm") : b.create || b.created_at, "data-txt": b.description, "data-yb": b.coins }
        },
        protocolRelative: function(b) {
            return /http:|https:/.test(b) ? b.replace(/http:|https:/, window.location.protocol) : $.browser.msie && 8 >= parseInt($.browser.version) ? window.location.protocol + b : b
        },
        formatDuration: function(g, j, f) {
            if ("number" !== typeof g) {
                return g
            }
            f = f || -1;
            var i = this.toFixed(g % 60, 2),
                h = j ? this.toFixed(Math.floor(g % 3600 / 60), 2) : this.toFixed(Math.floor(g / 60), f);
            g = j ? this.toFixed(Math.floor(g / 3600), f) : null;
            return null === g ? [h, i].join(":") : [g, h, i].join(":")
        },
        isObject: function(b) {
            return "object" === typeof b && null !== b
        },
        isNothing: function(b) {
            return null == b
        },
        isUndefined: function(b) {
            return "undefined" === typeof b
        },
        join: function() {
            return Array.prototype.join.call(arguments, "")
        },
        random: function(b, d) {
            this.isNothing(d) && (d = b, b = 0);
            return Math.floor(Math.random() * (d - b + 1)) + b
        },
        debounce: function(g, j, f) {
            function i() {
                clearTimeout(h);
                f && utils.isNothing(h) && g();
                h = setTimeout(g, j || 100)
            }
            var h;
            i.clearNext = function() { clearTimeout(h) };
            return i
        },
        throttle: function(i, o, h) {
            function n() {
                j = h.head ? 0 : (new Date).getTime();
                k = null;
                i()
            }

            function l() {
                var a, b = (new Date).getTime();
                !j && h.head && (j = b);
                a = o - (b - j);
                0 >= a || a > o ? (clearTimeout(k), k = null, j = b, i()) : k || h.tail || (k = setTimeout(n, a))
            }
            var k, j = 0;
            o = o || 200;
            h = h || {};
            l.clearNext = function() {
                clearTimeout(k);
                k = null;
                j = 0
            };
            return l
        },
        toFixed: function(b, d) {
            if ("number" !== typeof b && "string" !== typeof b) {
                return b
            }
            b = String(b);
            for (d = Number(d) || 2; b.length < d;) { b = "0" + b }
            return b.length > d ? b : b.slice(-d)
        },
        thumbnail: function(j, q, i) {
            var p, o, n, l;
            if ("string" !== typeof j || "undefined" === typeof q) {
                return utils.trimHttp(j)
            }
            var k = j.split("?");
            i = i || q;
            n = "/" + q + "_" + i;
            l = "_" + q + "x" + i;
            p = /^http.+i\d\.hdslb\.com\/group1\//;
            o = /(^http.+i\d\.hdslb\.com)(\/.+)/;
            q = /_\d+x\d+\./;
            i = /\/\d+_\d+\//;
            if (!/^http.+i[0-2]\.hdslb\.com\//.test(k[0]) || q.test(k[0]) || i.test(k[0])) {
                return utils.trimHttp(j)
            }
            if (/^http.+i\d\.hdslb\.com\/bfs\//.test(k[0]) || p.test(k[0])) { k[0] += l + k[0].slice(k[0].lastIndexOf(".")), j = k.join("?") } else {
                if (q = o.exec(k[0])) { k[0] = q[1] + n + q[2], j = k.join("?") }
            }
            return utils.trimHttp(LoadWebp.setSrc(j))
        },
        sortByIndex: function(g, j) {
            if (!$.isArray(g)) {
                return g
            }
            g.slice();
            var f, i = [],
                h = [];
            for (j = j || "pos_num"; g.length;) { f = g.shift(), 0 != f[j] ? i[f[j] - 1] = f : h.push(f) }
            for (f = 0; f < i.length; f++) { utils.isUndefined(i[f]) && (i[f] = h.shift()) }
            return i.concat(h)
        },
        isWebp: function() {
            try {
                return 0 == document.createElement("canvas").toDataURL("image/webp").indexOf("data:image/webp")
            } catch (b) {
                return !1
            }
        }(),
        webp: function(j, q) {
            var i;
            i = j;
            var p = /\/\d+?_\d+?\/bfs/,
                o = i.replace(p, "/bfs");
            p.test(i) ? (/\/(\d+?)_(\d+?)\/bfs\/\w+?\/.+?(\.\w{3,4})/.exec(i), i = o + "_" + RegExp.$1 + "x" + RegExp.$2 + RegExp.$3) : i = !1;
            j = i ? i : j;
            o = "";
            i = j.match(/_(\d+)x(\d+)./);
            var o = -1 != j.indexOf("/bfs/") ? !0 : !1,
                n = -1 != j.indexOf(".gif") ? !0 : !1,
                l = -1 != j.indexOf(".webp") ? !0 : !1,
                p = q || {},
                p = { w: p.w, h: p.h, p: p.p, e: p.e, c: p.c, rc: p.rc, a: p.a, bl: p.bl, q: p.q };
            if (!this.isWebp || !o || n || l) {
                return this.thumbnail(j, p.w, p.h)
            }
            null === i ? o = j : (o = j.split("_")[0], void 0 === p.w && (p.w = i[1]), void 0 === p.h && (p.h = i[2]));
            i = "";
            for (var k in p) { void 0 !== p[k] && (i += p[k] + k + "_") }
            return o = o + "@" + i.substring(0, i.length - 1) + ".webp"
        },
        isAlpha: function(e, f) {
            var d;
            localStorage.getItem("machineDna") ? d = localStorage.getItem("machineDna") : (d = parseInt(10 * Math.random() + 1), localStorage.setItem("machineDna", d));
            return this.isBeta(e) || f < d ? !0 : !1
        },
        isBeta: function(e) {
            var f = !1,
                d = utils.cookie.get("DedeUserID").slice(-1);
            d && $.isArray(e) && (f = -1 < $.inArray(+d, e));
            return f
        },
        trimHttp: function(b) {
            return b ? b.replace(/^http:/, "") : ""
        },
        lockPageScroll: function(e) {
            function f(b) {
                if (d[b.keyCode]) {
                    return preventDefault(b), !1
                }
            }
            var d = { 37: 1, 38: 1, 39: 1, 40: 1 };
            "lock" == e ? (window.addEventListener && window.addEventListener("DOMMouseScroll", this.preventDefault, !1), window.onwheel = this.preventDefault, window.onmousewheel = document.onmousewheel = this.preventDefault, window.ontouchmove = this.preventDefault, document.onkeydown = f) : "unlock" == e && (window.removeEventListener && window.removeEventListener("DOMMouseScroll", this.preventDefault, !1), window.onmousewheel = document.onmousewheel = null, window.onwheel = null, window.ontouchmove = null, document.onkeydown = null)
        },
        preventDefault: function(b) {
            b = b || window.event;
            b.preventDefault && b.preventDefault();
            b.returnValue = !1
        }
    };
window.__GetCookie = utils.bindFn(utils.cookie.get, utils);
window.__SetCookie = utils.bindFn(utils.cookie.set, utils);
window.ChatGetSettings = utils.bindFn(utils.readFromLocal, utils);
window.ChatSaveSettings = utils.bindFn(utils.saveToLocal, utils);
window.htmlspecialchars = utils.bindFn(utils.unhtml, utils);
window.browser = utils.browser;
window.formatFriendlyNumber = utils.bindFn(utils.formatNum, utils);
var lastMessageBoxLayer = 20000;

function MessageBox(b) {
    this.params = { evType: "over", center: !0, Overlap: !1, focusShowPos: "up", zIndex: null, animation: "fade", position: null, event: null, bound: !0, margin: 5, backdrop: !1, bindInput: !1 };
    "string" == typeof b && (b = { evType: b });
    if ("object" == typeof b) {
        for (var d in this.params) { b.hasOwnProperty(d) && (this.params[d] = b[d]) }
    }
}
MessageBox.prototype = {
    timer: null,
    msgbox: null,
    bindobj: null,
    backobj: null,
    incomingTimer: null,
    position: {},
    reverseMap: { up: "down", down: "up", left: "right", right: "left" },
    show: function(i, o, h, n, l) {
        i = $(i);
        if (!1 != this.params.Overlap || "yes" != i.attr("hasMessageBox")) {
            i.attr("hasMessageBox", "yes");
            "undefined" == typeof h && (h = 1000);
            "undefined" == typeof n && (n = "msg");
            "button" == h && (l = n, n = h, h = 1000);
            var k = h;
            0 == h && (k = 50);
            var j = this;
            j.leftTimer = function() {
                "button" != n && (clearTimeout(j.timer), j.timer = setTimeout(function() {
                    clearTimeout(j.timer);
                    j.close(j)
                }, k))
            };
            j.incomingTimer = function() { clearTimeout(j.timer) };
            this.bindobj = i;
            this.msgbox = $('<div class="m-layer m_layer"><div class="bg"><div class="content"><div class="mini"><div class="msg-text"><i class="b-icon"></i>' + o + "</div>" + ("button" == n ? '<div class="btnbox"><a class="b-btn ok">\u786e\u8ba4</a><a class="b-btn-cancel cancel">\u53d6\u6d88</a></div>' : "") + "</div></div></div></div>").prependTo("body");
            this.msgbox.addClass("m-" + n);
            j.params.backdrop && (j.backobj = $('<div class="m-backdrop"></div>').css({ position: "fixed", top: 0, left: 0, right: 0, bottom: 0, opacity: 0.6, backgroundColor: "#000", zIndex: (j.params.zIndex || lastMessageBoxLayer) - 1 }).appendTo("body"));
            "over" == this.params.evType ? (i.bind("mouseleave", j.leftTimer), i.bind("mouseenter", j.incomingTimer), this.msgbox.bind("mouseenter", function() { clearTimeout(j.timer) }), this.msgbox.bind("mouseleave", j.leftTimer)) : i.bind("blur", j.leftTimer);
            this.setPos();
            this.msgbox.css("z-index", j.params.zIndex || lastMessageBoxLayer++);
            if (this.params.bindInput && "error" == n) {
                if (i.is(":text") || i.is("textarea")) { i.addClass("error").on("focus.m-error", this.closeErrHandler()) } else {
                    if (0 < i.find(":text,textarea").length) { i.addClass("error").find(":text,textarea").on("focus.m-error", this.closeErrHandler()) }
                }
            }
            "button" == n && (this.msgbox.find(".ok").click(function() { "undefined" != typeof l && !1 == l(j) || j.close() }), this.msgbox.find(".cancel").click(function() { j.close() }));
            0 != h && j.leftTimer();
            "fade" != this.params.animation ? this.msgbox.addClass(this.params.animation) : this.moveIn(this.params.focusShowPos);
            this.bindobj.data("b-msgbox", this);
            return this.msgbox
        }
    },
    close: function() {
        var b = this,
            d = function() {
                b.msgbox.remove();
                b.params.backdrop && b.backobj.remove();
                "over" == b.params.evType && b.bindobj.off("mouseenter", b.incomingTimer);
                b.bindobj.off("over" == b.params.evType ? "mouseleave" : "blur", b.leftTimer)
            };
        this.bindobj.attr("hasMessageBox", "");
        "fade" != this.params.animation ? this.msgbox.removeClass(this.params.animation).fadeOut(200, d) : this.msgbox.fadeOut(200, d)
    },
    closeErrHandler: function() {
        var b = this;
        return function() {
            var a = b.bindobj.removeClass("error");
            b.close();
            a.is(":text") || a.is("textarea") ? a.off("focus.m-error") : 0 < a.find(":text,textarea").length && a.find(":text,textarea").off("focus.m-error")
        }
    },
    moveIn: function(f) {
        var h = { opacity: 1 },
            e = 5,
            g = 5;
        switch (f) {
            case "up":
                h.top = "-=5";
                g = 0;
                break;
            case "down":
                h.top = "+=5";
                e = -e;
                g = 0;
                break;
            case "left":
                h.left = "-=5";
                e = 0;
                break;
            case "right":
                h.left = "+=5";
                g = -g;
                e = 0;
                break;
            default:
                h.top = "-=5", g = 0
        }
        this.msgbox.show().css({ top: this.position.top + e, left: this.position.left + g, opacity: 0 });
        this.msgbox.animate(h, 200)
    },
    setPos: function() {
        this.params.position ? (this.position = this.params.position, this.resetBound()) : this._pos(this.params.focusShowPos);
        this.msgbox.css("left", this.position.left);
        this.msgbox.css("top", this.position.top)
    },
    _pos: function(e, f) {
        var d = this.bindobj;
        this.params.focusShowPos = e;
        switch (e) {
            case "up":
                this.position.top = d.offset().top - this.msgbox.outerHeight() - this.params.margin;
                this.position.left = d.offset().left;
                this.params.center && (this.position.left = this.position.left - this.msgbox.outerWidth() / 2 + d.outerWidth() / 2);
                break;
            case "down":
                this.position.top = d.offset().top + d.outerHeight() + this.params.margin;
                this.position.left = d.offset().left;
                this.params.center && (this.position.left = this.position.left - this.msgbox.outerWidth() / 2 + d.outerWidth() / 2);
                break;
            case "left":
                this.position.top = d.offset().top;
                this.position.left = d.offset().left - this.msgbox.outerWidth() - this.params.margin;
                break;
            case "right":
                this.position.top = d.offset().top, this.position.left = d.offset().left + d.outerWidth() + this.params.margin
        }
        if (!this.checkBound(e)) {
            if (!0 !== f) {
                return this._pos(this.reverseMap[e], !0)
            }
            this.setBound("down");
            this.setBound("left");
            this.position.top -= 10;
            this.position.left += 10
        }
        this.resetBound();
        return this.position
    },
    resetBound: function(e) {
        if (this.params.bound || !0 === e) {
            e = ["up", "down", "left", "right"];
            for (var f = 0; f < e.length; f++) {
                var d = e[f];
                this.checkBound(d) || this.setBound(d)
            }
        }
    },
    checkBound: function(b) {
        switch (b) {
            case "up":
                return this.position.top >= $(window).scrollTop();
            case "down":
                return this.position.top + this.msgbox.outerHeight() <= $(window).height() + $(window).scrollTop();
            case "left":
                return this.position.left >= $(window).scrollLeft();
            case "right":
                return this.position.left + this.msgbox.outerWidth() <= $(window).width() + $(window).scrollLeft();
            default:
                return !0
        }
    },
    setBound: function(b) {
        switch (b) {
            case "up":
                this.position.top = $(window).scrollTop();
                break;
            case "down":
                this.position.top = $(window).height() + $(window).scrollTop() - this.msgbox.outerHeight();
                break;
            case "left":
                this.position.left = $(window).scrollLeft();
                break;
            case "right":
                this.position.left = $(window).width() + $(window).scrollLeft() - this.msgbox.outerWidth()
        }
    }
};

function pagelist(w, u, v, t, s, r, q, o) {
    q = q ? q : 3;
    u = parseInt(u);
    v = parseInt(v);
    t = parseInt(t);
    if (1 >= v && 0 < t || 0 == t) {
        return !1
    }
    var j, l = 2 * q + 1;
    u > q + 1 ? (j = u - q, l = u + q, l > v && (j -= l - v, j = 1 > j ? 1 : j, l = v)) : (j = 1, l > v && (l = v));
    $(w).empty();
    null != r ? $('<span class="result">\u5171 ' + v + " \u9875/ " + t + " \u4e2a" + r + " </span>").appendTo(w) : $('<span class="result">\u5171 ' + v + " \u9875 </span>").appendTo(w);
    1 != u && ($('<a class="p prevPage" href="javascript:;" page="' + (u - 1) + '">\u4e0a\u4e00\u9875</a>').appendTo(w).click(function() { s($(this).attr("page")) }), u > q + 1 && 1 < j && ($('<a class="p indexPage" href="javascript:;" page="1">1</a>').appendTo(w).click(function() { s($(this).attr("page")) }), 2 < j && $("<strong>...</strong>").appendTo(w)));
    for (; j <= l; j++) { j == u ? $('<a class="p active">' + j + "</a>").appendTo(w) : $('<a class="p" href="javascript:;" page="' + j + '">' + j + "</a>").appendTo(w).click(function() { s($(this).attr("page")) }) }
    u != v && 1 < v && (u <= v - q - 1 && l != v && (l + 1 != v && $("<strong>...</strong>").appendTo(w), $('<a class="p endPage" href="javascript:;" page="' + v + '">' + v + "</a>").appendTo(w).click(function() { s($(this).attr("page")) })), $('<a class="p nextPage" href="javascript:;" page="' + (u + 1) + '">\u4e0b\u4e00\u9875</a>').appendTo(w).click(function() { s($(this).attr("page")) }));
    if (!0 === o) {
        u = $('<div class="custom-right"></div>').appendTo(w);
        var i = $('<input type="text" class="b-input custompage custom-right-inner">').appendTo(u);
        $(".result", w).addClass("custom-right-inner").prependTo(u).append("\uff0c\u8df3\u81f3");
        u.append('<span class="custom-right-inner">\u9875</span>');
        i.bind("keydown", function(b) { b && 13 == b.keyCode && (b = i.val(), 1 > b ? b = 1 : b > v && (b = v), s(b)) })
    }
}

function pagelist_ul(i, o, h, n, l, k) {
    k = k ? k : 3;
    o = parseInt(o);
    h = parseInt(h);
    n = parseInt(n);
    if (1 >= h && 0 < n || 0 == n) {
        return !1
    }
    var j = 2 * k + 1;
    o >= j ? (n = o - k, j = o + k) : n = 1;
    j > h && (j = h);
    $(i).empty();
    for (1 != o && 1 != n ? $('<li page="1"><a class="indexPage" href="javascript:;">|&lt;</a></li>').appendTo(i).click(function() { l($(this).attr("page")) }) : 1 != o && $('<li page="1"><a class="indexPage" href="javascript:;">|&lt;</a></li>').appendTo(i).click(function() { l($(this).attr("page")) }); n <= j; n++) { n == o ? $('<li class="current">' + n + "</li>").appendTo(i) : $('<li page="' + n + '"><a href="javascript:;">' + n + "</a></li>").appendTo(i).click(function() { l($(this).attr("page")) }) }
    o != h && 1 < h && $('<li page="' + h + '"><a class="endPage" href="javascript:;">&gt;|</a></li>').appendTo(i).click(function() { l($(this).attr("page")) })
}
window.bbFeedback = function() {
    function y(f, e, h) {
        f = i.base + i.list.getReply + "?type=1&sort=0&oid=" + f + "&pn=" + e + "&r=" + Math.random();
        if (f != q) {
            q = f;
            $(".comm > .loading").remove();
            $('<div class="loading"></div>').prependTo(".comm");
            var g = new Date;
            $.ajax(q, {
                success: function(d) {
                    var c = (new Date).getTime() - g.getTime();
                    500 > c ? setTimeout(function() {
                        $(".comm").html(d);
                        "undefined" != typeof h && h();
                        bindCardEvent()
                    }, 0 >= 300 - c ? 10 : 300 - c) : ($(".comm").html(d), "undefined" != typeof h && h(), bindCardEvent())
                }
            })
        }
    }

    function w(f, e, h) {
        f = i.base + i.list.getReply + "?type=2&sort=0&oid=" + f + "&pn=" + e + "&r=" + Math.random();
        if (f != q) {
            q = f;
            $(".comm > .loading").remove();
            $('<div class="loading"></div>').prependTo(".comm");
            var g = new Date;
            $.ajax(q, {
                success: function(d) {
                    var c = (new Date).getTime() - g.getTime();
                    500 > c ? setTimeout(function() {
                        $(".comm").html(d);
                        "undefined" != typeof h && h();
                        bindCardEvent()
                    }, 0 >= 300 - c ? 10 : 300 - c) : ($(".comm").html(d), "undefined" != typeof h && h(), bindCardEvent())
                }
            })
        }
    }

    function x(k, h, A, z, p, n) {
        h = { oid: h, type: 4 == A ? A : "topic" == A ? 2 : 1, rpid: z, action: p };
        var l = new MessageBox({ Overlap: !0 });
        h = {
            type: "post",
            url: i.base + i.list.praise,
            data: $.extend(!0, { jsonp: "jsonp" }, h),
            dataType: "json",
            xhrFields: { withCredentials: !0 },
            success: function(a) {
                k.data("b-msgbox") && k.data("b-msgbox").close();
                0 != a.code ? 12004 == a.code ? l.show(k, "\u60a8\u7684\u64cd\u4f5c\u8fc7\u4e8e\u9891\u7e41\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5", 2000, "info") : l.show(k, "\u64cd\u4f5c\u5931\u8d25", 2000, "info") : (1 == p ? l.show(k, "\u8d5e\u540c\u6210\u529f", 500, "info") : 0 == p && l.show(k, "\u53d6\u6d88\u8d5e\u540c\u6210\u529f", 500, "info"), n && n())
            },
            error: function() { l.show(k, "\u53d1\u9001\u5931\u8d25", 2000, "error") }
        };
        postJSONLite(h, "sendPraiseCallback");
        return !1
    }

    function v(g, f, l, k, h) {
        f = {
            type: "post",
            url: i.base + (h ? i.list.upHide : i.list.upShow),
            data: $.extend(!0, { jsonp: "jsonp" }, { oid: f, type: 4 == l ? l : "topic" == l ? 2 : 1, rpid: k }),
            dataType: "json",
            xhrFields: { withCredentials: !0 },
            success: function(a) { a && 0 == a.code ? ((new MessageBox).show(g, h ? "\u9690\u85cf\u6210\u529f" : "\u663e\u793a\u6210\u529f", 500, "info"), h ? $(g).parent().find(".showfb").css("display", "") : $(g).parent().find(".hidefb").css("display", ""), $(g).hide()) : (new MessageBox).show(g, h ? "\u9690\u85cf\u5931\u8d25" : "\u663e\u793a\u5931\u8d25", 2000, "warning") },
            error: function() {
                (new MessageBox).show(g, "\u53d1\u9001\u5931\u8d25", 2000, "error")
            }
        };
        postJSONLite(f, "adHideFBCallback");
        return !1
    }

    function u(E, D, C, B) {
        var A = new MessageBox,
            z = new MessageBox,
            p = A.show(E, '<h3 style="text-align:left; color: #333;font-size: 14px;">\u8bf7\u8f93\u5165\u4e3e\u62a5\u7406\u7531</h3><span class="b-btn-cancel-copy" style="color:#999;cursor:pointer;position:absolute;right:10px;top:8px;font-size:14px;font-family:Arial;">\u00d7</span><div class="reason-set"></div><textarea style="display:none;width:188px;border-radius:4px;border:1px solid #ccd0d7;height:58px;padding:5px;margin:5px 0;" name="message" placeholder="\u81ea\u5b9a\u4e49\u7406\u7531"></textarea>', "button", function() {
                var b = p.find('input[name="reason"]:checked').val(),
                    d = p.find("textarea").val(),
                    c = p.find(".b-btn.ok");
                if (c.hasClass("disabled")) {
                    return !1
                }
                if (!b || "0" == b && !d) {
                    return z.show(c, "\u8bf7\u5b8c\u5584\u4e3e\u62a5\u7406\u7531"), !1
                }
                z.msgbox && z.close();
                c.css({ "background-color": "#e5e9ef", color: "#b8c0cc" });
                $.ajax({ url: utils.protocolRelative("//api.bilibili.com/x/v2/reply/report?jsonp=jsonp"), type: "post", data: { oid: D, type: 4 == C ? C : "arc" == C ? 1 : 2, rpid: B, reason: b, content: d }, xhrFields: { withCredentials: !0 } }).done(function(f) {
                    var e;
                    0 == f.code ? (p.find(".mini").html('<span class="b-btn-cancel-copy" style="color:#999;cursor:pointer;position:absolute;right:10px;top:8px;font-size:14px;font-family:Arial;">\u00d7</span><div style="padding:61px 70px;width:60px;"><i style="margin:0 auto;background:transparent url(//static.hdslb.com/images/v3images/done.png) no-repeat center;width:48px;height:48px;display:block;"></i><div style="text-align:center;font-size:13px;margin-top:15px;">\u4e3e\u62a5\u6210\u529f</div></div>'), p.find(".b-btn-cancel-copy").click(function() {
                        clearTimeout(e);
                        A.close()
                    }), e = setTimeout(function() { A.close() }, 3000)) : 12019 == f.code ? (new MessageBox).show(c, "\u4e3e\u62a5\u8fc7\u4e8e\u9891\u7e41\uff0c\u8bf7" + f.data.ttl + "\u79d2\u540e\u91cd\u8bd5") : (new MessageBox).show(c, "\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5")
                }).fail(function() {
                    (new MessageBox).show(c, "\u63d0\u4ea4\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5")
                }).complete(function() { c.css({ "background-color": "", color: "" }) });
                return !1
            });
        if (p) {
            p.find("textarea").val("");
            E = "\u5e7f\u544a \u8272\u60c5 \u5237\u5c4f \u5f15\u6218 \u5267\u900f \u653f\u6cbb \u4eba\u8eab\u653b\u51fb \u89c6\u9891\u4e0d\u76f8\u5173 \u5176\u5b83".split(" ");
            for (var l = p.find(".reason-set").css({ width: 200, "text-align": "left", "padding-top": "10px" }), k = 0; k < E.length; k++) { $('<label style="cursor:pointer;"><input style="vertical-align:middle; margin-top:2px; margin-right:5px;" type="radio" name="reason" value="' + (k + 1) % 9 + '"/><span style="vertical-align:middle;">' + E[k] + "</span></label>").css({ "vertical-align": "top", width: "98px", "line-height": "24px", display: "inline-block" }).appendTo(l) }
            p.find('input[name="reason"]').change(function() { "0" == $(this).val() ? p.find("textarea").show().val("") : p.find("textarea").hide().val($(this).siblings("span").text()) });
            p.find(".bg").css({ padding: "0px" });
            p.css({ "box-shadow": "rgba(0,0,0,0.16) 0px 2px 4px" });
            p.find(".question").hide();
            p.find(".b-btn-cancel").hide();
            p.find(".b-btn.ok").css({ padding: "7px 46px", "font-size": "14px", margin: "5px 0", border: "none" });
            p.find(".b-btn-cancel-copy").click(function() { A.close() });
            return !1
        }
    }

    function t(g) {
        var f = Math.floor((new Date).getTime() / 1000),
            l = new Date;
        l.setHours(0);
        l.setMinutes(0);
        l.setSeconds(0);
        l = Math.floor(l.getTime() / 1000);
        if (g > l && 0 <= f - g) {
            return 50 >= f - g ? (f = 10 * Math.floor((f - g) % 60 / 10), (10 < g ? f : 10) + "\u79d2\u524d") : 3600 > f - g ? Math.ceil((f - g) / 60) + "\u5206\u949f\u524d" : Math.ceil((f - g) / 3600) + "\u5c0f\u65f6\u524d"
        }
        f = new Date;
        f.setTime(1000 * g);
        g = f.getMonth() + 1;
        var l = f.getDate(),
            k = f.getHours(),
            h = f.getMinutes();
        10 > g && (g = "0" + g);
        10 > l && (l = "0" + l);
        10 > k && (k = "0" + k);
        10 > h && (h = "0" + h);
        return f.getFullYear() + "-" + g + "-" + l + " " + k + ":" + h
    }

    function s(g, f) {
        if (document.selection) { g.focus(), sel = document.selection.createRange(), sel.text = f, sel.select() } else {
            if (g.selectionStart || "0" == g.selectionStart) {
                var l = g.selectionStart,
                    k = g.selectionEnd,
                    h = g.scrollTop;
                g.value = g.value.substring(0, l) + f + g.value.substring(k, g.value.length);
                0 < h && (g.scrollTop = h);
                g.focus();
                g.selectionStart = l + f.length;
                g.selectionEnd = l + f.length
            } else { g.value += f, g.focus() }
        }
    }

    function r() {
        try {
            if (window.parent && window.parent.document) {
                var d = window.parent.document.getElementById("biliComment");
                d && (d.style.height = $("body").height() + "px")
            }
        } catch (c) {}
    }

    function j(e, d, f) {
        this.type = d ? d : "arc";
        this._parent = $(e);
        this.target = this._parent.find(".bilibili-comment");
        this.target.length || (this.target = $('<div class="bilibili-comment"></div>').hide().appendTo(this._parent));
        this.options = $.extend(!0, { allowFeed: !1, useIframe: !1, autoLoad: !1, onLoad: null, onReplyLoad: null, onSubmit: null }, f);
        this.platform = "pc";
        browser.version.mobile && !browser.version.iPad ? (this.target.removeClass("pc").addClass("mobile"), this.platform = "mobile") : browser.version.iPad || browser.version.android ? (this.target.removeClass("pc"), this.platform = "tablet") : this.target.addClass("pc");
        window.feedback_object = this;
        this.captcha = window.captcha_key;
        this.needCaptcha = !1;
        this.mids = [];
        this.hasFeedMids = [];
        this.floorObjs = {};
        $("#bbFeedback_style").length || $('<style id="bbFeedback_style">#dcmp_textarea_container .ui-autocomplete{ margin-top: 5px; margin-left: -10px; max-width: 150px; }</style>').appendTo("head");
        this.loginInfo = null;
        this.page = 1;
        this._rootQuoteID = this._quoteID = void 0;
        this._parent.data("bbFeedback") || (this.fbID = ++o);
        this._parent.data("bbFeedback", this);
        this.init()
    }
    var q = "",
        i = { base: "//api.bilibili.com", list: { sendReply: "/x/v2/reply/add", getReply: "/x/v2/reply", getChildReply: "/x/v2/reply/reply", getCount: "/x/v2/reply/count", praise: "/x/v2/reply/action", report: "/x/v2/reply/report", getPosition: "/x/v2/reply/jump", upHide: "/x/v2/reply/hide", upShow: "/x/v2/reply/show", adminDelete: "/x/v2/reply/del" } };
    window.CallPlayerAction = function(a) {
        switch (a) {
            case 1:
                a = 1 <= $("#comment_container").length;
                if (0 == $("#review_comments_tips").length) { $('<div class="new_comm"><span id="review_comments_tips" tag="0"></span></div>').prependTo(a ? "#comment_container>ul" : ".bilibili-comment > ul").on("click", function() { window.feedback_object ? (window.feedback_object.orderby = "0", window.feedback_object.load(1)) : 0 < $("#fb_tp_id").length ? w($("#fb_tp_id").val(), 1) : 0 < $("#fb_aid").length ? y($("#fb_aid").val(), 1) : y($("#fb_news_id").val(), 1) }) }
                num = parseInt($("#review_comments_tips").attr("tag")) + 1;
                $("#review_comments_tips").attr("tag", num);
                $("#review_comments_tips").html("<b>" + num + "</b> \u6761\u65b0\u8bc4\u8bba\uff0c\u70b9\u51fb\u67e5\u770b")
        }
    };
    var o = 0;
    j.prototype = {
        isAdmin: -1,
        orderby: "0",
        emojiDefault: null,
        emojiXHR: $.Deferred(),
        init: function() {
            var g = this,
                f = this.bindWindow = window,
                l = this.bindTarget = this.target;
            if (this.options.useIframe) {
                try {
                    if (window.parent && window.parent.document) {
                        var k = window.parent.document.getElementById("biliComment");
                        k && (f = this.bindWindow = window.parent, l = this.bindTarget = k)
                    }
                } catch (h) {
                    throw h
                }
            }
            $(f).off("scroll.bbFeedback-" + this.fbID).on("scroll.bbFeedback-" + this.fbID, function() {
                var b = $(".comm_send", g.target),
                    a = g.options.useIframe ? $(l).offset().top : 0;
                $(l).height() > $(f).height() && ($(l).offset().top + $(l).height() < $(f).scrollTop() + $(f).height() && b.offset().top + b.outerHeight() + a < $(f).scrollTop() ? b.appendTo(g.target).addClass("bottom") : $(l).offset().top >= $(f).scrollTop() && b.offset().top + a > $(f).scrollTop() + $(f).height() && b.insertAfter($(".c_order", g.target)).removeClass("bottom"))
            });
            onLoginInfoLoaded(function(a) {
                g.loginInfo = a;
                g.checkLogin($(".tg_send_post", g.target))
            }, !0);
            this.options.autoLoad && ($("#load_comment").remove(), $(this.target).show(), this.createCommentSender())
        },
        checkLogin: function(d) {
            if (this.loginInfo && $(".tg_send_post", this.target).length) {
                var c = $("button[type=submit]", d).off("click.commentSubmitMsg");
                if (this.loginInfo.isLogin) {
                    return $(".user_face", d).removeClass("no-face"), $(".user_face>img", d).attr("src", utils.thumbnail(this.loginInfo.face, 48)).show(), d.find(".login-link-wrp").remove(), UserStatus.checkMoral() ? this.loginInfo.level_info && 2 > this.loginInfo.level_info.current_level && this.loginInfo.officialVerify && -1 == this.loginInfo.officialVerify.type && window.uid && window.uid != window.mid && !(0 < this.loginInfo.vipType && 0 != this.loginInfo.vipStatus && 2 != this.loginInfo.vipStatus && 3 != this.loginInfo.vipStatus) ? (c.addClass("disabled"), $('<div class="login-link-wrp">\u60a8\u7684\u7b49\u7ea7\u4e0d\u8db3\uff0c\u5347\u7ea7\u81f3Lv2\u53ef\u53c2\u4e0e\u8bc4\u8bba</div>').prependTo($(".dcmp-textarea-container").addClass("disabled"))) : ($(".dcmp-textarea-container", d).removeClass("disabled"), c.removeClass("disabled"), $(".jc-notice", d).remove(), d.find(".ipt-txt").show()) : (c.addClass("disabled"), $('<div class="login-link-wrp">\u4f60\u7684\u8282\u64cd\u5df2\u4f4e\u4e8e60\uff0c\u5c06\u65e0\u6cd5\u53d1\u8868\u8bc4\u8bba\uff0c\u8be6\u60c5\u8bf7\u70b9\u51fb<a class="login-link b-btn" href="https://account.bilibili.com/site/record?type=moral" target="_blank">\u6211\u7684\u8282\u64cd\u8bb0\u5f55</a><a class="jc-help" href="//www.bilibili.com/html/help.html#j_4" target="_blank"><i class="b-tip jc"></i>\u5982\u4f55\u6062\u590d\u8282\u64cd\u503c\uff1f</a></div>').prependTo($(".dcmp-textarea-container").addClass("disabled"))), !0
                }
                $(".user_face", d).addClass("no-face");
                $(".user_face>img", d).attr("src", "//static.hdslb.com/images/member/noface.gif");
                0 == d.find(".login-link").length && (c.addClass("disabled"), $('<div class="login-link-wrp">\u8bf7\u5148<a class="login-link b-btn" href="https://account.bilibili.com/login" target="_blank">\u767b\u5f55</a>\u540e\u53d1\u8868\u8bc4\u8bba (\u30fb\u03c9\u30fb)</div>').prependTo($(".dcmp-textarea-container").addClass("disabled")).find(".login-link").on("click", function(b) { UserStatus.isLogin($(this), b) }));
                c.on("click.commentSubmitMsg", function() { UserStatus.isLogin($(this)) });
                return !1
            }
        },
        pushUser: function(d, c) {
            "undefined" == typeof this.floorObjs[d] && (this.floorObjs[d] = []);
            this.floorObjs[d].push(c);
            return 0 > this.mids.indexOf(d) && 0 > this.hasFeedMids.indexOf(d) ? (this.mids.push(d), !0) : !1
        },
        pushFeedUser: function(b) {
            return 0 > this.hasFeedMids.indexOf(b) ? (this.hasFeedMids.push(b), !0) : !1
        },
        checkFeed: function(d) {
            if (!0 === this.options.allowFeed) {
                var c = this;
                this.captcha || Captcha.set(function(b) { c.captcha = b });
                $.ajax({
                    url: "//prop.bilibili.com/api/electric/has.feed",
                    data: { mids: this.mids.join(), aid: d, captcha: this.captcha },
                    dataType: "json",
                    type: "POST",
                    xhrFields: { withCredentials: !0 },
                    success: function(f) {
                        if (f.code && -700 == f.code) {
                            Captcha.set(function(e) {
                                c.captcha = e;
                                c.checkFeed(d)
                            })
                        } else {
                            if (f.data && f.data.result) {
                                for (var b = 0; b < f.data.result.length; b++) {
                                    var a = f.data.result[b];
                                    a.feed_status && c.pushFeedUser(a.mid)
                                }
                            }
                            c.addFeedTag()
                        }
                    },
                    error: function() {}
                })
            }
        },
        addFeedTag: function() {
            for (var f = 0; f < this.hasFeedMids.length; f++) {
                for (var e = 0; e < this.floorObjs[this.hasFeedMids[f]].length; e++) {
                    var h = this.floorObjs[this.hasFeedMids[f]][e];
                    if (!(0 < h.find(".feedtag").length)) {
                        var g = $("<div>").addClass("feedtag");
                        0 < h.parents(".reply").length ? g.insertAfter(h.find(".name")) : h.find(".t").append(g);
                        h = $("#battery_ranking").find('[mid="' + this.hasFeedMids[f] + '"]');
                        0 < h.length && (h = parseInt(h.attr("rank")), 3 >= h && g.addClass("n n" + h))
                    }
                }
            }
        },
        initEmoji: function(g) {
            var f = this,
                l = 0,
                k = g.find(".ywz"),
                h = g.find(".biaoqing_box");
            $(document.body).on("click", function(a) { g.find(".dcmp_post").find(a.target).length || 1 != l || (k.removeClass("open"), h.removeClass("open"), l = 0) });
            k.click(function() { 0 == l ? ($(this).addClass("open"), h.addClass("open"), l = 1, $(".ipt-txt", g).focus()) : ($(this).removeClass("open"), h.removeClass("open"), l = 0) });
            h.on("click", ".emoji-wrap a", function() { UserStatus.isLogin(this) && (s($(".ipt-txt", g).get(0), $(this).text()), $(".ipt-txt", g).removeClass("error").parent().removeClass("error"), k.removeClass("open"), h.removeClass("open"), l = 0) });
            h.on("click", ".emoji-wrap span", function() {
                if (UserStatus.isLogin(this)) {
                    if (f.loginInfo.isLogin && 0 < f.loginInfo.vipType && 0 != f.loginInfo.vipStatus) { 1 == f.loginInfo.vipStatus ? (s($(".ipt-txt", g).get(0), $(this).attr("data-emoji-text")), $(".ipt-txt", g).removeClass("error").parent().removeClass("error"), k.removeClass("open"), h.removeClass("open"), l = 0) : 2 == f.loginInfo.vipStatus && $.ajax({ url: "//static.hdslb.com/vip/dist/js/vipPlugin.js", cache: !0, dataType: "script" }).done(function() { new window.vipDisable }) } else {
                        var a = $('<div class="b-vip-backdrop"><div class="b-vip-wrap"><span class="b-vip-close">&times;</span><div class="b-vip-msg">\u5f00\u901a<span class="b-vip-red">\u5927\u4f1a\u5458</span>\uff0c\u4e13\u4eab\u7279\u8272\u8868\u60c5</div><div class="b-vip-img"><img src="//static.hdslb.com/images/base/vip-2233.png" alt="vip"></div><div class="b-vip-pay"><a class="b-vip-btn" target="_blank">\u7acb\u5373\u5f00\u901a</a></div></div></div>').appendTo(document.body);
                        a.click(function(b) { b.stopPropagation() });
                        $(".b-vip-close", a).click(function(b) { a = a.detach() });
                        $(".b-vip-btn", a).click(function(b) {
                            rec_rp("event", "discuss_openVIP_click");
                            a = a.detach();
                            $.ajax({ url: "//static.hdslb.com/vip/dist/js/vipPlugin.js", cache: !0, dataType: "script" }).done(function() { new window.vipPopup({}, function() { a = a.detach() }) })
                        });
                        rec_rp("event", "discuss_openVIP_show")
                    }
                }
            })
        },
        bindAgree: function(b, f) {
            var e = this;
            if (f.action) {
                b.html("<span>\u5df2\u8d5e</span><b>(<em>" + f.like + "</em>)</b>").off("click").on("click", function() {
                    return x($(this), e.id, e.type, f.rpid, 0, function() {
                        f.like--;
                        f.action = 0;
                        e.bindAgree(b, f)
                    })
                }).on("mouseenter.zan", function() { b.find("span").text("\u53d6\u6d88") }).on("mouseleave.zan", function() { b.find("span").text("\u5df2\u8d5e") })
            } else {
                b.html("<span>\u8d5e</span><b>(<em>" + f.like + "</em>)</b>").off("click mouseenter.zan mouseleave.zan").on("click", function() {
                    return x($(this), e.id, e.type, f.rpid, 1, function() {
                        f.like++;
                        f.action = 1;
                        e.bindAgree(b, f)
                    })
                })
            }
        },
        recordToObject: function(k, h, A) {
            function z(d, c) {
                c || (c = []);
                return d.replace(/\n/g, "<br />").replace(p, function(f, e) {
                    return l.test(f) ? f : '<a href="javascript:;" mid="' + A + '" card="' + e + '">@' + e + "</a>"
                }).replace(n, '<a href="//www.bilibili.com/video/av$1/" target="_blank" data-view="$1">av$1</a>')
            }
            var p = RegExp(/@([^\s:\uff1a@~!#$%^&*\(\)<]{2,30})/g),
                n = RegExp(/av([0-9]+)/g),
                l = RegExp(/@.+\.webp/i);
            1 == h.state ? ($('<a href="javascript:;">[\u6b64\u697c\u5c42\u5df2\u88ab\u7528\u6237\u9690\u85cf \u70b9\u51fb\u67e5\u770b]</a>').appendTo(k).click(function() { $(this).next().slideToggle(200) }), $('<div style="display:none" class="quote">' + z(h.content.message, h.content.members) + "</div>").appendTo(k)) : 3 == h.state || 4 == h.state ? $('<a href="javascript:;">***</a>').appendTo(k) : k.html(z(h.content.message, h.content.members));
            bindPOCoins2(k.find("a"))
        },
        reply_render: function(e, d, l) {
            d = $('<li><a class="re_face" href="//space.bilibili.com/' + e.member.mid + '" mid="' + e.member.mid + '" target="_blank" card="' + e.member.uname + '"><img src="' + utils.thumbnail(e.member.avatar, 52, 52) + '" /></a>                <div class="re_cnt">                   <div class="w"><a class="name" href="//space.bilibili.com/' + e.member.mid + '" mid="' + e.member.mid + '" target="_blank" card="' + e.member.uname + '">' + e.member.uname + '</a><a href="//www.bilibili.com/html/help.html#k_3" target="_blank" class="user-info-level l' + (e.member.level_info ? e.member.level_info.current_level : 0) + '"></a><span class="content"></span></div>                    <div class="info">                       <p>                            <span class="floor-date">' + t(e.ctime) + "</span>" + (0 <= this.isAdmin ? '        <a class="zan" onclick="javascript:;"></a>' : "") + (0 <= this.isAdmin ? '      <a class="re_ta" href="javascript:;;">\u56de\u590d</a>' : "") + (0 <= this.isAdmin ? '      <a class="jubao">\u4e3e\u62a5</a>' : "") + "                        </p>                    </div>                </div>            </li>").attr("id", "l_id_" + e.rpid).appendTo(l);
            e.member.vip && (2 == e.member.vip.vipType && 1 == e.member.vip.vipStatus && 2 != e.member.vip.vipStatus) && d.find(".re_cnt a.name").eq(0).addClass("b-vip-red");
            var k = this;
            l = d.find(".content");
            var f;
            k.recordToObject(l, e, f || 0);
            1 == k.isAdmin && (f = $('<a href="javascript:;" title="\u88ab\u9690\u85cf\u540e\uff0c\u5176\u4ed6\u7528\u6237\u4f1a\u9ed8\u8ba4\u4e0d\u663e\u793a\u8be5\u8bc4\u8bba" class="no hidefb">\u9690\u85cf\u8be5\u8bc4\u8bba</a>').appendTo(d.find(".info p")).click(function() {
                v(this, k.id, k.type, e.rpid, !0);
                return !1
            }), l = $('<a href="javascript:;" class="yes showfb">\u663e\u793a\u8be5\u8bc4\u8bba</a>').appendTo(d.find(".info p")).click(function() {
                v(this, k.id, k.type, e.rpid, !1);
                return !1
            }), 0 == e.state || 6 == e.state || 2 == e.state ? l.hide() : f.hide());
            0 <= k.isAdmin && (d.find(".jubao").click(function() {
                return u(this, k.id, k.type, e.rpid)
            }), k.bindAgree(d.find(".zan"), e));
            k.pushUser(e.member.mid, d);
            d.find(".re_ta").click(function() { k.re_send_show($(this).parents(".reply").find(".re_send"), $(this).parents(".re_cnt").find(".name").html(), e.rpid, e.root) });
            return d
        },
        loadReply: function(g, f, l, k) {
            "undefined" === typeof k && (k = 1);
            var h = this;
            $.ajax({
                dataType: "jsonp",
                url: i.base + i.list.getChildReply + "?jsonp=jsonp&root=" + l + "&type=" + (4 == h.type ? 4 : "topic" == h.type ? 2 : 1) + "&oid=" + h.id + "&ps=10&pn=" + k + "&r=" + Math.random(),
                success: function(b) {
                    b = b.data;
                    $(f).empty();
                    $(g).empty().attr({ "data-page": k, "data-results": b.page.count });
                    pagelist(g, k, Math.ceil(b.page.count / b.page.size), b.page.count, function(c) { h.loadReply(g, f, l, c) }, null, "mobile" == h.platform ? 1 : 5);
                    for (var a = 0; a < b.replies.length; a++) { h.reply_render(b.replies[a], l, f) }
                    h.checkFeed(h.id);
                    "pc" == h.platform && bindCardEvent(f);
                    $(f).height() > $(window).height() && $(document).scrollTop($(f).offset().top - 5);
                    h.options.useIframe && r();
                    h._trigger("onReplyLoad")
                }
            })
        },
        submitFeedback: function(E, D, C, B) {
            var A = $("#comment_text", D),
                z = A.val();
            if (D.hasClass("state-sending") || D.find(".submit-comment").hasClass("disabled")) {
                return !1
            }
            z = z.replace(RegExp(/\[[^\]]+_[^\]]+\]/g), "");
            z = z.replace(/(^\s*)|(\s*$)/g, "");
            if (1000 < z.length || 3 > z.length) {
                return (new MessageBox).show(E, "\u8bf7\u53d1\u90013\u52301000\u5b57\u4e14\u975e\u7eaf\u8868\u60c5\u7684\u8bc4\u8bba", 3000, "error"), A.parent().addClass("error"), A.addClass("error").focus(), !1
            }
            var p = this,
                l, k;
            !1 !== C && (l = this._quoteID, k = this._rootQuoteID);
            C = { message: $("#comment_text", D).val(), parent: l, root: k || l, type: 1, plat: 1, oid: p.id, type: 1 };
            "topic" == this.type && (C.type = 2);
            4 == this.type && (C.type = 4);
            0 < $("#fb_vcode", D).length && (C.code = $("#fb_vcode", D).val());
            C = {
                url: i.base + i.list.sendReply,
                type: "post",
                dataType: "json",
                data: $.extend(!0, { jsonp: "jsonp" }, C),
                xhrFields: { withCredentials: !0 },
                success: function(h) {
                    if (0 == h.code) {
                        A.val("");
                        if (h.data && 1 == h.data.is_pending) {
                            (new MessageBox).show(E, "\u63d0\u4ea4\u6210\u529f", 2000);
                            return
                        }(new MessageBox).show(E, "\u53d1\u9001\u6210\u529f", 2000);
                        1 != p.page || ("0" != p.orderby || l || "function" == typeof B) || setTimeout(function() { p.load(1) }, 200);
                        if (l) {
                            var e = D.parent(),
                                d = e.find(".re_ul"),
                                b = e.find(".pagelistbox"),
                                g = parseInt(b.attr("data-page")),
                                a = parseInt(b.attr("data-results")) || d.children().length;
                            (e.find(".re_more").length || g) && g != Math.ceil(a / 10) || setTimeout(function() { p.loadReply(b, d, k || l, Math.ceil((a + 1) / 10)) }, 200)
                        }
                        p.removeCaptcha();
                        p._trigger("onSubmit")
                    } else {
                        if (h) {
                            switch (h.code) {
                                case 12014:
                                    e = "\u64cd\u4f5c\u592a\u9891\u7e41\uff0c\u8bf7\u7a0d\u540e\u518d\u8bd5";
                                    break;
                                case 12015:
                                    D.find(".fb-vcode-wrp").length ? (e = "\u9a8c\u8bc1\u7801\u9519\u8bef", $("#fb_vcode").val(""), p.target.find(".tg_send_post .fb-vcode-wrp img").eq(0).click()) : e = "\u8bf7\u586b\u5199\u9a8c\u8bc1\u7801";
                                    p.createCaptcha(D, h.data.url);
                                    break;
                                case 12016:
                                    e = "\u8bc4\u8bba\u5185\u5bb9\u5305\u542b\u654f\u611f\u8bcd";
                                    break;
                                case 12023:
                                    e = "\u77ed\u65f6\u95f4\u5185\u4e0d\u80fd\u53d1\u91cd\u590d\u8bc4\u8bba";
                                    break;
                                case 12026:
                                    e = "\u60a8\u7684\u7b49\u7ea7\u4e0d\u652f\u6301\u53d1\u94fe\u63a5\u54e6";
                                    break;
                                default:
                                    e = "\u53d1\u9001\u5931\u8d25"
                            }(new MessageBox).show(E, e, 3000, "error")
                        } else {
                            (new MessageBox).show(E, "\u53d1\u9001\u5931\u8d25", 3000, "error")
                        }
                    }
                    h && h.data && (h.data.need_captcha ? h.data.url && p.createCaptcha(D, h.data.url) : (p.needCaptcha = !1, p.removeCaptcha()))
                },
                error: function() {
                    (new MessageBox).show(E, "\u53d1\u9001\u5931\u8d25", 2000, "error")
                },
                complete: function() { D.removeClass("state-sending") }
            };
            D.addClass("state-sending");
            utils.browser.lteIE(9) && setTimeout(function() { D.removeClass("state-sending") }, 200);
            postJSONLite(C, "addCommentCallback")
        },
        re_send_show: function(k, g, A, z, p) {
            var n = this,
                l = k.parents(".reply");
            this.setQuoteID(A, z);
            if (0 == k.children().length) {
                if ($(".reply", n.target).each(function(a, d) { d = $(d); "block" == d.css("display") && 0 == d.find(".re_ul").children().length && d[0] != k.parent()[0] ? d.hide() : d[0] == k.parent()[0] && d.show() }), $(".re_send", n.target).hide(), $(".re_send", n.target).children().remove(), $(".comm_send", n.target).html(), k.append(n.emojiDefault), n.checkLogin(k), k.find(".ywz").removeClass("open"), k.find(".biaoqing_box").removeClass("open"), k.show(), this.initEmoji(k), k.find(".ipt-txt").val(""), null != g && s($(".ipt-txt", k).get(0), "\u56de\u590d @" + g + " :"), $(".ipt-txt", k).hover(function() { $(this).parent().addClass("hover") }, function() { $(this).parent().removeClass("hover") }), $(".ipt-txt", k).focusin(function() { $(this).parent().addClass("focus") }).focusout(function() { $(this).parent().removeClass("focus") }), $(".ipt-txt", k).bind("keyup", function() {
                        $(this).parent().removeClass("error");
                        $(this).removeClass("error")
                    }), !this.loginInfo.isLogin) { k.find(".login-link").off("click").on("click", function(b) { UserStatus.isLogin($(this), b) }) }
            } else { null != g ? (k.show(), k.find(".ipt-txt").val(""), s($(".ipt-txt", k).get(0), "\u56de\u590d @" + g + " :")) : "" == k.find(".ipt-txt").val() || k.parent().hasClass("empty") ? (g = 0 == l.find(".re_ul").children().length ? !0 : !1, "none" != k.css("display") ? (k.hide(), g && l.hide()) : (k.show(), g && l.show())) : k.find(".ipt-txt").val("") }
            $("button[type=submit]", k).off("click.submit").on("click.submit", function() {
                if (n.loginInfo.isLogin && UserStatus.checkMoral()) {
                    return n.submitFeedback(this, k, !0, p)
                }
            });
            k.find(".ipt-txt").focus()
        },
        createCaptcha: function(f, e) {
            var h = this.target.find(".tg_send_post"),
                g;
            h.find(".fb-vcode-wrp").length && !e ? g = h.find(".fb-vcode-wrp> img").attr("src") : e && (g = e);
            h.each(function(k, d) {
                var l = $(d);
                l.find(".fb-vcode-wrp").length && l.find(".fb-vcode-wrp").is(":visible") || (l.find(".fb-vcode-wrp").remove(), $('<div class="fb-vcode-wrp">\u9a8c\u8bc1\u7801\uff1a<input type="text" id="fb_vcode" class="b-input" value="" size="6" /><img /></div>').appendTo(l.find(".dcmp_post .dcmp_userinfo")))
            });
            f && (h.find(".fb-vcode-wrp").hide(), $(f).find(".fb-vcode-wrp").show());
            Captcha.setImage(h.find(".fb-vcode-wrp> img"), g, function(b) { 0 != b.code && h.find(".fb-vcode-wrp").remove() })
        },
        removeCaptcha: function() { this.target.find(".tg_send_post .fb-vcode-wrp").remove() },
        createEmoji: function(G) {
            var F = { emoji: '<a>(\u2312\u25bd\u2312)</a><a>\uff08\uffe3\u25bd\uffe3\uff09</a><a>(=\u30fb\u03c9\u30fb=)</a><a>(\uff40\u30fb\u03c9\u30fb\u00b4)</a><a>(\u301c\uffe3\u25b3\uffe3)\u301c</a><a>(\uff65\u2200\uff65)</a><a>(\u00b0\u2200\u00b0)\uff89</a><a>(\uffe33\uffe3)</a><a>\u256e(\uffe3\u25bd\uffe3)\u256d</a><a>( \u00b4_\u309d\uff40)</a><a>\u2190_\u2190</a><a>\u2192_\u2192</a><a>(&lt;_&lt;)</a><a>(&gt;_&gt;)</a><a>(;\u00ac_\u00ac)</a><a>("\u2594\u25a1\u2594)/</a><a>(\uff9f\u0414\uff9f\u2261\uff9f\u0434\uff9f)!?</a><a>\u03a3(\uff9f\u0434\uff9f;)</a><a>\u03a3( \uffe3\u25a1\uffe3||)</a><a>(\u00b4\uff1b\u03c9\uff1b`)</a><a>\uff08/T\u0414T)/</a><a>(^\u30fb\u03c9\u30fb^ )</a><a>(\uff61\uff65\u03c9\uff65\uff61)</a><a>(\u25cf\uffe3(\uff74)\uffe3\u25cf)</a><a>\u03b5=\u03b5=(\u30ce\u2267\u2207\u2266)\u30ce</a><a>(\u00b4\uff65_\uff65`)</a><a>(-_-#)</a><a>\uff08\uffe3\u3078\uffe3\uff09</a><a>(\uffe3\u03b5(#\uffe3) \u03a3</a><a>\u30fd(`\u0414\u00b4)\uff89</a><a>(\u256f\u00b0\u53e3\u00b0)\u256f(\u2534\u2014\u2534</a><a>\uff08#-_-)\u252f\u2501\u252f</a><a>_(:3\u300d\u2220)_</a><a>(\u7b11)</a><a>(\u6c57)</a><a>(\u6ce3)</a><a>(\u82e6\u7b11)</a>', emoji_name: "\u989c\u6587\u5b57" },
                E = G.find(".biaoqing_box"),
                D = $('<div class="emoji-hinter"><span class="emoji-name">\u989c\u6587\u5b57</span></div>'),
                C = $('<a target="_blank" class="emoji-vip-msg b-vip-red">\uff08\u5f00\u901a\u5927\u4f1a\u5458\uff0c\u4e13\u4eab\u7279\u8272\u8868\u60c5\uff09</a>'),
                B = $('<div class="emoji-wrap clearfix"></div>'),
                A = $('<div class="emoji-tabs"><div class="tabs-wrap"><div class="tab-nowrap clearfix"></div></div></div>'),
                z = $('<div class="tab-slider clearfix"><span class="prev"></span><span class="next on"></span></div>'),
                l = A.find(".tab-nowrap"),
                p = {
                    total: 1,
                    current: 0,
                    maxShow: 7,
                    tabWidth: 46,
                    firsrPid: null,
                    slider: function(b) {
                        1 == b && (this.current + this.maxShow < this.total ? (this.current += this.maxShow, z.find(".prev").addClass("on"), this.current + this.maxShow >= this.total && z.find(".next").removeClass("on")) : this.current = this.total - this.maxShow); - 1 == b && (0 <= this.current - this.maxShow ? (this.current -= this.maxShow, z.find(".next").addClass("on"), 0 > this.current - this.maxShow && z.find(".prev").removeClass("on")) : this.current = 0);
                        l.css("left", -this.current * this.tabWidth)
                    },
                    renderDefault: function() {
                        l.append('<a class="emoji-tab tab-i on" data-pid="emoji"><img src="//static.hdslb.com/images/base/emoji-tab-default.png"></a>');
                        B.html(F.emoji)
                    },
                    ajaxEmojiRender: function(I) {
                        var H, n, h, g, k;
                        if (I || !I.code || I.data.length) {
                            for (var b = 0; b < I.data.length; b++) {
                                if (g = "", n = I.data[b], H = n.emojis, $.isArray(H) && H.length && !n.pstate) {
                                    null == p.firsrPid && (p.firsrPid = n.pid);
                                    for (var a = 0; a < H.length; a++) { 1 != H[a].state && (h = H[a], k = (h.name.split("_")[1] || "").slice(0, -1), g += '<span data-emoji-text="' + h.name + '"><img title="' + k + '" alt="' + h.name + '" data-id="' + h.id + '" data-state="' + h.state + '" data-img="' + utils.thumbnail(h.url, 40) + '"></span>') }
                                    F[n.pid] = g;
                                    F[n.pid + "_name"] = n.pname || "";
                                    $("<a>", { "class": "emoji-tab tab-i", "data-pid": n.pid, html: $("<img>", { "data-img": utils.thumbnail(n.purl, 22), alt: n.pname }) }).appendTo(l);
                                    l.width(++p.total * p.tabWidth)
                                }
                            }
                            p.total > p.maxShow && (A.find(".tabs-wrap").append(z), z.on("click", ".prev.on", function() { p.slider(-1) }).on("click", ".next.on", function() { p.slider(1) }));
                            G.find(".ywz").one("click", function() {
                                (new LazyImage({ mode: !1 })).lazy(l);
                                onLoginInfoLoaded(function(c) { c.isLogin && (0 < c.vipType && 0 != c.vipStatus) && l.find('[data-pid="' + p.firsrPid + '"]').eq(0).trigger("click") }, !0)
                            })
                        }
                    }
                };
            p.renderDefault();
            E.append(D, B, A);
            this.emojiDefault = G.find(".tg_send_post").clone();
            this.emojiXHR.done(p.ajaxEmojiRender);
            $(document).on("click.vipmsg", ".emoji-vip-msg", function() {
                var b = $(this).siblings(".emoji-name").text();
                UserStatus.isLogin(this) && $.ajax({ url: "//static.hdslb.com/vip/dist/js/vipPlugin.js", cache: !0, dataType: "script" }).done(function() { new window.vipPopup({ fromid: 14, fromtitle: b }) });
                rec_rp("event", "discuss_openVIPTittle_click")
            });
            TabModule.bind(l, {
                onChange: function(b) {
                    var d = $(b).attr("data-pid");
                    onLoginInfoLoaded(function(c) { c.isLogin && 0 < c.vipType && 0 != c.vipStatus ? D.find(C).remove() : "emoji" != d ? D.append(C) : D.find(C).remove() }, !0);
                    "emoji" != d && (rec_rp("event", "discuss_VIPExpression_show"), rec_rp("event", "discuss_openVIPTittle_show"));
                    D.find(".emoji-name").html(F[d + "_name"]);
                    B.html(F[d]);
                    (new LazyImage({ mode: !1 })).lazy(B)
                }
            })
        },
        createCommentSender: function() {
            if (!this.target.find(".comm_send").length) {
                var h = this,
                    g = $('<div class="comm_send"></div>').appendTo(this.target),
                    p = h.loginInfo && h.loginInfo.isLogin,
                    p = this._sender = $('<div class="tg_send_post"><div class="dcmp_content"><div class="user_face"><img src="' + utils.thumbnail(p ? window.biliLoginStatus.face.replace("_s", "") : "", 48) + '">' + (p && h.loginInfo.pendant && h.loginInfo.pendant.image ? '<div class="face_bg"><img src="' + utils.thumbnail(h.loginInfo.pendant.image, 86) + '" alt="' + h.loginInfo.pendant.name + '" /></div>' : "") + '</div><div id="dcmp_textarea_container" class="dcmp-textarea-container"><i class="b-icon b-icon-triangle-gray-left"></i><textarea cols="80" name="msg" rows="5" id="comment_text"  placeholder="\u8bf7\u81ea\u89c9\u9075\u5b88\u4e92\u8054\u7f51\u76f8\u5173\u7684\u653f\u7b56\u6cd5\u89c4\uff0c\u4e25\u7981\u53d1\u5e03\u8272\u60c5\u3001\u66b4\u529b\u3001\u53cd\u52a8\u7684\u8a00\u8bba\u3002" class="b-input ipt-txt"></textarea><div class="dcmp_post"><div class="ywz-wrapper"><div class="biaoqing_box"></div><a class="ywz"><i></i><span>\u8868\u60c5</span></a></div><div class="dcmp_userinfo"></div></div><div id="textarea_size_tester"></div></div></div></div>').appendTo(g);
                h.tempComment && g.find("#comment_text").val(h.tempComment);
                var n = $('<button type="submit" class="b-btn submit-comment">\u53d1\u8868\u8bc4\u8bba</button>').insertAfter(p.find("#comment_text"));
                h.createEmoji(g);
                h.checkLogin(p);
                n.click(function() { h.loginInfo.isLogin && UserStatus.checkMoral() && h.submitFeedback(this, g, !1) });
                h.initEmoji(g);
                var l = {
                        source: function(d, c) {
                            if (!(m = d.term.match(/@([^\s]+)$/))) {
                                return !1
                            }
                            $.getJSON("//interface.bilibili.com/m/friend_suggest?jsoncallback=?", { term: m[1].replace(/\u3000/g, ""), rnd: Math.random() }, c)
                        },
                        search: function() {
                            if (!(m = this.value.match(/@([^\s]+)$/))) {
                                return !1
                            }
                            var b = m[1];
                            if (255 > b.charCodeAt(0) && 1 > b.length || 20 < b.length) {
                                return !1
                            }
                        },
                        focus: function() {
                            return !1
                        },
                        select: function(d, c) {
                            this.value = this.value.replace(/@([^\s]*)$/, "@" + c.item.value);
                            return !1
                        },
                        appendTo: "#dcmp_textarea_container",
                        position: function() {
                            return { top: $("#textarea_size_tester").outerHeight(), left: $("#textarea_size_tester").outerWidth() % $("#dcmp_textarea_container").outerWidth() }
                        },
                        renderItem: function(d, c) {
                            return $('<li><a style="text-align:left"><img src="' + utils.trimHttp(c.face) + '" style="border: none;height:20px;width: 20px;vertical-align: bottom;padding-right: 5px;}" />"' + c.value + '"</a></li>').addClass("suggest-item").attr("data-value", c.value).appendTo(d)
                        }
                    },
                    k;
                $(".ipt-txt", g).bind("keyup", function(b) {
                    $(this).removeClass("error").parent().removeClass("error");
                    (m = this.value.match(/@([^\s]*)$/)) ? (k = $(".ipt-txt", g).bilibiliSuggestion(l), $("#textarea_size_tester", g).get(0).innerText = this.value.substr(0, this.value.length - m[1].length)) : k && k.destroy()
                });
                $(".ipt-txt", g).hover(function() { $(this).parent().addClass("hover") }, function() { $(this).parent().removeClass("hover") });
                $(".ipt-txt", g).focusin(function() { $(this).parent().addClass("focus") }).focusout(function() { $(this).parent().removeClass("focus") })
            }
        },
        load: function(B, A, z) {
            function p() {
                if (!f._loaded) { F.addClass("b-load-fail").html("<span>\u52a0\u8f7d\u5931\u8d25\uff0c<a>\u70b9\u51fb\u91cd\u8bd5</a></span>").find("a").on("click", function() { f.load(B, A, z) }) }
            }

            function e(g, l) {
                var c = f.target;
                if (12002 === g.code) { f._sender.find(".submit-comment").off("click.commentSubmitMsg").addClass("disabled"), f._sender.find(".login-link-wrp").remove(), f._sender.find("#dcmp_textarea_container").addClass("disabled").prepend($('<div class="login-link-wrp">\u672c\u89c6\u9891\u8bc4\u8bba\u529f\u80fd\u5df2\u5173\u95ed</div>')), F.remove() } else {
                    if (0 !== g.code || "object" != typeof g.data) { p() } else {
                        $(".common .b-head .results").html(g.data.page.acount).show();
                        A && g.data.page && (f.page = B = g.data.page.num);
                        f._loaded = !0;
                        __GetCookie("bbFrontManager") && UserStatus.isLogin() ? f.isAdmin = 2 : window.mid && window.uid && window.mid == window.uid ? f.isAdmin = 1 : UserStatus.isLogin() && (f.isAdmin = 0);
                        c.children().not(".comm_send").remove();
                        g.data.need_captcha ? (f.needCaptcha = !0, f.createCaptcha(c, g.data.url)) : (f.needCaptcha = !1, f.removeCaptcha());
                        var n = $('<div class="c_order"><ul class="b-slt-tab"><li order="0"><a>\u9ed8\u8ba4\u6392\u5e8f</a></li><li order="2"><a>\u6309\u8d5e\u540c\u6570</a></li><li order="1"><a>\u6309\u56de\u590d\u6570</a></li></ul></div>').prependTo(c);
                        $('li[order="' + f.orderby + '"]', n).addClass("on");
                        $("li", n).click(function() {
                            var D = $(this);
                            D.hasClass("on") || ($("li", n).removeClass("on"), D.addClass("on"), f.orderby = D.attr("order"), f.load(1))
                        });
                        var b = $('<ul class="comm_list"></ul>').appendTo(c),
                            a = $('<div class="pagelistbox"></div>').appendTo(c),
                            k = $('<div class="pagelistbox small"></div>').appendTo(n);
                        pagelist(a, B, Math.ceil(g.data.page.count / g.data.page.size), g.data.page.count, function(D) {
                            f.load(D);
                            $(window).scrollTop($(f.target).offset().top + $(".z_top").outerHeight())
                        }, null, 2, !0);
                        "mobile" == f.platform && a.addClass("small");
                        pagelist(k, B, Math.ceil(g.data.page.count / g.data.page.size), g.data.page.count, function(D) { f.load(D) }, null, 2);
                        g.data.replies.length && 0 != g.data.page.acount || $('<div class="no_more">\u6ca1\u6709\u66f4\u591a\u4fe1\u606f</div>').appendTo(b);
                        g.data.top && (g.data.top.content && g.data.page && 1 === g.data.page.num) && (g.data.top.content.message = '<span class="comm-top-stick">\u7f6e\u9876</span>' + g.data.top.content.message, $.isArray(g.data.replies) && g.data.replies.unshift(g.data.top));
                        for (a = 0; a < g.data.replies.length; a++) {
                            "object" == typeof g.data.replies[a] && function(D) {
                                if (D.member && D.content) {
                                    var L = "";
                                    D.member && D.member.official_verify && 0 == D.member.official_verify.type ? L = '<div class="legalize-16-1" style=\'position:absolute;top:50px;left:50px;\' title="\u4e2a\u4eba\u8ba4\u8bc1"></div>' : D.member && (D.member.official_verify && 1 == D.member.official_verify.type) && (L = '<div class="legalize-16-2" style=\'position:absolute;top:50px;left:50px;\' title="\u4f01\u4e1a/\u56e2\u4f53\u8ba4\u8bc1"></div>');
                                    0 === D.root && D.content.message && (D.content.message = D.content.message.replace(/\[[^\[]*]/g, function(M) {
                                        return $("<img>", l[M]).prop("outerHTML") || M
                                    }));
                                    var I = $('<li id="l_id_' + D.rpid + '" class="main-floor"><div class="facebox"><a href="//space.bilibili.com/' + D.member.mid + '" target="_blank" mid="' + D.member.mid + '" card="' + D.member.uname + '"><img src="' + utils.thumbnail(D.member.avatar, 52, 52) + '" class="face"></a><a href="//space.bilibili.com/' + D.member.mid + '" mid="' + D.member.mid + '" target="_blank" class="face_bg" card="' + D.member.uname + '">' + (D.member.pendant && 0 < D.member.pendant.pid ? '<img src="' + utils.thumbnail(D.member.pendant.image, 86) + '" alt="' + D.member.pendant.name + '" />' : "") + L + '</a></div><div class="t"><a href="//space.bilibili.com/' + D.member.mid + '" target="_blank" mid="' + D.member.mid + '" card="' + $("<div/>").text(D.member.uname).html() + '">' + $("<div/>").text(D.member.uname).html() + '</a><a href="//www.bilibili.com/html/help.html#k_3" target="_blank" class="user-info-level l' + (D.member.level_info ? D.member.level_info.current_level : 0) + '"></a>' + (D.member.nameplate && 0 < D.member.nameplate.nid ? '<a href="https://account.bilibili.com/site/nameplate" target="_blank" class="member-nameplate" nameplate-id="' + D.member.nameplate.nid + '"><img src="' + utils.thumbnail(D.member.nameplate.image_small, 32) + '" alt="' + D.member.nameplate.name + '" /></a>' : "") + '</div><div class="content"></div><div class="elinfo"><span class="floor-num">#' + D.floor + "</span>" + (D.content.plat && 1 < D.content.plat ? '<span class="floor-plat">\u6765\u81ea<a href="//app.bilibili.com/" target="_blank">' + ("2" == D.content.plat ? "\u5b89\u5353\u5ba2\u6237\u7aef" : "") + ("3" == D.content.plat ? "iOS\u5ba2\u6237\u7aef" : "") + ("4" == D.content.plat ? "Windows Phone\u5ba2\u6237\u7aef" : "") + "</a></span>" : "") + '<span class="floor-date">' + t(D.ctime) + '</span></span><i class="report"></i></div></li>').appendTo(b);
                                    D.member.vip && (2 == D.member.vip.vipType && 0 != D.member.vip.vipStatus && 2 != D.member.vip.vipStatus) && I.find(".t > a").eq(0).addClass("b-vip-red");
                                    f.pushUser(D.member.mid, I);
                                    L = I.find(".content");
                                    f.recordToObject(L, D);
                                    if (null != D.replies) {
                                        for (var H = $('<div class="reply"><ul class="re_ul"></ul><div class="re_box">' + (5 < D.rcount ? '<p class="re_more"><span>\u8fd8\u6709<b>' + (D.rcount - 5) + '</b>\u6761\u56de\u590d\uff0c</span><a class="re_more_s">\u70b9\u51fb\u67e5\u770b</a></p>' : "") + '<div class="re_page">   <div class="pagelistbox small">   </div></div></div><div class="re_send"></div></div>').appendTo(I), K = $(".re_ul", H), E = 1, L = 0; L < D.replies.length; L++) { f.reply_render(D.replies[L], D.rpid, K), A && (D.replies[L].rpid == A && g.data.page.rt_num) && (E = g.data.page.rt_num) }
                                        $(".re_more_s", H).click(function() {
                                            $(".re_more", H).remove();
                                            f.loadReply($(".pagelistbox", H), K, D.rpid, E)
                                        })
                                    }
                                    var L = I.find(".report"),
                                        G, J = $('<a href="javascript:;" class="huifu">\u56de\u590d</a>').appendTo(L).click(function() {
                                            0 == I.find(".reply").length ? (G = $('<div class="reply"><ul class="re_ul"></ul><div class="re_box"><p class="j_re"><a class="re_send_s" href="javascript:;">\u53c2\u4e0e\u56de\u590d</a></p><div class="re_page"> <div class="pagelistbox"></div></div></div><div class="re_send"></div></div>').appendTo(I), $(".re_box", G).hide(), $(".re_send_s", G).click(function() { f.re_send_show(G.find(".re_send"), null, D.rpid) })) : G = I.find(".reply");
                                            G.find(".re_ul");
                                            f.re_send_show(G.find(".re_send"), null, D.rpid)
                                        });
                                    D.replies && D.replies.length && J.addClass("reply-b").text("\u53c2\u4e0e\u56de\u590d");
                                    0 <= f.isAdmin && ($('<a class="jubao">\u4e3e\u62a5</a>').appendTo(L).click(function() {
                                        return u(this, f.id, f.type, D.rpid)
                                    }), f.bindAgree($('<a href="javascript:;" class="zan"></a>').prependTo(L), D));
                                    1 == f.isAdmin && (J = $('<a href="javascript:;" title="\u88ab\u9690\u85cf\u540e\uff0c\u5176\u4ed6\u7528\u6237\u4f1a\u9ed8\u8ba4\u4e0d\u663e\u793a\u8be5\u8bc4\u8bba" class="no hidefb">\u9690\u85cf\u8be5\u8bc4\u8bba</a>').appendTo(L).click(function() {
                                        v(this, h, f.type, D.rpid, !0);
                                        return !1
                                    }), L = $('<a href="javascript:;" class="yes showfb">\u663e\u793a\u8be5\u8bc4\u8bba</a>').appendTo(L).click(function() {
                                        v(this, h, f.type, D.rpid, !1);
                                        return !1
                                    }), 0 == D.state || 6 == D.state || 2 == D.state ? L.hide() : J.hide())
                                }
                            }(g.data.replies[a])
                        }
                        f.checkFeed(f.id);
                        "pc" == f.platform && (bindCardEvent(c), bindNameplateEvent(c));
                        "function" == typeof z && z(c);
                        f.options.useIframe && r();
                        f._trigger("onLoad")
                    }
                }
            }
            this.page = B;
            var h = this.id;
            B = this.page;
            var f = this,
                C = 4 == f.type ? 4 : "topic" == f.type ? 2 : 1,
                d = i.base + i.list.getReply + "?jsonp=jsonp&type=" + C + "&sort=" + f.orderby + "&oid=" + f.id + "&pn=" + B + "&r=" + Math.random() + "&nohot=1";
            A && (d = i.base + i.list.getPosition + "?jsonp=jsonp&rpid=" + A + "&type=" + C + "&oid=" + f.id + "&pn=" + B + "&r=" + Math.random() + "&nohot=1");
            this.target.find(".b-loading").remove();
            if (!f._loaded) {
                var F = $('<div class="b-loading"></div>').appendTo(this.target)
            }
            $.when($.ajax({ dataType: "jsonp", url: d }).fail(function() { p() }), $.ajax({ url: "//api.bilibili.com/x/v2/reply/emojis", dataType: "jsonp", data: { jsonp: "jsonp" }, cache: !0, jsonpCallback: "jsonp_z_emoji" })).done(function(l, k) {
                var H = {},
                    G = k[0];
                if (G && !G.code && G.data.length) {
                    for (var E = 0; E < G.data.length; E++) {
                        var D = G.data[E].emojis;
                        if ($.isArray(D) && D.length) {
                            for (var n = 0; n < D.length; n++) { H[D[n].name] = { "class": "b-vip-emoji", title: (D[n].name.split("_")[1] || "").slice(0, -1), src: utils.thumbnail(D[n].url, 50), alt: D[n].name } }
                        }
                    }
                }
                onLoginInfoLoaded(function(b) { 1 === b.vipStatus && f.emojiXHR.resolve(G) }, !0);
                e(l[0], H)
            })
        },
        show: function(g, f, l, k) {
            var h = this;
            "undefined" === typeof f && (f = 1);
            "function" == typeof l && (k = l, l = null);
            this.page = f;
            this.id = g;
            this.id_name = "aid";
            switch (this.type) {
                case "topic":
                    this.id_name = "tp_id";
                    break;
                case "news":
                    this.id_name = "news_id"
            }
            if (!this.options.autoLoad || l) { $("#load_comment").remove(), $(this.target).show(), this.createCommentSender(), this.load(f, l, k) } else {
                if (this._checkAutoLoad()) { this.load(f, l, k) } else { $(window).on("scroll.comment-autoload", function() { h._checkAutoLoad() && (h.load(f, l, k), $(window).off("scroll.comment-autoload")) }) }
            }
        },
        setQuoteID: function(d, c) {
            this._quoteID = d || void 0;
            this._rootQuoteID = c || void 0
        },
        _checkAutoLoad: function() {
            return $(window).scrollTop() + $(window).height() - 200 > this.target.offset().top
        },
        _scrollToTop: function() { $(this.bindWindow).scrollTop($(this.bindTarget).offset().top) },
        _trigger: function() {
            var d = Array.prototype.slice.call(arguments, 0),
                c = d.shift();
            if (this.options[c]) {
                return this.options[c].apply(this, d)
            }
        }
    };
    return j
}();

function resetAttentionCache() { CacheManager.reset("AttentionList") }
var CacheManager = {
    map: { biliLoginStatus: 1, AttentionList: 2, last_fav: 4, BangumiFavList: 5 },
    register: function(b, d) { this.map[b] = d },
    reset: function(f) {
        try {
            if (this.getItem(f) && window.sessionStorage && window.sessionStorage.bili_login_status) {
                var h = this.map[f],
                    e = JSON.parse(window.sessionStorage.bili_login_status);
                e[h] = this.getItem(f);
                window.sessionStorage.bili_login_status = JSON.stringify(e)
            }
        } catch (g) {}
    },
    getItem: function(b) {
        return window[b]
    },
    removeItem: function(e, f) {
        if (this.getItem(e)) {
            var d = $.inArray(f, this.getItem(e));
            0 <= d && (this.getItem(e).splice(d, 1), this.reset(e))
        }
    },
    addItem: function(b, d) { this.getItem(b) && (this.getItem(b).unshift(d), this.reset(b)) }
};

function attentionUser(e, f, d) {
    if (!UserStatus.isLogin(e)) {
        return !1
    }
    Bilibili.attentionUser(e, f, function(a) {-665 == a.code ? $.getScript("//static.hdslb.com/plugins/attentionLimitPopup/attentionLimitPopup.js", function() { new attentionLimitPopup }) : 0 == a.code ? (window.AttentionList.push(f), resetAttentionCache(), "undefined" != typeof d && d(a)) : (new MessageBox).show(e, a.msg, 2000, "warning") })
}

function unattentionUser(e, f, d) {
    if (!UserStatus.isLogin(e)) {
        return !1
    }
    Bilibili.delFriend(e, f, function(b) {
        if (0 == b.code) {
            var a = window.AttentionList.indexOf(f); - 1 != a && (window.AttentionList.splice(a, 1), resetAttentionCache());
            "undefined" != typeof d && d(b)
        } else {
            (new MessageBox).show(e, b.msg, 2000, "warning")
        }
    })
}

function showSpAdbtn(f, h, e) {
    var g;
    if ((h = void 0 !== h ? h : window.spid) || e) { "1" == f ? (g = $('<p class="b-btn w">\u5df2\u8ba2\u9605</p>').on("click", function() { void 0 !== e ? Subscribe.bangumi(this, e, !1, function() { showSpAdbtn("0", h, e) }) : Subscribe.sp(this, h, !1, function() { showSpAdbtn("0", h, e) }) }), g.hover(function() { g.html("\u53d6\u6d88\u8ba2\u9605") }, function() { g.html("\u5df2\u8ba2\u9605") })) : g = $('<p class="b-btn dy">\u8ba2\u9605</p>').on("click", function() { void 0 !== e ? Subscribe.bangumi(this, e, !0, function() { showSpAdbtn("1", h, e) }) : Subscribe.sp(this, h, !0, function() { showSpAdbtn("1", h, e) }) }), $("#sp_dingyue").empty().append(g) }
}
var Subscribe = {
    sp: function(f, h, e, g) { this._toggle("sp", f, h, e, g) },
    bangumi: function(f, h, e, g) { this._toggle("bangumi", f, h, e, g) },
    _toggle: function(h, l, g, k, j) {
        if (UserStatus.isLogin(l)) {
            var i = this;
            ("bangumi" == h ? $.get("/api_proxy?app=bangumi", { action: k ? "concern_season" : "unconcern_season", season_id: g }, function(b) { 0 == b.code ? (k ? CacheManager.addItem("BangumiFavList", g.toString()) : CacheManager.removeItem("BangumiFavList", g.toString()), i._success(l, k, b, j)) : i._fail() }) : $.get("/spadmin", { action: k ? "attention" : "unfavourite", spid: g }, function(b) { "OK" == b ? (k ? CacheManager.addItem("AttentionList", -g) : CacheManager.removeItem("AttentionList", -g), i._success(l, k, b, j)) : i._fail() })).fail(function() { i._fail() })
        }
    },
    _success: function(f, h, e, g) { h ? (new MessageBox).show(f, "\u8ba2\u9605\u6210\u529f!", 1000) : (new MessageBox).show(f, "\u53d6\u6d88\u8ba2\u9605\u6210\u529f!", 1000); "undefined" != typeof g && g(e) },
    _fail: function() {
        (new MessageBox).show(btn, "\u8bf7\u6c42\u53d1\u751f\u9519\u8bef(\u00b4\u30fb\u03c9\u30fb\uff40)", 1500, "error")
    }
};

function postJSONLite(b, d) { $.browser.msie && 9 >= parseInt($.browser.version) ? (b.data.script = "script", b.callback = d, postJSON(b)) : $.ajax(b) }

function postJSON(g) {
    Bilibili.initCrossdomain();
    var j = g.callback || "_jsonpCallback_" + (new Date).getTime(),
        f = $('<iframe name="frm' + j + '" id="frm' + j + '" style="visibility:hidden; width:1px; height:1px"></iframe>').appendTo("body"),
        i = $('<form action="' + g.url + '" method="POST" target="frm' + j + '"></form>').appendTo("body");
    "undefined" == typeof g.data && (g.data = {});
    g.data.csrf = utils.cookie.get("bili_jct");
    g.data[g.jsonpCallback || "callback"] = j;
    for (var h in g.data) { $('<input type="hidden" name="' + h + '" />').appendTo(i).val(g.data[h]) }
    window[j] = function(a) {
        "function" == typeof g.success && g.success(a);
        "function" == typeof g.complete && g.complete(a);
        f.remove();
        i.remove()
    };
    i.submit()
}
var Bilibili = {
    initCrossdomain: function() { window.location.href.match(/\.bilibili\.tv/) ? (Bilibili.interface_domain = "interface.bilibili.tv", document.domain = "bilibili.tv") : window.location.href.match(/\.bilibili\.com/) ? (Bilibili.interface_domain = "interface.bilibili.com", document.domain = "bilibili.com") : (Bilibili.interface_domain = "interface.bilibili.cn", document.domain = "bilibili.cn") },
    badlistUser: function(e, f, d) {
        Bilibili.initCrossdomain();
        "function" == typeof f ? (d = f, f = e, e = null) : "undefined" == typeof f && (f = e, e = null);
        postJSON({ url: "//" + Bilibili.interface_domain + "/m/friend_manage.do", data: { act: "add_badlist", format: "json", uid: f }, success: function(a) { "undefined" == typeof d ? 0 == a.code ? (new MessageBox).show(e, "\u9ed1\u540d\u5355\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : d(a) } })
    },
    attentionUser: function(e, f, d) {
        Bilibili.initCrossdomain();
        "function" == typeof f ? (d = f, f = e, e = null) : "undefined" == typeof f && (f = e, e = null);
        postJSON({ url: "//" + Bilibili.interface_domain + "/m/friend_manage.do", data: { act: "add", attention: 1, format: "json", uid: f }, success: function(a) { "undefined" == typeof d ? 0 == a.code ? (new MessageBox).show(e, "\u5173\u6ce8\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : d(a) } })
    },
    whisperUser: function(e, f, d) {
        Bilibili.initCrossdomain();
        "function" == typeof f ? (d = f, f = e, e = null) : "undefined" == typeof f && (f = e, e = null);
        postJSON({ url: "//" + Bilibili.interface_domain + "/m/friend_manage.do", data: { act: "add", attention: 0, format: "json", uid: f }, success: function(a) { "undefined" == typeof d ? 0 == a.code ? (new MessageBox).show(e, "\u5173\u6ce8\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : d(a) } })
    },
    delFriend: function(e, f, d) {
        Bilibili.initCrossdomain();
        "function" == typeof f ? (d = f, f = e, e = null) : "undefined" == typeof f && (f = e, e = null);
        postJSON({ url: "//" + Bilibili.interface_domain + "/m/friend_manage.do", data: { act: "del", attention: 0, format: "json", uid: f }, success: function(a) { "undefined" == typeof d ? 0 == a.code ? (new MessageBox).show(e, "\u5220\u9664\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : d(a) } })
    },
    delFans: function(e, f, d) {
        Bilibili.initCrossdomain();
        "function" == typeof f ? (d = f, f = e, e = null) : "undefined" == typeof f && (f = e, e = null);
        postJSON({ url: "//" + Bilibili.interface_domain + "/m/friend_manage.do", data: { act: "delFans", attention: 0, format: "json", uid: f }, success: function(a) { "undefined" == typeof d ? 0 == a.code ? (new MessageBox).show(e, "\u5220\u9664\u6210\u529f!", 1000, "ok") : (new MessageBox).show(e, a.msg, 2000, "warning") : d(a) } })
    }
};

function sendCommand(h, l, g, k, j) {
    var i = j || "\u547d\u4ee4\u6267\u884c\u6210\u529f";
    return (new MessageBox).show(h, l, "button", function(a) {
        $.ajax({
            url: g,
            data: k,
            type: "POST",
            dataType: "html",
            success: function(c) {
                (new MessageBox).show(h, "OK" == c ? i : c, "OK" == c ? 500 : 2000, "OK" == c ? "info" : "warning")
            },
            error: function() {
                (new MessageBox({ Overlap: !0, position: a.position })).show(h, "\u63d0\u4ea4\u5931\u8d25\uff0c\u53ef\u80fd\u6743\u9650\u4e0d\u8db3", 2000, "error")
            }
        })
    })
}
var UserCard = function() {
        function D(b) {
            i.offset().top > $(window).scrollTop() + 244 ? E.css("top", i.offset().top - 244 + "px") : E.css("top", i.offset().top + 68 + "px");
            i.offset().left + $(".a-layer").outerWidth() > $(window).width() ? E.css("left", i.offset().left - 5 - (i.offset().left + $(".a-layer").outerWidth() - $(window).width()) + "px") : E.css("left", i.offset().left + "px");
            E.mouseenter(function() { clearTimeout(j) });
            E.mouseleave(o)
        }

        function B(a) {
            clearTimeout(r);
            G && ($(".a-layer").remove(), E = $('<div class="a-layer"><div class="content"><div class="bg_top"></div><div class="msg">' + a + "</div></div></div>").appendTo("body"), D())
        }

        function C(d) {
            var c = d.data.card;
            d = d.data.space;
            clearTimeout(r);
            G && "undefined" == typeof c.mid ? B("\u62b1\u6b49\uff0c\u8be5\u6635\u79f0\u76ee\u524d\u4e0d\u5b58\u5728\u54e6(*^__^*)") : (c.top_photo = "//i0.hdslb.com/bfs/static/c9dae917e24b4fc17c4d544caf6b6c0b17f8692b.jpg", d && d.s_img && (c.top_photo = d.s_img), A(c))
        }

        function A(a) {
            if (G) {
                F[a.name] = a;
                $(".a-layer").remove();
                var h = "";
                if ("\u7537" == a.sex || "\u5973" == a.sex) { h = '<i class="b-icon sex ' + ("\u7537" == a.sex ? "male" : "\u5973" == a.sex ? "female" : "") + '" title="' + a.sex + '" ></i>' }
                var g = "",
                    e = a.sign;
                a.official_verify && (0 == a.official_verify.type ? (g = '<div class="legalize-icon legalize-16-1" style="left:31px;top:126px; position:absolute;z-index:30" title="\u4e2a\u4eba\u8ba4\u8bc1"></div>', e = a.official_verify.desc) : 1 == a.official_verify.type && (g = '<div class="legalize-icon legalize-16-2" style="left:31px;top:126px; position:absolute;z-index:30" title="\u4f01\u4e1a/\u56e2\u4f53\u8ba4\u8bc1"></div>', e = a.official_verify.desc));
                E = $('<div class="a-layer">' + (a.pendant && a.pendant.image ? '<a href="https://account.bilibili.com/site/face" target="_blank" class="user-pendant"></a>' : "") + '<div class="content main"><div class="user-top-photo" style="background-image:url(' + utils.webp(utils.trimHttp(a.top_photo), { h: 120 }) + ');background-position: center;background-size: cover;"></div><a class="user-face" href="//space.bilibili.com/' + a.mid + '" target="_blank"><img src="' + utils.thumbnail(a.face, 52) + '" /></a>' + g + '<div class="layer-row"><a class="user-name" href="//space.bilibili.com/' + a.mid + '" target="_blank">' + a.name + "</a>" + h + '<a href="//www.bilibili.com/html/help.html#k_4" target="_blank" class="user-info-level border l' + a.level_info.current_level + '"></a></div><div class="layer-row"><a class="layer-link" href="//space.bilibili.com/' + a.mid + '/#!/fans/follow" target="_blank">\u5173\u6ce8\uff1a' + a.attention + '</a><a class="layer-link" href="//space.bilibili.com/' + a.mid + '/#!/fans/fans" target="_blank">\u7c89\u4e1d\uff1a' + utils.formatNum(a.fans) + "</a></div>" + (e ? '<div class="layer-row sign">' + e + "</div>" : "") + '</div><div class="layer-bottom"><span href="javascript:void(0);" class="layer-follow-btn b-btn"></span><a class="layer-message-btn b-btn-cancel" href="//message.bilibili.com/#whisper/mid' + a.mid + '" target="_blank">\u79c1\u4fe1</a></div></div>').appendTo("body");
                E.find(".layer-follow-btn").html(z(a));
                a.vip && (2 == a.vip.vipType && 0 != a.vip.vipStatus && 2 != a.vip.vipStatus) && E.find("a.user-name").addClass("b-vip-red");
                D(a.pendant)
            } else { F[a.name] = a }
        }

        function z(h) {
            var e = !1,
                p = !1,
                n, l = function() { E.find(".layer-follow-btn").html(z(h)) };
            if ("undefined" != typeof window.AttentionList && "null" != typeof window.AttentionList) {
                for (var k = 0; k < window.AttentionList.length; k++) {
                    if (window.AttentionList[k] == h.mid) {
                        p = !0;
                        break
                    }
                }
            }
            if ("undefined" != typeof h.attentions && "null" != typeof h.attentions) {
                for (k = 0; k < h.attentions.length; k++) {
                    if (h.attentions[k] == window.uid) {
                        e = !0;
                        break
                    }
                }
            }
            p && e ? (n = $('<a href="javascript:;">\u4e92\u76f8\u5173\u6ce8</a>'), n.filter("a").on({ click: function() { unattentionUser(this, h.mid, l) }, mouseenter: function() { $(this).html("\u53d6\u6d88\u5173\u6ce8") }, mouseleave: function() { $(this).html("\u4e92\u76f8\u5173\u6ce8") } })) : p ? e || (n = $('<a href="javascript:;">\u5df2\u5173\u6ce8</a>'), n.filter("a").on({ click: function() { unattentionUser(this, h.mid, l) }, mouseenter: function() { $(this).html("\u53d6\u6d88\u5173\u6ce8") }, mouseleave: function() { $(this).html("\u5df2\u5173\u6ce8") } })) : (n = $('<a href="javascript:;">+\u5173\u6ce8</a>'), n.on("click", function() { attentionUser(this, h.mid, l) }));
            return n
        }

        function y() {
            clearTimeout(r);
            B('<span class="loading">\u52a0\u8f7d\u5931\u8d25</span>')
        }

        function x(b, c) {
            i = $(b);
            clearTimeout(r);
            r = setTimeout(y, 5000);
            B('<span class="loading">\u6b63\u5728\u52a0\u8f7d\u4e2d,\u8bf7\u7a0d\u5019..</span>');
            F[c] ? (clearTimeout(r), A(F[c])) : $.ajax({ url: "//api.bilibili.com/cardrich", dataType: "jsonp", data: { mid: c, type: "jsonp" }, type: "GET", success: function(d) { 0 === d.code && C(d) }, error: function() { y() } })
        }

        function t(d, c) {
            clearTimeout(j);
            G = !0;
            j = setTimeout(function() { x(d, c) }, 500)
        }

        function o() {
            clearTimeout(j);
            G = !1;
            j = setTimeout(function() { $(".a-layer").remove() }, 100)
        }

        function s(b) { "undefined" != typeof b ? $(b).find("a[card]").mouseenter(function() { $(this).text() && -1 != $(this).text().indexOf("@") || t(this, $(this).attr("mid")) }).mouseleave(o) : $("a[card]").mouseenter(function() { $(this).text() && -1 != $(this).text().indexOf("@") || t(this, $(this).attr("mid")) }).mouseleave(o) }
        var j = null,
            r = null,
            i = null,
            E, F = {},
            G = !1;
        window.ShowCard = C;
        window.bindCardEvent = s;
        return { show: C, bind: s }
    }(),
    NameplateCard = function() {
        function A() {
            "top" == o.attr("direction") ? s.css("top", o.offset().top - s.outerHeight() + 40 + "px") : s.css("top", o.offset().top + "px");
            o.offset().left + $(".a-layer").outerWidth() + o.width() + 5 > $(window).width() ? s.css("left", o.offset().left - 5 - $(".a-layer").outerWidth() + "px") : s.css("left", o.offset().left + o.width() + 5 + "px");
            s.mouseenter(function() { clearTimeout(t) });
            s.mouseleave(v)
        }

        function y(a) { i && ($(".a-layer").remove(), s = $('<div class="a-layer"><div class="content"><div class="bg_top"></div><div class="msg">' + a + "</div></div></div>").appendTo("body"), A()) }

        function z(a, c) { i && "undefined" == typeof a.name ? y("\u62b1\u6b49\uff0c\u8be5\u94ed\u724c\u76ee\u524d\u4e0d\u5b58\u5728\u54e6(*^__^*)") : i ? (j[c] = a, $(".a-layer").remove(), s = $('<div class="a-layer brand" style="margin-left: 7px;"><div class="arrow"></div><div class="brand_content"><div class="nameplate-image"><img src="' + utils.thumbnail(a.image, 64) + '" alt="' + a.name + '" /></div><div class="nameplate-content"><div class="nameplate-name">' + a.name + '</div><div class="nameplate-condition">' + a.condition + '</div><div class="nameplate-level"><span>' + a.level + '</span><a href="https://account.bilibili.com/site/nameplate" target="_blank">\u67e5\u770b\u5168\u90e8&gt;</a></div></div></div></div></div>').appendTo("body"), A()) : j[c] = a }

        function x(b, c) {
            o = $(b);
            y('<span class="loading">\u6b63\u5728\u52a0\u8f7d\u4e2d,\u8bf7\u7a0d\u5019..</span>');
            j[c] ? z(j[c], c) : r = $.ajax({ url: utils.protocolRelative("//account.bilibili.com/api/nameplate/getNameplateInfo"), type: "get", dataType: "jsonp", data: { nid: c, type: "jsonp" }, xhrFields: { withCredentials: !0 }, success: function(d) { d && 0 == d.code && d.data ? z(d.data, c) : y('<span class="loading">\u52a0\u8f7d\u5931\u8d25</span>') }, error: function() { y('<span class="loading">\u52a0\u8f7d\u5931\u8d25</span>') } })
        }

        function w(d, c) {
            clearTimeout(t);
            i = !0;
            t = setTimeout(function() { x(d, c) }, 300)
        }

        function v() {
            clearTimeout(t);
            i = !1;
            t = setTimeout(function() {
                r && "function" == typeof r.abort && r.abort();
                $(".a-layer").remove()
            }, 100)
        }

        function u(b) { "undefined" != typeof b ? $(b).find("a[nameplate-id]").mouseenter(function() { w(this, $(this).attr("nameplate-id")) }).mouseleave(v) : $("a[nameplate-id]").mouseenter(function() { w(this, $(this).attr("nameplate-id")) }).mouseleave(v) }
        var t = null,
            o = null,
            s, j = {},
            r = null,
            i = !1;
        window.ShowNameplate = z;
        window.bindNameplateEvent = u;
        return { show: z, bind: u }
    }();

function bindPOCoins2(w, u) {
    function v(d, c) {
        void 0 === d.attr(c) && (c = t + c);
        return d.attr(c)
    }
    var t = "data-";
    $.browser.msie && w.addClass("snti");
    var s = 0,
        r, q, o = function(f, e) {
            var h = f.offset().left,
                g = f.offset().top - e.outerHeight() - 5;
            h > $(window).width() - e.outerWidth() && (h = $(window).width() - e.outerWidth());
            e.css({ left: h, top: g })
        },
        j = function(f, e) {
            $("#video_preview_pic").remove();
            var h = $('<div class="v-preview-pic" id="video_preview_pic"></div>').appendTo("body").hide(),
                g = $("<img />").appendTo(h);
            g.on("load", function() {
                o(f, h);
                h.fadeIn(300)
            });
            g.attr("src", utils.trimHttp(e));
            clearTimeout(r)
        },
        l = function() {
            s = 0;
            clearInterval(r);
            q = setTimeout(function() { s || (clearTimeout(q), $(".ov-box, #video_preview_pic").remove()) }, 100)
        },
        i = function() {
            var b = $(this);
            s = 1;
            r = setTimeout(function() {
                if (b.attr("data-view") && "loaded" != b.attr("data-view")) { j(b, "//www.bilibili.com/widget/ajaxGetVideoInfo?aid=" + b.attr("data-view")) } else {
                    if (1 == s) {
                        $(".ov-box").remove();
                        var a = $('<div class="ov-box"><div class="ov"><div class="title"></div><div class="v-info"><span class="v-info-author"></span><span class="s-line"></span><span class="v-info-date"></span></div><div class="v-preview"><img><p class="txt"></p></div><div class="v-data"><span class="gk"><i class="b-icon b-icon-v-play"></i>' + utils.formatNum(v(b, "gk")) + '</span><span class="dm"><i class="b-icon b-icon-v-dm"></i>' + utils.formatNum(v(b, "dm")) + '</span><span class="sc"><i class="b-icon b-icon-v-fav"></i>' + utils.formatNum(v(b, "sc")) + '</span><span class="coin"><i class="b-icon b-icon-v-coin"></i>' + utils.formatNum(v(b, "yb")) + "</span></div></div></div>").prependTo("body");
                        o(b, a);
                        a.find(".v-preview > .txt").html(v(b, "txt"));
                        a.find(".ov > .title").html(v(b, "title") || b.find(".t").html());
                        a.find(".v-info > .v-info-date").html(v(b, "tg"));
                        a.find(".v-info > .v-info-author").html(v(b, "up"));
                        a.find(".v-preview > img").attr("src", utils.trimHttp(v(b, "pic") || b.find("img").attr("src")));
                        a.fadeIn(300);
                        clearTimeout(r)
                    }
                }
            }, 500)
        };
    w.each(function(b, n) {
        var k = $(n),
            h, c;
        if (v(k, "gk") || k.attr("data-view")) {
            if ($(n).parents(".rlist").length && k.hover(i, l), "undefined" === typeof u || !1 !== u) { c = parseInt(v(k, "yb")), 2000 <= c && 10000 > c ? h = 200 : 10000 <= c && (h = 300), h && (k.hasClass("v") ? k.addClass("m" + h) : k.find(".v").addClass("m" + h)) }
        }
    })
}
var bindVideoPreview = bindPOCoins2;
window.loginCallbacks = [];

function onLoginInfoLoaded(b, d) { "undefined" != typeof window.biliLoginStatus ? (b(window.biliLoginStatus), !0 === d && window.loginCallbacks.push(b)) : window.loginCallbacks.push(b) }
var UserStatus = function() {
    return {
        callbacks: window.loginCallbacks,
        status: function() {
            return window.biliLoginStatus
        },
        isLogin: function(b, d) {
            if (this.status() && this.status().isLogin) {
                return !0
            }
            this.status() && "undefined" != typeof b && (!1 !== d ? this.quickLogin(d) : (new MessageBox).show(b, '\u8bf7\u5148<a href="https://account.bilibili.com/login" target="_blank">\u767b\u5f55</a>', 1500));
            return !1
        },
        checkMoral: function() {
            return null != this.status().moral && 60 > this.status().moral ? !1 : !0
        },
        level: function() {
            return this.status().level_info ? this.status().level_info.current_level : null
        },
        onLoaded: window.onLoginInfoLoaded,
        quickLogin: function(b, d) {
            1 == arguments.length && "object" == typeof b && (d = b, b = null);
            d && d.preventDefault();
            !browser.version.mobile || browser.version.iPad ? RequireModule.getScript("biliQuickLogin", "https://static-s.bilibili.com/account/bili_quick_login.js", function() { window.biliQuickLogin(function() {!1 !== b ? setTimeout(function() { loadLoginStatus(!0); "function" == typeof b && b() }, 1) : window.location.reload() }) }) : location.href = "https://passport.bilibili.com/login"
        }
    }
}();

function loadLoginInfo(f, h) {
    window.biliLoginStatus = f;
    f.isLogin || RequireModule.getScript("biliQuickLogin", "https://static-s.bilibili.com/account/bili_quick_login.js", function() {
        $("#i_menu_login_btn a.login").on("click", function(b) {
            b.preventDefault();
            window.biliQuickLogin(function() { loadLoginStatus(!0) })
        })
    });
    try {
        if (!h && window.sessionStorage) {
            var e = [(new Date).getTime() + 120000];
            e.push(f);
            e.push(window.AttentionList);
            e.push(window.uid);
            e.push(window.last_fav);
            e.push(window.BangumiFavList);
            window.sessionStorage.bili_login_status = JSON.stringify(e)
        }
    } catch (g) {}
    for (e = 0; e < loginCallbacks.length; e++) { loginCallbacks[e](f), f.isLogin && (loginCallbacks.splice(e, 1), e--) }
}

function onLoginNavigator(h) {
    if ($(".z_top").length) {
        if (h.isLogin) {
            var l, g = 0;
            for (l in h.dynamic) { g += parseInt(h.dynamic[l]) }
            h.dynTotalNum = g;
            !$("#i_menu_community_msg_btn").length && $("#i_menu_msg_btn").length && $('<li id="i_menu_community_msg_btn" guest="no" i_menu="community_msg" class="u-i">                <a class="i-link" href="//message.bilibili.com" target="_blank">\u6d88\u606f</a>            </li>').insertAfter("#i_menu_profile_btn");
            $('li[guest="no"]').show();
            $('li[guest="yes"]').hide();
            $(".i_face").attr("src", utils.trimHttp(h.face.replace("_s", "_m")));
            1 == h.accessStatus && (new Date).getTime() + 604800000 > h.vipDueDate && (new Date).getTime();
            $("#i_menu_become_vip").click(function() { rec_rp("event", "nav_getvip") });
            g = $("#i_menu_profile");
            l = { 1: "\u5927\u4f1a\u5458", 2: "\u5e74\u5ea6\u5927\u4f1a\u5458" };
            $(".uname", g).html("<b>" + h.uname + "</b>");
            h.vipType && 0 != h.vipStatus && (2 == h.vipType && 2 != h.vipStatus && $(".uname > b", g).addClass("b-vip-red"), l[h.vipType] && 2 != h.vipStatus && $(".uname", g).append('<div class="layer-row"><a href="//big.bilibili.com/site/big.html" target="_blank"><span class="vip-hinter" data-vip-type="' + h.vipType + '">' + l[h.vipType] + "</span></a></div>"));
            l = "top:65px;right:-16px;";
            h.pendant && h.pendant.image && (l = "top:52px;right:-6px;");
            var k = "";
            1 != h.vipType && 2 != h.vipType || 1 != h.vipStatus ? $("#i_menu_become_vip a").hide() : ($("#i_menu_become_vip a").text("\u5927\u4f1a\u5458"), $.ajax({ url: "//static.hdslb.com/phoenix/dist/js/bubble.min.js", dataType: "script", cache: !0 }));
            1 != h.vipType && 2 != h.vipType || 1 != h.vipStatus || (k = "<div class='legalize-icon' style='" + l + "display:none;width:20px;height:20px;position:absolute;z-index:30;background-image:url(//static.hdslb.com/images/base/vip-16-icon.png);'>");
            h.officialVerify && (0 == h.officialVerify.type ? k = "<div class='legalize-16-1 legalize-icon' style='" + l + 'display:none;position:absolute;z-index:30;\' title="\u4e2a\u4eba\u8ba4\u8bc1"></div>' : 1 == h.officialVerify.type && (k = "<div class='legalize-16-2 legalize-icon' style='" + l + 'display:none;position:absolute;z-index:30;\' title="\u4f01\u4e1a/\u56e2\u4f53\u8ba4\u8bc1"></div>'));
            $("#i_menu_profile_btn a.i-link").append(k);
            h.level_info && 0 < h.level_info.current_level && 1 <= h.money ? (l = String(h.money).split("."), l = 2 === l.length ? (h.money - 1).toFixed(l[1].length) : h.money - 1, $(".coin", g).html('<b class="b-back"></b><b class="b-icon"></b><div class="outside"><div class="pre">' + l + '</div><div class="cur" title="' + h.money + '">' + utils.formatNum(h.money) + '<span class="reward-for-login">&nbsp;\u767b\u5f55\u5956\u52b1</span></div></div>')) : $(".coin", g).html('<b class="b-icon"></b>' + h.money);
            $(".coin", g).after('<a class="linkToCurrency" href="https://pay.bilibili.com/bb_balance.html" target="_blank" title="B\u5e01"><b class="currency b-icon"></b><b class="outside">' + (h.wallet && (h.wallet.bcoin_balance || 0 == h.wallet.bcoin_balance) ? h.wallet.bcoin_balance : "-") + "</b></a>");
            profileWnd(h);
            initDynWnd(h);
            initMiniWnd(!0);
            initDrawyooDyn(h);
            initLiveDyn();
            RequireModule.registerScript("messageModule", "message/message.v1.min.js");
            RequireModule.getScript("messageModule", function() { messageModule.load() });
            h = ChatGetSettings("bili_first_enter");
            if ((!h || "v5" != h) && (new Date).getTime() < (new Date("2016-01-04")).getTime() && $("#index_container").length) {
                ChatSaveSettings("bili_first_enter", "v5");
                var j = $('<div class="enter-link-change-hint"><div class="enter-link-change-btn" id="enter_link_change_btn"></div></div>').appendTo("body"),
                    i = $("<div>").addClass("wnd-mask").appendTo("body");
                j.find("#enter_link_change_btn").click(function() {
                    j.fadeOut(function() {
                        j.remove();
                        i.remove()
                    })
                })
            }
        } else { initMiniWnd(!0), $('li[guest="no"]').hide(), $('li[guest="yes"]').show() }
    }
}
onLoginInfoLoaded(onLoginNavigator, !0);

function loadLoginStatus(f) {
    var h, e = function() {
        $.ajax({
            url: "//api.bilibili.com/nav",
            type: "get",
            dataType: "jsonp",
            data: { type: "jsonp" },
            success: function(b) {
                window.uid = __GetCookie("DedeUserID");
                loadLoginInfo(b.data)
            }
        })
    };
    try { window.sessionStorage && (h = window.sessionStorage.bili_login_status) && (h = JSON.parse(h)) && (new Date).getTime() < h[0] && (!__GetCookie("DedeUserID") && void 0 === h[3] || parseInt(__GetCookie("DedeUserID"))), e() } catch (g) { e() }
    f && document.getElementById("player_placeholder") && document.getElementById("player_placeholder").mukio_reloadAccess()
}

function getLoginStatusCache() {
    return window.sessionStorage && window.sessionStorage.bili_login_status ? JSON.parse(window.sessionStorage.bili_login_status) : null
}

function setLoginStatusCache(b) { b && (window.sessionStorage && window.sessionStorage.bili_login_status) && (window.sessionStorage.bili_login_status = JSON.stringify(b)) }
$.fn.smoothScroll = function(e, f) {
    var d = this;
    this.step = e ? e.step || 100 : 100;
    this.f = e ? e.f || 0.1 : 0.1;
    this.interval = 10;
    this.intervalID = null;
    this.isFF = 0 <= navigator.userAgent.toLowerCase().indexOf("firefox");
    this.upOrDown = "";
    this.init = function(g) {
        var c = this;
        c.isFF ? g.addEventListener("DOMMouseScroll", function(a) {
            c.upOrDown = 0 > a.detail ? "up" : "down";
            c.scrollHandler(g);
            a.preventDefault()
        }, !1) : g.onmousewheel = function(a) {
            a = a || window.event;
            c.upOrDown = 0 < a.wheelDelta ? "up" : "down";
            c.scrollHandler(g);
            a.preventDefault ? a.preventDefault() : a.returnValue = !1
        }
    };
    this.scrollHandler = function(h) {
        var g = this;
        clearInterval(g.intervalID);
        var i = h.scrollTop + g.step * ("up" == g.upOrDown ? -1 : 1);
        g.intervalID = setInterval(function() {
            h.scrollTop += (i - h.scrollTop) * g.f;
            i != h.scrollTop && h.scrollTop != g.lastScrollTop || clearInterval(g.intervalID);
            g.lastScrollTop = h.scrollTop
        }, g.interval)
    };
    d.each(function(b, g) { d.init(g) });
    return this
};
var ToolTips = function() {
    var b = function(f, c, h, g) {
        this.item = f;
        this.offset = void 0 === c || null === c ? 10 : c;
        this.animation = !1 === h ? !1 : h || !0;
        this.className = g || "tool-tip"
    };
    b.prototype = {
        item: null,
        tip: null,
        visible: !1,
        show: function(s, r, q, p) {
            var o = this;
            if (!this.visible) {
                var l = this.item,
                    j = l.offset().top,
                    c = l.offset().left,
                    i = this.tip = $('<div class="' + this.className + '"><div class="tip-arrow"></div><div class="tip-text"></div></div>');
                !0 === p && (p = $("<div>").addClass("close").html("\u00d7").on("click", function() { i.fadeOut(200, function() { o.remove() }) }), i.append(p));
                "undefined" != typeof s ? $(".tip-text", i).html(s) : $(".tip-text", i).html(l.attr("tips"));
                this.visible = !0;
                i.appendTo("body");
                "undefined" != typeof q && q && $(".tip-text", i).css("max-width", q);
                r = "undefined" != typeof r ? r : l.attr("tips-pos");
                switch (r) {
                    case "t":
                        s = -i.outerHeight() - this.offset;
                        l = i.outerWidth() > l.outerWidth() ? -(i.outerWidth() - l.outerWidth()) / 2 : 0;
                        i.addClass("tool-tip-t");
                        break;
                    case "b":
                        s = l.outerHeight() + this.offset;
                        l = i.outerWidth() > l.outerWidth() ? -(i.outerWidth() - l.outerWidth()) / 2 : 0;
                        i.addClass("tool-tip-b");
                        break;
                    case "l":
                        s = i.outerHeight() > l.outerHeight() ? -(i.outerHeight() - l.outerHeight()) / 2 : 0;
                        l = -i.outerWidth() - this.offset;
                        i.addClass("tool-tip-l");
                        break;
                    case "r":
                        s = i.outerHeight() > l.outerHeight() ? -(i.outerHeight() - l.outerHeight()) / 2 : 0;
                        l = l.outerWidth() + this.offset;
                        i.addClass("tool-tip-r");
                        break;
                    default:
                        s = l.outerHeight() + this.offset, l = i.outerWidth() > l.outerWidth() ? -(i.outerWidth() - l.outerWidth()) / 2 : 0, i.addClass("tool-tip-b")
                }
                j += s;
                c += l;
                this.animation ? this._animate(i, r, j, c) : (i.css({ top: j, left: c, opacity: 0 }), i.animate({ opacity: 1 }, 300))
            }
        },
        remove: function() {
            this.animation ? this.tip.fadeOut(300, function() { $(this).remove() }) : this.tip.remove();
            this.visible = !1
        },
        _animate: function(i, c, o, n) {
            var l = { opacity: 1 },
                k = "number" == typeof this.animation ? this.animation : 1,
                j = 5 * k,
                k = 5 * k;
            switch (c) {
                case "t":
                    l.top = o;
                    k = 0;
                    break;
                case "b":
                    l.top = o;
                    j = -j;
                    k = 0;
                    break;
                case "l":
                    l.left = n;
                    j = 0;
                    break;
                case "r":
                    l.left = n;
                    k = -k;
                    j = 0;
                    break;
                default:
                    l.top = o, k = 0
            }
            i.css({ top: o + j, left: n + k, opacity: 0 });
            i.animate(l, 300)
        },
        _menterHandler: function() {},
        _mleaveHandler: function() {},
        init: function() {
            var d = this,
                c = this.item;
            c.off("mouseenter", this._menterHandler);
            c.off("mouseleave", this._mleaveHandler);
            this._menterHandler = function() { d.show() };
            this._mleaveHandler = function() { d.remove() };
            c.mouseenter(this._menterHandler);
            c.mouseleave(this._mleaveHandler)
        }
    };
    return {
        tips: [],
        bind: function(j, a, i, h) {
            var g = this;
            ("undefined" != typeof j && j ? "undefined" != typeof $(j).attr("tips") ? $(j) : $("[tips]", j) : $("[tips]")).each(function(f, d) {
                d = $(d);
                if ("undefined" == typeof d.attr("initialized")) {
                    var e = new b(d, a, i, h);
                    e.id = g.tips.length;
                    e.init();
                    d.attr("initialized", "true");
                    g.tips.push(e)
                }
            })
        },
        show: function(q, a, o, l, k) {
            for (var j = 0, i = 0; i < this.tips.length; i++) {
                var p = this.tips[i];
                p.item[0] === q[0] && (p.show(a, o, l, k), j++)
            }
            if (0 == j) {
                return p = new b(q), p.show(a, o, l, k), this.tips.push(p), p
            }
        },
        remove: function(e) {
            for (var c = 0; c < this.tips.length; c++) {
                var f = this.tips[c];
                f.item[0] === e[0] && f.remove()
            }
        }
    }
}();

function hoverDelay(g, j, f, i) {
    var h = null;
    g.hover(function() {
        var b = this;
        clearTimeout(h);
        h = setTimeout(function() { j && j.call(b) }, i || 300)
    }, function() {
        var b = this;
        clearTimeout(h);
        h = setTimeout(function() { f && f.call(b) }, i || 300)
    })
}

function profileWnd(B) {
    var z = $("#i_menu_profile_btn"),
        A = $("#i_menu_profile"),
        y = z.find(".i_face"),
        x = A.find(".info").addClass("clearfix"),
        v = A.find(".coin");
    if (z.length) {
        A.find(".member-menu .notice").parents(".member-menu").remove();
        A.find(".member-menu a").attr("target", "_blank");
        if (0 == B.email_verified && 0 == B.mobile_verified) {
            var u = $('<a class="phone" href="https://passport.bilibili.com/member/bindphone.html" target="_blank"></a>').attr({ tips: "\u524d\u53bb\u7ed1\u5b9a\u624b\u673a", "tips-pos": "l" }),
                t = $('<a class="email" href="https://passport.bilibili.com/member/bindmail.html" target="_blank"></a>').attr({ tips: "\u524d\u53bb\u7ed1\u5b9a\u90ae\u7bb1", "tips-pos": "l" })
        } else { 1 == B.email_verified && 0 == B.mobile_verified ? (u = $('<a class="phone" href="https://passport.bilibili.com/member/hasmailcheckmail.html" target="_blank"></a>').attr({ tips: "\u524d\u53bb\u7ed1\u5b9a\u624b\u673a", "tips-pos": "l" }), t = $('<a class="email verified" href="https://account.bilibili.com/" target="_blank"></a>').attr({ tips: "\u5df2\u7ed1\u5b9a", "tips-pos": "l" })) : 0 == B.email_verified && 1 == B.mobile_verified ? (u = $('<a class="phone verified" href="https://account.bilibili.com/" target="_blank"></a>').attr({ tips: "\u5df2\u7ed1\u5b9a", "tips-pos": "l" }), t = $('<a class="email" href="https://passport.bilibili.com/member/hasphonecheckphone.html" target="_blank"></a>').attr({ tips: "\u524d\u53bb\u7ed1\u5b9a\u90ae\u7bb1", "tips-pos": "l" })) : 1 == B.email_verified && 1 == B.mobile_verified && (u = $('<a class="phone verified" href="https://account.bilibili.com/" target="_blank"></a>').attr({ tips: "\u5df2\u7ed1\u5b9a", "tips-pos": "l" }), t = $('<a class="email verified" href="https://account.bilibili.com/" target="_blank"></a>').attr({ tips: "\u5df2\u7ed1\u5b9a", "tips-pos": "l" })) }
        x.find(".phone, .email").remove();
        x.append(u).append(t);
        x.find(".coin").attr("title", "\u786c\u5e01");
        A.find(".coin").parent().is("a") || A.find(".coin").wrap('<a href="https://account.bilibili.com/site/coin" target="_blank"></a>');
        B.pendant && B.pendant.image ? ($("<img>", { "class": "i_face-pendant hide", src: utils.trimHttp(B.pendant.image), alt: B.pendant.name }).insertAfter(y), y.addClass("has_pendant")) : y.removeClass("has_pendant");
        var o = $(".i_face-pendant"),
            s = function() {
                var d = [],
                    c = new Date;
                d.push(c.getFullYear());
                d.push(("0" + (c.getMonth() + 1)).slice(-2));
                d.push(("0" + c.getDate()).slice(-2));
                return +d.join("")
            };
        hoverDelay(z, function() {
            var c = utils.cookie.get("DedeUserID"),
                b = JSON.parse(utils.localStorage.getItem("time_tracker")) || {};
            $("");
            var a = biliLoginStatus && biliLoginStatus.money.toString().length;
            $("#i_menu_profile .info a.linkToCurrency").css("left", 50 + 7 * a + "px");
            A.is(":visible") || (y.addClass("scale-in"), b[c] == s() && v.removeClass("hover-first").addClass("hover-again"), A.stop().slideDown(200, function() {
                o.removeClass("hide");
                $(".legalize-icon", z).show();
                b[c] != s() && B.mobile_verified && (b[c] = s(), utils.localStorage.setItem("time_tracker", JSON.stringify(b)), $("#i_menu_profile .info a.linkToCurrency").addClass("off"), setTimeout(function() { $("#i_menu_profile .info a.linkToCurrency").removeClass("off").addClass("on") }, 3000), v.removeClass("hover-again").addClass("hover-first"))
            }))
        }, function() {
            o.addClass("hide");
            $(".legalize-icon", z).hide();
            A.stop().slideUp(200, function() { v.removeClass("hover-first hover-again") });
            y.removeClass("scale-in")
        });
        ToolTips.bind(A, 5, !1, "nav-tool-tip");
        A.find(".user-info").remove();
        var j = null;
        B.level_info || (B.level_info = { current_level: 0, current_min: 0, current_exp: 0, next_exp: 0 });
        for (var r in B.level_info) { B.level_info[r] = parseInt(B.level_info[r]) >> 0 }
        0 === B.level_info.next_exp >> 0 && (B.level_info.next_exp = "-");
        u = B.level_info;
        t = $('<a class="help-link" href="//www.bilibili.com/html/help.html#k" target="_blank">\u4f1a\u5458\u7b49\u7ea7\u76f8\u5173\u8bf4\u660e ></a>');
        r = $('<div class="user-info" id="lv_info"><div class="user-info-hd"><span class="t">\u7b49\u7ea7</span></div><div class="points-wrp" id="exp_wrp"><a href="https://account.bilibili.com/site/record?type=exp" target="_blank"><div class="points-cnt"><div class="lt"></div><div class="fill-el"></div><div class="bar"><div class="points"></div></div><div class="points-schedule"><span class="now-points">' + u.current_exp + '</span><span class="next-points">/' + u.next_exp + "</span></div></div></a></div></div>").addClass("l" + u.current_level).insertAfter(A.find(".info"));
        var i = r.find("#exp_wrp");
        0 == u.current_level && r.find(".points-schedule").html('<a class="lv-0" href="https://account.bilibili.com/answer/base" target="_blank">\u7b54\u9898\u8f6c\u6b63\u76f4\u5347Lv' + (u.after_answer || 2) + "</a>");
        var C = $('<div class="user-info-desc"><span class="arrow-left"></span><div class="lv-row">\u4f5c\u4e3a<strong>LV' + u.current_level + "</strong>" + (0 == u.current_level ? "\uff0c\u4f60\u65e0\u6cd5\u4eab\u53d7\u7279\u6743" : "\uff0c\u4f60\u53ef\u4ee5\uff1a") + "</div><div>" + "\u6210\u4e3a\u6b63\u5f0f\u4f1a\u5458\uff0c\u4f60\u53ef\u4ee5\uff1a<br/>1\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55<br/>2\u3001\u53c2\u4e0e\u89c6\u9891\u8bc4\u8bba<br/>3\u3001\u767b\u5f55\u83b7\u5f97\u786c\u5e01<br/>4\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u53d1\u5c04\u6eda\u52a8\u5f39\u5e55<br/>2\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\uff09<br/>2\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\uff09<br/>3\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\u3001\u9876\u90e8\u3001\u5e95\u90e8\uff09<br/>2\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\u3001\u6dfb\u52a0tag\uff09<br/>3\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\u3001\u9876\u90e8\u3001\u5e95\u90e8\uff09<br/>2\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\u3001\u6dfb\u52a0tag\uff09<br/>3\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u8d2d\u4e70\u9080\u8bf7\u7801\uff081\u4e2a/\u6708\uff09<br/>2\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\u3001\u9876\u90e8\u3001\u5e95\u90e8\uff09<br/>3\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\u3001\u6dfb\u52a0tag\uff09<br/>4\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf 1\u3001\u8d2d\u4e70\u9080\u8bf7\u7801\uff082\u4e2a/\u6708\uff09<br/>2\u3001\u53d1\u5c04\u4e2a\u6027\u5f39\u5e55\uff08\u5f69\u8272\u3001\u9ad8\u7ea7\u3001\u9876\u90e8\u3001\u5e95\u90e8\uff09<br/>3\u3001\u53c2\u4e0e\u89c6\u9891\u4e92\u52a8\uff08\u8bc4\u8bba\u3001\u6dfb\u52a0tag\uff09<br/>4\u3001\u6295\u7a3f\u6210\u4e3a\u5076\u50cf".split(" ")[u.current_level] + "</div></div>").hide().appendTo(i);
        r.mouseenter(function(b) {
            clearTimeout(j);
            C.stop(!0, !0).fadeIn(200)
        }).mouseleave(function(b) { j = setTimeout(function() { C.stop(!0, !0).fadeOut(200) }, 300) });
        r.find(".user-info-desc").append(t);
        6 == u.current_level ? r.find(".points").css("width", "100%") : r.find(".points").css("width", (100 * (u.current_exp / u.next_exp) >> 0) + "%");
        0 == B.email_verified && 0 == B.mobile_verified ? x.after("<div class='link-to-bind-mobile'> <a style='' target='_blank' href=' https://passport.bilibili.com/member/bindphone.html'>\u7ed1\u5b9a\u624b\u673a\u53ef\u9886\u53d6\u6bcf\u65e5\u786c\u5e01</a> </div>") : 1 == B.email_verified && 0 == B.mobile_verified && x.after("<div class='link-to-bind-mobile'> <a style='' target='_blank' href=' https://passport.bilibili.com/member/hasmailcheckmail.html'>\u7ed1\u5b9a\u624b\u673a\u53ef\u9886\u53d6\u6bcf\u65e5\u786c\u5e01</a> </div>")
    }
}
window.dynObjects = {};
window.defaultDynObj = null;

function initDynWnd(j) {
    var q = $('<div id="dyn_wnd"><div class="dyn_menu"><div class="menu"><ul><li mode="video" class="on">\u89c6\u9891<div class="num" id="video_num"></div></li></ul><div class="line"></div></div></div><div class="dyn_list_wrapper view-video" mode="video"><ul class="dyn_list" mode="video"><li class="loading">loading...</li></ul></div><div class="wnd_bottom"><div class="r-l"><a class="read-more" href="//www.bilibili.com/account/dynamic">\u67e5\u770b\u5168\u90e8</a><div class="num" id="dynamic_num"></div><div class="check-all no-select"></div></div></div></div>'),
        i = $("#i_menu_msg_btn");
    if (0 != i.length) {
        q.appendTo(i);
        var p = parseInt(q.css("border-left-width"));
        q.css({ top: i.outerHeight(), left: -q.outerWidth() / 2 + i.outerWidth() / 2 });
        var o = $(".dyn_arrow", q);
        950 >= $(window).width() && (q.css({ left: "auto", right: -60 }), o.css({ left: "auto", right: 60 - p + i.outerWidth() / 2 - o.width() / 2 }));
        $(".dyn_list_wrapper", q).smoothScroll();
        var p = 0,
            n;
        for (n in j.dynamic) { "r" != n && (p += parseInt(j.dynamic[n])) }
        j = {
            type: "video",
            wnd: $("#dyn_wnd"),
            data: { jsonp: "jsonp", ps: 5, type: 0 },
            target: $('.dyn_list[mode="video"]', q),
            menuItem: $('.dyn_menu li[mode="video"]', q),
            append: function(F) {
                var E = "",
                    D = "",
                    A = "",
                    z = "",
                    y = "",
                    x = "",
                    w = "",
                    s = "",
                    v = "",
                    u = "",
                    G = F.archive || F.bangumi;
                switch (F.type) {
                    case 0:
                        F.official_verify && 0 == F.official_verify.type ? u = '<div class="legalize-14-1" style=\'vertical-align:top;margin-top:2px\' title="\u4e2a\u4eba\u8ba4\u8bc1" ></div>' : F.official_verify && 1 == F.official_verify.type && (u = '<div class="legalize-14-2" style=\'vertical-align:top;margin-top:2px\' title="\u4f01\u4e1a/\u56e2\u4f53\u8ba4\u8bc1"></div>');
                        E = utils.trimHttp(G.pic);
                        D = G.owner && G.owner.name;
                        w = 'card="' + G.author + '" mid="' + (G.owner && G.owner.mid) + '"';
                        A = "<span>\u6295\u7a3f\u4e86</span>";
                        z = G.title;
                        y = "//space.bilibili.com/" + (G.owner && G.owner.mid);
                        x = "//www.bilibili.com/video/av" + G.aid;
                        v = " v";
                        break;
                    case 1:
                        z = 10 > (G.new_ep && G.new_ep.index) && "number" == typeof G.new_ep.index ? "0" : "";
                        E = utils.trimHttp(G.cover);
                        D = G.title;
                        A = "<span>\u66f4\u65b0\u4e86</span>";
                        s = '<span class="sp">\u756a\u5267</span>';
                        z = z + (G.new_ep && G.new_ep.index) + " " + (G.new_ep && G.new_ep.index_title) + (G.is_finish ? " \u3010\u5b8c\u7ed3\u3011" : "");
                        y = "//bangumi.bilibili.com/anime/" + G.season_id + "/";
                        x = "//bangumi.bilibili.com/anime/" + G.season_id + "/play#" + G.new_ep.episode_id;
                        break;
                    case 5:
                        E = utils.trimHttp(F.source.cover);
                        D = F.source.title;
                        A = "<span>\u6dfb\u52a0\u4e86</span>";
                        s = '<span class="sp">\u4e13\u9898</span>';
                        z = G.title;
                        y = "//bilibili.com/sp/" + D;
                        x = utils.trimHttp(G.link);
                        break;
                    case 6:
                        E = utils.trimHttp(F.source.avatar), D = F.source.uname, w = 'card="' + F.source.uname + '" mid="' + F.source.mid + '"', A = "<span>\u53d1\u8868\u4e86\u8bc4\u8bba</span>", z = F.content.msg, y = "//space.bilibili.com/" + F.source.mid, x = utils.trimHttp(G.link + F.content.flink), v = " u"
                }
                return $('<li class="d-data"><div class="preview' + v + '"><img src="' + utils.trimHttp(E) + '" /></div><div class="r"><div class="title">' + (s ? s : "") + u + '<a href="' + y + '"' + ("" != w ? w : "") + ' target="_blank">' + D + "</a>" + A + '</div><div class="info"><a href="' + x + '" target="_blank" title="' + (6 != F.type ? z : G.title) + '">' + z + "</a></div></div></li>")
            },
            onData: function(d) {
                var c = CacheManager.getItem("biliLoginStatus").dynamic;
                c && (c.all = 0, CacheManager.reset("biliLoginStatus"));
                return d.data
            },
            total: p,
            history: !0
        };
        var l = new dynManage(j);
        $.extend(window.dynObjects, { video: l });
        $.ajax({
            url: "//api.bilibili.com/x/web-feed/feed/unread",
            data: { jsonp: "jsonp" },
            dataType: "jsonp",
            type: "get",
            success: function(e) {
                var d = $("#dynamic_num_total");
                e = e.data && e.data.count;
                $("#dynamic_num_total").attr("data-dynamic-all", e);
                var f = parseInt($("#dynamic_num_total").attr("data-dynamic-all") || 0) + parseInt($("#dynamic_num_total").attr("data-dynamic-live") || 0);
                f;
                0 < f && d.html(f).show();
                l.params.total = e
            }
        });
        window.defaultDynObj = l;
        var k = null;
        i.hover(function() {
            clearTimeout(k);
            if (!q.is(":visible") || 1 > parseInt(q.css("opacity"))) {
                k = setTimeout(function() {
                    $("#dynamic_num_total").attr("data-dynamic-all", 0);
                    var b = parseInt($("#dynamic_num_total").attr("data-dynamic-all") || 0) + parseInt($("#dynamic_num_total").attr("data-dynamic-live") || 0);
                    $("#dynamic_num_total").html(b);
                    1 > b && $("#dynamic_num_total").hide();
                    b = window.defaultDynObj;
                    b.target.attr("loaded") || (b.initMenu(), b.init(), b.target.attr("loaded", 1));
                    q.stop().fadeIn("fast")
                }, 300)
            }
        }, function() {
            clearTimeout(k);
            k = setTimeout(function() { q.stop().fadeOut("fast") }, 300)
        });
        q.delegate(".dyn_menu li", "click", function() {
            var d = $(this);
            if (!d.hasClass("on")) {
                $(".dyn_menu li", q).removeClass("on");
                d.addClass("on");
                var c = d.attr("mode");
                $(".dyn_list_wrapper", q).hide();
                $('.dyn_list[mode="' + c + '"]', q).parent().fadeIn("fast");
                $(".dyn_menu .line", q).animate({ left: d.position().left + parseInt(d.css("margin-left")) + parseInt(d.css("padding-left")), width: d.width() }, 200);
                switch (c) {
                    case "video":
                        l.init()
                }
            }
        });
        return window.dynObjects
    }
}

function MiniWnd() { this.wnds = [] }
MiniWnd.prototype = {
    init: function(e, f) {
        var d = this;
        e = $(e);
        e.length && ("object" != typeof f.wnd && (f.wnd = $(f.wnd)), f.wnd.appendTo(e), d.setPos(e, f.wnd), "undefined" == typeof f.timer && (f.timer = null), e.hover(function() { d.show(f) }, function() { d.hide(f) }), d.wnds.push(f))
    },
    setPos: function(b, d) { d.css({ left: -d.width() / 2 + b.width() / 2, top: b.height() }) },
    show: function(e, f) {
        var d = this;
        clearTimeout(e.timer);
        if (!e.wnd.is(":visible") || 1 > parseInt(e.wnd.css("opacity"))) {
            e.timer = setTimeout(function() {
                e.wnd.stop().fadeIn("fast");
                d.get(e);
                "undefined" != typeof f && f()
            }, 300)
        }
    },
    hide: function(b, d) {
        clearTimeout(b.timer);
        this.timer = setTimeout(function() { b.wnd.stop().fadeOut("fast", function() { "undefined" != typeof d && d() }) }, 300)
    },
    get: function(e) {
        var f = this,
            d = e.wnd.find(".m-w-loading");
        0 == d.length && (d = $('<div class="m-w-loading">loading...</div>').appendTo(e.wnd.find(".list")));
        if ("undefined" == typeof e.loading || 1 != e.loading) {
            e.loading = 1, "undefined" == typeof e.data ? $.get(utils.protocolRelative(e.url), e.reqData || {}, function(a) {
                e.loading = 0;
                if (0 == a.code) { d.remove(), e.data = a, e.render(e.wnd, a) } else { d.html("<a>\u6570\u636e\u83b7\u53d6\u5931\u8d25,\u70b9\u51fb\u91cd\u8bd5</a>").find(">a").one("click", function() { f.get(e) }) }
            }, "jsonp").error(function() {
                e.loading = 0;
                d.html("\u7f51\u7edc\u9519\u8bef")
            }) : (e.loading = 0, d.remove(), e.render(e.wnd, e.data))
        }
    }
};

function initMiniWnd() {
    function A(k, h) {
        if (h.biliHistoryData) {
            k = JSON.parse(h.biliHistoryData);
            for (var B = [], q = [], p = [], n = 0; n < k.length; n++) { B.push(k[n].aid) }
            for (n = 0; n < B.length; n++) {
                var l = q.indexOf(B[n]); - 1 == l ? q.push(B[n]) : (q.splice(l, 1), q.push(B[n]), p.splice(l, 1));
                p.push(k[n])
            }
            n = 0;
            for (B = p.length; n < B; n++) { q = 0 === B % 2 ? q = B / 2 : Math.ceil(B / 2), n < q && (q = p[n], p[n] = p[B - 1 - n], p[B - 1 - n] = q) }
            return k = 6 < p.length ? p.splice(0, 6) : p
        }
        k = [];
        h.setItem("biliHistoryData", JSON.stringify(k))
    }

    function y(M, J) {
        rec_rp("event", "nav_righttoolbar_history_tab_show");
        var H = M.find(".list");
        H.empty();
        var G = J.data;
        z(new Date);
        var E = !1,
            B = !1,
            D = !1,
            C = !1,
            d = !1,
            O;
        for (O in G) {
            if ("object" == typeof G[O]) {
                var b = 1000 * G[O].view_at,
                    K = $('<li class="timeline"><span class="date"></span></li>'),
                    I = "";
                x(b, 0, 1) && !E ? (K.find(".date").html("\u4eca\u65e5"), K.appendTo(H), E = !0) : x(b, 1, 2) && !B ? (K.find(".date").html("\u6628\u65e5"), K.appendTo(H), B = !0) : x(b, 2, 8) && !D ? (K.find(".date").html("\u8fd11\u5468"), K.appendTo(H), D = !0) : x(b, 8, 31) && !C ? (K.find(".date").html("1\u5468\u524d"), K.appendTo(H), C = !0) : x(b, 31, 91) && !d ? (K.find(".date").html("1\u4e2a\u6708\u524d"), K.appendTo(H), d = !0) : x(b, 0, 1) || (x(b, 1, 2) || x(b, 2, 8) || !x(b, 8, 31) || x(b, 31, 91)) || (K.find(".date").html((new Date(1000 * G[O].view_at)).format("yyyy-MM-dd hh:mm:ss")), K.appendTo(H));
                if (UserStatus.status().isLogin && -1 < G[O].type) {
                    var e = K = b = I = "",
                        L = "",
                        e = L = "";
                    0 < G[O].progress && (L = "?t=" + G[O].progress);
                    2 === G[O].device || 33 === G[O].device ? I = "pc" : 1 === G[O].device || 3 === G[O].device || 5 === G[O].device ? I = "phone" : 4 === G[O].device || 6 === G[O].device ? I = "pad" : 0 === G[O].device && (I = "unknown");
                    G[O].page && 0 < G[O].type && (b = Math.round(100 * (G[O].progress / G[O].page.duration)), b = 0 === b ? "1%" : b + "%", -1 === G[O].progress || -1 < G[O].progress && G[O].page && 30 > G[O].page.duration - G[O].progress) && (b = "100%");
                    if (1 === G[O].type && G[O].bangumi) { K = isNaN(Number(G[O].bangumi.title)) ? G[O].bangumi.title + "&nbsp;|&nbsp;" : "\u7b2c" + G[O].bangumi.title + "\u8bdd&nbsp;|&nbsp;", e = G[O].bangumi.season.title, L = "//bangumi.bilibili.com/anime/" + G[O].bangumi.season.season_id + "/play" + L + "#" + G[O].bangumi.ep_id } else {
                        if (1 < G[O].type && G[O].page) {
                            var N = "",
                                e = G[O].title;
                            1 < G[O].page.page && (K = "\u7b2c" + G[O].page.page + "P&nbsp;|&nbsp;", N = "/index_" + G[O].page.page + ".html");
                            L = w + "/video/av" + G[O].aid + N + L
                        } else { e = G[O].title, L = w + "/video/av" + G[O].aid + L }
                    }
                    I = '<div class="device"><span class="pages">' + K + '</span><span class="progress">' + b + '</span><i class="device-i ' + I + '"></i></div>';
                    e = $('<li><a  class="item-a" href="' + L + '" target="_blank" title="' + e + '" data-aid="' + G[O].aid + '">' + e + "</a>" + I + "</li>")
                } else { e = $('<li><a  class="item-a" href="' + w + "/video/av" + G[O].aid + '" target="_blank" title="' + G[O].title + '" data-aid="' + G[O].aid + '">' + G[O].title + "</a></li>") }
                e.appendTo(H)
            }
        }
        0 == H.children().length && (H.addClass("empty"), $('<li class="no-data">\u6ca1\u6709\u6570\u636e\u54e6\uff0c\u591a\u770b\u70b9\u89c6\u9891\u5427</li>').appendTo(H))
    }

    function z(b) {
        return { year: b.getFullYear(), month: b.getMonth() + 1, day: b.getDate() }
    }

    function x(b, p, n) {
        for (var l = !1, k = z(new Date); p < n; p++) {
            var h = z(new Date(b + 86400000 * p));
            h = null == h || null == k ? 0 : h.year == k.year && h.month == k.month && h.day == k.day ? 1 : 0;
            if (h) {
                l = !0;
                break
            }
        }
        return l
    }
    var w = "//www.bilibili.com",
        v = $("#i_menu_fav_btn"),
        u = $("#i_menu_history_btn"),
        t = new MiniWnd;
    if (v.length && UserStatus.status().isLogin) {
        var o = {
            wnd: $('<div class="mini-wnd"><ul class="list"></ul><a class="read-more" href="//space.bilibili.com/#!/favlist" target="_blank">\u67e5\u770b\u66f4\u591a<i class="b-icon b-icon-arrow-r"></i></a></div>'),
            url: "//api.bilibili.com/x/v2/fav/video/newest",
            reqData: { jsonp: "jsonp", ps: 6, sid: utils.cookie.get("sid") },
            render: function(g, e) {
                var l = g.find(".list"),
                    k = e.data.archives;
                l.empty();
                for (var h in k) { "object" == typeof k[h] && (null != k[h].title ? $('<li><a href="' + w + "/video/av" + k[h].aid + '" target="_blank" title="' + k[h].title + '">' + k[h].title + "</a></li>") : $('<li><a href="' + w + "/mylist" + k[h].lid + '" target="_blank" title="' + k[h].description + '">' + k[h].description + "</a></li>")).appendTo(l) }
                0 == l.children().length && $('<li class="no-data">\u6ca1\u6709\u6570\u636e\u54e6\uff0c\u591a\u6536\u85cf\u70b9\u89c6\u9891\u5427</li>').appendTo(l)
            }
        };
        t.init(v, o)
    }
    if (u.length) {
        if (UserStatus.status().isLogin) { v = { wnd: $('<div class="mini-wnd hsmini onlinehs-mini"><div class="top-open-history"><p class="txt">\u5386\u53f2\u529f\u80fd\u6682\u505c\u4e2d\uff0c\u5c31\u7b97\u770b\u4e0d\u53ef\u63cf\u8ff0\u7684\u89c6\u9891\u4e5f\u4e0d\u4f1a\u88ab\u8bb0\u5f55\u4e0b\u6765\u4e86</p><a class="openbtn">\u524d\u53bb\u5f00\u542f</a></div><ul class="list history"></ul><a class="read-more">\u67e5\u770b\u66f4\u591a<i class="b-icon b-icon-arrow-r"></i></a></div>'), url: "//api.bilibili.com/x/v2/history", reqData: { jsonp: "jsonp", pn: 1, ps: 6, sid: utils.cookie.get("sid") }, render: function(d, c) { y(d, c) } }, t.init(u, v) } else {
            if (!window.localStorage) {
                return !1
            }
            var s, j;
            if ("www.bilibili.com" !== location.host) {
                var r = $('iframe[src="//www.bilibili.com/html/iframemessage.html"]')[0];
                r || "bilibili" != document.domain.split(".")[1] || (document.domain = "bilibili.com", r = document.createElement("iframe"), r.style.cssText = "position:absolute;width:1px;height:1px;left:-9999px;", r.src = "//www.bilibili.com/html/iframemessage.html", document.body.appendChild(r), $(r).load(function() {
                    j = r.contentWindow.localStorage;
                    s = A(s, j);
                    var a = { wnd: $('<div class="mini-wnd hsmini"><div class="top-login"><p class="txt">\u767b\u5f55\u540e\u6709\u66f4\u591a\u529f\u80fd\u54e6\uff5e</p><a class="loginbtn" href="https://passport.bilibili.com/login">\u767b\u5f55</a></div><ul class="list history"></ul><a class="read-more" href="//www.bilibili.com/account/history">\u67e5\u770b\u66f4\u591a<i class="b-icon b-icon-arrow-r"></i></a></div>'), data: { data: s }, render: function(d, c) { y(d, c) } };
                    t.init(u, a)
                }))
            } else { j = window.localStorage, s = A(s, j), v = { wnd: $('<div class="mini-wnd hsmini"><div class="top-login"><p class="txt">\u767b\u5f55\u540e\u6709\u66f4\u591a\u529f\u80fd\u54e6\uff5e</p><a class="loginbtn" href="https://passport.bilibili.com/login">\u767b\u5f55</a></div><ul class="list history"></ul><a class="read-more" href="//www.bilibili.com/account/history">\u67e5\u770b\u66f4\u591a<i class="b-icon b-icon-arrow-r"></i></a></div>'), data: { data: s }, render: function(d, c) { y(d, c) } }, t.init(u, v) }
        }
    }
    v = $(".hsmini");
    u.find(".i-link").on("click", function(b) {
        b.preventDefault();
        rec_rp("event", "nav_righttoolbar_history_click");
        window.open("//www.bilibili.com/account/history")
    });
    v.find(".openbtn").on("click", function(b) {
        b.preventDefault();
        window.open("//www.bilibili.com/account/history")
    });
    v.find(".read-more").on("click", function(b) {
        b.preventDefault();
        rec_rp("event", "nav_righttoolbar_history_more_click");
        window.open("//www.bilibili.com/account/history")
    });
    v.find(".list").on("click", function(b) {
        b.preventDefault();
        b = $(b.target) || $(b.srcElement);
        b.hasClass("item-a") && (rec_rp("event", "nav_righttoolbar_history_tovideoplaypage"), window.open(b.attr("href")))
    });
    var i = $(".top-open-history");
    i.length && $.ajax({ url: "//api.bilibili.com/x/v2/history/shadow", type: "get", data: { jsonp: "jsonp" }, xhrFields: { withCredentials: !0 }, dataType: "json", success: function(b) { 0 === b.code && (b.data ? i.show() : i.hide()) } })
}

function initDrawyooDyn(g) {
    var j = $("#dyn_wnd"),
        f = j.find(".menu"),
        i = $('<li mode="draw">\u753b\u53cb<div class="num" id="draw_num"></div></li>').insertAfter(f.find('li[mode="video"]'));
    $('<div class="dyn_list_wrapper view-draw" mode="draw"><ul class="dyn_list" mode="draw"><li class="loading">loading...</li></ul></div>').insertAfter(j.find(".dyn_list_wrapper:eq(" + (i.index() - 1) + ")")).hide().smoothScroll();
    j = {
        type: "draw",
        wnd: j,
        data: { jsonp: "jsonp", ps: 5, type: 4 },
        target: $('.dyn_list[mode="draw"]', j),
        menuItem: $('.dyn_menu li[mode="draw"]', j),
        append: function(d) {
            var c = d.addition;
            return $('<li class="d-data"><a href="' + c.link + '" target="_blank"><div class="preview p"><img src="' + utils.trimHttp(c.cover) + '" /></div></a><div class="r p"><div class="title"><a href="//h.bilibili.com/member?mod=space&uid=' + d.source.mid + '&act=p_index" target="_blank">' + d.source.uname + '</a><span>\u6295\u7a3f\u4e86</span></div><div class="info"><a href="' + c.link + '" target="_blank" title="' + c.title + '">' + c.title + "</a></div></div></li>")
        },
        onData: function(d) {
            var c = CacheManager.getItem("biliLoginStatus").dynamic;
            c && (c.hua = 0, CacheManager.reset("biliLoginStatus"));
            i.find("#draw_num").hide();
            return d.data.feeds
        },
        history: !0
    };
    i.click(function() { h.init() });
    g.dynamic && g.dynamic.hua && i.find("#draw_num").html(g.dynamic.hua).show();
    var h = new dynManage(j);
    window.dynObjects.draw = h
}

function initLiveDyn() {
    var j = $("#dyn_wnd"),
        q = utils.protocolRelative("//api.live.bilibili.com/ajax/"),
        i = j.find(".menu"),
        p = $('<li mode="live">\u76f4\u64ad<div class="num" id="live_num"></div></li>').insertAfter(i.find('li[mode="video"]')),
        o = $('<div class="dyn_list_wrapper view-live"></div>').insertAfter(j.find(".dyn_list_wrapper:eq(" + (p.index() - 1) + ")")).attr("mode", "live").hide(),
        n = $('<ul class="dyn_list"><li class="loading">loading...</li></ul>').attr("mode", "live").appendTo(o);
    parseInt($("#dynamic_num_total").html() || 0);
    o.smoothScroll();
    n = {
        type: "live",
        wnd: j,
        apiUrl: q + "feed/list",
        data: { pagesize: 5 },
        pageKey: "page",
        target: n,
        menuItem: p,
        onData: function(b) {
            return b.data.list
        },
        getResults: function(b) {
            return b.data.results
        },
        append: function(b) {
            return $('<li class="d-data live"><a href="' + b.link + '" target="_blank"><div class="preview"><img src="' + utils.trimHttp(b.cover) + '" /></div><div class="r p"><div class="title"><em class="uname">' + b.uname + '</em><span class="live">\u6b63\u5728\u76f4\u64ad</span></div><div class="info">' + b.title + "</div></div></a></li>")
        }
    };
    p.click(function() {
        k.init();
        $("#live_num").hide();
        $("#dynamic_num_total").attr("data-dynamic-live", 0);
        var b = parseInt($("#dynamic_num_total").attr("data-dynamic-all") || 0) + parseInt($("#dynamic_num_total").attr("data-dynamic-live") || 0);
        $("#dynamic_num_total").html(b);
        1 > b && $("#dynamic_num_total").hide()
    });
    i.find("li").click(function() { "live" == $(this).attr("mode") ? (j.find(".wnd_bottom").not(".live").hide(), l.show()) : (j.find(".wnd_bottom").not(".live").show(), l.hide()) });
    var l = $('<div class="wnd_bottom live"><div class="r-l"><a class="btn-live-more" href="//live.bilibili.com/pages/center/index#!/personal-info/my-favourite/1" target="_blank">\u6240\u6709\u5173\u6ce8</a></div></div>').insertAfter(o).hide(),
        k = new dynManage(n);
    window.dynObjects.live = k;
    $.get(q + "feed/count", function(d) {
        var c = d.data && d.data.count;
        $("#dynamic_num_total").attr("data-dynamic-live", c);
        c = parseInt($("#dynamic_num_total").attr("data-dynamic-all") || 0) + parseInt($("#dynamic_num_total").attr("data-dynamic-live") || 0);
        0 == d.code && d.data.count && ($("#live_num").show(), $("#dynamic_num_total").html(c).show())
    }, "jsonp")
}

function dynManage(b) {
    this.params = b = $.extend(!0, { pageKey: "pn", total: null }, b);
    this.onData = this.params.onData || this.onData;
    this.getResults = this.params.getResults || this.getResults;
    this.wnd = b.wnd;
    this.num = this.page = 0;
    this.append = b.append;
    this.data = b.data || {};
    this.target = b.target;
    this.wrapper = b.wrapper || b.target.parent();
    this.reload = this.loading = this.finish = 0;
    this.tempList = null;
    this.history = b.total && !b.history ? 0 : 1;
    this.historyMaxNum = b.historyMaxNum || 0;
    this.newTag = b.newTag ? !0 : !1;
    this.tryTime = 0;
    this.TRY_MAX = 3;
    this.apiUrl = utils.protocolRelative(b.apiUrl || "//api.bilibili.com/x/web-feed/feed");
    this.bindScroll()
}
dynManage.prototype = {
    bindScroll: function() {
        var b = this;
        b.wrapper.on("scroll", function() { b.scroll() })
    },
    init: function() { this.target.attr("loaded") || (0 == this.params.total && ($(".loading", this.target).remove(), this.noData()), this.load(), this.target.attr("loaded", 1)) },
    load: function() {
        var b = this;
        b.finish ? b.complete() : (b.page++, b.data[b.params.pageKey] = b.page, b.setLoading(1), $.ajax({
            url: b.apiUrl,
            dataType: "jsonp",
            data: b.data,
            success: function(j) {
                if (0 == j.code) {
                    var a = 0,
                        i = b.onData(j),
                        h;
                    if (i) {
                        for (h = 0; h < i.length && "object" == typeof i[h]; h++) {
                            var g = $(b.append(i[h])).insertBefore(b.getLoading().elem);
                            b.newTag && b.num < b.params.total ? $('<div class="new">new</div>').appendTo(g) : b.num == b.params.total && ($('<li class="d-data history"><div class="history-tag">\u5386\u53f2\u52a8\u6001</div></li>').insertBefore(g), g.addClass("no-border"));
                            b.renderEffect(g);
                            b.num++;
                            if (!b.history && b.num >= b.params.total) {
                                a = 1;
                                break
                            } else {
                                if (b.history && b.historyMaxNum && b.num - b.params.total >= b.historyMaxNum && b.num >= b.params.total) {
                                    a = 2;
                                    break
                                }
                            }
                        }
                    }
                    b.setLoading(0);
                    j = 0 == b.getResults(j);
                    i && i.length && 0 == a && !j ? b.target.is(":visible") && b.target.height() - b.getLoading().elem.height() < b.wrapper.height() && b.load() : b.complete()
                } else { b.accessError() }
            },
            error: function() { b.accessError() }
        }))
    },
    accessError: function() {
        var b = this;
        b.page--;
        b.data[b.params.pageKey] = b.page;
        b.tryTime < b.TRY_MAX ? (b.getLoading().elem.addClass("error").html("(\u00b4\u30fb\u03c9\u30fb\uff40)\u7f51\u7edc\u9519\u8bef\uff0c\u6b63\u5728\u91cd\u8bd5"), b.load(), b.tryTime++) : b.getLoading().elem.addClass("error m").html("(\u00b4\u30fb\u03c9\u30fb\uff40)\u7f51\u7edc\u9519\u8bef\uff0c\u8bf7\u70b9\u51fb\u8fd9\u91cc\u91cd\u65b0\u5c1d\u8bd5").click(function() {
            $(this).removeClass("error m").html("loading...");
            b.load();
            $(this).off("click")
        })
    },
    onData: function(b) {
        return b.data.feeds
    },
    getResults: function(b) {
        return b.data && b.data.length
    },
    renderEffect: function(b) {
        b.css({ "margin-left": "50px", opacity: "0" });
        b.animate({ "margin-left": "0", opacity: "1" }, 300)
    },
    complete: function() {
        this.finish = 1;
        0 == this.num ? (this.noData(), this.wrapper.addClass("no-history").animate({ height: 120 }, 100), this.getLoading().elem.remove()) : this.getLoading().elem.addClass("f").html("(\u00b4\u30fb\u03c9\u30fb\uff40)\u6ca1\u6709\u66f4\u591a\u4fe1\u606f")
    },
    getNoData: function() {
        return $(".no-data", this.target)
    },
    noData: function(b) {
        b = b || "\u6682\u65f6\u6ca1\u6709\u65b0\u52a8\u6001\u4e86\u54e6\uff01";
        0 == this.getNoData().length && $('<li class="no-data">' + b + "</li>").appendTo(this.target).hide().fadeIn(200)
    },
    getLoading: function() {
        return { elem: $(".loading", this.target), state: this.loading }
    },
    setLoading: function(b) { b ? (0 == this.getLoading().elem.length && $('<li class="loading">loading...</li>').appendTo(this.target), this.loading = 1) : this.loading = 0 },
    readData: function() {
        var b = this;
        $("li", b.target).fadeOut("200", function() {
            $(this).remove();
            null != b.tempList ? (b.tempList.css({ "margin-left": "-50px", opacity: "0" }), b.tempList.appendTo(b.target), b.tempList.animate({ "margin-left": "0", opacity: "1" }, 300)) : b.load();
            b.reload = 0
        })
    },
    removeData: function() {
        var b = this;
        $("li", b.target).animate({ "margin-left": "-=50px", opacity: "0" }, 300, function() {
            var a = $(this).is(":last-child");
            $(this).remove();
            a && b.noData()
        })
    },
    scroll: function() {
        $(".loading", this.target);
        this.wrapper.scrollTop() + 50 >= this.target.height() - this.wrapper.height() && (!this.loading && !this.finish && !this.reload) && this.load()
    },
    initMenu: function() {
        var h = this.wnd,
            l = h.find(".menu"),
            g = this.params.menuItem,
            k = window.defaultDynObj.params.type;
        l.find("li").removeClass("on");
        var j = l.find('li[mode="' + k + '"]').addClass("on"),
            i = 0;
        l.find("li").each(function(d, c) {
            c = $(c);
            if (c.index() < j.index()) { i += c.outerWidth(!0) } else {
                return !1
            }
        });
        l.find(".line").css({ left: i + parseInt(j.css("margin-left")) + parseInt(j.css("padding-left")), width: g.width() });
        h.find(".dyn_list_wrapper").hide();
        h.find('.dyn_list_wrapper[mode="' + k + '"]').show()
    }
};
var lazyLoadContents = [];

function LazyLoad(b) {
    if ("undefined" != typeof b.render) {
        var d = {
            options: {
                url: null,
                xhrParams: {},
                wrapper: b.wrapper || $(window),
                target: null,
                offsetTop: 0,
                distance: 50,
                autoLoad: !0,
                showPageAfter: null,
                pageContainer: null,
                onInit: function() {},
                render: function(c) {},
                onScroll: function() {
                    return !1
                },
                renderCallback: function(e, f) {},
                beforeLoad: function() {},
                onComplete: function(c) {},
                onData: null,
                state: null,
                noDataPrompt: null,
                onShowPage: null
            },
            page: 0,
            num: 0,
            autoNum: 0,
            totalPage: 1,
            showPages: 1,
            totalResults: 0,
            manualLoad: !1,
            waitManualOperate: !1,
            xhrParams: function() {
                return {}
            },
            _busying: !1,
            _debug: !1,
            _destroyed: !1,
            setOption: function(e, f) {
                if ("object" == typeof e) {
                    return $.extend(!0, this.options, e)
                }
                void 0 !== this.options[e] && (this.options[e] = f)
            },
            init: function() {
                var a = this;
                if ("object" == typeof b) {
                    for (var e in this.options) { b.hasOwnProperty(e) && (this.options[e] = b[e]) }
                    this.options._super = this;
                    this.options.onData = this.options.onData || function() {
                        return a.page < a.totalPage
                    };
                    this.target = this.options.target = $(this.options.target);
                    this.options.wrapper = $(this.options.wrapper);
                    this.options.state = $(this.options.state);
                    this.options.state.parent().length || this.options.state.appendTo(this.options.target);
                    this._debug && console.log("lazyLoad: add lazyLoader " + this.options.xhrParams.url, "current counts: ", lazyLoadContents.length);
                    if (!1 !== this.options.autoLoad) {
                        if (this.options.wrapper.on("scroll", function() { a.scroll() }), "number" == typeof this.options.autoLoad) {
                            this.options.state.on("click", function() {
                                a.autoNum >= a.options.autoLoad && (a.autoNum = 0);
                                a.load()
                            })
                        } else { this.options.state.on("click", function() { a.load() }) }
                    } else { this.waitManualOperate = !0, this.options.state.on("click", function() { a.load() }) }
                    this.options.onInit.call(this)
                }
            },
            empty: function() {
                this.options.target.empty();
                this.options.state.parent().length || this.options.state.appendTo(this.options.target)
            },
            abort: function() {
                this.ajaxRequest && this.ajaxRequest.abort();
                this._busying = !1
            },
            free: function() {
                this.abort();
                this._destroyed = !0;
                for (var c = 0; c < lazyLoadContents.length; c++) {
                    if (lazyLoadContents[c] == this) {
                        lazyLoadContents.splice(c, 1);
                        break
                    }
                }
            },
            reload: function() {
                this.abort();
                this.page = 0;
                this.load()
            },
            load: function() {
                var h = this,
                    l = this.options;
                if (!this._busying && !this._destroyed) {
                    if ("undefined" != typeof l.showPageAfter && (1 < this.showPages && this.page >= l.showPageAfter || 1 === l.showPageAfter && 1 < this.totalPage) && 0 == this.page % l.showPageAfter && 0 != this.page && !this.manualLoad) { this.waitManualOperate = !0, l.state.hide() } else {
                        this.manualLoad = !1;
                        this.waitManualOperate = !1 === l.autoLoad ? !0 : !1;
                        this._busying = !0;
                        l.beforeLoad.call(this);
                        this.page++;
                        this.num++;
                        this.autoNum++;
                        this._debug && console.log("loading page: " + this.page + " (URL: " + l.xhrParams.url + this.page + ")");
                        var k = $.extend(!0, this.xhrParams.call(this), this.options.xhrParams);
                        if (k) {
                            var j = k.success,
                                i = k.error;
                            k.success = function(a) {
                                h._busying = !1;
                                j && j.call(h, a);
                                "number" == typeof l.autoLoad && h.autoNum >= l.autoLoad && (h.waitManualOperate = !0);
                                l.onComplete.call(h, a)
                            };
                            k.error = function(e, a) { i && i.call(h, e, a) }
                        }
                        this.ajaxRequest = $.ajax(k)
                    }
                }
            },
            render: function(g) {
                var j = this.options,
                    i;
                for (i in g) {
                    if ("object" == typeof g[i] && i.match(/^[0-9]+$/)) {
                        var h = $(j.render(g[i]));
                        j.target[0] == j.state.parent()[0] ? h.insertBefore(j.state) : h.appendTo(j.target);
                        "undefined" != typeof j.renderCallback && j.renderCallback(h, g[i])
                    }
                }
            },
            scroll: function() {
                if (this.waitManualOperate) {
                    return !1
                }
                var c;
                c = "function" == typeof this.options.offsetTop ? this.options.offsetTop.call(this) : this.options.offsetTop;
                "none" != this.options.target.css("display") && this.options.wrapper.scrollTop() + this.options.distance >= c + this.options.target.height() - this.options.wrapper.height() && !this._busying && !this.finish && this.options.onScroll.call(this) && this.options.onData.call(this) && this.load()
            },
            showPage: function() {
                var f = this,
                    h = this.options,
                    g = Math.ceil(this.page / h.showPageAfter);
                this._debug && console.log("Current show page: " + g + "  data page: " + this.page);
                this._trigger("onShowPage", $(h.pageContainer), g, Math.ceil(this.totalPage / h.showPageAfter), this.totalResults, function(a) {
                    f.num = 0;
                    f.autoNum = 0;
                    f.manualLoad = !0;
                    f.page = (a - 1) * h.showPageAfter;
                    f.empty();
                    f.load()
                })
            },
            _trigger: function() {
                var e = Array.prototype.slice.call(arguments, 0),
                    f = e.shift();
                if (this.options[f]) {
                    return this.options[f].apply(this, e)
                }
            }
        };
        lazyLoadContents.push(d);
        return d
    }
}

function lazyLoadContent(e) {
    var f = {
            beforeLoad: function() {
                var b = this.options;
                b.state && (b.state.show(), b.state.find("> b").html("\u6b63\u5728\u8f7d\u5165\u4e2d..."))
            }
        },
        d = e.onComplete;
    f.onComplete = function(b) {
        d && d.call(this, b);
        0 == this.target.children().length && 0 == $(".nomore", this.target).length && $('<div class="nomore"></div>').appendTo(this.target)
    };
    f.offsetTop = function() {
        return this.options.target.offset().top
    };
    f.onInit = function() {
        var b = this;
        this.options.state && (this.options.state.empty(), $('<span class="loading-spinner"></span><b>\u521d\u59cb\u5316\u4e2d...</b>').appendTo(this.options.state).find("b").click(function() { b.load() }), this.options.state.css("cursor", "pointer"))
    };
    f.onShowPage = function(j, i, n, l, k) { pagelist_ul(j, i, n, l, k, 5) };
    f = $.extend(!0, f, e);
    e = $.extend(!0, LazyLoad(f), {
        xhrParams: function() {
            var g = this,
                c = g.options;
            return {
                url: c.url + g.page,
                data: c.xhrParams.data,
                dataType: "json",
                success: function(a) {
                    g.render(a);
                    g.totalPage = a.numPages;
                    g.totalResults = a.numResults;
                    g.showPages = "undefined" != typeof c.showPageAfter ? Math.ceil(g.totalPage / c.showPageAfter) : !1;
                    g._debug && console.log("loaded page: " + g.page + " Total: " + a.numPages + " (URL: " + c.url + g.page + ")");
                    g.page >= a.numPages ? (c.state.find("> .loading-spinner").hide(), c.noDataPrompt ? c.state.find("> b").html(c.noDataPrompt) : c.state.hide()) : (c.state.show(), c.state.find("> .loading-spinner").show(), c.state.find("> b").html("\u67e5\u770b\u66f4\u591a..."), setTimeout(function() { 0 != $(c.target).height() && g.scroll() }, 0));
                    0 != g.page % c.showPageAfter && 1 !== c.showPageAfter || g.manualLoad ? $(c.pageContainer).hide() : (g.waitManualOperate = !0, c.state.hide());
                    (0 == g.page % c.showPageAfter || g.page >= a.numPages || 1 === c.showPageAfter) && 1 < g.showPages && ($(c.pageContainer).show(), g.showPage())
                }
            }
        }
    });
    e.init();
    return e
}

function biliShowFloatAds(F, D, E, C, B, A, z, y) {
    try {
        var s = (new Date).getSeconds() % E.length,
            x = E[s];
        if ("banner" == F) {
            if (0 < $(".header .logo").length) {
                var o = $(".header .logo"),
                    t = $('<div class="bili_live_pmt" b-stat="float-pmt-banner" b-stat-v="' + x[1] + '"><a href="' + x[1] + '" target="_blank"></a></div>').css({ width: B || 150, height: A || 80, "margin-top": -20, background: "url(" + utils.trimHttp(x[0]) + ") no-repeat", left: o.position().left + o.outerWidth() + 30 }).appendTo(".header .h-center");
                z && t.css("left", z);
                y && t.css("top", y);
                t.fadeIn(500);
                setTimeout(function() { t.fadeOut(1000, function() { t.remove() }) }, 10000)
            }
            return t
        }
        var j = ChatGetSettings("bili-float-ads-close");
        if (!($("#a_ds_" + D).length || j && parseInt(j.split(",")[0]) == D && j.split(",")[1] && (new Date).getTime() < parseInt(j.split(",")[1]))) {
            F = B || 150;
            var G = A || 80,
                H = $(".z");
            if (H.length) {
                var I = $("<a>").addClass("float-pmt").attr({ id: "a_ds_" + D, href: x[1], target: "_blank", "b-stat": "float-pmt", "b-stat-v": x[1] }).css({ position: "absolute", right: -F, top: $(window).scrollTop() + $(window).height() - H.offset().top - G - 220, height: G, width: F, "z-index": 10050 });
                $("<img />").attr("src", utils.trimHttp(x[0])).css({ width: "100%", height: "100%", display: "block" }).appendTo(I);
                $("<div>\u00d7</div>").css({ position: "absolute", top: 0, right: 0, width: 20, height: 20, "line-height": "20px", "font-size": 20, "text-align": "center", cursor: "pointer", "background-color": "#ddd", "border-radius": "4px", color: "#222" }).appendTo(I).on("click", function(b) {
                    b.preventDefault();
                    b.stopPropagation();
                    I.remove();
                    C = C || 0;
                    ChatSaveSettings("bili-float-ads-close", D + "," + ((new Date).getTime() + 3600000 * C))
                });
                I.appendTo(H);
                $(window).on("scroll.bili-float-ads", function() { I.css("top", $(window).scrollTop() + $(window).height() - H.offset().top - G - 220) });
                return I
            }
        }
    } catch (i) {}
}

function biliShowAds(w, u, v, t, s) {
    var r = { index: { thin: { ".ad-b1": { width: 720, height: 60 }, ".ad-b2": { width: 720, height: 60 }, ".ad-b3": { width: 970, height: 60 }, ".ad-b4": { width: 720, height: 60 }, ".ad-b5": { width: 720, height: 60 }, ".ad-c1": { width: 230, height: 70 }, ".ad-c2": { width: 230, height: 70 }, ".ad-c2-2": { width: 230, height: 70 }, ".ad-c3": { width: 230, height: 70 }, ".ad-c4": { width: 230, height: 70 } }, wide: { ".ad-b1": { width: 885, height: 65 }, ".ad-b2": { width: 885, height: 65 }, ".ad-b3": { width: 1170, height: 70 }, ".ad-b4": { width: 885, height: 65 }, ".ad-b5": { width: 885, height: 65 }, ".ad-c1": { width: 250, height: 80 }, ".ad-c2": { width: 250, height: 80 }, ".ad-c2-2": { width: 250, height: 80 }, ".ad-c3": { width: 250, height: 80 } } }, list: { thin: { ".ad-b1": { width: 720, height: 60 }, ".ad-b2": { width: 720, height: 60 }, ".ad-b3": { width: 720, height: 60 }, ".ad-b4": { width: 720, height: 60 }, ".ad-b5": { width: 720, height: 60 }, ".ad-c1": { width: 230, height: 70 }, ".ad-c2": { width: 230, height: 70 }, ".ad-c3": { width: 230, height: 70 }, ".ad-c4": { width: 230, height: 70 } }, wide: { ".ad-b1": { width: 885, height: 65 }, ".ad-b2": { width: 885, height: 65 }, ".ad-b3": { width: 885, height: 65 }, ".ad-b4": { width: 885, height: 65 }, ".ad-b5": { width: 885, height: 65 }, ".ad-c1": { width: 250, height: 80 }, ".ad-c2": { width: 250, height: 80 }, ".ad-c3": { width: 250, height: 80 } } }, arc: { thin: { ".ad-e1": { width: 690, height: 56 }, ".ad-f": { width: 468, height: 60 }, ".ad-fl": { width: 468, height: 60 }, ".ad-fr": { width: 468, height: 60 } }, wide: { ".ad-e1": { width: 870, height: 72 }, ".ad-f": { width: 468, height: 60 }, ".ad-fl": { width: 468, height: 60 }, ".ad-fr": { width: 468, height: 60 } } } };
    try {
        var q = "",
            o = "";
        $.isPlainObject(this) && (q = this.id ? this.id : "", o = this.loc_id ? this.loc_id : "");
        var j = (new Date).getSeconds() % s.length,
            l = s[j];
        s = "";
        void 0 !== r[w][v ? "wide" : "thin"][t] && (s = ' width="' + r[w][v ? "wide" : "thin"][t].width + '" height="' + r[w][v ? "wide" : "thin"][t].height + '"');
        $(t + " #a_ds_" + u).remove();
        $(t).attr({ "b-stat": w + t, "b-stat-v": l[3] });
        "i" == l[0] ? $('<a id="a_ds_' + u + '" data-id="' + q + '" data-loc-id="' + o + '" href="' + l[3] + '" target="_blank"><img src="' + utils.trimHttp(v ? l[2] : l[1]) + '"' + s + ' border="0" /></a>').appendTo(t) : $('<embed id="a_ds_' + u + '" wmode="opaque" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowscriptaccess="none" rel="noreferrer" src="' + (v ? l[2] : l[1]) + '"' + s + ' type="application/x-shockwave-flash" allowfullscreen="true" quality="high">').appendTo(t);
        $(t).show()
    } catch (i) {}
}
var LazyJSONLoader = function() {};
LazyJSONLoader.prototype = {
    cache: {},
    queue: {},
    getJSON: function(f, h, e) {
        var g = this;
        if ("undefined" != typeof this.cache[f]) { h(this.cache[f]) } else {
            "undefined" == typeof g.queue[f] && (g.queue[f] = []);
            g.queue[f].push(h);
            if (1 < g.queue[f].length) {
                return !1
            }
            $.getJSON(f, function(a) {
                g.cache[f] = a;
                for (var d; d = g.queue[f].shift();) { d(a) }
            }).error(function() { g.queue[f] = []; "undefined" != typeof e && e() })
        }
    }
};
var Responsive = {
    _callbacks: [],
    lastPageWidth: null,
    screenWidthArr: [0, 1400],
    pageWidthArr: [960, 1160],
    pageCss: [],
    init: function(e) {
        var f;
        this.pageCss = [];
        for (var d = 0; d < this.screenWidthArr.length; d++) { this.pageCss.push("b-page-" + this.pageWidthArr[d]), $(document).width() >= this.screenWidthArr[d] && (f = this.pageWidthArr[d]) }
        if (null === this.lastPageWidth || this.lastPageWidth != f || "boolean" == typeof e && e) { this.lastPageWidth = f, this.onChange(f), this.reset(f) }
    },
    onChange: function(b) {
        1160 == b ? $("body").addClass("widescreen") : $("body").removeClass("widescreen");
        b = 1160 == b;
        if (void 0 !== window.ads) {
            for (var d in window.ads) { window.ads[d](b) }
        }
    },
    add: function(b) { this._callbacks.push(b) },
    reset: function(b) {
        void 0 === b && (b = this.lastPageWidth);
        for (var d = 0, d = 0; d < this._callbacks.length; d++) { this._callbacks[d](b) }
    }
};
window.biliAdjust = utils.bindFn(Responsive.init, Responsive);

function _bili_crossdomain(i, o) {
    var h = {},
        n = !1,
        l;
    for (l in i) {
        var k = "crossdomain_flag" == l ? "1" : __GetCookie(l);
        "" == k && !1 === i[l] || (k == i[l] || encodeURIComponent(k) == i[l]) || (h[l] = k, n = !0)
    }
    if (n) {
        var n = "//interface.bilibili.com/crossdomain_cookie.do?callback=?",
            j;
        for (j in h) { n += "&" + j + "=" + encodeURIComponent(h[j]) }
        $.getJSON(n, o)
    }
}

function biliCachedJSON(i, o, h, n, l) {
    i = { url: i, type: "GET", dataType: "json", success: n };
    var k;
    if (window.sessionStorage) {
        try {
            i.success = function(b) {
                k = [(new Date).getTime() + 1000 * h, b];
                window.sessionStorage[o] = JSON.stringify(k);
                "function" == typeof n && n(b)
            }, void 0 === (k = window.sessionStorage[o]) ? $.ajax(i) : (k = JSON.parse(k), 2 != k.length ? $.ajax(i) : (new Date).getTime() < k[0] && ("function" != typeof l || l(k[1])) ? n(k[1]) : $.ajax(i))
        } catch (j) { $.ajax(i) }
    } else { $.ajax(i) }
}
var SelectModule = function() {
        function b(c, e) {
            this.params = {};
            this._isMobile = browser.version.mobile || browser.version.ios || browser.version.android || browser.version.windowsphone;
            if ("undefined" != typeof c && ("string" == typeof c || c instanceof $ ? (this.obj = $(c), this.params = e || {}) : (this.params = c, this.obj = $(this.params.item)), this.obj.length)) {
                this.obj.hasClass("b-slt") || (this.obj = this.obj.find(".b-slt"));
                this._active = !1;
                if ("undefined" != typeof this.params.onInit) { this.params.onInit(this.obj) }
                if (0 == this.obj.children().length || this.params.selectorData) { this.obj = this.createMenu(this.obj) }
                this.list = this.obj.find(".list");
                this.init();
                d.push(this)
            }
        }
        var d = [];
        window.bindSlt = b.bind = function(a, e) {
            return new b(a, e)
        };
        b.create = function(a) {
            var r = $('<div class="b-slt"></div>');
            $("<span>").addClass("txt").appendTo(r);
            $("<div>").addClass("b-slt-arrow").appendTo(r);
            var p = $("<ul>").addClass("list").appendTo(r);
            a.wrapper && r.wrap(a.wrapper);
            var o = a.items || [];
            1 >= o.length && r.hide();
            for (var l = 0; l < o.length; l++) {
                var j = o[l],
                    q = $("<li></li>").text(j.name).appendTo(p);
                j.selected && b.prototype._setSelect.call(this, q);
                if (j.attributes) {
                    for (var i in j.attributes) { q.attr(i, j.attributes[i]) }
                }
            }
            a.wrapper && (r = r.parent());
            return r
        };
        b.prototype.init = function() {
            var f = this.obj,
                h = this,
                g = this.list.find("[selected]");
            0 == g.length && (g = this.list.find("li").eq(0));
            this._setSelect(g);
            f.off("mouseenter.selectMenu");
            f.off("mouseleave.selectMenu");
            f.off("click.selectMenu");
            f.on("click.selectMenu", function(c) { h._tap(c) });
            this._isMobile || !1 === this.params.hover || (f.on("mouseenter.selectMenu", function(c) { h._mover(c) }), f.on("mouseleave.selectMenu", function(c) { h._mout(c) }));
            this.list.find("li").off("click.selectMenu");
            this.list.on("click", "li", function(c) {
                c.stopPropagation();
                h.select(c, $(this))
            });
            f.data("select-menu", this)
        };
        b.prototype._mover = function(c) {
            c.stopPropagation();
            for (var g = 0; g < d.length; g++) { d[g]._mout(c) }
            if (!this.obj.attr("disabled") && this.list.length) {
                var f = this;
                this.obj.addClass("on");
                this.list.show();
                this._active = !0;
                this.setPos(this.list);
                if (this._isMobile || !1 === this.params.hover) { $(document).off("click.selectMenu"), $(document).one("click.selectMenu", function(e) { f._mout(e) }) }
            }
        };
        b.prototype._mout = function(c) {
            this.obj.removeClass("on");
            this.list.hide();
            this._active = !1;
            (this._isMobile || !1 === this.params.hover) && $(document).off("click.selectMenu")
        };
        b.prototype._tap = function(c) { this._active ? this._mout(c) : this._mover(c) };
        b.prototype.select = function(e, f) {
            this._mout(e);
            if (!f || this._change(f)) { "undefined" == typeof f && (f = this.value()), this.change(f, e) }
        };
        b.prototype.change = function(e, f) { e = e || this.value(); "function" == typeof this.params.onChange && this.params.onChange.call(this, e, f) };
        b.prototype._change = function(c) {
            if (c.attr("selected") || c.attr("disabled")) {
                return !1
            }
            this._cancelSelect();
            this._setSelect(c);
            return !0
        };
        b.prototype._setSelect = function(c) {
            c.attr("selected", "selected").addClass("b-state-selected");
            $(".txt", this.obj).html(c.html())
        };
        b.prototype._cancelSelect = function() { $("li", this.list).removeAttr("selected").removeClass("b-state-selected") };
        b.prototype.value = function(f, h) {
            if (h) {
                var g = this.list.find("[" + f + '="' + h + '"]');
                g.length && this._change(g);
                return g
            }
            return f ? this.getSelected().attr(f) : this.getSelected()
        };
        b.prototype.getSelected = function() {
            return this.list.find('[selected="selected"]')
        };
        b.prototype.createMenu = function(f) {
            $("<span>").addClass("txt").appendTo(f);
            $("<div>").addClass("b-slt-arrow").appendTo(f);
            var h = this.params;
            this.list = $("<ul>").addClass("list").appendTo(f);
            "undefined" != typeof h.createList && h.createList(this.list);
            if ("undefined" != typeof h.selectorData) {
                for (var g in h.selectorData) { this.add(h.selectorData[g].name, h.selectorData[g].attributes) }
            }
            return f
        };
        b.prototype.add = function(g, j) {
            var i = $("<li>").html(g).appendTo(this.list);
            if ("undefined" != typeof j) {
                for (var h in j) { i.attr(h, j[h]) }
            }
            return i
        };
        b.prototype.setPos = function(c) { c.offset().left + c.width() - 10 > $(window).scrollLeft() + $(window).width() ? c.css({ left: "auto", right: "-1px" }) : c.css({ left: "-1px", right: "auto" }) };
        b.prototype.close = function(c) {
            null != c && (c.originalEvent ? $(".b-slt").each(function(f, g) {
                var e = $(g);
                $(".list", e).hide()
            }) : $(".list", c).hide())
        };
        b.prototype.getList = function() {
            return this.obj.find(".list")
        };
        b.prototype.reset = function() {
            var c = this.list.children().first();
            $("li", this.list).removeAttr("selected").removeClass("b-state-selected");
            c.attr("selected", "selected");
            $(".txt", this.obj).html(c.html());
            c.attr("disabled") || this.change(c)
        };
        b.prototype.disable = function() {
            this.obj.addClass("disabled");
            this.obj.off("mouseenter.selectMenu");
            this.obj.off("mouseleave.selectMenu");
            this.obj.off("click.selectMenu");
            this.list.find("li").off("click.selectMenu")
        };
        b.prototype.enable = function() {
            this.obj.removeClass("disabled");
            this.init()
        };
        return b
    }(),
    TabModule = function() {
        function b(f, c, h) {
            if ("undefined" != typeof f && ("string" == typeof f || f instanceof $ ? (this.obj = $(f), this.params = c || {}) : (this.params = f, this.obj = $(this.params.item)), this.obj.length)) {
                var g = this;
                this.obj.find(".on").length || this.change(this.obj.children().first());
                this.obj.on(h || "click", "li, .tab-i", function(d) {
                    var e = $(this);
                    g.change(e) && "undefined" != typeof g.params.onChange && g.params.onChange.call(g, e, d)
                });
                this.obj.data("tab-menu", this)
            }
        }
        window.bindTab = b.bind = function(f, a, e) {
            return new b(f, a, e)
        };
        b.create = function(i) {
            var c = $('<ul class="b-slt-tab"></ul>');
            i.wrapper && c.wrap(i.wrapper);
            i.eType && (c.eType = i.eType);
            for (var o = i.items || [], n = 0; n < o.length; n++) {
                var l = o[n],
                    k = $("<li></li>").append($("<span>").addClass("b-tab-text").text(l.name)).appendTo(c);
                l.selected && k.addClass("on");
                if (l.attributes) {
                    for (var j in l.attributes) { k.attr(j, l.attributes[j]) }
                }
            }
            i.wrapper && (c = c.parent());
            return c
        };
        b.prototype.change = function(c) {
            if (c.hasClass("on") || c.attr("disabled")) {
                return !1
            }
            $(".on", this.obj).removeClass("on");
            c.addClass("on");
            return !0
        };
        b.prototype.value = function(e, c) {
            if (c) {
                var f = this.obj.find("[" + e + '="' + c + '"]');
                this.change(f);
                return f
            }
            return this.obj.find(".on")
        };
        return b
    }();

function IndexNavigator(b) {
    this.config = { container: "", sortable: !1, nav: {}, block: null, appIcon: !1 };
    this._isIndex = "undefined" != typeof window.indexBlock ? !0 : !1;
    this.config.block = this._isIndex ? window.indexBlock : null;
    this.mergeConfig(b);
    $.isArray(this.config.nav) || (this.config.nav = $.map(this.config.nav, function(d, c) {
        "string" === typeof c && (d.id = c);
        return d
    }));
    this.config.block && this.config.block.live && this.config.nav.unshift({ id: "live", name: "\u76f4\u64ad", target: "#b_live" });
    this.originNav = this.config.nav.slice();
    this.nav = $('<div class="index-nav" id="index_nav"><div class="border"></div></div>').appendTo("body").css("opacity", 0);
    this.navItems = [];
    this.mask = $("<div>").addClass("wnd-mask");
    this.navList = $('<div class="nav-list"></div>').appendTo(this.nav);
    this.pointer = $('<div class="pointer-block"></div>').prependTo(this.navList);
    this.seq = [];
    this.isMobile = browser.version.mobile || browser.version.android;
    if (window.bNavigator) {
        return window.bNavigator
    }
    this.init();
    window.bNavigator = this
}
IndexNavigator.prototype = {
    scrolling: 0,
    customizing: 0,
    apiUrl: "/widget/ajaxIndexSettings",
    localDataName: "index_user_setting",
    Cantor: {
        create: function() {
            var b, d = [1];
            for (b = 1; 15 > b; b++) { d[b] = d[b - 1] * b }
            return d
        },
        encode: function(h) {
            var l, g, k = h.length,
                j = this.create(),
                i = [];
            for (l = 0; l < k; l++) {
                for (g = i[l] = 0; g < l; g++) { h[g] > h[l] && i[g]++ }
            }
            for (l = h = 0; l < k; l++) { h += i[l] * j[k - l - 1] }
            return h
        },
        decode: function(j, q) {
            var i, p, o = [],
                n = [],
                l = [],
                k = this.create();
            i = j - 1;
            for (p = 0; 0 <= i; i--, p++) { o[p] = q / k[i], 0 != q && (q %= k[i]), n[i] = 1 }
            for (i = 0; i < j; i++) {
                for (p = k = 0; p < j; p++) {
                    if (k += n[p], k > o[i]) {
                        l[i] = p;
                        n[p] = 0;
                        break
                    }
                }
            }
            return l
        }
    },
    init: function() {
        var e, f;
        this.configMap = [];
        this.nameMap = {};
        for (e = 0; e < this.config.nav.length; e++) {
            if (f = this.config.nav[e].id, !this.config.block || this.config.block[f]) { this.nameMap[f] = this.configMap.length, this.configMap.push(f), this.seq.push(f) }
        }
        if (this.config.sortable && null != ChatGetSettings(this.localDataName)) {
            try { this.userSettings = JSON.parse(ChatGetSettings(this.localDataName)), this.setNavConfig(this.userSettings) } catch (d) {}
        }
        this.createNavigator()
    },
    mergeConfig: function(b) {
        if ("object" == typeof b) {
            for (var d in this.config) { b.hasOwnProperty(d) && (this.config[d] = b[d]) }
        }
    },
    createNavigator: function() {
        this.renderNavItem();
        this.config.sortable && this.initCustomize();
        var g = $('<div class="n-i gotop"><div class="s-line"></div><div class="btn_gotop" title="\u8fd4\u56de\u9876\u90e8"></div></div>').insertAfter(this.navList);
        if (0 == this.navItems.length) {
            var j = g;
            this.nav.addClass("sub");
            g.addClass("sub")
        } else { j = this.navItems[0].item, this.pointer.css({ top: j.find(".name").position().top, left: j.find(".name").position().left }) }
        if (this._isIndex || this.config.appIcon) {
            var f = $('<div class="n-i n-i-mlink"><a href="//app.bilibili.com/?channel=home_recommend" target="_blank"><div class="mlink-dl-msg"></div><div class="n-i-mlink-bg"></div></a></div>').insertAfter(g),
                i = new Animator({ element: f.find(".n-i-mlink-bg"), frameSource: "//i0.hdslb.com/bfs/static/e6f2388d454c82004905753802e9cfe709d80d08.png", frameWidth: 80, frameHeight: 80, totalFrame: 16 }),
                h;
            f.mouseenter(function() {
                i.start(10);
                h = setTimeout(function() { f.find(".mlink-dl-msg").stop(!0, !0).fadeIn(200) }, 500)
            }).mouseleave(function() {
                clearInterval(h);
                i.back();
                f.find(".mlink-dl-msg").stop(!0, !0).fadeOut(200)
            })
        }
        0 < this.navItems.length && this.config.sortable && this._show();
        this.bindScroll();
        this.bindClick(g, "body")
    },
    renderNavItem: function() {
        this.navItems = [];
        this.nav.find(".n-i.sortable").remove();
        for (var f = null, h = 0; h < this.config.nav.length; h++) {
            if (this.config.nav[h]) {
                var e = this.config.nav[h].id;
                if (!this.config.block || this.config.block[e]) {
                    var g = $('<div class="n-i sortable"><div class="name">' + this.config.nav[h].name + "</div></div>");
                    null == f ? g.prependTo(this.navList) : g.insertAfter(f);
                    f = g;
                    g.data("data", { key: e, name: this.config.nav[h].name, target: this.config.nav[h].target });
                    this.bindClick(g, this.config.nav[h].target);
                    this.navItems.push({ item: g, target: this.config.nav[h].target })
                }
            }
        }
    },
    setPosition: function() {
        function e(b) {
            return 0 < $(b).length && d + $(window).scrollTop() < $(b).offset().top + $(b).height() ? $(b).offset().top + $(b).height() : !1
        }
        var f;
        f = this.config.container ? $(this.config.container) : 0 < $(".main-inner").length ? $(".main-inner") : $(".z_header");
        f = f.offset().left + f.width() + 10;
        var d = $(window).height() - this.nav.height() - 50;
        0 > d && (d = 0);
        e(".header") ? d = e(".header") : 0 == $(".header").length && e(".z_top") && (d = e(".z_top"));
        f + this.nav.width() <= $(window).width() ? (f = { top: d, left: f, right: "auto" }, this.nav.removeClass("nav-side")) : (f = { top: d, left: "auto", right: 0 }, this.nav.addClass("nav-side"));
        this.nav.css(f)
    },
    setNavConfig: function(j) {
        if (parseInt(j.len) != this.configMap.length) {
            try { j.sort = 0 } catch (q) {}
        }
        var i = this.originNav;
        if ("undefined" != typeof j.sort) {
            var p = [],
                o = $.extend({}, this.configMap),
                n = parseInt(j.len) || this.configMap.length - 1;
            if ("nan" == j.sort || "NaN" == j.sort) { j.sort = "0" }
            0.999 < Math.random() && rec_rp("event", "index_page_nav_sort", { sort: j.sort });
            var l = this.Cantor.decode(n, parseInt(j.sort, 32));
            this.sort(l, function(b) {
                delete o[l[b]];
                p.push(i[l[b]])
            });
            for (var k in o) { "function" !== typeof o[k] && (l.push(parseInt(k)), this.seq.push(o[k]), p.push(i[k])) }
            l = $.map(l, function(b) {
                return b
            });
            parseInt(j.len) != this.configMap.length && (j.len = this.configMap.length, j.sort = this.Cantor.encode(l).toString(32), this.uploadSetting(j), this.saveSetting(j));
            this.config.nav = p
        } else { this.config.nav = i.slice() }
    },
    sort: function(e, f) {
        this.seq = [];
        for (var d = 0; d < e.length; d++) { void 0 !== e[d] && (this.seq.push(this.configMap[e[d]]), f && f(d)) }
    },
    showTip: function() {
        function h(b) {
            b.stopPropagation();
            k.fadeOut(200, function() {
                k.remove();
                l.nav.removeClass("focus")
            });
            g.fadeOut(200, function() { g.remove() })
        }
        var l = this,
            g = l.tipWnd = $("<div>").addClass("nav-tip"),
            k = l.mask,
            j = $("<div>").addClass("close").appendTo(g),
            i = $("<div>").addClass("ok").appendTo(g);
        k.appendTo("body").fadeIn();
        g.appendTo("body").fadeIn();
        l.nav.addClass("focus");
        j.on("click", h);
        i.on("click", h)
    },
    loadSetting: function(b) {
        var d = this;
        onLoginInfoLoaded(function(a) { a.isLogin && ("undefined" == typeof d.userSettings || d.userSettings.expires && d.userSettings.expires < (new Date).getTime()) && $.ajax({ url: d.apiUrl, type: "post", dataType: "json", success: function(c) { d.parseSetting(c, b) } }) })
    },
    parseSetting: function(g, j) {
        var f = this.configMap.length,
            i = {};
        try { i = JSON.parse(g.settings), !1 === i && (i = { sort: 0, len: f }, this.uploadSetting(i)) } catch (h) { i = this.userSettings || { sort: 0, len: f } }
        this.saveSetting(i);
        this.setNavConfig(i);
        ModuleManage.sort(j || ModuleManage.pageModules[0], this.seq);
        ModuleManage.lazy();
        this.renderNavItem();
        this.follow()
    },
    uploadSetting: function(b) { window.biliLoginStatus && window.biliLoginStatus.isLogin && $.post(this.apiUrl, { act: "set", settings: JSON.stringify(b) }) },
    saveSetting: function(b) {
        b.expires = (new Date).getTime() + 600000;
        try { ChatSaveSettings(this.localDataName, JSON.stringify(b)) } catch (d) {}
        this.userSettings = $.extend(!0, {}, b)
    },
    bindClick: function(e, f) {
        var d = this;
        e.click(function() {
            var b = $(f);
            d.customizing && d.isMobile || !b.length || (d.scrolling = 1, $("html,body").animate({ scrollTop: b.offset().top }, 200, function() { d.scrolling = 0 }))
        })
    },
    bindScroll: function() {
        var b = this;
        $(window).resize(function() { b.setPosition() });
        $(window).scroll(function() {
            300 < $(this).scrollTop() || b.config.sortable ? b._show() : b._hide();
            b.customizing || b.follow()
        })
    },
    _show: function() {
        this.nav.show();
        this.setPosition();
        this.nav.stop().animate({ opacity: 1 }, 200)
    },
    _hide: function() {
        var b = this;
        b.nav.stop().animate({ opacity: 0 }, 200, function() { b.nav.hide() })
    },
    follow: function() {
        for (var g = $(window), j = -1, f = 0; f < this.navItems.length; f++) {
            var i = this.navItems[f].item,
                h = $(this.navItems[f].target);
            if (h.length && (g.scrollTop() + g.height() / 2 > h.offset().top && (g.scrollTop() < h.offset().top + h.height() / 2 || this.navItems[f + 1] && $(this.navItems[f + 1].target).offset().top > g.scrollTop() + g.height() / 2)) && (this.nav.find(".n-i").removeClass("on"), this.pointer.show().css({ top: i.find(".name").position().top, left: i.find(".name").position().left }), i.addClass("on"), j = i.index(), g.scrollTop() + g.height() != $(document).height())) {
                break
            }
        } - 1 == j && (this.nav.find(".n-i").removeClass("on"), this.pointer.fadeOut(100))
    },
    initCustomize: function() {
        function j() {
            i.nav.removeClass("customizing");
            i.nav.find(".sort-btn-wrp").remove();
            k.css({ "background-color": "", position: "" });
            o.stop().fadeOut(300, function() {
                n.remove();
                p.remove();
                o.remove()
            });
            i.nav.sortable("disable");
            i.follow();
            i.customizing = 0;
            $("body").off("click", j);
            "undefined" == typeof l.sort || "undefined" != typeof i.userSettings.sort && l.sort == i.userSettings.sort || (l.len = i.configMap.length, i.uploadSetting(l), i.saveSetting(l))
        }

        function q(b, h) {
            var g = $(h.data("data").target);
            h.prev().hasClass("n-i") ? g.insertAfter(h.prev().data("data").target) : g.insertBefore(h.next().data("data").target);
            null == l && (l = { sort: 0 });
            var f = [];
            i.navItems = [];
            i.nav.find(".sortable").each(function(e, s) {
                var r = $(s).data("data");
                i.navItems.push({ item: $(s), target: r.target });
                f.push(i.nameMap[r.key])
            });
            i.sort(f);
            l.sort = i.Cantor.encode(f).toString(32);
            ModuleManage.sort();
            ModuleManage.lazy()
        }
        var i = this;
        i.customContainer = $('<div class="n-i customize" title="\u81ea\u5b9a\u4e49"><i class="n-icon-sort"></i><p>\u6392\u5e8f</p></div>').appendTo(i.navList);
        var p = $('<div class="tip"></div>').css("z-index", 10),
            o = i.mask,
            n = $('<div class="custom-bg"></div>'),
            l = $.extend(!0, {}, i.userSettings);
        delete l.expires;
        var k = this.navList.find(".sortable");
        if (this.isMobile) {
            k.on("click", function() {
                if (i.customizing) {
                    var b = $(this);
                    i.nav.find(".sort-btn-wrp").remove();
                    k.css({ "background-color": "", position: "" });
                    var c = $('<div class="sort-btn-wrp"><div class="sort-btn prev">\u4e0a\u79fb</div><div class="sort-btn next">\u4e0b\u79fb</div></div>').css({ position: "absolute", left: -53, top: -14, width: 50, zIndex: 30, lineHeight: "30px", fontSize: "16px", backgroundColor: "#ddd", borderRadius: "4px 0 0 4px" }).appendTo(b);
                    b.css({ "background-color": "#ddd", position: "relative" });
                    c.find(".prev").on("click", function(a) {
                        a.stopPropagation();
                        var e = b.prev();
                        e.length && e.hasClass("sortable") && (b.insertBefore(b.prev()), q(a, b))
                    });
                    c.find(".next").on("click", function(a) {
                        a.stopPropagation();
                        var e = b.next();
                        e.length && e.hasClass("sortable") && (b.insertAfter(b.next()), q(a, b))
                    })
                }
            })
        }
        i.nav.on("click", function(b) { b.stopPropagation() });
        i.customContainer.click(function(a) {
            a.stopPropagation();
            i.customizing ? j() : (i.pointer.hide(), o.is(":visible") || o.appendTo("body").stop().hide().fadeIn(), "undefined" != typeof i.tipWnd && i.tipWnd.fadeOut(200, function() { i.tipWnd.remove() }), n.prependTo(i.nav).show(), p.prependTo(i.nav).show(), i.nav.removeClass("focus").addClass("customizing"), i.nav.find(".on").removeClass("on"), i.customModuleInitialized ? i.nav.sortable("enable") : (i.nav.sortable({ items: ".sortable", cancel: ".gotop,.customize", update: function(d, c) { q(d, c.item) } }), i.customModuleInitialized = !0), i.customizing = 1, $("body").on("click", j))
        })
    }
};
window.Captcha = {
    value: null,
    _tryTime: 0,
    _maxTryTime: 5,
    _query: [],
    _xhr: null,
    async: !1,
    imgUrl: null,
    set: function(b, d) {
        this._query.push([b, d]);
        1 < this._query.length || this._load()
    },
    _load: function() {
        var b = this;
        this._tryTime++;
        if (this._tryTime > b._maxTryTime) {
            for (var d = this._tryTime = 0; d < b._query.length; d++) {
                if (b._query[d] && b._query[d][1]) { b._query[d][1]() }
            }
            b._query = []
        } else {
            this._xhr = $.ajax({
                url: utils.protocolRelative("//www.bilibili.com/plus/widget/ajaxGetCaptchaKey.php"),
                dataType: "json",
                async: this.async,
                success: function(e) {
                    window.captcha_key = b.value = e;
                    for (var a = b._tryTime = 0; a < b._query.length; a++) {
                        if (b._query[a] && b._query[a][0]) { b._query[a][0](e) }
                    }
                    b._query = []
                },
                error: function() { setTimeout(function() { b._load() }, 500) }
            })
        }
    },
    updateImage: function(f, h, e) {
        var g = this;
        return $(f).removeAttr("src").attr({ width: 100, height: 50, src: utils.trimHttp(h), title: "\u70b9\u51fb\u5237\u65b0\u9a8c\u8bc1\u7801" }).off("click.captcha").on("click.captcha", function() {
            h = h.match("_ts") ? h.replace(/_ts=(\d+)/, "_ts=" + (new Date).getTime()) : h + "&_ts=" + (new Date).getTime();
            $(f).attr("src", utils.trimHttp(h))
        }).error(function() { g.imgUrl = null })
    },
    setImage: function(f, h, e) {
        var g = this;
        h ? this.updateImage(f, h) : $.ajax({ url: "//api.bilibili.com/x/reply/captcha", data: { jsonp: "jsonp" }, xhrFields: { withCredentials: !0 } }).done(function(a) {
            if ("object" == typeof a && 0 == a.code && a.data) { g.imgUrl = a.data.url, g.updateImage(f, a.data.url) } else {
                if ("string" == typeof a) {
                    g.imgUrl = "//api.bilibili.com/x/reply/captcha?" + (new Date).getTime();
                    g.updateImage(f, g.imgUrl);
                    return
                }
            }
            "function" == typeof e && e(a)
        })
    }
};
var LazyImage = function() {
        function b(d) {
            this.config = { distance: 200, defaultImg: "//static.hdslb.com/images/v3images/img_loading.png", mode: "wrap" };
            for (var c in this.config) { d && d.hasOwnProperty(c) && (this.config[c] = d[c]) }
            this.covers = [];
            this._selector = "[data-img]";
            this.wrapper = '<div class="img-loading"></div>';
            this.init()
        }
        b.prototype.lazy = function(e, c) {
            var f = this;
            $(e).find(this._selector).each(function(d, i) {
                var h = $(i);
                "undefined" != typeof h.attr("loaded") && null != h.attr("loaded") || f.covers.push({ element: h, callback: c })
            });
            this.show()
        };
        b.prototype.init = function() {
            var c = this;
            $(window).on("scroll.lazyimage", function() { c.show() })
        };
        b.prototype.show = function() {
            for (var e = 0; e < this.covers.length; e++) {
                var c = this.covers[e],
                    f = c.element,
                    c = c.callback;
                f.attr("loaded") || ("wrap" != this.config.mode || f.parent(".img-loading").length ? "wrap" != this.config.mode && f.attr("src", utils.trimHttp(this.config.defaultImg)) : (f.attr("src", "//static.hdslb.com/images/transparent.gif"), f.wrap(this.wrapper).parent().css({ background: "#f5f5f5 url(//static.hdslb.com/images/v3images/img_loading.png) center center no-repeat", height: "100%" })), this._inViewRange(f) && (this.load(f, c), this.covers.splice(e, 1), e--))
            }
        };
        b.prototype.list = [];
        b.prototype.shuttle;
        b.prototype.load = function(u, t) {
            function s() {
                if ("//www.bilibili.com/" == location.href || "https://www.bilibili.com/" == location.href || "//www.bilibili.com/account/dynamic" == location.href || "https://www.bilibili.com/account/dynamic" == location.href) { 0 < r.list.length && $.ajax({ url: "//data.bilibili.com/v/void/web_pic_ld_time", type: "get", data: { mid: __GetCookie("DedeUserID"), ld_time: r.list.join(","), jsonp: "jsonp" }, dataType: "jsonp" }), r.list = [] }
            }
            var r = this,
                q = $("<img />"),
                o = utils.trimHttp(LoadWebp.setSrc(u.attr("data-img"))),
                l = new Date,
                i = 0,
                j = l.getTime(),
                c;
            q.on("load", function() {
                var a = new Date;
                c = a.getTime() - j;
                r.list.push(c);
                a = 200 > a - l ? 0 : 200;
                r.unwrap(u);
                u.attr({ src: o, "data-img": "" });
                u.attr("data-alt") && (u.attr("alt", u.attr("data-alt")), u.removeAttr("data-alt"));
                t && "function" == typeof t && t(u);
                u.css("opacity", 0).animate({ opacity: 1 }, a);
                50 <= r.list.length && s();
                clearTimeout(r.shuttle);
                r.shuttle = setTimeout(function() { s() }, 3000)
            });
            q.on("error", function() {
                0 <= r.list.indexOf(o) ? "" : r.list.push(-1);
                20 <= r.list.length && s();
                clearTimeout(r.shuttle);
                r.shuttle = setTimeout(function() { s() }, 3000)
            });
            q.attr("src", o);
            u.attr("alt") && (u.attr("data-alt", u.attr("alt")), u.removeAttr("alt"));
            u.attr("loaded", "loaded");
            q.error(function() {
                i++;
                2 >= i ? q.attr("src", o) : r.unwrap(u)
            })
        };
        b.prototype.unwrap = function(c) { "wrap" == this.config.mode && c.parent(".img-loading").length && c.unwrap(this.wrapper) };
        b.prototype._inViewRange = function(c) {
            return c.offset().top + c.outerHeight(!0) > $(window).scrollTop() - this.config.distance && c.offset().top < $(window).scrollTop() + $(window).height() + this.config.distance && c.offset().left + c.outerWidth(!0) >= $(window).scrollLeft() - this.config.distance && c.offset().left <= $(window).scrollLeft() + $(window).width() + this.config.distance
        };
        return b
    }(),
    SliderController = function(b) {
        this.params = $.extend(!0, { mode: "click", dataLoop: [] }, b);
        this._mouseIn = !1
    };
SliderController.prototype = {
    pointer: 0,
    length: 0,
    timer: null,
    init: function() {
        var b = this,
            d = this.params;
        0 < $(d.parent).find(".p-loading").length ? this.loading = $(d.parent).find(".p-loading") : this.loading = $('<div class="p-loading"></div>');
        this.wrapper = $(d.wrapper).appendTo($(d.parent));
        this.container = this.wrapper.find("ul").eq(0);
        this.bar = $(d.bar);
        d.barContainer ? this.bar.appendTo(this.wrapper.find(d.barContainer)) : this.bar.appendTo(this.wrapper);
        d.dataSrc && (0 == $(d.parent).find(".p-loading").length && this.loading.appendTo(this.wrapper), "function" == typeof d.dataSrc ? $.getJSON(d.dataSrc(), function(a) {
            b.loading.remove();
            b.load(a)
        }) : "string" == typeof d.dataSrc ? $.getJSON(d.dataSrc, function(a) {
            b.loading.remove();
            b.load(a)
        }) : "object" == typeof d.dataSrc && (this.loading.remove(), this.load(d.dataSrc)))
    },
    load: function(f) {
        var h = this.params,
            e;
        if (e = h.onLoad ? h.onLoad(f) : f.list) {
            for (var g in e) { "object" == typeof e[g] && (h.onData && !1 !== h.onData(e[g]) || !h.onData) && this.add(e[g]) }
        }
        0 == this.length && ($('<li class="no-data">\u6ca1\u6709\u6570\u636e</li>').appendTo(this.container), this.bar.hide());
        $("[bar]:eq(0)", this.bar).addClass("on");
        this.setTimer();
        h.initCallback && h.initCallback(this.wrapper, f)
    },
    add: function(i, o) {
        var h = this.params,
            n = 100 * this.length,
            l = $(h.barItem);
        l.appendTo(this.bar).attr("bar", "bar");
        var k = this.length;
        0 == this.length && l.addClass("on");
        h.barRenderCallback && h.barRenderCallback(l, i, k);
        var j;
        "function" == typeof h.item ? j = h.item(i, k) : (j = $(h.item), $("img", j).attr("src", utils.trimHttp(i.img)), $("a", j).attr("href", i.link));
        j.attr("preview", "preview");
        j.appendTo(this.container);
        h.renderCallback && h.renderCallback(this.wrapper, i, k, j);
        this.bindBarEvent(l);
        this.bindPreviewEvent(j);
        this.length++;
        this.container.width(n + 100 + "%");
        "undefined" != typeof o && o(this.wrapper, i)
    },
    bind: function() {
        var b = this.params;
        this.wrapper = $(b.wrapper);
        this.container = this.wrapper.find("ul").eq(0);
        this.bar = null;
        var d = this.container.children();
        this.length = d.length;
        this.container.width(100 * this.length + "%");
        this.bindPreviewEvent(d);
        this.setTimer();
        b.initCallback && b.initCallback(this.wrapper)
    },
    bindBarEvent: function(b) {
        var d = this;
        void 0 !== browser && (browser.version.mobile || browser.version.ios || browser.version.android || browser.version.windowsphone) || b.hover(function() {
            d._mouseIn = !0;
            clearInterval(d.timer);
            "hover" == d.params.mode && d.slide($(this).index())
        }, function() {
            d._mouseIn = !1;
            d.setTimer()
        });
        b.click(function() { d.slide($(this).index()) })
    },
    barHandler: function(b) {
        b = this.bar.find("[bar]").eq(b);
        b.hasClass("on") || (this.bar.find("[bar]").removeClass("on"), b.addClass("on"))
    },
    bindPreviewEvent: function(b) {
        var d = this;
        b.hover(function() { clearInterval(d.timer) }, function() { d.setTimer() })
    },
    slide: function(b) {
        var d = this.params;
        this._mouseIn || this.setTimer();
        this.container.stop(!0, !0).animate({ "margin-left": 100 * -b + "%" }, 200);
        this.bar && this.barHandler(b);
        this.pointer != b && d.slideCallback && d.slideCallback(this.wrapper, b);
        this.pointer = b
    },
    setTimer: function() {
        var b = this,
            d = this.params;
        clearInterval(this.timer);
        0 != d.timeout && 1 != this.length && (this.timer = setInterval(function() { b.next() }, d.timeout || 5000))
    },
    next: function() { this.slide(this.pointer < this.length - 1 ? this.pointer + 1 : 0) },
    prev: function() { this.slide(0 < this.pointer ? this.pointer - 1 : this.length - 1) },
    destroy: function() {
        clearInterval(this.timer);
        this.wrapper.remove()
    }
};
(function(e) {
    function f(a) {
        this.options = { appendTo: "body", target: null, container: '<ul class="bilibili-suggest"></ul>', css: {}, position: null, positionOffset: { top: 0, left: 0 }, minLength: 1, delay: 300, disabled: !1, menuItem: "menuItem", useBuffer: !0, source: null, defaultSource: null, renderMenu: this.renderMenu, renderItem: this.renderItem, create: function() {}, select: function() {}, change: function() {}, search: function() {}, response: function() {}, open: function() {}, close: function() {}, focus: function() {} };
        this.setOption(a);
        this.options._super = this;
        this.namespace = this.constructor.namespace;
        this.$container = e(this.options.container);
        this.$target = e(this.options.target);
        this.elements = this._getMenuItem();
        this.source = {};
        this.value = this._value();
        this.selectedItem = null;
        this.tempValue = this.value;
        this.delayTimer = null;
        this.dataBuffer = {};
        this.enterLock = 0;
        this.cancelSearch = !1;
        this.loading = 0
    }
    var d = 0;
    f.namespace = "bilibiliSuggestion";
    f.prototype = {
        constructor: f,
        escapeRegex: function(b) {
            return b.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&")
        },
        filter: function(a, h) {
            var g = RegExp(this.escapeRegex(h), "i");
            return e.grep(a, function(b) {
                return g.test(b.label || b.value || b)
            })
        },
        init: function() {
            var g = this;
            this._create();
            this._initSource("source");
            this._initSource("defaultSource");
            var c = this.namespace;
            this.$target.data(c, this);
            this.options.target.off("." + c);
            this.options.target.on("keydown." + c, function(a) {
                switch (a.keyCode) {
                    case 38:
                        g._move(a, "up");
                        break;
                    case 40:
                        g._move(a, "down");
                        break;
                    case 9:
                        g._isActive() && g._select(a);
                        break;
                    case 13:
                        g._isActive() && (a.preventDefault(), g._select(a));
                        break;
                    case 27:
                        g.$container.is(":visible") && (g._value(g.value), g.close(a), a.preventDefault())
                }
            }).on("input." + c, function(a) { g._change(a) }).on("focusout." + c, function(a) { g.cancelBlur ? delete g.cancelBlur : (clearTimeout(g.delayTimer), g.close(a)) }).on("focus." + c, function(a) { g._change(a) });
            return this
        },
        _change: function(b) { this.options.disabled || (this.value = this._value(), this.tempValue == this.value && "focus" != b.type) || (this.tempValue = this.value, b.stopPropagation(), this.search(b), this._trigger("change", b, { item: this.selectedItem })) },
        _move: function(j, i) {
            if (this.$container.is(":visible")) {
                this.enterLock = 0;
                var n, l;
                this.selectedItem = null;
                "up" == i ? (n = "last", l = -1) : (n = "first", l = 1);
                if (0 == this._getMenuItemFocused().length) { this.selectedItem = this.elements[n]().addClass("focus") } else {
                    n = this._getMenuItemFocused().index("[role=" + this.options.menuItem + "]");
                    this.elements.removeClass("focus");
                    var k = n + l;
                    0 <= k && k < this.elements.length && (this.selectedItem = this.elements.filter(":eq(" + (n + l) + ")").addClass("focus"))
                }
                null != this.selectedItem ? (this.selectedItem.position().top + this.selectedItem.outerHeight() >= this.$container.height() ? this.$container.scrollTop(this.$container.scrollTop() + (this.selectedItem.position().top + this.selectedItem.outerHeight() - this.$container.height())) : 0 > this.selectedItem.position().top && this.$container.scrollTop(this.$container.scrollTop() + this.selectedItem.position().top), this._focus(j)) : this._value(this.value);
                j.preventDefault()
            }
        },
        _isActive: function() {
            return this.$container.is(":visible") && this.selectedItem
        },
        _getMenuItem: function() {
            return this.$container.find("[role=" + this.options.menuItem + "]")
        },
        _getMenuItemFocused: function() {
            return this._getMenuItem().filter(".focus")
        },
        setOption: function(a) { e.extend(!0, this.options, a) },
        _trigger: function() {
            var g = Array.prototype.slice.call(arguments, 0),
                c = g.shift();
            if (this.options[c]) {
                return this.options[c].apply(this, g)
            }
        },
        _create: function() {
            this._setPos();
            this.$container.appendTo(this.options.appendTo).hide();
            "object" == typeof this.options.css && this.$container.css(this.options.css);
            this._trigger("create")
        },
        enable: function() { this.options.disabled = !1 },
        disable: function() {
            clearTimeout(this.delayTimer);
            this.options.disabled = !0
        },
        destroy: function() {
            clearTimeout(this.delayTimer);
            this.$target.removeData(this.namespace);
            this.$target.off("." + this.namespace);
            this.$container.remove()
        },
        _setPos: function() {
            var b = this.options.position || {};
            this.options.position || (b.top = this.$target.offset().top + this.$target.outerHeight(), b.left = this.$target.offset().left);
            "function" == typeof b && (b = b());
            this.$container.css({ top: b.top + this.options.positionOffset.top, left: b.left + this.options.positionOffset.left })
        },
        _open: function(b) {
            this._setPos();
            this.$container.show();
            this._trigger("open", this.$container, b)
        },
        close: function() {
            this.cancelSearch = !0;
            this._close()
        },
        _close: function(b) {
            this.$container.hide();
            this._trigger("close", this.$container, b)
        },
        _initSource: function(a) {
            var j, i, h = this;
            e.isArray(this.options[a]) ? (j = this.options[a], this.source[a] = function(g, c) { c(h.filter(j, g.term)) }) : "string" === typeof this.options[a] ? (i = this.options[a], this.source[a] = function(g, k) {
                h.xhr && h.xhr.abort();
                h.xhr = e.ajax({ url: i, data: g, dataType: "json", success: function(b) { k(b) }, error: function() { k([]) } })
            }) : this.source[a] = this.options[a]
        },
        search: function(g) {
            var c = this;
            clearTimeout(this.delayTimer);
            this.delayTimer = setTimeout(function() {
                c.selectedItem = null;
                c._search(null, g)
            }, this.options.delay)
        },
        _search: function(a, h) {
            a = null != a ? a : this._value();
            this.value = this._value();
            var g = "source";
            this.cancelSearch = !1;
            if (!this._value()) { g = "defaultSource" } else {
                if (this._value().length < this.options.minLength) {
                    this.close(h);
                    return
                }
            }
            if (!1 === this._trigger("search", h)) { this.close(h) } else {
                if (this.options.useBuffer && "undefined" != typeof this.dataBuffer[a] && !e.isArray(this.source[g])) { this._response(this.dataBuffer[a]) } else {
                    if (this.source[g] && (this.loading++, this.$container.addClass("loading"), "function" == typeof this.source[g])) { this.source[g]({ term: a }, this.response(a)) }
                }
            }
        },
        response: function(b) {
            var h = this,
                g = ++d;
            return function() {
                b && (h.dataBuffer[b] = arguments[0]);
                g === d && h._response.apply(h, arguments);
                h.loading--;
                h.loading || h.$container.removeClass("loading")
            }
        },
        _response: function(b) {
            b = this._normalize(b);
            this.render(b)
        },
        render: function(a) {
            this.$container.empty();
            var g = this;
            this.options.disabled || !a || e.isArray(a) && !a.length || this.cancelSearch || !1 === this._trigger("response", a) ? this._close() : (this._open(), this._renderMenu(this.$container, a), /AppleWebKit.*Mobile.*/i.test(navigator.userAgent) || e("<iframe></iframe>").css({ position: "absolute", left: "0px", top: "0px", width: "100%", height: "100%", border: "none", zIndex: -1 }).attr({ border: 0, frameborder: "no" }).appendTo(this.$container), this.elements = this._getMenuItem(), this.elements.on("mousedown", function(b) {
                b.preventDefault();
                g.cancelBlur = !0;
                g._delay(function() { delete g.cancelBlur })
            }).on("click", function(b) { g._select(b) }).on("mouseenter", function(c) {
                var h = e(this);
                g.enterLock = 1;
                g._getMenuItem().removeClass("focus");
                h.addClass("focus");
                g.selectedItem = h;
                g._focus(c)
            }).on("mouseleave", function(c) {
                c = e(this);
                g.enterLock = 0;
                c.removeClass("focus");
                g.selectedItem = null
            }))
        },
        _renderMenu: function(g, c) { this._trigger("renderMenu", g, c) },
        renderMenu: function(a, h) {
            var g = this;
            e.each(h, function(b, i) { g._renderItem(a, i) })
        },
        _renderItem: function(g, c) { this._trigger("renderItem", g, c).attr("role", this.options.menuItem).data("item", c) },
        renderItem: function(a, g) {
            return e("<li>").addClass("suggest-item").attr({ "data-value": g.value }).append(e("<div>").text(g.value)).appendTo(a)
        },
        _normalize: function(a) {
            return !e.isArray(a) || a.length && a[0].label && a[0].value ? a : e.map(a, function(c) {
                return "string" === typeof c ? { label: c, value: c } : e.extend({ label: c.label || c.value, value: c.value || c.label }, c)
            })
        },
        _select: function(g) {
            var c = this.selectedItem.data("item");
            if (!this.enterLock || g.originalEvent && !/^key/.test(g.originalEvent.type)) { this.value = this.tempValue = this._value(c.value) }
            this._trigger("select", g, { item: c });
            this.close()
        },
        _focus: function(g) {
            var c = this.selectedItem.data("item");
            !0 === this._trigger("focus", g, { item: c }) && (g.originalEvent && /^key/.test(g.originalEvent.type)) && this._value(c.value)
        },
        _value: function(b) {
            b && this.$target.val(b);
            return this.$target.val()
        },
        _delay: function(b) { setTimeout(b, 0) }
    };
    e.fn.bilibiliSuggestion = function(g) {
        var c = this.data(f.namespace);
        c ? c.setOption(g) : (g.target = this, c = (new f(g)).init());
        return c
    }
})(jQuery);
var SearchHistory = {
    history: [],
    suggestions: [],
    maxCount: 10,
    syncCallbacks: [],
    init: function(b, d) {
        b && (this.suggestions.push(b), this.read(), this.sync());
        this.config = d || {};
        this.config.syncCallback && this.syncCallbacks.push(this.config.syncCallback)
    },
    read: function() {
        ChatGetSettings("search_history") && "undefined" != typeof JSON && (this.history = JSON.parse(ChatGetSettings("search_history")) || [], $.isArray(this.history) || (this.history = []));
        return this.history
    },
    save: function(h) {
        var l = this.history,
            g;
        g = "object" == typeof h ? h : { value: h };
        if ($.trim(g.value) && encodeURIComponent(g.value)) {
            h = { value: $.trim(g.value), isHistory: 1, timestamp: Date.parse(new Date) };
            g.url && (h.url = g.url);
            g = l.length;
            for (var k = !1, j = 0; j < g; j++) {
                if (l[j].value == h.value) {
                    l[j] = h;
                    k = !0;
                    break
                }
            }
            k || (g < this.maxCount ? l.push(h) : l[g - 1] = h);
            l = l.sort(function(d, c) {
                return d.timestamp > c.timestamp ? -1 : d.timestamp < c.timestamp ? 1 : 0
            });
            try { ChatSaveSettings("search_history", JSON.stringify(l)) } catch (i) {}
            this.sync()
        }
    },
    remove: function(e) {
        for (var f = 0; f < this.history.length; f++) {
            if (this.history[f].value == e) {
                this.history.splice(f, 1);
                try { ChatSaveSettings("search_history", JSON.stringify(this.history)) } catch (d) {}
                this.sync();
                break
            }
        }
    },
    sync: function() {
        for (var g = this.history, j = this.suggestions, f = 0; f < j.length; f++) {
            var i = j[f].options.defaultSource;
            if (i.length != g.length || g.length && i.length && i[0] != g[0]) {
                i.splice(0, i.length);
                for (var h = 0; h < g.length; h++) { i.push(g[h]) }
            }
        }
        for (g = 0; g < this.syncCallbacks.length; g++) { this.syncCallbacks[g](this.history) }
    },
    clear: function(b) {
        this.history = [];
        ChatSaveSettings("search_history", null);
        this.sync();
        b && b()
    }
};

function FakeDanmu(b) {
    this.messages = [];
    this.elems = [];
    this.config = { baseTop: 0, delay: 1, rows: 2, lifeTime: 5, width: 300, height: 200, parent: null, messages: null, aid: null, cssProfix: "fake_danmu_gen", textStyle: 'color: #fff;font-size: 12px;font-family: "Microsoft Yahei", simhei, "\u9ed1\u4f53";display: inline;position: absolute;white-space: pre;pointer-events: none;opacity: 0.95;text-shadow: 1px 1px 2px #001;visibility: hidden'.split(";") };
    this.setConfig(b);
    this.duration = this.config.lifeTime;
    this.delayTimer = this.loopTimer = 0;
    this.loadState = FakeDanmu.READY;
    this.paused = !0;
    this.id = FakeDanmu._id++;
    null == FakeDanmu.styleElement && (FakeDanmu.styleElement = document.createElement("style"), (document.head || document.getElementsByTagName("head")[0]).appendChild(FakeDanmu.styleElement));
    try { FakeDanmu.styleElement.innerHTML = "." + this.config.cssProfix + "_shared{\r\n" + this.config.textStyle.join(";\r\n") + ";\r\n}\r\n" } catch (d) { FakeDanmu.enabled = !1, this.loadState = FakeDanmu.COMPLETE }
}
FakeDanmu._id = 0;
FakeDanmu.enabled = !0;
FakeDanmu.READY = 0;
FakeDanmu.LOADING = 1;
FakeDanmu.COMPLETE = 2;
FakeDanmu.prototype = {
    constructor: FakeDanmu,
    init: function(b) {
        this.messages = b;
        this.render()
    },
    setConfig: function(b) {
        if ("object" == typeof b) {
            for (var d in this.config) { b.hasOwnProperty(d) && (this.config[d] = b[d]) }
        }
    },
    render: function() {
        this.elems = [];
        this.duration = this.config.lifeTime;
        var b;
        for (b = 0; b < this.messages.length; b++) {
            var d = this.renderText(this.messages[b]);
            this.insertText(d)
        }
        this.restoreStyle()
    },
    restoreStyle: function() {
        var e = [],
            f;
        e.push("." + this.config.cssProfix + "_shared{\r\n" + this.config.textStyle.join(";\r\n") + ";\r\n}\r\n");
        for (f = 0; f < this.elems.length; f++) {
            var d = this.elems[f];
            e.push("." + d.cssClass + "{\r\n" + d.cssText + "\r\n}\r\n")
        }
        FakeDanmu.styleElement.innerHTML = e.join("")
    },
    renderText: function(b) {
        var d = document.createElement("div");
        d.appendChild(document.createTextNode(b));
        d.className = this.config.cssProfix + "_shared";
        this.config.parent.appendChild(d);
        return { elem: d, width: d.offsetWidth, height: d.offsetHeight }
    },
    insertText: function(i) {
        var o = this.elems.length,
            h = o * this.config.lifeTime / this.config.rows / this.config.rows,
            n = i.height * (o % this.config.rows) + this.config.baseTop,
            l = this.config.lifeTime,
            k = i.elem;
        this.duration = h + l;
        var j = [];
        j.push("visibility: visible");
        j.push("top: " + n + "px");
        j.push("left: " + this.config.width + "px");
        j.push("transform: translateX(-" + (this.config.width + i.width) + "px)");
        j.push("transition: transform " + l + "s linear " + h + "s");
        this.elems.push({ elem: k, cssClass: this.config.cssProfix + "_" + o, cssText: j.join(";\r\n") + ";" })
    },
    pause: function() {
        this.paused = !0;
        if (0 < this.config.delay && 0 != this.delayTimer) { clearTimeout(this.delayTimer), this.delayTimer = 0 } else {
            if (this.loadState == FakeDanmu.COMPLETE) {
                var b;
                for (b = 0; b < this.elems.length; b++) { this.elems[b].elem.className = this.config.cssProfix + "_shared" }
                this.loopTimer && clearTimeout(this.loopTimer);
                this.loopTimer = 0
            }
        }
    },
    play: function() {
        var b = this;
        this.paused = !1;
        0 < this.config.delay ? (0 != this.delayTimer && clearTimeout(this.delayTimer), this.delayTimer = setTimeout(function() { b.delayHandler() }, 1000 * this.config.delay)) : this._play()
    },
    _play: function() {
        if (this.loadState != FakeDanmu.COMPLETE) { this.delayHandler() } else {
            var e = this,
                f;
            for (f = 0; f < this.elems.length; f++) {
                var d = this.elems[f];
                d.elem.className = this.config.cssProfix + "_shared " + d.cssClass
            }
            this.loopTimer && clearTimeout(this.loopTimer);
            this.loopTimer = setTimeout(function() { e.restartHandler() }, 1000 * this.duration)
        }
    },
    restartHandler: function() {
        this.loopTimer = 0;
        this.pause();
        var b = this;
        this.loopTimer = setTimeout(function() { b._play() }, 100)
    },
    load: function(b) {
        if (this.loadState == FakeDanmu.READY) {
            this.loadState = FakeDanmu.LOADING;
            var d = this;
            $.getJSON("/widget/ajaxGetComment?aid=" + b, function(c) {
                d.loadState = c ? FakeDanmu.COMPLETE : FakeDanmu.READY;
                c && (d.init(c), d.paused || d._play())
            })
        }
    },
    delayHandler: function() {
        clearTimeout(this.delayTimer);
        this.delayTimer = 0;
        this.loadState == FakeDanmu.COMPLETE ? this._play() : this.loadState == FakeDanmu.READY && (this.config.aid ? this.load(this.config.aid) : this.config.messages && (this.loadState = FakeDanmu.COMPLETE, this.init(this.config.messages), this._play()))
    }
};
FakeDanmu.play = function(b) {
    if (FakeDanmu.enabled) {
        var d = b.parent;
        d.fakeDanmu ? d.fakeDanmu.restoreStyle() : d.fakeDanmu = new FakeDanmu(b);
        d.fakeDanmu.play();
        return d.fakeDanmu
    }
};
FakeDanmu.pause = function(b) {
    if (FakeDanmu.enabled) {
        var d = b.parent;
        d.fakeDanmu || (d.fakeDanmu = new FakeDanmu(b));
        d.fakeDanmu.pause();
        return d.fakeDanmu
    }
};
Date.prototype.format = function(e) {
    var f = { "M+": this.getMonth() + 1, "d+|D+": this.getDate(), "h+|H+": this.getHours(), "m+": this.getMinutes(), "s+": this.getSeconds(), "q+": Math.floor((this.getMonth() + 3) / 3), S: this.getMilliseconds() };
    /(y+|Y+)/.test(e) && (e = e.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length)));
    for (var d in f) { RegExp("(" + d + ")").test(e) && (e = e.replace(RegExp.$1, 1 == RegExp.$1.length ? f[d] : ("00" + f[d]).substr(("" + f[d]).length))) }
    return e
};

function addReturnToMobile() {
    if (browser.version.mobile && !browser.version.iPad) {
        $('<div class="goto-mobile"><div class="bg"></div></div>').appendTo("body").on("click", function() {
            __SetCookie("nmr", 0);
            window.location.reload()
        })
    }
}

function bbChannel(b) {
    this._channel_id = b;
    this._notifyHandlers = [];
    this._notifyHandlers[101] = this._emitRefreshFunctions.bind(this);
    this._pushRefreshFunctions = [];
    this._heartbeatTimer = 0;
    this._init()
}
bbChannel._debug = !1;
bbChannel.prototype = {
    constructor: bbChannel,
    _init: function() { window.WebSocket ? this._connect() : this._log("no websocket!") },
    _connect: function() {
        this._conn = new WebSocket("ws://notification.bilibili.com:88/" + this._channel_id, "binary");
        this._conn.onopen = this._onOpen.bind(this);
        this._conn.onmessage = this._onMessage.bind(this);
        this._conn.onerror = this._onError.bind(this);
        this._conn.onclose = this._onClose.bind(this)
    },
    _onOpen: function(b) { this._heartbeatTimer = setInterval(this._onHeartbeatHandler.bind(this), 30000) },
    _onHeartbeatHandler: function() { this._conn.readyState == WebSocket.OPEN && this._conn.send("0102") },
    _onMessage: function(e) {
        if (7 == parseInt("0x" + e.data.substr(0, 4))) {
            try {
                var f = JSON.parse(e.data.substr(4));
                this._notifyHandlers[f.index] && (this._log("call func:", f), this._notifyHandlers[f.index](f.index, f.payload))
            } catch (d) {}
        }
    },
    _onError: function(b) {},
    _onClose: function(b) {
        clearInterval(this._heartbeatTimer);
        this._heartbeatTimer = 0;
        setTimeout(this._reConnect.bind(this), 1000 + Math.floor(1000 * Math.random()))
    },
    _reConnect: function() {
        this._log("_reConnect ...");
        this._connect()
    },
    _emitRefreshFunctions: function(e, f) {
        for (var d = 0; d < this._pushRefreshFunctions.length; d++) { this._pushRefreshFunctions[d].call(null, f) }
    },
    _log: function(b) { this.constructor._debug && console.log(b) },
    setPacketHandler: function(b, d) {
        this._log("set handler for:", b);
        this._notifyHandlers[b] = d
    },
    addRefreshHandler: function(b) { this._pushRefreshFunctions.push(b) },
    removeRefreshHandler: function(b) { b = this._pushRefreshFunctions.indexOf(b); - 1 != b && this._pushRefreshFunctions.splice(b, 1) }
};
var RequireModule = function() {
        function f(b, j) {
            if ($.isPlainObject(b)) {
                for (var i in b) { register(i, b[i]) }
            } else { e[b] = j }
            return j
        }
        var h = {},
            e = {},
            g = "https:" === window.location.protocol ? "https://static-s.bilibili.com/" : "//static.hdslb.com/";
        return {
            registerScript: f,
            getScript: function(c, b, a) {
                2 == arguments.length && "function" === typeof b ? (a = b, b = g + (e[c] || f(c, c))) : 1 == arguments.length && (b = g + (e[c] || f(c, c)));
                window[c] ? a && a(window[c]) : h[c] || (h[c] = h[c] || [], a && h[c].push(a), $.ajax({
                    url: b,
                    dataType: "script",
                    cache: !0,
                    success: function(d) {
                        for (; d = h[c].shift();) { d(window[c]) }
                        delete h[c]
                    }
                }))
            }
        }
    }(),
    Animator = function(b) {
        function d(a) {
            this.frameTimer = null;
            this.framePos = 0;
            this.reverse = !1;
            a = this.options = b.extend({ element: "", frameSource: "", frameWidth: 16, frameHeight: 16, offsetX: 0, offsetY: 0, totalFrame: 0, fps: 16, frameTimer: null, animationList: {}, orientationLandscape: !0 }, a);
            if (!a.element) {
                return !1
            }
            a.element.css({ display: "block", backgroundImage: "url(" + utils.trimHttp(a.frameSource) + ")", width: a.frameWidth, height: a.frameHeight, backgroundPosition: "0px 0px" })
        }
        d.prototype.loadAnimation = function(e) {
            var f = this.options;
            if (f.animationList && f.animationList[e]) { this.move(f.animationList[e].endFrame, f.animationList[e].loopFrame) } else {
                return !1
            }
        };
        d.prototype.move = function(g, j) {
            var i = this,
                h = this.options;
            clearInterval(i.frameTimer);
            this.reverse = !1;
            i.frameTimer = setInterval(function() { i._animate(g, j) }, 1000 / h.fps)
        };
        d.prototype._animate = function(e, f) {
            if ("undefined" !== typeof f) { f = parseInt(f - 1) >> 0, this.framePos == e ? (this.framePos > f ? this.framePos-- : this.framePos++, this.framePos = f) : this.reverse ? this.framePos == f ? (this.reverse = !1, this.framePos > e ? this.framePos-- : this.framePos++) : this.framePos > f ? this.framePos-- : this.framePos++ : this.framePos > e ? this.framePos-- : this.framePos++ } else {
                if (this.framePos == e) {
                    return clearInterval(this.frameTimer), !0
                }
                this.framePos > e ? this.framePos-- : this.framePos++
            }
            this._setPosition(this.framePos)
        };
        d.prototype._setPosition = function(g, j) {
            var i = this.options;
            if (!i.element) {
                return !1
            }
            var h = g ? g : this.framePos;
            i.element.css("backgroundPosition", -(i.orientationLandscape ? i.frameWidth * h + i.offsetX : i.offsetX) + "px " + -(i.orientationLandscape ? i.offsetY : i.frameHeight * h + i.offsetY) + "px")
        };
        d.prototype.start = function(c) { this.move(this.options.totalFrame - 1, c) };
        d.prototype.back = function(c) { this.move(0, c) };
        d.prototype.stop = function() { clearInterval(this.frameTimer) };
        return d
    }(jQuery),
    GlobalView = {
        _cache: {},
        banner: function() {
            var e = $(".header"),
                f = e.attr("data-title"),
                d;
            f && "undefined" != f && (d = $('<div class="banner-title"></div>').text(f).appendTo(e.find(".h-center")), $("<div class=\"header-layer\"></div><a class='header-link'></a>").prependTo(e), e.find("> .header-layer, > .header-link").height(e.find(".h-center").height()).hover(function() { d.addClass("in") }, function() { d.removeClass("in") }));
            utils.browser.version.edge && $(".z_top .b-header-mask-bg").css("filter", "blur(0px)")
        },
        randomPromotion: function() {
            function u(b) {
                return b[Math.floor(Math.random() * b.length)] || {}
            }

            function s(a) {
                if (1 == a.length) {
                    return a[0]
                }
                var n = a[0];
                if (parseInt(n.weight)) {
                    for (var k = Math.floor(100 * Math.random()), f = n.weight, c = 0; c < p.length; c++) { f /= 1 - parseInt(p[c].weight) / 100 }
                    if (k < f) {
                        return n
                    }
                    p.push(a.shift());
                    return s(a)
                }
                return u(a)
            }
            var t = $("#random_p"),
                r = [],
                q = [],
                p = [],
                o, l, i, j;
            $.get("//www.bilibili.com/index/index-icon.json", function(g) {
                if (!g.random_link || !g.random_link.length || 0 != g.random_link.recommend.code || 0 != Math.floor(2 * Math.random()) && g.fix.length) {
                    g.fix.sort(function(v, f) {
                        return parseInt(f.weight) - parseInt(v.weight)
                    });
                    var e = g.fix.slice();
                    j = s(e);
                    $.isArray(j.links) && (j.link = j.links.length ? u(j.links) : "")
                } else {
                    for (o = 0; o < g.random.length; o++) { q.push(g.random[o]) }
                    for (l in g.random_link.recommend.list) {
                        if ("object" == typeof g.random_link.recommend.list[l]) {
                            for (i = 0; i < g.random_link.recommend.list[l].length; i++) { r.push(g.random_link.recommend.list[l][i]) }
                        }
                    }
                    j = u(q);
                    j.link = "/video/av" + u(r) + "/"
                }
                if (j && j.link) {
                    j.icon || (j.icon = "//i0.hdslb.com/bfs/static/151fa668c8f083a8ed3f7a2be2ffcc652c8f0b1f.gif");
                    var c = $("<div>").addClass("random-p-movie").appendTo(t),
                        e = j.icon,
                        h = $("<img>");
                    if ("bilibili\u7ed9\u60a8\u62dc\u5e74\u5566" == j.title) {
                        var e = "//static.hdslb.com/activity/bnj2016/img/fire1.gif",
                            k = $(),
                            n = $("<div>").css({ left: 0 }).append($("<img>").css({ position: "absolute", right: -35 })),
                            a = $("<div>").css({ right: 0 }).append($("<img>").css({ position: "absolute", left: 0 })),
                            k = k.add(n).add(a),
                            d = !1,
                            b;
                        c.on("mouseenter", function() {
                            d = !0;
                            c.css("cursor", "url(//static.hdslb.com/activity/bnj2016/img/fire2.ico), pointer");
                            b = setTimeout(function() {
                                k.appendTo(".header .menu-wrapper").css({ position: "absolute", overflow: "hidden", top: -10, zIndex: 20000, width: 220, height: 400, "-webkit-animation": "scale-in 0.2s linear", animation: "scale-in 0.2s linear" }).hide().stop(!0, !0).fadeIn(200);
                                n.css("left", -(n.width() - 50)).find("img").attr("src", utils.trimHttp("//static.hdslb.com/activity/bnj2016/img/fire4.gif"));
                                a.css("right", -(n.width() - 50)).find("img").attr("src", utils.trimHttp("//static.hdslb.com/activity/bnj2016/img/fire3.gif"));
                                0 > n.offset().left && n.width(parseInt($(".header .menu-wrapper").offset().left + 50)).css("left", -(n.width() - 50));
                                a.offset().left + a.width() > $(window).width() && a.width(parseInt($(window).width() - $(".header .menu-wrapper").offset().left - $(".header .menu-wrapper").outerWidth() + 50)).css("right", -(n.width() - 50))
                            }, 100)
                        }).on("mouseleave", function() {
                            d = !1;
                            clearTimeout(b);
                            c.css("cursor", "pointer");
                            k.stop(!0, !0).fadeOut(200, function() { d || k.remove() })
                        })
                    }
                    h.attr({ src: utils.trimHttp(e), alt: j.title });
                    c.append(h);
                    e = -1 != String(j.link).indexOf("search.bilibili.com") ? j.link + "&from_source=gif_recommend" : j.link;
                    t.attr({ href: utils.trimHttp(e), title: j.title });
                    g.ea_public && (0 == g.ea_public.code && -1 != g.ea_public.result) && GlobalView.notice(g.ea_public.result)
                } else { t.remove() }
            })
        },
        nav: function() {
            var f, h = $(".z_top .z_top_nav"),
                e = { game: "//www.bilibili.com/page-proxy/game-nav.html", stream: "//live.bilibili.com/bili/live_hover", travel: "//www.bilibili.com/page-proxy/yoo-nav.html" };
            h.find("[hasframe]").on("mouseenter.frame", function() {
                var b = $(this),
                    d = b.find("[data-frame]");
                d.empty().append('<iframe src="' + e[d.attr("data-frame")] + '" frameborder="0" width="100%" height="100%"></iframe>');
                b.off("mouseenter.frame")
            });
            h.find("[hasframe]").mouseenter(function() {
                h.find("[data-frame]").stop(!0, !0).hide();
                var a = this;
                f = setTimeout(function() { $(a).find("[data-frame]").show() }, 500)
            }).mouseleave(function() {
                clearTimeout(f);
                $(this).find("[data-frame]").delay(400).fadeOut(200)
            });
            if (!$(".z_top").hasClass("b-header-blur") && !$("#searchform, #search_frm, #header-search").length) {
                var g = $('<div class="nav-search"><form action="//search.bilibili.com/all" id="nav_searchform" target="_blank"><input name="keyword" type="text" class="nav-search-keyword" id="nav_search_keyword" autocomplete="off" accesskey="s" x-webkit-speech="" x-webkit-grammar="builtin:translate"><button type="submit" class="nav-search-submit"></button></form></div>').insertAfter(".z_top .uns_box");
                g.find("input").attr("placeholder", "\u641c\u7d22");
                this.initSearch(g, $.extend(!0, window.suggestionOpt, { form: g.find("form"), css: { minWidth: 188, maxWidth: 360 } }))
            }
            hoverDelay(h.find(".shouji"), function() { h.find(".shouji .mobile-p-box").show() }, function() { h.find(".shouji .mobile-p-box").hide() }, 300)
        },
        menu: function() {
            function b(d) {
                var c;
                d.css("left", 0);
                d.width() + d.offset().left > $(window).width() && (c = -(d.width() + d.offset().left - $(window).width()), d.css("left", 0 < c ? 0 : c))
            }
            $(".header .nav-menu").find(".m-i-square").on("mouseenter", function() {
                var f = $(this),
                    a = f.find(".i_num"),
                    e;
                a.attr("data-initialized") ? b(a) : ($.getJSON("//api.bilibili.com/plaza/banner?callback=?", function(h) {
                    if (0 == h.code && h.result && h.result.length) {
                        f.addClass("m-i-ex");
                        var d = $("<div>").addClass("square-pmt-field").appendTo(a);
                        for (e = 0; e < h.result.length; e++) {
                            var c = h.result[e];
                            $('<div class="square-pmt-item"><a href="' + utils.trimHttp(c.link) + '" target="_blank"><img src="' + utils.trimHttp(utils.webp(c.cover)) + '"></a></div>').appendTo(d).attr("title", c.title)
                        }
                        b(a)
                    }
                }), a.attr("data-initialized", !0))
            })
        },
        notice: function(e) {
            if (e) {
                var f = $("#b_promote .b-l .b-head"),
                    d = $("<div>").addClass("b-notice-em").append('<div class="n-wrp"><div class="n-content"></div></div>').appendTo(f);
                $("<div>").addClass("n-toggle").append('<i class="n-close"></i><i class="b-icon b-icon-notice"></i>').on("click", function() { d.hasClass("n-collapsed") ? d.removeClass("n-collapsed") : d.addClass("n-collapsed") }).appendTo(d);
                1 < e.rank && d.addClass("n-warning");
                e = e.link ? $("<a>").attr({ href: e.link, target: "_blank" }).html(e.title) : e.title;
                d.find(".n-content").html(e)
            }
        },
        initSearch: function(g, j, f) {
            var i = $(g).find("form"),
                h = $("[name=keyword]", i);
            j && (g = h.bilibiliSuggestion(j), SearchHistory.init(g));
            i.on("submit", function() {
                var b = h.val();
                h.siblings('input[name="from_source"]').remove();
                "" == b && h.attr("data-recommend") ? h.after('<input name="from_source" value="banner_recommend" type="hidden" />') : b && "search-keyword" == h.attr("id") ? h.after('<input name="from_source" value="banner_search" type="hidden" />') : b && "nav_search_keyword" == h.attr("id") && h.after('<input name="from_source" value="nav_search" type="hidden" />');
                if ("" == b && h.attr("data-recommend")) { h.val(h.attr("data-recommend")) } else {
                    if ("" == b) {
                        return window.open("//search.bilibili.com", i.attr("target")), !1
                    }
                }
                SearchHistory.save(h.val())
            });
            f && $.getJSON("//www.bilibili.com/widget/getSearchDefaultWords", function(b) { b && b.length && (b = b[Math.floor(Math.random() * b.length)], h.attr({ placeholder: b.show, "data-recommend": b.word })) })
        }
    };
$(function() {
    $("#random_p").length && (GlobalView.randomPromotion(), GlobalView.banner());
    $(".header").length && GlobalView.menu();
    $("body").on("mouseover.fakedanmu", ".v .preview", function() {
        var b = $(this).closest(".v").find("a").attr("href").match(/av(\d+)/);
        b && FakeDanmu.play({ width: 180, height: 110, baseTop: 8, parent: this, aid: b[1] })
    }).on("mouseout.fakedanmu", ".v .preview", function() {
        var b = $(this).closest(".v").find("a").attr("href").match(/av(\d+)/);
        b && FakeDanmu.pause({ width: 180, height: 110, baseTop: 8, parent: this, aid: b[1] })
    });
    !window.bNavigator && (0 == $("#index_container").length && 0 < $(".header .num").length) && new IndexNavigator;
    if ("undefined" != typeof countInfo) {
        for (var h, l, g = 0, k = 0, j = 0; j < tidSet.length; j++) {
            if (h = tidSet[j], l = countInfo["c" + h]) { k += l, $(".addnew_" + h).html(999 >= l ? l : "999+") }
        }
        countInfo.c23 && (g += countInfo.c23);
        countInfo.c11 && (g += countInfo.c11);
        g && $(".addnew_23_11").html(999 >= g ? g : "999+");
        $(".index-online .new-video em").html(k || "--")
    }
    var i = window.suggestionOpt = {
        suggestType: "accurate",
        subType: "tag",
        historyLen: 5,
        form: $("#searchform"),
        submitTarget: "_blank",
        css: { minWidth: 268, maxWidth: 360 },
        positionOffset: { top: 6, left: 0 },
        source: function(e, d) {
            var f = $.trim(e.term);
            $.getJSON("//s.search.bilibili.com/main/suggest?jsoncallback=?", { func: "suggest", suggest_type: i.suggestType, sub_type: i.subType, main_ver: "v1", highlight: "", userid: window.uid || 0, bangumi_acc_num: 1, special_acc_num: 1, topic_acc_num: 1, upuser_acc_num: 3, tag_num: 10, special_num: 10, bangumi_num: 10, upuser_num: 3, term: f, rnd: Math.random() }, function(b) { b.result ? d(b.result) : d(null) })
        },
        defaultSource: SearchHistory.read(),
        search: function() {
            var b = $.trim(this.value);
            if (this.value && !b || 255 > b.charCodeAt(0) && 1 > b.length || 40 < b.length) {
                return !1
            }
        },
        open: function(d, c) { 360 > $(window).width() - d.offset().left ? d.css("max-width", $(window).width() - d.offset().left - 2) : d.css("max-width", 360) },
        focus: function(d, c) {
            return !1
        },
        select: function(e, d) {
            d.item && SearchHistory.save(d.item);
            if (d.item.url) {
                return "click" != e.type && window.open(d.item.url, i.submitTarget || "_blank"), !1
            }
            var f;
            d.item.isHistory && (f = i.form.attr("action"), i.form.attr("action", i.makeSearchUrl("all")));
            i.form.submit();
            d.item.isHistory && i.form.attr("action", f);
            return !1
        },
        renderMenu: function(o, f) {
            var t = this;
            if ($.isArray(f)) {
                $.each(f, function(a, c) {
                    if (!c.isHistory) { delete c.url } else {
                        if (i.historyLen && a >= i.historyLen) {
                            return
                        }
                    }
                    t._renderItem(o, c)
                })
            } else {
                var s = 0,
                    r = i.subType;
                "video" == r && (r = "tag");
                var n = f[r];
                if (n && n.length) {
                    var p = $('<li class="kw"><a href="' + i.makeSearchUrl("all", this.value) + '" target="_blank"><div class="b-line"><p><span>\u5173\u952e\u8bcd</span></p></div></a></li>').appendTo(o);
                    $.each(n, function(d, c) {
                        delete c.url;
                        c.TYPE = r;
                        t._renderItem(p, c);
                        s++
                    })
                }
                o.find(".b-line").on("mousedown", function(b) { b.preventDefault() });
                0 == s && this.close()
            }
        },
        renderItem: function(n, f) {
            var q, p = this;
            if (f.isHistory) {
                n.find(".history-t").length || $('<div class="b-line history-t"><p><span>\u5386\u53f2\u641c\u7d22</span></p></div>').appendTo(n);
                var o = $("<div class='cancel'></div>").click(function(b) {
                    b.stopPropagation();
                    b.preventDefault();
                    $(this).parent().remove();
                    p._getMenuItem().length || p.close();
                    SearchHistory.remove(f.value)
                });
                q = f.isHistory && f.url ? $('<a href="' + f.url + '"></a>').attr("target", i.submitTarget || "_blank") : $("<li>");
                q.addClass("suggest-item").attr("data-value", f.value).append($("<a>").text(f.value)).append(o).appendTo(n);
                return q
            }
            switch (f.TYPE) {
                case "tag":
                    q = $("<li>").append("<a>" + f.name + "</a>");
                    break;
                case "accurate":
                    q = $('<a href="' + f.url + '" target="_blank"><div class="r-item"><div class="preview"><img src="' + utils.trimHttp(f.s_pic || f.tp_pic) + '" /></div><div class="info"><div class="t"><span class="type"></span>' + f.name + '</div><div class="v-info"><span class="sub">\u8ba2\u9605\uff1a' + formatFriendlyNumber(f.favourite) + '</span><span class="view">\u6d4f\u89c8\uff1a' + formatFriendlyNumber(f.click) + "</span></div></div></div></a>");
                    switch (f.STYPE) {
                        case "bangumi":
                            q.addClass("bangumi").prependTo(n).find(".type").html("\u756a\u5267");
                            $('<div class="bgm-info">\u66f4\u65b0\u81f3\uff1a' + (f.isbangumi_end ? "<span>\u5df2\u5b8c\u7ed3</span> / \u5171" + f.bgmcount + "\u8bdd</div>" : "<span>\u7b2c" + f.bgmcount + "\u8bdd</span>") + "</div>").insertAfter(q.find(".t"));
                            break;
                        case "special":
                            q.addClass("special").find(".type").html("\u4e13\u9898");
                            break;
                        case "topic":
                            q.addClass("topic").find(".type").html("\u8bdd\u9898"), q.find(".sub").html("\u53d1\u5e03\uff1a" + f.writer), $('<div class="pubdate">\u65f6\u95f4\uff1a' + (new Date(1000 * f.pubdate)).format("yyyy-MM-dd") + "</div>").insertAfter(q.find(".t"))
                    }
                    break;
                case "upuser":
                    q = $('<a href="' + f.url + '" target="_blank">' + f.name + "</a>");
                    break;
                default:
                    q = $("<li>").append("<a>" + f.name + "</a>")
            }
            f.url && q.attr("target", i.submitTarget || "_blank");
            q.addClass("suggest-item").attr("data-value", f.value).appendTo(n);
            return q
        },
        makeSearchUrl: function(e, d) {
            var f = "//search.bilibili.com/" + e;
            d && (f += "?keyword=" + d);
            return f
        }
    };
    0 < $(".header .search-keyword").length && GlobalView.initSearch(".header .search", i, !0);
    $(".z_top").length && GlobalView.nav();
    $.support.opacity || ($('input[placeholder!=""][type=text]').blur(function() {
        var b = $(this).attr("placeholder");
        b && "" === this.value && (this.value = b, this.style.color = "graytext")
    }), $('input[placeholder!=""][type=text]').focus(function() {
        var b = $(this).attr("placeholder");
        b && (this.value === b && (this.value = ""), this.style.color = "")
    }), $('input[placeholder!=""][type=text]').val(function(e, d) {
        var f = $(this).attr("placeholder");
        return f ? "" === d ? (this.style.color = "graytext", f) : d : this.value
    }));
    bindCardEvent();
    bindPOCoins2($(".v"))
});
var last_sug_user_start = 0;

function createSuggestUserList(i) {
    var o, h = 0,
        n = 0;
    $("#rup_user").empty();
    i + 5 > suggest_user.length && (i = 0);
    for (o in suggest_user) {
        if (h++, !("undefined" != typeof i && h <= i)) {
            var l = suggest_user[o],
                k = !1;
            if ("undefined" != typeof window.AttentionList && "null" != typeof window.AttentionList) {
                for (var j = 0; j < window.AttentionList.length; j++) {
                    if (window.AttentionList[j] == l[0]) {
                        k = !0;
                        break
                    }
                }
            }
            if (!k && (k = $('<li><a href="//space.bilibili.com/' + l[0] + '" mid="' + l[0] + '" target="_blank" card="' + l[1] + '"><img src="' + utils.trimHttp(l[2]) + '"><div class="name">' + l[1] + '</div></a><p class="i"><a class="gz">\u5173\u6ce8</a></p><div class="info">' + l[3] + "</div></li>").appendTo("#rup_user").find(".gz"), function(d, c) { c.click(function() { 1 == c.attr("attention") ? unattentionUser(c, d, function() { c.html("\u5173\u6ce8").attr("attention", 0) }) : attentionUser(c, d, function() { c.html("\u53d6\u6d88\u5173\u6ce8").attr("attention", 1) }) }) }(parseInt(l[0]), k), last_sug_user_start = h, 5 <= ++n)) {
                break
            }
        }
    }
    bindCardEvent()
}

function createSuggestSpList(g) {
    var j, f = 0,
        i = 0;
    $("#rup_sp").empty();
    if (0 == suggest_sp.length) { $('<div class="no_more">\u6ca1\u6709\u66f4\u591a\u4fe1\u606f</div>').appendTo("#rup_sp") } else {
        for (j in g + 5 > suggest_sp.length && (g = 0), suggest_sp) {
            if (f++, !("undefined" != typeof g && f <= g)) {
                var h = suggest_sp[j];
                if ("undefined" != typeof h && "undefined" != typeof h[0] && ($('<li><a href="/sp/' + h[0] + '"><img src="' + utils.trimHttp(h[1]) + '" title="' + h[0] + '"><div class="name">' + h[0] + '</div></a><div class="info">' + (h[2] ? "\u540c\u4e49\u8bcd: <i>" + h[2] + "</i>" : "") + "<p>\u5171<b>" + h[3] + "</b>\u4e2a\u89c6\u9891</p></div></li>").appendTo("#rup_sp"), 5 <= ++i)) {
                    break
                }
            }
        }
    }
}
$(document).ready(function() {
    $("#sp_order_alpha").click(function() { $(".s-alpha").slideDown(300) });
    $(".float_window .close").click(function() { $(".float_window").fadeOut(300) })
});

function alertCharNums(b) {
    1000 < b.value.length && (b.value = b.value.substring(0, 1000));
    $("#ajaxBackMsg").html("\u5b57\u7b26\u7edf\u8ba1:" + b.value.length + "/1000")
}

function showGlobalAlert(b) {
    tips_str = '<div class="ui-widget" id="announce_alerts" style="margin: 0px; position: fixed; top: 0px; width: 980px; z-index: 100;">   <div class="ui-state-error ui-corner-all" style="padding: 0 .7em;">        <p><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;margin-top:.1em;"></span>' + b + "</p>   </div></div>";
    fc = $(".z:first-child");
    fc.before(tips_str)
}

function showGlobalTips(b) {
    tips_str = '<div class="ui-widget" id="announce_tips" style="margin: 0px; position: fixed; top: 0px; width: 980px; z-index: 100;">   <div class="ui-state-highlight ui-corner-all" style="padding: 3px .7em;">        <p><span class="ui-icon ui-icon-info" style="float: left; margin-right: .3em;"></span>' + b + "</p>   </div></div>";
    fc = $(".z:first-child");
    fc.before(tips_str)
}

function insertFlash(f, h, e, g) { document.getElementById(f) && (h = '<embed height="' + g + '" width="' + e + '" id="' + f + '_flash" pluginspage="//www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash" allowscriptaccess="always" style="visibility:hidden"  src="' + h + '" type="application/x-shockwave-flash" allowfullscreen="true" quality="high">', document.getElementById(f).innerHTML = h) }
var cb_controler;

function cb_initOnlineInfo() {}

function cb_packet(b, d) {}

function cb_getOnline(b) { $("#wait_online").html(b) }

function cb_chatlog(e, f, d) {}

function cb_onconnect(b, d) { "undefined" != typeof window.connect_cid && setInterval(function() { cb_controler.getChatRoom() }, 30000) }

function cb_initok() { cb_controler.setConnectParam(window.connect_cid ? window.connect_cid : 1, __GetCookie("DedeUserID") ? __GetCookie("DedeUserID") : 0, "") }
var scrollActivate = !0;

function goTop(s, q, r) {
    if (scrollActivate) {
        s = s || 0.1;
        q = q || 16;
        var p = 0,
            o = 0,
            l = 0,
            k = 0,
            j = 0,
            i = 0;
        document.documentElement && (p = document.documentElement.scrollLeft || 0, o = document.documentElement.scrollTop || 0);
        document.body && (l = document.body.scrollLeft || 0, k = document.body.scrollTop || 0);
        j = window.scrollX || 0;
        i = window.scrollY || 0;
        p = Math.max(p, Math.max(l, j));
        o = Math.max(o, Math.max(k, i));
        k = 1 + s;
        window.scrollTo(Math.floor(p / k), Math.floor(o / k));
        0 < p || 0 < o ? window.setTimeout("goTop(" + s + ", " + q + ")", q) : "undefined" != typeof r && r()
    } else { scrollActivate = !0 }
}

function loadNotify() { "http:" == document.location.protocol && ($('<div id="cb_controler"></div>').appendTo("body"), insertFlash("cb_controler", "//static.hdslb.com/images/bili_notify.swf", 0, 0), cb_controler = $("#cb_controler_flash").get(0)) }
var searchKW = "",
    lastPage = "";

function searchAT() {
    searchKW = $("#search_key").val();
    loadAT(1)
}

function loadAT(b) {
    b = "/account/at/at-" + b + "?search=" + searchKW + "&att=" + ($(".ms-btn.addinfo").hasClass("on") ? 1 : 0) + "&r=" + Math.random();
    if (b != lastPage) {
        lastPage = b;
        $("#atme.atlist > .loading").remove();
        $('<div class="loading"></div>').prependTo("#atme.atlist");
        var d = new Date;
        $.ajax(lastPage, {
            success: function(c) {
                var e = (new Date).getTime() - d.getTime();
                500 > e ? setTimeout(function() {
                    $("#atme.atlist").html(c);
                    bindCardEvent()
                }, 0 >= 300 - e ? 10 : 300 - e) : ($("#atme.atlist").html(c), bindCardEvent())
            }
        })
    }
}

function searchDyn() {
    searchKW = $("#search_key").val();
    loadDyn(1)
}

function loadDyn(b) {
    b = "/account/dynamic/dyn-" + b + "?search=" + searchKW + "&fb=" + ($("#track_comment").hasClass("on") ? 1 : 0) + "&r=" + Math.random();
    if (b != lastPage) {
        lastPage = b;
        $("#dynlist.atlist > .loading").remove();
        $('<div class="loading"></div>').prependTo("#dynlist.atlist");
        var d = new Date;
        $.ajax(lastPage, {
            success: function(c) {
                var e = (new Date).getTime() - d.getTime();
                500 > e ? setTimeout(function() {
                    $("#dynlist.atlist").html(c);
                    bindCardEvent()
                }, 0 >= 300 - e ? 10 : 300 - e) : ($("#dynlist.atlist").html(c), bindCardEvent())
            }
        })
    }
}
var CoverPreview = function(b) {
    function d(c) {
        return new d.prototype.init(c)
    }
    d.prototype = {
        constructor: d,
        init: function(a) {
            this.jqXHR = {};
            this.cache = {};
            this.loadingTimer = this.delayTimer = this.innerWidth = this.aid = null;
            this.options = b.extend({ mount: document.body, previewSelector: ".v .preview", multiPrevent: !1 }, a || {});
            return this
        },
        bind: function() { utils.browser.lteIE(9) || this.options.multiPrevent && "true" == b(this.options.mount).attr("data-cover-preview") || (b(this.options.mount).attr("data-cover-preview", "true"), this._mouseEvent()) },
        _mouseEvent: function() {
            var a = this;
            b(this.options.mount).on("mouseenter.c-p", this.options.previewSelector, function() {
                var g = this,
                    f = b(this).attr("href").match(/av(\d+)/);
                clearTimeout(a.delayTimer);
                clearTimeout(a.loadingTimer);
                f && (a.aid = f[1], a.loadingTimer = setTimeout(function() { a.jqXHR[a.aid] && "pending" === a.jqXHR[a.aid].state() && b(g).find(".fore > span").attr("data-loading", !0) }, 1000), a.delayTimer = setTimeout(function() {
                    a._ajaxGetInfo(g);
                    a.innerWidth = b(g).innerWidth()
                }, 100))
            }).on("mouseleave.c-p", this.options.previewSelector, function() {
                clearTimeout(a.delayTimer);
                clearTimeout(a.loadingTimer);
                b(this).find(".fore > span").attr("data-loading", !1);
                a.aid = a.innerWidth = null
            }).on("mousemove.c-p", this.options.previewSelector, function(e) {
                var f = this;
                a.aid && (a.innerWidth && a.jqXHR[a.aid]) && a.jqXHR[a.aid].done(function(c) { c && (!c.code && c.data) && a._setPosition(f, e.pageX, c.data) })
            })
        },
        _ajaxGetInfo: function(a) {
            var g = this,
                f = this.aid;
            this.jqXHR[f] ? this.jqXHR[f].done(function(c) { c && (!c.code && c.data) && g._buildPreview(a, c.data) }) : this.jqXHR[f] = b.ajax({ url: "//api.bilibili.com/pvideo", data: { aid: f, type: "jsonp" }, dataType: "jsonp" }).done(function(c) { c && (!c.code && c.data) && g._buildPreview(a, c.data) }).fail(function() {}).always(function() { b(a).find(".fore > span").attr("data-loading", !1) })
        },
        _buildPreview: function(a, n) {
            var l = this.aid,
                k = new Image,
                j = [];
            if (n.image[0] && (k.onload = function() {
                    b(a).attr("data-cover-loaded", !0);
                    b(a).find(".back > div").css({ backgroundImage: "url(" + utils.trimHttp(n.image[0]) + ")" })
                }, k.src = utils.trimHttp(n.image[0]), !b.isArray(this.cache[l]))) {
                for (var i in n.index) { j.push(+i) }
                j.sort(function(e, c) {
                    return e - c
                });
                this._cacheArray(j, 10)
            }
        },
        _cacheArray: function(h, l) {
            var k = 0,
                j = 1,
                i = [];
            if (h.length > l) {
                for (100 < h.length && (h.length = 100), j = Math.floor(h.length / l), k = 0; k < h.length && !(i.push(h[k]), i.length >= l); k += j) {}
            } else { i = h }
            this.cache[this.aid] = i
        },
        _setPosition: function(a, n, l) {
            var k = b(a).innerWidth(),
                j = l.img_y_size / l.img_x_size * k,
                i = 100 * ((n - b(a).offset().left - 0.1) / k);
            0 > i && (i = 0);
            n = this.cache[this.aid][Math.floor(this.cache[this.aid].length / 100 * i)];
            i = i.toFixed(2) + "%";
            b(a).find(".fore > .bar > div").css("width", i);
            b(a).find(".back > div").css({ backgroundPosition: -n % l.img_x_len * k + "px " + (-Math.floor(n / l.img_x_len) * j + "px"), backgroundSize: l.img_x_len * k })
        }
    };
    d.prototype.init.prototype = d.prototype;
    return d
}(jQuery);
$(document).ready(function() {
    $("[data-fn-size]").each(function() {
        var e = $(this).attr("data-fn-src"),
            f = $(this).attr("data-fn-size").split(",");
        f[0] && e && ($(this).attr("src", utils.thumbnail(e, f[0], f[1])), $(this).removeAttr("data-fn-size data-fn-src"))
    });
    var b = "";
    utils.isBeta([4]) && (b = "https://www.bilibili.com/ranking_beta");
    utils.isBeta([8]) && (b = "//www.bilibili.com/ranking_beta");
    var d = { 1: "#animel", 13: "#bangumi/all", 3: "#music", 129: "#dance", 4: "#game", 160: "#life", 36: "#tech", 119: "#kichiku", 155: "#fashion", 5: "#ent", 23: "#film", 11: "#tv" };
    if (utils.isBeta([4, 8])) {
        $("body").on("click", function(a) {
            a = a.target;
            var f = $(a).attr("href"),
                c;
            ("link-ranking" === a.className || $(".link-ranking").find(a).length) && $(".link-ranking").attr("href", b);
            "string" !== typeof f || "//www.bilibili.com/" != location.href && "//www.bilibili.com/index.html" != location.href || (c = f.split("/")[3]);
            c && d[c] && $(a).attr("href", b + d[c])
        })
    }
});
$(document).ready(function() { getTitleBanner() });

function getTitleBanner(b) {
    var d = { 1: "1576", 13: "1612", 3: "1580", 129: "1584", 4: "1588", 36: "1592", 160: "1600", 119: "1608", 155: "1604", 165: "1620", 166: "1620", 167: "1920", 5: "1596", 23: "1634", 11: "1616" };
    b = b || $(".header .num .m-i.on").attr("data-tid");
    23 == b && 11 == window.tid && (b = window.tid);
    $.ajax({
        url: utils.protocolRelative("//api.bilibili.com/x/web-show/res/loc"),
        data: { pf: 0, id: d[b] || 142, jsonp: "jsonp" },
        dataType: "jsonp",
        success: function(a) {
            if (a && 0 === a.code && (a = a.data[0]) && a.pic && a.url) {
                a.loc_id = d[b] || 142;
                $(".z_top_container~.header,.z_top_container .b-header-mask-bg").css("background-image", "url(" + utils.trimHttp(a.pic) + ")");
                var h, g, c;
                c = $(".header");
                $(".header .header-link").length ? $(".header .header-link").attr({ href: utils.trimHttp(a.url), "data-loc-id": a.loc_id, target: "_blank" }) : c.prepend("<a class='header-link' target='_blank' href=\"" + utils.trimHttp(a.url) + '" data-loc-id="' + a.loc_id + '">');
                $(".header .header-layer").length ? h = $(".header .header-layer") : (h = $('<div class="header-layer"></div>'), c.prepend(h));
                a.name && ($(".header .banner-title").length ? g = $(".header .banner-title").text(a.name) : (g = $('<div class="banner-title">' + a.name + "</div>"), $(".header .h-center ").append(g)));
                c.find("> .header-layer, > .header-link").height(c.find(".h-center").height()).hover(function() { g.addClass("in") }, function() { g.removeClass("in") });
                $(".header a.logo").css("background-image", "url(" + utils.trimHttp(a.litpic) + ")");
                $(".z_top").addClass(a.style ? "b-header-blur-black" : "white")
            }
        },
        error: function() {}
    })
}(function() {
    for (var b = 0; 19 >= b; b++) {
        var d = "er" + b;
        utils.cookie.get(d) && __SetCookie(d, "", -1);
        d = "san" + b;
        utils.cookie.get(d) && __SetCookie(d, "", -1)
    }
})();
$(document).ready(function() {
    function f() {
        e = performance.timing.loadEventEnd - performance.timing.navigationStart;
        0 > e ? (clearTimeout(g), g = setTimeout(function() { f() }, 3000)) : h()
    }

    function h() { $.ajax({ url: "//data.bilibili.com/v/void/web_ld_time", type: "get", data: { mid: __GetCookie("DedeUserID"), info_type: "home_ld", ld_time: e, jsonp: "jsonp" }, dataType: "jsonp" }) }
    if (void 0 != window.pageLoadStart) {
        var e, g;
        if ("//www.bilibili.com/" == location.href || "https://www.bilibili.com/" == location.href || "//www.bilibili.com/account/dynamic" == location.href || "https://www.bilibili.com/account/dynamic" == location.href) { window.performance && window.performance.timing ? f() : (e = (Date.now ? Date.now() : (new Date).getTime()) - pageLoadStart, h()) }
    }
});
$(document).ready(function() { /MSIE 8/.test(navigator.userAgent) && $("body").prepend("<div id='the-IE-tip'>\u4e3a\u4e86\u4fdd\u62a4\u4f60\u7684\u8d26\u53f7\u5b89\u5168\uff0cbilibili\u5373\u5c06\u4e0d\u652f\u6301IE8\u53ca\u4ee5\u4e0b\u7248\u672c\u6d4f\u89c8\u5668\u8bbf\u95ee\uff0c\u5efa\u8bae\u4f60\u5347\u7ea7\u5230IE\u6700\u65b0\u7248\u672c\u6d4f\u89c8\u5668\uff0c\u6216\u4f7f\u7528Chrome\u7b49\u5176\u4ed6\u6d4f\u89c8\u5668\u3002</div>") });
(function(b) {
    var d = b.ajax;
    b.ajax = function(a, c) {
        "object" == typeof a && (c = a, a = void 0);
        "post" != c.type && "POST" != c.type || (!c.data || c.data.csrf) || b.extend(c.data, { csrf: utils.cookie && utils.cookie.get("bili_jct") });
        return d(a, c)
    }
})(jQuery);
