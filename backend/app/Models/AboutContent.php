<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AboutContent extends Model
{
    use HasFactory;

    protected $fillable = [
        'hero_title',
        'hero_description',
        'main_title',
        'paragraphs',
        'mission',
        'vision',
        'years_experience',
    ];

    protected $casts = [
        'paragraphs' => 'array',
    ];
}
