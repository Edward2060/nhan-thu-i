// File config.js: Chua toan bo noi dung tuy chinh cua website 20/10
// Nguoi dung chi can sua file nay de thay doi ten, ngay yeu, loi chuc, thu tinh va am nhac

window.SITE_CONFIG = {
  // Thong tin co ban cua cap doi
  couple: {
    girlName: "Bé Nhie ",          // Ten nguoi yeu (placeholder de nguoi dung thay)
    boyName: "Anh",              // Ten ban trai
    startDate: "2024-12-14"      // Ngay bat dau yeu nhau theo dinh dang YYYY-MM-DD
  },

  // 1. Man hinh mo dau (Intro)
  intro: {
    greeting: "Gửi bé.nhỏ...",
    badge: "Món Quà Dành Riêng Cho Em",
    title: "Gửi người con gái anh yêu ",
    subtitle: "nhấn mở hộp quà thử iii",
    buttonText: "Nhấn ở đây nèe"
  },

  // 2. Loi chuc lon o Hero Section
  hero: {
    badge: "20.10 • Ngày Phụ Nữ Việt Nam",
    title: "Chúc Mừng Ngày Phụ Nữ Việt Nam 20/10",
    subtitlePrefix: "Gửi đến ",
    // Cac cau chu chay hieu ung go chu typewriter
    typewriterTexts: [
      "cô gái dịu dàng và tuyệt vời nhất của anh.",
      "người luôn thắp sáng ngày của anh bằng nụ cười rạng rỡ.",
      "món quà vô giá mà cuộc đời đã mang đến bên anh.",
      "công chúa nhỏ mà anh muốn yêu thương và che chở mỗi ngày."
    ],
    scrollHint: "Cuộn xuống để xem tiếp món quà của tui nè"
  },

  // 3. Loi nhan ngan am ap
  message: {
    badge: "Lời Nhắn Gửi Yêu Thương",
    title: "Cảm Ơn Em Vì Đã Đến Bên Anh",
    subtitle: "Mỗi ngày có em đều là một ngày đặc biệt và ngập tràn hạnh phúc",
    quotes: [
      "Nhân ngày Phụ nữ Việt Nam 20/10, anh muốn gửi đến em những điều dịu dàng và chân thành nhất từ bản thân mình .",
      "Cảm ơn b.nhỏ vì đã luôn kiên nhẫn, lắng nghe và đồng hành cùng anh qua từng chặng đường. ",
      "Mong em một ngày 20/10 thật rạng rỡ, ngập tràn hoa thơm, tiếng cười và niềm vui. Dù ngoài kia có như nào thì tui vẫn luôn ở đây cùng với b.nhỏ"
    ],
    author: "— Người luôn iuuu b.nhỏ ❤️"
  },

  // 4. Buc thu tinh phong bi tuong tac
  letter: {
    badge: "Thư Tháng 10",
    title: "Bức Thư Gửi Em",
    subtitle: "Chạm vào phong bì để mở raaa nèee",
    envelopePrompt: "Chạm vào phong bì để mở thư nhé",
    closePrompt: "Chạm để gấp thư lại",
    salutation: "Gửi bạn nhỏ,",
    paragraphs: [
      "Những ngày mùa thu tháng 10 luôn mang đến một cảm giác thật đặc biệt, nhất là khi anh có em ở bên cạnh.",
      "Tháng 10 này đăc biệt vì là tháng của b.nhỏ nè. Vừa là một tháng đón chào sinh nhật tủi 20 vừa là ngày của phụ nữ việt nam. 2 ngày gần nhau như này cũm í nghĩa đúm hem. ",
      "Ở bên b.nhỏ, tui học được cách quan tâm nhiều hơn, biết trân trọng từng phút giây hiện tại. B.nhỏ đã dạy tui biết thế nào là sự ấm áp của tình yêu, là cảm giác bình yên mỗi ngày vẫn thấy nhau ở đó.",
      "Tui hong biết bạn nhỏ có coi được web chúc mừng sinh nhật kia chưa níu chưa hì tui chúc bạn nhỏ tuổi mới thật nhiều niềm vui có được nhiều may mắn và phải luôn vui tươi và hạnh phúc nhen. ",
      "Hôm nay là ngày dành riêng để tôn vinh người phụ nữ tuyệt vời nhất trong lòng tui. Chúc bé luôn rạng ngời, tự tin, yêu đời và luôn cảm nhận được tình cảm tui dành cho b.nhỏ.",
      "Cảm ơn em vì đã chọn đồng hành cùng anh. Yêu em nhiều hơn mỗi giờ hí hí !"
    ],
    closing: "Mãi yêu em,",
    signature: "Min Min 🤍"
  },

  // 5. Dem thoi gian yeu nhau (Love Days Counter)
  countdown: {
    badge: "Hành Trình Yêu Thương",
    title: "Hai đứa dính với nhau được",
    subtitle: "Mỗi giây phút bên em đều là một món quà vô giá của thời gian",
    quote: "Thời gian không làm tình yêu phai mờ, mà nó chỉ làm cho tui yêu em hơn mỗi ngày.",
    summaryTemplate: "Đã cùng nhau đi qua {years} năm {months} tháng {days} ngày ngọt ngào"
  },

  // 6. Loi ket va nut ban trai tim
  closing: {
    badge: "Gửi Trọn Yêu Thương",
    title: "Chúc Em Ngày 20/10 Thật Hạnh Phúc!",
    subtitle: "Cảm ơn em vì đã là người bạn đồng hành tuyệt vời nhất của anh",
    content: "Cảm ơn em vì đã luôn mang đến niềm vui và bình yên cho anh. Chúc bé nhỏ của anh luôn xinh đẹp như những đóa hoa rạng rỡ nhất mùa thu và ngập tràn nụ cười! Yêuu Nhiee",
    buttonText: "Gửi lại một trái tim cho tui ii ❤️",
    counterTemplate: "b.nhỏ đã gửi {count} trái tim cho tui rồi nè! 💕"
  },

  // 7. Am nhac nen
  music: {
    src: "assets/audio/music.mp3",  // Duong dan file mp3 (dat file vao assets/audio/music.mp3)
    title: "Giai điệu tình yêu 20/10",
    enableSynthFallback: true      // Tu dong phat giai dieu piano acoustic bang Web Audio neu chua co file mp3
  }
};
