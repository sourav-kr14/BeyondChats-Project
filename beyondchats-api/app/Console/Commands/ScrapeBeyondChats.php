<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Symfony\Component\DomCrawler\Crawler;
use App\Models\Article;
use Illuminate\Support\Str;

class ScrapeBeyondChats extends Command
{
    protected $signature = 'scrape:beyondchats';
    protected $description = 'Scrape oldest blogs from BeyondChats';

    public function handle()
    {
        $client = new Client([
            'headers' => ['User-Agent' => 'Mozilla/5.0']
        ]);

        // Fetch main blog page
        $response = $client->get('https://beyondchats.com/blogs/');
        $html = $response->getBody()->getContents();
        $crawler = new Crawler($html);

        $paginationLinks = $crawler->filter('a')->each(function ($node) {
            return $node->attr('href');
        });

        $pageLinks = array_filter($paginationLinks, function ($link) {
            return $link && str_contains($link, '/blogs/page/');
        });

        $pageLinks = array_unique($pageLinks);

        usort($pageLinks, function ($a, $b) {
            preg_match('/page\/(\d+)/', $a, $ma);
            preg_match('/page\/(\d+)/', $b, $mb);
            return ($ma[1] ?? 0) <=> ($mb[1] ?? 0);
        });

        $lastPageUrl = end($pageLinks);

        if (str_starts_with($lastPageUrl, '/')) {
            $lastPageUrl = 'https://beyondchats.com' . $lastPageUrl;
        }

        $this->info('Last page URL: ' . $lastPageUrl);


        $response = $client->get($lastPageUrl);
        $html = $response->getBody()->getContents();
        $crawler = new Crawler($html);


        $articles = $crawler->filter('article')->slice(0, 5);
        $count = 0;

        $articles->each(function ($node) use (&$count) {
            $title = trim($node->filter('h2, h3')->text());
            $url = $node->filter('a')->attr('href');

            if (str_starts_with($url, '/')) {
                $url = 'https://beyondchats.com' . $url;
            }

            if (Article::where('source_url', $url)->exists()) {
                return;
            }

            Article::create([
                'title'      => $title,
                'slug'       => Str::slug($title),
                'content'    => '',
                'source_url' => $url,
                'version'    => 'original'
            ]);

            $count++;
        }); 

        $this->info("Successfully stored {$count} oldest articles"); 
    }
}
