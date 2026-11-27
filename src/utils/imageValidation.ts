const MAX_IMAGE_BYTES = 10 * 1024 * 1024; // 10 MB
const MAX_SOURCE_DIMENSION = 12000;
const MAX_OUTPUT_DIMENSION = 2048;

const ALLOWED_RASTER_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);

export type ImageValidationResult =
  | { ok: true; objectUrl: string }
  | { ok: false; error: string };

function detectRasterMimeFromMagicBytes(bytes: Uint8Array): string | null {
  if (bytes.length < 12) return null;

  // JPEG: FF D8 FF
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) {
    return 'image/jpeg';
  }

  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47 &&
    bytes[4] === 0x0d &&
    bytes[5] === 0x0a &&
    bytes[6] === 0x1a &&
    bytes[7] === 0x0a
  ) {
    return 'image/png';
  }

  // WebP: "RIFF" (0..3) + "WEBP" (8..11)
  if (
    bytes[0] === 0x52 &&
    bytes[1] === 0x49 &&
    bytes[2] === 0x46 &&
    bytes[3] === 0x46 &&
    bytes[8] === 0x57 &&
    bytes[9] === 0x45 &&
    bytes[10] === 0x42 &&
    bytes[11] === 0x50
  ) {
    return 'image/webp';
  }

  return null;
}

function loadHtmlImage(srcUrl: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Falha ao decodificar imagem.'));
    img.src = srcUrl;
  });
}

function canvasToCleanBlob(canvas: HTMLCanvasElement, mime: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) {
          resolve(blob);
          return;
        }
        canvas.toBlob(
          (fallbackBlob) => {
            if (fallbackBlob) resolve(fallbackBlob);
            else reject(new Error('Não foi possível processar a prévia local.'));
          },
          'image/jpeg',
          quality
        );
      },
      mime,
      quality
    );
  });
}

/**
 * Valida tamanho, MIME e assinatura binária (magic bytes), bloqueando SVG/XML e arquivos poliglotas,
 * e re-renderiza em <canvas> até 2048px para remover 100% dos metadados EXIF/GPS da memória RAM.
 */
export async function validateAndSanitizeLocalImage(file: File): Promise<ImageValidationResult> {
  if (file.size <= 0) {
    return { ok: false, error: 'O arquivo selecionado está vazio.' };
  }

  if (file.size > MAX_IMAGE_BYTES) {
    return {
      ok: false,
      error: 'Imagem acima do limite de 10 MB. Escolha uma foto JPEG, PNG ou WebP menor.',
    };
  }

  if (file.type && !ALLOWED_RASTER_MIMES.has(file.type)) {
    return {
      ok: false,
      error: 'Formato não permitido. Use apenas fotos em JPEG, PNG ou WebP (SVG não é aceito).',
    };
  }

  let detectedMime: string | null = null;
  try {
    const headerBuffer = await file.slice(0, 12).arrayBuffer();
    detectedMime = detectRasterMimeFromMagicBytes(new Uint8Array(headerBuffer));
  } catch {
    return { ok: false, error: 'Não foi possível ler o cabeçalho do arquivo selecionado.' };
  }

  if (!detectedMime || !ALLOWED_RASTER_MIMES.has(detectedMime)) {
    return {
      ok: false,
      error: 'Assinatura de arquivo inválida. Envie uma imagem real em formato JPEG, PNG ou WebP.',
    };
  }

  const tempSourceUrl = URL.createObjectURL(file);
  try {
    const img = await loadHtmlImage(tempSourceUrl);
    const srcWidth = img.naturalWidth;
    const srcHeight = img.naturalHeight;

    if (
      srcWidth <= 0 ||
      srcHeight <= 0 ||
      srcWidth > MAX_SOURCE_DIMENSION ||
      srcHeight > MAX_SOURCE_DIMENSION
    ) {
      return {
        ok: false,
        error: 'Dimensões da imagem fora do limite seguro suportado pelo comparador.',
      };
    }

    const scale = Math.min(1, MAX_OUTPUT_DIMENSION / Math.max(srcWidth, srcHeight));
    const targetWidth = Math.max(1, Math.round(srcWidth * scale));
    const targetHeight = Math.max(1, Math.round(srcHeight * scale));

    const canvas = document.createElement('canvas');
    canvas.width = targetWidth;
    canvas.height = targetHeight;

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return { ok: false, error: 'Seu navegador não pôde preparar o quadro de prévia local.' };
    }

    ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
    const outputMime = detectedMime === 'image/png' ? 'image/png' : 'image/webp';
    const cleanBlob = await canvasToCleanBlob(canvas, outputMime, 0.92);

    canvas.width = 0;
    canvas.height = 0;

    return { ok: true, objectUrl: URL.createObjectURL(cleanBlob) };
  } catch {
    return {
      ok: false,
      error: 'Não foi possível decodificar a foto. Verifique se o arquivo não está corrompido.',
    };
  } finally {
    URL.revokeObjectURL(tempSourceUrl);
  }
}
