import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AcademyDetailComponent } from "../board-admin/academy-detail/academy-detail.component";
import { AcademyLeagueSelectionComponent } from "../board-admin/academy-league-selection/academy-league-selection.component";
import { AcademyManagementComponent } from "../board-admin/academy-management/academy-management.component";
import { AdminDashboardComponent } from "../board-admin/admin-dashboard/admin-dashboard.component";
import { AdminDataTableComponent } from "../board-admin/admin-data-table/admin-data-table.component";
import { AdminNotificationsComponent } from "../board-admin/admin-notifications/admin-notifications.component";
import { AdminSquadListComponent } from "../board-admin/admin-squad-list/admin-squad-list.component";
import { ConfirmationModalComponent } from "../board-admin/confirmation-modal/confirmation-modal.component";
import { LeagueManagementComponent } from "../board-admin/league-management/league-management.component";
import { SquadAcademyListComponent } from "../board-admin/squad-academy-list/squad-academy-list.component";
import { SquadListComponent } from "../board-admin/squad-list/squad-list.component";
import { SquadManagementComponent } from "../board-admin/squad-management/squad-management.component";
import { TeamManagementComponent } from "../board-admin/team-management/team-management.component";
import { UserManagementComponent } from "../board-admin/user-management/user-management.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { AngularEditorModule } from "@kolkov/angular-editor";
import { NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { NgxDatatableModule } from "@swimlane/ngx-datatable";
import { NgxImageZoomModule } from "ngx-image-zoom";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { RouterModule } from "@angular/router";
import { AdminTopFiltersComponent } from "../board-admin/admin-top-filters/admin-top-filters.component";
import { BlogCardsComponent } from "../dashboard/dashboard-components/blog-cards/blog-cards.component";
import { AdminCompetitionComponent } from "./admin-competition/admin-competition.component";
import { SalesSummaryComponent } from "../dashboard/dashboard-components/sales-summary/sales-summary.component";
import { NgxChartsModule } from "@swimlane/ngx-charts";
import { LeagueListingComponent } from "../board-admin/league-listing/league-listing.component";
import { AcademyListingComponent } from "./academy-listing/academy-listing.component";
import { AdminTeamListingComponent } from "../board-admin/admin-team-listing/admin-team-listing.component";
import { AdminSquadListingComponent } from "../board-admin/admin-squad-listing/admin-squad-listing.component";
import { NotifierModule, NotifierOptions } from "angular-notifier";
import { AdminAcademyTeamsComponent } from "../board-admin/admin-academy-teams/admin-academy-teams.component";

@NgModule({
  declarations: [
    AdminAcademyTeamsComponent,
    AdminSquadListingComponent,
    AdminTeamListingComponent,
    LeagueListingComponent,
    UserManagementComponent,
    LeagueManagementComponent,
    SquadManagementComponent,
    TeamManagementComponent,
    AcademyManagementComponent,
    AdminDashboardComponent,
    AdminDataTableComponent,
    AcademyDetailComponent,
    AcademyLeagueSelectionComponent,
    SquadAcademyListComponent,
    SquadListComponent,
    AdminSquadListComponent,
    ConfirmationModalComponent,
    AdminNotificationsComponent,
    AdminTopFiltersComponent,
    BlogCardsComponent,
    AdminCompetitionComponent,
    SalesSummaryComponent,
    AcademyListingComponent
  ],
  imports: [
    NgxChartsModule,
    CommonModule,
    NgxImageZoomModule,
    NgbNavModule,
    NgxDatatableModule,
    ReactiveFormsModule,
    FormsModule,
    AngularEditorModule,
    NgMultiSelectDropDownModule.forRoot(),
    RouterModule
  ],
  exports: [
    AdminAcademyTeamsComponent,
    AdminSquadListingComponent,
    AdminTeamListingComponent,
    LeagueListingComponent,
    SalesSummaryComponent,
    AdminTopFiltersComponent,
    UserManagementComponent,
    LeagueManagementComponent,
    SquadManagementComponent,
    TeamManagementComponent,
    AcademyManagementComponent,
    AdminDashboardComponent,
    AdminDataTableComponent,
    AcademyDetailComponent,
    AcademyLeagueSelectionComponent,
    SquadAcademyListComponent,
    SquadListComponent,
    AdminSquadListComponent,
    ConfirmationModalComponent,
    AdminNotificationsComponent,
    BlogCardsComponent
  ]
})
export class AdminSharedModule { }
