<?php

namespace Database\Seeders;

use App\Models\Addresses;
use Illuminate\Database\Seeder;

class AddressSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        Addresses::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few addresses in our database:
        for ($i = 0; $i < 20; $i++) {
            Addresses::create([
                'contact_id' => $faker->numberBetween($min = 1, $max = 10),
                'label_name_id' => $faker->randomElement($array = array (2,3,4,6)),
                'address' => $faker->address
            ]);
        }
    }
}
