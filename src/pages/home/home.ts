import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from 'ionic-angular';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Todo } from '../../models/Todo';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private currentUser: string; // get the UID so we can create a collection for each user who is registered
  public todos: Observable<Todo[]>; // keep the list with all todos we have in firestore
  private collection: AngularFirestoreCollection<Todo>; // collection keep the referance to our todos

  constructor(private navCtrl: NavController, private af: AngularFirestore, private toast: ToastController, private alert: AlertController) {
    this.ionViewDidLoad();
    this.collection = af.collection<Todo>('' + this.currentUser + '', (ref) => {
      return ref.where('finished', '==', false);
    }); // creating a reference to collection where we want all todos == false
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

  // Update todo == true, and now showing anymore , they shows in archived todos page
  finishTodo(todo: Todo) {
    this.collection.doc(todo.id).update({
      finished: true
    });
    this.toast.create({
      message: `${todo.title} finished and archived!`,
      duration: 2000
    }).present();
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
