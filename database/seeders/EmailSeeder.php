<?php

namespace Database\Seeders;

use App\Models\Emails;
use Illuminate\Database\Seeder;

class EmailSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        Emails::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few emails in our database:
        for ($i = 0; $i < 20; $i++) {
            Emails::create([
                'contact_id' => $faker->numberBetween($min = 1, $max = 10),
                'label_name_id' => $faker->randomElement($array = array (2,3,4,6)),
                'email' => $faker->email
            ]);
        }
    }
}
