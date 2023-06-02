import { Widget } from "uralsjs-app-abstractions"
import { El } from "./el-model";

export const elWidgetFactory = (
    wClass: string
) => ({
    widget: (m: El, id: string) => `
<li id="${id}" style="font-weight: ${m.isActive ? "bold" : "normal"};">
    ${m.header}<ol></ol>
</li>`,
    css: `
li: {font-weight: 700;}`
})