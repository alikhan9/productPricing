<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Inertia\Inertia;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class ProductController extends Controller
{

    public function index()
    {
        return Inertia::render('Products', [
            'products' => Product::all(),
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:6000',
        ], [
            'name.required' => 'Le nom est requis.',
            'name.string' => 'Le nom doit être une chaîne de caractères.',
            'name.max' => 'Le nom ne peut pas dépasser :max caractères.',
            'image.required' => 'Une image est requise.',
            'image.image' => 'Le fichier fourni n\'est pas une image valide.',
            'image.mimes' => "Veuillez fournir une image d'un type valide (jpeg, png, jpg, gif, svg).",
            'image.max' => 'L\'image ne peut pas dépasser :max kilo-octets.',
        ]);

        $manager = new ImageManager(new Driver());
        $image = $manager->read($request->file('image'));

        $filename = uniqid() . '.webp';

        $image->contain(100,100)->toWebp()->save(storage_path('app/public/images/products/' . $filename));

        $image = '/storage/images/products/' . $filename;

        Product::create([...$data, 'image' => $image]);

        return back();
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'image' => 'required|string|max:255',
            'newImage' => 'image|mimes:jpeg,png,jpg,gif,svg,webp|max:4092',
        ], [
            'name.required' => 'Le nom est requis.',
            'name.string' => 'Le nom doit être une chaîne de caractères.',
            'name.max' => 'Le nom ne peut pas dépasser :max caractères.',

            'image.image' => 'Le fichier fourni n\'est pas une image valide.',
            'image.mimes' => "Veuillez fournir une image d'un type valide (jpeg, png, jpg, gif, svg).",
            'image.max' => 'L\'image ne peut pas dépasser :max kilo-octets.',
        ]);

        if($data['newImage']){
            File::delete(public_path($product->image));
            $manager = new ImageManager(new Driver());
            $image = $manager->read($request->file('newImage'));
            $filename = uniqid() . '.webp';
            $image->contain(100,100)->toWebp()->save(storage_path('app/public/images/products/' . $filename));
            $data['image'] = '/storage/images/products/' . $filename;
        }
        $product->update($data);
        return back();
    }
}
