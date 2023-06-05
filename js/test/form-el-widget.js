"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formElWidget = void 0;
var formElWidget = function (m, id, d) { return "\n<div id=\"".concat(id, "\" data-hello=\"").concat(d.getHello(), "\"><h4>Form</h4><input type='text' value='").concat(m.header, "'></div>"); };
exports.formElWidget = formElWidget;
