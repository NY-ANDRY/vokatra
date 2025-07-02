<?php

use App\Http\Controllers\Activites;
use App\Http\Controllers\Categories;
use App\Http\Controllers\Home;
use App\Http\Controllers\Produits;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Clients;

Route::get('/', [Home::class, 'index']);
Route::get('/clients', [Clients::class, 'all']);

Route::prefix('/api')->group(function () {
    Route::get('/dashboard/activites', [Activites::class, 'index']);
    Route::get('/dashboard/categories', [Categories::class, 'index']);

    Route::get('/categories', [Categories::class, 'index']);

    Route::get('/produits', [Produits::class, 'index']);
    Route::get('/produits/{id}', [Produits::class, 'one']);
});
