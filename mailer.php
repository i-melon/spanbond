<?php
/**
 * Import PHPMailer classes into the global namespace
 * These must be at the top of your script, not inside a function
 */
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use Dotenv\Dotenv;

/**
 * Load Composer's autoloader
 */
require 'vendor/autoload.php';

// Dotenv initialization
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->load();

// Set CORS
header("Access-Control-Allow-Origin: " . $_ENV['CORS_ORIGIN']);
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header("Access-Control-Allow-Headers: *");


/**
 * Handle cases where the script is accessed with an unsupported method
 * or without a POST request
 */ 
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    $response = array('status' => 'error', 'message' => "Invalid request.");
    die(json_encode($response));
}

/**
 * Sending Email Request
 */ 
$_POST = json_decode(file_get_contents("php://input"), true);

// Create an instance; passing `true` enables exceptions
$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';

try {
    // Mail Variables
    $mailSubject = $_ENV['APP_NAME'] . " | Обратная связь";
    $mailBody = $_POST['phoneNumber'];

    if (isset($_POST['name'])) {
        $mailBody .= ", " . $_POST['name'];
    }

    // Server settings
    $mail->SMTPDebug = SMTP::DEBUG_OFF;               // Enable verbose debug output
    $mail->isSMTP();                                  // Send using SMTP
    $mail->Host       = $_ENV['SMTP_HOST'];           // Set the SMTP server to send through
    $mail->SMTPAuth   = true;                         // Enable SMTP authentication
    $mail->Username   = $_ENV['SMTP_USERNAME'];       // SMTP username
    $mail->Password   = $_ENV['SMTP_PASSWORD'];       // SMTP password
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;  // Enable implicit TLS encryption
    $mail->Port       = 465;                          // TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    
    // Recipients
    $mail->setFrom($_ENV['SMTP_USERNAME']);   
    $mail->addAddress($_ENV['SMTP_TO']);              // Add a recipient 
    
    // Content
    $mail->isHTML(false);
    $mail->Subject = $mailSubject;
    $mail->Body = $mailBody;
    $mail->send();

    // Retuen Response
    $response = array(
        'status' => 'success', 
        'message' => "Suiii"
    );
    echo json_encode($response);
} 
catch (Exception $e) 
{
    http_response_code(500);
    $response = array(
        'status' => 'error', 
        'message' => "Message could not be sent. Mailer Error: {$mail->ErrorInfo}"
    );
    die(json_encode($response));
}