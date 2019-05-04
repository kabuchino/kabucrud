<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::get('/CRUD/{table}','CRUDController@index');
Route::post('/CRUD/{table}','CRUDController@store');
Route::put('/CRUD/{table}/{id}','CRUDController@update');
Route::delete('/CRUD/{table}/{id}','CRUDController@delete');
Route::get('/CRUDsearch/{table}/{parameter}','CRUDController@search');

