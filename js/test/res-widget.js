"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resWidgetFactory = void 0;
var resWidgetFactory = function (wClass) { return ({
    widget: function (m, id) { return "\n<li id=\"".concat(id, "\" class='").concat(wClass, "-li'>").concat(m.name, "</li>"); },
    css: "\n.".concat(wClass, "-li {font-color: #777;}"),
}); };
exports.resWidgetFactory = resWidgetFactory;
