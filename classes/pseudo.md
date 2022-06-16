code:
```javascript
function getMedian(root) {
  const initialRootSize = size(root);
  var removedFromRight = 0;
  var removedFromLeft = 0;
  const depth = getDepth(root); //root.depth();
  var median;
  var rightNode, leftNode;
  var rightSize, leftSize;
  var i;
  for (i = 0; i < depth; i++) { // loop through each level
    rightNode = root.right;
    leftNode = root.left;
    // console.log(rightNode, leftNode);
    rightSize = rightNode.size() || 0;
    leftSize = leftNode.size() || 0;

    if (removedFromRight + rightSize > (initialRootSize - 1) / 2) {
      // if the sum of the size of right side of the node and the number of removed nodes from the right side is greater than the left side's sum:
      root = rightNode; // set the root to the right side of the node
      removedFromLeft = removedFromLeft + (1 + leftSize); // add the number of nodes in the left side of the node to the number of removed nodes from the left side
    } else if (removedFromLeft + leftSize > (initialRootSize - 1) / 2) {
      // if the sum of the size of left side of the node and the number of removed nodes from the left side is greater than the right side's sum:
      root = leftNode; // set the root to the left side of the node
      removedFromRight = removedFromRight + (1 + rightSize); // add the number of nodes in the right side of the node to the number of removed nodes from the right side
    } else { // if the sum of the size of left side of the node and the number of removed nodes from the left side is equal to the right side's sum:
      // removedFromRight + rightSize == (initialRootSize - 1) / 2 &&
      // removedFromLeft + leftSize == (initialRootSize - 1) / 2;
      median = root.value; // set the median to the root's data
      return median; // return the median
    }
  }
}
```
pseudocode:
function getMedian(root)
    initialRootSize = root.size()
    removedFromRight = 0
    removedFromLeft = 0
    depth = getDepth(root)
    median
    rightNode, leftNode
    rightSize, leftSize
    i
    for i = 0 to depth
        rightNode = root.right
        leftNode = root.left
        rightSize = rightNode.size(), 0 if rightNode is null
        leftSize = leftNode.size(), 0 if leftNode is null
        if removedFromRight + rightSize > (initialRootSize - 1) / 2
            root = rightNode
            removedFromLeft = removedFromLeft + (1 + leftSize)
        else if removedFromLeft + leftSize >(initialRootSize - 1) / 2
            root = leftNode
            removedFromRight = removedFromRight + (1 + rightSize)
        else
            median = root.value
            return median
    end
