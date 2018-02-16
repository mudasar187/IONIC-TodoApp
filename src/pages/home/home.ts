import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Todo } from '../../models/Todo';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public todos: Observable<Todo[]>; // keep the list with all todos we have in firestore
  public collection: AngularFirestoreCollection<Todo>; // collection keep the referance to our collection

  constructor(public navCtrl: NavController, private af: AngularFirestore, private toast: ToastController) {
    this.collection = af.collection<Todo>('todos'); // create a referance to 'todos' collection in Firestore
    this.todos = this.collection.snapshotChanges() // Getting all todos from collection
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as Todo;
          let id = action.payload.doc.id;
          return {
            id,
            ...data
          };
        })
      });
  }

  finishTodo(todo: Todo) {
    // Updating finished on todo-doc in firebase based on todo's ID
    this.collection.doc(todo.id).update({
      finished: true
    });
    this.toast.create({
      message: 'Todo finished and archived!',
      duration: 2000
    }).present();
  }

  deleteTodo(todo: Todo) {
    // Delete the selected todo doc
    this.collection.doc(todo.id).delete();
    this.toast.create({
      message: 'Todo deleted',
      duration: 2000
    }).present();
  }

  goToAddTodoPage() {
    this.navCtrl.push('AddTodoPage', {
      // We send our collection in paramteer to a new page
      todosCollection: this.collection
    });
  }

  logOut() {
    this.af.app.auth().signOut();
    this.toast.create({
      message: 'Logging out',
      duration: 2000
    }).present();
  }

}
