import React from 'react';

export const TransparencySection: React.FC = () => {
  return (
    <section id="pipeline" className="w-full bg-[#ffe340]/30 border-y-[3px] border-[#111111] py-12 sm:py-16 md:py-24">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <div className="inline-block px-3 sm:px-4 py-1 sm:py-1.5 bg-[#FFFFFF] border-[2px] border-[#111111] rounded-full font-['Space_Grotesk'] text-[10px] sm:text-xs uppercase font-black shadow-[2px_2px_0px_#111111] sm:shadow-[3px_3px_0px_#111111] mb-2 sm:mb-3">
            MEKANISME KERJA MPK
          </div>
          <h2 className="font-['Space_Grotesk'] text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-[#111111] uppercase tracking-tight">
            BIAR NGGAK CUMA<br />
            MASUK FORM.
          </h2>
          <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-base md:text-lg text-[#111111] font-medium mt-2 sm:mt-4">
            Inilah peta jalan bagaimana suaramu diolah dari ketikan layar HP sampai menjadi keputusan nyata di meja pimpinan sekolah.
          </p>
        </div>

        {/* 4 Stepped Brutalist Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {/* Step 1 */}
          <div className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] p-5 sm:p-6 rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl text-[#0ea5e9] font-black leading-none mb-3 sm:mb-4">
                01
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black uppercase text-[#111111] mb-2">
                DIDENGAR
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium leading-relaxed">
                Setiap aspirasi masuk dan dicatat. Otomatis menerima tiket unik tracking publik dan diverifikasi oleh Komisi 3 (KOASITER).
              </p>
            </div>
            <div className="mt-4 sm:mt-6 pt-3 border-t-[2px] border-dashed border-[#111111] flex items-center justify-between font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-extrabold uppercase">
              <span>Sistem Logging</span>
              <span className="text-[#21D99A] font-black">Instan Real-time</span>
            </div>
          </div>

          {/* Step 2 */}
          <div className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] p-5 sm:p-6 rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl text-[#316bf3] font-black leading-none mb-3 sm:mb-4">
                02
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black uppercase text-[#111111] mb-2">
                DIBAHAS
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium leading-relaxed">
                Aspirasi yang relevan dibawa ke pembahasan. Dibedah dalam Rapat Dengar Pendapat mingguan bersama komisi dan perwakilan OSIS.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 pt-3 border-t-[2px] border-dashed border-[#111111] flex items-center justify-between font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-extrabold uppercase">
              <span>Sidang Pleno</span>
              <span className="text-[#111111] font-black">Rabu Tiap Pekan</span>
            </div>
          </div>

          {/* Step 3 */}
          <div className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] p-5 sm:p-6 rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl text-[#FF7A30] font-black leading-none mb-3 sm:mb-4">
                03
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black uppercase text-[#111111] mb-2">
                DITINDAKLANJUTI
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium leading-relaxed">
                Perkembangan dicatat dan diperbarui. MPK menyerahkan nota dinas advokasi serta audiensi tatap muka bersama Kepala Sekolah.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 pt-3 border-t-[2px] border-dashed border-[#111111] flex items-center justify-between font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-extrabold uppercase">
              <span>Audiensi Resmi</span>
              <span className="text-[#FF7A30] font-black">Nota Advokasi</span>
            </div>
          </div>

          {/* Step 4 */}
          <div className="card-brutal-hover bg-[#FFFFFF] border-[2.5px] sm:border-[3px] border-[#111111] p-5 sm:p-6 rounded-3xl shadow-[4px_4px_0px_#111111] sm:shadow-[6px_6px_0px_#111111] flex flex-col justify-between">
            <div>
              <div className="font-['Space_Grotesk'] text-4xl sm:text-5xl md:text-6xl text-[#21D99A] font-black leading-none mb-3 sm:mb-4">
                04
              </div>
              <h3 className="font-['Space_Grotesk'] text-lg sm:text-xl font-black uppercase text-[#111111] mb-2">
                DIINFORMASIKAN
              </h3>
              <p className="font-['Plus_Jakarta_Sans'] text-xs sm:text-sm text-[#111111]/80 font-medium leading-relaxed">
                Siswa dapat melihat respons atau hasilnya secara terbuka di portal FORA, mading sekolah, dan Instagram resmi MPK.
              </p>
            </div>
            <div className="mt-4 sm:mt-6 pt-3 border-t-[2px] border-dashed border-[#111111] flex items-center justify-between font-['Space_Grotesk'] text-[10px] sm:text-[11px] font-extrabold uppercase">
              <span>Transparansi</span>
              <span className="text-[#21D99A] font-black">100% Terbuka</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
