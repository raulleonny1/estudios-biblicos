import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 antialiased">
      <main className="mx-auto w-full max-w-4xl px-4 py-8 md:px-6 md:py-10">
        <Link href="/" className="text-sm text-slate-600 transition hover:text-slate-900">
          Volver al inicio
        </Link>

        <h1 className="mt-4 text-3xl font-bold tracking-tight">Política de privacidad</h1>
        <p className="mt-2 text-sm text-slate-600">
          Última actualización: 6 de mayo de 2026
        </p>

        <section className="mt-6 space-y-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <article>
            <h2 className="text-lg font-semibold">1. Datos que recopilamos</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Podemos recopilar datos de registro como nombre, correo electrónico, teléfono y
              datos de uso de la plataforma para gestionar el acceso, el progreso de lecciones y
              la mejora del servicio.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold">2. Finalidad del tratamiento</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Usamos los datos para autenticar usuarios, mostrar progreso académico, administrar
              contenidos, ofrecer soporte y cumplir tareas pastorales relacionadas con la Escuela
              Bíblica.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold">3. Almacenamiento y seguridad</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Los datos se almacenan en servicios en la nube con medidas de seguridad razonables.
              Aplicamos controles de acceso por rol para limitar el uso no autorizado.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold">4. Compartición de datos</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              No vendemos datos personales. Solo compartimos información con proveedores técnicos
              necesarios para operar la plataforma (por ejemplo, infraestructura y autenticación).
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold">5. Derechos del usuario</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Puedes solicitar acceso, rectificación o eliminación de tu cuenta y datos personales
              escribiendo al canal de contacto publicado por la plataforma.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold">6. Contacto</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Responsable del tratamiento: Parroquia &quot;El Buen Pastor&quot; (cliente titular
              de la plataforma). Encargado técnico del tratamiento: LeonSoft (empresa externa de
              desarrollo y mantenimiento). Correo de contacto para privacidad y datos personales:
              rauleonec@gmail.com.
            </p>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Ubicación y jurisdicción de referencia: Móstoles, España.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold">7. Base legal (RGPD)</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Tratamos los datos personales con base en: (a) ejecución del servicio solicitado por
              el usuario (gestión de cuenta, acceso y progreso en la Escuela Bíblica), (b)
              consentimiento del usuario cuando corresponda, y (c) interés legítimo para seguridad,
              mantenimiento y mejora de la plataforma.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold">8. Conservación de datos</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              Los datos se conservan durante el tiempo necesario para prestar el servicio y cumplir
              obligaciones legales. Cuando ya no sean necesarios, se eliminan o anonimizan de forma
              segura.
            </p>
          </article>

          <article>
            <h2 className="text-lg font-semibold">9. Derechos y reclamaciones</h2>
            <p className="mt-2 text-sm leading-6 text-slate-700">
              El usuario puede ejercer sus derechos de acceso, rectificación, supresión, oposición,
              limitación y portabilidad escribiendo a rauleonec@gmail.com. Si considera que sus
              derechos no han sido atendidos correctamente, puede presentar reclamación ante la
              Agencia Española de Protección de Datos (AEPD): https://www.aepd.es/.
            </p>
          </article>
        </section>
      </main>
    </div>
  );
}
