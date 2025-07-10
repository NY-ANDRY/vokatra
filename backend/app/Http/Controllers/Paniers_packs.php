<?php

namespace App\Http\Controllers;

use App\Models\T_panier_packs;
use App\Models\V_paniers_packs;
use App\Models\V_paniers_produits;
use Illuminate\Http\Request;

class Paniers_packs extends Controller
{
    function delete()
    {
        $result = [
            "ok" => true,
            "items" => [],
            "total" => 0
        ];

        $id = request()->input("id");
        $pp = T_panier_packs::find($id);
        if (!empty($pp)) {
            $panier_id = $pp->panier_id;
            $pp->delete();
            $items = V_paniers_packs::where("panier_id", "=", $panier_id)->get();
            $total = V_paniers_packs::where("panier_id", "=", $panier_id)->sum("total");

            $produits_total = V_paniers_produits::where("panier_id", "=", $panier_id)->sum("total");
            if (is_numeric($produits_total)) {
                $total += $produits_total;
            }

            $result["items"] = $items;
            $result["total"] = $total;
        } else {
            $result = [
                "ok" => false
            ];
        }

        return response()->json($result);
    }}
