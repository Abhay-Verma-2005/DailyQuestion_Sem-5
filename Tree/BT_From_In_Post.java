package Tree;

public class BT_From_In_Post {
     public static class Node {
        int val;
        Node left, right;
    }
    public static void main(String[] args) {
    int[] post = {9,15,7,20,3};
        int[] in = {9,3,15,20,7};

        int[] post1 = {3,6,7,4,12,11,8,2,5,10};
        int[] in2 = {3,12,6,4,7,10,11,5,2,8};

        BT_From_In_Post obj = new BT_From_In_Post();
        Node tree1 = obj.buildtree(post, in);
        Node tree2 = obj.buildtree(post1, in2);
        System.out.println();
        System.out.println("TREE1: ");
        obj.displayTree(tree1);

        System.out.println();
        System.out.println("TREE2: ");
        obj.displayTree(tree2);

    }



    public Node buildtree(int[] post, int[] in){
        return createTree(post,in,0,in.length-1,0,post.length-1);
    }
    public  Node createTree(int[] post, int[] in ,int ilo,int ihi,int polo,int pohi){
        if(ilo>ihi || polo>pohi) return null;
        Node nn=new Node();
        nn.val=post[pohi];
        int idx =search(in,ilo,ihi,post[pohi]);
        int nel= ihi-idx;
        nn.right=createTree(post,in,idx+1,ihi,pohi-nel,pohi-1);
        nn.left=createTree(post,in,ilo,idx-1,polo,pohi-nel-1);
        return nn;


    }
    public int search(int[] arr, int si, int ei,int item){
        for(int i=si;i<=ei;i++){
            if(arr[i]==item) return i;
        }
        return 0;
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
}
