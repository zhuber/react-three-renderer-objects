import * as THREE from "three";

import React from "react";
import * as MaterialLoader from 'three-mtl-loader';
import * as ObjectLoader from 'three-obj-loader';

class ObjectModel extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      object: '',
      loaded: false
    };
  }

  _loadAssets(props) {
    // Swap state function for loading completion.
    const finishedLoading = (object) => {
      return this.setState({
        object,
        loaded: true
      });
    }

    const scene = props.scene;
    const group = scene.getObjectByName(props.group);
    const threeLoader = THREE;
    const OBJLoader = ObjectLoader.default;
    const MTLLoader = MaterialLoader.default;
    OBJLoader(threeLoader);

    // Check to make sure we don't add the same item multiple times (causes issues).
    const renderedObject = scene.getObjectByName(props.name);
    if (!renderedObject) {
      // Load object files
      const materials = new MTLLoader();
      materials.load(props.material, function(material) {
        material.preload();

        const loader = new threeLoader.OBJLoader();
        loader.setMaterials(material);
        // Load the resource
        loader.load(
          props.model,
          function (object) {
            if (props.position) {
              object.position.x = props.position.x;
              object.position.y = props.position.y;
              object.position.z = props.position.z;
            }
            if (props.rotation) {
              object.rotation._x = props.rotation._x;
              object.rotation._y = props.rotation._y;
              object.rotation._z = props.rotation._z;
            }
            if (props.scale) {
              object.scale.x = props.scale.x;
              object.scale.y = props.scale.y;
              object.scale.z = props.scale.z;
            }
            object.name = props.name;
            group.add(object);
            finishedLoading(object.name);
          },
          function (xhr) {
            // Loading is in progress
            if (props.debug) {
              console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            }
          },
          function (error) {
            console.log('An error happened');
            console.log(error);
          }
        );
      });
    }
  }

  componentDidMount() {
    const scene = this.props.scene;
    if (!this.state.loaded && scene.type && scene.type === 'Scene') {
      this._loadAssets(this.props);
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const scene = nextProps.scene;
    if (this.state.loaded && this.state.object.length > 0) {
      const renderedObject = scene.getObjectByName(this.props.name);
      if (nextProps.position) {
          renderedObject.position.x = nextProps.position.x;
          renderedObject.position.y = nextProps.position.y;
          renderedObject.position.z = nextProps.position.z;
        }
        if (nextProps.rotation) {
          renderedObject.rotation._x = nextProps.rotation._x;
          renderedObject.rotation._y = nextProps.rotation._y;
          renderedObject.rotation._z = nextProps.rotation._z;
        }
        if (nextProps.scale) {
          renderedObject.scale.x = nextProps.scale.x;
          renderedObject.scale.y = nextProps.scale.y;
          renderedObject.scale.z = nextProps.scale.z;
        }
    } else if (scene.type && scene.type === 'Scene') {
      this._loadAssets(nextProps);
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only load objects once.
    if (
      this.state.loaded === nextState.loaded &&
      this.props.scene &&
      this.props.scene.type === 'Scene'
    ) {
      return false;
    }
    return true;
  }

  render() {
    return (null);
  }

}

export default ObjectModel;
