import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPolicy } from './policy';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {
  pageTitle = "Policy Details";
  policy : IPolicy | undefined;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle = this.pageTitle + ` ${id}`;
    this.policy = {
      "policyId": id,
      "policyName": "Sugar Cosmetics Eyeliner",
      "policyCode": "GDN-0011",
      "releaseDate": "March 19, 2021",
      "description": "Sugar Cosmetics eyeliner is water-proof",
      "price": 450.3
  }

}
}
