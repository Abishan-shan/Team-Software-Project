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
        Schema::create('appointments', function (Blueprint $table) {
            $table->id();
            $table->string("FirstName");
            $table->string("LastName");
            $table->string("Email")->unique();
            $table->string("PatientId");
            $table->string("DepartmentName");
            $table->string("AppointmentWith");
            $table->string("Date");
            $table->string("Problem");
            $table->string("Sex");
            $table->timestamps();
            
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('appointments');
    }
};
