<?php

namespace Database\Seeders;

use App\Models\Contacts;
use Illuminate\Database\Seeder;

class ContactSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        Contacts::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few contacts in our database:
        for ($i = 0; $i < 100000; $i++) {
            Contacts::create([
                'group_id' => $faker->numberBetween($min = 0, $max = 3),
                'profile_photo_path' => "assets/images/profile-default-photo.png",
                'first_name' => $faker->firstName,
                'last_name' => $faker->lastName,
                'company' => $faker->company,
                'birthday' => $faker->date,
                'notes' => $faker->text
            ]);
        }
    }
}
