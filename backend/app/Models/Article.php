<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

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

    protected $casts = [
        'references' => 'array',
        'version' => 'integer',
    ];

   
    protected static function boot()
    {
        parent::boot();
        static::creating(fn ($article) => $article->slug ??= Str::slug($article->title));
    }
}