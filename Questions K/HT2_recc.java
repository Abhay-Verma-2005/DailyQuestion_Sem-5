public class HT2_recc {
    public static void main(String[] args){
        int n=3;
        CoinToss2(n,"");
    }
    public static void CoinToss2(int n,String ans){
        if(n==0){
                System.out.println(ans);
                return;
                }
        if (ans.length()==0 || ans.charAt(ans.length()-1) !='H'){
            CoinToss2(n-1,ans+"H");
        }
        CoinToss2(n-1,ans+"T");
    }
}









