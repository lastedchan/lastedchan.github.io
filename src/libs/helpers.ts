export function reorder<T>(arr: T[], from: number, to: number) {
  const arr2 = [...arr];
  arr2.splice(to, 0, arr2.splice(from, 1)[0]);
  return arr2;
}
