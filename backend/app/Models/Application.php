<?php

namespace App\Models;

use App\Enums\ApplicationStatus;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    protected $fillable = ['job_id', 'candidate_id', 'status', 'cover_letter', 'resume_path'];

    protected $casts = [
        'status' => ApplicationStatus::class,
    ];
    
    public function job()
    {
        return $this->belongsTo(Job::class);
    }

    public function candidate()
    {
        return $this->belongsTo(User::class, 'candidate_id');
    }
}