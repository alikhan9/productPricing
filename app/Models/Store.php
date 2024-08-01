<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;

    protected $fillable = ['name','city','address','image'];

    protected $hidden = ['created_at','updated_at'];

    public function products(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(StoreProducts::class,'store_id','id');
    }

    public function removeProduct(Product $product){
        StoreProducts::where('store_id',$this->id)->where('product_id',$product->id)->delete();
    }
}
