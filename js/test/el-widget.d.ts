import { El } from "./el-model";
export declare const elWidgetFactory: (wClass: string) => {
    widget: (m: El, id: string, d: unknown) => string;
    css: string;
};
