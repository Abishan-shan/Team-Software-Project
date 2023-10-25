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
        Schema::create('prescriptions', function (Blueprint $table) {
            $table->id();
            $table->string("MName");
            $table->string("Dosage");
            $table->string("Frequency");
            $table->string("Prescriber");
            $table->string("PatientId");
            $table->string("MDetails");
            $table->string("SDate");
            $table->string("EDate");
            $table->string("Note");

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('prescriptions');
    }
};
