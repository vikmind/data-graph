import cytoscape from 'cytoscape';
import style from './style';
import elements from './elements';

const cy = cytoscape({
  container: document.getElementById('cy'),
  elements,
  style,
  layout: {
    name: 'breadthfirst',
    circle: true,
  },
});

