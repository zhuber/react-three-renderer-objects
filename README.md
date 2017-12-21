# three.js Object import component for React [![npm version](https://badge.fury.io/js/react-three-renderer-objects.svg)](https://badge.fury.io/js/react-three-renderer-objects)

# Overview
Import OBJ models into your three.js scene (WebGL). Using this package along with react-three-renderer will allow you to easily place fully rendered 3D objects (models with associated materials).

# Options
- Position
- Rotation
- Group (name of parent group)
- Scale

# Usage

```javascript
import ObjectModel from 'react-three-renderer-objects';
import exampleObject from "../../assets/models/example.obj";
import exampleMaterial from "../../assets/materials/example.mtl";

class Demo extends React.Component {

  componentDidMount() {
    const { scene } = this.refs;
    this.setState({ scene });
  }

  render() {
    return (
      <group name="exampleGroup" rotation={groupRotation}>
        <ObjectModel
          material={exampleMaterial}
          model={exampleObject}
          scene={this.state.scene}
          group="exampleGroup"
        />
      </group>
    );
  }
}
```
