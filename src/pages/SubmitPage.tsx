import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { CATEGORIES, SCHOOL_CLASSES, SCHOOL_NAME } from '../data/mockData';
import { AspirationCategory, Attachment } from '../types';
import { CategoryIcon } from '../components/CategoryIcon';
import { fileToAttachment, isImageAttachment } from '../utils/fileHelper';
import { AttachmentModal } from '../components/AttachmentModal';
import {
  CheckCircle2,
  Paperclip,
  FileText,
  Send,
  Loader2,
  ShieldCheck,
  Copy,
  Download,
  SearchCheck,
  Lock,
  AlertCircle,
  Eye,
  Trash2,
  Image as ImageIcon
} from 'lucide-react';

export const SubmitPage: React.FC = () => {
  const { submitAspiration, navigate, showToast } = useAspirations();

  // Form Fields
  const [category, setCategory] = useState<AspirationCategory>('fasilitas');
  const [gradeChoice, setGradeChoice] = useState<'X' | 'XI' | 'XII' | ''>('');
  const [specificClass, setSpecificClass] = useState<string>('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [files, setFiles] = useState<Attachment[]>([]);
  const [isProcessingFiles, setIsProcessingFiles] = useState(false);
  const [previewModalAttachment, setPreviewModalAttachment] = useState<Attachment | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Submission States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successData, setSuccessData] = useState<{ id: string; accessKey: string } | null>(null);
  const [errors, setErrors] = useState<{ title?: string; description?: string; class?: string }>({});

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFiles = async (selected: FileList | File[]) => {
    setIsProcessingFiles(true);
    try {
      const newAttachments: Attachment[] = [];
      for (const f of Array.from(selected)) {
        const att = await fileToAttachment(f);
        newAttachments.push(att);
      }
      setFiles(prev => [...prev, ...newAttachments]);
    } catch (err) {
      console.error('Gagal memproses lampiran:', err);
      showToast('Gagal Memproses Berkas', 'File tidak dapat diproses ke sistem.', undefined, 'error');
    } finally {
      setIsProcessingFiles(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
      e.target.value = '';
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs: { title?: string; description?: string; class?: string } = {};

    if (!gradeChoice) {
      errs.class = 'Silakan pilih tingkat kelas (X, XI, atau XII).';
    } else if (!specificClass) {
      errs.class = `Silakan pilih kelas resmi dari daftar tingkat ${gradeChoice}.`;
    }

    if (!title.trim()) {
      errs.title = 'Judul aspirasi wajib diisi';
    } else if (title.trim().length < 5) {
      errs.title = 'Tulis judul sedikit lebih spesifik (minimal 5 karakter)';
    }

    if (!description.trim()) {
      errs.description = 'Ceritakan detail aspirasi agar komisi MPK memahami konteksnya';
    } else if (description.trim().length < 15) {
      errs.description = 'Deskripsi masih terlalu singkat, jelaskan lokasi atau usulan solusinya';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const finalClassName = specificClass;

      const result = await submitAspiration({
        title: title.trim(),
        description: description.trim(),
        category,
        grade: (gradeChoice || 'X') as 'none' | 'X' | 'XI' | 'XII',
        className: finalClassName,
        attachments: files,
      });

      setIsSubmitting(false);
      setSuccessData(result);
    } catch (err) {
      setIsSubmitting(false);
      showToast('Gagal Mengirim', 'Terjadi kendala jaringan saat menyimpan ke database.', undefined, 'error');
    }
  };

  // Helper: Salin akses pelacakan
  const handleCopyAccess = () => {
    if (!successData) return;
    const textToCopy = `[BUKTI PENERIMAAN FORA MPK - ${SCHOOL_NAME}]\nNomor Referensi: ${successData.id}\nKode Akses Rahasia: ${successData.accessKey}\n\nSimpan teks ini untuk melacak status aspirasi di menu Lacak Status.`;
    navigator.clipboard.writeText(textToCopy);
    showToast('Berhasil Disalin', 'Nomor referensi dan kode akses rahasia disalin ke clipboard.', undefined, 'success');
  };

  // Helper: Simpan bukti pengiriman (Download file text)
  const handleSaveReceipt = () => {
    if (!successData) return;
    const content = `========================================================\nBUKTI RESMI PENGIRIMAN ASPIRASI - FORA MPK\n${SCHOOL_NAME}\n========================================================\n\nNomor Referensi    : ${successData.id}\nKode Akses Rahasia : ${successData.accessKey}\nTanggal Kirim      : ${new Date().toLocaleString('id-ID')}\nKategori           : ${category.toUpperCase()}\nStatus Awal        : DIKIRIM (01)\n\nUCAPAN TERIMA KASIH:\nTerima kasih telah mempercayai pihak MPK ${SCHOOL_NAME}.\nAspirasi dan masukan Anda adalah kontribusi nyata demi kemajuan\ndan kebaikan bersama di sekolah kita tercinta.\n\nPERINGATAN PENTING:\nSimpan nomor referensi dan kode akses rahasia ini baik-baik.\nSistem FORA tidak menyimpan nama, nomor kontak, atau email Anda.\nJika kode akses hilang, status tidak dapat dipulihkan secara manual.\n\nLacak status perkembangan aspirasi Anda di:\nMenu "Lacak Status" platform FORA MPK.\n========================================================\n`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FORA-Bukti-Aspirasi-${successData.id}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast('Bukti Tersimpan', `Berkas bukti pengiriman ${successData.id} berhasil diunduh.`, undefined, 'success');
  };

  // Helper: Direct tracking jump
  const handleGoToTracking = () => {
    if (!successData) return;
    // Store in sessionStorage for auto-fill in StatusPage
    sessionStorage.setItem('fora_last_ticket_id', successData.id);
    sessionStorage.setItem('fora_last_access_key', successData.accessKey);
    navigate('/status');
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setGradeChoice('');
    setSpecificClass('');
    setFiles([]);
    setSuccessData(null);
    setErrors({});
  };

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 pb-20 sm:pb-16">
      {/* Success State Overlay Modal (Requirement 5) */}
      {successData && (
        <div className="fixed inset-0 z-[120] bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border-[3px] sm:border-[4px] border-[#111111] rounded-3xl p-5 sm:p-8 max-w-lg w-full text-center shadow-[6px_6px_0px_#111111] sm:shadow-[10px_10px_0px_#111111] animate-[popModal_0.3s_ease-out_forwards] relative overflow-hidden mx-auto my-auto max-h-[94vh] overflow-y-auto">
            {/* Success Icon */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#21D99A] border-[3px] border-[#111111] flex items-center justify-center text-[#111111] mx-auto mb-4 sm:mb-5 shadow-[3px_3px_0px_#111111]">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            {/* Confirmation Headline */}
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tight mb-2">
              Aspirasi Berhasil Dikirim
            </h2>

            {/* Ucapan Terimakasih telah mempercayai pihak MPK */}
            <div className="bg-[#e0f2fe] border-[2px] sm:border-[2.5px] border-[#111111] rounded-2xl p-3.5 sm:p-4 mb-4 text-center shadow-[3px_3px_0px_#111111]">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#FFFFFF] border border-[#111111] rounded-full text-[10px] sm:text-[11px] font-black uppercase text-[#0284c7] mb-1.5 shadow-[1px_1px_0px_#111111]">
                <span>Apresiasi MPK {SCHOOL_NAME}</span>
              </div>
              <p className="font-['Space_Grotesk'] text-sm sm:text-base font-black text-[#0284c7] uppercase tracking-tight">
                💙 Terima Kasih Telah Mempercayai Pihak MPK!
              </p>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] font-semibold mt-1 leading-relaxed">
                Suara dan aspirasimu sangat berarti bagi kemajuan sekolah kita bersama. Pengurus MPK berkomitmen untuk meninjau, mengawal, dan menindaklanjutinya dengan penuh integritas dan tanggung jawab.
              </p>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] font-semibold mb-5 leading-relaxed">
              Aspirasimu telah tersimpan secara aman. Simpan akses pelacakan berikut untuk mengecek status tindak lanjut komisi MPK.
            </p>

            {/* Secret Credentials Box */}
            <div className="bg-[#FCFBF5] border-[2.5px] border-[#111111] rounded-2xl p-4 sm:p-5 mb-5 text-left space-y-3 shadow-[3px_3px_0px_#111111]">
              {/* Reference ID */}
              <div>
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-black uppercase text-[#5a3f47] block mb-1">
                  1. Nomor Referensi (ID Tiket):
                </span>
                <div className="p-2 sm:p-2.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl font-mono text-base sm:text-lg font-black text-[#111111] select-all">
                  {successData.id}
                </div>
              </div>

              {/* Secret Access Key */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-black uppercase text-[#0284c7] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5" />
                    2. Kode Akses Rahasia (PENTING):
                  </span>
                  <span className="text-[10px] bg-[#e0f2fe] text-[#0284c7] border border-[#111111] px-1.5 py-0.2 rounded font-black">
                    RAHASIA
                  </span>
                </div>
                <div className="p-2 sm:p-2.5 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-mono text-base sm:text-lg font-black text-[#111111] tracking-wider select-all">
                  {successData.accessKey}
                </div>
              </div>

              {/* Security Notice */}
              <div className="pt-2 border-t border-[#111111]/20 flex items-start gap-2 text-[11px] text-[#5a3f47] font-medium leading-tight">
                <AlertCircle className="w-4 h-4 text-[#ba1a1a] shrink-0 mt-0.5" />
                <span>
                  Wajib simpan kode akses ini. Karena pengiriman bersifat anonim tanpa nama atau email, kode ini adalah satu-satunya cara untuk melacak aspirasimu.
                </span>
              </div>
            </div>

            {/* Action Buttons Cluster: Salin, Simpan Bukti, Lacak Status */}
            <div className="flex flex-col gap-2.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {/* Button: Salin akses pelacakan */}
                <button
                  type="button"
                  onClick={handleCopyAccess}
                  className="btn-brutal py-3 px-3 bg-[#FFFFFF] hover:bg-[#f0edec] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <Copy className="w-4 h-4" />
                  <span>Salin Akses Pelacakan</span>
                </button>

                {/* Button: Simpan bukti pengiriman */}
                <button
                  type="button"
                  onClick={handleSaveReceipt}
                  className="btn-brutal py-3 px-3 bg-[#fde029] hover:bg-[#ffe340] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] flex items-center justify-center gap-1.5 cursor-pointer min-h-[44px]"
                >
                  <Download className="w-4 h-4" />
                  <span>Simpan Bukti Pengiriman</span>
                </button>
              </div>

              {/* Button: Lacak status */}
              <button
                type="button"
                onClick={handleGoToTracking}
                className="btn-brutal w-full py-3.5 bg-[#0ea5e9] hover:bg-[#0284c7] text-white border-[2.5px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase shadow-[3px_3px_0px_#111111] flex items-center justify-center gap-2 cursor-pointer min-h-[46px]"
              >
                <SearchCheck className="w-4 h-4" />
                <span>Lacak Status Sekarang →</span>
              </button>

              <button
                type="button"
                onClick={resetForm}
                className="text-xs font-['Space_Grotesk'] font-bold text-[#5a3f47] hover:underline mt-1 cursor-pointer"
              >
                Kirim Aspirasi Baru Lainnya
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <div className="inline-block px-3.5 py-1.5 bg-[#fde029] border-[2px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2 sm:mb-3">
          RUANG ASPIRASI SISWA · MPK {SCHOOL_NAME}
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-black text-[#111111] uppercase tracking-tight">
          KIRIM ASPIRASI
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base text-[#111111] font-semibold mt-1.5 sm:mt-2">
          Sampaikan ide, kritik, fasilitas rusak, atau usulan solusi. Tanpa nama dan terlindungi secara privat.
        </p>
      </div>

      {/* Main Brutalist Form Container */}
      <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] relative">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Privacy Guarantee Banner */}
          <div className="p-3.5 sm:p-4 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-2xl flex items-center justify-between gap-3 shadow-[2px_2px_0px_#111111]">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-[#21D99A] border border-[#111111] flex items-center justify-center shrink-0 shadow-[1px_1px_0px_#111111]">
                <ShieldCheck className="w-5 h-5 text-[#111111]" />
              </span>
              <div>
                <span className="font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] block">
                  PENGIRIMAN 100% TANPA NAMA
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#5a3f47] font-medium block">
                  Tidak meminta nama, email, atau kontak. Isi kiriman hanya dibaca admin MPK berwenang.
                </span>
              </div>
            </div>
            <span className="hidden sm:inline-block px-2.5 py-1 bg-[#fde029] border border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] font-black uppercase">
              PRIVAT
            </span>
          </div>

          {/* 1. Category Picker */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-black tracking-wider text-[#111111] mb-2">
              1. Pilih Kategori Aspirasi <span className="text-[#0ea5e9]">*</span>
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-2.5">
              {CATEGORIES.map(cat => {
                const isSelected = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={`p-2.5 sm:p-3 rounded-2xl border-[2px] border-[#111111] font-['Space_Grotesk'] text-[11px] sm:text-xs font-bold flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#111111] text-white shadow-[2px_2px_0px_#0ea5e9] scale-102'
                        : 'bg-[#FCFBF5] text-[#111111] hover:bg-[#f0edec] shadow-[1.5px_1.5px_0px_#111111]'
                    }`}
                  >
                    <CategoryIcon category={cat.id} className="w-5 h-5" />
                    <span className="truncate">{cat.name}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 2. Class Selection (Requirement 6: Tingkat X, XI, XII & Kelas, atau "Tidak ingin menyebutkan kelas") */}
          <div className="p-4 sm:p-5 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-2xl space-y-3">
            <label className="block font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-black tracking-wider text-[#111111]">
              2. Asal Kelas (Untuk Pemetaan Internal MPK)
            </label>
            <p className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs text-[#5a3f47] leading-relaxed">
              Pilihan kelas hanya terlihat oleh admin MPK untuk rekapitulasi kebutuhan sarana angkatan dan tidak akan dipublikasikan ke publik.
            </p>

            {/* Tingkat Radio Buttons */}
            <div className="grid grid-cols-3 gap-2 pt-1">
              {[
                { id: 'X', label: 'Tingkat X' },
                { id: 'XI', label: 'Tingkat XI' },
                { id: 'XII', label: 'Tingkat XII' },
              ].map(opt => {
                const active = gradeChoice === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setGradeChoice(opt.id as any);
                      setSpecificClass('');
                      if (errors.class) setErrors(prev => ({ ...prev, class: undefined }));
                    }}
                    className={`px-3 py-2.5 rounded-xl border-[2px] border-[#111111] font-['Space_Grotesk'] text-xs font-bold text-center transition-all cursor-pointer ${
                      active
                        ? 'bg-[#fde029] text-[#111111] shadow-[2px_2px_0px_#111111]'
                        : 'bg-white text-[#5a3f47] hover:bg-[#f0edec]'
                    }`}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>

            {!gradeChoice && errors.class && (
              <p className="mt-1 font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#ba1a1a]">
                {errors.class}
              </p>
            )}

            {/* Specific Class Dropdown (Required if a grade is picked) */}
            {gradeChoice && (
              <div className="pt-2 animate-[popModal_0.2s_ease-out_forwards]">
                <label className="block font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-bold uppercase text-[#111111] mb-1.5">
                  Pilih Kelas Resmi di Tingkat {gradeChoice} <span className="text-[#0ea5e9]">*</span>
                </label>
                <select
                  value={specificClass}
                  onChange={e => {
                    setSpecificClass(e.target.value);
                    if (errors.class) setErrors(prev => ({ ...prev, class: undefined }));
                  }}
                  className={`w-full bg-[#FFFFFF] border-[2px] sm:border-[2.5px] rounded-xl px-3.5 py-2.5 sm:py-3 font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-[#111111] focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111] ${
                    errors.class ? 'border-[#ba1a1a] bg-[#ffdad6]/20' : 'border-[#111111]'
                  }`}
                >
                  <option value="">-- Pilih Kelas {gradeChoice} Resmi --</option>
                  {SCHOOL_CLASSES[gradeChoice as 'X' | 'XI' | 'XII'].map(cls => (
                    <option key={cls} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                {errors.class && (
                  <p className="mt-1 font-['Plus_Jakarta_Sans'] text-[11px] font-bold text-[#ba1a1a]">
                    {errors.class}
                  </p>
                )}
              </div>
            )}
          </div>

          {/* 3. Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label className="font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-black tracking-wider text-[#111111]">
                3. Judul Aspirasi <span className="text-[#0ea5e9]">*</span>
              </label>
              <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] text-[#5a3f47]">
                {title.length}/100 Karakter
              </span>
            </div>
            <input
              type="text"
              maxLength={100}
              value={title}
              onChange={e => {
                setTitle(e.target.value);
                if (errors.title) setErrors(prev => ({ ...prev, title: undefined }));
              }}
              placeholder="Contoh: Lampu toilet lantai 2 gedung barat perlu diperbaiki"
              className={`w-full bg-[#FCFBF5] border-[2px] sm:border-[3px] rounded-xl px-3.5 sm:px-4 py-2.5 sm:py-3.5 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base font-semibold text-[#111111] placeholder:text-[#5a3f47]/50 focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111] ${
                errors.title ? 'border-[#ba1a1a] bg-[#ffdad6]/20' : 'border-[#111111]'
              }`}
            />
            {errors.title && (
              <p className="mt-1 font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold text-[#ba1a1a]">
                {errors.title}
              </p>
            )}
          </div>

          {/* 4. Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label className="font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-black tracking-wider text-[#111111]">
                4. Isi Aspirasi & Usulan Solusi <span className="text-[#0ea5e9]">*</span>
              </label>
              <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] text-[#5a3f47]">
                {description.length} Karakter
              </span>
            </div>
            <textarea
              rows={4}
              value={description}
              onChange={e => {
                setDescription(e.target.value);
                if (errors.description) setErrors(prev => ({ ...prev, description: undefined }));
              }}
              placeholder="Ceritakan keluhan atau usulan solusimu selengkap mungkin. Jelaskan lokasi, waktu, atau solusi yang diharapkan..."
              className={`w-full bg-[#FCFBF5] border-[2px] sm:border-[3px] rounded-xl p-3 sm:p-4 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base font-medium text-[#111111] placeholder:text-[#5a3f47]/50 focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-[2px_2px_0px_#111111] resize-none ${
                errors.description ? 'border-[#ba1a1a] bg-[#ffdad6]/20' : 'border-[#111111]'
              }`}
            />
            {errors.description && (
              <p className="mt-1 font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold text-[#ba1a1a]">
                {errors.description}
              </p>
            )}
          </div>

          {/* 5. Drag and Drop File Upload (Optional) */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-black tracking-wider text-[#111111] mb-2">
              5. Lampiran Bukti Foto / Dokumen Pendukung (Opsional)
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-[2px] sm:border-[3px] border-dashed rounded-2xl p-4 sm:p-6 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-[#0ea5e9] bg-[#e0f2fe]/40'
                  : 'border-[#111111] bg-[#FCFBF5] hover:bg-[#f0edec]'
              }`}
            >
              <input
                type="file"
                id="file-upload"
                multiple
                onChange={handleFileInput}
                className="hidden"
                accept="image/*,.pdf,.doc,.docx"
              />
              <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center">
                <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] flex items-center justify-center text-[#111111] shadow-[2px_2px_0px_#111111] mb-1.5 sm:mb-2">
                  <Paperclip className="w-5 h-5" />
                </span>
                <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-black text-[#111111] uppercase tracking-wide">
                  + TAMBAHKAN FOTO ATAU DOKUMEN
                </span>
                <span className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs text-[#5a3f47] font-medium mt-1">
                  Tarik file ke sini atau ketuk untuk memilih (Maks 10MB)
                </span>
              </label>
            </div>

            {/* Processing Indicator */}
            {isProcessingFiles && (
              <div className="mt-2.5 p-3 bg-[#fde029]/20 border-[2px] border-[#111111] rounded-xl flex items-center gap-2.5 text-xs font-bold text-[#111111] animate-pulse">
                <Loader2 className="w-4 h-4 animate-spin text-[#0051d5]" />
                <span>Sedang membaca dan mengoptimalkan ukuran foto...</span>
              </div>
            )}

            {/* Uploaded Files List */}
            {files.length > 0 && (
              <div className="mt-2.5 space-y-2">
                {files.map((file, idx) => {
                  const isImg = isImageAttachment(file);
                  return (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-2 sm:p-2.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] gap-2"
                    >
                      <div className="flex items-center gap-2.5 overflow-hidden flex-1 min-w-0">
                        {isImg && file.dataUrl ? (
                          <img
                            src={file.dataUrl}
                            alt={file.name}
                            className="w-10 h-10 object-cover rounded-lg border border-[#111111] shrink-0 bg-white"
                          />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[#FCFBF5] border border-[#111111] flex items-center justify-center shrink-0">
                            {isImg ? (
                              <ImageIcon className="w-5 h-5 text-[#111111]" />
                            ) : (
                              <FileText className="w-5 h-5 text-[#111111]" />
                            )}
                          </div>
                        )}
                        <div className="overflow-hidden min-w-0">
                          <span className="font-['Space_Grotesk'] text-xs font-bold text-[#111111] truncate block">
                            {file.name}
                          </span>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className="font-mono text-[10px] text-[#5a3f47] font-semibold">
                              {file.size}
                            </span>
                            <span className="text-[9px] font-bold uppercase px-1.5 py-0.2 bg-[#21D99A]/30 border border-[#111111] rounded text-[#111111]">
                              {isImg ? 'Foto' : 'Dokumen'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={() => setPreviewModalAttachment(file)}
                          className="px-2.5 py-1 bg-[#FCFBF5] hover:bg-[#fde029] border border-[#111111] rounded-lg text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shadow-[1px_1px_0px_#111111]"
                          title="Buka pratinjau lampiran"
                        >
                          <Eye className="w-3.5 h-3.5 text-[#111111]" />
                          <span className="hidden sm:inline text-[11px]">Lihat</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => removeFile(idx)}
                          className="p-1 text-[#ba1a1a] hover:bg-[#ffdad6] border border-transparent hover:border-[#ba1a1a] rounded-lg transition-colors cursor-pointer"
                          title="Hapus berkas"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="btn-brutal w-full flex items-center justify-center gap-2 bg-[#fde029] hover:bg-[#ffe340] text-[#111111] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl py-3.5 sm:py-4 font-['Space_Grotesk'] text-sm sm:text-base font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[5px_5px_0px_#111111] cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed min-h-[50px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-[#111111]" />
                <span>MENGIRIM KE DATABASE MPK...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#111111]" />
                <span>KIRIM ASPIRASIKU SEKARANG →</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Attachment Preview Modal */}
      <AttachmentModal
        attachment={previewModalAttachment}
        onClose={() => setPreviewModalAttachment(null)}
      />
    </div>
  );
};
