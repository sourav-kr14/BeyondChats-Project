<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Article extends Model
{
    use HasFactory;

    protected $fillable = [
        'original_id',
        'title',
        'slug',
        'content',
        'source_url',
        'version',
        'references',
    ];
}
