<?php
/**
 * Simple Contact Form Handler with Native SMTP Authentication
 * Uses fsockopen to communicate directly with the SMTP server.
 */

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo "Method Not Allowed";
    exit;
}

$name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email   = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

if (!$name || !$email || !$message) {
    http_response_code(400);
    echo "Please fill in all fields correctly.";
    exit;
}

// SMTP Configuration (Google Workspace / Gmail)
$smtp_server   = "smtp.gmail.com";
$smtp_port     = 465;
$smtp_username = "compressimagesize@gmail.com"; // Your email
$smtp_password = "svzlpoymzinxjaxm"; // Your App Password

// Email Headers
$to      = "compressimagesize@gmail.com"; // Where to send the message
$subject = "New Contact Form Submission from " . $name;

// Construct the email body
$body    = "You have received a new message from the CompressImageSize contact form.\r\n\r\n";
$body   .= "Name: " . $name . "\r\n";
$body   .= "Email: " . $email . "\r\n";
$body   .= "Message:\r\n" . $message . "\r\n";

// Function to send raw SMTP command and get response
function send_smtp_command($socket, $command, $expected_code) {
    if ($command) {
        fwrite($socket, $command . "\r\n");
    }
    $response = '';
    while ($line = fgets($socket, 515)) {
        $response .= $line;
        if (substr($line, 3, 1) == ' ') {
            break;
        }
    }
    if ($expected_code && substr($response, 0, 3) != $expected_code) {
        throw new Exception("SMTP Error: Expected $expected_code, got " . substr($response, 0, 3) . " - " . $response);
    }
    return $response;
}

try {
    // 1. Connect to SMTP server via SSL
    $socket = fsockopen("ssl://" . $smtp_server, $smtp_port, $errno, $errstr, 15);
    if (!$socket) {
        throw new Exception("Could not connect to SMTP host: $errno - $errstr");
    }

    // 2. Read greeting
    send_smtp_command($socket, null, '220');

    // 3. EHLO
    send_smtp_command($socket, "EHLO " . $_SERVER['SERVER_NAME'], '250');

    // 4. Authenticate
    send_smtp_command($socket, "AUTH LOGIN", '334');
    send_smtp_command($socket, base64_encode($smtp_username), '334');
    send_smtp_command($socket, base64_encode($smtp_password), '235');

    // 5. Envelope sender and recipient
    send_smtp_command($socket, "MAIL FROM:<" . $smtp_username . ">", '250');
    send_smtp_command($socket, "RCPT TO:<" . $to . ">", '250');

    // 6. Data
    send_smtp_command($socket, "DATA", '354');

    // 7. Construct message headers and body
    // RFC 2822 format
    $headers  = "From: Contact Form <" . $smtp_username . ">\r\n";
    $headers .= "To: <" . $to . ">\r\n";
    $headers .= "Reply-To: " . $name . " <" . $email . ">\r\n";
    $headers .= "Subject: " . $subject . "\r\n";
    $headers .= "Date: " . date("r") . "\r\n";
    $headers .= "Content-Type: text/plain; charset=utf-8\r\n";
    
    $payload = $headers . "\r\n" . $body . "\r\n.";
    send_smtp_command($socket, $payload, '250');

    // 8. Quit
    send_smtp_command($socket, "QUIT", '221');
    fclose($socket);

    // Determine redirect URL based on language
    $lang = filter_input(INPUT_POST, 'lang', FILTER_SANITIZE_STRING);
    $redirectUrl = "/thank-you.html";
    if ($lang && $lang !== 'en') {
        $redirectUrl = "/" . $lang . "/thank-you.html";
    }

    // Redirect to success page
    header("Location: " . $redirectUrl);
    exit;

} catch (Exception $e) {
    http_response_code(500);
    echo "<!DOCTYPE html><html><head><title>Error</title></head>";
    echo "<body style='font-family:sans-serif;text-align:center;padding:50px;'>";
    echo "<h2>Sorry, there was an error sending your message.</h2>";
    echo "<p>Please try again later or email us directly.</p>";
    echo "<p><small>Error details: " . htmlspecialchars($e->getMessage()) . "</small></p>"; // Uncomment for debugging
    echo "</body></html>";
}
