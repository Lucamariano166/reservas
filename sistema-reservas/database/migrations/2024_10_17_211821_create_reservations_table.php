<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateReservationsTable extends Migration
{
    public function up()
    {
        Schema::create('reservations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('room_id')->constrained('rooms');
            $table->dateTime('start_time');
            $table->dateTime('end_time');
            $table->string('user_name');
            $table->timestamps();


            $table->unique(['room_id', 'start_time', 'end_time']);
        });
    }

    public function down()
    {
        Schema::dropIfExists('reservations');
    }
};
