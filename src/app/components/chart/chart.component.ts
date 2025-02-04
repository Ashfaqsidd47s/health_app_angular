import { Component, input } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import {Chart, ChartConfiguration, registerables } from 'chart.js';
import { UserData } from '../../models/user.types';


Chart.register(...registerables);
@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [BaseChartDirective, CommonModule], 
  templateUrl: './chart.component.html',
})
export class ChartComponent {
  user = input.required<UserData >()
  lable:string[] = []
  data: number[] = []
  chartData :any = null;

  ngOnChanges(): void {
    this.lable = this.user().workouts.map((w)=> w.type)
    this.data = this.user().workouts.map((w)=> w.minutes)

    let total:number = this.data[0];
    this.data.forEach(d => {
      total += d;
    });
    
    const bgColors: string[] = this.data.map((d)=> `rgba(255, 100, 103, ${(d/total)})`)

    this.chartData = {
      labels: this.lable,
      datasets: [
        {
          data: this.data,
          label: 'Time',
          backgroundColor: bgColors, 
          borderColor: 'rgba(255, 100, 103, 1)', 
          borderWidth: 2,
          borderRadius: 5, 
          hoverBackgroundColor: 'rgba(255, 100, 103, 0.9)', 
        }
      ]
    };
  }


  public chartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
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
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false }, 
        ticks: { color: '#a1a1aa', font: { size: 12 } } 
      },
      y: {
        grid: {display: true, color: 'rgba(255,255,255,0.9)' }, 
        ticks: { color: '#a1a1aa', font: { size: 12 } }
      }
    },
    animation: {
      duration: 800,
      easing: 'easeInOutQuad'
    }
  };
}
