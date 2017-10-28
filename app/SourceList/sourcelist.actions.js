
export const CONNECT_SOURCE = 'CONNECTSOURCE';
export function connectSource(proxyName) {
  return {
    type: CONNECT_SOURCE,
    proxyName,
  };
}
