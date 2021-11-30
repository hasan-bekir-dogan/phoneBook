<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LabelNameTypes extends Model
{
    use HasFactory;

    protected $table = 'label_name_types';

    protected $fillable = [
        'name'
    ];
}
