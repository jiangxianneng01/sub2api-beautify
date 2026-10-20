/**
 * Type surface for the vendored three.js bundle (`three-solar.js`, three.js r186, MIT).
 *
 * This is a hand-written subset covering what the solar system scene uses. It keeps the
 * project type-checking without `@types/three`; if you switch the bundle back to the npm
 * package (see README.md), delete this file and install `@types/three` instead.
 */

/* ---------------------------------------------------------------- math ---- */

export class Vector2 {
  x: number
  y: number
  constructor(x?: number, y?: number)
  set(x: number, y: number): this
  copy(v: Vector2): this
  clone(): Vector2
}

export class Vector3 {
  x: number
  y: number
  z: number
  constructor(x?: number, y?: number, z?: number)
  set(x: number, y: number, z: number): this
  setScalar(s: number): this
  copy(v: Vector3): this
  clone(): Vector3
  add(v: Vector3): this
  addScaledVector(v: Vector3, s: number): this
  sub(v: Vector3): this
  multiplyScalar(s: number): this
  divideScalar(s: number): this
  normalize(): this
  negate(): this
  length(): number
  lengthSq(): number
  distanceTo(v: Vector3): number
  dot(v: Vector3): number
  cross(v: Vector3): this
  crossVectors(a: Vector3, b: Vector3): this
  lerp(v: Vector3, t: number): this
  lerpVectors(v1: Vector3, v2: Vector3, alpha: number): this
  applyAxisAngle(axis: Vector3, angle: number): this
  applyQuaternion(q: Quaternion): this
  applyMatrix4(m: Matrix4): this
  project(camera: Camera): this
  unproject(camera: Camera): this
  setFromMatrixPosition(m: Matrix4): this
  setFromSpherical(s: Spherical): this
}

export class Spherical {
  radius: number
  phi: number
  theta: number
  constructor(radius?: number, phi?: number, theta?: number)
  set(radius: number, phi: number, theta: number): this
  setFromVector3(v: Vector3): this
  makeSafe(): this
}

export class Euler {
  x: number
  y: number
  z: number
  order: string
  constructor(x?: number, y?: number, z?: number, order?: string)
  set(x: number, y: number, z: number, order?: string): this
}

export class Quaternion {
  x: number
  y: number
  z: number
  w: number
  constructor(x?: number, y?: number, z?: number, w?: number)
  set(x: number, y: number, z: number, w: number): this
  copy(q: Quaternion): this
  setFromEuler(e: Euler): this
  setFromAxisAngle(axis: Vector3, angle: number): this
  multiply(q: Quaternion): this
  slerp(q: Quaternion, t: number): this
}

export class Matrix4 {
  elements: number[]
  constructor()
  identity(): this
  copy(m: Matrix4): this
  compose(position: Vector3, quaternion: Quaternion, scale: Vector3): this
  decompose(position: Vector3, quaternion: Quaternion, scale: Vector3): this
  makeRotationFromQuaternion(q: Quaternion): this
  setPosition(v: Vector3): this
  invert(): this
  multiply(m: Matrix4): this
}

export class Sphere {
  center: Vector3
  radius: number
  constructor(center?: Vector3, radius?: number)
}

export class Box3 {
  min: Vector3
  max: Vector3
  constructor(min?: Vector3, max?: Vector3)
}

export class Frustum {
  constructor()
}

export class Color {
  r: number
  g: number
  b: number
  constructor(color?: number | string | Color)
  constructor(r: number, g: number, b: number)
  set(color: number | string | Color): this
  setRGB(r: number, g: number, b: number): this
  setHSL(h: number, s: number, l: number): this
  setHex(hex: number): this
  getHex(): number
  copy(c: Color): this
  clone(): Color
  multiplyScalar(s: number): this
  lerp(c: Color, t: number): this
}

export const MathUtils: {
  clamp(value: number, min: number, max: number): number
  lerp(a: number, b: number, t: number): number
  damp(a: number, b: number, lambda: number, dt: number): number
  smoothstep(x: number, min: number, max: number): number
  randFloat(low: number, high: number): number
  randFloatSpread(range: number): number
  degToRad(deg: number): number
  radToDeg(rad: number): number
  euclideanModulo(n: number, m: number): number
}

/* ------------------------------------------------------------ constants ---- */

export type Blending = number
export const AdditiveBlending: Blending
export const NormalBlending: Blending

export type Side = number
export const FrontSide: Side
export const BackSide: Side
export const DoubleSide: Side

export type ColorSpace = string
export const SRGBColorSpace: ColorSpace
export const LinearSRGBColorSpace: ColorSpace

export type ToneMapping = number
export const NoToneMapping: ToneMapping
export const ACESFilmicToneMapping: ToneMapping

export type Wrapping = number
export const RepeatWrapping: Wrapping
export const ClampToEdgeWrapping: Wrapping

export type TextureFilter = number
export const NearestFilter: TextureFilter
export const LinearFilter: TextureFilter
export const LinearMipmapLinearFilter: TextureFilter

export type Usage = number
export const StaticDrawUsage: Usage
export const DynamicDrawUsage: Usage

export const PCFSoftShadowMap: number
export const RGBAFormat: number
export const UnsignedByteType: number
export const FloatType: number
export const HalfFloatType: number

/* ------------------------------------------------------------- textures ---- */

export class Texture {
  image: unknown
  colorSpace: ColorSpace
  anisotropy: number
  wrapS: Wrapping
  wrapT: Wrapping
  minFilter: TextureFilter
  magFilter: TextureFilter
  generateMipmaps: boolean
  flipY: boolean
  needsUpdate: boolean
  dispose(): void
}

export class CanvasTexture extends Texture {
  constructor(canvas: HTMLCanvasElement | OffscreenCanvas)
}

export class DataTexture extends Texture {
  constructor(data: ArrayBufferView | null, width: number, height: number, format?: number, type?: number)
}

export class TextureLoader {
  constructor()
  load(url: string, onLoad?: (texture: Texture) => void, onProgress?: undefined, onError?: (err: unknown) => void): Texture
}

/* ------------------------------------------------------------ materials ---- */

export interface MaterialParameters {
  transparent?: boolean
  opacity?: number
  depthWrite?: boolean
  depthTest?: boolean
  blending?: Blending
  side?: Side
  toneMapped?: boolean
  vertexColors?: boolean
  fog?: boolean
}

export class Material {
  transparent: boolean
  opacity: number
  depthWrite: boolean
  depthTest: boolean
  blending: Blending
  side: Side
  toneMapped: boolean
  visible: boolean
  needsUpdate: boolean
  userData: Record<string, unknown>
  dispose(): void
}

export interface IUniform<T = unknown> {
  value: T
}

export interface ShaderMaterialParameters extends MaterialParameters {
  vertexShader?: string
  fragmentShader?: string
  uniforms?: Record<string, IUniform>
  defines?: Record<string, string | number | boolean>
  glslVersion?: string | null
}

export class ShaderMaterial extends Material {
  uniforms: Record<string, IUniform<any>>
  vertexShader: string
  fragmentShader: string
  constructor(parameters?: ShaderMaterialParameters)
}

export interface MeshBasicMaterialParameters extends MaterialParameters {
  color?: number | string | Color
  map?: Texture | null
  wireframe?: boolean
}

export class MeshBasicMaterial extends Material {
  color: Color
  map: Texture | null
  constructor(parameters?: MeshBasicMaterialParameters)
}

export interface MeshStandardMaterialParameters extends MeshBasicMaterialParameters {
  roughness?: number
  metalness?: number
  emissive?: number | string | Color
  emissiveIntensity?: number
  flatShading?: boolean
}

export class MeshStandardMaterial extends Material {
  color: Color
  map: Texture | null
  roughness: number
  metalness: number
  emissive: Color
  emissiveIntensity: number
  constructor(parameters?: MeshStandardMaterialParameters)
}

export class MeshPhongMaterial extends Material {
  color: Color
  constructor(parameters?: MeshBasicMaterialParameters & { shininess?: number; specular?: number | Color })
}

export class MeshLambertMaterial extends Material {
  color: Color
  constructor(parameters?: MeshBasicMaterialParameters)
}

export interface PointsMaterialParameters extends MaterialParameters {
  color?: number | string | Color
  map?: Texture | null
  size?: number
  sizeAttenuation?: boolean
}

export class PointsMaterial extends Material {
  color: Color
  size: number
  constructor(parameters?: PointsMaterialParameters)
}

export interface LineBasicMaterialParameters extends MaterialParameters {
  color?: number | string | Color
  linewidth?: number
}

export class LineBasicMaterial extends Material {
  color: Color
  constructor(parameters?: LineBasicMaterialParameters)
}

export interface SpriteMaterialParameters extends MaterialParameters {
  color?: number | string | Color
  map?: Texture | null
  rotation?: number
  sizeAttenuation?: boolean
}

export class SpriteMaterial extends Material {
  color: Color
  map: Texture | null
  rotation: number
  constructor(parameters?: SpriteMaterialParameters)
}

/* ------------------------------------------------------------ geometry ---- */

export class BufferAttribute {
  array: ArrayLike<number>
  itemSize: number
  count: number
  needsUpdate: boolean
  constructor(array: ArrayLike<number>, itemSize: number, normalized?: boolean)
  setUsage(usage: Usage): this
  getX(index: number): number
  getY(index: number): number
  getZ(index: number): number
  setX(index: number, x: number): this
  setY(index: number, y: number): this
  setZ(index: number, z: number): this
  setXYZ(index: number, x: number, y: number, z: number): this
}

export class Float32BufferAttribute extends BufferAttribute {
  constructor(array: ArrayLike<number> | number, itemSize: number, normalized?: boolean)
}

export class InstancedBufferAttribute extends BufferAttribute {}

export class BufferGeometry {
  attributes: Record<string, BufferAttribute>
  boundingSphere: Sphere | null
  boundingBox: Box3 | null
  constructor()
  setAttribute(name: string, attribute: BufferAttribute): this
  getAttribute(name: string): BufferAttribute
  deleteAttribute(name: string): this
  setIndex(index: BufferAttribute | number[] | null): this
  computeVertexNormals(): void
  computeBoundingSphere(): void
  computeBoundingBox(): void
  rotateX(angle: number): this
  rotateY(angle: number): this
  rotateZ(angle: number): this
  translate(x: number, y: number, z: number): this
  scale(x: number, y: number, z: number): this
  dispose(): void
}

export class SphereGeometry extends BufferGeometry {
  constructor(radius?: number, widthSegments?: number, heightSegments?: number, phiStart?: number, phiLength?: number, thetaStart?: number, thetaLength?: number)
}

export class RingGeometry extends BufferGeometry {
  constructor(innerRadius?: number, outerRadius?: number, thetaSegments?: number, phiSegments?: number, thetaStart?: number, thetaLength?: number)
}

export class TorusGeometry extends BufferGeometry {
  constructor(radius?: number, tube?: number, radialSegments?: number, tubularSegments?: number, arc?: number)
}

export class PlaneGeometry extends BufferGeometry {
  constructor(width?: number, height?: number, widthSegments?: number, heightSegments?: number)
}

export class CylinderGeometry extends BufferGeometry {
  constructor(radiusTop?: number, radiusBottom?: number, height?: number, radialSegments?: number, heightSegments?: number, openEnded?: boolean)
}

export class IcosahedronGeometry extends BufferGeometry {
  constructor(radius?: number, detail?: number)
}

export class DodecahedronGeometry extends BufferGeometry {
  constructor(radius?: number, detail?: number)
}

export class TubeGeometry extends BufferGeometry {
  constructor(path: CatmullRomCurve3, tubularSegments?: number, radius?: number, radialSegments?: number, closed?: boolean)
}

export class CatmullRomCurve3 {
  constructor(points?: Vector3[], closed?: boolean, curveType?: string, tension?: number)
  getPoints(divisions?: number): Vector3[]
  getPoint(t: number, target?: Vector3): Vector3
}

export class EllipseCurve {
  constructor(aX?: number, aY?: number, xRadius?: number, yRadius?: number, aStartAngle?: number, aEndAngle?: number, aClockwise?: boolean, aRotation?: number)
  getPoints(divisions?: number): Vector2[]
}

/* -------------------------------------------------------------- objects ---- */

export class Layers {
  mask: number
  set(channel: number): void
  enable(channel: number): void
  disable(channel: number): void
}

export class Object3D {
  name: string
  position: Vector3
  rotation: Euler
  quaternion: Quaternion
  scale: Vector3
  up: Vector3
  visible: boolean
  frustumCulled: boolean
  renderOrder: number
  matrixAutoUpdate: boolean
  matrixWorld: Matrix4
  layers: Layers
  parent: Object3D | null
  children: Object3D[]
  userData: Record<string, unknown>
  add(...objects: Object3D[]): this
  remove(...objects: Object3D[]): this
  clear(): this
  lookAt(v: Vector3): void
  lookAt(x: number, y: number, z: number): void
  getWorldPosition(target: Vector3): Vector3
  getWorldDirection(target: Vector3): Vector3
  getObjectByName(name: string): Object3D | undefined
  traverse(callback: (object: Object3D) => void): void
  updateMatrixWorld(force?: boolean): void
  updateWorldMatrix(updateParents: boolean, updateChildren: boolean): void
  localToWorld(v: Vector3): Vector3
  worldToLocal(v: Vector3): Vector3
  rotateX(angle: number): this
  rotateY(angle: number): this
  rotateZ(angle: number): this
  rotateOnAxis(axis: Vector3, angle: number): this
  setRotationFromAxisAngle(axis: Vector3, angle: number): void
}

export class Group extends Object3D {
  constructor()
}

export class Scene extends Object3D {
  constructor()
  background: Color | Texture | null
}

export class Mesh<G extends BufferGeometry = BufferGeometry, M extends Material | Material[] = Material | Material[]> extends Object3D {
  geometry: G
  material: M
  constructor(geometry?: G, material?: M)
}

export class InstancedMesh<G extends BufferGeometry = BufferGeometry, M extends Material | Material[] = Material | Material[]> extends Mesh<G, M> {
  count: number
  instanceMatrix: InstancedBufferAttribute
  constructor(geometry: G, material: M, count: number)
  setMatrixAt(index: number, matrix: Matrix4): void
  getMatrixAt(index: number, matrix: Matrix4): void
  setColorAt(index: number, color: Color): void
}

export class Points<G extends BufferGeometry = BufferGeometry, M extends Material = Material> extends Object3D {
  geometry: G
  material: M
  constructor(geometry?: G, material?: M)
}

export class Line<G extends BufferGeometry = BufferGeometry, M extends Material = Material> extends Object3D {
  geometry: G
  material: M
  constructor(geometry?: G, material?: M)
}

export class LineLoop<G extends BufferGeometry = BufferGeometry, M extends Material = Material> extends Line<G, M> {}

export class Sprite extends Object3D {
  material: SpriteMaterial
  constructor(material?: SpriteMaterial)
}

export class Light extends Object3D {
  color: Color
  intensity: number
}

export class PointLight extends Light {
  distance: number
  decay: number
  constructor(color?: number | string | Color, intensity?: number, distance?: number, decay?: number)
}

export class AmbientLight extends Light {
  constructor(color?: number | string | Color, intensity?: number)
}

export class HemisphereLight extends Light {
  constructor(skyColor?: number | string | Color, groundColor?: number | string | Color, intensity?: number)
}

/* -------------------------------------------------------------- cameras ---- */

export class Camera extends Object3D {
  projectionMatrix: Matrix4
  matrixWorldInverse: Matrix4
}

export class PerspectiveCamera extends Camera {
  fov: number
  aspect: number
  near: number
  far: number
  zoom: number
  constructor(fov?: number, aspect?: number, near?: number, far?: number)
  updateProjectionMatrix(): void
  setViewOffset(fullWidth: number, fullHeight: number, x: number, y: number, width: number, height: number): void
  clearViewOffset(): void
}

/* ---------------------------------------------------------- interaction ---- */

export interface Intersection {
  distance: number
  point: Vector3
  object: Object3D
  instanceId?: number
}

export class Raycaster {
  constructor(origin?: Vector3, direction?: Vector3, near?: number, far?: number)
  setFromCamera(coords: Vector2, camera: Camera): void
  intersectObjects(objects: Object3D[], recursive?: boolean): Intersection[]
  intersectObject(object: Object3D, recursive?: boolean): Intersection[]
}

export class Clock {
  constructor(autoStart?: boolean)
  getDelta(): number
  getElapsedTime(): number
}

/* ------------------------------------------------------------- renderer ---- */

export interface WebGLRendererParameters {
  canvas?: HTMLCanvasElement | OffscreenCanvas
  antialias?: boolean
  alpha?: boolean
  powerPreference?: 'high-performance' | 'low-power' | 'default'
  preserveDrawingBuffer?: boolean
  stencil?: boolean
  depth?: boolean
  failIfMajorPerformanceCaveat?: boolean
}

export class WebGLRenderer {
  domElement: HTMLCanvasElement
  toneMapping: ToneMapping
  toneMappingExposure: number
  outputColorSpace: ColorSpace
  capabilities: { getMaxAnisotropy(): number; isWebGL2: boolean }
  info: { render: { calls: number; triangles: number } }
  shadowMap: { enabled: boolean; type: number }
  constructor(parameters?: WebGLRendererParameters)
  setPixelRatio(value: number): void
  setSize(width: number, height: number, updateStyle?: boolean): void
  setClearColor(color: number | string | Color, alpha?: number): void
  render(scene: Object3D, camera: Camera): void
  dispose(): void
  forceContextLoss(): void
}

export class WebGLRenderTarget {
  constructor(width?: number, height?: number, options?: Record<string, unknown>)
  dispose(): void
}

/* ------------------------------------------------------ post-processing ---- */

export class Pass {
  enabled: boolean
  needsSwap: boolean
  renderToScreen: boolean
  setSize(width: number, height: number): void
  dispose(): void
}

export class RenderPass extends Pass {
  constructor(scene: Scene, camera: Camera)
}

export class ShaderPass extends Pass {
  uniforms: Record<string, IUniform<any>>
  material: ShaderMaterial
  constructor(shader: { uniforms: Record<string, IUniform>; vertexShader: string; fragmentShader: string } | ShaderMaterial, textureID?: string)
}

export class UnrealBloomPass extends Pass {
  resolution: Vector2
  strength: number
  radius: number
  threshold: number
  constructor(resolution: Vector2, strength: number, radius: number, threshold: number)
}

export class OutputPass extends Pass {
  constructor()
}

export class EffectComposer {
  passes: Pass[]
  constructor(renderer: WebGLRenderer, renderTarget?: WebGLRenderTarget)
  addPass(pass: Pass): void
  removePass(pass: Pass): void
  setSize(width: number, height: number): void
  setPixelRatio(pixelRatio: number): void
  render(deltaTime?: number): void
  dispose(): void
}

/* ------------------------------------------------------------ lensflare ---- */

export class LensflareElement {
  texture: Texture
  size: number
  distance: number
  color: Color
  constructor(texture: Texture, size?: number, distance?: number, color?: Color)
}

export class Lensflare extends Mesh {
  constructor()
  addElement(element: LensflareElement): void
}

/* --------------------------------------------------------------- controls -- */

export class OrbitControls {
  target: Vector3
  enabled: boolean
  enableDamping: boolean
  dampingFactor: number
  enablePan: boolean
  enableZoom: boolean
  enableRotate: boolean
  rotateSpeed: number
  zoomSpeed: number
  minDistance: number
  maxDistance: number
  minPolarAngle: number
  maxPolarAngle: number
  minAzimuthAngle: number
  maxAzimuthAngle: number
  autoRotate: boolean
  autoRotateSpeed: number
  constructor(camera: Camera, domElement?: HTMLElement)
  update(deltaTime?: number): boolean
  getDistance(): number
  getPolarAngle(): number
  getAzimuthalAngle(): number
  saveState(): void
  reset(): void
  dispose(): void
}

/* -------------------------------------------------------------- shaders ---- */

export const UniformsUtils: {
  clone<T extends Record<string, IUniform>>(uniforms: T): T
  merge(uniforms: Record<string, IUniform>[]): Record<string, IUniform>
}
export const UniformsLib: Record<string, Record<string, IUniform>>
export const ShaderLib: Record<string, { uniforms: Record<string, IUniform>; vertexShader: string; fragmentShader: string }>
