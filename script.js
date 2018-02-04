import cytoscape from 'cytoscape';
import data from './data.json';
const elements = [
  ...data.map(item => {
    const prop = Object.keys(item)[0];
    return {
      data: {
        id: prop,
        type: 'node',
        data: item[prop],
      }
    };
  }),
  ...data.reduce((ar, item) => {
    const prop = Object.keys(item)[0];
    if (!!item[prop]) {
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
  }, [])
];

const cy = cytoscape({
  container: document.getElementById('cy'),
  elements,
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
    name: 'grid',
    rows: 6
  }
});
