<?php

namespace App\Http\Controllers;

use App\Models\Basket;
use App\Models\Product;
use App\Models\StoreProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class BasketController extends Controller
{
    public function index()
    {
        return Inertia::render('Baskets', [
            "baskets" => auth()->user()->baskets,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        Basket::create([
            'name' => $request->name,
            'user_id' => auth()->user()->id,
        ]);

        return back();
    }

    public function destroy(Basket $basket)
    {
        $basket->delete();
        return back();
    }

    public function update(Request $request, Basket $basket)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
        ]);
        $basket->update($data);
        return back();
    }

    public function manageProducts(Basket $basket, Request $request)
    {
        $request->validate([
            'basketProducts' => 'boolean'
        ]);
        $notInIds = $basket->products()->pluck('product_id')->toArray();

        $availableProducts = Product::whereNotIn('id', $notInIds)->get();

        $basketProducts = true;

        if ($request->has('basketProducts')) {
            $basketProducts = $request->basketProducts;
        }
        return Inertia::render('ManageBasketProducts', [
            'basket' => $basket,
            'products' => $basketProducts ? $basket->products()->get() : $availableProducts,
            'basketProducts' => (boolean)$basketProducts
        ]);
    }

    public function addProduct(Request $request, Basket $basket, Product $product)
    {
        $request->validate([
            'quantity' => 'required|numeric'
        ]);

        $basket->addProduct($product, $request->quantity);
        return back();
    }

    public function removeProduct(Basket $basket, Product $product)
    {

        $basket->removeProduct($product);
        return back();
    }

    public function optimalPricing(Basket $basket)
    {
        $productIds = $basket->products()->pluck('product_id')->toArray();

        $subQuery = DB::table('store_products')->whereIn('product_id', $productIds)
            ->select('product_id', DB::raw('MIN(price) as min_price'))
            ->groupBy('product_id');

        $finalResult = DB::table('store_products')
            ->joinSub($subQuery, 'lowest_prices', function ($join) {
                $join->on('store_products.product_id', '=', 'lowest_prices.product_id')
                    ->on('store_products.price', '=', 'lowest_prices.min_price');
            })
            ->join('products', 'store_products.product_id', '=', 'products.id')
            ->join('stores', 'store_products.store_id', '=', 'stores.id') // Adjust 'store_id' column name based on your schema
            ->select('products.*', 'stores.*', 'store_products.*')
            ->get();

        return Inertia::render('OptimalPricing', [
            'products' => $finalResult,
        ]);
    }
}
