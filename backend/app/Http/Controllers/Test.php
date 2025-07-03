<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Session;

class Test extends Controller
{
    function index()
    {
        $count = request()->session()->get("count", 0);
        $count++;
        request()->session()->put("count", $count);
        $result = [];
        $result["test"] = request()->session()->getId();
        $result["count"] = $count;
        return $result;
    }
}
