import { Component, Input, OnInit } from '@angular/core';
import { Warrant } from '../warrant';
import { WarrantService } from '../warrant.service';
import { WarrantCheck } from '@warrantdev/warrant-js';

@Component({
  selector: 'warrant-protected-component',
  templateUrl: './warrant-protected.component.html',
  styleUrls: ['./warrant-protected.component.css'],
})
export class WarrantProtectedComponent implements OnInit {
  isAuthorized: boolean = false;
  @Input() warrantCheck: WarrantCheck = { warrants: [] };

  constructor(
    private warrantService: WarrantService,
  ) {}

  ngOnInit(): void {
    this.warrantService
      .isAuthorized(this.warrantCheck)
      .then((result) => {
        this.isAuthorized = result;
      });
  }
}
