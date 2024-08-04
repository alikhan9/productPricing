<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'avatar' => 'required|image|mimes:jpeg,png,jpg,gif,svg,webp|max:10000',
        ], [
            'name.required' => 'Le champ Nom est obligatoire.',
            'email.required' => 'Le champ Email est obligatoire.',
            'email.string' => 'Le champ Email doit être une chaîne de caractères.',
            'email.lowercase' => 'L\'Email doit être en minuscules.',
            'email.email' => 'Le champ Email doit être un email valide.',
            'email.max' => 'Le champ Email ne peut pas dépasser :max caractères.',
            'email.unique' => 'L\'Email est déjà utilisé par un autre utilisateur.',
            'password.required' => 'Le champ Mot de passe est obligatoire.',
            'password.confirmed' => 'Les champs Mot de passe et Confirmation du mot de passe doivent correspondre.',
            // Assuming Password::defaults() returns a closure that adds default password rules,
            // we can't directly add custom messages here since they're part of the closure.
            // You would typically handle this within the closure itself or by extending the rule.
            'avatar.required' => 'Une image d\'avatar est requise.',
            'avatar.image' => 'Le fichier doit être une image.',
            'avatar.mimes' => 'Les types de fichiers autorisés sont jpeg, png, jpg, gif, svg, webp.',
            'avatar.max' => 'La taille maximale de l\'image est de :max kilo-octets.',
        ]);

        $manager = new ImageManager(new Driver());
        $image = $manager->read($request->file('avatar'));

        $filename = uniqid() . '.webp';

        $image->scale(250,250)->toWebp()->save(storage_path('app/public/images/avatars/' . $filename));


        $avatar = '/storage/images/avatars/' . $filename;

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'avatar' => $avatar,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('home', absolute: false));
    }
}
