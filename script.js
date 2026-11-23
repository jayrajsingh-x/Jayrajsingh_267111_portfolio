// ==========================================================================
// Jayrajsingh Chunara — Portfolio JavaScript
// B.Tech Computer Science and Engineering (CSE), Semester 3, JG University
// ==========================================================================

// Run script after HTML DOM is fully parsed
document.addEventListener("DOMContentLoaded", function () {

    // ----------------------------------------------------------------------
    // 1. Dark Mode Toggle
    // ----------------------------------------------------------------------
    // Select the theme toggle button from the navbar
    const themeToggleBtn = document.getElementById("theme-toggle");
    const themeLabel = themeToggleBtn.querySelector(".theme-label");

    // Check if the user previously saved a theme preference in localStorage
    const savedTheme = localStorage.getItem("Jayrajsingh_portfolio_theme");

    // Apply saved theme on page load if it was set to dark
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        if (themeLabel) {
            themeLabel.textContent = "Light";
        }
    }

    // Toggle dark/light theme when button is clicked
    themeToggleBtn.addEventListener("click", function () {
        const currentTheme = document.documentElement.getAttribute("data-theme");

        if (currentTheme === "dark") {
            // Switch back to light theme
            document.documentElement.removeAttribute("data-theme");
            localStorage.setItem("Jayrajsingh_portfolio_theme", "light");
            if (themeLabel) {
                themeLabel.textContent = "Theme";
            }
        } else {
            // Switch to dark theme
            document.documentElement.setAttribute("data-theme", "dark");
            localStorage.setItem("Jayrajsingh_portfolio_theme", "dark");
            if (themeLabel) {
                themeLabel.textContent = "Light";
            }
        }
    });

    // ----------------------------------------------------------------------
    // 2. Mobile Menu (Hamburger) Open / Close
    // ----------------------------------------------------------------------
    const mobileMenuBtn = document.getElementById("mobile-menu-btn");
    const navMenu = document.getElementById("nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    // Open/close menu on hamburger button click
    mobileMenuBtn.addEventListener("click", function () {
        const isCurrentlyExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";

        // Toggle active class on menu and open class on button
        navMenu.classList.toggle("active");
        mobileMenuBtn.classList.toggle("open");
        mobileMenuBtn.setAttribute("aria-expanded", !isCurrentlyExpanded);
    });

    // Close mobile menu when a nav link is clicked
    navLinks.forEach(function (link) {
        link.addEventListener("click", function () {
            if (navMenu.classList.contains("active")) {
                navMenu.classList.remove("active");
                mobileMenuBtn.classList.remove("open");
                mobileMenuBtn.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Close menu when clicking outside of the navbar
    document.addEventListener("click", function (event) {
        const isClickInsideNav = event.target.closest("#main-nav");
        if (!isClickInsideNav && navMenu.classList.contains("active")) {
            navMenu.classList.remove("active");
            mobileMenuBtn.classList.remove("open");
            mobileMenuBtn.setAttribute("aria-expanded", "false");
        }
    });

    // ----------------------------------------------------------------------
    // Project Interactive Modals (Previewing Project 1 & Project 2)
    // ----------------------------------------------------------------------
    const modalButtons = document.querySelectorAll("[data-modal]");
    const closeButtons = document.querySelectorAll("[data-close]");

    // Open modal when "View Demo" is clicked
    modalButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const modalId = button.getAttribute("data-modal");
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.removeAttribute("hidden");
                document.body.style.overflow = "hidden"; // Prevent page background scrolling
            }
        });
    });

    // Close modal when close button or backdrop is clicked
    closeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const modalId = button.getAttribute("data-close");
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.setAttribute("hidden", "");
                document.body.style.overflow = ""; // Restore scrolling
            }
        });
    });

    // Close modal with Escape key
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            const openModals = document.querySelectorAll(".project-modal:not([hidden])");
            openModals.forEach(function (modal) {
                modal.setAttribute("hidden", "");
                document.body.style.overflow = "";
            });
        }
    });

    // ----------------------------------------------------------------------
    // Interactive Logic for Project 2: Colour Changer and Live Text Demo
    // ----------------------------------------------------------------------
    const dynamicHeading = document.getElementById("demo-dynamic-heading");
    const changeColorBtn = document.getElementById("demo-change-color-btn");
    const colorLabel = document.getElementById("demo-current-color-label");
    const liveInput = document.getElementById("demo-live-input");
    const liveOutput = document.getElementById("demo-live-output");

    // Array of subtle vintage editorial colours
    const vintageColors = [
        { name: "Terracotta", value: "#b84a28" },
        { name: "Deep Teal", value: "#1a5b5b" },
        { name: "Warm Ochre", value: "#b07d1b" },
        { name: "Slate Blue", value: "#32536a" },
        { name: "Sage Green", value: "#4a6741" }
    ];
    let currentColorIndex = 0;

    // Change heading colour on button click using addEventListener
    if (changeColorBtn && dynamicHeading) {
        changeColorBtn.addEventListener("click", function () {
            currentColorIndex = (currentColorIndex + 1) % vintageColors.length;
            const chosen = vintageColors[currentColorIndex];
            dynamicHeading.style.color = chosen.value;
            if (colorLabel) {
                colorLabel.textContent = "Color: " + chosen.name;
                colorLabel.style.color = chosen.value;
            }
        });
    }

    // Live text display using input event on text box
    if (liveInput && liveOutput) {
        liveInput.addEventListener("input", function (event) {
            const textEntered = event.target.value;
            if (textEntered.trim() === "") {
                liveOutput.textContent = "Start typing below to see live updates...";
                liveOutput.style.fontStyle = "italic";
            } else {
                liveOutput.textContent = textEntered;
                liveOutput.style.fontStyle = "normal";
            }
        });
    }

    // ----------------------------------------------------------------------
    // 3. Scroll Reveal Animations (IntersectionObserver)
    // ----------------------------------------------------------------------
    // Check if the user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealElements = document.querySelectorAll(".reveal");

    if (!prefersReducedMotion && "IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver(
            function (entries, observer) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("is-visible");
                        // Unobserve once revealed so animation runs cleanly once
                        observer.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -40px 0px"
            }
        );

        revealElements.forEach(function (el) {
            revealObserver.observe(el);
        });
    } else {
        // Fallback for older browsers or reduced motion: show elements immediately
        revealElements.forEach(function (el) {
            el.classList.add("is-visible");
        });
    }

    // ----------------------------------------------------------------------
    // 4. Hero Text Typing / Fade-in Effect on Page Load
    // ----------------------------------------------------------------------
    const typingTarget = document.getElementById("hero-typing-text");
    if (typingTarget && !prefersReducedMotion) {
        const fullText = typingTarget.textContent.trim();
        typingTarget.textContent = "";

        // Create typing cursor element
        const cursor = document.createElement("span");
        cursor.className = "typing-cursor";
        cursor.setAttribute("aria-hidden", "true");
        typingTarget.parentNode.insertBefore(cursor, typingTarget.nextSibling);

        let charIndex = 0;
        const typingSpeed = 16; // milliseconds per character

        function typeNextChar() {
            if (charIndex < fullText.length) {
                typingTarget.textContent += fullText.charAt(charIndex);
                charIndex++;
                setTimeout(typeNextChar, typingSpeed);
            } else {
                // Fade out cursor after a brief pause
                setTimeout(function () {
                    cursor.remove();
                }, 1500);
            }
        }

        // Start typing after initial paint
        setTimeout(typeNextChar, 300);
    }

    // ----------------------------------------------------------------------
    // 5. Contact Form Validation
    // ----------------------------------------------------------------------
    const contactForm = document.getElementById("contact-form");
    const nameInput = document.getElementById("contact-name");
    const emailInput = document.getElementById("contact-email");
    const messageInput = document.getElementById("contact-message");

    const nameError = document.getElementById("name-error");
    const emailError = document.getElementById("email-error");
    const messageError = document.getElementById("message-error");
    const formFeedback = document.getElementById("form-feedback");

    // Regular expression for validating standard email structure
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Helper function to show error on a field
    function showFieldError(inputEl, errorEl, message) {
        inputEl.classList.add("has-error");
        errorEl.textContent = message;
    }

    // Helper function to clear error on a field
    function clearFieldError(inputEl, errorEl) {
        inputEl.classList.remove("has-error");
        errorEl.textContent = "";
    }

    // Real-time validation: clear error as user types
    if (nameInput && nameError) {
        nameInput.addEventListener("input", function () {
            clearFieldError(nameInput, nameError);
        });
    }

    if (emailInput && emailError) {
        emailInput.addEventListener("input", function () {
            clearFieldError(emailInput, emailError);
        });
    }

    if (messageInput && messageError) {
        messageInput.addEventListener("input", function () {
            clearFieldError(messageInput, messageError);
        });
    }

    // Validate on form submit
    if (contactForm) {
        contactForm.addEventListener("submit", function (e) {
            // Prevent actual browser reload
            e.preventDefault();

            // Reset general feedback box
            if (formFeedback) {
                formFeedback.style.display = "none";
                formFeedback.className = "form-feedback";
                formFeedback.textContent = "";
            }

            let isFormValid = true;

            // 1. Validate Name: must not be empty
            const nameVal = nameInput ? nameInput.value.trim() : "";
            if (nameVal === "") {
                showFieldError(nameInput, nameError, "Please enter your name.");
                isFormValid = false;
            } else {
                clearFieldError(nameInput, nameError);
            }

            // 2. Validate Email: must not be empty and must be valid format
            const emailVal = emailInput ? emailInput.value.trim() : "";
            if (emailVal === "") {
                showFieldError(emailInput, emailError, "Please enter your email address.");
                isFormValid = false;
            } else if (!emailRegex.test(emailVal)) {
                showFieldError(emailInput, emailError, "Please enter a valid email address (e.g., student@example.com).");
                isFormValid = false;
            } else {
                clearFieldError(emailInput, emailError);
            }

            // 3. Validate Message: must be at least 10 characters
            const messageVal = messageInput ? messageInput.value.trim() : "";
            if (messageVal === "") {
                showFieldError(messageInput, messageError, "Please enter a message.");
                isFormValid = false;
            } else if (messageVal.length < 10) {
                showFieldError(messageInput, messageError, "Message must be at least 10 characters long.");
                isFormValid = false;
            } else {
                clearFieldError(messageInput, messageError);
            }

            // If valid, show success message and reset form
            if (isFormValid && formFeedback) {
                formFeedback.textContent = "Thank you! Your message has been received. Jayrajsingh will get back to you soon.";
                formFeedback.className = "form-feedback success";
                formFeedback.style.display = "block";

                // Reset all inputs
                contactForm.reset();

                // Clear feedback after 6 seconds
                setTimeout(function () {
                    formFeedback.style.display = "none";
                }, 6000);
            } else if (formFeedback) {
                formFeedback.textContent = "Please resolve the highlighted errors before submitting.";
                formFeedback.className = "form-feedback error";
                formFeedback.style.display = "block";
            }
        });
    }
});
