<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderItem extends Model {
  use HasFactory;

  public $timestamps = false;
  protected $fillable = ['sandwich', 'size', 'order', 'price', 'quantity', 'unit_price', 'additions'];

  # Relations
  function sandwich() {
    return $this->belongsTo(Sandwich::class, 'sandwich', 'id');
  }

  function order() {
    return $this->belongsTo(Order::class, 'order', 'id');
  }

  function additions() {
    return $this->hasMany(ItemAddition::class, 'item', 'id');
  }
}
