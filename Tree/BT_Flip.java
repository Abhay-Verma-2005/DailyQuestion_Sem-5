<<<<<<< HEAD
package Tree;

public class BT_Flip {
    public static void main(String[] args) {
        BT bt1 = new BT();
        BT.Node n1=bt1.access();
        BT bt2 = new BT();
        BT.Node n2=bt2.access();
        boolean x= check_flip(n1,n2);
        System.out.println(x);
    }
    public static boolean check_flip(BT.Node n1, BT.Node n2){
        if(n1==null && n2==null) return true;
        else if(n1==null || n2==null) return false;
        if(n1.val != n2.val) {
            return false;
        }
        boolean flip =check_flip(n1.left , n2.right) && check_flip(n1.right , n2.left);
        boolean noflip =check_flip(n1.left , n2.left) && check_flip(n1.right , n2.right);
        return flip || noflip;
    }

}

// 1 true 2 true 4 false false true 5 true 7 false false true 8 false false true 3 true 6 false false false
// 1 true 3 false true 6 false false true 2 true 4 false false true 5 true 8 false false true 7 false false 

=======
package Tree;

public class BT_Flip {
    public static void main(String[] args) {
        BT bt1 = new BT();
        BT.Node n1=bt1.access();
        BT bt2 = new BT();
        BT.Node n2=bt2.access();
        boolean x= check_flip(n1,n2);
        System.out.println(x);
    }
    public static boolean check_flip(BT.Node n1, BT.Node n2){
        if(n1==null && n2==null) return true;
        else if(n1==null || n2==null) return false;
        if(n1.val != n2.val) {
            return false;
        }
        boolean flip =check_flip(n1.left , n2.right) && check_flip(n1.right , n2.left);
        boolean noflip =check_flip(n1.left , n2.left) && check_flip(n1.right , n2.right);
        return flip || noflip;
    }

}

// 1 true 2 true 4 false false true 5 true 7 false false true 8 false false true 3 true 6 false false false
// 1 true 3 false true 6 false false true 2 true 4 false false true 5 true 8 false false true 7 false false 

>>>>>>> 3b3e7771c46b2f1a975e378ef3dec8ac6d4a6013
