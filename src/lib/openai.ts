import OpenAI from "openai";
import type { OnboardingData, MealPlanData } from "@/types";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateMealPlan(userData: OnboardingData): Promise<MealPlanData> {
  const prompt = `You are an expert nutritionist and meal planner. Create a personalized meal plan based on the following user data:

**User Profile:**
- Name: ${userData.name}
- Age: ${userData.age}
- Gender: ${userData.gender}
- Height: ${userData.height} cm
- Weight: ${userData.weight} kg
- Target Weight: ${userData.targetWeight} kg
- Goal: ${userData.goal}
- Activity Level: ${userData.activityLevel}
- Diet Preference: ${userData.dietPreference}
- Allergies: ${userData.allergies?.length ? userData.allergies.join(", ") : "None"}
- Medical Conditions: ${userData.medicalConditions?.length ? userData.medicalConditions.join(", ") : "None"}
- Favorite Foods: ${userData.favoriteFoods?.length ? userData.favoriteFoods.join(", ") : "No preference"}
- Foods to Avoid: ${userData.foodsToAvoid?.length ? userData.foodsToAvoid.join(", ") : "None"}
- Meals Per Day: ${userData.mealsPerDay}
- Plan Length: ${userData.planLength} days

**Instructions:**
1. Calculate appropriate daily calorie and macro targets based on the user's stats and goals.
2. Create a complete ${userData.planLength}-day meal plan with ${userData.mealsPerDay} meals per day.
3. Include a comprehensive shopping list grouped by category.
4. Provide 5 practical nutrition tips personalized to their goals.
5. Each meal should include ingredients, simple instructions, nutrition info, and prep time.
6. Respect all dietary preferences, allergies, and restrictions.
7. Make meals practical, easy to prepare, and use common ingredients.

**IMPORTANT: Return ONLY valid JSON in this exact format (no markdown, no code blocks):**

{
  "summary": {
    "dailyCalories": <number>,
    "protein": <number in grams>,
    "carbs": <number in grams>,
    "fat": <number in grams>,
    "fiber": <number in grams>,
    "water": "<string like '2.5 liters'>"
  },
  "mealPlan": [
    {
      "day": 1,
      "meals": [
        {
          "name": "<meal name>",
          "type": "<breakfast|lunch|dinner|snack>",
          "ingredients": ["<ingredient 1>", "<ingredient 2>"],
          "instructions": ["<step 1>", "<step 2>"],
          "nutrition": {
            "calories": <number>,
            "protein": <number>,
            "carbs": <number>,
            "fat": <number>
          },
          "prepTime": "<e.g. 15 mins>"
        }
      ],
      "totalNutrition": {
        "calories": <number>,
        "protein": <number>,
        "carbs": <number>,
        "fat": <number>
      }
    }
  ],
  "shoppingList": [
    {
      "item": "<item name>",
      "quantity": "<amount>",
      "category": "<Proteins|Vegetables|Fruits|Grains|Dairy|Pantry|Spices|Other>"
    }
  ],
  "tips": [
    "<tip 1>",
    "<tip 2>",
    "<tip 3>",
    "<tip 4>",
    "<tip 5>"
  ]
}`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "system",
        content: "You are an expert nutritionist. Return ONLY valid JSON, no markdown formatting or code blocks.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    temperature: 0.7,
    max_tokens: 16000,
    response_format: { type: "json_object" },
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from OpenAI");
  }

  const parsed = JSON.parse(content) as MealPlanData;
  return parsed;
}
