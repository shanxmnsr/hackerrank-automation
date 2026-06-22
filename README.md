# HackerRank Automation

## Project Overview

HackerRank Automation is a browser automation project built with Puppeteer that automates repetitive interactions on the HackerRank platform.

The application launches a Chromium browser, logs into HackerRank, navigates through the Algorithms section, opens a challenge, injects a predefined solution into the code editor, and runs the solution automatically.

This project demonstrates practical browser automation techniques using Node.js and Puppeteer.

---

# Why This Project

Manually navigating coding platforms involves repetitive actions such as:

* Logging in
* Opening challenges
* Copying code
* Pasting solutions
* Running code

This project automates these repetitive tasks and showcases how browser automation can interact with real-world web applications.

---

# Core Features

## Automated Login

The application automatically logs into HackerRank using stored credentials.

---

## Browser Automation

Puppeteer controls a Chromium browser and performs actions just like a real user.

---

## Challenge Navigation

The script automatically:

* Opens the Algorithms section
* Applies the Warmup challenge filter
* Loads available challenges

---

## Automated Code Injection

Solutions stored inside a local JavaScript file are automatically inserted into the HackerRank code editor.

---

## Monaco Editor Interaction

The automation handles HackerRank's Monaco Editor by:

* Focusing the editor
* Selecting existing code
* Pasting predefined solutions

---

## Automated Code Execution

After inserting the solution, the application automatically triggers the Run Code action.

---

# Application Workflow

1. Launch Chromium Browser
2. Open HackerRank Login Page
3. Authenticate User
4. Navigate to Algorithms
5. Apply Warmup Filter
6. Open Challenge
7. Load Solution from Local File
8. Inject Code into Monaco Editor
9. Run Solution

---

# System Architecture

```text
Node.js Application
        ↓
Puppeteer
        ↓
Chromium Browser
        ↓
HackerRank Website
        ↓
Challenge Interaction
        ↓
Code Injection & Execution
```

---

# Tech Stack

## Backend

* Node.js
* JavaScript

---

## Automation

* Puppeteer

---

# Project Structure

```text
hackerrank-automation/
│
├── hk.js          # Main automation script
├── codes.js       # Predefined solutions
├── package.json
├── package-lock.json
│
└── README.md
```

---

# Key Engineering Concepts Used

* Browser Automation
* DOM Manipulation
* Form Automation
* Async/Await Programming
* Event Handling
* Web Navigation
* Scripted User Actions

---

# Challenges Solved

* Automating website login
* Handling dynamic page content
* Interacting with hidden elements
* Working with Monaco Editor
* Automating code insertion
* Managing asynchronous browser actions

---


# Author

## Shania Mansoori

---

# Support

If you found this project useful, consider giving it a star on GitHub.
