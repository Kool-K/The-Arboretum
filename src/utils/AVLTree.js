class AVLNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.position = { x: 0, y: 0, z: 0 };
  }
}

export default class AVLTree {
  constructor() {
    this.root = null;
  }

  height(node) {
    return node ? node.height : 0;
  }

  getBalance(node) {
    return node ? this.height(node.left) - this.height(node.right) : 0;
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = 1 + Math.max(this.height(y.left), this.height(y.right));
    x.height = 1 + Math.max(this.height(x.left), this.height(x.right));

    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = 1 + Math.max(this.height(x.left), this.height(x.right));
    y.height = 1 + Math.max(this.height(y.left), this.height(y.right));

    return y;
  }

  insert(value) {
    this.root = this._insertNode(this.root, value);
    this.updatePositions(this.root, 0, 0);
  }

  _insertNode(node, value) {
    if (!node) {
      return new AVLNode(value);
    }

    if (value < node.value) {
      node.left = this._insertNode(node.left, value);
    } else if (value > node.value) {
      node.right = this._insertNode(node.right, value);
    } else {
      return node;
    }

    node.height = 1 + Math.max(this.height(node.left), this.height(node.right));

    const balance = this.getBalance(node);

    if (balance > 1 && value < node.left.value) {
      return this.rightRotate(node);
    }

    if (balance < -1 && value > node.right.value) {
      return this.leftRotate(node);
    }

    if (balance > 1 && value > node.left.value) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }

    if (balance < -1 && value < node.right.value) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  updatePositions(node, depth, xOffset) {
    if (!node) return;

    const spacingX = 2;
    const spacingY = 2;
    const spacingZ = 2;

    node.position.x = xOffset * spacingX;
    node.position.y = -depth * spacingY;
    node.position.z = depth * spacingZ;

    const childOffset = Math.max(1, 3 - depth);

    this.updatePositions(node.left, depth + 1, xOffset - childOffset);
    this.updatePositions(node.right, depth + 1, xOffset + childOffset);
  }
}