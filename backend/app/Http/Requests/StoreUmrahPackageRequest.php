<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUmrahPackageRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'duration' => 'required|string|max:255',
            'price' => 'required|string|max:255',
            'hotel' => 'required|string|max:255',
            'hotel_rating' => 'nullable|integer|min:1|max:5',
            'hotelRating' => 'nullable|integer|min:1|max:5',
            'distance' => 'required|string|max:255',
            'inclusions' => 'nullable|array',
            'featured' => 'nullable|boolean',
            'image' => 'nullable|string',
        ];
    }
}
