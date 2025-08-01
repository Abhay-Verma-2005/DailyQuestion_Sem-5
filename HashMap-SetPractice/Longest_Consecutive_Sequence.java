import java.util.*;
public class Longest_Consecutive_Sequence{
    public static void main(String[] args) {
        int[] arr = {1,4,6,8,7,3,2,12,16,20};
        int ans=longestConsecutive(arr);
        System.out.println(ans);
    }

    public static int longestConsecutive(int[] arr) {
        Map<Integer,Boolean> map=new HashMap<>();
        for(int i=0;i<arr.length;i++){
            if(map.containsKey(arr[i]-1)){
                map.put(arr[i],false);
            }
            else{
                map.put(arr[i],true);
            }
            if(map.containsKey(arr[i]+1)){
                map.put(arr[i]+1,false);
            }
        }
        int ans = 0;
        for (int key : map.keySet()) {
            if (map.get(key)) { 
                int count = 0;
                int current = key;

                while (map.containsKey(current)) {
                    count++;
                    current++;
                }

                ans = Math.max(ans, count);
            }
        }

        return ans;
    }
}