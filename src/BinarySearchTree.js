class Node {
  constructor(value, data) {
    this.value = value
    this.data = data
    this.left = null
    this.right = null
    this.parent = null
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null
    this.size = 0
  }

  insert(value, data) {
    this.size++

    const node = new Node(value, data)

    if (this.root === null) {
      this.root = node
    }
    else {
      this.insertNode(this.root, node)
    }
  }

  insertNode(node, newNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode
        newNode.parent = node
      }
      else {
        this.insertNode(node.left, newNode)
      }
    }
    else {
      if (node.right === null) {
        node.right = newNode
        newNode.parent = node
      }
      else {
        this.insertNode(node.right, newNode)
      }
    }
  }

  remove(data) {
    const node = this.findNodeByData(data)
    const side = node.parent.left === node ? 'left' : 'right'

    console.log('remove', node)

    if (node === this.root) {
      
    }

    // Deleting node without children
    if (node.left === null && node.right === null) {
      node.parent[side] = null
      return
    }

    // Deleting node with one children
    if (node.left === null) {
      node.parent[side] = node.right
      return
    }
    else if (node.right === null) {
      node.parent[side] = node.left
      return
    }

    // Deleting node with two children
    // minumum node of the right subtree
    // is stored in minNode
    const minNode = this.findMinNode(node.right)
    node.value = minNode.value
    node.data = minNode.data

    if (minNode.parent.left === minNode) minNode.parent.left = null
    else minNode.parent.right = null
  }

  findNodeByData(data, node = this.root) {
    if (node.data === data) return node

    if (node.left !== null) {
      const nextNode = this.findNodeByData(data, node.left)
      if (nextNode !== null) return nextNode
    }
    if (node.right !== null) {
      const nextNode = this.findNodeByData(data, node.right)
      if (nextNode !== null) return nextNode
    }

    return null
  }

  findMinNode(node) {
    console.log('findMinNode', node)
    // if left of a node is null
    // then it must be minimum node
    return node.left === null ? node : this.findMinNode(node.left)
  }

  traverse(fn, node = this.root) {
    if (node !== null) {
      this.traverse(fn, node.left)
      fn(node.data)
      this.traverse(fn, node.right)
    }
  }
}

let bst = new BinarySearchTree()

bst.insert(4,4)
bst.insert(2,2)
bst.insert(17,17)
bst.insert(15, 15)
bst.insert(3,3)
bst.insert(9,9)
bst.insert(12,12)
bst.insert(1,1)

console.log(bst)