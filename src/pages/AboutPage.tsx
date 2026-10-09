import React, { useState } from 'react';
import { FAQS, INTI_OFFICERS, MPK_INSTAGRAM_URL, MPK_INSTAGRAM_HANDLE, SCHOOL_LOGO, SCHOOL_NAME, SCHOOL_SHORT, MPK_EMAIL, SMANSA_OFFICIAL_INSTAGRAM_URL } from '../data/mockData';
import { useAspirations } from '../context/AspirationContext';
import { FileText, ShieldCheck, MessageSquare, Search, Share2, HelpCircle, Phone, Instagram, Send, CheckCircle2, Building2, ExternalLink } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigate } = useAspirations();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const commissions = [
    {
      number: 'KOMISI 1',
      alias: 'KONSTRAKUM',
      name: 'Komisi Strategi dan Kebijakan Umum',
      icon: <FileText className="w-6 h-6 text-[#111111]" />,
      color: '#dbe1ff',
      duty: 'Bertugas menyusun, melaksanakan, dan mengevaluasi program serta kebijakan di MPK.',
      tasks: [
        'Penyusunan grand design & rencana strategis program MPK',
        'Pelaksanaan kebijakan umum dan musyawarah kerja',
        'Evaluasi periodik pencapaian target kebijakan MPK',
      ],
    },
    {
      number: 'KOMISI 2',
      alias: 'KONSTADIP',
      name: 'Komisi Stabilitas dan Kedisiplinan',
      icon: <ShieldCheck className="w-6 h-6 text-[#111111]" />,
      color: '#21D99A',
      duty: 'Berperan menjaga tata tertib sekolah dan kedisiplinan, serta mengusulkan revisi aturan agar tercipta lingkungan belajar yang tertib dan nyaman.',
      tasks: [
        'Pengawasan penegakan tata tertib & kedisiplinan siswa',
        'Kajian dan usulan revisi aturan sekolah yang lebih humanis',
        'Menjaga kondusivitas dan stabilitas lingkungan belajar',
      ],
    },
    {
      number: 'KOMISI 3',
      alias: 'KOASITER',
      name: 'Komisi Aspirasi dan Interaksi',
      icon: <MessageSquare className="w-6 h-6 text-[#111111]" />,
      color: '#fde029',
      duty: 'Bertugas menampung, menyalurkan, serta mengawal aspirasi siswa agar dapat tersampaikan dengan baik.',
      tasks: [
        'Pengelolaan & verifikasi tiket aspirasi di platform FORA',
        'Penyaluran berkala aspirasi ke pihak sekolah & komite',
        'Mengawal audiensi serta tindak lanjut hasil aspirasi siswa',
      ],
    },
    {
      number: 'KOMISI 4',
      alias: 'KOMWASEV',
      name: 'Komisi Pengawas dan Evaluasi',
      icon: <Search className="w-6 h-6 text-[#111111]" />,
      color: '#FF7A30',
      duty: 'Bertugas melakukan evaluasi terhadap kinerja OSIS, MPK, serta ekstrakurikuler, sekaligus mengawasi pelaksanaan setiap kegiatan agar berjalan efektif dan sesuai tujuan.',
      tasks: [
        'Monitoring pelaksanaan program kerja OSIS & Ekskul',
        'Audit transparansi & efektivitas pelaksanaan kegiatan sekolah',
        'Penyusunan laporan evaluasi berkala kinerja organisasi',
      ],
    },
    {
      number: 'KOMISI 5',
      alias: 'KOMSIPUSOS',
      name: 'Komisi Dokumentasi, Publikasi dan Sosialisasi',
      icon: <Share2 className="w-6 h-6 text-[#111111]" />,
      color: '#ffd9e1',
      duty: 'Bertugas mendokumentasikan, mempublikasikan, serta menyebarkan informasi seputar kegiatan MPK dan SMANSA.',
      tasks: [
        'Dokumentasi visual & arsip digital setiap agenda MPK',
        'Publikasi transparansi kebijakan & kegiatan ke siswa SMANSA',
        'Sosialisasi program forum aspirasi secara berkala ke kelas-kelas',
      ],
    },
  ];

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 pb-20 sm:pb-16">
      {/* SECTION PALING ATAS: Penjelasan Website Resmi MPK SMAN 1 Kebumen (Layout Seperti Kartu Ketua dengan LOGO SMAN 1 KEBUMEN) */}
      <div className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 shadow-[5px_5px_0px_#111111] sm:shadow-[7px_7px_0px_#111111] mb-10 sm:mb-14 flex flex-col justify-between">
        <div>
          {/* Baris Atas: Logo SMAN 1 Kebumen di Box Avatar + Badge Status di Kanan Atas */}
          <div className="flex items-center justify-between mb-4 sm:mb-5">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[#FFFFFF] border-[2px] sm:border-[2.5px] border-[#111111] flex items-center justify-center p-2 shadow-[2.5px_2.5px_0px_#111111] shrink-0">
                <img
                  src={SCHOOL_LOGO}
                  alt="Logo SMAN 1 Kebumen"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <span className="font-['Space_Grotesk'] text-sm sm:text-base font-black text-[#111111] block uppercase tracking-tight">
                  {SCHOOL_NAME}
                </span>
              </div>
            </div>

            <span className="px-3 py-1.5 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-[10px] sm:text-xs font-black uppercase shadow-[2px_2px_0px_#111111] bg-[#ffd9e1] text-[#111111] shrink-0">
              WEBSITE RESMI MPK
            </span>
          </div>

          {/* Judul & Detail */}
          <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-2.5">
            PORTAL ASPIRASI MPK SMAN 1 KEBUMEN
          </h2>
          <div className="font-mono text-[11px] sm:text-xs font-bold text-[#5a3f47] mb-3.5 flex flex-wrap items-center gap-x-4 gap-y-1">
            <span>🏫 SMAN 1 Kebumen</span>
            <span>📍 Jl. Mayjen Sutoyo No. 7</span>
            <span>📧 {MPK_EMAIL}</span>
          </div>

          {/* Kotak Penjelasan Resmi: Ringkas & Padat */}
          <div className="bg-[#FCFBF5] border border-[#111111] sm:border-[1.5px] rounded-2xl p-3.5 sm:p-4 shadow-[2px_2px_0px_#111111] mb-3">
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-[15px] text-[#111111] font-semibold leading-relaxed">
              Website resmi MPK SMA Negeri 1 Kebumen untuk menampung ide, kritik, dan aspirasi siswa SMANSA secara privat, aman, dan langsung ditindaklanjuti ke pihak sekolah demi kemajuan bersama.
            </p>
          </div>

          {/* Keterangan Singkat SMANSA KUNCARA: Wujud Nyata Aspirasi */}
          <div className="bg-[#e0f2fe] border border-[#111111] sm:border-[1.5px] rounded-2xl p-3.5 sm:p-4 shadow-[2px_2px_0px_#111111]">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs font-black uppercase tracking-wider px-2 py-0.5 bg-[#0ea5e9] text-white border border-[#111111] rounded-md shadow-[1px_1px_0px_#111111]">
                SMANSA KUNCARA
              </span>
              <span className="font-['Space_Grotesk'] text-[11px] font-bold text-[#111111]">
                Wujud Nyata Semangat Aspirasi Siswa
              </span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] font-medium leading-relaxed">
              Mengisi aspirasi merupakan wujud nyata dari slogan <strong>SMANSA KUNCARA</strong>. Setiap ide, kritik, dan solusimu adalah kontribusi aktif menjaga nama harum almamater demi mewujudkan generasi yang cerdas, berkarakter, dan berbudaya.
            </p>
          </div>
        </div>

        {/* Baris Bawah: Aksi */}
        <div className="mt-5 pt-3.5 border-t border-dashed border-[#111111] flex flex-wrap items-center justify-end gap-2.5">
          <button
            onClick={() => navigate('submit')}
            className="btn-brutal inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#21D99A] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#1fbe87] cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Kirim Aspirasi Siswa →</span>
          </button>
          <a
            href={SMANSA_OFFICIAL_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal inline-flex items-center justify-center gap-1.5 px-3.5 py-2 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#ffd9e1]"
          >
            <Instagram className="w-3.5 h-3.5 text-[#e01376]" />
            <span>Instagram Official SMANSA</span>
          </a>
        </div>
      </div>

      {/* Slogan Banner: ASPIRASI REALISASI INOVASI */}
      <div className="text-center max-w-4xl mx-auto mb-10 sm:mb-14">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#fde029] border-[2px] sm:border-[2.5px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-3 sm:mb-4">
          <span>MAJELIS PERWAKILAN KELAS SMAN 1 KEBUMEN</span>
        </div>

        {/* Big Slogan Header */}
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#111111] uppercase tracking-tight mb-4 sm:mb-5 leading-none">
          ASPIRASI • REALISASI • INOVASI
        </h1>

        <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base md:text-lg text-[#111111] font-semibold leading-relaxed max-w-2xl mx-auto">
          MPK bukan sekadar kumpulan orang yang duduk di ruang rapat. Kami adalah jembatan independen antara suara siswa dan kebijakan sekolah.
        </p>

        {/* Official Instagram Badge Pill */}
        <div className="mt-4 flex justify-center">
          <a
            href={MPK_INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brutal inline-flex items-center gap-2 px-4 py-2 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase shadow-[2px_2px_0px_#111111] hover:bg-[#ffd9e1] transition-colors"
          >
            <Instagram className="w-4 h-4 text-[#e01376]" />
            <span>Follow Instagram Resmi: {MPK_INSTAGRAM_HANDLE}</span>
          </a>
        </div>
      </div>

      {/* School Representation Bento Badge */}
      <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 md:p-10 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] mb-12 sm:mb-16 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-8">
            <span className="inline-block font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black tracking-widest bg-[#dbe1ff] border-[1.5px] border-[#111111] px-3 py-1 rounded-lg shadow-[1.5px_1.5px_0px_#111111] mb-3">
              MANDAT PERWAKILAN RESMI SMANSA
            </span>
            <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-2 sm:mb-3">
              Mewakili 30 Kelas & Sekitar 1.000+ Siswa
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base text-[#111111]/85 font-medium leading-relaxed">
              Dipilih dari tiap perwakilan kelas X, XI, dan XII untuk memastikan setiap kritik, saran, maupun keluhan fasilitas di lingkungan SMAN 1 Kebumen didengar, diproses secara terbuka, dan dikawal hingga terealisasi nyata.
            </p>
          </div>

          <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col gap-3 justify-center md:items-end">
            <div className="p-3.5 sm:p-4 bg-[#ffd9e1] border-[2px] sm:border-[2.5px] border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] text-center w-full sm:w-auto md:w-full">
              <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black block text-[#111111]">
                30 KELAS
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold text-[#111111]/80 block">
                Perwakilan Kelas X, XI, XII
              </span>
            </div>
            <div className="p-3.5 sm:p-4 bg-[#21D99A] border-[2px] sm:border-[2.5px] border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] text-center w-full sm:w-auto md:w-full">
              <span className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black block text-[#111111]">
                1.000+ SISWA
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] sm:text-xs font-bold text-[#111111]/80 block">
                Seluruh Warga SMANSA
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PENGURUS INTI (BPH) Highlight Section */}
      <div className="mb-14 sm:mb-20">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6 sm:mb-8">
          <div>
            <div className="inline-block px-3 py-1 bg-[#ffd9e1] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2">
              BADAN PENGURUS HARIAN
            </div>
            <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tight">
              PENGURUS INTI MPK
            </h2>
          </div>
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 max-w-md font-medium">
            Ketua & Wakil Ketua MPK memimpin arah kebijakan umum dan siap dihubungi secara langsung untuk konsultasi siswa.
          </p>
        </div>

        {/* Ketua & Wakil Ketua Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Card Ketua MPK: Aura Pinasti */}
          <div className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="w-12 h-12 rounded-2xl bg-[#ffd9e1] border-[2px] border-[#111111] flex items-center justify-center font-['Space_Grotesk'] font-black text-base text-[#111111] shadow-[2px_2px_0px_#111111]">
                  AP
                </span>
                <span className="px-3 py-1 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-[10px] sm:text-xs font-black uppercase shadow-[2px_2px_0px_#111111] bg-[#ffd9e1]">
                  KETUA MPK
                </span>
              </div>

              <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#111111]">
                {INTI_OFFICERS.ketua.name}
              </h3>
              <div className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold text-[#0ea5e9] mb-1">
                {INTI_OFFICERS.ketua.role} • Kelas {INTI_OFFICERS.ketua.class}
              </div>
              <div className="font-mono text-xs font-bold text-[#5a3f47] mb-3">
                📞 {INTI_OFFICERS.ketua.phone}
              </div>

              <div className="bg-[#FCFBF5] border border-[#111111] rounded-xl p-3.5 shadow-[2px_2px_0px_#111111]">
                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] italic font-medium leading-relaxed">
                  “{INTI_OFFICERS.ketua.quote}”
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-dashed border-[#111111] flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5">
              <span className="font-['Space_Grotesk'] text-[11px] font-bold text-[#111111]">
                Status: Bertugas Aktif
              </span>
              <a
                href={`https://wa.me/${INTI_OFFICERS.ketua.whatsapp}?text=Halo%20Ketua%20MPK%20Aura%20Pinasti,%20saya%20ingin%20berkonsultasi%20mengenai%20aspirasi%20sekolah.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#21D99A] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#1fbe87] cursor-pointer text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Konsultasi WhatsApp →</span>
              </a>
            </div>
          </div>

          {/* Card Wakil Ketua MPK: Nadya Tifani */}
          <div className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3 sm:mb-4">
                <span className="w-12 h-12 rounded-2xl bg-[#ffe340] border-[2px] border-[#111111] flex items-center justify-center font-['Space_Grotesk'] font-black text-base text-[#111111] shadow-[2px_2px_0px_#111111]">
                  NT
                </span>
                <span className="px-3 py-1 border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-[10px] sm:text-xs font-black uppercase shadow-[2px_2px_0px_#111111] bg-[#ffe340]">
                  WAKIL KETUA
                </span>
              </div>

              <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#111111]">
                {INTI_OFFICERS.wakilKetua.name}
              </h3>
              <div className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm font-bold text-[#0ea5e9] mb-1">
                {INTI_OFFICERS.wakilKetua.role} • Kelas {INTI_OFFICERS.wakilKetua.class}
              </div>
              <div className="font-mono text-xs font-bold text-[#5a3f47] mb-3">
                📞 {INTI_OFFICERS.wakilKetua.phone}
              </div>

              <div className="bg-[#FCFBF5] border border-[#111111] rounded-xl p-3.5 shadow-[2px_2px_0px_#111111]">
                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] italic font-medium leading-relaxed">
                  “{INTI_OFFICERS.wakilKetua.quote}”
                </p>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-dashed border-[#111111] flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-2.5">
              <span className="font-['Space_Grotesk'] text-[11px] font-bold text-[#111111]">
                Status: Bertugas Aktif
              </span>
              <a
                href={`https://wa.me/${INTI_OFFICERS.wakilKetua.whatsapp}?text=Halo%20Wakil%20Ketua%20MPK%20Nadya%20Tifani,%20saya%20ingin%20berkonsultasi%20mengenai%20aspirasi%20sekolah.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brutal inline-flex items-center justify-center gap-1.5 px-4 py-2 bg-[#21D99A] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] shadow-[2px_2px_0px_#111111] hover:bg-[#1fbe87] cursor-pointer text-center"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Konsultasi WhatsApp →</span>
              </a>
            </div>
          </div>
        </div>

        {/* Sekretaris & Bendahara Inti (BPH) Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Sekretaris */}
          <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0px_#111111] sm:shadow-[5px_5px_0px_#111111]">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="inline-block px-3 py-1 bg-[#dbe1ff] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[1.5px_1.5px_0px_#111111]">
                ADMINISTRASI & PERSURATAN
              </div>
              <span className="font-['Space_Grotesk'] text-xs font-bold text-[#5a3f47]">BPH INTI</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#111111] uppercase tracking-tight mb-2">
              SEKRETARIS MPK
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium mb-4">
              Bertanggung jawab atas administrasi resmi, notulen rapat dengar pendapat, kearsipan tiket, dan persuratan MPK.
            </p>
            <div className="space-y-2 pt-2 border-t-[2px] border-dashed border-[#111111]">
              {INTI_OFFICERS.sekretaris.map((nama, idx) => (
                <div
                  key={nama}
                  className="flex items-center gap-3 p-2.5 bg-[#FCFBF5] border border-[#111111] rounded-xl shadow-[1.5px_1.5px_0px_#111111]"
                >
                  <span className="w-6 h-6 rounded-md bg-[#dbe1ff] border border-[#111111] flex items-center justify-center font-['Space_Grotesk'] text-xs font-black text-[#111111]">
                    {idx + 1}
                  </span>
                  <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-[#111111]">
                    {nama}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Bendahara */}
          <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0px_#111111] sm:shadow-[5px_5px_0px_#111111]">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="inline-block px-3 py-1 bg-[#fde029] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[1.5px_1.5px_0px_#111111]">
                KEUANGAN & AKUNTABILITAS
              </div>
              <span className="font-['Space_Grotesk'] text-xs font-bold text-[#5a3f47]">BPH INTI</span>
            </div>
            <h3 className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#111111] uppercase tracking-tight mb-2">
              BENDAHARA MPK
            </h3>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium mb-4">
              Bertanggung jawab atas pengelolaan anggaran operasional, transparansi keuangan kesiswaan, dan pelaporan dana.
            </p>
            <div className="space-y-2 pt-2 border-t-[2px] border-dashed border-[#111111]">
              {INTI_OFFICERS.bendahara.map((nama, idx) => (
                <div
                  key={nama}
                  className="flex items-center gap-3 p-2.5 bg-[#FCFBF5] border border-[#111111] rounded-xl shadow-[1.5px_1.5px_0px_#111111]"
                >
                  <span className="w-6 h-6 rounded-md bg-[#fde029] border border-[#111111] flex items-center justify-center font-['Space_Grotesk'] text-xs font-black text-[#111111]">
                    {idx + 1}
                  </span>
                  <span className="font-['Space_Grotesk'] text-xs sm:text-sm font-bold text-[#111111]">
                    {nama}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* STRUKTUR 5 KOMISI KERJA Section */}
      <div className="mb-14 sm:mb-20">
        <div className="mb-6 sm:mb-8">
          <div className="inline-block px-3 py-1 bg-[#21D99A] border-[2px] border-[#111111] rounded-lg font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2">
            5 KOMISI RESMI MPK SMANSA
          </div>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-5xl font-black text-[#111111] uppercase tracking-tight">
            STRUKTUR KOMISI KERJA
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base text-[#111111]/80 max-w-xl font-medium mt-1">
            Setiap komisi memiliki ranah tanggung jawab khusus untuk memastikan aspirasi, ketertiban, pengawasan, dan transparansi di SMANSA berjalan optimal.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {commissions.map(kom => (
            <div
              key={kom.number}
              className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2">
                    <span
                      className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-black px-2.5 py-1 border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111]"
                      style={{ backgroundColor: kom.color }}
                    >
                      {kom.number}
                    </span>
                    <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-black px-2 py-0.5 bg-[#111111] text-white rounded-lg">
                      {kom.alias}
                    </span>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#FCFBF5] border-[1.5px] border-[#111111] flex items-center justify-center shadow-[1.5px_1.5px_0px_#111111]">
                    {kom.icon}
                  </div>
                </div>

                <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black text-[#111111] uppercase tracking-tight mb-2">
                  {kom.name}
                </h3>

                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] font-semibold mb-4 sm:mb-5 leading-relaxed bg-[#FCFBF5] p-3 rounded-xl border border-[#111111]/30">
                  {kom.duty}
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t-[2px] border-dashed border-[#111111]">
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-black uppercase text-[#111111] block mb-2">
                  RUANG LINGKUP TUGAS:
                </span>
                <ul className="space-y-1.5 font-['Plus_Jakarta_Sans'] text-xs text-[#111111] font-medium">
                  {kom.tasks.map((task, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0ea5e9] shrink-0 mt-1.5" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[6px_6px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] mb-12 sm:mb-16">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
          <span className="inline-flex items-center gap-1.5 font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black bg-[#ffd9e1] border-[1.5px] border-[#111111] px-3 py-1 rounded-full shadow-[2px_2px_0px_#111111]">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>PERTANYAAN UMUM</span>
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl font-black text-[#111111] uppercase tracking-tight mt-2 sm:mt-3">
            SERING DITANYAKAN SISWA
          </h2>
        </div>

        <div className="space-y-3 sm:space-y-4 max-w-3xl mx-auto">
          {FAQS.map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={idx}
                className="border-[2px] border-[#111111] rounded-2xl overflow-hidden transition-all bg-[#FCFBF5] shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(idx)}
                  className="w-full text-left p-3.5 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 font-['Space_Grotesk'] text-sm sm:text-base font-extrabold text-[#111111] cursor-pointer hover:bg-[#fde029]/30 transition-colors min-h-[48px]"
                >
                  <span className="leading-snug">{faq.q}</span>
                  <span className="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-white border border-[#111111] flex items-center justify-center shrink-0 text-xs sm:text-sm font-black">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>
                {isOpen && (
                  <div className="p-3.5 sm:p-5 pt-0 border-t border-dashed border-[#111111] bg-white">
                    <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/85 font-medium leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <div className="p-6 sm:p-10 md:p-12 bg-[#316bf3] text-white border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] text-center">
        <h3 className="font-['Space_Grotesk'] text-xl sm:text-3xl md:text-4xl font-black uppercase mb-2 sm:mb-3 leading-tight">
          SIAP MEMBUAT PERUBAHAN DI SMAN 1 KEBUMEN?
        </h3>
        <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-base max-w-xl mx-auto mb-5 sm:mb-6 text-white/90">
          Suara sekecil apa pun memiliki tempat di FORA. Jangan ragu, sampaikan aspirasimu sekarang!
        </p>
        <button
          onClick={() => navigate('/kirim')}
          className="btn-brutal px-6 sm:px-8 py-3.5 sm:py-4 bg-[#fde029] text-[#111111] border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl font-['Space_Grotesk'] text-xs sm:text-sm font-black uppercase tracking-wider shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] min-h-[46px]"
        >
          + KIRIM ASPIRASI SEKARANG →
        </button>
      </div>
    </div>
  );
};
