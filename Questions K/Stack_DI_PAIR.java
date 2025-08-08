
import java.util.*;
public class Stack_DI_PAIR {
    public static void main(String[] args) {
        String s="IIIDIDDD";
        
        System.out.println(constructSmall(s));
    }
    public static String constructSmall(String str){
        int []ans=new int[str.length()+1];
        int c=1;
        Stack<Integer> st=new Stack<>();
        for(int i=0;i<=str.length();i++){
            if(i==str.length() || str.charAt(i)=='I'){
                ans[i]=c;
                c++;
                while(!st.isEmpty()){
                    ans[st.pop()]=c;
                    c++;
                }

            }
            else{
                st.push(i);
            }
        }
        String s="";
        for(int v:ans){
            s+=v;
        }
        return s;
    }
}