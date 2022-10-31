package Scripts;
import java.util.Arrays;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

public class LogIn {
	
	public static void logIn(WebDriver driver) throws InterruptedException {
		
		String[] email = {"testnpm@gmail.com"};
		CharSequence[] email_csa;
		email_csa = (CharSequence[]) Arrays.copyOf(email, email.length, CharSequence[].class);
		driver.findElement(By.name("username")).sendKeys(email_csa);
		Thread.sleep(2500);
		
		String[] pass = {"pqrst_cse2020"};
		CharSequence[] pass_csa;
		pass_csa = (CharSequence[]) Arrays.copyOf(pass, pass.length, CharSequence[].class);
		driver.findElement(By.name("password")).sendKeys(pass_csa);
		Thread.sleep(2500);
		
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[3]/div[2]/form/div[3]/button")).submit();
		Thread.sleep(4000);
		
		// next page
		
		
	}
	public static void openProfile(WebDriver driver) {
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[3]/div[1]/a/div/div[2]/span")).click();
	}
	public static void EditProfile(WebDriver driver) {
		// click edit button
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[3]/div[1]/div[2]/div[1]/div/svg/path")).click();
	}
	public static void logout(WebDriver driver) {
		driver.findElement(By.xpath("//*[@id=\"root\"]/div/div[3]/div[1]/div[2]/button")).click();
	}
	

	public static void main(String[] args) throws InterruptedException {
		System.setProperty("webdriver.chrome.driver","/Users/akshay.1/Documents/CS_Projects/SocialMedia-WebApp-Testing-with-Selenium/JarsAndDriver/chromedriver"); // To load driver
		WebDriver driver = new ChromeDriver(); // creating driver object
		driver.manage().window().maximize(); // maximises browser's window
		driver.manage().deleteAllCookies(); // not mandatory
		driver.get("http://localhost:8000/");
		Thread.sleep(4000);
		
		logIn(driver);
		openProfile(driver);
		logout(driver);
		
	}

}
