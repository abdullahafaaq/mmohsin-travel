<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('umrah_packages', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('duration');
            $table->string('price');
            $table->string('hotel');
            $table->integer('hotel_rating')->default(3);
            $table->string('distance');
            $table->json('inclusions');
            $table->boolean('featured')->default(false);
            $table->text('image')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('umrah_packages');
    }
};
