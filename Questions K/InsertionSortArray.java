public class InsertionSortArray {
    public static void main(String[] args){
        int [] arr = { 3, 4, -5, 6, 7, 8, 9, 1, 2,10};
        int n = arr.length;        
        sort(arr, n);
        printArray(arr);

    }
    
    public static void sort(int [] arr, int n){
        for(int i = 1; i < n; i++){
            int picked = arr[i];
            int j= i - 1;
            while(j >= 0 && arr[j] > picked){
                arr[j + 1] = arr[j];
                j--;
            }
            arr[j + 1] = picked;
        }

    }
    public static void printArray(int [] arr){
        for(int i = 0; i < arr.length; i++){
            System.out.print(arr[i] + " ");
        }
    }

}
