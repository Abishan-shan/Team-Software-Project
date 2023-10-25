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
        Schema::create('doctors', function (Blueprint $table) {
            $table->id();
            $table->string("FName");
            $table->string("LName");
            $table->string("Email");
            $table->string("Password");
            $table->string("Designation");
            $table->string("Department");
            $table->string("Address");
            $table->string("Specialist");
            $table->string("Mobile");
            $table->string("Image");
            $table->string("Bio");
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
        Schema::dropIfExists('doctors');
    }
};
