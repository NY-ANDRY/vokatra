<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'], // Ensure your API routes are included
    'allowed_methods' => ['*'], // Or specify methods like ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
    'allowed_origins' => [
        '*', // **THIS IS CRUCIAL: Add your frontend URL**
        // 'http://127.0.0.1:5173', // If your frontend sometimes runs on 127.0.0.1
        // 'http://localhost:3000', // If you have other local frontend setups
        // Add your production frontend URL(s) when deploying, e.g., 'https://your-frontend-domain.com'
    ],
    'allowed_origins_patterns' => [],
    'allowed_headers' => ['*'], // Or specify headers, e.g., ['Content-Type', 'Authorization', 'X-Requested-With']
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true, // **THIS MUST BE TRUE if your frontend sends credentials**
];