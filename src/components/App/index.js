import React, { PropTypes } from 'react'
import { connect } from 'react-redux';

import {
  loadWmsLayer,
  unloadWmsLayer,
  loadVectorLayer,
  unloadVectorLayer,
} from '../../actions';
import MapView from '../MapView';
import * as Tile from '../Tile';

const propTypes = {
  wmslayers: PropTypes.array.isRequired,
  vectorlayers: PropTypes.array.isRequired,
  loadVectorLayer: PropTypes.func.isRequired,
  loadWmsLayer: PropTypes.func.isRequired,
  unloadVectorLayer: PropTypes.func.isRequired,
  unloadWmsLayer: PropTypes.func.isRequired,
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.showWMSLayer = this.showWMSLayer.bind(this);
    this.hideWMSLayer = this.hideWMSLayer.bind(this);
    this.showVectorLayer = this.showVectorLayer.bind(this);
    this.hideVectorLayer = this.hideVectorLayer.bind(this);
  }

  showWMSLayer(id) {
    const { loadWmsLayer } = this.props;
    const layer = {
      id,
      visible: true,
      zIndex: 1,
      url: 'https://ahocevar.com/geoserver/wms',
      params: { LAYERS: 'topp:states', TILED: true },
    };

    loadWmsLayer(layer);
  }

  hideWMSLayer(id) {
    const { unloadWmsLayer } = this.props;
    unloadWmsLayer(id);
  }

  showVectorLayer(id) {
    const { loadVectorLayer } = this.props;
    const layer = {
      id,
      url: 'https://openlayers.org/en/v4.0.1/examples/data/geojson/countries.geojson',
    };

    loadVectorLayer(layer);
  }

  hideVectorLayer(id) {
    const { unloadVectorLayer } = this.props;
    unloadVectorLayer(id);
  }

  render() {
    const { wmslayers, vectorlayers } = this.props;
    return (
      <div>
        <MapView>
          {wmslayers.map(l =>
            <Tile.WMS
              key={l.id}
              zIndex={l.zIndex}
              visible={l.visible}
              url={l.url}
              params={l.params}
            />
          )}
          {vectorlayers.map(l =>
            <Tile.Vector
              key={l.id}
              url={l.url}
            />
          )}
        </MapView>
        <button onClick={() => this.showWMSLayer('layer1')}>show WMS 1</button>
        <button onClick={() => this.hideWMSLayer('layer1')}>hide WMS 1</button>
        <br />
        <button onClick={() => this.showVectorLayer('layer2')}>show Vector 1</button>
        <button onClick={() => this.hideVectorLayer('layer2')}>hide Vector 1</button>
      </div>
    );
  }
}

App.propTypes = propTypes;

const mapStateToProps = ({ wmslayers, vectorlayers }) => ({
  wmslayers,
  vectorlayers,
});

export default connect(
  mapStateToProps,
  {
    loadWmsLayer,
    unloadWmsLayer,
    loadVectorLayer,
    unloadVectorLayer,
  },
)(App);
