import { Component, OnInit } from "@angular/core";
import { DashboardService } from "../_services/dashbaord.service";
import { NotifierService } from "angular-notifier";
import { blogcard } from "../../app/dashboard/dashboard-components/blog-cards/blog-cards-data";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.scss"]
})
// dashboard for super admin
export class DashboardComponent implements OnInit {
  private notifier: NotifierService;
  public dashboardContents: any = {};
  blogcards: blogcard[] = [];
  public academiesData: any = [];
  constructor(private dashboardService: DashboardService, notifier: NotifierService) {
    this.notifier = notifier;
    this.getDashboardContents();
  }

  ngOnInit() { }

  getDashboardContents() {
    this.dashboardService.getDashboardContents().subscribe((res: any) => {
      if (res) {
        this.notifier.notify("success", res.message);
        this.dashboardContents = res.data;
        if (this.dashboardContents["teams"]) {
        }
        // for acadmeis
        if (this.dashboardContents["academies"]) {
          this.dashboardContents["teams"].forEach((team: any) => {
            if (team.teamName && team.count) {
              this.academiesData.push({
                name: team.teamName,
                value: team.count
              });
            }
          });
        }
      }
    });
  }
}
