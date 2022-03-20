import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

 @Input() error: string ='';
 @Input() control!: FormControl;
 @Input() text: string='';

  constructor() { }

  ngOnInit(): void {
  }

  temErro(): boolean {
    return this.control ? this.control.hasError(this.error) && (this.control.dirty || this.control.touched) : true;
  }

}
