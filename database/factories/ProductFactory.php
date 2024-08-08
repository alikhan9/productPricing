<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;
use Intervention\Image\Drivers\Gd\Driver;
use Intervention\Image\ImageManager;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
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
            'image' => function () {
                $manager = new ImageManager(new Driver());
                $filename = uniqid() . '.webp';

                $manager->create('75','75')->toWebp()->save(storage_path('app/public/images/stores/' . $filename));

                return '/storage/images/stores/' . $filename;
            }
        ];
    }
}
