
/* A binary search tree Node has data, pointer
to left child and a pointer to right child */
class Node {
  constructor() {
    this.data = 0;
    this.left = null;
    this.right = null;
  }
}

// A utility function to create a new BST node
function newNode(item) {
  var temp = new Node();
  temp.data = item;
  temp.left = null;
  temp.right = null;
  return temp;
}

/* A utility function to insert a new node with
given key in BST */
function insert(node, key) {
  /* If the tree is empty, return a new node */
  if (node == null) return newNode(key);

  /* Otherwise, recur down the tree */
  if (key < node.data) node.left = insert(node.left, key);
  else if (key > node.data) node.right = insert(node.right, key);

  /* return the (unchanged) node pointer */
  return node;
}

/* Function to count nodes in a binary search tree
using Morris Inorder traversal*/
function size(root) {
  var current, pre;

  // Initialise count of nodes as 0
  var count = 0;

  if (root == null) return count;

  current = root;
  while (current != null) {
    if (current.left == null) {
      // Count node if its left is NULL
      count++;

      // Move to its right
      current = current.right;
    } else {
      /* Find the inorder predecessor of current */
      pre = current.left;

      while (pre.right != null && pre.right != current) pre = pre.right;

      /* Make current as right child of its
            inorder predecessor */
      if (pre.right == null) {
        pre.right = current;
        current = current.left;
      } else {
        /* Revert the changes made in if part to
            restore the original tree i.e., fix
            the right child of predecessor */
        pre.right = null;

        // Increment count if the current
        // node is to be visited
        count++;
        current = current.right;
      } /* End of if condition pre->right == NULL */
    } /* End of if condition current->left == NULL*/
  } /* End of while */

  return count;
}
function getDepth(root) {
  if (root == null) return 0;
  return Math.max(getDepth(root.left), getDepth(root.right)) + 1;
}


function getMedian(root) {
  const initialRootSize = size(root);
  var removedFromRight = 0;
  var removedFromLeft = 0;
  const depth = getDepth(root); //root.depth();
  var median;
  var rightNode, leftNode;
  var rightSize, leftSize;
  var i;
  for (i = 0; i < depth; i++) {
    rightNode = root?.right;
    leftNode = root?.left;
    // console.log(rightNode, leftNode);
    rightSize = size(rightNode) || 0;
    leftSize = size(leftNode) || 0;

    if (removedFromRight + rightSize > (initialRootSize - 1) / 2) {
      removedFromLeft = removedFromLeft + (1 + leftSize);
      root = rightNode;
    } else if (removedFromLeft + leftSize > (initialRootSize - 1) / 2) {
      removedFromRight = removedFromRight + (1 + rightSize);
      root = leftNode;
    } else {
      // removedFromRight + rightSize == (initialRootSize - 1) / 2 &&
      // removedFromLeft + leftSize == (initialRootSize - 1) / 2;
      median = root.data;
      return median;
    }
  }
}
// Driver program to test the getMedian function
const permNums = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
  180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320,
  330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470,
  480, 490, 500,
];
var trueCount = 0;
var falseCount = 0;
let nums = [];
var testRoot = null;

while (trueCount !== 1000000 && falseCount !== 5) {
  nums = permNums.sort((a, b) => 0.5 - Math.random());
  var median = -1;
  testRoot = insert(testRoot, nums.pop());

  while (nums.length != 0) {
    insert(testRoot, nums.pop());
  }

  median = getMedian(testRoot);
  if (median == 250) {
    trueCount++;
  } else {
    console.log(median);
    falseCount++;
  }
//   testRoot = null;
}
console.log(trueCount, falseCount);
var root = null;

root = insert(root, 60);
insert(root, 20);
insert(root, 70);
insert(root, 30);
insert(root, 80);
insert(root, 40);
insert(root, 50);
console.log("Median of BST is " + getMedian(root));

root = null;
root = insert(root, 2);
insert(root, 1);

insert(root, 7);
insert(root, 6);

insert(root, 8);
insert(root, 9);
insert(root, 4);
insert(root, 3);
insert(root, 5);

console.log("Median of BST is " + getMedian(root));
