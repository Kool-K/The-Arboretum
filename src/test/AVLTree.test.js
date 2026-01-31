import { describe, expect, it } from "vitest";
import AVLTree from "../utils/AVLTree.js";

function collectByValue(node, map = new Map()) {
  if (!node) return map;
  map.set(node.value, node);
  collectByValue(node.left, map);
  collectByValue(node.right, map);
  return map;
}

describe("AVLTree rotations", () => {
  it("balances a left-left insertion", () => {
    const tree = new AVLTree();
    tree.insert(30);
    tree.insert(20);
    tree.insert(10);

    expect(tree.root.value).toBe(20);
    expect(tree.root.left.value).toBe(10);
    expect(tree.root.right.value).toBe(30);
  });

  it("balances a right-right insertion", () => {
    const tree = new AVLTree();
    tree.insert(10);
    tree.insert(20);
    tree.insert(30);

    expect(tree.root.value).toBe(20);
    expect(tree.root.left.value).toBe(10);
    expect(tree.root.right.value).toBe(30);
  });
});

describe("AVLTree updatePositions", () => {
  it("assigns positions based on depth", () => {
    const tree = new AVLTree();
    [30, 20, 10].forEach((value) => tree.insert(value));

    const nodes = collectByValue(tree.root);
    const root = nodes.get(20);
    const left = nodes.get(10);
    const right = nodes.get(30);

    expect(root.position).toEqual({ x: 0, y: 0, z: 0 });
    expect(left.position).toEqual({ x: -6, y: -2, z: 2 });
    expect(right.position).toEqual({ x: 6, y: -2, z: 2 });
  });
});
