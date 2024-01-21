import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "../_helpers/auth.guard";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { ConfirmationDialogService } from "../_services/confirmation-dialog.service";
// Import the library
import { NgxImageZoomModule } from "ngx-image-zoom";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { NgbModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { AdminSharedModule } from "../admin-shared/admin-shared.module";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { AnalyticsComponent } from "../analytics/analytics.component";
import { SuperAdminComponent } from "./super-admin/super-admin.component";
import { CompetitionComponent } from "./competition/competition.component";
import { DashboardComponent } from "../dashboard/dashboard.component";
import { DashboardModule } from "../dashboard/dashboard.module";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { SuperAdminDashboardComponent } from "./super-admin-dashboard/super-admin-dashboard.component";

const customNotifierOptions: NotifierOptions = {
  position: {
    horizontal: {
      position: "right",
      distance: 12
    },
    vertical: {
      position: "bottom",
      distance: 12,
      gap: 10
    }
  },
  theme: "material",
  behaviour: {
    autoHide: 5000,
    onClick: "hide",
    onMouseover: "pauseAutoHide",
    showDismissButton: true,
    stacking: 4
  },
  animations: {
    enabled: true,
    show: {
      preset: "slide",
      speed: 300,
      easing: "ease"
    },
    hide: {
      preset: "fade",
      speed: 300,
      easing: "ease",
      offset: 50
    },
    shift: {
      speed: 300,
      easing: "ease"
    },
    overlap: 150
  }
};

const superAdminRoutes: Routes = [
  {
    path: "dashboard",
    canActivate: [AuthGuard],
    component: SuperAdminDashboardComponent
  },
  {
    path: "competitions",
    canActivate: [AuthGuard],
    component: SuperAdminComponent
  }
];

@NgModule({
  declarations: [SuperAdminComponent, CompetitionComponent, AnalyticsComponent, SuperAdminDashboardComponent],
  imports: [
    NgxChartsModule,
    NgxDatatableModule,
    CommonModule,
    NgbModule,
    AdminSharedModule,
    NgxImageZoomModule,
    NgbNavModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    NotifierModule.withConfig(customNotifierOptions),
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule.forChild(superAdminRoutes)
  ],
  providers: [ConfirmationDialogService],
  exports: [RouterModule]
})
export class SuperAdminModule { }
