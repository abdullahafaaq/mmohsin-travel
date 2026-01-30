<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SiteSettings extends Model
{
    use HasFactory;

    protected $fillable = [
        'company_name',
        'email',
        'phones',
        'whatsapp',
        'address',
        'social_links',
        'business_hours',
    ];

    protected $casts = [
        'phones' => 'array',
        'social_links' => 'array',
        'business_hours' => 'array',
    ];
}
