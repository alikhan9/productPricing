<?php

namespace Tests\Http\Controllers;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\Request;
use App\Models\Store;
use App\Models\Product;
use App\Models\Basket;
use Tests\TestCase;


class BasketControllerTest extends TestCase
{
    use RefreshDatabase;

    public function testOptimalPricingWithValidRequest()
    {
        // Setup test data
        $store = Store::factory()->create();
        $product = Product::factory()->create();
        $basket = Basket::factory()->create(['products' => [$product->id]]);

        // Mock the Request object
        $request = new Request([
            'ids' => [$store->id]
        ]);

        // Call the method under test
        $response = $this->getJson("/baskets/{$basket->id}/optimal-pricing?ids={$store->id}");

        // Assert the expected outcome
        $response->assertStatus(200);
        $response->assertJsonStructure([
            'products' => [
                '*' => ['product.id', 'product.image', 'product.name', 'store.id', 'product.price', 'store.name', 'store.image', 'store.address', 'store.city', 'product.quantity']
            ]
        ]);
    }

    public function testOptimalPricingWithoutValidRequest()
    {
        // Setup test data
        $basket = Basket::factory()->create([]);

        // Call the method under test
        $response = $this->getJson("/baskets/{$basket->id}/optimal-pricing");

        // Assert the expected outcome
        $response->assertStatus(403);
        $response->assertExactJson(["error" => "Ce panier contient aucun produit."]);
    }

}
