<?php

namespace App\Http\Controllers;

use App\Models\T_panier_packs;
use App\Models\T_paniers;
use App\Models\V_paniers_packs;
use App\Models\V_paniers_produits;
use Illuminate\Http\Request;

class Paniers extends Controller
{
    function store()
    {
        $result = [
            "ok" => false,
            "message" => " -> go to /paniers_produits or /paniers_packs"
        ];

        return response()->json($result);
    }

    function store_packs($panier_id, $pack_id, $quantity)
    {
        if (!empty($pack_id) && !empty($quantity)) {
            $new_packs = new T_panier_packs();
            $new_packs->panier_id = $panier_id;
            $new_packs->pack_id = $pack_id;
            $new_packs->quantite = $quantity;
            $new_packs->save();
            return true;
        }
        return false;
    }

    function show()
    {
        $result = [
            "panier" => null,
            "items" => [],
            "packs" => [],
            "message" => "hehe",
            "total" => 0
        ];

        $panier_id = request()->session()->get("panier");

        if (empty($panier_id)) {
            $result["message"] = "go buy some stuff";
        } else {
            $panier = T_paniers::find($panier_id);

            $items = V_paniers_produits::where("panier_id", "=", $panier_id)->get();
            $total = V_paniers_produits::where("panier_id", "=", $panier_id)->sum("total");

            $packs = V_paniers_packs::where("panier_id", "=", $panier_id)->get();
            $packs_total = V_paniers_packs::where("panier_id", "=", $panier_id)->sum("total");

            if (is_numeric($packs_total)) {
                $total += $packs_total;
            }

            $result["panier"] = $panier;
            $result["items"] = $items;
            $result["packs"] = $packs;
            $result["total"] = $total;
        }

        return response()->json($result);
    }

    function delete() {}
}
