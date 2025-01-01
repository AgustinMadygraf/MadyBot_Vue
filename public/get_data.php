<?php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json; charset=utf-8');

try {
    $data = [
        'endpoint' => 'http://192.168.0.118:5000',
        'timestamp' => date('Y-m-d H:i:s')
    ];

    echo json_encode($data);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'error' => 'Error al obtener endpoint',
        'message' => $e->getMessage()
    ]);
}