import { Component, Input, OnInit } from '@angular/core';
import { WarrantService } from '../warrant.service';

@Component({
  selector: 'warrant-protected-component',
  templateUrl: './warrant-protected.component.html',
  styleUrls: ['./warrant-protected.component.css'],
})
export class WarrantProtectedComponent implements OnInit {
  isAuthorized: boolean = false;
  @Input() op: string = '';
  @Input() warrants: Array<any> = [];

  constructor(
    private warrantService: WarrantService,
  ) {}

  ngOnInit(): void {
    this.warrantService
      .isAuthorized(this.op, this.warrants)
      .subscribe((resp) => {
        this.isAuthorized = resp.result === 'Authorized';
      });
  }
}
