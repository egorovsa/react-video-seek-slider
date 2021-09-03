/*! For license information please see app.js.LICENSE.txt */
(() => {
  "use strict";
  var e = {
      256: (e, r, t) => {
        t.r(r);
      },

      418: (e) => {
        var r = Object.getOwnPropertySymbols,
          t = Object.prototype.hasOwnProperty,
          n = Object.prototype.propertyIsEnumerable;
        function o(e) {
          if (null == e)
            throw new TypeError(
              "Object.assign cannot be called with null or undefined"
            );
          return Object(e);
        }

        e.exports = (function () {
          try {
            if (!Object.assign) return !1;
            var e = new String("abc");
            if (((e[5] = "de"), "5" === Object.getOwnPropertyNames(e)[0]))
              return !1;
            for (var r = {}, t = 0; t < 10; t++)
              r["_" + String.fromCharCode(t)] = t;
            if (
              "0123456789" !==
              Object.getOwnPropertyNames(r)
                .map(function (e) {
                  return r[e];
                })
                .join("")
            )
              return !1;
            var n = {};

            return (
              "abcdefghijklmnopqrst".split("").forEach(function (e) {
                n[e] = e;
              }),
              "abcdefghijklmnopqrst" ===
                Object.keys(
                  Object.assign(
                    {},

                    n
                  )
                ).join("")
            );
          } catch (e) {
            return !1;
          }
        })()
          ? Object.assign
          : function (e, i) {
              for (var s, u, c = o(e), a = 1; a < arguments.length; a++) {
                for (var d in (s = Object(arguments[a])))
                  t.call(s, d) && (c[d] = s[d]);
                if (r) {
                  u = r(s);
                  for (var f = 0; f < u.length; f++)
                    n.call(s, u[f]) && (c[u[f]] = s[u[f]]);
                }
              }

              return c;
            };
      },

      251: (e, r, t) => {
        t(418);
        var n = t(798),
          o = 60103;
        if (((r.Fragment = 60107), "function" == typeof Symbol && Symbol.for)) {
          var i = Symbol.for;
          (o = i("react.element")), (r.Fragment = i("react.fragment"));
        }

        var s =
            n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
              .ReactCurrentOwner,
          u = Object.prototype.hasOwnProperty,
          c = {
            key: !0,
            ref: !0,
            __self: !0,
            __source: !0,
          };

        function a(e, r, t) {
          var n,
            i = {},
            a = null,
            d = null;
          for (n in (void 0 !== t && (a = "" + t),
          void 0 !== r.key && (a = "" + r.key),
          void 0 !== r.ref && (d = r.ref),
          r))
            u.call(r, n) && !c.hasOwnProperty(n) && (i[n] = r[n]);
          if (e && e.defaultProps)
            for (n in (r = e.defaultProps)) void 0 === i[n] && (i[n] = r[n]);
          return {
            $$typeof: o,
            type: e,
            key: a,
            ref: d,
            props: i,
            _owner: s.current,
          };
        }

        (r.jsx = a), (r.jsxs = a);
      },

      893: (e, r, t) => {
        e.exports = t(251);
      },

      944: function (e, r, t) {
        var n =
          (this && this.__assign) ||
          function () {
            return (n =
              Object.assign ||
              function (e) {
                for (var r, t = 1, n = arguments.length; t < n; t++)
                  for (var o in (r = arguments[t]))
                    Object.prototype.hasOwnProperty.call(r, o) && (e[o] = r[o]);
                return e;
              }).apply(this, arguments);
          };

        Object.defineProperty(r, "__esModule", {
          value: !0,
        }),
          (r.VideoSeekSlider = void 0);
        var o = t(893),
          i = t(798);
        t(256),
          (r.VideoSeekSlider = function (e) {
            var r = e.max,
              t = void 0 === r ? 100 : r,
              s = e.currentTime,
              u = void 0 === s ? 0 : s,
              c = e.progress,
              a = void 0 === c ? 0 : c,
              d = e.hideHoverTime,
              f = void 0 !== d && d,
              v = e.offset,
              l = void 0 === v ? 0 : v,
              m = e.secondsPrefix,
              p = void 0 === m ? "" : m,
              h = e.minutesPrefix,
              y = void 0 === h ? "" : h,
              g = e.onChange,
              w = void 0 === g ? function () {} : g,
              b = e.limitTimeTooltipBySides,
              j = void 0 !== b && b,
              O = (0, i.useState)(0),
              x = O[0],
              S = O[1],
              _ = (0, i.useRef)(!1),
              E = (0, i.useRef)(0),
              P = (0, i.useRef)(!1),
              L = (0, i.useRef)(null),
              N = (0, i.useRef)(null);
            (0, i.useEffect)(
              function () {
                return (
                  X(),
                  window.addEventListener("resize", X),
                  window.addEventListener("mousemove", R),
                  window.addEventListener("mouseup", B),
                  window.addEventListener("touchmove", T),
                  window.addEventListener("touchend", I),
                  function () {
                    window.removeEventListener("resize", X),
                      window.removeEventListener("mousemove", R),
                      window.removeEventListener("mouseup", B),
                      window.removeEventListener("touchmove", T),
                      window.removeEventListener("touchend", I);
                  }
                );
              },

              []
            );
            var k,
              M = (0, i.useMemo)(
                function () {
                  var e = (100 * x) / E.current,
                    r = (function (e) {
                      e = Math.round(e + l);
                      var r = Math.floor(e / 3600),
                        t = e % 3600,
                        n = Math.floor(t / 60),
                        o = Math.ceil(t % 60);
                      return {
                        hh: r.toString(),
                        mm: n < 10 ? "0" + n : n.toString(),
                        ss: o < 10 ? "0" + o : o.toString(),
                      };
                    })(Math.floor((t / 100) * +e));
                  return t + l < 60
                    ? p + r.ss
                    : t + l < 3600
                    ? y + r.mm + ":" + r.ss
                    : r.hh + ":" + r.mm + ":" + r.ss;
                },

                [x, E]
              );
            function T(e) {
              var r;
              e.preventDefault(), e.stopPropagation();
              for (var t = 0, n = 0; n < e.changedTouches.length; n++)
                t =
                  null === (r = e.changedTouches) || void 0 === r
                    ? void 0
                    : r[n].pageX;
              (t = t < 0 ? 0 : t), P.current && C(t);
            }

            function R(e) {
              _.current && C(e.pageX);
            }

            function C(e) {
              var r,
                n =
                  e -
                  (null === (r = L.current) || void 0 === r
                    ? void 0
                    : r.getBoundingClientRect().left);
              (n = (n = n < 0 ? 0 : n) > E.current ? E.current : n), S(n);
              var o = +(((100 * n) / E.current) * (t / 100)).toFixed(0);
              w(o, o + l);
            }

            function X() {
              L.current && (E.current = L.current.offsetWidth);
            }

            function D(e, r) {
              var t,
                n =
                  r.pageX -
                  (null === (t = L.current) || void 0 === t
                    ? void 0
                    : t.getBoundingClientRect().left);
              e && (n = 0), S(n);
            }

            function W(e) {
              return {
                transform: "scaleX(" + (100 * e) / t / 100 + ")",
              };
            }

            function B(e) {
              F(!1, e);
            }

            function F(e, r) {
              r.preventDefault(), R(r), (_.current = e), S(e ? x : 0);
            }

            function I() {
              q(!1);
            }

            function q(e) {
              void 0 === e && (e = !0), (P.current = e), S(e ? x : 0);
            }

            function z() {
              return x > 0 || _.current;
            }

            return (0, o.jsxs)(
              "div",
              n(
                {
                  className: "ui-video-seek-slider",
                },

                {
                  children: [
                    (0, o.jsx)(
                      "div",
                      n(
                        {
                          className: z() ? "track active" : "track",
                          ref: L,
                          onMouseMove: function (e) {
                            return D(!1, e);
                          },

                          onMouseLeave: function (e) {
                            return D(!0, e);
                          },

                          onMouseDown: function (e) {
                            return F(!0, e);
                          },

                          onTouchStart: function () {
                            return q(!0);
                          },
                        },

                        {
                          children: (0, o.jsxs)(
                            "div",
                            n(
                              {
                                className: "main",
                              },

                              {
                                children: [
                                  (0, o.jsx)(
                                    "div",
                                    {
                                      className: "buffered",
                                      style: W(a),
                                    },

                                    void 0
                                  ),
                                  (0, o.jsx)(
                                    "div",
                                    {
                                      className: "seek-hover",
                                      style: {
                                        transform:
                                          "scaleX(" +
                                          (100 * x) / E.current / 100 +
                                          ")",
                                      },
                                    },

                                    void 0
                                  ),
                                  (0, o.jsx)(
                                    "div",
                                    {
                                      className: "connect",
                                      style: W(u),
                                    },

                                    void 0
                                  ),
                                ],
                              }
                            ),
                            void 0
                          ),
                        }
                      ),
                      void 0
                    ),
                    !f &&
                      (0, o.jsx)(
                        "div",
                        n(
                          {
                            className: z() ? "hover-time active" : "hover-time",
                            style:
                              ((k = 0),
                              N.current &&
                                ((k = x - N.current.offsetWidth / 2),
                                j &&
                                  (k < 0
                                    ? (k = 0)
                                    : k + N.current.offsetWidth > E.current &&
                                      (k = E.current - N.current.offsetWidth))),
                              {
                                transform: "translateX(" + k + "px)",
                              }),
                            ref: N,
                          },

                          {
                            children: M,
                          }
                        ),
                        void 0
                      ),
                    (0, o.jsx)(
                      "div",
                      n(
                        {
                          className: z() ? "thumb active" : "thumb",
                          style: {
                            transform:
                              "translateX(" + E.current / (t / u) + "px)",
                          },
                        },

                        {
                          children: (0, o.jsx)(
                            "div",
                            {
                              className: "handler",
                            },

                            void 0
                          ),
                        }
                      ),
                      void 0
                    ),
                  ],
                }
              ),
              void 0
            );
          });
      },

      798: (e) => {
        e.exports = require("react");
      },
    },
    r = {};

  function t(n) {
    var o = r[n];
    if (void 0 !== o) return o.exports;

    var i = (r[n] = {
      exports: {},
    });

    return e[n].call(i.exports, i, i.exports, t), i.exports;
  }

  t.r = (e) => {
    "undefined" != typeof Symbol &&
      Symbol.toStringTag &&
      Object.defineProperty(e, Symbol.toStringTag, {
        value: "Module",
      }),
      Object.defineProperty(e, "__esModule", {
        value: !0,
      });
  };
  var n = t(944);
  module.exports = n;
})();