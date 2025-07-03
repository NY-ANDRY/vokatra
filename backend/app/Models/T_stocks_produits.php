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
}
