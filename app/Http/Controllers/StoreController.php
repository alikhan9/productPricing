<?php

namespace App\Http\Controllers;

use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Models\Store;
use App\Models\StoreProducts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class StoreController extends Controller
{
    public function index()
    {
        return Inertia::render('Stores', [
            'stores' => Store::all()
        ]);
    }

    public function update(Request $request, Store $store)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'newImage' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:4092',
        ], [
            'name.required' => 'Le nom est requis',
            'city.required' => 'La ville est requise',
            'address.required' => 'L\'adresse est requise',
            'image.required' => 'Une image est requise',
            'image.mimes' => 'Les types de fichiers autorisés sont jpeg, png, jpg, gif, svg et webp.',
            'image.max' => 'La taille maximale de l\'image est de 4092 Ko.',
        ]);

        if($request->hasFile('newImage')){
            File::delete(public_path($data['image']));

            $manager = new ImageManager(new Driver());
            $image = $manager->read($request->file('newImage'));

            $filename = uniqid() . '.webp';

            $image->contain(75, 75)->toWebp()->save(storage_path('app/public/images/stores/' . $filename));

            $data['image'] = '/storage/images/stores/' . $filename;
        }
        $store->update($data);
        return back();
    }
    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'city' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:4092',
        ], [
            'name.required' => 'Le nom est requis',
            'city.required' => 'La ville est requise',
            'address.required' => 'L\'adresse est requise',
            'image.required' => 'Une image est requise',
            'image.mimes' => 'Les types de fichiers autorisés sont jpeg, png, jpg, gif, svg et webp.',
            'image.max' => 'La taille maximale de l\'image est de 4092 Ko.',
        ]);

        $manager = new ImageManager(new Driver());
        $image = $manager->read($request->file('image'));

        $filename = uniqid() . '.webp';

        $image->contain(75, 75)->toWebp()->save(storage_path('app/public/images/stores/' . $filename));

        $image = '/storage/images/stores/' . $filename;

        Store::create([...$data, 'image' => $image]);

        return back();
    }

    public function destroy(Store $store)
    {
        $store->delete();
        return back();
    }

    public function manageProducts(Request $request, Store $store)
    {
        $request->validate([
            'storeProducts' => 'boolean'
        ]);
        $notInIds = $store->products()->pluck('product_id')->toArray();

        $availableProducts = Product::whereNotIn('id', $notInIds)->get();

        $storeProduct = true;

        if($request->has('storeProducts')){
            $storeProduct = $request->storeProducts;
        }

        return Inertia::render('ManageStoreProducts', [
            'store' => $store,
            'products' => $storeProduct ? $store->products()->get() : $availableProducts,
            'storeProducts' => (boolean)$storeProduct
        ]);
    }

    public function addProduct(Request $request, Store $store, Product $product)
    {
        $request->validate([
            'price' => 'required|numeric|min:0',
        ]);
        StoreProducts::create(['product_id' => $product->id, 'store_id' => $store->id, 'price' => $request->price]);
        return back();
    }

    public function removeProduct(Store $store, Product $product)
    {
        $store->removeProduct($product);
        return back();
    }

    public function getStores() {

        return Store::select(['id', 'name'])->get();
    }
}
