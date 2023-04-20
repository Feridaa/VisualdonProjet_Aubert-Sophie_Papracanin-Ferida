function e(e, t, n) {
  n = n || {};
  var r = e.ownerDocument,
    o = r.defaultView.CustomEvent;
  "function" == typeof o
    ? (o = new o(t, { detail: n }))
    : ((o = r.createEvent("Event")).initEvent(t, !1, !1), (o.detail = n)),
    e.dispatchEvent(o);
}
function t(e) {
  return (
    Array.isArray(e) ||
    e instanceof Int8Array ||
    e instanceof Int16Array ||
    e instanceof Int32Array ||
    e instanceof Uint8Array ||
    e instanceof Uint8ClampedArray ||
    e instanceof Uint16Array ||
    e instanceof Uint32Array ||
    e instanceof Float32Array ||
    e instanceof Float64Array
  );
}



function L(e, n, o, a) {
  let i,
    s,
    c,
    l,
    u = t(e);
  if (
    (e instanceof Map
      ? e instanceof e.constructor
        ? ((i = `Map(${e.size})`), (s = k))
        : ((i = "Map()"), (s = U))
      : e instanceof Set
      ? e instanceof e.constructor
        ? ((i = `Set(${e.size})`), (s = M))
        : ((i = "Set()"), (s = U))
      : u
      ? ((i = `${e.constructor.name}(${e.length})`), (s = R))
      : (l = h(e))
      ? ((i = `Immutable.${l.name}${"Record" === l.name ? "" : `(${e.size})`}`),
        (u = l.arrayish),
        (s = l.arrayish ? P : l.setish ? I : D))
      : ((i = d(e)), (s = U)),
    n)
  ) {
    const t = document.createElement("span");
    return (
      (t.className = "observablehq--shallow"),
      o && t.appendChild(r(o)),
      t.appendChild(document.createTextNode(i)),
      t.addEventListener("mouseup", function (n) {
        O(t) || (n.stopPropagation(), ie(t, L(e)));
      }),
      t
    );
  }
  const f = document.createElement("span");
  (f.className = "observablehq--collapsed"), o && f.appendChild(r(o));
  const p = f.appendChild(document.createElement("a"));
  (p.innerHTML =
    "<svg width=8 height=8 class='observablehq--caret'>\n    <path d='M7 4L1 8V0z' fill='currentColor' />\n  </svg>"),
    p.appendChild(document.createTextNode(`${i}${u ? " [" : " {"}`)),
    f.addEventListener(
      "mouseup",
      function (t) {
        O(f) || (t.stopPropagation(), ie(f, v(e, 0, o, a)));
      },
      !0
    ),
    (s = s(e));
  for (let e = 0; !(c = s.next()).done && e < 20; ++e)
    e > 0 && f.appendChild(document.createTextNode(", ")),
      f.appendChild(c.value);
  return (
    c.done || f.appendChild(document.createTextNode(", …")),
    f.appendChild(document.createTextNode(u ? "]" : "}")),
    f
  );
}



const se = /\s+\(\d+:\d+\)$/m;
class Inspector {
  constructor(e) {
    if (!e) throw new Error("invalid node");
    (this._node = e), e.classList.add("observablehq");
  }
  pending() {
    const { _node: e } = this;
    e.classList.remove("observablehq--error"),
      e.classList.add("observablehq--running");
  }
  fulfilled(t, n) {
    const { _node: r } = this;
    if (
      ((!(function (e) {
        return (
          (e instanceof Element || e instanceof Text) &&
          e instanceof e.constructor
        );
      })(t) ||
        (t.parentNode && t.parentNode !== r)) &&
        (t = ae(
          t,
          !1,
          r.firstChild &&
            r.firstChild.classList &&
            r.firstChild.classList.contains("observablehq--expanded"),
          n
        )).classList.add("observablehq--inspect"),
      r.classList.remove("observablehq--running", "observablehq--error"),
      r.firstChild !== t)
    )
      if (r.firstChild) {
        for (; r.lastChild !== r.firstChild; ) r.removeChild(r.lastChild);
        r.replaceChild(t, r.firstChild);
      } else r.appendChild(t);
    e(r, "update");
  }
  rejected(t, n) {
    const { _node: o } = this;
    for (
      o.classList.remove("observablehq--running"),
        o.classList.add("observablehq--error");
      o.lastChild;

    )
      o.removeChild(o.lastChild);
    var a = document.createElement("div");
    (a.className = "observablehq--inspect"),
      n && a.appendChild(r(n)),
      a.appendChild(document.createTextNode((t + "").replace(se, ""))),
      o.appendChild(a),
      e(o, "error", { error: t });
  }
}
Inspector.into = function (e) {
  if ("string" == typeof e && null == (e = document.querySelector(e)))
    throw new Error("container not found");
  return function () {
    return new Inspector(e.appendChild(document.createElement("div")));
  };
};
var ce = {},
  le = {};

function me(e) {
  var t = new RegExp('["' + e + "\n\r]"),
    n = e.charCodeAt(0);
  function r(e, t) {
    var r,
      o = [],
      a = e.length,
      i = 0,
      s = 0,
      c = a <= 0,
      l = !1;
    function u() {
      if (c) return le;
      if (l) return (l = !1), ce;
      var t,
        r,
        o = i;
      if (34 === e.charCodeAt(o)) {
        for (
          ;
          (i++ < a && 34 !== e.charCodeAt(i)) || 34 === e.charCodeAt(++i);

        );
        return (
          (t = i) >= a
            ? (c = !0)
            : 10 === (r = e.charCodeAt(i++))
            ? (l = !0)
            : 13 === r && ((l = !0), 10 === e.charCodeAt(i) && ++i),
          e.slice(o + 1, t - 1).replace(/""/g, '"')
        );
      }
      for (; i < a; ) {
        if (10 === (r = e.charCodeAt((t = i++)))) l = !0;
        else if (13 === r) (l = !0), 10 === e.charCodeAt(i) && ++i;
        else if (r !== n) continue;
        return e.slice(o, t);
      }
      return (c = !0), e.slice(o, a);
    }
    for (
      10 === e.charCodeAt(a - 1) && --a, 13 === e.charCodeAt(a - 1) && --a;
      (r = u()) !== le;

    ) {
      for (var f = []; r !== ce && r !== le; ) f.push(r), (r = u());
      (t && null == (f = t(f, s++))) || o.push(f);
    }
    return o;
  }
  
  function a(t) {
    return t.map(i).join(e);
  }
  function i(e) {
    return null == e
      ? ""
      : e instanceof Date
      ? pe(e)
      : t.test((e += ""))
      ? '"' + e.replace(/"/g, '""') + '"'
      : e;
  }
  return {
    parse: function (e, t) {
      var n,
        o,
        a = r(e, function (e, r) {
          if (n) return n(e, r - 1);
          (o = e),
            (n = t
              ? (function (e, t) {
                  var n = ue(e);
                  return function (r, o) {
                    return t(n(r), o, e);
                  };
                })(e, t)
              : ue(e));
        });
      return (a.columns = o || []), a;
    },
    parseRows: r,
    format: function (t, n) {
      return (
        null == n && (n = fe(t)), [n.map(i).join(e)].concat(o(t, n)).join("\n")
      );
    },
    formatBody: function (e, t) {
      return null == t && (t = fe(e)), o(e, t).join("\n");
    },
    formatRows: function (e) {
      return e.map(a).join("\n");
    },
    formatRow: a,
    formatValue: i,
  };
}
var he = me(","),
  be = he.parse,
  we = he.parseRows,
  ye = me("\t"),
  ve = ye.parse,
  _e = ye.parseRows;
function ge(e) {
  for (var t in e) {
    var n,
      r,
      o = e[t].trim();
    if (o)
      if ("true" === o) o = !0;
      else if ("false" === o) o = !1;
      else if ("NaN" === o) o = NaN;
      else if (isNaN((n = +o))) {
        if (
          !(r = o.match(
            /^([-+]\d{2})?\d{4}(-\d{2}(-\d{2})?)?(T\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/
          ))
        )
          continue;
        Ee && r[4] && !r[7] && (o = o.replace(/-/g, "/").replace(/T/, " ")),
          (o = new Date(o));
      } else o = n;
    else o = null;
    e[t] = o;
  }
  return e;
}
const Ee =
  new Date("2019-01-01T00:00").getHours() ||
  new Date("2019-07-01T00:00").getHours();
function Ce(e, t, n) {
  return { resolve: (r = n) => `${e}@${t}/${r}` };
}
const Ne = Ce("d3", "7.8.2", "dist/d3.min.js"),
  xe = Ce("@observablehq/inputs", "0.10.4", "dist/inputs.min.js"),
  Te = Ce("@observablehq/plot", "0.6.4", "dist/plot.umd.min.js"),
  Ae = Ce("@observablehq/graphviz", "0.2.1", "dist/graphviz.min.js"),
  je = Ce("@observablehq/highlight.js", "2.0.0", "highlight.min.js"),
  $e = Ce("@observablehq/katex", "0.11.1", "dist/katex.min.js"),
  Se = Ce("lodash", "4.17.21", "lodash.min.js"),
  qe = Ce("htl", "0.3.1", "dist/htl.min.js"),
  Oe = Ce("jszip", "3.10.1", "dist/jszip.min.js"),
  Le = Ce("marked", "0.3.12", "marked.min.js"),
  ke = Ce("sql.js", "1.8.0", "dist/sql-wasm.js"),
  Me = Ce("vega", "5.22.1", "build/vega.min.js"),
  Ie = Ce("vega-lite", "5.6.0", "build/vega-lite.min.js"),
  Pe = Ce("vega-lite-api", "5.0.0", "build/vega-lite-api.min.js"),
  Re = Ce("apache-arrow", "4.0.1", "Arrow.es2015.min.js"),
  Ue = Ce("apache-arrow", "9.0.0", "+esm"),
  De = Ce("apache-arrow", "11.0.0", "+esm"),
  Fe = Ce("arquero", "4.8.8", "dist/arquero.min.js"),
  Be = Ce("topojson-client", "3.1.0", "dist/topojson-client.min.js"),
  ze = Ce("exceljs", "4.3.0", "dist/exceljs.min.js"),
  We = Ce("mermaid", "9.2.2", "dist/mermaid.min.js"),
  He = Ce("leaflet", "1.9.3", "dist/leaflet.js"),
  Ve = Ce("@duckdb/duckdb-wasm", "1.24.0", "+esm"),
  Ge = new Map(),
  Ye = [],
  Ze = Ye.map,
  Je = Ye.some,
  Ke = Ye.hasOwnProperty,
  Xe = /^((?:@[^/@]+\/)?[^/@]+)(?:@([^/]+))?(?:\/(.*))?$/,
  Qe = /^\d+\.\d+\.\d+(-[\w-.+]+)?$/,
  et = /(?:\.[^/]*|\/)$/;
class RequireError extends Error {
  constructor(e) {
    super(e);
  }
}
function tt(e) {
  const t = Xe.exec(e);
  return t && { name: t[1], version: t[2], path: t[3] };
}
function nt(
  e = "https://cdn.jsdelivr.net/npm/",
  t = ["unpkg", "jsdelivr", "browser", "main"]
) {
  if (!/\/$/.test(e)) throw new Error("origin lacks trailing slash");
  function n(t) {
    const n = `${e}${t.name}${t.version ? `@${t.version}` : ""}/package.json`;
    let r = Ge.get(n);
    return (
      r ||
        Ge.set(
          n,
          (r = fetch(n).then((e) => {
            if (!e.ok) throw new RequireError("unable to load package.json");
            return e.redirected && !Ge.has(e.url) && Ge.set(e.url, r), e.json();
          }))
        ),
      r
    );
  }
  return async function (r, o) {
    if (
      (r.startsWith(e) && (r = r.substring(e.length)), /^(\w+:)|\/\//i.test(r))
    )
      return r;
    if (/^[.]{0,2}\//i.test(r))
      return new URL(r, null == o ? location : o).href;
    if (!r.length || /^[\s._]/.test(r) || /\s$/.test(r))
      throw new RequireError("illegal name");
    const a = tt(r);
    if (!a) return `${e}${r}`;
    if (!a.version && null != o && o.startsWith(e)) {
      const t = await n(tt(o.substring(e.length)));
      a.version =
        (t.dependencies && t.dependencies[a.name]) ||
        (t.peerDependencies && t.peerDependencies[a.name]);
    }
    if (
      (a.path && !et.test(a.path) && (a.path += ".js"),
      a.path && a.version && Qe.test(a.version))
    )
      return `${e}${a.name}@${a.version}/${a.path}`;
    const i = await n(a);
    return `${e}${i.name}@${i.version}/${
      a.path ||
      (function (e) {
        for (const n of t) {
          let t = e[n];
          if ("string" == typeof t)
            return (
              t.startsWith("./") && (t = t.slice(2)), et.test(t) ? t : `${t}.js`
            );
        }
      })(i) ||
      "index.js"
    }`;
  };
}
RequireError.prototype.name = RequireError.name;
var rt = ot(nt());
function ot(e) {
  const t = new Map(),
    n = o(null);
  function r(e) {
    if ("string" != typeof e) return e;
    let n = t.get(e);
    return (
      n ||
        t.set(
          e,
          (n = new Promise((t, n) => {
            const r = document.createElement("script");
            (r.onload = () => {
              try {
                t(Ye.pop()(o(e)));
              } catch (e) {
                n(new RequireError("invalid module"));
              }
              r.remove();
            }),
              (r.onerror = () => {
                n(new RequireError("unable to load module")), r.remove();
              }),
              (r.async = !0),
              (r.src = e),
              (window.define = ct),
              document.head.appendChild(r);
          }))
        ),
      n
    );
  }
  function o(t) {
    return (n) => Promise.resolve(e(n, t)).then(r);
  }
  function a(e) {
    return arguments.length > 1
      ? Promise.all(Ze.call(arguments, n)).then(at)
      : n(e);
  }
  return (
    (a.alias = function (t) {
      return ot((n, r) =>
        n in t && ((r = null), "string" != typeof (n = t[n])) ? n : e(n, r)
      );
    }),
    (a.resolve = e),
    a
  );
}
function at(e) {
  const t = {};
  for (const n of e)
    for (const e in n)
      Ke.call(n, e) &&
        (null == n[e]
          ? Object.defineProperty(t, e, { get: it(n, e) })
          : (t[e] = n[e]));
  return t;
}
function it(e, t) {
  return () => e[t];
}
function st(e) {
  return "exports" === (e += "") || "module" === e;
}
function ct(e, t, n) {
  const r = arguments.length;
  r < 2
    ? ((n = e), (t = []))
    : r < 3 && ((n = t), (t = "string" == typeof e ? [] : e)),
    Ye.push(
      Je.call(t, st)
        ? (e) => {
            const r = {},
              o = { exports: r };
            return Promise.all(
              Ze.call(t, (t) =>
                "exports" === (t += "") ? r : "module" === t ? o : e(t)
              )
            ).then((e) => (n.apply(null, e), o.exports));
          }
        : (e) =>
            Promise.all(Ze.call(t, e)).then((e) =>
              "function" == typeof n ? n.apply(null, e) : n
            )
    );
}
ct.amd = {};
const lt = "https://cdn.observableusercontent.com/npm/";
let ut = rt;
async function ft(e) {
  const [t, n] = await Promise.all([
    e(ke.resolve()),
    e.resolve(ke.resolve("dist/")),
  ]);
  return t({ locateFile: (e) => `${n}${e}` });
}
class SQLiteDatabaseClient {
  constructor(e) {
    Object.defineProperties(this, { _db: { value: e } });
  }
  static async open(e) {
    const [t, n] = await Promise.all([ft(ut), Promise.resolve(e).then(pt)]);
    return new SQLiteDatabaseClient(new t.Database(n));
  }
  async query(e, t) {
    return await (async function (e, t, n) {
      const [r] = await e.exec(t, n);
      if (!r) return [];
      const { columns: o, values: a } = r,
        i = a.map((e) => Object.fromEntries(e.map((e, t) => [o[t], e])));
      return (i.columns = o), i;
    })(this._db, e, t);
  }
  async queryRow(e, t) {
    return (await this.query(e, t))[0] || null;
  }
  async explain(e, t) {
    return mt("pre", { className: "observablehq--inspect" }, [
      ht(
        (await this.query(`EXPLAIN QUERY PLAN ${e}`, t))
          .map((e) => e.detail)
          .join("\n")
      ),
    ]);
  }
  async describeTables({ schema: e } = {}) {
    return this.query(
      `SELECT NULLIF(schema, 'main') AS schema, name FROM pragma_table_list() WHERE type = 'table'${
        null == e ? "" : " AND schema = ?"
      } AND name NOT LIKE 'sqlite_%' ORDER BY schema, name`,
      null == e ? [] : [e]
    );
  }
  async describeColumns({ schema: e, table: t } = {}) {
    if (null == t) throw new Error("missing table");
    const n = await this.query(
      `SELECT name, type, "notnull" FROM pragma_table_info(?${
        null == e ? "" : ", ?"
      }) ORDER BY cid`,
      null == e ? [t] : [t, e]
    );
    if (!n.length) throw new Error(`table not found: ${t}`);
    return n.map(({ name: e, type: t, notnull: n }) => ({
      name: e,
      type: dt(t),
      databaseType: t,
      nullable: !n,
    }));
  }
  async describe(e) {
    const t = await (void 0 === e
      ? this.query("SELECT name FROM sqlite_master WHERE type = 'table'")
      : this.query("SELECT * FROM pragma_table_info(?)", [e]));
    if (!t.length) throw new Error("Not found");
    const { columns: n } = t;
    return mt("table", { value: t }, [
      mt("thead", [
        mt(
          "tr",
          n.map((e) => mt("th", [ht(e)]))
        ),
      ]),
      mt(
        "tbody",
        t.map((e) =>
          mt(
            "tr",
            n.map((t) => mt("td", [ht(e[t])]))
          )
        )
      ),
    ]);
  }
  async sql() {
    return this.query(...this.queryTag.apply(this, arguments));
  }
  queryTag(e, ...t) {
    return [e.join("?"), t];
  }
}
function dt(e) {
  switch (e) {
    case "NULL":
      return "null";
    case "INT":
    case "INTEGER":
    case "TINYINT":
    case "SMALLINT":
    case "MEDIUMINT":
    case "BIGINT":
    case "UNSIGNED BIG INT":
    case "INT2":
    case "INT8":
      return "integer";
    case "TEXT":
    case "CLOB":
    case "DATE":
    case "DATETIME":
      return "string";
    case "REAL":
    case "DOUBLE":
    case "DOUBLE PRECISION":
    case "FLOAT":
    case "NUMERIC":
      return "number";
    case "BLOB":
      return "buffer";
    default:
      return /^(?:(?:(?:VARYING|NATIVE) )?CHARACTER|(?:N|VAR|NVAR)CHAR)\(/.test(
        e
      )
        ? "string"
        : /^(?:DECIMAL|NUMERIC)\(/.test(e)
        ? "number"
        : "other";
  }
}
function pt(e) {
  return "string" == typeof e
    ? fetch(e).then(pt)
    : e instanceof Response || e instanceof Blob
    ? e.arrayBuffer().then(pt)
    : e instanceof ArrayBuffer
    ? new Uint8Array(e)
    : e;
}
function mt(e, t, n) {
  2 === arguments.length && ((n = t), (t = void 0));
  const r = document.createElement(e);
  if (void 0 !== t) for (const e in t) r[e] = t[e];
  if (void 0 !== n) for (const e of n) r.appendChild(e);
  return r;
}
function ht(e) {
  return document.createTextNode(e);
}
Object.defineProperty(SQLiteDatabaseClient.prototype, "dialect", {
  value: "sqlite",
});
class Workbook {
  constructor(e) {
    Object.defineProperties(this, {
      _: { value: e },
      sheetNames: { value: e.worksheets.map((e) => e.name), enumerable: !0 },
    });
  }
  sheet(e, t) {
    const n =
      "number" == typeof e
        ? this.sheetNames[e]
        : this.sheetNames.includes((e += ""))
        ? e
        : null;
    if (null == n) throw new Error(`Sheet not found: ${e}`);
    return (function (e, { range: t, headers: n } = {}) {
      let [[r, o], [a, i]] = (function (
        e = ":",
        { columnCount: t, rowCount: n }
      ) {
        if (!(e += "").match(/^[A-Z]*\d*:[A-Z]*\d*$/))
          throw new Error("Malformed range specifier");
        const [[r = 0, o = 0], [a = t - 1, i = n - 1]] = e.split(":").map(vt);
        return [
          [r, o],
          [a, i],
        ];
      })(t, e);
      const s = n ? e._rows[o++] : null;
      let c = new Set(["#"]);
      for (let e = r; e <= a; e++) {
        const t = s ? bt(s.findCell(e + 1)) : null;
        let n = (t && t + "") || yt(e);
        for (; c.has(n); ) n += "_";
        c.add(n);
      }
      c = new Array(r).concat(Array.from(c));
      const l = new Array(i - o + 1);
      for (let t = o; t <= i; t++) {
        const n = (l[t - o] = Object.create(null, { "#": { value: t + 1 } })),
          i = e.getRow(t + 1);
        if (i.hasValues)
          for (let e = r; e <= a; e++) {
            const t = bt(i.findCell(e + 1));
            null != t && (n[c[e + 1]] = t);
          }
      }
      return (l.columns = c.filter(() => !0)), l;
    })(this._.getWorksheet(n), t);
  }
}
function bt(e) {
  if (!e) return;
  const { value: t } = e;
  if (t && "object" == typeof t && !(t instanceof Date)) {
    if (t.formula || t.sharedFormula)
      return t.result && t.result.error ? NaN : t.result;
    if (t.richText) return wt(t);
    if (t.text) {
      let { text: e } = t;
      return (
        e.richText && (e = wt(e)),
        t.hyperlink && t.hyperlink !== e ? `${t.hyperlink} ${e}` : e
      );
    }
    return t;
  }
  return t;
}
function wt(e) {
  return e.richText.map((e) => e.text).join("");
}
function yt(e) {
  let t = "";
  e++;
  do {
    t = String.fromCharCode(64 + (e % 26 || 26)) + t;
  } while ((e = Math.floor((e - 1) / 26)));
  return t;
}
function vt(e) {
  const [, t, n] = e.match(/^([A-Z]*)(\d*)$/);
  let r = 0;
  if (t)
    for (let e = 0; e < t.length; e++)
      r += Math.pow(26, t.length - e - 1) * (t.charCodeAt(e) - 64);
  return [r ? r - 1 : void 0, n ? +n - 1 : void 0];
}
async function _t(e) {
  const t = await fetch(await e.url());
  if (!t.ok) throw new Error(`Unable to load file: ${e.name}`);
  return t;
}
async function gt(e, t, { array: n = !1, typed: r = !1 } = {}) {
  const o = await e.text();
  return ("\t" === t ? (n ? _e : ve) : n ? we : be)(o, r && ge);
}
class Et {
  constructor(e, t) {
    Object.defineProperty(this, "name", { value: e, enumerable: !0 }),
      void 0 !== t &&
        Object.defineProperty(this, "mimeType", {
          value: t + "",
          enumerable: !0,
        });
  }
  async blob() {
    return (await _t(this)).blob();
  }
  async arrayBuffer() {
    return (await _t(this)).arrayBuffer();
  }
  async text() {
    return (await _t(this)).text();
  }
  async json() {
    return (await _t(this)).json();
  }
  async stream() {
    return (await _t(this)).body;
  }
  async csv(e) {
    return gt(this, ",", e);
  }
  async tsv(e) {
    return gt(this, "\t", e);
  }
  async image(e) {
    const t = await this.url();
    return new Promise((n, r) => {
      const o = new Image();
      new URL(t, document.baseURI).origin !== new URL(location).origin &&
        (o.crossOrigin = "anonymous"),
        Object.assign(o, e),
        (o.onload = () => n(o)),
        (o.onerror = () => r(new Error(`Unable to load file: ${this.name}`))),
        (o.src = t);
    });
  }
  async arrow({ version: e = 4 } = {}) {
    switch (e) {
      case 4: {
        const [e, t] = await Promise.all([ut(Re.resolve()), _t(this)]);
        return e.Table.from(t);
      }
      case 9: {
        const [e, t] = await Promise.all([
          import(`${lt}${Ue.resolve()}`),
          _t(this),
        ]);
        return e.tableFromIPC(t);
      }
      case 11: {
        const [e, t] = await Promise.all([
          import(`${lt}${De.resolve()}`),
          _t(this),
        ]);
        return e.tableFromIPC(t);
      }
      default:
        throw new Error(`unsupported arrow version: ${e}`);
    }
  }
  async sqlite() {
    return SQLiteDatabaseClient.open(_t(this));
  }
  async zip() {
    const [e, t] = await Promise.all([ut(Oe.resolve()), this.arrayBuffer()]);
    return new ZipArchive(await e.loadAsync(t));
  }
  async xml(e = "application/xml") {
    return new DOMParser().parseFromString(await this.text(), e);
  }
  async html() {
    return this.xml("text/html");
  }
  async xlsx() {
    const [e, t] = await Promise.all([ut(ze.resolve()), this.arrayBuffer()]);
    return new Workbook(await new e.Workbook().xlsx.load(t));
  }
}
class FileAttachment extends Et {
  constructor(e, t, n) {
    super(t, n), Object.defineProperty(this, "_url", { value: e });
  }
  async url() {
    return (await this._url) + "";
  }
}
function Ct(e) {
  throw new Error(`File not found: ${e}`);
}
class ZipArchive {
  constructor(e) {
    Object.defineProperty(this, "_", { value: e }),
      (this.filenames = Object.keys(e.files).filter((t) => !e.files[t].dir));
  }
  file(e) {
    const t = this._.file((e += ""));
    if (!t || t.dir) throw new Error(`file not found: ${e}`);
    return new ZipArchiveEntry(t);
  }
}
class ZipArchiveEntry extends Et {
  constructor(e) {
    super(e.name),
      Object.defineProperty(this, "_", { value: e }),
      Object.defineProperty(this, "_url", { writable: !0 });
  }
  async url() {
    return this._url || (this._url = this.blob().then(URL.createObjectURL));
  }
  async blob() {
    return this._.async("blob");
  }
  async arrayBuffer() {
    return this._.async("arraybuffer");
  }
  async text() {
    return this._.async("text");
  }
  async json() {
    return JSON.parse(await this.text());
  }
}
var Nt = {
  math: "http://www.w3.org/1998/Math/MathML",
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
};
var xt = 0;
function Tt(e) {
  return new At("O-" + (null == e ? "" : e + "-") + ++xt);
}
function At(e) {
  (this.id = e), (this.href = new URL(`#${e}`, location) + "");
}
At.prototype.toString = function () {
  return "url(" + this.href + ")";
};
var jt = Object.freeze({
  __proto__: null,
  canvas: function (e, t) {
    var n = document.createElement("canvas");
    return (n.width = e), (n.height = t), n;
  },
  context2d: function (e, t, n) {
    null == n && (n = devicePixelRatio);
    var r = document.createElement("canvas");
    (r.width = e * n), (r.height = t * n), (r.style.width = e + "px");
    var o = r.getContext("2d");
    return o.scale(n, n), o;
  },
  download: function (e, t = "untitled", n = "Save") {
    const r = document.createElement("a"),
      o = r.appendChild(document.createElement("button"));
    async function a() {
      await new Promise(requestAnimationFrame),
        URL.revokeObjectURL(r.href),
        r.removeAttribute("href"),
        (o.textContent = n),
        (o.disabled = !1);
    }
    return (
      (o.textContent = n),
      (r.download = t),
      (r.onclick = async (t) => {
        if (((o.disabled = !0), r.href)) return a();
        o.textContent = "Saving…";
        try {
          const t = await ("function" == typeof e ? e() : e);
          (o.textContent = "Download"), (r.href = URL.createObjectURL(t));
        } catch (e) {
          o.textContent = n;
        }
        if (t.eventPhase) return a();
        o.disabled = !1;
      }),
      r
    );
  },
  element: function (e, t) {
    var n,
      r = (e += ""),
      o = r.indexOf(":");
    o >= 0 && "xmlns" !== (r = e.slice(0, o)) && (e = e.slice(o + 1));
    var a = Nt.hasOwnProperty(r)
      ? document.createElementNS(Nt[r], e)
      : document.createElement(e);
    if (t)
      for (var i in t)
        (o = (r = i).indexOf(":")),
          (n = t[i]),
          o >= 0 && "xmlns" !== (r = i.slice(0, o)) && (i = i.slice(o + 1)),
          Nt.hasOwnProperty(r)
            ? a.setAttributeNS(Nt[r], i, n)
            : a.setAttribute(i, n);
    return a;
  },
  input: function (e) {
    var t = document.createElement("input");
    return null != e && (t.type = e), t;
  },
  range: function (e, t, n) {
    1 === arguments.length && ((t = e), (e = null));
    var r = document.createElement("input");
    return (
      (r.min = e = null == e ? 0 : +e),
      (r.max = t = null == t ? 1 : +t),
      (r.step = null == n ? "any" : (n = +n)),
      (r.type = "range"),
      r
    );
  },
  select: function (e) {
    var t = document.createElement("select");
    return (
      Array.prototype.forEach.call(e, function (e) {
        var n = document.createElement("option");
        (n.value = n.textContent = e), t.appendChild(n);
      }),
      t
    );
  },
  svg: function (e, t) {
    var n = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    return (
      n.setAttribute("viewBox", [0, 0, e, t]),
      n.setAttribute("width", e),
      n.setAttribute("height", t),
      n
    );
  },
  text: function (e) {
    return document.createTextNode(e);
  },
  uid: Tt,
});
var $t = Object.freeze({
  __proto__: null,
  buffer: function (e) {
    return new Promise(function (t, n) {
      var r = new FileReader();
      (r.onload = function () {
        t(r.result);
      }),
        (r.onerror = n),
        r.readAsArrayBuffer(e);
    });
  },
  text: function (e) {
    return new Promise(function (t, n) {
      var r = new FileReader();
      (r.onload = function () {
        t(r.result);
      }),
        (r.onerror = n),
        r.readAsText(e);
    });
  },
  url: function (e) {
    return new Promise(function (t, n) {
      var r = new FileReader();
      (r.onload = function () {
        t(r.result);
      }),
        (r.onerror = n),
        r.readAsDataURL(e);
    });
  },
});
function St() {
  return this;
}
function qt(e, t) {
  let n = !1;
  if ("function" != typeof t) throw new Error("dispose is not a function");
  return {
    [Symbol.iterator]: St,
    next: () => (n ? { done: !0 } : ((n = !0), { done: !1, value: e })),
    return: () => ((n = !0), t(e), { done: !0 }),
    throw: () => ({ done: (n = !0) }),
  };
}
function Ot(e) {
  let t,
    n,
    r = !1;
  const o = e(function (e) {
    n ? (n(e), (n = null)) : (r = !0);
    return (t = e);
  });
  if (null != o && "function" != typeof o)
    throw new Error(
      "function" == typeof o.then
        ? "async initializers are not supported"
        : "initializer returned something, but not a dispose function"
    );
  return {
    [Symbol.iterator]: St,
    throw: () => ({ done: !0 }),
    return: () => (null != o && o(), { done: !0 }),
    next: function () {
      return {
        done: !1,
        value: r ? ((r = !1), Promise.resolve(t)) : new Promise((e) => (n = e)),
      };
    },
  };
}
function Lt(e) {
  switch (e.type) {
    case "range":
    case "number":
      return e.valueAsNumber;
    case "date":
      return e.valueAsDate;
    case "checkbox":
      return e.checked;
    case "file":
      return e.multiple ? e.files : e.files[0];
    case "select-multiple":
      return Array.from(e.selectedOptions, (e) => e.value);
    default:
      return e.value;
  }
}
var kt = Object.freeze({
  __proto__: null,
  disposable: qt,
  filter: function* (e, t) {
    for (var n, r = -1; !(n = e.next()).done; )
      t(n.value, ++r) && (yield n.value);
  },
  input: function (e) {
    return Ot(function (t) {
      var n = (function (e) {
          switch (e.type) {
            case "button":
            case "submit":
            case "checkbox":
              return "click";
            case "file":
              return "change";
            default:
              return "input";
          }
        })(e),
        r = Lt(e);
      function o() {
        t(Lt(e));
      }
      return (
        e.addEventListener(n, o),
        void 0 !== r && t(r),
        function () {
          e.removeEventListener(n, o);
        }
      );
    });
  },
  map: function* (e, t) {
    for (var n, r = -1; !(n = e.next()).done; ) yield t(n.value, ++r);
  },
  observe: Ot,
  queue: function (e) {
    let t;
    const n = [],
      r = e(function (e) {
        n.push(e), t && (t(n.shift()), (t = null));
        return e;
      });
    if (null != r && "function" != typeof r)
      throw new Error(
        "function" == typeof r.then
          ? "async initializers are not supported"
          : "initializer returned something, but not a dispose function"
      );
    return {
      [Symbol.iterator]: St,
      throw: () => ({ done: !0 }),
      return: () => (null != r && r(), { done: !0 }),
      next: function () {
        return {
          done: !1,
          value: n.length
            ? Promise.resolve(n.shift())
            : new Promise((e) => (t = e)),
        };
      },
    };
  },
  range: function* (e, t, n) {
    (e = +e),
      (t = +t),
      (n = (o = arguments.length) < 2 ? ((t = e), (e = 0), 1) : o < 3 ? 1 : +n);
    for (var r = -1, o = 0 | Math.max(0, Math.ceil((t - e) / n)); ++r < o; )
      yield e + r * n;
  },
  valueAt: function (e, t) {
    if (!(!isFinite((t = +t)) || t < 0 || (t != t) | 0))
      for (var n, r = -1; !(n = e.next()).done; ) if (++r === t) return n.value;
  },
  worker: function (e) {
    const t = URL.createObjectURL(new Blob([e], { type: "text/javascript" })),
      n = new Worker(t);
    return qt(n, () => {
      n.terminate(), URL.revokeObjectURL(t);
    });
  },
});
function Mt(e) {
  return e && "function" == typeof e.toArrowBuffer;
}
function It(e) {
  return (
    e &&
    "function" == typeof e.getChild &&
    "function" == typeof e.toArray &&
    e.schema &&
    Array.isArray(e.schema.fields)
  );
}
function Pt(e) {
  return {
    name: e.name,
    type: Rt(e.type),
    nullable: e.nullable,
    databaseType: String(e.type),
  };
}
function Rt(e) {
  switch (e.typeId) {
    case 2:
      return "integer";
    case 3:
    case 7:
      return "number";
    case 4:
    case 15:
      return "buffer";
    case 5:
      return "string";
    case 6:
      return "boolean";
    case 8:
    case 9:
    case 10:
      return "date";
    case 12:
    case 16:
      return "array";
    case 13:
    case 14:
      return "object";
    default:
      return "other";
  }
}
async function Ut() {
  return await import(`${lt}${De.resolve()}`);
}
let Dt;
class DuckDBClient {
  constructor(e) {
    Object.defineProperties(this, { _db: { value: e } });
  }
  async queryStream(e, t) {
    const n = await this._db.connect();
    let r, o;
    try {
      if (t?.length > 0) {
        const o = await n.prepare(e);
        r = await o.send(...t);
      } else r = await n.send(e);
      if (((o = await r.next()), o.done))
        throw new Error("missing first batch");
    } catch (e) {
      throw (await n.close(), e);
    }
    return {
      schema: ((a = o.value), a.schema.fields.map(Pt)),
      async *readRows() {
        try {
          for (; !o.done; ) yield o.value.toArray(), (o = await r.next());
        } finally {
          await n.close();
        }
      },
    };
    var a;
  }
  async query(e, t) {
    const n = await this.queryStream(e, t),
      r = [];
    for await (const e of n.readRows()) for (const t of e) r.push(t);
    return (r.schema = n.schema), r;
  }
  async queryRow(e, t) {
    const n = (await this.queryStream(e, t)).readRows();
    try {
      const { done: e, value: t } = await n.next();
      return e || !t.length ? null : t[0];
    } finally {
      await n.return();
    }
  }
  async sql(e, ...t) {
    return await this.query(e.join("?"), t);
  }
  queryTag(e, ...t) {
    return [e.join("?"), t];
  }
  escape(e) {
    return `"${e}"`;
  }
  async describeTables() {
    return (await this.query("SHOW TABLES")).map(({ name: e }) => ({
      name: e,
    }));
  }
  async describeColumns({ table: e } = {}) {
    return (await this.query(`DESCRIBE ${this.escape(e)}`)).map(
      ({ column_name: e, column_type: t, null: n }) => ({
        name: e,
        type: Wt(t),
        nullable: "NO" !== n,
        databaseType: t,
      })
    );
  }
  static async of(e = {}, t = {}) {
    const n = await (async function () {
      void 0 === Dt &&
        (Dt = (async function () {
          const e = await import(`${lt}${Ve.resolve()}`),
            t = await e.selectBundle({
              mvp: {
                mainModule: `${lt}${Ve.resolve("dist/duckdb-mvp.wasm")}`,
                mainWorker: `${lt}${Ve.resolve(
                  "dist/duckdb-browser-mvp.worker.js"
                )}`,
              },
              eh: {
                mainModule: `${lt}${Ve.resolve("dist/duckdb-eh.wasm")}`,
                mainWorker: `${lt}${Ve.resolve(
                  "dist/duckdb-browser-eh.worker.js"
                )}`,
              },
            }),
            n = new e.ConsoleLogger();
          return { module: e, bundle: t, logger: n };
        })());
      const { module: e, bundle: t, logger: n } = await Dt,
        r = await e.createWorker(t.mainWorker),
        o = new e.AsyncDuckDB(n, r);
      return await o.instantiate(t.mainModule), o;
    })();
    return (
      void 0 === t.query?.castTimestampToDate &&
        (t = { ...t, query: { ...t.query, castTimestampToDate: !0 } }),
      void 0 === t.query?.castBigIntToDouble &&
        (t = { ...t, query: { ...t.query, castBigIntToDouble: !0 } }),
      await n.open(t),
      await Promise.all(
        Object.entries(e).map(async ([e, t]) => {
          if (t instanceof FileAttachment) await Ft(n, e, t);
          else if (It(t)) await Bt(n, e, t);
          else if (Array.isArray(t)) await zt(n, e, t);
          else if (Mt(t))
            await (async function (e, t, n) {
              const r = (await Ut()).tableFromIPC(n.toArrowBuffer());
              return await Bt(e, t, r);
            })(n, e, t);
          else if ("data" in t) {
            const { data: r, ...o } = t;
            It(r) ? await Bt(n, e, r, o) : await zt(n, e, r, o);
          } else {
            if (!("file" in t)) throw new Error(`invalid source: ${t}`);
            {
              const { file: r, ...o } = t;
              await Ft(n, e, r, o);
            }
          }
        })
      ),
      new DuckDBClient(n)
    );
  }
}
async function Ft(e, t, n, r) {
  const o = await n.url();
  if (o.startsWith("blob:")) {
    const t = await n.arrayBuffer();
    await e.registerFileBuffer(n.name, new Uint8Array(t));
  } else await e.registerFileURL(n.name, o, 4);
  const a = await e.connect();
  try {
    switch (n.mimeType) {
      case "text/csv":
      case "text/tab-separated-values":
        return await a
          .insertCSVFromPath(n.name, { name: t, schema: "main", ...r })
          .catch(async (e) => {
            if (e.toString().includes("Could not convert"))
              return await (async function (e, t, n) {
                const r = await e.prepare(
                  `CREATE TABLE '${n}' AS SELECT * FROM read_csv_auto(?, ALL_VARCHAR=TRUE)`
                );
                return await r.send(t.name);
              })(a, n, t);
            throw e;
          });
      case "application/json":
        return await a.insertJSONFromPath(n.name, {
          name: t,
          schema: "main",
          ...r,
        });
      default:
        if (/\.arrow$/i.test(n.name)) {
          const e = new Uint8Array(await n.arrayBuffer());
          return await a.insertArrowFromIPCStream(e, {
            name: t,
            schema: "main",
            ...r,
          });
        }
        if (/\.parquet$/i.test(n.name))
          return await a.query(
            `CREATE VIEW '${t}' AS SELECT * FROM parquet_scan('${n.name}')`
          );
        throw new Error(`unknown file type: ${n.mimeType}`);
    }
  } finally {
    await a.close();
  }
}
async function Bt(e, t, n, r) {
  const o = await e.connect();
  try {
    await o.insertArrowTable(n, { name: t, schema: "main", ...r });
  } finally {
    await o.close();
  }
}
async function zt(e, t, n, r) {
  const o = (await Ut()).tableFromJSON(n);
  return await Bt(e, t, o, r);
}
function Wt(e) {
  switch (e) {
    case "BIGINT":
    case "HUGEINT":
    case "UBIGINT":
      return "bigint";
    case "DOUBLE":
    case "REAL":
    case "FLOAT":
      return "number";
    case "INTEGER":
    case "SMALLINT":
    case "TINYINT":
    case "USMALLINT":
    case "UINTEGER":
    case "UTINYINT":
      return "integer";
    case "BOOLEAN":
      return "boolean";
    case "DATE":
    case "TIMESTAMP":
    case "TIMESTAMP WITH TIME ZONE":
      return "date";
    case "VARCHAR":
    case "UUID":
      return "string";
    default:
      return /^DECIMAL\(/.test(e) ? "integer" : "other";
  }
}
function Ht(e, t) {
  return function (n) {
    var r,
      o,
      a,
      i,
      s,
      c,
      l,
      u,
      f = n[0],
      d = [],
      p = null,
      m = -1;
    for (s = 1, c = arguments.length; s < c; ++s) {
      if ((r = arguments[s]) instanceof Node)
        (d[++m] = r), (f += "\x3c!--o:" + m + "--\x3e");
      else if (Array.isArray(r)) {
        for (l = 0, u = r.length; l < u; ++l)
          (o = r[l]) instanceof Node
            ? (null === p &&
                ((d[++m] = p = document.createDocumentFragment()),
                (f += "\x3c!--o:" + m + "--\x3e")),
              p.appendChild(o))
            : ((p = null), (f += o));
        p = null;
      } else f += r;
      f += n[s];
    }
    if (((p = e(f)), ++m > 0)) {
      for (
        a = new Array(m),
          i = document.createTreeWalker(p, NodeFilter.SHOW_COMMENT, null, !1);
        i.nextNode();

      )
        (o = i.currentNode),
          /^o:/.test(o.nodeValue) && (a[+o.nodeValue.slice(2)] = o);
      for (s = 0; s < m; ++s) (o = a[s]) && o.parentNode.replaceChild(d[s], o);
    }
    return 1 === p.childNodes.length
      ? p.removeChild(p.firstChild)
      : 11 === p.nodeType
      ? ((o = t()).appendChild(p), o)
      : p;
  };
}
Object.defineProperty(DuckDBClient.prototype, "dialect", { value: "duckdb" });
const Vt = Ht(
  function (e) {
    var t = document.createElement("template");
    return (t.innerHTML = e.trim()), document.importNode(t.content, !0);
  },
  function () {
    return document.createElement("span");
  }
);
function Gt(e) {
  let t;
  Object.defineProperties(this, {
    generator: {
      value: Ot((e) => {
        t = e;
      }),
    },
    value: { get: () => e, set: (n) => t((e = n)) },
  }),
    void 0 !== e && t(e);
}
function* Yt() {
  for (;;) yield Date.now();
}
var Zt = new Map();
function Jt(e, t) {
  var n;
  return (n = Zt.get((e = +e)))
    ? n.then(() => t)
    : (n = Date.now()) >= e
    ? Promise.resolve(t)
    : (function (e, t) {
        var n = new Promise(function (n) {
          Zt.delete(t);
          var r = t - e;
          if (!(r > 0)) throw new Error("invalid time");
          if (r > 2147483647) throw new Error("too long to wait");
          setTimeout(n, r);
        });
        return Zt.set(t, n), n;
      })(n, e).then(() => t);
}
var Kt = Object.freeze({
  __proto__: null,
  delay: function (e, t) {
    return new Promise(function (n) {
      setTimeout(function () {
        n(t);
      }, e);
    });
  },
  tick: function (e, t) {
    return Jt(Math.ceil((Date.now() + 1) / e) * e, t);
  },
  when: Jt,
});
function Xt(e, t) {
  if (/^(\w+:)|\/\//i.test(e)) return e;
  if (/^[.]{0,2}\//i.test(e)) return new URL(e, null == t ? location : t).href;
  if (!e.length || /^[\s._]/.test(e) || /\s$/.test(e))
    throw new Error("illegal name");
  return "https://unpkg.com/" + e;
}
const Qt = Ht(
  function (e) {
    var t = document.createElementNS("http://www.w3.org/2000/svg", "g");
    return (t.innerHTML = e.trim()), t;
  },
  function () {
    return document.createElementNS("http://www.w3.org/2000/svg", "g");
  }
);
var en = String.raw;
function tn(e) {
  return new Promise(function (t, n) {
    var r = document.createElement("link");
    (r.rel = "stylesheet"),
      (r.href = e),
      (r.onerror = n),
      (r.onload = t),
      document.head.appendChild(r);
  });
}
function nn() {
  return Ot(function (e) {
    var t = e(document.body.clientWidth);
    function n() {
      var n = document.body.clientWidth;
      n !== t && e((t = n));
    }
    return (
      window.addEventListener("resize", n),
      function () {
        window.removeEventListener("resize", n);
      }
    );
  });
}
function rn(e, t) {
  return null == e || null == t
    ? NaN
    : e < t
    ? -1
    : e > t
    ? 1
    : e >= t
    ? 0
    : NaN;
}
function on(e, t = rn) {
  let n,
    r = !1;
  if (1 === t.length) {
    let o;
    for (const a of e) {
      const e = t(a);
      (r ? rn(e, o) > 0 : 0 === rn(e, e)) && ((n = a), (o = e), (r = !0));
    }
  } else
    for (const o of e) (r ? t(o, n) > 0 : 0 === t(o, o)) && ((n = o), (r = !0));
  return n;
}
function an(e) {
  return (
    (Array.isArray(e) &&
      (sn(e.schema) ||
        ((t = e.columns),
        Array.isArray(t) && t.every((e) => "string" == typeof e)) ||
        (function (e) {
          const t = Math.min(20, e.length);
          for (let n = 0; n < t; ++n) {
            const t = e[n];
            if (null === t || "object" != typeof t) return !1;
          }
          return (
            t > 0 &&
            (function (e) {
              for (const t in e) return !0;
              return !1;
            })(e[0])
          );
        })(e) ||
        un(e) ||
        fn(e))) ||
    dn(e)
  );
  var t;
}
function sn(e) {
  return Array.isArray(e) && e.every(cn);
}
function cn(e) {
  return e && "string" == typeof e.name && "string" == typeof e.type;
}
function ln(e) {
  return dn(e) || un(e) || fn(e);
}
function un(e) {
  const t = Math.min(20, e.length);
  if (!(t > 0)) return !1;
  let n,
    r = !1;
  for (let o = 0; o < t; ++o) {
    const t = e[o];
    if (null == t) continue;
    const a = typeof t;
    if (void 0 === n)
      switch (a) {
        case "number":
        case "boolean":
        case "string":
        case "bigint":
          n = a;
          break;
        default:
          return !1;
      }
    else if (a !== n) return !1;
    r = !0;
  }
  return r;
}
function fn(e) {
  const t = Math.min(20, e.length);
  if (!(t > 0)) return !1;
  let n = !1;
  for (let r = 0; r < t; ++r) {
    const t = e[r];
    if (null != t) {
      if (!(t instanceof Date)) return !1;
      n = !0;
    }
  }
  return n;
}
function dn(e) {
  return (
    e instanceof Int8Array ||
    e instanceof Int16Array ||
    e instanceof Int32Array ||
    e instanceof Uint8Array ||
    e instanceof Uint8ClampedArray ||
    e instanceof Uint16Array ||
    e instanceof Uint32Array ||
    e instanceof Float32Array ||
    e instanceof Float64Array
  );
}
const pn = Object.assign(
  async (e, t, n, r) => {
    if (
      ((e = await hn(await e, r)),
      (o = e) &&
        ("function" == typeof o.sql ||
          ("function" == typeof o.queryTag &&
            ("function" == typeof o.query ||
              "function" == typeof o.queryStream))) &&
        ("table" !== a || "function" == typeof o.describeColumns) &&
        o !== pn)
    )
      return yn(
        e,
        (function (e, t) {
          const n = "function" == typeof t.escape ? t.escape : (e) => e,
            { select: r, from: o, filter: a, sort: i, slice: s } = e;
          if (!o.table) throw new Error("missing from table");
          if (r.columns && 0 === r.columns.length)
            throw new Error("at least one column must be selected");
          const c = new Map(e.names?.map(({ column: e, name: t }) => [e, t])),
            l = [
              [
                `SELECT ${
                  r.columns
                    ? r.columns
                        .map((e) => {
                          const t = c.get(e);
                          return t ? `${n(e)} AS ${n(t)}` : n(e);
                        })
                        .join(", ")
                    : "*"
                } FROM ${vn(o.table, n)}`,
              ],
            ];
          for (let e = 0; e < a.length; ++e)
            _n(e ? "\nAND " : "\nWHERE ", l), En(a[e], l, n);
          for (let e = 0; e < i.length; ++e)
            _n(e ? ", " : "\nORDER BY ", l), gn(i[e], l, n);
          if ("mssql" === t.dialect || "oracle" === t.dialect) {
            if (null !== s.to || null !== s.from) {
              if (!i.length) {
                if (!r.columns)
                  throw new Error(
                    "at least one column must be explicitly specified. Received '*'."
                  );
                _n("\nORDER BY ", l),
                  gn({ column: r.columns[0], direction: "ASC" }, l, n);
              }
              _n(`\nOFFSET ${s.from || 0} ROWS`, l),
                _n(
                  `\nFETCH NEXT ${
                    null !== s.to ? s.to - (s.from || 0) : 1e9
                  } ROWS ONLY`,
                  l
                );
            }
          } else
            (null === s.to && null === s.from) ||
              _n("\nLIMIT " + (null !== s.to ? s.to - (s.from || 0) : 1e9), l),
              null !== s.from && _n(` OFFSET ${s.from}`, l);
          return l;
        })(t, e),
        n
      );
    var o, a;
    if (an(e))
      return (function (e, t) {
        const n = e;
        let { schema: r, columns: o } = e,
          a = !1;
        sn(r) || ((r = Bn(e, o)), (a = !0));
        const i = new Map(r.map(({ name: e, type: t }) => [e, t]));
        if (t.types) {
          for (const { name: e, type: o } of t.types) {
            i.set(e, o), r === n.schema && (r = r.slice());
            const t = r.findIndex((t) => t.name === e);
            t > -1 && (r[t] = { ...r[t], type: o });
          }
          e = e.map((e) => Dn(e, i, r));
        } else a && (e = e.map((e) => Dn(e, i, r)));
        for (const { type: n, operands: r } of t.filter) {
          const [{ value: t }] = r,
            o = r.slice(1).map(({ value: e }) => e);
          switch (n) {
            case "v": {
              const [n] = o,
                r = Pn(n);
              e = e.filter((e) => r(e[t]));
              break;
            }
            case "nv": {
              const [n] = o,
                r = Pn(n);
              e = e.filter((e) => !r(e[t]));
              break;
            }
            case "eq": {
              const [n] = o;
              if (n instanceof Date) {
                const r = +n;
                e = e.filter((e) => +e[t] === r);
              } else e = e.filter((e) => e[t] === n);
              break;
            }
            case "ne": {
              const [n] = o;
              e = e.filter((e) => e[t] !== n);
              break;
            }
            case "c": {
              const [n] = o;
              e = e.filter((e) => "string" == typeof e[t] && e[t].includes(n));
              break;
            }
            case "nc": {
              const [n] = o;
              e = e.filter((e) => "string" == typeof e[t] && !e[t].includes(n));
              break;
            }
            case "in": {
              const n = new Set(o);
              e = e.filter((e) => n.has(e[t]));
              break;
            }
            case "nin": {
              const n = new Set(o);
              e = e.filter((e) => !n.has(e[t]));
              break;
            }
            case "n":
              e = e.filter((e) => null == e[t]);
              break;
            case "nn":
              e = e.filter((e) => null != e[t]);
              break;
            case "lt": {
              const [n] = o;
              e = e.filter((e) => e[t] < n);
              break;
            }
            case "lte": {
              const [n] = o;
              e = e.filter((e) => e[t] <= n);
              break;
            }
            case "gt": {
              const [n] = o;
              e = e.filter((e) => e[t] > n);
              break;
            }
            case "gte": {
              const [n] = o;
              e = e.filter((e) => e[t] >= n);
              break;
            }
            default:
              throw new Error(`unknown filter type: ${n}`);
          }
        }
        for (const { column: r, direction: o } of (function (e) {
          if ("function" != typeof e[Symbol.iterator])
            throw new TypeError("values is not iterable");
          return Array.from(e).reverse();
        })(t.sort)) {
          const t = "desc" === o ? Tn : xn;
          e === n && (e = e.slice()), e.sort((e, n) => t(e[r], n[r]));
        }
        let { from: s, to: c } = t.slice;
        (s = null == s ? 0 : Math.max(0, s)),
          (c = null == c ? 1 / 0 : Math.max(0, c)),
          (s > 0 || c < 1 / 0) && (e = e.slice(Math.max(0, s), Math.max(0, c)));
        if (t.select.columns) {
          if (r) {
            const e = new Map(r.map((e) => [e.name, e]));
            r = t.select.columns.map((t) => e.get(t));
          }
          o && (o = t.select.columns),
            (e = e.map((e) =>
              Object.fromEntries(t.select.columns.map((t) => [t, e[t]]))
            ));
        }
        if (t.names) {
          const n = new Map(t.names.map((e) => [e.column, e]));
          r &&
            (r = r.map((e) => {
              const t = n.get(e.name);
              return { ...e, ...(t ? { name: t.name } : null) };
            })),
            o && (o = o.map((e) => n.get(e)?.name ?? e)),
            (e = e.map((e) =>
              Object.fromEntries(
                Object.keys(e).map((t) => [n.get(t)?.name ?? t, e[t]])
              )
            ));
        }
        e !== n && (r && (e.schema = r), o && (e.columns = o));
        return e;
      })(e, t);
    if (!e) throw new Error("missing data source");
    throw new Error("invalid data source");
  },
  {
    sql: (e, t, n) =>
      async function () {
        return yn(await bn(await e, n), arguments, t);
      },
  }
);
function mn(e) {
  const t = new WeakMap();
  return (n, r) => {
    if (!n) throw new Error("data source not found");
    let o = t.get(n);
    return (
      (!o || (an(n) && n.length !== o._numRows)) &&
        ((o = e(n, r)), (o._numRows = n.length), t.set(n, o)),
      o
    );
  };
}
const hn = mn(async (e, t) => {
    if (e instanceof FileAttachment) {
      switch (e.mimeType) {
        case "text/csv":
          return e.csv();
        case "text/tab-separated-values":
          return e.tsv();
        case "application/json":
          return e.json();
        case "application/x-sqlite3":
          return e.sqlite();
      }
      if (/\.(arrow|parquet)$/i.test(e.name)) return wn(e, t);
      throw new Error(`unsupported file type: ${e.mimeType}`);
    }
    return It(e) || Mt(e)
      ? wn(e, t)
      : an(e) && ln(e)
      ? Array.from(e, (e) => ({ value: e }))
      : e;
  }),
  bn = mn(async (e, t) => {
    if (e instanceof FileAttachment) {
      switch (e.mimeType) {
        case "text/csv":
        case "text/tab-separated-values":
        case "application/json":
          return wn(e, t);
        case "application/x-sqlite3":
          return e.sqlite();
      }
      if (/\.(arrow|parquet)$/i.test(e.name)) return wn(e, t);
      throw new Error(`unsupported file type: ${e.mimeType}`);
    }
    return an(e)
      ? wn(
          await (async function (e, t) {
            const n = await Ut();
            return ln(e) ? n.tableFromArrays({ [t]: e }) : n.tableFromJSON(e);
          })(e, t),
          t
        )
      : It(e) || Mt(e)
      ? wn(e, t)
      : e;
  });
function wn(
  e,
  t = e instanceof FileAttachment
    ? (function (e) {
        return e.name.replace(/@\d+(?=\.|$)/, "").replace(/\.\w+$/, "");
      })(e)
    : "__table"
) {
  return DuckDBClient.of({ [t]: e });
}
async function yn(e, t, n) {
  if (!e) throw new Error("missing data source");
  if ("function" == typeof e.queryTag) {
    const r = new AbortController(),
      o = { signal: r.signal };
    if (
      (n.then(() => r.abort("invalidated")), "function" == typeof e.queryStream)
    )
      return (async function* (e) {
        let t = performance.now();
        const n = await e,
          r = [];
        (r.done = !1), (r.error = null), (r.schema = n.schema);
        try {
          for await (const e of n.readRows()) {
            performance.now() - t > 150 &&
              r.length > 0 &&
              (yield r, (t = performance.now()));
            for (const t of e) r.push(t);
          }
          (r.done = !0), yield r;
        } catch (e) {
          (r.error = e), yield r;
        }
      })(e.queryStream(...e.queryTag.apply(e, t), o));
    if ("function" == typeof e.query)
      return e.query(...e.queryTag.apply(e, t), o);
  }
  if ("function" == typeof e.sql) return e.sql.apply(e, t);
  throw new Error("source does not implement query, queryStream, or sql");
}
function vn(e, t) {
  if ("object" == typeof e) {
    let n = "";
    return (
      null != e.database && (n += t(e.database) + "."),
      null != e.schema && (n += t(e.schema) + "."),
      (n += t(e.table)),
      n
    );
  }
  return t(e);
}
function _n(e, t) {
  const n = t[0];
  n[n.length - 1] += e;
}
function gn({ column: e, direction: t }, n, r) {
  _n(`${r(e)} ${t.toUpperCase()}`, n);
}
function En({ type: e, operands: t }, n, r) {
  if (t.length < 1) throw new Error("Invalid operand length");
  if (1 === t.length || "v" === e || "nv" === e)
    switch ((Cn(t[0], n, r), e)) {
      case "n":
      case "nv":
        return void _n(" IS NULL", n);
      case "nn":
      case "v":
        return void _n(" IS NOT NULL", n);
      default:
        throw new Error("Invalid filter operation");
    }
  if (2 !== t.length || ["in", "nin"].includes(e)) {
    var o;
    switch ((Cn(t[0], n, r), e)) {
      case "in":
        _n(" IN (", n);
        break;
      case "nin":
        _n(" NOT IN (", n);
        break;
      default:
        throw new Error("Invalid filter operation");
    }
    !(function (e, t) {
      let n = !0;
      for (const r of e)
        n ? (n = !1) : _n(",", t), t.push(r.value), t[0].push("");
    })(t.slice(1), n),
      _n(")", n);
  } else {
    if (["c", "nc"].includes(e)) {
      switch ((Cn(t[0], n, r), e)) {
        case "c":
          _n(" LIKE ", n);
          break;
        case "nc":
          _n(" NOT LIKE ", n);
      }
      return void Cn(((o = t[1]), { ...o, value: `%${o.value}%` }), n, r);
    }
    switch ((Cn(t[0], n, r), e)) {
      case "eq":
        _n(" = ", n);
        break;
      case "ne":
        _n(" <> ", n);
        break;
      case "gt":
        _n(" > ", n);
        break;
      case "lt":
        _n(" < ", n);
        break;
      case "gte":
        _n(" >= ", n);
        break;
      case "lte":
        _n(" <= ", n);
        break;
      default:
        throw new Error("Invalid filter operation");
    }
    Cn(t[1], n, r);
  }
}
function Cn(e, t, n) {
  "column" === e.type ? _n(n(e.value), t) : (t.push(e.value), t[0].push(""));
}
function Nn(e, t) {
  return (null == e || !(e >= e)) - (null == t || !(t >= t));
}
function xn(e, t) {
  return Nn(e, t) || (e < t ? -1 : e > t ? 1 : 0);
}
function Tn(e, t) {
  return Nn(e, t) || (e > t ? -1 : e < t ? 1 : 0);
}
const An = (e) => "number" == typeof e && !Number.isNaN(e),
  jn = (e) => Number.isInteger(e) && !Number.isNaN(e),
  $n = (e) => "string" == typeof e,
  Sn = (e) => "boolean" == typeof e,
  qn = (e) => "bigint" == typeof e,
  On = (e) => e instanceof Date && !isNaN(e),
  Ln = (e) => e instanceof ArrayBuffer,
  kn = (e) => Array.isArray(e),
  Mn = (e) => "object" == typeof e && null !== e,
  In = (e) => null != e;
function Pn(e) {
  switch (e) {
    case "string":
      return $n;
    case "bigint":
      return qn;
    case "boolean":
      return Sn;
    case "number":
      return An;
    case "integer":
      return jn;
    case "date":
      return On;
    case "buffer":
      return Ln;
    case "array":
      return kn;
    case "object":
      return Mn;
    default:
      return In;
  }
}
const Rn =
  /^(([-+]\d{2})?\d{4}(-\d{2}(-\d{2}))|(\d{1,2})\/(\d{1,2})\/(\d{2,4}))([T ]\d{2}:\d{2}(:\d{2}(\.\d{3})?)?(Z|[-+]\d{2}:\d{2})?)?$/;
function Un(e, t) {
  switch (t) {
    case "string":
      return "string" == typeof e || null == e ? e : String(e);
    case "boolean":
      if ("string" == typeof e) {
        const t = e.trim().toLowerCase();
        return "true" === t || ("false" !== t && null);
      }
      return "boolean" == typeof e || null == e ? e : Boolean(e);
    case "bigint":
      return "bigint" == typeof e || null == e
        ? e
        : Number.isInteger("string" != typeof e || e.trim() ? +e : NaN)
        ? BigInt(e)
        : void 0;
    case "integer":
    case "number":
      return "number" == typeof e
        ? e
        : null == e || ("string" == typeof e && !e.trim())
        ? NaN
        : Number(e);
    case "date": {
      if (e instanceof Date || null == e) return e;
      if ("number" == typeof e) return new Date(e);
      const t = String(e).trim();
      return "string" != typeof e || t ? new Date(Rn.test(t) ? t : NaN) : null;
    }
    case "array":
    case "object":
    case "buffer":
    case "other":
      return e;
    default:
      throw new Error(`Unable to coerce to type: ${t}`);
  }
}
function Dn(e, t, n) {
  const r = {};
  for (const o of n) {
    const n = t.get(o.name),
      a = e[o.name];
    r[o.name] = "raw" === n ? a : Un(a, n);
  }
  return r;
}
const Fn = [
  "boolean",
  "integer",
  "number",
  "date",
  "bigint",
  "array",
  "object",
  "buffer",
];
function Bn(
  e,
  t = (function (e) {
    const t = new Set();
    for (const n of e)
      if (n)
        for (const e in n)
          Object.prototype.hasOwnProperty.call(n, e) && t.add(e);
    return Array.from(t);
  })(e)
) {
  const n = [],
    r = e.slice(0, 100);
  for (const e of t) {
    const t = {
      boolean: 0,
      integer: 0,
      number: 0,
      date: 0,
      string: 0,
      array: 0,
      object: 0,
      bigint: 0,
      buffer: 0,
      defined: 0,
    };
    for (const n of r) {
      let r = n[e];
      if (null == r) continue;
      const o = typeof r;
      if ("string" !== o)
        ++t.defined,
          Array.isArray(r)
            ? ++t.array
            : r instanceof Date
            ? ++t.date
            : r instanceof ArrayBuffer
            ? ++t.buffer
            : "number" === o
            ? (++t.number, Number.isInteger(r) && ++t.integer)
            : o in t && ++t[o];
      else {
        if (((r = r.trim()), !r)) continue;
        ++t.defined,
          ++t.string,
          /^(true|false)$/i.test(r)
            ? ++t.boolean
            : r && !isNaN(r)
            ? (++t.number, Number.isInteger(+r) && ++t.integer)
            : Rn.test(r) && ++t.date;
      }
    }
    const o = Math.max(1, 0.9 * t.defined),
      a =
        on(Fn, (e) => (t[e] >= o ? t[e] : NaN)) ??
        (t.string >= o ? "string" : "other");
    n.push({ name: e, type: a, inferred: a });
  }
  return n;
}
const Library = Object.assign(
  Object.defineProperties(
    function (e) {
      const t = (function (e) {
        return null == e ? ut : ot(e);
      })(e);
      var n;
      Object.defineProperties(
        this,
        ((n = {
          FileAttachment: () => Ct,
          Mutable: () => Gt,
          now: Yt,
          width: nn,
          dot: () => t(Ae.resolve()),
          htl: () => t(qe.resolve()),
          html: () => Vt,
          md: () =>
            (function (e) {
              return e(Le.resolve()).then(function (t) {
                return Ht(
                  function (n) {
                    var r = document.createElement("div");
                    r.innerHTML = t(n, { langPrefix: "" }).trim();
                    var o = r.querySelectorAll("pre code[class]");
                    return (
                      o.length > 0 &&
                        e(je.resolve()).then(function (t) {
                          o.forEach(function (n) {
                            function r() {
                              t.highlightBlock(n),
                                n.parentNode.classList.add(
                                  "observablehq--md-pre"
                                );
                            }
                            t.getLanguage(n.className)
                              ? r()
                              : e(je.resolve("async-languages/index.js"))
                                  .then((r) => {
                                    if (r.has(n.className))
                                      return e(
                                        je.resolve(
                                          "async-languages/" +
                                            r.get(n.className)
                                        )
                                      ).then((e) => {
                                        t.registerLanguage(n.className, e);
                                      });
                                  })
                                  .then(r, r);
                          });
                        }),
                      r
                    );
                  },
                  function () {
                    return document.createElement("div");
                  }
                );
              });
            })(t),
          svg: () => Qt,
          tex: () =>
            (function (e) {
              return Promise.all([
                e($e.resolve()),
                e.resolve($e.resolve("dist/katex.min.css")).then(tn),
              ]).then(function (e) {
                var t = e[0],
                  n = r();
                function r(e) {
                  return function () {
                    var n = document.createElement("div");
                    return (
                      t.render(en.apply(String, arguments), n, e),
                      n.removeChild(n.firstChild)
                    );
                  };
                }
                return (n.options = r), (n.block = r({ displayMode: !0 })), n;
              });
            })(t),
          _: () => t(Se.resolve()),
          aq: () => t.alias({ "apache-arrow": Re.resolve() })(Fe.resolve()),
          Arrow: () => t(Re.resolve()),
          d3: () => t(Ne.resolve()),
          DuckDBClient: () => DuckDBClient,
          Inputs: () =>
            t(xe.resolve()).then((e) => ({ ...e, file: e.fileOf(Et) })),
          L: () =>
            (async function (e) {
              const t = await e(He.resolve());
              if (!t._style) {
                const n = document.createElement("link");
                (n.rel = "stylesheet"),
                  (n.href = await e.resolve(He.resolve("dist/leaflet.css"))),
                  (t._style = document.head.appendChild(n));
              }
              return t;
            })(t),
          mermaid: () =>
            (async function (e) {
              const t = await e(We.resolve());
              return (
                t.initialize({ securityLevel: "loose", theme: "neutral" }),
                function () {
                  const e = document.createElement("div");
                  return (
                    (e.innerHTML = t.render(
                      Tt().id,
                      String.raw.apply(String, arguments)
                    )),
                    e.removeChild(e.firstChild)
                  );
                }
              );
            })(t),
          Plot: () => t(Te.resolve()),
          __query: () => pn,
          require: () => t,
          resolve: () => Xt,
          SQLite: () => ft(t),
          SQLiteDatabaseClient: () => SQLiteDatabaseClient,
          topojson: () => t(Be.resolve()),
          vl: () =>
            (async function (e) {
              const [t, n, r] = await Promise.all(
                [Me, Ie, Pe].map((t) => e(t.resolve()))
              );
              return r.register(t, n);
            })(t),
          aapl: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/3ccff97fd2d93da734e76829b2b066eafdaac6a1fafdec0faf6ebc443271cfc109d29e80dd217468fcb2aff1e6bffdc73f356cc48feb657f35378e6abbbb63b9"
            ).csv({ typed: !0 }),
          alphabet: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/75d52e6c3130b1cae83cda89305e17b50f33e7420ef205587a135e8562bcfd22e483cf4fa2fb5df6dff66f9c5d19740be1cfaf47406286e2eb6574b49ffc685d"
            ).csv({ typed: !0 }),
          cars: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/048ec3dfd528110c0665dfa363dd28bc516ffb7247231f3ab25005036717f5c4c232a5efc7bb74bc03037155cb72b1abe85a33d86eb9f1a336196030443be4f6"
            ).csv({ typed: !0 }),
          citywages: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/39837ec5121fcc163131dbc2fe8c1a2e0b3423a5d1e96b5ce371e2ac2e20a290d78b71a4fb08b9fa6a0107776e17fb78af313b8ea70f4cc6648fad68ddf06f7a"
            ).csv({ typed: !0 }),
          diamonds: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/87942b1f5d061a21fa4bb8f2162db44e3ef0f7391301f867ab5ba718b225a63091af20675f0bfe7f922db097b217b377135203a7eab34651e21a8d09f4e37252"
            ).csv({ typed: !0 }),
          flare: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/a6b0d94a7f5828fd133765a934f4c9746d2010e2f342d335923991f31b14120de96b5cb4f160d509d8dc627f0107d7f5b5070d2516f01e4c862b5b4867533000"
            ).csv({ typed: !0 }),
          industries: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/76f13741128340cc88798c0a0b7fa5a2df8370f57554000774ab8ee9ae785ffa2903010cad670d4939af3e9c17e5e18e7e05ed2b38b848ac2fc1a0066aa0005f"
            ).csv({ typed: !0 }),
          miserables: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/31d904f6e21d42d4963ece9c8cc4fbd75efcbdc404bf511bc79906f0a1be68b5a01e935f65123670ed04e35ca8cae3c2b943f82bf8db49c5a67c85cbb58db052"
            ).json(),
          olympians: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/31ca24545a0603dce099d10ee89ee5ae72d29fa55e8fc7c9ffb5ded87ac83060d80f1d9e21f4ae8eb04c1e8940b7287d179fe8060d887fb1f055f430e210007c"
            ).csv({ typed: !0 }),
          penguins: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/715db1223e067f00500780077febc6cebbdd90c151d3d78317c802732252052ab0e367039872ab9c77d6ef99e5f55a0724b35ddc898a1c99cb14c31a379af80a"
            ).csv({ typed: !0 }),
          weather: () =>
            new FileAttachment(
              "https://static.observableusercontent.com/files/693a46b22b33db0f042728700e0c73e836fa13d55446df89120682d55339c6db7cc9e574d3d73f24ecc9bc7eb9ac9a1e7e104a1ee52c00aab1e77eb102913c1f"
            ).csv({ typed: !0 }),
          DOM: jt,
          Files: $t,
          Generators: kt,
          Promises: Kt,
        }),
        Object.fromEntries(Object.entries(n).map(zn)))
      );
    },
    {
      resolve: { get: () => ut.resolve, enumerable: !0, configurable: !0 },
      require: {
        get: () => ut,
        set: function (e) {
          ut = e;
        },
        enumerable: !0,
        configurable: !0,
      },
    }
  ),
  { resolveFrom: nt, requireFrom: ot }
);
function zn([e, t]) {
  return [e, { value: t, writable: !0, enumerable: !0 }];
}
class RuntimeError extends Error {
  constructor(e, t) {
    super(e), (this.input = t);
  }
}
function Wn(e) {
  return () => e;
}
function Hn(e) {
  return e;
}
RuntimeError.prototype.name = "RuntimeError";
const Vn = Array.prototype.map;
function Gn() {}
const Yn = Symbol("no-observer");
function Variable(e, t, n) {
  var r;
  n || (n = Yn),
    Object.defineProperties(this, {
      _observer: { value: n, writable: !0 },
      _definition: { value: Kn, writable: !0 },
      _duplicate: { value: void 0, writable: !0 },
      _duplicates: { value: void 0, writable: !0 },
      _indegree: { value: NaN, writable: !0 },
      _inputs: { value: [], writable: !0 },
      _invalidate: { value: Gn, writable: !0 },
      _module: { value: t },
      _name: { value: null, writable: !0 },
      _outputs: { value: new Set(), writable: !0 },
      _promise: { value: Promise.resolve(void 0), writable: !0 },
      _reachable: { value: n !== Yn, writable: !0 },
      _rejector: {
        value:
          ((r = this),
          (e) => {
            if (e === Xn) throw e;
            if (e === Kn)
              throw new RuntimeError(`${r._name} is not defined`, r._name);
            if (e instanceof Error && e.message)
              throw new RuntimeError(e.message, r._name);
            throw new RuntimeError(`${r._name} could not be resolved`, r._name);
          }),
      },
      _type: { value: e },
      _value: { value: void 0, writable: !0 },
      _version: { value: 0, writable: !0 },
    });
}
function Zn(e) {
  e._module._runtime._dirty.add(e), e._outputs.add(this);
}
function Jn(e) {
  e._module._runtime._dirty.add(e), e._outputs.delete(this);
}
function Kn() {
  throw Kn;
}
function Xn() {
  throw Xn;
}
function Qn(e) {
  return () => {
    throw new RuntimeError(`${e} is defined more than once`);
  };
}
function er(e, t, n) {
  const r = this._module._scope,
    o = this._module._runtime;
  if (
    (this._inputs.forEach(Jn, this),
    t.forEach(Zn, this),
    (this._inputs = t),
    (this._definition = n),
    (this._value = void 0),
    n === Gn ? o._variables.delete(this) : o._variables.add(this),
    e !== this._name || r.get(e) !== this)
  ) {
    let t, a;
    if (this._name)
      if (this._outputs.size)
        r.delete(this._name),
          (a = this._module._resolve(this._name)),
          (a._outputs = this._outputs),
          (this._outputs = new Set()),
          a._outputs.forEach(function (e) {
            e._inputs[e._inputs.indexOf(this)] = a;
          }, this),
          a._outputs.forEach(o._updates.add, o._updates),
          o._dirty.add(a).add(this),
          r.set(this._name, a);
      else if ((a = r.get(this._name)) === this) r.delete(this._name);
      else {
        if (3 !== a._type) throw new Error();
        a._duplicates.delete(this),
          (this._duplicate = void 0),
          1 === a._duplicates.size &&
            ((a = a._duplicates.keys().next().value),
            (t = r.get(this._name)),
            (a._outputs = t._outputs),
            (t._outputs = new Set()),
            a._outputs.forEach(function (e) {
              e._inputs[e._inputs.indexOf(t)] = a;
            }),
            (a._definition = a._duplicate),
            (a._duplicate = void 0),
            o._dirty.add(t).add(a),
            o._updates.add(a),
            r.set(this._name, a));
      }
    if (this._outputs.size) throw new Error();
    e &&
      ((a = r.get(e))
        ? 3 === a._type
          ? ((this._definition = Qn(e)),
            (this._duplicate = n),
            a._duplicates.add(this))
          : 2 === a._type
          ? ((this._outputs = a._outputs),
            (a._outputs = new Set()),
            this._outputs.forEach(function (e) {
              e._inputs[e._inputs.indexOf(a)] = this;
            }, this),
            o._dirty.add(a).add(this),
            r.set(e, this))
          : ((a._duplicate = a._definition),
            (this._duplicate = n),
            (t = new Variable(3, this._module)),
            (t._name = e),
            (t._definition = this._definition = a._definition = Qn(e)),
            (t._outputs = a._outputs),
            (a._outputs = new Set()),
            t._outputs.forEach(function (e) {
              e._inputs[e._inputs.indexOf(a)] = t;
            }),
            (t._duplicates = new Set([this, a])),
            o._dirty.add(a).add(t),
            o._updates.add(a).add(t),
            r.set(e, t))
        : r.set(e, this)),
      (this._name = e);
  }
  return (
    this._version > 0 && ++this._version,
    o._updates.add(this),
    o._compute(),
    this
  );
}
Object.defineProperties(Variable.prototype, {
  _pending: {
    value: function () {
      this._observer.pending && this._observer.pending();
    },
    writable: !0,
    configurable: !0,
  },
  _fulfilled: {
    value: function (e) {
      this._observer.fulfilled && this._observer.fulfilled(e, this._name);
    },
    writable: !0,
    configurable: !0,
  },
  _rejected: {
    value: function (e) {
      this._observer.rejected && this._observer.rejected(e, this._name);
    },
    writable: !0,
    configurable: !0,
  },
  define: {
    value: function (e, t, n) {
      switch (arguments.length) {
        case 1:
          (n = e), (e = t = null);
          break;
        case 2:
          (n = t), "string" == typeof e ? (t = null) : ((t = e), (e = null));
      }
      return er.call(
        this,
        null == e ? null : String(e),
        null == t ? [] : Vn.call(t, this._module._resolve, this._module),
        "function" == typeof n ? n : Wn(n)
      );
    },
    writable: !0,
    configurable: !0,
  },
  delete: {
    value: function () {
      return er.call(this, null, [], Gn);
    },
    writable: !0,
    configurable: !0,
  },
  import: {
    value: function (e, t, n) {
      arguments.length < 3 && ((n = t), (t = e));
      return er.call(this, String(t), [n._resolve(String(e))], Hn);
    },
    writable: !0,
    configurable: !0,
  },
});
const tr = Symbol("variable"),
  nr = Symbol("invalidation"),
  rr = Symbol("visibility");
function Module(e, t = []) {
  Object.defineProperties(this, {
    _runtime: { value: e },
    _scope: { value: new Map() },
    _builtins: {
      value: new Map([
        ["@variable", tr],
        ["invalidation", nr],
        ["visibility", rr],
        ...t,
      ]),
    },
    _source: { value: null, writable: !0 },
  });
}
async function or(e, t) {
  await e._compute();
  try {
    return await t._promise;
  } catch (n) {
    if (n === Xn) return or(e, t);
    throw n;
  }
}
function ar(e) {
  return e._name;
}
Object.defineProperties(Module.prototype, {
  _resolve: {
    value: function (e) {
      let t,
        n = this._scope.get(e);
      if (!n)
        if (((n = new Variable(2, this)), this._builtins.has(e)))
          n.define(e, Wn(this._builtins.get(e)));
        else if (this._runtime._builtin._scope.has(e))
          n.import(e, this._runtime._builtin);
        else {
          try {
            t = this._runtime._global(e);
          } catch (t) {
            return n.define(
              e,
              (function (e) {
                return () => {
                  throw e;
                };
              })(t)
            );
          }
          void 0 === t ? this._scope.set((n._name = e), n) : n.define(e, Wn(t));
        }
      return n;
    },
    writable: !0,
    configurable: !0,
  },
  redefine: {
    value: function (e) {
      const t = this._scope.get(e);
      if (!t) throw new RuntimeError(`${e} is not defined`);
      if (3 === t._type)
        throw new RuntimeError(`${e} is defined more than once`);
      return t.define.apply(t, arguments);
    },
    writable: !0,
    configurable: !0,
  },
  define: {
    value: function () {
      const e = new Variable(1, this);
      return e.define.apply(e, arguments);
    },
    writable: !0,
    configurable: !0,
  },
  derive: {
    value: function (e, t) {
      const n = new Map(),
        r = new Set(),
        o = [];
      function a(e) {
        let t = n.get(e);
        return (
          t ||
          ((t = new Module(e._runtime, e._builtins)),
          (t._source = e),
          n.set(e, t),
          o.push([t, e]),
          r.add(e),
          t)
        );
      }
      const i = a(this);
      for (const n of e) {
        const { alias: e, name: r } = "object" == typeof n ? n : { name: n };
        i.import(r, null == e ? r : e, t);
      }
      for (const e of r)
        for (const [t, n] of e._scope)
          if (n._definition === Hn) {
            if (e === this && i._scope.has(t)) continue;
            const r = n._inputs[0]._module;
            r._source && a(r);
          }
      for (const [e, t] of o)
        for (const [r, o] of t._scope) {
          const t = e._scope.get(r);
          if (!t || 2 === t._type)
            if (o._definition === Hn) {
              const t = o._inputs[0],
                a = t._module;
              e.import(t._name, r, n.get(a) || a);
            } else e.define(r, o._inputs.map(ar), o._definition);
        }
      return i;
    },
    writable: !0,
    configurable: !0,
  },
  import: {
    value: function () {
      const e = new Variable(1, this);
      return e.import.apply(e, arguments);
    },
    writable: !0,
    configurable: !0,
  },
  value: {
    value: async function (e) {
      let t = this._scope.get(e);
      if (!t) throw new RuntimeError(`${e} is not defined`);
      if (t._observer !== Yn) return or(this._runtime, t);
      t = this.variable(!0).define([e], Hn);
      try {
        return await or(this._runtime, t);
      } finally {
        t.delete();
      }
    },
    writable: !0,
    configurable: !0,
  },
  variable: {
    value: function (e) {
      return new Variable(1, this, e);
    },
    writable: !0,
    configurable: !0,
  },
  builtin: {
    value: function (e, t) {
      this._builtins.set(e, t);
    },
    writable: !0,
    configurable: !0,
  },
});
const ir =
  "function" == typeof requestAnimationFrame
    ? requestAnimationFrame
    : "function" == typeof setImmediate
    ? setImmediate
    : (e) => setTimeout(e, 0);
function Runtime(e = new Library(), t = hr) {
  const n = this.module();
  if (
    (Object.defineProperties(this, {
      _dirty: { value: new Set() },
      _updates: { value: new Set() },
      _precomputes: { value: [], writable: !0 },
      _computing: { value: null, writable: !0 },
      _init: { value: null, writable: !0 },
      _modules: { value: new Map() },
      _variables: { value: new Set() },
      _disposed: { value: !1, writable: !0 },
      _builtin: { value: n },
      _global: { value: t },
    }),
    e)
  )
    for (const t in e) new Variable(2, n).define(t, [], e[t]);
}
function sr(e) {
  const t = new Set(e._inputs);
  for (const n of t) {
    if (n === e) return !0;
    n._inputs.forEach(t.add, t);
  }
  return !1;
}
function cr(e) {
  ++e._indegree;
}
function lr(e) {
  --e._indegree;
}
function ur(e) {
  return e._promise.catch(e._rejector);
}
function fr(e) {
  return new Promise(function (t) {
    e._invalidate = t;
  });
}
function dr(e, t) {
  let n,
    r,
    o =
      "function" == typeof IntersectionObserver &&
      t._observer &&
      t._observer._node,
    a = !o,
    i = Gn,
    s = Gn;
  return (
    o &&
      ((r = new IntersectionObserver(
        ([e]) => (a = e.isIntersecting) && ((n = null), i())
      )),
      r.observe(o),
      e.then(() => (r.disconnect(), (r = null), s()))),
    function (e) {
      return a
        ? Promise.resolve(e)
        : r
        ? (n || (n = new Promise((e, t) => ((i = e), (s = t)))),
          n.then(() => e))
        : Promise.reject();
    }
  );
}
function pr(e) {
  e._invalidate(), (e._invalidate = Gn), e._pending();
  const t = e._value,
    n = ++e._version;
  let r = null;
  const o = (e._promise = (
    e._inputs.length
      ? Promise.all(e._inputs.map(ur)).then(function (o) {
          if (e._version !== n) throw Xn;
          for (let t = 0, n = o.length; t < n; ++t)
            switch (o[t]) {
              case nr:
                o[t] = r = fr(e);
                break;
              case rr:
                r || (r = fr(e)), (o[t] = dr(r, e));
                break;
              case tr:
                o[t] = e;
            }
          return e._definition.apply(t, o);
        })
      : new Promise((n) => n(e._definition.call(t)))
  ).then(function (t) {
    if (e._version !== n) throw Xn;
    if (
      (function (e) {
        return (
          e && "function" == typeof e.next && "function" == typeof e.return
        );
      })(t)
    )
      return (
        (r || fr(e)).then(
          ((o = t),
          function () {
            o.return();
          })
        ),
        (function (e, t, n) {
          const r = e._module._runtime;
          let o;
          function a(e) {
            return new Promise((e) => e(n.next(o))).then(
              ({ done: t, value: n }) =>
                t ? void 0 : Promise.resolve(n).then(e)
            );
          }
          function i() {
            const n = a((a) => {
              if (e._version !== t) throw Xn;
              return (
                (o = a),
                s(a, n).then(() => r._precompute(i)),
                e._fulfilled(a),
                a
              );
            });
            n.catch((r) => {
              r !== Xn && e._version === t && (s(void 0, n), e._rejected(r));
            });
          }
          function s(t, n) {
            return (
              (e._value = t),
              (e._promise = n),
              e._outputs.forEach(r._updates.add, r._updates),
              r._compute()
            );
          }
          return a((n) => {
            if (e._version !== t) throw Xn;
            return (o = n), r._precompute(i), n;
          });
        })(e, n, t)
      );
    var o;
    return t;
  }));
  o.then(
    (t) => {
      (e._value = t), e._fulfilled(t);
    },
    (t) => {
      t !== Xn && ((e._value = void 0), e._rejected(t));
    }
  );
}
function mr(e, t) {
  e._invalidate(),
    (e._invalidate = Gn),
    e._pending(),
    ++e._version,
    (e._indegree = NaN),
    (e._promise = Promise.reject(t)).catch(Gn),
    (e._value = void 0),
    e._rejected(t);
}
function hr(e) {
  return globalThis[e];
}
Object.defineProperties(Runtime.prototype, {
  _precompute: {
    value: function (e) {
      this._precomputes.push(e), this._compute();
    },
    writable: !0,
    configurable: !0,
  },
  _compute: {
    value: function () {
      return this._computing || (this._computing = this._computeSoon());
    },
    writable: !0,
    configurable: !0,
  },
  _computeSoon: {
    value: function () {
      return new Promise(ir).then(() =>
        this._disposed ? void 0 : this._computeNow()
      );
    },
    writable: !0,
    configurable: !0,
  },
  _computeNow: {
    value: async function () {
      let e,
        t,
        n = [],
        r = this._precomputes;
      if (r.length) {
        this._precomputes = [];
        for (const e of r) e();
        await (function (e = 0) {
          let t = Promise.resolve();
          for (let n = 0; n < e; ++n) t = t.then(() => {});
          return t;
        })(3);
      }
      (e = new Set(this._dirty)),
        e.forEach(function (t) {
          t._inputs.forEach(e.add, e);
          const n = (function (e) {
            if (e._observer !== Yn) return !0;
            const t = new Set(e._outputs);
            for (const e of t) {
              if (e._observer !== Yn) return !0;
              e._outputs.forEach(t.add, t);
            }
            return !1;
          })(t);
          n > t._reachable
            ? this._updates.add(t)
            : n < t._reachable && t._invalidate(),
            (t._reachable = n);
        }, this),
        (e = new Set(this._updates)),
        e.forEach(function (t) {
          t._reachable
            ? ((t._indegree = 0), t._outputs.forEach(e.add, e))
            : ((t._indegree = NaN), e.delete(t));
        }),
        (this._computing = null),
        this._updates.clear(),
        this._dirty.clear(),
        e.forEach(function (e) {
          e._outputs.forEach(cr);
        });
      do {
        for (
          e.forEach(function (e) {
            0 === e._indegree && n.push(e);
          });
          (t = n.pop());

        )
          pr(t), t._outputs.forEach(o), e.delete(t);
        e.forEach(function (t) {
          sr(t) &&
            (mr(t, new RuntimeError("circular definition")),
            t._outputs.forEach(lr),
            e.delete(t));
        });
      } while (e.size);
      function o(e) {
        0 == --e._indegree && n.push(e);
      }
    },
    writable: !0,
    configurable: !0,
  },
  dispose: {
    value: function () {
      (this._computing = Promise.resolve()),
        (this._disposed = !0),
        this._variables.forEach((e) => {
          e._invalidate(), (e._version = NaN);
        });
    },
    writable: !0,
    configurable: !0,
  },
  module: {
    value: function (e, t = Gn) {
      let n;
      if (void 0 === e)
        return (n = this._init) ? ((this._init = null), n) : new Module(this);
      if (((n = this._modules.get(e)), n)) return n;
      (this._init = n = new Module(this)), this._modules.set(e, n);
      try {
        e(this, t);
      } finally {
        this._init = null;
      }
      return n;
    },
    writable: !0,
    configurable: !0,
  },
  fileAttachments: {
    value: function (e) {
      return Object.assign(
        (t) => {
          const n = e((t += ""));
          if (null == n) throw new Error(`File not found: ${t}`);
          if ("object" == typeof n && "url" in n) {
            const { url: e, mimeType: r } = n;
            return new FileAttachment(e, t, r);
          }
          return new FileAttachment(n, t);
        },
        { prototype: FileAttachment.prototype }
      );
    },
    writable: !0,
    configurable: !0,
  },
});
export { Inspector, Library, Runtime, RuntimeError };
