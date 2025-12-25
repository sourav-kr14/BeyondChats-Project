<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
 
    public function up(): void
    {
        Schema::create('articles', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->longText('content');
            $table->string('source_url')->nullable();
            $table->enum('version',['original','updated'])->default('original');
            $table->text('references')->nullable();
            $table->timestamps();
            $table->unsignedBigInteger('original_id')->nullable()->after('id');

        });
    }

   
    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
