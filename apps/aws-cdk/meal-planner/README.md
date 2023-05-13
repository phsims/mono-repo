# AWS CDK Meal Planner

## Dynamo DB using single table design

| Entity        | PK1                | SK1                  | GIS1PK               | GIS1SK             | GIS2PK  | GIS2SK               |
| ------------- | ------------------ | -------------------- | -------------------- | ------------------ | ------- | -------------------- |
| Users         | USER# <id>         | USER# <id>           |                      |                    |         |                      |
| Recipe        | RECIPE# <RecipeId> | RECIPE# <RecipeId>   | RECIPE# <CategoryId> | RECIPE# <RecipeId> | RECIPE# | RECIPE# <Ingredient> |
| MealPlan      | USER# <id>         | PLAN# <PlanId>       |                      |                    |         |                      |
| MealPlanItems | PLANITEM# <PlanId> | PLANITEM# <RecipeId> |                      |                    |         |                      |
