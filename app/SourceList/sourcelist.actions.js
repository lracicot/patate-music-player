
export default function connectSource(proxyName) {
  return {
    type: 'CONNECTSOURCE',
    proxyName,
  };
}
