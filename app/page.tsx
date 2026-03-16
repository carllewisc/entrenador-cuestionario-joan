import Logo from "@/components/logo"
import QuestionnaireForm from "@/components/cuestionario-form"

export default function Home() {
  return (
    <main className="flex flex-col items-center bg-black text-white">
      <div className="w-full max-w-4xl px-4 py-8">
        {/* Header with repeating text */}
        <div className="w-full overflow-hidden text-xs text-gray-600 whitespace-nowrap">
          <div className="animate-marquee">
            {"CUESTIONARIO INICIAL • Joan Trainer • CUESTIONARIO INICIAL • Joan Trainer • ".repeat(10)}
          </div>
        </div>

        {/* Logo */}
        <div className="flex justify-center my-12">
          <Logo />
        </div>

        {/* Main Title */}
        <div className="text-center my-16">
          <h1 className="text-4xl font-serif mb-2">Cuestionario Inicial</h1>
        </div>

        {/* Introduction */}
        <div className="text-center mb-16 flex flex-col items-center">
          <div className="flex items-center mb-2">
            <div className="w-6 h-6 opacity-50">✧</div>
            <p className="mx-4">
              Estamos ansiosos por conocer más
              <br />
              acerca de usted.
            </p>
            <div className="w-6 h-6 opacity-50">✧</div>
          </div>

          <div className="text-xs text-center max-w-2xl mt-8 leading-relaxed">
            <p className="mb-4">
              NECESITAMOS QUE ES DE RESPUESTA Y NUESTRA META ES RECOPILAR TODOS LOS DATOS RELEVANTES PARA CREAR UN PLAN
              DE ENTRENAMIENTO Y NUTRICIÓN PERSONALIZADO PARA USTED. CUANTO MÁS DETALLADA SEA LA INFORMACIÓN QUE NOS
              PROPORCIONE, MÁS ESPECÍFICO Y EFECTIVO SERÁ EL PLAN QUE DESARROLLEMOS PARA USTED.
            </p>
            <p className="mb-4">
              TENGA EN CUENTA QUE TODA LA INFORMACIÓN PROPORCIONADA ES CONFIDENCIAL Y SOLO SE UTILIZARÁ CON EL FIN DE
              DESARROLLAR SU PROGRAMA PERSONALIZADO Y BRINDARLE EL MEJOR SERVICIO POSIBLE.
            </p>
            <p>
              ESTAMOS LISTOS PARA PROPORCIONARLE LA ORIENTACIÓN Y EL APOYO QUE NECESITA PARA ALCANZAR SUS METAS DE SALUD
              Y ESTADO FÍSICO.
            </p>
          </div>
        </div>

        {/* Interactive Form */}
        <QuestionnaireForm />

        {/* Footer */}
        <div className="text-center mt-20 mb-10 flex flex-col items-center">
          <div className="w-6 h-6 opacity-50 mb-4">✧</div>
          <h3 className="text-2xl font-serif mb-1">Agradecemos su</h3>
          <h3 className="text-2xl font-serif mb-1">preferencia por</h3>
          <h3 className="text-2xl font-serif mb-6">JOAN TRAINER.</h3>

          <p className="text-xs max-w-2xl text-center leading-relaxed">
            NOS COMPLACE DARLE UNA CORDIAL BIENVENIDA, CON EL PROPÓSITO DE BRINDARLE LA MEJOR CONSULTA Y ATENCIÓN A SUS
            METAS ESPECÍFICAS PARA LOGRAR LOS RESULTADOS DESEADOS. ESTAMOS COMPROMETIDOS A GUIARLO EN CADA PASO DEL
            CAMINO.
          </p>
          <p className="text-xs max-w-2xl text-center mt-4 leading-relaxed">
            UNIDOS, TRABAJAREMOS PARA ALCANZAR LAS METAS MÁS ELEVADAS. SU ÉXITO ES NUESTRO ÉXITO.
          </p>
          <div className="w-6 h-6 opacity-50 mt-4">✧</div>
        </div>
      </div>
    </main>
  )
}
