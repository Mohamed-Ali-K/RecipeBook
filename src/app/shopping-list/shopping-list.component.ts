import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[] = [];
  private igChangeSub!: Subscription;
  constructor(private shoppinListService: ShoppingListService) {}

  ngOnInit() {
    this.ingredients = this.shoppinListService.getIngredients();
    this.igChangeSub = this.shoppinListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }


  onEditItem(index: number) {
    this.shoppinListService.startingEditing.next(index);
  }


  ngOnDestroy() {
    this.igChangeSub.unsubscribe();
  }
}
