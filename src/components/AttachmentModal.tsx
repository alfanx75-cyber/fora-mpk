import React, { useState, useEffect } from 'react';
import { Attachment } from '../types';
import { isImageAttachment, downloadAttachment } from '../utils/fileHelper';
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Image as ImageIcon,
  ShieldCheck,
  Maximize2,
  Minimize2
} from 'lucide-react';

interface AttachmentModalProps {
  attachment: Attachment | null;
  ticketId?: string;
  ticketTitle?: string;
  onClose: () => void;
}

export const AttachmentModal: React.FC<AttachmentModalProps> = ({
  attachment,
  ticketId,
  ticketTitle,
  onClose,
}) => {
  const [zoom, setZoom] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Reset zoom and fullscreen whenever attachment changes
  useEffect(() => {
    setZoom(1);
    setIsFullscreen(false);
  }, [attachment]);

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!attachment) return null;

  const isImg = isImageAttachment(attachment);
  const mediaUrl = attachment.dataUrl || attachment.previewUrl;

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  const handleOpenNewTab = () => {
    if (!mediaUrl) return;
    const win = window.open();
    if (win) {
      if (isImg) {
        win.document.write(
          `<html><head><title>${attachment.name}</title><style>body{margin:0;background:#111;display:flex;align-items:center;justify-content:center;height:100vh;}img{max-width:95vw;max-height:95vh;object-fit:contain;border-radius:8px;}</style></head><body><img src="${mediaUrl}" alt="${attachment.name}" /></body></html>`
        );
      } else {
        win.location.href = mediaUrl;
      }
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/75 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out] ${
        isFullscreen ? 'p-0' : 'p-3 sm:p-5 md:p-8'
      }`}
      onClick={onClose}
    >
      <div
        className={`flex flex-col bg-[#FFFFFF] border-[#111111] overflow-hidden transition-all duration-200 ${
          isFullscreen
            ? 'w-full h-full max-w-none max-h-none rounded-none border-0'
            : 'relative w-full max-w-4xl max-h-[92vh] border-[3px] rounded-3xl shadow-[8px_8px_0px_#111111] animate-[popModal_0.25s_cubic-bezier(0.16,1,0.3,1)_forwards]'
        }`}
        onClick={e => e.stopPropagation()}
      >
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b-[2.5px] border-[#111111] bg-[#FCFBF5]">
          <div className="flex items-center gap-2.5 overflow-hidden pr-2">
            <div className="w-9 h-9 rounded-xl bg-[#fde029] border-[2px] border-[#111111] flex items-center justify-center shrink-0 shadow-[2px_2px_0px_#111111]">
              {isImg ? (
                <ImageIcon className="w-5 h-5 text-[#111111]" />
              ) : (
                <FileText className="w-5 h-5 text-[#111111]" />
              )}
            </div>
            <div className="overflow-hidden">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-[#e01376] text-white rounded-md border border-[#111111]">
                  {isImg ? 'LAMPIRAN FOTO RESMI' : 'DOKUMEN LAMPIRAN'}
                </span>
                {ticketId && (
                  <span className="font-mono text-[10px] sm:text-xs font-black px-2 py-0.5 bg-[#21D99A] text-[#111111] rounded-md border border-[#111111]">
                    TIKET: {ticketId}
                  </span>
                )}
              </div>
              <h3 className="font-['Space_Grotesk'] text-sm sm:text-base font-black text-[#111111] truncate mt-0.5">
                {attachment.name}
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 ml-2">
            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(prev => !prev)}
              className="w-9 h-9 rounded-xl bg-[#FCFBF5] hover:bg-[#f0edec] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title={isFullscreen ? 'Kecilkan Layar' : 'Layar Penuh'}
            >
              {isFullscreen ? (
                <Minimize2 className="w-4 h-4" />
              ) : (
                <Maximize2 className="w-4 h-4" />
              )}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl bg-[#FCFBF5] hover:bg-[#ffdad6] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111] transition-transform active:translate-x-0.5 active:translate-y-0.5 cursor-pointer"
              title="Tutup (Esc)"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subheader info if ticketTitle exists */}
        {ticketTitle && (
          <div className="px-5 py-2 bg-[#fde029]/15 border-b border-[#111111]/15 text-xs font-medium text-[#111111] flex items-center gap-1.5 truncate">
            <span className="font-bold text-[#5a3f47]">Judul Aspirasi:</span>
            <span className="truncate font-semibold">{ticketTitle}</span>
          </div>
        )}

        {/* Main Content Area */}
        <div
          className={`flex-1 overflow-auto p-4 sm:p-6 bg-[#f7f5ef] flex items-center justify-center select-none ${
            isFullscreen ? 'h-full max-h-[calc(100vh-140px)]' : 'min-h-[300px] max-h-[62vh]'
          }`}
        >
          {isImg ? (
            mediaUrl ? (
              <div className="relative overflow-auto max-w-full max-h-full flex items-center justify-center p-2">
                <img
                  src={mediaUrl}
                  alt={attachment.name}
                  style={{ transform: `scale(${zoom})`, transformOrigin: 'center center' }}
                  className={`${
                    isFullscreen ? 'max-h-[calc(100vh-180px)]' : 'max-h-[52vh]'
                  } w-auto max-w-full object-contain rounded-2xl border-[2.5px] border-[#111111] shadow-[4px_4px_0px_#111111] bg-white transition-transform duration-150`}
                />
              </div>
            ) : (
              <div className="text-center p-6 bg-white border-[2px] border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] max-w-md">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#ffdad6] border-[2px] border-[#ba1a1a] flex items-center justify-center text-[#ba1a1a] mb-3">
                  <ImageIcon className="w-6 h-6" />
                </div>
                <h4 className="font-['Space_Grotesk'] text-sm font-black text-[#111111]">
                  Data Pratinjau Foto Tidak Ditemukan
                </h4>
                <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5a3f47] mt-1.5 leading-relaxed">
                  Berkas foto <strong>{attachment.name}</strong> dikirim pada versi sebelum sinkronisasi gambar aktif.
                </p>
              </div>
            )
          ) : (
            /* Document Preview Card */
            <div className="text-center p-8 bg-white border-[2.5px] border-[#111111] rounded-2xl shadow-[4px_4px_0px_#111111] max-w-md w-full">
              <div className="w-16 h-16 mx-auto rounded-2xl bg-[#0051d5]/10 border-[2px] border-[#0051d5] flex items-center justify-center text-[#0051d5] mb-3">
                <FileText className="w-8 h-8" />
              </div>
              <h4 className="font-['Space_Grotesk'] text-base font-black text-[#111111] break-all">
                {attachment.name}
              </h4>
              <p className="font-mono text-xs font-bold text-[#5a3f47] mt-1">
                Ukuran: {attachment.size || 'Tidak diketahui'}
              </p>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#5a3f47] mt-2 leading-relaxed">
                Berkas dokumen pendukung aspirasi telah terdaftar dalam sistem verifikasi FORA.
              </p>
            </div>
          )}
        </div>

        {/* Footer Actions & Zoom Toolbar */}
        <div className="p-3.5 sm:p-4 border-t-[2.5px] border-[#111111] bg-[#FFFFFF] flex flex-wrap items-center justify-between gap-3">
          {/* Zoom controls for images */}
          {isImg && mediaUrl ? (
            <div className="flex items-center gap-1.5 bg-[#FCFBF5] p-1 border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111]">
              <button
                onClick={handleZoomOut}
                disabled={zoom <= 0.5}
                className="p-1.5 hover:bg-[#f0edec] rounded-lg disabled:opacity-40 cursor-pointer"
                title="Perkecil"
              >
                <ZoomOut className="w-4 h-4 text-[#111111]" />
              </button>
              <span className="font-mono text-xs font-bold px-2 text-[#111111] min-w-[50px] text-center">
                {Math.round(zoom * 100)}%
              </span>
              <button
                onClick={handleZoomIn}
                disabled={zoom >= 3}
                className="p-1.5 hover:bg-[#f0edec] rounded-lg disabled:opacity-40 cursor-pointer"
                title="Perbesar"
              >
                <ZoomIn className="w-4 h-4 text-[#111111]" />
              </button>
              <button
                onClick={handleResetZoom}
                className="p-1.5 hover:bg-[#f0edec] rounded-lg border-l border-[#111111]/30 cursor-pointer"
                title="Reset Ukuran (100%)"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#111111]" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs text-[#5a3f47] font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#21D99A]" />
              <span>Berkas Terverifikasi Aman</span>
            </div>
          )}

          {/* Action buttons: Open in New Tab & Download */}
          <div className="flex items-center gap-2 ml-auto">
            {mediaUrl && (
              <button
                onClick={handleOpenNewTab}
                className="btn-brutal px-3.5 py-2 bg-[#FCFBF5] hover:bg-[#f0edec] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-bold uppercase shadow-[2px_2px_0px_#111111] flex items-center gap-1.5 cursor-pointer"
                title="Buka tampilan penuh di tab baru"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Buka di Tab Baru</span>
              </button>
            )}

            <button
              onClick={() => downloadAttachment(attachment)}
              className="btn-brutal px-4 py-2 bg-[#fde029] hover:bg-[#edd022] text-[#111111] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isImg ? 'Unduh Foto' : 'Unduh Berkas'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
