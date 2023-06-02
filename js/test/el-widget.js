"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.elWidgetFactory = void 0;
var elWidgetFactory = function (wClass) { return ({
    widget: function (m, id) { return "\n<li id=\"".concat(id, "\" style=\"font-weight: ").concat(m.isActive ? "bold" : "normal", ";\">\n    ").concat(m.header, "<ol></ol>\n</li>"); },
    css: "\nli: {font-weight: 700;}"
}); };
exports.elWidgetFactory = elWidgetFactory;
