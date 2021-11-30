<?php


namespace App\Helpers;


use Illuminate\Support\Facades\App;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\URL;

class Helper
{
    public static function set_active($routes) {

        $currentUrlPath = request()->path();

        $words = explode("/", $currentUrlPath);

        foreach($words as $word) {
            foreach($routes as $route) {
                if (str_contains($word, $route))
                    return 'active';
            }
        }

    }
}
