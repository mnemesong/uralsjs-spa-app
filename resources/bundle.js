require=(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.spaApp = void 0;
var uralsjs_app_abstractions_1 = require("uralsjs-app-abstractions");
var uralsjs_map_record_1 = require("uralsjs-map-record");
var browserRendererAndGetSelectors = function (getElements, getRootSelector, elWidget, renderId, deps) {
    var renderEl = function (el) {
        return elWidget(el.model, renderId(el.id), deps);
    };
    var grouped = (0, uralsjs_app_abstractions_1.regroup)(getElements(), getRootSelector);
    var groupedWidgets = Object.keys(grouped)
        .map(function (k) { return ({ sel: k, arr: grouped[k].map(function (el) { return renderEl(el); }) }); });
    groupedWidgets.forEach(function (el) {
        var selectedHtml = document.querySelector(el.sel).innerHTML =
            el.arr.join("");
    });
    return grouped;
};
var spaApp = function (modelSets, afterRender, deps) {
    var state = (0, uralsjs_map_record_1.mapRecordVals)(modelSets, function (el) { return el.stor; });
    Object.keys(state).forEach(function (i) { return state[i].setReactiveFunc(function (recs) {
        var grouped = browserRendererAndGetSelectors(function () { return recs; }, modelSets[i].rootSelector, modelSets[i].widget, function (id) { return modelSets[i].idTool.renderId(id); }, deps);
        Object.keys(grouped).forEach(function (s) {
            Array.from(document
                .querySelector(s)
                .childNodes)
                .filter(function (cn) { return cn.nodeType === 1; })
                .forEach(function (cn) {
                try {
                    var id = modelSets[i].idTool.parseId(cn.id);
                    afterRender[i](cn, state, id, deps);
                }
                catch (e) {
                    console.log(e);
                    console.log(cn);
                }
            });
        });
    }); });
    Object.keys(state).forEach(function (i) { return state[i].reinit(modelSets[i].initData(deps)); });
};
exports.spaApp = spaApp;

},{"uralsjs-app-abstractions":6,"uralsjs-map-record":8}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elWidgetFactory = void 0;
var elWidgetFactory = function (wClass) { return ({
    widget: function (m, id, d) { return "\n<li id=\"".concat(id, "\" style=\"font-weight: ").concat(m.isActive ? "bold" : "normal", ";\">\n    ").concat(m.header, "<ol></ol>\n</li>"); },
    css: "\nli: {font-weight: 700;}"
}); };
exports.elWidgetFactory = elWidgetFactory;

},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formElWidget = void 0;
var formElWidget = function (m, id, d) { return "\n<div id=\"".concat(id, "\" data-hello=\"").concat(d.getHello(), "\"><h4>Form</h4><input type='text' value='").concat(m.header, "'></div>"); };
exports.formElWidget = formElWidget;

},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resWidgetFactory = void 0;
var resWidgetFactory = function (wClass) { return ({
    widget: function (m, id, d) { return "\n<li id=\"".concat(id, "\" class='").concat(wClass, "-li'>").concat(m.name, "</li>"); },
    css: "\n.".concat(wClass, "-li {font-color: #777;}"),
}); };
exports.resWidgetFactory = resWidgetFactory;

},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formElModelSet = exports.resModelSet = exports.elModelSet = void 0;
var el_widget_1 = require("./el-widget");
var uralsjs_reactive_storage_1 = require("uralsjs-reactive-storage");
var res_widget_1 = require("./res-widget");
var uralsjs_id_html_tools_1 = require("uralsjs-id-html-tools");
var form_el_widget_1 = require("./form-el-widget");
exports.elModelSet = {
    widget: (0, el_widget_1.elWidgetFactory)("els").widget,
    idTool: new uralsjs_id_html_tools_1.NumPrefixIdTool("el_"),
    rootSelector: function (el) { return 'ol'; },
    initData: function () { return [
        { header: "el1", isActive: true },
        { header: "el2", isActive: false }
    ]; },
    stor: new uralsjs_reactive_storage_1.IncrNumReactiveStorage(),
};
exports.resModelSet = {
    widget: (0, res_widget_1.resWidgetFactory)("res").widget,
    idTool: new uralsjs_id_html_tools_1.NumPrefixIdTool("res_"),
    rootSelector: function (el) { return '#el_' + el.model.elId + " > ol"; },
    initData: function () { return [
        { name: "Петров", elId: 0 },
        { name: "Сидоров", elId: 0 },
        { name: "Макарченко", elId: 1 },
    ]; },
    stor: new uralsjs_reactive_storage_1.IncrNumReactiveStorage(),
};
exports.formElModelSet = {
    widget: form_el_widget_1.formElWidget,
    idTool: new uralsjs_id_html_tools_1.NullDefaultIdTool('elForm'),
    rootSelector: function (el) { return '#formContainer'; },
    initData: function () { return [
        { header: "" }
    ]; },
    stor: new uralsjs_reactive_storage_1.SoloDefReactiveStorage({ header: '' }),
};

},{"./el-widget":2,"./form-el-widget":3,"./res-widget":4,"uralsjs-id-html-tools":7,"uralsjs-reactive-storage":10}],6:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.regroup = void 0;
function regroup(arr, defSelector) {
    var result = [];
    return arr.map(function (el) { return ({ ds: defSelector(el), m: el }); })
        .reduce(function (prev, cur) {
        var pres = __assign({}, prev);
        if (Object.keys(prev).filter(function (k) { return k === cur.ds; }).length > 0) {
            pres[cur.ds].push(cur.m);
        }
        else {
            pres[cur.ds] = [cur.m];
        }
        return pres;
    }, {});
}
exports.regroup = regroup;

},{}],7:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NullDefaultIdTool = exports.StringPrefixIdTool = exports.NumPrefixIdTool = void 0;
var NumPrefixIdTool = /** @class */ (function () {
    function NumPrefixIdTool(prefix) {
        this.prefix = prefix;
        this.prefixLength = prefix.length;
    }
    NumPrefixIdTool.prototype.renderId = function (id) {
        return this.prefix + id;
    };
    NumPrefixIdTool.prototype.parseId = function (htmlId) {
        return parseInt(htmlId.substring(this.prefixLength));
    };
    return NumPrefixIdTool;
}());
exports.NumPrefixIdTool = NumPrefixIdTool;
var StringPrefixIdTool = /** @class */ (function () {
    function StringPrefixIdTool(prefix) {
        this.prefix = prefix;
        this.prefixLength = prefix.length;
    }
    StringPrefixIdTool.prototype.renderId = function (id) {
        return this.prefix + id;
    };
    StringPrefixIdTool.prototype.parseId = function (htmlId) {
        return htmlId.substring(this.prefixLength);
    };
    return StringPrefixIdTool;
}());
exports.StringPrefixIdTool = StringPrefixIdTool;
var NullDefaultIdTool = /** @class */ (function () {
    function NullDefaultIdTool(def) {
        this.def = def;
    }
    NullDefaultIdTool.prototype.renderId = function (id) {
        return this.def;
    };
    NullDefaultIdTool.prototype.parseId = function (htmlId) {
        return null;
    };
    return NullDefaultIdTool;
}());
exports.NullDefaultIdTool = NullDefaultIdTool;

},{}],8:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapRecordKeys = exports.mapRecordVals = void 0;
function mapRecordVals(r, mapFunc) {
    var result = {};
    Object.keys(r)
        .forEach(function (k) { return result[k] = mapFunc(r[k]); });
    return result;
}
exports.mapRecordVals = mapRecordVals;
function mapRecordKeys(r, mapFunc) {
    var result = {};
    Object.keys(r)
        .forEach(function (k) { return result[mapFunc(k)] = r[k]; });
    return result;
}
exports.mapRecordKeys = mapRecordKeys;

},{}],9:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrNumReactiveStorage = void 0;
var IncrNumReactiveStorage = /** @class */ (function () {
    function IncrNumReactiveStorage() {
        this.setId = function (ids) { return (ids.length > 0 ? Math.max.apply(Math, ids) + 1 : 0); };
        this.reactiveFunc = function (recs) { };
        this.records = [];
    }
    IncrNumReactiveStorage.prototype.readAll = function () {
        return this.records;
    };
    IncrNumReactiveStorage.prototype.reinit = function (data) {
        var _this = this;
        this.records = [];
        data.forEach(function (m) { return _this.records.push({
            id: _this.setId(_this.records.map(function (r) { return r.id; })),
            model: m
        }); });
        this.triggerReactiveFunc();
    };
    IncrNumReactiveStorage.prototype.setReactiveFunc = function (renderFunc) {
        this.reactiveFunc = renderFunc;
    };
    IncrNumReactiveStorage.prototype.triggerReactiveFunc = function () {
        this.reactiveFunc(this.records);
    };
    return IncrNumReactiveStorage;
}());
exports.IncrNumReactiveStorage = IncrNumReactiveStorage;

},{}],10:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncrNumReactiveStorage = exports.SoloDefReactiveStorage = void 0;
var soloDef = __importStar(require("./solo-def-reactive-storage"));
var incrNum = __importStar(require("./incr-num-reactive-storage"));
var SoloDefReactiveStorage = /** @class */ (function (_super) {
    __extends(SoloDefReactiveStorage, _super);
    function SoloDefReactiveStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return SoloDefReactiveStorage;
}(soloDef.SoloDefReactiveStorage));
exports.SoloDefReactiveStorage = SoloDefReactiveStorage;
;
var IncrNumReactiveStorage = /** @class */ (function (_super) {
    __extends(IncrNumReactiveStorage, _super);
    function IncrNumReactiveStorage() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return IncrNumReactiveStorage;
}(incrNum.IncrNumReactiveStorage));
exports.IncrNumReactiveStorage = IncrNumReactiveStorage;
;

},{"./incr-num-reactive-storage":9,"./solo-def-reactive-storage":11}],11:[function(require,module,exports){
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SoloDefReactiveStorage = void 0;
var SoloDefReactiveStorage = /** @class */ (function () {
    function SoloDefReactiveStorage(def) {
        this.def = this.def;
        this.record = { id: null, model: def };
        this.reactiveFunc = function () { };
    }
    SoloDefReactiveStorage.prototype.readAll = function () {
        return [this.record];
    };
    SoloDefReactiveStorage.prototype.reinit = function (data) {
        var _this = this;
        this.record = { id: null, model: __assign({}, this.def) };
        data.forEach(function (m) { return _this.record = {
            id: null,
            model: m
        }; });
        this.triggerReactiveFunc();
    };
    SoloDefReactiveStorage.prototype.setReactiveFunc = function (renderFunc) {
        this.reactiveFunc = renderFunc;
    };
    SoloDefReactiveStorage.prototype.triggerReactiveFunc = function () {
        this.reactiveFunc([this.record]);
    };
    return SoloDefReactiveStorage;
}());
exports.SoloDefReactiveStorage = SoloDefReactiveStorage;

},{}],"run":[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sets_1 = require("./sets");
var src_1 = require("../src");
var afterRender = {
    el: function (htmlEl, state, id, deps) {
        htmlEl.onclick = function () {
            state.el.reinit(state.el.readAll().map(function (r) { return (r.id === id)
                ? {
                    header: r.model.header,
                    isActive: !r.model.isActive
                }
                : r.model; }));
            state.res.triggerReactiveFunc();
        };
    },
    res: function (htmlEl, state, id, deps) { },
    formEl: function (htmlEl, state, id, deps) {
        var elState = state.el;
        var formElState = state.formEl;
        htmlEl.onkeyup = function (ev) {
            if (ev.key === "Enter") {
                formElState.reinit([{
                        header: document.querySelector('input').value
                    }]);
                elState.reinit(elState.readAll().map(function (el) { return el.model; }).concat([{
                        header: formElState.readAll()[0].model.header,
                        isActive: false,
                    }]));
                state.res.triggerReactiveFunc();
                formElState.reinit([{ header: "" }]);
                console.log(deps.getHello());
            }
        };
    },
};
(0, src_1.spaApp)({
    el: sets_1.elModelSet,
    res: sets_1.resModelSet,
    formEl: sets_1.formElModelSet,
}, afterRender, {
    getHello: function () { return "H-e-ll-o!"; }
});
console.log('Runed!');

},{"../src":1,"./sets":5}]},{},[]);
