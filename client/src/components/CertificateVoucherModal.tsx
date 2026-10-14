import React from 'react';
import {
  Printer,
  X,
  ShieldCheck,
  Award,
  CheckCircle2,
  Calendar,
  Building,
  Hash,
  ExternalLink,
} from 'lucide-react';
import { DiscountIncentive } from '../types';

interface CertificateVoucherModalProps {
  voucher: DiscountIncentive;
  onClose: () => void;
}

export const CertificateVoucherModal: React.FC<CertificateVoucherModalProps> = ({
  voucher,
  onClose,
}) => {
  const company = voucher.companyId;

  const handlePrint = () => {
    window.print();
  };

  const isPlatinum = voucher.tier === 'platinum';

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-slate-900 border border-emerald-500/30 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Modal Top Control Bar (Hidden in Print) */}
        <div className="no-print bg-slate-850 px-6 py-3.5 border-b border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-bold text-white">
              مشاهده و چاپ رسمی گواهینامه صنعت سبز و بن تخفیف عوارض آلایندگی
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-md transition-all"
            >
              <Printer className="w-4 h-4" />
              چاپ نسخه رسمی (PDF)
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div
          id="printable-certificate"
          className="p-8 sm:p-12 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 text-slate-100"
        >
          {/* Ornamental Golden/Emerald Border */}
          <div className="relative border-4 border-double border-amber-500/40 rounded-2xl p-8 sm:p-10 bg-slate-900/90 shadow-inner">
            {/* Corner Emblems */}
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400"></div>
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400"></div>

            {/* Header: Republic Emblem and Province Name */}
            <div className="text-center space-y-2">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-950/60 border border-emerald-500/40 shadow-lg mb-2">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-sm text-amber-300 font-medium tracking-wide">
                جمهوری اسلامی ایران
              </h2>
              <h3 className="text-base text-slate-300 font-semibold">
                سازمان حفاظت محیط زیست — اداره کل حفاظت محیط زیست استان زنجان
              </h3>
              <p className="text-xs text-slate-400">
                کارگروه استانی ارتقای فرهنگ حفاظت از محیط‌زیست (برنامه عمل مصوب ۱۴۰۴/۱۱/۱۹)
              </p>
              <div className="h-0.5 w-48 mx-auto bg-gradient-to-r from-transparent via-amber-400 to-transparent my-3"></div>
            </div>

            {/* Certificate Title Badge */}
            <div className="my-6 text-center">
              <span
                className={`inline-block px-6 py-2 rounded-xl text-base sm:text-lg font-bold border shadow-lg ${
                  isPlatinum
                    ? 'bg-gradient-to-r from-emerald-900/80 to-teal-900/80 text-emerald-200 border-emerald-400/50'
                    : 'bg-gradient-to-r from-amber-900/80 to-yellow-900/80 text-amber-200 border-amber-400/50'
                }`}
              >
                {voucher.certificateTitleFa}
              </span>
              <p className="mt-2 text-xs text-slate-400">
                شماره گواهی یکتا: <span className="font-mono text-amber-300 font-bold">{voucher.voucherNumber}</span>
              </p>
            </div>

            {/* Body Text */}
            <div className="space-y-4 text-justify text-sm leading-relaxed text-slate-200">
              <p>
                بدین‌وسیله گواهی می‌شود، بنگاه صنعتی / معدنی{' '}
                <span className="font-bold text-white underline decoration-emerald-400 underline-offset-4">
                  {company?.name}
                </span>{' '}
                به شناسه ملی <span className="font-mono font-bold text-amber-300">{company?.shenaseMelli}</span>،
                مستقر در شهرستان{' '}
                <span className="font-bold text-white">{company?.countyFa}</span> (
                {company?.industrialPark})، پس از ممیزی‌های کارشناسی میدانی، آزمایش‌های دوره‌ای کنترل
                فلزات سنگین، فیلتراسیون باطله‌ها، بازچرخانی منابع آب و ایفای تعهدات مسئولیت اجتماعی (CSR) در
                چارچوب برنامه عمل ارتقای فرهنگ حفاظت از محیط‌زیست استان زنجان، حائز رتبه عالی شناخته گردیده و
                مشمول بسته‌های حمایتی و معافیت‌های قانونی زیر اعلام می‌گردد:
              </p>

              {/* Incentive Highlights Box */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-5 bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-white">معافیت و تخفیف عوارض آلایندگی:</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      توصیه به بخشودگی و تخفیف {voucher.taxExemptionPercentage} درصدی عوارض موضوع ماده ۲۷ قانون مالیات
                      بر ارزش افزوده (عوارض سبز).
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-white">امتیاز ویژه سهمیه آب و انرژی:</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      تخفیف {voucher.waterQuotaDiscountPercentage} درصدی تعرفه آب بازچرخانی‌شده و پاداش کاهش بار آلودگی حوضه قزل‌اوزن.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-white">مسیر سبز صدور و تمدید پروانه‌ها:</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      تمدید سریع و اولویت‌دار پروانه بهره‌برداری زیست‌محیطی بدون نوبت‌دهی اداری.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-xs text-white">تالار افتخارات صنعت پاک استان:</span>
                    <p className="text-xs text-slate-300 mt-0.5">
                      معرفی به عنوان الگو در همایش‌های استانی، صداوسیمای مرکز زنجان و رسانه‌های ملی.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dates & Validity */}
              <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 border-t border-slate-800 pt-3">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-emerald-400" />
                  <span>تاریخ صدور: {voucher.issueDateJalali}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>مهلت اعتبار: {voucher.validUntilJalali}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Hash className="w-4 h-4 text-slate-400" />
                  <span>شناسه اصالت: {voucher.digitalVerificationHash.substring(0, 16)}...</span>
                </div>
              </div>
            </div>

            {/* Footer Signatures and QR Code */}
            <div className="mt-8 pt-6 border-t-2 border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              {/* Signatory 1 */}
              <div className="text-center sm:text-right space-y-1">
                <p className="text-xs font-semibold text-slate-200">
                  مدیرکل حفاظت محیط زیست استان زنجان
                </p>
                <p className="text-[11px] text-slate-400">و دبیر کارگروه استانی ارتقای فرهنگ محیط‌زیست</p>
                <div className="h-10 flex items-center justify-center sm:justify-start">
                  <span className="text-xs font-serif italic text-emerald-400">[محل امضا و مهر برجسته الکترونیک]</span>
                </div>
              </div>

              {/* Centered QR Code with Verification Details */}
              <div className="text-center flex flex-col items-center justify-center">
                <div className="p-2 bg-white rounded-xl shadow-lg border border-slate-300 inline-block">
                  <img
                    src={voucher.qrCodeDataUrl}
                    alt="QR Verification"
                    className="w-28 h-28 object-contain"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 font-mono">
                  اسکن جهت استعلام اصالت توسط ممیزان مالیاتی
                </span>
              </div>

              {/* Signatory 2 */}
              <div className="text-center sm:text-left space-y-1">
                <p className="text-xs font-semibold text-slate-200">
                  استاندار زنجان
                </p>
                <p className="text-[11px] text-slate-400">و رئیس کارگروه استانی ارتقای فرهنگ محیط‌زیست</p>
                <div className="h-10 flex items-center justify-center sm:justify-end">
                  <span className="text-xs font-serif italic text-amber-400">[تأیید نهایی استانداری زنجان]</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
