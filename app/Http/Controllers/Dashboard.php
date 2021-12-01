<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class Dashboard extends Controller
{
    public function index(){
        $orderNumber = 1;
        $productNumber = 1;
        $contactNumber = 1;
        $userNumber = 1;

        return view('dashboard', [
            'order_number' => $orderNumber,
            'product_number' => $productNumber,
            'contact_number' => $contactNumber,
            'user_number' => $userNumber
        ]);
    }
}
