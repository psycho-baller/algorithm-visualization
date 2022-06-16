    r = root node of BST
    m = number of nodes in BST
    d = depth of BST
    s = size of BST
    h = height of BST
    a = average depth of BST
    b = balance factor of BST
    c = number of nodes in left subtree
    d = number of nodes in right subtree
    e = number of nodes in left subtree of left subtree
    f = number of nodes in right subtree of left subtree
    g = number of nodes in left subtree of right subtree
    h = number of nodes in right subtree of right subtree

    #######################################################

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

3 and im in 4

get size of root node
get size of left subtree
get size of right subtree
check which subtree is larger
largerTree