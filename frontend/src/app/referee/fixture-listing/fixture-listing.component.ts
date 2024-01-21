import { Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { ColumnMode } from "@swimlane/ngx-datatable";
import { UserService } from "src/app/_services/user.service";
import * as PlayerSelectors from "../../_store/selectors/players.selectors";

@Component({
  selector: "app-fixture-listing",
  templateUrl: "./fixture-listing.component.html",
  styleUrls: ["./fixture-listing.component.scss"]
})
export class FixtureListingComponent {
  @ViewChild("myTable") table: any;
  @Output() delFixture = new EventEmitter<string>();
  options = {};
  @Input() fixtures: any = [];
  columns: any = [{ prop: "Fixture" }, { name: "League" }, { name: "Team 1" }, { name: "Team 2" }];
  loadingIndicator = true;
  reorderable = true;
  ColumnMode = ColumnMode;
  constructor(private store: Store, private userService: UserService) {
    console.log(this.fixtures);
  }

  ngOnInit() { }

  edit(value: any) {
    console.log(value);
  }

  delete(value: any) {
    this.delFixture.emit(value);
  }
}
