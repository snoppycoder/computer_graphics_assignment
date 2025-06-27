import * as THREE from "three";

export function createEllipseOrbitLine(a, b, segments = 128, color = 0xffffff) {
  const points = [];

  for (let i = 0; i <= segments; i++) {
    const theta = (i / segments) * Math.PI * 2;
    const x = a * Math.cos(theta);
    const z = b * Math.sin(theta);
    points.push(new THREE.Vector3(x, 0, -z));
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({ color });
  const ellipse = new THREE.LineLoop(geometry, material);

  return ellipse;
}
