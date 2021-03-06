import { Input, SimpleChanges } from '@angular/core';
import { Component, OnInit, OnChanges, OnDestroy } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Component({
  selector: 'ngx-statistic-seller',
  templateUrl: './statistic-seller.component.html',
  styleUrls: ['./statistic-seller.component.scss'],
})
export class StatisticSellerComponent implements OnInit, OnChanges, OnDestroy {
  @Input() chartData: any;
  @Input() orderCount: number;

  options: any = {};
  themeSubscription: any;

  constructor(private theme: NbThemeService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.chartData.currentValue !== undefined) {
      this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
        const colors = config.variables;
        const echarts: any = config.variables.echarts;

        this.options = {
          backgroundColor: echarts.bg,
          color: [
            colors.warningLight,
            colors.infoLight,
            colors.dangerLight,
            colors.successLight,
            colors.primaryLight,
          ],
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          // legend: {
          //   orient: 'vertical',
          //   left: 'left',
          //   data: this.chartData.legends,
          //   textStyle: {
          //     color: echarts.textColor,
          //   },
          // },
          series: [
            {
              name: 'Orders',
              type: 'pie',
              radius: '80%',
              center: ['50%', '50%'],
              data: this.chartData.data,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: echarts.itemHoverShadowColor,
                },
              },
              label: {
                formatter: '{b} ({d}%)',
                color: echarts.textColor,
              },
              labelLine: {
                normal: {
                  lineStyle: {
                    color: echarts.axisLineColor,
                  },
                },
              },
            },
          ],
        };
      });
    }
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

}
