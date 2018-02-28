import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { ArchivedTodo } from '../../models/ArchivedTodo';
import { AngularFirestoreCollection, AngularFirestore } from 'angularfire2/firestore';
import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-archived-todos',
  templateUrl: 'archived-todos.html',
})
export class ArchivedTodosPage {

  public currentUser: string; // get the UID so we can create a collection for each user who is registered
  public doneTodos: Observable<ArchivedTodo[]>;
  public doneTodosCollection: AngularFirestoreCollection<ArchivedTodo>;


  constructor(public navCtrl: NavController, public navParams: NavParams, private af: AngularFirestore, private alert: AlertController, private toast: ToastController) {
    this.ionViewDidLoad();
    this.doneTodosCollection = af.collection<ArchivedTodo>(''+this.currentUser+'').doc('todos').collection('todosHasBeenDone'); // create a referance to 'todos' collection in Firestore
    this.doneTodos = this.doneTodosCollection.snapshotChanges() // Getting all todos from collection
      .map(actions => {
        return actions.map(action => {
          let data = action.payload.doc.data() as ArchivedTodo;
          let id = action.payload.doc.id;
          return {
            id,
            ...data
          };
        })
      });
  }

  // Delete the selected todo doc
  deleteTodo(archivedTodo: ArchivedTodo) {
    this.toast.create({
      message: `${archivedTodo.title} deleted!`,
      duration: 2000
    }).present();
    this.doneTodosCollection.doc(archivedTodo.id).delete();
  }

  // shows the content in a todo doc, based on id in pop up window
  showContentInArchiveTodos(doneTodo: ArchivedTodo) {
    this.doneTodosCollection.doc(doneTodo.id);
    let alert = this.alert.create({
      title: doneTodo.title,
      subTitle: doneTodo.content,
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
