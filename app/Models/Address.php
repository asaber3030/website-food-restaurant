<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Address extends Model
{
  use HasFactory;
  protected $fillable = ['address', 'gove', 'user', 'main'];

  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }
}
