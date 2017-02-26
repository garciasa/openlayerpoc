import React, { PropTypes } from 'react';
import ol from 'openlayers';

const propTypes = {
  zIndex: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  params: PropTypes.object.isRequired,
};

class WMS extends React.Component {
  constructor(props) {
    super(props);
    this.wms = new ol.layer.Tile({
      visible: props.visible,
      source: new ol.source.TileWMS({
        url: props.url,
        params: props.params,
        serverType: 'geoserver',
      }),
    });
    this.wms.setZIndex(props.zIndex);
  }

  componentDidMount() {
    this.context.map.addLayer(this.wms);
  }

  componentWillUnmount() {
    this.context.map.removeLayer(this.wms);
  }

  render() {
    return <div style={{ display: 'none' }} />;
  }
}

WMS.propTypes = propTypes;

WMS.contextTypes = {
  map: PropTypes.instanceOf(ol.Map),
};


export default WMS;
