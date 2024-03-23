<?php

namespace App\Models;

// hooks Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Str;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable implements MustVerifyEmail
{

  use SoftDeletes, Notifiable;

  protected $fillable = [
    'name',
    'email',
    'password',
    'phone'
  ];

  use HasApiTokens, HasFactory, Notifiable;

  protected $hidden = [
    'password',
    'remember_token',
  ];
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  protected function name(): Attribute {
    return Attribute::make(
      get: fn($value) => Str::title($value),
      set: fn($value) => Str::title($value),
    );
  }

  # Relations
  function addresses() {
    return $this->hasMany(Address::class, 'user', 'id');
  }

  function orders() {
    return $this->hasMany(Order::class, 'user', 'id');
  }

}
