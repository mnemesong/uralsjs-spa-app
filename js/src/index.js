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
                    afterRender[i](cn, state, id);
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
