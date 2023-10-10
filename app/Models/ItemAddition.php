<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ItemAddition extends Model {
  use HasFactory;

  public function item() {
    return $this->belongsTo(OrderItem::class, 'item', 'id');
  }
}
