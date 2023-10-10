<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
  use HasFactory;

  public function sandwiches() {
    return $this->hasMany(Sandwich::class, 'section', 'id');
  }

}
