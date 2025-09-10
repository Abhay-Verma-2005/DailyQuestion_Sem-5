package DP;
import java.util.*;

public class MinPathSum {

    public int minPathSum(int[][] grid) {
        int[][] dp = new int[grid.length][grid[0].length];
        for (int[] a : dp) {
            Arrays.fill(a, -1);
        }
        return path(grid, 0, 0, dp);
    }

    public static int path(int[][] grid, int cr, int cc, int[][] dp) {
        if (cr == grid.length - 1 && cc == grid[0].length - 1) {
            return grid[cr][cc];
        }
        if (cr >= grid.length || cc >= grid[0].length) {
            return Integer.MAX_VALUE;
        }
        if (dp[cr][cc] != -1) {
            return dp[cr][cc];
        }
        int down = path(grid, cr + 1, cc, dp);
        int right = path(grid, cr, cc + 1, dp);
        return dp[cr][cc] = Math.min(down, right) + grid[cr][cc];
    }

    public static void main(String[] args) {
        MinPathSum solver = new MinPathSum();
        int[][] grid = {
            {1, 3, 1},
            {1, 5, 1},
            {4, 2, 1}
        };
        int result = solver.minPathSum(grid);
        System.out.println(result);
    }
}
