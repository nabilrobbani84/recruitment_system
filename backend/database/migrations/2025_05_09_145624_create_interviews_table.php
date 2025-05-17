<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('interviews', function (Blueprint $table) {
            $table->id();
            $table->foreignId('application_id')->constrained();
            $table->date('interview_date'); 
            $table->time('interview_time'); 
            $table->string('interview_location');
            $table->enum('status', ['scheduled', 'completed', 'canceled'])->default('scheduled'); 
            $table->timestamps(); 
        });
    }

    public function down()
    {
        Schema::dropIfExists('interviews');
    }
};
