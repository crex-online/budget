<?php

namespace App;

use App\Services\Eloquent\HasEvents;
use Illuminate\Database\Eloquent\Model;

class Account extends Model
{
    use HasEvents;
}
