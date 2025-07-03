<?php

use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->validateCsrfTokens(except: [
            'stripe/*', // Exclut toutes les routes commençant par 'stripe/'
            'webhook/paypal', // Exclut une route spécifique
            '*', // Exclut une URL complète
        ]);    })
    ->withExceptions(function (Exceptions $exceptions): void {
        //
    })->create();
