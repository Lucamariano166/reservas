<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Reservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_id',
        'start_time',
        'end_time',
        'user_name',
    ];

    public function room()
    {
        return $this->belongsTo(Room::class);
    }
}
