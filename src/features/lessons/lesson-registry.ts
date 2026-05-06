import { effectivePrayerLessons } from "@/features/effective-prayer/data/lessons";
import { faithTransformLessons } from "@/features/faith-transform/data/lessons";
import { lessons } from "@/features/lessons/data/lessons";
import { stewardshipAdvancedLessons } from "@/features/stewardship-advanced/data/lessons";
import { stewardshipIntermediateLessons } from "@/features/stewardship-intermediate/data/lessons";
import { stewardshipLessons } from "@/features/stewardship/data/lessons";

import type { Lesson } from "./types";

export const allLessonsRegistry: Lesson[] = [
  ...lessons,
  ...effectivePrayerLessons,
  ...faithTransformLessons,
  ...stewardshipLessons,
  ...stewardshipIntermediateLessons,
  ...stewardshipAdvancedLessons,
];
