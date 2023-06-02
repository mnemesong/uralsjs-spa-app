import { Res } from "./res-model";
export declare const resWidgetFactory: <Id>(wClass: string) => {
    widget: (m: Res, id: string) => string;
    css: string;
};
