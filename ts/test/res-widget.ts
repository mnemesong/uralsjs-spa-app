import { Res } from "./res-model"

export const resWidgetFactory = <Id>(
    wClass: string
) => ({
    widget: (m: Res, id: string) => `
<li id="${id}" class='${wClass}-li'>${m.name}</li>`,
    css: `
.${wClass}-li {font-color: #777;}`,
})