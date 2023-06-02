import { elWidgetFactory } from "./el-widget";
import { IncrNumReactiveStorage, ReactiveStorage, Rec, SoloDefReactiveStorage } from "uralsjs-reactive-storage";
import { El } from "./el-model";
import { ModelSet } from "uralsjs-app-abstractions";
import { resWidgetFactory } from "./res-widget";
import { Res } from "./res-model";
import { NumPrefixIdTool, NullDefaultIdTool } from "uralsjs-id-html-tools";
import { FormEl } from "./form-el-model";
import { formElWidget } from "./form-el-widget";

export const elModelSet: ModelSet<El, number> = {
    widget: elWidgetFactory("els").widget,
    idTool: new NumPrefixIdTool("el_"),
    rootSelector: (el: Rec<El, number>) => 'ol',
    initData: [
        {header: "el1", isActive: true},
        {header: "el2", isActive: false}
    ],
    stor: new IncrNumReactiveStorage(),
}

export const  resModelSet: ModelSet<Res, number> = {
    widget: resWidgetFactory("res").widget,
    idTool: new NumPrefixIdTool("res_"),
    rootSelector: (el: Rec<Res, number>) => '#el_' + el.model.elId + " > ol",
    initData: [
        { name: "Петров", elId: 0 },
        { name: "Сидоров", elId: 0 },
        { name: "Макарченко", elId: 1 },
    ],
    stor: new IncrNumReactiveStorage(),
}

export const formElModelSet: ModelSet<FormEl, null> = {
    widget: formElWidget,
    idTool: new NullDefaultIdTool('elForm'),
    rootSelector: (el: Rec<FormEl, null>) => '#formContainer',
    initData: [
        {header: ""}
    ],
    stor: new SoloDefReactiveStorage({header: ''}),
}