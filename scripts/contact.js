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
                        <strong>Takk, ${senderName}!</strong><br><br>
                        Din melding er mottatt.<br>
                        Vi kommer tilbake til deg så snart som mulig.<br><br>
                        Ha en fin dag!
                    `; // Success message with line breaks

                    // Hide the response box after 10 seconds
                    setTimeout(() => {
                        responseBox.style.display = "none";
                        form.reset(); // Clear the form fields AFTER the response box disappears
                    }, 10000); // 10 seconds
                } else {
                    alert("Det oppsto en feil ved innsending av skjemaet. Vennligst prøv igjen.");
                }
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Det oppsto en feil ved innsending av skjemaet. Vennligst prøv igjen.");
            });
    });
});