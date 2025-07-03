<?php

namespace App\Http\Controllers;

use App\Models\T_livraisons_lieux;
use Illuminate\Http\Request;

class Livraisons_lieux extends Controller
{
    function index() {
        $result = T_livraisons_lieux::all()->map(function ($item) {
            return [
                "value" => $item->id,
                "label" => $item->nom,
            ];
        });

        return response()->json($result);
    }
}
