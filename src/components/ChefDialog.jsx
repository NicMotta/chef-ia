import { useStore } from '@nanostores/react';
import { isLoading, responseData, recipe } from '../utils/store';
import { getDialogChef } from '../utils/helpers';
import TextDialog from './TextDialog';
import Button from './Button';

export default function ChefDialog() {
  const $isLoading = useStore(isLoading);
  const $response = useStore(responseData);
  const $recipe = useStore(recipe);
  const dialogChef = getDialogChef($response, $isLoading, $recipe);

  function handleClick (index) {
    recipe.set($response.recipes[index]);
  }

  return (
    <div>
      <TextDialog content={dialogChef} />

      { $response &&
        <div className='flex gap-4 mt-4'>
          {$response.recipesTitle.map((recipeTitle, index) => (
            <Button key={index} onClick={() => handleClick(index)} text={recipeTitle} />
          ))}
        </div>
      }
    </div>
  )
}