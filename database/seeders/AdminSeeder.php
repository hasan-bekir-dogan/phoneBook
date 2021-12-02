<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        Admin::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few admin in our database:
        Admin::create([
            'name' => "Hasan Bekir DOĞAN",
            'email' => "admin@contact.com",
            'password' => Hash::make("admin.123")
        ]);
    }
}
