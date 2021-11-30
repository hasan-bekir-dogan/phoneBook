<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Phones extends Model
{
    use HasFactory;

    protected $table = 'phones';

    protected $fillable = [
        'contact_id',
        'label_name_id',
        'phone'
    ];
}
