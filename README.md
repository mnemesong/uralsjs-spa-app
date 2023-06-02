# uralsjs-spa-app
Single page application

## API
```typescript
/**
 * Action after reneder element
 */
export type AfterRenderFunc<State> = (
    htmlEl: HTMLElement,
    state: State,
    id: string|number
) => void;

/**
 * Runs SPA by modelsets and after-render functions.
 * Theese parameters should be same keys Record
 */
export const spaApp = <Keys extends string, Id>(
    modelSets: Record<Keys, ModelSet<unknown, unknown>>,
    afterRender: Record<Keys, AfterRenderFunc<Record<Keys, ReactiveStorage<unknown, unknown>>>>
) : void
```

## Example
See ts/test folder

## Author
Anaroly Starodubtsev <tostar74@mail.ru>

## License
MIT