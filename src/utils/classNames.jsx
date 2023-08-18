export function classNames(cls = '', mods = {}) {
  return [
    cls,
    ...Object.entries(mods)
      .filter(([key, value]) => Boolean(value))
      .map(([className]) => className),
  ].join(' ');
}
