public class gen_paranthesis {
    public static void main(String[] args) {
        int n=3;
        subSeq(n,0,0, "");

    }
    public static void subSeq(int n,int open,int close,String ans){
        if(n==close && n==open){
            System.out.println(ans);
            return; 
        }
        if(open >n || close>open){
            return;
        }
        subSeq(n,open+1,close,ans+"(");
        subSeq(n,open,close+1,ans+")");
    }
}
