<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = ['name','image'];

    protected $hidden = ['created_at','updated_at'];

    public function isPartOfStore(Store $store){
        return StoreProducts::where('store_id',$store->id)->where('product_id',$this->id)->exists();
    }

}
