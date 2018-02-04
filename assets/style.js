export default [
  {
    selector: 'node',
    style: {
      'shape': 'rectangle',
      'width': 'label',
      'height': 'label',
      'padding': 10,
      'background-color': '#fefefe',
      'border-width': 1,
      'border-color': '#333',
      'label': 'data(id)',
      'text-margin-y': '1.7em',
    },
  },
  {
    selector: 'edge',
    style: {
      'width': 1,
      'line-color': '#888',
    },
  },
  {
    selector: 'edge[assoc="HasMany"]',
    style: {
      'source-arrow-color': '#f00',
      'source-arrow-shape': 'triangle',
    },
  },
  {
    selector: 'edge[assoc="BelongsTo"]',
    style: {
      'source-arrow-color': '#0f0',
      'source-arrow-shape': 'triangle',
    },
  },
];
