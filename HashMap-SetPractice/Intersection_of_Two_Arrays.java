import java.util.*;
public class Intersection_of_Two_Arrays{
    public static void main(String[] args) {
        int[] arr = intersect(
            new int[]{1, 2, 2, 1},
            new int[]{1, 2, 3, 2, 4, 5}
        );
        
        for (int num : arr) {
            System.out.print(num + " ");
        }
    }
    public static int[] intersect(int[] arr1, int[] arr2) {
        Map<Integer,Integer> mp = new HashMap<>();
        for(int i=0;i<arr1.length;i++){
            if(mp.containsKey(arr1[i])){
                mp.put(arr1[i],mp.get(arr1[i])+1);
            }
            else{
                mp.put(arr1[i],1);
            }
        }
        ArrayList<Integer> ans = new ArrayList<>();
        for(int i=0; i<arr2.length;i++){
            if(mp.containsKey(arr2[i]) && mp.get(arr2[i])>0){
                mp.put(arr2[i],mp.get(arr2[i])-1);
                ans.add(arr2[i]);
            }
        }
        int [] arr = new int[ans.size()];
        int i=0;
        for(int ele: ans){
            arr[i]=ele;
            i++;
        }
        return arr;
        
    }
}