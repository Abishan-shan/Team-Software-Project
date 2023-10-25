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
        Schema::create('patients', function (Blueprint $table) {
            $table->id();
            $table->string("FName");
            $table->string("LName");
            $table->string("Email")->unique();
            $table->string("Password");
            $table->string("PreferTo");
            $table->string("MStatus");
            $table->string("Address");
            $table->string("Occupation");
            $table->string("Mobile");
            $table->mediumText("Image")->nullable();
            $table->string("History");
            $table->string("DOB");
            $table->string("BGroup");
            $table->string("Sex");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patients');
    }
};
