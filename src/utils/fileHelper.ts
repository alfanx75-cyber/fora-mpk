import { Attachment } from '../types';

/**
 * Format bytes into human readable string (KB / MB)
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

/**
 * Check whether an attachment is an image based on type, dataUrl, or file extension
 */
export function isImageAttachment(attachment: Attachment): boolean {
  if (attachment.type?.toLowerCase().includes('image')) return true;
  if (attachment.dataUrl?.startsWith('data:image')) return true;
  if (attachment.previewUrl?.match(/\.(jpe?g|png|gif|webp|svg)(\?.*)?$/i)) return true;
  if (attachment.name?.match(/\.(jpe?g|png|gif|webp|svg)$/i)) return true;
  return false;
}

/**
 * Compress and convert an image file to Base64 Data URL using HTML5 Canvas
 * Limits max dimensions to 1280px and quality to 0.8 to fit comfortably in Firestore
 */
export function compressImageFile(file: File, maxWidth = 1280, maxHeight = 1280, quality = 0.82): Promise<{ dataUrl: string; sizeStr: string }> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error('Gagal membaca file gambar'));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error('Gagal memproses format gambar'));
      img.onload = () => {
        let width = img.width;
        let height = img.height;

        // Calculate scaling
        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.round(width * ratio);
          height = Math.round(height * ratio);
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          // Fallback to direct dataUrl
          const dataUrl = reader.result as string;
          resolve({ dataUrl, sizeStr: formatFileSize(file.size) });
          return;
        }

        // Draw image
        ctx.drawImage(img, 0, 0, width, height);

        // Determine mime type: preserve PNG transparency if needed, else JPEG for efficiency
        const isPng = file.type === 'image/png' || file.name.toLowerCase().endsWith('.png');
        const outputMime = isPng ? 'image/png' : 'image/jpeg';
        const dataUrl = canvas.toDataURL(outputMime, outputMime === 'image/jpeg' ? quality : undefined);

        // Approximate size of base64 string in bytes
        const approximateBytes = Math.round((dataUrl.length * 3) / 4);
        resolve({
          dataUrl,
          sizeStr: formatFileSize(approximateBytes),
        });
      };
      img.src = reader.result as string;
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Process any uploaded file (image, PDF, doc) into a full Attachment object with Data URL
 */
export async function fileToAttachment(file: File): Promise<Attachment> {
  const isImg = file.type.startsWith('image/') || /\.(jpe?g|png|gif|webp|svg)$/i.test(file.name);

  if (isImg) {
    try {
      const { dataUrl, sizeStr } = await compressImageFile(file);
      return {
        name: file.name,
        size: sizeStr,
        type: 'image',
        dataUrl,
        previewUrl: dataUrl,
      };
    } catch {
      // Fallback: direct read as data URL
      return new Promise(resolve => {
        const reader = new FileReader();
        reader.onload = () => {
          const dataUrl = reader.result as string;
          resolve({
            name: file.name,
            size: formatFileSize(file.size),
            type: 'image',
            dataUrl,
            previewUrl: dataUrl,
          });
        };
        reader.onerror = () => {
          resolve({
            name: file.name,
            size: formatFileSize(file.size),
            type: 'image',
          });
        };
        reader.readAsDataURL(file);
      });
    }
  }

  // Non-image document (PDF, doc, txt, etc.)
  return new Promise(resolve => {
    // If file is very large (> 2MB for docs), we avoid loading into dataUrl to preserve Firestore quota
    if (file.size > 2 * 1024 * 1024) {
      resolve({
        name: file.name,
        size: formatFileSize(file.size),
        type: 'doc',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result as string;
      resolve({
        name: file.name,
        size: formatFileSize(file.size),
        type: 'doc',
        dataUrl,
      });
    };
    reader.onerror = () => {
      resolve({
        name: file.name,
        size: formatFileSize(file.size),
        type: 'doc',
      });
    };
    reader.readAsDataURL(file);
  });
}

/**
 * Triggers browser download for an attachment
 */
export function downloadAttachment(attachment: Attachment) {
  const url = attachment.dataUrl || attachment.previewUrl;
  if (!url) {
    // If no dataUrl is available, generate an informational text file explaining the attachment record
    const note = `[LAMPIRAN FORA MPK - SMAN 1 KEBUMEN]\nNama File: ${attachment.name}\nUkuran: ${attachment.size || 'Tidak diketahui'}\nTipe: ${attachment.type || 'Dokumen'}\n\nLampiran ini terdaftar dalam dokumen aspirasi resmi FORA.`;
    const blob = new Blob([note], { type: 'text/plain;charset=utf-8' });
    const blobUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = `INFO-${attachment.name}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(blobUrl);
    return;
  }

  // Trigger download with actual data
  const link = document.createElement('a');
  link.href = url;
  link.download = attachment.name || 'lampiran-fora';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
