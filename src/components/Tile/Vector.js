import React, { PropTypes } from 'react';
import ol from 'openlayers';

const propTypes = {
  url: PropTypes.string.isRequired,
};

class Vector extends React.Component {
  constructor(props) {
    super(props);
    this.vector = new ol.layer.Vector({
      source: new ol.source.Vector({
        url: props.url,
        format: new ol.format.GeoJSON(),
      }),
    });
  }

  componentDidMount() {
    this.context.map.addLayer(this.vector);
  }

  componentWillUnmount() {
    this.context.map.removeLayer(this.vector);
  }

  render() {
    return <div style={{ display: 'none' }} />;
  }
}

Vector.propTypes = propTypes;

Vector.contextTypes = {
  map: PropTypes.instanceOf(ol.Map),
};

export default Vector;
