<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contacts extends Model
{
    use HasFactory;

    protected $table = 'contacts';

    protected $fillable = [
        'group_id',
        'profile_photo_path',
        'first_name',
        'last_name',
        'company',
        'birthday',
        'notes'
    ];
}
