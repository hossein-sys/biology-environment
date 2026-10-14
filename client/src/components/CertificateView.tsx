import React, { useState } from 'react';
import {
  Printer,
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Building,
  Hash,
  Sparkles,
  QrCode,
  Droplets,
  Zap,
  TrendingDown,
  ExternalLink,
} from 'lucide-react';
import { DiscountIncentive, Company } from '../types';

interface CertificateViewProps {
  vouchers: DiscountIncentive[];
  companies: Company[];
  selectedCompanyId: string;
}

export const CertificateView: React.FC<CertificateViewProps> = ({
  vouchers,
  companies,
  selectedCompanyId,
}) => {
  const [selectedVoucherId, setSelectedVoucherId] = useState<string>(
    vouchers[0]?._id || ''
  );

  const selectedVoucher =
    vouchers.find((v) => v._id === selectedVoucherId) || vouchers[0];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="no-print rounded-3xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 p-6 sm:p-8 border border-emerald-500/30 shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                مشوق‌های قانونی ماده ۲۷ قانون مالیات بر ارزش افزوده
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              گواهینامه‌های رسمی صنعت سبز و بن‌های تخفیف عوارض آلایندگی
            </h2>
            <p className="text-xs text-slate-300 max-w-2xl mt-1">
              صدور رسمی معافیت‌های مالیاتی و سهمیه‌های تشویقی آب و توسعه برای واحدهای حائز رتبه طلا و پلاتین استان زنجان.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xl shadow-emerald-950 transition-all hover:scale-105"
          >
            <Printer className="w-4 h-4" />
            چاپ رسمی تک‌صفحه‌ای گواهی (PDF)
          </button>
        </div>
      </div>

      {/* 1. Discount Vouchers Showcase (3 Benefit Cards) */}
      <div className="no-print space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-amber-400" />
          بسته جامع مزایای احراز صلاحیت صنعت سبز (سند اجرایی ۱۴۰۵)
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Card 1: Tax Exemption */}
          <div className="rounded-2xl border border-emerald-500/40 p-5 bg-gradient-to-br from-slate-900 to-emerald-950/30 shadow-lg">
            <div className="p-3 rounded-xl bg-emerald-500/20 text-emerald-300 w-fit mb-3">
              <TrendingDown className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-emerald-400">مزیت اصلی</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                ۵۰٪ تا ۱۰۰٪ معافیت
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">
              تخفیف عوارض آلایندگی (ماده ۲۷ مالیات بر ارزش افزوده)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              واحدهای صنعتی با رتبه پلاتین از معافیت کامل ۱۰۰٪ و واحدهای طلا از تخفیف ۵۰٪ در پرداخت عوارض سبز بهره‌مند می‌گردند.
            </p>
          </div>

          {/* Card 2: Water Quota */}
          <div className="rounded-2xl border border-cyan-500/40 p-5 bg-gradient-to-br from-slate-900 to-cyan-950/30 shadow-lg">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-300 w-fit mb-3">
              <Droplets className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-cyan-400">سهمیه تشویقی</span>
              <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold">
                تا ۴۰٪ تخفیف تعرفه
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">
              سهمیه تشویقی انشعاب آب صنعتی و بازچرخانی
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              تسهیل در تخصیص پساب تصفیه‌شده، کاهش تعرفه آب بها در شهرک‌های صنعتی استان و اولویت در اتصال خطوط بازچرخانی.
            </p>
          </div>

          {/* Card 3: Fast Track Permit */}
          <div className="rounded-2xl border border-amber-500/40 p-5 bg-gradient-to-br from-slate-900 to-amber-950/30 shadow-lg">
            <div className="p-3 rounded-xl bg-amber-500/20 text-amber-300 w-fit mb-3">
              <Zap className="w-6 h-6" />
            </div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-amber-400">تسهیلات ویژه</span>
              <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                مسیر سبز استعلامات
              </span>
            </div>
            <h4 className="text-sm font-bold text-white mb-2">
              اولویت تمدید پروانه و خطوط توسعه صنایع
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              صدور موافقت‌های اصولی و تمدید پروانه‌های بهره‌برداری سازمان صمت بدون نوبت اداری و با تاییدیه ویژه محیط‌زیست.
            </p>
          </div>
        </div>
      </div>

      {/* Voucher Selector if multiple */}
      {vouchers.length > 1 && (
        <div className="no-print flex items-center gap-2 text-xs">
          <span className="text-slate-400">انتخاب گواهینامه برای نمایش:</span>
          {vouchers.map((v) => (
            <button
              key={v._id}
              onClick={() => setSelectedVoucherId(v._id)}
              className={`px-3 py-1.5 rounded-xl transition-all ${
                selectedVoucher?._id === v._id
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {v.companyId.name} ({v.voucherNumber})
            </button>
          ))}
        </div>
      )}

      {/* 2. Formal Printable Green Industry Certificate */}
      {selectedVoucher ? (
        <div
          id="printable-certificate"
          className="rounded-3xl border-4 border-double border-amber-500/40 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 p-8 sm:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Watermark Seal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none select-none">
            <ShieldCheck className="w-[500px] h-[500px] text-white" />
          </div>

          {/* Ornamental Inner Frame */}
          <div className="relative border-2 border-amber-500/30 rounded-2xl p-6 sm:p-10 space-y-6">
            {/* Top Official Letterhead */}
            <div className="text-center space-y-2 border-b border-amber-500/20 pb-6">
              <div className="inline-flex p-3 rounded-full bg-emerald-950/80 border border-emerald-500/40 mb-1">
                <ShieldCheck className="w-10 h-10 text-emerald-400" />
              </div>
              <h2 className="text-xs text-amber-300 font-bold tracking-widest">
                جمهوری اسلامی ایران
              </h2>
              <h1 className="text-lg sm:text-xl font-black text-white">
                سازمان حفاظت محیط زیست — اداره کل حفاظت محیط زیست استان زنجان
              </h1>
              <p className="text-xs text-slate-300 font-medium">
                کارگروه استانی ارتقای فرهنگ حفاظت محیط‌زیست و پایش عملکرد صنایع
              </p>
              <div className="text-[11px] text-slate-400 flex justify-center gap-4 pt-1 font-mono">
                <span>شماره سریال رسمی: <strong>{selectedVoucher.voucherNumber}</strong></span>
                <span>•</span>
                <span>تاریخ صدور: <strong>{selectedVoucher.issueDateJalali}</strong></span>
                <span>•</span>
                <span>اعتبار تا: <strong>{selectedVoucher.validUntilJalali}</strong></span>
              </div>
            </div>

            {/* Certificate Title Badge */}
            <div className="text-center my-4">
              <span
                className={`inline-block px-8 py-2.5 rounded-2xl text-base sm:text-lg font-black border shadow-xl ${
                  selectedVoucher.tier === 'platinum'
                    ? 'bg-gradient-to-r from-emerald-900/90 to-teal-900/90 text-emerald-200 border-emerald-400/60'
                    : 'bg-gradient-to-r from-amber-900/90 to-yellow-900/90 text-amber-200 border-amber-400/60'
                }`}
              >
                {selectedVoucher.certificateTitleFa}
              </span>
            </div>

            {/* Certificate Body Text */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-200 leading-relaxed text-justify px-2 sm:px-6">
              <p>
                بدینوسیله گواهی می‌شود که واحد صنعتی{' '}
                <strong className="text-white font-bold text-sm sm:text-base border-b border-emerald-400 pb-0.5">
                  «{selectedVoucher.companyId.name}»
                </strong>{' '}
                دارای شناسه ملی{' '}
                <span className="font-mono text-emerald-300 font-bold">{selectedVoucher.companyId.shenaseMelli}</span>،
                مستقر در شهرستان{' '}
                <strong className="text-white">{selectedVoucher.companyId.countyFa}</strong> ({selectedVoucher.companyId.industrialPark})،
                پس از انجام ممیزی‌های دقیق میدانی و راستی‌آزمایی مستندات خوداظهاری توسط هیئت بازرسان معتمد اداره کل، موفق به احراز رتبه ممتاز زیست‌محیطی گردیده است.
              </p>

              <div className="p-4 rounded-xl bg-slate-800/80 border border-emerald-500/30 space-y-2">
                <div className="font-bold text-emerald-300 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  حکم معافیت قانونی موضوع ماده ۲۷ قانون مالیات بر ارزش افزوده:
                </div>
                <p className="text-xs text-slate-300">
                  واحد مذکور به استناد مفاد ماده ۲۷ قانون مالیات بر ارزش افزوده، مصوبات کارگروه فرهنگ عمومی و شیوه نامه تشویق صنایع پاک استان زنجان، مشمول{' '}
                  <strong className="text-amber-300 font-bold text-sm">
                    {selectedVoucher.taxExemptionPercentage}٪ معافیت و تخفیف کامل در عوارض آلایندگی
                  </strong>{' '}
                  برای دوره زمانی ۱۴۰۵ الی ۱۴۰۶ می‌باشد.
                </p>
              </div>
            </div>

            {/* Bottom Signatures and QR Code Verification */}
            <div className="pt-6 border-t border-amber-500/20 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              {/* QR Code */}
              <div className="flex flex-col items-center sm:items-start space-y-1">
                <div className="p-2 bg-white rounded-xl shadow-md">
                  <img
                    src={selectedVoucher.qrCodeDataUrl}
                    alt="QR Verification"
                    className="w-24 h-24"
                  />
                </div>
                <span className="text-[10px] text-slate-400 font-mono mt-1">
                  کد اصالت: {selectedVoucher.digitalVerificationHash}
                </span>
                <span className="text-[10px] text-emerald-400">استعلام برخط در سامانه</span>
              </div>

              {/* Watermark Seal Badge */}
              <div className="text-center">
                <div className="inline-block p-4 rounded-full border-2 border-dashed border-amber-400/60 bg-amber-950/20">
                  <div className="text-[11px] font-black text-amber-300">مهر دبیرخانه استانی</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">صنعت سبز سال ۱۴۰۵</div>
                  <div className="text-[9px] text-emerald-400 font-bold mt-1">✓ اصالت تایید شد</div>
                </div>
              </div>

              {/* Official Signatory */}
              <div className="text-center sm:text-left space-y-1">
                <p className="text-xs font-bold text-white">{selectedVoucher.signatoryTitle}</p>
                <p className="text-[11px] text-slate-300">{selectedVoucher.issuedBy}</p>
                <div className="text-emerald-400 font-script text-sm font-bold pt-1">
                  امضای دیجیتال و مهر رسمی
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400">
          <Award className="w-12 h-12 mx-auto text-slate-600 mb-2" />
          <p>هنوز گواهینامه‌ای صادر نشده است.</p>
        </div>
      )}
    </div>
  );
};
