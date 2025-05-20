import {test, expect} from '@playwright/test';

//setup

import type { Locator } from '@playwright/test';

let userName: Locator;
let password: Locator;
let loginButton: Locator;

test.describe('Login Page', () => {

test.beforeEach(async ({page})=>{

    await page.goto('http://localhost:4200/login');

    userName=page.locator('input[name="name"]');
    await expect(userName).toBeVisible();

    password=page.locator('input[name="password"]');
    await expect(password).toBeVisible();

    loginButton=page.locator('button[type="submit"]');
    await expect(loginButton).toBeVisible();
});

test('Check if error message is displayed for blank username',async ({page})=>{
   
    userName.fill('');
    await password.fill('test@123');

    await loginButton.click();

    const errorMessage=page.locator('text=Username is required');
    await expect(errorMessage).toBeVisible();

});

test('Check if error message is displayed for blank password',async ({page})=>{

    await userName.fill('testuser');
    await password.fill('');

    await loginButton.click();

    const errorMessage=page.locator('text=Password is required');
    await expect(errorMessage).toBeVisible();

});

test('test for invalid username and password', async ({ page }) => {  
  await userName.fill('asdsd');  
  await password.fill('ddddddd');
  await loginButton.click();
  const errorMessage= page.getByText('Invalid Username or Password');
  await expect(errorMessage).toHaveText('Invalid Username or Password');
});


test('test', async ({ page }) => {  
  
  await userName.fill('ania');
  
  await password.fill('ania@123');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Login' }).click();
  await page.goto('http://localhost:4200/customer-update?username=ania');
});

});
