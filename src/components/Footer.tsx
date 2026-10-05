import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { MPK_INSTAGRAM_URL, MPK_INSTAGRAM_HANDLE, MPK_EMAIL } from '../data/mockData';
import { Mail, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate, showToast } = useAspirations();
  const [modalType, setModalType] = useState<'privacy' | 'ethics' | null>(null);

  return (
    <>
      <footer className="w-full bg-[#FCFBF5] border-t-[3px] border-[#111111] mt-auto pb-24 md:pb-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-16">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-10 sm:mb-12">
            {/* Left Brand Column */}
            <div className="md:col-span-5 flex flex-col items-start gap-3 sm:gap-4">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] p-0.5 shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] flex items-center justify-center hover:rotate-6 transition-transform">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC91SQPjLfxEPpKPgf2kja8Bd0kOX-_5ShQ2ZKkMr81JObzFJ4w_aXlzZq20eIpepyNJj5dSS-u19ThELsjMBlXQXLvMazuLv4Lqruhi_skWfCfYH0_K1gbfftx-Cge4Q_9d2LF7G-Adh5m_yiCpPWWMdfWwneAxiwq_yNr1EXM-HvKCDPwGdadpckDL3w06jOn5jW9jNRWHzQFRK_MDy8FM9RfqmxQ0bBxeAztBsLJOIZY7KWEZxJW8xQd2oOH2iQEvvs"
                    alt="Logo Resmi MPK"
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#111111] tracking-tight">
                    FORA
                  </span>
                  <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase tracking-widest font-extrabold text-[#5a3f47]">
                    YOUR VOICE MOVES
                  </span>
                </div>
              </div>

              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] max-w-sm font-medium leading-relaxed">
                Platform aspirasi digital terbuka dan independen dari Majelis Perwakilan Kelas untuk seluruh siswa aktif. Dari siswa, oleh siswa, untuk sekolah.
              </p>

              <div className="inline-block px-3 py-1.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111]">
                <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-bold text-[#111111]">
                  “Suaramu bukan cuma masuk form. Suaramu bergerak.”
                </span>
              </div>
            </div>

            {/* Middle Nav Links */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <h4 className="font-['Space_Grotesk'] text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#111111] mb-1 sm:mb-2 pb-1 border-b-[2px] border-[#111111] inline-block w-fit">
                Navigasi Cepat
              </h4>
              <ul className="flex flex-col gap-2 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="hover:underline text-[#111111] font-semibold text-left cursor-pointer"
                  >
                    Beranda Utama
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/aspirasi')}
                    className="hover:underline text-[#111111] font-semibold text-left cursor-pointer"
                  >
                    Semua Aspirasi Siswa
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/status')}
                    className="hover:underline text-[#111111] font-semibold text-left cursor-pointer"
                  >
                    Lacak Status & Pipeline
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/tentang')}
                    className="hover:underline text-[#111111] font-semibold text-left cursor-pointer"
                  >
                    Struktur & Peran MPK
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/kirim')}
                    className="hover:underline text-[#e01376] font-bold text-left cursor-pointer"
                  >
                    + Drop Your Voice (Kirim Form)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/admin')}
                    className="hover:underline text-[#5a3f47] font-semibold text-left cursor-pointer flex items-center gap-1"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>Panel Admin MPK</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Right Contact Channels */}
            <div className="md:col-span-4 flex flex-col gap-2.5 sm:gap-3">
              <h4 className="font-['Space_Grotesk'] text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#111111] mb-1 pb-1 border-b-[2px] border-[#111111] inline-block w-fit">
                Kanal Aspirasi & Konsultasi
              </h4>
              <p className="font-['Plus_Jakarta_Sans'] text-xs text-[#111111]/80 font-medium">
                Punya aspirasi mendesak atau ingin konsultasi tatap muka dengan perwakilan komisi kelasmu?
              </p>
              <div className="flex flex-col gap-2 mt-1">
                <div className="flex flex-wrap gap-2 sm:gap-2.5">
                  <a
                    href={MPK_INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-brutal flex items-center gap-1.5 sm:gap-2 px-3 py-2 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] font-['Space_Grotesk'] text-xs font-bold hover:bg-[#fde029] transition-colors cursor-pointer"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A30]" />
                    <span>{MPK_INSTAGRAM_HANDLE}</span>
                  </a>
                </div>
                <a
                  href={`mailto:${MPK_EMAIL}`}
                  className="btn-brutal inline-flex items-center gap-2 px-3 py-2 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] font-['Space_Grotesk'] text-xs font-bold hover:bg-[#ffd9e1] transition-colors cursor-pointer w-fit"
                >
                  <Mail className="w-4 h-4 text-[#111111]" />
                  <span>{MPK_EMAIL}</span>
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Legal / Copyright Strip */}
          <div className="pt-5 sm:pt-6 border-t-[2px] border-[#111111] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs text-[#5a3f47] uppercase font-bold tracking-wider">
              © 2026 FORA — Majelis Perwakilan Kelas. Built for students, by students.
            </span>
            <div className="flex items-center gap-3 font-['Space_Grotesk'] text-[11px] sm:text-xs uppercase font-extrabold tracking-wider">
              <button
                onClick={() => setModalType('privacy')}
                className="hover:underline text-[#111111] cursor-pointer"
              >
                Kebijakan Privasi
              </button>
              <span className="text-[#111111]">•</span>
              <button
                onClick={() => setModalType('ethics')}
                className="hover:underline text-[#111111] cursor-pointer"
              >
                Kode Etik Aspirasi
              </button>
              <span className="text-[#111111]">•</span>
              <button
                onClick={() => navigate('/admin')}
                className="hover:underline text-[#0051d5] font-black cursor-pointer"
              >
                Login Admin
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal for Privacy & Ethics */}
      {modalType && (
        <div className="fixed inset-0 z-[120] bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#FFFFFF] border-[3px] sm:border-[4px] border-[#111111] rounded-3xl p-5 sm:p-8 max-w-lg w-full shadow-[6px_6px_0px_#111111] sm:shadow-[10px_10px_0px_#111111] animate-[popModal_0.3s_ease-out_forwards] relative overflow-hidden mx-auto my-auto max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b-[2px] border-[#111111] mb-3 sm:mb-4">
              <span className="font-['Space_Grotesk'] text-base sm:text-lg font-extrabold uppercase">
                {modalType === 'privacy' ? 'KEBIJAKAN PRIVASI' : 'KODE ETIK ASPIRASI'}
              </span>
              <button
                onClick={() => setModalType(null)}
                className="p-1 hover:bg-[#fde029] border border-[#111111] rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm space-y-2.5 sm:space-y-3 max-h-[60vh] overflow-y-auto pr-2">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Hak Anonimitas:</strong> Siswa yang memilih fitur "Kirim sebagai Anonim" dijamin kerahasiaan identitasnya dari publik maupun guru.
                  </p>
                  <p>
                    <strong>2. Keamanan Data:</strong> Informasi tidak dibagikan kepada pihak komersial pihak ketiga. Data semata-mata digunakan untuk advokasi program sekolah.
                  </p>
                  <p>
                    <strong>3. Perlindungan Pelapor:</strong> MPK menjamin tidak ada tindakan intimidasi atau diskriminasi akademis atas suara yang disampaikan secara konstruktif.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Konstruktif & Solutif:</strong> Aspirasi sebaiknya tidak hanya mengkritik tetapi juga menyarankan solusi yang realistis.
                  </p>
                  <p>
                    <strong>2. Bahasa Santun:</strong> Dilarang menggunakan ujaran kebencian, fitnah, pencemaran nama baik personal, atau kata-kata kasar.
                  </p>
                  <p>
                    <strong>3. Kepentingan Bersama:</strong> Prioritaskan usulan yang membawa manfaat bagi kenyamanan belajar dan iklim demokratis sekolah.
                  </p>
                </>
              )}
            </div>

            <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t-[2px] border-[#111111] flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="btn-brutal px-5 sm:px-6 py-2 sm:py-2.5 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-extrabold uppercase shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] cursor-pointer"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
