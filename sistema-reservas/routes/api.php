<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\RoomController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Aqui é onde você pode registrar as rotas da API para sua aplicação. Essas
| rotas são carregadas pelo RouteServiceProvider e todas serão atribuídas
| ao grupo de middleware "api". Faça algo incrível!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::apiResource('reservations', ReservationController::class);

Route::apiResource('rooms', RoomController::class);
