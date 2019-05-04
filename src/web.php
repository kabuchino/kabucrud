<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get("gestion", "TestController@index");
Route::get("/gestion/localidades", "TestController@localidades")->name("gestion_localidades");
Route::get("/gestion/users","TestController@users")->name("gestion_users");