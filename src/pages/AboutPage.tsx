import React, { useState } from 'react';
import { MPK_MEMBERS, FAQS } from '../data/mockData';
import { useAspirations } from '../context/AspirationContext';

export const AboutPage: React.FC = () => {
  const { navigate, showToast } = useAspirations();
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const commissions = [
    {
      code: 'KOMISI I',
      name: 'Aspirasi & Advokasi',
      icon: '📢',
      color: '#ffd9e1',
      desc: 'Bertanggung jawab menampung seluruh aspirasi dari siswa, mengorganisasi survei berkala, dan melakukan audiensi langsung dengan Wakasek Sarpras & Kesiswaan.',
      tasks: ['Verifikasi tiket aspirasi FORA', 'Rapat Dengar Pendapat mingguan', 'Audiensi nota dinas kebijakan'],
    },
    {
      code: 'KOMISI II',
      name: 'Pengawasan & Tata Tertib',
      icon: '🔍',
      color: '#ffe340',
      desc: 'Mengawasi pelaksanaan program kerja OSIS, akuntabilitas penggunaan dana iuran kegiatan siswa, serta kedisiplinan organisasi intra sekolah.',
      tasks: ['Audit transparansi dana pensi & event', 'Monitoring kinerja seksi bidang OSIS', 'Laporan evaluasi triwulan'],
    },
    {
      code: 'KOMISI III',
      name: 'Hukum & Legislasi',
      icon: '⚖️',
      color: '#dbe1ff',
      desc: 'Menyusun dan merevisi Anggaran Dasar / Anggaran Rumah Tangga (AD/ART) organisasi kesiswaan serta pedoman tata tertib perwakilan kelas.',
      tasks: ['Amandemen konstitusi siswa', 'Penyusunan kode etik aspirasi', 'Sidang Umum Pleno tahunan'],
    },
    {
      code: 'KOMISI IV',
      name: 'Humas & Kesejahteraan Siswa',
      icon: '🤝',
      color: '#21D99A',
      desc: 'Menjaga transparansi informasi ke seluruh warga sekolah, mengelola portal media FORA, dan mengawal isu kesehatan/sanitasi lingkungan sekolah.',
      tasks: ['Publikasi mading & Instagram resmi', 'Survei kepuasan kantin & sanitasi', 'Podcast & forum diskusi terbuka'],
    },
  ];

  return (
    <div className="w-full max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-8 sm:py-12 md:py-16 pb-20 sm:pb-16">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
        <div className="inline-block px-3 sm:px-3.5 py-1 sm:py-1.5 bg-[#dbe1ff] border-[2px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] mb-2 sm:mb-3">
          🏛️ TENTANG MAJELIS PERWAKILAN KELAS
        </div>
        <h1 className="font-['Space_Grotesk'] text-3xl sm:text-5xl md:text-7xl font-black text-[#111111] uppercase tracking-tight mb-3 sm:mb-4">
          WHO ARE WE?
        </h1>
        <p className="font-['Plus_Jakarta_Sans'] text-sm sm:text-base md:text-xl text-[#111111] font-semibold leading-relaxed">
          MPK bukan sekadar kumpulan orang yang duduk di ruang rapat. Kami adalah jembatan independen antara suara siswa dan kebijakan sekolah.
        </p>
      </div>

      {/* Philosophy Statement Banner */}
      <div className="bg-[#fde029] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 md:p-10 shadow-[5px_5px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] mb-12 sm:mb-16 relative overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 items-center">
          <div className="md:col-span-8">
            <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black tracking-widest text-[#111111] block mb-1.5 sm:mb-2">
              PRINSIP DASAR FORA & MPK
            </span>
            <h2 className="font-['Space_Grotesk'] text-xl sm:text-2xl md:text-3xl font-black text-[#111111] uppercase tracking-tight mb-2 sm:mb-3">
              “Setiap siswa berhak atas lingkungan belajar yang nyaman, adil, dan mendengar.”
            </h2>
            <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm md:text-base text-[#111111]/90 font-medium">
              Kami dipilih langsung oleh perwakilan tiap kelas untuk mengawal hak-hak belajar, menyuarakan perbaikan fasilitas, dan mengawasi jalannya roda organisasi sekolah dengan penuh transparansi.
            </p>
          </div>
          <div className="md:col-span-4 flex justify-center md:justify-end">
            <div className="p-3.5 sm:p-4 bg-white border-[2.5px] sm:border-[3px] border-[#111111] rounded-2xl shadow-[3px_3px_0px_#111111] sm:shadow-[4px_4px_0px_#111111] text-center rotate-0 sm:rotate-2">
              <span className="text-3xl sm:text-4xl block mb-1">🤝</span>
              <span className="font-['Space_Grotesk'] text-xs font-black uppercase text-[#111111] block">
                36 PERWAKILAN KELAS
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[10px] sm:text-[11px] text-[#5a3f47] block">
                Suara Bersatu 1,280+ Siswa
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Commissions Grid */}
      <div className="mb-14 sm:mb-20">
        <div className="mb-6 sm:mb-8">
          <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black tracking-wider text-[#5a3f47] block mb-1">
            STRUKTUR KOMISI KERJA
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tight">
            KOMISI KERJA MPK
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {commissions.map(kom => (
            <div
              key={kom.code}
              className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 md:p-8 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span
                    className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-black px-2.5 sm:px-3 py-1 border-[1.5px] sm:border-[2px] border-[#111111] rounded-xl shadow-[1.5px_1.5px_0px_#111111]"
                    style={{ backgroundColor: kom.color }}
                  >
                    {kom.code}
                  </span>
                  <span className="text-xl sm:text-2xl">{kom.icon}</span>
                </div>

                <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl md:text-2xl font-black text-[#111111] uppercase tracking-tight mb-2">
                  {kom.name}
                </h3>

                <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium mb-4 sm:mb-6 leading-relaxed">
                  {kom.desc}
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t-[2px] border-dashed border-[#111111]">
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-black uppercase text-[#111111] block mb-1.5 sm:mb-2">
                  TUGAS & WEWENANG UTAMA:
                </span>
                <ul className="space-y-1 sm:space-y-1.5 font-['Plus_Jakarta_Sans'] text-xs text-[#111111] font-semibold">
                  {kom.tasks.map((task, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#111111] shrink-0" />
                      <span>{task}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Leadership & Members Showcase */}
      <div className="mb-14 sm:mb-20">
        <div className="mb-6 sm:mb-8">
          <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black tracking-wider text-[#5a3f47] block mb-1">
            BADAN PENGURUS HARIAN & KETUA KOMISI
          </span>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-3xl md:text-4xl font-black text-[#111111] uppercase tracking-tight">
            PENGURUS MPK PERIODE 2026/2027
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {MPK_MEMBERS.map(member => (
            <div
              key={member.name}
              className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-6 shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <span className="w-10 h-10 sm:w-12 sm:h-12 rounded-2xl bg-[#FCFBF5] border-[2px] border-[#111111] flex items-center justify-center text-xl sm:text-2xl shadow-[2px_2px_0px_#111111]">
                    {member.avatar}
                  </span>
                  <span
                    className="px-2.5 sm:px-3 py-1 border-[1.5px] sm:border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-[9px] sm:text-[10px] font-black uppercase shadow-[1.5px_1.5px_0px_#111111]"
                    style={{ backgroundColor: member.badgeBg }}
                  >
                    {member.badge}
                  </span>
                </div>

                <h4 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black text-[#111111]">
                  {member.name}
                </h4>
                <div className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#5a3f47] mb-3 sm:mb-4">
                  {member.role} • {member.class}
                </div>

                <div className="bg-[#FCFBF5] border border-[#111111] rounded-xl p-3 shadow-[1.5px_1.5px_0px_#111111]">
                  <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111] italic font-medium leading-relaxed">
                    “{member.quote}”
                  </p>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 border-t border-[#111111] flex items-center justify-between">
                <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-bold text-[#5a3f47]">
                  Status: Bertugas Aktif
                </span>
                <button
                  onClick={() => showToast('Konsultasi Anggota', `Kirim pesan ke ${member.name} melalui perwakilan kelasmu.`)}
                  className="btn-brutal text-xs font-['Space_Grotesk'] font-bold text-[#e01376] hover:underline cursor-pointer"
                >
                  Hubungi →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Frequently Asked Questions Accordion */}
      <div className="bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] rounded-3xl p-5 sm:p-8 md:p-12 shadow-[6px_6px_0px_#111111] sm:shadow-[8px_8px_0px_#111111] mb-12 sm:mb-16">
        <div className="max-w-2xl mx-auto text-center mb-8 sm:mb-10">
          <span className="font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black bg-[#ffd9e1] border-[1.5px] border-[#111111] px-3 py-1 rounded-full shadow-[2px_2px_0px_#111111]">
            💡 PERTANYAAN UMUM
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
          SIAP MEMBUAT PERUBAHAN DI KAMPUS SEKOLAH?
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
