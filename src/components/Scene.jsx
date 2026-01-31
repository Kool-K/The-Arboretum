import { Canvas } from "@react-three/fiber";
import { useEffect, useMemo } from "react";
import AVLTree from "../utils/AVLTree.js";

const demoValues = [30, 20, 10, 25, 40, 50, 22];

function collectNodes(node, acc = []) {
  if (!node) return acc;
  acc.push(node);
  collectNodes(node.left, acc);
  collectNodes(node.right, acc);
  return acc;
}

export default function Scene() {
  const { nodes } = useMemo(() => {
    const tree = new AVLTree();
    demoValues.forEach((value) => tree.insert(value));
    return { nodes: collectNodes(tree.root) };
  }, []);

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.table(
        nodes.map((node) => ({
          value: node.value,
          height: node.height,
          x: node.position.x,
          y: node.position.y,
          z: node.position.z,
        }))
      );
    }
  }, [nodes]);

  return (
    <div style={{ marginTop: "16px" }}>
      <Canvas style={{ height: 400, background: "#0f172a" }} camera={{ position: [0, 6, 12] }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={0.8} />
        <axesHelper args={[6]} />
        {nodes.map((node) => (
          <mesh key={node.value} position={[node.position.x, node.position.y, node.position.z]}>
            <sphereGeometry args={[0.35, 24, 24]} />
            <meshStandardMaterial color="#7c3aed" />
          </mesh>
        ))}
      </Canvas>
      <p style={{ marginTop: "12px", color: "#334155" }}>
        Demo AVL nodes: {nodes.length}. Open the console to view calculated positions.
      </p>
    </div>
  );
}