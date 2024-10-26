// script.js

// Function to generate a random password based on selected criteria
function generate() {
    let dictionary = ""; // Initialize an empty string for the password characters

    // Check which character types are selected and add them to the dictionary
    if (document.getElementById("lowercaseCb").checked) {
        dictionary += "qwertyuiopasdfghjklzxcvbnm";
    }
    if (document.getElementById("uppercaseCb").checked) {
        dictionary += "QWERTYUIOPASDFGHJKLZXCVBNM";
    }
    if (document.getElementById("digitsCb").checked) {
        dictionary += "1234567890";
    }
    if (document.getElementById("specialsCb").checked) {
        dictionary += "!@#$%^&*()_+-={}[];<>:";
    }

    const length = document.querySelector('input[type="range"]').value; // Get the desired password length

    // If the length is less than 1 or no character types are selected, exit the function
    if (length < 1 || dictionary.length === 0) {
        return;
    }

    let password = ""; // Initialize the password variable
    // Generate the password
    for (let i = 0; i < length; i++) {
        const pos = Math.floor(Math.random() * dictionary.length); // Get a random position from the dictionary
        password += dictionary[pos]; // Append the character to the password
    }

    // Display the generated password in the input field
    document.querySelector('input[type="text"]').value = password;
}

// Add event listeners to checkboxes and the generate button
[...document.querySelectorAll('input[type="checkbox"], button.generate')].forEach((elem) => {
    elem.addEventListener("click", generate);
});

// Update the displayed password length when the range input is adjusted
document.querySelector('input[type="range"]').addEventListener("input", (e) => {
    document.querySelector("div.range span").innerHTML = e.target.value; // Update the displayed length
    generate(); // Regenerate the password
});

// Handle the copy to clipboard functionality
document.querySelector("div.password button").addEventListener("click", () => {
    const pass = document.querySelector('input[type="text"]').value; // Get the generated password
    navigator.clipboard.writeText(pass).then(() => { // Copy password to clipboard
        document.querySelector("div.password button").innerHTML = "copied!"; // Update button text
        setTimeout(() => {
            document.querySelector("div.password button").innerHTML = "copy"; // Reset button text after 1 second
        }, 1000);
    });
});

// Generate an initial password on page load
generate();
