import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode';
import {
  X,
  QrCode,
  Download,
  Copy,
  Check,
  Share2,
  ExternalLink,
  Printer
} from 'lucide-react';
import { MPK_LOGO, SCHOOL_NAME, FORA_DOMAIN } from '../data/mockData';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl?: string;
  title?: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  targetUrl,
  title = 'QR Code Akses Langsung FORA MPK'
}) => {
  const [dataUrl, setDataUrl] = useState<string>('');
  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [format, setFormat] = useState<'png' | 'svg'>('png');
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Official production domain on Vercel as configured by user
  const currentUrl = targetUrl || FORA_DOMAIN;

  useEffect(() => {
    if (!isOpen) return;

    let isMounted = true;

    // Generate QR Code locally using pure JavaScript canvas
    // No external API, no tracking, completely client-side!
    QRCode.toDataURL(
      currentUrl,
      {
        width: 600,
        margin: 2,
        errorCorrectionLevel: 'H', // High error correction so school logo in center or bad scan still works
        color: {
          dark: '#111111',
          light: '#FFFFFF'
        }
      },
      (err, url) => {
        if (!err && url && isMounted) {
          setDataUrl(url);
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, [isOpen, currentUrl]);

  if (!isOpen) return null;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleDownloadImage = () => {
    if (!dataUrl) return;

    // Create a high resolution styled printable card with canvas
    const downloadCanvas = document.createElement('canvas');
    downloadCanvas.width = 1000;
    downloadCanvas.height = 1200;
    const ctx = downloadCanvas.getContext('2d');
    if (!ctx) return;

    // Background Cream
    ctx.fillStyle = '#FCFBF5';
    ctx.fillRect(0, 0, 1000, 1200);

    // Thick border and shadow
    ctx.lineWidth = 12;
    ctx.strokeStyle = '#111111';
    ctx.strokeRect(30, 30, 940, 1140);

    // Header badge
    ctx.fillStyle = '#FDE029';
    ctx.fillRect(80, 70, 840, 90);
    ctx.strokeRect(80, 70, 840, 90);

    ctx.fillStyle = '#111111';
    ctx.font = 'bold 36px "Space Grotesk", sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('FORA — FORUM ASPIRASI MPK', 500, 130);

    // Subtitle
    ctx.font = 'bold 24px "Plus Jakarta Sans", sans-serif';
    ctx.fillText(SCHOOL_NAME.toUpperCase(), 500, 210);

    ctx.font = 'normal 20px "Plus Jakarta Sans", sans-serif';
    ctx.fillStyle = '#5A3F47';
    ctx.fillText('Scan QR code dengan kamera HP Anda untuk langsung membuka web', 500, 250);

    // Draw QR image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      // White box for QR code with border
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(200, 300, 600, 600);
      ctx.lineWidth = 8;
      ctx.strokeStyle = '#111111';
      ctx.strokeRect(200, 300, 600, 600);

      // Draw QR
      ctx.drawImage(img, 220, 320, 560, 560);

      // Draw official MPK logo in center badge
      const logoBadgeSize = 100;
      const logoX = 500 - logoBadgeSize / 2;
      const logoY = 600 - logoBadgeSize / 2;
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(logoX, logoY, logoBadgeSize, logoBadgeSize);
      ctx.lineWidth = 5;
      ctx.strokeStyle = '#111111';
      ctx.strokeRect(logoX, logoY, logoBadgeSize, logoBadgeSize);

      const finishDownload = () => {
        // Footer instructions
        ctx.fillStyle = '#E01376';
        ctx.font = 'bold 30px "Space Grotesk", sans-serif';
        ctx.fillText('SUARAMU. DIDENGAR.', 500, 970);

        ctx.fillStyle = '#111111';
        ctx.font = 'bold 22px "Plus Jakarta Sans", sans-serif';
        ctx.fillText(currentUrl, 500, 1020);

        ctx.font = 'normal 18px "Plus Jakarta Sans", sans-serif';
        ctx.fillStyle = '#5A3F47';
        ctx.fillText('Kirim aspirasi kapan saja secara privat & anonim kepada MPK', 500, 1070);

        // Trigger download
        const link = document.createElement('a');
        link.download = `QR-Code-FORA-MPK-${new Date().getFullYear()}.png`;
        link.href = downloadCanvas.toDataURL('image/png');
        link.click();

        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 2500);
      };

      const mpkImg = new Image();
      mpkImg.crossOrigin = 'anonymous';
      mpkImg.onload = () => {
        ctx.drawImage(mpkImg, logoX + 8, logoY + 8, logoBadgeSize - 16, logoBadgeSize - 16);
        finishDownload();
      };
      mpkImg.onerror = () => {
        ctx.fillStyle = '#111111';
        ctx.font = 'bold 28px "Space Grotesk", sans-serif';
        ctx.fillText('MPK', 500, 608);
        finishDownload();
      };
      mpkImg.src = MPK_LOGO;
    };
    img.src = dataUrl;
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Print QR Code - FORA MPK</title>
          <style>
            @page { size: A4 portrait; margin: 1.5cm; }
            body {
              font-family: 'Segoe UI', system-ui, -apple-system, sans-serif;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              min-height: 90vh;
              margin: 0;
              color: #111;
              text-align: center;
            }
            .card {
              border: 4px solid #111;
              border-radius: 20px;
              padding: 40px;
              max-width: 500px;
              box-shadow: 8px 8px 0px #111;
              background: #fff;
            }
            .badge {
              display: inline-block;
              background: #fde029;
              border: 2px solid #111;
              padding: 6px 16px;
              border-radius: 999px;
              font-weight: 900;
              font-size: 14px;
              text-transform: uppercase;
              margin-bottom: 12px;
            }
            h1 {
              font-size: 32px;
              font-weight: 900;
              margin: 0 0 6px 0;
              letter-spacing: -1px;
            }
            h2 {
              font-size: 14px;
              font-weight: 700;
              color: #555;
              margin: 0 0 24px 0;
              text-transform: uppercase;
            }
            .qr-wrapper {
              border: 3px solid #111;
              border-radius: 16px;
              padding: 16px;
              display: inline-block;
              background: #fff;
              margin-bottom: 20px;
            }
            .qr-img {
              width: 280px;
              height: 280px;
              display: block;
            }
            .slogan {
              color: #e01376;
              font-weight: 900;
              font-size: 20px;
              margin-bottom: 8px;
            }
            .url {
              font-size: 14px;
              font-weight: bold;
              background: #f0f0f0;
              padding: 6px 14px;
              border-radius: 8px;
              display: inline-block;
              word-break: break-all;
            }
            p.tip {
              font-size: 12px;
              color: #666;
              margin-top: 14px;
            }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="badge">Official QR Code</div>
            <h1>FORA MPK</h1>
            <h2>${SCHOOL_NAME}</h2>
            <div class="qr-wrapper" style="position: relative; display: inline-block;">
              <img src="${dataUrl}" class="qr-img" alt="QR Code" />
              <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 54px; height: 54px; background: #ffffff; border: 2.5px solid #111111; border-radius: 12px; display: flex; align-items: center; justify-content: center; padding: 5px; box-shadow: 2px 2px 0px #111;">
                <img src="${MPK_LOGO}" style="width: 100%; height: 100%; object-fit: contain;" alt="Logo MPK" />
              </div>
            </div>
            <div class="slogan">SUARAMU. DIDENGAR.</div>
            <div class="url">${currentUrl}</div>
            <p class="tip">Scan dengan kamera smartphone Anda untuk langsung menyampaikan aspirasi atau mengecek status tindak lanjut.</p>
          </div>
          <script>
            window.onload = function() {
              window.print();
            };
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div
      className="fixed inset-0 z-[110] flex items-center justify-center p-3 sm:p-5 md:p-8 bg-black/75 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-[#FCFBF5] border-[3px] sm:border-[4px] border-[#111111] rounded-2xl sm:rounded-3xl shadow-[8px_8px_0px_#111111] sm:shadow-[12px_12px_0px_#111111] overflow-hidden flex flex-col max-h-[95vh]"
        onClick={e => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-4 sm:px-6 py-3.5 sm:py-4 bg-[#fde029] border-b-[3px] border-[#111111]">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center shadow-[2px_2px_0px_#111111]">
              <QrCode className="w-5 h-5 text-[#111111]" />
            </div>
            <div>
              <h3 className="font-['Space_Grotesk'] text-base sm:text-lg font-black text-[#111111] leading-none">
                QR Code Langsung
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 bg-[#FFFFFF] hover:bg-[#ba1a1a] hover:text-white border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] transition-colors cursor-pointer text-[#111111]"
            title="Tutup Modal"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 sm:space-y-5">
          {/* QR Code Presentation Box */}
          <div className="flex flex-col items-center justify-center bg-[#FFFFFF] border-[3px] border-[#111111] rounded-2xl p-5 sm:p-6 shadow-[4px_4px_0px_#111111] relative">
            {/* Corner Decorative Dots */}
            <div className="absolute top-2.5 left-2.5 w-2 h-2 rounded-full bg-[#111111]" />
            <div className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#111111]" />
            <div className="absolute bottom-2.5 left-2.5 w-2 h-2 rounded-full bg-[#111111]" />
            <div className="absolute bottom-2.5 right-2.5 w-2 h-2 rounded-full bg-[#111111]" />

            {/* School Brand Badge above QR */}
            <div className="flex items-center gap-2 mb-3">
              <img
                src={MPK_LOGO}
                alt="Logo MPK"
                className="w-5 h-5 object-contain"
                referrerPolicy="no-referrer"
              />
              <span className="font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] tracking-wider">
                FORA MPK · {SCHOOL_NAME}
              </span>
            </div>

            {/* QR Image Container */}
            <div className="relative p-2 bg-white border-[2.5px] border-[#111111] rounded-xl shadow-[3px_3px_0px_#111111]">
              {dataUrl ? (
                <div className="relative">
                  <img
                    src={dataUrl}
                    alt="QR Code Website"
                    className="w-52 h-52 sm:w-60 sm:h-60 object-contain block"
                  />
                  {/* Center Official MPK Logo */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-11 h-11 sm:w-13 sm:h-13 bg-[#FFFFFF] border-[2px] sm:border-[2.5px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] flex items-center justify-center p-1 sm:p-1.5 overflow-hidden">
                      <img
                        src={MPK_LOGO}
                        alt="Logo MPK"
                        className="w-full h-full object-contain"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="w-52 h-52 sm:w-60 sm:h-60 flex items-center justify-center font-bold text-xs text-gray-500">
                  Membuat QR Code...
                </div>
              )}
            </div>

            {/* Target URL Preview */}
            <div className="mt-3.5 w-full flex flex-col items-center gap-1.5">
              <div className="flex items-center justify-center gap-2 px-3 py-1.5 bg-[#FCFBF5] border-[1.5px] border-[#111111] rounded-lg font-mono text-[11px] sm:text-xs text-[#111111] font-bold break-all select-all shadow-[1.5px_1.5px_0px_#111111]">
                <span>{currentUrl}</span>
                <a
                  href={currentUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1 hover:bg-[#fde029] rounded transition-colors text-[#111111]"
                  title="Buka Website Langsung"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#00875a]">
                <span className="w-2 h-2 rounded-full bg-[#00875a] inline-block animate-pulse" />
                <span>Domain Aktif: Vercel Production</span>
              </div>
            </div>
          </div>

          {/* Quick Actions Cluster */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-2.5">
            {/* 1. Download HD Image */}
            <button
              onClick={handleDownloadImage}
              disabled={!dataUrl}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-3 rounded-xl border-[2px] border-[#111111] font-['Space_Grotesk'] text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] cursor-pointer transition-transform active:translate-y-0.5 ${
                downloadSuccess
                  ? 'bg-[#21D99A] text-[#111111]'
                  : 'bg-[#e01376] text-white hover:bg-[#b5005d]'
              }`}
            >
              {downloadSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Tersimpan!</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Unduh HD</span>
                </>
              )}
            </button>

            {/* 2. Print / Cetak Poster / Mading */}
            <button
              onClick={handlePrint}
              disabled={!dataUrl}
              className="flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-3 bg-[#fde029] hover:bg-[#e4ca24] text-[#111111] rounded-xl border-[2px] border-[#111111] font-['Space_Grotesk'] text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] cursor-pointer transition-transform active:translate-y-0.5"
            >
              <Printer className="w-4 h-4" />
              <span>Cetak Poster</span>
            </button>

            {/* 3. Salin URL */}
            <button
              onClick={handleCopyLink}
              className={`flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-3 bg-[#FFFFFF] hover:bg-[#f0edec] text-[#111111] rounded-xl border-[2px] border-[#111111] font-['Space_Grotesk'] text-xs font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] cursor-pointer transition-transform active:translate-y-0.5 ${
                copied ? 'bg-[#21D99A]' : ''
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-[#111111]" />
                  <span>Tersalin!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#111111]" />
                  <span>Salin Link</span>
                </>
              )}
            </button>
          </div>

          {/* Useful Tips for MPK */}
          <div className="bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl p-3.5 space-y-1.5 text-xs text-[#111111]">
            <h4 className="font-['Space_Grotesk'] font-extrabold uppercase text-[11px] text-[#5a3f47]">
              Ide Penggunaan di Sekolah:
            </h4>
            <ul className="list-disc list-inside space-y-1 text-[11px] sm:text-xs text-[#5a3f47] font-medium">
              <li>Cetak dan tempelkan di mading kelas, pintu masuk OSIS/MPK, atau perpustakaan.</li>
              <li>Sematkan pada poster agenda sekolah atau slide presentasi apel/upacara.</li>
              <li>Bagikan gambar QR di grup WhatsApp kelas atau story Instagram resmi MPK.</li>
            </ul>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-4 sm:px-6 py-3 bg-[#FCFBF5] border-t-[2px] border-[#111111] flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#5a3f47]">
            <Share2 className="w-3.5 h-3.5" />
            <span>Bagikan link website langsung</span>
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#FFFFFF] hover:bg-[#f0edec] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
