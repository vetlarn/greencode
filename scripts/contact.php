<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $subject = htmlspecialchars($_POST['subject']);
    $message = htmlspecialchars($_POST['message']);

    // Validate email address
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        die("Invalid email address.");
    }

    // SenderMail API credentials
    $apiKey = 'replacethis'; // Replace with your SenderMail API Key

    // Email to the website owner
    $ownerEmail = [
        'to' => 'hgvetle@gmail.com', // Replace with your email
        'subject' => "New Contact Form Submission: $subject",
        'body' => "You have received a new message:\n\nName: $name\nEmail: $email\nSubject: $subject\nMessage:\n$message"
    ];

    // Confirmation email to the sender
    $confirmationEmail = [
        'to' => $email,
        'subject' => "Thank you for contacting us!",
        'body' => "Hi $name,\n\nThank you for reaching out to us! We have received your message and will get back to you shortly.\n\nBest regards,\nThe Green Code Project Team"
    ];

    // Function to send email via SenderMail
    function sendEmail($emailData, $apiKey) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, 'https://trial-yxj6lj9x9px4do2r.mlsender.net'); // Replace with SenderMail's API endpoint
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            "Authorization: Bearer $apiKey",
            'Content-Type: application/json'
        ]);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
            'from' => [
                'email' => 'hgvetle@gmail.com', // Replace with your verified SenderMail email
                'name' => 'Green Code Project'
            ],
            'to' => [
                ['email' => $emailData['to']]
            ],
            'subject' => $emailData['subject'],
            'html' => nl2br($emailData['body']),
            'text' => $emailData['body']
        ]));
        $response = curl_exec($ch);
        curl_close($ch);

        return json_decode($response, true);
    }

    // Send emails
    $ownerResponse = sendEmail($ownerEmail, $apiKey);
    $confirmationResponse = sendEmail($confirmationEmail, $apiKey);

    if ($ownerResponse['success'] && $confirmationResponse['success']) { // Adjust based on SenderMail's response format
        echo "Message sent successfully!";
    } else {
        echo "Failed to send message. Please try again later.";
        // Log the responses for debugging
        file_put_contents('email_log.txt', print_r($ownerResponse, true), FILE_APPEND);
        file_put_contents('email_log.txt', print_r($confirmationResponse, true), FILE_APPEND);
    }
}
?>
