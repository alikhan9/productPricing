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

        $query = "SELECT
    p.id AS 'product.id',
    p.image AS 'product.image',
    p.name AS 'product.name',
    s.id AS 'store.id',
    sp.price AS 'product.price',
    s.name AS 'store.name',
    s.image AS 'store.image',
    s.address AS 'store.address',
    s.city AS 'store.city',
    bp.quantity AS 'product.quantity'
FROM
    products p
        INNER JOIN (
        SELECT
            sp.product_id,
            MIN(sp.price) AS min_price
        FROM
            store_products sp
        GROUP BY
            sp.product_id
    ) min_prices ON p.id = min_prices.product_id
        INNER JOIN
    store_products sp ON min_prices.product_id = sp.product_id AND min_prices.min_price = sp.price
        INNER JOIN
    stores s ON sp.store_id = s.id
        INNER JOIN (
        SELECT DISTINCT product_id, quantity
        FROM basket_products
        WHERE basket_id = ($basket->id)
    ) bp ON p.id = bp.product_id
        WHERE p.id IN ($productIdInClause)
        ORDER BY s.id, sp.price";
        $products = DB::select($query);

        return Inertia::render('OptimalPricing', [
            'products' =>  $products
        ]);
    }
}
