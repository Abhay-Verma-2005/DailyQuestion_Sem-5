public class HT1_recc {
    public static void main(String[] args){
        int n=3;
        CoinToss1(n,"",0);
    }
    public static void CoinToss1(int n,String ans,int curr){
        if(n==curr){
            System.out.println(ans);
            return;
        }
        CoinToss1(n,ans+"H",curr+1);
        CoinToss1(n,ans+"T",curr+1);
        
    }
}
