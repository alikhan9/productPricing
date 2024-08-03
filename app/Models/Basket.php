<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Basket extends Model
{
    use HasFactory;

    protected $fillable = ['name','user_id'];

    protected $hidden = ['created_at','updated_at'];

    public function user(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(BasketProduct::class);
    }

    public function addProduct(Product $product, float $quantity)
    {
        BasketProduct::create(['basket_id' => $this->id, 'product_id' => $product->id, 'quantity' => $quantity]);
    }

    public function removeProduct(Product $product)
    {
        BasketProduct::where('basket_id', $this->id)->where('product_id', $product->id)->delete();
    }
}
