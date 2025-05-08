<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    // Define the table if it's different from the default model name pluralized (applications)
    protected $table = 'applications';

    // Specify the primary key column if it's not the default 'id'
    protected $primaryKey = 'application_id';

    // If the primary key is not an incrementing integer, set this to false
    public $incrementing = false;

    // Define the fields that are mass assignable
    protected $fillable = [
        'candidate_id',
        'job_id',
        'application_date',
        'status',
    ];

    // You can disable the timestamps if your table does not have 'created_at' and 'updated_at'
    public $timestamps = false;

    /**
     * Relationship with the Candidate model (assuming candidates have their own table)
     * @return BelongsTo
     */
    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class, 'candidate_id', 'candidate_id');
    }

    /**
     * Relationship with the Job model (assuming jobs have their own table)
     * @return BelongsTo
     */
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'job_id', 'job_id');
    }

    /**
     * Get the status text in a more readable format
     * @return string
     */
    public function getStatusTextAttribute(): string
    {
        switch ($this->status) {
            case 'pending':
                return 'Pending';
            case 'accepted':
                return 'Accepted';
            case 'rejected':
                return 'Rejected';
            default:
                return 'Unknown';
        }
    }

    // Optionally add validation rules for the Application model
    public static $rules = [
        'candidate_id' => 'required|exists:candidates,candidate_id', // Assumes a candidates table exists
        'job_id' => 'required|exists:jobs,job_id', // Assumes a jobs table exists
        'application_date' => 'required|date',
        'status' => 'required|in:pending,accepted,rejected',
    ];
}
