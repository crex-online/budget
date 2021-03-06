<div class="panel panel-default">
    <div class="panel-heading text-center">
        {!! Html::linkAction(
            'Account\DevelopmentController@getYearly',
            '<i class="fa fa-fw fa-arrow-left"></i> '.$prevYear->formatLocalized('%Y'),
            [$account, $prevYear->toDateString()],
            [
                'class' => 'routable btn btn-xs btn-default pull-left',
                'data-target' => '#account-development-yearly',
            ]
        ) !!}
        {{ $date->formatLocalized('%B %Y') }} - {{ $date->copy()->addMonths(11)->formatLocalized('%B %Y') }}
        @if ($nextYear->lte(Carbon\Carbon::now()))
            {!! Html::linkAction(
                'Account\DevelopmentController@getYearly',
                $nextYear->formatLocalized('%Y').' <i class="fa fa-fw fa-arrow-right"></i>',
                [$account, $nextYear->toDateString()],
                [
                    'class' => 'routable btn btn-xs btn-default pull-right',
                    'data-target' => '#account-development-yearly',
                ]
            ) !!}
        @endif
    </div>
    <div class="panel-body">
        <div id="account-development-yearly-chart"></div>
    </div>
</div>

<script type="text/javascript">

    $('#account-development-yearly-chart').get(0).chart = Morris.Line({
        element: 'account-development-yearly-chart',
        data: {!! json_encode($chart->getData()) !!},
        xkey: 'date',
        ykeys: [
            'value',
        ],
        labels: [
            "@lang('operation.aggregate.balanceEnvelopes')",
        ],
        lineColors: {!! json_encode($chart->getColors()) !!},
        dateFormat: function (date) { return require('moment')(date).format("MMMM"); },
        xLabelFormat: function (date) {return require('moment')(date).format("MMMM"); },
        yLabelFormat: function (val) { return FormatModule.price(val, '{!! $account->currency !!}'); },
        resize: true,
    });

</script>