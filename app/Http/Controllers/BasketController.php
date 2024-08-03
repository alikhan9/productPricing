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
        // Assuming $productIds contains the IDs you want to filter by
        $productIds = $basket->products()->pluck('product_id')->toArray();

// Convert the array of product IDs to a string suitable for inclusion in the SQL query
        $productIdInClause = implode(',', array_map(function ($id) {
            return "'{$id}'"; // Wrap each ID in single quotes
        }, $productIds));

// Construct the final SQL query with the IN clause for filtering by product IDs
        $query = "SELECT sp.id FROM store_products sp JOIN (
            SELECT product_id, MIN(price) AS min_price FROM store_products GROUP BY product_id
          ) min_prices ON sp.product_id = min_prices.product_id AND sp.price = min_prices.min_price
          WHERE sp.product_id IN ($productIdInClause)";

// Execute the modified query
        $IdsCheapestProduct = DB::select($query);

        $arrayOfIdsCheapestProduct = [];
        foreach ($IdsCheapestProduct as &$value) {
            $arrayOfIdsCheapestProduct[] = $value->id;
        }

        $products = StoreProducts::whereIn('store_products.id', $arrayOfIdsCheapestProduct)->join('basket_products', 'store_products.product_id', '=', 'basket_products.product_id')->select('store_products.*','basket_products.*')->get();


        return Inertia::render('OptimalPricing', [
            'products' => $products,
        ]);
    }
}
