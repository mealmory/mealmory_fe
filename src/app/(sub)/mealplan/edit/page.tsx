"use client";

import MealplanForm from "@/components/main/MealplanForm";
import { useState } from "react";

export default function MealEditPage() {
  const [selectedType, setSelectedType] = useState(0);
  return (
    <main>
      <MealplanForm
        selectedType={selectedType}
        setSelectedType={setSelectedType}
        edit
      />
    </main>
  );
}
