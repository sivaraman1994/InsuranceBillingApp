import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Element } from './policy';

@Component({
  selector: 'app-policy-details',
  templateUrl: './policy-details.component.html',
  styleUrls: ['./policy-details.component.css']
})
export class PolicyDetailsComponent implements OnInit {
  pageTitle = "Policy Details";
  policy : Element | undefined;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.pageTitle = this.pageTitle + ` ${id}`;
    this.policy = {
      "position": 1,
      "username": "Chaitali Mane",
      "policyID": "GDN-0011",
      "coverage": "March 19, 2021",
      "premium": 3456,
      "paymentStatus": "COMPLETED"
  }

}
}
