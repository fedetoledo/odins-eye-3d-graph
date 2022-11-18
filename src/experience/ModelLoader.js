import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export default class ModelLoader {
  constructor() {
    this.modelLoader = new GLTFLoader();
  }

  async loadModel(path) {
    return new Promise((resolve, reject) => {
      this.modelLoader.load(path, (data) => resolve(data), null, reject);
    });
  }
}
