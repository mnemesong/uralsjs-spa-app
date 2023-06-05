import { ReactiveStorage, Rec } from "uralsjs-reactive-storage";
import { El } from "./el-model";
import { FormEl } from "./form-el-model";
import { elModelSet, formElModelSet, resModelSet } from "./sets";
import { spaApp } from "../src";
import { FormElDep } from "./form-el-widget";

type State = Record<string, ReactiveStorage<unknown, unknown>>;

const afterRender = {
    el: (htmlEl: HTMLElement, state: State, id: number|string, deps) => {
        htmlEl.onclick = () => {
            state.el.reinit(
                state.el.readAll().map((r: Rec<El, number>) => (r.id === id) 
                    ? {
                        header: r.model.header, 
                        isActive: !r.model.isActive
                    }
                    : r.model)
            );
            state.res.triggerReactiveFunc();
        }
    },
    res: (htmlEl: HTMLElement, state: State, id: number|string, deps) => {},
    formEl: (htmlEl: HTMLElement, state: State, id: null, deps: FormElDep) => {
        const elState = state.el as ReactiveStorage<El, number>;
        const formElState = state.formEl as ReactiveStorage<FormEl, number>;
        htmlEl.onkeyup = (ev) => {
            if (ev.key === "Enter") {
                formElState.reinit([{
                    header: document.querySelector('input').value
                }])
                elState.reinit(elState.readAll().map(el => el.model).concat([{
                    header: formElState.readAll()[0].model.header, 
                    isActive: false,
                }]))
                state.res.triggerReactiveFunc();
                formElState.reinit([{header: ""}]);
                console.log(deps.getHello());
            }
        }
    },
}

spaApp({
    el: elModelSet,
    res: resModelSet,
    formEl: formElModelSet,
}, afterRender, {
    getHello: () => "H-e-ll-o!"
});
console.log('Runed!');