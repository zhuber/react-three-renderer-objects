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

  componentDidMount() {
    // Swap state function for loading completion.
    const finishedLoading = (object) => {
      return this.setState({
        object,
        loaded: true
      });
    }

    const props = this.props;
    const scene = props.scene;
    const group = scene.getObjectByName(props.group);

    if (scene.type && scene.type === 'Scene') {
      const threeLoader = THREE;
      const OBJLoader = ObjectLoader.default;
      const MTLLoader = MaterialLoader.default;
      OBJLoader(threeLoader);

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
              renderedObject.scale.x = props.scale.x;
              renderedObject.scale.y = props.scale.y;
              renderedObject.scale.z = props.scale.z;
            }
            object.name = 'testObject';
            group.add(object);
            finishedLoading(object.name);
          },
          function (xhr) {
            // Loading is in progress
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
          },
          function (error) {
            console.log('An error happened');
            console.log(error);
          }
        );
      });
    }
  }

  componentWillUpdate(nextProps, nextState) {
    const scene = nextProps.scene;
    if (this.state.object) {
      const renderedObject = scene.getObjectByName(this.state.object);
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
    }
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   if (this.props.group !== nextProps.group) {
  //     return true;
  //   } else if (this.props.position !== nextProps.position) {
  //     return true;
  //   } else if (this.props.rotation !== nextProps.rotation) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }

  render() {
    return (null);
  }

}

export default ObjectModel;
