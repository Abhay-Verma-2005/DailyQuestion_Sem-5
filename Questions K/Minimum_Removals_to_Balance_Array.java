import java.util.*;
public class Minimum_Removals_to_Balance_Array {
    public static int minRemoval(int[] nums, int k) {
        Arrays.sort(nums);
        int n= nums.length;
        int l= 0, max =1;
        for(int r=0; r<n;r++) {
            while (nums[r]>(long) nums[l]*k) {
                l++;
            }
            max = Math.max(max, r-l+1);
        }
        return n-max;
    }
}



// Minimum_Removals_to_Balance_Array
// Solved
// Medium
// 4 pt.
// You are given an integer array nums and an integer k.

// An array is considered balanced if the value of its maximum element is at most k times the minimum element.

// You may remove any number of elements from nums​​​​​​​ without making it empty.

// Return the minimum number of elements to remove so that the remaining array is balanced.

// Note: An array of size 1 is considered balanced as its maximum and minimum are equal, and the condition always holds true.

 

// Example 1:

// Input: nums = [2,1,5], k = 2

// Output: 1

// Explanation:

// Remove nums[2] = 5 to get nums = [2, 1].
// Now max = 2, min = 1 and max <= min * k as 2 <= 1 * 2. Thus, the answer is 1.
// Example 2:

// Input: nums = [1,6,2,9], k = 3

// Output: 2

// Explanation:

// Remove nums[0] = 1 and nums[3] = 9 to get nums = [6, 2].
// Now max = 6, min = 2 and max <= min * k as 6 <= 2 * 3. Thus, the answer is 2.