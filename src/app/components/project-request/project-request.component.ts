import { NgClass } from "@angular/common";
import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";
import { RequestDialogComponent } from "../../dialogs/request-dialog/request-dialog.component";
import { ProjectRequest } from "../../models/request.model";

@Component({
  selector: "app-project-request",
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatMenuModule, NgClass],
  templateUrl: "./project-request.component.html",
  styleUrl: "./project-request.component.scss",
})
export class ProjectRequestComponent {
  @Input({ required: true }) projectRequest!: ProjectRequest;
  @Output() deleteEvent = new EventEmitter<number>();
  @Output() approveEvent = new EventEmitter<ProjectRequest>();

  readonly dialog = inject(MatDialog);

  edit(): void {
    this.dialog.open(RequestDialogComponent, {
      data: { request: this.projectRequest },
    });
  }

  delete(): void {
    this.deleteEvent.emit(this.projectRequest.id);
  }

  approve(): void {
    this.approveEvent.emit(this.projectRequest);
  }
}
