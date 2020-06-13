const recipes = [
    {
        name: 'Pasta Marinara', ingredients: [
            'Penne Pasta', 'Tomato', 'Garlic',
        ]
    },
    {
        name: 'Salad', ingredients: [
            'Lettuce', 'Tomato', 'Mayo', 'Bleu Cheese',
        ]
    },
    {
        name: 'Baked Potatoes', ingredients: [
            'Potato', 'Butter', 'Cheese',
        ]
    },
];

const pantries = [
    {
        person: 'Andy', items: [
            'Penne Pasta', 'Tomato', 'Mayo', 'Cheese',
        ]
    },
    {
        person: 'Betty', items: [
            'Garlic', 'Tomato', 'Bleu Cheese',
        ]
    },
    {
        person: 'Chastity', items: [
            'Lettuce', 'Butter',
        ]
    },
    {
        person: 'Danny', items: [
            'Cheese', 'Penne Pasta', 'Garlic',
        ]
    },
];

const matchPeopleForRecipe = (recipe, pantries, thisPantry) => {
    const matches = {};

    recipe.ingredients
        // Identify the missing ingredients
        .filter(ingredient => thisPantry.items.indexOf(ingredient) < 0)
        // Identify pantries that contain missing ingredients
        .forEach(ingredient => {
            pantries.filter((pantry) => {
                return thisPantry.person !== pantry.person
                    && pantry.items.indexOf(ingredient) >= 0;
            })
                //Add a map of the missing ingredient and people who have it
                .reduce((acc, matchingPantry) => {
                    if (!acc[ingredient]) {
                        acc[ingredient] = [matchingPantry.person];
                    } else {
                        if (acc[ingredient].indexOf(matchingPantry.person) < 0) {
                            acc[ingredient].push(matchingPantry.person);
                        }
                    }
                    return acc;
                }, matches);
        });

    const stillMissing = recipe.ingredients.filter(
        ingredient => Object.keys(matches).indexOf(ingredient) < 0
            && thisPantry.items.indexOf(ingredient) < 0);

    return { peopleWithIngredients: matches, stillMissingIngredients: stillMissing };
};

console.log(`Matching people with ${pantries[1].person} for the ${recipes[2].name} recipe...`);

console.log(JSON.stringify(matchPeopleForRecipe(recipes[2], pantries, pantries[1])));
