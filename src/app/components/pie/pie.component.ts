import { Component, input } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { UserData } from '../../models/user.types';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';

Chart.register(...registerables);
@Component({
  selector: 'app-pie',
  standalone: true,
  imports: [BaseChartDirective, CommonModule], 
  templateUrl: './pie.component.html'
})
export class PieComponent {
  user = input.required<UserData>()
  lable:string[] = []
  data: number[] = []
  chartData :any = null;
  total: number = 0;

  ngOnChanges(): void {
    this.lable = this.user().workouts.map((w)=> w.type)
    this.data = this.user().workouts.map((w)=> w.minutes)

    this.total = 0;
    this.data.forEach(d => {
      this.total += d;
    });
      
      const bgColors: string[] = this.data.map((d)=> `rgba(255, 100, 103, ${(d/this.total)})`)
  
      this.chartData = {
        labels: this.lable,
        datasets: [
          {
            data: this.data,
            label: 'Time',
            backgroundColor: bgColors, 
            borderColor: 'rgba(255, 100, 103, 1)', 
            borderWidth: 1,
            borderRadius: 1, 
            hoverBackgroundColor: 'rgba(255, 100, 103, 0.9)', 
          }
        ]
      };
    }
  
  
    public chartOptions: ChartConfiguration<'pie'>['options'] = {
      responsive: true,
      plugins: {
        legend: {
          display: true,
          position: 'left',
          align: "center",      // Align labels to the right (end)
          labels: {
            color: '#a1a1aa', // Custom label color
            font: { size: 12 }
          } 
        },
        tooltip: {
          backgroundColor: '#18181b', 
          titleColor: '#fff',
          bodyColor: '#fff',
          padding: 10,
          cornerRadius: 6
        }
      },
      
      animation: {
        duration: 800,
        easing: 'easeInOutQuad'
      }
    };
}
  