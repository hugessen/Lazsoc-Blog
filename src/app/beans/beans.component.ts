import { Component, OnInit } from '@angular/core';
import { WebAPI } from '../services/web-api.service';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-beans',
  templateUrl: './beans.component.html',
  styleUrls: ['./beans.component.css']
})
export class BeansComponent implements OnInit {
	beans: {}
  conversations: {}
  obj = {
    sender_id: 1,
    recipient_id: 2
  };
  message = {
    body: 'New message',
    conversation_id: 1
  }


  oldRes;

  constructor(public webAPI: WebAPI, public authService: AuthService) {
     /*setInterval(function(){
    authService.apiGet('beans/display_conversation',{params: {sender_id: 1, recipient_id: 2, conversation_id:1}}).then(res => {
      console.log("display conversation between 1 and 2:", res);
      if(this.oldRes){
        if(this.oldRes.length != res.length){
          //display new messages
          console.log("NEW MESSSAGE ARRIVED: ", res[res.length-1])
        }
      }
      this.oldRes = res;
     });},2500);*/
     this.authService.getBeans().then(res => {
       this.beans = res;
     })
  }



  getConversations() {
    this.authService.apiGet('beans/conversations.json').then(res => {
       this.conversations = res;
       console.log(this.conversations);
      });
  }

  //TOOD: send proper sender_id, recipient_id instad of this.obj
  startConversation() {
    this.authService.apiPost('beans/start_conversation', this.obj).then(res => {
      console.log('start convos:', res);
     });
  }

  displayConversation() {
    //TODO: send proper sender_id, recipient_id and conversation_id
     this.authService.apiGet('beans/display_conversation', {params: {sender_id: 1, recipient_id: 2, conversation_id: 1}}).then(res => {
      console.log('display convos:', res);
    });
  }


  //TODO: send proper message obt
  sendMessage() {
    this.authService.apiPost('beans/send_message', this.message).then(res => {
      console.log('message sent: ', res);
     });
  }
  ngOnInit() {
  }

}
