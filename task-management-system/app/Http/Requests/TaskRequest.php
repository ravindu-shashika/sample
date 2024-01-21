<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class TaskRequest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }


    public function rules(): array
    {
                return [
                    'title' => 'required|string',
                    'description' => 'required',
                ];
    }

    public function messages(): array
    {
        return [
            'title.required' => 'Title is required!',
            'title.string' => 'Title Should be String!',
            'description.required' => 'Description is required!',
        ];

    }
}
