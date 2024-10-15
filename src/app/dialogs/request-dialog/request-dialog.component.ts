import { NgIf } from "@angular/common";
import { Component, Inject, inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { interval, map, take } from "rxjs";
import { ProjectRequest } from "../../models/request.model";
import { AppFacade } from "../../store/app.facade";
import { ModelFormGroup } from "../../utils/formcontol.utils";

export interface DialogData {
  request: ProjectRequest;
}

@Component({
  selector: "app-add-request-dialog",
  standalone: true,
  imports: [
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    NgIf,
    MatProgressSpinnerModule,
  ],
  templateUrl: "./request-dialog.component.html",
  styleUrl: "./request-dialog.component.scss",
})
export class RequestDialogComponent implements OnInit {
  readonly dialogRef = inject(MatDialogRef<RequestDialogComponent>);
  readonly formBuilder = inject(FormBuilder);
  public editMode = false;
  public loading = false;

  private projectRequests: ProjectRequest[] = [];

  public requestFormGroup!: ModelFormGroup<
    Pick<ProjectRequest, "name" | "user" | "contract">
  >;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private appFacade: AppFacade
  ) {}

  ngOnInit(): void {
    this.editMode = !!this.data?.request;

    this.setupForm();

    this.appFacade.selectProjectRequests$
      .pipe(
        take(1),
        map((projectRequests) => (this.projectRequests = projectRequests))
      )
      .subscribe();
  }

  private setupForm(): void {
    this.requestFormGroup = this.formBuilder.group({
      name: [this.data?.request?.name || null, Validators.required],
      user: [this.data?.request?.user || null, Validators.required],
      contract: [this.data?.request?.contract || null],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  saveRequest(): void {
    this.loading = true;

    const formValue = {
      name: this.requestFormGroup.value.name || null,
      user: this.requestFormGroup.value.user || null,
      contract: this.requestFormGroup.value.contract || null,
    };

    // just wait to simulate data loading
    interval(500)
      .pipe(take(1))
      .subscribe(() => {
        if (this.editMode) {
          this.appFacade.updateProjectRequest({
            ...this.data?.request,
            ...formValue,
          });
        } else {
          this.appFacade.addProjectRequest({
            id: this.projectRequests.length + 1,
            ...formValue,
            status: "AWAITING_APPROVAL",
          });
        }

        this.dialogRef.close();
      });
  }
}
