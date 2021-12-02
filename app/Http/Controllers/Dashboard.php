<?php

namespace App\Http\Controllers;

use App\Models\Contacts;
use App\Models\Groups;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;

class Dashboard extends Controller
{
    public function index(){
        $totalGroupNumber = Cache::remember('totalGroupNumber', 30*60, function(){
            return Groups::count();
        });
        $totalContactNumber = Cache::remember('totalContactNumber', 30*60, function(){
            return Contacts::count();
        });

        return view('dashboard', [
            'totalGroupNumber' => $totalGroupNumber,
            'totalContactNumber' => $totalContactNumber
        ]);
    }
}
