public class BST_Valid{
 public class TreeNode {
    int val;
    TreeNode left;
    TreeNode right;
    TreeNode() {}
    TreeNode(int val) { this.val = val; }
    TreeNode(int val, TreeNode left, TreeNode right) {
        this.val = val;
        this.left = left;
        this.right = right;
    }
}

class Solution {
    public boolean isValidBST(TreeNode root){

    }
    public BstPair ValidBST(TreeNode root) {
        if (root==null){
            return new BstPair();
        }
        BstPair lbp=ValidBST(root.left);
        BstPair rbp=ValidBST(root.right);
        BstPair sbp =new BstPair();
        sbp.min=Math.min(lbp.min , Math.min(rbp.min,root.val));
        sbp.max=Math.max(lbp.min , Math.min(rbp.min,root.val));
        sbp.isbst=lbp.isbst && rbp.isbst && lbp.max<root.val && rbp.min>root.val;
    }
      class BstPair{
        boolean isBst =true;
        Long max=Long.MIN_VALE
        Long min=Long.MAX_VALE
      }
    }
}

