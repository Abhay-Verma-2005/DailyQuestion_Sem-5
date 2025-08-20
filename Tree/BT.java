<<<<<<< HEAD
package Tree;
import java.util.*;
public class BT {
    public class Node{
        int val; 
        Node left;
        Node right;
    }
    
    Scanner sc=new Scanner(System.in);
    private Node root;
    public BT(){
        root=createTree();
    }
    public Node access(){
        return root;
    }
    private Node createTree(){
        int item=sc.nextInt();
        Node nn = new Node();
        nn.val=item;
        boolean hlc=sc.nextBoolean();
        if(hlc){
            nn.left=createTree();
        }
        boolean hrc=sc.nextBoolean();
        if(hrc){
            nn.right=createTree();
        }
        return nn;
    }
    
    public void Display(){
        displayTree(root);
    }
    
    private void displayTree(Node node){
        if(node == null){
            return ;
        }
        String s="";
        s="<--" +node.val + "-->";
        if(node.left!=null) s=node.left.val+s;
        else s="."+s;
        if(node.right!=null) s=s+node.right.val;
        else s=s+".";
        System.out.println(s);
        displayTree(node.left);
        displayTree(node.right);
        
    }
    public boolean find(int item){
        return find(root,item);
    }
    private boolean find(Node node,int item){
        if(node==null) return false;
        if(node.val==item) return true;
        boolean left= find(node.left,item);
        boolean right= find(node.right,item);
        return left || right;
    }
    public int max(){
        return max(root);
    }
    private int max(Node node){
        int m = Integer.MIN_VALUE;
        if(node==null) return m;
        if(node.val>m ) m=node.val;
        int left=max(node.left);
        int right=max(node.right);
        return Math.max(m, Math.max(left, right));
    }
    public int min(){
        return min(root);
    }
    private int min(Node node){
        int m = Integer.MAX_VALUE;
        if(node==null) return m;
        if(node.val<m ) m=node.val;
        int left=min(node.left);
        int right=min(node.right);
        return Math.min(m, Math.min(left, right));
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
=======
package Tree;
import java.util.*;
public class BT {
    public class Node{
        int val; 
        Node left;
        Node right;
    }
    
    Scanner sc=new Scanner(System.in);
    private Node root;
    public BT(){
        root=createTree();
    }
    public Node access(){
        return root;
    }
    private Node createTree(){
        int item=sc.nextInt();
        Node nn = new Node();
        nn.val=item;
        boolean hlc=sc.nextBoolean();
        if(hlc){
            nn.left=createTree();
        }
        boolean hrc=sc.nextBoolean();
        if(hrc){
            nn.right=createTree();
        }
        return nn;
    }
    
    public void Display(){
        displayTree(root);
    }
    
    private void displayTree(Node node){
        if(node == null){
            return ;
        }
        String s="";
        s="<--" +node.val + "-->";
        if(node.left!=null) s=node.left.val+s;
        else s="."+s;
        if(node.right!=null) s=s+node.right.val;
        else s=s+".";
        System.out.println(s);
        displayTree(node.left);
        displayTree(node.right);
        
    }
    public boolean find(int item){
        return find(root,item);
    }
    private boolean find(Node node,int item){
        if(node==null) return false;
        if(node.val==item) return true;
        boolean left= find(node.left,item);
        boolean right= find(node.right,item);
        return left || right;
    }
    public int max(){
        return max(root);
    }
    private int max(Node node){
        int m = Integer.MIN_VALUE;
        if(node==null) return m;
        if(node.val>m ) m=node.val;
        int left=max(node.left);
        int right=max(node.right);
        return Math.max(m, Math.max(left, right));
    }
    public int min(){
        return min(root);
    }
    private int min(Node node){
        int m = Integer.MAX_VALUE;
        if(node==null) return m;
        if(node.val<m ) m=node.val;
        int left=min(node.left);
        int right=min(node.right);
        return Math.min(m, Math.min(left, right));
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
>>>>>>> 3b3e7771c46b2f1a975e378ef3dec8ac6d4a6013
