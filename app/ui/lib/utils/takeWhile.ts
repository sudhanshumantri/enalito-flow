export const takeWhile = <TElement,>(arr: TElement[], predicate: (el: TElement) => boolean): TElement[] => {
  const [x, ...xs] = arr;

  if (arr.length > 0 && predicate(x)) {
    return [x, ...takeWhile(xs, predicate)]
  } else {
    return [];
  }
};
