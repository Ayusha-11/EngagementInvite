
    (() => {
      "use strict";

      // Event configuration
      const eventConfig = {
        personOne: "Amit",
        personTwo: "Ayusha",
        eventDateISO: "2026-11-15",
        eventTime24: "11:00",
        eventTimeDisplay: "11:00 AM onwards",
        venueName: "Parvati Marriage Hall",
        venueAddress: "Tisgaon Road, Kalyan East, Kalyan – 421306",
        mapQuery: "Parvati Marriage Hall, Tisgaon Road, Kalyan East, Kalyan 421306"
      };

      const $ = id => document.getElementById(id);

      const couple = `${eventConfig.personOne} & ${eventConfig.personTwo}`;
      let currentLanguage = "en";

      // Set names and event details
      $("personOne").textContent = eventConfig.personOne;
      $("personTwo").textContent = eventConfig.personTwo;
      $("signatureNames").textContent = couple;

      $("eventTime").textContent = eventConfig.eventTimeDisplay;
      $("venueName").textContent = eventConfig.venueName;
      $("venueAddress").textContent = eventConfig.venueAddress;

      // Update event date according to selected language
      function updateEventDate() {
        const date = new Date(`${eventConfig.eventDateISO}T12:00:00`);
        const locale = currentLanguage === "mr" ? "mr-IN" : "en-IN";

        $("eventDate").textContent = date.toLocaleDateString(locale, {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric"
        });

        $("eventDateShort").textContent = date.toLocaleDateString(locale, {
          day: "numeric",
          month: "long",
          year: "numeric"
        }).toLocaleUpperCase(locale);
      }

      // Language switch: HTML contains all translated text.
      function applyLanguage(language) {
        currentLanguage = language === "mr" ? "mr" : "en";

        document.documentElement.lang = currentLanguage;
        document.body.classList.toggle(
          "language-marathi",
          currentLanguage === "mr"
        );

        $("langEnglish").classList.toggle(
          "active",
          currentLanguage === "en"
        );

        $("langMarathi").classList.toggle(
          "active",
          currentLanguage === "mr"
        );

        $("langEnglish").setAttribute(
          "aria-pressed",
          String(currentLanguage === "en")
        );

        $("langMarathi").setAttribute(
          "aria-pressed",
          String(currentLanguage === "mr")
        );

        updateEventDate();

        try {
          localStorage.setItem("amitAyushaLanguage", currentLanguage);
        } catch (error) {
          // Language switching still works if localStorage is unavailable.
        }
      }

      $("langEnglish").addEventListener("click", () => applyLanguage("en"));
      $("langMarathi").addEventListener("click", () => applyLanguage("mr"));

      let savedLanguage = "en";

      try {
        savedLanguage = localStorage.getItem("amitAyushaLanguage") || "en";
      } catch (error) {
        savedLanguage = "en";
      }

      applyLanguage(savedLanguage);

      // Toast notification
      const toast = message => {
        const element = $("toast");
        element.textContent = message;
        element.classList.add("show");

        window.clearTimeout(toast.timer);

        toast.timer = window.setTimeout(() => {
          element.classList.remove("show");
        }, 2800);
      };

      // Open invitation button
      $("openInvite").addEventListener("click", () => {
        $("details").scrollIntoView({ behavior: "smooth" });
      });

      // Countdown
      const targetDate = new Date(
        `${eventConfig.eventDateISO}T${eventConfig.eventTime24}:00`
      );

      function updateCountdown() {
        const difference = targetDate.getTime() - Date.now();

        if (difference <= 0) {
          ["days", "hours", "minutes", "seconds"].forEach(id => {
            $(id).textContent = "0";
          });
          return;
        }

        const units = {
          days: 86400000,
          hours: 3600000,
          minutes: 60000,
          seconds: 1000
        };

        let remaining = difference;

        Object.entries(units).forEach(([id, size]) => {
          $(id).textContent = String(
            Math.floor(remaining / size)
          ).padStart(2, "0");

          remaining %= size;
        });
      }

      updateCountdown();
      window.setInterval(updateCountdown, 1000);

      // Google Maps directions
      $("mapButton").href =
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(eventConfig.mapQuery)}`;

      // Add to calendar
      $("calendarButton").addEventListener("click", () => {
        const start = new Date(
          `${eventConfig.eventDateISO}T${eventConfig.eventTime24}:00`
        );

        const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);

        const stamp = date =>
          date.getFullYear().toString() +
          String(date.getMonth() + 1).padStart(2, "0") +
          String(date.getDate()).padStart(2, "0") +
          "T" +
          String(date.getHours()).padStart(2, "0") +
          String(date.getMinutes()).padStart(2, "0") +
          "00";

        const ics = [
          "BEGIN:VCALENDAR",
          "VERSION:2.0",
          "PRODID:-//Amit and Ayusha//Engagement//EN",
          "BEGIN:VEVENT",
          `UID:${Date.now()}@amit-ayusha-invite`,
          `DTSTAMP:${stamp(new Date())}`,
          `DTSTART:${stamp(start)}`,
          `DTEND:${stamp(end)}`,
          `SUMMARY:${couple} - Engagement`,
          `LOCATION:${eventConfig.venueName}, ${eventConfig.venueAddress}`,
          "DESCRIPTION:We look forward to celebrating with you.",
          "END:VEVENT",
          "END:VCALENDAR"
        ].join("\r\n");

        const blob = new Blob([ics], {
          type: "text/calendar;charset=utf-8"
        });

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = url;
        link.download = "amit-ayusha-engagement.ics";
        link.click();

        URL.revokeObjectURL(url);

        toast(
          currentLanguage === "mr"
            ? "कॅलेंडरचे आमंत्रण डाउनलोड झाले."
            : "Calendar invitation downloaded."
        );
      });

      
// Share invitation
$("shareButton").addEventListener("click", async () => {
  const dateText = $("eventDate").textContent;

  const message = currentLanguage === "mr"
    ? `${couple} यांच्या साखरपुड्याला आपण सहकुटुंब उपस्थित राहावे, ही विनंती!\n${dateText}\nवेळ: ${eventConfig.eventTimeDisplay}\n${eventConfig.venueName}\n${eventConfig.venueAddress}\n\nआपल्या उपस्थितीची आम्ही आतुरतेने वाट पाहत आहोत!`
    : `${couple} invite you to celebrate their engagement!\n${dateText}\n${eventConfig.eventTimeDisplay}\n${eventConfig.venueName}\n${eventConfig.venueAddress}\n\nWe look forward to celebrating with you!`;

  const invitationURL = "https://invitebyamitandayusha.online/";
  const imageURL = new URL(
    "assets/share-preview.jpg",
    invitationURL
  ).href;

  try {
    // Fetch the invitation preview image
    const response = await fetch(imageURL);

    if (!response.ok) {
      throw new Error("Could not load invitation image.");
    }

    const blob = await response.blob();

    const imageFile = new File(
      [blob],
      "assets/couple-photo-1",
      { type: blob.type || "image/png" }
    );

    const shareData = {
      title: `${couple} — Engagement Invitation`,
      text: `${message}\n\nView invitation: ${invitationURL}`,
      files: [imageFile]
    };

    // Share image + invitation message + link
    if (
      navigator.share &&
      navigator.canShare &&
      navigator.canShare({ files: [imageFile] })
    ) {
      await navigator.share(shareData);
    } 
    // Fallback: share the invitation link
    else if (navigator.share) {
      await navigator.share({
        title: `${couple} — Engagement Invitation`,
        text: message,
        url: invitationURL
      });
    } 
    // WhatsApp fallback
    else {
      const whatsappURL =
        `https://wa.me/?text=${encodeURIComponent(
          message + "\n\n" + invitationURL
        )}`;

      window.open(whatsappURL, "_blank", "noopener");
    }

  } catch (error) {
    if (error.name !== "AbortError") {
      console.error("Sharing failed:", error);

      // Fallback to WhatsApp link sharing
      const whatsappURL =
        `https://wa.me/?text=${encodeURIComponent(
          message + "\n\n" + invitationURL
        )}`;

      window.open(whatsappURL, "_blank", "noopener");
      toast("Sharing image was unavailable. Sharing invitation link instead.");
    }
  }
});

      // Reveal animations
      const observer = "IntersectionObserver" in window
        ? new IntersectionObserver(entries => {
            entries.forEach(entry => {
              if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
              }
            });
          }, { threshold: 0.12 })
        : null;

      document.querySelectorAll(".reveal").forEach(element => {
        if (observer) {
          observer.observe(element);
        } else {
          element.classList.add("visible");
        }
      });

    })();
