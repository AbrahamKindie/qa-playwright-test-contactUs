
import { test, expect } from '@playwright/test';
import { setTimeout } from 'node:timers/promises';
import { faker } from '@faker-js/faker';

test.describe("", async()=>{

    //// Student side submission
    test('TestCase 1: Contact Us Test on Student side and Admin side with Valid Input Types!', async ({ page }) => {
        test.setTimeout(60000); 
        const fullName = faker.person.fullName();
        console.log("=> To verify the system Seccessfully Send Feedback on Student side!");
        await page.goto('https://meduron.virtualgames.et/');
        await page.getByRole('navigation').getByRole('button', { name: 'Contact Us' }).click();

        // Fill contact form
        await page.getByPlaceholder('Full Name').click();
        await page.getByPlaceholder('Full Name').fill(fullName);
        await page.getByPlaceholder('Email Address').click();
        await page.getByPlaceholder('Email Address').fill('name@gmail.com');
        await page.getByPlaceholder('Phone Number').click();

        //selecvt subject and fill message.
        await page.getByPlaceholder('Phone Number').fill('0905789000');
        await page.getByRole('button', { name: 'Select Subject' }).click();
        await page.getByRole('button', { name: 'Feedback' }).click();
        await page.getByRole('textbox', { name: 'Message' }).click();
        await page.getByPlaceholder(/write your message/i).fill('This site is nice for Medical students.');

         // Submit form
        await page.getByRole('button', { name: 'Send' }).click();
        // await expect(page.getByRole('heading',{name:'Thank you! Your message has been sent.'})).toBeVisible();
        
        // Check the FeedBack is Displayed on Admin side
        console.log('=> Verify the sender Name and Email is Displayed on Admin side!');
        await page.goto('http://188.245.184.186:3011/auth/sign-in');

         // Admin login
        await page.getByRole('textbox', { name: 'Email Address or Username' }).click();
        await page.getByRole('textbox', { name: 'Email Address or Username' }).fill('admin');
        await page.getByRole('textbox', { name: 'Password' }).click();
        await page.getByRole('textbox', { name: 'Password' }).fill('Pa$$w0rd##');
        await page.getByRole('button', { name: 'Sign in' }).click();

        //Navigate to Contact Us Section.
        await page.getByRole('link', { name: 'Contact Us Contact Us' }).click();
        await page.getByRole('button', { name: fullName}).click();
        await expect(
            page.getByRole('textbox', { name: 'Sender Info' })
          ).toHaveValue(fullName);
      });
       
      // Check Error Display for Required Feilds.
      test('Testcase 2: should display error messages when submitting empty required fields', async ({ page }) => {
        test.setTimeout(60000);
        await page.goto('https://meduron.virtualgames.et/');
        await page.getByRole('navigation').getByRole('button', { name: 'Contact Us' }).click();
        await page.getByRole('button', { name: 'Send' }).click();

        //check Required Fields Error Display
        await expect(page.getByText('Full name is required!')).toBeVisible();
        await expect (page.getByText('Email is required')).toBeVisible();
        await expect(page.getByText('Phone number required')).toBeVisible();
        await expect(page.getByText('Subject is required')).toBeVisible();

        // Fill Invalid data Formats.
        await page.getByPlaceholder('Full Name').click();
        await page.getByPlaceholder('Full Name').fill('name');
        await page.getByPlaceholder('Email Address').click();
        await page.getByPlaceholder('Email Address').fill('nam@.com');
        await page.getByPlaceholder('Phone Number').click();
        await page.getByPlaceholder('Phone Number').fill('0890090880-');
        await page.getByRole('button', { name: 'Select Subject' }).click();
        await page.getByRole('button', { name: 'Feedback' }).click();
        await page.getByRole('button', { name: 'Send' }).click();
       
        // check Error Message is Desplayed.
        await expect(page.getByText('Please enter at least')).toBeVisible();
        await expect(page.getByText('Invalid email address')).toBeVisible();
        await expect(page.getByText('Invalid phone number')).toBeVisible();
      });

})

