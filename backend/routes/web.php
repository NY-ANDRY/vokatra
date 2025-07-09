<?php

use App\Http\Controllers\Activites;
use App\Http\Controllers\Categories;
use App\Http\Controllers\Commandes;
use App\Http\Controllers\Factures;
use App\Http\Controllers\Home;
use App\Http\Controllers\Livraisons_lieux;
use App\Http\Controllers\Paiements_mode;
use App\Http\Controllers\Paniers;
use App\Http\Controllers\Paniers_products;
use App\Http\Controllers\Produits;
use App\Http\Controllers\Saisons;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Stock;
use App\Http\Controllers\Test;

Route::get('/', [Home::class, 'index']);

Route::prefix('/api')->group(function () {
    Route::get('/dashboard/activites', [Activites::class, 'index']);
    Route::get('/dashboard/categories', [Categories::class, 'index']);

    Route::get('/categories', [Categories::class, 'index']);
    Route::get('/saisons', [Saisons::class, 'index']);
    Route::get('/test', [Test::class, 'index']);
    
    Route::get('/produits', [Produits::class, 'index']);
    Route::get('/produits/{id}', [Produits::class, 'show']);
    Route::post('/produits', [Produits::class, 'store']);
    Route::put('/produits', [Produits::class, 'edit']);
    Route::delete('/produits', [Produits::class, 'destroy']);

    Route::post('/stocks/produits', [Stock::class, 'store']);

    Route::post('/paniers', [Paniers::class, 'store']);
    Route::get('/paniers', [Paniers::class, 'show']);
    Route::delete('/paniers', [Paniers::class, 'delete']);

    Route::delete('/paniers_products', [Paniers_products::class, 'delete']);

    Route::get('/commandes', [Commandes::class, 'index']);
    Route::post('/commandes', [Commandes::class, 'store']);
    Route::get('/commandes/{id}', [Commandes::class, 'get']);

    Route::get('/factures', [Factures::class, 'all']);
    Route::post('/factures', [Factures::class, 'store']);
    Route::get('/factures/{id}', [Factures::class, 'get']);

    Route::get('/modes_paiements', [Paiements_mode::class, 'index']);
    Route::get('/livraisons_lieux', [Livraisons_lieux::class, 'index']);
});
