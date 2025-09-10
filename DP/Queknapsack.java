package DP;

import java.util.*;
public class Queknapsack {
    public static void main(String[] args) {
        int cap=4;
        int[] wt= {1,2,3,2,2};
        int[] val= {8,4,0,5,3};
        int [][] dp=new int[cap+1][wt.length];
        for(int i=0;i<dp.length;i++){
            Arrays.fill(dp[i], -1);
        }
        System.out.println(knapsack(wt, val, cap, 0,dp));
    }
    public static int knapsack(int [] wt, int[] val, int cap, int i,int[][] dp) {
        if(cap==0 || i==wt.length){
            return 0;
        }
        if(dp[cap][i]!=-1){
            return dp[cap][i];
        }
        int inc=0;
        int exc=0;
        if(cap>=wt[i]){
            inc=val[i]+knapsack(wt, val, cap-wt[i], i+1,dp);
        }
        exc=knapsack(wt, val, cap, i+1,dp);

        return Math.max(inc, exc);
    }
    
}


// (0-1 knapsack)