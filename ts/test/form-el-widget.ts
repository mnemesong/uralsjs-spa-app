import { FormEl } from "./form-el-model";

export const formElWidget = (
    m: FormEl,
    id: string,
    d: unknown
) => `
<div id="${id}"><h4>Form</h4><input type='text' value='${m.header}'></div>`