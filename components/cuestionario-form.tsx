"use client"

import { useState, useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { type FormValues, formSchema, defaultValues } from "@/lib/form-schema"
import { submitForm } from "@/app/actions"
import QuestionSection from "./question-section"
import { FormField } from "./ui/form-field"
import { Notification } from "./ui/notification"
// Importación directa del componente
import { CloudinaryUploader } from "./packages/cloudinary-uploader"
import Image from "next/image"

export default function QuestionnaireForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string; data?: any } | null>(null)
  const [stressLevelValue, setStressLevelValue] = useState("1")
  const [physicalActivityLevelValue, setPhysicalActivityLevelValue] = useState("1")
  const [profilePhotoUrl, setProfilePhotoUrl] = useState("")

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  })

  // Observar cambios en los sliders
  const stressLevel = watch("stressLevel")
  const physicalActivityLevel = watch("physicalActivityLevel")

  // Actualizar los estados locales cuando cambian los valores
  useEffect(() => {
    if (stressLevel) setStressLevelValue(stressLevel)
  }, [stressLevel])

  useEffect(() => {
    if (physicalActivityLevel) setPhysicalActivityLevelValue(physicalActivityLevel)
  }, [physicalActivityLevel])

  // Asegurar que los valores iniciales estén establecidos
  useEffect(() => {
    setValue("stressLevel", defaultValues.stressLevel || "1")
    setValue("physicalActivityLevel", defaultValues.physicalActivityLevel || "1")
  }, [setValue])

  const handleImageUploadSuccess = (result: any) => {
    const secureUrl = result.info.secure_url
    setProfilePhotoUrl(secureUrl)
    setValue("profilePhoto", secureUrl, { shouldValidate: true })
  }

  const handleRemoveImage = () => {
    setProfilePhotoUrl("")
    setValue("profilePhoto", "", { shouldValidate: true })
  }

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true)
    setSubmitResult(null)

    try {
      const result = await submitForm(data)
      setSubmitResult(result)

      // Si el envío fue exitoso, resetear el formulario
      if (result.success) {
        reset(defaultValues)
        setStressLevelValue("1")
        setPhysicalActivityLevelValue("1")
        setProfilePhotoUrl("")
        // Desplazar al inicio del formulario
        window.scrollTo({ top: 0, behavior: "smooth" })
      }
    } catch (error) {
      setSubmitResult({
        success: false,
        message: "Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      {/* Notificación de resultado */}
      {submitResult && (
        <Notification
          type={submitResult.success ? "success" : "error"}
          message={submitResult.message}
          onClose={() => setSubmitResult(null)}
        />
      )}

      <QuestionSection title="INFORMACIÓN DE CONTACTO">
        <FormField label="NOMBRE COMPLETO:" htmlFor="name" error={errors.name?.message}>
          <input
            id="name"
            type="text"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("name")}
          />
        </FormField>

        <FormField label="CORREO ELECTRÓNICO:" htmlFor="email" error={errors.email?.message}>
          <input
            id="email"
            type="email"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("email")}
          />
        </FormField>

        <FormField label="TELÉFONO:" htmlFor="phone" error={errors.phone?.message}>
          <input
            id="phone"
            type="tel"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("phone")}
          />
        </FormField>

        <FormField label="SUBE UNA FOTO ACTUAL:" htmlFor="profilePhoto" error={errors.profilePhoto?.message}>
          <div className="space-y-4">
            {profilePhotoUrl ? (
              <div className="flex flex-col items-center gap-3">
                <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden border-2 border-white">
                  <Image
                    src={profilePhotoUrl || "/placeholder.svg"}
                    alt="Foto actual"
                    fill
                    className="object-cover"
                    sizes="128px"
                  />
                </div>
                <button type="button" onClick={handleRemoveImage} className="text-sm text-red-500 hover:text-red-400">
                  Eliminar foto
                </button>
              </div>
            ) : (
              <CloudinaryUploader
                uploadPreset="questionnaires"
                resourceType="image"
                onSuccess={handleImageUploadSuccess}
                className="w-full bg-gray-800 hover:bg-gray-700"
              />
            )}
            <input type="hidden" {...register("profilePhoto")} />
          </div>
        </FormField>
      </QuestionSection>

      <QuestionSection title="SOBRE TI MISMO">
        <FormField label="SEXO:" htmlFor="gender" error={errors.gender?.message}>
          <select
            id="gender"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("gender")}
          >
            <option value="">Seleccione una opción</option>
            <option value="Hombre">Hombre</option>
            <option value="Mujer">Mujer</option>
          </select>
        </FormField>

        <FormField label="MASA CORPORAL (KG):" htmlFor="bodyMass" error={errors.bodyMass?.message}>
          <input
            id="bodyMass"
            type="number"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("bodyMass")}
          />
        </FormField>

        <FormField label="EDAD:" htmlFor="age" error={errors.age?.message}>
          <input
            id="age"
            type="number"
            min="0"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("age")}
          />
        </FormField>

        <FormField label="ALTURA:" htmlFor="height" error={errors.height?.message}>
          <input
            id="height"
            type="text"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            placeholder="cm"
            {...register("height")}
          />
        </FormField>

        <FormField
          label="¿CUÁL ES TU MOTIVACIÓN PARA EMPEZAR A USAR NUESTROS SERVICIOS?"
          htmlFor="motivation"
          error={errors.motivation?.message}
        >
          <textarea
            id="motivation"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("motivation")}
          />
        </FormField>

        <FormField
          label="¿ESTÁ USANDO ALGÚN PLAN DE NUTRICIÓN O ENTRENAMIENTO? DESCRIBA DETALLADAMENTE CUÁL ES SU OBJETIVO ACTUAL Y PROPORCIONE INFORMACIÓN ADICIONAL."
          htmlFor="currentPlan"
          error={errors.currentPlan?.message}
        >
          <textarea
            id="currentPlan"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={4}
            {...register("currentPlan")}
          />
        </FormField>
      </QuestionSection>

      <QuestionSection title="Experiencia médica:">
        <FormField
          label="¿PADECE ALGUNA ENFERMEDAD CRÓNICA? (COMO DIABETES, HIPERTENSIÓN, ENFERMEDADES CARDÍACAS, AFECCIONES RENALES, ETC.)"
          htmlFor="chronicDiseases"
          error={errors.chronicDiseases?.message}
        >
          <textarea
            id="chronicDiseases"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("chronicDiseases")}
          />
        </FormField>

        <FormField
          label="¿EXPERIMENTA ALGÚN TRASTORNO GASTROINTESTINAL? (COMO ESTREÑIMIENTO, COLITIS, GASTRITIS, ÚLCERAS, ENTRE OTROS)"
          htmlFor="gastrointestinalDisorders"
          error={errors.gastrointestinalDisorders?.message}
        >
          <textarea
            id="gastrointestinalDisorders"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("gastrointestinalDisorders")}
          />
        </FormField>

        <FormField
          label="¿SUFRE DE ALERGIAS ALIMENTARIAS O MEDICAMENTOS? (ESPECIFICAR)"
          htmlFor="allergies"
          error={errors.allergies?.message}
        >
          <textarea
            id="allergies"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("allergies")}
          />
        </FormField>

        <FormField
          label="¿HA SUFRIDO LESIONES ANTERIORES? ¿CUÁNDO? ¿PERSISTEN LIGADAS?"
          htmlFor="previousInjuries"
          error={errors.previousInjuries?.message}
        >
          <textarea
            id="previousInjuries"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("previousInjuries")}
          />
        </FormField>
      </QuestionSection>

      <QuestionSection title="ESTILO DE VIDA">
        <FormField label="¿CUÁL ES TU ESTILO ACTUAL?" htmlFor="currentStyle" error={errors.currentStyle?.message}>
          <input
            id="currentStyle"
            type="text"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("currentStyle")}
          />
        </FormField>

        <FormField
          label="POR FAVOR, ESPECIFIQUE SU NIVEL SOCIOECONÓMICO (BAJO, MEDIO, ALTO)"
          htmlFor="socioeconomicLevel"
          error={errors.socioeconomicLevel?.message}
        >
          <select
            id="socioeconomicLevel"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("socioeconomicLevel")}
          >
            <option value="">Seleccione una opción</option>
            <option value="Low">Bajo</option>
            <option value="Medium">Medio</option>
            <option value="High">Alto</option>
          </select>
        </FormField>

        <FormField
          label="¿CUÁLES SON SUS ACTIVIDADES RECREATIVAS O PASATIEMPOS?"
          htmlFor="recreationalActivities"
          error={errors.recreationalActivities?.message}
        >
          <textarea
            id="recreationalActivities"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("recreationalActivities")}
          />
        </FormField>

        <FormField
          label="INDIQUE SU NIVEL DE ESTRÉS EN UNA ESCALA DEL 1 AL 10."
          htmlFor="stressLevel"
          error={errors.stressLevel?.message}
        >
          <div className="flex flex-col">
            <input
              id="stressLevel"
              type="range"
              min="1"
              max="10"
              className="w-full"
              value={stressLevelValue}
              onChange={(e) => {
                setValue("stressLevel", e.target.value, { shouldValidate: true })
                setStressLevelValue(e.target.value)
              }}
            />
            <div className="flex justify-between text-xs mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
            <div className="text-center mt-1">
              <span className="text-sm">Valor seleccionado: {stressLevelValue}</span>
            </div>
          </div>
          <input type="hidden" {...register("stressLevel")} />
        </FormField>

        <FormField label="¿CUÁNTAS HORAS DUERMES CADA DÍA?" htmlFor="sleepHours" error={errors.sleepHours?.message}>
          <input
            id="sleepHours"
            type="number"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("sleepHours")}
          />
        </FormField>

        <FormField label="¿PRACTICAS ALGÚN DEPORTE EN PARTICULAR?" htmlFor="sports" error={errors.sports?.message}>
          <input
            id="sports"
            type="text"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("sports")}
          />
        </FormField>
      </QuestionSection>

      <QuestionSection title="Historial deportiva">
        <FormField
          label="¿REALIZAS ENTRENAMIENTO DE FUERZA (COMO PESAS) REGULARMENTE?"
          htmlFor="strengthTraining"
          error={errors.strengthTraining?.message}
        >
          <select
            id="strengthTraining"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("strengthTraining")}
          >
            <option value="">Seleccione una opción</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
            <option value="Occasionally">Ocasionalmente</option>
          </select>
        </FormField>

        <FormField
          label="¿CUÁL ES TU FRECUENCIA DE ENTRENAMIENTO ACTUALMENTE?"
          htmlFor="trainingFrequency"
          error={errors.trainingFrequency?.message}
        >
          <input
            id="trainingFrequency"
            type="text"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            placeholder="Ej: 3 veces por semana"
            {...register("trainingFrequency")}
          />
        </FormField>

        <FormField
          label="¿QUÉ TIPO DE RUTINA HAS SEGUIDO EN EL ENTRENAMIENTO FÍSICO?"
          htmlFor="routineType"
          error={errors.routineType?.message}
        >
          <textarea
            id="routineType"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("routineType")}
          />
        </FormField>

        <FormField
          label="¿CUÁL ES LA FRECUENCIA CON LA QUE PLANEAS ENTRENAR CADA SEMANA? ESPECIFICA DÍAS Y HORARIOS SEGÚN TIEMPO PREVISTO DEDICAR A TU RUTINA."
          htmlFor="plannedFrequency"
          error={errors.plannedFrequency?.message}
        >
          <textarea
            id="plannedFrequency"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("plannedFrequency")}
          />
        </FormField>

        <FormField
          label="¿PREFIERES EJERCICIOS ESPECÍFICOS O EXPERIMENTAS MOLESTIAS AL HACER EJERCICIOS CONCRETOS?"
          htmlFor="preferredExercises"
          error={errors.preferredExercises?.message}
        >
          <textarea
            id="preferredExercises"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("preferredExercises")}
          />
        </FormField>
      </QuestionSection>

      <QuestionSection title="Farmacología">
        <FormField
          label="¿HAS EMPLEADO SUSTANCIAS PARA MEJORAR EL RENDIMIENTO Y LA IMAGEN FÍSICA?"
          htmlFor="performanceSubstances"
          error={errors.performanceSubstances?.message}
        >
          <select
            id="performanceSubstances"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("performanceSubstances")}
          >
            <option value="">Seleccione una opción</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
            <option value="PreferNotToAnswer">Prefiero no responder</option>
          </select>
        </FormField>

        <FormField label="¿CUÁNDO EMPLEASTE ESTO POR ÚLTIMA VEZ?" htmlFor="lastUse" error={errors.lastUse?.message}>
          <input
            id="lastUse"
            type="text"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("lastUse")}
          />
        </FormField>

        <FormField label="¿CUÁNTO TIEMPO DURÓ SU USO?" htmlFor="useDuration" error={errors.useDuration?.message}>
          <input
            id="useDuration"
            type="text"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("useDuration")}
          />
        </FormField>

        <FormField
          label="¿CUÁL FUE TU MOTIVACIÓN PARA APROVECHARTE A ELLO?"
          htmlFor="useMotivation"
          error={errors.useMotivation?.message}
        >
          <textarea
            id="useMotivation"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("useMotivation")}
          />
        </FormField>

        <FormField
          label="¿QUÉ DOSIS USASTE EN PROTOCOLO POST-CICLO ADECUADO AL CONCLUIR EL USO?"
          htmlFor="cycleDose"
          error={errors.cycleDose?.message}
        >
          <textarea
            id="cycleDose"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("cycleDose")}
          />
        </FormField>
      </QuestionSection>

      <QuestionSection title="Dietas y hábitos de vida">
        <FormField
          label="¿CUÁNTAS INGESTAS DIARIAS PREFIERES CONSUMIR?"
          htmlFor="dailyIntakes"
          error={errors.dailyIntakes?.message}
        >
          <input
            id="dailyIntakes"
            type="number"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("dailyIntakes")}
          />
        </FormField>

        <FormField
          label="¿POSEE ALGUNA PREFERENCIA O AVERSIÓN ALIMENTARIA?"
          htmlFor="foodPreferences"
          error={errors.foodPreferences?.message}
        >
          <textarea
            id="foodPreferences"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            rows={3}
            {...register("foodPreferences")}
          />
        </FormField>

        <FormField
          label="ESPECIFIQUE SU NIVEL DIARIO DE ACTIVIDAD FÍSICA EN UNA ESCALA DEL 1 AL 10, DONDE 1 INDICA ACTIVIDAD MÍNIMA Y 10 DENOTA ACTIVIDAD INTENSA."
          htmlFor="physicalActivityLevel"
          error={errors.physicalActivityLevel?.message}
        >
          <div className="flex flex-col">
            <input
              id="physicalActivityLevel"
              type="range"
              min="1"
              max="10"
              className="w-full"
              value={physicalActivityLevelValue}
              onChange={(e) => {
                setValue("physicalActivityLevel", e.target.value, { shouldValidate: true })
                setPhysicalActivityLevelValue(e.target.value)
              }}
            />
            <div className="flex justify-between text-xs mt-1">
              <span>1</span>
              <span>5</span>
              <span>10</span>
            </div>
            <div className="text-center mt-1">
              <span className="text-sm">Valor seleccionado: {physicalActivityLevelValue}</span>
            </div>
          </div>
          <input type="hidden" {...register("physicalActivityLevel")} />
        </FormField>
      </QuestionSection>

      <QuestionSection title="COMPUESTOS BIOACTIVOS">
        <FormField
          label="¿CONSUME ALCOHOL CON REGULARIDAD?"
          htmlFor="alcoholConsumption"
          error={errors.alcoholConsumption?.message}
        >
          <select
            id="alcoholConsumption"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("alcoholConsumption")}
          >
            <option value="">Seleccione una opción</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
            <option value="Occasionally">Ocasionalmente</option>
          </select>
        </FormField>

        <FormField label="¿ES USTED FUMADOR?" htmlFor="smoker" error={errors.smoker?.message}>
          <select
            id="smoker"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("smoker")}
          >
            <option value="">Seleccione una opción</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
            <option value="Occasionally">Ocasionalmente</option>
          </select>
        </FormField>

        <FormField
          label="¿CUÁNTA CAFEÍNA CONSUME?"
          htmlFor="caffeineConsumption"
          error={errors.caffeineConsumption?.message}
        >
          <input
            id="caffeineConsumption"
            type="text"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            placeholder="Ej: 2 tazas de café al día"
            {...register("caffeineConsumption")}
          />
        </FormField>

        <FormField
          label="¿CONSUME OTRAS SUSTANCIAS PSICOACTIVAS?"
          htmlFor="psychoactiveSubstances"
          error={errors.psychoactiveSubstances?.message}
        >
          <select
            id="psychoactiveSubstances"
            className="w-full p-2 bg-black border border-gray-600 rounded focus:border-white focus:outline-none"
            {...register("psychoactiveSubstances")}
          >
            <option value="">Seleccione una opción</option>
            <option value="Yes">Sí</option>
            <option value="No">No</option>
            <option value="PreferNotToAnswer">Prefiero no responder</option>
          </select>
        </FormField>
      </QuestionSection>

      {/* Submit button */}
      <div className="flex justify-center mt-10 mb-16">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-8 py-3 bg-white text-black font-bold rounded hover:bg-gray-200 transition-colors disabled:opacity-50"
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Enviando...
            </span>
          ) : (
            "Enviar Cuestionario"
          )}
        </button>
      </div>
    </form>
  )
}
