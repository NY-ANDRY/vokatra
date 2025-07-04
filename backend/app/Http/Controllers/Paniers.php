<?php

namespace App\Http\Controllers;

use App\Models\T_panier_produits;
use App\Models\T_paniers;
use App\Models\V_paniers_produits;
use App\Models\V_produits;
use Illuminate\Http\Request;

class Paniers extends Controller
{
    function store()
    {
        $result = [
            "ok" => true,
            "message" => ""
        ];

        $product_id = request()->input("produit_id");
        $quantity = request()->input("quantity");
        if ($quantity <= 0) {
            $result["ok"] = false;
            $result["message"] = "quantite requis";
            return response()->json($result);
        }

        $qtt_reste = V_produits::where("id", "=", $product_id)->first()->stock;
        if ($qtt_reste < $quantity) {
            $result["ok"] = false;
            $result["message"] = "stock insuffisant";
            return response()->json($result);
        }

        $panier_id = request()->session()->get("panier");
        $panier = T_paniers::find($panier_id);
        if (empty($panier)) {
            $panier = new T_paniers();
            $panier->save();
            $panier_id = $panier->id;
        } else {
            $panier = T_paniers::find($panier_id);
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
                $result["ok"] = false;
                $result["message"] = "stock insuffisant";
                return response()->json($result);
            }
            $cur_item->update();
        }

        request()->session()->put("panier", $panier_id);

        return response()->json($result);
    }

    function get()
    {
        $result = [
            "panier" => null,
            "items" => [],
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

            $result["panier"] = $panier;
            $result["items"] = $items;
            $result["total"] = $total;
        }

        return response()->json($result);
    }

    function delete() {}
}
