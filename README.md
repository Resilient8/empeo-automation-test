# โปรเจกต์ทดสอบระบบลงทะเบียน empeo

งานทดสอบระบบลงทะเบียน empeo ด้วย Playwright (TypeScript)

ลิงก์วิดีโอผลการทดสอบ:(https://drive.google.com/file/d/1dGttrch4tLgPLpfuUvxqWWwV7x-5zZry/view?usp=drive_link)


เกี่ยวกับ Test Script

ไฟล์สคริปต์หลักอยู่ที่ tests/register.spec.ts

ในสคริปต์จะครอบคลุมการทดสอบทั้งหมด 3 เคส:
- TC01: ทดสอบ happy path กรอกข้อมูลครบถ้วน ใช้โค้ดส่วนลด ยืนยัน OTP และตั้งรหัสผ่านจนเสร็จสมบูรณ์
- TC02: ทดสอบแบบตั้งใจผิด ไม่กรอกข้อมูลแล้วกดส่งเพื่อตรวจเช็คตัวหนังสือสีแดงแจ้งเตือน
- TC03: ทดสอบเฉพาะจุด กรอกเบอร์มือถือสั้นผิดปกติเพื่อตรวจว่าระบบไม่ส่ง OTP

รายละเอียดขั้นตอนการทดสอบแบบเต็มสามารถดูเพิ่มเติมได้ในไฟล์ TESTCASES.md


วิธีติดตั้งและรันโปรเจกต์

1. ติดตั้งแพ็กเกจที่จำเป็น
npm install

2. ติดตั้งเบราว์เซอร์ของ Playwright
npx playwright install chromium

3. คำสั่งสำหรับรันเทสต์
npx playwright test tests/register.spec.ts --project=chromium --headed --workers=1

4. คำสั่งสำหรับเปิดดูรายงานผล
npx playwright show-report
