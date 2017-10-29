// DO NOT PUT IN DEFAULT OR IT WON'T WORK
export function connectSource(proxyName) {
  return {
    type: 'CONNECTSOURCE',
    proxyName,
  };
}
