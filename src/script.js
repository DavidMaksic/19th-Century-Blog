//            --== DARK MODE ==--

const root = document.querySelector(':root');
const darkBtn = document.getElementById('dark-mode');
const dot = document.getElementById('dot');

darkBtn.addEventListener('click', function () {
   root.classList.toggle('dark');
   dot.classList.toggle('translate-x-6');

   // If user changes theme, save it to localStorage
   if (root.classList.contains('dark')) {
      localStorage.setItem('selectedTheme', 'dark');
   }

   if (!root.classList.contains('dark')) {
      localStorage.setItem('selectedTheme', 'light');
   }
});

// When loading document select theme from localStorage
document.addEventListener('DOMContentLoaded', function () {
   const theme = localStorage.getItem('selectedTheme');

   if (theme === 'dark') {
      root.classList.add('dark');
   }

   if (theme === 'light') {
      root.classList.remove('dark');
      dot.classList.toggle('translate-x-6');
   }
});

//     --== DARK MODE SYSTEM PREFERENCE ==--

if (
   localStorage.theme === 'dark' ||
   (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches)
) {
   document.documentElement.classList.add('dark');
   dot.classList.toggle('translate-x-6');
} else {
   document.documentElement.classList.remove('dark');
}

// Whenever the user explicitly chooses light mode
localStorage.theme = 'light';

// Whenever the user explicitly chooses dark mode
localStorage.theme = 'dark';

// Whenever the user explicitly chooses to respect the OS preference
localStorage.removeItem('theme');

//            --== TOGGLE SORTING CLASS ==--

let sortBtns = document.querySelectorAll('.sort-btn');
let defaultBtn = sortBtns[0];
if (defaultBtn) {
   defaultBtn.classList.add('sortActive');
}

let getSiblings = function (currentEl) {
   let siblings = [];
   let sibling = currentEl.parentNode.firstChild;

   while (sibling) {
      // Sibling might be a text fragment or whitespace, and we only want elements; so we use nodeType === 1
      if (sibling.nodeType === 1 && sibling !== currentEl) {
         siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
   }

   return siblings;
};

const changeSortOption = function () {
   // Adding active class to clicked element
   this.classList.add('sortActive');

   // Getting all siblings
   let siblings = getSiblings(this);

   // Removing active class from all siblings
   siblings.forEach((sibling) => {
      sibling.classList.remove('sortActive');
   });
};

let i;
for (i = 0; i < sortBtns.length; i++) {
   sortBtns[i].addEventListener('click', changeSortOption);
}
