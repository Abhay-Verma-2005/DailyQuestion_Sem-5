package Tree;

public class Symmetric_Sub_Tree {
    public static void main(String[] args) {
        BT bt = new BT();
        bt.Display();
        BT.Node n=bt.access();
        
        System.out.println(SimmTree(n.left,n.right));
    }
    public static boolean SimmTree(BT.Node n1, BT.Node n2){
        if(n1==null && n2==null) return true;
        else if(n1==null || n2==null) return false;
        if(n1.val != n2.val) {
            return false;
        }
        return (SimmTree(n1.left , n2.right) && SimmTree(n1.right , n2.left));
    }
}

// 10 true 20 true 40 false false true 80 false false true 20 true 80 false false true 40 false false 
// 10 true 20 true 40 false false true 80 false false true 20 true 40 false false true 80 false false 

