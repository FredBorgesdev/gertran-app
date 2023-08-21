import {Component, OnInit} from '@angular/core';
import {EquipmentStatusReport, ReportsService} from "../reports.service";

@Component({
  selector: 'app-technologies',
  templateUrl: './technologies.component.html',
  styleUrls: ['./technologies.component.css']
})
export class TechnologiesComponent implements OnInit {
  equipmentStatus = {};

  constructor(private reportsService: ReportsService) {
  }

  ngOnInit(): void {
    this.reportsService.getEquipmentStatus().subscribe((data) => {
      this.equipmentStatus = data.reduce((acc, cur) => {
        acc[cur.trackerTechnologyName.toLowerCase()] = {
          online: this.equipmentIsOnline(cur),
          ...cur
        };
        return acc;
      }, {});
    });
  }

  equipmentIsOnline(equipment: EquipmentStatusReport): boolean {
    return new Date(equipment.positionDate).getTime() > new Date().getTime() - 1000 * 60 * 5; // 5 minutes
  }

}
