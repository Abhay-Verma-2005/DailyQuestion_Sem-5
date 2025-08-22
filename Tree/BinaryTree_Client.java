package Tree;

public class BinaryTree_Client {
    public static void main(String[] args) {
        BT bt = new BT();
        bt.Display();
        System.out.println(bt.find(20));
        System.out.println(bt.max());
        System.out.println(bt.min());
        System.out.println(bt.height());
        
        bt.preorder();
        System.out.println();
        bt.postorder();
        System.out.println();
        bt.inorder();
        System.out.println();

        System.out.println("level order: ");
    
        bt.levelorder();
    }
}
// 10 true 8 true 4 false false true 2 false false true 1 false false
// 10 true 20 true 120 false false true 80 false false true 200 true 240 false false true 180 false false
