<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Application extends Model
{
    protected $table = 'applications';
    protected $primaryKey = 'application_id';
    public $incrementing = false;
    protected $fillable = [
        'candidate_id',
        'job_id',
        'application_date',
        'status',
    ];
    public $timestamps = false;

    // Relationship with Candidate
    public function candidate(): BelongsTo
    {
        return $this->belongsTo(Candidate::class, 'candidate_id', 'candidate_id');
    }

    // Relationship with Job
    public function job(): BelongsTo
    {
        return $this->belongsTo(Job::class, 'job_id', 'job_id');
    }
}
