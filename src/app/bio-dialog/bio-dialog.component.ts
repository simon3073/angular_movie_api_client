import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-bio-dialog',
  templateUrl: './bio-dialog.component.html',
  styleUrls: ['./bio-dialog.component.scss'],
})

/*
  Component to show actor or director data form the movie-view component
  Data passed via the MAT_DIALOG_DATA import
*/
export class BioDialogComponent implements OnInit {
  dialogData: DialogData;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any) {
    this.dialogData = data.dialogData;
  }

  ngOnInit(): void {}
}

export interface DialogData {
  _id: number;
  Bio: string;
  Born: string;
  Died?: string;
  Name: string;
  imgURL: string;
  MoviesDirected?: number[];
  Movies?: number[];
}
