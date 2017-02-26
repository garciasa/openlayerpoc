import React, { PropTypes } from 'react';
import ol from 'openlayers';

import 'openlayers/css/ol.css';

const propTypes = {
  children: PropTypes.array,
};

class MapView extends React.Component {
  constructor(props) {
    super(props);
    this.ref = null;
    this.map = new ol.Map({});
  }

  getChildContext() {
    return {
      map: this.map,
    };
  }

  componentDidMount() {
    this.map.setTarget(this.ref);

    this.map.addLayer(new ol.layer.Tile({
      source: new ol.source.OSM(),
    }));

    this.map.setView(new ol.View({
      center: [949282, 6002552],
      zoom: 5,
    }));
  }


  componentWillReceiveProps(nextProps) {
    // const { visibleLayers } = nextProps;
    // this.map.getLayers().forEach((l) => {
    //   this.map.removeLayer(l);
    // });
    //
    // // Base Layer
    // this.map.addLayer(new ol.layer.Tile({
    //   source: new ol.source.OSM(),
    // }));
    //
    // visibleLayers.layers.forEach((l) => {
    //   this.map.addLayer(l.tile);
    // });
  }


  render() {
    return (
      <div id="map" ref={(m) => { this.ref = m; }}>
        {this.props.children}
      </div>
    );
  }
}

MapView.propTypes = propTypes;

MapView.childContextTypes = {
  map: PropTypes.instanceOf(ol.Map),
};

export default MapView;
