<?php

namespace App\Http\Controllers;

use App\Models\T_pack_produits;
use App\Models\V_packs;
use App\Models\V_packs_produits;
use App\Models\V_produits;
use Illuminate\Http\Request;

class Packs extends Controller
{
    function index()
    {
        $result = [
            "items" => []
        ];

        $result["items"] = V_packs::all();

        return response()->json($result);
    }

    public function show($id)
    {
        $result = [
            "item" => V_packs::where("pack_id", $id)->first(),
            "produits" => []
        ];

        if ($result["item"]) {
            $result["produits"] = V_packs_produits::where("pack_id", $id)->get();
        }

        return response()->json($result);
    }

}
