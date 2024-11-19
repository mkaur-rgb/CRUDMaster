// counter.component.ts
import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as CounterActions from './counter.actions';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="onIncrement()">Increment</button>
    <button (click)="onDecrement()">Decrement</button>
    <button (click)="onReset()">Reset</button>
    <p>Count: {{ count$ | async }}</p>
  `
})
export class CounterComponent {
  count$ = this.store.select(state => state.count);

  constructor(private store: Store<{ count: number }>) {}

  onIncrement() {
    this.store.dispatch(CounterActions.increment());
  }

  onDecrement() {
    this.store.dispatch(CounterActions.decrement());
  }

  onReset() {
    this.store.dispatch(CounterActions.reset());
  }
}
