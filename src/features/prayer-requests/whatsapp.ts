import type { PrayerRequest } from "./types";

export function normalizePhoneForWhatsApp(phone: string): string | null {
  const digits = phone.replace(/\D/g, "");
  if (!digits) {
    return null;
  }
  if (digits.length === 9 && /^[67]/.test(digits)) {
    return `34${digits}`;
  }
  if (digits.startsWith("34") && digits.length >= 11) {
    return digits;
  }
  if (digits.length >= 10) {
    return digits;
  }
  return digits.length >= 8 ? digits : null;
}

export function buildPrayerRequestWhatsAppUrl(request: PrayerRequest): string | null {
  const waPhone = normalizePhoneForWhatsApp(request.phone);
  if (!waPhone) {
    return null;
  }

  const greetingName = request.firstName.trim() || "hermano/a";
  const text = [
    `Hola ${greetingName}, te escribimos desde la Escuela Bíblica IERE por tu pedido de oración.`,
    request.reason ? `Motivo compartido: ${request.reason}` : "",
    "Queremos acompañarte y orar contigo. ¿Podemos hablar un momento?",
  ]
    .filter(Boolean)
    .join("\n\n");

  return `https://wa.me/${waPhone}?text=${encodeURIComponent(text)}`;
}
