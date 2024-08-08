<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Store>
 */
class StoreFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'city' => fake()->city(),
            'address' => fake()->address(),
            'image' => function () {
                $manager = new ImageManager(new Driver());
                $filename = uniqid() . '.webp';

                $manager->create('75','75')->toWebp()->save(storage_path('app/public/images/stores/' . $filename));

             return '/storage/images/stores/' . $filename;
            }
        ];
    }
}
