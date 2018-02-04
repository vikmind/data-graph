import data from './data.json';

const nodes = data.map(item => {
  const prop = Object.keys(item)[0];
  return {
    data: {
      id: prop,
      type: 'node',
    }
  };
}).filter(el => !el.data.id.includes('::'));

const connections = data.reduce((ar, item) => {
  const prop = Object.keys(item)[0];
  if (!!item[prop] && !prop.includes('::')) {
    ar.push(
      ...item[prop].map(assoc => ({
        data: {
          id: `${prop}${assoc.to}`,
          type: 'edge',
          assoc: assoc.assoc,
          source: prop,
          target: assoc.to
        },
      }))
    );
  }
  return ar;
}, []);

if (process.env.NODE_ENV !== 'production') {
  window.nodes = nodes;
  window.connections = connections;
}

export default [
  ...nodes.filter(el => {
    return !!connections.find(con => (con.data.source === el.data.id) || (con.data.target === el.data.id));
  }),
  ...connections.filter(con => con.data.assoc !== 'HasMany'),
];
