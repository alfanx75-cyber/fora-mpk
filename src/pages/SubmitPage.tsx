import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { CATEGORIES } from '../data/mockData';
import { AspirationCategory } from '../types';
import { CategoryIcon } from '../components/CategoryIcon';
import { CheckCircle2, Paperclip, FileText, Send, Loader2, ShieldCheck } from 'lucide-react';

export const SubmitPage: React.FC = () => {
  const { addAspiration, navigate } = useAspirations();

  const [category, setCategory] = useState<AspirationCategory>('fasilitas');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(true);
  const [name, setName] = useState('');
  const [className, setClassName] = useState('');
  const [files, setFiles] = useState<{ name: string; size: string; type: string }[]>([]);
  const [isDragging, setIsDragging] = useState(false);

  // Submission lifecycle states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicketId, setSuccessTicketId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ title?: string; description?: string }>({});

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = Array.from(e.dataTransfer.files).map(f => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        type: f.type.includes('image') ? 'image' : 'doc',
      }));
      setFiles(prev => [...prev, ...droppedFiles]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = Array.from(e.target.files).map(f => ({
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(1)} MB`,
        type: f.type.includes('image') ? 'image' : 'doc',
      }));
      setFiles(prev => [...prev, ...selectedFiles]);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const validate = () => {
    const errs: { title?: string; description?: string } = {};
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    // Simulate authentic network & processing
    setTimeout(() => {
      const newAsp = addAspiration({
        title: title.trim(),
        description: description.trim(),
        category,
        authorName: isAnonymous ? 'Anonim' : (name.trim() || 'Siswa'),
        className: isAnonymous ? 'Rahasia' : (className.trim() || 'Umum'),
        isAnonymous,
        attachments: files,
      });

      setIsSubmitting(false);
      setSuccessTicketId(newAsp.id);
    }, 1000);
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setName('');
    setClassName('');
    setFiles([]);
    setSuccessTicketId(null);
    setErrors({});
  };

  return (
    <div className="w-full max-w-[960px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 pb-20 sm:pb-16">
      {/* Success State Overlay Modal */}
      {successTicketId && (
        <div className="fixed inset-0 z-[120] bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border-[3px] sm:border-[4px] border-[#111111] rounded-3xl p-5 sm:p-8 max-w-md md:max-w-lg w-full text-center shadow-[6px_6px_0px_#111111] sm:shadow-[10px_10px_0px_#111111] animate-[popModal_0.3s_ease-out_forwards] relative overflow-hidden mx-auto my-auto max-h-[92vh] overflow-y-auto">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#21D99A] border-[3px] border-[#111111] flex items-center justify-center text-[#111111] mx-auto mb-4 sm:mb-5 shadow-[3px_3px_0px_#111111]">
              <CheckCircle2 className="w-8 h-8 sm:w-10 sm:h-10" />
            </div>

            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tight mb-2">
              ASPIRASI BERHASIL DIKIRIM
            </h2>

            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-base text-[#111111] font-semibold mb-4 sm:mb-6">
              Aspirasimu sudah diterima MPK SMANSA dan siap dikawal secara transparan.
            </p>

            {/* Ticket Tag Box */}
            <div className="p-3.5 sm:p-4 bg-[#fde029] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] mb-4 sm:mb-6">
              <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs font-bold uppercase tracking-wider text-[#111111] block mb-1">
                NOMOR TIKET RESMI TRACKING:
              </span>
              <span className="font-mono text-xl sm:text-2xl font-black text-[#111111] tracking-wider select-all break-all">
                {successTicketId}
              </span>
              <p className="font-['Plus_Jakarta_Sans'] text-[10px] sm:text-[11px] font-semibold text-[#111111]/80 mt-1">
                Simpan nomor ini untuk cek progres di menu Lacak Status kapan pun!
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
              <button
                onClick={() => navigate(`/aspirasi/${successTicketId}`)}
                className="btn-brutal flex-1 py-3 sm:py-3.5 bg-[#e01376] text-white border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs uppercase font-black shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer min-h-[42px]"
              >
                LIHAT STATUS ASPIRASI →
              </button>
              <button
                onClick={resetForm}
                className="btn-brutal flex-1 py-3 sm:py-3.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs uppercase font-black shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer min-h-[42px]"
              >
                KIRIM ASPIRASI LAGI
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="text-center max-w-xl mx-auto mb-8 sm:mb-10">
        <div className="inline-block px-3.5 py-1.5 bg-[#fde029] border-[2px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2 sm:mb-3">
          FORM RESMI MPK SMANSA
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl font-black text-[#111111] uppercase tracking-tight">
          KIRIM SUARA & ASPIRASI
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base md:text-lg text-[#111111] font-semibold mt-1.5 sm:mt-2">
          Sampaikan keluhan, fasilitas yang perlu dibenahi, ataupun ide baru untuk sekolah kita.
        </p>
      </div>

      {/* Main Physical Clipboard Poster Card */}
      <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-4 sm:p-8 md:p-12 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] relative">
        <div className="absolute -top-3.5 sm:-top-4 left-1/2 -translate-x-1/2 w-28 sm:w-32 h-6 sm:h-7 bg-[#ffd9e1] border-[2px] border-[#111111] rounded-md shadow-[2px_2px_0px_#111111] flex items-center justify-center font-['Space_Grotesk'] text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-[#111111]">
          FORA CLIP
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6 pt-2">
          {/* 1. Category Picker */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-black tracking-wider text-[#111111] mb-2">
              1. Pilih Kategori Aspirasi <span className="text-[#e01376]">*</span>
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
                        ? 'bg-[#111111] text-white shadow-[2px_2px_0px_#e01376] scale-102'
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

          {/* 2. Title */}
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label className="font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-black tracking-wider text-[#111111]">
                2. Judul Aspirasi <span className="text-[#e01376]">*</span>
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

          {/* 3. Description */}
          <div>
            <div className="flex items-center justify-between mb-1.5 sm:mb-2">
              <label className="font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-black tracking-wider text-[#111111]">
                3. Isi Aspirasi & Usulan Solusi <span className="text-[#e01376]">*</span>
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
              placeholder="Ceritakan detail keluhan atau ide solusimu selengkap mungkin. Sebutkan lokasi, waktu kejadian, atau dampak bagi teman-teman sekelas..."
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

          {/* 4. Drag and Drop File Upload */}
          <div>
            <label className="block font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-black tracking-wider text-[#111111] mb-2">
              4. Lampirkan Foto / Dokumen Pendukung (Opsional)
            </label>
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-[2px] sm:border-[3px] border-dashed rounded-2xl p-4 sm:p-6 text-center transition-all cursor-pointer ${
                isDragging
                  ? 'border-[#e01376] bg-[#ffd9e1]/40 scale-101'
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

            {/* Uploaded Files List */}
            {files.length > 0 && (
              <div className="mt-2.5 space-y-2">
                {files.map((file, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-2 sm:p-2.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111]"
                  >
                    <div className="flex items-center gap-2 overflow-hidden">
                      <FileText className="w-4 h-4 text-[#111111] shrink-0" />
                      <span className="font-['Space_Grotesk'] text-xs font-bold text-[#111111] truncate">
                        {file.name}
                      </span>
                      <span className="text-[10px] text-[#5a3f47]">({file.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile(idx)}
                      className="p-1 text-[#ba1a1a] hover:bg-[#ffdad6] rounded-md transition-colors"
                      title="Hapus berkas"
                    >
                      <span className="material-symbols-outlined text-base">delete</span>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 5. Anonymous Mode Box */}
          <div className="p-3.5 sm:p-4 bg-[#FCFBF5] border-[2px] border-[#111111] rounded-2xl space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-2.5">
                <input
                  type="checkbox"
                  id="anonymous-mode"
                  checked={isAnonymous}
                  onChange={e => setIsAnonymous(e.target.checked)}
                  className="w-4 h-4 sm:w-5 sm:h-5 rounded border-[2px] border-[#111111] text-[#e01376] focus:ring-0 cursor-pointer accent-[#e01376]"
                />
                <label
                  htmlFor="anonymous-mode"
                  className="font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase text-[#111111] cursor-pointer select-none"
                >
                  Kirim Sebagai Anonim (Disarankan)
                </label>
              </div>
              <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-black uppercase px-2 py-0.5 bg-[#21D99A] border border-[#111111] rounded-md shadow-[1px_1px_0px_#111111]">
                <ShieldCheck className="w-3 h-3 text-[#111111]" />
                <span>AMAN</span>
              </span>
            </div>

            <p className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs text-[#5a3f47] leading-relaxed">
              Jika dicentang, nama dan kelas Anda tidak akan dipublikasikan di feed dan hanya dicatat sebagai anonim.
            </p>

            {/* Conditional Name and Class Inputs */}
            {!isAnonymous && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <div>
                  <label className="block font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-bold uppercase text-[#111111] mb-1">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Contoh: Budi Santoso"
                    className="w-full bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-bold uppercase text-[#111111] mb-1">
                    Kelas
                  </label>
                  <input
                    type="text"
                    value={className}
                    onChange={e => setClassName(e.target.value)}
                    placeholder="Contoh: XI MIPA 2"
                    className="w-full bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl px-3 py-2 text-xs font-semibold"
                  />
                </div>
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
                <span>MPK MENERIMA SUARAMU...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4 text-[#111111]" />
                <span>KIRIM ASPIRASIKU →</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
