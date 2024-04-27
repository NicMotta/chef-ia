import { CONTENT } from "./constants";

export function getDialogChef(response, isLoading, recipe) {
  if (isLoading) {
    return CONTENT.chef.loading;
  }

  if (response && !recipe) {
    return CONTENT.chef.success;
  }

  if (recipe) {
    return recipe;
  }

  return CONTENT.chef.welcome;
}
