<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class V_produit_quotidienne extends Model
{
    protected $table = 'v_produit_quotidienne';

    public static function getHisto($id_produit)
    {
        $defaultFin = Carbon::today()->format('Y-m-d');
        $defaultDebut = Carbon::today()->subDays(30)->format('Y-m-d');
        $startDate = Carbon::parse($defaultDebut);
        $endDate = Carbon::parse($defaultFin);

        $produit = V_produits::find($id_produit);
        $stock = $produit->stock;

        $fetchedData = self::where('id_produit', "=", $id_produit)
            ->whereBetween('date_maj', [$startDate->toDateString(), $endDate->toDateString()])
            ->orderBy('date_maj', 'desc')
            ->get()
            ->keyBy(function ($item) {
                return Carbon::parse($item->date_maj)->toDateString();
            });

        $result = [];
        for ($date = $endDate->copy(); $date->gte($startDate); $date->subDay()) {
            $currentDateString = $date->toDateString();

            if ($fetchedData->has($currentDateString)) {
                $stock -= $fetchedData[$currentDateString]->quantite;
            }

            $result[] = [
                'date' => $currentDateString,
                'stock' => $stock,
            ];
        }

        return collect($result)->reverse()->values();
    }
}
