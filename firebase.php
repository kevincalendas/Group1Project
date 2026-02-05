<?php
// DEPRECATED: This file uses REST API for Firebase.
// Recommended: Use firebase-config.js and firebase-auth.js with the Firebase Web SDK instead.
// The Web SDK approach is more secure, real-time, and feature-rich.

// Legacy Firebase REST API configuration (for backward compatibility only)
$firebaseConfig = [
    'apiKey' => 'AIzaSyB7Eac47fswoK0xVKhL1_RHKX6xjSAysWE',
    'authDomain' => 'beatrix-core-database.firebaseapp.com',
    'databaseURL' => 'https://beatrix-core-database-default-rtdb.asia-southeast1.firebasedatabase.app',
    'projectId' => 'beatrix-core-database',
    'storageBucket' => 'beatrix-core-database.firebasestorage.app',
    'messagingSenderId' => '444256156441',
    'appId' => '1:444256156441:web:7b3aa0ca4041bed0a52388',
    'measurementId' => 'G-0ERX0XVSYC'
];

// Firebase Realtime Database helper (REST API)
$firebase_url = $firebaseConfig['databaseURL'];
$firebase_auth = '0JeGz57ApKLldIwBX7CLFC3fssR1NFHdNTaNcprd'; // Database secret for authenticated access

function firebase_request($method, $path, $data = null) {
    global $firebase_url, $firebase_auth;
    $url = rtrim($firebase_url, '/') . '/' . ltrim($path, '/') . '.json';
    if (!empty($firebase_auth)) {
        $url .= (strpos($url, '?') === false ? '?' : '&') . 'auth=' . urlencode($firebase_auth);
    }

    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, $method);
    if ($data !== null) {
        $payload = json_encode($data);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
        curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
    }

    $res = curl_exec($ch);
    if ($res === false) {
        $err = curl_error($ch);
        curl_close($ch);
        return ['error' => $err];
    }
    $http = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    $decoded = json_decode($res, true);
    return ['status' => $http, 'body' => $decoded];
}

function firebase_get($path) {
    $r = firebase_request('GET', $path);
    if (isset($r['error'])) die('Firebase error: ' . $r['error']);
    return $r['body'];
}

function firebase_post($path, $data) {
    $r = firebase_request('POST', $path, $data);
    if (isset($r['error'])) die('Firebase error: ' . $r['error']);
    return $r['body'];
}

function firebase_put($path, $data) {
    $r = firebase_request('PUT', $path, $data);
    if (isset($r['error'])) die('Firebase error: ' . $r['error']);
    return $r['body'];
}

?>
