import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { HomePage } from '../home/home';
import { Todo } from '../../models/Todo';


@IonicPage()
@Component({
  selector: 'page-archived-todos',
  templateUrl: 'archived-todos.html',
})
export class ArchivedTodosPage {

  public currentUser: string; // get the UID so we can create a collection for each user who is registered
  public todos: Observable<Todo[]>; // keep the list with all todos we have in firestore
  private collection: AngularFirestoreCollection<Todo>; // collection keep the referance to our todos


  constructor(public navCtrl: NavController, private af: AngularFirestore, private alert: AlertController, private toast: ToastController) {
    this.ionViewDidLoad();
    this.collection = af.collection<Todo>(''+this.currentUser+'', (ref) => {
      return ref.where('finished', '==', true);
    });
    this.todos = this.collection.snapshotChanges()
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

  // Delete the selected todo doc
  deleteTodo(todo: Todo) {
    this.toast.create({
      message: `${todo.title} deleted!`,
      duration: 2000
    }).present();
    this.collection.doc(todo.id).delete();
  }

  // shows the content in a todo doc, based on id in pop up window
  showContentInArchiveTodos(todo: Todo) {
    // this.doneTodosCollection.doc(doneTodo.id);
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

  ionViewDidLoad() {
    this.currentUser = this.af.app.auth().currentUser.uid;
  }


  goToTodosPage() {
    this.navCtrl.push(HomePage);
  }

}
