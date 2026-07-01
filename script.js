(function () {
  'use strict';

  /* ==== GITHUB STATS (dynamic) ==== */
  var statRepos   = document.getElementById('statRepos');
  var statStars   = document.getElementById('statStars');
  var statFollowers = document.getElementById('statFollowers');

  var fallback = {
    repos: statRepos    ? statRepos.textContent.trim()   : '24',
    stars: statStars    ? statStars.textContent.trim()   : '48',
    followers: statFollowers ? statFollowers.textContent.trim() : '15'
  };

  var setPulse = function (el, pulse) {
    if (!el) return;
    if (pulse) { el.classList.add('stat-pulse'); } else { el.classList.remove('stat-pulse'); }
  };

  if (statRepos || statStars || statFollowers) {
    setPulse(statRepos, true);
    setPulse(statStars, true);
    setPulse(statFollowers, true);

    var userUrl  = 'https://api.github.com/users/discimus';
    var reposUrl = 'https://api.github.com/users/discimus/repos?per_page=100';

    var userPromise = fetch(userUrl).then(function (r) { return r.json(); });
    var reposPromise = fetch(reposUrl).then(function (r) { return r.json(); });

    Promise.all([userPromise, reposPromise])
      .then(function (results) {
        var user  = results[0];
        var repos = results[1];

        if (statRepos && user.public_repos !== undefined) {
          statRepos.textContent = user.public_repos;
        }
        if (statFollowers && user.followers !== undefined) {
          statFollowers.textContent = user.followers;
        }
        if (statStars && Array.isArray(repos)) {
          var totalStars = 0;
          for (var i = 0; i < repos.length; i++) {
            totalStars += repos[i].stargazers_count || 0;
          }
          statStars.textContent = totalStars;
        }
      })
      .catch(function () {
        /* API failed — keep static fallback values already in DOM */
      })
      .then(function () {
        setPulse(statRepos, false);
        setPulse(statStars, false);
        setPulse(statFollowers, false);
      });
  }

  /* ==== NAV SCROLL SHADOW ==== */
  var nav = document.getElementById('nav');
  var onScroll = function () {
    if (window.scrollY > 10) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ==== MOBILE TOGGLE ==== */
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');

  if (toggle && links) {
    toggle.addEventListener('click', function () {
      links.classList.toggle('open');
    });

    var linkItems = links.querySelectorAll('a');
    for (var i = 0; i < linkItems.length; i++) {
      linkItems[i].addEventListener('click', function () {
        links.classList.remove('open');
      });
    }
  }

  /* ==== SCROLL REVEAL ==== */
  var fadeEls = document.querySelectorAll('.project-card, .about-card, .skill-tag, .stat');

  for (var j = 0; j < fadeEls.length; j++) {
    fadeEls[j].classList.add('fade-in');
  }

  var observer = new IntersectionObserver(
    function (entries) {
      for (var k = 0; k < entries.length; k++) {
        var entry = entries[k];
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      }
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  var visibleEls = document.querySelectorAll('.fade-in');
  for (var m = 0; m < visibleEls.length; m++) {
    observer.observe(visibleEls[m]);
  }
})();
