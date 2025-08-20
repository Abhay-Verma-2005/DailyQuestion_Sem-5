package Tree;

public class sumRootToLeaf {
    public static void main(String[] args) {
        BT bt = new BT();
        bt.Display();
        BT.Node n=bt.access();
        System.out.println(sum(n,0));
    }
    public static int sum(BT.Node root, int num){
        if(root == null) return 0;
        if(root.left==null && root.right==null){
            return num*10+root.val;
        }
        int left = sum(root.left,num*10+root.val);
        int right = sum(root.right,num*10+root.val);
        return right + left;
    }
}
// 4 true 9 true 5 false false true 1 false false true 0 false false
