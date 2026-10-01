import React, { useState } from 'react';
import {
  Bike,
  Car,
  MapPin,
  Navigation,
  Clock,
  DollarSign,
  ShieldCheck,
  Users,
  X,
  Phone,
  ArrowRight,
  AlertTriangle,
  Send,
  CheckCircle2,
  Calendar,
  Sparkles,
  Zap,
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { formatVnd } from '../types';
import { useGigMe } from '../context/GigMeContext';

interface CampusRideModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGigCreated?: (gigId: string) => void;
}

export const CampusRideModal: React.FC<CampusRideModalProps> = ({
  isOpen,
  onClose,
  onGigCreated,
}) => {
  const { currentUser, postGig, showNotification } = useGigMe();

  const [rideType, setRideType] = useState<'CAMPUS_RIDE' | 'CARPOOL_HOME' | 'CARGO_BIKE'>('CAMPUS_RIDE');
  const [pickupPoint, setPickupPoint] = useState<string>('KTX Sinh Viên');
  const [dropoffPoint, setDropoffPoint] = useState<string>('');
  const [ridePrice, setRidePrice] = useState<number>(15000);
  const [departureTime, setDepartureTime] = useState<string>('Ngay bây giờ (Càng sớm càng tốt)');
  const [note, setNote] = useState<string>('');
  const [seatsNeeded, setSeatsNeeded] = useState<number>(1);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [hasHelmet, setHasHelmet] = useState<boolean>(true);

  if (!isOpen) return null;

  // Preset destinations around common campuses
  const PRESET_DESTINATIONS = [
    { label: 'Cơ sở chính trường học', price: 15000 },
    { label: 'Trạm xe buýt / Ga Metro', price: 12000 },
    { label: 'Thư viện trung tâm', price: 10000 },
    { label: 'Siêu thị / Chợ sinh viên', price: 18000 },
    { label: 'Bến xe Miền Đông / Mỹ Đình', price: 45000 },
  ];

  // Preset carpooling routes home
  const PRESET_CARPOOL_ROUTES = [
    { from: 'Hà Nội', to: 'Nam Định / Thái Bình', price: 60000 },
    { from: 'Hà Nội', to: 'Hải Phòng / Hải Dương', price: 65000 },
    { from: 'Hà Nội', to: 'Bắc Ninh / Bắc Giang', price: 45000 },
    { from: 'TP.HCM', to: 'Biên Hòa / Đồng Nai', price: 40000 },
    { from: 'TP.HCM', to: 'Bình Dương / Thủ Dầu Một', price: 40000 },
    { from: 'TP.HCM', to: 'Bà Rịa - Vũng Tàu', price: 80000 },
    { from: 'TP.HCM', to: 'Tiền Giang / Bến Tre', price: 75000 },
  ];

  const handleSelectPresetDestination = (dest: { label: string; price: number }) => {
    triggerHaptic('light');
    setDropoffPoint(dest.label);
    setRidePrice(dest.price);
  };

  const handleSelectCarpoolRoute = (route: { from: string; to: string; price: number }) => {
    triggerHaptic('light');
    setPickupPoint(route.from);
    setDropoffPoint(route.to);
    setRidePrice(route.price);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dropoffPoint.trim()) {
      triggerHaptic('error');
      showNotification('Thiếu điểm đến', 'Vui lòng nhập điểm đến hoặc lộ trình bạn muốn đi.');
      return;
    }

    setIsSubmitting(true);
    triggerHaptic('medium');

    const title =
      rideType === 'CAMPUS_RIDE'
        ? `🛵 Xe ôm Campus: Từ ${pickupPoint} ➔ Đến ${dropoffPoint}`
        : rideType === 'CARPOOL_HOME'
        ? `🚗 Ghép xe về quê: Tuyến ${pickupPoint} ➔ ${dropoffPoint} (${seatsNeeded} chỗ)`
        : `📦 Chở đồ chuyển trọ xe máy: ${pickupPoint} ➔ ${dropoffPoint}`;

    const description = `${title}\n• Thời gian xuất phát: ${departureTime}\n• Thù lao đã bao gồm xăng: ${formatVnd(ridePrice)}\n• Mũ bảo hiểm: ${hasHelmet ? 'Đã có sẵn mũ' : 'Cần mượn mũ phụ của tài xế'}\n${note ? `• Ghi chú: ${note}` : ''}\n(Chuyến đi được bảo hộ bởi Quỹ Smart Escrow & GPS SOS SafeWalk)`;

    // Post as Gig on the platform
    const success = postGig({
      title,
      description,
      category: 'Xe & Đi ké Campus',
      price: ridePrice,
      isReverseAuction: false,
      isFlash: true,
      locationName: pickupPoint,
      distanceMeters: 150,
      totalWorkersNeeded: 1,
    });

    setIsSubmitting(false);
    if (success) {
      showNotification(
        'Đặt xe thành công! 🛵',
        `Đơn "${title}" đã được đăng lên Radar Campus. Các tài xế sinh viên xung quanh sẽ nhận chuyến ngay!`,
        true,
        true
      );
      onClose();
    }
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-fadeIn"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-[#0E1A2D] border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-4 text-slate-100 flex flex-col max-h-[92vh]"
      >
        {/* TOP BRAND ACCENT BAR */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-amber-500 via-orange-500 to-yellow-400" />

        {/* HEADER */}
        <div className="p-4 sm:p-5 border-b border-[#C5E5EC]/20 flex items-center justify-between bg-[#12233B]/80 shrink-0">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-600 text-black font-black shadow-md shadow-amber-500/20">
              <Bike className="w-6 h-6 text-black stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="font-black text-base text-white">Trạm Xe Sinh Viên & Đi Ké</h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-extrabold border border-amber-500/30">
                  Campus Ride
                </span>
              </div>
              <p className="text-[11px] text-[#C5E5EC]/70">
                Xe ôm sinh viên 10k - 20k • Ghép xe về quê chia tiền xăng • Escrow bảo đảm
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-[#C5E5EC]/70 hover:text-white transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* RIDE SERVICE TABS */}
        <div className="grid grid-cols-3 p-1.5 bg-[#09111D] border-b border-[#C5E5EC]/15 shrink-0 gap-1 text-xs">
          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              setRideType('CAMPUS_RIDE');
              setRidePrice(15000);
            }}
            className={`py-2 px-1.5 rounded-xl font-extrabold transition flex flex-col items-center space-y-1 cursor-pointer ${
              rideType === 'CAMPUS_RIDE'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md'
                : 'text-[#C5E5EC]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Bike className="w-4 h-4" />
            <span className="text-[11px]">Xe Ôm Campus</span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              setRideType('CARPOOL_HOME');
              setRidePrice(50000);
            }}
            className={`py-2 px-1.5 rounded-xl font-extrabold transition flex flex-col items-center space-y-1 cursor-pointer ${
              rideType === 'CARPOOL_HOME'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md'
                : 'text-[#C5E5EC]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Car className="w-4 h-4" />
            <span className="text-[11px]">Ghép Xe Về Quê</span>
          </button>

          <button
            type="button"
            onClick={() => {
              triggerHaptic('light');
              setRideType('CARGO_BIKE');
              setRidePrice(35000);
            }}
            className={`py-2 px-1.5 rounded-xl font-extrabold transition flex flex-col items-center space-y-1 cursor-pointer ${
              rideType === 'CARGO_BIKE'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-md'
                : 'text-[#C5E5EC]/70 hover:text-white hover:bg-white/5'
            }`}
          >
            <Users className="w-4 h-4" />
            <span className="text-[11px]">Chở Đồ Chuyển Trọ</span>
          </button>
        </div>

        {/* FORM CONTENT */}
        <form onSubmit={handleSubmit} className="p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
          {/* Pickup Location */}
          <div className="space-y-1.5">
            <label className="text-[#C5E5EC] font-bold flex items-center space-x-1.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span>Điểm đón bạn:</span>
            </label>
            <div className="relative">
              <input
                type="text"
                value={pickupPoint}
                onChange={(e) => setPickupPoint(e.target.value)}
                placeholder="Ví dụ: Cổng 1 KTX Khu B, Tòa nhà H1 ĐH Bách Khoa..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12233B] border border-[#C5E5EC]/25 text-white font-medium focus:border-amber-400 focus:outline-none"
                required
              />
            </div>
          </div>

          {/* Dropoff Location */}
          <div className="space-y-1.5">
            <label className="text-[#C5E5EC] font-bold flex items-center space-x-1.5">
              <Navigation className="w-3.5 h-3.5 text-amber-400" />
              <span>Điểm đến / Lộ trình:</span>
            </label>
            <input
              type="text"
              value={dropoffPoint}
              onChange={(e) => setDropoffPoint(e.target.value)}
              placeholder={
                rideType === 'CARPOOL_HOME'
                  ? 'Ví dụ: TP. Nam Định, TP. Biên Hòa, Vũng Tàu...'
                  : 'Ví dụ: Cơ sở 1 Q.10, Ga Metro Suối Tiên, Thư viện...'
              }
              className="w-full px-3.5 py-2.5 rounded-xl bg-[#12233B] border border-amber-500/40 text-white font-medium focus:border-amber-300 focus:outline-none"
              required
            />
          </div>

          {/* Quick Preset Buttons */}
          {rideType === 'CAMPUS_RIDE' && (
            <div className="space-y-1">
              <span className="text-[11px] text-[#C5E5EC]/70">Gợi ý điểm đến phổ biến:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_DESTINATIONS.map((dest) => (
                  <button
                    key={dest.label}
                    type="button"
                    onClick={() => handleSelectPresetDestination(dest)}
                    className="px-2.5 py-1 rounded-lg bg-[#12233B] hover:bg-[#162D4A] border border-[#C5E5EC]/20 text-[#C5E5EC] hover:text-white transition text-[11px] flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{dest.label}</span>
                    <span className="text-amber-400 font-bold">({formatVnd(dest.price)})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {rideType === 'CARPOOL_HOME' && (
            <div className="space-y-1">
              <span className="text-[11px] text-[#C5E5EC]/70">Các tuyến ghép xe về quê phổ biến:</span>
              <div className="flex flex-wrap gap-1.5">
                {PRESET_CARPOOL_ROUTES.map((route, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleSelectCarpoolRoute(route)}
                    className="px-2.5 py-1 rounded-lg bg-[#12233B] hover:bg-[#162D4A] border border-[#C5E5EC]/20 text-[#C5E5EC] hover:text-white transition text-[11px] flex items-center space-x-1 cursor-pointer"
                  >
                    <span>{route.to}</span>
                    <span className="text-amber-400 font-bold">({formatVnd(route.price)})</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Price & Time Row */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="space-y-1.5">
              <label className="text-[#C5E5EC] font-bold flex items-center space-x-1">
                <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                <span>Thù lao / Tiền xăng:</span>
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="5000"
                  min="10000"
                  max="1000000"
                  value={ridePrice}
                  onChange={(e) => setRidePrice(Math.max(10000, Number(e.target.value)))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#12233B] border border-emerald-500/40 text-emerald-400 font-mono font-bold text-sm focus:outline-none"
                  required
                />
                <span className="absolute right-3 top-3 text-[11px] text-slate-400">VNĐ</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[#C5E5EC] font-bold flex items-center space-x-1">
                <Clock className="w-3.5 h-3.5 text-cyan-400" />
                <span>Thời gian đón:</span>
              </label>
              <input
                type="text"
                value={departureTime}
                onChange={(e) => setDepartureTime(e.target.value)}
                placeholder="Ngay bây giờ / 17h chiều nay..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12233B] border border-[#C5E5EC]/25 text-white text-xs focus:outline-none"
              />
            </div>
          </div>

          {/* Carpool extra seats selection */}
          {rideType === 'CARPOOL_HOME' && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#12233B] border border-[#C5E5EC]/20">
              <span className="text-[#C5E5EC] font-semibold">Số lượng người cần đi / Ghế trống:</span>
              <div className="flex items-center space-x-2">
                {[1, 2, 3].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setSeatsNeeded(num)}
                    className={`w-8 h-8 rounded-lg font-bold text-xs transition cursor-pointer ${
                      seatsNeeded === num
                        ? 'bg-amber-500 text-black shadow-md'
                        : 'bg-[#1A2E4B] text-[#C5E5EC] hover:bg-[#203758]'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Helmet & Safety note */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-[#12233B] border border-[#C5E5EC]/20">
            <span className="text-[#C5E5EC] text-xs">Bạn đã có sẵn mũ bảo hiểm cá nhân?</span>
            <button
              type="button"
              onClick={() => setHasHelmet(!hasHelmet)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition cursor-pointer ${
                hasHelmet
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
              }`}
            >
              {hasHelmet ? '✓ Đã có sẵn mũ' : 'Cần mượn mũ tài xế'}
            </button>
          </div>

          {/* Note Input */}
          <div className="space-y-1">
            <label className="text-[#C5E5EC]/80 font-medium">Ghi chú thêm cho tài xế:</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Ví dụ: Mình đứng ở cổng bảo vệ mặc áo khoác đen..."
              className="w-full px-3.5 py-2 rounded-xl bg-[#12233B] border border-[#C5E5EC]/20 text-white text-xs placeholder:text-[#C5E5EC]/40 focus:outline-none"
            />
          </div>

          {/* Security & Escrow Guarantee Banner */}
          <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-950/40 to-cyan-950/30 border border-emerald-500/30 space-y-1">
            <div className="flex items-center space-x-1.5 text-emerald-400 font-extrabold text-xs">
              <ShieldCheck className="w-4 h-4" />
              <span>Bảo vệ quyền lợi chuyến đi 100%</span>
            </div>
            <p className="text-[11px] text-[#C5E5EC]/80 leading-relaxed">
              Tài xế là sinh viên đã xác thực CCCD & Bằng lái A1. Tiền chỉ được chuyển khi bạn đã đến nơi an toàn. Tích hợp còi báo động SOS SafeWalk trên đường đi.
            </p>
          </div>

          {/* Action Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-yellow-400 to-orange-500 text-black font-black text-sm shadow-xl shadow-amber-500/25 hover:brightness-110 active:scale-95 transition flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
          >
            {isSubmitting ? (
              <span>Đang kết nối tài xế campus...</span>
            ) : (
              <>
                <Zap className="w-4 h-4 fill-black" />
                <span>Tìm Tài Xế Xe Sinh Viên Ngay ({formatVnd(ridePrice)})</span>
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};
