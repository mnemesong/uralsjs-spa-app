import { ReactiveStorage } from "uralsjs-reactive-storage";
import { ModelSet } from "uralsjs-app-abstractions";
export type AfterRenderFunc<State, Deps> = (htmlEl: HTMLElement, state: State, id: string | number, deps: Deps) => void;
export declare const spaApp: <Keys extends string, Id, Deps>(modelSets: Record<Keys, ModelSet<unknown, unknown, Deps>>, afterRender: Record<Keys, AfterRenderFunc<Record<Keys, ReactiveStorage<unknown, unknown>>, Deps>>, deps: Deps) => void;
