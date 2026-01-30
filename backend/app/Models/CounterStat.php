<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class CounterStat extends Model
{
    use HasFactory;

    protected $fillable = [
        'icon',
        'target',
        'suffix',
        'label',
    ];
}
