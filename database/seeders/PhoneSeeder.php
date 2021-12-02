<?php

namespace Database\Seeders;

use App\Models\Phones;
use Illuminate\Database\Seeder;

class PhoneSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        Phones::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few phone in our database:
        for ($i = 0; $i < 130000; $i++) {
            Phones::create([
                'contact_id' => $faker->numberBetween($min = 1, $max = 100000),
                'label_name_id' => $faker->numberBetween($min = 1, $max = 6),
                'phone' => $faker->phoneNumber
            ]);
        }
    }
}
