import { FormEl } from "./form-el-model";

export type FormElDep = {
    getHello: () => string,
}

export const formElWidget = (
    m: FormEl,
    id: string,
    d: FormElDep
) => `
<div id="${id}" data-hello="${d.getHello()}"><h4>Form</h4><input type='text' value='${m.header}'></div>`