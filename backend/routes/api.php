<?php
// routes/api.php
use App\Http\Controllers\Api\ApplicationController;

Route::resource('applications', ApplicationController::class);
