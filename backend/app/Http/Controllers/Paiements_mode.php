<?php

namespace App\Http\Controllers;

use App\Models\T_paiements_mode;
use Illuminate\Http\Request;

class Paiements_mode extends Controller
{
    function index() {
        $result = T_paiements_mode::all()->map(function ($item) {
            return [
                "value" => $item->id,
                "label" => $item->nom,
            ];
        });

        return response()->json($result);
    }
}
