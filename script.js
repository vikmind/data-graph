import cytoscape from 'cytoscape';
import data from './data.json';

const nodes = data.map(item => {
  const prop = Object.keys(item)[0];
  return {
    data: {
      id: prop,
      type: 'node',
      data: item[prop],
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

const cy = cytoscape({
  container: document.getElementById('cy'),
  elements: [
    ...nodes.filter(el => {
      return !!connections.find(con => (con.data.source === el.data.id) || (con.data.target === el.data.id));
    }),
    ...connections,
  ],
  style: [ // the stylesheet for the graph
    {
      selector: 'node',
      style: {
        'background-color': '#666',
        'label': 'data(id)'
      }
    },

    {
      selector: 'edge',
      style: {
        'width': 2,
        'line-color': '#ccc',
        'target-arrow-color': '#ccc',
        'target-arrow-shape': 'triangle'
      }
    }
  ],
  layout: {
    name: 'breadthfirst',
    circle: true,
  },
});

