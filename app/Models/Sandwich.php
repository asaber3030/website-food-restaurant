<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sandwich extends Model
{
  use HasFactory;

  protected $fillable = ['name', 'ingredients', 'image'];

  public function section() {
    return $this->belongsTo(Section::class, 'section', 'id');
  }
}
