import java.util.*;

public class InterestingRatios {
    static final int MAX_N = 10000000;
    static int[] interestingCount = new int[MAX_N + 1];
    static boolean[] isPrime = new boolean[MAX_N + 1];

    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        preprocess();

        int t = sc.nextInt();
        while (t-- > 0) {
            int n = sc.nextInt();
            System.out.println(interestingCount[n]);
        }
        sc.close();
    }

    static void preprocess() {
        Arrays.fill(isPrime, true);
        isPrime[0] = isPrime[1] = false;
        
        for (int i = 2; i * i <= MAX_N; i++) {
            if (isPrime[i]) {
                for (int j = i * i; j <= MAX_N; j += i) {
                    isPrime[j] = false;
                }
            }
        }

        for (int a = 1; a <= MAX_N; a++) {
            for (int b = a + 1; b <= MAX_N; b += a) {
                int gcd = a;
                int lcm = b;
                int F = lcm / gcd;
                if (isPrime[F]) {
                    interestingCount[b]++;
                }
            }
        }

        for (int i = 2; i <= MAX_N; i++) {
            interestingCount[i] += interestingCount[i - 1];
        }
    }
}
