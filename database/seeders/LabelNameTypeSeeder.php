<?php

namespace Database\Seeders;

use App\Models\LabelNameTypes;
use Illuminate\Database\Seeder;

class LabelNameTypeSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Let's truncate our existing records to start from scratch.
        LabelNameTypes::truncate();

        $faker = \Faker\Factory::create();

        // And now, let's create a few label name types in our database:
        LabelNameTypes::create([
            'name' => "Mobile"
        ]);
        LabelNameTypes::create([
            'name' => "Home"
        ]);
        LabelNameTypes::create([
            'name' => "Work"
        ]);
        LabelNameTypes::create([
            'name' => "School"
        ]);
        LabelNameTypes::create([
            'name' => "Fax"
        ]);
        LabelNameTypes::create([
            'name' => "Other"
        ]);
    }
}
