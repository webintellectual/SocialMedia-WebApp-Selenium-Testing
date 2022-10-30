package Scripts;
import java.util.Arrays;
import java.util.concurrent.TimeUnit;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class SignUpTest {

	public static void main(String[] args) throws InterruptedException {
		System.setProperty("webdriver.chrome.driver","/Users/akshay.1/Documents/CS_Projects/SocialMedia-WebApp-Testing-with-Selenium/JarsAndDriver/chromedriver"); // To load driver
		WebDriver driver = new ChromeDriver(); // creating driver object
		driver.manage().window().maximize(); // maximises browser's window
		driver.manage().deleteAllCookies(); // not mandatory
		
		driver.get("http://localhost:8000/SignUp");
		Thread.sleep(4000);
		
		String[] fname = {"Akshay"};
		CharSequence[] fname_csa;
		fname_csa = (CharSequence[]) Arrays.copyOf(fname, fname.length, CharSequence[].class);
		driver.findElement(By.name("firstname")).sendKeys(fname_csa);
		Thread.sleep(4000);
		
		String[] lname = {"Rajput"};
		CharSequence[] lname_csa;
		lname_csa = (CharSequence[]) Arrays.copyOf(lname, lname.length, CharSequence[].class);
		driver.findElement(By.name("lastname")).sendKeys(lname_csa);
		Thread.sleep(2500);
		
		String[] uid = {"akshay_cse2k20"};
		CharSequence[] uid_csa;
		uid_csa = (CharSequence[]) Arrays.copyOf(uid, uid.length, CharSequence[].class);
		driver.findElement(By.name("username")).sendKeys(uid_csa);
		Thread.sleep(2500);
		
		String[] pass = {"pqrst_cse2020"};
		CharSequence[] pass_csa;
		pass_csa = (CharSequence[]) Arrays.copyOf(pass, pass.length, CharSequence[].class);
		driver.findElement(By.name("password")).sendKeys(pass_csa);
		Thread.sleep(2500);
		
		// Exploited Xpath here
		String[] email = {"testsiop@gmail.com"};
		CharSequence[] email_csa;
		email_csa = (CharSequence[]) Arrays.copyOf(email, email.length, CharSequence[].class);
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[3]/div[2]/form/div[3]/input[2]")).sendKeys(email_csa);
		Thread.sleep(2500);
		
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[3]/div[2]/form/button")).submit();
		Thread.sleep(4000);
		
//		driver.quit();
	}

}
