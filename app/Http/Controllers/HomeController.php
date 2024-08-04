<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(){

        $products = DB::select("SELECT product.id as 'product.id',product.name as 'product.name',product.image as 'product.image', store.name as 'store.name',store.city as 'store.city',store.address as 'store.address',store.image as 'store.image', store.price as 'product.price' from products product INNER JOIN (SELECT x.price, x.product_id,y.* from store_products x INNER JOIN stores y on x.store_id = y.id) store on product.id = store.product_id order by product.id, price");

        return Inertia::render('Home',[
            "products" => $products
        ]);
    }
}
