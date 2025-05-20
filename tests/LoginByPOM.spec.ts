/* create login test using page object model */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/LoginPOM.page';


test.describe('Login Page', () => {
    
    let loginPage: LoginPage;
 
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.navigateToLoginPage();
    await loginPage.VisibilityCheck();
    await loginPage.VisibilityCheck();
});
 
 
//test for username missing
test('Username Missing', async ({ page }) => {
    await loginPage.fillPassword('ania@123'); // Replace with your test password
    await loginPage.clickLoginButton();
    await loginPage.checkErrorMessageForUsernameMissing();
   
});
 
//test for password missing
test('Password Missing', async ({ page }) => {
    await loginPage.fillUsername('ania'); // Replace with your test username
    await loginPage.clickLoginButton();
    await loginPage.checkErrorMessageForPasswordMissing();
});
 
//Homework: Create tests for others
 
//login validation
 
test('Login Validation', async ({ page }) => {
    await loginPage.fillUsername('ania'); // Replace with your test username
    await loginPage.fillPassword('ania@123'); // Replace with your test password
 
    await loginPage.clickLoginButton();
   
    await loginPage.displayDialogOnSuccessfulLogin();
 
    await loginPage.navigateToOpdatePage();
   
});
 
});