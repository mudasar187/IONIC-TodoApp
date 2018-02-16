import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Todo } from '../../models/Todo';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {


  public currentUser: string; // get the UID so we can create a collection for each user who is registered
  public todos: Observable<Todo[]>; // keep the list with all todos we have in firestore
  public collection: AngularFirestoreCollection<Todo>; // collection keep the referance to our collection

  constructor(public navCtrl: NavController, private af: AngularFirestore, private toast: ToastController, private navParams: NavParams) {
    this.ionViewDidLoad();
    this.collection = af.collection<Todo>(''+this.currentUser+''); // create a referance to 'todos' collection in Firestore
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

  // Updating finished on todo-doc in firebase based on todo's ID
  finishTodo(todo: Todo) {
    this.collection.doc(todo.id).update({
      finished: true
    });
    this.toast.create({
      message: 'Todo finished and archived!',
      duration: 2000
    }).present();
  }

  // Delete the selected todo doc
  deleteTodo(todo: Todo) {
    this.collection.doc(todo.id).delete();
    this.toast.create({
      message: 'Todo deleted',
      duration: 2000
    }).present();
  }

  // We send our collection in paramteer to a new page
  goToAddTodoPage() {
    this.navCtrl.push('AddTodoPage', {
      todosCollection: this.collection
    });
  }

  // go to the page where todo is archived
  goToArchivedTodosPage() {
    this.navCtrl.push('ArchivedTodosPage');
  }

  // logout from app
  logOut() {
    this.af.app.auth().signOut();
    this.toast.create({
      message: 'Logging out',
      duration: 2000
    }).present();
  }

  // when this is loading get user email adress, also using it to create a collection for users email
  ionViewDidLoad() {
    this.currentUser = this.af.app.auth().currentUser.email;
  }

}
