<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Candidate extends Model
{
    // Define the table if it's different from the default model name pluralized (candidates)
    protected $table = 'candidates';

    // Specify the primary key column if it's not the default 'id'
    protected $primaryKey = 'candidate_id';

    // If the primary key is not an incrementing integer, set this to false
    public $incrementing = false;

    // Define the fields that are mass assignable
    protected $fillable = [
        'user_id', 
        'address',
        'phone_number',
        'cv', 
        'status',
    ];

    // You can disable the timestamps if your table does not have 'created_at' and 'updated_at'
    public $timestamps = false;

    /**
     * Define relationship with the User model (assuming users have their own table)
     * @return BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'user_id');
    }

    // Optional: Add validation rules for the Candidate model
    public static $rules = [
        'user_id' => 'required|exists:users,user_id', // Assumes a users table exists
        'address' => 'required|string|max:255',
        'phone_number' => 'required|string|max:15',
        'cv' => 'nullable|file|mimes:pdf,docx', // Assuming CV is uploaded as a file
        'status' => 'required|in:active,inactive', // Assuming statuses are either active or inactive
    ];
}
