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
      {/* Top Banner (Hidden in Print) */}
      <div className="no-print rounded-3xl bg-white border border-emerald-100 p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold border border-amber-200">
                مشوق‌های قانونی ماده ۲۷ قانون مالیات بر ارزش افزوده
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              گواهینامه‌های رسمی صنعت سبز و بن‌های تخفیف عوارض آلایندگی
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 max-w-2xl mt-1">
              صدور رسمی احکام معافیت مالیاتی و سهمیه‌های تشویقی آب و توسعه برای واحدهای حائز رتبه طلا و پلاتین استان زنجان.
            </p>
          </div>

          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-600/20 transition-all hover:scale-102 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            چاپ گواهینامه رسمی (PDF)
          </button>
        </div>
      </div>

      {/* Unlocked Benefits Showcase */}
      <div className="no-print grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-emerald-200/80 shadow-xs space-y-2">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-700 w-fit">
            <TrendingDown className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
            مزیت اصلی مالیاتی
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            معافیت ۵۰٪ تا ۱۰۰٪ عوارض آلایندگی
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            موضوع ماده ۲۷ قانون مالیات بر ارزش افزوده و تبصره ۲ ماده ۶ قانون هوای پاک مصوب مجلس شورای اسلامی.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-cyan-200/80 shadow-xs space-y-2">
          <div className="p-2.5 rounded-xl bg-cyan-50 text-cyan-700 w-fit">
            <Droplets className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-50 text-cyan-800 border border-cyan-200">
            سهمیه تشویقی
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            تا ۴۰٪ تخفیف انشعاب و پساب صنعتی
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            تسهیل در تخصیص پساب تصفیه شده جهت خنک‌کاری و اولویت در طرح‌های بازچرخانی شهرک‌های صنعتی استان.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-amber-200/80 shadow-xs space-y-2">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 w-fit">
            <Zap className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200">
            مسیر سبز صمت
          </span>
          <h4 className="text-sm font-bold text-slate-900">
            اولویت در تمدید پروانه‌های صنعتی
          </h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            صدور بدون نوبت استعلامات زیست‌محیطی و موافقت‌نامه‌های توسعه خطوط تولید در سازمان صمت استان زنجان.
          </p>
        </div>
      </div>

      {/* Voucher Selector if multiple */}
      {vouchers.length > 1 && (
        <div className="no-print flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-bold">انتخاب گواهی واحد صنعتی:</span>
          {vouchers.map((v) => (
            <button
              key={v._id}
              onClick={() => setSelectedVoucherId(v._id)}
              className={`px-3 py-1.5 rounded-xl transition-all font-semibold ${
                selectedVoucher?._id === v._id
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {v.companyId.name} ({v.voucherNumber})
            </button>
          ))}
        </div>
      )}

      {/* Official Printable Certificate */}
      {selectedVoucher ? (
        <div
          id="printable-certificate"
          className="rounded-3xl border-4 border-double border-amber-400/80 bg-white p-8 sm:p-12 shadow-md relative overflow-hidden"
        >
          {/* Subtle Watermark Seal */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none">
            <ShieldCheck className="w-[450px] h-[450px] text-emerald-950" />
          </div>

          {/* Inner Golden/Emerald Frame */}
          <div className="relative border-2 border-emerald-600/30 rounded-2xl p-6 sm:p-10 space-y-6 bg-gradient-to-b from-emerald-50/20 via-white to-amber-50/20">
            {/* Header: Republic Emblem and Province Name */}
            <div className="text-center space-y-2 border-b border-emerald-100 pb-6">
              <div className="inline-flex p-3 rounded-full bg-emerald-50 border border-emerald-200 mb-1">
                <ShieldCheck className="w-10 h-10 text-emerald-700" />
              </div>
              <h2 className="text-xs text-amber-700 font-bold tracking-widest">
                جمهوری اسلامی ایران
              </h2>
              <h1 className="text-lg sm:text-xl font-black text-emerald-950">
                سازمان حفاظت محیط زیست — اداره کل حفاظت محیط زیست استان زنجان
              </h1>
              <p className="text-xs text-slate-600 font-medium">
                کارگروه استانی ارتقای فرهنگ حفاظت محیط‌زیست و پایش عملکرد صنایع
              </p>
              <div className="text-[11px] text-slate-500 flex justify-center gap-4 pt-1 font-mono">
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
                className={`inline-block px-8 py-2.5 rounded-2xl text-base sm:text-lg font-black border shadow-xs ${
                  selectedVoucher.tier === 'platinum'
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-amber-50 text-amber-900 border-amber-300'
                }`}
              >
                {selectedVoucher.certificateTitleFa}
              </span>
            </div>

            {/* Certificate Body Text */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify px-2 sm:px-6">
              <p>
                بدینوسیله گواهی می‌شود که واحد صنعتی{' '}
                <strong className="text-emerald-950 font-black text-sm sm:text-base border-b-2 border-emerald-500 pb-0.5">
                  «{selectedVoucher.companyId.name}»
                </strong>{' '}
                دارای شناسه ملی{' '}
                <span className="font-mono text-emerald-800 font-bold">{selectedVoucher.companyId.shenaseMelli}</span>،
                مستقر در شهرستان{' '}
                <strong className="text-slate-900">{selectedVoucher.companyId.countyFa}</strong> ({selectedVoucher.companyId.industrialPark})،
                پس از انجام ممیزی‌های دقیق میدانی و راستی‌آزمایی اقدامات مدیریت پسماند باطله، بازچرخانی آب و کاهش آلایندگی هوا توسط هیئت بازرسان معتمد، موفق به احراز رتبه ممتاز زیست‌محیطی گردیده است.
              </p>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  حکم معافیت قانونی موضوع ماده ۲۷ قانون مالیات بر ارزش افزوده:
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  واحد صنعتی مذکور به استناد ماده ۲۷ قانون مالیات بر ارزش افزوده و تبصره ۲ ماده ۶ قانون هوای پاک، مشمول{' '}
                  <strong className="text-emerald-900 font-black text-sm">
                    {selectedVoucher.taxExemptionPercentage}٪ معافیت و تخفیف کامل در عوارض آلایندگی
                  </strong>{' '}
                  برای سال مالی ۱۴۰۵ می‌باشد. کلیه ممیزان امور مالیاتی و دستگاه‌های اجرایی مکلف به اعمال این معافیت می‌باشند.
                </p>
              </div>
            </div>

            {/* Bottom Signatures and QR Code Verification */}
            <div className="pt-6 border-t border-emerald-100 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              {/* QR Code */}
              <div className="flex flex-col items-center sm:items-start space-y-1">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <img
                    src={selectedVoucher.qrCodeDataUrl}
                    alt="QR Verification"
                    className="w-22 h-22"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1">
                  کد اصالت دیجیتال: {selectedVoucher.digitalVerificationHash}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">استعلام برخط در سامانه</span>
              </div>

              {/* Watermark Seal Badge */}
              <div className="text-center">
                <div className="inline-block p-4 rounded-full border-2 border-dashed border-amber-500/80 bg-amber-50/50">
                  <div className="text-[11px] font-black text-amber-900">مهر دبیرخانه استانی</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">صنعت سبز سال ۱۴۰۵</div>
                  <div className="text-[9px] text-emerald-700 font-bold mt-1">✓ اصالت تایید شد</div>
                </div>
              </div>

              {/* Official Signatory */}
              <div className="text-center sm:text-left space-y-1">
                <p className="text-xs font-bold text-slate-900">{selectedVoucher.signatoryTitle}</p>
                <p className="text-[11px] text-slate-600">{selectedVoucher.issuedBy}</p>
                <div className="text-emerald-700 font-script text-sm font-bold pt-1">
                  امضای دیجیتال و مهر رسمی
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="p-12 text-center text-slate-400 bg-white rounded-3xl border border-slate-200">
          <Award className="w-12 h-12 mx-auto text-slate-300 mb-2" />
          <p>هنوز گواهینامه‌ای صادر نشده است.</p>
        </div>
      )}
    </div>
  );
};
