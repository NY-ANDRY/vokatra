<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Carbon\Carbon;

class Activites extends Model
{
    protected $table = null;
    public $timestamps = false;
    public $incrementing = false;

    public static function getDailyData($debut, $fin)
    {
        $startDate = Carbon::parse($debut);
        $endDate = Carbon::parse($fin);

        $fetchedData = V_activite_quotidienne::whereBetween('date_jour', [$startDate->toDateString(), $endDate->toDateString()])
            ->orderBy('date_jour', 'asc')
            ->get()
            ->keyBy(function ($item) {
                return Carbon::parse($item->date_jour)->toDateString();
            });

        $result = [];
        for ($date = $startDate->copy(); $date->lte($endDate); $date->addDay()) {
            $currentDateString = $date->toDateString();

            if ($fetchedData->has($currentDateString)) {
                $result[] = [
                    'date' => $currentDateString,
                    'recettes' => (float) $fetchedData[$currentDateString]->recettes,
                ];
            } else {
                $result[] = [
                    'date' => $currentDateString,
                    'recettes' => 0.0,
                ];
            }
        }

        return collect($result);
    }

    public static function getMonthlyData($debut, $fin)
    {
        $startDate = Carbon::parse($debut)->startOfMonth();
        $endDate = Carbon::parse($fin)->endOfMonth();

        $fetchedData = V_activite_mensuelle::whereBetween('date_mois', [$startDate->toDateString(), $endDate->toDateString()])
            ->orderBy('date_mois', 'asc')
            ->get()
            ->keyBy(function ($item) {
                return Carbon::parse($item->date_mois)->toDateString();
            });

        $result = [];
        for ($date = $startDate->copy(); $date->lte($endDate); $date->addMonth()) {
            $currentMonthString = $date->toDateString();

            if ($fetchedData->has($currentMonthString)) {
                $result[] = [
                    'date' => $currentMonthString,
                    'recettes' => (float) $fetchedData[$currentMonthString]->recettes,
                ];
            } else {
                $result[] = [
                    'date' => $currentMonthString,
                    'recettes' => 0.0,
                ];
            }
        }

        return collect($result);
    }
}
