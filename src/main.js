import ForceGraph3D from '3d-force-graph';
import * as THREE from 'three';
import data from '../data2';
import ResourcesLoader from './experience/ResourcesLoader';

const gData = {
  nodes: data.nodes.map((n) => ({ ...n, collapsed: true })),
  links: data.edges,
};

const getPrunedTree = () => {
  const visibleNodes = [];
  let visibleLinks = [];

  // Only make stacks expandable
  gData.nodes.forEach((node) => {
    visibleNodes.push(node);
    if (node?.stack?.length > 0) {
      if (node.collapsed) {
        // destroy links
        node.stack.forEach((s) => {
          gData.links.forEach((link) => {
            if (s.id === link.target) {
              delete gData.links[link.id];
            }
          });
        });
        return;
      }

      node.stack.forEach((sub, index) => {
        visibleLinks.push({
          id: index,
          source: node.id,
          target: sub.id,
          name: `${node.name} - ${sub.name}`,
          subset: true,
        });
        visibleNodes.push({ ...sub, type: 'company' });
      });
    }
  });

  gData.links.forEach((link) => {
    visibleLinks.push(link);
  });

  return { nodes: visibleNodes, links: visibleLinks };
};

const main = async () => {
  const assetLoader = new ResourcesLoader();

  const folder = await assetLoader.loadAsset(
    'model',
    './public/assets/models/folder.glb'
  );
  folder.scene.scale.set(5, 5, 5);

  const file = await assetLoader.loadAsset(
    'model',
    './public/assets/models/file.glb'
  );
  file.scene.scale.multiplyScalar(10);

  const cube = new THREE.Mesh(
    new THREE.BoxGeometry(3, 3, 3),
    new THREE.MeshBasicMaterial({ color: 'red' })
  );

  const stack = new THREE.Mesh(
    new THREE.SphereGeometry(2, 20, 20),
    new THREE.MeshBasicMaterial({ wireframe: true })
  );

  const Graph = ForceGraph3D()(document.getElementById('3d-graph'));

  // Link setup
  Graph.linkWidth(0.2)
    .linkOpacity(0.8)
    .linkColor('white')
    .linkThreeObjectExtend(true)
    .linkThreeObject((link) => {
      // extend link with text sprite
      if (!link.subset) {
        return folder.scene.clone();
      }
      const tinySphere = stack.clone();
      tinySphere.scale.set(0.1, 0.1, 0.1);
      return tinySphere;
    })
    .linkPositionUpdate((node, { start, end }) => {
      const middlePos = Object.assign(
        ...['x', 'y', 'z'].map((c) => ({
          [c]: start[c] + (end[c] - start[c]) / 2, // calc middle point
        }))
      );

      // Position sprite
      Object.assign(node.position, middlePos);
    })
    .onLinkClick((link, event) => {
      const { docs, source, target } = link;

      const documentsContainer = document.getElementById('documents-container');
      documentsContainer.classList.add('active');

      const detailsContainer = document.getElementById('details-container');
      const detailsHtml = `
        <div class="connection">
          <span>${source.name}</span> - <span>${target.name}</span>
        </div>
      `;
      detailsContainer.innerHTML = detailsHtml;

      const dataHtml = docs.map((doc) => {
        return `<div class="doc-item">
            <a target="_blank" href="${doc.url}" class="doc-url">${doc.name}</a>
          </div>
        `;
      });

      const documentsContent = document.getElementById('documents-content');
      documentsContent.innerHTML = dataHtml.join(' ');
    });

  // Nodes setup
  Graph.nodeThreeObject((node) => {
    let model = null;
    if (node.type === 'company') {
      model = cube.clone();

      const logo = new THREE.TextureLoader().load(node.imageUrl);
      // const logo = assetLoader.loadAsset('texture', node.imageUrl);
      logo.flipY = false;

      model.material = new THREE.MeshBasicMaterial({ map: logo });
    } else {
      model = stack.clone();
      stack.material.color = new THREE.Color(node.color);
    }

    return model;
  }).onNodeClick((node) => {
    // Aim at node from outside it
    const distance = 40;
    const distRatio = 1 + distance / Math.hypot(node.x, node.y, node.z);

    const newPos =
      node.x || node.y || node.z
        ? {
            x: node.x * distRatio,
            y: node.y * distRatio,
            z: node.z * distRatio,
          }
        : { x: 0, y: 0, z: distance }; // special case if node is in (0,0,0)

    Graph.cameraPosition(
      newPos, // new position
      node, // lookAt ({ x, y, z })
      3000 // ms transition duration
    );

    if (node.stack.length > 0) {
      node.collapsed = !node.collapsed; // toggle collapse state
      Graph.graphData(getPrunedTree());
    }
  });

  // Set initial graph width
  const width = document.getElementById('3d-graph').clientWidth;
  Graph.width(width);
  Graph.backgroundColor('#191919');

  // Draw graph
  Graph.graphData(getPrunedTree());

  // Set distance between nodes
  Graph.d3Force('link').distance((link) => (link.subset ? 5 : 20));

  window.addEventListener('resize', () => {
    const width = document.getElementById('3d-graph').clientWidth;
    Graph.width(width);
    Graph.camera().aspect = window.innerWidth / window.innerHeight;
    Graph.camera().updateProjectionMatrix();

    Graph.renderer().setSize(window.innerWidth, window.innerHeight);
  });
};

main();

// TODO: Make connections between nodes and subsets
