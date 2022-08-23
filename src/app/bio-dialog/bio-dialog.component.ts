import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bio-dialog',
  templateUrl: './bio-dialog.component.html',
  styleUrls: ['./bio-dialog.component.scss'],
})
export class BioDialogComponent implements OnInit {
  dialogData: any;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.dialogData = data.dialogData;
  }

  ngOnInit(): void {}
}
