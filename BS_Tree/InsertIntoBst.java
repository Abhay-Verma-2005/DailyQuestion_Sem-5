package BS_Tree;

import java.util.*;

public class InsertIntoBst {
    public static void main(String[] args) {
    int[] arr = {1,2,3,4,5,6,7};
    Bst tree = new Bst(arr);
    tree.inorder();  
        System.out.println();
    tree.insert(8);
    tree.insert(0);
    
    System.out.println("After insertion:");
    tree.inorder();
        System.out.println();

    tree.delete(5);
    System.out.println("After deletion:");
    tree.inorder();
}



}
