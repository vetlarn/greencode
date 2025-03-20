document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("contact-form").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent the default form submission

        const form = event.target;
        const formData = new FormData(form);

        fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            })
            .then((response) => response.json())
            .then((data) => {
                if (data.success) {
                    // Get the sender's name
                    const senderName = form.querySelector("#name").value;

                    // Show the response box
                    const responseBox = document.getElementById("form-response");
                    responseBox.style.display = "block";
                    responseBox.innerHTML = `
                        <strong>Thank you, ${senderName}!</strong><br><br>
                        Your message has been received.<br>
                        We will get back to you shortly.<br><br>
                        Have a nice day!
                    `; // Success message with line breaks

                    // Hide the response box after 10 seconds
                    setTimeout(() => {
                        responseBox.style.display = "none";
                        form.reset(); // Clear the form fields AFTER the response box disappears
                    }, 10000); // 10 seconds
                } else {
                    alert("There was an error submitting the form. Please try again.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("There was an error submitting the form. Please try again.");
            });
    });
});
