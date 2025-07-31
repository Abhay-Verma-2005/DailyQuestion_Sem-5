import java.util.*;
public class HashMap_Practice{
    public static void main(String[] args) {
        HashMap<Integer, String> mp=new HashMap<>();
        mp.put(1,"Abhay");
        mp.put(2,"Ananya");
        mp.put(3,"Potato");
        mp.put(4,"Maggie");


        System.out.println(mp);

        HashMap<String, Integer> map=new HashMap<>();
        map.put("Apple",1);
        map.put("Kite",4);
        map.put("Leetcode",6);
        map.put("Vscode",8);
        map.put("Google",1);

        System.out.println(map);
        System.out.println(map.get("Apple"));
        System.out.println(map.containsKey("Vscode"));
        System.out.println(map.remove("Kite"));
        System.out.println(map);
        
        TreeMap<String, Integer> map1=new TreeMap<>(); // it is lexographically sorted
        map1.put("Apple",1);
        map1.put("Kite",4);
        map1.put("Leetcode",6);
        map1.put("Vscode",8);
        map1.put("Google",1);
        System.out.println(map1);  // implemented by red black tree  (logN --> can't put here null string beacuse
                                  // we use sorting so in sorting we can't comare null)

        LinkedHashMap<String, Integer> map2 = new LinkedHashMap<>();

        map2.put("book", 78);
        map2.put("table", 98);
        map2.put("sun", 88);
        map2.put("moon", 55);
        map2.put("fear", 48);
        map2.put("sky", 78);
        map2.put("light", 69);   // Null key example 
        // implement by doubly linked list

        System.out.println(map2);
    }


    // Hash map  --> Linked list ki help se bana h




}
