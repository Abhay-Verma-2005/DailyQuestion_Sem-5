import java.util.*;
public class HashSet_Practice {
    public static void main(String[] args) {
        HashSet<Integer> set=new HashSet<>();
        set.add(16);
        set.add(20);
        set.add(32);
        set.add(14);
        set.add(-12);
        set.add(120);
        set.add(120);
        set.add(18);
        System.out.println(set);
        System.out.println(set.contains(20));   
        System.out.println(set.remove(-12));
        System.out.println(set);
        for(int e: set){
            System.out.print(e+" ");
        }
        System.out.println();
        ArrayList<Integer> arr = new ArrayList<>(set);
        System.out.println(arr); 
        System.out.println(arr.get(1));   


        HashMap<Integer, Integer> mp2 = new HashMap<>();
        System.out.println(mp2);
    }
}
