import React, { PropTypes } from 'react';
import ol from 'openlayers';
import { connect } from 'react-redux';

import { loadLayer, unloadLayer } from '../../actions';

import 'openlayers/css/ol.css';
import styles from './templatecomponent.scss';

const propTypes = {
  wmslayers: PropTypes.array.isRequired,
};


class TemplateComponent extends React.Component {
  constructor(props) {
    super(props);
    this.ref = null;
    this.map = null;

    this.onLayer = this.onLayer.bind(this);
  }

  componentDidMount() {
    this.map = new ol.Map({
      target: this.ref,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { wmslayers } = nextProps;
    this.map.getLayers().forEach((l) => {
      this.map.removeLayer(l);
    });

    // Base Layer
    this.map.addLayer(new ol.layer.Tile({
      source: new ol.source.OSM(),
    }));

    wmslayers.forEach((l) => {
      this.map.addLayer(l.tile);
    });
  }

  onLayer(id) {
    const { wmslayers } = this.props;
    let layer = null;

    switch (id) {
      case 'layer1':
       layer = {
          id: 'layer1',
          tile: new ol.layer.Tile({
            title: 'layer1',
            source: new ol.source.XYZ({
              url: 'http://s.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
            }),
          }),
        };
        break;
      case 'layer2':
       layer = {
         id: 'layer2',
         tile: new ol.layer.Tile({
           title: 'layer2',
           extent: [-13884991, 2870341, -7455066, 6338219],
           source: new ol.source.TileWMS({
             url: 'https://ahocevar.com/geoserver/wms',
             params: { LAYERS: 'topp:states', TILED: true },
             serverType: 'geoserver',
           }),
         }),
       };
        break;
      case 'layer3':
       layer = {
         id: 'layer3',
         tile: new ol.layer.Tile({
           title: 'layer1',
           source: new ol.source.XYZ({
             url: 'http://s.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
           }),
         }),
       };
        break;
    }

    let findit = false;
    wmslayers.forEach((l) => {
      if (l.id === id) {
        findit = true;
      }
    });

    if (findit) { // Remove it
        this.props.unloadLayer(layer.id);
    } else { // Add it
        this.props.loadLayer(layer);
    }
  }

  render() {
    return (
      <div>
        <div id="map" ref={(m) => { this.ref = m; }} />
        <div className="layers">
          <div>
            <input onClick={() => this.onLayer('layer1')} type="checkbox" name="layer1" />
            <span className="margin-left">Layer1</span>
          </div>
          <div>
            <input onClick={() => this.onLayer('layer2')} type="checkbox" name="layer2" />
            <span className="margin-left">Layer2</span>
          </div>
          <div>
            <input onClick={() => this.onLayer('layer3')} type="checkbox" name="layer3" />
            <span className="margin-left">Layer3</span>
          </div>
        </div>
      </div>
    );
  }
}

TemplateComponent.propTypes = propTypes;

const mapStateToProps = ({ wmslayers }) => ({
  wmslayers,
});

export default connect(mapStateToProps, { loadLayer, unloadLayer })(TemplateComponent);
