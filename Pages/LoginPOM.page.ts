import {Page,Locator,expect}  from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly usernameField: Locator;
    readonly passwordField: Locator;
    readonly loginButton: Locator;
    readonly errorMessage: Locator;
    readonly usernameErrorMessage: Locator;
    readonly passwordErrorMessage: Locator;
 
    constructor(page: Page) {
        this.page = page;
        this.usernameField = page.locator('input[name="name"]');
        this.passwordField = page.locator('input[name="password"]');
        this.loginButton = page.locator('button[type="submit"]');
        this.errorMessage = page.locator('text=Invalid Username or Password');
        this.usernameErrorMessage = page.locator('text=Username is required');
        this.passwordErrorMessage = page.locator('text=Password is required');
    }
 
    async navigateToLoginPage() {
        await this.page.goto('http://localhost:4200/login'); // Adjust the URL as needed
    }
 
    async VisibilityCheck() {
        await expect(this.usernameField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
        await expect(this.loginButton).toBeVisible();
    }
 
    async fillUsername(username: string) {
        await this.usernameField.fill(username);
    }
 
    async fillPassword(password: string) {
        await this.passwordField.fill(password);
    }
 
    async clickLoginButton() {
        await this.loginButton.click();
    }
 
    async checkErrorMessageForUsernameMissing() {
        await expect(this.usernameErrorMessage).toBeVisible();
    }
 
    async checkErrorMessageForPasswordMissing() {
        await expect(this.passwordErrorMessage).toBeVisible();
    }
 
    async checkErrorMessageForInvalidCredentials() {
        await expect(this.errorMessage).toBeVisible();
    }

    async displayDialogOnSuccessfulLogin() {
        const dialog = this.page.once('dialog', async dialog => {
            console.log(dialog.message());
            await dialog.accept();
        });
        await this.loginButton.click();
    }


    async navigateToOpdatePage() {
        await this.page.goto('http://localhost:4200/customer-update?username=ania'); // Adjust the URL as needed
    }

}