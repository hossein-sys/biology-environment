import React from 'react';
import {
  Printer,
  X,
  ShieldCheck,
  Award,
  CheckCircle2,
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
  const isPlatinum = voucher.tier === 'platinum';

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative w-full max-w-4xl bg-white border border-emerald-100 rounded-3xl shadow-2xl overflow-hidden my-8">
        {/* Top Control Bar (Hidden in Print) */}
        <div className="no-print bg-slate-50 px-6 py-3.5 border-b border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span className="text-sm font-bold text-slate-900">
              مشاهده و چاپ رسمی گواهینامه صنعت سبز و بن تخفیف عوارض آلایندگی
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              چاپ نسخه رسمی (PDF)
            </button>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-200/50 rounded-xl transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Certificate Frame */}
        <div
          id="printable-certificate"
          className="p-8 sm:p-12 bg-white text-slate-900"
        >
          {/* Ornamental Golden/Emerald Border */}
          <div className="relative border-4 border-double border-amber-400/80 rounded-2xl p-8 sm:p-10 bg-gradient-to-b from-emerald-50/20 via-white to-amber-50/20 shadow-xs">
            {/* Corner Emblems */}
            <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-500"></div>
            <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-500"></div>
            <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-500"></div>
            <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-500"></div>

            {/* Header: Republic Emblem and Province Name */}
            <div className="text-center space-y-2 border-b border-emerald-100 pb-5">
              <div className="inline-flex items-center justify-center p-3 rounded-full bg-emerald-50 border border-emerald-200 mb-1">
                <ShieldCheck className="w-10 h-10 text-emerald-700" />
              </div>
              <h2 className="text-xs text-amber-700 font-bold tracking-widest">
                جمهوری اسلامی ایران
              </h2>
              <h3 className="text-base text-emerald-950 font-black">
                سازمان حفاظت محیط زیست — اداره کل حفاظت محیط زیست استان زنجان
              </h3>
              <p className="text-xs text-slate-600">
                کارگروه استانی ارتقای فرهنگ حفاظت از محیط‌زیست و کنترل آلایندگی صنایع
              </p>
              <div className="text-[11px] text-slate-500 flex justify-center gap-4 pt-1 font-mono">
                <span>شماره سریال رسمی: <strong>{voucher.voucherNumber}</strong></span>
                <span>•</span>
                <span>تاریخ صدور: <strong>{voucher.issueDateJalali}</strong></span>
                <span>•</span>
                <span>اعتبار تا: <strong>{voucher.validUntilJalali}</strong></span>
              </div>
            </div>

            {/* Certificate Title Badge */}
            <div className="my-6 text-center">
              <span
                className={`inline-block px-8 py-2.5 rounded-2xl text-base sm:text-lg font-black border shadow-xs ${
                  isPlatinum
                    ? 'bg-emerald-50 text-emerald-900 border-emerald-300'
                    : 'bg-amber-50 text-amber-900 border-amber-300'
                }`}
              >
                {voucher.certificateTitleFa}
              </span>
            </div>

            {/* Certificate Body */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed text-justify px-2 sm:px-6">
              <p>
                بدینوسیله گواهی می‌شود که واحد صنعتی{' '}
                <strong className="text-emerald-950 font-black text-sm sm:text-base border-b-2 border-emerald-500 pb-0.5">
                  «{voucher.companyId.name}»
                </strong>{' '}
                دارای شناسه ملی{' '}
                <span className="font-mono text-emerald-800 font-bold">{voucher.companyId.shenaseMelli}</span>،
                مستقر در شهرستان{' '}
                <strong className="text-slate-900">{voucher.companyId.countyFa}</strong> ({voucher.companyId.industrialPark})،
                پس از انجام ممیزی‌های دقیق میدانی و راستی‌آزمایی اقدامات مدیریت پسماند باطله، بازچرخانی آب و کاهش آلایندگی هوا توسط هیئت بازرسان معتمد، موفق به احراز رتبه ممتاز زیست‌محیطی گردیده است.
              </p>

              <div className="p-4 rounded-xl bg-emerald-50/80 border border-emerald-200 space-y-2">
                <div className="font-bold text-emerald-900 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  حکم معافیت قانونی موضوع ماده ۲۷ قانون مالیات بر ارزش افزوده:
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  واحد مذکور به استناد مفاد ماده ۲۷ قانون مالیات بر ارزش افزوده و تبصره ۲ ماده ۶ قانون هوای پاک، مشمول{' '}
                  <strong className="text-emerald-900 font-black text-sm">
                    {voucher.taxExemptionPercentage}٪ معافیت و تخفیف کامل در عوارض آلایندگی
                  </strong>{' '}
                  برای دوره زمانی ۱۴۰۵ الی ۱۴۰۶ می‌باشد.
                </p>
              </div>
            </div>

            {/* Bottom Signatures and QR Code */}
            <div className="pt-6 border-t border-emerald-100 grid grid-cols-1 sm:grid-cols-3 gap-6 items-center">
              <div className="flex flex-col items-center sm:items-start space-y-1">
                <div className="p-2 bg-white rounded-xl border border-slate-200 shadow-2xs">
                  <img
                    src={voucher.qrCodeDataUrl}
                    alt="QR Code"
                    className="w-20 h-20"
                  />
                </div>
                <span className="text-[10px] text-slate-500 font-mono mt-1">
                  کد اصالت: {voucher.digitalVerificationHash}
                </span>
                <span className="text-[10px] text-emerald-700 font-semibold">استعلام برخط در سامانه</span>
              </div>

              <div className="text-center">
                <div className="inline-block p-4 rounded-full border-2 border-dashed border-amber-500/80 bg-amber-50/50">
                  <div className="text-[11px] font-black text-amber-900">مهر دبیرخانه استانی</div>
                  <div className="text-[10px] text-slate-600 mt-0.5">صنعت سبز سال ۱۴۰۵</div>
                  <div className="text-[9px] text-emerald-700 font-bold mt-1">✓ اصالت تایید شد</div>
                </div>
              </div>

              <div className="text-center sm:text-left space-y-1">
                <p className="text-xs font-bold text-slate-900">{voucher.signatoryTitle}</p>
                <p className="text-[11px] text-slate-600">{voucher.issuedBy}</p>
                <div className="text-emerald-700 font-script text-sm font-bold pt-1">
                  امضای دیجیتال و مهر رسمی
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
