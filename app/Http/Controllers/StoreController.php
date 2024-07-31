<?php

namespace App\Http\Controllers;

use App\Models\Store;
use Illuminate\Http\Request;
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

        $image->contain(75,75)->toWebp()->save(storage_path('app/public/images/products/' . $filename));

        $image = '/storage/images/products/' . $filename;

        Store::create([...$data, 'image' => $image]);

        return back();
    }
}
