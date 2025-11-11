// import Swiper from "../plugins/swiper/swiper-bundle.js";
// import Shuffle from "../plugins/shufflejs/shuffle";

(function () {
  "use strict";

  // Preloader js
  // window.addEventListener("load", (e) => {
  //   document.querySelector(".preloader").style.display = "none";
  // });

  //sticky header
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    if (scrollY > 0) {
      header.classList.add("header-sticky");
    } else {
      header.classList.remove("header-sticky");
    }
  });

  //reviews-carousel
  new Swiper(".reviews-carousel", {
    loop: true,
    spaceBetween: 20,
    pagination: {
      el: ".reviews-carousel-pagination",
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  });

  //auth-banner-carousel
  new Swiper(".auth-banner-carousel", {
    slidesPerView: 1,
    pagination: {
      el: ".auth-banner-carousel .pagination",
      type: "bullets",
      clickable: true,
    },
  });

  // for tab component
  // Get all the tab groups on the page
  const tabGroups = document.querySelectorAll("[data-tab-group]");
  // Loop through each tab group
  tabGroups.forEach((tabGroup) => {
    // Get the tabs nav and content for this tab group
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsNavItem = tabsNav.querySelectorAll("[data-tab]");

    // Get the active tab index from local storage, or default to 0 if not set
    const activeTabName =
      localStorage.getItem(`activeTabName-${tabGroup.dataset.tabGroup}`) ||
      tabsNavItem[0].getAttribute("data-tab");

    // Set the active tab
    setActiveTab(tabGroup, activeTabName);

    // Add a click event listener to each tab nav item
    tabsNavItem.forEach((tabNavItem) => {
      tabNavItem.addEventListener("click", (e) => {
        e.preventDefault();
        // Get the index of the clicked tab nav item
        const tabName = tabNavItem.dataset.tab;
        setActiveTab(tabGroup, tabName);

        // Save the active tab index to local storage
        localStorage.setItem(
          `activeTabName-${tabGroup.dataset.tabGroup}`,
          tabName
        );
      });
    });
  });

  // Function to set the active tab for a given tab group
  function setActiveTab(tabGroup, tabName) {
    // Get the tabs nav and content for this tab group
    const tabsNav = tabGroup.querySelector("[data-tab-nav]");
    const tabsContent = tabGroup.querySelector("[data-tab-content]");

    // Remove the active class from all tab nav items and content panes
    tabsNav.querySelectorAll("[data-tab]").forEach((tabNavItem) => {
      tabNavItem.classList.remove("active");
    });
    tabsContent.querySelectorAll("[data-tab-panel]").forEach((tabPane) => {
      tabPane.classList.remove("active");
    });

    // Add the active class to the selected tab nav item and content pane
    const selectedTabNavItem = tabsNav.querySelector(`[data-tab="${tabName}"]`);
    selectedTabNavItem.classList.add("active");
    const selectedTabPane = tabsContent.querySelector(
      `[data-tab-panel="${tabName}"]`
    );
    selectedTabPane.classList.add("active");
  }

  //counter
  function counter(el, duration) {
    const endValue = Number(el.innerText.replace(/\D/gi, ""));
    const text = el.innerText.replace(/\W|\d/gi, "");
    const timeStep = Math.round(duration / endValue);
    let current = 0;
    const timer = setInterval(() => {
      if (current > endValue) {
        current = endValue;
      } else {
        current += 1;
      }
      el.innerText = current + text;
      if (current === endValue) {
        clearInterval(timer);
      }
    }, timeStep);
  }

  document.querySelectorAll(".counter .count").forEach((count) => {
    counter(count, 500);
  });

  //play youtube-video
  const videoPlayBtn = document.querySelector(".video-play-btn");
  if (videoPlayBtn) {
    videoPlayBtn.addEventListener("click", function () {
      const videoPlayer = this.closest(".video").querySelector(".video-player");
      videoPlayer.classList.remove("hidden");
    });
  }

  // Accordion component
  const accordion = document.querySelectorAll("[data-accordion]");
  accordion.forEach((header) => {
    header.addEventListener("click", () => {
      const accordionItem = header.parentElement;
      accordionItem.classList.toggle("active");
    });
  });

  // Accordion toggle function for course sections
  window.toggleAccordion = function (id) {
    const content = document.getElementById(id);
    const icon = document.getElementById("icon-" + id);

    if (content.classList.contains("hidden")) {
      content.classList.remove("hidden");
      icon.style.transform = "rotate(180deg)";
    } else {
      content.classList.add("hidden");
      icon.style.transform = "rotate(0deg)";
    }
  };

  // Consultation form validation
  const consultationForm = document.getElementById("consultationForm");
  if (consultationForm) {
    consultationForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const childName = this.childName.value.trim();
      const birthYear = this.birthYear.value;
      const parentPhone = this.parentPhone.value.trim();

      // Validate child name
      if (childName.length < 2) {
        alert("Vui lòng nhập họ tên con (ít nhất 2 ký tự)");
        return;
      }

      // Validate birth year
      if (!birthYear) {
        alert("Vui lòng chọn năm sinh");
        return;
      }

      // Validate phone
      const phoneRegex = /^0\d{9}$/;
      if (!phoneRegex.test(parentPhone)) {
        alert(
          "Số điện thoại không hợp lệ. Vui lòng nhập 10 số, bắt đầu bằng 0"
        );
        return;
      }

      // Success
      alert(
        `Cảm ơn bạn đã đăng ký!\n\nThông tin:\n- Họ tên: ${childName}\n- Năm sinh: ${birthYear}\n- SĐT: ${parentPhone}\n\nChúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất!`
      );
      this.reset();
    });
  }

  //shuffle
  const Shuffle = window.Shuffle;
  const tabItems = document.querySelector(".integration-tab-items");
  if (tabItems) {
    const myShuffle = new Shuffle(tabItems, {
      itemSelector: ".integration-tab-item",
      sizer: ".integration-tab-item",
      buffer: 1,
    });
    const tabLinks = document.querySelectorAll(".integration-tab .filter-btn");
    tabLinks.forEach((tabItem) => {
      tabItem.addEventListener("click", function (e) {
        e.preventDefault();
        let filter;
        const group = tabItem.getAttribute("data-group");
        filter = group;
        if (filter === "all") {
          filter = Shuffle.ALL_ITEMS;
        }
        tabLinks.forEach((link) => link.classList.remove("filter-btn-active"));
        this.classList.add("filter-btn-active");
        myShuffle.filter(filter);
      });
    });
  }

  // Modal popup for competency videos
  const modalData = {
    // Triết gia Tập sự (6-9 tuổi)
    "ts-hieubiet": {
      title: "📚 Hiểu biết",
      subtitle: "Triết gia Tập sự (6-9 tuổi) | 2 chủ đề",
      headerClass: "from-green-500 to-green-600",
      topics: [
        {
          title: "Chủ đề 1: Tri thức cơ bản",
          videoId: "rBfwtSlUgQQ",
          quizCount: 5,
        },
        {
          title: "Chủ đề 2: Khám phá thế giới",
          videoId: "YoXxevp1WRQ",
          quizCount: 5,
        },
      ],
    },
    "ts-yeuthuong": {
      title: "❤️ Yêu thương",
      subtitle: "Triết gia Tập sự (6-9 tuổi) | 2 chủ đề",
      headerClass: "from-green-500 to-green-600",
      topics: [
        {
          title: "Chủ đề 1: Yêu gia đình",
          videoId: "BsVq5R_F6RA",
          quizCount: 5,
        },
        {
          title: "Chủ đề 2: Yêu bạn bè",
          videoId: "HEzQ2ITxCrQ",
          quizCount: 5,
        },
      ],
    },
    "ts-suynghi": {
      title: "🧠 Suy nghĩ",
      subtitle: "Triết gia Tập sự (6-9 tuổi) | 2 chủ đề",
      headerClass: "from-green-500 to-green-600",
      topics: [
        {
          title: "Chủ đề 1: Tư duy logic",
          videoId: "i_FNdq2agBk",
          quizCount: 5,
        },
        {
          title: "Chủ đề 2: Giải quyết vấn đề",
          videoId: "UVQRU6nHjGY",
          quizCount: 5,
        },
      ],
    },
    "ts-xahoi": {
      title: "🤝 Xã hội",
      subtitle: "Triết gia Tập sự (6-9 tuổi) | 2 chủ đề",
      headerClass: "from-green-500 to-green-600",
      topics: [
        {
          title: "Chủ đề 1: Kỹ năng giao tiếp",
          videoId: "R1vskiVDwl4",
          quizCount: 5,
        },
        {
          title: "Chủ đề 2: Làm việc nhóm",
          videoId: "saXfavo1OXo",
          quizCount: 5,
        },
      ],
    },
    "ts-sangtao": {
      title: "🎨 Sáng tạo",
      subtitle: "Triết gia Tập sự (6-9 tuổi) | 2 chủ đề",
      headerClass: "from-green-500 to-green-600",
      topics: [
        {
          title: "Chủ đề 1: Tư duy sáng tạo",
          videoId: "cCL__14fqtg",
          quizCount: 5,
        },
        {
          title: "Chủ đề 2: Nghệ thuật thể hiện",
          videoId: "VqHSbMR_udo",
          quizCount: 5,
        },
      ],
    },
    "ts-kynang": {
      title: "🌟 Kỹ năng sống",
      subtitle: "Triết gia Tập sự (6-9 tuổi) | 2 chủ đề",
      headerClass: "from-green-500 to-green-600",
      topics: [
        {
          title: "Chủ đề 1: Tự chăm sóc bản thân",
          videoId: "Q80jAORd_TE",
          quizCount: 5,
        },
        {
          title: "Chủ đề 2: Quản lý cảm xúc",
          videoId: "KJ4lLxazSBk",
          quizCount: 5,
        },
      ],
    },

    // Triết gia Khám Phá (10-15 tuổi)
    "kp-hieubiet": {
      title: "📚 Hiểu biết",
      subtitle: "Triết gia Khám Phá (10-15 tuổi) | 2 chủ đề",
      headerClass: "from-green-600 to-green-700",
      topics: [
        {
          title: "Chủ đề 1: Tri thức nâng cao",
          videoId: "h11u3vtcpaY",
          quizCount: 8,
        },
        {
          title: "Chủ đề 2: Phân tích thông tin",
          videoId: "pVeq-0dIqpk",
          quizCount: 8,
        },
      ],
    },
    "kp-yeuthuong": {
      title: "❤️ Yêu thương",
      subtitle: "Triết gia Khám Phá (10-15 tuổi) | 2 chủ đề",
      headerClass: "from-green-600 to-green-700",
      topics: [
        {
          title: "Chủ đề 1: Trách nhiệm xã hội",
          videoId: "Dj8RE7FKuTY",
          quizCount: 8,
        },
        {
          title: "Chủ đề 2: Đồng cảm sâu sắc",
          videoId: "OPcOr5Z7_B4",
          quizCount: 8,
        },
      ],
    },
    "kp-suynghi": {
      title: "🧠 Suy nghĩ",
      subtitle: "Triết gia Khám Phá (10-15 tuổi) | 2 chủ đề",
      headerClass: "from-green-600 to-green-700",
      topics: [
        {
          title: "Chủ đề 1: Tư duy phản biện",
          videoId: "lLWEXRAnQd0",
          quizCount: 8,
        },
        {
          title: "Chủ đề 2: Phân tích và tổng hợp",
          videoId: "GPh2fyIxLxo",
          quizCount: 8,
        },
      ],
    },
    "kp-xahoi": {
      title: "🤝 Xã hội",
      subtitle: "Triết gia Khám Phá (10-15 tuổi) | 2 chủ đề",
      headerClass: "from-green-600 to-green-700",
      topics: [
        {
          title: "Chủ đề 1: Lãnh đạo và quản lý",
          videoId: "8T_jwq9ph8k",
          quizCount: 8,
        },
        {
          title: "Chủ đề 2: Xây dựng cộng đồng",
          videoId: "eIho2S0ZahI",
          quizCount: 8,
        },
      ],
    },
    "kp-sangtao": {
      title: "🎨 Sáng tạo",
      subtitle: "Triết gia Khám Phá (10-15 tuổi) | 2 chủ đề",
      headerClass: "from-green-600 to-green-700",
      topics: [
        {
          title: "Chủ đề 1: Đổi mới và sáng tạo",
          videoId: "gyM6rx69iqg",
          quizCount: 8,
        },
        {
          title: "Chủ đề 2: Dự án sáng tạo",
          videoId: "nKIu9yen5nc",
          quizCount: 8,
        },
      ],
    },
    "kp-kynang": {
      title: "🌟 Kỹ năng sống",
      subtitle: "Triết gia Khám Phá (10-15 tuổi) | 2 chủ đề",
      headerClass: "from-green-600 to-green-700",
      topics: [
        {
          title: "Chủ đề 1: Quản lý thời gian",
          videoId: "oTugjssqOT0",
          quizCount: 8,
        },
        {
          title: "Chủ đề 2: Tư duy phát triển",
          videoId: "V1eYniJ0Rnk",
          quizCount: 8,
        },
      ],
    },
  };

  // Open modal function
  window.openModal = function (modalId) {
    const modal = document.getElementById("competencyModal");
    const data = modalData[modalId];

    if (!data) {
      console.error("Modal data not found for:", modalId);
      return;
    }

    // Update header
    document.getElementById("modalTitle").textContent = data.title;
    document.getElementById("modalSubtitle").textContent = data.subtitle;
    const modalHeader = document.getElementById("modalHeader");
    modalHeader.className = `bg-gradient-to-r ${data.headerClass} p-6 rounded-t-2xl`;

    // Update topic 1
    document.getElementById("topic1Title").textContent =
      "📖 " + data.topics[0].title;
    document.getElementById("video1").src =
      "https://www.youtube.com/embed/" + data.topics[0].videoId;
    document.getElementById("quiz1Count").textContent =
      data.topics[0].quizCount + " câu hỏi trắc nghiệm";

    // Update topic 2
    document.getElementById("topic2Title").textContent =
      "📖 " + data.topics[1].title;
    document.getElementById("video2").src =
      "https://www.youtube.com/embed/" + data.topics[1].videoId;
    document.getElementById("quiz2Count").textContent =
      data.topics[1].quizCount + " câu hỏi trắc nghiệm";

    // Show modal with animation
    modal.classList.remove("hidden");
    modal.classList.add("flex");

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  };

  // Close modal function
  window.closeModal = function () {
    const modal = document.getElementById("competencyModal");

    // Stop all videos
    document.getElementById("video1").src = "";
    document.getElementById("video2").src = "";

    // Hide modal
    modal.classList.add("hidden");
    modal.classList.remove("flex");

    // Restore body scroll
    document.body.style.overflow = "auto";
  };

  // Close modal when clicking outside
  document
    .getElementById("competencyModal")
    ?.addEventListener("click", function (e) {
      if (e.target === this) {
        closeModal();
      }
    });

  // Close modal with ESC key
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      closeModal();
    }
  });

  document.addEventListener("DOMContentLoaded", function () {
    const swiper = new Swiper(".banner-swiper", {
      loop: true,
      autoplay: {
        delay: 3000, // Tự động cuộn sau 3 giây
      },
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
    });
  });
})();
