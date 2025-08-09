// linked list import
import java.util.LinkedList;
public class Linkedlistee {
    public static void main(String[] args) {
        LinkedList<Integer> ll= new LinkedList<>();
        ll.addLast(1);
        ll.addLast(2);
        ll.addLast(3);
        ll.addLast(4);
        ll.addLast(5);
        ll.addFirst(0);
        System.out.println(ll);
        ll.removeLast();
        ll.removeFirst();
        System.out.println(ll);

        // Print heading and tail of the linked list
        System.out.println("Head: " + ll.getFirst());
        System.out.println("Tail: " + ll.getLast());
        // Print address of head and tail of the linked list
        System.out.println("Address of Head: " + System.identityHashCode(ll.getFirst()));
        System.out.println("Address of Tail: " + System.identityHashCode(ll.getLast()));    

    
    }
}
