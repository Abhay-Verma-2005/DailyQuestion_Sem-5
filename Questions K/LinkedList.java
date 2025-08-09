// linked list import (no actual import needed for custom list)
//LL
public class LinkedList {
    
    // Node class
    public static class Node {
        int val;
        Node next;
    }

    // head, tail, size are part of the LinkedList, not Node
    private Node head;
    private Node tail;
    private int size;
    private Node cy;
    
    public void addFirst(int item) {
        Node newNode = new Node(); // val=0, next=null
        newNode.val = item;
        if (size == 4){
            cy = newNode; // cy points to the current head
        }
        if (size == 0) {
            head = newNode;  // head and tail point to the same node address
            tail = newNode;
            size++;
        } else {
            newNode.next = head; // newNode's next points to the current head
            head = newNode;      // head now points to the newNode
            size++;
        }
    }

    public void addLast(int item) {
        Node newNode = new Node(); // val=0, next=null
        newNode.val = item;
        if (size == 0) {
            addFirst(item); // if list is empty, addFirst will handle it
        } else {
            tail.next = newNode; // current tail's next points to the newNode
            tail = newNode;      // tail now points to the newNode
            size++;
        }
        tail.next =cy; 
    }
    // print 20 time print node in ll
    public void print10() {
        Node curr = head;
        int count = 0;
        while (curr != null && count < 20) {
            System.out.print(curr.val + " -> ");
            curr = curr.next;
            count++;
        }
        System.out.println("null");
        
    }

    public void printList() {
        Node curr = head;
        while (curr != null) {
            System.out.print(curr.val + " -> ");
            curr = curr.next;
        }
        System.out.println("null");
    }

    public static void main(String[] args) {
        LinkedList ll = new LinkedList();
        ll.addFirst(10);
        ll.addFirst(20);
        ll.addFirst(30);
        ll.addLast(50);
        ll.addLast(60);
        ll.addLast(70);
        ll.print10();
        // ll.printList(); // Output: 20 -> 10 -> 30 -> 40 -> null

        //cycle detection
        Node slow = ll.head;
        Node fast = ll.head;
        
    while (fast != null && fast.next != null) {
        slow = slow.next;
        fast = fast.next.next;

        if (slow == fast) {
            // Cycle detected

            // Move slow to head, keep fast at meeting point
            Node entry = ll.head;
            while (entry != slow) {
                entry = entry.next;
                slow = slow.next;
            }

            // Now entry is the start of the cycle
            System.out.println("Cycle detected at node with value: " + entry.val);
            return;
        }
    }

    System.out.println("No cycle detected");
    }
}

