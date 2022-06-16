'''
Given: Suppose that a binary search tree (BST) T has m nodes, all distinct, and of depth
d, where m is an odd number. Note that T is not necessarily full. As defined in
the class, the depth of a tree T is the maximum of the depths of all the nodes in T,
where the depth of a node is the number of edges that must be crossed to travel from
that node to the root of the tree. Additionally suppose that each node of B has a
property size where node.size is the number of nodes in the subtree for which node
is the root. For example, if r is the root node of B, then r.size = m because the tree
with root r is B and B has m nodes. For any node n with no child nodes, we have
n.size = 1 since the subtree with root n contains only the node n. The following tree
can be labeled with size as below:

Problem: Design an efficient algorithm which runs in O(d) time that finds a node median
of B so that the number of nodes with value smaller than the value of median equals
the number of nodes with value larger than the value of median. In other words,
find the median-valued node of T (note that since the number of nodes m of the tree
T is odd, there is exactly one median-valued node). Prove the correctness of your
algorithm and analyze its running time.
'''

#pseudocode:
'''
r = root node of BST
n = r.
d = depth of BST



get size of root node
get size of left subtree
get size of right subtree
check which subtree is larger
largerTree
'''

#code:

from lib2to3.pytree import Node


r = Node(2)
r.left = Node(1)
r.right = Node(3)

