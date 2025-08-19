package Tree;

public class Same_Sub_Tree {
    public static void main(String[] args) {
        BT bt = new BT();
        bt.Display();
        BT.Node n=bt.access();
        
        System.out.println(SameTree(n.left,n.right));
    }
    public static boolean SameTree(BT.Node n1, BT.Node n2){
        if(n1==null && n2==null) return true;
        else if(n1==null || n2==null) return false;
        if(n1.val != n2.val) return false;
        
        return (SameTree(n1.left , n2.left) && SameTree(n1.right , n2.right));
    }
}


// 10 true 20 false true 30 false false true 20 false true 30 false false
// 10 true 20 true 40 false false true 80 false false true 20 true 80 false false true 40 false false 
// 10 true 20 true 40 false false true 80 false false true 20 true 40 false false true 80 false false 