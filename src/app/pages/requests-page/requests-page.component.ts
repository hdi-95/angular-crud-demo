import { AsyncPipe, NgIf, SlicePipe } from "@angular/common";
import { Component, inject, OnInit, ViewChild } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatDividerModule } from "@angular/material/divider";
import {
  MatPaginator,
  MatPaginatorModule,
  PageEvent,
} from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { ProjectRequestComponent } from "../../components/project-request/project-request.component";
import { RequestDialogComponent } from "../../dialogs/request-dialog/request-dialog.component";
import { AppFacade } from "../../store/app.facade";
import { getPref } from "../../utils/helper";
import { PrefKeys } from "../../utils/constants";
import { ProjectRequest } from "../../models/request.model";
import { take, tap } from "rxjs";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-requests-page",
  standalone: true,
  imports: [
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    AsyncPipe,
    ProjectRequestComponent,
    MatPaginatorModule,
    NgIf,
    SlicePipe,
  ],
  templateUrl: "./requests-page.component.html",
  styleUrl: "./requests-page.component.scss",
})
export class RequestsPageComponent implements OnInit {
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  readonly dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);
  private appFacade: AppFacade = inject(AppFacade);
  public requestProjects$ = this.appFacade.selectProjectRequests$;
  public pageIndex: number = 0;
  public pageSize: number = 4;

  ngOnInit(): void {
    this.getDataFromLocalStorage();
  }

  getDataFromLocalStorage(): void {
    let requestProjectsPref = getPref(PrefKeys.PROJECT_REQUESTS) || null;

    let requestProjects: ProjectRequest[] =
      requestProjectsPref && JSON.parse(requestProjectsPref);

    if (requestProjects.length >= 1) {
      this.appFacade.setProjectRequests(requestProjects);
    }
  }

  openRequestDialog(): void {
    this.dialog.open(RequestDialogComponent);
  }

  handlePageEvent(e: PageEvent) {
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  delete(projectRequestId: number): void {
    this.appFacade.deleteProjectRequest(projectRequestId);
    this.checkPageAfterDelete();
    this.openSnackBar("Demande supprimée", "Annuler");
  }

  checkPageAfterDelete(): void {
    this.appFacade.selectProjectRequests$
      .pipe(
        take(1),
        tap((projectRequests) => {
          if (
            projectRequests.length > 0 &&
            projectRequests.length <= this.pageIndex * this.pageSize
          )
            this.paginator?.previousPage();
        })
      )
      .subscribe();
  }

  approve(projectRequest: ProjectRequest) {
    this.appFacade.updateProjectRequest({
      ...projectRequest,
      status: "APPROVED",
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 3000,
    });
  }
}
