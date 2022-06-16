/* JavaScript program to find
the median of BST in O(n)
time and O(1) space*/

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

/* Function to find median in O(n) time and O(1) space
using Morris Inorder traversal*/
function findMedian(root) {
  /*
pseudocode:
r = root node of BST
initialRootSize = r.size()
removedFromRight = 0
removedFromLeft = 0
depth = r.depth()
if r.size() == 3:
    return r.value()
for i in range(depth):
    right = r.right
    left = r.left
    rightSize = right.size() (returns 0 if right is None)
    leftSize = left.size() (returns 0 if left is None)
    if removedFromRight == (initialRootSize/2 - 1):
        if removedFromLeft == removedFromRight):
            return r.value()
        elif removedFromLeft == 0:
            return r.value()
        else:
            return r.right.value()
    elif removedFromLeft == (initialRootSize/2 - 1):
        if removedFromRight == removedFromLeft:
            return r.value()
        elif removedFromRight == 0:
            return r.value()
        else:
            return r.left.value()

    if rightSize > leftSize or leftSize == 0:
        rootSize -= (leftSize + 1)
        removedFromLeft += (1 + leftSize)

        r = right
    elif rightSize < leftSize or rightSize == 0:
        rootSize -= (rightSize + 1)
        removedFromRight += (1 + rightSize)
        r = left
*/
  var rootSize = size(root);
  var removedFromRight = 0;
  var removedFromLeft = 0;
  var depth = getDepth(root); //root.depth();
  var initialRootSize = rootSize;
  var median = root.data;
  var rightNode, leftNode;
  var rightSize, leftSize;
  var i;
  for (i = 0; i < depth; i++) {
    rightNode = root?.right;
    leftNode = root?.left;
    // console.log(rightNode, leftNode);
    rightSize = size(rightNode) || 0;
    leftSize = size(leftNode) || 0;
    // console.log(leftSize, rightSize);
    if (removedFromRight >= (initialRootSize - 1) / 2) {
      // console.log(removedFromLeft, removedFromRight, median, "right");
      if (removedFromLeft == removedFromRight) {
        median = root.data;
        return median;
      } else if (removedFromLeft == 0 || removedFromLeft == 1) {
        if (rightSize == 0) return root.data;
        else return rightNode.data;
      } else {
        median = root.right.data;
        return median;
      }
    } else if (removedFromLeft >= (initialRootSize - 1) / 2) {
      // console.log(removedFromLeft, removedFromRight, root.data, "left");

      if (removedFromRight == removedFromLeft) {
        median = root.data;
        return median;
      } else if (removedFromRight == 0 || removedFromRight == 1) {
        if (leftSize == 0) {
          median = root.data;
          return median;
        } else {
          median = root.left.data;
          return median;
        }
      } else {
        median = root.left.data;
        return median;
      }
    }
    if (
      rightSize == leftSize + 1 &&
      removedFromLeft == 1 &&
      removedFromRight == 0
    ) {
      median = root.data;
      return median;
    } else if (
      rightSize == leftSize - 1 &&
      removedFromLeft == 0 &&
      removedFromRight == 1
    ) {
      median = root.data;
      return median;
    } else if (rightSize > leftSize || leftSize == 0) {
      rootSize = size(rightNode) || 0;
      removedFromLeft = removedFromLeft + (1 + leftSize);
      root = rightNode;
    } else if (rightSize < leftSize || rightSize == 0) {
      rootSize = size(leftNode) || 0;
      removedFromRight = removedFromRight + (1 + rightSize);
      root = leftNode;
    } else {
      //rightSize == leftSize
      if (removedFromRight == removedFromLeft) {
        median = root.data;
        return median;
      } else if (removedFromRight > removedFromLeft) {
        median = root.right.data;
        return median;
      } else {
        median = root.left.data;
        return median;
      }

      //    else if ((removedFromLeft == 0 && removedFromRight == 1) || (removedFromLeft == 1 && removedFromRight == 0)) {
      //     median = root.data;
      //     return median;
      //   } else {
      //     median = root.data;
      //     return median;
      //   }
    }
    // console.log(rootSize, removedFromLeft, removedFromRight);
  }
  // console.log(median);
  return median;
}

function getMedian(root) {
  var rootSize = size(root);
  var removedFromRight = 0;
  var removedFromLeft = 0;
  var depth = getDepth(root); //root.depth();
  var initialRootSize = rootSize;
  var median = root.data;
  var rightNode, leftNode;
  var rightSize, leftSize;
  var i;
  for (i = 0; i < depth; i++) {
    rightNode = root?.right;
    leftNode = root?.left;
    // console.log(rightNode, leftNode);
    rightSize = size(rightNode) || 0;
    leftSize = size(leftNode) || 0;

    if (
      removedFromRight + rightSize == (initialRootSize - 1) / 2 &&
      removedFromLeft + leftSize == (initialRootSize - 1) / 2
    ) {
      median = root.data;
      return median;
    } else if (removedFromRight + rightSize > (initialRootSize - 1) / 2) {
      median = root.right.data;
      rootSize = size(rightNode) || 0;
      removedFromLeft = removedFromLeft + (1 + leftSize);
      root = rightNode;
    } else if (removedFromLeft + leftSize > (initialRootSize - 1) / 2) {
      median = root.left.data;
      rootSize = size(leftNode) || 0;
      removedFromRight = removedFromRight + (1 + rightSize);
      root = leftNode;
    }
  }

  return median;
}

//     if (rightSize == leftSize) {
//       if (removedFromRight == removedFromLeft) {
//         median = root.data;
//         return median;
//       } else if (removedFromRight > removedFromLeft) {
//         median = root.right?.data;
//         rootSize = size(rightNode) || 0;
//         removedFromLeft = removedFromLeft + (1 + leftSize);
//         root = rightNode;
//       } else {
//         median = root.left?.data;
//         rootSize = size(leftNode) || 0;
//         removedFromRight = removedFromRight + (1 + rightSize);
//         root = leftNode;
//       }
//     } else if (rootSize - 1 == removedFromLeft - removedFromRight) {
//       if (removedFromRight == leftSize || removedFromLeft == rightSize) {
//         median = root.data;
//         return median;
//       } else {
//         //removedFromLeft > rightSize
//         median = root.left?.data; // || root?.left.data || root.data;
//         return median;
//       }
//     } else if (rootSize - 1 == removedFromRight - removedFromLeft) {
//       if (removedFromRight == leftSize || removedFromLeft == rightSize) {
//         median = root.data;
//         return median;
//       } else {
//         median = root.right?.data; // || root?.left.data || root.data;
//         return median;
//       }
//     } else if (rightSize > leftSize || leftSize == 0) {
//       rootSize = size(rightNode) || 0;
//       removedFromLeft = removedFromLeft + (1 + leftSize);
//       root = rightNode;
//     } else if (rightSize < leftSize || rightSize == 0) {
//       rootSize = size(leftNode) || 0;
//       removedFromRight = removedFromRight + (1 + rightSize);
//       root = leftNode;
//     }
//   }
//   // console.log(median);
//   return median;
// }

// if (root == null)
//         return 0;

//     var count = size(root);
//     var currCount = 0;
//     var current = root, pre = null, prev = null;

//     while (current != null)
//     {
//         if (current.left == null)
//         {
//             // count current node
//             currCount++;

//             // check if current node is the median
//             // Odd case
//             if (count % 2 != 0 &&
//             currCount == (count+1)/2)
//                 return prev.data;

//             // Even case
//             else if (count % 2 == 0 &&
//             currCount == (count/2)+1)
//                 return (prev.data + current.data)/2;

//             // Update prev for even no. of nodes
//             prev = current;

//             //Move to the right
//             current = current.right;
//         }
//         else
//         {
//             /* Find the inorder predecessor of current */
//             pre = current.left;
//             while (pre.right != null &&
//             pre.right != current)
//                 pre = pre.right;

//             /* Make current as right child of its
//             inorder predecessor */
//             if (pre.right == null)
//             {
//                 pre.right = current;
//                 current = current.left;
//             }

//             /* Revert the changes made in if
//             part to restore the original
//             tree i.e., fix the right child of predecessor */
//             else
//             {
//                 pre.right = null;

//                 prev = pre;

//                 // Count current node
//                 currCount++;

//                 // Check if the current node is the median
//                 if (count % 2 != 0 &&
//                 currCount == (count+1)/2 )
//                     return current.data;

//                 else if (count%2==0 &&
//                 currCount == (count/2)+1)
//                     return (prev.data+current.data)/2;

//                 // update prev node for the case of even
//                 // no. of nodes
//                 prev = current;
//                 current = current.right;

//             } /* End of if condition pre->right == NULL */
//         } /* End of if condition current->left == NULL*/
//     } /* End of while */
//     return -1;
// }

/* Driver code*/

/* Let us create following BST
             50
             / \
            30 70
            / \ / \
          20 40 60 80 
          
          40
          /     \
        30         80
        /        /
       20     50
             / \
            60 70
            

          
          */

const permNums = [
  0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170,
  180, 190, 200, 210, 220, 230, 240, 250, 260, 270, 280, 290, 300, 310, 320,
  330, 340, 350, 360, 370, 380, 390, 400, 410, 420, 430, 440, 450, 460, 470,
  480, 490, 500,
];
var trueCount = 0;
var falseCount = 0;
let nums = [];
let testRoot = null;

while (trueCount !== 100 && falseCount !== 5) {
  nums = permNums.sort((a, b) => 0.5 - Math.random());
  var median = -1;
  testRoot = insert(testRoot, nums.pop());
  console.log(testRoot);

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
