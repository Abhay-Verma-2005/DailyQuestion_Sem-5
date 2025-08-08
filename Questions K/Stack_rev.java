
import java.util.*;
public class Stack_rev {
    public static void main(String[] args) {
        Stack<Integer> st = new Stack<>();
        st.push(10);
        st.push(20);
        st.push(30);
        st.push(40);
        st.push(50);
        st.push(60);
        System.out.println(st.size());
        Add_Last(st,100);
        System.out.println(st);
        reverse(st);
        System.out.println(st);

    }
    public static void Add_Last(Stack<Integer> st,int item) {
        if(st.isEmpty()){
            st.push(item);
            return;
        }
        int x =st.pop();
        Add_Last(st,item);
        st.push(x);
    }
    public static void reverse(Stack<Integer> st) {
        if (st.isEmpty()) {
            return;
            }
            int x = st.pop();
            reverse(st);
            Add_Last(st,x);
        
    }
}