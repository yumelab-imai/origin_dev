<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/', function () {
    return redirect('client/login');
});

// ユーザー
Route::post('/user/login', [UserController::class, 'login']);

// ユーザーログインしたものしか受け付けない
Route::middleware(['auth:sanctum', 'ability:user'])->group(function () {
    Route::get('/user/check-auth', [UserController::class, 'checkAuth']);
    Route::post('/user/logout', [UserController::class, 'logout']);
    Route::get('/user/top', [UserController::class, 'showTop']);
});
