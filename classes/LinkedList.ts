// Source: https://dev.to/glebirovich/typescript-data-structures-linked-list-3o8i
export class Node<T> {
  public next: Node<T> | null = null;
  public prev: Node<T> | null = null;
  constructor(public data: T) {}
}
interface ILinkedList<T> {
  insertInBegin(data: T): Node<T>;
  insertAtEnd(data: T): Node<T>;
  deleteNode(node: Node<T>): void;
  traverse(): T[];
  size(): number;
  search(comparator: (data: T) => boolean): Node<T> | null;
}

export class LinkedList<T> implements ILinkedList<T> {
  private head: Node<T> | null = null;

  public insertAtEnd(data: T): Node<T> {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      const getLast = (node: Node<T>): Node<T> => {
        return node.next ? getLast(node.next) : node;
      };

      const lastNode = getLast(this.head);
      node.prev = lastNode;
      lastNode.next = node;
    }
    return node;
  }

  public insertInBegin(data: T): Node<T> {
    const node = new Node(data);
    if (!this.head) {
      this.head = node;
    } else {
      this.head.prev = node;
      node.next = this.head;
      this.head = node;
    }
    return node;
  }

  public deleteNode(node: Node<T>): void {
    if (!node.prev) {
      this.head = node.next;
    } else {
      const prevNode = node.prev;
      prevNode.next = node.next;
    }
  }
  public remove(value: T): Node<T> | null {
    const node = this.search((data: T) => data === value);
    if (node) {
      this.deleteNode(node);
      return node;
    }
    console.log("Node not found");
    return null;
  }

  public search(comparator: (data: T) => boolean): Node<T> | null {
    const checkNext = (node: Node<T>): Node<T> | null => {
      if (comparator(node.data)) {
        return node;
      }
      return node.next ? checkNext(node.next) : null;
    };

    return this.head ? checkNext(this.head) : null;
  }

  public traverse(): T[] {
    const array: T[] = [];
    if (!this.head) {
      return array;
    }

    const addToArray = (node: Node<T>): T[] => {
      array.push(node.data);
      return node.next ? addToArray(node.next) : array;
    };
    return addToArray(this.head);
  }

  public size(): number {
    return this.traverse().length;
  }

  public toString(): string {
    return this.traverse().toString();
  }

  //   public reverse(): void {
  //     if (!this.head) {
  //       return;
  //     }
  //     let current = this.head;
  //     let prev = null;
  //     while (current) {
  //         const next = current.next;
  //         current.next = prev;
  //         prev = current;
  //         current = next;
  //         }
  //     this.head = prev;

  //   }
  // }
  public hasNext(): boolean {
    return this.head?.next ? true : false;
  }
  public hasValue(): boolean {
    return this.head ? true : false;
  }
  public getVal(): T | undefined {
    // const current = this.head;
    // this.head = this.head.next;
    return this.head?.data;
  }
  public getHead(): Node<T> | null {
    return this.head;
  }
  public reset(): void {
    this.head = null;
  }

  // interface Post {
  //   title: string;
  // }
  // const linkedList = new LinkedList<Post>();

  // linkedList.traverse(); // [];

  // linkedList.insertAtEnd({ title: "Post A" });
  // linkedList.insertAtEnd({ title: "Post B" });
  // linkedList.insertInBegin({ title: "Post C" });
  // linkedList.insertInBegin({ title: "Post D" });

  // console.log(linkedList.traverse()); // [{ title : "Post D" }, { title : "Post C" }, { title : "Post A" }, { title : "Post B" }];
  // linkedList.search(({ title }) => title === "Post A"); // Node { data: { title: "Post A" }, prev: Node, next: Node};
}
