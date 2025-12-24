<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ArticleController extends Controller
{
    
    public function index()
    {
        return response()->json([
            'data' => Article::latest()->get()
        ]);
    }

   
    public function store(Request $request)
    {
        $article = Article::create([
            'title'      => $request->title,
            'slug'       => Str::slug($request->title),
            'content'    => $request->content,
            'source_url' => $request->source_url,
            'version'    => $request->version ?? 'original',
            'references' => $request->references,
        ]);

        return response()->json($article, 201);
    }

   
    public function show(Article $article)
    {
        return response()->json($article);
    }

    
    public function update(Request $request, Article $article)
    {
        $article->update($request->all());
        return response()->json($article);
    }

    
    public function destroy(Article $article)
    {
        $article->delete();
        return response()->json(null, 204);
    }
}
