import { FormEl } from "./form-el-model";
export type FormElDep = {
    getHello: () => string;
};
export declare const formElWidget: (m: FormEl, id: string, d: FormElDep) => string;
