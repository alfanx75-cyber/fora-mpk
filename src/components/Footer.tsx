import React, { useState } from 'react';
import { useAspirations } from '../context/AspirationContext';
import { MPK_INSTAGRAM_URL, MPK_INSTAGRAM_HANDLE, MPK_EMAIL, SCHOOL_LOGO, SCHOOL_NAME } from '../data/mockData';
import { Mail, Shield, QrCode } from 'lucide-react';
import { QrCodeModal } from './QrCodeModal';

export const Footer: React.FC = () => {
  const { navigate } = useAspirations();
  const [modalType, setModalType] = useState<'privacy' | 'ethics' | null>(null);
  const [qrModalOpen, setQrModalOpen] = useState(false);

  return (
    <>
      <footer className="w-full bg-[#FCFBF5] border-t-[3px] border-[#111111] mt-auto pb-24 md:pb-12">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8 py-10 sm:py-12 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 mb-8 sm:mb-10">
            {/* Left Brand Column */}
            <div className="md:col-span-5 flex flex-col items-start gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-[#FFFFFF] border-[2px] border-[#111111] p-0.5 shadow-[2px_2px_0px_#111111] flex items-center justify-center hover:rotate-6 transition-transform">
                  <img
                    src={SCHOOL_LOGO}
                    alt={`Logo Resmi ${SCHOOL_NAME}`}
                    className="w-full h-full object-cover rounded-lg"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex flex-col">
                  <span className="font-['Space_Grotesk'] text-xl sm:text-2xl font-black text-[#111111] tracking-tight">
                    FORA
                  </span>
                  <span className="font-['Space_Grotesk'] text-[10px] sm:text-[11px] uppercase tracking-wider font-extrabold text-[#5a3f47]">
                    {SCHOOL_NAME}
                  </span>
                </div>
              </div>

              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111] max-w-sm font-medium leading-relaxed">
                Ruang aspirasi siswa kepada MPK. Kirim aspirasi secara anonim dan pantau status tindak lanjutnya secara privat.
              </p>

              <div className="inline-block px-3 py-1.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111]">
                <span className="font-['Space_Grotesk'] text-[11px] sm:text-xs font-bold text-[#111111]">
                  “Suaramu bukan cuma masuk form, suaramu bergerak.”
                </span>
              </div>
            </div>

            {/* Middle Nav Links */}
            <div className="md:col-span-3 flex flex-col gap-2">
              <h4 className="font-['Space_Grotesk'] text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#111111] mb-1 pb-1 border-b-[2px] border-[#111111] inline-block w-fit">
                Navigasi Cepat
              </h4>
              <ul className="flex flex-col gap-2 font-['Plus_Jakarta_Sans'] text-xs sm:text-sm">
                <li>
                  <button
                    onClick={() => navigate('/')}
                    className="hover:underline text-[#111111] font-semibold text-left cursor-pointer"
                  >
                    Beranda
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/kirim')}
                    className="hover:underline text-[#e01376] font-bold text-left cursor-pointer"
                  >
                    + Kirim Aspirasi
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/status')}
                    className="hover:underline text-[#111111] font-semibold text-left cursor-pointer"
                  >
                    Lacak Status Privat
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => navigate('/tentang')}
                    className="hover:underline text-[#111111] font-semibold text-left cursor-pointer"
                  >
                    Tentang MPK
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setQrModalOpen(true)}
                    className="hover:underline text-[#111111] font-semibold text-left cursor-pointer flex items-center gap-1.5"
                  >
                    <QrCode className="w-3.5 h-3.5 text-[#e01376]" />
                    <span>QR Code Domain Web</span>
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
            <div className="md:col-span-4 flex flex-col gap-2.5">
              <h4 className="font-['Space_Grotesk'] text-xs sm:text-sm uppercase tracking-wider font-extrabold text-[#111111] mb-1 pb-1 border-b-[2px] border-[#111111] inline-block w-fit">
                Kanal Resmi MPK
              </h4>
              <div className="flex flex-col gap-2 mt-1">
                <a
                  href={MPK_INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-brutal inline-flex items-center gap-2 px-3 py-2 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-xl shadow-[2px_2px_0px_#111111] font-['Space_Grotesk'] text-xs font-bold hover:bg-[#fde029] transition-colors cursor-pointer w-fit"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A30]" />
                  <span>{MPK_INSTAGRAM_HANDLE}</span>
                </a>
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

          {/* Bottom Strip */}
          <div className="pt-5 border-t-[2px] border-[#111111] flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
            <span className="font-['Space_Grotesk'] text-[11px] text-[#5a3f47] uppercase font-bold tracking-wider">
              © 2026 FORA · MPK {SCHOOL_NAME}. Seluruh aspirasi siswa terlindungi secara privat.
            </span>
            <div className="flex items-center gap-3 font-['Space_Grotesk'] text-[11px] uppercase font-extrabold tracking-wider">
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
          <div className="bg-[#FFFFFF] border-[3px] border-[#111111] rounded-3xl p-5 sm:p-7 max-w-lg w-full shadow-[8px_8px_0px_#111111] animate-[popModal_0.25s_ease-out_forwards] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b-[2px] border-[#111111] mb-3">
              <span className="font-['Space_Grotesk'] text-base font-extrabold uppercase">
                {modalType === 'privacy' ? 'KEBIJAKAN PRIVASI FORA' : 'KODE ETIK ASPIRASI'}
              </span>
              <button
                onClick={() => setModalType(null)}
                className="p-1 hover:bg-[#fde029] border border-[#111111] rounded-lg transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined text-lg">close</span>
              </button>
            </div>

            <div className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm space-y-2.5 max-h-[60vh] overflow-y-auto pr-1">
              {modalType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Kerahasiaan Penuh:</strong> Pengirim tidak diwajibkan mencantumkan nama, NIS/NISN, nomor telepon, atau email.
                  </p>
                  <p>
                    <strong>2. Akses Terbatas Admin:</strong> Isi aspirasi dan lampiran hanya dapat dibaca oleh pengurus MPK berwenang untuk tujuan tindak lanjut dan audiensi sekolah.
                  </p>
                  <p>
                    <strong>3. Pelacakan Privat:</strong> Pengirim memantau status secara mandiri menggunakan kombinasi Nomor Referensi dan Kode Akses Rahasia.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Konstruktif:</strong> Sampaikan usulan atau kritik dengan bahasa santun demi kenyamanan dan kemajuan bersama.
                  </p>
                  <p>
                    <strong>2. Tanpa Ujaran Kebencian:</strong> Dilarang melakukan fitnah, pencemaran nama baik personal, atau menyerang individu.
                  </p>
                  <p>
                    <strong>3. Akurasi Informasi:</strong> Pastikan informasi fasilitas atau kejadian yang dilaporkan sesuai kondisi riil di lingkungan sekolah.
                  </p>
                </>
              )}
            </div>

            <div className="mt-5 pt-3 border-t-[2px] border-[#111111] flex justify-end">
              <button
                onClick={() => setModalType(null)}
                className="btn-brutal px-5 py-2 bg-[#fde029] border-[2px] border-[#111111] rounded-xl font-['Space_Grotesk'] text-xs font-extrabold uppercase shadow-[2px_2px_0px_#111111] cursor-pointer"
              >
                Saya Mengerti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Direct QR Code Modal */}
      <QrCodeModal isOpen={qrModalOpen} onClose={() => setQrModalOpen(false)} />
    </>
  );
};
