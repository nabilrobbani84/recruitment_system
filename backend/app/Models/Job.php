<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Job extends Model
{
    // Define the table name if it's different from the model name (jobs)
    protected $table = 'jobs';

    // Specify the primary key column if it's not 'id'
    protected $primaryKey = 'job_id';

    // Set the primary key to be non-incrementing if needed
    public $incrementing = false;

    // Define the fields that are mass assignable
    protected $fillable = [
        'job_title',
        'description',
        'requirements',
        'location',
        'date_posted',
        'status',
    ];

    // If you don't have timestamps
    public $timestamps = false;

    // Optional: Add validation rules for the Job model
    public static $rules = [
        'job_title' => 'required|string|max:255',
        'description' => 'required|string',
        'requirements' => 'required|string',
        'location' => 'required|string',
        'status' => 'required|in:active,inactive',
    ];
}
