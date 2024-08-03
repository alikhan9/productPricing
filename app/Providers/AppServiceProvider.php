<?php

namespace App\Providers;

use App\Models\Basket;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        JsonResource::withoutWrapping();

        Gate::define('manage-basket', function (User $user, Basket $basket ) {
            return $basket->user()->is($user);
        });
    }
}
