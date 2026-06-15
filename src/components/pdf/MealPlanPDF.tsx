import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: "Helvetica",
    fontSize: 10,
    color: "#1a1a1a",
  },
  header: {
    marginBottom: 20,
    borderBottom: "2px solid #22c55e",
    paddingBottom: 15,
  },
  title: {
    fontSize: 24,
    fontFamily: "Helvetica-Bold",
    color: "#22c55e",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 11,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "Helvetica-Bold",
    color: "#1a1a1a",
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: "1px solid #e5e5e5",
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 4,
  },
  summaryLabel: {
    color: "#666",
  },
  summaryValue: {
    fontFamily: "Helvetica-Bold",
  },
  summaryGrid: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 10,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
  },
  summaryCardValue: {
    fontSize: 18,
    fontFamily: "Helvetica-Bold",
    color: "#22c55e",
  },
  summaryCardLabel: {
    fontSize: 8,
    color: "#666",
    marginTop: 2,
  },
  dayHeader: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0fdf4",
    padding: 8,
    borderRadius: 4,
    marginTop: 12,
    marginBottom: 6,
  },
  dayNumber: {
    fontSize: 14,
    fontFamily: "Helvetica-Bold",
    color: "#22c55e",
    marginRight: 8,
  },
  dayCalories: {
    fontSize: 9,
    color: "#666",
  },
  mealContainer: {
    marginLeft: 10,
    marginBottom: 8,
    paddingLeft: 8,
    borderLeft: "2px solid #e5e5e5",
  },
  mealType: {
    fontSize: 8,
    fontFamily: "Helvetica-Bold",
    color: "#22c55e",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  mealName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
    marginBottom: 3,
  },
  mealNutrition: {
    fontSize: 8,
    color: "#888",
    marginBottom: 4,
  },
  ingredientsList: {
    fontSize: 9,
    color: "#444",
    marginBottom: 3,
  },
  instructionStep: {
    fontSize: 9,
    color: "#555",
    marginBottom: 2,
    paddingLeft: 5,
  },
  shoppingCategory: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#22c55e",
    marginTop: 10,
    marginBottom: 4,
  },
  shoppingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 2,
    paddingHorizontal: 5,
    fontSize: 9,
  },
  tipItem: {
    flexDirection: "row",
    marginBottom: 6,
    paddingLeft: 5,
  },
  tipNumber: {
    fontFamily: "Helvetica-Bold",
    color: "#22c55e",
    marginRight: 8,
    fontSize: 10,
  },
  tipText: {
    flex: 1,
    fontSize: 10,
    lineHeight: 1.4,
    color: "#333",
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: "center",
    fontSize: 8,
    color: "#999",
    borderTop: "1px solid #eee",
    paddingTop: 10,
  },
  userInfoGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 10,
  },
  userInfoItem: {
    width: "30%",
    backgroundColor: "#f8f8f8",
    padding: 8,
    borderRadius: 4,
  },
  userInfoLabel: {
    fontSize: 8,
    color: "#888",
  },
  userInfoValue: {
    fontSize: 10,
    fontFamily: "Helvetica-Bold",
    marginTop: 2,
  },
});

interface MealPlanPDFProps {
  plan: {
    summary: {
      dailyCalories: number;
      protein: number;
      carbs: number;
      fat: number;
      fiber: number;
      water: string;
    };
    mealPlan: Array<{
      day: number;
      meals: Array<{
        name: string;
        type: string;
        ingredients: string[];
        instructions: string[];
        nutrition: {
          calories: number;
          protein: number;
          carbs: number;
          fat: number;
        };
        prepTime: string;
      }>;
      totalNutrition: {
        calories: number;
        protein: number;
        carbs: number;
        fat: number;
      };
    }>;
    shoppingList: Array<{
      item: string;
      quantity: string;
      category: string;
    }>;
    tips: string[];
  };
  userData: Record<string, string | number>;
}

export function MealPlanPDF({ plan, userData }: MealPlanPDFProps) {
  const grouped = plan.shoppingList.reduce<Record<string, typeof plan.shoppingList>>(
    (acc, item) => {
      const cat = item.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {}
  );

  return (
    <Document>
      {/* Cover / Summary Page */}
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>Ketodine AI</Text>
          <Text style={styles.subtitle}>
            Personalized Meal Plan for {userData.name || "User"}
          </Text>
        </View>

        {/* User Info */}
        <Text style={styles.sectionTitle}>Your Profile</Text>
        <View style={styles.userInfoGrid}>
          {userData.age && (
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Age</Text>
              <Text style={styles.userInfoValue}>{userData.age}</Text>
            </View>
          )}
          {userData.gender && (
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Gender</Text>
              <Text style={styles.userInfoValue}>{String(userData.gender).charAt(0).toUpperCase() + String(userData.gender).slice(1)}</Text>
            </View>
          )}
          {userData.weight && (
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Weight</Text>
              <Text style={styles.userInfoValue}>{userData.weight} kg</Text>
            </View>
          )}
          {userData.targetWeight && (
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Target</Text>
              <Text style={styles.userInfoValue}>{userData.targetWeight} kg</Text>
            </View>
          )}
          {userData.goal && (
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Goal</Text>
              <Text style={styles.userInfoValue}>{String(userData.goal).replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}</Text>
            </View>
          )}
          {userData.dietPreference && (
            <View style={styles.userInfoItem}>
              <Text style={styles.userInfoLabel}>Diet</Text>
              <Text style={styles.userInfoValue}>{String(userData.dietPreference).charAt(0).toUpperCase() + String(userData.dietPreference).slice(1)}</Text>
            </View>
          )}
        </View>

        {/* Nutrition Summary */}
        <Text style={styles.sectionTitle}>Daily Nutrition Targets</Text>
        <View style={styles.summaryGrid}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardValue}>{plan.summary.dailyCalories}</Text>
            <Text style={styles.summaryCardLabel}>Calories</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardValue}>{plan.summary.protein}g</Text>
            <Text style={styles.summaryCardLabel}>Protein</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardValue}>{plan.summary.carbs}g</Text>
            <Text style={styles.summaryCardLabel}>Carbs</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryCardValue}>{plan.summary.fat}g</Text>
            <Text style={styles.summaryCardLabel}>Fat</Text>
          </View>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Daily Fiber</Text>
          <Text style={styles.summaryValue}>{plan.summary.fiber}g</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Water Intake</Text>
          <Text style={styles.summaryValue}>{plan.summary.water}</Text>
        </View>

        {/* Tips */}
        <Text style={styles.sectionTitle}>Nutrition Tips</Text>
        {plan.tips.map((tip, i) => (
          <View key={i} style={styles.tipItem}>
            <Text style={styles.tipNumber}>{i + 1}.</Text>
            <Text style={styles.tipText}>{tip}</Text>
          </View>
        ))}

        <Text style={styles.footer}>
          Generated by Ketodine AI — Your Personalized Nutrition Partner
        </Text>
      </Page>

      {/* Meal Plan Pages */}
      {plan.mealPlan.map((day) => (
        <Page key={day.day} size="A4" style={styles.page}>
          <View style={styles.dayHeader}>
            <Text style={styles.dayNumber}>Day {day.day}</Text>
            <Text style={styles.dayCalories}>
              {day.totalNutrition.calories} cal | {day.totalNutrition.protein}g protein | {day.totalNutrition.carbs}g carbs | {day.totalNutrition.fat}g fat
            </Text>
          </View>

          {day.meals.map((meal, mealIndex) => (
            <View key={mealIndex} style={styles.mealContainer} wrap={false}>
              <Text style={styles.mealType}>{meal.type}</Text>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealNutrition}>
                {meal.nutrition.calories} cal • {meal.nutrition.protein}g P • {meal.nutrition.carbs}g C • {meal.nutrition.fat}g F • {meal.prepTime}
              </Text>
              <Text style={styles.ingredientsList}>
                Ingredients: {meal.ingredients.join(", ")}
              </Text>
              {meal.instructions.map((step, i) => (
                <Text key={i} style={styles.instructionStep}>
                  {i + 1}. {step}
                </Text>
              ))}
            </View>
          ))}

          <Text style={styles.footer}>
            Ketodine AI — Day {day.day} of {plan.mealPlan.length}
          </Text>
        </Page>
      ))}

      {/* Shopping List Page */}
      <Page size="A4" style={styles.page}>
        <Text style={styles.sectionTitle}>Shopping List</Text>
        {Object.entries(grouped).map(([category, items]) => (
          <View key={category}>
            <Text style={styles.shoppingCategory}>{category}</Text>
            {items.map((item, i) => (
              <View key={i} style={styles.shoppingItem}>
                <Text>• {item.item}</Text>
                <Text style={{ color: "#888" }}>{item.quantity}</Text>
              </View>
            ))}
          </View>
        ))}

        <Text style={styles.footer}>
          Ketodine AI — Shopping List
        </Text>
      </Page>
    </Document>
  );
}
