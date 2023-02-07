export function reorder<T>(arr: T[], from: number, to: number) {
  const arr2 = [...arr];
  arr2.splice(to, 0, arr2.splice(from, 1)[0]);
  return arr2;
}

export function changeValue<T>(arr: T[], key: number, value: any): T[] {
  return key >= 0 ? [...arr.slice(0, key), value, ...arr.slice(key + 1)] : [...arr, value];
}
