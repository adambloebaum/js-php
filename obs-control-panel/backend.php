<?php

ini_set('display_errors', 1);
error_reporting(E_ALL);

session_start();

$action = $_POST['action'] ?? '';
$athleteName = $_POST['athleteName'] ?? '';
$playerId = $_POST['playerId'] ?? '';
$message = "";

switch ($action) {
    case 'saveFilename':
        $filename = formatFilename($athleteName, $playerId);
        $_SESSION['filename'] = $filename;
        $message = "filename set - " . htmlspecialchars($filename);
        break;
    case 'startSession':
        if (!empty($_SESSION['filename'])) {
            startSession($_SESSION['filename']);
            $message = "recording started with filename " . htmlspecialchars($_SESSION['filename']);
        } else {
            $message = "no filename set";
        }
        break;
    case 'stopSession':
        stopSession();
        $message = "recording stopped";
        break;
    default:
        $message = "n/a";
        break;
}

echo $message;

function formatFilename($athleteName, $playerId) {
    // filename formatting in obs set as %YY-%MM-%DD-%hh-%mm-%ss with blank file formatting
    $nameParts = explode(' ', $athleteName);
    $lastName = array_pop($nameParts); // Assume the last part is the last name
    $firstInitial = $nameParts ? strtoupper($nameParts[0][0]) : ''; // First initial of the first name
    $formattedName = $lastName . '_' . $firstInitial . '_' . $playerId;
    return $formattedName;
}

function startSession($filename) {
    // Logic to start a new recording session
    $pythonPath = "PATH TO PYTHON EXECUTABLE";
    $scriptPath = "PATH TO PYTHON SCRIPT";

    $command = escapeshellcmd("$pythonPath $scriptPath " . escapeshellarg($filename));
    shell_exec($command);
}

function stopSession() {
    // Logic to stop the current recording session
    $pythonPath = "PATH TO PYTHON EXECUTABLE";
    $scriptPath = "PATH TO PYTHON SCRIPT";

    $command = escapeshellcmd("$pythonPath $scriptPath");
    shell_exec($command);
}
?>
