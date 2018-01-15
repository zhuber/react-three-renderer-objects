# three.js Object import component for React [![npm version](https://badge.fury.io/js/react-three-renderer-objects.svg)](https://badge.fury.io/js/react-three-renderer-objects)

# Overview
Import OBJ models into your three.js scene (WebGL). Using this package along with react-three-renderer will allow you to easily place fully rendered 3D objects (models with associated materials).

# Options
- Name (required)
- Model
- Material
- Position
- Rotation
- Scale
- Scene
- Group (name of parent group)

# Usage

```javascript
import ObjectModel from 'react-three-renderer-objects';

<ObjectModel
  name="objectName"
  model={model}
  material={material}
  position={new THREE.Vector3(0, 0, 0)}
  rotation={new THREE.Euler(0, 0, 0)}
  scale={new THREE.Vector3(1, 1, 1)}
  scene={scene}
  group="groupName"
/>
```

# Example scene

```javascript
import * as THREE from "three";

import React from "react";
import React3 from "react-three-renderer";
import ObjectModel from 'react-three-renderer-objects';
import exampleObject from "../../assets/models/example.obj";
import exampleMaterial from "../../assets/materials/example.mtl";

class DemoScene extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      scene: {}
    };
  }

  componentDidMount() {
    const { scene } = this.refs;
    this.setState({ scene });
  }

  render() {
    return (
      <React3
        mainCamera="camera"
        width={500}
        height={500}
        alpha={true}
      >
        <scene ref="scene">
          <perspectiveCamera
            key={`perspectiveCamera`}
            name="camera"
            fov={75}
            aspect={1}
            near={0.1}
            far={1000}
            position={new THREE.Vector3(0, 0, 25)}
            lookAt={new THREE.Vector3(0, 0, 0)}
          />

          <group name="exampleGroup">
            <ObjectModel
              name="exampleObject"
              material={exampleMaterial}
              model={exampleObject}
              scene={this.state.scene}
              group="exampleGroup"
            />
          </group>
        </scene>
      </React3>
    );
  }
}

export default DemoScene;
```
