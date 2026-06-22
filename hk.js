// run this in the terminal - "cd hackerrank" and after that "node hk.js"

const puppeteer = require("puppeteer");
const codeObj = require("./codes");

const loginLink = "https://www.hackerrank.com/auth/login";
const email = "droplydemo@gmail.com";
const password = "OnlyForDemo";

(async () => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--start-maximized"],
      defaultViewport: null,
    });

    // new page
    const page = await browser.newPage();

    await page.goto(loginLink, { waitUntil: "networkidle2" });

    // email
    await page.waitForSelector("input[name='username']", { visible: true });
    await page.type("input[name='username']", email, { delay: 30 });

    // password
    await page.waitForSelector("input[name='password']", { visible: true });
    await page.type("input[name='password']", password, { delay: 30 });

    // click on login btn
    await page.click("button[type='submit']");

    // 2. Wait for login to complete and dashboard to appear
    console.log("Logging in...");
    await page.waitForNavigation({ waitUntil: "networkidle2" });

    // 3. Navigate to Algorithms
    console.log("Navigating to Algorithms...");
    // We use our helper function to ensure the element exists before clicking
    await waitAndClick('div[data-attr1="algorithms"]', page);

    // 4. Wait for the filter sidebar to actually load in the DOM
    // We wait for the 'warmup' input. Note: visible is false because
    // HackerRank often hides the raw input and styles a label over it.
    console.log("Waiting for filters to load...");
    await page.waitForSelector('input[value="warmup"]', { timeout: 15000 });

    // click the warmup checkbox via evaluate
    // page.evaluate runs a command directly in the browser's console
    // it finds the actual HTML element and triggers the "click()" event, ignoring all the fancy styling that was getting in the way.
    await page.evaluate(() => {
      const warmupCheckbox = document.querySelector('input[value="warmup"]');
      if (warmupCheckbox) {
        warmupCheckbox.click();
      }
    });

    // wait for the challenge list to update
    await page.waitForSelector(".challenges-list", { visible: true });

    // challenge count phase
    await new Promise((r) => setTimeout(r, 3000)); // 3sec

    // get all challenge button/links
    const questionsArr = await page.$$(
      ".ui-btn.ui-btn-normal.primary-cta.ui-btn-line-primary.ui-btn-styled",
      { delay: 50 },
    );
    // it shows the number of challenges
    console.log("number of questions found:", questionsArr.length);

    if (questionsArr.length > 0) {
      await questionSolver(page, questionsArr[0], codeObj.answer[0]);
    }
  } catch (error) {
    console.error("An error occurred:", error);
    // Keep browser open for a bit so you can see the error state
  }
})();

/** * Helper function to wait for an element and click it
 */
async function waitAndClick(selector, cPage) {
  try {
    await cPage.waitForSelector(selector, { visible: true, timeout: 30000 });
    // Scroll into view to avoid 'element click intercepted' errors
    await cPage.evaluate((sel) => {
      // 'sel' is nothing but just a nickname for the selector
      document.querySelector(sel).scrollIntoView(); // 'scrollIntoView()' is like auto-scroll feature
    }, selector);

    await cPage.click(selector);
    // Brief pause to allow the SPA (Single Page App) to trigger route changes
    await new Promise((r) => setTimeout(r, 1000));
  } catch (err) {
    console.error(`FAILED: Check error.png for selector: ${selector}`);
    await cPage.screenshot({ path: "error.png" });
    throw err;
  }
}

// solves a specific quesiton
async function questionSolver(page, question, answer) {
  try {
    // for question select
    // scroll specific button into view so puppeteer can see it to click it
    await question.evaluate((el) => el.scrollIntoView());

    // give it a moment to settle after scrolling
    await new Promise((r) => setTimeout(r, 500));
    await question.click();

    // wait for the main editor to be visible
    await page.waitForSelector(".monaco-editor", { visible: true });

    // click the (custom input) CHECKBOX using evaluate
    // evaluate we use for hidden/styles checkboxes

    const checkboxSelector = ".checkbox-input";
    await page.waitForSelector(checkboxSelector, { visible: true });

    await page.evaluate((selector) => {
      const cb = document.querySelector(selector);
      if (cb) {
        cb.click();
      }
    }, checkboxSelector);

    console.log("Checkbox clicked.");

    // wait for the textarea to appear
    await page.waitForSelector("textarea.custominput", {
      visible: true,
      timeout: 5000,
    });

    // type the answer into the custom input
    await page.type("textarea.custominput", answer, { delay: 10 });
    console.log("Answer typed into custom input");

    // Select and Cut the code (Ctrl+A, Ctrl+X)
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.press("X");
    await page.keyboard.up("Control");

    // 5. Focus the main Monaco Editor
    await waitAndClick(".monaco-editor", page);

    // 6. Select All and Paste (Ctrl+V) for pasting it to the main editor
    await page.keyboard.down("Control");
    await page.keyboard.press("A", { delay: 100 });
    await page.keyboard.press("V", { delay: 100 });
    await page.keyboard.up("Control");

    // 7. Click Run code
    console.log("Code pasted. Running code...");
    await page.click(".ui-btn.ui-btn-normal.ui-btn-secondary.pull-right.msR.hr-monaco-compile.hr-monaco__run-code.ui-btn-styled");


  } catch (err) {
    console.log("Error in questionSolver:", err);
    throw err;
  }
}
