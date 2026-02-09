// Variable definitions
const baseUrl = "https://www.saucedemo.com/";
const standardUser = "standard_user";

// A mock-up of an automation script
const runLoginTest = async () => {
    console.log("Step 1: Navigate to " + baseUrl);
    
    // Using 'await' to simulate waiting for the page
    await console.log("Step 2: Entering username: " + standardUser);
    
    const isLoginSuccessful = true; // Simulating a result

    if (isLoginSuccessful) {
        console.log("Test Passed: User redirected to Dashboard.");
    } else {
        console.log("Test Failed: Error message displayed.");
    }
};

runLoginTest();