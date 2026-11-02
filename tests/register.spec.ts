import { test, expect } from '@playwright/test';

test.describe('เทสระบบสมัครสมาชิก empeo', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('https://portal.uat.gofive.co.th/Register/empeo');
  });

  // TC01: ทดสอบ happy path
  test('TC01 - ทดสอบ happy path สมัครผ่านฉลุย', async ({ page }) => {
    test.setTimeout(60000);

    const uniqueId = Date.now();
    const dynamicCompany = `Company${uniqueId}`;
    const dynamicEmail = `tester${uniqueId}@gmail.com`;

    await page.locator('text=อื่นๆ').click();
    await page.locator('input[placeholder*="ชื่อบริษัท"], input[placeholder*="เลขประจำตัว"]').first().fill(dynamicCompany);

    await page.locator('text=ประเภทธุรกิจ').click();
    await page.locator('text=eCommerce').first().click();

    await page.locator('text=ผู้ใช้งาน').first().click();
    await page.locator('text=21-50').first().click();

    await page.locator('input[placeholder*="อีเมล"]').fill(dynamicEmail);
    await page.locator('input[placeholder*="ชื่อ"]').nth(1).fill('jojo');
    await page.locator('input[placeholder*="นามสกุล"]').fill('jostar');
    await page.locator('input[placeholder*="เบอร์มือถือ"]').fill('0967690708');

    await page.locator('text=ใช้โค้ดส่วนลด').click();
    await page.locator('[data-testid="input_text_registration_coupon_code"]').fill('FREE15DAY');
    await page.locator('[data-testid="input_button_registration_btn_apply"]').click();
    await page.waitForTimeout(1000);

    await page.locator('p.policy-box').click({ position: { x: 5, y: 5 } });
    await page.locator('button:has-text("ทดลองใช้ฟรี")').click();

    await expect(page.locator('text=กรุณาตรวจสอบข้อความ')).toBeVisible({ timeout: 15000 });
    
    const otpBoxes = page.locator('input.otp-input');
    await expect(otpBoxes).toHaveCount(6);

    const otpDigits = ['1', '2', '3', '4', '5', '6'];
    for (let i = 0; i < 6; i++) {
      await otpBoxes.nth(i).click();
      await page.keyboard.press(otpDigits[i]);
      await page.waitForTimeout(150);
    }

    await page.locator('text=กรุณาตรวจสอบข้อความ').click();
    await page.waitForTimeout(500);

    const verifyBtn = page.locator('[data-testid="button_button_registration_verify"]');
    await expect(verifyBtn).toBeEnabled({ timeout: 5000 });
    await verifyBtn.click();

    const passInput = page.locator('input[placeholder="รหัสผ่าน"]');
    await expect(passInput).toBeVisible({ timeout: 20000 });
    await passInput.fill('Test1234');

    const confirmPassInput = page.locator('input[placeholder="ยืนยันรหัสผ่าน"]');
    await confirmPassInput.fill('Test1234');

    await page.locator('button:has-text("ตั้งรหัสผ่าน")').click();
    await expect(page.locator('body')).toContainText('empeo', { timeout: 20000 });
  });

  // TC02: ทดสอบแบบตั้งใจผิด
  test('TC02 - ทดสอบแบบตั้งใจผิด ฟอร์มเปล่าต้องไม่ผ่าน', async ({ page }) => {
    test.setTimeout(30000);
    await page.locator('button:has-text("ทดลองใช้ฟรี")').click();

    await expect(page.locator('text=กรุณากรอกประเภทธุรกิจ')).toBeVisible();
    await expect(page.locator('text=กรุณากรอกผู้ใช้งาน')).toBeVisible();
    await expect(page.locator('text=กรุณากรอกอีเมล')).toBeVisible();
  });

  // TC03: ทดสอบเฉพาะจุด
  test('TC03 - ทดสอบเฉพาะจุด เบอร์ผิดฟอร์แมตต้องไม่ส่ง OTP', async ({ page }) => {
    test.setTimeout(30000);
    await page.locator('input[placeholder*="เบอร์มือถือ"]').fill('09123');
    await page.locator('button:has-text("ทดลองใช้ฟรี")').click();

    await expect(page.locator('text=กรุณาตรวจสอบข้อความ')).not.toBeVisible();
  });

});