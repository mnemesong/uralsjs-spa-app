"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var sets_1 = require("./sets");
var src_1 = require("../src");
var afterRender = {
    el: function (htmlEl, state, id) {
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
    res: function (htmlEl, state, id) { },
    formEl: function (htmlEl, state, id) {
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
            }
        };
    },
};
(0, src_1.spaApp)({
    el: sets_1.elModelSet,
    res: sets_1.resModelSet,
    formEl: sets_1.formElModelSet,
}, afterRender);
console.log('Runed!');