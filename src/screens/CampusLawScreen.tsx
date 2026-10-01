import React, { useState, useMemo } from 'react';
import {
  Scale,
  ShieldCheck,
  AlertTriangle,
  Lock,
  RotateCcw,
  Gavel,
  FileText,
  Search,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertOctagon,
  Copy,
  Check,
  ExternalLink,
  ShieldAlert,
  HelpCircle,
  Award,
  DollarSign,
  UserX,
  FileCheck,
  Bookmark,
  Share2,
  ArrowLeft,
} from 'lucide-react';
import { triggerHaptic } from '../utils/haptics';
import { useGigMe } from '../context/GigMeContext';

interface CampusLawScreenProps {
  onBack?: () => void;
  onOpenContactAdmin?: () => void;
}

interface LawArticle {
  id: string;
  articleNumber: string;
  title: string;
  category: 'KYC' | 'ESCROW' | 'EXECUTION' | 'DISPUTE' | 'PRIVACY' | 'PENALTY';
  summary: string;
  clauses: string[];
  penaltySnippet?: string;
  isCritical?: boolean;
}

const LAW_CHAPTERS = [
  { id: 'ALL', label: 'Toàn Bộ Bộ Luật', icon: Scale },
  { id: 'ESCROW', label: 'Smart Escrow & Tiền', icon: DollarSign },
  { id: 'KYC', label: 'Định Danh & Chống Gian Lận', icon: ShieldCheck },
  { id: 'EXECUTION', label: 'Thực Hiện & Bàn Giao', icon: FileCheck },
  { id: 'DISPUTE', label: 'Trọng Tài & Hoàn Tiền', icon: RotateCcw },
  { id: 'PENALTY', label: 'Khung Chế Tài Xử Phạt', icon: Gavel },
  { id: 'PRIVACY', label: 'Bảo Mật Nghị Định 13', icon: Lock },
];

const LAW_ARTICLES: LawArticle[] = [
  // CHƯƠNG I: ĐỊNH DANH & CHỐNG GIAN LẬN
  {
    id: 'art-1',
    articleNumber: 'Điều 1',
    category: 'KYC',
    title: 'Tư cách thành viên & Định danh sinh viên chính chủ (KYC Cấp 1, 2, 3)',
    summary: 'Mọi cá nhân tham gia GigMe phải chịu trách nhiệm pháp lý với danh tính đã đăng ký.',
    clauses: [
      '1.1. Nền tảng GigMe chỉ cấp quyền nhận việc và cung ứng dịch vụ cho các cá nhân đã hoàn thành tối thiểu KYC Cấp 1 (Số điện thoại chính chủ + Email trường .edu.vn hoặc xác thực giấy tờ sinh viên).',
      '1.2. Thành viên mở gói thầu trị giá từ 500.000 VNĐ trở lên hoặc kích hoạt tính năng thanh toán ký quỹ tự động bắt buộc phải thực hiện quét Chíp CCCD qua công nghệ NFC hoặc xác thực khuôn mặt Face Liveness 3D (KYC Cấp 2/3).',
      '1.3. Nghiêm cấm mượn, cho thuê, mua bán, làm giả hoặc sử dụng thông tin danh tính của người khác dưới bất kỳ hình thức nào. Hành vi sử dụng giấy tờ giả mạo sẽ bị chuyển hồ sơ sang cơ quan Công an xử lý theo Điều 341 Bộ luật Hình sự Việt Nam.',
    ],
    penaltySnippet: 'Tước quyền thành viên vĩnh viễn, phong tỏa tài khoản và gửi thông báo kỷ luật về Ban Giám hiệu Nhà trường.',
    isCritical: true,
  },
  {
    id: 'art-2',
    articleNumber: 'Điều 2',
    category: 'KYC',
    title: 'Chống tài khoản ảo, Sybil Ring và thao túng đánh giá tín nhiệm ELO',
    summary: 'Nghiêm cấm hành vi tự tạo tài khoản phụ để buff đánh giá hoặc gian lận thuật toán xếp hạng.',
    clauses: [
      '2.1. Mỗi sinh viên chỉ được sở hữu duy nhất 01 (một) tài khoản gắn liền với 01 ID 9 số bất biến trên nền tảng.',
      '2.2. Hệ thống kiểm định AI Sybil Audit tự động quét dấu vân tay thiết bị (Fingerprint), địa chỉ IP, mạng WiFi ký túc xá và tọa độ GPS. Mọi vòng tròn liên kết chéo (Sybil Ring) giữa các tài khoản cố tình đánh giá 5 sao ảo hoặc tạo giao dịch khống sẽ bị phát hiện ngay lập tức.',
      '2.3. Các tài khoản vi phạm sẽ bị reset toàn bộ điểm tín nhiệm ELO về 0.0 ★, thu hồi toàn bộ huy hiệu danh dự và ghi nhận cảnh báo xấu trong lịch sử Campus.',
    ],
    penaltySnippet: 'Xóa sổ vĩnh viễn mạng lưới tài khoản ảo, đóng băng ví nạp/rút 60 ngày.',
  },
  {
    id: 'art-3',
    articleNumber: 'Điều 3',
    category: 'KYC',
    title: 'Kiểm soát vị trí GPS thực tế & Nghiêm cấm công cụ Fake GPS / Giả lập',
    summary: 'Chỉ chấp nhận tín hiệu định vị vệ tinh thực tế khi quét nhận việc lân cận và check-in hiện trường.',
    clauses: [
      '3.1. Các đơn công việc yêu cầu có mặt thực địa (Giao nhận, phụ việc KTX, mua hộ, cứu hộ SafeWalk) bắt buộc phải bật GPS chuẩn xác trong phạm vi bán kính cho phép.',
      '3.2. Nghiêm cấm sử dụng phần mềm giả lập Mock Location (Fake GPS), VPN che giấu IP hoặc Proxy nhằm lừa đảo hệ thống nhận đơn từ xa.',
      '3.3. Khi hệ thống Anti-Mock phát hiện cờ vị trí giả mạo, đơn việc sẽ bị hủy tức thì và quyền bắt kèo theo Radar sẽ bị vô hiệu hóa trong 72 giờ.',
    ],
  },

  // CHƯƠNG II: SMART ESCROW & AN TOÀN TÀI CHÍNH
  {
    id: 'art-4',
    articleNumber: 'Điều 4',
    category: 'ESCROW',
    title: 'Cơ chế Ký Quỹ Smart Escrow 100% trước khi triển khai công việc',
    summary: 'Bảo vệ tuyệt đối dòng tiền của cả Người Thuê (Client) và Người Làm (Worker).',
    clauses: [
      '4.1. Khi Người thuê chấp nhận giao kèo hoặc chọn người trúng đấu giá ngược, 100% thù lao cam kết sẽ được trừ từ ví Người thuê và phong tỏa an toàn trong Quỹ Ký Quỹ Smart Escrow.',
      '4.2. Người thuê không thể tự ý rút lại tiền trong thời gian Người làm đang thực hiện đúng hẹn và đúng yêu cầu.',
      '4.3. Người làm được bảo đảm 100% nhận đủ tiền thù lao ngay khi hoàn tất nhiệm vụ và có minh chứng nghiệm thu hợp lệ.',
      '4.4. Tiền chỉ được giải ngân tự động khi: (a) Người thuê bấm "Xác Nhận Hoàn Thành", hoặc (b) Quá thời hạn nghiệm thu 24 giờ mà Người thuê không đưa ra bất kỳ phản hồi hay khiếu nại chính đáng nào.',
    ],
    isCritical: true,
  },
  {
    id: 'art-5',
    articleNumber: 'Điều 5',
    category: 'ESCROW',
    title: 'Nghiêm cấm tuyệt đối hành vi lách giao dịch ngoài sàn (Anti-Leakage Policy)',
    summary: 'Cấm trao đổi thông tin chuyển khoản ngoài, số điện thoại hoặc Zalo nhằm quỵt tiền ký quỹ.',
    clauses: [
      '5.1. Mọi thỏa thuận thù lao, thanh toán phải được thực hiện thông qua hệ thống Ví Smart Escrow của GigMe.',
      '5.2. Nghiêm cấm hành vi gửi số tài khoản cá nhân, mã QR ngoài, số điện thoại ngầm hoặc hẹn gặp giao dịch tiền mặt nhằm trốn tránh cơ chế bảo đảm ký quỹ của sàn.',
      '5.3. Hệ thống quét tự động (Anti-Leakage Engine) sẽ che giấu các nội dung vi phạm trong khung chat và gửi cảnh báo đỏ tới quản trị viên.',
      '5.4. Trường hợp hai bên cố tình lách giao dịch ngoài sàn: Nếu xảy ra tình trạng quỵt tiền, bỏ kèo, mất đồ hoặc lừa đảo, GigMe từ chối hoàn toàn trách nhiệm hỗ trợ bồi thường và sẽ áp dụng chế tài kỷ luật đối với cả hai bên.',
    ],
    penaltySnippet: 'Khóa tính năng chat 30 ngày, hạ bậc thứ hạng Campus và phạt trừ 50% điểm uy tín ELO.',
    isCritical: true,
  },
  {
    id: 'art-6',
    articleNumber: 'Điều 6',
    category: 'ESCROW',
    title: 'Hạn mức nạp/rút tiền, thời gian giãn cách Cooldown và chống rửa tiền (AML)',
    summary: 'Tuân thủ nghiêm ngặt quy chế quản lý tài chính sinh viên và phòng chống gian lận dòng tiền.',
    clauses: [
      '6.1. Hạn mức Nạp tiền: Tối đa 10.000.000 VNĐ cho mỗi lần nạp; tối đa 30.000.000 VNĐ trong vòng 24 giờ; số dư tích lũy ví không được vượt quá mức trần 200.000.000 VNĐ.',
      '6.2. Quy tắc Giãn cách (Cooldown): Sau mỗi giao dịch nạp tiền thành công, hệ thống yêu cầu giãn cách an toàn tối thiểu 15-60 phút trước khi mở lệnh tiếp theo.',
      '6.3. Điều kiện Rút tiền về Ngân hàng: Tài khoản phải thỏa mãn các tiêu chuẩn: (a) Số dư tối thiểu sau rút > 50.000 VNĐ; (b) Đã hoàn thành tối thiểu 01 công việc có đánh giá thực tế; (c) Tuổi tài khoản >= 5 ngày và thời lượng hoạt động >= 3 giờ; (d) Tên chủ tài khoản ngân hàng thụ hưởng phải trùng khớp 100% với họ tên KYC.',
      '6.4. Nghiêm cấm sử dụng ví GigMe làm kênh trung chuyển tiền bẩn, tiền lừa đảo mạng hoặc rửa tiền dưới mọi hình thức.',
    ],
  },
  {
    id: 'art-7',
    articleNumber: 'Điều 7',
    category: 'ESCROW',
    title: 'Phân bổ thù lao tự động cho đơn làm việc nhóm (Split Payout)',
    summary: 'Đảm bảo tiền công được chia đều, minh bạch tới từng thành viên tham gia.',
    clauses: [
      '7.1. Đối với các đơn tuyển nhiều người (Multi-Worker Gig), khi hoàn thành, Smart Escrow sẽ tự động chia đều số tiền thù lao về thẳng ví từng thành viên đã check-in mã QR hiện trường.',
      '7.2. Nhóm trưởng hoặc người đăng tuyển không được quyền giữ tiền công hoặc cắt xén thù lao của các thành viên khác.',
      '7.3. Nếu có vị trí bỏ trống hoặc thành viên vắng mặt (No-show), số tiền thù lao của vị trí đó sẽ được tự động hoàn trả 100% về ví của Người thuê.',
    ],
  },

  // CHƯƠNG III: THỰC HIỆN CÔNG VIỆC & BẰNG CHỨNG BÀN GIAO
  {
    id: 'art-8',
    articleNumber: 'Điều 8',
    category: 'EXECUTION',
    title: 'Minh chứng bàn giao bằng ảnh có đóng dấu Watermark Blockchain Hash',
    summary: 'Mọi công việc hoàn tất phải có bằng chứng hình ảnh rõ ràng để giải ngân Escrow.',
    clauses: [
      '8.1. Khi bàn giao kết quả (Giao nhận hàng hóa, dọn phòng, sửa chữa, cài đặt máy tính), Người làm phải chụp ảnh hiện trường qua tính năng Blockchain Proof tích hợp trong app.',
      '8.2. Ảnh minh chứng sẽ tự động được đóng dấu Watermark gồm: Mã băm SHA-256 chống cắt ghép, thời gian chụp UTC+7 chuẩn xác đến từng giây, và tọa độ GPS địa điểm thực tế.',
      '8.3. Ảnh minh chứng là tài liệu pháp lý tối cao được Hội đồng Trọng tài GigMe căn cứ để giải quyết khi xảy ra tranh chấp.',
    ],
  },
  {
    id: 'art-9',
    articleNumber: 'Điều 9',
    category: 'EXECUTION',
    title: 'Quy chuẩn công việc, danh mục cấm và phòng chống vi phạm quy chế đào tạo',
    summary: 'Nghiêm cấm các công việc trái pháp luật, vi phạm thuần phong mỹ tục hoặc quy chế thi cử.',
    clauses: [
      '9.1. Danh mục cấm đăng tải tuyệt đối: Mua bán chất cấm, rượu bia thuốc lá trong khuôn viên KTX, văn hóa phẩm đồi trụy, vũ khí, cờ bạc, tiền ảo, hàng cấm theo quy định pháp luật Việt Nam.',
      '9.2. Quy chế liêm chính học thuật: Cấm tuyệt đối hành vi thi hộ, kiểm tra hộ, làm bài thi kết thúc học phần hộ hoặc gian lận học thuật. Nền tảng chỉ cho phép các dịch vụ hỗ trợ học tập lành mạnh: Gia sư, hướng dẫn phương pháp giải bài, dịch thuật tài liệu, hỗ trợ in ấn giáo trình.',
      '9.3. Người đăng bài vi phạm Điều 9 sẽ bị gỡ bài ngay lập tức, trừ toàn bộ tiền cọc đăng tin và khóa tài khoản không hoàn lại.',
    ],
    isCritical: true,
  },
  {
    id: 'art-10',
    articleNumber: 'Điều 10',
    category: 'EXECUTION',
    title: 'Xử lý vi phạm Bỏ kèo (No-Show) và Hủy đơn sát giờ (Late Cancellation)',
    summary: 'Bảo vệ thời gian và công sức của các bên tham gia giao dịch.',
    clauses: [
      '10.1. Người làm việc tự ý bỏ kèo không đến (Worker No-Show): Bị trừ ngay 15 điểm tín nhiệm ELO, trừ phí phạt 30% giá trị đơn việc từ số dư ví để bồi thường cho Người thuê, và bị hạn chế nhận việc trong 48 giờ.',
      '10.2. Người thuê tự ý hủy đơn sát giờ (< 30 phút trước giờ hẹn) khi Người làm đã di chuyển đến nơi: Phải chịu phí bồi thường di chuyển tối thiểu 30.000 VNĐ đến 50% giá trị đơn việc được chuyển thẳng vào ví Người làm.',
      '10.3. Trường hợp bất khả kháng (Tai nạn, sự cố y tế khẩn cấp, thiên tai, cúp điện diện rộng): Phải cung cấp minh chứng xác thực cho Ban Quản Trị trong vòng 12 giờ để được xem xét miễn trừ phí phạt.',
    ],
  },

  // CHƯƠNG IV: TRỌNG TÀI & GIẢI QUYẾT TRANH CHẤP
  {
    id: 'art-11',
    articleNumber: 'Điều 11',
    category: 'DISPUTE',
    title: 'Quy trình Khiếu nại & Cơ chế đóng băng quỹ tranh chấp 24/7',
    summary: 'Đảm bảo tiền không bị tẩu tán trong lúc hai bên đang bất đồng quan điểm.',
    clauses: [
      '11.1. Khi kết quả công việc không đạt yêu cầu hoặc có dấu hiệu gian lận, Người thuê có quyền bấm nút "Khiếu Nại & Mở Tranh Chấp" trước khi xác nhận nghiệm thu.',
      '11.2. Ngay khi bấm khiếu nại, toàn bộ số tiền thù lao trong Quỹ Escrow sẽ lập tức rơi vào trạng thái "ĐÓNG BĂNG TRANH CHẤP", không ai có thể rút tiền cho đến khi có phán quyết cuối cùng.',
      '11.3. Hai bên có thời hạn 04 giờ để tự hòa giải trong khung chat có gắn giám sát của Trọng tài. Nếu không đạt thỏa thuận, vụ việc tự động chuyển lên Hội đồng Trọng tài Admin Master.',
    ],
  },
  {
    id: 'art-12',
    articleNumber: 'Điều 12',
    category: 'DISPUTE',
    title: 'Thẩm quyền phán quyết của Ban Quản Trị Tối Cao (Admin Master 000000000)',
    summary: 'Phán quyết công tâm, dựa trên log hệ thống, lịch sử chat và ảnh Blockchain Proof.',
    clauses: [
      '12.1. Ban Quản Trị Tối Cao (ID 000000000) giữ quyền tài phán độc lập và tối cao trên nền tảng GigMe.',
      '12.2. Trọng tài viên sẽ đánh giá toàn bộ dữ liệu: (a) Tin nhắn trao đổi; (b) Ảnh đóng dấu Blockchain SHA-256; (c) Tọa độ GPS check-in/check-out; (d) Lịch sử cuộc gọi VoIP.',
      '12.3. Các hình thức phán quyết: (1) Hoàn tiền 100% cho Người thuê; (2) Giải ngân 100% cho Người làm; (3) Chia tỷ lệ phần trăm theo khối lượng công việc thực tế đã hoàn thành.',
      '12.4. Phán quyết của Hội đồng Trọng tài là quyết định cuối cùng có hiệu lực thi hành ngay lập tức.',
    ],
    isCritical: true,
  },
  {
    id: 'art-13',
    articleNumber: 'Điều 13',
    category: 'DISPUTE',
    title: 'Chính sách bảo đảm Hoàn tiền 100% (Zero-Risk Money Back Guarantee)',
    summary: 'Bảo vệ quyền lợi khách hàng chuẩn tiêu chuẩn Apple App Store & Google Play Store.',
    clauses: [
      '13.1. Người thuê được bảo đảm hoàn tiền 100% trong các trường hợp: (a) Đăng bài nhưng không có ai nhận việc và bấm hủy bài; (b) Người làm nhận việc nhưng không đến hiện trường (No-show); (c) Công việc bị chứng minh là không thực hiện hoặc làm hỏng hoàn toàn tài sản.',
      '13.2. Tiền hoàn trả sẽ được cộng trả ngay lập tức (0 giây delay) vào số dư Ví GigMe của người dùng và có thể rút về tài khoản ngân hàng bất cứ lúc nào.',
      '13.3. GigMe không thu bất kỳ khoản phí phạt nào đối với các yêu cầu hoàn tiền chính đáng và đúng quy định.',
    ],
  },

  // CHƯƠNG V: BẢO VỆ BÍ MẬT ĐỜI TƯ & DỮ LIỆU CÁ NHÂN
  {
    id: 'art-14',
    articleNumber: 'Điều 14',
    category: 'PRIVACY',
    title: 'Bảo vệ dữ liệu cá nhân theo Nghị định 13/2023/NĐ-CP của Chính Phủ',
    summary: 'Cam kết bảo mật tuyệt đối thông tin sinh viên, số CCCD, hình ảnh và tài khoản ngân hàng.',
    clauses: [
      '14.1. Mọi dữ liệu nhạy cảm bao gồm: Ảnh thẻ sinh viên, dữ liệu quét Chíp NFC CCCD, số tài khoản ngân hàng và lịch sử số dư đều được mã hóa bằng chuẩn AES-256 bit cấp ngân hàng tại tầng lưu trữ và TLS 1.3 tại tầng truyền tải.',
      '14.2. GigMe cam kết không bán, không thương mại hóa, không chia sẻ dữ liệu sinh viên cho bất kỳ bên thứ ba nào vì mục đích quảng cáo rác.',
      '14.3. Dữ liệu chỉ được cung cấp cho cơ quan có thẩm quyền khi có văn bản yêu cầu chính thức phục vụ điều tra các hành vi vi phạm pháp luật hình sự.',
    ],
  },
  {
    id: 'art-15',
    articleNumber: 'Điều 15',
    category: 'PRIVACY',
    title: 'Quyền riêng tư vị trí & Chức năng gọi thoại VoIP bảo mật danh tính',
    summary: 'Bảo đảm an toàn cho các bạn nữ và sinh viên khi di chuyển hoặc liên lạc ban đêm.',
    clauses: [
      '15.1. Tọa độ Radar chỉ hiển thị vị trí ước lượng theo bán kính mờ (Fuzzy Location) trong khoảng cách vài trăm mét, không để lộ số phòng ký túc xá hoặc địa chỉ nhà riêng chính xác cho đến khi đơn việc được cả hai bên ký kết hợp lệ.',
      '15.2. Chức năng gọi thoại Campus VoIP miễn phí tích hợp trực tiếp trong app, cho phép hai bên gọi điện trao đổi mà không để lộ số điện thoại cá nhân (Masked Phone Calling).',
      '15.3. Tính năng SOS SafeWalk ban đêm tự động kích hoạt còi báo động khẩn cấp và gửi tín hiệu định vị trực tiếp tới người thân và Ban Quản Trị khi gặp tình huống nguy hiểm.',
    ],
  },

  // CHƯƠNG VI: KHUNG CHẾ TÀI XỬ PHẠT & TRÁCH NHIỆM PHÁP LÝ
  {
    id: 'art-16',
    articleNumber: 'Điều 16',
    category: 'PENALTY',
    title: 'Khung 5 cấp độ Chế tài Xử phạt Vi phạm trên toàn hệ thống',
    summary: 'Quy định minh bạch các mức phạt từ nhắc nhở nhẹ đến truy cứu trách nhiệm hình sự.',
    clauses: [
      '16.1. CẤP ĐỘ 1 (Nhắc nhở & Cảnh cáo): Áp dụng cho các vi phạm nhẹ lần đầu (spam chat, trễ hẹn < 15 phút, ngôn từ thiếu văn minh). Phạt cảnh cáo hiển thị trong hồ sơ 7 ngày.',
      '16.2. CẤP ĐỘ 2 (Trừ điểm ELO & Giảm thứ hạng): Áp dụng khi bị đánh giá 1-2 sao có lý do xác thực, hủy đơn sát giờ hoặc vi phạm quy tắc ứng xử. Bị hạ bậc ELO, tước huy hiệu Verified và giảm tần suất hiển thị trên Radar việc làm.',
      '16.3. CẤP ĐỘ 3 (Đóng băng ví & Tạm đình chỉ 14-30 ngày): Áp dụng cho hành vi bỏ kèo (No-show), cố tình lách giao dịch ngoài sàn lần đầu, sử dụng Fake GPS, hoặc bị khiếu nại không giải quyết. Đóng băng quyền rút tiền và nhận việc trong thời gian phạt.',
      '16.4. CẤP ĐỘ 4 (Khóa tài khoản vĩnh viễn & Tịch thu quyền thành viên): Áp dụng cho hành vi: Tạo mạng lưới tài khoản ảo (Sybil Ring), trộm cắp tài sản KTX, lừa đảo chiếm đoạt tiền cọc, gian lận học thuật nghiêm trọng. ID 9 số và số CCCD sẽ bị đưa vào Danh Sách Đen (Blacklist) toàn quốc.',
      '16.5. CẤP ĐỘ 5 (Truy cứu trách nhiệm hình sự): Trường hợp hành vi có dấu hiệu tội phạm (Lừa đảo chiếm đoạt tài sản theo Điều 174 BLHS, Làm giả con dấu tài liệu theo Điều 341 BLHS), GigMe sẽ tổng hợp toàn bộ file log, địa chỉ IP, ảnh Blockchain Proof và lịch sử giao dịch chuyển giao cho Cơ quan Cảnh sát Điều tra.',
    ],
    isCritical: true,
  },
  {
    id: 'art-17',
    articleNumber: 'Điều 17',
    category: 'PENALTY',
    title: 'Hiệu lực thi hành, Cam kết số & Quy chế sửa đổi bổ sung',
    summary: 'Văn bản có giá trị pháp lý ràng buộc kể từ thời điểm thành viên đăng ký tham gia.',
    clauses: [
      '17.1. Bằng việc bấm nút "Đăng Ký", "Đăng Kèo" hoặc "Nhận Việc", thành viên xác nhận đã đọc, hiểu rõ và tự nguyện cam kết tuân thủ 100% các điều khoản của Bộ Luật này.',
      '17.2. GigMe bảo lưu quyền sửa đổi, bổ sung các điều khoản nhằm đáp ứng các quy định pháp luật mới của Nhà nước. Mọi thay đổi quan trọng sẽ được thông báo công khai trước ít nhất 07 ngày qua Trung Tâm Thông Báo và Màn hình khóa PWA Push.',
      '17.3. Văn bản có hiệu lực thi hành kể từ ngày 01 tháng 01 năm 2026 trên toàn bộ hệ sinh thái ứng dụng GigMe Campus Web & Mobile PWA.',
    ],
  },
];

export const CampusLawScreen: React.FC<CampusLawScreenProps> = ({
  onBack,
  onOpenContactAdmin,
}) => {
  const { currentUser, showNotification } = useGigMe();
  const [selectedChapter, setSelectedChapter] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [expandedArticles, setExpandedArticles] = useState<Record<string, boolean>>({
    'art-1': true,
    'art-4': true,
    'art-5': true,
    'art-16': true,
  });
  const [hasAgreed, setHasAgreed] = useState<boolean>(false);
  const [copiedArticleId, setCopiedArticleId] = useState<string | null>(null);

  // Toggle expand
  const toggleArticle = (id: string) => {
    triggerHaptic('light');
    setExpandedArticles((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Expand / Collapse all
  const toggleAll = (expand: boolean) => {
    triggerHaptic('medium');
    const newState: Record<string, boolean> = {};
    LAW_ARTICLES.forEach((a) => {
      newState[a.id] = expand;
    });
    setExpandedArticles(newState);
  };

  // Filtered articles
  const filteredArticles = useMemo(() => {
    return LAW_ARTICLES.filter((article) => {
      // Category filter
      if (selectedChapter !== 'ALL' && article.category !== selectedChapter) {
        return false;
      }
      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchTitle = article.title.toLowerCase().includes(query);
        const matchSummary = article.summary.toLowerCase().includes(query);
        const matchNumber = article.articleNumber.toLowerCase().includes(query);
        const matchClauses = article.clauses.some((c) => c.toLowerCase().includes(query));
        return matchTitle || matchSummary || matchNumber || matchClauses;
      }
      return true;
    });
  }, [selectedChapter, searchQuery]);

  // Copy article text
  const handleCopyArticle = (article: LawArticle) => {
    triggerHaptic('success');
    const text = `${article.articleNumber}: ${article.title}\n\n${article.clauses.join('\n')}\n\n(Nguồn: Bộ Luật Nền Tảng GigMe Campus 2026)`;
    navigator.clipboard.writeText(text);
    setCopiedArticleId(article.id);
    showNotification('Đã sao chép điều khoản!', `Đã chép nội dung ${article.articleNumber} vào bộ nhớ tạm.`);
    setTimeout(() => setCopiedArticleId(null), 2500);
  };

  // Commitment action
  const handleConfirmCommitment = () => {
    triggerHaptic('success');
    setHasAgreed(true);
    showNotification(
      'Cam Kết Pháp Lý Thành Công! ⚖️',
      `Tài khoản ID ${currentUser?.id || '000000000'} đã ký điện tử cam kết tuân thủ 100% Bộ Luật & Quy chế GigMe Campus. Điểm tín nhiệm ELO của bạn được bảo đảm!`,
      true,
      true
    );
  };

  return (
    <div className="min-h-screen bg-[#070D18] text-slate-100 pb-28 animate-fadeIn">
      {/* TOP HERO LEGAL HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0F1E38] via-[#0B1527] to-[#070D18] border-b border-[#C5E5EC]/20 pt-6 pb-8 px-4 sm:px-6">
        {/* Ambient lighting effects */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#3064AE]/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto space-y-4">
          {/* Top compliance badge bar */}
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              {onBack && (
                <button
                  type="button"
                  onClick={() => {
                    triggerHaptic('light');
                    onBack();
                  }}
                  className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-[#C5E5EC] hover:text-white flex items-center space-x-1 transition text-xs font-bold mr-1 cursor-pointer active:scale-95"
                  title="Quay lại"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="hidden sm:inline">Quay lại</span>
                </button>
              )}
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 font-extrabold text-[11px] shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Quy Chuẩn Chính Thức 2026</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-full bg-blue-500/15 border border-blue-400/30 text-blue-300 font-bold text-[10px]">
                <span>Nghị định 13/2023/NĐ-CP</span>
              </span>
            </div>

            <div className="flex items-center space-x-2 text-[11px] text-[#C5E5EC]/70">
              <span>Mã văn bản: <strong>GIGME-LAW-2026</strong></span>
            </div>
          </div>

          {/* Main Title & Authority Emblem */}
          <div className="flex items-start space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-yellow-600 to-amber-700 p-0.5 shadow-xl shadow-amber-900/40 shrink-0">
              <div className="w-full h-full rounded-[14px] bg-[#0A1220] flex items-center justify-center text-amber-300">
                <Scale className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
            </div>

            <div className="space-y-1">
              <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>BỘ LUẬT & ĐIỀU KHOẢN GIGME CAMPUS</span>
              </h1>
              <p className="text-xs sm:text-sm text-[#C5E5EC]/85 leading-relaxed font-medium">
                Quy định nghiêm ngặt về Ký quỹ Smart Escrow 100%, Định danh chính chủ, Chống lừa đảo, Xử lý bỏ kèo và Khung chế tài xử phạt trên toàn hệ thống.
              </p>
            </div>
          </div>

          {/* Key Pillars Highlights (4 summary cards) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            <div className="p-2.5 rounded-2xl bg-[#0D1B30] border border-[#C5E5EC]/20 text-center space-y-1">
              <div className="w-7 h-7 mx-auto rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                <Lock className="w-4 h-4" />
              </div>
              <div className="font-extrabold text-[11px] text-white">Smart Escrow 100%</div>
              <div className="text-[10px] text-[#C5E5EC]/70 leading-tight">Khóa tiền an toàn, cấm lách sàn</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#0D1B30] border border-[#C5E5EC]/20 text-center space-y-1">
              <div className="w-7 h-7 mx-auto rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                <RotateCcw className="w-4 h-4" />
              </div>
              <div className="font-extrabold text-[11px] text-white">Hoàn Tiền 100%</div>
              <div className="text-[10px] text-[#C5E5EC]/70 leading-tight">Zero-risk khi đối phương bỏ kèo</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#0D1B30] border border-[#C5E5EC]/20 text-center space-y-1">
              <div className="w-7 h-7 mx-auto rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div className="font-extrabold text-[11px] text-white">Chống Fake GPS</div>
              <div className="text-[10px] text-[#C5E5EC]/70 leading-tight">Bằng chứng Blockchain Hash</div>
            </div>

            <div className="p-2.5 rounded-2xl bg-[#0D1B30] border border-[#C5E5EC]/20 text-center space-y-1">
              <div className="w-7 h-7 mx-auto rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center">
                <Gavel className="w-4 h-4" />
              </div>
              <div className="font-extrabold text-[11px] text-white">Khung 5 Mức Phạt</div>
              <div className="text-[10px] text-[#C5E5EC]/70 leading-tight">Khóa tài khoản & Xử lý hình sự</div>
            </div>
          </div>
        </div>
      </div>

      {/* STICKY SEARCH & CATEGORY FILTER BAR */}
      <div className="sticky top-0 z-30 bg-[#070D18]/95 backdrop-blur-md border-b border-[#C5E5EC]/15 py-3 px-4 shadow-lg">
        <div className="max-w-4xl mx-auto space-y-2.5">
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="w-4 h-4 text-[#C5E5EC]/60 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tra cứu nhanh luật: 'hoàn tiền', 'lách sàn', 'bỏ kèo', 'NFC CCCD', 'thù lao', 'xử phạt'..."
              className="w-full pl-10 pr-24 py-2.5 rounded-2xl bg-[#0F1E34] border border-[#C5E5EC]/25 text-white text-xs placeholder:text-[#C5E5EC]/40 focus:outline-none focus:border-amber-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 px-2 py-0.5 text-[10px] font-bold rounded-lg bg-white/10 hover:bg-white/20 text-[#C5E5EC] transition"
              >
                Xóa tìm
              </button>
            )}
          </div>

          {/* Horizontal Chapter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
            {LAW_CHAPTERS.map((chap) => {
              const Icon = chap.icon;
              const isSelected = selectedChapter === chap.id;
              return (
                <button
                  key={chap.id}
                  onClick={() => {
                    triggerHaptic('light');
                    setSelectedChapter(chap.id);
                  }}
                  className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap border shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-amber-600 to-yellow-600 text-white border-amber-300 shadow-md shadow-amber-900/30'
                      : 'bg-[#0E1B2E] border-[#C5E5EC]/20 text-[#C5E5EC]/80 hover:text-white hover:bg-[#13243C]'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{chap.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN ARTICLES LIST */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-5 space-y-4">
        {/* Counter and Expand All / Collapse All */}
        <div className="flex items-center justify-between text-xs text-[#C5E5EC]/80 pb-1">
          <div className="flex items-center space-x-2">
            <span className="font-extrabold text-white">Hiển thị {filteredArticles.length} điều khoản chặt chẽ</span>
            {selectedChapter !== 'ALL' && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 text-[10px] font-bold">
                Chương: {LAW_CHAPTERS.find((c) => c.id === selectedChapter)?.label}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => toggleAll(true)}
              className="px-2.5 py-1 rounded-lg bg-[#0E1B2E] hover:bg-[#13243C] border border-[#C5E5EC]/20 text-[11px] font-bold text-[#C5E5EC] transition"
            >
              Mở hết
            </button>
            <button
              onClick={() => toggleAll(false)}
              className="px-2.5 py-1 rounded-lg bg-[#0E1B2E] hover:bg-[#13243C] border border-[#C5E5EC]/20 text-[11px] font-bold text-[#C5E5EC] transition"
            >
              Thu gọn
            </button>
          </div>
        </div>

        {/* Empty Search Result */}
        {filteredArticles.length === 0 && (
          <div className="p-8 rounded-3xl bg-[#0D182A] border border-[#C5E5EC]/20 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 mx-auto flex items-center justify-center">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-white">Không tìm thấy điều khoản phù hợp</h3>
            <p className="text-xs text-[#C5E5EC]/70 max-w-sm mx-auto">
              Không có kết quả khớp với từ khóa "{searchQuery}". Bạn có thể thử tìm với: "hoàn tiền", "cọc", "chat", "CCCD", hoặc bấm xem toàn bộ bộ luật.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedChapter('ALL');
              }}
              className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs hover:bg-amber-500 transition"
            >
              Xem tất cả điều khoản
            </button>
          </div>
        )}

        {/* Article Cards */}
        {filteredArticles.map((article) => {
          const isExpanded = !!expandedArticles[article.id];
          return (
            <div
              key={article.id}
              className={`rounded-3xl border transition-all duration-200 overflow-hidden ${
                article.isCritical
                  ? 'bg-gradient-to-b from-[#0F1E36] to-[#0A1424] border-amber-500/40 shadow-lg shadow-amber-950/20'
                  : 'bg-[#0B1526] border-[#C5E5EC]/20 hover:border-[#C5E5EC]/40'
              }`}
            >
              {/* Card Header (Click to toggle) */}
              <div
                onClick={() => toggleArticle(article.id)}
                className="p-4 sm:p-5 flex items-start justify-between gap-3 cursor-pointer select-none hover:bg-white/[0.02] transition"
              >
                <div className="flex items-start space-x-3 min-w-0">
                  <div
                    className={`px-2.5 py-1 rounded-xl font-mono font-black text-xs shrink-0 mt-0.5 border ${
                      article.isCritical
                        ? 'bg-gradient-to-r from-amber-500 to-yellow-600 text-black border-amber-300'
                        : 'bg-[#12233B] text-[#00E5FF] border-[#00E5FF]/30'
                    }`}
                  >
                    {article.articleNumber}
                  </div>

                  <div className="space-y-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5">
                      <h2 className="font-extrabold text-sm sm:text-base text-white tracking-wide">
                        {article.title}
                      </h2>
                      {article.isCritical && (
                        <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-black uppercase tracking-wider">
                          Đặc Biệt Quan Trọng
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-[#C5E5EC]/75 line-clamp-2">
                      {article.summary}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 shrink-0">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopyArticle(article);
                    }}
                    className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-[#C5E5EC] hover:text-white transition"
                    title="Sao chép điều khoản này"
                  >
                    {copiedArticleId === article.id ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <div className="p-2 rounded-xl bg-white/5 text-[#C5E5EC]">
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </div>
              </div>

              {/* Card Body (Detailed Clauses) */}
              {isExpanded && (
                <div className="px-4 sm:px-5 pb-5 pt-1 space-y-3.5 border-t border-[#C5E5EC]/15 text-xs text-slate-200 leading-relaxed animate-fadeIn">
                  <div className="space-y-2.5 pt-2">
                    {article.clauses.map((clause, idx) => (
                      <div
                        key={idx}
                        className="flex items-start space-x-2.5 p-2.5 rounded-2xl bg-[#070D18]/60 border border-white/5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-2" />
                        <span className="leading-relaxed">{clause}</span>
                      </div>
                    ))}
                  </div>

                  {/* Penalty Snippet Callout */}
                  {article.penaltySnippet && (
                    <div className="p-3 rounded-2xl bg-rose-950/40 border border-rose-600/40 text-rose-200 flex items-start space-x-2.5">
                      <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-[11px] leading-snug">
                        <strong className="text-rose-300 font-extrabold uppercase">Chế tài nghiêm cấm: </strong>
                        <span>{article.penaltySnippet}</span>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* BOTTOM OFFICIAL SIGNATURE & COMMITMENT PLEDGE */}
        <div className="mt-8 p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-[#12233D] via-[#0E1A2E] to-[#0A1324] border-2 border-amber-500/40 shadow-2xl space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
              <Gavel className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Cam Kết Pháp Lý & Chấp Thuận Điều Khoản</h3>
              <p className="text-xs text-[#C5E5EC]/80">
                Hiệp ước cộng đồng sinh viên văn minh • Smart Escrow bảo đảm tiền thù lao
              </p>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#070E1A] border border-[#C5E5EC]/20 text-xs text-[#C5E5EC]/90 space-y-1.5">
            <p>
              • Tài khoản đăng nhập hiện tại: <strong className="text-white font-mono">{currentUser?.id || '000000000'}</strong> ({currentUser?.name || 'Khách Campus'}).
            </p>
            <p>
              • Bằng việc kích hoạt cam kết, bạn đồng thuận rằng mọi tranh chấp sẽ được phân xử theo đúng 17 Điều khoản của Bộ Luật này và phán quyết từ Ban Quản Trị Tối Cao có giá trị thi hành tuyệt đối.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
            <button
              onClick={handleConfirmCommitment}
              disabled={hasAgreed}
              className={`w-full sm:flex-1 py-3.5 px-5 rounded-2xl font-black text-xs transition flex items-center justify-center space-x-2 shadow-xl cursor-pointer ${
                hasAgreed
                  ? 'bg-emerald-600 text-white border border-emerald-400 cursor-default'
                  : 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 hover:brightness-110 text-black shadow-amber-900/50'
              }`}
            >
              {hasAgreed ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-white" />
                  <span>ĐÃ KÝ ĐIỆN TỬ CAM KẾT TUÂN THỦ BỘ LUẬT 100%</span>
                </>
              ) : (
                <>
                  <Scale className="w-4 h-4" />
                  <span>TÔI ĐÃ ĐỌC KỸ & CAM KẾT TUÂN THỦ BỘ LUẬT NÀY</span>
                </>
              )}
            </button>

            {onOpenContactAdmin && (
              <button
                onClick={onOpenContactAdmin}
                className="w-full sm:w-auto py-3.5 px-4 rounded-2xl bg-white/10 hover:bg-white/20 text-[#C5E5EC] hover:text-white font-bold text-xs transition cursor-pointer flex items-center justify-center space-x-1.5 border border-[#C5E5EC]/20"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Hỏi Ban Quản Trị 24/7</span>
              </button>
            )}
          </div>
        </div>

        {/* FOOTER METADATA */}
        <div className="pt-4 pb-6 text-center space-y-1 text-[11px] text-[#C5E5EC]/60">
          <p>© 2026 GigMe Platform • Hệ thống văn bản pháp quy Campus Student Escrow Code v2.4</p>
          <p>Ban hành bởi Ban Điều Hành GigMe • Hiệu lực bắt buộc trên toàn quốc</p>
        </div>
      </div>
    </div>
  );
};
