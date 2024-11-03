<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $fullName = $_POST['fullName'];
    $email = $_POST['email'];
    $mobileNumber = $_POST['mobileNumber'];
    $message = $_POST['message'];

    // Validasi input
    if (empty($fullName) || empty($email) || empty($mobileNumber) || empty($message)) {
        echo json_encode(['success' => false, 'error' => 'Semua field harus diisi!']);
        exit;
    }

    // Set email penerima
    $to = "drann798@gmail.com"; // Ganti dengan email yang ingin Anda gunakan
    $subject = "Pesan dari Kontak: $fullName";
    $body = "Nama: $fullName\nEmail: $email\nNo. HP: $mobileNumber\nPesan: $message";
    $headers = "From: $email";

    // Kirim email
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Gagal mengirim email.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Metode permintaan tidak valid.']);
}

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


?>
