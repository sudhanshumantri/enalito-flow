type NoneEmptyArray = readonly any[] & {0: any}
type CompareUnionWithArray<P, Q extends NoneEmptyArray> = Exclude<P, Q[number]> extends never
      ? (Exclude<Q[number], P> extends never ? Q : ReadonlyArray<P>)
      : readonly [...Q, Exclude<P, Q[number]>]
export function assertTypeEquals<P, Q extends NoneEmptyArray>(test: CompareUnionWithArray<P, Q>): void {}
