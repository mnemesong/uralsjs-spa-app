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
