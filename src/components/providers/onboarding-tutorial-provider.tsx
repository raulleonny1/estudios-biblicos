"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import { useAuth } from "@/features/auth/auth-context";

type TutorialStep = {
  id: string;
  route: string;
  selector: string;
  title: string;
  description: string;
  requireTargetClick: boolean;
};

const STORAGE_KEY = "onboarding_tutorial_v2";

type TutorialStorage = {
  completedIngresses: number;
};

const MAX_TUTORIAL_INGRESSES = 4;

function readTutorialStorage(): TutorialStorage {
  if (typeof window === "undefined") {
    return { completedIngresses: 0 };
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { completedIngresses: 0 };
    }
    const parsed = JSON.parse(raw) as Partial<TutorialStorage>;
    const n = Number(parsed.completedIngresses);
    return {
      completedIngresses: Number.isFinite(n) ? Math.max(0, Math.min(MAX_TUTORIAL_INGRESSES, n)) : 0,
    };
  } catch {
    return { completedIngresses: 0 };
  }
}

function recordTutorialIngressEnded() {
  const { completedIngresses } = readTutorialStorage();
  const next = Math.min(MAX_TUTORIAL_INGRESSES, completedIngresses + 1);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ completedIngresses: next }));
}

const steps: TutorialStep[] = [
  {
    id: "open-first-study",
    route: "/dashboard",
    selector: '[data-tutorial="open-first-study"]',
    title: "Paso 1: Abre tu primer estudio",
    description: "Pulsa aqui para entrar al primer estudio y comenzar tu formacion.",
    requireTargetClick: true,
  },
  {
    id: "open-first-lesson",
    route: "/estudios/estudio-basico-biblia",
    selector: '[data-tutorial="open-first-lesson"]',
    title: "Paso 2: Entra en la leccion 1",
    description: "Desde aqui comienzas la primera leccion guiada.",
    requireTargetClick: true,
  },
  {
    id: "grading-explanation",
    route: "/lecciones/leccion-01",
    selector: '[data-tutorial="grading-explanation"]',
    title: "Paso 3: Asi se califica tu leccion",
    description:
      "Primero respondes el quiz. Luego completas 3 respuestas abiertas. Finalmente envias a revision y el admin aprueba/rechaza.",
    requireTargetClick: false,
  },
  {
    id: "answer-first-question",
    route: "/lecciones/leccion-01",
    selector: '[data-tutorial="answer-first-question"]',
    title: "Paso 4: Responde tu primera pregunta",
    description: "Haz clic en una opcion para registrar tu primera respuesta.",
    requireTargetClick: true,
  },
  {
    id: "open-answers",
    route: "/lecciones/leccion-01",
    selector: '[data-tutorial="open-answers"]',
    title: "Paso 5: Completa respuestas abiertas",
    description:
      "Estas 3 respuestas son revisadas por administracion. Deben estar completas para poder enviar.",
    requireTargetClick: false,
  },
  {
    id: "submit-first-lesson",
    route: "/lecciones/leccion-01",
    selector: '[data-tutorial="submit-first-lesson"]',
    title: "Paso 6: Envia la leccion a revision",
    description: "Cuando completes todo, envia la leccion para revision administrativa.",
    requireTargetClick: false,
  },
];

export function OnboardingTutorialProvider() {
  const pathname = usePathname();
  const { authUser, profile, loading } = useAuth();
  const hasRecordedIngressThisRunRef = useRef(false);
  const [tutorialDismissed, setTutorialDismissed] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return readTutorialStorage().completedIngresses >= MAX_TUTORIAL_INGRESSES;
  });
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [targetRect, setTargetRect] = useState<DOMRect | null>(null);
  const [isEndingTutorialRun, setIsEndingTutorialRun] = useState(false);
  const tutorialEnabled = Boolean(
    !loading && authUser && profile?.role === "student" && !tutorialDismissed
  );

  const activeStep = useMemo(
    () => (tutorialEnabled ? steps[activeStepIndex] ?? null : null),
    [activeStepIndex, tutorialEnabled]
  );
  const totalSteps = steps.length;

  const finishTutorialRun = useCallback(() => {
    setIsEndingTutorialRun(true);
    if (hasRecordedIngressThisRunRef.current) {
      setTutorialDismissed(true);
      return;
    }
    hasRecordedIngressThisRunRef.current = true;
    recordTutorialIngressEnded();
    setTutorialDismissed(true);
  }, []);

  useEffect(() => {
    if (!activeStep) {
      return;
    }

    const resolveTarget = () => {
      const target = document.querySelector(activeStep.selector) as HTMLElement | null;
      if (!target || pathname !== activeStep.route) {
        setTargetRect(null);
        return;
      }
      setTargetRect(target.getBoundingClientRect());
    };

    resolveTarget();
    const interval = window.setInterval(resolveTarget, 250);
    window.addEventListener("resize", resolveTarget);
    window.addEventListener("scroll", resolveTarget, true);

    return () => {
      window.clearInterval(interval);
      window.removeEventListener("resize", resolveTarget);
      window.removeEventListener("scroll", resolveTarget, true);
    };
  }, [activeStep, pathname]);

  useEffect(() => {
    if (!activeStep) {
      return;
    }

    const onClickCapture = (event: MouseEvent) => {
      if (pathname !== activeStep.route) {
        return;
      }

      const clicked = event.target as Element | null;
      if (!clicked) {
        return;
      }

      const onTarget = Boolean(clicked.closest(activeStep.selector));

      if (activeStep.requireTargetClick) {
        if (!onTarget) return;

        window.setTimeout(() => {
          setActiveStepIndex((prev) => {
            const next = prev + 1;
            if (next >= steps.length) {
              queueMicrotask(() => {
                finishTutorialRun();
              });
              return 0;
            }
            return next;
          });
        }, 120);
      }
    };

    document.addEventListener("click", onClickCapture, true);
    return () => {
      document.removeEventListener("click", onClickCapture, true);
    };
  }, [activeStep, pathname, finishTutorialRun]);

  const skipTutorial = () => {
    finishTutorialRun();
  };

  const goNext = () => {
    setActiveStepIndex((prev) => {
      const next = prev + 1;
      if (next >= steps.length) {
        queueMicrotask(() => {
          finishTutorialRun();
        });
        return 0;
      }
      return next;
    });
  };

  if (!activeStep) {
    return null;
  }

  const isCorrectRoute = pathname === activeStep.route;
  const ingressNumber = readTutorialStorage().completedIngresses + 1;

  return (
    <>
      {targetRect && isCorrectRoute ? (
        <>
          <div
            className="pointer-events-none fixed z-[100] rounded-xl border-2 border-indigo-500 bg-indigo-50/50 shadow-lg shadow-indigo-200 transition-all"
            style={{
              top: targetRect.top - 6,
              left: targetRect.left - 6,
              width: targetRect.width + 12,
              height: targetRect.height + 12,
            }}
          />
          <div
            className="pointer-events-none fixed z-[101] text-2xl"
            style={{
              top: Math.max(8, targetRect.top - 34),
              left: Math.max(8, targetRect.left - 8),
            }}
          >
            👆
          </div>
        </>
      ) : null}

      <div className="fixed bottom-4 right-4 z-[110] w-[22rem] rounded-xl border border-indigo-200 bg-white p-4 shadow-xl">
        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
          Tutorial guiado
        </p>
        <p className="mt-1 text-xs font-medium text-zinc-500">
          Paso {activeStepIndex + 1} de {totalSteps} · Entrada {ingressNumber} de{" "}
          {MAX_TUTORIAL_INGRESSES}
        </p>
        <h3 className="mt-1 text-base font-bold text-zinc-900">{activeStep.title}</h3>
        <p className="mt-2 text-sm text-zinc-700">
          {isCorrectRoute
            ? activeStep.description
            : "Navega a la pantalla indicada para continuar el paso actual."}
        </p>
        <div className="mt-4 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={skipTutorial}
            disabled={isEndingTutorialRun}
            className="rounded-md border border-zinc-300 px-3 py-1.5 text-xs font-semibold text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Saltar tutorial
          </button>
          {!activeStep.requireTargetClick ? (
            <button
              type="button"
              onClick={goNext}
              disabled={isEndingTutorialRun}
              className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Siguiente
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}
