package BS_Tree;
import java.util.*;n
public class Bst {
    public class Node {
        int val;
        Node left;
        Node right;
    }

    private Node root;

    public Bst(int[] in) {
        root = CreateTree(in, 0, in.length - 1);
    }

    public Node CreateTree(int[] in, int si, int ei) {
        if (si > ei) {   
            return null;
        }
        int mid = (si + ei) / 2;
        Node nn = new Node();
        nn.val = in[mid];
        nn.left = CreateTree(in, si, mid - 1);
        nn.right = CreateTree(in, mid + 1, ei);
        return nn;
    }

    public void Display() {
        displayTree(root);
    }

    private void displayTree(Node node) {
        if (node == null) {
            return;
        }
        String s = "";
        s = "<--" + node.val + "-->";
        if (node.left != null) s = node.left.val + s;
        else s = "." + s;
        if (node.right != null) s = s + node.right.val;
        else s = s + ".";
        System.out.println(s);
        displayTree(node.left);
        displayTree(node.right);
    }
    
    public int height(){
        return height(root);
    }
    private int height(Node node){
        if(node==null) return 0;
        int left = height(node.left);
        int right = height(node.right);
        return Math.max(left,right)+1;
    }
    public void preorder(){
        preorder(root);
    }
    private void preorder(Node node){
        if(node == null) return;
        System.out.print(node.val+" ");
        preorder(node.left);
        preorder(node.right);
    }

    public void postorder(){
        postorder(root);
    }
    private void postorder(Node node){
        if(node == null) return;
        postorder(node.left);
        postorder(node.right);
        System.out.print(node.val+" ");

    }

    public void inorder(){
        inorder(root);
    }
    private void inorder(Node node){
        if(node == null) return;
        inorder(node.left);
        System.out.print(node.val+" ");
        inorder(node.right);

    }


    public void levelorder(){
        levelorder(root);
    }
    private void levelorder(Node node){
        Queue<Node> q= new LinkedList<>();
         q.add(node);
        while(!q.isEmpty()){
            Node rv=q.poll();
            System.out.print(rv.val+" ");
            if(rv.left!=null){
                q.add(rv.left);
            }
            if(rv.right!=null){
                q.add(rv.right);
            }
        }
        System.out.println("");

    }
}
