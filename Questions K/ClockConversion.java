import java.util.Scanner;

public class ClockConversion {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        int t = scanner.nextInt();
        String x= scanner.nextLine();
        for (int o = 0; o < t; o++) {
            String time = scanner.nextLine();
            String[] parts = time.split(":");
            int hour = Integer.parseInt(parts[0]);
            String minute = parts[1];
            String period;

            if (hour == 0) {
                hour = 12; 
                period = "AM";
            } else if (hour < 12) {
                period = "AM";
            } else if (hour == 12) {
                period = "PM"; 
            } else {
                hour -= 12;
                period = "PM";
            }
            String formattedHour = String.format("%02d", hour);
            System.out.println(formattedHour + ":" + minute + " " + period);
        }
    }
}