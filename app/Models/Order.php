<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model {

  use HasFactory;

  public $timestamps = false;
  protected $fillable = ['user', 'required_money', 'total_items', 'total_price', 'coupon_discount', 'coupon', 'status'];

  # Helpers
  function saveOrderItems($orderID, $items) {
    foreach ($items as $key => $item) {
      OrderItem::create([
        'sandwich' => $item['id'],
        'order' => $orderID,
        'quantity' => $item['quantity'],
        'price' => ($item['unitPrice'] + $item['sizesPrice'] + $item['additionsPrice']) * $item['quantity'],
        'additions' => $item['choosedAddition'],
        'size' => $item['choosedSize'],
        'unit_price' => $item['unitPrice'] + $item['sizesPrice'] + $item['additionsPrice']
      ]);
    }
  }

  # Relations
  function user() {
    return $this->belongsTo(User::class, 'user', 'id');
  }

  function coupon() {
    return $this->belongsTo(Coupon::class, 'coupon', 'id');
  }

  function order_items() {
    return $this->hasMany(OrderItem::class, 'order', 'id');
  }

}
