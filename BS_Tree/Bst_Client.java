package BS_Tree;

public class Bst_Client {
    public static void main(String[] args) {
        int [] in ={10,20,30,40,50,60,70,80};
        Bst bst = new Bst(in);
        bst.Display();
        System.out.println();
         
        bst.height();
        System.out.println();

        bst.inorder();
        System.out.println();

        bst.postorder();
        System.out.println();

        bst.levelorder();
        System.out.println();

        
        System.out.println("Max :"+ bst.max());
        System.out.println("Min :" + bst.min());
        System.out.println("item :" + bst.find(10));
        System.out.println("item :" + bst.find(0));
    }
}
