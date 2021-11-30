<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Addresses extends Model
{
    use HasFactory;

    protected $table = 'addresses';

    protected $fillable = [
        'contact_id',
        'label_name_id',
        'street',
        'postal_code',
        'district',
        'city',
        'country',
        'explicit_address'
    ];
}
