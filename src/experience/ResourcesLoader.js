import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

let instance = null;

export default class ResourcesLoader {
  constructor() {
    // Singleton
    if (instance) {
      return instance;
    }

    instance = this;

    this.modelLoader = new GLTFLoader();
    this.textureLoader = new THREE.TextureLoader();
  }

  async loadAsset(type, path) {
    const loader = type === 'model' ? this.modelLoader : this.textureLoader;
    return new Promise((resolve, reject) => {
      loader.load(path, (data) => resolve(data), null, reject);
    });
  }
}
