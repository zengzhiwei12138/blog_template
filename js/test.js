/**
 * Created by Mengkun(https://mkblog.cn) on 2017/12/17.
 *
 * Updated On 2018/7/15 3
 */

// comment
jQuery(document).ready(function (a) {
    a("#comment").bind("keydown", function (b) {
        b = window.event ? window.event : b;
        null !== b && b.ctrlKey && 13 == b.keyCode && a("#commentform #submit").click()
    });
    jQuery(document).on("submit", "#commentform", function () {
        a("#commentform #submit").attr("disabled", !0);
        showCommentMsg("\u8ba9\u8bc4\u8bba\u98de\u4e00\u4f1a\u513f~", "wait", !1);
        a.ajax({
            url: mk_theme_api.ajax_url,
            data: a(this).serialize() + "&action=ajax_comment",
            type: a(this).attr("method"),
            complete: function (b, c) {
                setTimeout(function () {
                    a("#comment-tips").stop().fadeOut();
                    a("#commentform #submit").attr("disabled", !1)
                }, 3E3)
            },
            error: function (a) {
                a = a.responseText;
                void 0 === a && (a = "\u60a8\u7684\u64cd\u4f5c\u592a\u9891\u7e41\uff0c\u8bf7\u91cd\u8bd5...");
                showCommentMsg(a, "error", !1)
            },
            success: function (b) {
                1 > a("#comment_parent").val() ? (a("#comments>.comment-list").length || a("#respond").after('<ol class="comment-list"></ol>'), a("#comments>.comment-list").prepend(b), a("html, body").animate({scrollTop: a("#comments>.comment-list").offset().top}, "500")) : (a("#respond").before(b), a("html, body").animate({scrollTop: a("#respond").offset().top},
                    "500"));
                a("#cancel-comment-reply-link").click();
                a("#commentform textarea[name=comment]").val("");
                showCommentMsg("\u8bc4\u8bba\u53d1\u8868\u6210\u529f", "success", !1);
                parseEmoji()
            }
        });
        return !1
    });
    addComment = {
        moveForm: function (b, c, d, e, f) {
            clone = a("#respond").clone(!0);
            a("#respond").remove();
            a("#" + b).after(clone);
            a("#comment_parent").val(c);
            a("#cancel-comment-reply-link").show();
            a(".comment-form-tools span[data-action=emoji]").data("loaded", !1);
            return !1
        }
    };
    a(document).on("click", "#cancel-comment-reply-link",
        function () {
            clone = a("#respond").clone(!0);
            a("#respond").remove();
            a("#comments").prepend(clone);
            a("#cancel-comment-reply-link").hide();
            a("#comment_parent").val("");
            a(".comment-form-tools span[data-action=emoji]").data("loaded", !1)
        })
});


/*!
 * headroom.js v0.9.4 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2017 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */

!function (a, b) {
    "use strict";
    "function" == typeof define && define.amd ? define([], b) : "object" == typeof exports ? module.exports = b() : a.Headroom = b()
}(this, function () {
    "use strict";

    function a(a) {
        this.callback = a, this.ticking = !1
    }

    function b(a) {
        return a && "undefined" != typeof window && (a === window || a.nodeType)
    }

    function c(a) {
        if (arguments.length <= 0) throw new Error("Missing arguments in extend function");
        var d, e, f = a || {};
        for (e = 1; e < arguments.length; e++) {
            var g = arguments[e] || {};
            for (d in g) "object" != typeof f[d] || b(f[d]) ? f[d] = f[d] || g[d] : f[d] = c(f[d], g[d])
        }
        return f
    }

    function d(a) {
        return a === Object(a) ? a : {down: a, up: a}
    }

    function e(a, b) {
        b = c(b, e.options), this.lastKnownScrollY = 0, this.elem = a, this.tolerance = d(b.tolerance), this.classes = b.classes, this.offset = b.offset, this.scroller = b.scroller, this.initialised = !1, this.onPin = b.onPin, this.onUnpin = b.onUnpin, this.onTop = b.onTop, this.onNotTop = b.onNotTop, this.onBottom = b.onBottom, this.onNotBottom = b.onNotBottom
    }

    var f = {
        bind: !!function () {
        }.bind,
        classList: "classList" in document.documentElement,
        rAF: !!(window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame)
    };
    return window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame, a.prototype = {
        constructor: a,
        update: function () {
            this.callback && this.callback(), this.ticking = !1
        },
        requestTick: function () {
            this.ticking || (requestAnimationFrame(this.rafCallback || (this.rafCallback = this.update.bind(this))), this.ticking = !0)
        },
        handleEvent: function () {
            this.requestTick()
        }
    }, e.prototype = {
        constructor: e, init: function () {
            if (e.cutsTheMustard) return this.debouncer = new a(this.update.bind(this)), this.elem.classList.add(this.classes.initial), setTimeout(this.attachEvent.bind(this), 100), this
        }, destroy: function () {
            var a = this.classes;
            this.initialised = !1;
            for (var b in a) a.hasOwnProperty(b) && this.elem.classList.remove(a[b]);
            this.scroller.removeEventListener("scroll", this.debouncer, !1)
        }, attachEvent: function () {
            this.initialised || (this.lastKnownScrollY = this.getScrollY(), this.initialised = !0, this.scroller.addEventListener("scroll", this.debouncer, !1), this.debouncer.handleEvent())
        }, unpin: function () {
            var a = this.elem.classList, b = this.classes;
            !a.contains(b.pinned) && a.contains(b.unpinned) || (a.add(b.unpinned), a.remove(b.pinned), this.onUnpin && this.onUnpin.call(this))
        }, pin: function () {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.unpinned) && (a.remove(b.unpinned), a.add(b.pinned), this.onPin && this.onPin.call(this))
        }, top: function () {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.top) || (a.add(b.top), a.remove(b.notTop), this.onTop && this.onTop.call(this))
        }, notTop: function () {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.notTop) || (a.add(b.notTop), a.remove(b.top), this.onNotTop && this.onNotTop.call(this))
        }, bottom: function () {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.bottom) || (a.add(b.bottom), a.remove(b.notBottom), this.onBottom && this.onBottom.call(this))
        }, notBottom: function () {
            var a = this.elem.classList, b = this.classes;
            a.contains(b.notBottom) || (a.add(b.notBottom), a.remove(b.bottom), this.onNotBottom && this.onNotBottom.call(this))
        }, getScrollY: function () {
            return void 0 !== this.scroller.pageYOffset ? this.scroller.pageYOffset : void 0 !== this.scroller.scrollTop ? this.scroller.scrollTop : (document.documentElement || document.body.parentNode || document.body).scrollTop
        }, getViewportHeight: function () {
            return window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }, getElementPhysicalHeight: function (a) {
            return Math.max(a.offsetHeight, a.clientHeight)
        }, getScrollerPhysicalHeight: function () {
            return this.scroller === window || this.scroller === document.body ? this.getViewportHeight() : this.getElementPhysicalHeight(this.scroller)
        }, getDocumentHeight: function () {
            var a = document.body, b = document.documentElement;
            return Math.max(a.scrollHeight, b.scrollHeight, a.offsetHeight, b.offsetHeight, a.clientHeight, b.clientHeight)
        }, getElementHeight: function (a) {
            return Math.max(a.scrollHeight, a.offsetHeight, a.clientHeight)
        }, getScrollerHeight: function () {
            return this.scroller === window || this.scroller === document.body ? this.getDocumentHeight() : this.getElementHeight(this.scroller)
        }, isOutOfBounds: function (a) {
            var b = a < 0, c = a + this.getScrollerPhysicalHeight() > this.getScrollerHeight();
            return b || c
        }, toleranceExceeded: function (a, b) {
            return Math.abs(a - this.lastKnownScrollY) >= this.tolerance[b]
        }, shouldUnpin: function (a, b) {
            var c = a > this.lastKnownScrollY, d = a >= this.offset;
            return c && d && b
        }, shouldPin: function (a, b) {
            var c = a < this.lastKnownScrollY, d = a <= this.offset;
            return c && b || d
        }, update: function () {
            var a = this.getScrollY(), b = a > this.lastKnownScrollY ? "down" : "up", c = this.toleranceExceeded(a, b);
            this.isOutOfBounds(a) || (a <= this.offset ? this.top() : this.notTop(), a + this.getViewportHeight() >= this.getScrollerHeight() ? this.bottom() : this.notBottom(), this.shouldUnpin(a, c) ? this.unpin() : this.shouldPin(a, c) && this.pin(), this.lastKnownScrollY = a)
        }
    }, e.options = {
        tolerance: {up: 0, down: 0},
        offset: 0,
        scroller: window,
        classes: {
            pinned: "headroom--pinned",
            unpinned: "headroom--unpinned",
            top: "headroom--top",
            notTop: "headroom--not-top",
            bottom: "headroom--bottom",
            notBottom: "headroom--not-bottom",
            initial: "headroom"
        }
    }, e.cutsTheMustard = "undefined" != typeof f && f.rAF && f.bind && f.classList, e
});

// jQuery headroom
(function ($) {
    if (!$) {
        return
    }
    $.fn.headroom = function (option) {
        return this.each(function () {
            var $this = $(this), data = $this.data('headroom'), options = typeof option === 'object' && option;
            options = $.extend(true, {}, Headroom.options, options);
            if (!data) {
                data = new Headroom(this, options);
                data.init();
                $this.data('headroom', data)
            }
            if (typeof option === 'string') {
                data[option]();
                if (option === 'destroy') {
                    $this.removeData('headroom')
                }
            }
        })
    };
    $('[data-headroom]').each(function () {
        var $this = $(this);
        $this.headroom($this.data())
    })
}(window.Zepto || window.jQuery));


/*!
 * clipboard.js v2.0.0
 * https://zenorocha.github.io/clipboard.js
 *
 * Licensed MIT © Zeno Rocha
 */
!function (t, e) {
    "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define([], e) : "object" == typeof exports ? exports.ClipboardJS = e() : t.ClipboardJS = e()
}(this, function () {
    return function (t) {
        function e(o) {
            if (n[o]) return n[o].exports;
            var r = n[o] = {i: o, l: !1, exports: {}};
            return t[o].call(r.exports, r, r.exports, e), r.l = !0, r.exports
        }

        var n = {};
        return e.m = t, e.c = n, e.i = function (t) {
            return t
        }, e.d = function (t, n, o) {
            e.o(t, n) || Object.defineProperty(t, n, {configurable: !1, enumerable: !0, get: o})
        }, e.n = function (t) {
            var n = t && t.__esModule ? function () {
                return t.default
            } : function () {
                return t
            };
            return e.d(n, "a", n), n
        }, e.o = function (t, e) {
            return Object.prototype.hasOwnProperty.call(t, e)
        }, e.p = "", e(e.s = 3)
    }([function (t, e, n) {
        var o, r, i;
        !function (a, c) {
            r = [t, n(7)], o = c, void 0 !== (i = "function" == typeof o ? o.apply(e, r) : o) && (t.exports = i)
        }(0, function (t, e) {
            "use strict";

            function n(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            var o = function (t) {
                return t && t.__esModule ? t : {default: t}
            }(e), r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                return typeof t
            } : function (t) {
                return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
            }, i = function () {
                function t(t, e) {
                    for (var n = 0; n < e.length; n++) {
                        var o = e[n];
                        o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                    }
                }

                return function (e, n, o) {
                    return n && t(e.prototype, n), o && t(e, o), e
                }
            }(), a = function () {
                function t(e) {
                    n(this, t), this.resolveOptions(e), this.initSelection()
                }

                return i(t, [{
                    key: "resolveOptions", value: function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                        this.action = t.action, this.container = t.container, this.emitter = t.emitter, this.target = t.target, this.text = t.text, this.trigger = t.trigger, this.selectedText = ""
                    }
                }, {
                    key: "initSelection", value: function () {
                        this.text ? this.selectFake() : this.target && this.selectTarget()
                    }
                }, {
                    key: "selectFake", value: function () {
                        var t = this, e = "rtl" == document.documentElement.getAttribute("dir");
                        this.removeFake(), this.fakeHandlerCallback = function () {
                            return t.removeFake()
                        }, this.fakeHandler = this.container.addEventListener("click", this.fakeHandlerCallback) || !0, this.fakeElem = document.createElement("textarea"), this.fakeElem.style.fontSize = "12pt", this.fakeElem.style.border = "0", this.fakeElem.style.padding = "0", this.fakeElem.style.margin = "0", this.fakeElem.style.position = "absolute", this.fakeElem.style[e ? "right" : "left"] = "-9999px";
                        var n = window.pageYOffset || document.documentElement.scrollTop;
                        this.fakeElem.style.top = n + "px", this.fakeElem.setAttribute("readonly", ""), this.fakeElem.value = this.text, this.container.appendChild(this.fakeElem), this.selectedText = (0, o.default)(this.fakeElem), this.copyText()
                    }
                }, {
                    key: "removeFake", value: function () {
                        this.fakeHandler && (this.container.removeEventListener("click", this.fakeHandlerCallback), this.fakeHandler = null, this.fakeHandlerCallback = null), this.fakeElem && (this.container.removeChild(this.fakeElem), this.fakeElem = null)
                    }
                }, {
                    key: "selectTarget", value: function () {
                        this.selectedText = (0, o.default)(this.target), this.copyText()
                    }
                }, {
                    key: "copyText", value: function () {
                        var t = void 0;
                        try {
                            t = document.execCommand(this.action)
                        } catch (e) {
                            t = !1
                        }
                        this.handleResult(t)
                    }
                }, {
                    key: "handleResult", value: function (t) {
                        this.emitter.emit(t ? "success" : "error", {
                            action: this.action,
                            text: this.selectedText,
                            trigger: this.trigger,
                            clearSelection: this.clearSelection.bind(this)
                        })
                    }
                }, {
                    key: "clearSelection", value: function () {
                        this.trigger && this.trigger.focus(), window.getSelection().removeAllRanges()
                    }
                }, {
                    key: "destroy", value: function () {
                        this.removeFake()
                    }
                }, {
                    key: "action", set: function () {
                        var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "copy";
                        if (this._action = t, "copy" !== this._action && "cut" !== this._action) throw new Error('Invalid "action" value, use either "copy" or "cut"')
                    }, get: function () {
                        return this._action
                    }
                }, {
                    key: "target", set: function (t) {
                        if (void 0 !== t) {
                            if (!t || "object" !== (void 0 === t ? "undefined" : r(t)) || 1 !== t.nodeType) throw new Error('Invalid "target" value, use a valid Element');
                            if ("copy" === this.action && t.hasAttribute("disabled")) throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute');
                            if ("cut" === this.action && (t.hasAttribute("readonly") || t.hasAttribute("disabled"))) throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes');
                            this._target = t
                        }
                    }, get: function () {
                        return this._target
                    }
                }]), t
            }();
            t.exports = a
        })
    }, function (t, e, n) {
        function o(t, e, n) {
            if (!t && !e && !n) throw new Error("Missing required arguments");
            if (!c.string(e)) throw new TypeError("Second argument must be a String");
            if (!c.fn(n)) throw new TypeError("Third argument must be a Function");
            if (c.node(t)) return r(t, e, n);
            if (c.nodeList(t)) return i(t, e, n);
            if (c.string(t)) return a(t, e, n);
            throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")
        }

        function r(t, e, n) {
            return t.addEventListener(e, n), {
                destroy: function () {
                    t.removeEventListener(e, n)
                }
            }
        }

        function i(t, e, n) {
            return Array.prototype.forEach.call(t, function (t) {
                t.addEventListener(e, n)
            }), {
                destroy: function () {
                    Array.prototype.forEach.call(t, function (t) {
                        t.removeEventListener(e, n)
                    })
                }
            }
        }

        function a(t, e, n) {
            return u(document.body, t, e, n)
        }

        var c = n(6), u = n(5);
        t.exports = o
    }, function (t, e) {
        function n() {
        }

        n.prototype = {
            on: function (t, e, n) {
                var o = this.e || (this.e = {});
                return (o[t] || (o[t] = [])).push({fn: e, ctx: n}), this
            }, once: function (t, e, n) {
                function o() {
                    r.off(t, o), e.apply(n, arguments)
                }

                var r = this;
                return o._ = e, this.on(t, o, n)
            }, emit: function (t) {
                var e = [].slice.call(arguments, 1), n = ((this.e || (this.e = {}))[t] || []).slice(), o = 0,
                    r = n.length;
                for (o; o < r; o++) n[o].fn.apply(n[o].ctx, e);
                return this
            }, off: function (t, e) {
                var n = this.e || (this.e = {}), o = n[t], r = [];
                if (o && e) for (var i = 0, a = o.length; i < a; i++) o[i].fn !== e && o[i].fn._ !== e && r.push(o[i]);
                return r.length ? n[t] = r : delete n[t], this
            }
        }, t.exports = n
    }, function (t, e, n) {
        var o, r, i;
        !function (a, c) {
            r = [t, n(0), n(2), n(1)], o = c, void 0 !== (i = "function" == typeof o ? o.apply(e, r) : o) && (t.exports = i)
        }(0, function (t, e, n, o) {
            "use strict";

            function r(t) {
                return t && t.__esModule ? t : {default: t}
            }

            function i(t, e) {
                if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function")
            }

            function a(t, e) {
                if (!t) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
                return !e || "object" != typeof e && "function" != typeof e ? t : e
            }

            function c(t, e) {
                if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function, not " + typeof e);
                t.prototype = Object.create(e && e.prototype, {
                    constructor: {
                        value: t,
                        enumerable: !1,
                        writable: !0,
                        configurable: !0
                    }
                }), e && (Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e)
            }

            function u(t, e) {
                var n = "data-clipboard-" + t;
                if (e.hasAttribute(n)) return e.getAttribute(n)
            }

            var l = r(e), s = r(n), f = r(o),
                d = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (t) {
                    return typeof t
                } : function (t) {
                    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t
                }, h = function () {
                    function t(t, e) {
                        for (var n = 0; n < e.length; n++) {
                            var o = e[n];
                            o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(t, o.key, o)
                        }
                    }

                    return function (e, n, o) {
                        return n && t(e.prototype, n), o && t(e, o), e
                    }
                }(), p = function (t) {
                    function e(t, n) {
                        i(this, e);
                        var o = a(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
                        return o.resolveOptions(n), o.listenClick(t), o
                    }

                    return c(e, t), h(e, [{
                        key: "resolveOptions", value: function () {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                            this.action = "function" == typeof t.action ? t.action : this.defaultAction, this.target = "function" == typeof t.target ? t.target : this.defaultTarget, this.text = "function" == typeof t.text ? t.text : this.defaultText, this.container = "object" === d(t.container) ? t.container : document.body
                        }
                    }, {
                        key: "listenClick", value: function (t) {
                            var e = this;
                            this.listener = (0, f.default)(t, "click", function (t) {
                                return e.onClick(t)
                            })
                        }
                    }, {
                        key: "onClick", value: function (t) {
                            var e = t.delegateTarget || t.currentTarget;
                            this.clipboardAction && (this.clipboardAction = null), this.clipboardAction = new l.default({
                                action: this.action(e),
                                target: this.target(e),
                                text: this.text(e),
                                container: this.container,
                                trigger: e,
                                emitter: this
                            })
                        }
                    }, {
                        key: "defaultAction", value: function (t) {
                            return u("action", t)
                        }
                    }, {
                        key: "defaultTarget", value: function (t) {
                            var e = u("target", t);
                            if (e) return document.querySelector(e)
                        }
                    }, {
                        key: "defaultText", value: function (t) {
                            return u("text", t)
                        }
                    }, {
                        key: "destroy", value: function () {
                            this.listener.destroy(), this.clipboardAction && (this.clipboardAction.destroy(), this.clipboardAction = null)
                        }
                    }], [{
                        key: "isSupported", value: function () {
                            var t = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : ["copy", "cut"],
                                e = "string" == typeof t ? [t] : t, n = !!document.queryCommandSupported;
                            return e.forEach(function (t) {
                                n = n && !!document.queryCommandSupported(t)
                            }), n
                        }
                    }]), e
                }(s.default);
            t.exports = p
        })
    }, function (t, e) {
        function n(t, e) {
            for (; t && t.nodeType !== o;) {
                if ("function" == typeof t.matches && t.matches(e)) return t;
                t = t.parentNode
            }
        }

        var o = 9;
        if ("undefined" != typeof Element && !Element.prototype.matches) {
            var r = Element.prototype;
            r.matches = r.matchesSelector || r.mozMatchesSelector || r.msMatchesSelector || r.oMatchesSelector || r.webkitMatchesSelector
        }
        t.exports = n
    }, function (t, e, n) {
        function o(t, e, n, o, r) {
            var a = i.apply(this, arguments);
            return t.addEventListener(n, a, r), {
                destroy: function () {
                    t.removeEventListener(n, a, r)
                }
            }
        }

        function r(t, e, n, r, i) {
            return "function" == typeof t.addEventListener ? o.apply(null, arguments) : "function" == typeof n ? o.bind(null, document).apply(null, arguments) : ("string" == typeof t && (t = document.querySelectorAll(t)), Array.prototype.map.call(t, function (t) {
                return o(t, e, n, r, i)
            }))
        }

        function i(t, e, n, o) {
            return function (n) {
                n.delegateTarget = a(n.target, e), n.delegateTarget && o.call(t, n)
            }
        }

        var a = n(4);
        t.exports = r
    }, function (t, e) {
        e.node = function (t) {
            return void 0 !== t && t instanceof HTMLElement && 1 === t.nodeType
        }, e.nodeList = function (t) {
            var n = Object.prototype.toString.call(t);
            return void 0 !== t && ("[object NodeList]" === n || "[object HTMLCollection]" === n) && "length" in t && (0 === t.length || e.node(t[0]))
        }, e.string = function (t) {
            return "string" == typeof t || t instanceof String
        }, e.fn = function (t) {
            return "[object Function]" === Object.prototype.toString.call(t)
        }
    }, function (t, e) {
        function n(t) {
            var e;
            if ("SELECT" === t.nodeName) t.focus(), e = t.value; else if ("INPUT" === t.nodeName || "TEXTAREA" === t.nodeName) {
                var n = t.hasAttribute("readonly");
                n || t.setAttribute("readonly", ""), t.select(), t.setSelectionRange(0, t.value.length), n || t.removeAttribute("readonly"), e = t.value
            } else {
                t.hasAttribute("contenteditable") && t.focus();
                var o = window.getSelection(), r = document.createRange();
                r.selectNodeContents(t), o.removeAllRanges(), o.addRange(r), e = o.toString()
            }
            return e
        }

        t.exports = n
    }])
});


/* InstantClick 3.0.1 | (C) 2014 Alexandre Dieulot | http://instantclick.io/license.html */
var InstantClick = function (d, r) {
    var B = navigator.userAgent, E = "createTouch" in d, C, e, l, c = {}, G, L = false, h = false, u = false, A = false,
        I = {}, a = false, o = false, g = [], x, F, v, y = {fetch: [], receive: [], wait: [], change: []};

    function t(R) {
        var Q = R.indexOf("#");
        if (Q < 0) {
            return R
        }
        return R.substr(0, Q)
    }

    function f(Q) {
        while (Q.nodeName != "A") {
            Q = Q.parentNode
        }
        return Q
    }

    function M(Q) {
        do {
            if (!Q.hasAttribute) {
                break
            }
            if (Q.hasAttribute("data-instant")) {
                return false
            }
            if (Q.hasAttribute("data-no-instant")) {
                return true
            }
        } while (Q = Q.parentNode);
        return false
    }

    function P(Q) {
        do {
            if (!Q.hasAttribute) {
                break
            }
            if (Q.hasAttribute("data-no-instant")) {
                return false
            }
            if (Q.hasAttribute("data-instant")) {
                return true
            }
        } while (Q = Q.parentNode);
        return false
    }

    function b(S, Q) {
        for (var R = 0; R < y[S].length; R++) {
            y[S][R](Q)
        }
    }

    function k(W, Q, U, T) {
        d.title = W;
        d.documentElement.replaceChild(Q, d.body);
        if (U) {
            history.pushState(null, null, U);
            var S = U.indexOf("#"), R = S > -1 && d.getElementById(U.substr(S + 1)), V = 0;
            if (R) {
                while (R.offsetParent) {
                    V += R.offsetTop;
                    R = R.offsetParent
                }
            }
            scrollTo(0, V);
            C = t(U)
        } else {
            scrollTo(0, T)
        }
        m();
        H.done();
        b("change", false)
    }

    function p() {
        a = false;
        o = false
    }

    function q(Q) {
        n(f(Q.target).href)
    }

    function K(R) {
        var Q = f(R.target);
        Q.addEventListener("mouseout", N);
        if (!v) {
            n(Q.href)
        } else {
            e = Q.href;
            l = setTimeout(n, v)
        }
    }

    function O(R) {
        var Q = f(R.target);
        if (F) {
            Q.removeEventListener("mousedown", q)
        } else {
            Q.removeEventListener("mouseover", K)
        }
        n(Q.href)
    }

    function D(Q) {
        if (Q.which > 1 || Q.metaKey || Q.ctrlKey) {
            return
        }
        Q.preventDefault();
        w(f(Q.target).href)
    }

    function N() {
        if (l) {
            clearTimeout(l);
            l = false;
            return
        }
        if (!a || o) {
            return
        }
        G.abort();
        p()
    }

    function s() {
        if (G.readyState < 4) {
            return
        }
        if (G.status == 0) {
            return
        }
        I.ready = +new Date - I.start;
        b("receive");
        if (G.getResponseHeader("Content-Type").match(/\/(x|ht|xht)ml/)) {
            var X = d.implementation.createHTMLDocument("");
            X.documentElement.innerHTML = G.responseText;
            h = X.title;
            A = X.body;
            var T = t(L);
            c[T] = {body: A, title: h, scrollY: T in c ? c[T].scrollY : 0};
            var Q = X.head.children, W = 0, U, V;
            for (var S = Q.length - 1; S >= 0; S--) {
                U = Q[S];
                if (U.hasAttribute("data-instant-track")) {
                    V = U.getAttribute("href") || U.getAttribute("src") || U.innerHTML;
                    for (var R = g.length - 1; R >= 0; R--) {
                        if (g[R] == V) {
                            W++
                        }
                    }
                }
            }
            if (W != g.length) {
                u = true
            }
        } else {
            u = true
        }
        if (o) {
            o = false;
            w(L)
        }
    }

    function m(Z) {
        var R = d.getElementsByTagName("a"), Y, U = r.protocol + "//" + r.host;
        for (var V = R.length - 1; V >= 0; V--) {
            Y = R[V];
            if (Y.target || Y.hasAttribute("download") || Y.href.indexOf(U + "/") != 0 || (Y.href.indexOf("#") > -1 && t(Y.href) == C) || (x ? !P(Y) : M(Y))) {
                continue
            }
            Y.addEventListener("touchstart", O);
            if (F) {
                Y.addEventListener("mousedown", q)
            } else {
                Y.addEventListener("mouseover", K)
            }
            Y.addEventListener("click", D)
        }
        if (!Z) {
            var S = d.body.getElementsByTagName("script"), X, Q, W, T;
            for (V = 0, j = S.length; V < j; V++) {
                X = S[V];
                if (X.hasAttribute("data-no-instant")) {
                    continue
                }
                Q = d.createElement("script");
                if (X.src) {
                    Q.src = X.src
                }
                if (X.innerHTML) {
                    Q.innerHTML = X.innerHTML
                }
                W = X.parentNode;
                T = X.nextSibling;
                W.removeChild(X);
                W.insertBefore(Q, T)
            }
        }
    }

    function n(Q) {
        if (!F && "display" in I && +new Date - (I.start + I.display) < 100) {
            return
        }
        if (l) {
            clearTimeout(l);
            l = false
        }
        if (!Q) {
            Q = e
        }
        if (a && (Q == L || o)) {
            return
        }
        a = true;
        o = false;
        L = Q;
        A = false;
        u = false;
        I = {start: +new Date};
        b("fetch");
        G.open("GET", Q);
        G.send()
    }

    function w(Q) {
        if (!("display" in I)) {
            I.display = +new Date - I.start
        }
        if (l) {
            if (L && L != Q) {
                r.href = Q;
                return
            }
            n(Q);
            H.start(0, true);
            b("wait");
            o = true;
            return
        }
        if (!a || o) {
            r.href = Q;
            return
        }
        if (u) {
            r.href = L;
            return
        }
        if (!A) {
            H.start(0, true);
            b("wait");
            o = true;
            return
        }
        c[C].scrollY = pageYOffset;
        p();
        k(h, A, L)
    }

    var H = function () {
        var Z, U, aa, Q, Y;

        function ab() {
            Z = d.createElement("div");
            Z.id = "instantclick";
            U = d.createElement("div");
            U.id = "instantclick-bar";
            U.className = "instantclick-bar";
            Z.appendChild(U);
            var af = ["Webkit", "Moz", "O"];
            aa = "transform";
            if (!(aa in U.style)) {
                for (var ac = 0; ac < 3; ac++) {
                    if (af[ac] + "Transform" in U.style) {
                        aa = af[ac] + "Transform"
                    }
                }
            }
            var ae = "transition";
            if (!(ae in U.style)) {
                for (var ac = 0; ac < 3; ac++) {
                    if (af[ac] + "Transition" in U.style) {
                        ae = "-" + af[ac].toLowerCase() + "-" + ae
                    }
                }
            }
            var ad = d.createElement("style");
            ad.innerHTML = "#instantclick{position:" + (E ? "absolute" : "fixed") + ";top:0;left:0;width:100%;pointer-events:none;z-index:2147483647;" + ae + ":opacity .25s .1s}.instantclick-bar{background:#29d;width:100%;margin-left:-100%;height:2px;" + ae + ":all .25s}";
            d.head.appendChild(ad);
            if (E) {
                S();
                addEventListener("resize", S);
                addEventListener("scroll", S)
            }
        }

        function R(ac, ad) {
            Q = ac;
            if (d.getElementById(Z.id)) {
                d.body.removeChild(Z)
            }
            Z.style.opacity = "1";
            if (d.getElementById(Z.id)) {
                d.body.removeChild(Z)
            }
            X();
            if (ad) {
                setTimeout(V, 0)
            }
            clearTimeout(Y);
            Y = setTimeout(T, 500)
        }

        function V() {
            Q = 10;
            X()
        }

        function T() {
            Q += 1 + (Math.random() * 2);
            if (Q >= 98) {
                Q = 98
            } else {
                Y = setTimeout(T, 500)
            }
            X()
        }

        function X() {
            U.style[aa] = "translate(" + Q + "%)";
            if (!d.getElementById(Z.id)) {
                d.body.appendChild(Z)
            }
        }

        function W() {
            if (d.getElementById(Z.id)) {
                clearTimeout(Y);
                Q = 100;
                X();
                Z.style.opacity = "0";
                return
            }
            R(Q == 100 ? 0 : Q);
            setTimeout(W, 0)
        }

        function S() {
            Z.style.left = pageXOffset + "px";
            Z.style.width = innerWidth + "px";
            Z.style.top = pageYOffset + "px";
            var ad = "orientation" in window && Math.abs(orientation) == 90,
                ac = innerWidth / screen[ad ? "height" : "width"] * 2;
            Z.style[aa] = "scaleY(" + ac + ")"
        }

        return {init: ab, start: R, done: W}
    }();
    var i = "pushState" in history && (!B.match("Android") || B.match("Chrome/")) && r.protocol != "file:";

    function J() {
        if (C) {
            return
        }
        if (!i) {
            b("change", true);
            return
        }
        for (var S = arguments.length - 1; S >= 0; S--) {
            var Q = arguments[S];
            if (Q === true) {
                x = true
            } else {
                if (Q == "mousedown") {
                    F = true
                } else {
                    if (typeof Q == "number") {
                        v = Q
                    }
                }
            }
        }
        C = t(r.href);
        c[C] = {body: d.body, title: d.title, scrollY: pageYOffset};
        var R = d.head.children, T, U;
        for (var S = R.length - 1; S >= 0; S--) {
            T = R[S];
            if (T.hasAttribute("data-instant-track")) {
                U = T.getAttribute("href") || T.getAttribute("src") || T.innerHTML;
                g.push(U)
            }
        }
        G = new XMLHttpRequest();
        G.addEventListener("readystatechange", s);
        m(true);
        H.init();
        b("change", true);
        addEventListener("popstate", function () {
            var V = t(r.href);
            if (V == C) {
                return
            }
            if (!(V in c)) {
                r.href = r.href;
                return
            }
            c[C].scrollY = pageYOffset;
            C = V;
            k(c[V].title, c[V].body, false, c[V].scrollY)
        })
    }

    function z(Q, R) {
        y[Q].push(R)
    }

    return {supported: i, init: J, on: z}
}(document, location);


// emoji
var emojiLists = [{
    name: "\u963f\u9c81",
    path: "aru/",
    maxNum: 164,
    excludeNums: [],
    file: ".png",
    placeholder: "[aru_{alias}]"
}, {
    name: "QQ", path: "qq/", file: ".gif", placeholder: "[{alias}]", emoji: {
        doge: "doge",
        "\u659c\u773c\u7b11": "xieyanxiao",
        "\u6258\u816e": "tuosai",
        "\u5c0f\u7ea0\u7ed3": "xiaojiujie",
        "\u7b11\u54ed": "xiaoku",
        "\u55b7\u8840": "penxue",
        "\u5fae\u7b11": "weixiao",
        "\u6487\u5634": "piezui",
        "\u8272": "se",
        "\u53d1\u5446": "fadai",
        "\u5f97\u610f": "deyi",
        "\u6d41\u6cea": "liulei",
        "\u5bb3\u7f9e": "haixiu",
        "\u95ed\u5634": "bizui",
        "\u7761": "shui",
        "\u5927\u54ed": "daku",
        "\u5c34\u5c2c": "ganga",
        "\u5472\u7259": "ziya",
        "\u53d1\u6012": "fanu",
        "\u8c03\u76ae": "tiaopi",
        "\u60ca\u8bb6": "jingya",
        "\u96be\u8fc7": "nanguo",
        "\u9177": "ku",
        "\u51b7\u6c57": "lenhan",
        "\u6293\u72c2": "zhuakuang",
        "\u5410": "tu",
        "\u5077\u7b11": "touxiao",
        "\u53ef\u7231": "keai",
        "\u767d\u773c": "baiyan",
        "\u50b2\u6162": "aoman",
        "\u9965\u997f": "jie",
        "\u56f0": "kun",
        "\u60ca\u6050": "jingkong",
        "\u6d41\u6c57": "liuhan",
        "\u61a8\u7b11": "hanxiao",
        "\u5927\u5175": "dabing",
        "\u594b\u6597": "fendou",
        "\u5492\u9a82": "zhouma",
        "\u7591\u95ee": "yiwen",
        "\u5618": "xu",
        "\u6655": "yun",
        "\u6298\u78e8": "zhemo",
        "\u8870": "fade",
        "\u9ab7\u9ac5": "kulou",
        "\u6572\u6253": "qiaoda",
        "\u518d\u89c1": "zaijian",
        "\u64e6\u6c57": "cahan",
        "\u62a0\u9f3b": "koubi",
        "\u9f13\u638c": "guzhang",
        "\u55c5\u5927\u4e86": "qiudale",
        "\u574f\u7b11": "huaixiao",
        "\u5de6\u54fc\u54fc": "zuohengheng",
        "\u53f3\u54fc\u54fc": "youhengheng",
        "\u54c8\u6b20": "haqian",
        "\u9119\u89c6": "bishi",
        "\u59d4\u5c48": "weiqu",
        "\u53ef\u601c": "kelian",
        "\u9634\u9669": "yinxian",
        "\u4eb2\u4eb2": "qinqin",
        "\u5413": "xia",
        "\u5feb\u54ed\u4e86": "kuaikule",
        "\u83dc\u5200": "caidao",
        "\u897f\u74dc": "xigua",
        "\u5564\u9152": "pijiu",
        "\u7bee\u7403": "lanqiu",
        "\u4e52\u4e53": "pingpong",
        "\u5496\u5561": "kafei",
        "\u996d": "fan",
        "\u732a\u5934": "zhutou",
        "\u73ab\u7470": "meigui",
        "\u51cb\u8c22": "diaoxie",
        "\u5fc3": "xin",
        "\u5fc3\u788e": "xinsui",
        "\u86cb\u7cd5": "dangao",
        "\u95ea\u7535": "shandian",
        "\u70b8\u5f39": "zhadan",
        "\u5200": "dao",
        "\u8db3\u7403": "zuqiu",
        "\u74e2\u866b": "piaochong",
        "\u4fbf\u4fbf": "bianbian",
        "\u591c\u665a": "yewan",
        "\u592a\u9633": "taiyang",
        "\u793c\u7269": "liwu",
        "\u62e5\u62b1": "yongbao",
        "\u5f3a": "qiang",
        "\u5f31": "ruo",
        "\u63e1\u624b": "woshou",
        "\u80dc\u5229": "shengli",
        "\u62b1\u62f3": "baoquan",
        "\u52fe\u5f15": "gouyin",
        "\u62f3\u5934": "quantou",
        "\u5dee\u52b2": "chajin",
        "\u7231\u4f60": "aini",
        NO: "NO",
        OK: "OK",
        "\u7231\u60c5": "aiqing",
        "\u98de\u543b": "feiwen",
        "\u53d1\u8d22": "facai",
        "\u5e05": "shuai",
        "\u96e8\u4f1e": "yusan",
        "\u9ad8\u94c1\u5de6\u8f66\u5934": "gaotiezuochetou",
        "\u8f66\u53a2": "chexiang",
        "\u9ad8\u94c1\u53f3\u8f66\u5934": "gaotieyouchetou",
        "\u7eb8\u5dfe": "zhijin",
        "\u53f3\u592a\u6781": "youtaiji",
        "\u5de6\u592a\u6781": "zuotaiji",
        "\u732e\u543b": "xianwen",
        "\u8857\u821e": "jiewu",
        "\u6fc0\u52a8": "jidong",
        "\u6325\u52a8": "huidong",
        "\u8df3\u7ef3": "tiaosheng",
        "\u56de\u5934": "huitou",
        "\u78d5\u5934": "ketou",
        "\u8f6c\u5708": "zhuanquan",
        "\u6004\u706b": "ouhuo",
        "\u53d1\u6296": "fadou",
        "\u8df3\u8df3": "tiaotiao",
        "\u7206\u7b4b": "baojin",
        "\u6c99\u53d1": "shafa",
        "\u94b1": "qian",
        "\u8721\u70db": "lazhu",
        "\u67aa": "gun",
        "\u706f": "deng",
        "\u9999\u8549": "xiangjiao",
        "\u543b": "wen",
        "\u4e0b\u96e8": "xiayu",
        "\u95f9\u949f": "naozhong",
        "\u56cd": "xi",
        "\u68d2\u68d2\u7cd6": "bangbangtang",
        "\u9762\u6761": "miantiao",
        "\u8f66": "che",
        "\u90ae\u4ef6": "youjian",
        "\u98ce\u8f66": "fengche",
        "\u836f\u4e38": "yaowan",
        "\u5976\u74f6": "naiping",
        "\u706f\u7b3c": "denglong",
        "\u9752\u86d9": "qingwa",
        "\u6212\u6307": "jiezhi",
        "K\u6b4c": "Kge",
        "\u718a\u732b": "xiongmao",
        "\u559d\u5f69": "hecai",
        "\u8d2d\u7269": "gouwu",
        "\u591a\u4e91": "duoyun",
        "\u97ad\u70ae": "bianpao",
        "\u98de\u673a": "feiji",
        "\u6c14\u7403": "qiqiu"
    }
},
    {
        name: "\u5fae\u535a", path: "weibo/", file: ".png", placeholder: "[wb_{alias}]", emoji: {
            doge: "doge",
            miao: "miao",
            dog1: "dog1",
            "\u4e8c\u54c8": "erha",
            dog2: "dog2",
            dog3: "dog3",
            dog4: "dog4",
            dog5: "dog5",
            dog6: "dog6",
            dog7: "dog7",
            dog8: "dog8",
            dog9: "dog9",
            dog10: "dog10",
            dog11: "dog11",
            dog12: "dog12",
            dog13: "dog13",
            dog14: "dog14",
            dog15: "dog15",
            "\u7231\u4f60": "aini",
            "\u5965\u7279\u66fc": "aoteman",
            "\u62dc\u62dc": "baibai",
            "\u60b2\u4f24": "beishang",
            "\u9119\u89c6": "bishi",
            "\u95ed\u5634": "bizui",
            "\u998b\u5634": "chanzui",
            "\u5403\u60ca": "chijing",
            "\u6253\u54c8\u6c14": "dahaqi",
            "\u6253\u8138": "dalian",
            "\u9876": "ding",
            "\u80a5\u7682": "feizao",
            "\u611f\u5192": "ganmao",
            "\u9f13\u638c": "guzhang",
            "\u54c8\u54c8": "haha",
            "\u5bb3\u7f9e": "haixiu",
            "\u5475\u5475": "hehe",
            "\u9ed1\u7ebf": "heixian",
            "\u54fc": "heng",
            "\u82b1\u5fc3": "huaxin",
            "\u6324\u773c": "jiyan",
            "\u53ef\u7231": "keai",
            "\u53ef\u601c": "kelian",
            "\u54ed": "ku",
            "\u56f0": "kun",
            "\u61d2\u5f97\u7406\u4f60": "landelini",
            "\u7d2f": "lei",
            "\u7537\u5b69\u513f": "nanhaier",
            "\u6012": "nu",
            "\u6012\u9a82": "numa",
            "\u5973\u5b69\u513f": "nvhaier",
            "\u94b1": "qian",
            "\u4eb2\u4eb2": "qinqin",
            "\u50bb\u773c": "shayan",
            "\u751f\u75c5": "shengbing",
            "\u795e\u517d": "shenshou",
            "\u5931\u671b": "shiwang",
            "\u8870": "shuai",
            "\u7761\u89c9": "shuijiao",
            "\u601d\u8003": "sikao",
            "\u592a\u5f00\u5fc3": "taikaixin",
            "\u5077\u7b11": "touxiao",
            "\u5410": "tu",
            "\u5154\u5b50": "tuzi",
            "\u6316\u9f3b\u5c4e": "wabishi",
            "\u59d4\u5c48": "weiqu",
            "\u7b11\u54ed": "xiaoku",
            "\u718a\u732b": "xiongmao",
            "\u563b\u563b": "xixi",
            "\u5618": "xu",
            "\u9634\u9669": "yinxian",
            "\u7591\u95ee": "yiwen",
            "\u53f3\u54fc\u54fc": "youhengheng",
            "\u6655": "yun",
            "\u6293\u72c2": "zhuakuang",
            "\u732a\u5934": "zhutou",
            "\u6700\u53f3": "zuiyou",
            "\u5de6\u54fc\u54fc": "zuohengheng",
            "\u7ed9\u529b": "geili",
            "\u4e92\u7c89": "hufen",
            "\u56e7": "jiong",
            "\u840c": "meng",
            "\u795e\u9a6c": "shenma",
            v5: "v5",
            "\u56cd": "xi",
            "\u7ec7": "zhi"
        }
    }, {
        name: "\u8d34\u5427", path: "newtieba/", file: ".png", placeholder: "#({alias})", emoji: {
            "\u5475\u5475": "hehe",
            "\u54c8\u54c8": "hahaxiao",
            "\u5410\u820c": "tushe",
            "\u592a\u5f00\u5fc3": "taikaixin",
            "\u7b11\u773c": "xiaoyan",
            "\u82b1\u5fc3": "huaxin",
            "\u5c0f\u4e56": "xiaoguai",
            "\u4e56": "guai",
            "\u6342\u5634\u7b11": "wuzuixiao",
            "\u6ed1\u7a3d": "huaji",
            "\u4f60\u61c2\u7684": "nidongde",
            "\u4e0d\u9ad8\u5174": "bugaoxing",
            "\u6012": "nu",
            "\u6c57": "han",
            "\u9ed1\u7ebf": "heixian",
            "\u6cea": "lei",
            "\u771f\u68d2": "zhenbang",
            "\u55b7": "pen",
            "\u60ca\u54ed": "jingku",
            "\u9634\u9669": "yinxian",
            "\u9119\u89c6": "bishi",
            "\u9177": "ku",
            "\u554a": "a",
            "\u72c2\u6c57": "kuanghan",
            what: "what",
            "\u7591\u95ee": "yiwen",
            "\u9178\u723d": "suanshuang",
            "\u5440\u54a9\u7239": "yamiedie",
            "\u59d4\u5c48": "weiqu",
            "\u60ca\u8bb6": "jingya",
            "\u7761\u89c9": "shuijiao",
            "\u7b11\u5c3f": "xiaoniao",
            "\u6316\u9f3b": "wabi",
            "\u5410": "tu",
            "\u7280\u5229": "xili",
            "\u5c0f\u7ea2\u8138": "xiaohonglian",
            "\u61d2\u5f97\u7406": "landeli",
            "\u52c9\u5f3a": "mianqiang",
            "\u7231\u5fc3": "aixin",
            "\u5fc3\u788e": "xinsui",
            "\u73ab\u7470": "meigui",
            "\u793c\u7269": "liwu",
            "\u5f69\u8679": "caihong",
            "\u592a\u9633": "taiyang",
            "\u661f\u661f\u6708\u4eae": "xingxingyueliang",
            "\u94b1\u5e01": "qianbi",
            "\u8336\u676f": "chabei",
            "\u86cb\u7cd5": "dangao",
            "\u5927\u62c7\u6307": "damuzhi",
            "\u80dc\u5229": "shengli",
            haha: "haha",
            OK: "OK",
            "\u6c99\u53d1": "shafa",
            "\u624b\u7eb8": "shouzhi",
            "\u9999\u8549": "xiangjiao",
            "\u4fbf\u4fbf": "bianbian",
            "\u836f\u4e38": "yaowan",
            "\u7ea2\u9886\u5dfe": "honglingjin",
            "\u8721\u70db": "lazhu",
            "\u97f3\u4e50": "yinyue",
            "\u706f\u6ce1": "dengpao"
        }
    }, {
        name: "\u65e7\u8d34\u5427", path: "tieba/", file: ".png", placeholder: "#[{alias}]", emoji: {
            "\u5475\u5475": "hehe",
            "\u54c8\u54c8": "hahaxiao",
            "\u5410\u820c": "tushe",
            "\u554a": "a",
            "\u9177": "ku",
            "\u6012": "nu",
            "\u5f00\u5fc3": "kaixin",
            "\u6c57": "han",
            "\u6cea": "lei",
            "\u9ed1\u7ebf": "heixian",
            "\u9119\u89c6": "bishi",
            "\u4e0d\u9ad8\u5174": "bugaoxing",
            "\u771f\u68d2": "zhenbang",
            "\u94b1": "qian",
            "\u7591\u95ee": "yiwen",
            "\u9634\u9669": "yinxian",
            "\u5410": "tu",
            "\u54a6": "yi",
            "\u59d4\u5c48": "weiqu",
            "\u82b1\u5fc3": "huaxin",
            "\u547c": "hu",
            "\u7b11\u773c": "xiaoyan",
            "\u51b7": "len",
            "\u592a\u5f00\u5fc3": "taikaixin",
            "\u6ed1\u7a3d": "huaji",
            "\u52c9\u5f3a": "mianqiang",
            "\u72c2\u6c57": "kuanghan",
            "\u4e56": "guai",
            "\u7761\u89c9": "shuijiao",
            "\u60ca\u54ed": "jingku",
            "\u751f\u6c14": "shengqi",
            "\u60ca\u8bb6": "jingya",
            "\u55b7": "pen",
            "\u73ab\u7470": "meigui",
            "\u793c\u7269": "liwu",
            "\u5f69\u8679": "caihong",
            "\u94b1\u5e01": "qianbi",
            "\u706f\u6ce1": "dengpao",
            "\u8336\u676f": "chabei",
            "\u97f3\u4e50": "yinyue",
            haha: "haha",
            "\u80dc\u5229": "shengli",
            "\u5927\u62c7\u6307": "damuzhi",
            "\u5f31": "ruo"
        }
    }];


// jquery emoji
(function (a, p, q) {
    function n(b, h) {
        this.$content = a(b);
        this.options = h;
        this.index = emoji_index;
        switch (h.animation) {
            case "none":
                this.showFunc = "show";
                this.hideFunc = "hide";
                this.toggleFunc = "toggle";
                break;
            case "slide":
                this.showFunc = "slideDown";
                this.hideFunc = "slideUp";
                this.toggleFunc = "slideToggle";
                break;
            case "fade":
                this.showFunc = "fadeIn";
                this.hideFunc = "fadeOut";
                this.toggleFunc = "fadeToggle";
                break;
            default:
                this.showFunc = "fadeIn", this.hideFunc = "fadeOut", this.toggleFunc = "fadeToggle"
        }
        this._init()
    }

    var r = {
        showTab: !0,
        animation: "fade", icons: []
    };
    p.emoji_index = 0;
    n.prototype = {
        _init: function () {
            var b = this, h = this.options.button, c, d, g, f, e = b.index;
            h || (c = '<input type="image" class="emoji_btn" id="emoji_btn_' + e + '" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZBAMAAAA2x5hQAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAkUExURUxpcfTGAPTGAPTGAPTGAPTGAPTGAPTGAPTGAPTGAPTGAPTGAOfx6yUAAAALdFJOUwAzbVQOoYrzwdwkAoU+0gAAAM1JREFUGNN9kK0PQWEUxl8fM24iCYopwi0muuVuzGyKwATFZpJIU01RUG/RBMnHxfz+Oef9uNM84d1+23nO+zxHKVG2WWupRJkdcAwtpCK0lpbqWE01pB0QayonREMoIp7AawQrWSgGGb4pn6dSeSh68FAVXqHqy3wKrkJiDGDTg3dnp//w+WnwlwIOJauF+C7sXRVfdha4O4oIJfTbtdSxs2uqhs585A0ko8iLTMEcDE1n65A+29pYAlr72nz9dKu7GuNTcsL2fDQzB/wCPVJ69nZGb3gAAAAASUVORK5CYII="/>',
                d = this.$content.offset().top + this.$content.outerHeight() + 10, g = this.$content.offset().left + 2, a(c).appendTo(a("body")), a("#emoji_btn_" + e).css({
                top: d + "px",
                left: g + "px"
            }), h = "#emoji_btn_" + e);
            var l = this.options.showTab;
            d = this.options.basePath;
            g = this.options.icons;
            c = g.length;
            if (0 === c) return console.error("\u8868\u60c5\u56fe\u8def\u5f84\u8bfb\u53d6\u5931\u8d25"), !1;
            for (var n = '<div class="emoji_container" id="emoji_container_' + e + '">', B = '<div class="emoji_content">', l = '<div class="emoji_tab" style="' + (1 !== c ||
            l ? "" : "display:none;") + '"><div class="emoji_tab_prev"></div><div class="emoji_tab_list"><ul>', v, p, y, t, w, r, A, m, x, z, k = 0; k < c; k++) if (p = g[k].name || "group" + (k + 1), y = d + "/" + g[k].path, t = g[k].maxNum, w = g[k].excludeNums, r = g[k].file || ".jpg", A = g[k].placeholder || "#em" + (k + 1) + "_{alias}#", m = g[k].emoji, x = 0, y) {
                v = '<div id="emoji' + k + '" class="emoji_icons" style="' + (0 === k ? "" : "display:none;") + '"><ul>';
                if (m) {
                    if ("object" !== typeof m) {
                        console.error("\u7b2c " + k + " \u7ec4 emoji \u53c2\u6570\u8bbe\u7f6e\u4e0d\u6b63\u786e");
                        break
                    }
                    t =
                        t || m.length;
                    for (f in m) x++, x > t || w && 0 <= w.indexOf(x) || (z = A.replace(/{alias}/gi, f.toString()), v += '<li><a data-emoji_code="' + z + '" data-index="' + x + '" title="' + f + '"><img src="' + y + m[f] + r + '"/></a></li>')
                } else {
                    if (!t) {
                        console.error("\u8bf7\u6307\u5b9a " + k + " \u7ec4\u8868\u60c5 maxNum");
                        continue
                    }
                    for (m = 1; m <= t; m++) w && 0 <= w.indexOf(m) || (z = A.replace(/{alias}/gi, m.toString()), v += '<li><a data-emoji_code="' + z + '" data-index="' + m + '"><img src="' + y + m + r + '"/></a></li>')
                }
                v += "</ul></div>";
                B += v;
                l += '<li data-emoji_tab="emoji' +
                    k + '" class="' + (0 === k ? "selected" : "") + '" title="' + p + '">' + p + "</li>"
            } else console.error("\u7b2c " + k + " \u7ec4\u8868\u60c5\u672a\u914d\u7f6e\u56fe\u7247\u8def\u5f84 path");
            n = n + (B + "</div>") + (l + '</ul></div><div class="emoji_tab_next"></div></div>') + '<div class="emoji_preview"><img/></div>';
            a(n).appendTo(a("body"));
            f = a(h).offset().top + a(h).outerHeight() + 5;
            d = a(h).offset().left;
            a("#emoji_container_" + e).css({top: f + "px", left: d + "px"});
            var C = 0 === c % 8 ? parseInt(c / 8) : parseInt(c / 8) + 1, u = 1;
            a(q).on({
                click: function (d) {
                    var c =
                        d.target;
                    d = b.$content[0];
                    var f, g;
                    if (c === a(h)[0]) a("#emoji_container_" + e)[b.toggleFunc](); else 0 < a(c).parents("#emoji_container_" + e).length ? (f = a(c).data("emoji_code") || a(c).parent().data("emoji_code"), g = a(c).data("emoji_tab"), f ? ("DIV" === d.nodeName ? (c = a("#emoji_container_" + e + ' a[data-emoji_code="' + f + '"] img').attr("src"), b._insertAtCursor(d, '<img class="emoji_icon" src="' + c + '"/>', !1)) : b._insertAtCursor(d, f), b.hide(), b.$content.focus()) : g ? a(c).hasClass("selected") || (a("#emoji_container_" + e + " .emoji_icons").hide(),
                        a("#emoji_container_" + e + " #" + g).show(), a(c).addClass("selected").siblings().removeClass("selected")) : a(c).hasClass("emoji_tab_prev") ? 1 < u && (a("#emoji_container_" + e + " .emoji_tab_list ul").css("margin-left", -503 * (u - 2) + "px"), u--) : a(c).hasClass("emoji_tab_next") && u < C && (a("#emoji_container_" + e + " .emoji_tab_list ul").css("margin-left", -503 * u + "px"), u++)) : 0 < a("#emoji_container_" + e + ":visible").length && (b.hide(), b.$content.focus())
                }
            });
            a("#emoji_container_" + e + " .emoji_icons a").mouseenter(function () {
                2 * (a(this).offset().left -
                    a("#emoji_container_" + e).offset().left) < a("#emoji_container_" + e).width() ? a("#emoji_container_" + e + " .emoji_preview").css({
                    left: "auto",
                    right: 0
                }) : a("#emoji_container_" + e + " .emoji_preview").css({left: 0, right: "auto"});
                var b = a(this).find("img").attr("src");
                a("#emoji_container_" + e + " .emoji_preview img").attr("src", b).parent().show()
            });
            a("#emoji_container_" + e + " .emoji_icons a").mouseleave(function () {
                a("#emoji_container_" + e + " .emoji_preview img").removeAttr("src").parent().hide()
            })
        }, _insertAtCursor: function (b,
                                      a, c) {
            var d;
            if ("DIV" === b.nodeName) if (b.focus(), p.getSelection) {
                if (d = p.getSelection(), d.getRangeAt && d.rangeCount) {
                    b = d.getRangeAt(0);
                    b.deleteContents();
                    var g = q.createElement("div");
                    g.innerHTML = a;
                    a = q.createDocumentFragment();
                    for (var f, e; f = g.firstChild;) e = a.appendChild(f);
                    g = a.firstChild;
                    b.insertNode(a);
                    e && (b = b.cloneRange(), b.setStartAfter(e), c ? b.setStartBefore(g) : b.collapse(!0), d.removeAllRanges(), d.addRange(b))
                }
            } else (d = q.selection) && "Control" !== d.type && (a = d.createRange(), a.collapse(!0), d.createRange().pasteHTML(html),
            c && (b = d.createRange(), b.setEndPoint("StartToStart", a), b.select())); else q.selection ? (b.focus(), d = q.selection.createRange(), d.text = a, d.select()) : b.selectionStart || 0 === b.selectionStart ? (c = b.selectionStart, d = b.selectionEnd, e = b.scrollTop, b.value = b.value.substring(0, c) + a + b.value.substring(d, b.value.length), 0 < e && (b.scrollTop = e), b.focus(), b.selectionStart = c + a.length, b.selectionEnd = c + a.length) : (b.value += a, b.focus())
        }, show: function () {
            a("#emoji_container_" + this.index)[this.showFunc]()
        }, hide: function () {
            a("#emoji_container_" +
                this.index)[this.hideFunc]()
        }, toggle: function () {
            a("#emoji_container_" + this.index)[this.toggleFunc]()
        }
    };
    a.fn.emoji = function (b) {
        emoji_index++;
        return this.each(function () {
            var h = a(this), c = h.data("plugin_emoji" + emoji_index),
                d = a.extend({}, r, h.data(), "object" === typeof b && b);
            c || h.data("plugin_emoji" + emoji_index, c = new n(this, d));
            if ("string" === typeof b) c[b]()
        })
    };
    a.fn.emoji.Constructor = n
})(jQuery, window, document);
(function (a, p, q) {
    function n(b, h) {
        this.$content = a(b);
        this.options = h;
        this._init()
    }

    var r = {icons: []};
    n.prototype = {
        _init: function () {
            var a = this.options.icons, h = this.options.basePath, c = a.length, d, g, f, e;
            if (0 < c) for (var l = 0; l < c; l++) if (d = h + "/" + a[l].path, g = a[l].file || ".jpg", f = a[l].placeholder, f = f.replace("[", "\\["), f = f.replace("]", "\\]"), f = f.replace("(", "\\("), f = f.replace(")", "\\)"), e = a[l].emoji, d) if (e) {
                if ("object" !== typeof e) {
                    console.error("\u7b2c " + l + " \u7ec4 emoji \u53c2\u6570\u8bbe\u7f6e\u4e0d\u6b63\u786e");
                    break
                }
                f = f.replace(/{alias}/gi, "([\\s\\S]+?)");
                f = new RegExp(f, "gm");
                this.$content.html(this.$content.html().replace(f, function (a, b) {
                    var c = e[b];
                    return c ? '<img class="wp-smiley" src="' + d + c + g + '" title="' + b + '" alt="' + b + '"/>' : a
                }))
            } else f = f.replace(/{alias}/gi, "(\\d+?)"), this.$content.html(this.$content.html().replace(new RegExp(f, "gm"), '<img class="wp-smiley" src="' + d + "$1" + g + '"/>')); else console.error("\u7b2c " + l + " \u7ec4\u8868\u60c5\u672a\u914d\u7f6e\u56fe\u7247\u8def\u5f84 path")
        }
    };
    a.fn.emojiParse = function (b) {
        return this.each(function () {
            var h =
                a(this), c = h.data("plugin_emojiParse"), d = a.extend({}, r, h.data(), "object" === typeof b && b);
            c || h.data("plugin_emojiParse", c = new n(this, d));
            if ("string" === typeof b) c[b]()
        })
    };
    a.fn.emojiParse.Constructor = n
})(jQuery, window, document);


// script
jQuery(document).ready(function (a) {
    a("img:not(.no-error)").error(function () {
        a(this).hasClass("no-error") || (a(this).attr("src", mk_theme_api.theme_url + "/images/err.png"), a(this).addClass("no-error"))
    });
    a.fn.postLike = function () {
        if (jQuery(this).children(".likeHeart").hasClass("done")) jQuery(this).children(".count").html("\u221e"); else {
            a(this).children(".likeHeart").addClass("done");
            var b = a(this).data("id"), c = a(this).data("action"), d = jQuery(this).children(".count");
            jQuery(d).html(parseInt(jQuery(d).html()) +
                1);
            a.post(mk_theme_api.ajax_url, {action: "ality_ding", um_id: b, um_action: c}, function (a) {
                jQuery(d).html(a)
            })
        }
        return !1
    };
    a(document).on("click", ".favorite", function () {
        a(this).postLike()
    });
    a(document).on("click", "#menu-btn", function () {
        a("body").toggleClass("main-menu-on")
    });
    a(window).scroll(function () {
        300 > a(window).scrollTop() ? a("#scroll-to-top").removeClass("show") : a("#scroll-to-top").addClass("show")
    });
    a(document).on("click", "#scroll-to-top", function () {
        a("html, body").animate({scrollTop: 0}, "normal");
        return !1
    });
    a(document).on("click", ".mk-article-collapse", function (b) {
        a(this).next().slideToggle();
        a(this).toggleClass("mk-collapse-open");
        b.preventDefault()
    });
    a(document).on("click", "#comment", function (b) {
        a(".comment-form-tools").slideDown()
    });
    a(document).on("click", ".comment-form-tools span", function (b) {
        switch (a(this).data("action")) {
            case "emoji":
                a(this).data("loaded") || (a("#comment").emoji({
                    button: a(".comment-form-tools span[data-action=emoji]"),
                    animation: "fade",
                    basePath: mk_theme_api.theme_url +
                    "/images/emoji",
                    icons: emojiLists
                }), a(this).data("loaded", !0), a(this).click());
                break;
            case "pic":
                a.fancybox.open('<div class="comment-extra-input comment-pic-input"><h5>\u63d2\u5165\u56fe\u7247</h5><form onsubmit="return commentExtraPicSubmit(this);" id="comment-pic-upload-form"><input placeholder="\u8f93\u5165\u56fe\u7247\u5730\u5740\uff08https://\uff09" title="\u8bf7\u8f93\u5165\u56fe\u7247\u94fe\u63a5" type="url" name="url" required><h5 class="or">\u6216</h5><div class="comment-pic-upload"><input type="file" name="iufile" id="comment-pic-upload" multiple="true" onchange="commentUploadPic(this)" title="\u70b9\u51fb\u9009\u62e9\u6216\u62d6\u62fd\u56fe\u7247\u5230\u8fd9\u91cc\u4e0a\u4f20"><button class="comment-pic-upload-btn" onclick="return false;"><i class="fa fa-cloud-upload" aria-hidden="true"></i> \u672c\u5730\u4e0a\u4f20</button></div><button types="submit">\u786e\u8ba4</button></form></div>');
                a("#comment-pic-upload").on("dragover", function () {
                    a(this).parent().addClass("ondrag")
                });
                a("#comment-pic-upload").on("dragleave", function () {
                    a(this).parent().removeClass("ondrag")
                });
                a("#comment-pic-upload").on("drop", function (b, d) {
                    a(this).parent().removeClass("ondrag")
                });
                break;
            case "url":
                a.fancybox.open('<div class="comment-extra-input comment-link-input"><h5>\u63d2\u5165\u94fe\u63a5</h5><form onsubmit="return commentExtraUrlSubmit(this);"><input placeholder="\u8bf7\u8f93\u5165\u94fe\u63a5\u5730\u5740\uff08https://\uff09" type="url" name="url" required><input placeholder="\u8bf7\u8f93\u5165\u94fe\u63a5\u540d\u79f0\uff08\u9009\u586b\uff09" type="text" name="name"><button types="submit">\u786e\u8ba4</button></form></div>');
                break;
            case "code":
                a.fancybox.open('<div class="comment-extra-input comment-code-input"><h5>\u63d2\u5165\u4ee3\u7801</h5><form onsubmit="return commentCodeSubmit(this);"><textarea placeholder="\u8bf7\u8d34\u5165\u4ee3\u7801\u5185\u5bb9" rows="5" name="code" required></textarea><button types="submit">\u63d2\u5165</button></form></div>');
                break;
            case "close":
                a(".comment-form-tools").slideUp()
        }
        b.preventDefault()
    });
    a(document).on("focus", "#comment-author-info #author", function () {
        showCommentMsg("\u65b0\u529f\u80fd\uff1a\u5728\u6635\u79f0\u6846\u8f93\u5165QQ\u53f7\u53ef\u5feb\u901f\u586b\u5199\uff01",
            "success", !0)
    });
    a(document).on("blur", "#comment-author-info #author", function () {
        var b = a(this).val();
        /^[1-9]\d{4,12}$/.test(b) && (a("#comment-author-info #author").val(""), a("#comment-author-info #author").attr("placeholder", "\u83b7\u53d6\u4e2d..."), a.ajax({
            url: "https://users.qzone.qq.com/fcg-bin/cgi_get_portrait.fcg?uins=" + b,
            dataType: "jsonp",
            jsonpCallback: "portraitCallBack",
            scriptCharset: "gbk",
            complete: function (b, d) {
                a("#comment-author-info #author").removeAttr("placeholder")
            },
            success: function (c) {
                try {
                    if (c[b][6]) {
                        a("#comment-author-info #author").val(c[b][6]);
                        a("#comment-author-info #email").val(b + "@qq.com");
                        a("#comment-author-info #url").val("https://user.qzone.qq.com/" + b);
                        return
                    }
                } catch (d) {
                }
                showCommentMsg("QQ\u4fe1\u606f\u83b7\u53d6\u6709\u8bef", "error", !0);
                a("#comment-author-info #author").val(b)
            },
            error: function (c, d, e) {
                a("#comment-author-info #author").val(b);
                console.error("QQ\u4fe1\u606f\u83b7\u53d6\u5931\u8d25 - " + c + d + e)
            }
        }))
    });
    a(document).on("click", "#article-share .share-item", function (b) {
        b = encodeURIComponent(location.href);
        var c = encodeURIComponent(document.title),
            d = encodeURIComponent(a("meta[property='og:image']").attr("content")),
            e = encodeURIComponent(a("meta[property='og:description']").attr("content"));
        switch (a(this).data("site")) {
            case "weixin":
                a.fancybox.open('<div class="comment-extra-input comment-code-input" style="text-align: center"><h5>\u5fae\u4fe1\u626b\u4e00\u626b\u5206\u4eab</h5><img src="https://www.kuaizhan.com/common/encode-png?large=true&data=' + b + '" class="share-qrcode"></div>');
                break;
            case "weibo":
                window.open("http://service.weibo.com/share/share.php?url=" +
                    b + "&title=" + ("\u3010" + c + "\u3011" + e) + "&pic=" + d + "&searchPic=true");
                break;
            case "qq":
                window.open("https://connect.qq.com/widget/shareqq/index.html?url=" + b + "&desc=&title=" + c + "&summary=" + e + "&pics=" + d + "&flash=&site=&style=201&width=32&height=32&showcount=");
                break;
            default:
                a.fancybox.open('<div class="comment-extra-input comment-code-input" style="text-align: center"><h5>\u624b\u673a\u626b\u7801\u6d4f\u89c8</h5><img src="https://www.kuaizhan.com/common/encode-png?large=true&data=' + b + '" class="share-qrcode"></div>')
        }
    })
});

function commentUploadPic(a) {
    if (a.files && a.files[0]) {
        if (0 != a.files[0].type.indexOf("image")) return jQuery(".comment-pic-upload-btn").html('<span style="color: #c50808">\u8bf7\u9009\u62e9\u56fe\u50cf\u6587\u4ef6\u4e0a\u4f20</span>');
        a = new FormData(jQuery("#comment-pic-upload-form")[0]);
        jQuery.ajax({
            url: "https://www.17uw.cn/api/upload/weibo", type: "POST", xhr: function () {
                myXhr = jQuery.ajaxSettings.xhr();
                myXhr.upload && myXhr.upload.addEventListener("progress", function (a) {
                    a.lengthComputable && (a = a.loaded / a.total,
                        1 == a ? jQuery(".comment-pic-upload-btn").html('<span style="color: #c50808">\u4e0a\u4f20\u5b8c\u6210\uff0c\u5904\u7406\u4e2d...</span>') : jQuery(".comment-pic-upload-btn").html("\u4e0a\u4f20\u4e2d\uff0c\u8fdb\u5ea6\uff1a" + 100 * a + "%"))
                }, !1);
                return myXhr
            }, beforeSend: function () {
                jQuery(".comment-pic-upload-btn").html("\u51c6\u5907\u4e0a\u4f20..")
            }, success: function (a) {
                "success" != a.code ? jQuery(".comment-pic-upload-btn").html('<span style="color: #c50808">' + a.msg + "</span>") : (jQuery(".comment-pic-input form")[0].url.value =
                    a.data.url.replace(/http:/g, "https:"), commentExtraPicSubmit(jQuery(".comment-pic-input form")[0]))
            }, error: function (a) {
                console.log(a);
                jQuery(".comment-pic-upload-btn").html('<span style="color: #c50808">\u56fe\u7247\u4e0a\u4f20\u51fa\u9519</span>')
            }, data: a, dataType: "json", cache: !1, contentType: !1, processData: !1
        });
        return !1
    }
}

function commentExtraPicSubmit(a) {
    addEditor(jQuery("#comment")[0], " [img]" + a.url.value + "[/img] ", "");
    jQuery.fancybox.close(!0);
    return !1
}

function commentExtraUrlSubmit(a) {
    a.name.value || (a.name.value = a.url.value);
    a.name.value = a.name.value.replace("[", "\u3010").replace("]", "\u3011");
    addEditor(jQuery("#comment")[0], " [url=" + a.url.value + "]" + a.name.value + "[/url] ", "");
    jQuery.fancybox.close(!0);
    return !1
}

function commentCodeSubmit(a) {
    addEditor(jQuery("#comment")[0], " [pre]" + a.code.value + "[/pre] ", "");
    jQuery.fancybox.close(!0);
    return !1
}

function addEditor(a, b, c) {
    if (document.selection) a.focus(), sel = document.selection.createRange(), c ? sel.text = b + sel.text + c : sel.text = b, a.focus(); else if (a.selectionStart || "0" == a.selectionStart) {
        var d = a.selectionStart, e = a.selectionEnd, f = e;
        c ? a.value = a.value.substring(0, d) + b + a.value.substring(d, e) + c + a.value.substring(e, a.value.length) : a.value = a.value.substring(0, d) + b + a.value.substring(e, a.value.length);
        c ? f += b.length + c.length : f += b.length - e + d;
        d == e && c && (f -= c.length);
        a.focus();
        a.selectionStart = f;
        a.selectionEnd =
            f
    } else a.value += b + c, a.focus()
}

function showCommentMsg(a, b, c) {
    switch (b) {
        case "wait":
            a = '<i class="fa fa-location-arrow" aria-hidden="true"></i> ' + a;
            break;
        case "success":
            a = '<span class="comment-success"><i class="fa fa-check" aria-hidden="true"></i> ' + a + "</span>";
            break;
        case "error":
            a = '<span class="comment-error"><i class="fa fa-exclamation-triangle" aria-hidden="true"></i> ' + a + "</span>"
    }
    jQuery(".comment-form-tools").stop().slideUp();
    jQuery("#comment-tips").html(a).stop().slideDown();
    c && setTimeout(function () {
        jQuery("#comment-tips").stop().fadeOut()
    }, 3E3)
}

var codeHighlight = {
    init: function () {
        "undefined" != typeof prettyPrint && this.codePrettify()
    }, codePrettify: function () {
        var a = this;
        jQuery("pre code").each(function () {
            var a = jQuery(this).attr("class");
            if (a) {
                var c = jQuery(this).html();
                jQuery(this).parent().attr("class", "prettyprint linenums lang-" + a).html(c)
            }
        });
        jQuery("pre").each(function () {
            if (!jQuery(this).hasClass("prettyprinted")) {
                jQuery(this).hasClass("prettyprint") || jQuery(this).attr("class", "prettyprint linenums lang-");
                jQuery(this).wrap('<div class="code-pretty-container"></div>');
                var b = "", c = jQuery(this).attr("class");
                if (c = /lang-(\w+) /.exec(c)) {
                    c = c[1];
                    switch (c.toLowerCase()) {
                        case "js":
                        case "javascript":
                            b = "JavaScript";
                            break;
                        case "java":
                        case "python":
                        case "shell":
                            b = c.charAt(0).toUpperCase().concat(c.toLowerCase().slice(1));
                            break;
                        case "cpp":
                            b = "C/C++";
                            break;
                        case "pl":
                            b = "Perl";
                            break;
                        case "py":
                            b = "Python";
                            break;
                        case "rb":
                            b = "Ruby";
                            break;
                        case "vb":
                            b = "ASP/VB";
                            break;
                        case "cs":
                            b = "C#";
                            break;
                        case "bsh":
                        case "bash":
                            b = "Shell";
                            break;
                        case "html":
                        case "css":
                        case "xml":
                        case "php":
                            b = c.toUpperCase();
                            break;
                        default:
                            b = c
                    }
                    jQuery(this).before("<span class='code-type'>" + b + "</span>")
                }
                jQuery(this).after(a.codePrettifyToolbar(b))
            }
        });
        prettyPrint();
        a.codePrettifyToolbarAction()
    }, codePrettifyToolbar: function (a) {
        var b = '<div class="code-pretty-toolbar">';
        "HTML" == a && (b += '<buttun title="\u8fd0\u884c\u4ee3\u7801" class="btn run-code fa fa-play"> \u8fd0\u884c</buttun>');
        return b + '<buttun title="\u590d\u5236\u4ee3\u7801" class="btn copy-code fa fa-clipboard"> \u590d\u5236</buttun><buttun title="\u4ee5\u6587\u672c\u6a21\u5f0f\u67e5\u770b" class="btn view-source fa fa-file-text-o"> \u6587\u672c</buttun><buttun title="\u4ee5\u9ad8\u4eae\u6a21\u5f0f\u67e5\u770b" class="btn back-to-pretty fa fa-file-code-o"> \u9ad8\u4eae</buttun><span class="msg"></span></div>'
    },
    codePrettifyToolbarAction: function () {
        _this = this;
        var a = new ClipboardJS(".copy-code", {
            text: function (a) {
                $container = $(a).parent().parent();
                return _this.getPrettifyCode($container)
            }
        });
        a.on("success", function (a) {
            $container = $(a.trigger).parent().parent();
            $container.find(".msg").hide().text("\u5df2\u590d\u5236").stop().fadeIn().delay(1500).fadeOut(500)
        });
        a.on("error", function (a) {
            $container = $(a.trigger).parent().parent();
            $container.find(".msg").hide().text("\u6682\u4e0d\u652f\u6301\u5f53\u524d\u6d4f\u89c8\u5668\uff0c\u8bf7\u624b\u52a8\u590d\u5236").stop().fadeIn().delay(3E3).fadeOut(500);
            $container.find(".view-source").trigger("click")
        });
        $(".code-pretty-toolbar .btn").unbind().on("click", function () {
            $container = $(this).parent().parent();
            if ($(this).hasClass("view-source")) {
                code = _this.getPrettifyCode($container);
                $container.find("textarea").length ? $container.find("textarea").val(code) : $container.append('<textarea class="code-pretty-text" readonly>' + code + "</textarea>");
                var a = $container.find("pre");
                $container.find("textarea").css({height: a.height()}).show().select();
                $container.find("pre").css({opacity: 0});
                $container.find(".view-source").hide();
                $container.find(".back-to-pretty").css("display", "inline-block")
            } else $(this).hasClass("back-to-pretty") ? ($container.find(".back-to-pretty").hide(), $container.find(".view-source").show(), $container.find("pre").css({opacity: 1}), $container.find("textarea").hide()) : $(this).hasClass("run-code") && (code = _this.getPrettifyCode($container), a = window.open("", "_blank", ""), a.document.open("text/html", "replace"), a.opener = null, a.document.write(code), a.document.close())
        })
    },
    getPrettifyCode: function (a) {
        code = [];
        a.find("li").each(function () {
            code.push($(this).text())
        });
        code = code.join("\r");
        return code = code.replace(/\u00a0/g, " ")
    }
};

function parseEmoji() {
    jQuery(".shuoshuo-content-inner, .entry-content, .comment-content-text, .post-item-card-body .archive-content").emojiParse({
        basePath: mk_theme_api.theme_url + "/images/emoji",
        icons: emojiLists
    });
    jQuery("a[href*='.jpg'],a[href*='.png'],a[href*='.gif'],a[href*='.jpeg'],a[href*='.webp']").each(function () {
        try {
            var a = jQuery, b = a(this).attr("href").split("?")[0];
            if (b.endsWith(".jpg") || b.endsWith(".png") || b.endsWith(".gif") || b.endsWith(".jpeg") || b.endsWith(".webp")) a(this).attr("data-fancybox") ||
            void 0 != a(this).attr("no-fancybox") || a(this).attr("download") || "_blank" == a(this).attr("target") || a(this).attr("data-fancybox", "images").attr("data-no-instant", "true")
        } catch (c) {
            console.log(c.name + "[\u56fe\u7247\u706f\u7bb1]: " + c.message)
        }
    });
    codeHighlight.init()
}

function initTheme() {
    parseEmoji();
    jQuery(".headroom").headroom();
    jQuery("[data-autoMenu]").autoMenu()
};


// menu
(function (a) {
    var k = function () {
        var h = function (b, c) {
            this.$element = a(b);
            if (960 > (window.innerWidth || document.documentElement.clientWidth)) return !1;
            this.settings = a.extend({}, a.fn.autoMenu.defaults, "object" === typeof c && c);
            this.init()
        };
        h.prototype = {
            init: function () {
                this.$element.html(this.createHtml());
                this.setActive();
                this.bindEvent()
            }, createHtml: function () {
                var b = this, c = b.settings, d = "<ul>", g = 1;
                a("*").each(function () {
                    var f = a(this), e = "";
                    switch (f.get(0).tagName) {
                        case c.levelOne.toUpperCase():
                            e = "menu-level-one";
                            break;
                        case c.levelTwo.toUpperCase():
                            e = "menu-level-two"
                    }
                    e && (f.attr("id", "title-" + g), f = b.handleTxt(f.html()), d += '<li class="menu-level-item ' + e + '" name="title-' + g + '"><a href="#title-' + g + '" title="' + f + '" class="anim-trans">' + f + "</a></li>", g++)
                });
                d += "</ul>";
                3 > g && (d = "");
                return d
            }, handleTxt: function (a) {
                return a.replace(/<\/?[^>]+>/g, "").trim()
            }, setActive: function () {
                var b = this.$element, c = this.settings, d = a(c.levelOne + "," + c.levelTwo), g = c.offTop,
                    f = a(document).scrollTop(), e;
                try {
                    if (a(document).scrollTop() < a(".entry-content").offset().top ||
                        a(document).scrollTop() > a(".social-main").offset().top) {
                        b.find("ul").fadeOut();
                        a("#article-share").fadeOut();
                        return
                    }
                    b.find("ul").fadeIn();
                    a("#article-share").fadeIn()
                } catch (l) {
                    return
                }
                d.each(function () {
                    var b = a(this), c = b.offset().top;
                    if (f > c - g) e = b.attr("id"); else return !1
                });
                c = b.find(".active");
                e && c.attr("name") != e && (c.removeClass("active"), b.find("[name=" + e + "]").addClass("active"))
            }, bindEvent: function () {
                var b = this;
                a(window).scroll(function () {
                    b.setActive()
                });
                b.$element.on("click", ".btn-box", function () {
                    a(this).find("span").hasClass("icon-minus-sign") ?
                        (a(this).find("span").removeClass("icon-minus-sign").addClass("icon-plus-sign"), b.$element.find("ul").fadeOut()) : (a(this).find("span").removeClass("icon-plus-sign").addClass("icon-minus-sign"), b.$element.find("ul").fadeIn())
                });
                b.$element.on("click", ".menu-level-item", function () {
                    var b = a(this).attr("name");
                    a("html, body").stop().animate({scrollTop: a("#" + b).offset().top}, 800, function () {
                        window.location.hash = b
                    });
                    return !1
                })
            }
        };
        return h
    }();
    a.fn.autoMenu = function (h) {
        return this.each(function () {
            var b = a(this),
                c = b.data("autoMenu"), d = a.extend({}, a.fn.autoMenu.defaults, "object" === typeof h && h);
            c || b.data("autoMenu", new k(this, d));
            if ("string" === a.type(h)) c[d]()
        })
    };
    a.fn.autoMenu.defaults = {levelOne: "h2", levelTwo: "h3", offTop: 100};
    a(function () {
        0 < a("[data-autoMenu]").length && new k(a("[data-autoMenu]"))
    })
})(jQuery);

