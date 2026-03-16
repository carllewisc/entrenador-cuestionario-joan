import { z } from "zod"

export const formSchema = z.object({
  // Contact Information
  name: z.string().min(1, "El nombre es requerido"),
  email: z.string().email("Ingrese un correo electrónico válido").min(1, "El correo electrónico es requerido"),
  phone: z.string().min(1, "El teléfono es requerido"),
  profilePhoto: z.string().optional(),

  // ABOUT YOURSELF
  gender: z.string().min(1, "Este campo es requerido"),
  bodyMass: z.string().min(1, "Este campo es requerido"),
  age: z.string().min(1, "Este campo es requerido"),
  height: z.string().min(1, "Este campo es requerido"),
  motivation: z.string().min(1, "Este campo es requerido"),
  currentPlan: z.string().optional(),

  // Medical Experience
  chronicDiseases: z.string().optional(),
  gastrointestinalDisorders: z.string().optional(),
  allergies: z.string().optional(),
  previousInjuries: z.string().optional(),

  // LIFESTYLE
  currentStyle: z.string().optional(),
  socioeconomicLevel: z.string().optional(),
  recreationalActivities: z.string().optional(),
  stressLevel: z.string().min(1, "El nivel de estrés es requerido"),
  sleepHours: z.string().optional(),
  sports: z.string().optional(),

  // Sports History
  strengthTraining: z.string().optional(),
  trainingFrequency: z.string().optional(),
  routineType: z.string().optional(),
  plannedFrequency: z.string().optional(),
  preferredExercises: z.string().optional(),

  // Pharmacology
  performanceSubstances: z.string().optional(),
  lastUse: z.string().optional(),
  useDuration: z.string().optional(),
  useMotivation: z.string().optional(),
  cycleDose: z.string().optional(),

  // Diet and Lifestyle Habits
  dailyIntakes: z.string().optional(),
  foodPreferences: z.string().optional(),
  physicalActivityLevel: z.string().min(1, "El nivel de actividad física es requerido"),

  // BIOACTIVE COMPOUNDS
  alcoholConsumption: z.string().optional(),
  smoker: z.string().optional(),
  caffeineConsumption: z.string().optional(),
  psychoactiveSubstances: z.string().optional(),
})

export type FormValues = z.infer<typeof formSchema>

export const defaultValues: Partial<FormValues> = {
  name: "",
  email: "",
  phone: "",
  profilePhoto: "",
  gender: "",
  bodyMass: "",
  age: "",
  height: "",
  motivation: "",
  currentPlan: "",
  chronicDiseases: "",
  gastrointestinalDisorders: "",
  allergies: "",
  previousInjuries: "",
  currentStyle: "",
  socioeconomicLevel: "",
  recreationalActivities: "",
  stressLevel: "1",
  sleepHours: "",
  sports: "",
  strengthTraining: "",
  trainingFrequency: "",
  routineType: "",
  plannedFrequency: "",
  preferredExercises: "",
  performanceSubstances: "",
  lastUse: "",
  useDuration: "",
  useMotivation: "",
  cycleDose: "",
  dailyIntakes: "",
  foodPreferences: "",
  physicalActivityLevel: "1",
  alcoholConsumption: "",
  smoker: "",
  caffeineConsumption: "",
  psychoactiveSubstances: "",
}
