import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolver implements Resolve<Recipe[]> {
  constructor(private dataStoregeService: DataStorageService, private recipesService: RecipeService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipesService.getRecipes();
    if (recipes.length === 0) {
      return this.dataStoregeService.featchRecipe();
    }else {
      return recipes;
    }

  }
}
