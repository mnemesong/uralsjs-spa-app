import { ReactiveStorage } from "uralsjs-reactive-storage";
import { ModelSet } from "uralsjs-app-abstractions";
export type AfterRenderFunc<State> = (htmlEl: HTMLElement, state: State, id: string | number) => void;
export declare const spaApp: <Keys extends string, Id>(modelSets: Record<Keys, ModelSet<unknown, unknown>>, afterRender: Record<Keys, AfterRenderFunc<Record<Keys, ReactiveStorage<unknown, unknown>>>>) => void;
