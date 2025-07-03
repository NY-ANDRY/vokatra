<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class T_stocks_produits extends Model
{
    protected $table = 't_stocks_produits';
    public $timestamps = false;

    protected $fillable = [
        'produit_id',
        'quantite',
        'date_maj',
        'mouvement_id',
    ];

    public static function registerFacture($facture_id) {
        $result = true;

        $facture = V_factures::find($facture_id);
        $commades_produits = V_commandes_produits::where("commande_id", "=", $facture->commande_id)->get();

        foreach ($commades_produits as $key => $commades_produit) {
            $new_ligne = new T_stocks_produits();
            $new_ligne->produit_id = $commades_produit->produit_id;
            $new_ligne->quantite -= $commades_produit->quantite;
            $new_ligne->mouvement_id = 2;
            $new_ligne->date_maj = now();

            $new_ligne->save();
        }

        return $result;
    }
}
