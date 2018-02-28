import { Component } from '@angular/core';
import { NavController, ToastController, NavParams, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Todo } from '../../models/Todo';
import { Observable } from 'rxjs/Observable';
import { ArchivedTodo } from '../../models/ArchivedTodo';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private currentUser: string; // get the UID so we can create a collection for each user who is registered
  public todos: Observable<Todo[]>; // keep the list with all todos we have in firestore
  private collection: AngularFirestoreCollection<Todo>; // collection keep the referance to our todosToBeDone

  private archivedCollection: AngularFirestoreCollection<ArchivedTodo>; // collection to keep the referance to our todoHasBeenDone collection

  constructor(private navCtrl: NavController, private af: AngularFirestore, private toast: ToastController, private alert: AlertController) {
    this.ionViewDidLoad();
    this.collection = af.collection<Todo>(''+this.currentUser+'').doc('todos').collection('todosToBeDone'); // create a referance to 'todos' collection in Firestore
    this.archivedCollection = af.collection<ArchivedTodo>(''+this.currentUser+'').doc('todos').collection('todosHasBeenDone'); // create a referance to 'todos' collection in Firestore
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
      message: `${todo.title} finished and archived!`,
      duration: 2000
    }).present();
    this.deleteTodo(todo);
    this.archiveTodo(todo);
  }

archiveTodo(todo: Todo) {
    let archivedTitle = todo.title;
    let archivedContent = todo.content;
    this.archivedCollection.add({title: archivedTitle, content: archivedContent, finished: true} as ArchivedTodo);
    this.collection.doc(todo.id).delete();
  }

    // Delete the selected todo doc
deleteTodo(todo: Todo) {
      this.collection.doc(todo.id).delete();
  }

  // shows the content in a todo doc, based on id in pop up window
  showContentInTodo(todo: Todo) {
    this.collection.doc(todo.id);
    let alert = this.alert.create({
      title: todo.title,
      subTitle: todo.content,
      buttons: ['Ok'],
      cssClass: 'alertCustomCss'
    });
    alert.present();
  }

    // logout from app
logOut() {
      this.af.app.auth().signOut();
      this.navCtrl.push('WelcomePage');
      this.toast.create({
        message: 'Logging out',
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

  // when this is loading get user email adress, also using it to create a collection for users email
  ionViewDidLoad() {
    this.currentUser = this.af.app.auth().currentUser.uid;
  }

}
