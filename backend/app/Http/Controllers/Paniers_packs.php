<?php

namespace App\Http\Controllers;

use App\Models\T_pack_produits;
use App\Models\T_panier_packs;
use App\Models\T_paniers;
use App\Models\V_paniers_packs;
use App\Models\V_paniers_produits;
use App\Models\V_produits;
use Illuminate\Http\Request;

class Paniers_packs extends Controller
{

    public function store()
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
        }

        $pack_id = request()->input("pack_id");
        $quantity = request()->input("quantity");

        if (empty($pack_id) || empty($quantity)) {
            $result["message"] = "pack ou quantite manquant";
            return response()->json($result);
        }

        if ($quantity <= 0) {
            $result["message"] = "quantite requise";
            return response()->json($result);
        }

        $cur_pack = T_panier_packs::where("panier_id", $panier_id)
            ->where("pack_id", $pack_id)->first();

        $quantite_totale = $quantity;
        if ($cur_pack) {
            $quantite_totale += $cur_pack->quantite;
        }

        $message_stock = $this->verifierStockPack($pack_id, $quantite_totale);
        if ($message_stock !== true) {
            $result["message"] = $message_stock;
            return response()->json($result);
        }

        if ($cur_pack) {
            $cur_pack->quantite = $quantite_totale;
            $cur_pack->update();
        } else {
            $new_pack = new T_panier_packs();
            $new_pack->panier_id = $panier_id;
            $new_pack->pack_id = $pack_id;
            $new_pack->quantite = $quantity;
            $new_pack->save();
        }

        request()->session()->put("panier", $panier_id);
        $result["ok"] = true;

        return response()->json($result);
    }

    private function verifierStockPack($pack_id, $quantite_pack)
    {
        $produits = T_pack_produits::where("pack_id", $pack_id)->get();

        foreach ($produits as $item) {
            $produit_id = $item->produit_id;
            $quantite_requise = $item->quantite * $quantite_pack;

            $produit = V_produits::find($produit_id);
            if (!$produit) {
                return "produit introuvable dans le pack";
            }

            if ($produit->stock < $quantite_requise) {
                return "stock insuffisant pour le produit « {$produit->nom} » dans le pack";
            }
        }

        return true;
    }

    function store_packs($panier_id, $pack_id, $quantity)
    {
        if (!empty($pack_id) && !empty($quantity)) {
            if ($quantity <= 0) {
                return " quantite requis, ";
            }

            $produits_du_pack = T_pack_produits::where("pack_id", $pack_id)->get();

            foreach ($produits_du_pack as $item) {
                $produit_id = $item->produit_id;
                $quantite_necessaire = $item->quantite * $quantity;

                $produit = V_produits::where("id", $produit_id)->first();

                if (!$produit) {
                    return " produit introuvable dans le pack, ";
                }
                if ($produit->stock < $quantite_necessaire) {
                    return " stock insuffisant pour le produit '{$produit->nom}' dans le pack, ";
                }
            }

            $new_packs = new T_panier_packs();
            $new_packs->panier_id = $panier_id;
            $new_packs->pack_id = $pack_id;
            $new_packs->quantite = $quantity;
            $new_packs->save();
            return true;
        }
        return " pas de pack trouver, ";
    }

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
    }
}
