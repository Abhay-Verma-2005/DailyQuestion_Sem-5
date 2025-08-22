package Tree;
import java.util.*;
public class RightView {
     static int visited =-1;
    public static void main(String[] args) {
        BT bt = new BT();
        bt.Display();
        BT.Node n=bt.access();
        List<Integer> ll = new ArrayList<>();
        Right_side_view(n,0,ll);
        System.out.println(ll);
    }
    public static void Right_side_view(BT.Node root,int curr ,List<Integer> ll) {
        if(root==null) return;
        if(curr>visited){
            ll.add(root.val);
            visited=curr;
        }
        Right_side_view(root.right, curr+1, ll);
        Right_side_view(root.left, curr+1, ll);

    }
}

// 1 true 2 false true 5 false false true 3 false true 4 false false