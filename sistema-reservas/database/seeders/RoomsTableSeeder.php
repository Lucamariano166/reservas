<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class RoomsTableSeeder extends Seeder
{
    public function run()
    {
        $rooms = [
            ['name' => 'Sala A'],
            ['name' => 'Sala B'],
            ['name' => 'Sala C'],
        ];

        foreach ($rooms as $room) {

            if (!DB::table('rooms')->where('name', $room['name'])->exists()) {
                DB::table('rooms')->insert($room);
            }
        }
    }
}
