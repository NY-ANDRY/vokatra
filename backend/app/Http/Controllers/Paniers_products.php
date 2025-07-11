<?php

namespace App\Http\Controllers;

use App\Models\T_panier_produits;
use App\Models\T_paniers;
use App\Models\V_paniers_packs;
use App\Models\V_paniers_produits;
use App\Models\V_produits;
use Illuminate\Http\Request;

class Paniers_products extends Controller
{

    function store()
    {
        $result = [
            "ok" => false,
            "message" => ""
        ];

        $panier_id = request()->session()->get("panier");
        $panier = T_paniers::find($panier_id);
        if (empty($panier)) {
            $panier = new T_paniers();
            $panier->save();
            $panier_id = $panier->id;
        } else {
            $panier = T_paniers::find($panier_id);
        }

        $product_id = request()->input("produit_id");
        $quantity = request()->input("quantity");

        if ($quantity <= 0) {
            $result["message"] = "quantite requis";
            return response()->json($result);
        }

        $qtt_reste = V_produits::where("id", "=", $product_id)->first()->stock;
        if ($qtt_reste < $quantity) {
            $result["message"] = "stock insuffisant";
            return response()->json($result);
        }

        $cur_item = T_panier_produits::where("panier_id", "=", $panier_id)
            ->where("produit_id", "=", $product_id)->first();

        if (empty($cur_item->quantite)) {
            $new_product = new T_panier_produits();
            $new_product->panier_id = $panier_id;
            $new_product->produit_id = $product_id;
            $new_product->quantite = $quantity;
            $new_product->save();
        } else {
            $cur_item->quantite += $quantity;
            if ($qtt_reste < $cur_item->quantite) {
                $result["message"] = "stock insuffisant";
                return response()->json($result);
            }
            $cur_item->update();
        }

        request()->session()->put("panier", $panier_id);

        $result["ok"] = true;

        return response()->json($result);
    }

    
    function delete()
    {
        $result = [
            "ok" => true,
            "items" => [],
            "total" => 0
        ];

        $id = request()->input("id");
        $pp = T_panier_produits::find($id);
        if (!empty($pp)) {
            $panier_id = $pp->panier_id;
            $pp->delete();
            $items = V_paniers_produits::where("panier_id", "=", $panier_id)->get();
            $total = V_paniers_produits::where("panier_id", "=", $panier_id)->sum("total");

            $packs_total = V_paniers_packs::where("panier_id", "=", $panier_id)->sum("total");
            if (is_numeric($packs_total)) {
                $total += $packs_total;
            }

            $result["items"] = $items;
            $result["total"] = $total;
        } else {
            $result = [
                "ok" => false
            ];
        }

        return response()->json($result);
    }
}
