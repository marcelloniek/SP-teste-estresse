"use client";

import { useState } from 'react';

const preguntas = [
  "Me siento abrumado(a) por las responsabilidades diarias, percibiendo que estoy llegando a mi límite.",
  "Tengo dificultades para relajarme o desconectarme después de un día intenso de trabajo.",
  "Me siento constantemente cansado(a), incluso después de períodos de descanso o sueño adecuado.",
  "He notado cambios en mi estado de ánimo, como irritabilidad o impaciencia frecuentes, incluso en situaciones triviales.",
  "Percibo una disminución en mi productividad, concentración o motivación en tareas cotidianas.",
  "Recientemente he pensado o sentido ganas de abandonar todo repentinamente debido a la presión o al estrés intenso que estoy viviendo.", // FLAG
  "He experimentado molestias físicas como dolores musculares, dolores de cabeza o problemas digestivos sin causa médica aparente.",
  "Mi vida social, familiar o afectiva se está viendo perjudicada por el nivel actual de mi estrés.",
  "Suelo sentir tensión o ansiedad al pensar en las actividades o tareas pendientes que aún no he logrado realizar.",
  "He notado dificultades para tomar decisiones sencillas, sintiéndome frecuentemente indeciso(a) o confundido(a)."
];

export default function TestEstres() {
  const [respuestas, setRespuestas] = useState(Array(10).fill(0));
  const [resultado, setResultado] = useState(null);
  const [indiceActual, setIndiceActual] = useState(0);

  const registrarRespuesta = (valor) => {
    const nuevasRespuestas = [...respuestas];
    nuevasRespuestas[indiceActual] = valor;
    setRespuestas(nuevasRespuestas);

    if (indiceActual < preguntas.length - 1) {
      setIndiceActual(indiceActual + 1);
    } else {
      calcularResultado(nuevasRespuestas);
    }
  };

  const calcularResultado = (respuestas) => {
    if (respuestas[5] >= 3) { // FLAG
      setResultado("ROJO");
    } else {
      const suma = respuestas.reduce((a, b) => a + b, 0);
      if (suma <= 20) setResultado("VERDE");
      else if (suma <= 35) setResultado("AMARILLO");
      else setResultado("ROJO");
    }
  };

  const reiniciarTest = () => {
    setRespuestas(Array(10).fill(0));
    setResultado(null);
    setIndiceActual(0);
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow-md">
      {!resultado ? (
        <>
          <h2 className="text-xl font-semibold mb-4">Test de Estrés</h2>
          <p className="mb-4">{preguntas[indiceActual]}</p>
          <div className="flex justify-between">
            {[1, 2, 3, 4, 5].map((num) => (
              <button
                key={num}
                className="px-4 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                onClick={() => registrarRespuesta(num)}
              >
                {num}
              </button>
            ))}
          </div>
          <p className="mt-4 text-sm">Pregunta {indiceActual + 1} de {preguntas.length}</p>
        </>
      ) : (
        <>
          <h2 className="text-xl font-semibold mb-4">Resultado: {resultado}</h2>
          {resultado === "VERDE" && <p>Manejas muy bien este tema y tienes una buena estabilidad emocional. Podrás ayudar significativamente a otras personas que necesitan apoyo.</p>}
          {resultado === "AMARILLO" && <p>Hay signos evidentes de dificultades emocionales que necesitan atención y que, con determinación y ayuda, podrán superarse.</p>}
          {resultado === "ROJO" && <p>Tus dificultades emocionales relacionadas con este tema requieren ayuda profesional inmediata. Busca rápidamente la ayuda de un médico o psicólogo.</p>}
          <button
            className="mt-4 px-4 py-2 bg-green-500 dark:bg-green-600 text-white rounded hover:bg-green-600 dark:hover:bg-green-700"
            onClick={reiniciarTest}
          >
            Rehacer el test
          </button>
        </>
      )}
    </div>
  );
}
