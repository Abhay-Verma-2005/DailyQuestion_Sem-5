
public class Insert_Into_BST {
    public static void main(String[] args) {
        int[] in ={10,20,30,40,50,60,70,80};
        Binary_Search_Tree bst = new Binary_Search_Tree(in);
        int val=35;
        bst.root=insert_Into_BST(bst.root, val);
        bst.InOrder();
    }
    public static Binary_Search_Tree.Node insert_Into_BST(Binary_Search_Tree.Node root, int val) {
        if(root==null){
            Binary_Search_Tree bst = new Binary_Search_Tree(new int[]{});
            return new Binary_Search_Tree.Node(val);

        }
        if(root.val<val){
            root.right=insert_Into_BST(root.right,val);
        }
        else{
            root.left=insert_Into_BST(root.left,val);
        }
        return root;
    }
}