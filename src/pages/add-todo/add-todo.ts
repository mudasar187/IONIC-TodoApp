import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Todo } from '../../models/Todo';

@IonicPage()
@Component({
  selector: 'page-add-todo',
  templateUrl: 'add-todo.html',
})
export class AddTodoPage {

  public collection: AngularFirestoreCollection<Todo>; // collection
  public todoText: string = ""; // todo text

  constructor(public navCtrl: NavController, public navParams: NavParams, private toast: ToastController) {
    this.collection = navParams.get('todosCollection');
  }

  // add todo to collection
  addTodo() {
    this.collection.add({ title: this.todoText, finished: false } as Todo)
      .then(response => {
        //console.log(response);
        this.makeInputFieldEmpty();
        this.toast.create({
          message: "Todo added to the list",
          duration: 2000
        }).present();
      })
      .catch(error => {
        console.log(error);
        this.toast.create({
          message: 'Todo add failed',
          duration: 2000
        }).present();
      })
  }

  // Empty field when todo btn is clicked
  makeInputFieldEmpty() {
    this.todoText = "";
  }

}
