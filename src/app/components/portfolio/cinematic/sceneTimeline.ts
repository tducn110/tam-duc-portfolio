import gsap from "gsap";
import type * as THREE from "three";

interface FlightTimelineParams {
  camera: THREE.PerspectiveCamera;
  ship: THREE.Group;
  rings: THREE.Group;
  stars: THREE.Points;
}

export function createFlightSceneTimeline({
  camera,
  ship,
  rings,
  stars,
}: FlightTimelineParams) {
  const timeline = gsap.timeline({ defaults: { ease: "none" } });

  timeline
    .to(camera.position, { x: 0.65, y: 0.25, z: 6.2, duration: 1 }, 0)
    .to(ship.position, { x: 1.35, y: 0.2, z: 0.3, duration: 1 }, 0)
    .to(ship.rotation, { x: -0.22, y: Math.PI * 0.85, z: 0.16, duration: 1 }, 0)
    .to(rings.rotation, { y: Math.PI * 1.4, z: Math.PI * 0.18, duration: 1 }, 0)
    .to(stars.rotation, { y: Math.PI * 0.45, x: Math.PI * 0.08, duration: 1 }, 0)
    .to(camera.position, { x: -0.55, y: 0.45, z: 4.6, duration: 1 }, 1)
    .to(ship.position, { x: 1.95, y: -0.05, z: -0.4, duration: 1 }, 1)
    .to(ship.rotation, { x: 0.12, y: Math.PI * 1.55, z: -0.1, duration: 1 }, 1)
    .to(rings.rotation, { y: Math.PI * 2.8, z: -Math.PI * 0.16, duration: 1 }, 1)
    .to(stars.rotation, { y: Math.PI * 0.9, x: Math.PI * 0.16, duration: 1 }, 1);

  return timeline;
}
