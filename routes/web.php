<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::controller(AppController::class)->group(function () {
  Route::get('/', 'home')->name('home');

  Route::get('/perform-logout', 'performLogout')->name('perform-logout');
});

Route::middleware(['auth', 'verified'])->group(function () {

  Route::controller(AppController::class)->group(function () {

    Route::group(['prefix' => 'profile', 'as' => 'profile.'], function () {

      Route::get('/', 'profile')->name('main');

      Route::group(['as' => 'addresses.', 'prefix' => 'addresses'], function () {

        Route::get('/', 'addresses')->name('main-page');

        Route::post('add', 'addAddress')->name('add');
        Route::post('delete', 'deleteAddress')->name('delete');
        Route::post('main', 'makeAddressMain')->name('main');
      });

      Route::group(['as' => 'orders.', 'prefix' => 'orders'], function () {
        Route::get('/', 'orders')->name('main');
        Route::get('view/{order}', 'viewOrder')->name('view');
        Route::post('cancel/{order}', 'cancelOrder')->name('cancel');
      })->middleware('verified');

    });

    Route::get('place-order', 'placeOrderView')->name('place.order');
    Route::post('place-order', 'placeOrderAction');

  });

});

Route::middleware('auth')->group(function () {
  Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
  Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
  Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


require __DIR__ . '/auth.php';
