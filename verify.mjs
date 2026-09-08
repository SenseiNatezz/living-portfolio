import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
fs.mkdirSync('test-results',{recursive:true});
const browser=await chromium.launch({channel:'chrome',headless:true});
const page=await browser.newPage({viewport:{width:1440,height:960},reducedMotion:'reduce'});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
await page.goto('http://localhost:5173');await page.waitForFunction(()=>document.images[0].complete);await page.evaluate(()=>document.fonts.ready);
for(const width of [1440,768,390,320]){await page.setViewportSize({width,height:width>800?960:844});await page.evaluate(()=>scrollTo(0,0));await page.waitForTimeout(250);assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`Overflow at ${width}`);await page.screenshot({path:`test-results/${width}.png`,fullPage:true});}
await page.setViewportSize({width:390,height:844});await page.getByRole('button',{name:'Open navigation'}).click();assert(await page.getByRole('button',{name:'Close navigation'}).getAttribute('aria-expanded')==='true');await page.locator('#navigation').getByRole('link',{name:'Work',exact:true}).click();assert(await page.getByRole('button',{name:'Open navigation'}).getAttribute('aria-expanded')==='false');
for(let i=0;i<3;i++){await page.getByRole('button',{name:'View project',exact:true}).nth(i).click();await page.locator('dialog').waitFor({state:'visible'});assert(await page.getByRole('link',{name:'Launch prototype'}).getAttribute('href'));await page.keyboard.press('Escape');await page.locator('dialog').waitFor({state:'hidden'});}
await page.goto('http://localhost:5173/source/fieldnotes.html');await page.getByLabel('Note title').fill('A test thought');await page.getByLabel('Your note').fill('A little room to think');await page.getByRole('button',{name:'Save note'}).click();await page.reload();assert(await page.getByRole('heading',{name:'A test thought'}).count()===1);await page.getByRole('button',{name:'Delete note'}).click();
await page.goto('http://localhost:5173/source/canopy.html');await page.getByLabel('Get outside for a walk').check();await page.reload();assert(await page.getByLabel('Get outside for a walk').isChecked());
await page.goto('http://localhost:5173/source/waypoint.html');await page.getByRole('searchbox').fill('Wi-Fi');assert(await page.locator('details').count()===1);await page.locator('summary').click();assert(await page.locator('details').getAttribute('open')!==null);await page.getByRole('searchbox').fill('zzzz');assert(await page.getByRole('status').textContent()==='No matches. Try a different keyword.');
assert.deepEqual(errors,[]);console.log('PASS: 4 viewport widths, mobile menu, 3 dialogs, 3 prototypes, no runtime errors.');await browser.close();
