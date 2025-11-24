import React, { useState, useEffect, useRef } from "react";
import {
  ShoppingBag,
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronRight,
  Star,
  Filter,
  Truck,
  Store,
  Boxes,
  MapPin,
  Check,
  Instagram,
  Youtube,
  Link,
  ArrowLeft,
  Plus,
  Minus,
  FileText,
  AlertCircle,
} from "lucide-react";

// --- Mock Data: 캐릭터/유아동 용품 B2B 발주 데이터 ---
const CATEGORIES = [
  "전체",
  "유아동의류",
  "완구/교구",
  "주방/식기",
  "생활/건강",
];

const PRODUCTS = [
  {
    id: 1,
    name: "캐치티니핑 하츄핑 방한용품 모음전 (장갑/목도리)",
    category: "유아동의류",
    price: 11900,
    originPrice: 23000,
    rating: 4.9,
    image: "🧣",
    description:
      "겨울 시즌 필수 아이템! 아이들이 좋아하는 하츄핑 캐릭터가 그려진 따뜻한 방한 장갑과 목도리 세트입니다. 부드러운 털 안감으로 보온성을 높였습니다.",
  },
  {
    id: 2,
    name: "티니핑 마스크 시즌3 새부리형 소형 (20매)",
    category: "생활/건강",
    price: 12900,
    originPrice: 15900,
    rating: 4.8,
    image: "😷",
    description:
      "숨쉬기 편한 새부리형 구조의 어린이용 마스크입니다. 3중 구조 필터로 안전하며, 귀가 아프지 않은 부드러운 이어밴드를 사용했습니다.",
  },
  {
    id: 3,
    name: "슈팅스타 캐치티니핑 시즌5 하츄핑 유아 털목도리",
    category: "유아동의류",
    price: 12900,
    originPrice: 21900,
    rating: 4.9,
    image: "🧣",
    description:
      "포근한 감촉의 유아용 털목도리입니다. 착용이 간편한 고리형 디자인으로 활동량이 많은 아이들도 흘러내림 없이 착용 가능합니다.",
  },
  {
    id: 4,
    name: "슈팅스타 캐치티니핑 패딩 벙어리 장갑",
    category: "유아동의류",
    price: 22900,
    originPrice: 32900,
    rating: 4.7,
    image: "🧤",
    description:
      "방수 기능이 있는 패딩 소재의 벙어리 장갑입니다. 눈싸움이나 스키장에서도 손 젖을 걱정 없이 따뜻하게 놀 수 있습니다.",
  },
  {
    id: 5,
    name: "슈팅스타 캐치티니핑 모자목도리 세트",
    category: "유아동의류",
    price: 16900,
    originPrice: 29900,
    rating: 5.0,
    image: "🧢",
    description:
      "모자와 목도리가 하나로! 귀까지 따뜻하게 덮어주는 일체형 방한 모자입니다. 귀여운 캐릭터 귀 장식이 포인트입니다.",
  },
  {
    id: 6,
    name: "이탈리안 브레인롯 랜덤 딱지 (25팩)",
    category: "완구/교구",
    price: 22900,
    originPrice: 39900,
    rating: 4.8,
    image: "🎲",
    description:
      "요즘 초등학생들 사이에서 대유행! 다양한 캐릭터 딱지를 모을 수 있는 랜덤 팩 세트입니다. 한 박스 25팩 구성으로 낱개 판매하기 좋습니다.",
  },
  {
    id: 7,
    name: "슈팅스타 캐치티니핑 시즌5 자석 글자 한글플러스",
    category: "완구/교구",
    price: 39900,
    originPrice: 49900,
    rating: 4.9,
    image: "🧲",
    description:
      "놀면서 배우는 한글 공부! 냉장고나 자석 칠판에 붙이며 글자를 익힐 수 있는 자석 교구 세트입니다.",
  },
  {
    id: 8,
    name: "캐치티니핑 올인원 교정 젓가락 스푼 포크 세트",
    category: "주방/식기",
    price: 13900,
    originPrice: 17500,
    rating: 4.8,
    image: "🥢",
    description:
      "올바른 젓가락질 습관을 길러주는 교정 젓가락과 스푼, 포크, 케이스까지 포함된 올인원 세트입니다. 어린이집 준비물로 강력 추천합니다.",
  },
  {
    id: 9,
    name: "슈팅스타 캐치티니핑 논슬립 스텐컵 (왕자핑)",
    category: "주방/식기",
    price: 9900,
    originPrice: 15000,
    rating: 4.7,
    image: "🥛",
    description:
      "바닥에 미끄럼 방지 처리가 되어 있어 쏟을 걱정이 적은 스테인리스 컵입니다. 위생적이고 내구성이 뛰어납니다.",
  },
  {
    id: 10,
    name: "위시캣 유아 어린이 안심락 스트랩 보틀",
    category: "주방/식기",
    price: 8900,
    originPrice: 12500,
    rating: 4.6,
    image: "🍼",
    description:
      "원터치 오픈 방식과 잠금 장치(안심락)가 있어 가방 속에서도 샐 염려가 없는 유아용 물병입니다. 어깨 스트랩이 포함되어 있습니다.",
  },
  {
    id: 11,
    name: "새콤달콤 캐치티니핑 시즌4 플레이팅 자석 소꿉놀이",
    category: "완구/교구",
    price: 23500,
    originPrice: 27000,
    rating: 4.8,
    image: "🏰",
    description:
      "예쁜 디저트를 자석으로 붙였다 떼었다 할 수 있는 소꿉놀이 세트입니다. 역할 놀이를 통해 아이들의 상상력을 키워줍니다.",
  },
  {
    id: 12,
    name: "아산제약 hCG 임신테스트기 진단 키트 (25회분)",
    category: "생활/건강",
    price: 23900,
    originPrice: 47000,
    rating: 4.9,
    image: "⚕️",
    description:
      "약국 및 편의점 판매용 임신 진단 키트입니다. 정확도가 높고 사용이 간편하여 꾸준히 판매되는 스테디셀러입니다.",
  },
  {
    id: 13,
    name: "참존 KF94 톤업핏 블랙라벨 마스크 중형",
    category: "생활/건강",
    price: 10900,
    originPrice: 20000,
    rating: 4.5,
    image: "😷",
    description:
      "스타일리시한 핏과 편안한 호흡을 동시에 만족시키는 KF94 마스크입니다. 얼굴 라인을 살려주는 디자인으로 성인 여성 및 청소년에게 인기입니다.",
  },
  {
    id: 14,
    name: "젠바디 코로나 자가 진단 키트 (10회분)",
    category: "생활/건강",
    price: 9350,
    originPrice: 13500,
    rating: 4.6,
    image: "🩺",
    description:
      "빠르고 간편하게 코로나 감염 여부를 확인할 수 있는 자가 검사 키트입니다. 비상용으로 구비해두기 좋은 10회분 대용량 구성입니다.",
  },
  {
    id: 15,
    name: "헬로카봇 시즌15 무소음 교정젓가락 케이스 세트",
    category: "주방/식기",
    price: 14900,
    originPrice: 19000,
    rating: 4.7,
    image: "🤖",
    description:
      "달그락거리는 소리를 줄인 무소음 케이스가 포함된 헬로카봇 젓가락 세트입니다. 남자아이들에게 인기 만점인 선물입니다.",
  },
  {
    id: 16,
    name: "위시캣 하트 손잡이 휴대용 보틀 380ml",
    category: "주방/식기",
    price: 8950,
    originPrice: 11000,
    rating: 4.5,
    image: "🥤",
    description:
      "사랑스러운 하트 모양 손잡이가 달린 휴대용 물병입니다. 가볍고 투명한 소재로 내용물 확인이 쉽습니다.",
  },
  {
    id: 17,
    name: "반짝핑 수저세트 교정 젓가락 (어린이집용)",
    category: "주방/식기",
    price: 13900,
    originPrice: 17900,
    rating: 4.7,
    image: "✨",
    description:
      "블링블링 반짝핑 캐릭터가 들어간 수저 세트입니다. 아이들이 식사 시간을 즐거워하도록 도와줍니다.",
  },
  {
    id: 18,
    name: "빛나핑 수저세트 교정 젓가락 (유치원용)",
    category: "주방/식기",
    price: 13900,
    originPrice: 17900,
    rating: 4.8,
    image: "🌟",
    description:
      "유치원생에게 딱 맞는 사이즈의 교정 젓가락 세트입니다. 스테인리스 소재로 위생적으로 사용할 수 있습니다.",
  },
  {
    id: 19,
    name: "초롱핑 수저세트 교정 젓가락 올인원",
    category: "주방/식기",
    price: 13900,
    originPrice: 17900,
    rating: 4.6,
    image: "🎋",
    description:
      "초롱초롱한 눈망울의 초롱핑 캐릭터 수저 세트입니다. 케이스가 포함되어 있어 휴대하기 편리합니다.",
  },
  {
    id: 20,
    name: "새콤달콤 캐치티니핑 디저트샵 자석 소꿉놀이",
    category: "완구/교구",
    price: 27000,
    originPrice: 35000,
    rating: 4.9,
    image: "🍰",
    description:
      "디저트 가게 놀이를 할 수 있는 풍성한 구성의 소꿉놀이 세트입니다. 자석으로 되어 있어 정리 정돈도 쉽습니다.",
  },
];

// --- Components ---

const ProductDetailPage = ({ product, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (delta) => {
    const newQuantity = quantity + delta;
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = () => {
    onAddToCart(product, quantity);
    onBack(); // 장바구니 담고 목록으로 돌아가기 (선택 사항)
  };

  return (
    <div className="animate-in slide-in-from-right duration-300 bg-white min-h-full">
      {/* Detail Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-slate-100 px-4 h-14 flex items-center gap-4">
        <button
          onClick={onBack}
          className="p-2 -ml-2 hover:bg-slate-100 rounded-full"
        >
          <ArrowLeft className="w-6 h-6 text-slate-600" />
        </button>
        <h2 className="font-bold text-lg text-slate-800 truncate pr-4">
          상품 상세 정보
        </h2>
      </div>

      <div className="max-w-3xl mx-auto pb-24">
        {/* Image Area */}
        <div className="bg-slate-50 aspect-square w-full flex items-center justify-center mb-6">
          <span className="text-[10rem] drop-shadow-2xl">{product.image}</span>
        </div>

        {/* Product Info */}
        <div className="px-5">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-yellow-500">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-xs font-bold">{product.rating}</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-slate-900 mb-4 leading-snug">
            {product.name}
          </h1>

          <div className="flex items-end gap-3 mb-4 pb-6 border-b border-slate-100">
            <span className="text-3xl font-bold text-slate-900">
              ₩{new Intl.NumberFormat("ko-KR").format(product.price)}
            </span>
            <span className="text-lg text-slate-400 line-through mb-1">
              ₩{new Intl.NumberFormat("ko-KR").format(product.originPrice)}
            </span>
            <span className="text-sm text-red-500 font-bold mb-1 ml-auto bg-red-50 px-2 py-1 rounded">
              {Math.round((1 - product.price / product.originPrice) * 100)}% OFF
            </span>
          </div>

          {/* 최소 주문 수량 안내 (New) */}
          <div className="bg-indigo-50 text-indigo-900 px-4 py-3 rounded-lg mb-8 flex items-start gap-3 border border-indigo-100">
            <AlertCircle className="w-5 h-5 mt-0.5 flex-shrink-0 text-indigo-600" />
            <div>
              <span className="font-bold block text-sm">
                최소 1카톤 발주 가능
              </span>
              <span className="text-xs text-indigo-700 mt-1 block">
                본 상품은 도매 전용 상품으로 낱개 발주가 불가능하며, 카톤(박스)
                단위로만 출고됩니다.
              </span>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                상품 설명
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm bg-slate-50 p-5 rounded-xl border border-slate-100">
                {product.description}
              </p>
            </div>

            {/* 상세 페이지 이미지 영역 (New) */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                상품 상세 정보
              </h3>
              <div className="w-full bg-slate-100 rounded-xl min-h-[600px] flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-200">
                <FileText className="w-16 h-16 mb-4 opacity-30" />
                <span className="font-medium">상세 페이지 이미지 영역</span>
                <span className="text-sm mt-2 text-slate-400">
                  제품 상세 설명 이미지가 이곳에 로드됩니다.
                </span>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                배송 정보
              </h3>
              <div className="bg-slate-50 p-5 rounded-xl space-y-3 text-sm text-slate-600 border border-slate-100">
                <div className="flex gap-3 items-center">
                  <Truck className="w-5 h-5 text-slate-400" />
                  <span>평일 14시 이전 주문 시 당일 출고</span>
                </div>
                <div className="flex gap-3 items-center">
                  <Boxes className="w-5 h-5 text-slate-400" />
                  <span>박스 단위 발주 가능 (혼합 가능)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-3xl mx-auto flex flex-col gap-4">
          {/* Quantity Control */}
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900">발주 수량 (카톤)</span>
            <div className="flex items-center gap-4 bg-slate-100 rounded-lg p-1">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-slate-50 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="font-bold w-8 text-center">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-8 h-8 flex items-center justify-center bg-white rounded shadow-sm hover:bg-slate-50"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Total & Button */}
          <div className="flex gap-3 items-center">
            <div className="flex-1">
              <div className="text-xs text-slate-500">총 발주 금액</div>
              <div className="text-xl font-bold text-indigo-600">
                ₩
                {new Intl.NumberFormat("ko-KR").format(
                  product.price * quantity
                )}
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="flex-[2] bg-slate-800 hover:bg-slate-900 text-white font-bold py-3.5 rounded-xl shadow-lg transition-colors flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-5 h-5" />
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginPage = ({ onLogin }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);

  // 주소 검색 모달 상태 및 Ref
  const [isAddrOpen, setIsAddrOpen] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const addrWrapRef = useRef(null);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    mobile: "",
    email: "",
    zipcode: "",
    address: "",
    addressDetail: "",
    businessType: "문구/팬시점",
    storeName: "",
    repName: "",
    businessNumber: "",
    businessCategory: "",
    businessItem: "",
    taxEmail: "",
    taxType: "발행함",
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    if (
      isAddrOpen &&
      isScriptLoaded &&
      addrWrapRef.current &&
      window.daum &&
      window.daum.Postcode
    ) {
      addrWrapRef.current.innerHTML = "";
      new window.daum.Postcode({
        oncomplete: function (data) {
          let addr =
            data.userSelectedType === "R"
              ? data.roadAddress
              : data.jibunAddress;
          let extraAddr = "";
          if (data.userSelectedType === "R") {
            if (data.bname !== "" && /[동|로|가]$/g.test(data.bname))
              extraAddr += data.bname;
            if (data.buildingName !== "" && data.apartment === "Y")
              extraAddr +=
                extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
            if (extraAddr !== "") extraAddr = " (" + extraAddr + ")";
          }
          setFormData((prev) => ({
            ...prev,
            zipcode: data.zonecode,
            address: addr + extraAddr,
          }));
          setIsAddrOpen(false);
        },
        width: "100%",
        height: "100%",
      }).embed(addrWrapRef.current);
    }
  }, [isAddrOpen, isScriptLoaded]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginMode) {
      onLogin(formData.storeName || "티니핑월드 남대문점");
    } else {
      if (formData.password !== formData.confirmPassword) {
        alert("비밀번호가 일치하지 않습니다.");
        return;
      }
      alert(
        "사업자 회원가입 신청이 완료되었습니다. 관리자 승인 후 이용 가능합니다."
      );
      setIsLoginMode(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 px-4 py-8 sm:px-6 lg:px-8 transition-all duration-500">
      <div
        className={`bg-white rounded-2xl shadow-xl w-full mx-auto transition-all duration-500 ${
          isLoginMode ? "max-w-md p-8" : "max-w-3xl p-8"
        }`}
      >
        <div className="text-center mb-8">
          <div className="bg-slate-800 w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center mx-auto mb-4 text-white text-2xl sm:text-3xl font-bold shadow-lg">
            S
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            {isLoginMode ? "SJ 파트너 로그인" : "사업자 회원등록"}
          </h1>
          <p className="text-slate-500 mt-2 text-sm font-semibold">
            SJ Innovation
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {isLoginMode && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  아이디
                </label>
                <input
                  name="username"
                  type="text"
                  placeholder="아이디를 입력하세요"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  비밀번호
                </label>
                <input
                  name="password"
                  type="password"
                  placeholder="비밀번호를 입력하세요"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 outline-none"
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          )}

          {!isLoginMode && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                  필수정보 <span className="text-red-500 text-sm">*</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      이름(실명)
                    </label>
                    <input
                      name="name"
                      type="text"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      아이디
                    </label>
                    <div className="flex gap-2">
                      <input
                        name="username"
                        type="text"
                        className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                        onChange={handleChange}
                        required
                      />
                      <button
                        type="button"
                        className="bg-slate-600 text-white text-xs px-3 rounded hover:bg-slate-700 whitespace-nowrap"
                      >
                        중복확인
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      비밀번호
                    </label>
                    <input
                      name="password"
                      type="password"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      비밀번호 확인
                    </label>
                    <input
                      name="confirmPassword"
                      type="password"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      휴대폰 번호
                    </label>
                    <input
                      name="mobile"
                      type="tel"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      이메일
                    </label>
                    <input
                      name="email"
                      type="email"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    기본 배송지 주소
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      name="zipcode"
                      type="text"
                      value={formData.zipcode}
                      readOnly
                      className="w-24 px-3 py-2 rounded border border-slate-300 bg-slate-100 text-sm"
                      placeholder="우편번호"
                    />
                    <button
                      type="button"
                      onClick={() => setIsAddrOpen(true)}
                      className="bg-slate-600 text-white text-xs px-3 rounded hover:bg-slate-700"
                    >
                      주소검색
                    </button>
                  </div>
                  <input
                    name="address"
                    type="text"
                    value={formData.address}
                    readOnly
                    className="w-full px-3 py-2 rounded border border-slate-300 bg-slate-100 mb-2"
                    placeholder="기본 주소"
                  />
                  <input
                    name="addressDetail"
                    type="text"
                    className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                    placeholder="나머지 주소 (상세주소)"
                    onChange={handleChange}
                  />
                </div>
              </section>

              <section className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <h3 className="text-lg font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                  사업자 필수정보{" "}
                  <span className="text-red-500 text-sm">*</span>
                </h3>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    사업 형태
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      "문구/팬시점",
                      "과자/아이스크림",
                      "편의점",
                      "키즈카페",
                      "기타업종",
                    ].map((type) => (
                      <label
                        key={type}
                        className="flex items-center gap-2 text-sm cursor-pointer p-2 border rounded hover:bg-white transition-colors"
                      >
                        <input
                          type="radio"
                          name="businessType"
                          value={type}
                          checked={formData.businessType === type}
                          onChange={handleChange}
                          className="text-slate-600 focus:ring-slate-500"
                        />
                        {type}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      상호명(법인명)
                    </label>
                    <input
                      name="storeName"
                      type="text"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      대표자명
                    </label>
                    <input
                      name="repName"
                      type="text"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      사업자 등록번호
                    </label>
                    <input
                      name="businessNumber"
                      type="text"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      업태
                    </label>
                    <input
                      name="businessCategory"
                      type="text"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      종목
                    </label>
                    <input
                      name="businessItem"
                      type="text"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      세금계산서 이메일
                    </label>
                    <input
                      name="taxEmail"
                      type="email"
                      className="w-full px-3 py-2 rounded border border-slate-300 focus:border-slate-500 outline-none"
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="mt-4 p-3 bg-slate-50 rounded-lg text-xs text-slate-700 flex items-start gap-2 border border-slate-200">
                  <Check className="w-4 h-4 mt-0.5 flex-shrink-0 text-red-500" />
                  <span>
                    허위 정보 기재 시 법적 문제가 발생할 수 있으며, 부정확한
                    정보 입력 시 정회원 승인이 거절될 수 있습니다.
                  </span>
                </div>
              </section>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-slate-800 hover:bg-slate-900 text-white font-bold py-4 rounded-xl transition-colors shadow-lg hover:shadow-xl mt-4 text-lg"
          >
            {isLoginMode ? "로그인하기" : "사업자 회원등록 신청"}
          </button>
        </form>
        <div className="mt-6 text-center border-t border-slate-100 pt-6">
          <p className="text-sm text-slate-600">
            {isLoginMode
              ? "아직 파트너 회원이 아니신가요?"
              : "이미 아이디가 있으신가요?"}
            <button
              onClick={() => {
                setIsLoginMode(!isLoginMode);
                window.scrollTo(0, 0);
              }}
              className="ml-2 font-bold text-slate-800 hover:underline focus:outline-none"
            >
              {isLoginMode ? "사업자 회원가입" : "로그인하기"}
            </button>
          </p>
        </div>
        <p className="mt-8 text-center text-xs text-slate-400">
          copyright (c) SJ Innovation. All rights reserved.
        </p>
      </div>
      {isAddrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-2xl relative h-[500px] flex flex-col">
            <div className="p-4 border-b flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg">주소 검색</h3>
              <button
                onClick={() => setIsAddrOpen(false)}
                className="p-1 hover:bg-slate-200 rounded-full"
              >
                <X className="w-6 h-6 text-slate-500" />
              </button>
            </div>
            <div
              ref={addrWrapRef}
              className="flex-1 w-full bg-slate-100 relative"
            >
              {!isScriptLoaded && (
                <div className="absolute inset-0 flex items-center justify-center text-slate-500">
                  주소 검색 로딩중...
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const formatPrice = (price) => new Intl.NumberFormat("ko-KR").format(price);

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [storeName, setStoreName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 장바구니 추가 로직 개선 (수량 반영 및 중복 합산)
  const addToCart = (product, quantity = 1) => {
    const existingItemIndex = cart.findIndex((item) => item.id === product.id);

    if (existingItemIndex > -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].quantity += quantity;
      setCart(newCart);
      alert(`${product.name} 수량이 ${quantity}개 추가되었습니다.`);
    } else {
      setCart([...cart, { ...product, quantity }]);
      alert(`${product.name}이(가) 장바구니에 ${quantity}개 담겼습니다.`);
    }
  };

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === "전체" || product.category === selectedCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleLogin = (name) => {
    setStoreName(name || "티니핑월드 남대문점");
    setIsLoggedIn(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 상품 상세 페이지가 선택되었을 때 렌더링
  if (selectedProduct) {
    return (
      <ProductDetailPage
        product={selectedProduct}
        onBack={() => setSelectedProduct(null)}
        onAddToCart={addToCart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white shadow-sm border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setSelectedCategory("전체")}
          >
            <div className="bg-slate-800 w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-lg leading-none text-slate-800">
                SJ Innovation
              </span>
            </div>
          </div>
          <div className="hidden md:flex flex-1 max-w-lg mx-8 relative">
            <input
              type="text"
              placeholder="상품 검색 (캐릭터, 품명)"
              className="w-full bg-slate-100 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-slate-500 focus:bg-white transition-all"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Search className="absolute left-3 top-2.5 text-slate-400 w-4 h-4" />
          </div>
          <div className="flex items-center gap-4">
            <button
              className="p-2 text-slate-600 hover:text-slate-900 relative"
              onClick={() => setIsCartOpen(true)}
            >
              <Boxes className="w-6 h-6" />
              {cart.length > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cart.length}
                </span>
              )}
            </button>
            <div className="h-8 w-[1px] bg-slate-200 hidden sm:block"></div>
            <button className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <span className="hidden sm:block">{storeName} 사장님</span>
            </button>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-8 mb-10 text-white shadow-lg flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <span className="bg-white/20 text-white px-3 py-1 rounded-full text-xs font-semibold mb-3 inline-block border border-white/30">
              SJ Innovation 파트너
            </span>
            <h2 className="text-3xl font-bold mb-2">
              겨울 시즌 방한/캐릭터 신상 입고!
            </h2>
            <p className="text-slate-300 max-w-lg">
              티니핑 시즌5 신규 굿즈 & 방한 용품 대량 입고. 도매가 최저 보장.
            </p>
          </div>
          <div className="flex gap-3">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-center min-w-[100px]">
              <div className="text-2xl font-bold">NEW</div>
              <div className="text-xs text-slate-300">신규 캐릭터</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20 text-center min-w-[100px]">
              <div className="text-2xl font-bold">40%</div>
              <div className="text-xs text-slate-300">추가 할인</div>
            </div>
          </div>
        </div>

        <div className="flex overflow-x-auto pb-4 gap-2 mb-6 scrollbar-hide">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors border ${
                selectedCategory === cat
                  ? "bg-slate-800 text-white border-slate-800"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 hover:bg-slate-50"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            // 카드 전체를 클릭하면 상세 페이지로 이동하도록 onClick 이벤트 수정
            <div
              key={product.id}
              onClick={() => setSelectedProduct(product)}
              className="bg-white rounded-xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group overflow-hidden flex flex-col cursor-pointer"
            >
              <div className="aspect-[4/3] bg-slate-100 relative flex items-center justify-center overflow-hidden">
                <span className="text-6xl transform group-hover:scale-110 transition-transform duration-500">
                  {product.image}
                </span>
                <div className="absolute top-3 left-3 bg-slate-800 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
                  인기 급상승
                </div>
              </div>
              <div className="p-5 flex flex-col flex-grow">
                <div className="text-xs text-slate-400 mb-1 font-medium">
                  {product.category}
                </div>
                <h3 className="font-bold text-slate-800 mb-2 text-lg leading-tight line-clamp-2 group-hover:text-slate-600 transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center gap-1 mb-4">
                  <Store className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium text-slate-600">
                    {product.rating}
                  </span>
                  <span className="text-xs text-slate-400">(점주 리뷰)</span>
                </div>
                <div className="mt-auto">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-slate-400">권장소비자가</span>
                    <span className="text-xs text-slate-400 line-through">
                      ₩{formatPrice(product.originPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline mb-3">
                    <span className="text-sm font-bold text-slate-700">
                      공급가
                    </span>
                    <span className="text-xl font-bold text-slate-800">
                      ₩{formatPrice(product.price)}
                    </span>
                  </div>
                  {/* 상세 페이지 이동을 유도하기 위해 버튼의 텍스트와 아이콘 변경 */}
                  <button className="w-full bg-slate-50 text-slate-700 border border-slate-200 group-hover:bg-slate-800 group-hover:text-white group-hover:border-transparent font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Search className="w-4 h-4" />
                    상세보기 & 발주
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            검색 결과가 없습니다.
          </div>
        )}
      </main>

      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsCartOpen(false)}
          ></div>
          <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50">
              <h2 className="font-bold text-lg">발주 목록 ({cart.length})</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="p-2 hover:bg-slate-200 rounded-full"
              >
                <X className="w-5 h-5 text-slate-500" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400">
                  <Boxes className="w-12 h-12 mb-4 opacity-20" />
                  <p>발주할 상품이 없습니다.</p>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex gap-4 items-center py-3 border-b border-slate-100 last:border-0"
                  >
                    <div className="w-16 h-16 bg-slate-100 rounded-lg flex items-center justify-center text-2xl flex-shrink-0">
                      {item.image}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-slate-800 line-clamp-1">
                        {item.name}
                      </h4>
                      <div className="flex justify-between items-center mt-1">
                        <span className="text-slate-600 text-xs bg-slate-100 px-2 py-0.5 rounded">
                          수량: {item.quantity}개
                        </span>
                        <span className="text-slate-800 font-bold text-sm">
                          ₩{formatPrice(item.price * item.quantity)}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const newCart = [...cart];
                        newCart.splice(idx, 1);
                        setCart(newCart);
                      }}
                      className="text-slate-400 hover:text-red-500 p-2"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            {cart.length > 0 && (
              <div className="p-5 border-t border-slate-100 bg-slate-50">
                <div className="flex justify-between mb-4">
                  <span className="text-slate-600">총 공급가액</span>
                  <span className="font-bold text-xl text-slate-800">
                    ₩
                    {formatPrice(
                      cart.reduce(
                        (sum, item) => sum + item.price * item.quantity,
                        0
                      )
                    )}
                  </span>
                </div>
                <button className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3.5 rounded-xl font-bold shadow-lg transition-colors flex justify-center items-center gap-2">
                  <Truck className="w-5 h-5" />
                  발주 신청하기
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <footer className="bg-slate-600 text-white py-12 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-b border-slate-500 pb-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-white rounded-full"></div>
                <div className="flex flex-col font-bold">
                  <span>SJ INNOVATION</span>
                </div>
              </div>
            </div>
            <div>
              <h5 className="font-bold mb-4 text-slate-200">CONTACT</h5>
              <p className="text-sm text-slate-300">070-7816-9999</p>
            </div>
            <div className="md:col-span-1">
              <h5 className="font-bold mb-4 text-slate-200">ADDRESS</h5>
              <div className="text-sm text-slate-300 space-y-1">
                <p>인천 광역시 갈산동 94 인천테크노밸리 U1센터</p>
                <p>A동 S615호</p>
                <p>사업자 번호 : 373-28-01764</p>
                <p>대표 : 윤 병 민</p>
              </div>
            </div>
          </div>
          <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-300">
            <div className="mb-4 md:mb-0">Privacy Policy</div>
            <div>copyright (c) SJ Innovation. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
