import { Canvas, CanvasEvent } from '@antv/g';
import { Renderer } from '@antv/g-webgl';
import {
  ShaderMaterial,
  BufferGeometry,
  Mesh,
  VertexBufferFrequency,
  Format,
  VertexAttributeLocation,
  Plugin as Plugin3D,
} from '@antv/g-plugin-3d';
import Stats from 'stats.js';
import * as dat from 'dat.gui';

// create a renderer
const renderer = new Renderer();
renderer.registerPlugin(new Plugin3D());

// create a canvas
const canvas = new Canvas({
  container: 'container',
  width: 600,
  height: 500,
  renderer,
});

// create buffer geometry
const bufferGeometry = new BufferGeometry();
bufferGeometry.setVertexBuffer({
  bufferIndex: 1,
  byteStride: 4 * 3,
  frequency: VertexBufferFrequency.PerVertex,
  attributes: [
    {
      format: Format.F32_RGB,
      bufferByteOffset: 4 * 0,
      location: VertexAttributeLocation.MAX,
    },
  ],
  // use 6 vertices
  data: Float32Array.from([
    -300.0, 250.0, 100.0, 300.0, 250.0, 100.0, 300.0, -250.0, 100.0, 300.0, -250.0, 100.0, -300.0,
    -250.0, 100.0, -300.0, 250.0, 100.0,
  ]),
});
// draw 6 vertices
bufferGeometry.vertexCount = 6;

const shaderMaterial = new ShaderMaterial({
  vertexShader: `
  layout(std140) uniform ub_SceneParams {
    mat4 u_ProjectionMatrix;
    mat4 u_ViewMatrix;
    vec3 u_CameraPosition;
    float u_DevicePixelRatio;
    vec2 u_Viewport;
    float u_IsOrtho;
  };
  layout(std140) uniform ub_MaterialParams {
    float u_Level;
    // float u_NoiseMode;
  };

  layout(location = ${VertexAttributeLocation.MODEL_MATRIX0}) attribute vec4 a_ModelMatrix0;
  layout(location = ${VertexAttributeLocation.MODEL_MATRIX1}) attribute vec4 a_ModelMatrix1;
  layout(location = ${VertexAttributeLocation.MODEL_MATRIX2}) attribute vec4 a_ModelMatrix2;
  layout(location = ${VertexAttributeLocation.MODEL_MATRIX3}) attribute vec4 a_ModelMatrix3;
  layout(location = ${VertexAttributeLocation.MAX}) attribute vec3 a_Position;

  void main() {
    mat4 u_ModelMatrix = mat4(a_ModelMatrix0, a_ModelMatrix1, a_ModelMatrix2, a_ModelMatrix3);
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_ModelMatrix * vec4(a_Position, 1.0);
  }
  `,
  fragmentShader: ` 
  layout(std140) uniform ub_SceneParams {
    mat4 u_ProjectionMatrix;
    mat4 u_ViewMatrix;
    vec3 u_CameraPosition;
    float u_DevicePixelRatio;
    vec2 u_Viewport;
    float u_IsOrtho;
  };

  layout(std140) uniform ub_MaterialParams {
    float u_Level;
    // float u_NoiseMode;
  };

  float random (vec2 st) {
    return fract(sin(
      dot(st.xy,vec2(12.9898,78.233)))*
      43758.5453123);
  }

  float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
  }

  // gradient noise
  // float noise( in vec2 st ) {
  //   vec2 i = floor(st);
  //   vec2 f = fract(st);
    
  //   vec2 u = smoothstep(0., 1., f);

  //   return mix( mix( dot( random( i + vec2(0.0,0.0) ), f - vec2(0.0,0.0) ), 
  //                   dot( random( i + vec2(1.0,0.0) ), f - vec2(1.0,0.0) ), u.x),
  //               mix( dot( random( i + vec2(0.0,1.0) ), f - vec2(0.0,1.0) ), 
  //                   dot( random( i + vec2(1.0,1.0) ), f - vec2(1.0,1.0) ), u.x), u.y);
  // }

  void main() {
    vec2 st = gl_FragCoord.xy / u_Viewport;
    vec2 pos = vec2(st * u_Level);
    float n = noise(pos);
    gl_FragColor = vec4(vec3(n), 1.0);
  }
  `,
});
shaderMaterial.setUniforms({
  u_Level: 5,
  u_NoiseMode: 0,
});
const mesh = new Mesh({
  style: {
    fill: '#1890FF',
    opacity: 1,
    geometry: bufferGeometry,
    material: shaderMaterial,
  },
});
mesh.setPosition(300, 250, 0);
canvas.appendChild(mesh);

// stats
const stats = new Stats();
stats.showPanel(0);
const $stats = stats.dom;
$stats.style.position = 'absolute';
$stats.style.left = '0px';
$stats.style.top = '0px';
const $wrapper = document.getElementById('container');
$wrapper.appendChild($stats);
canvas.addEventListener(CanvasEvent.AFTER_RENDER, () => {
  if (stats) {
    stats.update();
  }
});

// GUI
const gui = new dat.GUI({ autoPlace: false });
$wrapper.appendChild(gui.domElement);

const noiseFolder = gui.addFolder('noise');
const noiseConfig = {
  level: 5,
};
noiseFolder.add(noiseConfig, 'level', 1, 100, 1).onChange((level) => {
  shaderMaterial.setUniforms({ u_Level: level });
});
noiseFolder.open();