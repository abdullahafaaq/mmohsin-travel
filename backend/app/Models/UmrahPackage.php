<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UmrahPackage extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'duration',
        'price',
        'hotel',
        'hotel_rating',
        'distance',
        'inclusions',
        'featured',
        'image',
    ];

    protected $casts = [
        'inclusions' => 'array',
        'featured' => 'boolean',

        // Convert to camelCase for API responses
        public function toArray()
        {
            $array = parent::toArray();
        
            // Convert snake_case to camelCase
            if (isset($array['hotel_rating'])) {
                $array['hotelRating'] = $array['hotel_rating'];
                unset($array['hotel_rating']);
            }
        
            if (isset($array['created_at'])) {
                $array['createdAt'] = $array['created_at'];
                unset($array['created_at']);
            }
        
            if (isset($array['updated_at'])) {
                $array['updatedAt'] = $array['updated_at'];
                unset($array['updated_at']);
            }
        
            return $array;
        }
    ];
}
