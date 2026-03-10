document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. Load More Comments Logic ---
    const loadMoreBtn = document.getElementById('load-more-btn');
    const hiddenComments = document.getElementById('hidden-comments');

    if(loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            if (hiddenComments.style.display === "none") {
                hiddenComments.style.display = "block";
                loadMoreBtn.innerText = "Show Less Comments";
            } else {
                hiddenComments.style.display = "none";
                loadMoreBtn.innerText = "Load More Comments";
            }
        });
    }

    // --- 2. Post Comment Logic ---
    const postBtn = document.getElementById('post-comment-btn');
    const commentInput = document.getElementById('comment-text');
    const commentList = document.getElementById('comment-list');

    if(postBtn) {
        postBtn.addEventListener('click', () => {
            const text = commentInput.value.trim();
            if(text) {
                const newCommentDiv = document.createElement('div');
                newCommentDiv.className = 'comment new-comment'; 
                
                newCommentDiv.innerHTML = `
                    <div class="comment-avatar"><i class="fas fa-user-astronaut"></i></div>
                    <div class="comment-body">
                        <h4>Guest User <span class="comment-date">Just now</span></h4>
                        <p>${text}</p>
                    </div>
                `;

                commentList.appendChild(newCommentDiv);
                commentInput.value = '';
                newCommentDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                alert("Please write something before posting!");
            }
        });
    }

    // --- 3. Back to Top Button ---
    const backToTopBtn = document.getElementById("back-to-top");

    window.onscroll = function() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTopBtn.style.display = "block";
        } else {
            backToTopBtn.style.display = "none";
        }
    };

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // --- 4. Dark Mode Logic (With Code Theme Swap) ---
    const toggleBtn = document.getElementById('dark-mode-toggle');
    const icon = toggleBtn.querySelector('i');
    const body = document.body;
    const prismLink = document.getElementById('prism-css');

    // URLs for the two code themes
    const lightTheme = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism.min.css";
    const darkTheme = "https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css";

    const setDarkMode = (isDark) => {
        if (isDark) {
            body.classList.add('dark-mode');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            prismLink.href = darkTheme; 
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            prismLink.href = lightTheme; 
            localStorage.setItem('theme', 'light');
        }
    };

    if (localStorage.getItem('theme') === 'dark') {
        setDarkMode(true);
    } else {
        setDarkMode(false);
    }

    toggleBtn.addEventListener('click', () => {
        const isDark = !body.classList.contains('dark-mode');
        setDarkMode(isDark);
    });

    // --- 5. TOC Highlighting ---
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".toc-link");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => link.classList.remove("active-toc"));
                const activeId = entry.target.getAttribute("id");
                const activeLink = document.querySelector(`.toc-link[href="#${activeId}"]`);
                if (activeLink) activeLink.classList.add("active-toc");
            }
        });
    }, { rootMargin: "-20% 0px -60% 0px" });

    sections.forEach(section => observer.observe(section));

    // --- 6. Smooth Scroll ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            document.getElementById(targetId).scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // --- 7. Copy Code Button ---
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const codeBlock = btn.closest('.code-block').querySelector('code');
            const codeText = codeBlock.innerText;
            navigator.clipboard.writeText(codeText).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Copied!';
                setTimeout(() => btn.innerHTML = originalHtml, 2000);
            });
        });
    });

    // --- 8. Image Carousel ---
    let slideIndex = 1;
    showSlides(slideIndex);
    window.plusSlides = n => showSlides(slideIndex += n);
    window.currentSlide = n => showSlides(slideIndex = n);

    function showSlides(n) {
        let slides = document.getElementsByClassName("mySlides");
        let dots = document.getElementsByClassName("dot");
        if (n > slides.length) slideIndex = 1;
        if (n < 1) slideIndex = slides.length;
        for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
        for (let i = 0; i < dots.length; i++) dots[i].className = dots[i].className.replace(" active", "");
        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    console.log("Template Loaded: Mobile Optimized + Sidebar Reordered.");
});