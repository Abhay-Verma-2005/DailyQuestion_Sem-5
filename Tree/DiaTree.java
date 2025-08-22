package Tree;

public class DiaTree {
    public static void main(String[] args) {
        BT bt = new BT();
        bt.Display();
        BT.Node n=bt.access();
        System.out.println(dia(n).dt);
    }
    public static DiaPair dia(BT.Node root){
        if(root==null) return new DiaPair();
        DiaPair lp=dia(root.left);
        DiaPair rp=dia(root.right);
        DiaPair sdp=new DiaPair();
        int sd=lp.ht+rp.ht+2;
        sdp.dt=Math.max(sd,Math.max(lp.dt,rp.dt));
        sdp.ht=Math.max(lp.ht,rp.ht)+1;
        return sdp;
    }
    static class DiaPair {
        int dt=0;
        int ht=-1;        
    }
    
}
// 10 true 20 true 40 false false true 80 false false true 20 true 80 false false true 40 false false 
