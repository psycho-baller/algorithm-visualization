# HashTable implementation

I decided to create an interactive website for the first part of the Assignment, here's the link: https://hashmap-implementation.vercel.app/

# Get Median from a BST in O(d) time

## Code

```javascript
/**
 * precondition: the Binary Search Tree is not empty and all values are unique and there are an odd number of values
 * postcondition: the median is returned and the tree is unchanged with runtime O(d) where d is the depth of the tree
 */
function getMedian(root) {
  const initialRootSize = root.size();
  var removedFromRight = 0;
  var removedFromLeft = 0;
  const depth = root.depth() || 0;
  var median;
  var rightNode, leftNode;
  var rightSize, leftSize;
  var i;
  if (root == null || initialRootSize % 2 == 0) {
      throw new Error("U should satisfy the precondition");
  for (i = 0; i < depth; i++) {
    // loop through each depth level of the tree until the median is found or reach the leaf node
    rightNode = root.right; // get the right child of the current root
    leftNode = root.left; // get the left child of the current root
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
    } else {
      // if the sum of the size of left side of the node and the number of removed nodes from the left side is equal to the right side's sum:
      // removedFromRight + rightSize == (initialRootSize - 1) / 2 &&
      // removedFromLeft + leftSize == (initialRootSize - 1) / 2;
      median = root.value; // set the median to the root's data
      return median; // return the median
    }
  }
}
```

## Pseudocode

```pseudocode
function getMedian(root)
    initialRootSize = root.size()
    removedFromRight = 0
    removedFromLeft = 0
    depth = root.depth(), 0 if root is null
    if root == null or initialRootSize % 2 == 0
        throw new Error("The root is null")
    for i = 0 to depth
        rightNode = root.right
        leftNode = root.left
        rightSize = rightNode.size(), 0 if rightNode is null
        leftSize = leftNode.size(), 0 if leftNode is null
        if removedFromRight + rightSize > (initialRootSize - 1) / 2
            root = rightNode
            removedFromLeft = removedFromLeft + (1 + leftSize)
        else if removedFromLeft + leftSize > (initialRootSize - 1) / 2
            root = leftNode
            removedFromRight = removedFromRight + (1 + rightSize)
        else
            median = root.value
            return median
    end
end
```

## More Descriptive Pseudocode

```pseudocode
1. get the depth of the tree, 0 if the tree is empty
2. if the tree is empty or the size of the initial root tree is even
  2.1 throw an error
3. loop through each depth level of the tree until the median is found or reach the leaf node
  3.1 get the right child of the current root
  3.2 get the left child of the current root
  3.3 get the size of the right child
  3.4 get the size of the left child
  3.5 if the sum of the size of right side of the node and the number of removed nodes from the right side is greater than the left side's sum:
    3.5.1 set the root to the right side of the node
    3.5.2 add the number of nodes in the left side of the node to the number of removed nodes from the left side
  3.6 if the sum of the size of left side of the node and the number of removed nodes from the left side is greater than the right side's sum:
    3.6.1 set the root to the left side of the node
    3.6.2 add the number of nodes in the right side of the node to the number of removed nodes from the right side
  3.7 if the sum of the size of left side of the node and the number of removed nodes from the left side is equal to the right side's sum:
    3.7.1 set the median to the root's data
    3.7.2 return the median
  end
end
```

## Proof of Correctness

PS: Through inspection of the code, you can see that the algorithm's for loop basically acts as a recursive function. So I decided to prove it by induction which is mostly used for recursive algorithms.

**Claim**: Suppose this binary search tree satisfies the Binary Search Tree Dictionary Invariant and the precondition is satisfied.

- If the getMedian method is called with a (possibly null) node 'root' in this binary search tree, then this execution of this method ends.
- Furthermore, if either root is null, or not null but it doesn't satisfy the preconditions(Ex: root.size is even), then an Error is thrown
- On the other hand, if it does satisfy the precondition, then the median is returned as output.

**Proof**: By induction on the depth d of the subtree with root 'root' as input. The strong form of mathematical induction will be used, and the case that d = 0 (if root is null) will be considered in the basis.

**Base Case**: If root is null (d == 0),  then the execution of the algorithm ends after the execution of the if statement before the for loop with an Error being thrown, as required to establish the claim.

**Inductive Step**: let l be an integer such that l >= 0. It is necessary and sufficient to use the following Inductive Hypothesis to prove the following Inductive Claim:

  - **Inductive Hypothesis**: If the binary search tree satisfies the Binary Search Tree Dictionary Invariant and the preconditions are satisfied when the getMedian method is called with a node 'r' in this binary search tree, such that the depth of the subtree with root 'r' is at most l (0 <= d <= l)
  - then the execution of the for loop of the getMedian method eventually ends which ends the method itself. Furthermore, if either r is null, or not null but it doesn't satisfy the preconditions(Ex: r.size is even), or the node is null, then an Error is thrown, otherwise the median is returned as output.

  **Inductive Claim**(next iteration of the for loop): If the binary search tree satisfies the Binary Search Tree Dictionary Invariant and the preconditions are satisfied when the getMedian method is called with a node 'r' in this binary search tree, such that the depth of the subtree with root 'r' has depth l + 1.
  - then the execution of the for loop of the getMedian method eventually ends which ends the method itself. Furthermore, if either r is null, or not null but it doesn't satisfy the preconditions(Ex: r.size is even), or the node is null, then an Error is thrown, otherwise the median is returned as output.

With that in mind, suppose the binary search tree satisfies the Binary Search Tree Dictionary Invariant and the preconditions are satisfied when the getMedian method is called with a node 'r' in this binary search tree, such that the depth of the subtree with root 'r' is l + 1. Since l >= 0, and l = l + 1 >= 0 + 1 Therefore, l >= 1. Then the root 'r' cannot be null.

Let the following be the execution of the getMedian method with the root 'r' as a parameter, We have 3 possible cases when one iteration of the for loop is executed:

 1. The sum of the size of right side of the node and the number of removed nodes from the right side is greater than the left side's sum (then the median is in the right side of the node):

  a. It follows by the Binary Search Tree Dictionary Invariant and my expertise in making algorithms, that if the subtree with root r has a value of k, then we know the median is located somewhere in the right subtree of the tree with root r.

  b. Let 'right' be the right child of r which is either null or a non-empty subtree.

  c. Now the subtree with root 'right' has a depth  at most l and it follows, by the Inductive Hypothesis, that an execution of the for loop with the root 'right' will eventually end. Furthermore, either right is null, or not null but it doesn't satisfy the preconditions(Ex: right.size is even), or the node is null, then an Error is thrown, otherwise the median is returned as output.

  d. Since the  execution of the for loop with the root 'right' eventually ends, and (in the next iteration of the loop) either a median is returned or a new subtree takes on the role of the root, we can conclude that the execution of the for loop with the root 'r' eventually ends. which ends the method itself. This establishes the Inductive Claim.

2. The sum of the size of left side of the node and the number of removed nodes from the left side is greater than the right side's sum (then the median is located somewhere in the left subtree of the tree with root r):

  a. This case is almost the same as the previous case, where we have to use the Binary Search Tree Dictionary Invariant and my expertise in making algorithms to prove the claim, if the subtree with root r has a value of k, then we know the median is located somewhere in the left subtree of the tree with root r.

  b. Since the execution of the for loop with the root 'left' eventually ends, and (in the next iteration of the loop) either a median is returned or a new subtree takes on the role of the root, we can conclude that the execution of the for loop with the root 'r' eventually ends. which ends the method itself. This establishes the Inductive Claim too.

3. The sum of the size of left side of the node and the number of removed nodes from the left side is equal to the right side's sum:

  a. In this case the median is the root's data and we can see that the root's data is returned, the loop and getMedian method are terminated. Which ends the method itself. Which establishes the Inductive Claim.

Since the Inductive Claim has been established in every case this completes the Inductive Step and the proof of the claim. One can see by inspection of the code that this does not change this binary search tree or have other undesired side-effects, so that it correctly solves the getMedian algorithm.

## Runtime Analysis

For the getMedian algorithm, we are trying to prove that the algorithm's time complexity is O(d) where d is the depth of the tree. To do that, we will first start by finding the runtime of the algorithm (number of steps) at it's worst case (longest time)

- The worst case for this algorithm (while satisfying the precondition) is when the median node is located at the leaf node of the tree.
- After the initialization of a couple of variables, the algorithm will loop through each depth level of the tree until the median is found or reach the leaf node.
- We have established a loop invariant on the for loop.
- when we enter the for loop, we initialize a couple of variables that have a runtime of O(1).
- now looking at the if statements, we can see the each loop will either:
  - return an error and end the method if the root is null (if it doesn't satisfy the precondition)
  - set the root to the right side of the node (one step closer to the leaf node)
  - set the root to the left side of the node (one step closer to the leaf node)
  - set the median to the root's value and return the median (ends the loop and returns the median)
- Now at it's worst case, the algorithm will loop a depth amount of times and we know that each for loop takes us one step closer to the leaf node until we reach the leaf node.
- At this point the loop will terminate since it would not satisfy the first 2 if statements, so the else is executed (which is when:
- removedFromRight + rightSize == (initialRootSize - 1) / 2
- removedFromLeft + leftSize == (initialRootSize - 1) / 2
 ) 
 and the algorithm will return the leaf node's value which is the median.

So, since the algorithm either gets one step closer to the leaf node or returns the median, the algorithm will terminate, and in the worst case, it will take Xd + Y steps to terminate

Now we will show that Xd + Y ε O(d) through the limit test:

Let T(d) = the time complexity of the algorithm at depth d = Xd + Y.
Let g(d) = d.

lim(d -> +inf)[ T(d) / g(d)] = lim(d -> +inf)[ (Xd + Y) / d] = lim(d -> +inf)[(Xd / d) + (Y / d)] = lim(d -> +inf)[X + (Y / d)] = X (since d approaches +inf, Y/d approaches 0 which leaves us with X where X is a constant)

since X is a real constant, this suffices to prove that the runtime of getMedian is in fact O(d)