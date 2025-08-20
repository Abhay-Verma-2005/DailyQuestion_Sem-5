package Tree;

import java.util.*;

public class DiaTree {
    public static void main(String[] args) {
        BT bt = new BT();
        bt.Display();
        BT.Node n=bt.access();
    }
    public static DiaPair dia(BT.Node root){
        if(root==null) return new DiaPair();
        DiaPair lp=dia(root.left);
        DiaPair rp=dia(root.right);
        DiaPair sdp=new DiaPair();
        int sd=lp.ht+rp.ht+2;
        sdp.dt=Math.max(sd,Math.max(lp.dt,rp.dt));
    }
    static class DiaPair {
        int dt=0;
        int ht=-1;        
    }
    
}
