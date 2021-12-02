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
        $totalGroupNumber = Cache::get('totalGroupNumber', function () {
            return Groups::count();
        });
        $totalContactNumber = Cache::get('totalContactNumber', function () {
            return Contacts::count();
        });

        return view('dashboard', [
            'totalGroupNumber' => $totalGroupNumber,
            'totalContactNumber' => $totalContactNumber
        ]);
    }
}
