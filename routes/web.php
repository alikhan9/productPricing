<?php

use App\Http\Controllers\BasketController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\StoreController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::middleware('auth')->group(function () {

    // profile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');


    Route::get('/', function () {
        return Inertia::render('Home');
    })->name('home');

    // products
    Route::get('/products', [ProductController::class, 'index'])->name('products.index');
    Route::post('/products', [ProductController::class, 'store'])->name('products.store');
    Route::post('/products/{product}', [ProductController::class, 'update'])->name('products.update');

    // stores
    Route::get('/stores',[StoreController::class,'index'])->name('stores.index');
    Route::post('/stores',[StoreController::class,'store'])->name('stores.store');
    Route::delete('/stores/{store}',[StoreController::class,'destroy'])->name('stores.destroy');
    Route::post('/stores/{store}',[StoreController::class,'update'])->name('stores.update');
    Route::get('/stores/{store}/products',[StoreController::class,'manageProducts'])->name('stores.products');
    Route::post('/stores/{store}/products/{product}',[StoreController::class,'addProduct'])->name('stores.products.store');
    Route::delete('/stores/{store}/products/{product}',[StoreController::class,'removeProduct'])->name('stores.products.destroy');

    Route::get('/baskets',[BasketController::class, 'index'])->name('baskets.index');
    Route::post('/baskets',[BasketController::class, 'store'])->name('baskets.store');

    Route::middleware('can:manage-basket,basket')->group(function () {
        Route::delete('/baskets/{basket}',[BasketController::class, 'destroy'])->name('baskets.destroy');
        Route::put('baskets/{basket}',[BasketController::class, 'update'])->name('baskets.update');
        Route::post('baskets/{basket}/products/{product}',[BasketController::class, 'addProduct'])->name('baskets.products.store');
        Route::delete('baskets/{basket}/products/{product}',[BasketController::class, 'removeProduct'])->name('baskets.products.destroy');
        Route::get('baskets/{basket}/products',[BasketController::class, 'manageProducts'])->name('baskets.products');
        Route::get('/baskets/{basket}/optimal-pricing', [BasketController::class, 'optimalPricing'])->name('baskets.optimal');
    });

});

require __DIR__.'/auth.php';
