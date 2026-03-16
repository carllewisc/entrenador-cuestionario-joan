"use server"

import type { FormValues } from "@/lib/form-schema"

export async function submitForm(values: FormValues) {
  try {
    // Enviar los datos a la API
    const response = await fetch("https://dashboard.joan-trainer.com/api/questionnaires", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })

    // Verificar si la respuesta es exitosa
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      console.error("Error al enviar el formulario:", errorData || response.statusText)

      return {
        success: false,
        message: "Ha ocurrido un error al enviar el formulario. Por favor, inténtalo de nuevo más tarde.",
      }
    }

    // Procesar la respuesta exitosa
    const data = await response.json()
    console.log("Formulario enviado exitosamente:", data)

    return {
      success: true,
      message: "¡Formulario enviado correctamente! Gracias por tu información.",
      data,
    }
  } catch (error) {
    // Capturar cualquier error en la solicitud
    console.error("Error en la solicitud:", error)

    return {
      success: false,
      message: "No se pudo conectar con el servidor. Por favor, verifica tu conexión a internet e inténtalo de nuevo.",
    }
  }
}
