import { ReactiveStorage, Rec } from "uralsjs-reactive-storage";
import { Widget, regroup, ModelSet } from "uralsjs-app-abstractions";
import { mapRecordVals } from "uralsjs-map-record";

const browserRendererAndGetSelectors = <M, Id, Deps>(
    getElements: () => Rec<M, Id>[],
    getRootSelector: (el: Rec<M, Id>) => string,
    elWidget: Widget<M, Deps>,
    renderId: (id: Id) => string,
    deps: Deps
): Record<string, Rec<M, Id>[]> => {
    const renderEl = (el: Rec<M, Id>): string =>
        elWidget(el.model, renderId(el.id), deps);
    const grouped = regroup(getElements(), getRootSelector);
    const groupedWidgets: {sel: string, arr: string[]}[] = Object.keys(grouped)
        .map(k => ({sel: k, arr: grouped[k].map(el => renderEl(el))}));
    groupedWidgets.forEach((el) => {
        const selectedHtml = document.querySelector(el.sel).innerHTML = 
            el.arr.join("");
    });
    return grouped;
}

export type AfterRenderFunc<State, Deps> = (
    htmlEl: HTMLElement,
    state: State,
    id: string|number,
    deps: Deps
) => void;

export const spaApp = <Keys extends string, Id, Deps>(
    modelSets: Record<Keys, ModelSet<unknown, unknown, Deps>>,
    afterRender: Record<
        Keys, 
        AfterRenderFunc<Record<Keys, ReactiveStorage<unknown, unknown>>, 
        Deps>
    >,
    deps: Deps
) : void => {
    const state = mapRecordVals(modelSets, (el) => el.stor);
    Object.keys(state).forEach((i) => state[i].setReactiveFunc((recs) => {
        const grouped = browserRendererAndGetSelectors(
            () => recs,
            modelSets[i].rootSelector,
            modelSets[i].widget,
            (id) => modelSets[i].idTool.renderId(id),
            deps
        );
        Object.keys(grouped).forEach(s => {
            Array.from(document
                .querySelector(s)
                .childNodes)
                .filter((cn: HTMLElement) => cn.nodeType === 1)
                .forEach((cn: HTMLElement) => {
                    try{
                        const id = modelSets[i].idTool.parseId(cn.id);
                        afterRender[i](cn, state, id);
                    } catch (e) {
                        console.log(e);
                        console.log(cn);
                    }
                });
        });
    }));
    Object.keys(state).forEach((i) => state[i].reinit(modelSets[i].initData(deps)));
}