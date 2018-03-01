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

  private collection: AngularFirestoreCollection<Todo>; // collection
  public todoTitle: string = ""; // add todo title
  public todoContent: string = ""; // add todo

  constructor(private navParams: NavParams, private toast: ToastController) {
    this.collection = navParams.get('todosCollection'); // ????
  }

  // add todo to todosToBeDone collection
  addTodo() {
    this.collection.add({ title: this.todoTitle, content: this.todoContent, finished: false } as Todo)
      .then(response => {
        //console.log(response);
        this.toast.create({
          message: `${this.todoTitle} added to the list`,
          duration: 2000
        }).present();
        this.makeInputFieldEmpty();
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
    this.todoTitle = "";
    this.todoContent = "";
  }

}
