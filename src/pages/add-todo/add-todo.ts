import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavParams, ToastController } from 'ionic-angular';
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Todo } from '../../models/Todo';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OnInit } from '@angular/core';

@IonicPage()
@Component({
  selector: 'page-add-todo',
  templateUrl: 'add-todo.html',
})
export class AddTodoPage implements OnInit {

  todo = {} as Todo;
  todoForm: FormGroup;

  private collection: AngularFirestoreCollection<Todo>; // collection

  constructor(private navParams: NavParams, private toast: ToastController) {
    this.collection = navParams.get('todosCollection'); // ????
  }

  ngOnInit() {
    this.todoForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]),
      content: new FormControl('', [Validators.required, Validators.minLength(5), Validators.maxLength(100)])
    });
  }

  clearForm() {
    this.todoForm.reset({
      'name': '',
      'content': ''
    });
  }

  // add todo to todosToBeDone collection
  addTodo(todo: Todo) {
    this.collection.add({ title: todo.title, content: todo.content, finished: false } as Todo)
      .then(response => {
        //console.log(response);
        this.toast.create({
          message: `${todo.title} added to the list`,
          duration: 2000
        }).present();
        this.clearForm();
      })
      .catch(error => {
        console.log(error);
        this.toast.create({
          message: 'Todo add failed',
          duration: 2000
        }).present();
      })
  }

  // for the textarea in html file
  @ViewChild('myInput') myInput: ElementRef;
  resize() {
    var element = this.myInput['_elementRef'].nativeElement.getElementsByClassName("text-input")[0];
    var scrollHeight = element.scrollHeight;
    element.style.height = scrollHeight + 'px';
    this.myInput['_elementRef'].nativeElement.style.height = (scrollHeight + 16) + 'px';
  }

}
